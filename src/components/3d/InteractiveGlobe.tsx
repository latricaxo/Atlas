import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { KnowledgeCity } from '../../types';

interface InteractiveGlobeProps {
  cities: KnowledgeCity[];
  selectedCity: KnowledgeCity | null;
  onSelectCity: (city: KnowledgeCity) => void;
  targetFocus?: { lat: number; lng: number; altitude?: number } | null;
  className?: string;
}

// Helper to check if a lat/lng point is roughly over major Earth landmasses
function isLandmass(lat: number, lng: number): boolean {
  // North America
  if (lat >= 15 && lat <= 70 && lng >= -165 && lng <= -50) return true;
  // South America
  if (lat >= -55 && lat <= 12 && lng >= -82 && lng <= -34) return true;
  // Europe
  if (lat >= 35 && lat <= 70 && lng >= -10 && lng <= 40) return true;
  // Africa
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  // Asia
  if (lat >= 5 && lat <= 75 && lng >= 40 && lng <= 180) return true;
  // Australia / Oceania
  if (lat >= -45 && lat <= -10 && lng >= 110 && lng <= 155) return true;
  return false;
}

// Convert Lat/Lng to Vector3 on sphere of radius R
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Create curved bezier line between two 3D vectors above sphere surface
function createCurvedArc(v1: THREE.Vector3, v2: THREE.Vector3, colorHex: number) {
  const distance = v1.distanceTo(v2);
  const midPoint = v1.clone().add(v2).multiplyScalar(0.5);
  // Elevate midpoint proportional to distance
  const midLength = midPoint.length();
  midPoint.normalize().multiplyScalar(midLength + distance * 0.35);

  const curve = new THREE.QuadraticBezierCurve3(v1, midPoint, v2);
  const points = curve.getPoints(36);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.75,
    linewidth: 2,
  });

  return new THREE.Line(geometry, material);
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  targetFocus,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const pinObjectsRef = useRef<{ city: KnowledgeCity; mesh: THREE.Mesh; halo: THREE.Mesh }[]>([]);

  const [hoveredCityName, setHoveredCityName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse drag tracking
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Use container dimensions or default fallback
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene setup (No thick fog obscuring the globe!)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 13.5);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const globeRadius = 4.5;

    // Inner glowing sphere (deep sapphire / ocean blue)
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      emissive: 0x071126,
      specular: 0x38bdf8,
      shininess: 40,
      transparent: true,
      opacity: 0.96,
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(innerSphere);

    // Continent Landmass Particles/Dots
    const landDotsGeo = new THREE.BufferGeometry();
    const landPositions: number[] = [];
    const landColors: number[] = [];

    // Dense grid sampling to build continent shapes
    for (let lat = -80; lat <= 80; lat += 2.5) {
      for (let lng = -180; lng <= 180; lng += 2.5) {
        if (isLandmass(lat, lng)) {
          const pos = latLngToVector3(lat, lng, globeRadius + 0.03);
          landPositions.push(pos.x, pos.y, pos.z);
          // High contrast cyan / teal landmass dots
          landColors.push(0.2, 0.75, 0.95);
        }
      }
    }

    landDotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3));
    landDotsGeo.setAttribute('color', new THREE.Float32BufferAttribute(landColors, 3));

    const landDotsMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const landDotsMesh = new THREE.Points(landDotsGeo, landDotsMat);
    globeGroup.add(landDotsMesh);

    // Latitude / Longitude Grid lines
    const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(globeRadius + 0.01, 24, 18));
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x1e3a8a,
      transparent: true,
      opacity: 0.3,
    });
    const gridLines = new THREE.LineSegments(gridGeo, gridMat);
    globeGroup.add(gridLines);

    // Outer Atmosphere Glow Shell
    const atmosGeo = new THREE.SphereGeometry(globeRadius + 0.35, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosphere);

    // Starfield background
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 1500;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 140;
      starPositions[i + 1] = (Math.random() - 0.5) * 140;
      starPositions[i + 2] = (Math.random() - 0.5) * 140;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.5,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 5. Ambient and directional lights (bright & rich)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(12, 18, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.2);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    // 6. Plot Cities & Arcs
    const pins: { city: KnowledgeCity; mesh: THREE.Mesh; halo: THREE.Mesh }[] = [];

    cities.forEach((city) => {
      const pos = latLngToVector3(city.coordinates.lat, city.coordinates.lng, globeRadius);
      const colorHex = parseInt(city.glowColor.replace('#', '0x'), 16) || 0x38bdf8;

      // City Pin Dot (Bright Neon Sphere)
      const pinGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { cityId: city.id, cityName: city.name };
      globeGroup.add(pinMesh);

      // Glowing Vertical Spike/Beam
      const beamNormal = pos.clone().normalize();
      const beamGeo = new THREE.CylinderGeometry(0.02, 0.05, 0.6, 8);
      beamGeo.translate(0, 0.3, 0); // Origin at base
      const beamMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.8,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.copy(pos);
      beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), beamNormal);
      globeGroup.add(beamMesh);

      // Glowing Halo Ring around city
      const haloGeo = new THREE.RingGeometry(0.18, 0.32, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(pos);
      haloMesh.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(haloMesh);

      pins.push({ city, mesh: pinMesh, halo: haloMesh });
    });

    pinObjectsRef.current = pins;

    // Draw arcs between connected cities
    cities.forEach((city) => {
      const posA = latLngToVector3(city.coordinates.lat, city.coordinates.lng, globeRadius);
      const colorHex = parseInt(city.glowColor.replace('#', '0x'), 16) || 0x38bdf8;

      city.connectedCities.forEach((connectedId) => {
        const targetCity = cities.find((c) => c.id === connectedId);
        if (targetCity) {
          const posB = latLngToVector3(targetCity.coordinates.lat, targetCity.coordinates.lng, globeRadius);
          const arc = createCurvedArc(posA, posB, colorHex);
          globeGroup.add(arc);
        }
      });
    });

    // 7. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Slowly rotate globe if not dragging
      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y += 0.0015;
      }

      // Pulse city halos
      const time = Date.now() * 0.004;
      pins.forEach(({ halo }, index) => {
        const scale = 1 + Math.sin(time + index * 0.6) * 0.25;
        halo.scale.set(scale, scale, 1);
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // 8. Robust ResizeObserver for container resizing
    const updateSize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current?.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, [cities]);

  // Handle Target Focus Camera Fly-To Animation
  useEffect(() => {
    if (!targetFocus || !globeGroupRef.current) return;

    const { lat, lng } = targetFocus;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    // Target rotation angles for globeGroup
    const targetRotX = phi - Math.PI / 2;
    const targetRotY = -theta + Math.PI;

    // Smooth lerp rotation
    let step = 0;
    const totalSteps = 45;
    const startRotX = globeGroupRef.current.rotation.x;
    const startRotY = globeGroupRef.current.rotation.y;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x = startRotX + (targetRotX - startRotX) * ease;
        globeGroupRef.current.rotation.y = startRotY + (targetRotY - startRotY) * ease;
      }

      if (step >= totalSteps) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [targetFocus]);

  // Pointer Interaction Handlers for Raycasting & Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(false);
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      setIsDragging(true);
    }

    if (e.buttons === 1 && globeGroupRef.current) {
      globeGroupRef.current.rotation.y += deltaX * 0.005;
      globeGroupRef.current.rotation.x += deltaY * 0.005;
    }

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    // Raycast check for hover
    if (!mountRef.current || !cameraRef.current || !globeGroupRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const pinMeshes = pinObjectsRef.current.map((p) => p.mesh);
    const intersects = raycaster.intersectObjects(pinMeshes);

    if (intersects.length > 0) {
      const cityId = intersects[0].object.userData.cityId;
      const city = cities.find((c) => c.id === cityId);
      if (city) {
        setHoveredCityName(city.name);
      }
    } else {
      setHoveredCityName(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) return; // Ignore click if dragging

    if (!mountRef.current || !cameraRef.current || !globeGroupRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const pinMeshes = pinObjectsRef.current.map((p) => p.mesh);
    const intersects = raycaster.intersectObjects(pinMeshes);

    if (intersects.length > 0) {
      const cityId = intersects[0].object.userData.cityId;
      const city = cities.find((c) => c.id === cityId);
      if (city) {
        onSelectCity(city);
      }
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[420px] select-none cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
    >
      {/* Three.js Container */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full"
      />

      {/* Hovered City Tooltip */}
      {hoveredCityName && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none rounded-full border border-blue-500/40 bg-black/80 px-4 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>Tap to fly into {hoveredCityName}</span>
        </div>
      )}

      {/* Selected City Highlight Overlay */}
      {selectedCity && (
        <div className="absolute bottom-6 left-6 pointer-events-none rounded-2xl border border-white/20 bg-black/70 p-3.5 backdrop-blur-xl max-w-xs shadow-2xl">
          <div className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
            Active Coordinate
          </div>
          <div className="text-sm font-bold text-white">{selectedCity.name}</div>
          <div className="text-xs text-white/70 mt-0.5">
            {selectedCity.continent} • {selectedCity.country}
          </div>
        </div>
      )}

      {/* Interaction Help Hint */}
      <div className="absolute bottom-4 right-4 text-[11px] font-mono text-white/40 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
        Drag to rotate • Tap pin to zoom
      </div>
    </div>
  );
};
