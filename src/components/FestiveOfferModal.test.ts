import { test } from 'node:test';
import assert from 'node:assert';
import { FESTIVE_OFFER_DETAILS } from './FestiveOfferModal';
import { FESTIVE_ANNOUNCEMENT_DATA } from '../data/festiveAnnouncement';
import fs from 'node:fs';
import path from 'node:path';

test('Festive offer details contains exact pricing and destination specs from poster', () => {
  assert.strictEqual(FESTIVE_OFFER_DETAILS.title, 'Christmas & December Special');
  assert.strictEqual(FESTIVE_OFFER_DETAILS.specialPrice, '₹9,999/-');
  assert.strictEqual(FESTIVE_OFFER_DETAILS.originalPrice, '₹18,999/-');
  assert.strictEqual(FESTIVE_OFFER_DETAILS.contactPhone, '+91 7001846727');

  const destinationNames = FESTIVE_OFFER_DETAILS.destinations.map((d) => d.name);
  assert.ok(destinationNames.includes('Tsomgo Lake'), 'Must include Tsomgo Lake');
  assert.ok(destinationNames.includes('Nathula Pass'), 'Must include Nathula Pass');
  assert.ok(destinationNames.includes('Baba Mandir'), 'Must include Baba Mandir');
});

test('Festive announcement dataset contains all 11 specified attractions with descriptions', () => {
  assert.strictEqual(FESTIVE_ANNOUNCEMENT_DATA.attractions.length, 11, 'Must have exactly 11 attractions');

  const expectedNames = [
    'Tsomgo Lake',
    'Nathula Pass',
    'Baba Mandir',
    'Tashi View Point',
    'Hanuman Tok',
    'Banjhakri Falls',
    'Bakthang Waterfalls',
    'Orchid Show',
    'Ganesh Tok',
    'MG Marg, Gangtok',
    'Lal Bazaar',
  ];

  for (const name of expectedNames) {
    const attraction = FESTIVE_ANNOUNCEMENT_DATA.attractions.find((a) => a.name === name);
    assert.ok(attraction, `Attraction ${name} must be present`);
    assert.ok(attraction.description.length > 20, `Attraction ${name} must have detailed description`);
  }
});

test('Festive announcement contains why-choose points, important notes, and full formatted text', () => {
  assert.ok(FESTIVE_ANNOUNCEMENT_DATA.whyChoosePoints.length >= 7, 'Must have at least 7 why-choose points');
  assert.ok(FESTIVE_ANNOUNCEMENT_DATA.importantNotes.length >= 4, 'Must have at least 4 important notes');
  assert.ok(FESTIVE_ANNOUNCEMENT_DATA.fullFormattedText.includes('🔥 NOW JUST ₹9,999/- PER PERSON! 🔥'));
  assert.ok(FESTIVE_ANNOUNCEMENT_DATA.fullFormattedText.includes('+91 7001846727'));
});

test('Exact uploaded poster image exists in public folder', () => {
  const publicImagePath = path.resolve(process.cwd(), 'public', 'christmas-december-special.jpg');
  assert.ok(fs.existsSync(publicImagePath), `Poster image must exist at ${publicImagePath}`);

  const stats = fs.statSync(publicImagePath);
  assert.ok(stats.size > 100000, `Poster image file size should be substantial (actual: ${stats.size} bytes)`);
});
