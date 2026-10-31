import { destinationsData, allSikkimSpots } from '../data/destinations';
import { tourPackagesData } from '../data/packages';
import { travelGuidesData } from '../data/guides';
import { experiencesData } from '../data/experiences';

export type SearchCategory = 'all' | 'destinations' | 'spots' | 'packages' | 'guides' | 'experiences';

export interface SearchItem {
  id: string;
  title: string;
  category: 'destinations' | 'spots' | 'packages' | 'guides' | 'experiences';
  categoryLabel: string;
  badge?: string;
  meta: string;
  description: string;
  url: string;
  imageUrl?: string;
  district?: string;
  keywords: string[];
}

/**
 * Builds the searchable repository of all destinations, tourist spots,
 * tour packages, travel guides, and curated experiences.
 */
export function getSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // 1. Primary District Destinations
  destinationsData.forEach((dest) => {
    items.push({
      id: `dest-${dest.id}`,
      title: dest.name,
      category: 'destinations',
      categoryLabel: 'District Region',
      badge: dest.district,
      meta: `${dest.elevation} · ${dest.recommendedDuration}`,
      description: dest.shortDescription || dest.tagline,
      url: `/destinations/${dest.slug}`,
      district: dest.district,
      keywords: [
        dest.name.toLowerCase(),
        dest.slug.toLowerCase(),
        dest.district.toLowerCase(),
        'district',
        'destination',
        ...dest.suitableFor.map((s) => s.toLowerCase()),
      ],
    });
  });

  // 2. Individual Tourist Spots (with photos, history & elevations)
  allSikkimSpots.forEach((spot) => {
    // Map district to destination slug for deep linking
    let districtSlug = 'north-sikkim';
    if (spot.district === 'East Sikkim') districtSlug = 'east-sikkim';
    if (spot.district === 'West Sikkim') districtSlug = 'west-sikkim';
    if (spot.district === 'South Sikkim') districtSlug = 'south-sikkim';

    items.push({
      id: `spot-${spot.id}`,
      title: spot.name,
      category: 'spots',
      categoryLabel: 'Tourist Spot',
      badge: `${spot.district} · ${spot.elevation}`,
      meta: `${spot.elevation} · ${spot.historicalPeriod}`,
      description: spot.history.slice(0, 140) + '...',
      url: `/destinations/${districtSlug}?spot=${spot.id}`,
      imageUrl: spot.imageUrl,
      district: spot.district,
      keywords: [
        spot.name.toLowerCase(),
        spot.district.toLowerCase(),
        spot.elevation.toLowerCase(),
        ...(spot.altNames?.map((a) => a.toLowerCase()) || []),
        'spot',
        'attraction',
        'history',
        'viewpoint',
        'lake',
        'monastery',
      ],
    });
  });

  // 3. Tour Packages (including 14-day flagship)
  tourPackagesData.forEach((pkg) => {
    items.push({
      id: `pkg-${pkg.id}`,
      title: pkg.name,
      category: 'packages',
      categoryLabel: 'Tour Package',
      badge: `${pkg.duration} · Quote on Request`,
      meta: `${pkg.duration} · ${pkg.travelStyle}`,
      description: pkg.tagline || pkg.overview.slice(0, 140) + '...',
      url: `/packages/${pkg.slug}`,
      keywords: [
        pkg.name.toLowerCase(),
        pkg.slug.toLowerCase(),
        pkg.duration.toLowerCase(),
        pkg.travelStyle.toLowerCase(),
        pkg.pricingBasis.toLowerCase(),
        ...pkg.destinationsCovered.map((d) => d.toLowerCase()),
        ...pkg.districtsCovered.map((d) => d.toLowerCase()),
        'package',
        'itinerary',
        'tour',
        '14 days',
        '2 weeks',
        'pricing',
      ],
    });
  });

  // 4. Travel Guides & Advisories
  travelGuidesData.forEach((guide) => {
    items.push({
      id: `guide-${guide.id}`,
      title: guide.title,
      category: 'guides',
      categoryLabel: 'Travel Guide',
      badge: `${guide.category} · ${guide.readTime}`,
      meta: `${guide.category} · ${guide.readTime}`,
      description: guide.metaDescription || guide.intro.slice(0, 140) + '...',
      url: `/travel-guides/${guide.slug}`,
      keywords: [
        guide.title.toLowerCase(),
        guide.category.toLowerCase(),
        guide.slug.toLowerCase(),
        'guide',
        'weather',
        'permits',
        'season',
        'packing',
        'route',
        'advisory',
      ],
    });
  });

  // 5. Curated Experiences
  experiencesData.forEach((exp) => {
    items.push({
      id: `exp-${exp.id}`,
      title: exp.title,
      category: 'experiences',
      categoryLabel: 'Himalayan Experience',
      badge: exp.suitableFor.split(',')[0],
      meta: exp.subtitle,
      description: exp.highlightText || exp.description.slice(0, 140) + '...',
      url: `/experiences/${exp.slug}`,
      keywords: [
        exp.title.toLowerCase(),
        exp.subtitle.toLowerCase(),
        exp.slug.toLowerCase(),
        'experience',
        'honeymoon',
        'adventure',
        'culture',
        'family',
      ],
    });
  });

  // 6. Live 3D Himalayan Weather Observatory
  items.push({
    id: 'weather-3d-observatory',
    title: 'Live Himalayan Weather & 3D Mountain Observatory',
    category: 'guides',
    categoryLabel: 'Live Weather (3D)',
    badge: '3D Real-Time Telemetry',
    meta: 'Interactive 3D Terrain · Gangtok, Gurudongmar (17,800 ft), Pelling & Nathula',
    description: 'Explore live microclimates, satellite temperature, windchill, and mountain pass clearances across Sikkim with 3D peak visualization.',
    url: '/weather',
    keywords: [
      'weather',
      'live weather',
      '3d weather',
      'temperature',
      'forecast',
      'snow',
      'snowfall',
      'climate',
      'windchill',
      'pass status',
      'road status',
      'gurudongmar weather',
      'gangtok weather',
    ],
  });

  return items;
}

