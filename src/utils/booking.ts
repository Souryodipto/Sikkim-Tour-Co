import { z } from 'zod';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Unpaid' | 'Authorized' | 'Paid' | 'Refunded' | 'Failed';

export const bookingFormSchema = z.object({
  itemType: z.enum(['package', 'accommodation', 'experience', 'custom_itinerary']),
  itemId: z.string().min(1, 'Item ID is required'),
  itemSlug: z.string().min(1, 'Item slug is required'),
  itemTitle: z.string().min(1, 'Item title is required'),
  travelStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid departure date required'),
  travelEndDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid return date required'),
  adultCount: z.number().int().min(1, 'At least 1 adult is required').max(20),
  childCount: z.number().int().min(0).max(10).default(0),
  accommodationCategory: z.enum(['Standard', 'Deluxe', 'Luxury Boutique']).default('Deluxe'),
  vehicleType: z
    .enum(['Shared Mountain 4x4', 'Dedicated SUV (Innova/Scorpio)', 'Luxury Toyota Crysta'])
    .default('Dedicated SUV (Innova/Scorpio)'),
  addOns: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        priceInr: z.number(),
      })
    )
    .default([]),
  couponCode: z.string().optional(),
  primaryTraveler: z.object({
    fullName: z.string().min(2, 'Full name is required (min 2 chars)'),
    email: z.string().email('Valid email address required'),
    phone: z.string().min(7, 'Valid contact phone number required'),
    nationality: z.string().default('India'),
    idType: z.enum(['Voter ID', 'Passport', 'Driving License', 'Aadhaar Card']).default('Voter ID'),
    idNumber: z.string().min(3, 'Identity card number required for Sikkim Army permits'),
    pickupLocation: z.string().min(2, 'Arrival pickup location required (e.g. Bagdogra / Pakyong)'),
    emergencyContact: z.string().min(5, 'Emergency contact name and number required'),
    specialDietOrNotes: z.string().optional(),
  }),
  coTravelers: z
    .array(
      z.object({
        fullName: z.string(),
        age: z.number(),
        gender: z.string(),
        idNumber: z.string().optional(),
      })
    )
    .default([]),
  paymentMethod: z.enum(['card', 'upi', 'netbanking', 'bank_transfer_proforma']).default('card'),
  agreeToTerms: z.literal(true, {
    message: 'You must accept the terms, conditions, and cancellation policy',
  }),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export interface BookingRecord {
  id: string; // e.g. BK-2026-7194
  createdAt: string;
  updatedAt: string;
  itemType: 'package' | 'accommodation' | 'experience' | 'custom_itinerary';
  itemId: string;
  itemSlug: string;
  itemTitle: string;
  travelStartDate: string;
  travelEndDate: string;
  durationDays: number;
  adultCount: number;
  childCount: number;
  accommodationCategory: 'Standard' | 'Deluxe' | 'Luxury Boutique';
  vehicleType: 'Shared Mountain 4x4' | 'Dedicated SUV (Innova/Scorpio)' | 'Luxury Toyota Crysta';
  addOns: Array<{ id: string; name: string; priceInr: number }>;
  pricing: {
    baseAmountInr: number;
    vehicleUpgradeInr: number;
    addOnsInr: number;
    discountInr: number;
    subtotalInr: number;
    taxGstInr: number;
    totalAmountInr: number;
    currency: 'INR' | 'USD';
    indicativeUsd: number;
  };
  couponCode?: string;
  primaryTraveler: {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    idType: string;
    idNumber: string;
    pickupLocation: string;
    emergencyContact: string;
    specialDietOrNotes?: string;
  };
  coTravelers: Array<{
    fullName: string;
    age: number;
    gender: string;
    idNumber?: string;
  }>;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentDetails?: {
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'bank_transfer_proforma';
    transactionId?: string;
    paidAt?: string;
    paymentGateway: 'Razorpay' | 'Stripe' | 'Direct Transfer';
  };
  cancellationDetails?: {
    cancelledAt: string;
    reason: string;
    refundAmountInr: number;
    refundStatus: 'Pending' | 'Processed';
  };
  assignedGuide?: {
    name: string;
    phone: string;
    vehicleNumber: string;
  };
  internalNotes?: string;
}

export interface CouponRule {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minBookingAmountInr: number;
  maxDiscountInr?: number;
  description: string;
}

