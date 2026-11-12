import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Download, ArrowUpRight } from 'lucide-react';
import { personalInfo, executiveSummary } from '../../data/portfolioData';
import TiltContainer from '../ui/TiltContainer';

export default function AboutSection() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[#f5f5f7] text-[#1d1d1f] relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-4 text-[#0071e3] bg-[#0071e3]/10 border border-[#0071e3]/20">
            {executiveSummary.sectionTitle}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.08] mb-5">
            {executiveSummary.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#515154] leading-relaxed font-normal">
            {executiveSummary.bio}
          </p>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait in Precision Apple Display Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <TiltContainer
              strength={4}
              lift={4}
              glowColor="rgba(0, 113, 227, 0.1)"
              className="w-full max-w-md rounded-[32px] p-3.5 bg-white border border-[#e5e5ea] shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden relative bg-[#e5e5ea]">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter brightness-[1.01] contrast-[1.02]"
                  draggable={false}
                />
              </div>

              {/* Integrated Editorial Bezel Caption */}
              <div className="mt-3.5 p-3 rounded-2xl bg-[#f5f5f7] border border-[#e5e5ea] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1d1d1f] tracking-tight">
                      {personalInfo.name}
                    </p>
                    <p className="text-[10px] font-mono text-[#86868b]">
                      SQL Developer · 2.9+ YOE
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#0071e3] font-medium flex items-center gap-1 bg-[#0071e3]/10 px-2.5 py-1 rounded-full border border-[#0071e3]/20">
                  <MapPin size={11} /> Goa, India
                </span>
              </div>
            </TiltContainer>
          </div>

          {/* Core Competencies Checklist - Numbered Architectural Cells */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight">
                Core Capabilities & Execution Focus
              </h3>
              <span className="text-xs font-mono text-[#86868b]">
                6 Production Vectors
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {executiveSummary.checkpoints.map((checkpoint, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 rounded-2xl bg-white border border-[#e5e5ea] hover:border-[#0071e3]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-medium text-[#86868b] group-hover:text-[#0071e3] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#1d1d1f] tracking-tight">
                      {checkpoint}
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d2d2d7] group-hover:bg-[#0071e3] group-hover:shadow-[0_0_8px_#0071e3] transition-all" />
                </motion.div>
              ))}
            </div>

            {/* Engagement Banner */}
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#e5e5ea] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                  Open for Production Engagement
                </p>
                <p className="text-xs text-[#6e6e73] mt-0.5">
                  Available for SQL Developer, Database Engineer, or ETL roles.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.resumeUrl}
                  download={personalInfo.resumeFilename}
                  className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] transition-all duration-200 shadow-[0_2px_14px_rgba(0,113,227,0.3)] w-fit"
                >
                  <span>Resume</span>
                  <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                </a>
                <button
                  onClick={() => scrollTo('contact')}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e5e5ea] border border-[#e5e5ea] transition-all cursor-pointer"
                >
                  <span>Connect</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
