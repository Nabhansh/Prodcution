import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/audio';
import { StudioLogo } from './StudioLogo';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, Layers, Compass } from 'lucide-react';
import { Currency, ViewMode } from '../types';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currency: Currency;
  onCurrencyToggle: () => void;
  viewMode?: ViewMode;
  onViewModeToggle?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  currency,
  onCurrencyToggle,
  viewMode = 'cinema3d',
  onViewModeToggle,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'HOME' },
    { id: 'what-i-build', label: 'SERVICES' },
    { id: 'portfolio', label: 'WORK' },
    { id: 'before-after', label: 'COMPARE' },
    { id: 'configurator', label: 'STUDIO' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'process', label: 'PROCESS' },
    { id: 'testimonials', label: 'PROOF' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleSoundToggle = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleLinkClick = (id: string) => {
    soundFx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-2 sm:top-5 inset-x-0 z-40 flex justify-center px-2.5 sm:px-4 transition-all duration-300 pointer-events-none"
      >
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'glass-panel shadow-2xl bg-[#020204]/90 border border-sky-400/30'
              : 'glass-panel bg-[#020204]/75 border border-white/10'
          } max-w-6xl w-full backdrop-blur-xl`}
        >
          {/* Brand Logo - Studio Emblem */}
          <button
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <StudioLogo size="sm" />
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.18em] text-xs sm:text-sm text-white font-display group-hover:text-sky-400 transition-colors">
                AETHERIA
              </span>
              <span className="text-[8px] font-mono text-slate-400 tracking-widest hidden sm:inline">
                SPATIAL WEB STUDIO
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`relative px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Controls Suite */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* View Mode Toggle (3D / Quick) */}
            {onViewModeToggle && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onViewModeToggle();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Toggle 3D or Quick Mode"
              >
                {viewMode === 'cinema3d' ? (
                  <>
                    <Compass className="w-3 h-3 text-sky-400" />
                    <span>3D JOURNEY</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-3 h-3 text-emerald-400" />
                    <span>QUICK MODE</span>
                  </>
                )}
              </button>
            )}

            {/* Currency Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                onCurrencyToggle();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              title="Switch Currency (INR / USD / EUR)"
            >
              <span className="text-sky-400 font-bold">
                {currency === 'INR' ? '₹ INR' : currency === 'USD' ? '$ USD' : '€ EUR'}
              </span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-1.5 sm:p-2 rounded-full border transition-colors cursor-pointer flex items-center justify-center ${
                isMuted
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  : 'bg-white/[0.04] border-white/10 text-sky-400 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Solid White CTA Button */}
            <button
              onClick={() => handleLinkClick('configurator')}
              onMouseEnter={() => soundFx.playHover()}
              className="hidden sm:flex items-center gap-1.5 bg-white text-slate-950 px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-sky-400 transition-all shadow-md cursor-pointer"
            >
              <span>Build Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-1.5 sm:p-2 rounded-full glass border border-white/10 text-slate-400 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-30 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 sm:inset-x-4 top-16 sm:top-20 z-40 lg:hidden p-4 sm:p-5 rounded-2xl glass-panel bg-[#020204]/95 border border-sky-400/30 shadow-2xl backdrop-blur-2xl flex flex-col gap-3.5 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <span className="text-xs font-mono text-sky-400 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  AETHERIA // NAVIGATION
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onCurrencyToggle();
                    }}
                    className="text-xs font-mono text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10"
                  >
                    <strong className="text-sky-400">{currency}</strong>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-mono text-left tracking-wider transition-all flex items-center justify-between ${
                      activeSection === link.id
                        ? 'bg-sky-500/15 text-white border border-sky-400/40 font-bold'
                        : 'bg-white/[0.03] text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                  </button>
                ))}
              </div>

              {onViewModeToggle && (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onViewModeToggle();
                  }}
                  className="w-full min-h-[44px] py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  <span>Switch Mode: {viewMode === 'cinema3d' ? 'Explore 3D (Active)' : 'Quick Flat (Active)'}</span>
                </button>
              )}

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => handleLinkClick('configurator')}
                  className="w-full min-h-[48px] py-3 rounded-full bg-white text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:bg-sky-400 transition-colors cursor-pointer"
                >
                  <span>Launch 3D Configurator</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
