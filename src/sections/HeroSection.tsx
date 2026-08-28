import React from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';
import { ArrowUpRight, ArrowRight, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onBuildClick: () => void;
  onExploreClick: () => void;
  onHoverState: (type: 'pointer' | 'explore' | 'build') => void;
  onHoverLeave: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBuildClick,
  onExploreClick,
  onHoverState,
  onHoverLeave,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center z-10">
        {/* Left Column: Core Narrative & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Section Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4 sm:mb-6"
          >
            <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
              ( 01 )
            </span>
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-white/60 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
              Custom Portfolio Websites for Ambitious Professionals
            </span>
          </motion.div>

          {/* Large Iconic Headline with Editorial Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] font-display font-bold leading-[1.0] sm:leading-[0.95] mb-6 sm:mb-8 tracking-tight text-white uppercase"
          >
            YOUR WORK
            <br />
            DESERVES
            <br />
            <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
              more than a
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
              TEMPLATE.
            </span>
          </motion.h1>

          {/* Supporting Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-sm sm:text-base md:text-lg text-slate-300/80 max-w-xl leading-relaxed mb-8 sm:mb-10 font-sans"
          >
            I build custom portfolio websites for students, developers, designers, creators, and founders.
            Every site is hand-coded around your goals — no templates, no generic layouts, just a digital
            identity that makes recruiters, clients, and collaborators pay attention.
          </motion.p>

          {/* Action Controls & Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto"
          >
            {/* Primary Build CTA */}
            <button
              onClick={() => {
                soundFx.playSelect();
                onBuildClick();
              }}
              onMouseEnter={() => {
                soundFx.playHover();
                onHoverState('build');
              }}
              onMouseLeave={onHoverLeave}
              className="min-h-[48px] px-7 py-3.5 sm:py-4 bg-white text-slate-950 font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-3 group hover:bg-sky-400 hover:text-black transition-all rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              <span>Build My Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Explore CTA */}
            <button
              onClick={() => {
                soundFx.playClick();
                onExploreClick();
              }}
              onMouseEnter={() => {
                soundFx.playHover();
                onHoverState('explore');
              }}
              onMouseLeave={onHoverLeave}
              className="min-h-[48px] px-7 py-3.5 sm:py-4 glass-panel border border-white/15 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-3 group hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer text-white"
            >
              <span>Explore Works</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Availability Indicator */}
            <div className="flex items-center gap-3 pl-1 sm:pl-4 sm:border-l sm:border-white/10 py-1 justify-center sm:justify-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                  Commission Status
                </span>
                <span className="text-xs font-mono text-white font-medium">
                  2 Slots Open This Month
                </span>
              </div>
            </div>
          </motion.div>

          {/* Value Proposition Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: '100% Custom', desc: 'No templates, every site is unique' },
              { label: 'Interactive', desc: 'Real-time 3D & WebGL experiences' },
              { label: 'Responsive', desc: 'Optimized for every device' },
              { label: 'Personalized', desc: 'Built around your goals' },
            ].map((item) => (
              <div key={item.label} className="text-left">
                <span className="text-[11px] font-mono font-semibold text-white block">{item.label}</span>
                <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Floating Interactive Studio Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md glass-panel p-6 sm:p-7 rounded-2xl flex flex-col relative overflow-hidden">
            {/* Header / Engine status */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-white/70 tracking-wider">STUDIO ENGINE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  REALTIME 3D
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-sky-400/80" />
              </div>
            </div>

            {/* Archetype Quick Selector */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2.5 font-mono">
                  Select Archetype
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-3.5 py-2.5 rounded-lg border border-sky-500/50 bg-sky-500/10 text-xs tracking-wide font-mono font-medium text-sky-200 flex items-center justify-between">
                    <span>Developer</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-lg border border-white/10 text-xs tracking-wide font-mono text-slate-400 hover:border-white/20 transition-colors">
                    Designer
                  </div>
                  <div className="px-3.5 py-2.5 rounded-lg border border-white/10 text-xs tracking-wide font-mono text-slate-400 hover:border-white/20 transition-colors">
                    Founder
                  </div>
                  <div className="px-3.5 py-2.5 rounded-lg border border-white/10 text-xs tracking-wide font-mono text-slate-400 hover:border-white/20 transition-colors">
                    Creator
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-mono">
                  Atmosphere
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                  <span className="text-xs font-mono text-slate-200">Cyberpunk Volumetric Fog</span>
                  <span className="text-[10px] font-mono text-sky-400">ACTIVE</span>
                </div>
              </div>

              {/* Hardware stats */}
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Render Pipeline:</span>
                  <span className="text-emerald-400">Adaptive WebGL 2.0</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Interactive Audio:</span>
                  <span className="text-sky-300">Web Audio API Synth</span>
                </div>
              </div>
            </div>

            {/* Launch Configurator Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  soundFx.playSelect();
                  onBuildClick();
                }}
                className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Launch 3D Configurator</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-slate-400 cursor-pointer pointer-events-auto"
        onClick={onExploreClick}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Explore Experience</span>
        <div className="w-4 h-6 border border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1 h-1.5 bg-sky-400 rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

