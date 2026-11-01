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
  ogImage?: string;
  schema?: object;
}

export function updatePageSeo(route: RouteMatch): void {
  if (typeof document === 'undefined') return;

  const baseTitle = siteConfig.brandName;
  const baseUrl = 'https://sikkimtourco.com';
  const fullUrl = `${baseUrl}${route.pathname}`;

  let meta: PageSeoMetadata = {
    title: `Sikkim Tour Packages from Gangtok | Sikkim Tour Co.`,
    description: `Custom Sikkim tour packages from Gangtok by local experts. Private 4x4 mountain vehicles, all permit paperwork handled for North Sikkim & Nathula, and verified hotels from ₹18,000.`,
    ogImage: `${baseUrl}/logo.png`,
  };

  switch (route.view) {
    case 'home':
      meta = {
        title: `Sikkim Tour Packages from Gangtok | Sikkim Tour Co.`,
        description: `Custom Sikkim tour packages from Gangtok by local experts. Private 4x4 mountain vehicles, all permit paperwork handled for North Sikkim & Nathula, and verified hotels from ₹18,000.`,
        ogImage: `${baseUrl}/logo.png`,
      };
      break;

    case 'packages':
      meta = {
        title: `Sikkim Tour Packages & Itineraries | Sikkim Tour Co.`,
        description: `15 curated Sikkim tour packages across North, East, West, and South Sikkim from ₹18,000. Private Innova Crysta cabs, army permit handling, and custom quotes on WhatsApp (+91 70018 46727).`,
      };
      break;

    case 'gangtok-packages':
      meta = {
        title: `Gangtok Tour Packages (2026) | Sikkim Tour Co.`,
        description: `Book Gangtok tour packages with local experts. MG Marg hotel stays, Tsomgo Lake & Nathula Pass Army permits, private Innova cabs, and custom 3 to 5-day itineraries from ₹18,000.`,
      };
      break;

    case 'north-sikkim-packages':
      meta = {
        title: `North Sikkim Tour Packages (Lachen & Lachung) | Sikkim Tour Co.`,
        description: `North Sikkim tour packages covering Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, Zero Point, and Lachen/Lachung stays. Dedicated 4x4 Scorpio/Innova with Army permits from ₹24,500.`,
      };
      break;

    case 'gurudongmar-tour':
      meta = {
        title: `Gurudongmar Lake 17,800 ft Tour | Sikkim Tour Co.`,
        description: `High-altitude Gurudongmar Lake tour from Lachen. Acclimatized overnight halts, Indian Army checkpost permit clearance, 4WD mountain vehicles, and emergency oxygen support from ₹24,500.`,
      };
      break;

    case 'nathula-tour':
      meta = {
        title: `Nathu La Pass & Tsomgo Lake Day Tour | Sikkim Tour Co.`,
        description: `Day tour to Indo-China border at Nathu La Pass (14,140 ft), sacred Tsomgo Lake, and Baba Mandir from Gangtok. Wednesday–Sunday Army permit paperwork handled in advance from ₹6,500/vehicle.`,
      };
      break;

    case 'pelling-packages':
      meta = {
        title: `Pelling Tour Packages & West Sikkim | Sikkim Tour Co.`,
        description: `West Sikkim tour packages featuring Pelling Glass Skywalk, Kanchenjunga sunrise, 1705 Pemayangtse Monastery, Rabdentse Palace ruins, and Yuksom coronation throne from ₹21,000.`,
      };
      break;

    case 'silk-route-packages':
      meta = {
        title: `Old Silk Route Zuluk Tour Packages | Sikkim Tour Co.`,
        description: `Explore the historic Silk Route in East Sikkim: 32 zigzag hairpin bends, Thambi Kanchenjunga sunrise viewpoint, Kupup Elephant Lake, and authentic homestay hospitality from ₹22,000.`,
      };
      break;

    case 'honeymoon-packages':
      meta = {
        title: `Sikkim Honeymoon Packages | Sikkim Tour Co.`,
        description: `Romantic Himalayan honeymoon packages. Handpicked boutique mountain resorts, candlelit dinners, private luxury Innova Crysta transport, and serene lake picnics across Gangtok & Pelling.`,
      };
      break;

    case 'family-packages':
      meta = {
        title: `Sikkim Family Tour Packages | Sikkim Tour Co.`,
        description: `Safe, comfortable Sikkim family holiday packages. Gentle travel pacing, child and senior-friendly nature walks, Gangtok ropeway rides, tea garden stays, and spacious SUV transport.`,
      };
      break;

    case 'east-sikkim-packages':
      meta = {
        title: `East Sikkim Tour Packages | Sikkim Tour Co.`,
        description: `Official East Sikkim tour packages: Gangtok MG Marg, Tsomgo Lake, Baba Mandir, Nathu La pass, and Old Silk Route Zuluk. Private SUVs with permits handled.`,
      };
      break;

    case 'west-sikkim-packages':
      meta = {
        title: `West Sikkim Tour Packages | Sikkim Tour Co.`,
        description: `Handcrafted West Sikkim tours: Pelling Kanchenjunga viewpoints, Pemayangtse, Rabdentse ruins, Khecheopalri Lake, and Yuksom. Verified hotels and private transport.`,
      };
      break;

    case 'south-sikkim-packages':
    case 'darjeeling-packages':
      meta = {
        title: `South Sikkim Tour Packages | Sikkim Tour Co.`,
        description: `Explore South Sikkim: 130-ft Ravangla Buddha Park, organic Temi Tea Garden, Samdruptse Hill, and Namchi Char Dham in comfortable 3 to 7-day circuits.`,
      };
      break;

    case 'kolkata-packages':
      meta = {
        title: `Sikkim Tour Packages from Kolkata | Sikkim Tour Co.`,
        description: `Customized Sikkim tour packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains to NJP and non-stop flights to Bagdogra, verified Bengali/Indian food, and private 4x4 cabs.`,
      };
      break;

    case 'bagdogra-packages':
      meta = {
        title: `Sikkim Packages from Bagdogra & NJP | Sikkim Tour Co.`,
        description: `Direct terminal pickup at Bagdogra Airport (IXB) and NJP Junction. Dedicated mountain Innova/Scorpio waiting on arrival for direct transfers to Gangtok and North Sikkim without broker delays.`,
      };
      break;

    case 'delhi-packages':
      meta = {
        title: `Sikkim Tour Packages from Delhi | Sikkim Tour Co.`,
        description: `Himalayan holiday circuits from Delhi NCR with IGI Airport flight coordination, premium private SUV transport, North Sikkim Army permits, and luxury heritage stays.`,
      };
      break;

    case 'faqs':
      meta = {
        title: `Sikkim Travel FAQs & Permits | Sikkim Tour Co.`,
        description: `Authoritative answers to top Sikkim travel questions: Indian Army checkpost ID requirements (Voter ID/Passport), Bagdogra/NJP taxi rates, best seasons for snow, and high-altitude safety.`,
        schema: {
          '@context': 'https://schema.org',
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
          ],
        },
      };
      break;

    case 'package-detail': {
      const pkg = tourPackagesData.find((p) => p.slug === route.slug);
      if (pkg) {
        meta = {
          title: `${pkg.name} (${pkg.duration}) | Sikkim Tour Co.`,
          description: `${pkg.overview.slice(0, 140)}... Rates from ₹${pkg.startingPriceInr.toLocaleString('en-IN')}/person. Permit paperwork handled, dedicated 4x4 vehicle & Gangtok local support.`,
          schema: {
            '@context': 'https://schema.org',
            '@graph': [
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
                brand: {
                  '@type': 'Brand',
                  name: 'Sikkim Tour Co.',
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
      };
      break;

    case 'destination-detail': {
      const dest = destinationsData.find((d) => d.id === route.slug);
      if (dest) {
        meta = {
          title: `${dest.name} Travel Guide, Permits & Key Spots | Sikkim Tour Co.`,
          description: `${(dest.shortDescription || dest.fullOverview).slice(0, 150)}... Elevation, Army permit rules, best season, and must-see attractions.`,
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



    case 'disclosures':
      meta = {
        title: `Mandatory Sikkim Travel Disclosures & Army Permits | Sikkim Tour Co.`,
        description: `Essential travel compliance: Indian Army checkposts mandate original Voter ID or Passport. Aadhaar/PAN strictly rejected. Foreign national RAP/PAP guidelines.`,
      };
      break;

    case 'stays':
      meta = {
        title: `Curated Heritage Hotels & Mountain Retreats | Sikkim Tour Co.`,
        description: `Authentic Himalayan stays: Elgin Nor-Khill Gangtok, Chumbi Mountain Retreat Pelling, Temi Tea Estate Bungalow, and high-altitude Lachen lodges.`,
      };
      break;

    case 'stay-detail': {
      const stay = accommodationsData.find((s) => s.slug === route.slug);
      if (stay) {
        meta = {
          title: `${stay.name} (${stay.location}) | Sikkim Tour Co.`,
          description: `${stay.overview.slice(0, 150)}... Handpicked mountain retreat arranged through our local Gangtok travel desk.`,
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
        title: `Sikkim Travel Blog & Guides (18 Local Stories) | Sikkim Tour Co.`,
        description: `Authoritative Sikkim travel stories, NH-10 road conditions, Army checkpost permit rules, monastery guides, and altitude advisories written by Gangtok locals.`,
        ogImage: `${baseUrl}/logo.png`,
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
            '@type': 'BlogPosting',
            headline: guide.title,
            description: guide.metaDescription || guide.intro,
            image: [guide.heroImage],
            datePublished: `${guide.publishedDate}T09:00:00+05:30`,
            dateModified: '2026-11-01T12:00:00+05:30',
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
        };
      }
      break;
    }

    case 'reviews':
      meta = {
        title: `118+ Verified Traveler Reviews | Sikkim Tour Co.`,
        description: `Authentic reviews from travelers exploring Sikkim with our Gangtok travel desk, dedicated 4x4 drivers, and Army permit coordination.`,
      };
      break;


    case 'customise-trip':
      meta = {
        title: `Customise Sikkim Tour Itinerary | Sikkim Tour Co.`,
        description: `Share your travel dates and group preferences. Our Gangtok team crafts a customized quotation with dedicated 4x4 vehicle and Army permits.`,
      };
      break;

    case 'about':
      meta = {
        title: `About Sikkim Tour Co. – Local Gangtok Travel Desk | Sikkim Tour Co.`,
        description: `Local mountain roots, dedicated 4x4 mountain fleet, plastic-free travel advocacy, fair compensation for drivers, and authentic Himalayan hospitality.`,
      };
      break;

    case 'contact':
      meta = {
        title: `Contact Sikkim Tour Co. – Paljor Stadium Rd, Gangtok`,
        description: `Visit our local office on Paljor Stadium Road, Gangtok, Sikkim 737101. Direct WhatsApp desk: +91 70018 46727, email: info@sikkimtourco.com.`,
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

  // 4. Ensure NO meta keywords tag exists in DOM (Google ignores it and flags spam)
  const existingKeywordsTag = document.querySelector('meta[name="keywords"]');
  if (existingKeywordsTag) {
    existingKeywordsTag.remove();
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
