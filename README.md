# Scroll-Driven Hero Section Animation — Production Implementation

[![Deploy to GitHub Pages](https://github.com/lokeshadhi/Scroll-Driven-Hero-Section-Animation/actions/workflows/deploy.yml/badge.svg)](https://github.com/lokeshadhi/Scroll-Driven-Hero-Section-Animation/actions/workflows/deploy.yml)

A high-performance, responsive scroll-driven hero section animation built with **React**, **GSAP**, **ScrollTrigger**, and **Tailwind CSS**.

- **Live Demo:** [https://lokeshadhi.github.io/Scroll-Driven-Hero-Section-Animation/](https://lokeshadhi.github.io/Scroll-Driven-Hero-Section-Animation/)
- **Repository:** [https://github.com/lokeshadhi/Scroll-Driven-Hero-Section-Animation](https://github.com/lokeshadhi/Scroll-Driven-Hero-Section-Animation)

---

## 🎯 Architecture & Visual Experience

### 1. Headline & Kinetic Entrance Sequence
- **Typography:** Features the signature spaced headline: `W E L C O M E  I T Z  F I Z Z`.
- **GSAP Stagger Timeline:** Characters reveal with vertical translation (`y: 35`), subtle perspective rotation, and elasticity (`ease: 'back.out(1.4)'`).
- **Sequential Metric Reveal:** Four impact statistics blocks slide up with sequential stagger delay.
- **Vehicle Ignition:** The original aerodynamic hypercar vector enters into starting alignment.

### 2. Core Feature: Scrub-Linked Scroll Interaction
- **GSAP ScrollTrigger:** Pinned track wrapper with bidirectional scrubbing (`scrub: 0.5`).
- **GPU-Accelerated Kinematics:** Vehicle translation is driven strictly by GPU-accelerated `transform` calculations (`x` coordinates) with boundary auto-detection across desktop, tablet, and mobile viewports.
- **Dynamic Light Trail:** Tail light trail width synchronizes in real time with displacement along the high-speed track.
- **Telemetry HUD:** Live sub-millisecond calculation of scroll velocity, dynamic speed (km/h), gearbox shift simulation, and RPM feedback without triggering React re-render overhead.
- **Stage Milestones:** Smooth transition through 3 mission stages:
  - `STAGE 01`: Ignition & Launch
  - `STAGE 02`: Kinetic Acceleration
  - `STAGE 03`: Apex Velocity

### 3. Frontend Performance & Accessibility
- **Zero Layout Shifts:** Transforms and opacities prevent costly reflows; 60+ FPS guaranteed.
- **Direct DOM Updates on Scrub:** High-frequency telemetry updates bypass React state cycles for optimal frame rates.
- **GSAP Context Lifecycle Safety:** Complete cleanup with `ctx.revert()` on component unmount to prevent memory leaks and duplicate listeners.
- **Accessibility:** Fully honors `prefers-reduced-motion` with an instant accessible fallback state.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite
- **Animation Engine:** GSAP 3 + ScrollTrigger
- **Styling:** Tailwind CSS v4 + PostCSS
- **Linting & Quality:** Oxlint
- **Hosting & CI/CD:** GitHub Pages + GitHub Actions

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lokeshadhi/Scroll-Driven-Hero-Section-Animation.git
   cd Scroll-Driven-Hero-Section-Animation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local dev server:**
   ```bash
   npm run dev
   ```

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 📦 Project Structure

```
Scroll-Driven-Hero-Section-Animation/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD
├── public/
│   ├── vehicle.svg             # Original aerodynamic hypercar asset
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.jsx            # Spaced headline, subtitles, and CTA buttons
│   │   ├── Statistics.jsx      # Impact metric cards with glassmorphism
│   │   └── ScrollVisual.jsx    # Kinetic track, trail, vehicle, and HUD
│   ├── App.jsx                 # GSAP timeline, ScrollTrigger, and stage logic
│   ├── index.css               # Tailwind CSS base and theme rules
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js              # Configured base path for GitHub Pages
```

---

## 📄 License
MIT License &copy; 2026
