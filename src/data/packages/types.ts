export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights: string[];
  mealsIncluded: string;
  overnightStay: string;
  route?: string;
  driveTime?: string;
  sightseeing?: string[];
}

export interface PackageSeo {
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  suggestedInternalLinks: string[];
}

export interface PackageSchema {
  touristTripName: string;
  description: string;
  itinerary: string[];
  offerPriceInr: number;
  faqs: { question: string; answer: string }[];
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  duration: string;
  daysCount: number;
  nightsCount: number;
  startingPriceInr: number; // Starting rate per person in INR
  startingPriceNote?: string;
  pricingBasis: 'per person' | 'per couple';
  pricingTier: string;
  pricingNote: string;
  destinationsCovered: string[];
  districtsCovered: ('North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim')[];
  region: 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim';
  travelStyle: string;
  travelStyleCategory:
    | 'High Altitude'
    | 'Honeymoon & Luxury'
    | 'Family & Soft Adventure'
    | 'Heritage & Monasteries'
    | 'Silk Route'
    | 'Offbeat & Homestays'
    | 'Wildlife & Eco'
    | 'Short Trips'
    | 'Motorbiking';
  isFlagship?: boolean;
  heroImage: string;
  galleryImages?: string[];
  altitudeRange: string;
  maxAltitude: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  fitnessLevel: 'Easy' | 'Moderate' | 'Active / High-Altitude';
  bestMonths: string;
  permitRequirements: string;
  permitNotes: string;
  roadAndWeatherNote: string;
  whoItSuits: string[];
  whoItDoesNotSuit: string[];
  altitudeAndHealthNote: string;
  disclosures: string[];
  mainInclusions: string[];
  accommodationCategory: string;
  transportDetails: string;
  mealsSummary: string;
  inclusions: string[];
  exclusions: string[];
  optionalActivities: string[];
  travelRequirements: string[];
  seasonalAvailability: string;
  cancellationPolicy: string;
  faqs: { question: string; answer: string }[];
  overview: string;
  detailedItinerary: ItineraryDay[];
  seo: PackageSeo;
  schema: PackageSchema;
}
