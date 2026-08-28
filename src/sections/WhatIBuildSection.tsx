import React from 'react';
import { motion } from 'motion/react';
import { ARCHETYPES } from '../data/archetypesData';
import { Archetype } from '../types';
import { soundFx } from '../utils/audio';
import { ArrowRight, Code2, Palette, Video, GraduationCap, Briefcase, Crown, Check } from 'lucide-react';

interface WhatIBuildSectionProps {
  onSelectArchetype: (archetype: Archetype) => void;
  onHoverState: (type: 'pointer' | 'explore') => void;
  onHoverLeave: () => void;
  currency: 'INR' | 'USD';
}

const archetypeIcons: Record<string, React.ReactNode> = {
  student: <GraduationCap className="w-5 h-5 text-sky-400" />,
  developer: <Code2 className="w-5 h-5 text-emerald-400" />,
  designer: <Palette className="w-5 h-5 text-rose-400" />,
  creator: <Video className="w-5 h-5 text-purple-400" />,
  professional: <Briefcase className="w-5 h-5 text-amber-400" />,
  founder: <Crown className="w-5 h-5 text-sky-300" />,
};

export const WhatIBuildSection: React.FC<WhatIBuildSectionProps> = ({
  onSelectArchetype,
  onHoverState,
  onHoverLeave,
  currency,
}) => {
  return (
    <section id="what-i-build" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="max-w-3xl mb-10 sm:mb-16">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 02 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Built For Your Profession
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          I DON&apos;T BUILD TEMPLATES.{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            i architect
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            DIGITAL IDENTITIES.
          </span>
        </h2>

        <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-2xl leading-relaxed">
          Each profession needs a different portfolio approach. Select your archetype to see what is possible.
        </p>
      </div>

      {/* 6 Archetype 3D Floating Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {ARCHETYPES.map((archetype, idx) => {
          const priceFormatted =
            currency === 'INR'
              ? `₹${archetype.basePriceINR.toLocaleString('en-IN')}`
              : `$${archetype.basePriceUSD}`;

          return (
            <motion.div
              key={archetype.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => {
                soundFx.playSelect();
                onSelectArchetype(archetype);
              }}
              onMouseEnter={() => {
                soundFx.playHover();
                onHoverState('explore');
              }}
              onMouseLeave={onHoverLeave}
              className="group relative rounded-2xl glass-panel p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-sky-500/40 cursor-pointer overflow-hidden min-h-[300px]"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {archetypeIcons[archetype.id]}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-300 group-hover:text-sky-300 font-medium tracking-wider">
                    {archetype.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                  {archetype.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300/70 font-sans leading-relaxed line-clamp-2">
                  {archetype.subtitle}
                </p>

                {/* Key Metric Pill */}
                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{archetype.highlightStat}</span>
                </div>

                {/* Feature Bullets */}
                <div className="mt-6 space-y-2.5">
                  {archetype.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & CTA */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Starts from</span>
                  <span className="text-base font-mono font-bold text-white">
                    {priceFormatted}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                  <span>SPECIFY BUILD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
