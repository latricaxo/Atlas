import React, { useState } from 'react';
import { AppMode, NavTab, KnowledgeCity, KnowledgeTrail } from './types';
import { CITIES_DATA, KNOWLEDGE_TRAILS_DATA } from './data/atlasData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { WorldView } from './components/views/WorldView';
import { ExploreView } from './components/views/ExploreView';
import { DiscoverView } from './components/views/DiscoverView';
import { SavedView } from './components/views/SavedView';
import { ProfileView } from './components/views/ProfileView';
import { CityDetailDrawer } from './components/CityDetailDrawer';
import { AiGuideDrawer } from './components/AiGuideDrawer';
import { InvestorTourModal } from './components/InvestorTourModal';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('app');
  const [activeTab, setActiveTab] = useState<NavTab>('world');
  const [selectedCity, setSelectedCity] = useState<KnowledgeCity | null>(null);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState(false);
  const [isInvestorTourOpen, setIsInvestorTourOpen] = useState(false);
  const [targetFocus, setTargetFocus] = useState<{ lat: number; lng: number; altitude?: number; timestamp?: number } | null>(null);

  // Search Handler
  const handleSearch = async (queryText: string) => {
    // Check local dataset first
    const lower = queryText.toLowerCase();
    const localMatch = CITIES_DATA.find(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.description.toLowerCase().includes(lower) ||
        c.continent.toLowerCase().includes(lower)
    );

    if (localMatch) {
      setSelectedCity(localMatch);
      setTargetFocus({ lat: localMatch.coordinates.lat, lng: localMatch.coordinates.lng, timestamp: Date.now() });
      setAppMode('app');
      setActiveTab('world');
      return;
    }

    // Call server AI search if not matching local exact
    try {
      const res = await fetch('/api/spatial-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });
      const data = await res.json();
      if (data.coordinates) {
        setTargetFocus({ lat: data.coordinates.lat, lng: data.coordinates.lng, timestamp: Date.now() });
        setAppMode('app');
        setActiveTab('world');
      }
    } catch (e) {
      console.error('Search error:', e);
    }
  };

  const handleSelectCity = (city: KnowledgeCity) => {
    setSelectedCity(city);
    setTargetFocus({ lat: city.coordinates.lat, lng: city.coordinates.lng, timestamp: Date.now() });
  };

  const handleFlyToCoordinates = (lat: number, lng: number) => {
    setTargetFocus({ lat, lng, timestamp: Date.now() });
    setAppMode('app');
    setActiveTab('world');
  };

  const handleSelectTrail = (trail: KnowledgeTrail) => {
    setActiveTab('discover');
  };

  const handleNavigateToCityByName = (cityName: string) => {
    const city = CITIES_DATA.find((c) => c.name.toLowerCase().includes(cityName.toLowerCase()));
    if (city) {
      handleSelectCity(city);
      setAppMode('app');
      setActiveTab('world');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        appMode={appMode}
        setAppMode={setAppMode}
        onSearch={handleSearch}
        onOpenAiGuide={() => setIsAiGuideOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 pb-24">
        {appMode === 'landing' ? (
          <LandingPage
            onExploreClick={() => {
              setAppMode('app');
              setActiveTab('world');
            }}
            onOpenInvestorTour={() => setIsInvestorTourOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'world' && (
              <WorldView
                selectedCity={selectedCity}
                onSelectCity={handleSelectCity}
                targetFocus={targetFocus}
                onOpenAiGuide={(region) => setIsAiGuideOpen(true)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'explore' && (
              <ExploreView
                onSelectCity={handleSelectCity}
                onSelectTrail={handleSelectTrail}
                onOpenAiGuide={() => setIsAiGuideOpen(true)}
              />
            )}

            {activeTab === 'discover' && (
              <DiscoverView
                onNavigateToCity={handleSelectCity}
              />
            )}

            {activeTab === 'saved' && (
              <SavedView
                onSelectCity={handleSelectCity}
                onSelectTrail={handleSelectTrail}
              />
            )}

            {activeTab === 'profile' && <ProfileView />}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      {appMode === 'app' && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Side City Details Drawer */}
      <CityDetailDrawer
        city={selectedCity}
        onClose={() => setSelectedCity(null)}
        onFlyTo={handleFlyToCoordinates}
        onAskAi={(cityName) => {
          setIsAiGuideOpen(true);
        }}
      />

      {/* Floating AI Guide Drawer */}
      <AiGuideDrawer
        isOpen={isAiGuideOpen}
        onClose={() => setIsAiGuideOpen(false)}
        activeRegion={selectedCity?.name || 'Global Atlas Map'}
        onNavigateToCityByName={handleNavigateToCityByName}
      />

      {/* Presentation Tour Modal */}
      <InvestorTourModal
        isOpen={isInvestorTourOpen}
        onClose={() => setIsInvestorTourOpen(false)}
        onFlyToCoordinates={handleFlyToCoordinates}
      />
    </div>
  );
}
