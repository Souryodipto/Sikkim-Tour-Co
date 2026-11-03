import { z } from 'zod';
import { siteConfig } from '../config/site';

export const enquiryStatusList = [
  'New',
  'Contacted',
  'Quotation Sent',
  'Follow-up Required',
  'Confirmed',
  'Lost',
  'Cancelled',
] as const;

export type EnquiryStatus = (typeof enquiryStatusList)[number];

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please provide your full name (at least 2 characters)'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(7, 'Please provide a valid phone number (at least 7 digits)'),
  whatsapp: z.string().trim().optional(),
  preferredContact: z.enum(['WhatsApp', 'Email', 'Phone Call']),
  
  travellerCategory: z.enum(['domestic', 'international'] as const),
  nationality: z.string().trim().optional(),

  arrivalDate: z.string().min(1, 'Please select your estimated arrival date'),
  departureDate: z.string().min(1, 'Please select your estimated departure date'),
  numberOfDays: z.number().int().min(1).max(30).optional(),
  duration: z.string().optional(),
  adultCount: z.number().int().min(1, 'At least 1 adult traveller is required').max(50, 'Max 50 travellers per standard enquiry'),
  childCount: z.number().int().min(0).max(20).default(0),
  infantCount: z.number().int().min(0).max(10).optional().default(0),
  
  destinations: z.array(z.string()).min(1, 'Please select at least one destination'),
  startingCity: z.string().trim().min(2, 'Please provide your starting city or arrival airport (e.g. Bagdogra IXB, Pakyong PYG, or Kolkata)'),
  
  budget: z.string().min(1, 'Please select a budget range'),
  preferredCurrency: z.enum(['INR', 'USD']).default('INR'),
  hotelCategory: z.enum(['Budget / Homestay', 'Standard (3-Star equivalent)', 'Deluxe (4-Star equivalent)', 'Luxury Boutique / Heritage']),
  transportPreference: z.enum(['Private Dedicated Vehicle (Innova/Scorpio)', 'Standard Private Vehicle (WagonR/Bolero)', 'Shared / Flexible']),
  travelStyle: z.enum(['Budget', 'Family', 'Honeymoon', 'Adventure', 'Culture', 'Luxury', 'Custom Tour']),
  
  specialRequests: z.string().trim().max(1000, 'Special requests must be under 1000 characters').optional(),
  sourcePage: z.string().default('/customise-trip'),
  leadSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export interface EnquiryRecord extends EnquiryFormData {
  id: string;
  createdAt: string;
  enquiryStatus: EnquiryStatus;
  statusNotes?: string;
}

/**
 * Validates enquiry form data with detailed error mapping
 */
export function validateEnquiry(data: unknown): { success: true; data: EnquiryFormData } | { success: false; errors: Record<string, string> } {
  const result = enquirySchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0]?.toString() || 'form';
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false, errors };
}

/**
 * Format currency in INR or indicative USD
 */
export function formatPrice(amountInr: number, currency: 'INR' | 'USD' = 'INR'): string {
  if (currency === 'USD') {
    const usd = Math.round(amountInr / siteConfig.rates.usdToInr);
    return `US$${usd.toLocaleString('en-US')}`;
  }
  return `₹${amountInr.toLocaleString('en-IN')}`;
}

/**
 * Format budget option display label
 */
