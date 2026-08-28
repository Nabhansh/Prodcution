import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject, ArchetypeId } from '../types';
import { soundFx } from '../utils/audio';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioGallerySectionProps {
  onSelectProject: (project: PortfolioProject) => void;
  onHoverState: (type: 'view' | 'pointer') => void;
  onHoverLeave: () => void;
}

export const PortfolioGallerySection: React.FC<PortfolioGallerySectionProps> = ({
  onSelectProject,
  onHoverState,
  onHoverLeave,
}) => {
  const [filter, setFilter] = useState<'all' | ArchetypeId>('all');

  const filteredProjects =
    filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.archetypeId === filter);

  return (
    <section id="portfolio" className="relative py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
              ( 03 )
            </span>
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-slate-400 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
              Architectural Concept Prototypes & Blueprints
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-[1.05]">
            PROTOTYPES THAT{' '}
            <span className="font-serif italic font-normal text-slate-300 tracking-normal lowercase text-[0.95em]">
              prove
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
              THE VISION.
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/80 font-sans max-w-xl leading-relaxed">
            Every showcase below is an interactive architectural prototype designed to demonstrate WebGL pipelines, conversion structures, and custom 3D identities.
          </p>
        </div>

        {/* Filter Tabs - Horizontally scrollable on mobile */}
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel whitespace-nowrap min-w-max">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'developer', label: 'Engineering' },
              { id: 'designer', label: 'Design' },
              { id: 'student', label: 'Graduates' },
              { id: 'creator', label: 'Creators' },
              { id: 'founder', label: 'Founders' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick();
                  setFilter(tab.id as 'all' | ArchetypeId);
                }}
                className={`min-h-[38px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating 3D Browser Windows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            whileHover={{
              y: -6,
              transition: { duration: 0.25 },
            }}
            onClick={() => {
              soundFx.playSelect();
              onSelectProject(project);
            }}
            onMouseEnter={() => {
              soundFx.playHover();
              onHoverState('view');
            }}
            onMouseLeave={onHoverLeave}
            className="group relative rounded-2xl glass-panel p-6 flex flex-col justify-between transition-all duration-300 hover:border-sky-500/40 cursor-pointer overflow-hidden"
          >
            {/* Top 3D Browser Window Frame */}
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 truncate max-w-[130px] text-slate-300 text-[11px]">
                    {project.archetypeId}.space.build
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium text-sky-400 uppercase px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                  {project.category}
                </span>
              </div>

              {/* Visual Simulation Display Box - Realistic Miniature Website */}
              <div className="relative h-48 rounded-xl bg-[#030712]/90 border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden group-hover:border-sky-500/40 transition-all shadow-inner">
                {/* Mini Website Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] font-mono font-semibold text-sky-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    {project.clientRole}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    CONCEPT PROTOTYPE
                  </span>
                </div>

                {/* Mini Website Body Based on Archetype */}
                <div className="my-auto py-1">
                  {project.archetypeId === 'developer' && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded border border-emerald-500/20 truncate">
                        $ ./deploy --engine=webgl2 --nodes=8
                      </div>
                      <div className="text-xs font-mono text-slate-300 truncate font-semibold">
                        {project.previewDetails.heroTitle}
                      </div>
                      <div className="flex gap-1.5 text-[9px] font-mono text-slate-400">
                        <span className="bg-white/5 px-1.5 py-0.5 rounded">60 FPS</span>
                        <span className="bg-white/5 px-1.5 py-0.5 rounded">174KB Gzip</span>
                      </div>
                    </div>
                  )}

                  {project.archetypeId === 'designer' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                        <span>SPATIAL CANVAS</span>
                        <span>DPR 2.0</span>
                      </div>
                      <div className="text-xs font-display font-bold text-white tracking-tight truncate">
                        {project.previewDetails.heroTitle}
                      </div>
                      <div className="h-1.5 w-full bg-purple-500/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                      </div>
                    </div>
                  )}

                  {project.archetypeId === 'student' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-amber-300">
                        <span>GRADUATE HUB</span>
                        <span>ATS SYNC</span>
                      </div>
                      <div className="text-xs font-display font-bold text-white tracking-tight truncate">
                        {project.previewDetails.heroTitle}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        Verified Proof of Work & Interactive Projects
                      </div>
                    </div>
                  )}

                  {project.archetypeId === 'creator' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-pink-300">
                        <span>MEDIA CHANNEL</span>
                        <span>4K STREAM</span>
                      </div>
                      <div className="text-xs font-display font-bold text-white tracking-tight truncate">
                        {project.previewDetails.heroTitle}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        Sponsorship Portal & Spatial Media Vault
                      </div>
                    </div>
                  )}

                  {project.archetypeId === 'founder' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
                        <span>VENTURE DECK</span>
                        <span>LIVE KPI</span>
                      </div>
                      <div className="text-xs font-display font-bold text-white tracking-tight truncate">
                        {project.previewDetails.heroTitle}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        Investor Room & Product Simulation
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Outcome Metric Ribbon */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                  <span className="text-slate-400 text-[10px] uppercase">
                    Outcome
                  </span>
                  <span className="font-semibold text-emerald-300 text-[11px]">
                    {project.theResult.metrics[0].value}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-5">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-sky-300 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-300/70 font-sans line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.theBuild.techStack.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                View Case Study
              </span>
              <div className="w-8 h-8 rounded-full glass group-hover:bg-sky-400 group-hover:text-slate-950 text-sky-400 flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
