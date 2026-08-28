import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProject } from '../types';
import { soundFx } from '../utils/audio';
import { X, Sparkles, CheckCircle2, Layers, TrendingUp, Cpu, Flame, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectArchetype: (archetypeId: PortfolioProject['archetypeId']) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectArchetype,
}) => {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (project) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [project]);

  // Escape key closes modal
  React.useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        {/* Backdrop Click */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl glass-panel bg-[#03060f]/95 border border-sky-400/30 p-5 sm:p-8 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full glass hover:bg-white/15 border border-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-300 font-mono text-xs uppercase tracking-wider">
              Role: {project.clientRole}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-semibold">
              ● STUDIO CONCEPT PROTOTYPE
            </span>
          </div>

          {/* Title & Description */}
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            {project.description}
          </p>

          {/* Live Preview Viewport */}
          <div className="mt-5 rounded-xl border border-white/10 bg-black/60 p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-300 font-medium">{project.previewDetails.heroTitle}</span>
              </div>
              <span className="text-sky-400 font-medium uppercase text-[11px]">{project.previewDetails.status}</span>
            </div>
            <div className="py-4 text-xs font-mono text-slate-400">
              {project.previewDetails.subtitle}
            </div>
          </div>

          {/* Key Outcome Metrics Strip */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {project.theResult.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl glass-panel bg-white/[0.02] border border-white/5 flex flex-col items-center text-center"
              >
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {m.label}
                </span>
                <span className="text-lg sm:text-xl font-mono font-bold text-emerald-400">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* 4-Step Case Study Deep Dive (Problem -> Approach -> The Build -> The Result) */}
          <div className="mt-6 space-y-3.5">
            {/* 1. Problem */}
            <div className="p-4 sm:p-5 rounded-xl bg-rose-950/15 border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-300 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>The Problem & Friction</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-2">
                {project.problem.summary}
              </p>
              {project.problem.painPoints && (
                <ul className="space-y-1 text-xs font-mono text-slate-400 list-disc list-inside">
                  {project.problem.painPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. Approach */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-950/15 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>The Architectural Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-2">
                {project.approach.summary}
              </p>
              {project.approach.designDecisions && (
                <ul className="space-y-1 text-xs font-mono text-slate-400 list-disc list-inside">
                  {project.approach.designDecisions.map((dec, i) => (
                    <li key={i}>{dec}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. The Build */}
            <div className="p-4 sm:p-5 rounded-xl bg-sky-950/15 border border-sky-500/20">
              <div className="flex items-center gap-2 text-sky-300 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>The WebGL & Full-Stack Build</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.theBuild.summary}
              </p>
              <div className="mt-2.5 flex items-center gap-4 text-xs font-mono text-sky-300">
                <span>FPS: {project.theBuild.fpsTarget}</span>
                <span>Lighthouse Score: {project.theBuild.performanceScore}/100</span>
              </div>
            </div>

            {/* 4. The Result */}
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>The Concrete Result</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.theResult.summary}
              </p>
            </div>
          </div>

          {/* Before vs After State Comparison Strip */}
          {project.beforeState && project.afterState && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                <span className="text-[10px] uppercase text-rose-400 font-bold block mb-1">
                  BEFORE: {project.beforeState.title}
                </span>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  {project.beforeState.flaws.map((flaw, i) => (
                    <li key={i}>{flaw}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-400/30 text-xs font-mono">
                <span className="text-[10px] uppercase text-emerald-400 font-bold block mb-1">
                  AFTER: {project.afterState.title}
                </span>
                <ul className="space-y-1 text-slate-200 list-disc list-inside">
                  {project.afterState.upgrades.map((upg, i) => (
                    <li key={i}>{upg}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-slate-400 mr-2">TECH ARTIFACTS:</span>
            {project.theBuild.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Modal Footer Actions */}
          <div className="mt-7 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                soundFx.playSelect();
                onSelectArchetype(project.archetypeId);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <span>Build Similar {project.category}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer tracking-wider"
            >
              Close Case Study [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
