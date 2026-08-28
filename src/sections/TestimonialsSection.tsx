import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/processData';
import { soundFx } from '../utils/audio';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  onHoverState: (type: 'pointer' | 'explore') => void;
  onHoverLeave: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onHoverState,
  onHoverLeave,
}) => {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 08 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Project Outcomes
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          PROOF OF{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            real
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            IMPACT.
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          Every project is designed to achieve specific goals. Here is what our approach is built to deliver.
        </p>
      </div>

      {/* Floating Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
        {TESTIMONIALS_DATA.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onMouseEnter={() => {
              soundFx.playHover();
              onHoverState('explore');
            }}
            onMouseLeave={onHoverLeave}
            className="group relative p-6 sm:p-8 rounded-2xl glass-panel hover:border-sky-500/40 flex flex-col justify-between transition-all duration-300 overflow-hidden"
          >
            <div>
              {/* Top Row: Stars & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-slate-300">
                  {t.portfolioType}
                </span>
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg text-slate-200 font-serif italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Bottom Profile & Outcome Ribbon */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-display font-bold text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    {t.role} • <span className="text-slate-300">{t.company}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mb-0.5">Outcome</span>
                <span className="text-xs font-mono font-medium text-emerald-300 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {t.resultMetric}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
