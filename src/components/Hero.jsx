import React, { useId } from 'react';

/**
 * Hero Component
 * Renders the primary headline "WELCOME ITZ FIZZ" with staggered letter spans,
 * grouped words to prevent awkward mid-word wrapping, clean modern bold typography,
 * responsive scaling, and refined letter spacing.
 */
const Hero = ({ headlineRef, subtitleRef, lettersContainerRef }) => {
  const words = [
    { text: 'WELCOME', letters: 'WELCOME'.split('') },
    { text: 'ITZ', letters: 'ITZ'.split('') },
    { text: 'FIZZ', letters: 'FIZZ'.split('') },
  ];
  const badgeId = useId();

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center pt-20 pb-6 md:pt-28 md:pb-10 px-4 z-20 text-center"
      aria-label="Welcome Hero"
    >
      {/* Decorative Cybernetic Background Glows */}
      <div className="absolute top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/15 to-teal-500/10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Top Status Tag */}
      <div
        id={badgeId}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-5 shadow-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Scroll-Driven Interactive Experience
      </div>

      {/* Main Headline Container */}
      <div
        ref={headlineRef}
        className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center"
      >
        <h1
          ref={lettersContainerRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-slate-100 flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 select-none tracking-normal"
          aria-label="WELCOME ITZ FIZZ"
        >
          {words.map((word, wordIdx) => (
            <span
              key={wordIdx}
              className="inline-flex items-baseline tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] whitespace-nowrap"
            >
              {word.letters.map((char, charIdx) => (
                <span
                  key={charIdx}
                  data-letter
                  className="inline-block transition-colors duration-200 hover:text-emerald-400 leading-none"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      {/* Subtitle / Value Proposition */}
      <p
        ref={subtitleRef}
        className="mt-5 md:mt-6 max-w-2xl text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal tracking-wide px-4"
      >
        Experience precision kinematics in motion. Scroll to accelerate through
        next-generation telemetry metrics, aerodynamic dynamics, and real-time interaction.
      </p>

      {/* Control Buttons & Call to Action */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
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
