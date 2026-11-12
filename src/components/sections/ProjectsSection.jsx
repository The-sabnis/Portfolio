import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { projectsData } from '../../data/portfolioData';
import { GitHubIcon } from '../ui/SocialIcons';
import TiltContainer from '../ui/TiltContainer';
import { FlowVisual, BarsVisual } from '../3d/ProjectVisuals';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 bg-[#f5f5f7] text-[#1d1d1f] relative z-10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Apple Product Keynote Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-4 text-[#0071e3] bg-[#0071e3]/10 border border-[#0071e3]/20">
            <Sparkles size={12} />
            Selected Implementations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
            Engineered for Impact.
          </h2>
          <p className="text-[#515154] text-base sm:text-lg font-normal max-w-2xl mx-auto">
            A showcase of production database pipelines, advanced query optimization, and end-to-end data architectures.
          </p>
        </div>

        {/* Apple-Style Project Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full w-full"
            >
              <TiltContainer
                strength={4}
                lift={4}
                glowColor="rgba(0, 113, 227, 0.1)"
                className="h-full rounded-[32px] p-7 sm:p-9 bg-white border border-[#e5e5ea] hover:border-[#d2d2d7] transition-all duration-300 flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group"
              >
                <div className="relative z-10">
                  {/* Category & Status Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                      {project.category}
                    </span>

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#515154] bg-[#f5f5f7] border border-[#e5e5ea]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.status.toLowerCase().includes('progress')
                            ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]'
                            : 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                        } animate-pulse`}
                      />
                      <span className="text-[11px] font-medium">{project.status}</span>
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                    {project.title}
                  </h3>

                  {/* Project Tagline */}
                  <p className="text-sm sm:text-base text-[#515154] leading-relaxed font-normal mb-5">
                    {project.tagline}
                  </p>

                  {/* Technical Architectural Visual Stage */}
                  {idx === 0 ? <BarsVisual light={true} /> : <FlowVisual light={true} />}

                  {/* Lead Metric Callout */}
                  <div className="mb-6 p-4 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6e6e73] block mb-0.5">
                        Performance Metric
                      </span>
                      <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0071e3]">
                        {project.stat}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#6e6e73] text-right max-w-[200px] sm:max-w-xs leading-tight">
                      {project.statCaption}
                    </span>
                  </div>

                  {/* Key Highlights / Outcomes */}
                  <div className="mb-6 space-y-2.5">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#6e6e73] flex items-center gap-1.5 pb-1">
                      <Layers size={12} className="text-[#0071e3]" />
                      Architectural Outcomes
                    </div>

                    {project.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#424245] leading-relaxed font-normal"
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[#0071e3]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Stack & Action Footer */}
                <div className="relative z-10 mt-auto pt-5 border-t border-[#e5e5ea]">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#515154] bg-[#f5f5f7] border border-[#e5e5ea]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Row */}
                  <div className="flex items-center justify-between">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#1d1d1f] hover:bg-[#2d2d30] active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer"
                    >
                      <GitHubIcon size={14} className="text-slate-300 group-hover/btn:text-white" />
                      <span>View Source Code</span>
                      <ArrowUpRight
                        size={12}
                        className="text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      />
                    </a>

                    <span className="text-[11px] font-mono text-[#6e6e73] hidden sm:inline-flex items-center gap-1.5">
                      <Sparkles size={11} className="text-[#0071e3]" />
                      <span>Production Verified</span>
                    </span>
                  </div>
                </div>
              </TiltContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
