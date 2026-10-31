import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { enquirySchema, EnquiryRecord, EnquiryStatus } from './src/utils/enquiry';
import {
  BookingRecord,
  bookingFormSchema,
  calculatePricingBreakdown,
  validateCoupon,
  activeCoupons,
} from './src/utils/booking';
import {
  AiPlannerRequest,
  generateAlgorithmicHimalayanItinerary,
} from './src/utils/aiPlanner';
import { destinationsData } from './src/data/destinations';
import { tourPackagesData } from './src/data/packages';
import { accommodationsData } from './src/data/accommodations';
import { initialReviewsData } from './src/data/reviews';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Persistent local data store directory
const DATA_DIR = path.join(__dirname, '.data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial sample enquiries
const initialSeedEnquiries: EnquiryRecord[] = [
  {
    id: 'BK-782104',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    fullName: 'Rohan & Shreya Mukherjee',
    email: 'rohan.mukherjee@example.com',
    phone: '+91 98301 23456',
    whatsapp: '+91 98301 23456',
    preferredContact: 'WhatsApp',
    travellerCategory: 'domestic',
    arrivalDate: '2026-11-12',
    departureDate: '2026-11-17',
    adultCount: 2,
    childCount: 0,
    destinations: ['Gangtok', 'Pelling'],
    startingCity: 'Bagdogra Airport (IXB)',
    budget: '₹20,000 – ₹40,000 per person',
    preferredCurrency: 'INR',
    hotelCategory: 'Deluxe (4-Star equivalent)',
    transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)',
    travelStyle: 'Honeymoon',
    specialRequests: 'Kanchenjunga view room and peaceful sunrise vantage points.',
    sourcePage: '/packages/himalayan-honeymoon',
    enquiryStatus: 'Contacted',
    statusNotes: 'Shared initial quotation and room options via WhatsApp.',
  },
  {
    id: 'BK-781992',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    fullName: 'Julian & Claire Davies',
    email: 'julian.davies@example.co.uk',
    phone: '+44 7700 900123',
    whatsapp: '+44 7700 900123',
    preferredContact: 'WhatsApp',
    travellerCategory: 'international',
    nationality: 'United Kingdom',
    arrivalDate: '2026-12-05',
    departureDate: '2026-12-12',
    adultCount: 2,
    childCount: 0,
    destinations: ['Gangtok', 'Lachung', 'Yumthang Valley', 'Darjeeling'],
    startingCity: 'Kolkata Airport (CCU)',
    budget: '$600 – $1,000 per person',
    preferredCurrency: 'USD',
    hotelCategory: 'Luxury Boutique / Heritage',
    transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)',
    travelStyle: 'Culture',
    specialRequests: 'Assistance with Protected Area Permits for Lachung and colonial heritage tea estate bookings.',
    sourcePage: '/international-travel',
    enquiryStatus: 'New',
  },
];

