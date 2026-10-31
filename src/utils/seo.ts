/**
 * SEO & GEO (Local Search & Generative Engine Optimization) Utility for Sikkim Tour Co.
 * Dynamically handles document.title, meta descriptions, canonical URLs,
 * Open Graph tags, and page-specific Schema.org JSON-LD microdata.
 */

import { siteConfig } from '../config/site';
import { tourPackagesData } from '../data/packages';
import { destinationsData } from '../data/destinations';
import { accommodationsData } from '../data/accommodations';
import { travelGuidesData } from '../data/guides';
import { RouteMatch } from '../context/RouterContext';

interface PageSeoMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  schema?: object;
}

export function updatePageSeo(route: RouteMatch): void {
  if (typeof document === 'undefined') return;

  const baseTitle = siteConfig.brandName;
  const baseUrl = 'https://sikkimtourco.com';
  const fullUrl = `${baseUrl}${route.pathname}`;

  let meta: PageSeoMetadata = {
    title: `Sikkim Tour Company | Sikkim Travels & Best Sikkim Tour Packages – Sikkim Tour Co.`,
    description: `Sikkim Tour Co. is Gangtok's premier licensed Sikkim tour company and Sikkim travels specialist. Best Sikkim tour packages, 4x4 mountain cabs, army permits for North Sikkim & Nathula, luxury heritage stays, and 24/7 WhatsApp concierge (+91 70018 46727). Zero login required.`,
    keywords: `Sikkim Tour, Sikkim Tour Company, Sikkim Travels, Sikkim Travells, Sikkim Tour Packages, Sikkim Travel Agency, Gangtok Tour Company, Best Sikkim Tour Operator, North Sikkim Tour, Sikkim Tourism`,
    ogImage: `${baseUrl}/logo.png`,
  };

  switch (route.view) {
    case 'home':
      meta = {
        title: `Sikkim Tour Company | Sikkim Travels & Best Sikkim Tour Packages – Sikkim Tour Co.`,
        description: `Sikkim Tour Co. is Gangtok's premier licensed Sikkim tour company and Sikkim travels specialist. Best Sikkim tour packages, 4x4 mountain cabs, army permits for North Sikkim & Nathula, luxury heritage stays, and 24/7 WhatsApp concierge (+91 70018 46727). Zero login required.`,
        keywords: `Sikkim Tour, Sikkim Tour Company, Sikkim Travels, Sikkim Travells, Sikkim Tour Packages, Sikkim Travel Agency, Gangtok Tour Company, Best Sikkim Tour Operator, North Sikkim Tour, Sikkim Tourism, Gurudongmar Lake Tour, Nathu La Pass Permit`,
        ogImage: `${baseUrl}/logo.png`,
      };
      break;

    case 'packages':
      meta = {
        title: `15 Curated Sikkim Tour Packages & Expeditions | Sikkim Tour Company & Travels`,
        description: `Explore 15 bespoke Sikkim holiday circuits across North, East, West, and South Sikkim. From the 14-Day Grand Odyssey to Zuluk Silk Route, high-altitude alpine expeditions, and monastery heritage trails. Custom quotes via WhatsApp (+91 70018 46727).`,
        keywords: `Sikkim tour packages, Sikkim Tour Company, Sikkim Travels, Sikkim Travells, 14 day Sikkim circuit, North Sikkim tour, Silk Route package, Gangtok Pelling package, Sikkim honeymoon packages`,
      };
      break;

    case 'package-detail': {
      const pkg = tourPackagesData.find((p) => p.slug === route.slug);
      if (pkg) {
        meta = {
          title: `${pkg.name} (${pkg.duration}) | Sikkim Tour Co.`,
          description: `${pkg.overview.slice(0, 160)}... Custom quote on request with dedicated 4x4 mountain vehicle and Army permit clearance.`,
          keywords: `${pkg.name}, ${pkg.destinationsCovered.join(', ')}, Sikkim tour, ${pkg.altitudeRange}`,
          schema: {
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: pkg.name,
            description: pkg.overview,
            touristType: pkg.travelStyleCategory,
            provider: {
              '@type': 'TravelAgency',
              name: 'Sikkim Tour Co.',
              url: baseUrl,
              telephone: '+917001846727',
            },
            itinerary: {
              '@type': 'ItemList',
              numberOfItems: pkg.detailedItinerary.length,
              itemListElement: pkg.detailedItinerary.map((day) => ({
                '@type': 'ListItem',
                position: day.day,
                name: day.title,
                description: day.description,
              })),
            },
          },
        };
      } else {
        meta.title = `Sikkim Tour Itinerary & Quotation | ${baseTitle}`;
      }
      break;
    }

    case 'destinations':
      meta = {
        title: `Sikkim Destinations & Tourist Spots across 4 Districts | Sikkim Tour Co.`,
        description: `Complete geographic guide to North, East, West, and South Sikkim. Discover Gurudongmar Lake (17,800 ft), Nathu La Pass, Rumtek Monastery, Pelling Skywalk, and historic Yuksom.`,
        keywords: `Sikkim tourist places, North Sikkim places to visit, Gangtok sightseeing, Pelling tourist spots, Yuksom historic capital, Tsomgo Lake`,
      };
      break;

    case 'destination-detail': {
      const dest = destinationsData.find((d) => d.id === route.slug);
      if (dest) {
        meta = {
          title: `${dest.name} Travel Guide, Permits & Key Spots | Sikkim Tour Co.`,
          description: `${(dest.shortDescription || dest.fullOverview).slice(0, 160)}... Learn about army permit requirements, elevation, best season, and must-see attractions.`,
          keywords: `${dest.name}, Sikkim tourism, places to visit in ${dest.name}, ${dest.tagline}`,
          schema: {
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: dest.name,
            description: dest.shortDescription || dest.fullOverview,
            touristType: ['Adventure', 'Cultural', 'Nature', 'Pilgrimage'],
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: 'Sikkim',
              addressCountry: 'India',
            },
          },
        };
      }
      break;
    }

    case 'explorer-3d':
      meta = {
        title: `Real Sikkim Satellite & Mountain Map (Leaflet 3D GIS) | Sikkim Tour Co.`,
        description: `Explore Sikkim in real satellite imagery with Leaflet GIS & Esri terrain. 16 verified GPS checkpoints, elevation profiles (5,410 ft to 17,800 ft Gurudongmar), driving times, and Indian Army permit rules.`,
        keywords: `Sikkim satellite map, Sikkim 3D map, Kanchenjunga elevation, Gurudongmar Lake GPS, Nathu La pass road map, Sikkim GIS terrain`,
      };
      break;

    case 'disclosures':
      meta = {
        title: `Mandatory Sikkim Travel Disclosures & Army Permit Rules | Sikkim Tour Co.`,
        description: `Essential travel compliance: Indian Army checkposts mandate original Voter ID or Passport. Aadhaar and PAN cards are strictly rejected. Foreign national RAP/PAP guidelines and high-altitude safety.`,
        keywords: `Sikkim permits, Nathula permit rules, Gurudongmar permit documents, Voter ID required Sikkim, Aadhaar rejected Sikkim army, Inner Line Permit Sikkim`,
      };
      break;

    case 'stays':
      meta = {
        title: `Curated Heritage Hotels & Mountain Retreats in Sikkim | Sikkim Tour Co.`,
        description: `Experience authentic Himalayan hospitality at heritage properties like Elgin Nor-Khill Gangtok, Chumbi Mountain Retreat Pelling, Temi Tea Estate Bungalow, and high-altitude Lachen retreats.`,
        keywords: `Sikkim heritage hotels, luxury resorts in Gangtok, Pelling hotels, Lachen resorts, Lachung stays, Temi tea garden bungalow`,
      };
      break;

    case 'stay-detail': {
      const stay = accommodationsData.find((s) => s.slug === route.slug);
      if (stay) {
        meta = {
          title: `${stay.name} (${stay.location}) | Sikkim Tour Co.`,
          description: `${stay.overview.slice(0, 160)}... Premium heritage mountain stay arranged through our local concierge.`,
          keywords: `${stay.name}, ${stay.location}, Sikkim luxury accommodation, heritage resort Sikkim`,
        };
      }
      break;
    }

    case 'experiences':
      meta = {
        title: `Curated Himalayan Experiences & Thematic Journeys | Sikkim Tour Co.`,
        description: `Discover hand-crafted Sikkim travel themes: Royal Heritage & Living Monasteries, High-Altitude Frontier Expeditions, Romantic Getaways, and Wildlife & Red Panda photography.`,
      };
      break;

    case 'travel-guides':
      meta = {
        title: `Sikkim Travel Blog & Guides (12 Local Stories) | Sikkim Tour Co.`,
        description: `Explore 12 authoritative Sikkim travel stories, high-altitude pass advisories, army checkpost rules, monastery guides, and authentic culinary chronicles written by local Gangtok mountaineers.`,
        keywords: `Sikkim travel blog, Sikkim travel guides, Gangtok trip planning, North Sikkim permits, Gurudongmar guide, Zuluk Silk Route, Sikkim food`,
        ogImage: `${baseUrl}/logo.png`,
      };
      break;

    case 'travel-guide-detail': {
      const guide = travelGuidesData.find((g) => g.slug === route.slug || g.id === route.slug);
      if (guide) {
        meta = {
          title: `${guide.title} | Sikkim Tour Co. Blog`,
          description: guide.metaDescription || guide.intro.slice(0, 160),
          keywords: `Sikkim travel blog, ${guide.title}, ${guide.tags.join(', ')}`,
          ogImage: guide.heroImage,
          schema: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: guide.title,
            description: guide.metaDescription || guide.intro,
            image: [guide.heroImage],
            datePublished: `${guide.publishedDate}T09:00:00+05:30`,
            dateModified: '2026-10-31T23:00:00+05:30',
            author: {
              '@type': 'Person',
              name: guide.author.name,
              jobTitle: guide.author.role,
              url: `${baseUrl}/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Sikkim Tour Co.',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/travel-guides/${guide.slug}`,
            },
            keywords: guide.tags.join(', '),
            articleSection: guide.category,
          },
        };
      }
      break;
    }

    case 'reviews':
      meta = {
        title: `118+ Verified Traveler Reviews & Testimonials | Sikkim Tour Co.`,
        description: `Read authentic, unfiltered feedback from domestic and international travelers who explored Sikkim with our mountain concierge, dedicated 4x4 drivers, and permit team.`,
      };
      break;

    case 'ai-planner':
      meta = {
        title: `AI-Powered Custom Sikkim Itinerary Planner | Sikkim Tour Co.`,
        description: `Generate a realistic, elevation-safe Sikkim travel itinerary tailored to your group size, travel style, and duration. Instant sync to WhatsApp for customized quoting.`,
      };
      break;

    case 'customise-trip':
      meta = {
        title: `Customise Your Sikkim Himalayan Journey | Sikkim Tour Co.`,
        description: `Tell us your travel dates, group size, and dream destinations. Our Gangtok concierge team designs an itemized itinerary with transparent quotation within 15 minutes on WhatsApp.`,
      };
      break;

    case 'about':
      meta = {
        title: `About Sikkim Tour Co. – Local Mountain Roots & Philosophy | Sikkim Tour Co.`,
        description: `Learn about our local heritage, our commitment to sustainable Himalayan tourism, plastic-free travel in Sikkim, fair compensation for drivers, and authentic cultural stewardship.`,
      };
      break;

    case 'contact':
      meta = {
        title: `Contact Sikkim Tour Co. – Gangtok Office & WhatsApp Concierge | Sikkim Tour Co.`,
        description: `Visit our office on Paljor Stadium Road, Gangtok, Sikkim 737101. Chat with our travel concierge on WhatsApp (+91 70018 46727) or email info@sikkimtourco.com.`,
      };
      break;

    default:
      meta.title = `${baseTitle} – Your Journey. Our Mountains.`;
      break;
  }

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Meta Description
  setMetaTag('name', 'description', meta.description);

  // 3. Ensure Robots allow all bots on every route
  setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  setMetaTag('name', 'bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // 4. Update Meta Keywords if present
  if (meta.keywords) {
    setMetaTag('name', 'keywords', meta.keywords);
  }

  // 4. Update Open Graph Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', fullUrl);
  if (meta.ogImage) {
    setMetaTag('property', 'og:image', meta.ogImage);
  }

  // 5. Update Twitter Card Tags
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  if (meta.ogImage) {
    setMetaTag('name', 'twitter:image', meta.ogImage);
  }

  // 6. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);

  // 7. Dynamic JSON-LD Structured Data for specific page types
  const existingDynamicSchema = document.getElementById('dynamic-page-schema');
  if (existingDynamicSchema) {
    existingDynamicSchema.remove();
  }

  if (meta.schema) {
    const script = document.createElement('script');
    script.id = 'dynamic-page-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(meta.schema);
    document.head.appendChild(script);
  }
}

function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
