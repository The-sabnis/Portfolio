import { motion } from 'framer-motion';
import { Database, Zap, Send, Activity, Search, Check, Sparkles } from 'lucide-react';

export function FlowVisual({ light = true }) {
  const steps = [
    { icon: Database, label: 'Supabase OLTP', sub: 'Postgres DB' },
    { icon: Zap, label: 'Edge Function', sub: 'TypeScript' },
    { icon: Send, label: 'SMTP Dispatch', sub: 'Gmail API' },
  ];

  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-5 mb-6 overflow-hidden border ${
        light
          ? 'bg-[#f5f5f7] border-[#e5e5ea]'
          : 'bg-white/[0.02] border-white/[0.06]'
      }`}
    >
      <div className="flex items-center justify-between relative z-10">
        {steps.map((Step, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div className="flex flex-col items-center mx-auto">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm mb-1.5 ${
                  light
                    ? 'bg-white border border-[#e5e5ea] text-[#0071e3]'
                    : 'bg-white/[0.04] border border-white/10 text-[#2997ff]'
                }`}
              >
                <Step.icon size={18} />
              </div>
              <span
                className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                  light ? 'text-[#1d1d1f]' : 'text-[#f5f5f7]'
                }`}
              >
                {Step.label}
              </span>
              <span
                className={`text-[9px] font-mono ${
                  light ? 'text-[#86868b]' : 'text-[#6e6e73]'
                }`}
              >
                {Step.sub}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 relative overflow-hidden ${
                  light ? 'bg-[#d2d2d7]' : 'bg-white/10'
                }`}
              >
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                    light ? 'bg-[#0071e3] shadow-[0_0_6px_#0071e3]' : 'bg-[#2997ff] shadow-[0_0_8px_#2997ff]'
                  }`}
                  animate={{ left: ['0%', '100%'] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: 'linear',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
          light ? 'border-[#e5e5ea] text-[#6e6e73]' : 'border-white/[0.04] text-[#86868b]'
        }`}
      >
        <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          pg_cron 24h Scheduler
        </span>
        <span className={light ? 'text-[#1d1d1f] font-medium' : 'text-[#a1a1a6]'}>
          Unattended Batch
        </span>
      </div>
    </div>
  );
}

export function BarsVisual({ light = true }) {
  const dataPoints = [85, 70, 52, 92, 65, 96, 78, 98];

  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-5 mb-6 overflow-hidden border ${
        light
          ? 'bg-[#f5f5f7] border-[#e5e5ea]'
          : 'bg-white/[0.02] border-white/[0.06]'
      }`}
    >
      <div className="flex items-end justify-between gap-2.5 h-20 mb-3 pt-2">
        {dataPoints.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${val}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full rounded-t-sm relative group ${
                light
                  ? 'bg-gradient-to-t from-[#0071e3]/20 via-[#0071e3]/70 to-[#0071e3]'
                  : 'bg-gradient-to-t from-[#2997ff]/20 via-[#2997ff]/60 to-[#2997ff]'
              }`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        ))}
      </div>
      <div
        className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
          light ? 'border-[#e5e5ea] text-[#6e6e73]' : 'border-white/[0.04] text-[#86868b]'
        }`}
      >
        <span className={`flex items-center gap-1.5 font-medium ${light ? 'text-[#0071e3]' : 'text-[#2997ff]'}`}>
          <Activity size={12} /> Execution Plan Analysis
        </span>
        <span className={light ? 'text-[#1d1d1f] font-semibold' : 'text-[#f5f5f7] font-medium'}>
          97% Logical Read Reduction
        </span>
      </div>
    </div>
  );
}

export function SearchVisual({ light = true }) {
  const tags = ['App ID / RTS', 'Department Filter', 'SLA Pendency', 'Refcursor Out'];

  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-5 mb-6 overflow-hidden border ${
        light
          ? 'bg-[#f5f5f7] border-[#e5e5ea]'
          : 'bg-white/[0.02] border-white/[0.06]'
      }`}
    >
      <div
        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl mb-3 border ${
          light ? 'bg-white border-[#e5e5ea]' : 'bg-white/[0.04] border-white/10'
        }`}
      >
        <Search size={14} className={light ? 'text-[#0071e3]' : 'text-[#2997ff]'} />
        <span className={`text-xs font-mono ${light ? 'text-[#515154]' : 'text-[#a1a1a6]'}`}>
          Execute refcursor search function...
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
              light
                ? 'bg-[#0071e3]/10 border-[#0071e3]/20 text-[#0071e3]'
                : 'bg-[#2997ff]/10 border-[#2997ff]/25 text-[#2997ff]'
            }`}
          >
            <Check size={10} /> {tag}
          </span>
        ))}
      </div>
      <div
        className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-mono ${
          light ? 'border-[#e5e5ea] text-[#6e6e73]' : 'border-white/[0.04] text-[#86868b]'
        }`}
      >
        <span className={`flex items-center gap-1 ${light ? 'text-[#0071e3]' : 'text-[#2997ff]'}`}>
          <Sparkles size={11} /> Optimized Multi-Table Joins
        </span>
        <span className="text-emerald-600 font-medium">&lt; 15ms Response</span>
      </div>
    </div>
  );
}