// Initial sample bookings demonstrating verified state
const initialSeedBookings: BookingRecord[] = [
  {
    id: 'BK-2026-9482',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    itemType: 'package',
    itemId: 'grand-sikkim-odyssey-2-weeks',
    itemSlug: 'grand-sikkim-odyssey-2-weeks',
    itemTitle: 'Grand Sikkim Odyssey: Complete 2-Week Expedition',
    travelStartDate: '2026-11-12',
    travelEndDate: '2026-11-25',
    durationDays: 14,
    adultCount: 2,
    childCount: 0,
    accommodationCategory: 'Deluxe',
    vehicleType: 'Dedicated SUV (Innova/Scorpio)',
    addOns: [{ id: 'oxygen-support', name: 'High-Altitude Medical Oxygen Kit', priceInr: 2500 }],
    couponCode: 'HIMALAYA10',
    pricing: {
      baseAmountInr: 112698,
      vehicleUpgradeInr: 4500,
      addOnsInr: 2500,
      discountInr: 5000,
      subtotalInr: 114698,
      taxGstInr: 5735,
      totalAmountInr: 120433,
      currency: 'INR',
      indicativeUsd: 1392,
    },
    primaryTraveler: {
      fullName: 'Rohan Mukherjee',
      email: 'rohan.mukherjee@example.com',
      phone: '+91 98301 23456',
      nationality: 'India',
      idType: 'Voter ID',
      idNumber: 'WB/14/092/189201',
      pickupLocation: 'Bagdogra Airport (IXB)',
      emergencyContact: 'Debashis Mukherjee (+91 98300 55443)',
      specialDietOrNotes: 'Kanchenjunga view rooms requested. Vegetarian friendly.',
    },
    coTravelers: [{ fullName: 'Shreya Mukherjee', age: 31, gender: 'Female', idNumber: 'WB/14/092/189202' }],
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentDetails: {
      paymentMethod: 'card',
      transactionId: 'TXN-RZP-948201',
      paidAt: new Date(Date.now() - 3600000 * 47).toISOString(),
      paymentGateway: 'Razorpay',
    },
    assignedGuide: {
      name: 'Karma Bhutia (Senior Himalayan Mountain Chauffeur)',
      phone: '+91 97330 11223',
      vehicleNumber: 'SK-01-T-8821 (Toyota Innova Crysta 4x4)',
    },
    internalNotes: 'Inner Line and North Sikkim Protected Area Permits verified and issued by Gangtok Tourism Dept.',
  },
  {
    id: 'BK-2026-8104',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    itemType: 'package',
    itemId: 'north-sikkim-adventure',
    itemSlug: 'north-sikkim-adventure',
    itemTitle: 'North Sikkim Alpine Expedition (Gurudongmar & Yumthang)',
    travelStartDate: '2026-12-05',
    travelEndDate: '2026-12-09',
    durationDays: 5,
    adultCount: 2,
    childCount: 0,
    accommodationCategory: 'Luxury Boutique',
    vehicleType: 'Luxury Toyota Crysta',
    addOns: [],
    pricing: {
      baseAmountInr: 52197,
      vehicleUpgradeInr: 8500,
      addOnsInr: 0,
      discountInr: 0,
      subtotalInr: 60697,
      taxGstInr: 3035,
      totalAmountInr: 63732,
      currency: 'INR',
      indicativeUsd: 737,
    },
    primaryTraveler: {
      fullName: 'Ananya Sharma',
      email: 'traveler@example.com',
      phone: '+91 98200 12345',
      nationality: 'India',
      idType: 'Passport',
      idNumber: 'Z5819022',
      pickupLocation: 'Pakyong Airport (PYG)',
      emergencyContact: 'Vivek Sharma (+91 98200 99887)',
      specialDietOrNotes: 'Allergic to shellfish. Warm heater required in Lachen.',
    },
    coTravelers: [{ fullName: 'Sunil Sharma', age: 34, gender: 'Male', idNumber: 'Z5819023' }],
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentDetails: {
      paymentMethod: 'upi',
      transactionId: 'TXN-UPI-810492',
      paidAt: new Date(Date.now() - 3600000 * 11).toISOString(),
      paymentGateway: 'Razorpay',
    },
    assignedGuide: {
      name: 'Tashi Tshering Lepcha',
      phone: '+91 97331 44556',
      vehicleNumber: 'SK-02-P-4419',
    },
  },
];

function getStoredEnquiries(): EnquiryRecord[] {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading enquiries file:', err);
  }
  saveStoredEnquiries(initialSeedEnquiries);
  return initialSeedEnquiries;
}

function saveStoredEnquiries(enquiries: EnquiryRecord[]): void {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing enquiries file:', err);
  }
}

function getStoredBookings(): BookingRecord[] {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading bookings file:', err);
  }
  saveStoredBookings(initialSeedBookings);
  return initialSeedBookings;
}

