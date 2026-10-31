/**
 * Central configuration for Sikkim Tour Co.
 * Contains business details, contact channels, and currency conversion parameters.
 * Placeholders are clearly marked and configurable.
 */

export interface SiteConfig {
  brandName: string;
  tagline: string;
  description: string;
  location: {
    town: string;
    state: string;
    country: string;
    postalCode: string;
    officeAddress: string;
    coordinatesText: string;
  };
  contact: {
    whatsappNumber: string; // International format without spaces, e.g. "919800000000"
    whatsappDisplay: string;
    phonePrimary: string;
    phoneSecondary: string;
    emailGeneral: string;
    emailBookings: string;
    workingHours: string;
  };
  pricingNotice: string;
  rates: {
    usdToInr: number; // Indicative reference rate
    rateDisclaimer: string;
  };
  officialTourismLink: string;
}

export const siteConfig: SiteConfig = {
  brandName: "Sikkim Tour Co.",
  tagline: "Your Journey. Our Mountains.",
  description:
    "Licensed premier tour operator based in Gangtok, specialising in customised Himalayan holidays, high-altitude alpine expeditions, real satellite mountain mapping, and permit clearances across North, East, West, and South Sikkim.",
  location: {
    town: "Gangtok",
    state: "Sikkim",
    country: "India",
    postalCode: "737101",
    officeAddress: "Paljor Stadium Road, Gangtok, Sikkim 737101, India",
    coordinatesText: "27.3389° N, 88.6065° E",
  },
  contact: {
    whatsappNumber: "919733022334",
    whatsappDisplay: "+91 97330 22334",
    phonePrimary: "+91 97330 22334",
    phoneSecondary: "+91 (0) 3592 202334",
    emailGeneral: "info@sikkimtourcompany.com",
    emailBookings: "bookings@sikkimtourcompany.com",
    workingHours: "Monday to Sunday: 8:00 AM – 9:00 PM IST (24/7 Mountain Emergency Support)",
  },
  pricingNotice:
    "All packages are priced dynamically on request based on your dates, group size, vehicle category, and accommodation tier. We provide transparent, itemized quotes via WhatsApp within 15 minutes.",
  rates: {
    usdToInr: 84.0, // Indicative reference rate
    rateDisclaimer:
      "USD prices shown are indicative conversions based on ~₹84/USD for convenience. Official quotations are rendered in INR or converted at prevailing bank settlement rates at invoicing.",
  },
  officialTourismLink: "https://www.sikkimtourism.gov.in/",
};

/**
 * Generates an encoded WhatsApp click-to-chat URL
 */
export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds package-specific prefilled message
 */
export function buildPackageWhatsAppMessage(packageName: string, startingPrice: string, duration: string): string {
  return `Hello Sikkim Tour Co.,

I am interested in your "${packageName}" (${duration}).
Status: Custom Quote on Request

Travel dates: [Please specify]
Number of travellers: [Adults / Children]
Hotel preference: [Standard / Deluxe / Luxury / Heritage]
Estimated budget: [Budget range]

Please share the detailed itinerary, seasonal availability, and a customized quotation.`;
}

/**
 * Builds general enquiry WhatsApp message
 */
export function buildGeneralWhatsAppMessage(customNote?: string): string {
  if (customNote) {
    return `Hello Sikkim Tour Co.,\n\n${customNote}`;
  }
  return `Hello Sikkim Tour Co.,

I would like to plan a trip to Sikkim. 
Please connect me with a travel planner to discuss dates, districts (North, East, West, South Sikkim), and a personalized itinerary.`;
}

