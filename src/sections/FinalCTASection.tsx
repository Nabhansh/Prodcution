import React from 'react';
import { soundFx } from '../utils/audio';
import { ArrowRight, MessageSquareCode, ShieldCheck, Clock, Flame } from 'lucide-react';

interface FinalCTASectionProps {
  onBuildClick: () => void;
  onContactClick: () => void;
  onHoverState: (type: 'build' | 'pointer') => void;
  onHoverLeave: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onBuildClick,
  onContactClick,
  onHoverState,
  onHoverLeave,
}) => {
  return (
    <section id="final-cta" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto z-10 text-center">
      <div className="relative rounded-3xl glass-panel p-6 sm:p-14 md:p-20 shadow-2xl overflow-hidden border border-white/10">
        {/* Subtle radial glow accent */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Phase tag */}
        <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 10 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Sprint Commencement
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-tight max-w-3xl mx-auto">
          READY TO BUILD SOMETHING{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            unforgettable?
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto font-normal leading-relaxed">
          Your portfolio shouldn&apos;t look like another cookie-cutter template. It should be a definitive statement that makes people want to work with you.
        </p>

        {/* Dual Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
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
            className="w-full sm:w-auto min-h-[48px] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg"
          >
            <span>Launch 3D Configurator</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onContactClick();
            }}
            onMouseEnter={() => {
              soundFx.playHover();
              onHoverState('pointer');
            }}
            onMouseLeave={onHoverLeave}
            className="w-full sm:w-auto min-h-[48px] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <MessageSquareCode className="w-4 h-4 text-sky-400" />
            <span>Direct WhatsApp Inquiry</span>
          </button>
        </div>

        {/* Not Sure? Path */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <p className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">Not sure what you need?</p>
          <button
            onClick={() => {
              soundFx.playClick();
              onContactClick();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            Help Me Choose →
          </button>
        </div>

        {/* Guarantee Seal */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            100% Quality Architecture
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            7–14 Day Delivery Sprint
          </span>
          <span className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            Now Accepting New Projects
          </span>
        </div>
      </div>
    </section>
  );
};
