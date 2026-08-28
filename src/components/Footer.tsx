import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { StudioLogo } from './StudioLogo';
import { soundFx } from '../utils/audio';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
      setLocalTime(`${timeStr} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-50 border-t border-white/5 bg-[#020203] text-white">
      {/* Immersive HUD Status Bar */}
      <div className="px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 sm:gap-12 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5 font-mono">
              Core Engine
            </span>
            <span className="text-xs font-mono text-white font-medium">
              WebGL 2.0 / Three.js
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5 font-mono">
              Viewport Pipeline
            </span>
            <span className="text-xs font-mono text-emerald-400 font-medium">
              Adaptive Dynamic Range
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5 font-mono">
              System Time
            </span>
            <span className="text-xs font-mono text-sky-400">
              {localTime || 'LIVE SYNC'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono hidden sm:inline">
            Scroll to navigate 3D space
          </span>
          <div className="w-4 h-7 border border-white/20 rounded-full flex justify-center p-0.5">
            <div className="w-1 h-1.5 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Main Footer Links & Branding */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-2">
            <StudioLogo size="md" />
            <span className="font-bold tracking-[0.2em] text-sm text-white font-display">
              {SITE_CONFIG.brandName}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            {SITE_CONFIG.hero.subheadline}
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          {['hero', 'what-i-build', 'portfolio', 'configurator', 'pricing', 'process', 'faq', 'contact'].map((id) => (
            <button
              key={id}
              onClick={() => {
                soundFx.playClick();
                onNavigate(id);
              }}
              className="hover:text-white transition-colors capitalize cursor-pointer"
            >
              {id.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/[0.04] hover:bg-white hover:text-slate-950 border border-white/10 text-slate-300 transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
            title="Back to Top"
          >
            <span className="text-[10px] font-medium tracking-wider">TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center">
        <span>© {new Date().getFullYear()} {SITE_CONFIG.brandName} Studio. All rights reserved.</span>
        <span className="text-slate-400">
          Bespoke 3D & WebGL Engineering
        </span>
      </div>
    </footer>
  );
};

