import React from 'react';
import { motion } from 'motion/react';
import { ARCHETYPES } from '../data/archetypesData';
import { ADDONS_DATA } from '../data/pricingData';
import { ArchetypeId, StyleId, ConfiguratorState, PerformanceTier } from '../types';
import { Configurator3DPreview } from '../three/Configurator3DPreview';
import { soundFx } from '../utils/audio';
import { Sparkles, Check, ArrowRight, Layers, Sliders, ShieldCheck } from 'lucide-react';

interface ConfiguratorSectionProps {
  config: ConfiguratorState;
  onChangeConfig: (newConfig: Partial<ConfiguratorState>) => void;
  onRequestBuild: (config: ConfiguratorState) => void;
  currency: 'INR' | 'USD';
  onHoverState: (type: 'build' | 'pointer') => void;
  onHoverLeave: () => void;
  performanceTier?: PerformanceTier;
}

const STYLES_LIST: { id: StyleId; name: string; desc: string; color: string }[] = [
  { id: 'futuristic', name: 'Cyber Futuristic', desc: 'Neon cyan, high-speed grid, GLSL matrix', color: '#38bdf8' },
  { id: 'spatial3d', name: 'Spatial 3D', desc: 'Glassmorphism, orbital depth, refraction', color: '#f43f5e' },
  { id: 'dark', name: 'Dark Monolith', desc: 'Deep obsidian, emerald glow, code-dense', color: '#10b981' },
  { id: 'luxury', name: 'Executive Luxury', desc: 'Warm bronze, gold reflections, prestige', color: '#d97706' },
  { id: 'bold', name: 'Bold Avant-Garde', desc: 'High-voltage purple, expressive geometry', color: '#a855f7' },
  { id: 'minimal', name: 'Minimal Bauhaus', desc: 'Pure typography, subtle grid, clean space', color: '#94a3b8' },
  { id: 'editorial', name: 'Editorial Vogue', desc: 'High-contrast monochrome, serif nuances', color: '#cbd5e1' },
  { id: 'creative', name: 'Experimental Play', desc: 'Kinetic physics, magnetic cursor warp', color: '#ec4899' },
];

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({
  config,
  onChangeConfig,
  onRequestBuild,
  currency,
  onHoverState,
  onHoverLeave,
  performanceTier = 'high',
}) => {
  // Current Archetype
  const currentArchetypeObj = ARCHETYPES.find((a) => a.id === config.archetype) || ARCHETYPES[0];

  // Current Base Price
  const basePrice =
    currency === 'INR' ? currentArchetypeObj.basePriceINR : currentArchetypeObj.basePriceUSD;

  // Selected Add-ons Total
  const selectedAddonsList = ADDONS_DATA.filter((a) => config.selectedAddons.includes(a.id));
  const addonsTotal = selectedAddonsList.reduce(
    (acc, item) => acc + (currency === 'INR' ? item.priceINR : item.priceUSD),
    0
  );

  const grandTotal = basePrice + addonsTotal;

  const toggleAddon = (addonId: string) => {
    soundFx.playSelect();
    const exists = config.selectedAddons.includes(addonId);
    const updated = exists
      ? config.selectedAddons.filter((id) => id !== addonId)
      : [...config.selectedAddons, addonId];
    onChangeConfig({ selectedAddons: updated });
  };

  const handleArchetypeSelect = (id: ArchetypeId) => {
    soundFx.playSelect();
    const arch = ARCHETYPES.find((a) => a.id === id);
    onChangeConfig({
      archetype: id,
      style: arch ? arch.recommendedStyle : config.style,
    });
  };

  const handleStyleSelect = (id: StyleId) => {
    soundFx.playSelect();
    onChangeConfig({ style: id });
  };

  return (
    <section id="configurator" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
            ( 05 )
          </span>
          <div className="h-[1px] w-8 bg-white/20" />
          <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
            Real-Time Configurator
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
          DESIGN YOUR{' '}
          <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
            custom
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            EXPERIENCE.
          </span>
        </h2>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl mx-auto leading-relaxed">
          Tailor your digital identity in real time. Choose your archetype, visual aesthetics, and modular enhancements to calculate your custom build.
        </p>
      </div>

      {/* Main 2-Column Studio Configurator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT COLUMN: 3-STEP SELECTION CONTROLS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {/* STEP 1: WHO ARE YOU? */}
          <div className="p-5 sm:p-7 rounded-2xl glass-panel">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-[10px] text-sky-300">
                  1
                </span>
                Identity Archetype
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Select Domain</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {ARCHETYPES.map((arch) => {
                const isSelected = config.archetype === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => handleArchetypeSelect(arch.id)}
                    className={`min-h-[88px] p-3 sm:p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm ring-1 ring-sky-400/30'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-xs font-mono font-semibold leading-tight block">
                      {arch.title.split('&')[0]}
                    </span>
                    <div className="flex items-center justify-between w-full mt-2">
                      <span className="text-xs font-mono text-slate-400">
                        {currency === 'INR' ? `₹${arch.basePriceINR.toLocaleString('en-IN')}` : `$${arch.basePriceUSD}`}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: WHAT'S YOUR STYLE? */}
          <div className="p-5 sm:p-7 rounded-2xl glass-panel">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-[10px] text-sky-300">
                  2
                </span>
                Visual Aesthetic
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Aesthetic Theme</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {STYLES_LIST.map((st) => {
                const isSelected = config.style === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleStyleSelect(st.id)}
                    className={`min-h-[76px] p-2.5 sm:p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm ring-1 ring-sky-400/30'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                      <span className="text-xs font-mono font-semibold truncate">{st.name}</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 line-clamp-1">
                      {st.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: WHAT DO YOU NEED? (ADDONS) */}
          <div className="p-5 sm:p-7 rounded-2xl glass-panel">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-[10px] text-sky-300">
                  3
                </span>
                Modular Add-ons
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Optional Features</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {ADDONS_DATA.map((addon) => {
                const isSelected = config.selectedAddons.includes(addon.id);
                const addonPriceFormatted =
                  currency === 'INR' ? `+₹${addon.priceINR.toLocaleString('en-IN')}` : `+$${addon.priceUSD}`;

                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`min-h-[52px] p-3 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-sky-500 border-sky-500 text-white' : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-sans font-medium block truncate text-white">
                          {addon.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 truncate block">
                          {addon.description}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-semibold text-sky-400 shrink-0 ml-2">
                      {addonPriceFormatted}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE 3D PREVIEW & DYNAMIC PRICE CALCULATOR (5 COLS) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-6">
          {/* Live 3D Preview Frame */}
          <div className="p-3.5 sm:p-4 rounded-2xl glass-panel">
            <Configurator3DPreview
              archetype={config.archetype}
              style={config.style}
              addonsCount={config.selectedAddons.length}
              performanceTier={performanceTier}
            />

            {/* Config Summary Strip */}
            <div className="mt-3.5 sm:mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="truncate">
                Archetype: <strong className="text-sky-300">{currentArchetypeObj.title}</strong>
              </span>
              <span className="text-slate-400 capitalize">
                Style: <strong className="text-white">{config.style}</strong>
              </span>
            </div>
          </div>

          {/* Floating Live Price Calculator Panel */}
          <div className="p-5 sm:p-7 rounded-2xl glass-panel border-sky-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-semibold tracking-wider text-white uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Live Build Quote
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Transparent
              </span>
            </div>

            {/* Breakdown List */}
            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>Base ({currentArchetypeObj.title})</span>
                <span className="font-semibold text-white">
                  {currency === 'INR' ? `₹${basePrice.toLocaleString('en-IN')}` : `$${basePrice}`}
                </span>
              </div>

              {selectedAddonsList.map((ad) => (
                <div key={ad.id} className="flex items-center justify-between text-slate-400 pl-2 border-l border-sky-500/40">
                  <span className="truncate max-w-[180px]">{ad.name}</span>
                  <span className="text-sky-300">
                    {currency === 'INR' ? `+₹${ad.priceINR.toLocaleString('en-IN')}` : `+$${ad.priceUSD}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Grand Total Bar */}
            <div className="mt-5 sm:mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Estimated Total</span>
                <motion.span
                  key={grandTotal}
                  initial={{ scale: 1.03 }}
                  animate={{ scale: 1 }}
                  className="text-2xl sm:text-3xl font-mono font-bold text-white"
                >
                  {currency === 'INR' ? `₹${grandTotal.toLocaleString('en-IN')}` : `$${grandTotal}`}
                </motion.span>
              </div>

              <span className="text-xs font-mono text-slate-400 text-right">
                Sprint:
                <br />
                <strong className="text-sky-300">7–12 Days</strong>
              </span>
            </div>

            {/* Request Build Button */}
            <button
              onClick={() => {
                soundFx.playSelect();
                onRequestBuild(config);
              }}
              onMouseEnter={() => {
                soundFx.playHover();
                onHoverState('build');
              }}
              onMouseLeave={onHoverLeave}
              className="mt-5 sm:mt-6 w-full min-h-[48px] py-3.5 sm:py-4 rounded-xl bg-white hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md"
            >
              <span>Start Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
