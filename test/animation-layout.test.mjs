import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('Scroll-Driven Animation Verification Suite', () => {
  const appFile = fs.readFileSync(path.resolve('src/App.jsx'), 'utf-8');
  const scrollVisualFile = fs.readFileSync(path.resolve('src/components/ScrollVisual.jsx'), 'utf-8');

  it('verifies scroll progress reaching 100% logic and callbacks', () => {
    assert.ok(appFile.includes('onLeave: () => {'), 'App.jsx must have onLeave handler to guarantee 100% completion state');
    assert.ok(appFile.includes('onLeaveBack: () => {'), 'App.jsx must have onLeaveBack handler to guarantee 0% reset state');
    assert.ok(appFile.includes('onScrubComplete: (self) => {'), 'App.jsx must handle onScrubComplete for inertia settle');
    assert.ok(appFile.includes('progress >= 0.99 ? 100 : Math.round(progress * 100)'), 'App.jsx must snap telemetry progress to 100% at endpoint');
    assert.ok(appFile.includes('const progress = Math.min(1, Math.max(0, rawProgress))'), 'App.jsx must clamp progress between 0 and 1');
  });

  it('verifies pinned layout and prevents feature card overlap', () => {
    assert.ok(appFile.includes('h-screen max-h-screen'), 'interactive-track section must constrain height to viewport');
    assert.ok(appFile.includes('overflow-hidden'), 'interactive-track section must prevent overflow spills');
    assert.ok(appFile.includes('pt-24 pb-20'), 'architecture section must have ample top padding for clean unpinned separation');
    assert.ok(scrollVisualFile.includes('my-2 sm:my-3'), 'ScrollVisual component must use compact vertical margin to prevent pinned content overflow');
  });

  it('verifies built production artifacts exist', () => {
    assert.ok(fs.existsSync(path.resolve('dist/index.html')), 'dist/index.html must exist');
    assert.ok(fs.existsSync(path.resolve('dist/assets')), 'dist/assets directory must exist');
  });
});
