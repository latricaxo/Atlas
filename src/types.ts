export type NavTab = 'world' | 'explore' | 'discover' | 'saved' | 'profile';
export type AppMode = 'landing' | 'app';

export type ContinentName = 
  | 'Technology' 
  | 'Humanity' 
  | 'Science' 
  | 'Business' 
  | 'Art' 
  | 'Health' 
  | 'Economics' 
  | 'Philosophy' 
  | 'Politics' 
  | 'Nature';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LandmarkConversation {
  id: string;
  title: string;
  author: string;
  avatar: string;
  creatorRank: string;
  upvotes: number;
  repliesCount: number;
  snippet: string;
  tags: string[];
  timestamp: string;
}

export interface CityExpert {
  id: string;
  name: string;
  role: string;
  avatar: string;
  influenceRadiusKm: number;
  knowledgeScore: number;
  cityOwned: string;
}

export interface KnowledgeCity {
  id: string;
  name: string;
  continent: ContinentName;
  country: string;
  coordinates: Coordinates;
  glowColor: string;
  description: string;
  population: number; // Explorers count
  growthRate: string; // e.g., "+34% this week"
  aiSummary: string;
  experts: CityExpert[];
  conversations: LandmarkConversation[];
  connectedCities: string[]; // City IDs
  knowledgeTrails: string[]; // Trail IDs
}

export interface KnowledgeTrailStep {
  id: string;
  title: string;
  cityName?: string;
  description: string;
  category: string;
  iconName?: string;
}

export interface KnowledgeTrail {
  id: string;
  title: string;
  subtitle: string;
  steps: KnowledgeTrailStep[];
  popularity: number;
  durationMinutes: number;
  color: string;
}

export interface CreatorProfileData {
  name: string;
  handle: string;
  avatar: string;
  rank: string;
  regionsDiscovered: number;
  ideasConnected: number;
  communitiesBuilt: number;
  influenceRadiusKm: number;
  knowledgeScore: number;
  bio: string;
  ownedCity: string;
  timeline: {
    year: string;
    event: string;
    impact: string;
  }[];
}

export interface AiGuideState {
  isOpen: boolean;
  activeContextRegion?: string;
  messages: {
    sender: 'user' | 'ai';
    text: string;
    keyTakeaways?: string[];
    suggestedNodes?: string[];
    opposingViewpoints?: string[];
    recommendedTrail?: string[];
    timestamp: string;
  }[];
  isLoading: boolean;
}

export interface InvestorSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  quote?: string;
  metrics?: { label: string; value: string; detail: string }[];
  keyPoints: string[];
  cameraFocus: { lat: number; lng: number; altitude: number };
}
