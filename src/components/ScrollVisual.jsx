import React, { forwardRef } from 'react';

/**
 * ScrollVisual Component
 * Renders the highway track, kinetic light trail, hypercar vehicle, and telemetry HUD overlays.
 * The car and trail element positions are directly linked to scroll progress via GSAP ScrollTrigger.
 */
const ScrollVisual = forwardRef(
  (
    {
      vehicleSrc = `${import.meta.env.BASE_URL}vehicle.svg`,
      roadRef,
      trailRef,
      carRef,
      speedRef,
      rpmRef,
      gearRef,
      progressRef,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-7xl px-4 my-2 sm:my-3 flex flex-col items-center select-none"
        aria-hidden="true"
      >
        {/* Telemetry Dashboard Banner */}
        <div className="w-full flex items-center justify-between py-2 px-4 mb-2 border-b border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-widest uppercase text-slate-300">
              PHYSICS ENGINE ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-slate-500">DYNAMIC SCROLL:</span>
              <span ref={progressRef} className="text-emerald-400 font-semibold w-9 text-right">
                0%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500">VELOCITY:</span>
              <span ref={speedRef} className="text-cyan-400 font-semibold w-14 text-right">
                0 km/h
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="text-slate-500">GEAR:</span>
              <span ref={gearRef} className="text-emerald-300 font-semibold">
                N
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="text-slate-500">RPM:</span>
              <span ref={rpmRef} className="text-amber-400 font-semibold w-14 text-right">
                900
              </span>
            </div>
          </div>
        </div>

        {/* High-speed Kinetic Track Canvas */}
        <div
          ref={roadRef}
          className="relative w-full h-44 sm:h-52 md:h-64 rounded-3xl overflow-hidden bg-gradient-to-b from-slate-950 via-[#0d131f] to-slate-950 border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {/* Track Grid and Horizon Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Upper and Lower Neon Road Curbs */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500/20 via-cyan-400/40 to-emerald-500/20 shadow-[0_0_12px_rgba(56,189,248,0.3)]" />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500/20 via-cyan-400/40 to-emerald-500/20 shadow-[0_0_12px_rgba(56,189,248,0.3)]" />

          {/* Road Center Dotted Markings */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 flex items-center justify-between px-2 gap-4 opacity-30">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="h-0.5 flex-1 max-w-[28px] bg-slate-300 rounded-full"
              />
            ))}
          </div>

          {/* Dynamic Light Trail behind the Vehicle */}
          <div
            ref={trailRef}
            className="absolute top-0 bottom-0 left-0 pointer-events-none z-10 transition-none"
            style={{
              width: '0px',
              background:
                'linear-gradient(90deg, rgba(0,255,136,0.02) 0%, rgba(0,245,212,0.18) 70%, rgba(0,255,136,0.45) 100%)',
              borderRight: '2px solid rgba(0,255,136,0.9)',
              boxShadow: '0 0 30px rgba(0,255,136,0.35)',
            }}
          />

          {/* Vehicle Visual Object */}
          <div
            ref={carRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-20 cursor-grab active:cursor-grabbing will-change-transform"
            style={{ width: 'clamp(180px, 24vw, 320px)' }}
          >
            <img
              src={vehicleSrc}
              alt="Cyber Aerodynamic Hypercar"
              className="w-full h-auto drop-shadow-[0_15px_25px_rgba(0,255,136,0.25)] select-none pointer-events-none"
              loading="eager"
            />
          </div>

          {/* Track Milestone Labels */}
          <div className="absolute bottom-3 left-6 text-[10px] font-mono text-slate-500 tracking-wider">
            START LINE // 00.00 KM
          </div>
          <div className="absolute bottom-3 right-6 text-[10px] font-mono text-slate-500 tracking-wider">
            FINISH PROTOCOL // 100.00 KM
          </div>
        </div>

        {/* Sub-track Scroll Guidance */}
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span className="inline-block animate-bounce">↓</span>
          <span>SCROLL DOWN TO ENGAGE PROPULSION &amp; DISCOVER STAGES</span>
        </div>
      </div>
    );
  }
);

ScrollVisual.displayName = 'ScrollVisual';

export default ScrollVisual;
