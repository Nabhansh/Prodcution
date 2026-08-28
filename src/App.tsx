import React, { useState, useEffect } from 'react';
import { StudioCanvas } from './three/StudioCanvas';
import { CustomCursor } from './components/CustomCursor';
import { CinematicLoader } from './components/CinematicLoader';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { WhatIBuildSection } from './sections/WhatIBuildSection';
import { PortfolioGallerySection } from './sections/PortfolioGallerySection';
import { BeforeAfterSection } from './sections/BeforeAfterSection';
import { ConfiguratorSection } from './sections/ConfiguratorSection';
import { PricingSection } from './sections/PricingSection';
import { ProcessSection } from './sections/ProcessSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { FAQSection } from './sections/FAQSection';
import { FinalCTASection } from './sections/FinalCTASection';
import { ContactOrderSection } from './sections/ContactOrderSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ArchetypeModal } from './components/ArchetypeModal';
import { PortfolioProject, Archetype, ConfiguratorState, PricingTier, ArchetypeId, PerformanceTier } from './types';
import { ARCHETYPES } from './data/archetypesData';
import { detectPerformanceTier } from './utils/performance';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('high');
  const [cursorType, setCursorType] = useState<
    'default' | 'pointer' | 'view' | 'drag' | 'explore' | 'build'
  >('default');

  // Detect Performance Tier dynamically
  useEffect(() => {
    const tier = detectPerformanceTier();
    setPerformanceTier(tier);

    const handleResize = () => {
      setPerformanceTier(detectPerformanceTier());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Currency State (INR / USD)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Configurator Global State
  const [config, setConfig] = useState<ConfiguratorState>({
    archetype: 'developer',
    style: 'futuristic',
    selectedAddons: ['custom-domain', 'seo-engine'],
    tierId: 'pro',
  });

  // Modal States
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);

  // Smooth scroll observer to update 3D Canvas camera scene
  useEffect(() => {
    const sectionIds = [
      'hero',
      'what-i-build',
      'portfolio',
      'before-after',
      'configurator',
      'pricing',
      'process',
      'testimonials',
      'faq',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.3, 0.6],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCurrencyToggle = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const handleUpdateConfig = (newConfig: Partial<ConfiguratorState>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleRequestBuild = (configuredState: ConfiguratorState) => {
    setConfig(configuredState);
    handleNavigate('contact');
  };

  const handleSelectTierFromPricing = (tier: PricingTier) => {
    setConfig((prev) => ({
      ...prev,
      tierId: tier.id,
    }));
    handleNavigate('contact');
  };

  const handleSelectArchetypeForConfig = (archetypeId: ArchetypeId) => {
    const arch = ARCHETYPES.find((a) => a.id === archetypeId);
    setConfig((prev) => ({
      ...prev,
      archetype: archetypeId,
      style: arch ? arch.recommendedStyle : prev.style,
    }));
    handleNavigate('configurator');
  };

  return (
    <div className="relative min-h-screen bg-[#020203] text-white selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans">
      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-sky-500 focus:text-slate-950 focus:font-bold focus:rounded-lg focus:text-sm focus:outline-none focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Immersive UI Ambient Lighting & Grid Layer */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Interactive Custom 3D Cursor */}
      <CustomCursor cursorType={cursorType} />

      {/* Branded Cinematic Loader */}
      {loading && (
        <CinematicLoader
          onEnter={() => setLoading(false)}
          onComplete={() => setLoading(false)}
        />
      )}

      {/* Global 3D WebGL Three.js Background Canvas */}
      <StudioCanvas
        currentSection={activeSection}
        configuratorStyle={config.style}
        performanceTier={performanceTier}
      />

      {/* Navigation HUD */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyToggle={handleCurrencyToggle}
      />

      {/* Main Content Sections Layer */}
      <main id="main-content" className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onBuildClick={() => handleNavigate('configurator')}
          onExploreClick={() => handleNavigate('what-i-build')}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 2. What I Build / Archetypes Section */}
        <WhatIBuildSection
          onSelectArchetype={(arch) => setSelectedArchetype(arch)}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
          currency={currency}
        />

        {/* 3. Portfolio Work Section */}
        <PortfolioGallerySection
          onSelectProject={(proj) => setSelectedProject(proj)}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 4. Before vs After Visual Transformation */}
        <BeforeAfterSection
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
          onCtaClick={() => handleNavigate('configurator')}
        />

        {/* 5. 3D Studio Configurator & Dynamic Price Calculator */}
        <ConfiguratorSection
          config={config}
          onChangeConfig={handleUpdateConfig}
          onRequestBuild={handleRequestBuild}
          currency={currency}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
          performanceTier={performanceTier}
        />

        {/* 6. Pricing Structures & Addons */}
        <PricingSection
          onSelectTier={handleSelectTierFromPricing}
          currency={currency}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 7. Precision 5-Phase Process */}
        <ProcessSection
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 8. Testimonials & Outcomes */}
        <TestimonialsSection
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 9. Interactive FAQ */}
        <FAQSection
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 10. Final Converging 3D CTA */}
        <FinalCTASection
          onBuildClick={() => handleNavigate('configurator')}
          onContactClick={() => handleNavigate('contact')}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />

        {/* 11. Contact & Order Inquiry System */}
        <ContactOrderSection
          config={config}
          currency={currency}
          onHoverState={(type) => setCursorType(type)}
          onHoverLeave={() => setCursorType('default')}
        />
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden p-3 bg-[#020204]/95 backdrop-blur-xl border-t border-white/10">
        <button
          onClick={() => handleNavigate('configurator')}
          className="w-full py-3.5 bg-white text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          Build My Portfolio
          <span className="text-sky-600">→</span>
        </button>
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectArchetype={handleSelectArchetypeForConfig}
      />

      {/* Archetype Blueprint Modal */}
      <ArchetypeModal
        archetype={selectedArchetype}
        currency={currency}
        onClose={() => setSelectedArchetype(null)}
        onSelectForConfigurator={handleSelectArchetypeForConfig}
      />
    </div>
  );
}

