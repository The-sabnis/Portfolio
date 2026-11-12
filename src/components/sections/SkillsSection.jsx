import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layout, Cpu, CheckCircle2, Sparkles, Terminal, Check } from 'lucide-react';
import { skillCategories } from '../../data/portfolioData';

// Contextual engineering insights based strictly on updated resume information
const skillDetailsMap = {
  'SQL Server (T-SQL)': 'Architecting and maintaining robust T-SQL stored procedures, functions, dimensional schemas, and automated SQL Server Agent Jobs.',
  'PostgreSQL (PL/pgSQL)': 'Developing high-performance PL/pgSQL procedures, functions, refcursor-based reporting, and business calendar SLA calculations.',
  'MySQL': 'Designing relational schemas, indexing strategies, and multi-table data structures for persistent transactional workflows.',
  'Stored Procedures & Functions': 'Writing complex procedural routines, business logic validation, RTS appeal management, and multi-table transactional workflows.',
  'Query Optimization & Triggers': 'Optimizing query execution plans, refcursor routines, indexing, multi-table joins, and reactive trigger mechanisms.',
  'Data Modeling': 'Designing normalized relational schemas, staging tables, and dimensional-style analytical models for downstream reporting.',
  'ETL Pipelines': 'Building high-throughput ETL pipelines in SQL, extracting and transforming data from OLTP and intermediary systems while maintaining consistency.',
  'Staging & Dimensional Schemas': 'Constructing intermediary staging tables and dimensional star/snowflake schemas to power self-serve business intelligence and MIS reporting.',
  'Data Quality & Auditing': 'Implementing automated data quality checks, reconciliation routines across source/reporting tables, control tables, and error-logging logic.',
  'SQL Server Agent Jobs': 'Automating recurring batch workflows, scheduled ETL pipelines, and maintenance tasks to eliminate manual intervention.',
  'pg_cron Scheduling': 'Configuring automated, unattended PostgreSQL job scheduling for daily task execution, batch routines, and report dispatching.',
  'Refcursor Search & Reporting': 'Developing dynamic refcursor-based search functions with multi-value parameter filtering and turnaround metric calculation.',
  'Python': 'Data processing, backend automation, and applying IBM-certified Python for Data Science practices.',
  'JavaScript': 'Scripting dynamic logic, TypeScript Supabase Edge Functions, and backend automation routines.',
  'SSMS & DBeaver': 'Daily database administration, query profiling, execution plan analysis, and cross-database management across SQL Server and PostgreSQL.',
  'Supabase & Edge Functions': 'Leveraging Supabase PostgreSQL backend, relational tables, and TypeScript Edge Functions for automated cloud workflows.',
  'Jenkins & GitHub CI': 'Continuous integration tooling, automated job execution, collaborative git workflows, and version control.',
  'Tableau & Excel': 'Preparing analytics-ready datasets, executive MIS reporting, SLA compliance dashboards, and turnaround analysis.',
};

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState('SQL Server (T-SQL)');

  const categoryAccents = [
    { color: '#2997ff', bg: 'rgba(41, 151, 255, 0.1)', border: 'rgba(41, 151, 255, 0.25)', icon: Database },
    { color: '#818cf8', bg: 'rgba(129, 140, 248, 0.1)', border: 'rgba(129, 140, 248, 0.25)', icon: Layout },
    { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.25)', icon: Cpu },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 px-6 bg-[#000000] text-[#f5f5f7] relative z-10 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Apple Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-4 text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20">
            <Sparkles size={12} />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Core Competencies.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal max-w-2xl mx-auto">
            Engineered for high performance, transactional integrity, and responsive production workflows.
          </p>
        </div>

        {/* Apple Bento Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {skillCategories.map((category, idx) => {
            const accent = categoryAccents[idx % categoryAccents.length];
            const Icon = accent.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-3xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.16] shadow-sm flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: accent.bg,
                        color: accent.color,
                        border: `1px solid ${accent.border}`,
                      }}
                    >
                      <Icon size={19} />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-[#86868b] border border-white/[0.08]">
                      {category.items.length} Technologies
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f7] mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs font-mono text-[#86868b] mb-5">
                    Production Stack
                  </p>

                  {/* Skills List in Apple Style */}
                  <div className="space-y-2">
                    {category.items.map((skill) => {
                      const isSelected = selectedSkill === skill;

                      return (
                        <button
                          key={skill}
                          onClick={() => setSelectedSkill(skill)}
                          onMouseEnter={() => setSelectedSkill(skill)}
                          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-all duration-150 cursor-pointer border ${
                            isSelected
                              ? 'bg-[#2997ff]/15 border-[#2997ff]/40 text-white shadow-[0_0_16px_rgba(41,151,255,0.15)] translate-x-0.5'
                              : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.05] hover:border-white/[0.1] text-slate-300 hover:text-white'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium tracking-tight">
                            {skill}
                          </span>
                          <span
                            className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                            style={{
                              backgroundColor: isSelected ? `${accent.color}25` : 'rgba(255, 255, 255, 0.05)',
                              color: isSelected ? accent.color : '#6e6e73',
                            }}
                          >
                            <Check size={11} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#86868b]">
                  <span>Architecture</span>
                  <span className="text-[#2997ff] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" /> Production
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Apple Style Technology Context Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSkill}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 text-[#2997ff] shadow-sm">
                <Terminal size={17} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#f5f5f7]">
                    {selectedSkill}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#86868b]">
                    Inspector Focus
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#a1a1a6] leading-relaxed font-normal">
                  {skillDetailsMap[selectedSkill] ||
                    'Core production technology deployed and maintained across high-throughput enterprise systems.'}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 self-end sm:self-center flex-shrink-0">
              <CheckCircle2 size={13} />
              Active
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
