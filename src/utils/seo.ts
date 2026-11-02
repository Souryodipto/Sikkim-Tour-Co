/**
 * SEO & GEO (Local Search & Generative Engine Optimization) Utility for Sikkim Tour Co.
 * Dynamically handles document.title, meta descriptions, canonical URLs,
 * Open Graph tags, Twitter card tags, and page-specific Schema.org JSON-LD microdata.
 * Optimized for Google #1 Rankings, Google Knowledge Graph, Local 3-Pack,
 * and Generative AI engines (SearchGPT, Claude, Perplexity, Gemini AI Overviews).
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
  ogImage?: string;
  schema?: object;
  noIndex?: boolean;
}

function createBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function updatePageSeo(route: RouteMatch): void {
  if (typeof document === 'undefined') return;

  const baseTitle = siteConfig.brandName;
  const baseUrl = 'https://sikkimtourco.com';
  const fullUrl = `${baseUrl}${route.pathname}`;

  let meta: PageSeoMetadata = {
    title: `Sikkim Tour Packages 2026 | #1 Sikkim Tour Company Gangtok`,
    description: `Book Sikkim tour packages with Sikkim Tour Company, Gangtok's top local operator on Paljor Stadium Rd (4.9★). 4x4 fleet, Army permits, custom tours from ₹18,000.`,
    ogImage: `${baseUrl}/logo.png`,
  };

  switch (route.view) {
    case 'home':
      meta = {
        title: `Sikkim Tour Packages 2026 | #1 Sikkim Tour Company Gangtok`,
        description: `Book authentic Sikkim tour packages with Sikkim Tour Company, Gangtok's top local operator on Paljor Stadium Rd (4.9★). 4x4 fleet, Army permits, custom tours from ₹18,000.`,
        ogImage: `${baseUrl}/logo.png`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([{ name: 'Home', url: baseUrl }]),
          ],
        },
      };
      break;

    case 'packages':
      meta = {
        title: `Sikkim Tour Packages 2026 | 40 Curated Himalayan Itineraries | Sikkim Tour Co.`,
        description: `Browse 40 curated Sikkim tour packages across North, East, West & South Sikkim from ₹18,000. Private 4x4 Innova cabs, Army permits, and direct WhatsApp booking.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Sikkim Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'sikkim-tour':
      meta = {
        title: `Sikkim Tour Packages 2026 | Top Himalayan Itineraries & Local Fleet`,
        description: `Plan your dream Sikkim tour with Gangtok's top local operator. Custom circuits covering North, East, West & South Sikkim from ₹18,000. 4x4 cabs & Army permits.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Sikkim Tour', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'sikkim-tour-company':
      meta = {
        title: `Best Sikkim Tour Company in Gangtok | Local 4x4 Fleet & Army Permits`,
        description: `Sikkim Tour Company is Gangtok's verified local tour operator on Paljor Stadium Road (4.9★, 118 reviews). Local mountain fleet, zero middlemen, 100% permit clearance.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Sikkim Tour Company', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'north-india-tour':
      meta = {
        title: `North India Himalayan Tour Packages 2026 | Sikkim & Darjeeling Circuits`,
        description: `Custom North India Himalayan tours combining Sikkim, Darjeeling, and Eastern Himalayan frontiers from Bagdogra, Kolkata & Delhi. Private 4x4 cabs & luxury stays.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'North India Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'gangtok-packages':
      meta = {
        title: `Gangtok Tour Packages 2026 | MG Marg, Tsomgo & Nathula Pass | Sikkim Tour Co.`,
        description: `Book Gangtok tour packages with local experts. MG Marg hotel stays, Tsomgo Lake & Nathula Pass Army permits, private Innova cabs, and custom 3 to 5-day itineraries from ₹18,000.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Gangtok Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'north-sikkim-packages':
      meta = {
        title: `North Sikkim Tour Packages (Lachen, Lachung, Gurudongmar) | Sikkim Tour Co.`,
        description: `North Sikkim tour packages covering Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, Zero Point, and Lachen/Lachung stays. Dedicated 4x4 Scorpio/Innova with Army permits from ₹24,500.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'North Sikkim Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'gurudongmar-tour':
      meta = {
        title: `Gurudongmar Lake 17,800 ft Tour Packages 2026 | Sikkim Tour Co.`,
        description: `High-altitude Gurudongmar Lake tour from Lachen. Acclimatized overnight halts, Indian Army checkpost permit clearance, 4WD mountain vehicles, and emergency oxygen support from ₹24,500.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Gurudongmar Lake Tour', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'nathula-tour':
      meta = {
        title: `Nathu La Pass & Tsomgo Lake Day Tour Packages | Sikkim Tour Co.`,
        description: `Day tour to Indo-China border at Nathu La Pass (14,140 ft), sacred Tsomgo Lake, and Baba Mandir from Gangtok. Wednesday–Sunday Army permit paperwork handled in advance from ₹6,500/vehicle.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Nathula Pass Tour', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'pelling-packages':
      meta = {
        title: `Pelling Tour Packages & West Sikkim Circuits 2026 | Sikkim Tour Co.`,
        description: `West Sikkim tour packages featuring Pelling Glass Skywalk, Kanchenjunga sunrise, 1705 Pemayangtse Monastery, Rabdentse Palace ruins, and Yuksom coronation throne from ₹21,000.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Pelling Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'silk-route-packages':
      meta = {
        title: `Old Silk Route Zuluk Tour Packages (32 Hairpins) | Sikkim Tour Co.`,
        description: `Explore the historic Silk Route in East Sikkim: 32 zigzag hairpin bends, Thambi Kanchenjunga sunrise viewpoint, Kupup Elephant Lake, and authentic homestay hospitality from ₹22,000.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Old Silk Route Zuluk Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'honeymoon-packages':
      meta = {
        title: `Sikkim Honeymoon Packages 2026 | Romantic Resorts & Stays | Sikkim Tour Co.`,
        description: `Romantic Himalayan honeymoon packages. Handpicked boutique mountain resorts, candlelit dinners, private luxury Innova Crysta transport, and serene lake picnics across Gangtok & Pelling.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Sikkim Honeymoon Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'family-packages':
      meta = {
        title: `Sikkim Family Tour Packages 2026 | Kids & Senior Friendly | Sikkim Tour Co.`,
        description: `Safe, comfortable Sikkim family holiday packages. Gentle travel pacing, child and senior-friendly nature walks, Gangtok ropeway rides, tea garden stays, and spacious SUV transport.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Sikkim Family Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'east-sikkim-packages':
      meta = {
        title: `East Sikkim Tour Packages | Gangtok, Tsomgo & Zuluk | Sikkim Tour Co.`,
        description: `Official East Sikkim tour packages: Gangtok MG Marg, Tsomgo Lake, Baba Mandir, Nathu La pass, and Old Silk Route Zuluk. Private SUVs with permits handled.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'East Sikkim Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'west-sikkim-packages':
      meta = {
        title: `West Sikkim Tour Packages | Pelling, Rabdentse & Yuksom | Sikkim Tour Co.`,
        description: `Handcrafted West Sikkim tours: Pelling Kanchenjunga viewpoints, Pemayangtse, Rabdentse ruins, Khecheopalri Lake, and Yuksom. Verified hotels and private transport.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'West Sikkim Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'south-sikkim-packages':
    case 'darjeeling-packages':
      meta = {
        title: `South Sikkim & Darjeeling Tour Packages | Sikkim Tour Co.`,
        description: `Explore South Sikkim & Darjeeling: 130-ft Ravangla Buddha Park, organic Temi Tea Garden, Namchi Char Dham, and UNESCO Toy Train in comfortable 3 to 7-day circuits.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'South Sikkim Tour Packages', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'kolkata-packages':
      meta = {
        title: `Sikkim Tour Packages from Kolkata 2026 | Train & Flight Linked | Sikkim Tour Co.`,
        description: `Customized Sikkim tour packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains to NJP and non-stop flights to Bagdogra, verified Bengali/Indian food, and private 4x4 cabs.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Sikkim Packages from Kolkata', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'bagdogra-packages':
      meta = {
        title: `Sikkim Packages from Bagdogra & NJP | Direct 4x4 Terminal Pickup | Sikkim Tour Co.`,
        description: `Direct terminal pickup at Bagdogra Airport (IXB) and NJP Junction. Dedicated mountain Innova/Scorpio waiting on arrival for direct transfers to Gangtok and North Sikkim without broker delays.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Sikkim Packages from Bagdogra & NJP', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'delhi-packages':
      meta = {
        title: `Sikkim Tour Packages from Delhi NCR 2026 | Flights & Luxury Stays | Sikkim Tour Co.`,
        description: `Himalayan holiday circuits from Delhi NCR with IGI Airport flight coordination, premium private SUV transport, North Sikkim Army permits, and luxury heritage stays.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Packages', url: `${baseUrl}/packages` },
              { name: 'Sikkim Packages from Delhi', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'international-travel':
      meta = {
        title: `Sikkim Travel for Foreign Tourists | RAP & PAP Permits | Sikkim Tour Co.`,
        description: `Complete foreign national guide for Sikkim: Free Restricted Area Permits (RAP) at Rangpo/Melli, 2+ person group rules for Lachung & Yumthang, and licensed tour desk support.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'International Travel & Permits', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'weather':
      meta = {
        title: `Sikkim Weather & Live Road Status (Gangtok & North Sikkim) | Sikkim Tour Co.`,
        description: `Real-time weather reports, monthly temperatures, snow forecasts, and NH10 road status across Gangtok, Lachen, Lachung, Yumthang Valley, and Nathula Pass.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Live Weather & Roads', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'faqs':
      meta = {
        title: `Sikkim Travel FAQs & Permits | Sikkim Tour Co.`,
        description: `Authoritative answers to top Sikkim travel questions: Indian Army checkpost ID requirements (Voter ID/Passport), Bagdogra/NJP taxi rates, best seasons for snow, and high-altitude safety.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Travel FAQs', url: fullUrl },
            ]),
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What identity documents are strictly required for Sikkim Army permits?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Indian nationals MUST carry their original Voter ID Card or Indian Passport along with 4 passport-size photographs. Indian Army checkposts strictly DO NOT accept Aadhaar cards or PAN cards.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I reach Gangtok from Bagdogra Airport (IXB) or NJP Railway Station?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Gangtok is approximately 120-125 km from Bagdogra Airport and NJP. The scenic drive takes about 4.5 hours along NH10. Private Innova Crystas and Scorpios can be arranged by Sikkim Tour Co.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the best time to visit Sikkim for snow and rhododendrons?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'For snow, visit between December and February. For rhododendron blooms across Yumthang Valley and Barsey Sanctuary, visit from March to May. For crystal clear views of Mount Kanchenjunga, October to mid-December is best.',
                  },
                },
              ],
            },
          ],
        },
      };
      break;

    case 'package-detail': {
      const pkg = tourPackagesData.find((p) => p.slug === route.slug);
      if (pkg) {
        meta = {
          title: `${pkg.name} (${pkg.duration}) | Sikkim Tour Packages 2026`,
          description: `${pkg.overview.slice(0, 140)}... Rates from ₹${pkg.startingPriceInr.toLocaleString('en-IN')}/person. Permit paperwork handled, dedicated 4x4 vehicle & Gangtok local support.`,
          ogImage: pkg.heroImage || `${baseUrl}/logo.png`,
          schema: {
            '@context': 'https://schema.org',
            '@graph': [
              createBreadcrumbs([
                { name: 'Home', url: baseUrl },
                { name: 'Packages', url: `${baseUrl}/packages` },
                { name: pkg.name, url: fullUrl },
              ]),
              {
                '@type': 'TouristTrip',
                name: pkg.name,
                description: pkg.overview,
                touristType: pkg.travelStyleCategory,
                provider: {
                  '@type': 'TravelAgency',
                  name: 'Sikkim Tour Co.',
                  url: baseUrl,
                  telephone: '+917001846727',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Paljor Stadium Road',
                    addressLocality: 'Gangtok',
                    addressRegion: 'Sikkim',
                    postalCode: '737101',
                    addressCountry: 'IN',
                  },
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
              {
                '@type': 'Product',
                name: pkg.name,
                description: pkg.overview,
                image: pkg.heroImage || `${baseUrl}/logo.png`,
                brand: {
                  '@type': 'Brand',
                  name: 'Sikkim Tour Co.',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '118',
                  bestRating: '5',
                  worstRating: '1',
                },
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'INR',
                  price: pkg.startingPriceInr,
                  priceValidUntil: '2026-12-31',
                  availability: 'https://schema.org/InStock',
                  url: fullUrl,
                  validFrom: '2026-01-01',
                },
              },
              ...(pkg.faqs && pkg.faqs.length > 0
                ? [
                    {
                      '@type': 'FAQPage',
                      mainEntity: pkg.faqs.map((faq) => ({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: faq.answer,
                        },
                      })),
                    },
                  ]
                : []),
            ],
          },
        };
      } else {
        meta.title = `Sikkim Tour Itinerary & Quotation | ${baseTitle}`;
      }
      break;
    }

    case 'destinations':
      meta = {
        title: `Sikkim Tourist Spots Across 4 Districts | Sikkim Tour Co.`,
        description: `Explore North, East, West, and South Sikkim: Gurudongmar Lake (17,800 ft), Nathu La Pass, Rumtek Monastery, Pelling Skywalk, and historic Yuksom.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Destinations', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'destination-detail': {
      const dest = destinationsData.find((d) => d.id === route.slug);
      if (dest) {
        meta = {
          title: `${dest.name} Travel Guide, Permits & Key Spots | Sikkim Tour Co.`,
          description: `${(dest.shortDescription || dest.fullOverview).slice(0, 150)}... Elevation, Army permit rules, best season, and must-see attractions.`,
          ogImage: dest.spots?.[0]?.imageUrl || `${baseUrl}/logo.png`,
          schema: {
            '@context': 'https://schema.org',
            '@graph': [
              createBreadcrumbs([
                { name: 'Home', url: baseUrl },
                { name: 'Destinations', url: `${baseUrl}/destinations` },
                { name: dest.name, url: fullUrl },
              ]),
              {
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
            ],
          },
        };
      }
      break;
    }

    case 'disclosures':
      meta = {
        title: `Mandatory Sikkim Travel Disclosures & Army Permits | Sikkim Tour Co.`,
        description: `Essential travel compliance: Indian Army checkposts mandate original Voter ID or Passport. Aadhaar/PAN strictly rejected. Foreign national RAP/PAP guidelines.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Permit Disclosures', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'stays':
      meta = {
        title: `Curated Heritage Hotels & Mountain Retreats | Sikkim Tour Co.`,
        description: `Authentic Himalayan stays: Elgin Nor-Khill Gangtok, Chumbi Mountain Retreat Pelling, Temi Tea Estate Bungalow, and high-altitude Lachen lodges.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Heritage Stays', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'stay-detail': {
      const stay = accommodationsData.find((s) => s.slug === route.slug);
      if (stay) {
        meta = {
          title: `${stay.name} (${stay.location}) | Sikkim Tour Co.`,
          description: `${stay.overview.slice(0, 150)}... Handpicked mountain retreat arranged through our local Gangtok travel desk.`,
          ogImage: stay.heroImage || `${baseUrl}/logo.png`,
          schema: {
            '@context': 'https://schema.org',
            '@graph': [
              createBreadcrumbs([
                { name: 'Home', url: baseUrl },
                { name: 'Heritage Stays', url: `${baseUrl}/stays` },
                { name: stay.name, url: fullUrl },
              ]),
            ],
          },
        };
      }
      break;
    }

    case 'experiences':
      meta = {
        title: `Curated Himalayan Experiences & Thematic Journeys | Sikkim Tour Co.`,
        description: `Discover hand-crafted Sikkim travel themes: Royal Heritage & Living Monasteries, High-Altitude Frontier Expeditions, Romantic Getaways, and Wildlife & Red Panda photography.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Experiences', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'travel-guides':
      meta = {
        title: `Sikkim Travel Blog & Guides (28 Local Stories) | Sikkim Tour Co.`,
        description: `Authoritative Sikkim travel stories, NH-10 road conditions, Army checkpost permit rules, monastery guides, and altitude advisories written by Gangtok locals.`,
        ogImage: `${baseUrl}/logo.png`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Travel Guides', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'travel-guide-detail': {
      const guide = travelGuidesData.find((g) => g.slug === route.slug || g.id === route.slug);
      if (guide) {
        meta = {
          title: `${guide.title} | Sikkim Tour Co. Blog`,
          description: guide.metaDescription || guide.intro.slice(0, 150),
          ogImage: guide.heroImage,
          schema: {
            '@context': 'https://schema.org',
            '@graph': [
              createBreadcrumbs([
                { name: 'Home', url: baseUrl },
                { name: 'Travel Guides', url: `${baseUrl}/travel-guides` },
                { name: guide.title, url: fullUrl },
              ]),
              {
                '@type': 'BlogPosting',
                headline: guide.title,
                description: guide.metaDescription || guide.intro,
                image: [guide.heroImage],
                datePublished: `${guide.publishedDate}T09:00:00+05:30`,
                dateModified: '2026-11-02T12:00:00+05:30',
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
                articleSection: guide.category,
              },
            ],
          },
        };
      }
      break;
    }

    case 'reviews':
      meta = {
        title: `118+ Verified Traveler Reviews (4.9★) | Sikkim Tour Co.`,
        description: `Authentic reviews from travelers exploring Sikkim with our Gangtok travel desk, dedicated 4x4 drivers, and Army permit coordination.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Traveler Reviews', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'customise-trip':
      meta = {
        title: `Customise Sikkim Tour Itinerary | Sikkim Tour Co.`,
        description: `Share your travel dates and group preferences. Our Gangtok team crafts a customized quotation with dedicated 4x4 vehicle and Army permits.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Customise Trip', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'about':
      meta = {
        title: `About Sikkim Tour Co. – Local Gangtok Travel Desk | Sikkim Tour Co.`,
        description: `Local mountain roots, dedicated 4x4 mountain fleet, plastic-free travel advocacy, fair compensation for drivers, and authentic Himalayan hospitality.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'About Us', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'contact':
      meta = {
        title: `Contact Sikkim Tour Co. – Paljor Stadium Rd, Gangtok`,
        description: `Visit our local office on Paljor Stadium Road, Gangtok, Sikkim 737101. Direct WhatsApp desk: +91 70018 46727, email: info@sikkimtourco.com.`,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            createBreadcrumbs([
              { name: 'Home', url: baseUrl },
              { name: 'Contact Us', url: fullUrl },
            ]),
          ],
        },
      };
      break;

    case 'checkout':
    case 'booking-confirmation':
    case 'login':
    case 'register':
    case 'account':
    case 'admin':
    case 'admin-enquiries':
    case 'not-found':
      meta = {
        title: `Secure Booking | Sikkim Tour Co.`,
        description: `Direct booking and itinerary coordination with Sikkim Tour Co.`,
        noIndex: true,
      };
      break;

    default:
      meta.title = `Sikkim Tour Packages 2026 | #1 Sikkim Tour Company Gangtok`;
      break;
  }

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Meta Description
  setMetaTag('name', 'description', meta.description);

  // 3. Robots directive handling: index/follow for public pages, noindex for private/transactional
  if (meta.noIndex) {
    setMetaTag('name', 'robots', 'noindex, nofollow');
    setMetaTag('name', 'googlebot', 'noindex, nofollow');
    setMetaTag('name', 'bingbot', 'noindex, nofollow');
  } else {
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  }

  // 4. Ensure NO obsolete meta keywords tag exists in DOM
  const existingKeywordsTag = document.querySelector('meta[name="keywords"]');
  if (existingKeywordsTag) {
    existingKeywordsTag.remove();
  }

  // 5. Update Open Graph Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', fullUrl);
  if (meta.ogImage) {
    setMetaTag('property', 'og:image', meta.ogImage);
  }

  // 6. Update Twitter Card Tags
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  if (meta.ogImage) {
    setMetaTag('name', 'twitter:image', meta.ogImage);
  }

  // 7. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);

  // 8. Dynamic JSON-LD Structured Data for specific page types
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