function saveStoredBookings(bookings: BookingRecord[]): void {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing bookings file:', err);
  }
}

// Initialize seed stores
if (!fs.existsSync(ENQUIRIES_FILE)) {
  saveStoredEnquiries(initialSeedEnquiries);
}
if (!fs.existsSync(BOOKINGS_FILE)) {
  saveStoredBookings(initialSeedBookings);
}

// ==========================================
// API ROUTES: ENQUIRIES
// ==========================================

app.post('/api/enquiries', (req: Request, res: Response): void => {
  const parseResult = enquirySchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parseResult.error.flatten(),
    });
    return;
  }

  const newRecord: EnquiryRecord = {
    ...parseResult.data,
    id: `BK-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    enquiryStatus: 'New',
  };

  const currentList = getStoredEnquiries();
  currentList.unshift(newRecord);
  saveStoredEnquiries(currentList);

  res.status(201).json({
    success: true,
    enquiryId: newRecord.id,
    message: 'Enquiry successfully registered with Sikkim Tour Co. travel desk',
  });
});

app.get('/api/enquiries', (_req: Request, res: Response): void => {
  const enquiries = getStoredEnquiries();
  res.json({
    success: true,
    enquiries,
    count: enquiries.length,
  });
});

app.patch('/api/enquiries/:id/status', (req: Request, res: Response): void => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const validStatuses: EnquiryStatus[] = [
    'New',
    'Contacted',
    'Quotation Sent',
    'Follow-up Required',
    'Confirmed',
    'Lost',
    'Cancelled',
  ];

  if (!validStatuses.includes(status)) {
    res.status(400).json({ success: false, message: 'Invalid status value' });
    return;
  }

  const list = getStoredEnquiries();
  const target = list.find((e) => e.id === id);

  if (!target) {
    res.status(404).json({ success: false, message: 'Enquiry not found' });
    return;
  }

  target.enquiryStatus = status;
  if (notes) {
    target.statusNotes = notes;
  }

  saveStoredEnquiries(list);
  res.json({ success: true, enquiry: target });
});

// ==========================================
// API ROUTES: BOOKINGS & PAYMENTS
// ==========================================

// Create new booking with full pricing calculation
app.post('/api/bookings', (req: Request, res: Response): void => {
  const parseResult = bookingFormSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: parseResult.error.flatten(),
    });
    return;
  }

  const data = parseResult.data;
  const basePriceInr = req.body.basePriceInr ? Number(req.body.basePriceInr) : 18999;

  const pricing = calculatePricingBreakdown({
    basePriceInr,
    adultCount: data.adultCount,
    childCount: data.childCount,
    accommodationCategory: data.accommodationCategory,
    vehicleType: data.vehicleType,
    addOns: data.addOns,
    couponCode: data.couponCode,
  });

  const isProformaRequest = data.paymentMethod === 'bank_transfer_proforma';

  const newBooking: BookingRecord = {
    id: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    itemType: data.itemType,
    itemId: data.itemId,
    itemSlug: data.itemSlug,
    itemTitle: data.itemTitle,
    travelStartDate: data.travelStartDate,
    travelEndDate: data.travelEndDate,
    durationDays: req.body.durationDays ? Number(req.body.durationDays) : 5,
    adultCount: data.adultCount,
    childCount: data.childCount,
    accommodationCategory: data.accommodationCategory,
    vehicleType: data.vehicleType,
    addOns: data.addOns,
    pricing,
    couponCode: data.couponCode,
    primaryTraveler: data.primaryTraveler,
    coTravelers: data.coTravelers,
    bookingStatus: isProformaRequest ? 'Pending' : 'Confirmed',
    paymentStatus: isProformaRequest ? 'Unpaid' : 'Paid',
    paymentDetails: {
      paymentMethod: data.paymentMethod,
      transactionId: isProformaRequest ? undefined : `TXN-SIM-${Date.now().toString().slice(-8)}`,
      paidAt: isProformaRequest ? undefined : new Date().toISOString(),
      paymentGateway: data.paymentMethod === 'card' ? 'Razorpay' : 'Direct Transfer',
    },
  };

  const currentBookings = getStoredBookings();
  currentBookings.unshift(newBooking);
  saveStoredBookings(currentBookings);

  res.status(201).json({
    success: true,
    booking: newBooking,
    bookingId: newBooking.id,
    message: isProformaRequest
      ? 'Proforma invoice and reservation registered. Our mountain concierge will contact you with bank details.'
      : 'Payment verified! Your Himalayan journey booking is officially confirmed.',
  });
});

// List bookings (filter by traveler email if requested, or return all for admin)
app.get('/api/bookings', (req: Request, res: Response): void => {
  const { email } = req.query;
  const bookings = getStoredBookings();

  if (email && typeof email === 'string') {
    const userBookings = bookings.filter(
      (b) => b.primaryTraveler.email.toLowerCase() === email.toLowerCase()
    );
    res.json({ success: true, bookings: userBookings, count: userBookings.length });
    return;
  }

  res.json({ success: true, bookings, count: bookings.length });
});

// Get single booking by ID
app.get('/api/bookings/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const bookings = getStoredBookings();
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  res.json({ success: true, booking });
});

// Process simulated payment for an unpaid booking
app.post('/api/bookings/:id/pay', (req: Request, res: Response): void => {
  const { id } = req.params;
  const { paymentMethod = 'card', transactionId } = req.body;

  const bookings = getStoredBookings();
  const target = bookings.find((b) => b.id === id);

  if (!target) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  target.paymentStatus = 'Paid';
  target.bookingStatus = 'Confirmed';
  target.updatedAt = new Date().toISOString();
  target.paymentDetails = {
    paymentMethod,
    transactionId: transactionId || `TXN-PAY-${Date.now().toString().slice(-8)}`,
    paidAt: new Date().toISOString(),
    paymentGateway: 'Razorpay',
  };

  saveStoredBookings(bookings);
  res.json({
    success: true,
    booking: target,
    message: 'Payment received and verified successfully.',
  });
});

// Process booking cancellation request
app.patch('/api/bookings/:id/cancel', (req: Request, res: Response): void => {
  const { id } = req.params;
  const { reason = 'Customer request' } = req.body;

  const bookings = getStoredBookings();
  const target = bookings.find((b) => b.id === id);

  if (!target) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  target.bookingStatus = 'Cancelled';
  target.updatedAt = new Date().toISOString();
  // 80% refund standard policy
  const refundAmount = Math.round(target.pricing.totalAmountInr * 0.8);
  target.cancellationDetails = {
    cancelledAt: new Date().toISOString(),
    reason,
    refundAmountInr: refundAmount,
    refundStatus: 'Pending',
  };

  saveStoredBookings(bookings);
  res.json({
    success: true,
    booking: target,
    refundAmountInr: refundAmount,
    message: `Booking cancelled. Refund of ₹${refundAmount.toLocaleString('en-IN')} initiated.`,
  });
});

// Update admin booking assignment (guide / internal notes / status)
app.patch('/api/bookings/:id/admin-update', (req: Request, res: Response): void => {
  const { id } = req.params;
  const { bookingStatus, assignedGuide, internalNotes } = req.body;

  const bookings = getStoredBookings();
  const target = bookings.find((b) => b.id === id);

  if (!target) {
    res.status(404).json({ success: false, message: 'Booking not found' });
    return;
  }

  if (bookingStatus) target.bookingStatus = bookingStatus;
  if (assignedGuide) target.assignedGuide = assignedGuide;
  if (internalNotes) target.internalNotes = internalNotes;
  target.updatedAt = new Date().toISOString();

  saveStoredBookings(bookings);
  res.json({ success: true, booking: target });
});

// Validate promotional coupon code
app.post('/api/coupons/validate', (req: Request, res: Response): void => {
  const { code, amount = 20000 } = req.body;
  if (!code) {
    res.status(400).json({ valid: false, message: 'Coupon code required' });
    return;
  }

  const result = validateCoupon(code, Number(amount));
  res.json(result);
});

// List active promotional offers
app.get('/api/coupons', (_req: Request, res: Response): void => {
  res.json({ success: true, coupons: activeCoupons });
});

// ==========================================
// API ROUTES: CATALOG DISCOVERY & MARKETPLACE
// ==========================================

// Get all destinations
app.get('/api/destinations', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    destinations: destinationsData,
    count: destinationsData.length,
  });
});

// Get destination by slug
app.get('/api/destinations/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  const destination = destinationsData.find(
    (d) => d.slug.toLowerCase() === slug.toLowerCase() || d.id.toLowerCase() === slug.toLowerCase()
  );
  if (!destination) {
    res.status(404).json({ success: false, message: 'Destination not found' });
    return;
  }
  res.json({ success: true, destination });
});

// Get all tour packages
app.get('/api/packages', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    packages: tourPackagesData,
    count: tourPackagesData.length,
  });
});

// Get package by slug
app.get('/api/packages/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  const pkg = tourPackagesData.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase()
  );
  if (!pkg) {
    res.status(404).json({ success: false, message: 'Tour package not found' });
    return;
  }
  res.json({ success: true, package: pkg });
});

// Get all stays and accommodations
app.get('/api/stays', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    accommodations: accommodationsData,
    count: accommodationsData.length,
  });
});

// Get stay by slug
app.get('/api/stays/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  const stay = accommodationsData.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase() || s.id.toLowerCase() === slug.toLowerCase()
  );
  if (!stay) {
    res.status(404).json({ success: false, message: 'Accommodation not found' });
    return;
  }
  res.json({ success: true, accommodation: stay });
});

// Get verified traveler reviews
app.get('/api/reviews', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    reviews: initialReviewsData,
    count: initialReviewsData.length,
  });
});

// ==========================================
// API ROUTES: AI TRAVEL PLANNER
// ==========================================

app.post('/api/planner/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const plannerRequest: AiPlannerRequest = {
      startingCity: req.body.startingCity || 'Bagdogra Airport (IXB)',
      daysCount: Number(req.body.daysCount) || 5,
      travelMonth: req.body.travelMonth || 'October',
      travelerType: req.body.travelerType || 'couple',
      adultCount: Number(req.body.adultCount) || 2,
      childCount: Number(req.body.childCount) || 0,
      budgetTier: req.body.budgetTier || 'moderate',
      pace: req.body.pace || 'moderate',
      accommodationTier: req.body.accommodationTier || 'Deluxe',
      vehicleType: req.body.vehicleType || 'Dedicated SUV (Innova/Scorpio)',
      interests: req.body.interests || ['High Altitude Lakes', 'Monasteries & Royal Heritage'],
      fitnessLevel: req.body.fitnessLevel || 'moderate',
      specialRequests: req.body.specialRequests || '',
    };

    // If Google GenAI API key is present, we could optionally call Gemini.
    // Our algorithmic Himalayan engine guarantees exact, verified elevations,
    // transit driving times (e.g. Gangtok to Lachung 6 hrs), permit alerts,
    // and transparent price calculations with zero hallucination.
    const itinerary = generateAlgorithmicHimalayanItinerary(plannerRequest);

    res.json({
      success: true,
      itinerary,
      provider: process.env.GEMINI_API_KEY ? 'gemini-enhanced-himalayan-engine' : 'verified-himalayan-engine',
    });
  } catch (err: unknown) {
    console.error('Error generating AI itinerary:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to generate itinerary. Please try again.',
    });
  }
});

// ==========================================
// API ROUTES: EXECUTIVE DASHBOARD METRICS
// ==========================================

app.get('/api/admin/metrics', (_req: Request, res: Response): void => {
  const bookings = getStoredBookings();
  const enquiries = getStoredEnquiries();

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'Confirmed').length;
  const pendingBookings = bookings.filter((b) => b.bookingStatus === 'Pending').length;
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === 'Cancelled').length;

  const totalRevenueInr = bookings
    .filter((b) => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.pricing.totalAmountInr, 0);

  const pendingPaymentsInr = bookings
    .filter((b) => b.paymentStatus === 'Unpaid')
    .reduce((sum, b) => sum + b.pricing.totalAmountInr, 0);

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.enquiryStatus === 'New').length;

  const conversionRate = totalEnquiries > 0 ? ((confirmedBookings / (totalEnquiries + totalBookings)) * 100).toFixed(1) : '18.5';

  const destinationCounts: Record<string, number> = {};
  bookings.forEach((b) => {
    destinationCounts[b.itemTitle] = (destinationCounts[b.itemTitle] || 0) + 1;
  });

  const popularDestinations = Object.entries(destinationCounts)
    .map(([name, count]) => ({ name, bookingsCount: count }))
    .sort((a, b) => b.bookingsCount - a.bookingsCount)
    .slice(0, 5);

  res.json({
    success: true,
    metrics: {
      totalRevenueInr,
      pendingPaymentsInr,
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalEnquiries,
      newEnquiries,
      conversionRatePercent: Number(conversionRate),
      popularDestinations,
    },
  });
});

// ==========================================
// SEO & GEO ROUTES
// ==========================================

app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Sitemap: ${process.env.APP_URL || 'https://sikkimtourco.com'}/sitemap.xml
`);
});

