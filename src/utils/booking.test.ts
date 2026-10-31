import { test } from 'node:test';
import assert from 'node:assert';
import {
  calculatePricingBreakdown,
  validateCoupon,
  bookingFormSchema,
} from './booking';

test('calculatePricingBreakdown computes correct base fare and taxes', () => {
  const result = calculatePricingBreakdown({
    basePriceInr: 10000,
    adultCount: 2,
    childCount: 1, // 60% of 10000 = 6000 -> Total travelerBase = 26000
    accommodationCategory: 'Standard', // 1.0 multiplier
    vehicleType: 'Shared Mountain 4x4', // 0 surcharge
    addOns: [],
  });

  assert.strictEqual(result.baseAmountInr, 26000);
  assert.strictEqual(result.subtotalInr, 26000);
  // 5% GST of 26000 = 1300
  assert.strictEqual(result.taxGstInr, 1300);
  assert.strictEqual(result.totalAmountInr, 27300);
  assert.strictEqual(result.currency, 'INR');
});

test('calculatePricingBreakdown applies Deluxe accommodation and vehicle upgrade', () => {
  const result = calculatePricingBreakdown({
    basePriceInr: 20000,
    adultCount: 2,
    childCount: 0,
    accommodationCategory: 'Deluxe', // 1.15 multiplier -> 40000 * 1.15 = 46000
    vehicleType: 'Dedicated SUV (Innova/Scorpio)', // +4500
    addOns: [{ priceInr: 1500 }],
  });

  assert.strictEqual(result.baseAmountInr, 46000);
  assert.strictEqual(result.vehicleUpgradeInr, 4500);
  assert.strictEqual(result.addOnsInr, 1500);
  assert.strictEqual(result.subtotalInr, 52000);
  assert.strictEqual(result.taxGstInr, 2600);
  assert.strictEqual(result.totalAmountInr, 54600);
});

test('validateCoupon correctly discounts HIMALAYA10 and enforces minimums', () => {
  // Below minimum
  const belowMin = validateCoupon('HIMALAYA10', 10000);
  assert.strictEqual(belowMin.valid, false);

  // Valid 10%
  const valid = validateCoupon('HIMALAYA10', 30000);
  assert.strictEqual(valid.valid, true);
  assert.strictEqual(valid.discountInr, 3000);

  // Flat coupon EARLYBIRD
  const earlyBird = validateCoupon('EARLYBIRD', 25000);
  assert.strictEqual(earlyBird.valid, true);
  assert.strictEqual(earlyBird.discountInr, 2500);

  // Invalid coupon
  const invalid = validateCoupon('NONEXISTENT_CODE', 50000);
  assert.strictEqual(invalid.valid, false);
});

test('bookingFormSchema validates complete traveler payload', () => {
  const sample = {
    itemType: 'package',
    itemId: 'north-sikkim-adventure',
    itemSlug: 'north-sikkim-adventure',
    itemTitle: 'North Sikkim Alpine Expedition',
    travelStartDate: '2026-11-20',
    travelEndDate: '2026-11-25',
    adultCount: 2,
    childCount: 0,
    accommodationCategory: 'Deluxe',
    vehicleType: 'Dedicated SUV (Innova/Scorpio)',
    addOns: [],
    primaryTraveler: {
      fullName: 'Vikram Seth',
      email: 'vikram.seth@example.com',
      phone: '+91 98111 22233',
      nationality: 'India',
      idType: 'Voter ID',
      idNumber: 'DL/01/002/123456',
      pickupLocation: 'Bagdogra Airport (IXB)',
      emergencyContact: 'Meera Seth (+91 98111 22234)',
    },
    paymentMethod: 'card',
    agreeToTerms: true,
  };

  const parsed = bookingFormSchema.safeParse(sample);
  assert.strictEqual(parsed.success, true);
});
