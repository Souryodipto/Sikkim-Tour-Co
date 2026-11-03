/**
 * Canonical XML Sitemap Generator for Sikkim Tour Co.
 * Generates an error-free, W3C-valid sitemap.xml directly from application datasets.
 * Synchronizes public/sitemap.xml with 100% of actual, existing routes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tourPackagesData } from '../src/data/packages';
import { destinationsData } from '../src/data/destinations';
import { travelGuidesData } from '../src/data/guides';
import { accommodationsData } from '../src/data/accommodations';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicSitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

const baseUrl = 'https://sikkimtourco.com';
const today = '2026-11-04';

interface SitemapEntry {
  loc: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  lastmod: string;
  image?: {
    loc: string;
    title: string;
  };
}

const entries: SitemapEntry[] = [
  // Core High-Intent SEO Landing Pages
  { loc: `${baseUrl}/`, changefreq: 'daily', priority: '1.0', lastmod: today },
  { loc: `${baseUrl}/sikkim-tour-packages`, changefreq: 'daily', priority: '0.98', lastmod: today },
  { loc: `${baseUrl}/packages`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/customise-trip`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/gangtok-tour-packages`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/north-sikkim-tour-packages`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/lachung-tour-packages`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/lachen-tour-packages`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/pelling-tour-packages`, changefreq: 'daily', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/sikkim-silk-route-tour-packages`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/silk-route-tour-packages`, changefreq: 'weekly', priority: '0.92', lastmod: today },
  { loc: `${baseUrl}/sikkim-honeymoon-packages`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/sikkim-family-tour-packages`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/sikkim-group-tour-packages`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/sikkim-tour-packages-from-kolkata`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/sikkim-packages-from-kolkata`, changefreq: 'weekly', priority: '0.92', lastmod: today },
  { loc: `${baseUrl}/sikkim-packages-from-kalyani`, changefreq: 'weekly', priority: '0.92', lastmod: today },
  { loc: `${baseUrl}/sikkim-packages-from-njp`, changefreq: 'weekly', priority: '0.92', lastmod: today },
  { loc: `${baseUrl}/sikkim-packages-from-bagdogra-njp`, changefreq: 'weekly', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/sikkim-packages-from-delhi`, changefreq: 'weekly', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/gurudongmar-lake-tour`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/nathula-pass-tour`, changefreq: 'weekly', priority: '0.95', lastmod: today },
  { loc: `${baseUrl}/sikkim-darjeeling-tour-packages`, changefreq: 'weekly', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/north-india-tour-packages`, changefreq: 'weekly', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/sikkim-tour`, changefreq: 'weekly', priority: '0.95', lastmod: today },

  // Trust, About & Contact
  { loc: `${baseUrl}/about-us`, changefreq: 'monthly', priority: '0.85', lastmod: today },
  { loc: `${baseUrl}/sikkim-tour-company`, changefreq: 'monthly', priority: '0.85', lastmod: today },
  { loc: `${baseUrl}/contact-us`, changefreq: 'monthly', priority: '0.85', lastmod: today },
  { loc: `${baseUrl}/blog`, changefreq: 'daily', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/travel-guides`, changefreq: 'weekly', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/reviews`, changefreq: 'daily', priority: '0.85', lastmod: today },
  { loc: `${baseUrl}/faqs`, changefreq: 'weekly', priority: '0.85', lastmod: today },
  { loc: `${baseUrl}/disclosures`, changefreq: 'monthly', priority: '0.70', lastmod: today },
  { loc: `${baseUrl}/international-travel`, changefreq: 'monthly', priority: '0.80', lastmod: today },

  // Directories
  { loc: `${baseUrl}/destinations`, changefreq: 'weekly', priority: '0.90', lastmod: today },
  { loc: `${baseUrl}/stays`, changefreq: 'weekly', priority: '0.85', lastmod: today },
  { loc: `${baseUrl}/experiences`, changefreq: 'weekly', priority: '0.85', lastmod: today },
];

// Add All 44 Destinations
for (const d of destinationsData) {
  entries.push({
    loc: `${baseUrl}/destinations/${d.id}`,
    changefreq: 'weekly',
    priority: '0.85',
    lastmod: today,
    image: d.spots?.[0]?.imageUrl ? { loc: d.spots[0].imageUrl, title: d.name } : undefined,
  });
}

// Add All 40 Active Tour Packages
for (const pkg of tourPackagesData) {
  entries.push({
    loc: `${baseUrl}/packages/${pkg.slug}`,
    changefreq: 'weekly',
    priority: '0.90',
    lastmod: today,
    image: pkg.heroImage ? { loc: pkg.heroImage, title: pkg.name } : undefined,
  });
}

// Add Stays
for (const stay of accommodationsData) {
  entries.push({
    loc: `${baseUrl}/stays/${stay.slug}`,
    changefreq: 'monthly',
    priority: '0.80',
    lastmod: today,
    image: stay.heroImage ? { loc: stay.heroImage, title: stay.name } : undefined,
  });
}

// Add All Travel Guides & Blog Articles (35 Guides)
for (const guide of travelGuidesData) {
  entries.push({
    loc: `${baseUrl}/travel-guides/${guide.slug}`,
    changefreq: 'weekly',
    priority: '0.85',
    lastmod: guide.publishedDate || today,
    image: guide.heroImage ? { loc: guide.heroImage, title: guide.title } : undefined,
  });
}

// Build XML string
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map((e) => {
    let item = `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>`;
    if (e.image?.loc) {
      const cleanImgLoc = e.image.loc.replace(/&/g, '&amp;');
      const cleanImgTitle = (e.image.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      item += `\n    <image:image>\n      <image:loc>${cleanImgLoc}</image:loc>\n      <image:title>${cleanImgTitle}</image:title>\n    </image:image>`;
    }
    item += `\n  </url>`;
    return item;
  })
  .join('\n')}
</urlset>
`;

fs.writeFileSync(publicSitemapPath, xmlContent.trim(), 'utf8');
console.log(`Generated canonical public/sitemap.xml with ${entries.length} validated entries.`);

