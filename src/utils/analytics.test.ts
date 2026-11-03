import test from 'node:test';
import assert from 'node:assert/strict';
import {
  initLeadAttribution,
  getStoredAttribution,
  getLeadSourceLabel,
  trackWhatsAppClick,
  trackEnquirySubmit,
  trackPackageView,
  trackPhoneClick,
  trackBookingConfirmed,
} from './analytics';
import { generatePackageWhatsAppMessage } from './enquiry';

test('initLeadAttribution returns default values in node/server environment', () => {
  const attr = initLeadAttribution();
  assert.ok(attr.referrer);
  assert.ok(attr.landing_page);
  assert.ok(attr.captured_at);
});

test('getLeadSourceLabel produces readable attribution label', () => {
  const label = getLeadSourceLabel();
  assert.ok(typeof label === 'string');
  assert.ok(label.length > 0);
});

test('generatePackageWhatsAppMessage formats structured package enquiry', () => {
  const msg = generatePackageWhatsAppMessage({
    packageName: 'North Sikkim Adventure',
    duration: '5 Days / 4 Nights',
    startingPrice: '₹14,500 / person',
    adults: 3,
    children: 1,
    travelDate: '2026-04-15',
    leadSource: 'Google Organic / Search',
  });

  assert.ok(msg.includes('North Sikkim Adventure'));
  assert.ok(msg.includes('5 Days / 4 Nights'));
  assert.ok(msg.includes('₹14,500'));
  assert.ok(msg.includes('3 Adults'));
  assert.ok(msg.includes('1 Children'));
  assert.ok(msg.includes('2026-04-15'));
  assert.ok(msg.includes('Ref: Google Organic / Search'));
});

test('analytics event triggers execute safely without window object', () => {
  // Should not throw in headless or SSR/node environment
  assert.doesNotThrow(() => {
    trackWhatsAppClick({ cta_location: 'test_cta', package_name: 'Gangtok Escape' });
    trackPhoneClick({ click_location: 'test_navbar' });
    trackPackageView({ package_id: 'test-pkg', package_name: 'Test Package', region: 'North Sikkim', duration: '3D/2N' });
    trackEnquirySubmit({
      enquiry_id: 'SK-2026-9999',
      destinations: ['Gangtok', 'Pelling'],
      adults: 2,
      children: 0,
      budget: '₹20,000 – ₹40,000',
      source_page: '/packages',
    });
    trackBookingConfirmed({ booking_id: 'BK-2026-1234', value: 36000 });
  });
});

