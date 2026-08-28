import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/processData';
import { soundFx } from '../utils/audio';
import { Check, Clock } from 'lucide-react';

interface ProcessSectionProps {
  onHoverState: (type: 'pointer' | 'explore') => void;
  onHoverLeave: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onHoverState,
  onHoverLeave,
}) => {
  return (
    <section id="process" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 07 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Sprint Execution Protocol
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          FROM CONCEPT{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            to live
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            PRODUCTION.
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          A clear 5-phase sprint. You know what happens, when it happens, and what you receive at each stage.
        </p>

        {/* Timeline Summary */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {[
            { phase: 'Discovery', time: 'Days 1–2' },
            { phase: 'Design', time: 'Days 3–5' },
            { phase: 'Build', time: 'Days 6–9' },
            { phase: 'Review', time: 'Days 10–11' },
            { phase: 'Launch', time: 'Days 12–14' },
          ].map((item, i) => (
            <React.Fragment key={item.phase}>
              <div className="text-center">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">{item.phase}</span>
                <span className="text-[11px] font-mono text-white font-medium">{item.time}</span>
              </div>
              {i < 4 && <span className="text-slate-600 text-xs">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3D Timeline Path */}
      <div className="relative">
        {/* Center Connecting Spine (Desktop) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10" />

        <div className="space-y-8 sm:space-y-12 md:space-y-16">
          {PROCESS_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => {
                  soundFx.playHover();
                  onHoverState('explore');
                }}
                onMouseLeave={onHoverLeave}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Step Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border border-white/20 items-center justify-center text-xs font-mono font-bold text-white z-20 shadow-md">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 md:px-10">
                  <div className="p-5 sm:p-7 rounded-2xl glass-panel hover:border-sky-500/40 transition-all duration-300 group">
                    {/* Step Banner */}
                    <div className="flex items-center justify-between mb-3 sm:mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="md:hidden w-6 h-6 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-[11px] font-mono font-bold text-sky-300">
                          {step.number}
                        </span>
                        <span className="text-[11px] font-mono text-sky-400 font-medium uppercase tracking-wider">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10">
                        <Clock className="w-3 h-3 text-sky-400" />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      {step.subtitle}
                    </p>

                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-300/70 font-sans leading-relaxed">
                      {step.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="mt-4 sm:mt-5 pt-4 border-t border-white/10 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
                        Milestone Deliverables:
                      </span>
                      {step.deliverables.map((del, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                          <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

