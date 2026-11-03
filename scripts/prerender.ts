/**
 * Static HTML Prerendering Engine for Sikkim Tour Co.
 * Generates unique initial HTML, metadata, and crawlable content for every
 * primary SEO landing page, destination, package, and travel guide.
 * Ensures Googlebot, Bingbot, and AI search engines receive full page content
 * and correct metadata on initial HTTP GET requests without executing JavaScript.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tourPackagesData } from '../src/data/packages';
import { destinationsData } from '../src/data/destinations';
import { travelGuidesData } from '../src/data/guides';
import { DESTINATION_LANDING_DATA } from '../src/components/DestinationLandingContent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  badge?: string;
  heroImage?: string;
  contentHtml: string;
  schema?: object;
}

const routesToPrerender: RouteMeta[] = [];

// 1. Primary Keyword: Sikkim Tour Packages (/sikkim-tour-packages)
routesToPrerender.push({
  path: '/sikkim-tour-packages',
  title: 'Sikkim Tour Packages: Handcrafted Himalayan Circuits (2026) | Sikkim Tour Co.',
  description: 'Book verified Sikkim tour packages with Sikkim Tour Co., Gangtok. Private 4x4 Innova fleet, Nathu La & Gurudongmar Army permits, and transparent mountain rates from ₹18,000.',
  h1: 'Sikkim Tour Packages – Explore the Himalayas with Sikkim Tour Co.',
  subtitle: 'Handcrafted Himalayan holiday packages across North, East, West, and South Sikkim with dedicated mountain vehicles, permit paperwork liaison, and verified boutique stays.',
  badge: 'Official Sikkim Tour Packages',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Official Gangtok Operator · 40 Handcrafted Packages</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Packages – Explore the Himalayas with Sikkim Tour Co.</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Discover the beauty of Sikkim with Sikkim Tour Co. Explore Gangtok, North Sikkim, Lachung, Lachen, Pelling, Zuluk and hidden Himalayan destinations through carefully planned holiday packages. From family holidays and honeymoon escapes to group adventures and customised journeys, we help you experience Sikkim with comfortable stays, reliable transport and personalised travel assistance.</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20am%20interested%20in%20Sikkim%20Tour%20Packages." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Popular Sikkim Tour Packages</h2>
      <ul style="line-height:1.8;color:#444;margin-bottom:30px;">
        <li><strong>North Sikkim Alpine Expedition (5 Days / 4 Nights):</strong> Lachen, Gurudongmar Lake (17,800 ft), Lachung, Yumthang Valley & Zero Point.</li>
        <li><strong>Gangtok & High Passes (4 Days / 3 Nights):</strong> MG Marg, Tsomgo Changu Lake (12,310 ft), Baba Harbhajan Mandir & Nathu La Pass (14,140 ft).</li>
        <li><strong>Pelling & West Sikkim Heritage (4 Days / 3 Nights):</strong> Pelling Skywalk, Pemayangtse Monastery, Rabdentse Ruins & sacred Khecheopalri Lake.</li>
        <li><strong>Old Silk Route Zuluk Trail (4 Days / 3 Nights):</strong> 32 Hairpin loops, Lungthung sunrise, Kupup Elephant Lake & Gnathang Valley.</li>
        <li><strong>Grand 4-District Sikkim Odyssey (14 Days / 13 Nights):</strong> Comprehensive expedition across North, East, West & South Sikkim.</li>
      </ul>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions</h2>
      <div style="line-height:1.6;color:#333;">
        <p><strong>Q: What is the starting price for Sikkim tour packages?</strong><br/>A: Handcrafted Sikkim packages start from ₹18,000 to ₹25,000 per person depending on duration, hotel category, and vehicle choices. All packages include dedicated private vehicles, hotel stays, breakfast, and Indian Army permit clearances.</p>
        <p><strong>Q: How do we get permits for Nathu La Pass and North Sikkim?</strong><br/>A: Sikkim Tour Co. manages 100% of the Protected Area Permit (PAP) paperwork with the Gangtok District Collectorate and Indian Army. Indian travelers simply submit their Voter ID Card or Passport copy via WhatsApp 72 hours before arrival.</p>
      </div>
    </div>
  `
});

// 2. Gangtok Tour Packages (/gangtok-tour-packages)
const gangtokData = DESTINATION_LANDING_DATA['gangtok'];
routesToPrerender.push({
  path: '/gangtok-tour-packages',
  title: 'Gangtok Tour Packages 2026 | Tsomgo Lake, Nathula Pass & Sightseeing | Sikkim Tour Co.',
  description: 'Handcrafted Gangtok tour packages featuring vehicle-free MG Marg stays, Tsomgo Lake (12,310 ft), Nathu La Pass (14,140 ft), and Rumtek Monastery. Book with local Gangtok operator.',
  h1: 'Gangtok Tour Packages & Sightseeing Itineraries (2026)',
  subtitle: 'Handcrafted 3 to 7-day Gangtok holiday packages featuring Tsomgo Lake, Nathula Pass, MG Marg stays, and private mountain transport.',
  badge: 'Gangtok & East Sikkim Packages',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Gangtok Capital Concierge · Local Mountain Desk</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${gangtokData.title}</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${gangtokData.overview.join(' ')}</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(gangtokData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?dest=Gangtok" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Attractions in Gangtok</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
        ${gangtokData.attractions.map(a => `
          <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
            <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name} ${a.altitude ? `<span style="font-size:12px;color:#64748b;">(${a.altitude})</span>` : ''}</h3>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
          </div>
        `).join('')}
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Gangtok Tours</h2>
      <div style="line-height:1.6;color:#333;">
        ${gangtokData.faqs.map(f => `
          <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
        `).join('')}
      </div>
    </div>
  `
});

// 3. North Sikkim Tour Packages (/north-sikkim-tour-packages)
const northData = DESTINATION_LANDING_DATA['north_sikkim'];
routesToPrerender.push({
  path: '/north-sikkim-tour-packages',
  title: 'North Sikkim Tour Packages 2026 | Gurudongmar Lake, Yumthang & Lachen | Sikkim Tour Co.',
  description: 'Official North Sikkim tour packages to Gurudongmar Lake (17,800 ft), Yumthang Valley, Zero Point, Lachen and Lachung. Dedicated 4x4 Scorpio/Innova and Indian Army permit clearance.',
  h1: 'North Sikkim Tour Packages: Lachen, Lachung, Gurudongmar & Yumthang',
  subtitle: 'Official 3 to 6-day North Sikkim expeditions to Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, Zero Point, and Lachen/Lachung with dedicated Army permit paperwork handling.',
  badge: 'North Sikkim Alpine Frontier',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">North Sikkim Alpine Expeditions · 17,800 ft</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${northData.title}</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${northData.overview.join(' ')}</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(northData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?dest=North+Sikkim" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Attractions in North Sikkim</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
        ${northData.attractions.map(a => `
          <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
            <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name} ${a.altitude ? `<span style="font-size:12px;color:#64748b;">(${a.altitude})</span>` : ''}</h3>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
          </div>
        `).join('')}
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: North Sikkim</h2>
      <div style="line-height:1.6;color:#333;">
        ${northData.faqs.map(f => `
          <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
        `).join('')}
      </div>
    </div>
  `
});

// 4. Pelling Tour Packages (/pelling-tour-packages)
const pellingData = DESTINATION_LANDING_DATA['pelling'];
routesToPrerender.push({
  path: '/pelling-tour-packages',
  title: 'Pelling Tour Packages 2026 | Glass Skywalk, Rabdentse & Kanchenjunga | Sikkim Tour Co.',
  description: 'Scenic Pelling tour packages featuring the Glass Skywalk, Rabdentse Palace ruins, Pemayangtse Monastery, and panoramic views of Mount Kanchenjunga. Private transport from Gangtok or NJP.',
  h1: 'Pelling Tour Packages: West Sikkim Kanchenjunga & Heritage Trails',
  subtitle: 'Scenic Pelling tour packages featuring the Glass Skywalk, Rabdentse Palace ruins, Pemayangtse Monastery, and panoramic views of Mount Kanchenjunga.',
  badge: 'Pelling & West Sikkim Packages',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">West Sikkim Royal Monasteries · Kanchenjunga Views</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${pellingData.title}</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${pellingData.overview.join(' ')}</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(pellingData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?dest=Pelling" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Attractions in Pelling & West Sikkim</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
        ${pellingData.attractions.map(a => `
          <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
            <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name} ${a.altitude ? `<span style="font-size:12px;color:#64748b;">(${a.altitude})</span>` : ''}</h3>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
          </div>
        `).join('')}
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Pelling Tours</h2>
      <div style="line-height:1.6;color:#333;">
        ${pellingData.faqs.map(f => `
          <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
        `).join('')}
      </div>
    </div>
  `
});

// 5. Sikkim Honeymoon Packages (/sikkim-honeymoon-packages)
const honeymoonData = DESTINATION_LANDING_DATA['honeymoon'];
routesToPrerender.push({
  path: '/sikkim-honeymoon-packages',
  title: 'Sikkim Honeymoon Packages 2026 | Luxury Heritage & Romantic Mountain Stays | Sikkim Tour Co.',
  description: 'Tailored romantic escapes in Sikkim with luxury heritage boutique stays, private chauffeurs, candlelit dinners in Gangtok and Pelling, and serene lake excursions. Book with local operator.',
  h1: 'Sikkim Honeymoon Packages: Romantic Himalayan Stays & Starlit Valleys',
  subtitle: 'Tailored romantic escapes with luxury heritage boutique stays, private chauffeurs, candlelit dinners in Gangtok and Pelling, and serene lake excursions.',
  badge: 'Honeymoon & Romantic Luxury',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Romantic Mountain Escapes · Boutique Luxury</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${honeymoonData.title}</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${honeymoonData.overview.join(' ')}</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(honeymoonData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?style=Honeymoon" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Honeymoon Highlights in Sikkim</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
        ${honeymoonData.attractions.map(a => `
          <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
            <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name}</h3>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
          </div>
        `).join('')}
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Honeymoons</h2>
      <div style="line-height:1.6;color:#333;">
        ${honeymoonData.faqs.map(f => `
          <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
        `).join('')}
      </div>
    </div>
  `
});

// 6. Sikkim Family Tour Packages (/sikkim-family-tour-packages)
const familyData = DESTINATION_LANDING_DATA['family'];
routesToPrerender.push({
  path: '/sikkim-family-tour-packages',
  title: 'Sikkim Family Tour Packages 2026 | Relaxed Itineraries & Private Innova | Sikkim Tour Co.',
  description: 'Comfortably paced Sikkim family tour packages with private Innova Crysta cabs, child-friendly sightseeing in Gangtok, Pelling and Ravangla, and verified family hotels.',
  h1: 'Sikkim Family Tour Packages: Leisure Mountain Vacations for All Ages',
  subtitle: 'Thoughtfully paced family itineraries with comfortable Innova transport, kid-friendly nature walks, cable car rides, and relaxed mountain resorts.',
  badge: 'Family Mountain Holidays',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Paced for All Generations · Dedicated Innova Crysta</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${familyData.title}</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${familyData.overview.join(' ')}</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(familyData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?style=Family" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Family-Friendly Spots in Sikkim</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
        ${familyData.attractions.map(a => `
          <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
            <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name}</h3>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
          </div>
        `).join('')}
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Family Holidays</h2>
      <div style="line-height:1.6;color:#333;">
        ${familyData.faqs.map(f => `
          <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
        `).join('')}
      </div>
    </div>
  `
});

// 7. Sikkim Group Tour Packages (/sikkim-group-tour-packages)
const groupData = DESTINATION_LANDING_DATA['group'];
routesToPrerender.push({
  path: '/sikkim-group-tour-packages',
  title: 'Sikkim Group Tour Packages 2026 | Corporate, Student & Family Convoys | Sikkim Tour Co.',
  description: 'Specialized group tour packages across Gangtok, North Sikkim, Pelling and Silk Route. Multi-vehicle convoys, group permits, bulk hotel allocations, and local trip coordinators.',
  h1: 'Sikkim Group Tour Packages: Corporate, Student & Large Family Circuits (2026)',
  subtitle: 'Specialized group tour packages across Gangtok, North Sikkim, Pelling, and the Old Silk Route with coordinated convoy vehicles and on-ground coordinators.',
  badge: 'Sikkim Group & Corporate Expeditions',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Corporate, Student & Convoy Expeditions</span>
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${groupData.title}</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${groupData.overview.join(' ')}</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(groupData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?style=Custom+Tour" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Group Expedition Infrastructure</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
        ${groupData.attractions.map(a => `
          <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
            <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name}</h3>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
          </div>
        `).join('')}
      </div>
      <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Group Tours</h2>
      <div style="line-height:1.6;color:#333;">
        ${groupData.faqs.map(f => `
          <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
        `).join('')}
      </div>
    </div>
  `
});

// 8. Old Silk Route Zuluk (/sikkim-silk-route-tour-packages & /silk-route-tour-packages)
const silkData = DESTINATION_LANDING_DATA['silk_route'];
const silkContent = `
  <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
    <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">32 Legendary Hairpin Bends · Zuluk & Kupup</span>
    <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${silkData.title}</h1>
    <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${silkData.overview.join(' ')}</p>
    <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
      <a href="https://wa.me/917001846727?text=${encodeURIComponent(silkData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
      <a href="/customise-trip?dest=Silk+Route" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
    </div>
    <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Attractions along the Silk Route</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
      ${silkData.attractions.map(a => `
        <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
          <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name} ${a.altitude ? `<span style="font-size:12px;color:#64748b;">(${a.altitude})</span>` : ''}</h3>
          <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
        </div>
      `).join('')}
    </div>
    <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Silk Route</h2>
    <div style="line-height:1.6;color:#333;">
      ${silkData.faqs.map(f => `
        <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
      `).join('')}
    </div>
  </div>
`;
routesToPrerender.push({
  path: '/sikkim-silk-route-tour-packages',
  title: 'Old Silk Route Zuluk Tour Packages 2026 | 32 Hairpin Bends & Kupup | Sikkim Tour Co.',
  description: 'Traverse the ancient Indo-Tibet Silk Route via Rongli, Zuluk, Lungthung sunrise, Kupup Lake and Baba Mandir. Dedicated mountain vehicles and Army paperwork clearance.',
  h1: 'Old Silk Route Zuluk Tour Packages: 32 Hairpin Bends & Kupup Lake',
  subtitle: 'Traverse the historic Himalayan Silk Route across Zuluk, Lungthung sunrise point, Thambi view, Kupup Elephant Lake, and Baba Mandir.',
  badge: 'Old Silk Route Zuluk Circuit',
  contentHtml: silkContent,
});
routesToPrerender.push({
  path: '/silk-route-tour-packages',
  title: 'Old Silk Route Zuluk Tour Packages 2026 | 32 Hairpin Bends & Kupup | Sikkim Tour Co.',
  description: 'Traverse the ancient Indo-Tibet Silk Route via Rongli, Zuluk, Lungthung sunrise, Kupup Lake and Baba Mandir. Dedicated mountain vehicles and Army paperwork clearance.',
  h1: 'Old Silk Route Zuluk Tour Packages: 32 Hairpin Bends & Kupup Lake',
  subtitle: 'Traverse the historic Himalayan Silk Route across Zuluk, Lungthung sunrise point, Thambi view, Kupup Elephant Lake, and Baba Mandir.',
  badge: 'Old Silk Route Zuluk Circuit',
  contentHtml: silkContent,
});

// 9. Kolkata to Sikkim (/sikkim-tour-packages-from-kolkata & /sikkim-packages-from-kolkata)
const kolkataContent = `
  <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
    <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Sealdah / Howrah Express & Kolkata CCU Flights</span>
    <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Packages from Kolkata (2026) | Direct NJP Express Trains & Flights</h1>
    <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Curated Sikkim holiday packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains (Darjeeling Mail, Padatik Express, Vande Bharat, Saraighat, Kanchan Kanya) arriving at NJP and daily direct flights from Netaji Subhash Chandra Bose Airport (CCU) to Bagdogra (IXB). Dedicated 4x4 Innova cabs waiting on arrival, verified Bengali meal options, and 100% Indian Army permit clearance for Nathu La Pass and North Sikkim.</p>
    <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
      <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20am%20planning%20a%20Sikkim%20tour%20from%20Kolkata." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
      <a href="/customise-trip?dest=Kolkata" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
    </div>
    <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Kolkata Travel Coordination Highlights</h2>
    <ul style="line-height:1.8;color:#444;margin-bottom:30px;">
      <li><strong>Direct Platform Pickup at NJP:</strong> Your mountain chauffeur awaits at Platform 1 portico with a nameboard. Zero bargaining with taxi syndicates.</li>
      <li><strong>Bengali Food Guarantee:</strong> Enjoy fresh Bengali home-style meals (rice, sona moong dal, aloo posto, katla/rohu fish) across Gangtok and Pelling.</li>
      <li><strong>Nathu La Pass & North Sikkim Permits:</strong> Simply share your Voter ID Card via WhatsApp 72 hours before boarding the train in Kolkata.</li>
    </ul>
  </div>
`;
routesToPrerender.push({
  path: '/sikkim-tour-packages-from-kolkata',
  title: 'Sikkim Tour Packages from Kolkata (2026) | NJP Train & Flight Pickup | Sikkim Tour Co.',
  description: 'Curated Sikkim tour packages from Kolkata. Coordinated with Darjeeling Mail, Padatik Express & CCU flights. Direct NJP platform pickup, Bengali meals & Army permits.',
  h1: 'Sikkim Tour Packages from Kolkata (2026) | Direct NJP Express Trains & Flights',
  subtitle: 'Curated Sikkim holiday packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains to NJP and direct CCU flights to Bagdogra.',
  badge: 'Kolkata to Sikkim Gateway | Direct NJP Trains & CCU Flights',
  contentHtml: kolkataContent,
});
routesToPrerender.push({
  path: '/sikkim-packages-from-kolkata',
  title: 'Sikkim Tour Packages from Kolkata (2026) | NJP Train & Flight Pickup | Sikkim Tour Co.',
  description: 'Curated Sikkim tour packages from Kolkata. Coordinated with Darjeeling Mail, Padatik Express & CCU flights. Direct NJP platform pickup, Bengali meals & Army permits.',
  h1: 'Sikkim Tour Packages from Kolkata (2026) | Direct NJP Express Trains & Flights',
  subtitle: 'Curated Sikkim holiday packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains to NJP and direct CCU flights to Bagdogra.',
  badge: 'Kolkata to Sikkim Gateway | Direct NJP Trains & CCU Flights',
  contentHtml: kolkataContent,
});

// 10. About Us (/about-us & /sikkim-tour-company)
const aboutContent = `
  <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
    <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Paljor Stadium Road, Gangtok · Ground Operations Desk</span>
    <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">About Sikkim Tour Co. – Official Gangtok Travel Operator</h1>
    <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Sikkim Tour Co. is an established, registered Himalayan tour operator headquartered on Paljor Stadium Road in Gangtok (PIN 737101), Sikkim. Founded on the principle of authentic local stewardship, we provide direct on-the-ground travel planning, dedicated 4x4 mountain fleets, Indian Army permit clearance, and handpicked heritage accommodations across all four districts of Sikkim.</p>
    <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
      <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20learn%20more%20about%20your%20company." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Connect on WhatsApp (+91 70018 46727)</a>
      <a href="/contact-us" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Contact Us</a>
    </div>
  </div>
`;
routesToPrerender.push({
  path: '/about-us',
  title: 'About Sikkim Tour Co. | Official Gangtok Local Operator & Mountain Fleet',
  description: 'Learn about Sikkim Tour Co., Gangtok top-rated local tour operator on Paljor Stadium Road. Private 4x4 mountain vehicles, 100% Army permit clearance, and verified reviews.',
  h1: 'About Sikkim Tour Co. – Official Gangtok Travel Operator',
  subtitle: 'Direct local Himalayan operator headquartered on Paljor Stadium Road, Gangtok (737101).',
  contentHtml: aboutContent,
});
routesToPrerender.push({
  path: '/sikkim-tour-company',
  title: 'About Sikkim Tour Co. | Official Gangtok Local Operator & Mountain Fleet',
  description: 'Learn about Sikkim Tour Co., Gangtok top-rated local tour operator on Paljor Stadium Road. Private 4x4 mountain vehicles, 100% Army permit clearance, and verified reviews.',
  h1: 'About Sikkim Tour Co. – Official Gangtok Travel Operator',
  subtitle: 'Direct local Himalayan operator headquartered on Paljor Stadium Road, Gangtok (737101).',
  contentHtml: aboutContent,
});

// 11. Contact Us (/contact-us)
routesToPrerender.push({
  path: '/contact-us',
  title: 'Contact Sikkim Tour Co. | Gangtok Travel Desk & 24/7 WhatsApp Concierge',
  description: 'Contact Sikkim Tour Co. at our Gangtok desk on Paljor Stadium Road (737101). Call or WhatsApp +91 70018 46727 for instant tour quotes, permit queries, and road updates.',
  h1: 'Contact Sikkim Tour Co. – Gangtok Mountain Concierge',
  subtitle: 'Paljor Stadium Road, Gangtok, Sikkim (737101) · Direct Line: +91 70018 46727',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Contact Sikkim Tour Co. – Gangtok Mountain Concierge</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Reach our local operations desk directly. We handle travel permits, road updates, hotel reservations, and dedicated private mountain fleets across North, East, West, and South Sikkim.</p>
      <div style="background:#f8f9fa;padding:24px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:30px;">
        <p><strong>Registered Office:</strong> Paljor Stadium Road, Gangtok, Sikkim 737101, India</p>
        <p><strong>Primary WhatsApp & Phone:</strong> <a href="https://wa.me/917001846727" style="color:#103D35;font-weight:700;">+91 70018 46727</a></p>
        <p><strong>Email:</strong> <a href="mailto:info@sikkimtourco.com" style="color:#103D35;font-weight:700;">info@sikkimtourco.com</a></p>
        <p><strong>Operational Hours:</strong> 08:00 AM – 09:00 PM (Daily, Indian Standard Time)</p>
      </div>
      <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20an%20enquiry." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Chat with Gangtok Desk on WhatsApp</a>
    </div>
  `
});

// 12. Blog & Guides Index (/blog & /travel-guides)
const blogContent = `
  <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
    <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Travel Guides, Itineraries & Local Insights (2026)</h1>
    <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">In-depth travel guides authored by our Gangtok mountain operations team. Discover the best time to visit Sikkim, permit requirements, high-altitude advice, and hidden Himalayan trails.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
      ${travelGuidesData.map(g => `
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;padding:20px;">
          <span style="font-size:11px;color:#EBA94B;font-weight:700;text-transform:uppercase;">${g.category} · ${g.readTimeMinutes} Min Read</span>
          <h2 style="font-size:18px;font-weight:700;color:#103D35;margin:8px 0;"><a href="/travel-guides/${g.slug}" style="color:#103D35;text-decoration:none;">${g.title}</a></h2>
          <p style="font-size:13px;color:#475569;line-height:1.5;">${g.excerpt}</p>
        </div>
      `).join('')}
    </div>
  </div>
`;
routesToPrerender.push({
  path: '/blog',
  title: 'Sikkim Travel Blog & Itinerary Guides (2026) | Sikkim Tour Co.',
  description: 'Authoritative Sikkim travel guides on Nathu La permits, Gurudongmar Lake travel, Silk Route homestays, and season-by-season Himalayan weather.',
  h1: 'Sikkim Travel Guides, Itineraries & Local Insights (2026)',
  subtitle: 'In-depth travel guides authored by our Gangtok mountain operations team.',
  contentHtml: blogContent,
});
routesToPrerender.push({
  path: '/travel-guides',
  title: 'Sikkim Travel Blog & Itinerary Guides (2026) | Sikkim Tour Co.',
  description: 'Authoritative Sikkim travel guides on Nathu La permits, Gurudongmar Lake travel, Silk Route homestays, and season-by-season Himalayan weather.',
  h1: 'Sikkim Travel Guides, Itineraries & Local Insights (2026)',
  subtitle: 'In-depth travel guides authored by our Gangtok mountain operations team.',
  contentHtml: blogContent,
});

// 13. All 40 Tour Package Individual Landing Pages
for (const pkg of tourPackagesData) {
  const priceDisplay = pkg.startingPriceInr ? `₹${pkg.startingPriceInr.toLocaleString('en-IN')}` : '₹18,000';
  routesToPrerender.push({
    path: `/packages/${pkg.slug}`,
    title: pkg.seo?.title || `${pkg.name} | Sikkim Tour Co. (${pkg.duration})`,
    description: pkg.seo?.metaDescription || `${pkg.tagline} Verified itinerary covering ${pkg.destinationsCovered.join(', ')}. Includes dedicated 4x4 transport, permits and handpicked stays from ${priceDisplay}.`,
    h1: pkg.seo?.h1 || pkg.name,
    subtitle: pkg.tagline,
    badge: `${pkg.region} · ${pkg.duration}`,
    heroImage: pkg.heroImage,
    contentHtml: `
      <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
        <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">${pkg.region} · ${pkg.duration} · From ${priceDisplay}/person</span>
        <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${pkg.name}</h1>
        <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${pkg.overview}</p>
        <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=${encodeURIComponent(`Hi Sikkim Tour Co., I am interested in booking the "${pkg.name}" (${pkg.duration}).`)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
          <a href="/customise-trip?dest=${encodeURIComponent(pkg.destinationsCovered[0] || 'Sikkim')}" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        </div>
        <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Destinations Covered</h2>
        <p style="font-size:15px;line-height:1.6;color:#475569;margin-bottom:24px;">${pkg.destinationsCovered.join(' · ')}</p>
        <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Inclusions</h2>
        <ul style="line-height:1.8;color:#475569;margin-bottom:30px;">
          ${(pkg.inclusions || []).map(inc => `<li>${inc}</li>`).join('')}
        </ul>
      </div>
    `
  });
}

// 14. All 44 Destinations Individual Landing Pages
for (const dest of destinationsData) {
  routesToPrerender.push({
    path: `/destinations/${dest.id}`,
    title: `${dest.name} Tour & Travel Guide 2026 | ${dest.district} | Sikkim Tour Co.`,
    description: `Complete travel guide for ${dest.name} in ${dest.district}, Sikkim (${dest.elevation}). Discover top spots, best time to visit, road conditions, and curated tour packages.`,
    h1: `${dest.name} Travel Guide & Tour Packages`,
    subtitle: `${dest.district} · Elevation: ${dest.elevation} · Best Season: ${dest.bestSeason}`,
    contentHtml: `
      <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
        <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">${dest.district} · ${dest.elevation}</span>
        <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${dest.name} Travel Guide</h1>
        <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${dest.description}</p>
        <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=${encodeURIComponent(`Hi Sikkim Tour Co., I want to visit ${dest.name}.`)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
          <a href="/customise-trip?dest=${encodeURIComponent(dest.name)}" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        </div>
      </div>
    `
  });
}

// 15. All 29 Editorial Travel Guides Individual Landing Pages
for (const guide of travelGuidesData) {
  routesToPrerender.push({
    path: `/travel-guides/${guide.slug}`,
    title: `${guide.title} | Sikkim Tour Co.`,
    description: guide.metaDescription || guide.excerpt,
    h1: guide.title,
    subtitle: `${guide.category} · ${guide.readTimeMinutes} Min Read · Updated ${guide.publishedDate}`,
    contentHtml: `
      <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
        <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">${guide.category} · ${guide.readTimeMinutes} Min Read</span>
        <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${guide.title}</h1>
        <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${guide.excerpt}</p>
        <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=${encodeURIComponent(`Hi Sikkim Tour Co., I read your guide "${guide.title}" and would like to plan a trip.`)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Chat on WhatsApp (+91 70018 46727)</a>
          <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        </div>
      </div>
    `
  });
}

// EXECUTE PRERENDERING
console.log(`Starting static HTML generation for ${routesToPrerender.length} routes...`);

let successCount = 0;

for (const route of routesToPrerender) {
  // Clean relative path without leading slash
  const relativePath = route.path.replace(/^\/+/, '');
  const targetDir = path.join(distDir, relativePath);
  const targetFile = path.join(targetDir, 'index.html');

  fs.mkdirSync(targetDir, { recursive: true });

  const canonicalUrl = `https://sikkimtourco.com${route.path}`;

  // Replace title, description, canonical, and OG/Twitter tags
  let html = templateHtml
    .replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`);

  // Inject crawlable prerendered content into <div id="root">
  // Client hydration will safely mount React onto this element
  html = html.replace(
    /<div id="root">[\s\S]*?<\/body>/i,
    `<div id="root">\n${route.contentHtml}\n    </div>\n  </body>`
  );

  fs.writeFileSync(targetFile, html, 'utf8');
  successCount++;
}

console.log(`Successfully prerendered ${successCount} static HTML routes into dist/!`);
