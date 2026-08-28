import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';
import { Sparkles, MoveHorizontal, XCircle, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

interface BeforeAfterSectionProps {
  onHoverState: (type: 'drag' | 'pointer') => void;
  onHoverLeave: () => void;
  onCtaClick: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onHoverState,
  onHoverLeave,
  onCtaClick,
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    soundFx.playHover();
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 04 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Why Custom Matters
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          STATIC TEMPLATES{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            versus
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            BESPOKE IDENTITY.
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          Drag the slider to see the difference between a generic template and a custom-built portfolio designed around you.
        </p>
      </div>

      {/* Interactive Draggable Split Viewport */}
      <div
        ref={containerRef}
        onMouseDown={() => {
          setIsDragging(true);
          soundFx.playHover();
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => {
          setIsDragging(false);
          onHoverLeave();
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => onHoverState('drag')}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 2));
          if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 2));
        }}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full max-w-5xl mx-auto min-h-[480px] sm:min-h-[520px] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl select-none cursor-ew-resize"
      >
        {/* RIGHT SIDE: PREMIUM 3D IDENTITY (FULL WIDTH BASE) */}
        <div className="absolute inset-0 bg-[#080a10] p-5 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Label */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs font-semibold tracking-wider">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              BESPOKE 3D IDENTITY
            </div>
            <span className="text-xs font-mono text-emerald-300 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 hidden sm:inline">
              High Impact Digital Presence
            </span>
          </div>

          {/* Main Visual Presentation */}
          <div className="z-10 max-w-lg ml-auto text-right">
            <div className="text-[11px] font-mono text-sky-400 tracking-wider uppercase mb-1.5">
              Built Around You
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
              YOUR DIGITAL IDENTITY
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-300/70 font-sans leading-relaxed">
              Custom design, interactive elements, real-time 3D, and personal storytelling — all working together to make your work stand out.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Architecture</span>
                <span className="text-base font-mono font-bold text-sky-300">100% Custom</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Engine</span>
                <span className="text-base font-mono font-bold text-emerald-400">Adaptive WebGL</span>
              </div>
            </div>
          </div>

          {/* Bottom Badges */}
          <div className="flex items-center justify-end gap-2 z-10">
            {['WebGL 2.0', 'Custom Shaders', 'Audio Synths', 'Performance Optimized'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* LEFT SIDE: BORING TEMPLATE (CLIPPED BY SLIDER) */}
        <div
          className="absolute inset-y-0 left-0 bg-[#0d0e12] p-6 sm:p-10 flex flex-col justify-between overflow-hidden border-r border-white/20"
          style={{ width: `${sliderPos}%` }}
        >
          {/* Top Label */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 font-mono text-xs font-semibold tracking-wider">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              GENERIC TEMPLATE
            </div>
            <span className="text-xs font-mono text-rose-400 font-medium bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/20 hidden sm:inline">
              Generic & Forgettable
            </span>
          </div>

          {/* Boring Template Content */}
          <div className="z-10 max-w-md">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
              Same As Everyone Else
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-slate-500 line-through decoration-rose-500/60 leading-tight">
              GENERIC TEMPLATE
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
              Same structure as every other portfolio. No personality, no interaction, no reason for anyone to remember you.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Layout</span>
                <span className="text-base font-mono font-bold text-rose-400">Static & Flat</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Visual Impact</span>
                <span className="text-base font-mono font-bold text-slate-500">Minimal</span>
              </div>
            </div>
          </div>

          {/* Bottom Boring Tags */}
          <div className="flex items-center gap-2 z-10">
            {['No 3D', 'Static 2D', 'Zero Audio', 'Generic Layout'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-black/40 border border-white/5 text-[10px] font-mono text-slate-600 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* DRAGGABLE SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Vertical Line */}
          <div className="w-[2px] h-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />

          {/* Handle Knob */}
          <div className="absolute w-10 h-10 rounded-full bg-slate-950 border border-white/40 shadow-lg flex items-center justify-center text-white">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Conversion Banner Below Slider */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            soundFx.playSelect();
            onCtaClick();
          }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-xs tracking-widest uppercase hover:bg-sky-400 hover:text-black transition-all cursor-pointer shadow-md"
        >
          <span>Upgrade to a 3D Identity</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
