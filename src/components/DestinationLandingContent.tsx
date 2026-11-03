import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Mountain,
  Send,
  Camera,
  Car,
  Compass,
} from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';

export interface LandingContentData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  heroImage: string;
  imageAlt: string;
  overview: string[];
  keyHighlights: string[];
  attractions: {
    name: string;
    altitude?: string;
    description: string;
    icon?: string;
  }[];
  itinerarySummary: {
    duration: string;
    title: string;
    route: string;
    highlights: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit: {
    season: string;
    months: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  whatsappMessage: string;
}

export const DESTINATION_LANDING_DATA: Record<string, LandingContentData> = {
  gangtok: {
    id: 'gangtok',
    badge: 'Capital & Alpine Frontier',
    title: 'Gangtok Tour Packages: Capital Wonders, Tsomgo Lake & Nathula Pass',
    subtitle: 'Handcrafted 3 to 6-day Gangtok holiday itineraries featuring vehicle-free MG Marg stays, high-altitude alpine lakes, and military checkpost permit liaison.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Scenic panoramic view of Gangtok town and eastern Himalayan ridgelines in Sikkim',
    overview: [
      'Perched at an elevation of 5,410 feet (1,650 meters), Gangtok is the vibrant cultural, administrative, and spiritual capital of Sikkim. Overlooking the snow-crowned peaks of Mount Kanchenjunga, Gangtok seamlessly blends clean pedestrian boulevards like MG Marg with 300-year-old Tibetan Buddhist monasteries, cascading waterfalls, and historic trading corridors.',
      'A holiday in Gangtok serves as both a relaxing mountain vacation and the strategic launchpad for East Sikkim’s protected high-altitude frontiers—including the sacred glacial waters of Tsomgo Lake (12,310 ft), Baba Harbhajan Singh Mandir, and the historic Indo-China trade border at Nathula Pass (14,140 ft).',
    ],
    keyHighlights: [
      'Stroll vehicle-free, litter-free MG Marg with authentic cafes and Tibetan souvenir shops',
      'Ascend to glacial Tsomgo (Changu) Lake at 12,310 ft with snow-capped mountain ridges',
      'Stand at the Indo-China international frontier at Nathu La Pass (14,140 ft)',
      'Explore living monastic traditions at 16th-century Rumtek and Enchey Monasteries',
      'Catch sunrise over Mt. Kanchenjunga from Tashi Viewpoint and Ganesh Tok',
    ],
    attractions: [
      {
        name: 'Tsomgo (Changu) Lake',
        altitude: '12,310 ft',
        description: 'Sacred glacial alpine lake surrounded by towering Himalayan cliffs, reflecting changing hues through different seasons.',
        icon: '💙',
      },
      {
        name: 'Nathu La Pass',
        altitude: '14,140 ft',
        description: 'Historic Indo-China border post on the ancient Silk Route corridor. Wednesday to Sunday access with advance military permit handling.',
        icon: '🏔️',
      },
      {
        name: 'Baba Harbhajan Mandir',
        altitude: '13,123 ft',
        description: 'Spiritual shrine honouring the legendary soldier saint of the Indian Army, revered for protecting Himalayan border personnel.',
        icon: '🙏',
      },
      {
        name: 'MG Marg Promenade',
        altitude: '5,410 ft',
        description: 'India’s first pedestrian-only, smoke-free town square lined with boutique shops, mountain cafes, and authentic Sikkimese dining.',
        icon: '🏙️',
      },
      {
        name: 'Rumtek Monastery',
        altitude: '4,900 ft',
        description: 'Seat of His Holiness the Gyalwang Karmapa, housing priceless Tibetan Buddhist relics, golden stupas, and ancient murals.',
        icon: '🏯',
      },
      {
        name: 'Banjhakri Falls & Energy Park',
        altitude: '5,000 ft',
        description: '100-foot natural cascading waterfall surrounded by shamanic Lepcha sculptures, manicured landscaped pathways, and rope bridges.',
        icon: '💦',
      },
    ],
    itinerarySummary: [
      {
        duration: '3 Nights / 4 Days',
        title: 'Essential Gangtok & Tsomgo Weekend Getaway',
        route: 'Bagdogra/NJP → Gangtok (3N) → Bagdogra/NJP',
        highlights: 'Full day Tsomgo Lake & Baba Mandir, MG Marg evening walks, Rumtek Monastery & local viewpoints.',
      },
      {
        duration: '4 Nights / 5 Days',
        title: 'Gangtok & Nathula Pass Border Circuit',
        route: 'Bagdogra/NJP → Gangtok (4N) → Bagdogra/NJP',
        highlights: 'Nathula Pass permit excursion, Tsomgo Lake, Tashi Viewpoint sunrise, Banjhakri Falls & Namgyal Institute of Tibetology.',
      },
    ],
    inclusions: [
      'Dedicated private Toyota Innova Crysta / Mahindra Scorpio for all transfers & sightseeing',
      'All Indian Army checkpost permits for Tsomgo Lake, Baba Mandir & Nathula Pass paperwork',
      'Hotel accommodation near MG Marg with daily breakfast and dinner',
      'Experienced, mountain-certified local Sikkimese chauffeur',
      'Fuel charges, vehicle parking taxes, and toll fees included',
    ],
    exclusions: [
      'Nathula Pass vehicle permit charges if closed by military or adverse weather',
      'Personal expenses, ropeway tickets, and guide entry fees at monasteries',
      'Travel insurance and lunch meals unless specified',
    ],
    bestTimeToVisit: [
      {
        season: 'Spring (March to May)',
        months: 'Mar – May',
        description: 'Pleasant daytime temperatures (15°C–22°C), blooming wild orchids, and vibrant festival vibes across Gangtok.',
      },
      {
        season: 'Autumn (October to mid-December)',
        months: 'Oct – Dec',
        description: 'Crisp, crystal-clear skies offering magnificent panoramic views of Mt. Kanchenjunga and reliable mountain road conditions.',
      },
      {
        season: 'Winter (January to February)',
        months: 'Jan – Feb',
        description: 'Chilly mountain weather with frequent snowfall at Tsomgo Lake and Nathula Pass, ideal for winter snow seekers.',
      },
    ],
    faqs: [
      {
        question: 'How far is Gangtok from Bagdogra Airport (IXB) and NJP Railway Station?',
        answer: 'Gangtok is approximately 120 km from Bagdogra Airport and 115 km from New Jalpaiguri (NJP) Railway Station. The scenic drive along NH10 following the Teesta River takes around 4.5 hours in our private dedicated mountain vehicles.',
      },
      {
        question: 'What documents are required for Nathula Pass and Tsomgo Lake permits?',
        answer: 'Indian nationals require original Voter ID Cards or Passports along with 4 passport-size photographs. Please note that Indian Army checkpoints strictly DO NOT accept Aadhaar cards or PAN cards for Nathula Pass permits.',
      },
      {
        question: 'Can foreign nationals visit Nathula Pass from Gangtok?',
        answer: 'Under Ministry of Home Affairs and Ministry of Defence regulations, foreign nationals are not permitted to visit Nathula Pass or Baba Mandir. However, foreign tourists can visit Tsomgo Lake with a Protected Area Permit (PAP) booked through a registered agency in a minimum group of two.',
      },
      {
        question: 'Is altitude sickness common during a Gangtok tour?',
        answer: 'Gangtok town is located at 5,410 ft where altitude sickness does not occur. When ascending to Tsomgo Lake (12,310 ft) or Nathula Pass (14,140 ft), travelers may feel slight breathlessness; staying well hydrated and avoiding heavy meals before the ascent ensures complete comfort.',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I want to book a Gangtok Tour Package covering Tsomgo Lake and Nathula Pass. Please share available dates and pricing details.',
  },

  north_sikkim: {
    id: 'north_sikkim',
    badge: 'Alpine Frontier & Glacial Lakes',
    title: 'North Sikkim Tour Packages: Gurudongmar Lake, Lachen, Lachung & Yumthang',
    subtitle: 'Ascend to the Tibetan plateau frontier at Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, and Zero Point with dedicated 4x4 vehicles and full Army permit paperwork.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Sacred azure waters of Gurudongmar Lake at 17,800 feet surrounded by snowy peaks in North Sikkim',
    overview: [
      'North Sikkim is one of the most dramatically beautiful and untouched high-altitude wilderness regions on the planet. Extending from temperate alpine river valleys up to the windswept borders of the Tibetan plateau, this district is home to Gurudongmar Lake (17,800 ft)—one of the highest freshwater alpine lakes in the world.',
      'From the rustic wooden settlements of Lachen and Lachung to the blazing rhododendron sanctuaries of Yumthang Valley and the year-round snowfields of Zero Point (15,300 ft), a North Sikkim expedition is an unforgettable, bucket-list Himalayan journey.',
    ],
    keyHighlights: [
      'Witness the sacred turquoise waters of Gurudongmar Lake at 17,800 ft altitude',
      'Traverse Yumthang Valley of Flowers with 24 species of wild rhododendrons in spring',
      'Touch perennial snow at Zero Point (Yumesamdong) at 15,300 ft',
      'Overnight in traditional Bhutia and Lepcha mountain hamlets in Lachen and Lachung',
      'Experience military checkpost permit clearance handled smoothly by our Gangtok desk',
    ],
    attractions: [
      {
        name: 'Gurudongmar Lake',
        altitude: '17,800 ft',
        description: 'Sacred glacial lake blessed by Guru Padmasambhava, whose azure waters remain partially unfrozen even during harsh sub-zero winters.',
        icon: '💙',
      },
      {
        name: 'Yumthang Valley of Flowers',
        altitude: '11,800 ft',
        description: 'Vast alpine river pasture framed by snow-clad peaks, home to the Shingba Rhododendron Sanctuary and natural sulphur hot springs.',
        icon: '🌸',
      },
      {
        name: 'Zero Point (Yumesamdong)',
        altitude: '15,300 ft',
        description: 'The final civilian outpost where three Himalayan rivers converge amidst perennial snowfields near the international border.',
        icon: '❄️',
      },
      {
        name: 'Lachen Hamlet',
        altitude: '8,838 ft',
        description: 'Base village for the early morning expedition to Gurudongmar Lake, administered under the traditional Dzumsa village council.',
        icon: '🏘️',
      },
      {
        name: 'Lachung Village',
        altitude: '8,610 ft',
        description: 'Picturesque mountain hamlet bisected by the Lachung Chu river, serving as the gateway to Yumthang Valley.',
        icon: '🌲',
      },
      {
        name: 'Seven Sisters Waterfalls',
        altitude: '3,500 ft',
        description: 'Dramatic multi-tiered cascade plunging down sheer cliffs along the Gangtok to North Sikkim mountain highway.',
        icon: '🌊',
      },
    ],
    itinerarySummary: [
      {
        duration: '2 Nights / 3 Days',
        title: 'Classic North Sikkim Expedition',
        route: 'Gangtok → Lachen (1N) → Gurudongmar Lake → Lachung (1N) → Yumthang Valley → Gangtok',
        highlights: 'Early morning Gurudongmar Lake ascent, Yumthang Valley rhododendrons, Zero Point snow excursion.',
      },
      {
        duration: '3 Nights / 4 Days',
        title: 'Extended North Sikkim & Zero Point Circuit',
        route: 'Gangtok → Lachen (1N) → Gurudongmar → Lachung (2N) → Yumthang & Katao → Gangtok',
        highlights: 'Leisurely acclimatisation, hot springs visit, Katao snow view, and traditional village walks.',
      },
    ],
    inclusions: [
      'Dedicated 4x4 high-clearance Mahindra Scorpio / Tata Sumo with winter snow gear',
      'All Indian Army checkpost clearances and Protected Area Permits (PAP) processed in advance',
      'Homestay/hotel stays in Lachen and Lachung with daily breakfast, lunch, and dinner',
      'Experienced local high-altitude chauffeur with winter route safety training',
      'All vehicle tolls, fuel charges, and driver allowances included',
    ],
    exclusions: [
      'Zero Point (Yumesamdong) and Katao optional vehicle supplement fees payable to driver union',
      'Personal thermal outerwear/boot hire at Yumthang market',
      'Personal medication and travel insurance',
    ],
    bestTimeToVisit: [
      {
        season: 'Spring (April to June)',
        months: 'Apr – Jun',
        description: 'Vibrant blooming rhododendron season in Yumthang Valley; roads to Gurudongmar Lake are clear and weather is comfortable.',
      },
      {
        season: 'Autumn (October to mid-December)',
        months: 'Oct – Dec',
        description: 'Unmatched visibility, deep blue skies, and high probability of accessing Gurudongmar Lake without monsoon washouts.',
      },
      {
        season: 'Winter (January to March)',
        months: 'Jan – Mar',
        description: 'Heavy snowfall in Lachen and Lachung; Gurudongmar may occasionally be restricted by Army checkposts due to thick ice.',
      },
    ],
    faqs: [
      {
        question: 'What identity documents are strictly required for North Sikkim permits?',
        answer: 'Indian nationals MUST carry their original Voter ID Card or Indian Passport plus 4 passport-size photographs. Indian Army checkposts strictly DO NOT accept Aadhaar cards or PAN cards for North Sikkim border permits.',
      },
      {
        question: 'Is acclimatisation necessary before visiting Gurudongmar Lake (17,800 ft)?',
        answer: 'Yes. An overnight halt at Lachen (8,838 ft) is mandatory for physiological acclimatisation. The ascent to 17,800 ft takes approximately 3.5 hours from Lachen. Staying well hydrated, avoiding alcohol, and moving at a measured pace ensures safety.',
      },
      {
        question: 'Can children and senior citizens travel to Gurudongmar Lake?',
        answer: 'Children below 5 years and seniors with severe asthma, COPD, or cardiac conditions are generally advised to consult their physician before ascending to 17,800 ft. They can comfortably enjoy Lachen, Lachung, and Yumthang Valley (11,800 ft).',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I want to book a North Sikkim Tour Package covering Gurudongmar Lake and Yumthang Valley. Please share available dates and pricing details.',
  },

  pelling: {
    id: 'pelling',
    badge: 'Royal Heritage & Kanchenjunga Vistas',
    title: 'Pelling Tour Packages: West Sikkim Heritage, Skywalk & Kanchenjunga',
    subtitle: 'Discover the ancient royal cradle of Sikkim: Pelling Glass Skywalk, 17th-century Rabdentse ruins, sacred Khecheopalri Lake, and front-row Kanchenjunga sunrises.',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Golden morning sunrise light illuminating Mount Kanchenjunga peaks above Pelling in West Sikkim',
    overview: [
      'Situated at an altitude of 7,200 feet (2,150 meters) in West Sikkim, Pelling is celebrated worldwide for offering the closest, most panoramic views of Mount Kanchenjunga (28,169 ft)—the third-highest peak on Earth. When dawn breaks over the Himalayan horizon, the snow-mantled peaks turn molten gold.',
      'Beyond its staggering natural vistas, Pelling and surrounding West Sikkim represent the spiritual and historical birth-land of the Kingdom of Sikkim. Here lies Yuksom, where the first Chogyal was crowned in 1642, the monumental ruins of Rabdentse Palace, and the 300-year-old Pemayangtse Monastery.',
    ],
    keyHighlights: [
      'Walk India’s first Glass Skywalk overlooking the 137-ft golden Chenrezig colossus',
      'Explore the ancient royal palace ruins of Rabdentse nestled in dense alpine oak forests',
      'Visit Pemayangtse Monastery (1705), the premier Nyingma monastery of Sikkim',
      'Make a wish at sacred Khecheopalri Lake, revered by both Buddhists and Hindus',
      'Cross Singshore Bridge—the highest suspension bridge in Sikkim spanning a deep river gorge',
    ],
    attractions: [
      {
        name: 'Pelling Glass Skywalk & Chenrezig Statue',
        altitude: '7,200 ft',
        description: 'Transparent glass promenade suspended over pine valleys leading to the 137-foot golden statue of Chenrezig (Avalokiteshvara).',
        icon: '✨',
      },
      {
        name: 'Rabdentse Palace Ruins',
        altitude: '6,800 ft',
        description: 'The atmospheric stone ruins of Sikkim’s second royal capital (1670–1814) offering panoramic views across the deep valleys to Kanchenjunga.',
        icon: '🏰',
      },
      {
        name: 'Pemayangtse Monastery',
        altitude: '6,840 ft',
        description: 'Built in 1705, one of Sikkim’s oldest monasteries, famous for its seven-tiered hand-carved wooden masterpiece depicting Zandog Palri.',
        icon: '🙏',
      },
      {
        name: 'Khecheopalri Sacred Lake',
        altitude: '5,600 ft',
        description: 'Wish-fulfilling sacred lake shaped like a footprint, shrouded in myth where birds miraculously prevent leaves from floating on its surface.',
        icon: '🌿',
      },
      {
        name: 'Singshore Suspension Bridge',
        altitude: '6,500 ft',
        description: 'Himalayan engineering marvel connecting precipitous mountain slopes over an awe-inspiring 100-meter vertical drop.',
        icon: '🌉',
      },
      {
        name: 'Kanchenjunga Waterfalls',
        altitude: '6,000 ft',
        description: 'Powerful perennial mountain torrent cascading over rocky moss-covered cliffs, fed directly by glacial snowmelt.',
        icon: '💦',
      },
    ],
    itinerarySummary: [
      {
        duration: '3 Nights / 4 Days',
        title: 'Pelling Scenic & Heritage Retreat',
        route: 'Bagdogra/NJP → Pelling (3N) → Bagdogra/NJP',
        highlights: 'Kanchenjunga sunrise, Glass Skywalk, Rabdentse ruins, Pemayangtse, Khecheopalri Lake, and Rimbi waterfalls.',
      },
      {
        duration: '5 Nights / 6 Days',
        title: 'Gangtok & Pelling Classic Duo Circuit',
        route: 'Bagdogra/NJP → Gangtok (3N) → Pelling (2N) → Bagdogra/NJP',
        highlights: 'Tsomgo Lake, Nathula Pass, Ravangla Buddha Park transit stop, Pelling Skywalk, and Rabdentse ruins.',
      },
    ],
    inclusions: [
      'Private dedicated Toyota Innova Crysta / 4x4 vehicle for all transit and sightseeing',
      'Heritage / boutique resort accommodation with private Kanchenjunga view balcony',
      'Daily breakfast and dinner included',
      'Experienced local mountain driver with verified local knowledge',
      'All state road taxes, parking fees, and driver allowances included',
    ],
    exclusions: [
      'Pelling Glass Skywalk entry ticket (₹50 per person)',
      'Entry tickets at archaeological monuments (Rabdentse & Pemayangtse)',
      'Personal expenses, laundry, and tips',
    ],
    bestTimeToVisit: [
      {
        season: 'Autumn (October to mid-December)',
        months: 'Oct – Dec',
        description: 'Prime season for crystal-clear, razor-sharp morning vistas of Mt. Kanchenjunga without cloud cover.',
      },
      {
        season: 'Spring (March to May)',
        months: 'Mar – May',
        description: 'Comfortable temperatures, blossoming rhododendrons, cherry blossoms, and pleasant daytime sightseeing.',
      },
      {
        season: 'Winter (December to February)',
        months: 'Dec – Feb',
        description: 'Chilly nights and crisp, clear days with deep snow on higher surrounding ridges and quiet, crowd-free monuments.',
      },
    ],
    faqs: [
      {
        question: 'How do I reach Pelling from Gangtok or NJP Railway Station?',
        answer: 'Pelling is approximately 130 km from NJP Railway Station (approx. 5 hours) and 115 km from Gangtok (approx. 4.5 hours via Ravangla). We arrange direct, private vehicle transfers so you enjoy the scenic mountain drive without shared cab delays.',
      },
      {
        question: 'Are high-altitude Army permits required for visiting Pelling?',
        answer: 'No. Pelling and West Sikkim destinations (Yuksom, Khecheopalri, Skywalk) do not require restricted Army border permits for Indian nationals. Standard identification is sufficient.',
      },
      {
        question: 'Is Pelling suitable for traveling with elderly parents and children?',
        answer: 'Pelling is one of the most family-friendly destinations in Sikkim. The elevation (7,200 ft) is gentle, roads are comfortable, and attractions like the Glass Skywalk and Pemayangtse Monastery are easily accessible.',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I want to book a Pelling Tour Package with Kanchenjunga view rooms. Please share available dates and pricing details.',
  },

  silk_route: {
    id: 'silk_route',
    badge: 'Historic 32 Hairpin Corridors',
    title: 'Old Silk Route Zuluk Tour Packages: 32 Hairpin Bends, Kupup Lake & Thambi',
    subtitle: 'Traverse the ancient Himalayan trade artery through 32 zigzag hairpin turns, Thambi Kanchenjunga sunrise viewpoint, and high-altitude frontier lakes.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'The 32 winding hairpin bends of the Old Silk Route at Zuluk in East Sikkim',
    overview: [
      'The Old Silk Route in East Sikkim is an awe-inspiring offbeat Himalayan journey following the historic caravan route that once connected Lhasa in Tibet with the ports of Bengal through the Jelep La Pass. Perched on sheer mountain ridges, the route winds through the remote villages of Sillery Gaon, Aritar, Zuluk, and Gnathang Valley.',
      'The defining spectacle of this journey is the legendary 32 hairpin bends of Zuluk—an engineering marvel that scales the mountain face in geometric switchbacks, culminating at Thambi Viewpoint (11,200 ft) with an unobstructed panorama of the entire Mount Kanchenjunga massif.',
    ],
    keyHighlights: [
      'Navigate the iconic 32 zigzag hairpin loops carved into the sheer mountainside of Zuluk',
      'Watch sunrise over Mt. Kanchenjunga from Thambi Viewpoint (11,200 ft) and Lungthung',
      'Explore the high-altitude cold desert of Gnathang Valley (12,700 ft), known as the Ladakh of the East',
      'See Kupup Elephant Lake (13,066 ft) and the world’s highest golf course at Yak Golf Course',
      'Experience authentic local Sikkimese homestay hospitality with woodfire warmth and traditional food',
    ],
    attractions: [
      {
        name: '32 Hairpin Loops of Zuluk',
        altitude: '9,400 ft',
        description: 'Legendary geometric switchbacks constructed during the historic trans-Himalayan trading era, scaling vertical mountain walls.',
        icon: '🚗',
      },
      {
        name: 'Thambi Viewpoint',
        altitude: '11,200 ft',
        description: 'Vantage point offering an unforgettable 180-degree panorama of Mt. Kanchenjunga bathed in pre-dawn golden light.',
        icon: '🌄',
      },
      {
        name: 'Kupup (Elephant) Lake',
        altitude: '13,066 ft',
        description: 'High-altitude glacial lake whose outline uncannily resembles an elephant, located near the Jelep La border pass.',
        icon: '🐘',
      },
      {
        name: 'Gnathang (Nathang) Valley',
        altitude: '12,700 ft',
        description: 'Windswept high plateau inhabited by traditional yak herders, often draped in thick winter snow until late spring.',
        icon: '🏔️',
      },
      {
        name: 'Old Baba Mandir',
        altitude: '13,000 ft',
        description: 'The original bunker and shrine of soldier saint Baba Harbhajan Singh on the historic frontier track.',
        icon: '🙏',
      },
      {
        name: 'Aritar (Lampokhari) Lake',
        altitude: '4,600 ft',
        description: 'Emerald boot-shaped alpine lake surrounded by dense pine forests, famous for paddle boating and ancient monasteries.',
        icon: '🌲',
      },
    ],
    itinerarySummary: [
      {
        duration: '3 Nights / 4 Days',
        title: 'Classic Silk Route Circuit',
        route: 'NJP/Bagdogra → Sillery Gaon / Aritar (1N) → Zuluk (1N) → Gnathang / Gangtok (1N) → NJP',
        highlights: 'Aritar Lake, Rongli checkpost permits, 32 hairpins, Thambi sunrise, Kupup Lake, Old Baba Mandir.',
      },
      {
        duration: '4 Nights / 5 Days',
        title: 'Grand Silk Route & Gangtok Traverse',
        route: 'NJP → Aritar (1N) → Zuluk (1N) → Gnathang Valley (1N) → Gangtok (1N) → NJP',
        highlights: 'Unhurried acclimatisation, Gnathang snow landscapes, Tsomgo Lake connection, and Gangtok MG Marg evening.',
      },
    ],
    inclusions: [
      'Dedicated 4x4 high-clearance SUV (Mahindra Scorpio / Bolero 4WD) for steep mountain switchbacks',
      'Special Restricted Area Permits (RAP) processed through Rongli SDPO checkpost',
      'Authentic local wooden homestay accommodation with room heating facilities',
      'All daily meals: hearty breakfast, lunch, and traditional dinner included',
      'All vehicle fuel, tolls, and experienced local mountain driver allowances',
    ],
    exclusions: [
      'Personal thermal wear and boots rental',
      'Personal expenses, laundry, and tips',
    ],
    bestTimeToVisit: [
      {
        season: 'Autumn (October to November)',
        months: 'Oct – Nov',
        description: 'Best weather of the year with crystal-clear visibility of the 32 hairpin loops and razor-sharp Kanchenjunga sunrises.',
      },
      {
        season: 'Spring (April to June)',
        months: 'Apr – Jun',
        description: 'Wildflower blooms across the valleys, pleasant weather, and melted roads allowing complete circular transit.',
      },
      {
        season: 'Winter (December to February)',
        months: 'Dec – Feb',
        description: 'Heavy snow transforms Zuluk and Gnathang into a white wonderland; high-clearance 4x4 vehicles with snow chains are essential.',
      },
    ],
    faqs: [
      {
        question: 'Who is permitted to travel on the Old Silk Route in Sikkim?',
        answer: 'The Old Silk Route is open strictly to Indian citizens due to border sensitivity near Jelep La. Foreign nationals are currently not permitted along this frontier sector.',
      },
      {
        question: 'What documents are needed for Rongli checkpost permits?',
        answer: 'Indian nationals must carry original Voter ID cards or Passports along with 4 passport-size photographs. Aadhaar cards and PAN cards are strictly not accepted for protected border permits.',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I want to book an Old Silk Route Zuluk Tour Package. Please share available dates and pricing details.',
  },

  honeymoon: {
    id: 'honeymoon',
    badge: 'Romantic Himalayan Escapes',
    title: 'Sikkim Honeymoon Packages: Romantic Mountain Stays & Panoramic Vistas',
    subtitle: 'Tailored romantic escapes with handpicked luxury heritage boutique stays, private 4x4 chauffeurs, candlelit dinners in Gangtok and Pelling, and serene lake excursions.',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Romantic private mountain balcony overlooking snow-covered Himalayan peaks in Sikkim',
    overview: [
      'Celebrate the beginning of your journey together amid the timeless serenity of the Himalayas. Sikkim offers newlyweds the perfect blend of secluded romantic intimacy, dramatic alpine scenery, and luxurious mountain hospitality away from crowded tourist circuits.',
      'Our handcrafted honeymoon packages feature handpicked heritage resorts, private suites with unobstructed Kanchenjunga sunrise views, candlelit dinners, customized unhurried pacing, and private dedicated chauffeur transport throughout.',
    ],
    keyHighlights: [
      'Wake up to private sunrise views over Mt. Kanchenjunga from your luxury suite balcony',
      'Enjoy an exclusive candlelit dinner with complimentary bottle of wine and traditional cake',
      'Private day tour to sacred, snow-draped Tsomgo Lake at 12,310 ft with Army permits handled',
      'Take peaceful couple walks through organic tea terraces at Temi Tea Garden',
      'Travel in complete comfort with a dedicated private luxury Toyota Innova Crysta throughout',
    ],
    attractions: [
      {
        name: 'Private Pelling Mountain Resorts',
        altitude: '7,200 ft',
        description: 'Luxury heritage retreats with private wooden balconies offering panoramic views of the entire Kanchenjunga range.',
        icon: '🏔️',
      },
      {
        name: 'Tsomgo Glacial Lake',
        altitude: '12,310 ft',
        description: 'High-altitude alpine lake nestled between snow-draped peaks, offering unforgettable couple photo opportunities.',
        icon: '💙',
      },
      {
        name: 'Temi Tea Estate',
        altitude: '5,000 ft',
        description: 'Sikkim’s only organic tea plantation with rolling emerald slopes, cherry blossoms in autumn, and heritage tea tastings.',
        icon: '🍵',
      },
      {
        name: 'Ravangla Buddha Park',
        altitude: '7,000 ft',
        description: 'Serene mountain sanctuary featuring a 130-foot consecrated statue of Gautama Buddha framed by snow peaks.',
        icon: '🙏',
      },
      {
        name: 'MG Marg Evening Strolls',
        altitude: '5,410 ft',
        description: 'Romantic pedestrian promenade lined with cozy mountain bistros, bakery cafes, and warm fairy lights.',
        icon: '✨',
      },
    ],
    itinerarySummary: [
      {
        duration: '5 Nights / 6 Days',
        title: 'Himalayan Romance: Gangtok & Pelling Duo',
        route: 'Bagdogra/NJP → Gangtok (3N) → Pelling (2N) → Bagdogra/NJP',
        highlights: 'Tsomgo Lake excursion, candlelit dinner, Temi tea garden stop, Pelling Glass Skywalk & Kanchenjunga sunrise.',
      },
      {
        duration: '6 Nights / 7 Days',
        title: 'Royal Sikkim Luxury Honeymoon Odyssey',
        route: 'Bagdogra → Gangtok (3N) → Ravangla (1N) → Pelling (2N) → Bagdogra',
        highlights: 'Heritage suite stays, exclusive tea garden walks, private chauffeurs, and unhurried couple pacing.',
      },
    ],
    inclusions: [
      'Dedicated private Toyota Innova Crysta with experienced courteous mountain chauffeur',
      'Luxury mountain-view room accommodation with daily gourmet breakfast and dinner',
      'Special honeymoon inclusion: 1 candlelit dinner, floral bed decoration, and celebratory cake',
      'All Indian Army checkpost permits for Tsomgo Lake and border passes processed in advance',
      'All fuel, parking charges, state tolls, and driver allowances included',
    ],
    exclusions: [
      'Personal shopping, alcoholic beverages beyond complimentary arrangements',
      'Optional adventure activities (ropeway, paragliding)',
    ],
    bestTimeToVisit: [
      {
        season: 'Autumn (October to December)',
        months: 'Oct – Dec',
        description: 'Crisp romantic mountain weather, clear skies, and guaranteed snow peak views over breakfast balconies.',
      },
      {
        season: 'Spring (March to May)',
        months: 'Mar – May',
        description: 'Pleasant temperatures, blooming orchids and rhododendrons, and lush green mountain valleys.',
      },
    ],
    faqs: [
      {
        question: 'Are honeymoon packages flexible for custom travel pacing?',
        answer: 'Yes, 100%. We understand that honeymoons demand relaxed mornings and unhurried sightseeing. All departure times and sightseeing schedules are completely flexible around your personal preferences.',
      },
      {
        question: 'Can special romantic surprises like cakes or flowers be organized?',
        answer: 'Yes. Our Gangtok concierge coordinates directly with partner hotels for fresh mountain flower bouquets, customized cakes, and private candlelit terrace dinners.',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I want to book a Sikkim Honeymoon Package. Please share romantic hotel options, itineraries, and pricing.',
  },

  family: {
    id: 'family',
    badge: 'Kids & Senior Friendly',
    title: 'Sikkim Family Tour Packages: Comfortable Mountain Holidays for All Ages',
    subtitle: 'Thoughtfully paced family itineraries with comfortable Innova Crysta transport, child-safe nature walks, cable car rides, and relaxed mountain resort stays across Sikkim.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Family enjoying panoramic Himalayan mountain views in Sikkim',
    overview: [
      'Planning a family mountain vacation requires specialized care: gentle driving pacing to prevent motion sickness, child-friendly attractions, accessible pathways for senior parents, and clean, reliable hotel dining. Sikkim Tour Co. specializes in family travel designed with generational comfort at its core.',
      'From scenic cable car rides above Gangtok and easy monastery walks to visiting organic tea gardens and experiencing snow at Tsomgo Lake, our family packages ensure memories that parents, children, and grandparents will treasure forever.',
    ],
    keyHighlights: [
      'Spacious private Toyota Innova Crysta with courteous, patient local mountain chauffeurs',
      'Gentle daily driving durations (under 4 hours per transit) to avoid travel fatigue',
      'Verified family hotels offering clean kitchens and authentic Bengali and vegetarian options',
      'Safe, accessible sightseeing: Gangtok Cable Car, Banjhakri Waterfall park, Pelling Skywalk',
      'Complete checkpost permit paperwork handled so your family enjoys a smooth, queue-free holiday',
    ],
    attractions: [
      {
        name: 'Gangtok Ropeway (Cable Car)',
        altitude: '5,400 ft',
        description: 'Thrilling 1-km aerial cable car ride soaring over Gangtok valley with panoramic views of Mount Kanchenjunga.',
        icon: '🚡',
      },
      {
        name: 'Banjhakri Falls & Shamanic Park',
        altitude: '5,000 ft',
        description: 'Paved, child-safe pathways, landscaped garden ponds, suspension bridges, and a 100-foot natural waterfall.',
        icon: '💦',
      },
      {
        name: 'Ravangla Buddha Park',
        altitude: '7,000 ft',
        description: 'Spacious landscaped complex with easy stone ramps leading to the 130-ft Buddha colossus, suitable for seniors.',
        icon: '🙏',
      },
      {
        name: 'Namchi Char Dham (Solophok)',
        altitude: '5,500 ft',
        description: 'Expansive pilgrimage complex recreating the four sacred Dhams and 108-ft Shiva statue with golf cart facilities for seniors.',
        icon: '🕉️',
      },
      {
        name: 'Tsomgo Lake',
        altitude: '12,310 ft',
        description: 'Magical high-altitude lake excursion with yak rides for children and dedicated heated resting cabins.',
        icon: '💙',
      },
    ],
    itinerarySummary: [
      {
        duration: '4 Nights / 5 Days',
        title: 'Comfortable Gangtok Family Holiday',
        route: 'Bagdogra/NJP → Gangtok (4N) → Bagdogra/NJP',
        highlights: 'Tsomgo Lake, Gangtok Ropeway, Ban Jhakri Eco Park, Do Drul Chorten, Flower Exhibition, and MG Marg shopping.',
      },
      {
        duration: '6 Nights / 7 Days',
        title: 'Complete Sikkim Family Discovery',
        route: 'Bagdogra → Gangtok (3N) → Ravangla (1N) → Pelling (2N) → Bagdogra',
        highlights: 'Tsomgo Lake, Temi Tea tasting, Buddha Park, Pelling Glass Skywalk, and Rabdentse royal ruins.',
      },
    ],
    inclusions: [
      'Dedicated private Toyota Innova Crysta for all airport/station transfers and touring',
      'Family-friendly hotel rooms (interconnecting or spacious triple/quad options on request)',
      'Daily breakfast and dinner included with customizable child meal preferences',
      'All Indian Army checkpost permits processed seamlessly in advance',
      'All vehicle fuel, tolls, parking charges, and chauffeur allowances included',
    ],
    exclusions: [
      'Optional yak rides, ropeway tickets, and monument camera fees',
      'Personal expenses, snacks, and extra bedding beyond booking allocation',
    ],
    bestTimeToVisit: [
      {
        season: 'Spring (April to June)',
        months: 'Apr – Jun',
        description: 'Ideal school summer vacation window; pleasant mountain weather (18°C–24°C) with clear roads and lush greenery.',
      },
      {
        season: 'Autumn (October to November)',
        months: 'Oct – Nov',
        description: 'Pleasant daytime weather, clear views, and lively festive atmosphere during Durga Puja and Diwali holidays.',
      },
    ],
    faqs: [
      {
        question: 'How do you ensure comfortable driving for elderly parents and young kids?',
        answer: 'Our mountain chauffeurs are trained in smooth, defensive hill driving without aggressive braking or fast cornering. We build in regular scenic tea stops and restrict daily mountain transit to 3–4 hours whenever possible.',
      },
      {
        question: 'Are vegetarian, Jain, and Bengali food options readily available for families?',
        answer: 'Yes. Our partner hotels in Gangtok and Pelling cater specifically to domestic families with clean, hygienic kitchens preparing vegetarian, Jain (no onion/garlic on request), and authentic Bengali home-style meals.',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I want to book a Sikkim Family Tour Package for our family. Please share child and senior-friendly itineraries and pricing.',
  },

  group: {
    id: 'group',
    badge: 'Corporate, Student & Convoy',
    title: 'Sikkim Group Tour Packages: Corporate Offsites, Large Families & Convoys',
    subtitle: 'Coordinated group travel solutions across Gangtok, North Sikkim, and Pelling with synchronized 4x4 SUV convoys, batch Army permit liaison, and bulk hotel allocations.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Convoy of 4x4 SUVs traveling together through scenic mountain passes in Sikkim',
    overview: [
      'Managing group travel in the Himalayas requires flawless logistical coordination: simultaneous multi-vehicle convoys, batch Army checkpost paperwork clearances, synchronized hotel check-ins, and dedicated on-ground leadership. Sikkim Tour Co. is Gangtok’s trusted local operator for group expeditions of 10 to 50+ travelers.',
      'Whether you are organizing a corporate leadership offsite, an alumni reunion, a university photography expedition, or an extended family pilgrimage, we provide end-to-end management with verified commercial vehicles and 24/7 direct concierge supervision.',
    ],
    keyHighlights: [
      'Synchronized multi-vehicle convoy of private Innova Crystas or 4x4 Scorpios',
      'Batch processing of Indian Army Restricted Area Permits for Nathula Pass & Gurudongmar Lake',
      'Exclusive hotel wing or boutique resort buyouts with conference hall facilities',
      'Dedicated on-ground tour coordinator accompanying the group from arrival to departure',
      'Transparent itemised invoicing with GST compliance and zero hidden agent commissions',
    ],
    attractions: [
      {
        name: 'Gangtok Conference & Banquet Stays',
        altitude: '5,410 ft',
        description: 'Central properties near MG Marg with state-of-the-art audio-visual conference halls and group dining halls.',
        icon: '🏢',
      },
      {
        name: 'Tsomgo Lake & Nathula Pass Convoy',
        altitude: '14,140 ft',
        description: 'Group high-altitude border excursion with dedicated pilot vehicle and military checkpost paperwork coordination.',
        icon: '🚙',
      },
      {
        name: 'Temi Tea Estate Group Tour',
        altitude: '5,000 ft',
        description: 'Guided group heritage walk through tea processing factory followed by outdoor tea tasting on rolling lawns.',
        icon: '🍵',
      },
      {
        name: 'Banjhakri Falls Team Building Area',
        altitude: '5,000 ft',
        description: 'Spacious outdoor grounds suitable for team activities, group photography, and outdoor picnics.',
        icon: '💦',
      },
    ],
    itinerarySummary: [
      {
        duration: '4 Nights / 5 Days',
        title: 'Corporate Offsite & Gangtok Retreat',
        route: 'Bagdogra/NJP → Gangtok (4N) → Bagdogra/NJP',
        highlights: 'Half-day conference session, Tsomgo Lake group excursion, MG Marg evening, team dinner with Sikkimese cultural show.',
      },
      {
        duration: '6 Nights / 7 Days',
        title: 'Grand Sikkim Group Expedition',
        route: 'Bagdogra → Gangtok (3N) → North Sikkim / Pelling (3N) → Bagdogra',
        highlights: 'High-altitude border crossing, monastery heritage tours, team outdoor challenges, and scenic mountain drives.',
      },
    ],
    inclusions: [
      'Fleet of synchronized commercial mountain vehicles with dedicated radio/mobile coordination',
      'Group batch permit clearance for all restricted zones (Army and Tourism Dept.)',
      'Group hotel accommodation with buffet breakfast, lunch, and dinner arrangements',
      'Dedicated on-ground operations manager assisting throughout the journey',
      'All parking, state taxes, driver fees, and luggage handling included',
    ],
    exclusions: [
      'Special conference hall AV rental or external team-building trainers (quoted on request)',
      'Individual personal expenses and extra food orders outside buffet menus',
    ],
    bestTimeToVisit: [
      {
        season: 'Autumn (October to December)',
        months: 'Oct – Dec',
        description: 'Perfect crisp weather and clear roads, ideal for corporate conferences and large family reunions.',
      },
      {
        season: 'Spring (March to May)',
        months: 'Mar – May',
        description: 'Pleasant outdoor temperatures suitable for group walks, nature photography, and tea garden excursions.',
      },
    ],
    faqs: [
      {
        question: 'What is the maximum group size Sikkim Tour Co. can handle?',
        answer: 'We regularly manage group departures ranging from 10 to 60+ travelers, utilizing a coordinated convoy of 4x4 SUVs and minibuses with multiple local mountain chauffeurs and a dedicated tour manager.',
      },
      {
        question: 'Are group discounts and customized payment terms available?',
        answer: 'Yes. For groups of 10 or more, we provide special corporate and bulk tariff rates with itemised proforma invoices and official GST billing.',
      },
    ],
    whatsappMessage: 'Hi Sikkim Tour Co., I am organizing a Group Tour to Sikkim. Please share group package options, vehicle convoy details, and corporate quotes.',
  },
};

interface DestinationLandingContentProps {
  landingType: string;
}

export const DestinationLandingContent: React.FC<DestinationLandingContentProps> = ({ landingType }) => {
  const data = DESTINATION_LANDING_DATA[landingType];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!data) return null;

  const whatsappUrl = buildWhatsAppUrl(data.whatsappMessage);

  return (
    <div className="space-y-12 my-12 text-[#263238]">
      {/* 1. DESTINATION OVERVIEW & ORIGINAL STORY */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309] font-mono">
          <Sparkles className="w-4 h-4 text-[#EBA94B]" />
          <span>{data.badge}</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#103D35] leading-tight">
          {data.title}
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
          {data.overview.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Key Highlights Checklist */}
        <div className="pt-4 border-t border-stone-100">
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#103D35] mb-3">
            Key Experience Highlights:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.keyHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. POPULAR ATTRACTIONS GRID WITH ALTITUDES */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309] font-mono">
              <MapPin className="w-4 h-4 text-[#EBA94B]" />
              <span>Must-Visit Places</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#103D35] mt-1">
              Popular Attractions Covered in Itinerary
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500 font-medium">
            All checkpost permits coordinated
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.attractions.map((spot, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#103D35] transition-all flex flex-col justify-between space-y-2 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{spot.icon || '📍'}</span>
                  {spot.altitude && (
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      {spot.altitude}
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-[#103D35] text-sm group-hover:text-[#3B7FA3] transition-colors">
                  {spot.name}
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {spot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RECOMMENDED ITINERARY PACING */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309] font-mono">
            <Compass className="w-4 h-4 text-[#EBA94B]" />
            <span>Itinerary Pacing</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#103D35] mt-1">
            Recommended Circuit Options
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.itinerarySummary.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#0c3127]/5 via-stone-50 to-white border border-stone-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-[#103D35] text-white">
                  {item.duration}
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">
                  Verified Route
                </span>
              </div>
              <h4 className="font-serif font-bold text-base text-[#103D35]">
                {item.title}
              </h4>
              <div className="text-xs text-stone-700 space-y-1">
                <p>
                  <strong>Route:</strong> {item.route}
                </p>
                <p>
                  <strong>Highlights:</strong> {item.highlights}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRANSPARENT INCLUSIONS & EXCLUSIONS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309] font-mono">
            <ShieldCheck className="w-4 h-4 text-[#EBA94B]" />
            <span>Transparent Pricing Policy</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#103D35] mt-1">
            Package Inclusions &amp; Exclusions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What&apos;s Included in Your Package:</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-700">
              {data.inclusions.map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
              <XCircle className="w-4 h-4 text-stone-400" />
              <span>What&apos;s Not Included (Transparent Exclusions):</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-600">
              {data.exclusions.map((exc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-stone-400 font-bold mt-0.5">•</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. BEST TIME TO VISIT */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309] font-mono">
            <Calendar className="w-4 h-4 text-[#EBA94B]" />
            <span>Seasonal Guide</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#103D35] mt-1">
            Best Time to Visit
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.bestTimeToVisit.map((season, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#103D35]">
                  {season.season}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#b45309] bg-amber-100/80 px-2 py-0.5 rounded">
                  {season.months}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {season.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b45309] font-mono">
            <HelpCircle className="w-4 h-4 text-[#EBA94B]" />
            <span>Traveler Q&amp;A</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#103D35] mt-1">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left py-3.5 px-4 sm:px-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-100/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-[#103D35]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#EBA94B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs text-stone-700 leading-relaxed border-t border-stone-200/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. WHATSAPP ENQUIRY CTA BANNER */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c3127] via-[#103D35] to-[#0A2621] text-white border border-[#EBA94B]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EBA94B] block">
            Direct Local Mountain Desk · 24/7 Response
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Plan Your Journey with Gangtok Concierge
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
            Connect directly with our local operations team on Paljor Stadium Road. We review road conditions, check Army permit availability, and provide transparent quotes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Book on WhatsApp (+91 70018 46727)</span>
          </a>
          <a
            href="tel:+917001846727"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Call Desk</span>
          </a>
        </div>
      </section>
    </div>
  );
};
