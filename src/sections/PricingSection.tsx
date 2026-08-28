import React from 'react';
import { motion } from 'motion/react';
import { PRICING_TIERS } from '../data/pricingData';
import { PricingTier } from '../types';
import { soundFx } from '../utils/audio';
import { Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tier: PricingTier) => void;
  currency: 'INR' | 'USD';
  onHoverState: (type: 'pointer' | 'build') => void;
  onHoverLeave: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectTier,
  currency,
  onHoverState,
  onHoverLeave,
}) => {
  return (
    <section id="pricing" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 06 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Transparent Sprints
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          INVEST IN YOUR{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            digital
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            PRESENCE.
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          Every package includes the same quality standard. Choose the scope that fits your needs.
        </p>

        {/* What You Get Summary Strip */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold tracking-wider uppercase mb-3">
            <Check className="w-4 h-4" />
            Every Package Includes
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            {['Responsive Design', 'Custom Sections', 'Deployment Support', 'Performance Optimization', 'Basic SEO Setup', 'Contact System', 'Mobile Optimized', 'Post-Launch Support'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-300">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-sky-400" />
            Discovery → Design → Build → Review → Launch
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-sky-400" />
            Typical delivery: 7–16 days
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-sky-400" />
            2 revision rounds included
          </span>
        </div>
      </div>

      {/* 3 Floating Pricing Structures */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {PRICING_TIERS.map((tier, idx) => {
          const priceFormatted =
            currency === 'INR'
              ? `₹${tier.priceINR.toLocaleString('en-IN')}`
              : `$${tier.priceUSD}`;

          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onMouseEnter={() => {
                soundFx.playHover();
                onHoverState('build');
              }}
              onMouseLeave={onHoverLeave}
              className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                tier.popular
                  ? 'glass-panel border-sky-500/50 shadow-[0_0_40px_rgba(56,189,248,0.15)] lg:-translate-y-2'
                  : 'glass-panel border-white/10 hover:border-white/20'
              }`}
            >
              {/* Most Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-sky-500 text-slate-950 font-bold font-mono text-[10px] tracking-wider uppercase shadow-md">
                  Recommended Tier
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {tier.badge}
                  </span>
                  <span className="text-[11px] font-mono text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                    {tier.turnaround}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {tier.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300/70 font-sans leading-relaxed">
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-white">
                      {priceFormatted}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ fixed sprint</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 mt-2 block">
                    Target: <strong className="text-slate-200 font-medium">{tier.idealFor}</strong>
                  </span>
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-6 space-y-3">
                  <span className="text-[11px] font-mono text-sky-400 tracking-wider uppercase font-semibold block">
                    Scope & Features:
                  </span>
                  {tier.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => {
                    soundFx.playSelect();
                    onSelectTier(tier);
                  }}
                  className={`w-full min-h-[48px] py-3.5 sm:py-4 rounded-xl font-mono font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tier.popular
                      ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/10'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