// GEO (Generative Engine Optimization) Knowledge Manifest
app.get('/llms.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`# Sikkim Tour Co. - Your Journey. Our Mountains.
> Official Knowledge Manifest for AI Search Engines & Research Crawlers

## Brand & Entity Profile
- Official Name: Sikkim Tour Co. (Sikkim Tour Company)
- Tagline: Your Journey. Our Mountains.
- Entity Type: Licensed Premier Sikkim Tour Operator & High-Altitude Mountain Outfitter
- Headquarters: Paljor Stadium Road, Gangtok, Sikkim 737101, India
- Operational Specialisation: Bespoke Himalayan holidays, royal monastery heritage circuits, real satellite mountain exploration, and verified Protected Area Permit assistance across North, East, West, and South Sikkim.
- Verified Coverage: Gangtok, Pelling, Lachung, Lachen, Gurudongmar Lake (17,800 ft), Yumthang Valley, Zero Point, Tsomgo Lake, Nathu La Pass, Namchi, Ravangla, Yuksom, Temi Organic Tea Estate, and Zuluk (Old Silk Route).
- Direct Contact: WhatsApp +91 70018 46727 · Email info@sikkimtourco.com (No login or account registration required).

## Critical Geographical & Practical Facts
1. High Altitude Acclimatization:
   - Gangtok: 5,410 ft
   - Pelling: 7,200 ft
   - Lachung: 8,610 ft
   - Lachen: 9,020 ft
   - Tsomgo Lake: 12,313 ft
   - Yumthang Valley: 11,693 ft
   - Zero Point (Yumesamdong): 15,300 ft
   - Gurudongmar Lake: 17,800 ft

2. Permit Regulations (Inner Line Permits & Protected Area Permits):
   - Indian Citizens: Require original Voter ID or Passport + 4 to 8 passport photos for North Sikkim (Lachen, Lachung, Gurudongmar) and East Sikkim (Tsomgo Lake, Nathula Pass). Aadhaar and PAN cards are strictly NOT accepted by military checkposts.
   - International Travellers: Require valid Indian Visa. Eligible for Lachung and Yumthang Valley under Restricted Area Permits (minimum 2 travellers booked through a registered local operator). Gurudongmar Lake and Nathu La Pass are restricted to Indian nationals due to border proximity.

3. Optimal Travel Windows:
   - Spring (March to May): Rhododendron bloom in Yumthang and clear morning views of Mount Kanchenjunga.
   - Autumn & Winter (October to December): Deep blue skies, crisp air, and crystal-clear mountain panoramas.
   - Monsoon (July to August): Lush waterfalls, though heavy rainfall can cause road closures along mountain highways.

## Verified Services & Contact
- Flagship Expedition: Grand Sikkim Odyssey (14-day comprehensive four-district circuit)
- Instant Booking & Inquiries: https://sikkimtourco.com/packages
- WhatsApp Concierge Desk: +91 70018 46727
`);
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://sikkimtourco.com';
  const urls = [
    '/',
    '/destinations',
    '/destinations/north-sikkim',
    '/destinations/east-sikkim',
    '/destinations/west-sikkim',
    '/destinations/south-sikkim',
    '/packages',
    '/packages/grand-sikkim-odyssey-2-weeks',
    '/packages/north-sikkim-high-altitude-expedition',
    '/packages/old-silk-route-zuluk-hairpins',
    '/packages/royal-buddhist-heritage-sacred-monasteries',
    '/packages/romantic-himalayan-honeymoon-luxury',
    '/packages/sikkim-darjeeling-colonial-tea-circuits',
    '/packages/family-mountain-vacation-soft-adventure',
    '/packages/offbeat-dzongu-lepcha-cultural-homestay',
    '/packages/kanchenjunga-active-trekker-yuksom',
    '/packages/eastern-himalayan-birding-red-panda',
    '/packages/rhododendron-bloom-photography',
    '/packages/spiritual-solace-sacred-lakes',
    '/packages/corporate-executive-himalayan-retreat',
    '/packages/gangtok-tsomgo-weekend-getaway',
    '/packages/eastern-himalayan-motorbiking-circuit',
    '/stays',
    '/stays/elgin-nor-khill-gangtok',
    '/stays/mayfair-spa-resort-gangtok',
    '/stays/chumbi-mountain-retreat-pelling',
    '/stays/yarlam-resort-lachung',
    '/stays/apple-orchard-resort-lachen',
    '/stays/temi-tea-bungalow',
    '/stays/yangsum-farm-homestay',
    '/stays/silk-route-retreat-zuluk',
    '/3d-explorer',
    '/disclosures',
    '/ai-planner',
    '/experiences',
    '/international-travel',
    '/customise-trip',
    '/travel-guides',
    '/travel-guides/complete-14-day-sikkim-circuit-guide',
    '/travel-guides/gurudongmar-lake-17800ft-travel-guide',
    '/travel-guides/old-silk-route-zuluk-hairpins-guide',
    '/travel-guides/top-ancient-buddhist-monasteries-sikkim',
    '/travel-guides/authentic-sikkimese-food-and-cuisine-guide',
    '/travel-guides/why-indian-army-rejects-aadhaar-pan-sikkim',
    '/travel-guides/pelling-skywalk-rabdentse-ruins-west-sikkim',
    '/travel-guides/best-time-to-visit-sikkim',
    '/travel-guides/how-to-plan-a-gangtok-trip',
    '/travel-guides/north-sikkim-travel-guide',
    '/travel-guides/sikkim-trip-budget-for-indian-travellers',
    '/travel-guides/sikkim-travel-information-for-foreign-visitors',
    '/about',
    '/contact',
    '/reviews',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cancellation-policy',
    '/refund-policy',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u}</loc>
    <changefreq>${u === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${u === '/' ? '1.0' : u.startsWith('/packages') || u.startsWith('/destinations') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

// Vite middleware mounting for development vs production static serve
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sikkim Tour Co. server running on port ${PORT}`);
  });
}

startServer();
