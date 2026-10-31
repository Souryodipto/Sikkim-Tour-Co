import test from 'node:test';
import assert from 'node:assert/strict';
import { getSearchIndex, searchSite } from './searchIndex';

test('Search index generates items across all categories', () => {
  const index = getSearchIndex();
  assert.ok(index.length >= 35, `Expected at least 35 searchable items, got ${index.length}`);

  const categories = new Set(index.map((i) => i.category));
  assert.ok(categories.has('destinations'), 'Should include primary districts');
  assert.ok(categories.has('spots'), 'Should include tourist spots');
  assert.ok(categories.has('packages'), 'Should include tour packages');
  assert.ok(categories.has('guides'), 'Should include travel guides');
  assert.ok(categories.has('experiences'), 'Should include experiences');
});

test('Search query finds specific tourist spots and destinations', () => {
  // Query "Gurudongmar"
  const guruResults = searchSite('Gurudongmar');
  assert.ok(guruResults.length > 0, 'Should find results for Gurudongmar');
  const topResult = guruResults[0];
  assert.ok(
    topResult.title.toLowerCase().includes('gurudongmar') ||
    topResult.keywords.some((k) => k.includes('gurudongmar')),
    'Top result should be Gurudongmar Lake'
  );
  assert.ok(topResult.url.includes('/destinations/'), 'Should link to destination page');

  // Query "Pelling"
  const pellingResults = searchSite('Pelling');
  assert.ok(pellingResults.length > 0, 'Should find results for Pelling');
  assert.ok(pellingResults.some((r) => r.title.toLowerCase().includes('pelling')));

  // Query "Nathula"
  const nathulaResults = searchSite('Nathula');
  assert.ok(nathulaResults.length > 0, 'Should find results for Nathula Pass');
});

test('Search query finds tour packages and 14-day circuits', () => {
  const pkgResults = searchSite('14 days');
  assert.ok(pkgResults.length > 0, 'Should find results for 14 days');
  const has14Day = pkgResults.some(
    (r) => r.title.includes('14') || r.description.includes('14') || r.meta.includes('14')
  );
  assert.ok(has14Day, 'Should contain 14-day circuit packages or guides');
});

test('Category filtering restricts results appropriately', () => {
  const packageOnly = searchSite('Sikkim', 'packages');
  assert.ok(packageOnly.length > 0, 'Should find packages');
  assert.ok(
    packageOnly.every((r) => r.category === 'packages'),
    'All results should have category "packages"'
  );

  const guidesOnly = searchSite('Permits', 'guides');
  assert.ok(guidesOnly.length > 0, 'Should find permit guides');
  assert.ok(
    guidesOnly.every((r) => r.category === 'guides'),
    'All results should have category "guides"'
  );
});

test('Empty query returns appropriate responses', () => {
  const emptyAll = searchSite('');
  assert.equal(emptyAll.length, 0, 'Empty query with "all" should return empty array');

  const emptyPackages = searchSite('', 'packages');
  assert.ok(emptyPackages.length > 0, 'Empty query with category="packages" should list packages');
});
