import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  tourPackagesData,
  northSikkimPackages,
  eastSikkimPackages,
  westSikkimPackages,
  southSikkimPackages,
} from '../data/packages';
import { parsePath } from '../context/RouterContext';

describe('Sikkim Curated PDF Packages Dataset Verification', () => {
  it('contains exactly 36 curated Sikkim tour packages from the 6 uploaded PDFs', () => {
    assert.equal(tourPackagesData.length, 36, `Expected 36 packages, found ${tourPackagesData.length}`);
  });

  it('contains exact package counts across all PDF duration categories', () => {
    const p2n3d = tourPackagesData.filter((p) => p.durationCategory === '2N/3D');
    const p3n4d = tourPackagesData.filter((p) => p.durationCategory === '3N/4D');
    const p4n5d = tourPackagesData.filter((p) => p.durationCategory === '4N/5D');
    const p5n6d = tourPackagesData.filter((p) => p.durationCategory === '5N/6D');
    const p6n7d = tourPackagesData.filter((p) => p.durationCategory === '6N/7D');
    const plong = tourPackagesData.filter((p) => p.durationCategory === '7N+');

    assert.equal(p2n3d.length, 4, 'Expected 4 packages in 2N/3D guide');
    assert.equal(p3n4d.length, 6, 'Expected 6 packages in 3N/4D guide');
    assert.equal(p4n5d.length, 6, 'Expected 6 packages in 4N/5D guide');
    assert.equal(p5n6d.length, 6, 'Expected 6 packages in 5N/6D guide');
    assert.equal(p6n7d.length, 6, 'Expected 6 packages in 6N/7D guide');
    assert.equal(plong.length, 8, 'Expected 8 packages in Long Duration guide (7N8D to 15N16D)');
  });

  it('ensures all 36 packages have unique IDs and slugs', () => {
    const ids = new Set<string>();
    const slugs = new Set<string>();

    for (const pkg of tourPackagesData) {
      assert.ok(!ids.has(pkg.id), `Duplicate ID detected: ${pkg.id}`);
      assert.ok(!slugs.has(pkg.slug), `Duplicate slug detected: ${pkg.slug}`);
      ids.add(pkg.id);
      slugs.add(pkg.slug);
    }

    assert.equal(ids.size, 36);
    assert.equal(slugs.size, 36);
  });

  it('ensures no invented prices and all packages are labeled for quotation', () => {
    for (const pkg of tourPackagesData) {
      assert.equal(
        pkg.startingPriceInr,
        0,
        `Package ${pkg.name} has starting price ${pkg.startingPriceInr}, must be 0 (no invented prices)`
      );
      assert.ok(
        (pkg.startingPriceNote || '').toLowerCase().includes('custom quote') ||
          (pkg.startingPriceNote || '').toLowerCase().includes('request'),
        `Package ${pkg.name} missing custom quote label`
      );
    }
  });

  it('ensures every package has detailed day-by-day itineraries with distances and drive times', () => {
    for (const pkg of tourPackagesData) {
      assert.ok(pkg.detailedItinerary && pkg.detailedItinerary.length > 0, `Package ${pkg.name} has no detailed itinerary`);
      assert.equal(
        pkg.detailedItinerary.length,
        pkg.daysCount,
        `Package ${pkg.name} daysCount (${pkg.daysCount}) does not match detailedItinerary length (${pkg.detailedItinerary.length})`
      );

      for (const day of pkg.detailedItinerary) {
        assert.ok(day.day > 0, `Invalid day number in ${pkg.name}`);
        assert.ok(day.title.length > 0, `Missing day title in ${pkg.name} Day ${day.day}`);
        assert.ok(day.description.length > 0, `Missing day description in ${pkg.name} Day ${day.day}`);
        assert.ok(day.route && day.route.length > 0, `Missing route in ${pkg.name} Day ${day.day}`);
        assert.ok(day.driveTime && day.driveTime.length > 0, `Missing drive time in ${pkg.name} Day ${day.day}`);
        assert.ok(day.overnightStay && day.overnightStay.length > 0, `Missing stay in ${pkg.name} Day ${day.day}`);
      }
    }
  });

  it('ensures all packages have routeOverview, themes, and permit requirements', () => {
    for (const pkg of tourPackagesData) {
      assert.ok(pkg.routeOverview && pkg.routeOverview.length > 0, `Package ${pkg.name} missing routeOverview`);
      assert.ok(pkg.themes && pkg.themes.length > 0, `Package ${pkg.name} missing themes`);
      assert.ok(pkg.permitRequirements && pkg.permitRequirements.length > 0, `Package ${pkg.name} missing permitRequirements`);
      assert.ok(pkg.inclusions && pkg.inclusions.length > 0, `Package ${pkg.name} missing inclusions`);
      assert.ok(pkg.exclusions && pkg.exclusions.length > 0, `Package ${pkg.name} missing exclusions`);
    }
  });

  it('ensures regional slices include multi-region circuits without duplicate records', () => {
    assert.ok(northSikkimPackages.length >= 10, 'Expected at least 10 packages covering North Sikkim');
    assert.ok(eastSikkimPackages.length >= 10, 'Expected at least 10 packages covering East Sikkim');
    assert.ok(westSikkimPackages.length >= 10, 'Expected at least 10 packages covering West Sikkim');
    assert.ok(southSikkimPackages.length >= 10, 'Expected at least 10 packages covering South Sikkim');

    for (const p of northSikkimPackages) {
      assert.ok(
        p.region === 'North Sikkim' || p.districtsCovered.includes('North Sikkim'),
        `${p.name} should cover North Sikkim`
      );
    }
  });

  it('verifies route parsing for dedicated Sikkim destination hub', () => {
    const route1 = parsePath('/destinations/sikkim');
    assert.equal(route1.view, 'sikkim-destination');

    const route2 = parsePath('/sikkim');
    assert.equal(route2.view, 'sikkim-destination');

    const route3 = parsePath('/packages?region=North%20Sikkim');
    assert.equal(route3.view, 'packages');
    assert.equal(route3.queryParams.region, 'North Sikkim');
  });

  it('ensures all 36 packages guarantee all meals, private car from Day 1, and all permits & parking', () => {
    for (const pkg of tourPackagesData) {
      // 1. All meals verification
      assert.ok(
        pkg.mealsSummary.toLowerCase().includes('all meals') &&
          pkg.mealsSummary.toLowerCase().includes('breakfast') &&
          pkg.mealsSummary.toLowerCase().includes('lunch') &&
          pkg.mealsSummary.toLowerCase().includes('dinner') &&
          pkg.mealsSummary.toLowerCase().includes('snacks'),
        `Package ${pkg.name} missing comprehensive meals summary: ${pkg.mealsSummary}`
      );

      // 2. Private car from Day 1 (Baleno / Dzire or Innova Crysta) as per total travelers
      assert.ok(
        pkg.transportDetails.toLowerCase().includes('private car') &&
          pkg.transportDetails.toLowerCase().includes('day 1') &&
          pkg.transportDetails.toLowerCase().includes('baleno') &&
          pkg.transportDetails.toLowerCase().includes('innova crysta') &&
          pkg.transportDetails.toLowerCase().includes('total number of travelers'),
        `Package ${pkg.name} missing required private car fleet policy: ${pkg.transportDetails}`
      );

      // 3. Inclusions guarantee check
      const hasMealsInclusion = pkg.inclusions.some(
        (i) =>
          i.toLowerCase().includes('meals') &&
          i.toLowerCase().includes('breakfast') &&
          i.toLowerCase().includes('lunch') &&
          i.toLowerCase().includes('dinner')
      );
      assert.ok(hasMealsInclusion, `Package ${pkg.name} missing all-inclusive meals in inclusions`);

      const hasVehicleInclusion = pkg.inclusions.some(
        (i) =>
          i.toLowerCase().includes('private car') &&
          i.toLowerCase().includes('day 1') &&
          (i.toLowerCase().includes('baleno') || i.toLowerCase().includes('innova'))
      );
      assert.ok(hasVehicleInclusion, `Package ${pkg.name} missing private car in inclusions`);

      const hasPermitsInclusion = pkg.inclusions.some(
        (i) => i.toLowerCase().includes('permit') && (i.toLowerCase().includes('pap') || i.toLowerCase().includes('ilp'))
      );
      assert.ok(hasPermitsInclusion, `Package ${pkg.name} missing permits in inclusions`);

      const hasParkingInclusion = pkg.inclusions.some((i) => i.toLowerCase().includes('parking'));
      assert.ok(hasParkingInclusion, `Package ${pkg.name} missing parking in inclusions`);
    }
  });
});

