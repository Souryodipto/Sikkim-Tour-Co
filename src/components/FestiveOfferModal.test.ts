import { test } from 'node:test';
import assert from 'node:assert';
import { FESTIVE_OFFER_DETAILS } from './FestiveOfferModal';
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

test('Exact uploaded poster image exists in public folder', () => {
  const publicImagePath = path.resolve(process.cwd(), 'public', 'christmas-december-special.jpg');
  assert.ok(fs.existsSync(publicImagePath), `Poster image must exist at ${publicImagePath}`);

  const stats = fs.statSync(publicImagePath);
  assert.ok(stats.size > 100000, `Poster image file size should be substantial (actual: ${stats.size} bytes)`);
});
