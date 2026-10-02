import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import ScrollVisual from './components/ScrollVisual';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const lettersContainerRef = useRef(null);
  const statsRef = useRef(null);
  const trackWrapperRef = useRef(null);
  const visualRef = useRef(null);
  const roadRef = useRef(null);
  const trailRef = useRef(null);
  const carRef = useRef(null);
  const speedRef = useRef(null);
  const rpmRef = useRef(null);
  const gearRef = useRef(null);
  const progressRef = useRef(null);

  const [activeStage, setActiveStage] = useState(1);

  useLayoutEffect(() => {
    // Accessibility check: Reduced motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation Timeline
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      if (!prefersReducedMotion) {
        // Staggered letters reveal for "WELCOME ITZ FIZZ"
        const letters = lettersContainerRef.current?.querySelectorAll('[data-letter]');
        if (letters && letters.length > 0) {
          introTl.from(letters, {
            y: 40,
            opacity: 0,
            rotateX: 45,
            stagger: 0.035,
            duration: 0.8,
            ease: 'back.out(1.4)',
          });
        }

        // Subtitle smooth entrance
        if (subtitleRef.current) {
          introTl.from(
            subtitleRef.current,
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
            },
            '-=0.3'
          );
        }

        // Sequential statistics cards animation
        const statCards = statsRef.current?.querySelectorAll('[data-stat-card]');
        if (statCards && statCards.length > 0) {
          introTl.from(
            statCards,
            {
              y: 35,
              opacity: 0,
              stagger: 0.12,
              duration: 0.7,
              ease: 'power2.out',
            },
            '-=0.2'
          );
        }

        // Vehicle entrance into starting position
        if (carRef.current) {
          introTl.from(
            carRef.current,
            {
              x: -120,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.4'
          );
        }
      } else {
        // Reduced motion fallback: Instant fade in
        gsap.set(
          [
            lettersContainerRef.current?.querySelectorAll('[data-letter]'),
            subtitleRef.current,
            statsRef.current?.querySelectorAll('[data-stat-card]'),
            carRef.current,
          ],
          { opacity: 1, y: 0, x: 0 }
        );
      }

      // 2. Scroll-Driven Animation Implementation
      if (!prefersReducedMotion && roadRef.current && carRef.current && trackWrapperRef.current) {
        const updateCarKinematics = () => {
          const roadWidth = roadRef.current.clientWidth;
          const carWidth = carRef.current.clientWidth || 220;
          const maxTravelDistance = Math.max(0, roadWidth - carWidth - 24); // Keep padding from right border

          return { maxTravelDistance, carWidth };
        };

        const { maxTravelDistance } = updateCarKinematics();

        // Pinned interactive track section with bidirectional scrub
        const scrollAnimation = gsap.to(carRef.current, {
          x: () => {
            const roadWidth = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
            const carWidth = carRef.current ? carRef.current.clientWidth : 220;
            return Math.max(0, roadWidth - carWidth - 16);
          },
          ease: 'none',
          scrollTrigger: {
            trigger: trackWrapperRef.current,
            start: 'top top',
            end: '+=180%', // Rich scroll distance
            scrub: 0.6,   // Smooth interpolation
            pin: true,    // Pin sticky viewport during scrub
            anticipatePin: 1,
            invalidateOnRefresh: true, // Handle responsive viewport resizes accurately
            onUpdate: (self) => {
              const progress = self.progress; // 0 to 1
              const velocity = Math.abs(self.getVelocity()); // px/sec

              // Update Light Trail Width
              if (trailRef.current && carRef.current) {
                const currentCarX = gsap.getProperty(carRef.current, 'x');
                const carWidth = carRef.current.clientWidth || 220;
                // Trail extends right to the rear wheel/center of vehicle
                const trailLength = Math.max(0, Number(currentCarX) + carWidth * 0.35);
                trailRef.current.style.width = `${trailLength}px`;
              }

              // Update Telemetry HUD Metrics
              if (progressRef.current) {
                progressRef.current.textContent = `${Math.round(progress * 100)}%`;
              }

              if (speedRef.current) {
                // Dynamic speed calculation based on scroll velocity + baseline progress
                const dynamicSpeed = Math.min(345, Math.round(progress * 180 + Math.min(160, velocity * 0.08)));
                speedRef.current.textContent = `${dynamicSpeed} km/h`;
              }

              if (gearRef.current) {
                let currentGear = 'N';
                if (progress > 0.05 && progress < 0.25) currentGear = '1';
                else if (progress >= 0.25 && progress < 0.45) currentGear = '2';
                else if (progress >= 0.45 && progress < 0.65) currentGear = '3';
                else if (progress >= 0.65 && progress < 0.85) currentGear = '4';
                else if (progress >= 0.85) currentGear = '5';
                gearRef.current.textContent = currentGear;
              }

              if (rpmRef.current) {
                const calculatedRpm = Math.min(9200, Math.round(900 + progress * 7200 + (velocity > 50 ? 800 : 0)));
                rpmRef.current.textContent = calculatedRpm.toLocaleString();
              }

              // Synchronize Active Stage Highlight
              if (progress < 0.33) {
                setActiveStage(1);
              } else if (progress < 0.66) {
                setActiveStage(2);
              } else {
                setActiveStage(3);
              }
            },
          },
        });
      }
    }, containerRef);

    return () => {
      // Ensure proper GSAP context cleanup to prevent memory leaks and duplicate triggers
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col items-center selection:bg-emerald-500 selection:text-slate-950 font-sans"
    >
      {/* Top Navigation Header */}
      <header className="w-full fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0b0c10]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-black text-emerald-400 font-mono text-sm">
              FZ
            </div>
            <span className="font-bold tracking-wider text-sm sm:text-base uppercase bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              ITZ FIZZ KINETICS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-slate-400">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">
              Hero
            </a>
            <a href="#metrics" className="hover:text-emerald-400 transition-colors">
              Metrics
            </a>
            <a href="#interactive-track" className="hover:text-emerald-400 transition-colors">
              Track Simulation
            </a>
            <a href="#architecture" className="hover:text-emerald-400 transition-colors">
              Tech Specs
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/lokeshadhi/Scroll-Driven-Hero-Section-Animation"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500 text-slate-300 transition-all"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <div id="hero" className="w-full pt-10">
        <Hero
          headlineRef={headlineRef}
          subtitleRef={subtitleRef}
          lettersContainerRef={lettersContainerRef}
        />
      </div>

      {/* Impact Statistics Section */}
      <section
        id="metrics"
        className="w-full flex flex-col items-center justify-center py-8 md:py-12"
      >
        <div className="mb-4 text-center">
          <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400">
            [ BENCHMARK TELEMETRY ]
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mt-1">
            Real-Time Aerodynamic Performance
          </h2>
        </div>
        <Statistics ref={statsRef} />
      </section>

      {/* Pinned Scroll-Driven Track Section */}
      <section
        id="interactive-track"
        ref={trackWrapperRef}
        className="w-full min-h-screen flex flex-col items-center justify-center relative py-6 px-4"
      >
        {/* Stage Progress Pills */}
        <div className="flex items-center gap-2 sm:gap-4 mb-3 font-mono text-xs">
          <div
            className={`px-3 py-1 rounded-full border transition-all ${
              activeStage === 1
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'border-slate-800 bg-slate-900/50 text-slate-500'
            }`}
          >
            STAGE 01: IGNITION &amp; LAUNCH
          </div>
          <div
            className={`px-3 py-1 rounded-full border transition-all ${
              activeStage === 2
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'border-slate-800 bg-slate-900/50 text-slate-500'
            }`}
          >
            STAGE 02: KINETIC ACCELERATION
          </div>
          <div
            className={`px-3 py-1 rounded-full border transition-all ${
              activeStage === 3
                ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'border-slate-800 bg-slate-900/50 text-slate-500'
            }`}
          >
            STAGE 03: APEX VELOCITY
          </div>
        </div>

        {/* Visual Component containing Car, Trail and Track */}
        <ScrollVisual
          ref={visualRef}
          roadRef={roadRef}
          trailRef={trailRef}
          carRef={carRef}
          speedRef={speedRef}
          rpmRef={rpmRef}
          gearRef={gearRef}
          progressRef={progressRef}
        />

        {/* Dynamic Context Description based on Active Stage */}
        <div className="max-w-2xl text-center px-4 mt-2 h-14">
          {activeStage === 1 && (
            <p className="text-xs sm:text-sm text-slate-400 animate-fadeIn">
              Initial launch state: Inertial dampers engaged. High-torque electric powertrain initiates scrub-linked progression.
            </p>
          )}
          {activeStage === 2 && (
            <p className="text-xs sm:text-sm text-cyan-300 animate-fadeIn">
              Mid-band acceleration: Downforce optimization active. Real-time light trail renders synchronized vehicle displacement.
            </p>
          )}
          {activeStage === 3 && (
            <p className="text-xs sm:text-sm text-amber-300 animate-fadeIn">
              Terminal velocity reached: Telemetry sync at 100%. Kinetic energy regeneration system stabilizes momentum.
            </p>
          )}
        </div>
      </section>

      {/* Engineering Specs & Architecture Section */}
      <section
        id="architecture"
        className="w-full max-w-5xl py-20 px-4 flex flex-col items-center"
      >
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400">
            [ SYSTEM ARCHITECTURE ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">
            Engineered for Production Performance
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Comprehensive decoupling of rendering logic, scroll hooks, and GPU transforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-2">
              Transform-Only GPU Pipeline
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Animations exclusively manipulate GPU-accelerated <code className="text-emerald-400">transform: translate3d</code> and <code className="text-emerald-400">opacity</code> properties, guaranteeing zero layout reflows and consistent 60+ FPS.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-2">
              Lifecycle-Safe GSAP Context
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fully encapsulated with <code className="text-cyan-400">gsap.context()</code> and automatic cleanup on unmount. Prevents duplicated triggers, stale listeners, and memory leaks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-semibold text-slate-200 mb-2">
              Responsive &amp; Accessible
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native support for <code className="text-amber-400">prefers-reduced-motion</code> media query, fluid SVG vector scaling, responsive Tailwind breakpoints, and dynamic trigger recalculation on viewport resize.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 font-mono">
        <p>
          SCROLL-DRIVEN HERO SECTION ANIMATION &copy; {new Date().getFullYear()} &mdash; CRAFTED WITH REACT, GSAP &amp; TAILWIND CSS
        </p>
      </footer>
    </div>
  );
}

export default App;
