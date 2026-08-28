export type ArchetypeId = 'student' | 'developer' | 'designer' | 'creator' | 'professional' | 'founder';

export type StyleId = 'minimal' | 'luxury' | 'futuristic' | 'bold' | 'creative' | 'dark' | 'editorial' | 'spatial3d' | 'brutalist' | 'cyber';

export type PerformanceTier = 'high' | 'medium' | 'low';

export type ViewMode = 'cinema3d' | 'quick';

export type Currency = 'INR' | 'USD' | 'EUR';

export interface Archetype {
  id: ArchetypeId;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  features: string[];
  recommendedStyle: StyleId;
  basePriceINR: number;
  basePriceUSD: number;
  basePriceEUR: number;
  highlightStat: string;
  mockupPreview: {
    accentColor: string;
    headline: string;
    subheadline: string;
    tags: string[];
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  archetypeId: ArchetypeId;
  clientRole: string;
  tagline: string;
  description: string;
  isConceptProject?: boolean;
  problem: {
    summary: string;
    painPoints: string[];
  };
  approach: {
    summary: string;
    designDecisions: string[];
  };
  theBuild: {
    summary: string;
    techStack: string[];
    performanceScore: number;
    fpsTarget: string;
  };
  theResult: {
    summary: string;
    metrics: {
      label: string;
      value: string;
    }[];
  };
  featured: boolean;
  accentColor: string;
  previewType: 'terminal' | 'canvas3d' | 'editorial' | 'glassmorphism' | 'bento';
  previewDetails: {
    heroTitle: string;
    subtitle: string;
    status: string;
    liveUrl?: string;
    clientName?: string;
  };
  beforeState: {
    title: string;
    flaws: string[];
  };
  afterState: {
    title: string;
    upgrades: string[];
  };
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceINR: number;
  priceUSD: number;
  priceEUR: number;
  turnaround: string;
  description: string;
  idealFor: string;
  deliverables: string[];
  featuresIncluded: string[];
  geometryShape: 'octahedron' | 'icosahedron' | 'torusKnot';
  color: string;
}

export interface AddonItem {
  id: string;
  name: string;
  category: '3d' | 'ai' | 'infra' | 'marketing' | 'design';
  priceINR: number;
  priceUSD: number;
  priceEUR: number;
  description: string;
  popular?: boolean;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  deliverables: string[];
  deliverableBadge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  portfolioType: string;
  resultMetric: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'timeline' | 'process' | 'tech';
}

export interface ConfiguratorState {
  archetype: ArchetypeId;
  style: StyleId;
  selectedAddons: string[];
  tierId: string;
  customRequirements: string;
}

export interface OrderInquiry {
  name: string;
  email: string;
  whatsapp: string;
  profession: string;
  portfolioType: ArchetypeId;
  tier: string;
  style: StyleId;
  selectedAddons: string[];
  budget: string;
  deadline: string;
  existingWebsite?: string;
  requirements: string;
}

