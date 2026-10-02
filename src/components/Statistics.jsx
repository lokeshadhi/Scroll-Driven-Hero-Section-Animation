import React, { forwardRef } from 'react';

/**
 * Statistics Component
 * Displays impactful responsive metric cards with glowing glassmorphism accents.
 * Animated sequentially by GSAP entrance timeline and interactive on scroll.
 */
const Statistics = forwardRef(({ metrics = [] }, ref) => {
  const defaultMetrics = [
    {
      id: 'metric-1',
      value: '58%',
      label: 'Dispatch Efficiency',
      subtext: 'Boost in automated delivery point routing',
      tag: '+3.4x Velocity',
      color: 'from-emerald-400 to-teal-300',
      borderGlow: 'hover:border-emerald-400/50',
      bgGlow: 'hover:shadow-[0_0_25px_rgba(52,211,153,0.2)]',
    },
    {
      id: 'metric-2',
      value: '23%',
      label: 'Friction Reduction',
      subtext: 'Decrease in support latency and triage time',
      tag: '-18ms Overhead',
      color: 'from-cyan-400 to-blue-400',
      borderGlow: 'hover:border-cyan-400/50',
      bgGlow: 'hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]',
    },
    {
      id: 'metric-3',
      value: '99.9%',
      label: 'Telemetry Precision',
      subtext: 'Sub-millisecond sensor feedback loop sync',
      tag: 'Zero Drift',
      color: 'from-amber-400 to-orange-400',
      borderGlow: 'hover:border-amber-400/50',
      bgGlow: 'hover:shadow-[0_0_25px_rgba(251,191,36,0.2)]',
    },
    {
      id: 'metric-4',
      value: '40%',
      label: 'Energy Recovery',
      subtext: 'Kinetic regeneration under active braking',
      tag: 'Aerodynamic Flow',
      color: 'from-violet-400 to-fuchsia-400',
      borderGlow: 'hover:border-violet-400/50',
      bgGlow: 'hover:shadow-[0_0_25px_rgba(192,132,252,0.2)]',
    },
  ];

  const items = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl px-4 z-20"
      aria-label="Performance impact metrics"
    >
      {items.map((item, index) => (
        <div
          key={item.id || index}
          data-stat-card
          className={`group relative p-5 md:p-6 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800 transition-all duration-300 ${item.borderGlow} ${item.bgGlow} flex flex-col justify-between`}
        >
          {/* Subtle top indicator line */}
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent group-hover:via-emerald-400/50 transition-colors" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
              METRIC 0{index + 1}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300">
              {item.tag}
            </span>
          </div>

          <div className="my-2">
            <div
              className={`text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-sans`}
            >
              {item.value}
            </div>
            <div className="text-sm md:text-base font-semibold text-slate-200 mt-1">
              {item.label}
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mt-2 border-t border-slate-800/70 pt-3">
            {item.subtext}
          </p>
        </div>
      ))}
    </div>
  );
});

Statistics.displayName = 'Statistics';

export default Statistics;
