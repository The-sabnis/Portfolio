import { motion } from 'framer-motion';
import { Calendar, Building2, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-[#000000] text-[#f5f5f7] relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Apple Editorial Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-4 text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20">
            <Sparkles size={12} />
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Professional Experience.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal">
            A chronological record of production database architectures, stored procedure engineering, and automated ETL pipelines.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6 sm:space-y-8">
          {experienceData.map((job, idx) => {
            const isCurrent = idx === 0;

            return (
              <motion.div
                key={`${job.company}-${job.date}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] bg-[#0c0d12] border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)] ${
                  isCurrent
                    ? 'border-[#2997ff]/30 shadow-[0_16px_48px_rgba(41,151,255,0.08)]'
                    : 'border-white/[0.08] hover:border-white/[0.16]'
                }`}
              >
                {/* Card Top Metadata Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium"
                      style={{
                        backgroundColor: `${job.badgeColor}15`,
                        color: job.badgeColor,
                        border: `1px solid ${job.badgeColor}30`,
                      }}
                    >
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
                      )}
                      {job.badge}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#a1a1a6] bg-white/[0.04] border border-white/[0.08]">
                      <Calendar size={12} className="text-[#86868b]" />
                      {job.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#86868b]">
                    <Building2 size={13} className="text-[#86868b]" />
                    <span className="text-[#a1a1a6]">{job.company}</span>
                    {job.platform && (
                      <span className="hidden md:inline text-[#6e6e73]">
                        — {job.platform}
                      </span>
                    )}
                  </div>
                </div>

                {/* Job Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] tracking-tight mb-2">
                  {job.title}
                </h3>

                {/* Platform info on mobile */}
                {job.platform && (
                  <p className="md:hidden text-xs font-mono text-[#2997ff] mb-4">
                    Platform: {job.platform}
                  </p>
                )}

                {/* Detailed Bullet Points from Resume */}
                <div className="space-y-3 mb-6 max-w-5xl mt-4">
                  {job.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#2997ff]/10 text-[#2997ff]">
                        <CheckCircle2 size={13} />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Architectural Tags */}
                {job.highlights && job.highlights.length > 0 && (
                  <div className="pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] mr-1 flex items-center gap-1.5">
                      <Layers size={12} className="text-[#2997ff]" /> Core Focus:
                    </span>
                    {job.highlights.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-xs font-mono text-[#a1a1a6] bg-white/[0.03] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