export function getBudgetOptions(currency: 'INR' | 'USD') {
  if (currency === 'USD') {
    return [
      { id: 'under-150', label: 'Under $150 per person', inrEstimate: 'Under ₹12,000' },
      { id: '150-300', label: '$150 – $300 per person', inrEstimate: '₹12,000 – ₹25,000' },
      { id: '300-600', label: '$300 – $600 per person', inrEstimate: '₹25,000 – ₹50,000' },
      { id: '600-1000', label: '$600 – $1,000 per person', inrEstimate: '₹50,000 – ₹85,000' },
      { id: 'above-1000', label: 'Above $1,000 per person', inrEstimate: 'Above ₹85,000' },
      { id: 'flexible', label: 'Flexible / Request detailed quote', inrEstimate: 'Custom' },
    ];
  }
  return [
    { id: 'under-10k', label: 'Under ₹10,000 per person', inrEstimate: 'Budget option' },
    { id: '10k-20k', label: '₹10,000 – ₹20,000 per person', inrEstimate: 'Value comfort' },
    { id: '20k-40k', label: '₹20,000 – ₹40,000 per person', inrEstimate: 'Standard to Deluxe' },
    { id: '40k-75k', label: '₹40,000 – ₹75,000 per person', inrEstimate: 'Premium & North Sikkim' },
    { id: 'above-75k', label: 'Above ₹75,000 per person', inrEstimate: 'Luxury & Heritage' },
    { id: 'not-decided', label: 'Not decided / Need recommendation', inrEstimate: 'Custom' },
  ];
}

/**
 * Builds prefilled WhatsApp message from submitted enquiry data
 */
export function generateEnquiryWhatsAppMessage(enquiry: EnquiryFormData): string {
  const destinationList = enquiry.destinations.join(', ');
  const travellers = `${enquiry.adultCount} Adult${enquiry.adultCount > 1 ? 's' : ''}${
    enquiry.childCount > 0 ? `, ${enquiry.childCount} Child${enquiry.childCount > 1 ? 'ren' : ''}` : ''
  }${enquiry.infantCount && enquiry.infantCount > 0 ? `, ${enquiry.infantCount} Infant${enquiry.infantCount > 1 ? 's' : ''}` : ''}`;

  const durationStr = enquiry.duration ? ` (${enquiry.duration})` : enquiry.numberOfDays ? ` (${enquiry.numberOfDays} Days)` : '';

  return `Hello Sikkim Tour Co.,

I just submitted a travel enquiry on your website. Here are my details:

Name: ${enquiry.fullName}
Type: ${enquiry.travellerCategory === 'domestic' ? 'Indian Domestic Traveller' : `International Traveller (${enquiry.nationality || 'Foreign National'})`}
Travel Dates: ${enquiry.arrivalDate} to ${enquiry.departureDate}${durationStr}
Travellers: ${travellers}
Destinations: ${destinationList}
Arrival Point: ${enquiry.startingCity}
Style: ${enquiry.travelStyle}
Hotel Preference: ${enquiry.hotelCategory}
Transport: ${enquiry.transportPreference}
Budget: ${enquiry.budget} (${enquiry.preferredCurrency})
${enquiry.specialRequests ? `Special Requests: ${enquiry.specialRequests}\n` : ''}${enquiry.leadSource ? `Ref: ${enquiry.leadSource}\n` : ''}
Please review my requirements and share an indicative plan & quotation.`;
}

/**
 * Builds prefilled package-specific WhatsApp enquiry message
 */
export function generatePackageWhatsAppMessage(params: {
  packageName: string;
  duration: string;
  startingPrice: string;
  adults?: number;
  children?: number;
  travelDate?: string;
  leadSource?: string;
}): string {
  const dateStr = params.travelDate ? `\nTravel Dates: ${params.travelDate}` : '';
  const travellersStr = params.adults ? `\nTravellers: ${params.adults} Adults${params.children ? `, ${params.children} Children` : ''}` : '';
  const sourceStr = params.leadSource ? `\nRef: ${params.leadSource}` : '';

  return `Hi Sikkim Tour Co.,

I would like to enquire about the "${params.packageName}" tour package.

Package: ${params.packageName}
Duration: ${params.duration}
Starting Tariff: ${params.startingPrice}${dateStr}${travellersStr}${sourceStr}

Please share the detailed day-wise itinerary, hotel options, vehicle details, and permit requirements.`;
}

/**
 * Validates state transition for enquiry lead lifecycle
 */
export function canTransitionStatus(current: EnquiryStatus, next: EnquiryStatus): boolean {
  if (current === next) return true;
  if (current === 'Cancelled' || current === 'Confirmed' || current === 'Lost') {
    // Re-opening is allowed only back to Follow-up Required or Contacted
    return next === 'Follow-up Required' || next === 'Contacted';
  }
  return true;
}
