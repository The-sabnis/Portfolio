import { motion } from 'framer-motion';
import { Award, GraduationCap, Sparkles } from 'lucide-react';
import { educationData } from '../../data/portfolioData';
import TiltContainer from '../ui/TiltContainer';

export default function EducationSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[#f5f5f7] text-[#1d1d1f] relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-3 text-[#0071e3] bg-[#0071e3]/10 border border-[#0071e3]/20">
            <Sparkles size={12} />
            Academic & Honors
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f]">
            Education & Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {educationData.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <TiltContainer
                strength={4}
                lift={3}
                className="rounded-[28px] p-6 sm:p-7 bg-white border border-[#e5e5ea] hover:border-[#d2d2d7] h-full flex flex-col justify-between transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#86868b]">
                      0{idx + 1} // {item.type === 'degree' ? 'Degree' : 'Certification'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>

                  <div className="mb-5">
                    {item.type === 'degree' ? (
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20 shadow-sm">
                          <GraduationCap size={22} />
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] block">
                            CGPA
                          </span>
                          <span className="text-2xl font-bold tracking-tight text-[#1d1d1f] tabular-nums">
                            {item.cgpa}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 shadow-sm">
                        <Award size={22} />
                      </div>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1d1d1f] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#6e6e73] leading-relaxed">
                    {item.sub}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#e5e5ea] flex items-center justify-between text-[11px] font-mono text-[#6e6e73]">
                  <span className="text-emerald-600 font-medium">● Verified</span>
                  <span>{item.badge || 'Credential'}</span>
                </div>
              </TiltContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
