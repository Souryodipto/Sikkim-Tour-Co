import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('SnowWhiteIntroAnimation component file exists and is strictly snow-white themed', () => {
  const componentPath = path.resolve(process.cwd(), 'src', 'components', 'SnowWhiteIntroAnimation.tsx');
  assert.ok(fs.existsSync(componentPath), 'SnowWhiteIntroAnimation.tsx must exist');

  const content = fs.readFileSync(componentPath, 'utf8');

  // Verify that old heavy canvas or multi-color flag elements are not present
  assert.ok(!content.includes('MountainSnowBurstCanvas'), 'Must not reference MountainSnowBurstCanvas');
  assert.ok(!content.includes('Prayer Flag'), 'Must not contain prayer flags');
  assert.ok(!content.includes('413 ft'), 'Must not contain heavy elevation counter');

  // Verify pure snow white elements
  assert.ok(content.includes('#FFFFFF') || content.includes('text-white'), 'Must feature pure snow white');
  assert.ok(content.includes('stroke="#FFFFFF"'), 'Must render vector strokes in pure white');

  // Verify lengthier rich duration
  assert.ok(content.includes('durationMs = 3200'), 'Must use 3200ms duration for lengthier animation');
  assert.ok(content.includes('2400'), 'Must provide 2400ms duration for mobile');
});

test('App.tsx cleanly mounts SnowWhiteIntroAnimation and removes old loader', () => {
  const appPath = path.resolve(process.cwd(), 'src', 'App.tsx');
  const content = fs.readFileSync(appPath, 'utf8');

  assert.ok(content.includes('SnowWhiteIntroAnimation'), 'App.tsx must mount SnowWhiteIntroAnimation');
  assert.ok(!content.includes('HimalayanLoadingScreen'), 'App.tsx must not reference HimalayanLoadingScreen');
});
