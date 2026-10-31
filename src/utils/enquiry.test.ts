import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEnquiry,
  formatPrice,
  getBudgetOptions,
  generateEnquiryWhatsAppMessage,
  canTransitionStatus,
} from './enquiry';

test('validateEnquiry validates a complete and correct enquiry', () => {
  const sample = {
    fullName: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+919876543210',
    preferredContact: 'WhatsApp',
    travellerCategory: 'domestic',
    arrivalDate: '2026-11-10',
    departureDate: '2026-11-16',
    adultCount: 2,
    childCount: 0,
    destinations: ['Gangtok', 'Pelling'],
    startingCity: 'Bagdogra Airport (IXB)',
    budget: '₹20,000 – ₹40,000 per person',
    preferredCurrency: 'INR',
    hotelCategory: 'Deluxe (4-Star equivalent)',
    transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)',
    travelStyle: 'Honeymoon',
    specialRequests: 'High floor room with Kanchenjunga view',
    sourcePage: '/customise-trip',
  };

  const res = validateEnquiry(sample);
  assert.equal(res.success, true);
  if (res.success) {
    assert.equal(res.data.fullName, 'Ananya Sharma');
    assert.equal(res.data.destinations.length, 2);
  }
});

test('validateEnquiry catches missing or invalid email and empty destinations', () => {
  const invalidSample = {
    fullName: 'J', // too short
    email: 'not-an-email',
    phone: '12', // too short
    preferredContact: 'Email',
    travellerCategory: 'international',
    arrivalDate: '',
    departureDate: '',
    adultCount: 0, // must be at least 1
    destinations: [], // must have at least one
    startingCity: '',
    budget: '',
    hotelCategory: 'Standard (3-Star equivalent)',
    transportPreference: 'Standard Private Vehicle (WagonR/Bolero)',
    travelStyle: 'Family',
  };

  const res = validateEnquiry(invalidSample);
  assert.equal(res.success, false);
  if (!res.success) {
    assert.ok(res.errors.fullName);
    assert.ok(res.errors.email);
    assert.ok(res.errors.phone);
    assert.ok(res.errors.adultCount);
    assert.ok(res.errors.destinations);
  }
});

test('formatPrice formats INR and indicative USD correctly', () => {
  assert.equal(formatPrice(14999, 'INR'), '₹14,999');
  assert.equal(formatPrice(6999, 'INR'), '₹6,999');
  // At ~84 INR/USD, 84000 INR is ~1000 USD
  assert.equal(formatPrice(84000, 'USD'), 'US$1,000');
});

test('getBudgetOptions returns options for both currencies', () => {
  const inrOptions = getBudgetOptions('INR');
  const usdOptions = getBudgetOptions('USD');
  assert.ok(inrOptions.length >= 5);
  assert.ok(usdOptions.length >= 5);
  assert.ok(inrOptions.some(o => o.label.includes('₹10,000')));
  assert.ok(usdOptions.some(o => o.label.includes('$300')));
});

test('generateEnquiryWhatsAppMessage creates prefilled text with customer details', () => {
  const sample = {
    fullName: 'David Miller',
    email: 'david@example.com',
    phone: '+447911123456',
    preferredContact: 'WhatsApp' as const,
    travellerCategory: 'international' as const,
    nationality: 'British',
    arrivalDate: '2026-12-01',
    departureDate: '2026-12-08',
    adultCount: 2,
    childCount: 1,
    destinations: ['Gangtok', 'North Sikkim'],
    startingCity: 'Kolkata (CCU)',
    budget: '$600 – $1,000 per person',
    preferredCurrency: 'USD' as const,
    hotelCategory: 'Luxury Boutique / Heritage' as const,
    transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)' as const,
    travelStyle: 'Adventure' as const,
    specialRequests: 'Need guidance on Protected Area Permit for foreign nationals',
    sourcePage: '/packages/north-sikkim-adventure',
  };

  const msg = generateEnquiryWhatsAppMessage(sample);
  assert.ok(msg.includes('David Miller'));
  assert.ok(msg.includes('North Sikkim'));
  assert.ok(msg.includes('Protected Area Permit'));
});

test('canTransitionStatus rules', () => {
  assert.equal(canTransitionStatus('New', 'Contacted'), true);
  assert.equal(canTransitionStatus('Contacted', 'Quotation Sent'), true);
  assert.equal(canTransitionStatus('Confirmed', 'Follow-up Required'), true);
  assert.equal(canTransitionStatus('Confirmed', 'New'), false);
});
