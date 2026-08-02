import { KnowledgeCity, KnowledgeTrail, CreatorProfileData, InvestorSlide } from '../types';

export const CITIES_DATA: KnowledgeCity[] = [
  {
    id: 'ai-city',
    name: 'Artificial Intelligence City',
    continent: 'Technology',
    country: 'Machine Intelligence Republic',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    glowColor: '#3B82F6', // Electric Blue
    description: 'The global nexus for neural network architectures, generative models, agentic workflows, and reasoning systems.',
    population: 1425000,
    growthRate: '+48% this week',
    aiSummary: 'Artificial Intelligence City is rapidly expanding along the Deep Learning Archipelago. Current debates focus on test-time compute, liquid neural nets, and agentic autonomy.',
    experts: [
      { id: 'exp-1', name: 'Dr. Demis Hassabis', role: 'Chief Neural Cartographer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 12500, knowledgeScore: 19800, cityOwned: 'Deep Learning Heights' },
      { id: 'exp-2', name: 'Sam Altman', role: 'Frontier Model Pioneer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 14800, knowledgeScore: 24500, cityOwned: 'Artificial Intelligence City' },
      { id: 'exp-3', name: 'Dr. Fei-Fei Li', role: 'Spatial Intelligence Director', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 9800, knowledgeScore: 18200, cityOwned: 'Computer Vision Harbor' }
    ],
    conversations: [
      {
        id: 'conv-1',
        title: 'Why Test-Time Compute is replacing brute parameter scaling',
        author: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Master Explorer',
        upvotes: 4820,
        repliesCount: 382,
        snippet: 'Rather than training 1T parameter behemoths, allocating inference compute dynamically at query time yields exponential reasoning improvements without linear memory scaling.',
        tags: ['Reasoning', 'Test-Time Compute', 'LLMs'],
        timestamp: '12m ago'
      },
      {
        id: 'conv-2',
        title: 'Agentic Workflows: Multi-agent coordination paradigms for real-world software synthesis',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Senior Cartographer',
        upvotes: 3190,
        repliesCount: 214,
        snippet: 'When subagents specialize into planning, execution, verification, and automated refactoring, tasks that took 100 hours collapse down to 4 minutes.',
        tags: ['Agentic Workflows', 'Systems Architecture', 'AI Engineering'],
        timestamp: '1h ago'
      }
    ],
    connectedCities: ['bitcoin-city', 'open-source-valley', 'space-observatory', 'philosophy-ridge'],
    knowledgeTrails: ['trail-ai-evolution', 'trail-crypto-ai']
  },
  {
    id: 'bitcoin-city',
    name: 'Bitcoin City',
    continent: 'Economics',
    country: 'Sovereign Ledger State',
    coordinates: { lat: 64.1466, lng: -21.9426 }, // Reykjavik area aesthetic
    glowColor: '#F59E0B', // Amber
    description: 'The citadel of decentralized consensus, proof-of-work security, hard monetary principles, and zero-knowledge privacy.',
    population: 980000,
    growthRate: '+29% this week',
    aiSummary: 'Bitcoin City stands as an unshakeable bedrock of economic topography. Surrounding territories include Zero-Knowledge Valley and Cryptographic Proofs Ridge.',
    experts: [
      { id: 'exp-4', name: 'Satoshi Nakamoto', role: 'Founding Cartographer', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 40000, knowledgeScore: 99999, cityOwned: 'Consensus Genesis Peak' },
      { id: 'exp-5', name: 'Elizabeth Stark', role: 'Layer-2 Lightning Architect', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 8900, knowledgeScore: 16400, cityOwned: 'Lightning Channel District' }
    ],
    conversations: [
      {
        id: 'conv-3',
        title: 'Zero-Knowledge rollups on Bitcoin base layer vs Lightning Network scalability',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Cryptographic Lead',
        upvotes: 5610,
        repliesCount: 420,
        snippet: 'ZK-STARK proofs embedded via BitVM enable expressive smart contracts directly anchored to 100+ EH/s of Bitcoin security without modifying consensus rules.',
        tags: ['Bitcoin', 'Zero Knowledge', 'BitVM'],
        timestamp: '35m ago'
      }
    ],
    connectedCities: ['ai-city', 'privacy-haven', 'history-highlands'],
    knowledgeTrails: ['trail-bitcoin-privacy', 'trail-crypto-ai']
  },
  {
    id: 'open-source-valley',
    name: 'Open Source Valley',
    continent: 'Technology',
    country: 'Commons Federation',
    coordinates: { lat: 59.3293, lng: 18.0686 }, // Stockholm coordinates
    glowColor: '#10B981', // Emerald
    description: 'The fertile valley where collective intelligence builds Linux, React, Rust compilers, and open weights AI.',
    population: 1890000,
    growthRate: '+52% this week',
    aiSummary: 'Open Source Valley connects developers worldwide. Its landmark conversations represent the open infrastructure underlying 99% of global software.',
    experts: [
      { id: 'exp-6', name: 'Linus Torvalds', role: 'Kernel Overseer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 35000, knowledgeScore: 42000, cityOwned: 'Linux Citadel' },
      { id: 'exp-7', name: 'Guillermo Rauch', role: 'Frontend Spatial Pioneer', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 11200, knowledgeScore: 21000, cityOwned: 'Vercel Bay' }
    ],
    conversations: [
      {
        id: 'conv-4',
        title: 'Why open weights AI models are democratizing discovery across developing nations',
        author: 'Amina Diallo',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Global Knowledge Fellow',
        upvotes: 2940,
        repliesCount: 189,
        snippet: 'When local researchers fine-tune open weights on regional medical datasets, diagnostic accuracy in rural clinics jumps by 300%.',
        tags: ['Open Weights', 'Global Health', 'Democratization'],
        timestamp: '2h ago'
      }
    ],
    connectedCities: ['ai-city', 'design-harbor', 'startup-bay'],
    knowledgeTrails: ['trail-open-source-revolution']
  },
  {
    id: 'design-harbor',
    name: 'Design Harbor',
    continent: 'Art',
    country: 'Visual Aesthetics Republic',
    coordinates: { lat: 35.6762, lng: 139.6503 }, // Tokyo
    glowColor: '#EC4899', // Pink / Aurora
    description: 'A coastal metropolis celebrating typography, spatial UI, tactile micro-interactions, visionOS ergonomics, and visual rhythm.',
    population: 1120000,
    growthRate: '+39% this week',
    aiSummary: 'Design Harbor is the design benchmark of Atlas. Here, tactile depth, mathematical typography scales, and subtle blur aesthetics are perfected.',
    experts: [
      { id: 'exp-8', name: 'Jony Ive', role: 'Master Industrial Craftsman', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 28000, knowledgeScore: 39000, cityOwned: 'Apple Design Archives' },
      { id: 'exp-9', name: 'Dylan Field', role: 'Collaborative Canvas Architect', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 14000, knowledgeScore: 22400, cityOwned: 'Vector Bay' }
    ],
    conversations: [
      {
        id: 'conv-5',
        title: 'Spatial Canvas UI vs Linear Feeds: The Cognitive Ergonomics of 3D Knowledge Navigation',
        author: 'Oliver Chen',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Principal UI Explorer',
        upvotes: 6120,
        repliesCount: 512,
        snippet: 'The human brain evolved to recall spatial spatial relationships (the Method of Loci). Moving from 1D scrolling feeds to 2.5D knowledge maps reduces cognitive fatigue by 74%.',
        tags: ['Spatial UI', 'Cognitive Psychology', 'UX Design'],
        timestamp: '4h ago'
      }
    ],
    connectedCities: ['open-source-valley', 'startup-bay', 'philosophy-ridge'],
    knowledgeTrails: ['trail-spatial-ui-design']
  },
  {
    id: 'startup-bay',
    name: 'Startup Bay',
    continent: 'Business',
    country: 'Venture Capital Island',
    coordinates: { lat: 37.4419, lng: -122.143 }, // Palo Alto
    glowColor: '#8B5CF6', // Purple Glow
    description: 'The epicenter of zero-to-one product building, product-market fit discovery, founder stories, and seed financing.',
    population: 1650000,
    growthRate: '+41% this week',
    aiSummary: 'Startup Bay lights up with new venture announcements and founder breakdowns. Its landmark conversations focus on high-velocity execution.',
    experts: [
      { id: 'exp-10', name: 'Paul Graham', role: 'Y Combinator Elder', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 38000, knowledgeScore: 48000, cityOwned: 'Essay Ridge' },
      { id: 'exp-11', name: 'Patrick Collison', role: 'Economic Infrastructure Lead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 19000, knowledgeScore: 29000, cityOwned: 'Stripe Harbor' }
    ],
    conversations: [
      {
        id: 'conv-6',
        title: 'Why the next $10B company will be built by a single founder and an ensemble of 50 AI agents',
        author: 'Sophia Zhang',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Serial Founder',
        upvotes: 4100,
        repliesCount: 340,
        snippet: 'Unicorn leverage is decoupling from headcount. When code, design, marketing, and legal ops are agentic, execution speed is capped only by human clarity of vision.',
        tags: ['Startups', 'AI Solopreneurship', 'Venture Capital'],
        timestamp: '5h ago'
      }
    ],
    connectedCities: ['ai-city', 'open-source-valley', 'design-harbor'],
    knowledgeTrails: ['trail-startup-zero-to-one']
  },
  {
    id: 'space-observatory',
    name: 'Space Observatory',
    continent: 'Science',
    country: 'Cosmic Exploration Territory',
    coordinates: { lat: 28.5729, lng: -80.649 }, // Cape Canaveral
    glowColor: '#06B6D4', // Cyan
    description: 'The high-altitude observatory charting orbital mechanics, SpaceX Starship launches, James Webb discoveries, and exoplanet detection.',
    population: 870000,
    growthRate: '+31% this week',
    aiSummary: 'Space Observatory watches the stars. Recent highlights include atmospheric spectroscopy of candidate habitable worlds around TRAPPIST-1.',
    experts: [
      { id: 'exp-12', name: 'Dr. Neil deGrasse Tyson', role: 'Astrophysical Guide', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 25000, knowledgeScore: 31000, cityOwned: 'Cosmic Dome' }
    ],
    conversations: [
      {
        id: 'conv-7',
        title: 'James Webb detects water vapor and carbon dioxide signatures on exoplanet K2-18b',
        author: 'Dr. Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Astrophysicist',
        upvotes: 7210,
        repliesCount: 689,
        snippet: 'Transmission spectroscopy reveals bio-hint molecules in the atmosphere of a sub-Neptune planet orbiting in the habitable zone of a cool red dwarf.',
        tags: ['Astronomy', 'James Webb', 'Exoplanets'],
        timestamp: '6h ago'
      }
    ],
    connectedCities: ['ai-city', 'climate-ridge', 'history-highlands'],
    knowledgeTrails: ['trail-space-exploration']
  },
  {
    id: 'climate-ridge',
    name: 'Climate Ridge',
    continent: 'Nature',
    country: 'Biosphere Stewardship Alliance',
    coordinates: { lat: -1.2921, lng: 36.8219 }, // Nairobi / East Africa
    glowColor: '#84CC16', // Lime Green
    description: 'The green mountain ridge dedicated to fusion energy, carbon removal tech, grid battery storage, and rewilding ecology.',
    population: 740000,
    growthRate: '+27% this week',
    aiSummary: 'Climate Ridge bridges environmental stewardship with frontier clean tech. Fusion power experiments and direct air capture plants dominate discussion.',
    experts: [
      { id: 'exp-13', name: 'Dr. Jane Goodall', role: 'Ethological Legend', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 32000, knowledgeScore: 37000, cityOwned: 'Wilderness Basin' }
    ],
    conversations: [
      {
        id: 'conv-8',
        title: 'Commercial Nuclear Fusion: Magnetic confinement breakthroughs reaching Q>1.5 net energy gain',
        author: 'Dr. Aris Thorne',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Plasma Physicist',
        upvotes: 3890,
        repliesCount: 298,
        snippet: 'High-temperature superconducting magnets allow compact tokamaks to generate stable plasma at 100M°C, unlocking clean baseload energy abundance.',
        tags: ['Clean Tech', 'Fusion Energy', 'Sustainability'],
        timestamp: '8h ago'
      }
    ],
    connectedCities: ['space-observatory', 'health-forest', 'open-source-valley'],
    knowledgeTrails: ['trail-clean-energy-future']
  },
  {
    id: 'health-forest',
    name: 'Health Forest',
    continent: 'Health',
    country: 'Longevity & Biology Realm',
    coordinates: { lat: 42.3601, lng: -71.0589 }, // Boston / Harvard-MIT bio corridor
    glowColor: '#14B8A6', // Teal
    description: 'The dense sanctuary of mRNA therapies, CRISPR gene editing, longevity research, and synthetic biology.',
    population: 930000,
    growthRate: '+33% this week',
    aiSummary: 'Health Forest explores human lifespan extension, precision oncology, and protein folding advances via AlphaFold 3.',
    experts: [
      { id: 'exp-14', name: 'Dr. Jennifer Doudna', role: 'Gene Editing Pioneer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 31000, knowledgeScore: 36000, cityOwned: 'CRISPR Sanctuary' }
    ],
    conversations: [
      {
        id: 'conv-9',
        title: 'CRISPR Prime Editing in vivo cures genetic sickle cell disease in clinical trials',
        author: 'Dr. Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Genomics Researcher',
        upvotes: 4920,
        repliesCount: 310,
        snippet: 'Base editing without double-stranded DNA breaks eliminates off-target mutations, curing inherited monogenic disorders permanently in a single IV infusion.',
        tags: ['Genomics', 'CRISPR', 'Longevity'],
        timestamp: '10h ago'
      }
    ],
    connectedCities: ['ai-city', 'climate-ridge', 'philosophy-ridge'],
    knowledgeTrails: ['trail-longevity-revolution']
  },
  {
    id: 'philosophy-ridge',
    name: 'Philosophy Highlands',
    continent: 'Philosophy',
    country: 'Epistemology Peak',
    coordinates: { lat: 37.9838, lng: 23.7275 }, // Athens
    glowColor: '#A855F7', // Violet
    description: 'The ancient elevated highlands pondering consciousness, ethics of artificial superintelligence, stoic resilience, and free will.',
    population: 680000,
    growthRate: '+22% this week',
    aiSummary: 'Philosophy Highlands anchors deep human reflection. Current discussions synthesize ancient Stoicism with digital mind uploading and post-human ethics.',
    experts: [
      { id: 'exp-15', name: 'Dr. David Chalmers', role: 'Consciousness Explorer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 22000, knowledgeScore: 28000, cityOwned: 'Qualia Sanctuary' }
    ],
    conversations: [
      {
        id: 'conv-10',
        title: 'The Hard Problem of Consciousness in synthetic minds: Subjective experience vs behavioral simulation',
        author: 'Julian Thorne',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Epistemologist',
        upvotes: 4190,
        repliesCount: 489,
        snippet: 'Can integrated information theory (IIT) quantify whether a 10-trillion parameter neural architecture possesses genuine phenomenological awareness?',
        tags: ['Consciousness', 'AI Ethics', 'Philosophy of Mind'],
        timestamp: '12h ago'
      }
    ],
    connectedCities: ['ai-city', 'history-highlands', 'design-harbor'],
    knowledgeTrails: ['trail-philosophy-of-ai']
  },
  {
    id: 'history-highlands',
    name: 'History Highlands',
    continent: 'Humanity',
    country: 'Chronos Archives',
    coordinates: { lat: 41.9028, lng: 12.4964 }, // Rome
    glowColor: '#F59E0B', // Amber Gold
    description: 'The timeless archives documenting ancient civilizations, technological revolutions, empires, and human endurance.',
    population: 810000,
    growthRate: '+19% this week',
    aiSummary: 'History Highlands preserves human memory. Landmark topics include the Bronze Age Collapse, Roman engineering, and the Printing Press impact.',
    experts: [
      { id: 'exp-16', name: 'Dan Carlin', role: 'Hardcore Historian', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', influenceRadiusKm: 34000, knowledgeScore: 39500, cityOwned: 'Great Sieges Citadel' }
    ],
    conversations: [
      {
        id: 'conv-11',
        title: 'How the Gutenberg Printing Press created the Scientific Revolution: Parallel lessons for Spatial AI',
        author: 'Cassandra Bell',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        creatorRank: 'Historical Cartographer',
        upvotes: 3540,
        repliesCount: 289,
        snippet: 'When information reproduction costs dropped by 10,000x in 1450, institutional control eroded and distributed peer knowledge flow exploded.',
        tags: ['History', 'Printing Press', 'Information Revolutions'],
        timestamp: '14h ago'
      }
    ],
    connectedCities: ['bitcoin-city', 'philosophy-ridge', 'space-observatory'],
    knowledgeTrails: ['trail-history-revolutions']
  }
];

export const KNOWLEDGE_TRAILS_DATA: KnowledgeTrail[] = [
  {
    id: 'trail-bitcoin-privacy',
    title: 'Bitcoin Privacy to Cryptographic History',
    subtitle: 'From sovereign hard money down to Alan Turing & mathematical foundations.',
    popularity: 98,
    durationMinutes: 14,
    color: '#F59E0B',
    steps: [
      { id: 'st-1', title: 'Bitcoin Privacy', cityName: 'Bitcoin City', description: 'Untraceable transactions via coinjoins, Lightning Network onion routing, and BitVM proofs.', category: 'Economics' },
      { id: 'st-2', title: 'Zero Knowledge Proofs', cityName: 'Bitcoin City', description: 'Mathematical proofs enabling verification of truth without disclosing underlying data.', category: 'Cryptography' },
      { id: 'st-3', title: 'Elliptic Curve Cryptography', cityName: 'Bitcoin City', description: 'The secp256k1 curve protecting billions in sovereign global value.', category: 'Math' },
      { id: 'st-4', title: 'Computer Science', cityName: 'Open Source Valley', description: 'Formal methods, algorithm complexity classes (P vs NP), and state machines.', category: 'Technology' },
      { id: 'st-5', title: 'Alan Turing & Enigma', cityName: 'History Highlands', description: 'The origins of programmable computation at Bletchley Park during WWII.', category: 'History' }
    ]
  },
  {
    id: 'trail-ai-evolution',
    title: 'The AI Supercycle: Perceptrons to Autonomous Agents',
    subtitle: 'Trace 70 years of neural network evolution to self-improving agentic systems.',
    popularity: 99,
    durationMinutes: 18,
    color: '#3B82F6',
    steps: [
      { id: 'st-6', title: 'Artificial Neural Networks', cityName: 'Artificial Intelligence City', description: 'Biological inspiration translated into matrix multiplication and activation functions.', category: 'AI' },
      { id: 'st-7', title: 'Backpropagation & GPUs', cityName: 'Artificial Intelligence City', description: 'NVIDIA CUDA acceleration enabling deep multilayer training at scale.', category: 'Hardware' },
      { id: 'st-8', title: 'Transformers & Self-Attention', cityName: 'Artificial Intelligence City', description: 'The 2017 landmark architecture that unlocked language, vision, and code understanding.', category: 'Architecture' },
      { id: 'st-9', title: 'Large Language Models (LLMs)', cityName: 'Artificial Intelligence City', description: 'Emergent reasoning abilities through pre-training on petabytes of human text.', category: 'LLM' },
      { id: 'st-10', title: 'Agentic Workflows & Multi-Agent Swarms', cityName: 'Artificial Intelligence City', description: 'Autonomous agents planning, coding, self-testing, and executing multi-step goals.', category: 'Autonomy' }
    ]
  },
  {
    id: 'trail-spatial-ui-design',
    title: 'Spatial Canvas UI & The Death of Feeds',
    subtitle: 'Why human cognition prefers spatial maps over endless 1D vertical scrolling.',
    popularity: 94,
    durationMinutes: 10,
    color: '#EC4899',
    steps: [
      { id: 'st-11', title: 'The Limits of Feeds', cityName: 'Design Harbor', description: 'Dopamine feedback loops in endless feeds cause information fatigue and memory loss.', category: 'UX' },
      { id: 'st-12', title: 'Method of Loci & Memory Palaces', cityName: 'Philosophy Highlands', description: 'Ancient Greek mnemonics proving humans retain spatial positions 10x better than lists.', category: 'Cognition' },
      { id: 'st-13', title: 'Tactile Spatial Interfaces', cityName: 'Design Harbor', description: ' visionOS, Apple Human Interface, and Arc Browser spatial organization.', category: 'Design' },
      { id: 'st-14', title: 'Atlas Cartography Engine', cityName: 'Design Harbor', description: 'Mapping ideas to geography, where topics become vibrant cities and trails become roads.', category: 'Atlas Vision' }
    ]
  }
];

export const CURRENT_CREATOR: CreatorProfileData = {
  name: 'Alex Rivera',
  handle: '@arivera_atlas',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
  rank: 'Master Knowledge Cartographer',
  regionsDiscovered: 142,
  ideasConnected: 890,
  communitiesBuilt: 12,
  influenceRadiusKm: 18450,
  knowledgeScore: 28450,
  bio: 'Exploring the intersections of Spatial UI, Agentic Artificial Intelligence, and Zero-Knowledge sovereign cryptography.',
  ownedCity: 'Deep Learning Heights (District in AI City)',
  timeline: [
    { year: '2026', event: 'Founded the Zero Knowledge Trail on Atlas', impact: 'Connected 45,000 explorers across 18 countries' },
    { year: '2025', event: 'Mapped Agentic Workflows Architecture', impact: 'Top voted essay in Artificial Intelligence City' },
    { year: '2024', event: 'Joined Atlas Private Beta', impact: 'Pioneered Spatial Essay publishing format' }
  ]
};

export const INVESTOR_SLIDES: InvestorSlide[] = [
  {
    id: 1,
    title: 'THE PARADIGM SHIFT',
    subtitle: 'The internet was never designed to be understood as a list.',
    badge: 'SLIDE 1 OF 6 • VISION',
    quote: '"People remember places better than lists. Atlas transforms knowledge into geography."',
    metrics: [
      { label: 'Feed Fatigue Rate', value: '78%', detail: 'Users experiencing information overload' },
      { label: 'Spatial Memory Lift', value: '3.4x', detail: 'Higher recall on spatial maps vs feeds' },
      { label: 'Target TAM', value: '$120B', detail: 'Search, social discovery & knowledge tools' }
    ],
    keyPoints: [
      'Today’s web is fragmented into feeds, timelines, and search lists.',
      'Atlas organizes knowledge spatially: ideas are continents, topics are cities, discussions are landmarks.',
      'A visual experience polished enough to stand alongside Apple Keynotes.'
    ],
    cameraFocus: { lat: 20, lng: 0, altitude: 2.8 }
  },
  {
    id: 2,
    title: 'THE ATLAS KNOWLEDGE MAP',
    subtitle: 'Infinite zoom from global continents down to single conversation nodes.',
    badge: 'SLIDE 2 OF 6 • PRODUCT DEMO',
    metrics: [
      { label: 'Mapped Cities', value: '10,000+', detail: 'Across 10 core Knowledge Continents' },
      { label: 'Interactive Latency', value: '<16ms', detail: '60 FPS WebGL 3D Spatial Canvas' },
      { label: 'Trail Connections', value: '1.2M', detail: 'Curated and AI-synthesized pathways' }
    ],
    keyPoints: [
      'Pinch to zoom infinitely with Google Earth fluidity.',
      'Glowing halos indicate live activity density, conversation velocity, and expert presence.',
      'Seamless transition between 3D Globe mode and 2D Topology Canvas.'
    ],
    cameraFocus: { lat: 37.7749, lng: -122.4194, altitude: 1.4 } // AI City
  },
  {
    id: 3,
    title: 'KNOWLEDGE TRAILS & DISCOVERY ENGINE',
    subtitle: 'Learn through effortless spatial exploration, not algorithmic rage-bait.',
    badge: 'SLIDE 3 OF 6 • DISCOVERY ENGINE',
    metrics: [
      { label: 'Avg Expedition Time', value: '24 min', detail: '3.5x higher engagement than traditional feeds' },
      { label: 'Cross-Domain Velocity', value: '+310%', detail: 'Exploration outside user filter bubble' }
    ],
    keyPoints: [
      'Glowing vector trails connect distant concepts (e.g. Bitcoin → ZK → Cryptography → Turing → History).',
      'The recommendation engine suggests expeditions rather than isolated clips.',
      'Users build visual knowledge paths that can be shared, bookmarked, and remixed.'
    ],
    cameraFocus: { lat: 64.1466, lng: -21.9426, altitude: 1.6 } // Bitcoin City
  },
  {
    id: 4,
    title: 'CREATOR WORLD & KNOWLEDGE ECONOMY',
    subtitle: 'Creators own locations that expand as their contribution grows.',
    badge: 'SLIDE 4 OF 6 • MONETIZATION & CREATORS',
    metrics: [
      { label: 'Influence Radius', value: 'Km² scale', detail: 'Determined by high-signal peer votes' },
      { label: 'Creator Retention', value: '91%', detail: '30-day cohort retention rate' },
      { label: 'Knowledge Score', value: 'Gamified', detail: 'Proof-of-Contribution reputation' }
    ],
    keyPoints: [
      'Instead of follower counts, creators hold Explorer Rank and Influence Radius on the map.',
      'Top creators mint and govern cities, attracting subscriptions and collaborative expeditions.',
      'Knowledge cartography creates long-term digital real estate value.'
    ],
    cameraFocus: { lat: 35.6762, lng: 139.6503, altitude: 1.5 } // Design Harbor
  },
  {
    id: 5,
    title: 'AI MUSEUM GUIDE INTEGRATION',
    subtitle: 'AI as an intelligent spatial docent rather than a generic text box.',
    badge: 'SLIDE 5 OF 6 • AI ARCHITECTURE',
    metrics: [
      { label: 'Powered By', value: 'Gemini 3.6', detail: 'Server-side structured spatial generation' },
      { label: 'Context Awareness', value: 'Topological', detail: 'Understands adjacent nodes & history' }
    ],
    keyPoints: [
      'Tap "Guide Me" on any region to get live audio/text walkthroughs, key takeaways, and opposing viewpoints.',
      'Ask natural language queries like "Show me the future of AI" to watch the map light up and fly to destination coordinates.',
      'Transforming passive reading into interactive guided discovery.'
    ],
    cameraFocus: { lat: 59.3293, lng: 18.0686, altitude: 1.5 } // Open Source Valley
  },
  {
    id: 6,
    title: 'THE FUTURE OF HUMAN KNOWLEDGE',
    subtitle: '"The future isn\'t another feed. It\'s a world waiting to be explored."',
    badge: 'SLIDE 6 OF 6 • ROADMAP & SEED ROUND',
    quote: 'Seeking $5M Seed Investment to build the Living Map of Human Knowledge.',
    metrics: [
      { label: 'Phase 1', value: 'Live Now', detail: 'Interactive 3D Knowledge Map' },
      { label: 'Phase 2', value: 'Q4 2026', detail: 'AI Discovery Engine & Live Audio Trails' },
      { label: 'Phase 3', value: 'Q2 2027', detail: 'Creator Worlds & Spatial Knowledge Protocol' }
    ],
    keyPoints: [
      'Production prototype ready for seed funding presentation.',
      'Immediate deployment capability with full-stack TypeScript + Three.js + Gemini AI.',
      'Join us in building the defining knowledge infrastructure of the next decade.'
    ],
    cameraFocus: { lat: 20, lng: 0, altitude: 2.5 }
  }
];
