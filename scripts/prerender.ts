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
import { accommodationsData } from '../src/data/accommodations';
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
  subtitle?: string;
  badge?: string;
  heroImage?: string;
  contentHtml: string;
  noIndex?: boolean;
}

const routesToPrerender: RouteMeta[] = [];

// ============================================================================
// 1. PRIMARY KEYWORD: Sikkim Tour Packages (/sikkim-tour-packages)
// ============================================================================
routesToPrerender.push({
  path: '/sikkim-tour-packages',
  title: 'Sikkim Tour Packages 2026 | Handcrafted Himalayan Circuits',
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

// ============================================================================
// 2. CORE PACKAGES DIRECTORY (/packages)
// ============================================================================
routesToPrerender.push({
  path: '/packages',
  title: 'Sikkim Tour Packages 2026 | 40 Curated Himalayan Packages',
  description: 'Browse 40 curated Sikkim tour packages across North, East, West & South Sikkim from ₹18,000. Private 4x4 Innova cabs, Army permits, and direct WhatsApp booking.',
  h1: 'Himalayan Tour Packages & Expeditions (40 Curated Packages)',
  subtitle: 'Browse all 40 official Sikkim tour packages categorized across North, East, West, and South Sikkim.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Himalayan Tour Packages & Expeditions (40 Curated Packages)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Browse all 40 official Sikkim tour packages categorized across North, East, West, and South Sikkim. Filter by district or travel style to find your ideal Himalayan journey.</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20inquire%20about%20your%20packages." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Chat on WhatsApp (+91 70018 46727)</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        ${tourPackagesData.slice(0, 12).map(pkg => `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
            <span style="font-size:11px;color:#EBA94B;font-weight:700;text-transform:uppercase;">${pkg.region} · ${pkg.duration}</span>
            <h2 style="font-size:18px;font-weight:700;color:#103D35;margin:8px 0;"><a href="/packages/${pkg.slug}" style="color:#103D35;text-decoration:none;">${pkg.name}</a></h2>
            <p style="font-size:13px;color:#475569;line-height:1.5;">${pkg.overview}</p>
            <p style="font-size:14px;font-weight:700;color:#103D35;margin-top:12px;">From ₹${(pkg.startingPriceInr || 18000).toLocaleString('en-IN')} / person</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

// ============================================================================
// 3. CUSTOMISE TRIP & ENQUIRY (/customise-trip)
// ============================================================================
routesToPrerender.push({
  path: '/customise-trip',
  title: 'Customise Your Sikkim Trip | Handcrafted Himalayan Tours',
  description: 'Tailor your private Sikkim tour package with local Gangtok travel planners. Choose travel dates, group size, hotels, and 4x4 vehicles for a customized itinerary.',
  h1: 'Customise Your Himalayan Trip with Local Planners',
  subtitle: 'Tell us your travel dates, group size, and interests. Our Gangtok planners will prepare a realistic, day-by-day itinerary with verified hotels and private transport.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Customise Your Himalayan Trip with Local Planners</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Tell our local mountain travel specialists your preferred travel window, group size, and interests. We will craft an exclusive private route across North, East, West, or South Sikkim with dedicated chauffeurs and permits.</p>
      <div style="background:#f8f9fa;padding:24px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:30px;">
        <h2 style="font-size:20px;color:#103D35;margin-top:0;">Frictionless Planning with Gangtok Desk</h2>
        <p style="font-size:14px;color:#555;">No account creation or advance credit card required. We verify your dates, check Army checkpost feasibility for Nathu La or Gurudongmar Lake, and send an official itinerary with itemized pricing.</p>
        <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20customize%20a%20private%20trip." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Connect on WhatsApp (+91 70018 46727)</a>
          <a href="tel:+917001846727" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Call Desk</a>
        </div>
      </div>
    </div>
  `
});

// ============================================================================
// 4. GANGTOK TOUR PACKAGES (/gangtok-tour-packages)
// ============================================================================
const gangtokData = DESTINATION_LANDING_DATA['gangtok'];
routesToPrerender.push({
  path: '/gangtok-tour-packages',
  title: 'Gangtok Tour Packages 2026 | Tsomgo Lake & Nathu La Pass',
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

// ============================================================================
// 5. NORTH SIKKIM TOUR PACKAGES (/north-sikkim-tour-packages)
// ============================================================================
const northData = DESTINATION_LANDING_DATA['north_sikkim'];
routesToPrerender.push({
  path: '/north-sikkim-tour-packages',
  title: 'North Sikkim Tour Packages 2026 | Gurudongmar & Yumthang',
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

// ============================================================================
// 5B. LACHUNG TOUR PACKAGES (/lachung-tour-packages)
// ============================================================================
const lachungData = DESTINATION_LANDING_DATA['lachung'];
if (lachungData) {
  routesToPrerender.push({
    path: '/lachung-tour-packages',
    title: 'Lachung Tour Packages 2026 | Yumthang Valley & Zero Point',
    description: 'Handcrafted Lachung tour packages to Yumthang Valley of Flowers, Zero Point (15,300 ft), and Mount Katao with dedicated 4x4 vehicles, permits & verified stays.',
    h1: 'Lachung Tour Packages: Yumthang Valley, Zero Point & Hot Springs',
    subtitle: 'Explore the Shingba Rhododendron Sanctuary at Yumthang (11,800 ft), touch snow at Zero Point (15,300 ft), and experience authentic mountain hospitality with dedicated 4x4 transport.',
    badge: 'Lachung & Yumthang Valley Specialist',
    contentHtml: `
      <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
        <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">Valley of Flowers & Snow Frontiers · 15,300 ft</span>
        <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${lachungData.title}</h1>
        <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${lachungData.overview.join(' ')}</p>
        <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=${encodeURIComponent(lachungData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
          <a href="/customise-trip?dest=Lachung" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        </div>
        <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Attractions in Lachung & Yumthang</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
          ${lachungData.attractions.map(a => `
            <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
              <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name} ${a.altitude ? `<span style="font-size:12px;color:#64748b;">(${a.altitude})</span>` : ''}</h3>
              <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
            </div>
          `).join('')}
        </div>
        <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Lachung Tours</h2>
        <div style="line-height:1.6;color:#333;">
          ${lachungData.faqs.map(f => `
            <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
          `).join('')}
        </div>
      </div>
    `
  });
}

// ============================================================================
// 5C. LACHEN TOUR PACKAGES (/lachen-tour-packages)
// ============================================================================
const lachenData = DESTINATION_LANDING_DATA['lachen'];
if (lachenData) {
  routesToPrerender.push({
    path: '/lachen-tour-packages',
    title: 'Lachen Tour Packages 2026 | Gurudongmar Lake & Chopta Valley',
    description: 'Ascend to sacred Gurudongmar Lake (17,800 ft) from Lachen. Complete Army permit clearances, 4x4 mountain vehicles, and verified Lachen lodge stays from ₹24,500.',
    h1: 'Lachen Tour Packages: Gurudongmar Lake, Chopta Valley & High Passes',
    subtitle: 'Ascend to sacred Gurudongmar Lake (17,800 ft) through alpine pine valleys, Chopta river basin, and cold-desert frontiers with verified 4x4 vehicles and military permit liaison.',
    badge: 'Lachen & Gurudongmar 17,800 ft Specialist',
    contentHtml: `
      <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
        <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">17,800 ft Glacial Frontier · Gurudongmar Lake</span>
        <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${lachenData.title}</h1>
        <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${lachenData.overview.join(' ')}</p>
        <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=${encodeURIComponent(lachenData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
          <a href="/customise-trip?dest=Lachen" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        </div>
        <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Key Attractions in Lachen & High Valleys</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:30px;">
          ${lachenData.attractions.map(a => `
            <div style="background:#f8f9fa;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">
              <h3 style="margin:0 0 6px;color:#103D35;font-size:16px;">${a.name} ${a.altitude ? `<span style="font-size:12px;color:#64748b;">(${a.altitude})</span>` : ''}</h3>
              <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${a.description}</p>
            </div>
          `).join('')}
        </div>
        <h2 style="font-size:24px;font-weight:700;color:#103D35;margin-bottom:16px;">Frequently Asked Questions: Lachen Tours</h2>
        <div style="line-height:1.6;color:#333;">
          ${lachenData.faqs.map(f => `
            <p><strong>Q: ${f.question}</strong><br/>A: ${f.answer}</p>
          `).join('')}
        </div>
      </div>
    `
  });
}

// ============================================================================
// 6. PELLING TOUR PACKAGES (/pelling-tour-packages)
// ============================================================================
const pellingData = DESTINATION_LANDING_DATA['pelling'];
routesToPrerender.push({
  path: '/pelling-tour-packages',
  title: 'Pelling Tour Packages 2026 | Glass Skywalk & Kanchenjunga',
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

// ============================================================================
// 7. HONEYMOON PACKAGES (/sikkim-honeymoon-packages)
// ============================================================================
const honeymoonData = DESTINATION_LANDING_DATA['honeymoon'];
routesToPrerender.push({
  path: '/sikkim-honeymoon-packages',
  title: 'Sikkim Honeymoon Packages 2026 | Romantic Mountain Stays',
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

// ============================================================================
// 8. FAMILY PACKAGES (/sikkim-family-tour-packages)
// ============================================================================
const familyData = DESTINATION_LANDING_DATA['family'];
routesToPrerender.push({
  path: '/sikkim-family-tour-packages',
  title: 'Sikkim Family Tour Packages 2026 | Relaxed Private Innova',
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

// ============================================================================
// 9. GROUP TOUR PACKAGES (/sikkim-group-tour-packages)
// ============================================================================
const groupData = DESTINATION_LANDING_DATA['group'];
routesToPrerender.push({
  path: '/sikkim-group-tour-packages',
  title: 'Sikkim Group Tour Packages 2026 | Corporate & Group Tours',
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

// ============================================================================
// 10. SILK ROUTE TOUR PACKAGES (/sikkim-silk-route-tour-packages & /silk-route-tour-packages)
// ============================================================================
const silkData = DESTINATION_LANDING_DATA['silk_route'];
routesToPrerender.push({
  path: '/sikkim-silk-route-tour-packages',
  title: 'Sikkim Silk Route Tour Packages 2026 | Zuluk & Kupup Lake',
  description: 'Traverse the legendary Old Silk Route in East Sikkim through Rongli, Zuluk, Thambi Viewpoint, Kupup Lake, and Baba Mandir with dedicated 4x4 vehicles.',
  h1: 'Sikkim Silk Route Tour Packages: 32 Hairpins & High Passes',
  subtitle: 'Traverse the historic Himalayan Silk Route across Zuluk, Lungthung sunrise point, Thambi view, Kupup Elephant Lake, and Baba Mandir.',
  badge: 'Old Silk Route Zuluk Circuit',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
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
    </div>
  `
});

routesToPrerender.push({
  path: '/silk-route-tour-packages',
  title: 'Old Silk Route Zuluk Tour Packages: High Mountain Passes & Homestays',
  description: 'Experience authentic Old Silk Route homestays in Zuluk, Gnathang Valley, and Lungthung. Includes Rongli SDM permits, sunrise over Kanchenjunga, and private mountain transport.',
  h1: 'Old Silk Route Zuluk Tour Packages: High Mountain Passes & Homestays',
  subtitle: 'Experience authentic Old Silk Route homestays in Zuluk, Gnathang Valley, and Lungthung with local mountain hosts.',
  badge: 'Silk Route Homestays & Expeditions',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Old Silk Route Zuluk Tour Packages: High Mountain Passes & Homestays</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Experience authentic Old Silk Route homestays in Zuluk, Gnathang Valley, and Lungthung. Includes Rongli SDM permits, sunrise over Kanchenjunga, and private mountain transport.</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=${encodeURIComponent(silkData.whatsappMessage)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?dest=Silk+Route" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
    </div>
  `
});

// ============================================================================
// 11. KOLKATA PACKAGES (/sikkim-tour-packages-from-kolkata & /sikkim-packages-from-kolkata)
// ============================================================================
routesToPrerender.push({
  path: '/sikkim-tour-packages-from-kolkata',
  title: 'Sikkim Tour Packages from Kolkata 2026 | Trains & Flights',
  description: 'Curated Sikkim tour packages for Kolkata travellers. Coordinated with Darjeeling Mail, Padatik Express, Vande Bharat and direct CCU flights. Direct NJP platform pickup & Bengali meals.',
  h1: 'Sikkim Tour Packages from Kolkata (2026) | Direct NJP Express Trains & Flights',
  subtitle: 'Curated Sikkim holiday packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains to NJP and direct CCU flights to Bagdogra.',
  badge: 'Kolkata to Sikkim Gateway | Direct NJP Trains & CCU Flights',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Packages from Kolkata (2026) | Direct NJP Express Trains & Flights</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Curated Sikkim holiday packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains (Darjeeling Mail, Padatik Express, Vande Bharat, Saraighat, Kanchan Kanya) arriving at NJP and daily direct flights from Netaji Subhash Chandra Bose Airport (CCU) to Bagdogra (IXB). Dedicated 4x4 Innova cabs waiting on arrival, verified Bengali meal options, and 100% Indian Army permit clearance for Nathu La Pass and North Sikkim.</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20am%20planning%20a%20Sikkim%20tour%20from%20Kolkata." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?dest=Kolkata" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-packages-from-kolkata',
  title: 'Kolkata to Sikkim Holiday Packages: Rail, Flights & Mountain Cabs',
  description: 'Book customized Kolkata to Sikkim holiday packages. Platform 1 NJP station pickups, Bagdogra airport transfers, hotel accommodations, and Nathu La military permits.',
  h1: 'Kolkata to Sikkim Holiday Packages: Rail, Flights & Mountain Cabs',
  subtitle: 'Convenient rail and flight transfers from Kolkata to Gangtok, Pelling, and North Sikkim.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Kolkata to Sikkim Holiday Packages: Rail, Flights & Mountain Cabs</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Book customized Kolkata to Sikkim holiday packages. Platform 1 NJP station pickups, Bagdogra airport transfers, hotel accommodations, and Nathu La military permits.</p>
      <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
        <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20am%20planning%20a%20Sikkim%20holiday%20from%20Kolkata." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Book on WhatsApp (+91 70018 46727)</a>
        <a href="/customise-trip?dest=Kolkata" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
      </div>
    </div>
  `
});

// ============================================================================
// 12. GATEWAY & REGIONAL PACKAGES
// ============================================================================
routesToPrerender.push({
  path: '/sikkim-packages-from-kalyani',
  title: 'Sikkim Tour Packages from Kalyani & Nadia (2026) | NJP Train Pickup',
  description: 'Dedicated Sikkim packages for Kalyani, Naihati and Nadia travelers. Coordinated with North Bengal express trains to NJP, direct private Innova pickup & Bengali meals.',
  h1: 'Sikkim Tour Packages from Kalyani & Nadia (2026) | Direct NJP Pickup',
  subtitle: 'Specialized Sikkim travel packages for travelers from Kalyani, Kanchrapara, Naihati, and Sealdah Main Line.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Packages from Kalyani & Nadia (2026) | Direct NJP Pickup</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Specialized Sikkim travel packages for travelers from Kalyani, Kanchrapara, Naihati, and Sealdah Main Line. Coordinated with North Bengal express trains passing or boarding near Kalyani to NJP, direct private Innova Crysta / 4x4 Scorpio pickup right at NJP station platform, verified Bengali meals, and North Sikkim checkpost permits.</p>
      <a href="/customise-trip?dest=Kalyani" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-packages-from-njp',
  title: 'Sikkim Tour Packages from NJP Railway Station | Platform 1 Pickup',
  description: 'Direct platform-side pickup at NJP Station portico. Dedicated Toyota Innova Crystas waiting on arrival with live train tracking and mountain chauffeurs.',
  h1: 'Sikkim Tour Packages from NJP (New Jalpaiguri Railway Station)',
  subtitle: 'Direct platform-side pickup at NJP Station portico with private mountain fleet.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Packages from NJP (New Jalpaiguri Railway Station)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Direct platform-side pickup at NJP Station portico. Dedicated Toyota Innova Crystas and 4x4 Scorpios waiting on arrival with live train tracking, verified mountain chauffeurs, zero broker touts, and seamless mountain transit to Gangtok & Pelling.</p>
      <a href="/customise-trip?dest=NJP" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-packages-from-bagdogra-njp',
  title: 'Sikkim Packages from Bagdogra Airport & NJP | Terminal Transfers',
  description: 'Door-to-door Sikkim holiday packages from Bagdogra Airport (IXB) and NJP Station. Dedicated private mountain fleet, Gangtok and Pelling transfers, and permits.',
  h1: 'Sikkim Packages from Bagdogra Airport (IXB) & NJP Station',
  subtitle: 'Direct airport terminal curb and train platform pickups for hassle-free mountain transfers.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Packages from Bagdogra Airport (IXB) & NJP Station</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Direct terminal curb pickup at Bagdogra International Airport (IXB) and NJP Station. Dedicated private Innova Crystas waiting on arrival for scenic transfers to Gangtok, Pelling, and North Sikkim without Siliguri traffic delays.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-packages-from-delhi',
  title: 'Sikkim Tour Packages from Delhi | Direct Flights & Private 4x4 Tours',
  description: 'Curated Sikkim holiday packages from Delhi NCR with IGI Airport flight coordination, dedicated Innova Crysta mountain fleets, North Sikkim permits, and resort stays.',
  h1: 'Sikkim Tour Packages from Delhi | Flight-Inclusive Himalayan Holidays',
  subtitle: 'Curated Sikkim holiday packages from Delhi NCR with IGI Airport flight coordination.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Packages from Delhi | Flight-Inclusive Himalayan Holidays</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Curated Sikkim holiday packages from Delhi NCR with IGI Airport flight coordination, dedicated Innova Crysta mountain fleets, North Sikkim permits, and luxury heritage resort stays.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/gurudongmar-lake-tour',
  title: 'Gurudongmar Lake Tour Packages (17,800 ft) | High Altitude Expeditions',
  description: 'Ascend to sacred Gurudongmar Lake with acclimitized Lachen night halts, verified 4x4 Mahindra Scorpio/Innova Crysta, and complete Indian Army checkpost permits.',
  h1: 'Gurudongmar Lake Tour Packages (17,800 ft) | Alpine Expeditions',
  subtitle: 'Sacred azure waters at 17,800 ft with experienced high-altitude chauffeurs and permit liaison.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Gurudongmar Lake Tour Packages (17,800 ft) | Alpine Expeditions</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Ascend to sacred Gurudongmar Lake with acclimitized Lachen night halts, verified 4x4 Mahindra Scorpio/Innova Crysta, and complete Indian Army checkpost permit paperwork handling.</p>
      <a href="/customise-trip?dest=Gurudongmar" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/nathula-pass-tour',
  title: 'Nathu La Pass & Tsomgo Lake Tour Packages | Army Permit Desk',
  description: 'Experience the historic Indo-China Silk Route border at 14,140 ft, sacred Tsomgo Lake, and Baba Mandir with military permit paperwork processing.',
  h1: 'Nathu La Pass & Tsomgo Lake Tour Packages | Indo-China Border',
  subtitle: 'Wednesday–Sunday border pass tours with dedicated Army checkpost clearance.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Nathu La Pass & Tsomgo Lake Tour Packages | Indo-China Border</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Experience the historic Indo-China Silk Route border at 14,140 ft, sacred Tsomgo (Changu) Lake, and Baba Harbhajan Mandir with Wednesday–Sunday military permit paperwork processing.</p>
      <a href="/customise-trip?dest=Nathula" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-darjeeling-tour-packages',
  title: 'Sikkim & Darjeeling Tour Packages: Himalayan Tea & Mountain Vistas',
  description: 'Integrated 6 to 10-day holiday packages combining Tiger Hill sunrise, UNESCO Darjeeling Himalayan Railway, Gangtok alpine lakes, and Pelling Kanchenjunga views.',
  h1: 'Sikkim & Darjeeling Tour Packages: Tea Gardens & High Passes',
  subtitle: 'The ultimate Eastern Himalayan combination covering heritage tea gardens and alpine summits.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim & Darjeeling Tour Packages: Tea Gardens & High Passes</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Integrated 6 to 10-day holiday packages combining Tiger Hill sunrise, UNESCO Darjeeling Himalayan Railway, Gangtok alpine lakes, and Pelling Kanchenjunga views.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/north-india-tour-packages',
  title: 'North India & Eastern Himalayan Expedition Circuits (2026)',
  description: 'Connect arrival hubs in Delhi, Kolkata, Bagdogra, and NJP with sacred alpine lakes in North Sikkim, organic Temi tea gardens, and Kanchenjunga passes.',
  h1: 'North India & Eastern Himalayan Expedition Circuits (2026)',
  subtitle: 'Grand Himalayan discovery linking North India gateways to the heights of Sikkim.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">North India & Eastern Himalayan Expedition Circuits (2026)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Connect major Indian transit hubs (Delhi, Kolkata, Bagdogra) to the high-altitude wonders of North Sikkim (Gurudongmar Lake, Yumthang), organic Temi tea gardens, and sacred Kanchenjunga passes.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-tour',
  title: 'Sikkim Tour: Handcrafted 4-District Himalayan Expeditions (2026)',
  description: 'Plan your dream Sikkim tour with Gangtok top local operator. Custom circuits covering North, East, West & South Sikkim from ₹18,000. 4x4 cabs & Army permits.',
  h1: 'Sikkim Tour – Comprehensive Himalayan Traverses',
  subtitle: 'Bespoke mountain itineraries across Gangtok, Lachen, Lachung, Pelling, and Zuluk.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour – Comprehensive Himalayan Traverses</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Plan your complete Sikkim tour with Sikkim Tour Company. Dedicated 4x4 mountain vehicles, complete Indian Army permit paperwork clearances, and handpicked heritage stays across all 4 districts.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Get a Free Tour Quote</a>
    </div>
  `
});

// ============================================================================
// 13. ABOUT & CONTACT DESK
// ============================================================================
routesToPrerender.push({
  path: '/about-us',
  title: 'About Sikkim Tour Co. | Gangtok Local Operator & Fleet',
  description: 'Learn about Sikkim Tour Co., Gangtok top-rated local tour operator on Paljor Stadium Road. Private 4x4 mountain vehicles, 100% Army permit clearance, and verified reviews.',
  h1: 'About Sikkim Tour Co. – Official Gangtok Travel Operator',
  subtitle: 'Direct local Himalayan operator headquartered on Paljor Stadium Road, Gangtok (737101).',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">About Sikkim Tour Co. – Official Gangtok Travel Operator</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Sikkim Tour Co. is an established, registered Himalayan tour operator headquartered on Paljor Stadium Road in Gangtok (PIN 737101), Sikkim. Founded on the principle of authentic local stewardship, we provide direct on-the-ground travel planning, dedicated 4x4 mountain fleets, Indian Army permit clearance, and handpicked heritage accommodations across all four districts of Sikkim.</p>
      <a href="/contact-us" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Contact Gangtok Desk</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/sikkim-tour-company',
  title: 'Sikkim Tour Company: Gangtok Ground Operations & Mountain Fleet',
  description: 'Official credentials, local mountain drivers, commercial 4x4 fleet, and Paljor Stadium Road headquarters of Sikkim Tour Company in Gangtok (737101).',
  h1: 'Sikkim Tour Company – Ground Operations & Local Mountain Fleet',
  subtitle: 'Local Himalayan outfitter registered in Gangtok, Sikkim.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Tour Company – Ground Operations & Local Mountain Fleet</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Unlike online booking aggregators and distant travel brokers, Sikkim Tour Company operates on-the-ground with its own dedicated 4x4 mountain fleet (Toyota Innova Crysta, Mahindra Scorpio 4WD), local mountain-certified chauffeurs, and in-house Indian Army permit paperwork clearance.</p>
      <a href="/about-us" style="color:#103D35;text-decoration:underline;font-weight:700;">Read About Us</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/contact-us',
  title: 'Contact Sikkim Tour Co. | Gangtok Travel Desk & Support',
  description: 'Contact Sikkim Tour Co. at our Gangtok desk on Paljor Stadium Road (737101). Call or WhatsApp +91 70018 46727 for instant tour quotes, permit queries, and road updates.',
  h1: 'Contact Sikkim Tour Co. – Gangtok Mountain Concierge',
  subtitle: 'Paljor Stadium Road, Gangtok, Sikkim (737101) · Direct Line: +91 70018 46727',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Contact Sikkim Tour Co. – Gangtok Mountain Concierge</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Reach our local operations desk directly. We handle travel permits, road updates, hotel reservations, and dedicated private mountain fleets across North, East, West, and South Sikkim.</p>
      <div style="background:#f8f9fa;padding:24px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:30px;">
        <p><strong>Registered Office:</strong> Paljor Stadium Road, Gangtok, Sikkim 737101, India</p>
        <p><strong>Primary WhatsApp & Phone:</strong> +91 70018 46727</p>
        <p><strong>Email:</strong> info@sikkimtourco.com</p>
      </div>
      <a href="https://wa.me/917001846727" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Chat on WhatsApp</a>
    </div>
  `
});

// ============================================================================
// 14. BLOG & GUIDES
// ============================================================================
routesToPrerender.push({
  path: '/blog',
  title: 'Sikkim Travel Blog: Himalayan Stories & Local Guides (2026)',
  description: 'Explore the official Sikkim travel blog by local Gangtok mountaineers. Features seasonal weather updates, cultural essays, packing guides, and offbeat village trails.',
  h1: 'Sikkim Travel Blog: Himalayan Stories & Local Guides (2026)',
  subtitle: 'Authentic local stories and mountain travel perspectives from Gangtok.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Travel Blog: Himalayan Stories & Local Guides (2026)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Explore the official Sikkim travel blog by local Gangtok mountaineers. Features seasonal weather updates, cultural essays, packing guides, and offbeat village trails.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        ${travelGuidesData.slice(0, 6).map(g => `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
            <h2 style="font-size:18px;font-weight:700;color:#103D35;margin:8px 0;"><a href="/travel-guides/${g.slug}" style="color:#103D35;text-decoration:none;">${g.title}</a></h2>
            <p style="font-size:13px;color:#475569;line-height:1.5;">${g.excerpt}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

routesToPrerender.push({
  path: '/travel-guides',
  title: 'Sikkim Travel Guides & Route Planning Desk (2026) | Sikkim Tour Co.',
  description: 'Comprehensive travel guides for Sikkim: Army permit rules, Gurudongmar high altitude safety, Silk Route itinerary planning, and Kolkata train connections.',
  h1: 'Sikkim Travel Guides, Itineraries & Local Insights (2026)',
  subtitle: 'In-depth travel guides authored by our Gangtok mountain operations team.',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Travel Guides, Itineraries & Local Insights (2026)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">In-depth travel guides authored by our Gangtok mountain operations team. Discover the best time to visit Sikkim, permit requirements, high-altitude advice, and hidden Himalayan trails.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;">
        ${travelGuidesData.map(g => `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;">
            <span style="font-size:11px;color:#EBA94B;font-weight:700;text-transform:uppercase;">${g.category} · ${g.readTimeMinutes} Min Read</span>
            <h2 style="font-size:18px;font-weight:700;color:#103D35;margin:8px 0;"><a href="/travel-guides/${g.slug}" style="color:#103D35;text-decoration:none;">${g.title}</a></h2>
            <p style="font-size:13px;color:#475569;line-height:1.5;">${g.excerpt}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

// ============================================================================
// 15. DIRECTORIES: Destinations, Stays, Experiences, Reviews, FAQs, Disclosures
// ============================================================================
routesToPrerender.push({
  path: '/destinations',
  title: 'Sikkim Destinations & Tourist Spots (2026) | Complete Travel Directory',
  description: 'Explore 44 verified tourist destinations across North, East, West & South Sikkim. Detailed elevations, permit requirements, road advisories, and local photography.',
  h1: 'Sikkim Destinations & Himalayan Circuits (44 Curated Spots)',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Destinations & Himalayan Circuits (44 Curated Spots)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Discover verified tourist spots across East Sikkim, North Sikkim, West Sikkim, and South Sikkim.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
        ${destinationsData.map(d => `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
            <span style="font-size:11px;color:#EBA94B;font-weight:700;">${d.district} · ${d.elevation}</span>
            <h2 style="font-size:16px;font-weight:700;color:#103D35;margin:6px 0;"><a href="/destinations/${d.id}" style="color:#103D35;text-decoration:none;">${d.name}</a></h2>
            <p style="font-size:13px;color:#64748b;line-height:1.4;">${d.tagline}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

routesToPrerender.push({
  path: '/stays',
  title: 'Sikkim Accommodations: Handpicked Mountain Resorts & Homestays',
  description: 'Audited boutique hotels, luxury mountain resorts, and authentic homestays across Gangtok, Pelling, Lachung, and Ravangla with verified hospitality standards.',
  h1: 'Handpicked Stays & Heritage Resorts in Sikkim',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Handpicked Stays & Heritage Resorts in Sikkim</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Audited boutique hotels, luxury mountain resorts, and authentic homestays across Gangtok, Pelling, Lachung, and Ravangla.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
        ${accommodationsData.map(s => `
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
            <span style="font-size:11px;color:#EBA94B;font-weight:700;">${s.tier}</span>
            <h2 style="font-size:16px;font-weight:700;color:#103D35;margin:6px 0;">${s.name}</h2>
            <p style="font-size:13px;color:#64748b;line-height:1.4;">${s.tagline}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `
});

routesToPrerender.push({
  path: '/experiences',
  title: 'Authentic Sikkim Experiences: Monasteries, High Passes & Culture',
  description: 'Curated Himalayan experiences: sunrise over Mount Kanchenjunga, high-altitude passes, ancient Buddhist rituals, organic tea tasting, and alpine lake excursions.',
  h1: 'Authentic Himalayan Experiences & Cultural Journeys',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Authentic Himalayan Experiences & Cultural Journeys</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">From high mountain passes on the Indo-China frontier to 300-year-old Nyingma monasteries, experience the sacred heart of Sikkim.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Plan Your Journey</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/reviews',
  title: 'Sikkim Tour Co. Reviews | 118+ Verified Traveler Testimonials',
  description: 'Read verified reviews from domestic and international travelers who explored Sikkim with Sikkim Tour Co. Rated 4.9/5 for private 4x4 vehicles and permit service.',
  h1: 'Verified Traveler Reviews & Himalayan Stories (4.9★)',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Verified Traveler Reviews & Himalayan Stories (4.9★)</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Real feedback from families, couples, and group travelers across India and abroad who completed journeys with our Gangtok operations desk.</p>
      <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Plan Your Trip</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/faqs',
  title: 'Sikkim Travel FAQs 2026: Permits, Seasons, Weather & Pacing',
  description: 'Official answers to essential Sikkim travel questions: Nathu La and North Sikkim Army permits, high altitude precautions, best seasons, road conditions, and packing.',
  h1: 'Frequently Asked Questions – Sikkim Travel Knowledge Base',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Frequently Asked Questions – Sikkim Travel Knowledge Base</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Everything you need to know about Indian Army permits, high-altitude acclimatization, seasonal weather, and local road conditions.</p>
      <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20a%20question." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Ask Desk on WhatsApp</a>
    </div>
  `
});

routesToPrerender.push({
  path: '/disclosures',
  title: 'Official Tourism Disclosures, Permits & Advisory | Sikkim Tour Co.',
  description: 'Mandatory travel disclosures, Indian Army Protected Area Permit rules, NH-10 road conditions, high-altitude safety guidelines, and transparent booking policies.',
  h1: 'Official Tourism Disclosures & Practical Mountain Advisories',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Official Tourism Disclosures & Practical Mountain Advisories</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Review our operational advisories regarding border checkposts, seasonal road conditions along the Teesta valley, and medical precautions for high-altitude zones.</p>
    </div>
  `
});

routesToPrerender.push({
  path: '/international-travel',
  title: 'Sikkim Travel for International Visitors | RAP Permits & Guidelines',
  description: 'Complete guide for foreign nationals visiting Sikkim: Restricted Area Permits (RAP), eligible circuits in Gangtok and Pelling, visa requirements, and travel protocols.',
  h1: 'Sikkim Travel Information for International Visitors',
  contentHtml: `
    <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
      <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">Sikkim Travel Information for International Visitors</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">Foreign nationals can visit Gangtok, Pelling, Darjeeling, and Lachung/Yumthang with a Restricted Area Permit (RAP). Note that Gurudongmar Lake and Nathu La Pass remain restricted to Indian nationals.</p>
      <a href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20am%20an%20international%20traveler%20inquiring%20about%20Sikkim%20permits." style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Inquire on WhatsApp</a>
    </div>
  `
});

// ============================================================================
// 16. DEDICATED 404 ERROR PAGE (/404.html)
// ============================================================================
routesToPrerender.push({
  path: '/404.html',
  title: '404: Page Not Found | Sikkim Tour Co.',
  description: 'The requested Himalayan trail or page could not be found. Return to our homepage or explore our verified Sikkim tour packages.',
  h1: '404 - Mountain Trail Not Found',
  noIndex: true,
  contentHtml: `
    <div class="prerendered-content" style="max-width:800px;margin:80px auto;padding:40px 20px;font-family:sans-serif;text-align:center;color:#103D35;">
      <h1 style="font-size:40px;font-weight:800;color:#103D35;margin-bottom:16px;">404 - Mountain Trail Not Found</h1>
      <p style="font-size:16px;line-height:1.6;color:#555;margin-bottom:30px;">The page you are looking for does not exist or may have been moved. Return to our homepage or connect directly with our Gangtok concierge desk.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <a href="/" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Return to Homepage</a>
        <a href="/sikkim-tour-packages" style="background:#EBA94B;color:#103D35;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Explore Tour Packages</a>
      </div>
    </div>
  `
});

// ============================================================================
// 17. ALL 40 TOUR PACKAGES
// ============================================================================
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

// ============================================================================
// 18. ALL 44 DESTINATIONS
// ============================================================================
for (const dest of destinationsData) {
  const cleanName = dest.name.replace(/\s*\([^)]*\)/g, '').trim();
  routesToPrerender.push({
    path: `/destinations/${dest.id}`,
    title: `${cleanName} Travel Guide 2026 | Sikkim Tour Co.`,
    description: `Complete travel guide for ${cleanName} in ${dest.district}, Sikkim (${dest.elevation}). Discover top spots, best time to visit, road conditions, and curated tour packages.`,
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

// ============================================================================
// 19. ALL 29 TRAVEL GUIDES (WITH SERP-OPTIMIZED TITLES)
// ============================================================================
for (const guide of travelGuidesData) {
  // Truncate guide titles to max 48 chars before suffix to keep total SERP title under 68 chars
  const conciseTitle = guide.title.length > 48
    ? `${guide.title.slice(0, 48).trim()}... | Sikkim Tour Co.`
    : `${guide.title} | Sikkim Tour Co.`;

  routesToPrerender.push({
    path: `/travel-guides/${guide.slug}`,
    title: conciseTitle,
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

// ============================================================================
// 20. ALL ACCOMMODATIONS & RESORTS (/stays/:slug)
// ============================================================================
for (const stay of accommodationsData) {
  routesToPrerender.push({
    path: `/stays/${stay.slug}`,
    title: `${stay.name} | Sikkim Tour Co.`,
    description: `${stay.tagline} Located in ${stay.location}, ${stay.district}. ${stay.tier} accommodation with authentic mountain hospitality and clean mountain views.`,
    h1: `${stay.name} – ${stay.location}, Sikkim`,
    subtitle: `${stay.tier} · ${stay.district} · Verified Mountain Stay`,
    contentHtml: `
      <div class="prerendered-content" style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:sans-serif;color:#103D35;">
        <span style="display:inline-block;padding:4px 12px;background:#EBA94B20;color:#0c3127;border:1px solid #EBA94B;border-radius:20px;font-size:12px;font-weight:700;margin-bottom:12px;">${stay.tier} · ${stay.location}</span>
        <h1 style="font-size:36px;font-weight:800;color:#103D35;line-height:1.2;margin-bottom:16px;">${stay.name}</h1>
        <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:24px;">${stay.description}</p>
        <div style="display:flex;gap:12px;margin-bottom:40px;flex-wrap:wrap;">
          <a href="https://wa.me/917001846727?text=${encodeURIComponent(`Hi Sikkim Tour Co., I am interested in booking stay at "${stay.name}".`)}" style="background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Inquire on WhatsApp (+91 70018 46727)</a>
          <a href="/customise-trip" style="background:#103D35;color:#EBA94B;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;">Get a Free Tour Quote</a>
        </div>
      </div>
    `
  });
}

// ============================================================================
// EXECUTE PRERENDERING
// ============================================================================
console.log(`Starting static HTML generation for ${routesToPrerender.length} routes...`);

let successCount = 0;

for (const route of routesToPrerender) {
  // Clean relative path
  let relativePath = route.path.replace(/^\/+/, '');
  let targetFile: string;

  if (relativePath.endsWith('.html')) {
    targetFile = path.join(distDir, relativePath);
  } else {
    const targetDir = path.join(distDir, relativePath);
    fs.mkdirSync(targetDir, { recursive: true });
    targetFile = path.join(targetDir, 'index.html');
  }

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

  if (route.noIndex) {
    html = html.replace(
      /<meta name="robots" content=".*?" \/>/i,
      `<meta name="robots" content="noindex, follow" />`
    );
  }

  // Inject crawlable prerendered content into <div id="root">
  html = html.replace(
    /<div id="root">[\s\S]*?<\/body>/i,
    `<div id="root">\n${route.contentHtml}\n    </div>\n  </body>`
  );

  fs.writeFileSync(targetFile, html, 'utf8');
  successCount++;
}

console.log(`Successfully prerendered ${successCount} static HTML routes into dist/!`);
