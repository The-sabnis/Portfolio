import { useRef, useState, useEffect } from 'react';
import { animate, useInView } from 'framer-motion';
import { Database, Activity } from 'lucide-react';
import { statsData } from '../../data/portfolioData';
import TiltContainer from '../ui/TiltContainer';

function StatCard({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [val, setVal] = useState(
    stat.decimals !== undefined
      ? Number(stat.from || 0).toFixed(stat.decimals)
      : (stat.from || 0)
  );

  useEffect(() => {
    if (inView && stat.to !== undefined) {
      const controls = animate(stat.from || 0, stat.to, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (stat.decimals !== undefined) {
            setVal(latest.toFixed(stat.decimals));
          } else {
            setVal(Math.floor(latest));
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, stat.from, stat.to, stat.decimals]);

  if (stat.special === 'badge') {
    const isDb = stat.icon === 'database';
    const Icon = isDb ? Database : Activity;
    const accentColor = isDb ? '#2997ff' : '#a78bfa';

    return (
      <TiltContainer
        strength={6}
        lift={4}
        className="rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.16] p-5 flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all duration-300"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 shadow-sm"
          style={{
            backgroundColor: `${accentColor}12`,
            color: accentColor,
            border: `1px solid ${accentColor}25`,
          }}
        >
          <Icon size={18} />
        </div>
        <span className="text-xs font-semibold tracking-tight text-[#f5f5f7]">
          {stat.title}
        </span>
      </TiltContainer>
    );
  }

  return (
    <div ref={ref}>
      <TiltContainer
        strength={6}
        lift={4}
        className="rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.16] p-5 flex flex-col items-center justify-center text-center h-28 sm:h-32 transition-all duration-300"
      >
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#f5f5f7] tabular-nums mb-1">
          {val}
          <span className="text-[#2997ff] font-medium">{stat.suffix}</span>
        </div>
        <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#86868b]">
          {stat.label}
        </span>
      </TiltContainer>
    </div>
  );
}

export default function StatsRow() {
  return (
    <section className="py-10 px-6 bg-[#000000] relative z-10 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {statsData.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>
    </section>
  );
}