export const activeCoupons: CouponRule[] = [
  {
    code: 'HIMALAYA10',
    discountType: 'percentage',
    discountValue: 10,
    minBookingAmountInr: 15000,
    maxDiscountInr: 5000,
    description: '10% discount on Himalayan expeditions (up to ₹5,000)',
  },
  {
    code: 'EARLYBIRD',
    discountType: 'flat',
    discountValue: 2500,
    minBookingAmountInr: 20000,
    description: 'Flat ₹2,500 off on advance Himalayan bookings',
  },
  {
    code: 'PEACEFULSIKKIM',
    discountType: 'flat',
    discountValue: 3000,
    minBookingAmountInr: 30000,
    description: 'Flat ₹3,000 off on extended multi-district circuits',
  },
  {
    code: 'SPRING2026',
    discountType: 'percentage',
    discountValue: 8,
    minBookingAmountInr: 18000,
    maxDiscountInr: 4000,
    description: '8% off for Spring Rhododendron season travels',
  },
];

export function validateCoupon(
  code: string,
  subtotalInr: number
): { valid: boolean; discountInr: number; message: string; coupon?: CouponRule } {
  const cleanCode = code.trim().toUpperCase();
  const found = activeCoupons.find((c) => c.code === cleanCode);

  if (!found) {
    return { valid: false, discountInr: 0, message: 'Invalid or expired promotional code.' };
  }

  if (subtotalInr < found.minBookingAmountInr) {
    return {
      valid: false,
      discountInr: 0,
      message: `Minimum booking value of ₹${found.minBookingAmountInr.toLocaleString('en-IN')} required for ${cleanCode}.`,
    };
  }

  let discount = 0;
  if (found.discountType === 'percentage') {
    discount = Math.round((subtotalInr * found.discountValue) / 100);
    if (found.maxDiscountInr && discount > found.maxDiscountInr) {
      discount = found.maxDiscountInr;
    }
  } else {
    discount = found.discountValue;
  }

  return {
    valid: true,
    discountInr: discount,
    message: `${found.description} applied successfully!`,
    coupon: found,
  };
}

export function calculatePricingBreakdown(params: {
  basePriceInr: number;
  adultCount: number;
  childCount: number;
  accommodationCategory: 'Standard' | 'Deluxe' | 'Luxury Boutique';
  vehicleType: 'Shared Mountain 4x4' | 'Dedicated SUV (Innova/Scorpio)' | 'Luxury Toyota Crysta';
  addOns?: Array<{ priceInr: number }>;
  couponCode?: string;
  exchangeRateInrToUsd?: number;
}) {
  const {
    basePriceInr,
    adultCount,
    childCount,
    accommodationCategory,
    vehicleType,
    addOns = [],
    couponCode,
    exchangeRateInrToUsd = 86.5,
  } = params;

  // Adult base fare + 60% for children
  const travelerBase = basePriceInr * adultCount + basePriceInr * 0.6 * childCount;

  // Accommodation category multiplier
  let accommodationMultiplier = 1.0;
  if (accommodationCategory === 'Deluxe') accommodationMultiplier = 1.15;
  if (accommodationCategory === 'Luxury Boutique') accommodationMultiplier = 1.45;

  const baseAmountInr = Math.round(travelerBase * accommodationMultiplier);

  // Vehicle upgrade surcharge
  let vehicleUpgradeInr = 0;
  if (vehicleType === 'Dedicated SUV (Innova/Scorpio)') vehicleUpgradeInr = 4500;
  if (vehicleType === 'Luxury Toyota Crysta') vehicleUpgradeInr = 8500;

  // Add-ons total
  const addOnsInr = addOns.reduce((sum, item) => sum + item.priceInr, 0);

  const rawSubtotal = baseAmountInr + vehicleUpgradeInr + addOnsInr;

  // Discount calculation
  let discountInr = 0;
  if (couponCode) {
    const couponResult = validateCoupon(couponCode, rawSubtotal);
    if (couponResult.valid) {
      discountInr = couponResult.discountInr;
    }
  }

  const discountedSubtotal = Math.max(0, rawSubtotal - discountInr);

  // GST 5% on travel tour services in India
  const taxGstInr = Math.round(discountedSubtotal * 0.05);
  const totalAmountInr = discountedSubtotal + taxGstInr;
  const indicativeUsd = Math.round(totalAmountInr / exchangeRateInrToUsd);

  return {
    baseAmountInr,
    vehicleUpgradeInr,
    addOnsInr,
    discountInr,
    subtotalInr: discountedSubtotal,
    taxGstInr,
    totalAmountInr,
    currency: 'INR' as const,
    indicativeUsd,
  };
}
