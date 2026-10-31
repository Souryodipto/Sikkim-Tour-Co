import test from 'node:test';
import assert from 'node:assert/strict';
import { initialReviewsData, getAllReviews } from '../data/reviews';

test('Reviews dataset contains over 100 verified reviews', () => {
  assert.ok(
    initialReviewsData.length >= 100,
    `Expected at least 100 reviews, got ${initialReviewsData.length}`
  );
});

test('Reviews dataset contains both Indian and international travelers', () => {
  const indianReviews = initialReviewsData.filter((r) => r.originType === 'indian');
  const internationalReviews = initialReviewsData.filter((r) => r.originType === 'international');

  assert.ok(
    indianReviews.length >= 40,
    `Expected at least 40 Indian reviews, got ${indianReviews.length}`
  );
  assert.ok(
    internationalReviews.length >= 30,
    `Expected at least 30 international reviews, got ${internationalReviews.length}`
  );

  // Check domestic Indian cities
  const origins = indianReviews.map((r) => r.origin.toLowerCase()).join(' ');
  assert.ok(origins.includes('mumbai'), 'Should contain reviews from Mumbai');
  assert.ok(origins.includes('kolkata'), 'Should contain reviews from Kolkata');
  assert.ok(origins.includes('delhi'), 'Should contain reviews from Delhi');
  assert.ok(origins.includes('bengaluru'), 'Should contain reviews from Bengaluru');

  // Check international nationalities
  const nationalities = internationalReviews.map((r) => r.nationality.toLowerCase()).join(' ');
  assert.ok(nationalities.includes('british') || nationalities.includes('american'), 'Should contain British or American travelers');
  assert.ok(nationalities.includes('french') || nationalities.includes('german'), 'Should contain French or German travelers');
  assert.ok(nationalities.includes('japanese') || nationalities.includes('australian'), 'Should contain Japanese or Australian travelers');
});

test('All reviews have valid ratings (3, 4, or 5) and verified status', () => {
  for (const review of initialReviewsData) {
    assert.ok(review.rating >= 3 && review.rating <= 5, `Invalid rating ${review.rating} for review ${review.id}`);
    assert.ok(review.authorName.length > 2, `Author name too short in review ${review.id}`);
    assert.ok(review.reviewTitle.length > 3, `Review title too short in review ${review.id}`);
    assert.ok(review.reviewText.length > 20, `Review text too short in review ${review.id}`);
    assert.equal(review.verified, true, `Review ${review.id} should be verified`);
  }

  // Ensure realistic variety with 3-star, 4-star, and 5-star reviews
  const has3Star = initialReviewsData.some((r) => r.rating === 3);
  const has4Star = initialReviewsData.some((r) => r.rating === 4);
  const has5Star = initialReviewsData.some((r) => r.rating === 5);
  assert.ok(has3Star, 'Dataset should contain genuine 3-star reviews');
  assert.ok(has4Star, 'Dataset should contain genuine 4-star reviews');
  assert.ok(has5Star, 'Dataset should contain 5-star reviews');
});

test('Average rating is realistic and genuine between 4.3 and 4.5', () => {
  const avg = initialReviewsData.reduce((acc, r) => acc + r.rating, 0) / initialReviewsData.length;
  assert.ok(avg >= 4.3 && avg <= 4.5, `Average rating ${avg.toFixed(3)} outside expected range (4.3 - 4.5)`);
  assert.equal(avg.toFixed(1), '4.4', 'Display rating should round to 4.4 out of 5.0');
});

