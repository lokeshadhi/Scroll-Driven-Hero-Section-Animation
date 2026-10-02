import React, { useId } from 'react';

/**
 * Hero Component
 * Renders the primary headline "W E L C O M E  I T Z  F I Z Z" with staggered letter spans,
 * subheadings, call-to-actions, and background depth elements.
 */
const Hero = ({ headlineRef, subtitleRef, lettersContainerRef }) => {
  const letters = 'WELCOME ITZ FIZZ'.split('');
  const badgeId = useId();

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center pt-24 pb-8 md:pt-32 md:pb-12 px-4 z-20 text-center"
      aria-label="Welcome Hero"
    >
      {/* Decorative Cybernetic Background Glows */}
      <div className="absolute top-1/4 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-teal-500/10 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Top Status Tag */}
      <div
        id={badgeId}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Scroll-Driven Interactive Experience
      </div>

      {/* Main Headline with Letter Spacing */}
      <div
        ref={headlineRef}
        className="max-w-5xl mx-auto px-2 flex flex-col items-center"
      >
        <h1
          ref={lettersContainerRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.25em] md:tracking-[0.38em] uppercase text-slate-100 flex flex-wrap justify-center items-center gap-y-2 select-none"
          aria-label="WELCOME ITZ FIZZ"
        >
          {letters.map((char, index) => {
            if (char === ' ') {
              return (
                <span
                  key={index}
                  className="w-4 sm:w-6 md:w-8 inline-block select-none"
                  aria-hidden="true"
                >
                  &nbsp;
                </span>
              );
            }
            return (
              <span
                key={index}
                data-letter
                className="inline-block transition-transform duration-200 hover:text-emerald-400 hover:-translate-y-1 will-change-transform"
              >
                {char}
              </span>
            );
          })}
        </h1>
      </div>

      {/* Subtitle / Value Proposition */}
      <p
        ref={subtitleRef}
        className="mt-6 md:mt-8 max-w-2xl text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal tracking-wide px-4"
      >
        Experience precision kinematics in motion. Scroll to accelerate through
        next-generation telemetry metrics, aerodynamic dynamics, and real-time interaction.
      </p>

      {/* Control Buttons & Call to Action */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#interactive-track"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Launch Simulation ↓
        </a>
        <a
          href="#architecture"
          className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 font-medium text-sm tracking-wide hover:border-slate-500 transition-all duration-200"
        >
          Engineering Specs
        </a>
      </div>
    </section>
  );
};

export default Hero;
