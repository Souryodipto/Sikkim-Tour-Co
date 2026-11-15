import test from 'node:test';
import assert from 'node:assert/strict';
import { sharePackage } from './share';

test('sharePackage formats canonical URL and handles node/ssr environment', async () => {
  const res = await sharePackage({
    slug: 'sikkim-5n6d-classic-north-sikkim-loop',
    name: 'Classic North Sikkim Loop',
    duration: '5 Nights / 6 Days',
  });

  assert.equal(
    res.url,
    'https://www.sikkimtourco.com/packages/sikkim-5n6d-classic-north-sikkim-loop'
  );
  assert.equal(typeof res.copied, 'boolean');
  assert.equal(typeof res.shared, 'boolean');
});