// Global cached index
let cachedIndex: SearchItem[] | null = null;

export function searchSite(
  query: string,
  category: SearchCategory = 'all'
): SearchItem[] {
  if (!cachedIndex) {
    cachedIndex = getSearchIndex();
  }

  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    if (category === 'all') return [];
    return cachedIndex.filter((item) => item.category === category);
  }

  const terms = cleanQuery.split(/\s+/).filter(Boolean);

  const scoredResults: { item: SearchItem; score: number }[] = [];

  for (const item of cachedIndex) {
    // Filter category if not 'all'
    if (category !== 'all' && item.category !== category) {
      continue;
    }

    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const metaLower = item.meta.toLowerCase();
    const districtLower = (item.district || '').toLowerCase();
    const keywordsJoined = item.keywords.join(' ');

    let score = 0;

    // Exact title match gets huge boost
    if (titleLower === cleanQuery) {
      score += 100;
    } else if (titleLower.startsWith(cleanQuery)) {
      score += 50;
    } else if (titleLower.includes(cleanQuery)) {
      score += 30;
    }

    // Check individual terms
    let allTermsMatch = true;
    for (const term of terms) {
      let termMatched = false;

      if (titleLower.includes(term)) {
        score += 15;
        termMatched = true;
      }
      if (districtLower.includes(term)) {
        score += 10;
        termMatched = true;
      }
      if (keywordsJoined.includes(term)) {
        score += 8;
        termMatched = true;
      }
      if (metaLower.includes(term)) {
        score += 5;
        termMatched = true;
      }
      if (descLower.includes(term)) {
        score += 4;
        termMatched = true;
      }

      if (!termMatched) {
        allTermsMatch = false;
      }
    }

    // If query has multiple terms, bonus if all terms match
    if (terms.length > 1 && allTermsMatch) {
      score += 20;
    }

    // Favor tourist spots and packages if high relevance
    if (score > 0) {
      scoredResults.push({ item, score });
    }
  }

  // Sort by score descending
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.map((sr) => sr.item);
}
