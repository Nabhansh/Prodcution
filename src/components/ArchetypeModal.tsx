import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Archetype } from '../types';
import { soundFx } from '../utils/audio';
import { X, Sparkles, CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';

interface ArchetypeModalProps {
  archetype: Archetype | null;
  currency: 'INR' | 'USD';
  onClose: () => void;
  onSelectForConfigurator: (archetypeId: Archetype['id']) => void;
}

export const ArchetypeModal: React.FC<ArchetypeModalProps> = ({
  archetype,
  currency,
  onClose,
  onSelectForConfigurator,
}) => {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (archetype) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [archetype]);

  // Escape key closes modal
  React.useEffect(() => {
    if (!archetype) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [archetype, onClose]);

  if (!archetype) return null;

  const priceFormatted =
    currency === 'INR'
      ? `₹${archetype.basePriceINR.toLocaleString('en-IN')}`
      : `$${archetype.basePriceUSD}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl glass border border-blue-500/40 p-6 sm:p-8 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full glass hover:bg-white/15 border border-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-sky-400/30 text-sky-400 font-mono text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              {archetype.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.02] border border-white/10 text-slate-300 font-mono text-xs uppercase tracking-wider">
              Archetype Blueprint
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {archetype.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            {archetype.subtitle}
          </p>

          {/* Key Stat Banner */}
          <div className="mt-5 p-4 rounded-xl glass-panel border border-sky-400/20 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-mono font-medium">
              <Target className="w-4 h-4 text-sky-400" />
              <span>Proven Performance Metric:</span>
              <strong className="text-white text-sm font-semibold">{archetype.highlightStat}</strong>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Starts at <strong className="text-sky-400 text-sm">{priceFormatted}</strong>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mt-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {archetype.description}
          </div>

          {/* Core Feature Modules Included */}
          <div className="mt-6">
            <h4 className="text-xs font-mono tracking-wider uppercase text-slate-400 mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Bespoke Modules Built Into This Archetype:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {archetype.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 rounded-xl glass-panel text-xs font-mono text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup Preview Card */}
          <div className="mt-6 p-4 rounded-xl bg-[#020203] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">
              PREVIEW IDENTITY LAYOUT:
            </div>
            <div className="p-4 rounded-xl glass-panel border-white/10 flex flex-col gap-2">
              <div className="text-sm font-bold font-display text-white">
                {archetype.mockupPreview.headline}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {archetype.mockupPreview.subheadline}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {archetype.mockupPreview.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-sky-300 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                soundFx.playSelect();
                onSelectForConfigurator(archetype.id);
                onClose();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <span>Configure {archetype.title} in 3D</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Blueprint [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
