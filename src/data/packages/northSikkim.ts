import { TourPackage } from './types';

export const northSikkimPackages: TourPackage[] = [
  // 1. Short Trip (2N/3D)
  {
    id: 'north-sikkim-lachung-yumthang-express',
    slug: 'north-sikkim-lachung-yumthang-express',
    name: 'North Sikkim Lachung & Yumthang Valley Express',
    tagline: 'Swift alpine getaway from Gangtok to the hot springs and rhododendron meadows of Lachung',
    duration: '3 days / 2 nights',
    daysCount: 3,
    nightsCount: 2,
    startingPriceInr: 9500,
    startingPriceNote: '₹9,500 per person based on 4-6 travellers sharing a private Scorpio/Bolero. Changes with group size, peak season (April-May), and hotel tier. [CONFIRM PRICE]',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Prices vary by vehicle type (Mahindra Scorpio vs Innova Crysta), season, and room standard. Send an enquiry for an itemized estimate.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachung', 'Yumthang Valley', 'Zero Point'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'High Altitude Express',
    travelStyleCategory: 'Short Trips',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 15,300 ft',
    maxAltitude: '15,300 ft (Zero Point / Yumesamdong)',
    difficulty: 'moderate',
    fitnessLevel: 'Moderate',
    bestMonths: 'March to June (flowers & snow) and October to mid-December (crisp blue skies)',
    permitRequirements: 'Protected Area Permit (PAP) issued by Sikkim Tourism and Indian Army checkposts. Original Voter ID or Passport + 4 passport photos required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with North Sikkim administration and military authorities in Gangtok. Permits are subject to official security clearances and weather status; no operator can guarantee approvals.',
    roadAndWeatherNote: 'The Mangan-Chungthang corridor is prone to landslides during monsoon. In winter, heavy snowfall may block access above Yumthang. Travel times depend on road clearances by the Border Roads Organisation (BRO).',
    whoItSuits: ['Travellers with limited holiday days wanting to see snow and alpine valleys', 'Couples and small friend groups'],
    whoItDoesNotSuit: ['Travellers with severe asthma, COPD, or unstable cardiac conditions', 'Infants below 3 years of age due to rapid elevation climb'],
    altitudeAndHealthNote: 'Elevation jumps from 5,410 ft in Gangtok to 8,600 ft in Lachung, reaching 15,300 ft at Zero Point. Stay well hydrated, avoid alcohol in Lachung, and inform your driver immediately if you feel dizzy or nauseous.',
    disclosures: [
      'Zero Point visit is subject to local road permit and snow conditions; driver union supplement may apply locally if roads open late.',
      'Single-use plastic bottles are legally banned across North Sikkim. Bring reusable thermal flasks.',
      'Electricity and mobile connectivity (BSNL/Airtel only) in Lachung can be intermittent due to remote mountain terrain.'
    ],
    mainInclusions: [
      'Protected Area Permit paperwork assistance for North Sikkim checkposts',
      'Dedicated 4x4 mountain vehicle with fuel, driver allowance, and road tolls',
      '2 Nights standard mountain hotel accommodation in Lachung',
      'All meals in Lachung (Bed tea, Breakfast, Lunch, Dinner)'
    ],
    accommodationCategory: 'Standard Mountain Lodge with heated blankets & running hot water',
    transportDetails: 'Private high-clearance SUV (Mahindra Scorpio or Tata Sumo Gold) with licensed local mountain driver',
    mealsSummary: 'All meals included during Lachung stay (2 Breakfasts, 2 Lunches, 2 Dinners); simple, nourishing Sikkimese and North Indian food',
    inclusions: [
      'Permit paperwork assistance for protected border areas',
      'Dedicated vehicle transfer Gangtok - Lachung - Yumthang - Gangtok',
      '2 nights stay in Lachung on twin sharing basis',
      'Simple home-style meals at the hotel',
      'Driver food, night halt allowance, and vehicle parking fees'
    ],
    exclusions: [
      'Personal warm clothing rentals (boots, overcoats available on rent at Yumthang market)',
      'Zero Point (Yumesamdong) local cab supplement if added beyond Yumthang',
      'Entry fees to national parks or hot spring baths',
      'Travel and medical insurance',
      'Expenses caused by road blockages, natural landslides, or political strikes'
    ],
    optionalActivities: [
      'Zero Point snow excursion (subject to military checkpost opening)',
      'Sulphur Hot Spring dip near Yumthang River bridge'
    ],
    travelRequirements: [
      'Original Indian Passport or Voter ID Card (mandatory for checkposts)',
      '4 passport size colour photographs per traveller',
      'Warm thermal innerwear, heavy jacket, gloves, and woolen cap'
    ],
    seasonalAvailability: 'Operational from mid-September to mid-June. Peak snow months: January to March; Rhododendron bloom: April to May.',
    cancellationPolicy: 'Full credit or 80% refund up to 10 days before departure; 50% refund up to 5 days prior. Non-refundable within 4 days due to advance hotel lock-ins in remote Lachung.',
    overview: 'The North Sikkim Lachung and Yumthang Valley Express is a focused 3-day itinerary crafted for travellers based in Gangtok who want to experience the grandeur of the Eastern Himalayas without an extended holiday. Departing early from Gangtok, you travel along the roaring Teesta River gorge past Singhik and Chungthang to reach the historic hamlet of Lachung at 8,600 ft. The next morning is dedicated to Yumthang Valley, the renowned Valley of Flowers, fringed by pine forests and snowy summits, with an optional climb to Zero Point at 15,300 ft where the motorable road ends near the international border. Return to Gangtok on Day 3 with memories of glacial waterfalls and authentic Sikkimese mountain warmth.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Gangtok to Lachung via Chungthang Gorge',
        description: 'Depart Gangtok at 09:30 AM after permit verification. Drive past Tashi Viewpoint, Seven Sisters Waterfalls, and Mangan to reach Chungthang, the sacred confluence of the Lachen and Lachung rivers. Ascend through emerald pine forests into Lachung village (8,600 ft). Evening at leisure exploring the wooden village cottages.',
        highlights: ['Seven Sisters Waterfall', 'Chungthang river confluence', 'Lachung traditional village'],
        mealsIncluded: 'Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachung',
        driveTime: '6 to 7 hours (125 km mountain road)',
        sightseeing: ['Seven Sisters Falls', 'Singhik Viewpoint', 'Chungthang Confluence']
      },
      {
        day: 2,
        title: 'Excursion to Yumthang Valley (11,800 ft) & Zero Point (15,300 ft)',
        description: 'Early morning 6:00 AM departure to Yumthang Valley (25 km / 1.5 hrs). Stroll along the meandering riverbed surrounded by snow-draped peaks. Subject to road clearance and permit, proceed further up to Zero Point (Yumesamdong) where frozen scree slopes touch the horizon. Return to Lachung by afternoon for hot lunch and village walk.',
        highlights: ['Yumthang Valley of Flowers', 'Shingba Rhododendron Sanctuary', 'Zero Point snowfields'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachung -> Yumthang Valley -> Zero Point -> Lachung',
        driveTime: '4 to 5 hours round trip',
        sightseeing: ['Yumthang Valley', 'Yumesamdong Zero Point', 'Lachung Monastery']
      },
      {
        day: 3,
        title: 'Lachung to Gangtok Descent',
        description: 'After breakfast, begin the scenic return drive towards Gangtok. Stop at Naga Waterfalls and Bheema Falls along the route. Arrive in Gangtok by late afternoon and drop at your chosen hotel or MG Marg.',
        highlights: ['Naga Waterfalls', 'Bheema Waterfalls', 'Scenic descent along Teesta gorge'],
        mealsIncluded: 'Breakfast & Lunch',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Chungthang -> Mangan -> Gangtok',
        driveTime: '6 hours (125 km)',
        sightseeing: ['Naga Falls', 'Mangan valley vistas']
      }
    ],
    faqs: [
      {
        question: 'Is Zero Point guaranteed in this 3-day package?',
        answer: 'Zero Point is not guaranteed because it sits at 15,300 ft and roads are frequently closed by the Indian Army during heavy snowfall or bad weather. When open, a local driver supplement is arranged on the spot.'
      },
      {
        question: 'Which ID proof is strictly accepted for North Sikkim permits?',
        answer: 'Only an original Indian Voter ID Card or Indian Passport is accepted for adult Indian nationals, accompanied by 4 passport photos. Aadhaar cards and PAN cards are strictly not accepted by military checkposts.'
      },
      {
        question: 'What kind of hotels are available in Lachung?',
        answer: 'Lachung is a high-altitude border village. Accommodations are cozy mountain lodges and homestays with warm wooden panelling, clean beds, running hot water (often timed via geysers or wood boilers), and home-cooked buffet meals.'
      },
      {
        question: 'Can senior citizens manage this short Lachung trip?',
        answer: 'Yes, provided they do not have acute cardiovascular or respiratory ailments. Yumthang Valley at 11,800 ft has gentle meadows. However, we advise seniors to skip Zero Point (15,300 ft) if they experience any breathlessness.'
      }
    ],
    seo: {
      title: 'North Sikkim Lachung Tour | Sikkim Tour Co.',
      metaDescription: 'Book a 3-day North Sikkim tour from Gangtok to Lachung, Yumthang Valley, and Zero Point. Dedicated 4x4 transport, permits handled, authentic local meals.',
      h1: 'North Sikkim Lachung & Yumthang Valley Tour Package (3D/2N)',
      primaryKeyword: 'North Sikkim tour',
      secondaryKeywords: ['Lachung Yumthang tour package', 'Zero Point Sikkim trip', 'Gangtok to Lachung tour'],
      suggestedInternalLinks: ['/destinations/yumthang-valley', '/travel-guides/north-sikkim-permits', '/stays']
    },
    schema: {
      touristTripName: 'North Sikkim Lachung & Yumthang Valley Express',
      description: 'A 3-day high-altitude journey from Gangtok to the alpine meadows of Lachung, Yumthang Valley, and Zero Point with chauffeured mountain transport and permit handling.',
      itinerary: ['Day 1: Gangtok to Lachung via Chungthang', 'Day 2: Excursion to Yumthang Valley & Zero Point', 'Day 3: Return to Gangtok via Naga Falls'],
      offerPriceInr: 9500,
      faqs: [
        {
          question: 'Is Zero Point guaranteed in this 3-day package?',
          answer: 'Zero Point is subject to army checkpost permits and snow clearance on the morning of travel.'
        },
        {
          question: 'Which ID is needed for North Sikkim permits?',
          answer: 'Original Voter ID Card or Passport with 4 passport-size photographs.'
        }
      ]
    }
  },

  // 2. Short Trip (3N/4D)
  {
    id: 'lachen-gurudongmar-lake-short-circuit',
    slug: 'lachen-gurudongmar-lake-short-circuit',
    name: 'Lachen & Sacred Gurudongmar Lake Short Circuit',
    tagline: 'High-altitude pilgrimage to 17,800 ft sacred Gurudongmar Lake and pristine Chopta Valley',
    duration: '4 days / 3 nights',
    daysCount: 4,
    nightsCount: 3,
    startingPriceInr: 13500,
    startingPriceNote: '₹13,500 per person for a private party of 4 in a dedicated 4x4 SUV. [CONFIRM PRICE] Varies with peak season fuel surcharges and vehicle availability.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Transparent pricing with no hidden checkpost charges. Contact our Gangtok office for dates and customized vehicle preferences.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachen', 'Thangu', 'Chopta Valley', 'Gurudongmar Lake'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'High Altitude Sacred Lake',
    travelStyleCategory: 'High Altitude',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'April to June and October to November (avoid peak monsoon July-August)',
    permitRequirements: 'Strict Protected Area Permit (PAP) issued under Indian Army supervision. Indian nationals only for Gurudongmar Lake. Original Voter ID or Passport + 4 photos required.',
    permitNotes: 'We handle the permit paperwork with the District Magistrate and Army Brigade offices. Permits can be denied or delayed during military exercises or flash weather; approvals remain at the discretion of authorities.',
    roadAndWeatherNote: 'The road between Thangu and Gurudongmar crosses military gravel tracks over glacial moraine. Sub-zero morning temperatures are common even in May. NH-10 connectivity to Gangtok is monitored daily.',
    whoItSuits: ['Physically fit travellers seeking remote Tibetan plateau landscapes', 'Devotees visiting Guru Padmasambhava sacred lake'],
    whoItDoesNotSuit: ['Travellers with hypertension, heart ailments, or severe breathing difficulties', 'Children below 7 years and frail seniors due to 17,800 ft oxygen levels'],
    altitudeAndHealthNote: 'Gurudongmar sits at 17,800 ft where atmospheric oxygen is roughly 50% of sea level. Doctors advise staying at the lake for no longer than 30 to 45 minutes. Portable medical oxygen canisters are carried in the vehicle.',
    disclosures: [
      'Foreign passport holders (including OCI/PIO cardholders) are strictly prohibited from visiting Gurudongmar Lake by Ministry of Home Affairs rules. Foreign travellers are rerouted to Chopta Valley or Lachung.',
      'Departure from Lachen for Gurudongmar is at 04:00 AM to beat midday high-altitude gale winds.',
      'Lachen amenities are basic; rooms feature heavy quilts and hot water buckets or timed geysers.'
    ],
    mainInclusions: [
      'Protected Area Permit documentation processing',
      'Dedicated 4WD mountain vehicle (Scorpio / Bolero Camper) with driver',
      '2 Nights accommodation in Lachen + 1 Night in Gangtok',
      'All meals during Lachen and Gurudongmar excursion',
      'Emergency portable oxygen cylinder in vehicle'
    ],
    accommodationCategory: 'Lachen Mountain Lodge (Deluxe category with private bathroom)',
    transportDetails: 'Dedicated Mahindra Scorpio 4x4 or Tata Sumo Gold with commercial permit',
    mealsSummary: 'Breakfast, Lunch, and Dinner provided in Lachen; simple vegetarian and egg meals suited for altitude',
    inclusions: [
      'Permit handling for North Sikkim restricted zones',
      'All road taxes, checkpoint fees, and vehicle parking charges',
      'Accommodation as per itinerary',
      'Assistance with high-altitude briefing in Gangtok'
    ],
    exclusions: [
      'Personal expenses, laundry, and packaged snacks',
      'Optional Kala Patthar detour supplement',
      'Travel insurance and medical hospitalisation expenses',
      'Costs arising from road closures, landslides, or early returns'
    ],
    optionalActivities: [
      'Kala Patthar high-altitude snow point detour from Thangu (subject to weather)',
      'Traditional butter tea tasting in Thangu village wooden huts'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      'Doctor-cleared fitness if above 55 years of age',
      'Heavy woolen clothing, windcheater jacket, thermal socks, UV sunglasses'
    ],
    seasonalAvailability: 'Operational April to June and October to December. Lake is often frozen solid from late December to March.',
    cancellationPolicy: '80% refund up to 14 days before trip; 50% refund between 7 to 13 days; no refund within 6 days.',
    overview: 'This focused 4-day high-altitude expedition is tailored for adventurers driven to witness one of the highest freshwater lakes on Earth: sacred Gurudongmar Lake at 17,800 ft. Revered by Buddhists and Sikhs alike, the lake sits enclosed within a dramatic amphitheatre of snow-streaked peaks on the Tibetan plateau. After picking you up in Gangtok, the route climbs through the deep valleys of North Sikkim to Lachen at 9,000 ft, where you acclimatize. An early morning ascent past the military settlement of Thangu and the windswept Chopta Valley brings you to the sacred waters of Gurudongmar. With thoughtful pacing, professional drivers, and emergency oxygen onboard, we ensure a safe and respectful journey.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Gangtok to Lachen Highland Village',
        description: 'Meet your driver in Gangtok at 09:00 AM. Cross North Sikkim checkposts at Mangan and Singhik. Stop for hot lunch at Chungthang where the Lachen and Lachung rivers diverge. Follow the Lachen Chu river climbing steadily into Lachen (9,000 ft). Check into your lodge and rest early to prepare for tomorrow’s altitude.',
        highlights: ['Singhik viewpoint', 'Chungthang confluence', 'Lachen high-altitude valley'],
        mealsIncluded: 'Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours (120 km)',
        sightseeing: ['Singhik Valley', 'Chungthang', 'Lachen Monastery']
      },
      {
        day: 2,
        title: 'Ascent to Sacred Gurudongmar Lake (17,800 ft) & Return to Lachen',
        description: 'Wake up at 03:30 AM for tea and depart Lachen by 04:15 AM. Drive through the alpine outpost of Thangu (13,000 ft) where vegetation yields to barren Tibetan plateau tundra. Reach the shores of sacred Gurudongmar Lake (17,800 ft) by 08:30 AM. Marvel at the turquoise waters beneath Mount Siniolchu and Kangchengyao. Return to Lachen by 01:30 PM for hot lunch and restful afternoon.',
        highlights: ['Thangu military plateau', 'Cold desert tundra', 'Gurudongmar turquoise waters'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Lachen -> Thangu -> Gurudongmar Lake -> Lachen',
        driveTime: '7 hours total (130 km round trip high mountain trail)',
        sightseeing: ['Thangu Valley', 'Chopta Valley view', 'Gurudongmar Lake']
      },
      {
        day: 3,
        title: 'Chopta Valley Exploration & Scenic Return to Gangtok',
        description: 'Enjoy a leisurely breakfast in Lachen. Visit Lachen Monastery before descending through Chungthang gorge. Stop by pristine Singhik for Kanchenjunga viewpoints if weather permits. Arrive in Gangtok by late evening.',
        highlights: ['Lachen Monastery', 'Singhik Kanchenjunga viewpoint', 'Gangtok arrival'],
        mealsIncluded: 'Breakfast & Lunch',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachen -> Chungthang -> Mangan -> Gangtok',
        driveTime: '6 hours (120 km)',
        sightseeing: ['Lachen Gompa', 'Seven Sisters Waterfall']
      },
      {
        day: 4,
        title: 'Gangtok Departure',
        description: 'Breakfast at hotel in Gangtok. Your dedicated vehicle provides drop-off to Pakyong Airport (PYG) or onwards towards your next destination.',
        highlights: ['Morning mountain vistas', 'Onward transfer'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Pakyong / Gangtok hotel drop',
        driveTime: '1 to 2 hours',
        sightseeing: ['MG Marg morning stroll']
      }
    ],
    faqs: [
      {
        question: 'Are foreign nationals allowed to visit Gurudongmar Lake?',
        answer: 'No. Under Ministry of Home Affairs border guidelines, foreign nationals, OCI, and PIO cardholders are strictly restricted from travelling past Thangu to Gurudongmar. Foreign guests can travel up to Chopta Valley or visit Lachung.'
      },
      {
        question: 'How cold does it get at Gurudongmar Lake?',
        answer: 'Morning temperatures at 17,800 ft frequently drop between -5°C to -15°C from October through April, and hover around 0°C to 5°C in May and June. Layered thermal clothing, windproof jackets, and insulated gloves are necessary.'
      },
      {
        question: 'Why do we leave Lachen so early at 4 AM?',
        answer: 'After 10:00 AM, high-altitude thermal winds create severe gale-force gusts and dust storms across the Gurudongmar plateau. Leaving early ensures you reach the lake while the weather is calm and the sun illuminates the water.'
      },
      {
        question: 'What happens if someone feels altitude sickness at the lake?',
        answer: 'Our drivers are trained to recognize AMS symptoms. We carry emergency oxygen and immediately descend the passenger to Thangu (13,000 ft) or Lachen (9,000 ft), which provides rapid relief.'
      }
    ],
    seo: {
      title: 'Gurudongmar Lake Tour Package | Sikkim Tour Co.',
      metaDescription: 'Book a 4-day Lachen & Gurudongmar Lake tour from Gangtok. Reliable 4x4 SUVs, verified permit handling, portable oxygen, and experienced mountain chauffeurs.',
      h1: 'Lachen & Sacred Gurudongmar Lake Tour Package (4D/3N)',
      primaryKeyword: 'Gurudongmar Lake tour',
      secondaryKeywords: ['Lachen tour package', 'North Sikkim lake tour', 'Gangtok to Gurudongmar package'],
      suggestedInternalLinks: ['/destinations/gurudongmar-lake', '/travel-guides/north-sikkim-permits', '/packages']
    },
    schema: {
      touristTripName: 'Lachen & Sacred Gurudongmar Lake Short Circuit',
      description: 'A 4-day high-altitude expedition to 17,800 ft Gurudongmar Lake from Gangtok with Lachen acclimatization and military permit processing.',
      itinerary: ['Day 1: Gangtok to Lachen', 'Day 2: Gurudongmar Lake 17,800 ft excursion', 'Day 3: Lachen to Gangtok', 'Day 4: Gangtok departure'],
      offerPriceInr: 13500,
      faqs: [
        {
          question: 'Are foreign tourists allowed at Gurudongmar Lake?',
          answer: 'Foreign nationals are restricted by Indian border rules; alternate valleys like Lachung are provided.'
        },
        {
          question: 'What is the departure time for Gurudongmar Lake?',
          answer: 'Vehicles depart Lachen around 04:00 AM to avoid midday mountain winds.'
        }
      ]
    }
  },

  // 3. Standard Trip (4N/5D)
  {
    id: 'complete-north-sikkim-twin-valleys',
    slug: 'complete-north-sikkim-twin-valleys',
    name: 'Complete North Sikkim Twin Valleys Circuit',
    tagline: 'The classic North Sikkim journey covering both Lachen (Gurudongmar) and Lachung (Yumthang)',
    duration: '5 days / 4 nights',
    daysCount: 5,
    nightsCount: 4,
    startingPriceInr: 16500,
    startingPriceNote: '₹16,500 per person based on 4 travellers sharing private transport. [CONFIRM PRICE] Subject to peak holiday season and choice of accommodation tier.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Inclusive of vehicle, all North Sikkim meals, and paperwork. Enquire with your travel dates for confirmed seasonal rates.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachen', 'Gurudongmar Lake', 'Lachung', 'Yumthang Valley', 'Zero Point'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Classic Alpine Circuit',
    travelStyleCategory: 'High Altitude',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'October to mid-December and April to May',
    permitRequirements: 'Protected Area Permit (PAP) for North Sikkim. Original Voter ID or Passport + 6 passport-size photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork across civilian and army checkpoints. Clearances are contingent on daily road fitness and security approval by authorities.',
    roadAndWeatherNote: 'Travel through North Sikkim involves traversing single-lane mountain roads along the Teesta valley. Landslides during rainfall can cause detours. NH-10 is the primary artery from Siliguri to Gangtok.',
    whoItSuits: ['Travellers wanting the quintessential North Sikkim experience covering both major valleys', 'Photography enthusiasts and mountain lovers'],
    whoItDoesNotSuit: ['Travellers with serious heart or lung conditions', 'Those prone to severe motion sickness on long winding roads'],
    altitudeAndHealthNote: 'Overnighting at Lachen (9,000 ft) and Lachung (8,600 ft) aids acclimatization before reaching Gurudongmar (17,800 ft). Carry hydration salts and consult your doctor regarding Diamox if recommended.',
    disclosures: [
      'North Sikkim relies on local driver associations; vehicles must be mountain-certified 4WD.',
      'Single-use plastic bottles are prohibited; please use filtered water and personal metal flasks.',
      'Gurudongmar Lake access is restricted to Indian citizens only.'
    ],
    mainInclusions: [
      'North Sikkim Protected Area Permit processing assistance',
      'Dedicated 4x4 vehicle (Scorpio/Innova) for the entire 5 days',
      '2 Nights in Gangtok, 1 Night in Lachen, 1 Night in Lachung',
      'All meals during North Sikkim leg (Breakfast, Lunch, Dinner)',
      'Oxygen cylinder kit for high-altitude emergency'
    ],
    accommodationCategory: 'Deluxe Himalayan Lodges with heating facilities',
    transportDetails: 'Dedicated Mahindra Scorpio 4x4 or Toyota Innova with experienced Sikkim hill driver',
    mealsSummary: 'Breakfasts in Gangtok; full board (Breakfast, Lunch, Dinner) in Lachen and Lachung',
    inclusions: [
      'All vehicle fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing fees',
      '4 nights accommodation on twin-sharing basis',
      'Hotel meal plan as specified'
    ],
    exclusions: [
      'Airfare or train fare to NJP / Bagdogra',
      'Zero Point cab supplement fee if availed',
      'Personal laundry, beverages, and tips',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Zero Point / Yumesamdong excursion from Yumthang Valley',
      'Hot spring dip in Yumthang River'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '6 passport size colour photos',
      'Warm thermal layers, windproof fleece, and sturdy walking shoes'
    ],
    seasonalAvailability: 'September to June. Rhododendrons bloom in April-May; autumn views peak in October-November.',
    cancellationPolicy: 'Full credit or 80% refund up to 15 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The Complete North Sikkim Twin Valleys Circuit is the definitive 5-day mountain route connecting both famed valleys of North Sikkim: Lachen and Lachung. Beginning from NJP or Bagdogra with an overnight stay in Gangtok, you travel north along rugged river canyons to the high settlement of Lachen. From here, an early morning ascent leads across high tundra to Gurudongmar Lake at 17,800 ft. Crossing back via Chungthang, you enter the enchanting valley of Lachung, surrounded by snow-capped peaks and apple orchards, with a full excursion to Yumthang Valley of Flowers and Zero Point. Designed with balanced travel legs and dedicated 4x4 transport, this package delivers the complete North Sikkim experience.',
    detailedItinerary: [
      {
        day: 1,
        title: 'NJP / Bagdogra Arrival & Transfer to Gangtok',
        description: 'Meet our chauffeur at New Jalpaiguri Railway Station (NJP) or Bagdogra Airport (IXB). Drive along the scenic Teesta River along NH-10 ascending into Gangtok (5,410 ft). Evening briefing on North Sikkim permits and leisure walk on MG Marg.',
        highlights: ['Teesta River drive', 'Gangtok arrival', 'MG Marg stroll'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'NJP / Bagdogra -> Sevoke -> Rangpo -> Gangtok',
        driveTime: '4.5 to 5 hours (125 km)',
        sightseeing: ['Sevoke Coronation Bridge', 'Rangpo border entry']
      },
      {
        day: 2,
        title: 'Gangtok to Lachen via Mangan & Chungthang',
        description: 'Depart Gangtok at 09:30 AM after permits are issued. Stop at Seven Sisters Waterfalls and Singhik viewpoint. Stop for lunch at Chungthang and proceed up the Lachen valley to reach Lachen village (9,000 ft) by late afternoon. Acclimatize with a quiet evening walk.',
        highlights: ['Seven Sisters Waterfall', 'Singhik views', 'Lachen village walk'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours (120 km)',
        sightseeing: ['Seven Sisters Falls', 'Chungthang Confluence']
      },
      {
        day: 3,
        title: 'Gurudongmar Lake (17,800 ft) Excursion & Transfer to Lachung',
        description: 'Early 04:00 AM departure to Gurudongmar Lake via Thangu military post. Marvel at the sacred turquoise waters and surrounding peaks. Return to Lachen for lunch, pack up, and transfer across Chungthang to Lachung (8,600 ft) by early evening.',
        highlights: ['Gurudongmar high altitude lake', 'Cold desert landscapes', 'Transfer to Lachung'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachen -> Gurudongmar -> Lachen -> Chungthang -> Lachung',
        driveTime: '7 hours driving total',
        sightseeing: ['Thangu Valley', 'Gurudongmar Lake', 'Lachung river views']
      },
      {
        day: 4,
        title: 'Yumthang Valley & Zero Point Excursion, Return to Gangtok',
        description: 'Depart at 06:30 AM for Yumthang Valley (11,800 ft). Walk through the meadows of Shingba Rhododendron Sanctuary and optionally proceed to Zero Point (15,300 ft). Return to Lachung for hot lunch and proceed on the scenic descent back to Gangtok.',
        highlights: ['Yumthang Valley of Flowers', 'Zero Point snow point', 'Descent to Gangtok'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Yumthang -> Lachung -> Chungthang -> Gangtok',
        driveTime: '7 to 8 hours driving total',
        sightseeing: ['Yumthang Valley', 'Shingba Sanctuary', 'Naga Falls']
      },
      {
        day: 5,
        title: 'Gangtok Departure to NJP / Bagdogra',
        description: 'After breakfast, depart Gangtok descending along the Teesta valley to NJP Railway Station or Bagdogra Airport for your return flight or train.',
        highlights: ['Morning mountain tea', 'Descent to plains'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> Siliguri -> NJP / Bagdogra',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta riverside views']
      }
    ],
    faqs: [
      {
        question: 'Can this itinerary be completed in an Innova Crysta?',
        answer: 'Yes, Innova Crysta is available on request for this package. However, in heavy snow conditions near Gurudongmar or Zero Point, 4x4 Scorpio or Bolero models are preferred for traction.'
      },
      {
        question: 'What is the mobile phone network availability in Lachen and Lachung?',
        answer: 'Only BSNL and select Airtel 4G networks work in Lachen and Lachung. Jio and Vodafone generally have no signal once you cross Mangan.'
      },
      {
        question: 'Are meals provided during the North Sikkim travel days?',
        answer: 'Yes. Due to limited public restaurants in remote North Sikkim, all meals (Breakfast, Lunch, Dinner) are provided at your hotel in Lachen and Lachung as part of the package.'
      },
      {
        question: 'Is oxygen provided in the vehicle?',
        answer: 'Yes, our vehicles operating on the Gurudongmar circuit carry a portable emergency medical oxygen canister for reassurance.'
      }
    ],
    seo: {
      title: 'North Sikkim 5 Day Tour Package | Sikkim Tour Co.',
      metaDescription: 'Complete 5-day North Sikkim tour package covering Lachen, Gurudongmar Lake, Lachung, and Yumthang Valley. Private 4x4 SUVs, permit processing included.',
      h1: 'Complete North Sikkim Twin Valleys Tour Package (5D/4N)',
      primaryKeyword: 'North Sikkim tour package',
      secondaryKeywords: ['Lachen Lachung 5 days tour', 'Gurudongmar Yumthang package', 'North Sikkim itinerary from NJP'],
      suggestedInternalLinks: ['/packages', '/destinations/gurudongmar-lake', '/destinations/yumthang-valley']
    },
    schema: {
      touristTripName: 'Complete North Sikkim Twin Valleys Circuit',
      description: 'A comprehensive 5-day tour of North Sikkim connecting Gurudongmar Lake in Lachen with Yumthang Valley in Lachung.',
      itinerary: ['Day 1: NJP/Bagdogra to Gangtok', 'Day 2: Gangtok to Lachen', 'Day 3: Gurudongmar Lake & transfer to Lachung', 'Day 4: Yumthang Valley & return to Gangtok', 'Day 5: Gangtok to NJP/Bagdogra'],
      offerPriceInr: 16500,
      faqs: [
        {
          question: 'Are all meals included in North Sikkim?',
          answer: 'Yes, full board meals are included during Lachen and Lachung stays.'
        },
        {
          question: 'What documents are required for permits?',
          answer: 'Original Indian Voter ID or Passport with 6 passport photographs.'
        }
      ]
    }
  },

  // 4. Standard Trip (5N/6D)
  {
    id: 'north-sikkim-adventure',
    slug: 'north-sikkim-adventure',
    name: 'North Sikkim High Plateau & Glacial Valley Adventure',
    tagline: 'Deep mountain exploration including Kala Patthar, Gurudongmar, and Zero Point snowline',
    duration: '6 days / 5 nights',
    daysCount: 6,
    nightsCount: 5,
    startingPriceInr: 21500,
    startingPriceNote: '₹21,500 per person for small groups of 4-6 in a private vehicle. [CONFIRM PRICE] Rate adjusts based on room category and seasonal surge.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Detailed quotation provided within 15 minutes. Contact our Gangtok office for customized inclusions.',
    destinationsCovered: ['Gangtok', 'Mangan', 'Lachen', 'Thangu', 'Chopta Valley', 'Gurudongmar Lake', 'Kala Patthar', 'Lachung', 'Yumthang Valley', 'Zero Point'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Expedition Adventure',
    travelStyleCategory: 'High Altitude',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'October to November and April to May',
    permitRequirements: 'Protected Area Permit (PAP) for North Sikkim border zones. Original Voter ID or Passport + 6 passport photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with the District Magistrate and Indian Army. All permits remain subject to official approval and safe weather clearances.',
    roadAndWeatherNote: 'The road past Thangu crosses high moraine and loose gravel. During October-November, roads are dry and clear; in spring, melting snow can create slushy stretches requiring high ground clearance.',
    whoItSuits: ['Adventure seekers wanting to visit both remote high passes: Kala Patthar and Gurudongmar', 'Keen landscape photographers and seasoned travellers'],
    whoItDoesNotSuit: ['Travellers with asthma, cardiac history, or mobility challenges', 'Young children under 8 years'],
    altitudeAndHealthNote: 'This itinerary spends substantial time above 12,000 ft. Stay well hydrated with warm water and avoid sleeping immediately upon reaching high camp. Emergency oxygen cylinder is carried in the car.',
    disclosures: [
      'Kala Patthar visit involves a supplementary route diverging from Thangu; permits are subject to local checkpost conditions on the day.',
      'Strict ban on single-use plastic bottles across North Sikkim.',
      'Limited hot water hours at high-altitude hotels due to sub-zero pipe freezing.'
    ],
    mainInclusions: [
      'Protected Area Permit paperwork coordination',
      'Dedicated 4WD mountain SUV with experienced driver for 6 days',
      '5 Nights accommodation (3 Nights Gangtok, 1 Night Lachen, 1 Night Lachung)',
      'All meals in North Sikkim lodges + Daily breakfast in Gangtok',
      'Vehicle emergency oxygen cylinder kit'
    ],
    accommodationCategory: 'Deluxe Alpine Hotels with electric blanket facilities',
    transportDetails: 'Mahindra Scorpio 4WD or Tata Safari Storme with mountain commercial permit',
    mealsSummary: 'Breakfasts in Gangtok; full board (Breakfast, Lunch, Dinner) in Lachen and Lachung',
    inclusions: [
      'Dedicated private vehicle with fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '5 nights accommodation as per itinerary',
      'All meals during North Sikkim leg'
    ],
    exclusions: [
      'Airfare to Bagdogra Airport (IXB) or train fare to NJP',
      'Zero Point and Kala Patthar local union entry charges if applied',
      'Personal winter wear rentals at Yumthang / Lachen',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Snow sledging at Zero Point',
      'Visit to historic Lachen and Lachung wooden monasteries'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '6 passport size colour photos',
      'Heavy goose-down or windproof winter jacket, thermal underwear, waterproof gloves'
    ],
    seasonalAvailability: 'April to June and September to December. Not operated during July-August peak monsoon.',
    cancellationPolicy: 'Full credit or 80% refund up to 15 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The North Sikkim High Plateau & Glacial Valley Adventure is an immersive 6-day expedition engineered for travellers wanting to push deeper into the high Himalayan wilderness of North Sikkim. Beyond the iconic destinations of Gurudongmar Lake and Yumthang Valley, this route incorporates the dramatic black-rock snowfields of Kala Patthar near Thangu and the windswept frontier of Zero Point. With two buffer nights in Gangtok for acclimatization, dedicated 4x4 mountain transportation, and an experienced local mountain chauffeur, you will explore ancient pine forests, roaring glacial streams, and high-altitude desert plateaus under the watchful gaze of Mount Kangchengyao.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Arrival Bagdogra (IXB) / NJP to Gangtok',
        description: 'Pick up at Bagdogra Airport or NJP Railway Station. Journey up the scenic Teesta River gorge along NH-10 to Gangtok (5,410 ft). Check into hotel and attend trip orientation.',
        highlights: ['Teesta River gorge', 'Gangtok arrival', 'Evening briefing'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Bagdogra / NJP -> Sevoke -> Rangpo -> Gangtok',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Sevoke Kali Mandir view', 'Rangpo border crossing']
      },
      {
        day: 2,
        title: 'Gangtok to Lachen via Seven Sisters & Chungthang',
        description: 'Depart Gangtok at 09:00 AM. Pass through North Sikkim checkpoints at Mangan and stop at Seven Sisters Waterfall. Ascend through Chungthang to the mountain outpost of Lachen (9,000 ft).',
        highlights: ['Seven Sisters Waterfall', 'Chungthang confluence', 'Lachen valley views'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours (120 km)',
        sightseeing: ['Seven Sisters Falls', 'Singhik Viewpoint']
      },
      {
        day: 3,
        title: 'Gurudongmar Lake & Kala Patthar Excursion, Transfer to Lachung',
        description: 'Early morning 04:00 AM ascent to Gurudongmar Lake (17,800 ft). Continue towards the black scree snowline of Kala Patthar (14,800 ft) subject to road opening. Return to Lachen for lunch and transfer across Chungthang to Lachung (8,600 ft).',
        highlights: ['Gurudongmar Lake', 'Kala Patthar snowline', 'Lachung arrival'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachen -> Gurudongmar -> Kala Patthar -> Lachen -> Lachung',
        driveTime: '8 hours total driving',
        sightseeing: ['Thangu Valley', 'Gurudongmar Lake', 'Kala Patthar']
      },
      {
        day: 4,
        title: 'Yumthang Valley & Zero Point Exploration, Return to Gangtok',
        description: 'Drive to the alpine paradise of Yumthang Valley (11,800 ft) and continue to Zero Point (15,300 ft). Enjoy hot momos at Yumthang market, return to Lachung for lunch, and drive back to Gangtok for a warm evening.',
        highlights: ['Yumthang Valley of Flowers', 'Zero Point', 'Descent to Gangtok'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Yumthang -> Zero Point -> Lachung -> Gangtok',
        driveTime: '7 to 8 hours driving total',
        sightseeing: ['Yumthang Valley', 'Yumesamdong', 'Bheema Falls']
      },
      {
        day: 5,
        title: 'Relaxed Gangtok Local Sightseeing',
        description: 'A well-deserved recovery day in Gangtok. Visit Rumtek Monastery, Do Drul Chorten Stupa, and Namgyal Institute of Tibetology. Leisurely evening shopping along pedestrian MG Marg.',
        highlights: ['Rumtek Monastery', 'Tibetology Institute', 'MG Marg'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok city local circuit',
        driveTime: '2 to 3 hours total',
        sightseeing: ['Rumtek Monastery', 'Do Drul Chorten', 'Tashi Viewpoint']
      },
      {
        day: 6,
        title: 'Gangtok to Bagdogra / NJP Departure',
        description: 'After breakfast, transfer down from Gangtok to Bagdogra Airport (IXB) or NJP Railway Station for your departure flight or train.',
        highlights: ['Scenic descent', 'Departure'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> Bagdogra / NJP',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta Valley views']
      }
    ],
    faqs: [
      {
        question: 'What is Kala Patthar in North Sikkim?',
        answer: 'Kala Patthar is an offbeat snow viewpoint located near Thangu in North Sikkim at approximately 14,800 ft. It is renowned for its stark contrast of black cliff rock against brilliant white snow.'
      },
      {
        question: 'Is this trip suitable during winter (December to February)?',
        answer: 'December to February brings extreme snowfall to North Sikkim. While Lachung is usually accessible, Gurudongmar Lake and Zero Point may be blocked by snow. Contact us for real-time winter road status before booking.'
      },
      {
        question: 'Are credit cards or online payments accepted in Lachen or Lachung?',
        answer: 'No. Internet connectivity is extremely limited in North Sikkim and card swipe machines rarely work. Carry sufficient Indian cash for personal purchases, tea, and souvenirs.'
      },
      {
        question: 'Is it necessary to stay in Gangtok before heading to North Sikkim?',
        answer: 'Yes. An overnight stay in Gangtok is essential both for physical acclimatization and to process original identity documents with the Sikkim Tourism and Police permit desks.'
      }
    ],
    seo: {
      title: 'North Sikkim 6 Day Adventure Tour | Sikkim Tour Co.',
      metaDescription: 'Experience Gurudongmar Lake, Kala Patthar, Yumthang Valley, and Zero Point on a 6-day North Sikkim adventure tour from Gangtok. Private 4x4 SUVs, permits handled.',
      h1: 'North Sikkim High Plateau & Glacial Valley Tour (6D/5N)',
      primaryKeyword: 'North Sikkim adventure tour',
      secondaryKeywords: ['Kala Patthar Sikkim tour', 'Gurudongmar Zero Point package', 'North Sikkim 6 days itinerary'],
      suggestedInternalLinks: ['/destinations/gurudongmar-lake', '/destinations/yumthang-valley', '/packages']
    },
    schema: {
      touristTripName: 'North Sikkim High Plateau & Glacial Valley Adventure',
      description: 'A 6-day deep exploration of North Sikkim including Gurudongmar Lake, Kala Patthar, Yumthang Valley, and Zero Point.',
      itinerary: ['Day 1: Arrival to Gangtok', 'Day 2: Gangtok to Lachen', 'Day 3: Gurudongmar & Kala Patthar to Lachung', 'Day 4: Yumthang & Zero Point to Gangtok', 'Day 5: Gangtok local sights', 'Day 6: Gangtok departure'],
      offerPriceInr: 21500,
      faqs: [
        {
          question: 'What is Kala Patthar?',
          answer: 'A high-altitude snow viewpoint at 14,800 ft near Thangu featuring black rocks and snow.'
        },
        {
          question: 'Are credit cards accepted in North Sikkim?',
          answer: 'No, cash in INR is required due to limited network connectivity.'
        }
      ]
    }
  },

  // 5. Standard Trip (5N/6D)
  {
    id: 'high-altitude-lakes-and-valleys-expedition',
    slug: 'high-altitude-lakes-and-valleys-expedition',
    name: 'High-Altitude Lakes & Rhododendron Valleys Expedition',
    tagline: 'Expedition focused on Chopta Valley alpine meadows, Gurudongmar Lake, and Yumthang hot springs',
    duration: '6 days / 5 nights',
    daysCount: 6,
    nightsCount: 5,
    startingPriceInr: 20000,
    startingPriceNote: '₹20,000 per person based on 4 travellers sharing private 4WD vehicle. [CONFIRM PRICE] Varies with seasonal driver rates and chosen hotel grade.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Transparent pricing with no hidden checkpost charges. Contact our Gangtok office for dates and customized vehicle preferences.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachen', 'Chopta Valley', 'Gurudongmar Lake', 'Lachung', 'Yumthang Valley'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Nature & High Altitude Expedition',
    travelStyleCategory: 'Wildlife & Eco',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'April to June (peak rhododendron flowering) and October to November (crystal lakes)',
    permitRequirements: 'Protected Area Permit (PAP). Indian nationals only for Gurudongmar. Original Voter ID or Passport + 6 passport photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with the North District Administration and Army authorities. Weather and border conditions dictate permit issuance.',
    roadAndWeatherNote: 'Travel through North Sikkim involves traversing single-lane mountain roads along the Teesta valley. Landslides during rainfall can cause detours. NH-10 is the primary artery from Siliguri to Gangtok.',
    whoItSuits: ['Nature lovers keen on alpine botany and high-altitude wetland habitats', 'Active adults with good stamina'],
    whoItDoesNotSuit: ['Travellers requiring specialized medical equipment or dialysis', 'Unacclimatized toddlers under 5 years'],
    altitudeAndHealthNote: 'Ascending above 13,000 ft requires deliberate pacing. Drink plenty of warm water, avoid smoking and alcohol in Lachen, and report any shortness of breath to your mountain guide immediately.',
    disclosures: [
      'North Sikkim strictly enforces an eco-friendly ban on packaged plastic water bottles.',
      'Gurudongmar Lake is restricted to Indian nationals by Ministry of Home Affairs security regulations.',
      'Weather can shift rapidly at 17,800 ft; morning departure is mandatory.'
    ],
    mainInclusions: [
      'Protected Area Permit processing for North Sikkim',
      'Private 4WD SUV with experienced driver for 6 days',
      '5 Nights accommodation (3 Nights Gangtok, 1 Night Lachen, 1 Night Lachung)',
      'All meals during North Sikkim stay',
      'Emergency oxygen kit in vehicle'
    ],
    accommodationCategory: 'Boutique Mountain Lodges in Lachen and Lachung',
    transportDetails: 'Private Mahindra Scorpio 4x4 or Tata Sumo Gold with commercial hill driving license',
    mealsSummary: 'Breakfast in Gangtok; full board (Breakfast, Lunch, Dinner) in Lachen and Lachung',
    inclusions: [
      'Dedicated private vehicle with fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '5 nights accommodation as per itinerary',
      'All meals during North Sikkim leg'
    ],
    exclusions: [
      'Airfare or train fare to arrival hub',
      'Personal laundry, beverages, and tips',
      'Zero Point optional cab supplement',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Visit to Shingba Rhododendron Nature Trail',
      'Village cultural walk in Lachung'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '6 passport size colour photos',
      'Warm thermal layers, windproof fleece, and sturdy walking shoes'
    ],
    seasonalAvailability: 'Operational April through June and September through December.',
    cancellationPolicy: '80% refund up to 14 days prior; 50% refund up to 7 days prior; non-refundable within 6 days.',
    overview: 'This 6-day nature and high-altitude expedition is crafted for travellers who appreciate both the grandeur of alpine lakes and the delicate flora of Sikkim’s river sanctuaries. Starting with an arrival in Gangtok from NJP or Bagdogra, the route ascends past roaring cataracts to Lachen. An early morning drive through Chopta Valley—where meandering alpine streams cut through pine-fringed valleys—brings you to the sacred waters of Gurudongmar Lake. Crossing over to Lachung, you spend a full day immersed in the Yumthang Valley, famed for its 24 species of wild rhododendrons and natural sulphur hot springs.',
    detailedItinerary: [
      {
        day: 1,
        title: 'NJP / Bagdogra to Gangtok Mountain Transfer',
        description: 'Arrive at NJP Railway Station or Bagdogra Airport. Drive along the Teesta River climbing to Gangtok (5,410 ft). Rest and attend the high-altitude orientation.',
        highlights: ['Teesta Valley drive', 'Gangtok arrival'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'NJP / Bagdogra -> Sevoke -> Rangpo -> Gangtok',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Coronation Bridge', 'Rangpo checkpost']
      },
      {
        day: 2,
        title: 'Gangtok to Lachen via Mangan & Chungthang',
        description: 'Depart Gangtok at 09:00 AM. Stop at Seven Sisters Waterfalls and Singhik Viewpoint. Enjoy lunch in Chungthang before climbing to Lachen (9,000 ft).',
        highlights: ['Seven Sisters Falls', 'Singhik views', 'Lachen village'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours (120 km)',
        sightseeing: ['Seven Sisters Waterfall', 'Chungthang Confluence']
      },
      {
        day: 3,
        title: 'Chopta Valley & Gurudongmar Lake (17,800 ft), Transfer to Lachung',
        description: 'Depart at 04:00 AM for Gurudongmar Lake via Thangu and Chopta Valley. Spend time at the sacred lake, return to Lachen for lunch, and transfer across to Lachung (8,600 ft).',
        highlights: ['Chopta Valley meadows', 'Gurudongmar Lake', 'Lachung arrival'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachen -> Chopta Valley -> Gurudongmar -> Lachen -> Lachung',
        driveTime: '7 hours driving total',
        sightseeing: ['Chopta Valley', 'Gurudongmar Lake']
      },
      {
        day: 4,
        title: 'Yumthang Valley of Flowers & Hot Springs, Return to Gangtok',
        description: 'Morning excursion to Yumthang Valley (11,800 ft). Stroll the rhododendron sanctuary and visit the natural hot spring. Return to Lachung for lunch and descend to Gangtok.',
        highlights: ['Yumthang Valley', 'Hot Spring bridge', 'Descent to Gangtok'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Yumthang -> Lachung -> Chungthang -> Gangtok',
        driveTime: '7 hours driving total',
        sightseeing: ['Yumthang Valley', 'Naga Waterfalls']
      },
      {
        day: 5,
        title: 'Gangtok Monasteries & Scenic Viewpoints',
        description: 'Full day exploring Rumtek Monastery, Do Drul Chorten, Enchey Monastery, and Tashi Viewpoint. Leisurely evening on MG Marg.',
        highlights: ['Rumtek Monastery', 'Do Drul Chorten', 'Tashi Viewpoint'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok local circuit',
        driveTime: '2 to 3 hours',
        sightseeing: ['Rumtek Gompa', 'Do Drul Chorten', 'Enchey Gompa']
      },
      {
        day: 6,
        title: 'Gangtok to NJP / Bagdogra Departure',
        description: 'After breakfast, transfer down to NJP Railway Station or Bagdogra Airport for your journey home.',
        highlights: ['Scenic descent', 'Departure'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> Siliguri -> NJP / Bagdogra',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta River views']
      }
    ],
    faqs: [
      {
        question: 'What is Chopta Valley in North Sikkim known for?',
        answer: 'Chopta Valley is an alpine river valley situated between Lachen and Thangu at around 13,200 ft. It is famous for alpine meadows, rhododendrons, and meandering streams framed by snow peaks.'
      },
      {
        question: 'Are hot springs accessible at Yumthang?',
        answer: 'Yes, a pedestrian suspension bridge crosses the river at Yumthang to access a traditional sulphur hot spring bathhouse believed to have therapeutic mineral properties.'
      },
      {
        question: 'What vehicles are used on this expedition?',
        answer: 'We use high-clearance 4WD vehicles such as Mahindra Scorpio or Tata Sumo Gold with commercial hill permits and experienced local mountain drivers.'
      },
      {
        question: 'Can we visit this circuit during May?',
        answer: 'May is one of the best months for this tour, offering blooming rhododendrons in Yumthang and clear morning weather at Gurudongmar Lake.'
      }
    ],
    seo: {
      title: 'North Sikkim Lakes & Valleys Tour | Sikkim Tour Co.',
      metaDescription: '6-day high-altitude lakes and rhododendron valleys tour of North Sikkim. Visit Gurudongmar Lake, Chopta Valley, and Yumthang with private 4x4 transport.',
      h1: 'High-Altitude Lakes & Rhododendron Valleys Tour (6D/5N)',
      primaryKeyword: 'North Sikkim lakes tour',
      secondaryKeywords: ['Chopta Valley Gurudongmar tour', 'Yumthang hot spring package', 'North Sikkim 6 days package'],
      suggestedInternalLinks: ['/destinations/gurudongmar-lake', '/destinations/yumthang-valley', '/packages']
    },
    schema: {
      touristTripName: 'High-Altitude Lakes & Rhododendron Valleys Expedition',
      description: 'A 6-day nature and high-altitude expedition across Chopta Valley, Gurudongmar Lake, and Yumthang Valley in North Sikkim.',
      itinerary: ['Day 1: Arrival to Gangtok', 'Day 2: Gangtok to Lachen', 'Day 3: Chopta Valley & Gurudongmar to Lachung', 'Day 4: Yumthang Valley to Gangtok', 'Day 5: Gangtok local sights', 'Day 6: Gangtok departure'],
      offerPriceInr: 20000,
      faqs: [
        {
          question: 'What is Chopta Valley known for?',
          answer: 'Alpine meadows, rhododendrons, and meandering rivers at 13,200 ft.'
        },
        {
          question: 'Are hot springs accessible at Yumthang?',
          answer: 'Yes, natural sulphur hot springs are accessible via a river footbridge.'
        }
      ]
    }
  },

  // 6. Longer / Multi-region Trip (6N/7D - North + East)
  {
    id: 'north-and-east-sikkim-highland-circuit',
    slug: 'north-and-east-sikkim-highland-circuit',
    name: 'North & East Sikkim Highland Border Circuit',
    tagline: 'Combine sacred Tsomgo Lake and Nathu La Pass with the high-altitude wonders of North Sikkim',
    duration: '7 days / 6 nights',
    daysCount: 7,
    nightsCount: 6,
    startingPriceInr: 25500,
    startingPriceNote: '₹25,500 per person based on 4 travellers sharing private 4WD SUV. [CONFIRM PRICE] Rate changes during peak spring and autumn holiday weeks.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Covers all civilian and military permit paperwork across East and North Sikkim checkposts. Contact us for custom quotes.',
    destinationsCovered: ['Gangtok', 'Tsomgo Lake', 'Baba Mandir', 'Nathu La', 'Chungthang', 'Lachen', 'Gurudongmar Lake', 'Lachung', 'Yumthang Valley', 'Zero Point'],
    districtsCovered: ['East Sikkim', 'North Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Highland Border Circuit',
    travelStyleCategory: 'High Altitude',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'October to mid-December and April to May',
    permitRequirements: 'Protected Area Permits for both East Sikkim (Tsomgo/Nathu La) and North Sikkim (Lachen/Lachung). Original Voter ID or Passport + 8 passport photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with Sikkim Police and Indian Army checkposts. Nathu La Pass operates Wednesday to Sunday only and is subject to military quota; no clearance can be guaranteed in advance.',
    roadAndWeatherNote: 'Both the Jawaharlal Nehru Road (to Nathu La) and North Sikkim Highway are mountain arteries maintained by the BRO. Weather changes rapidly above 10,000 ft; rain or early snowfall may require route adjustments.',
    whoItSuits: ['Travellers wanting to see all major high-altitude border passes of Sikkim in one seamless journey', 'Adventure travellers with good mountain stamina'],
    whoItDoesNotSuit: ['Travellers with serious heart or lung conditions', 'Infants and toddlers below 5 years'],
    altitudeAndHealthNote: 'This tour crosses 12,000 ft on multiple days (Tsomgo, Gurudongmar, Zero Point). Pacing allows gradual adaptation, but travellers must remain hydrated and report headache or dizziness immediately.',
    disclosures: [
      'Nathu La Pass is closed on Mondays and Tuesdays for civilian visitors by military rule.',
      'Gurudongmar Lake and Nathu La Pass are strictly open to Indian citizens only.',
      'Single-use plastic bottles are banned in North Sikkim.'
    ],
    mainInclusions: [
      'All Protected Area Permit processing assistance (East & North Sikkim)',
      'Dedicated private 4x4 vehicle with driver for 7 days',
      '6 Nights accommodation (4 Nights Gangtok, 1 Night Lachen, 1 Night Lachung)',
      'All meals in North Sikkim + Breakfasts in Gangtok',
      'Vehicle emergency oxygen support kit'
    ],
    accommodationCategory: 'Deluxe Heritage & Alpine Lodges',
    transportDetails: 'Mahindra Scorpio 4WD or Toyota Innova Crysta with commercial mountain license',
    mealsSummary: 'Breakfasts in Gangtok; full board (Breakfast, Lunch, Dinner) in Lachen and Lachung',
    inclusions: [
      'All vehicle fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '6 nights accommodation as per itinerary',
      'All meals during North Sikkim leg'
    ],
    exclusions: [
      'Nathu La special permit surcharge if allocated by military quota',
      'Zero Point optional vehicle supplement',
      'Personal winter wear rentals and guide tips',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Yak ride along the shores of Tsomgo Lake',
      'Zero Point snow excursion from Yumthang Valley'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '8 passport size colour photos',
      'Warm thermal layers, windproof fleece, and sturdy walking shoes'
    ],
    seasonalAvailability: 'Operational from mid-September to mid-June. Peak snow months: January to March; Rhododendron bloom: April to May.',
    cancellationPolicy: '80% refund up to 15 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The North & East Sikkim Highland Border Circuit is a comprehensive 7-day expedition connecting the legendary border landmarks of East Sikkim with the remote glacial valleys of North Sikkim. Starting from Bagdogra or NJP, you base in Gangtok to ascend to glacial Tsomgo Lake (12,313 ft), Baba Mandir, and the historic Indo-China trade gate at Nathu La (14,140 ft). You then venture north through dramatic Teesta river canyons to Lachen (9,000 ft) for the morning ascent to holy Gurudongmar Lake at 17,800 ft. Crossing to Lachung, you explore Yumthang Valley of Flowers and Zero Point before returning to Gangtok. It is the definitive high-altitude circuit of Sikkim.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Bagdogra (IXB) / NJP to Gangtok',
        description: 'Meet driver at Bagdogra Airport or NJP Station. Drive along NH-10 ascending to Gangtok (5,410 ft). Check into hotel and review permit documentation.',
        highlights: ['Teesta River gorge', 'Gangtok arrival'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Bagdogra / NJP -> Rangpo -> Gangtok',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Coronation Bridge', 'Rangpo checkpost']
      },
      {
        day: 2,
        title: 'Tsomgo Lake, Baba Mandir & Nathu La Pass (14,140 ft)',
        description: 'Depart Gangtok at 07:30 AM on the historic Jawaharlal Nehru Road. Ascend to glacial Tsomgo Lake (12,313 ft). Proceed to Baba Harbhajan Mandir (13,100 ft) and onwards to Nathu La Pass (subject to Army permit and Wednesday-Sunday schedule). Return to Gangtok by late afternoon.',
        highlights: ['Glacial Tsomgo Lake', 'Baba Mandir memorial', 'Nathu La Pass border gate'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Tsomgo Lake -> Nathu La -> Gangtok',
        driveTime: '5 hours driving total (100 km)',
        sightseeing: ['Tsomgo Lake', 'Baba Mandir', 'Nathu La Pass']
      },
      {
        day: 3,
        title: 'Gangtok to Lachen Highland Village',
        description: 'Depart Gangtok at 09:30 AM for North Sikkim. Pass Seven Sisters Waterfall and Mangan. Lunch at Chungthang and climb through pine forests to Lachen (9,000 ft).',
        highlights: ['Seven Sisters Falls', 'Chungthang confluence', 'Lachen village'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours (120 km)',
        sightseeing: ['Seven Sisters Waterfall', 'Chungthang Confluence']
      },
      {
        day: 4,
        title: 'Gurudongmar Lake (17,800 ft) Excursion & Transfer to Lachung',
        description: 'Early 04:00 AM departure past Thangu military post to sacred Gurudongmar Lake (17,800 ft). Spend time at the sacred lake, return to Lachen for lunch, and transfer across to Lachung (8,600 ft).',
        highlights: ['Gurudongmar Lake', 'Thangu Valley', 'Lachung arrival'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachen -> Gurudongmar -> Lachen -> Chungthang -> Lachung',
        driveTime: '7 hours driving total',
        sightseeing: ['Thangu Valley', 'Gurudongmar Lake']
      },
      {
        day: 5,
        title: 'Yumthang Valley & Zero Point, Return to Gangtok',
        description: 'Morning excursion to Yumthang Valley (11,800 ft) and Zero Point (15,300 ft). Return to Lachung for hot lunch and drive back down to Gangtok.',
        highlights: ['Yumthang Valley of Flowers', 'Zero Point', 'Descent to Gangtok'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Yumthang -> Lachung -> Chungthang -> Gangtok',
        driveTime: '7 hours driving total',
        sightseeing: ['Yumthang Valley', 'Naga Waterfalls']
      },
      {
        day: 6,
        title: 'Gangtok Heritage & Rumtek Monastery',
        description: 'Relaxed day visiting Rumtek Monastery (Dharma Chakra Centre), Do Drul Chorten Stupa, and Namgyal Institute of Tibetology. Evening shopping along MG Marg.',
        highlights: ['Rumtek Monastery', 'Tibetology Institute', 'MG Marg stroll'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok local circuit',
        driveTime: '2 hours total',
        sightseeing: ['Rumtek Gompa', 'Do Drul Chorten']
      },
      {
        day: 7,
        title: 'Gangtok to Bagdogra / NJP Departure',
        description: 'After breakfast, depart Gangtok descending along the Teesta valley to Bagdogra Airport (IXB) or NJP Railway Station for your return flight or train.',
        highlights: ['Scenic descent', 'Departure'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> Siliguri -> Bagdogra / NJP',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta Valley views']
      }
    ],
    faqs: [
      {
        question: 'Which days is Nathu La Pass open for tourists?',
        answer: 'Nathu La Pass is open for Indian civilian tourists from Wednesday to Sunday only. It is closed on Mondays and Tuesdays by the Indian Army.'
      },
      {
        question: 'Is it safe to visit both Tsomgo Lake and Gurudongmar Lake in one trip?',
        answer: 'Yes, because the itinerary places Tsomgo Lake (12,313 ft) on Day 2 as an acclimatization ascent before visiting Gurudongmar Lake (17,800 ft) on Day 4.'
      },
      {
        question: 'What happens if Nathu La permit is not issued due to quota limit?',
        answer: 'Nathu La permits are issued under a strict daily government quota. If the quota is full or the pass is closed by the Army, you still visit Tsomgo Lake and Baba Mandir.'
      },
      {
        question: 'What clothing should I carry for this 7-day trip?',
        answer: 'Carry thermal innerwear, fleece layers, a heavy down jacket, woolen socks, gloves, and a warm beanie, as temperatures at Nathu La and Gurudongmar can be below freezing.'
      }
    ],
    seo: {
      title: 'North & East Sikkim 7 Day Tour | Sikkim Tour Co.',
      metaDescription: '7-day North & East Sikkim tour package covering Tsomgo Lake, Nathu La Pass, Gurudongmar Lake, and Yumthang Valley. Private 4x4 SUVs, permits handled.',
      h1: 'North & East Sikkim Highland Border Tour (7D/6N)',
      primaryKeyword: 'North and East Sikkim tour',
      secondaryKeywords: ['Tsomgo Gurudongmar tour package', 'Nathu La North Sikkim 7 days', 'Sikkim high altitude border circuit'],
      suggestedInternalLinks: ['/destinations/tsomgo-lake', '/destinations/gurudongmar-lake', '/packages']
    },
    schema: {
      touristTripName: 'North & East Sikkim Highland Border Circuit',
      description: 'A 7-day border circuit combining East Sikkim high passes (Tsomgo, Nathu La) with North Sikkim glacial valleys (Gurudongmar, Yumthang).',
      itinerary: ['Day 1: Arrival to Gangtok', 'Day 2: Tsomgo Lake & Nathu La', 'Day 3: Gangtok to Lachen', 'Day 4: Gurudongmar to Lachung', 'Day 5: Yumthang to Gangtok', 'Day 6: Gangtok local sights', 'Day 7: Gangtok departure'],
      offerPriceInr: 25500,
      faqs: [
        {
          question: 'Which days is Nathu La open?',
          answer: 'Wednesday to Sunday only, closed on Mondays and Tuesdays.'
        },
        {
          question: 'Are permits handled by the operator?',
          answer: 'Yes, we handle all permit paperwork across checkposts.'
        }
      ]
    }
  },

  // 7. Longer / Multi-region Trip (7N/8D - North + West)
  {
    id: 'north-and-west-sikkim-alpine-explorer',
    slug: 'north-and-west-sikkim-alpine-explorer',
    name: 'North & West Sikkim Alpine Grand Explorer',
    tagline: 'From the glacial lakes of Gurudongmar to the historic royal monasteries and Kanchenjunga views of Pelling',
    duration: '8 days / 7 nights',
    daysCount: 8,
    nightsCount: 7,
    startingPriceInr: 29500,
    startingPriceNote: '₹29,500 per person based on 4 travellers sharing private transport. [CONFIRM PRICE] Varies with hotel category and seasonal vehicle pricing.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Includes dedicated private 4x4 transport, all permits, and meals in North Sikkim. Send an enquiry for exact quote.',
    destinationsCovered: ['Gangtok', 'Lachen', 'Gurudongmar Lake', 'Lachung', 'Yumthang Valley', 'Ravangla', 'Pelling', 'Pemayangtse', 'Rabdentse'],
    districtsCovered: ['North Sikkim', 'East Sikkim', 'West Sikkim', 'South Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Cross-District Expedition',
    travelStyleCategory: 'High Altitude',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '4,500 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'October to December and March to May',
    permitRequirements: 'Protected Area Permit (PAP) for North Sikkim. Original Voter ID or Passport + 6 passport-size photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with North District authorities. West Sikkim does not require PAP for Indian tourists.',
    roadAndWeatherNote: 'The connection between North Sikkim and West Sikkim passes through the central mountain spine via Chungthang, Mangan, and Ravangla. Road conditions vary seasonally; NH-10 connects to Gangtok.',
    whoItSuits: ['Travellers wanting to combine the wild tundra of North Sikkim with the cultural heritage and Kanchenjunga panoramas of West Sikkim', 'Families with active older children'],
    whoItDoesNotSuit: ['Travellers uncomfortable with mountain drives exceeding 5 to 6 hours on transition days', 'Frail seniors with mobility impairments'],
    altitudeAndHealthNote: 'The high-altitude peak occurs on Day 3 at Gurudongmar (17,800 ft), following which the tour descends into comfortable altitudes at Pelling (6,800 ft). Hydration and warm clothing are essential during the North leg.',
    disclosures: [
      'North Sikkim requires separate commercial vehicle permits from local taxi unions.',
      'Gurudongmar Lake is restricted to Indian nationals by Ministry of Home Affairs rules.',
      'Hotels in Pelling offer superior heating and amenities compared to remote Lachen lodges.'
    ],
    mainInclusions: [
      'North Sikkim Protected Area Permit coordination',
      'Dedicated private vehicle (Scorpio / Innova) throughout 8 days',
      '7 Nights accommodation (2N Gangtok, 1N Lachen, 1N Lachung, 2N Pelling, 1N Ravangla)',
      'All meals during North Sikkim stay + Daily breakfasts elsewhere',
      'High-altitude oxygen kit in vehicle'
    ],
    accommodationCategory: 'Heritage Resorts in Pelling & Gangtok; Deluxe Lodges in North Sikkim',
    transportDetails: 'Mahindra Scorpio 4WD or Toyota Innova with experienced Sikkim hill driver',
    mealsSummary: 'Breakfasts in Gangtok, Ravangla, and Pelling; full board in Lachen and Lachung',
    inclusions: [
      'All vehicle fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '7 nights accommodation as per itinerary',
      'All meals during North Sikkim leg'
    ],
    exclusions: [
      'Airfare to Bagdogra / train fare to NJP',
      'Entry tickets at Pelling Skywalk, Rabdentse ruins, or monasteries',
      'Zero Point optional cab supplement',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Walking across the glass Skywalk in Pelling',
      'Sound and Light Show at Rabdentse Ruins'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '6 passport size colour photos',
      'Warm thermal layers, windproof fleece, and sturdy walking shoes'
    ],
    seasonalAvailability: 'Operational from mid-September to mid-June. Peak snow months: January to March; Rhododendron bloom: April to May.',
    cancellationPolicy: '80% refund up to 15 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The North & West Sikkim Alpine Grand Explorer is an ambitious 8-day itinerary connecting two contrasting worlds of Sikkim: the raw, glaciated frontier of North Sikkim and the serene, historic monasteries of West Sikkim. Commencing from NJP or Bagdogra, you travel via Gangtok to Lachen to witness holy Gurudongmar Lake at 17,800 ft and Yumthang Valley in Lachung. Descending southward across the mountain divide, you visit the iconic 130-ft Buddha Park at Ravangla before settling in Pelling, where premier heritage monasteries like Pemayangtse and the royal ruins of Rabdentse sit framed against Mount Kanchenjunga.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Arrival NJP / Bagdogra to Gangtok',
        description: 'Meet chauffeur at NJP Station or Bagdogra Airport. Drive along NH-10 ascending to Gangtok (5,410 ft). Evening permit briefing and leisure stroll on MG Marg.',
        highlights: ['Teesta River drive', 'Gangtok arrival'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'NJP / Bagdogra -> Rangpo -> Gangtok',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Coronation Bridge', 'Rangpo checkpost']
      },
      {
        day: 2,
        title: 'Gangtok to Lachen Highland Village',
        description: 'Depart Gangtok at 09:30 AM. Drive past Seven Sisters Waterfall and Singhik viewpoint. Stop at Chungthang and proceed up the Lachen valley to Lachen (9,000 ft).',
        highlights: ['Seven Sisters Waterfall', 'Chungthang confluence', 'Lachen village'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours (120 km)',
        sightseeing: ['Seven Sisters Falls', 'Singhik Viewpoint']
      },
      {
        day: 3,
        title: 'Gurudongmar Lake (17,800 ft) Excursion & Transfer to Lachung',
        description: 'Early 04:00 AM departure to Gurudongmar Lake via Thangu. Marvel at the sacred turquoise waters, return to Lachen for lunch, and transfer across to Lachung (8,600 ft).',
        highlights: ['Gurudongmar Lake', 'Thangu Valley', 'Lachung arrival'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachen -> Gurudongmar -> Lachen -> Chungthang -> Lachung',
        driveTime: '7 hours driving total',
        sightseeing: ['Thangu Valley', 'Gurudongmar Lake']
      },
      {
        day: 4,
        title: 'Yumthang Valley Excursion & Drive to Gangtok',
        description: 'Morning excursion to Yumthang Valley of Flowers (11,800 ft). Return to Lachung for hot lunch and drive back down to Gangtok for an overnight stay.',
        highlights: ['Yumthang Valley', 'Shingba Sanctuary', 'Descent to Gangtok'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Yumthang -> Lachung -> Chungthang -> Gangtok',
        driveTime: '7 hours driving total',
        sightseeing: ['Yumthang Valley', 'Naga Waterfalls']
      },
      {
        day: 5,
        title: 'Gangtok to Ravangla (Buddha Park) & Pelling',
        description: 'Depart Gangtok heading south-west. Stop at Ravangla to visit the monumental 130-ft golden statue of Buddha Park set against Mount Narsing. Continue through scenic pine ridges into Pelling (6,800 ft).',
        highlights: ['Buddha Park of Ravangla', 'South Sikkim tea ridges', 'Pelling Kanchenjunga views'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Pelling (Inside West Sikkim)',
        route: 'Gangtok -> Singtam -> Ravangla -> Pelling',
        driveTime: '5 hours (115 km)',
        sightseeing: ['Buddha Park', 'Ralang Monastery view']
      },
      {
        day: 6,
        title: 'Pelling Heritage & Kanchenjunga Vistas',
        description: 'Early morning sunrise view over Mount Kanchenjunga from your hotel. Visit 1705 Pemayangtse Monastery, walk the ancient stone pathway to Rabdentse Royal Ruins, and experience the Pelling Skywalk.',
        highlights: ['Pemayangtse Monastery', 'Rabdentse Palace ruins', 'Pelling Skywalk'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Pelling (Inside West Sikkim)',
        route: 'Pelling local circuit',
        driveTime: '2 hours total',
        sightseeing: ['Pemayangtse Gompa', 'Rabdentse Ruins', 'Chenrezig Skywalk']
      },
      {
        day: 7,
        title: 'Khecheopalri Lake & Kanchenjunga Falls',
        description: 'Excursion to sacred wish-fulfilling Khecheopalri Lake, venerated by both Buddhists and Hindus. Continue to roaring Kanchenjunga Falls and Rimbi Orange Garden. Return to Pelling for sunset.',
        highlights: ['Sacred Khecheopalri Lake', 'Kanchenjunga Falls', 'Rimbi River'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Pelling (Inside West Sikkim)',
        route: 'Pelling -> Khecheopalri -> Kanchenjunga Falls -> Pelling',
        driveTime: '3.5 hours total (65 km)',
        sightseeing: ['Khecheopalri Lake', 'Kanchenjunga Falls', 'Rimbi River']
      },
      {
        day: 8,
        title: 'Pelling to NJP / Bagdogra Departure',
        description: 'After breakfast, descend from Pelling along the Rangit and Teesta river valleys past Jorethang and Melli to NJP Railway Station or Bagdogra Airport.',
        highlights: ['Rangit River valley', 'Departure'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Pelling (Inside West Sikkim)',
        route: 'Pelling -> Legship -> Jorethang -> Melli -> NJP / Bagdogra',
        driveTime: '5 hours (135 km)',
        sightseeing: ['Rangit River confluence', 'Tea estate foothills']
      }
    ],
    faqs: [
      {
        question: 'Does this tour cover both high altitude and heritage destinations?',
        answer: 'Yes, this package offers the best of both: the high-altitude glacial lakes of North Sikkim and the royal Buddhist heritage monasteries of West Sikkim.'
      },
      {
        question: 'How is the road between Gangtok, Ravangla, and Pelling?',
        answer: 'The road between Gangtok, Ravangla, and Pelling is a scenic, paved hill highway offering panoramic views of valleys and tea gardens.'
      },
      {
        question: 'Can we see Mount Kanchenjunga from Pelling?',
        answer: 'Pelling offers some of the closest and most magnificent sunrise views of Mount Kanchenjunga (28,169 ft) anywhere in Sikkim, particularly from October to December.'
      },
      {
        question: 'Are permits needed for Pelling in West Sikkim?',
        answer: 'Indian nationals do not require special permits for Pelling. Only North Sikkim requires Protected Area Permits (PAP), which we process in Gangtok.'
      }
    ],
    seo: {
      title: 'North & West Sikkim 8 Day Tour | Sikkim Tour Co.',
      metaDescription: '8-day North & West Sikkim tour package covering Gurudongmar Lake, Yumthang Valley, Ravangla Buddha Park, and Pelling. Private transport, permits handled.',
      h1: 'North & West Sikkim Alpine Grand Explorer (8D/7N)',
      primaryKeyword: 'North and West Sikkim tour',
      secondaryKeywords: ['Gurudongmar and Pelling package', 'North Sikkim and Pelling 8 days', 'Sikkim cross district tour'],
      suggestedInternalLinks: ['/destinations/gurudongmar-lake', '/destinations/pelling', '/packages']
    },
    schema: {
      touristTripName: 'North & West Sikkim Alpine Grand Explorer',
      description: 'An 8-day grand journey connecting the high-altitude wonders of North Sikkim with the royal monasteries of West Sikkim.',
      itinerary: ['Day 1: Arrival to Gangtok', 'Day 2: Gangtok to Lachen', 'Day 3: Gurudongmar to Lachung', 'Day 4: Yumthang to Gangtok', 'Day 5: Gangtok to Pelling via Ravangla', 'Day 6: Pelling heritage sights', 'Day 7: Khecheopalri Lake & waterfalls', 'Day 8: Pelling departure'],
      offerPriceInr: 29500,
      faqs: [
        {
          question: 'Does this tour cover both lakes and monasteries?',
          answer: 'Yes, it covers Gurudongmar Lake, Yumthang Valley, Buddha Park, and Pemayangtse Monastery.'
        },
        {
          question: 'Are permits needed for Pelling?',
          answer: 'No, permits are only required for the North Sikkim portion.'
        }
      ]
    }
  },

  // 8. Honeymoon / Romantic (4N/5D)
  {
    id: 'north-sikkim-honeymoon-rhododendron-retreat',
    slug: 'north-sikkim-honeymoon-rhododendron-retreat',
    name: 'North Sikkim Rhododendron Honeymoon Retreat',
    tagline: 'Romantic mountain hideaway in pine-forested Lachung with candlelit dining and Yumthang Valley vistas',
    duration: '5 days / 4 nights',
    daysCount: 5,
    nightsCount: 4,
    startingPriceInr: 22000,
    startingPriceNote: '₹22,000 per person based on a couple travelling in a private luxury SUV with premium suite accommodations. [CONFIRM PRICE]',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Includes premium room upgrades, candlelit dinner in Gangtok, and private vehicle throughout.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachung', 'Yumthang Valley'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Romantic Mountain Luxury',
    travelStyleCategory: 'Honeymoon & Luxury',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 11,800 ft',
    maxAltitude: '11,800 ft (Yumthang Valley)',
    difficulty: 'easy',
    fitnessLevel: 'Easy',
    bestMonths: 'October to December and March to May',
    permitRequirements: 'Protected Area Permit (PAP) for Lachung and Yumthang Valley. Original Voter ID or Passport + 4 passport photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with North District authorities in Gangtok. Permits are subject to government checkpost clearances.',
    roadAndWeatherNote: 'The road passes through scenic waterfalls and pine gorges along the Teesta River. Pacing is unhurried with comfortable stops; NH-10 connects to Gangtok.',
    whoItSuits: ['Honeymooners and couples seeking mountain privacy, crisp air, and dramatic snow landscapes', 'Anniversary travellers'],
    whoItDoesNotSuit: ['Travellers seeking loud nightlife or shopping malls', 'Couples expecting 5-star city amenities in remote Lachung'],
    altitudeAndHealthNote: 'Altitude is kept to a comfortable 8,600 ft in Lachung and 11,800 ft in Yumthang, completely avoiding the strenuous 17,800 ft Gurudongmar climb. Mild acclimatization is built into Gangtok stays.',
    disclosures: [
      'Lachung boutique properties offer charming wooden architecture and heating, but mountain village power cuts can occur occasionally.',
      'Single-use plastic bottles are banned in North Sikkim.'
    ],
    mainInclusions: [
      'North Sikkim Protected Area Permit processing assistance',
      'Dedicated private Toyota Innova Crysta for all 5 days',
      '4 Nights boutique accommodation (2N Gangtok, 2N Lachung)',
      '1 Romantic candlelit dinner with local fruit wine in Gangtok',
      'All meals in Lachung'
    ],
    accommodationCategory: 'Premium Mountain Cottages & Heritage Suites',
    transportDetails: 'Private Toyota Innova Crysta with luxury captain seats and professional mountain chauffeur',
    mealsSummary: 'Breakfasts in Gangtok; full board in Lachung; 1 special candlelit dinner included',
    inclusions: [
      'Dedicated private vehicle with fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '4 nights accommodation as per itinerary',
      'Meals as specified'
    ],
    exclusions: [
      'Airfare or train tickets',
      'Personal beverages, laundry, and guide gratuities',
      'Zero Point optional vehicle supplement',
      'Travel insurance'
    ],
    optionalActivities: [
      'Private couple picnic beside Yumthang River',
      'Traditional Sikkimese dress photoshoot in Lachung'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '4 passport size colour photos',
      'Warm jackets, shawls, and comfortable walking boots'
    ],
    seasonalAvailability: 'September to June. Spring brings rhododendron blooms; autumn offers clear mountain sunrises.',
    cancellationPolicy: 'Full credit or 80% refund up to 15 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The North Sikkim Rhododendron Honeymoon Retreat is an unhurried, romantic 5-day escape designed specifically for couples. Consciously omitting the grueling early-morning 17,800 ft climb to Gurudongmar, this itinerary focuses on the cozy, pine-clad valley of Lachung at 8,600 ft. Stay in handcrafted wooden mountain cottages with panoramic valley views, wake up to snow peaks glowing with sunrise alpenglow, and take leisurely private walks through the rhododendron meadows of Yumthang Valley. With dedicated Innova Crysta transport, a candlelit dinner in Gangtok, and seamless permit coordination, this retreat balances mountain adventure with intimacy.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Arrival Bagdogra / NJP to Gangtok Luxury Stay',
        description: 'Private airport greeting at Bagdogra Airport (IXB). Ascend along the Teesta River into Gangtok. Check into your boutique heritage suite. Evening private dinner overlooking the Gangtok valley.',
        highlights: ['Private arrival transfer', 'Heritage hotel check-in', 'Romantic dinner'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Bagdogra -> Rangpo -> Gangtok',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta Valley views', 'MG Marg evening walk']
      },
      {
        day: 2,
        title: 'Scenic Drive to Lachung Alpine Valley',
        description: 'Depart Gangtok at 10:00 AM on an unhurried drive. Stop at Singhik viewpoint and Naga Waterfall. Savor hot lunch in Chungthang before arriving at your riverside cottage in Lachung (8,600 ft). Spend a cozy evening by the bukhari wood stove.',
        highlights: ['Singhik viewpoint', 'Naga Waterfall', 'Lachung cottage check-in'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachung',
        driveTime: '6 hours (120 km)',
        sightseeing: ['Seven Sisters Waterfall', 'Chungthang Confluence']
      },
      {
        day: 3,
        title: 'Yumthang Valley of Flowers & Hot Springs',
        description: 'Leisurely 08:30 AM departure to Yumthang Valley (11,800 ft). Stroll hand-in-hand along the wooden bridges and meadow paths of Shingba Rhododendron Sanctuary. Visit the natural hot springs and enjoy a warm picnic lunch before returning to Lachung.',
        highlights: ['Yumthang Valley meadows', 'Hot springs footbridge', 'Romantic photography'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachung -> Yumthang Valley -> Lachung',
        driveTime: '3 hours round trip',
        sightseeing: ['Yumthang Valley', 'Shingba Sanctuary']
      },
      {
        day: 4,
        title: 'Lachung to Gangtok & Candlelit Evening',
        description: 'After breakfast in Lachung, begin the scenic return drive to Gangtok. Check into your luxury Gangtok resort. In the evening, enjoy a curated 4-course candlelit dinner with a complimentary bottle of local Himalayan fruit wine.',
        highlights: ['Scenic descent', 'Gangtok luxury resort', 'Candlelit 4-course dinner'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Chungthang -> Mangan -> Gangtok',
        driveTime: '6 hours (120 km)',
        sightseeing: ['Bheema Falls', 'Singhik Valley']
      },
      {
        day: 5,
        title: 'Gangtok Departure Transfer',
        description: 'Enjoy a leisurely breakfast on the garden terrace. Private transfer down to Bagdogra Airport (IXB) or NJP Railway Station for your return flight or train.',
        highlights: ['Garden breakfast', 'Private airport drop'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> Bagdogra / NJP',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta River gorge']
      }
    ],
    faqs: [
      {
        question: 'Why does this honeymoon package avoid Gurudongmar Lake?',
        answer: 'Gurudongmar Lake requires waking up at 3:30 AM, driving over rough military gravel at 17,800 ft, and carries significant risk of altitude headache. This honeymoon package prioritizes comfort, romantic pacing, and scenic beauty in Lachung and Yumthang.'
      },
      {
        question: 'What heating is provided in Lachung cottages?',
        answer: 'Our handpicked honeymoon partner cottages in Lachung provide electric bed warmers, heavy down quilts, and traditional bukhari wood heaters or room blowers.'
      },
      {
        question: 'Can we add Zero Point if we feel energetic?',
        answer: 'Yes. If you wish to visit Zero Point on Day 3, your driver can arrange the checkpost extension locally on the morning of travel.'
      },
      {
        question: 'Are private vehicles provided throughout?',
        answer: 'Yes, a private Toyota Innova Crysta is dedicated exclusively to you and your partner from arrival to departure.'
      }
    ],
    seo: {
      title: 'North Sikkim Honeymoon Tour Package | Sikkim Tour Co.',
      metaDescription: 'Romantic 5-day North Sikkim honeymoon package to Lachung and Yumthang Valley. Private Innova Crysta, boutique mountain cottage, candlelit dinner in Gangtok.',
      h1: 'North Sikkim Rhododendron Honeymoon Retreat (5D/4N)',
      primaryKeyword: 'North Sikkim honeymoon package',
      secondaryKeywords: ['Lachung honeymoon trip', 'Sikkim romantic tour', 'Yumthang Valley couple package'],
      suggestedInternalLinks: ['/destinations/yumthang-valley', '/stays', '/packages']
    },
    schema: {
      touristTripName: 'North Sikkim Rhododendron Honeymoon Retreat',
      description: 'A romantic 5-day honeymoon retreat to Lachung and Yumthang Valley with boutique cottage stays and candlelit dining.',
      itinerary: ['Day 1: Arrival to Gangtok', 'Day 2: Gangtok to Lachung', 'Day 3: Yumthang Valley & hot springs', 'Day 4: Lachung to Gangtok with candlelit dinner', 'Day 5: Gangtok departure'],
      offerPriceInr: 22000,
      faqs: [
        {
          question: 'Is private transport provided?',
          answer: 'Yes, a private Toyota Innova Crysta is provided throughout.'
        },
        {
          question: 'Why avoid Gurudongmar on a honeymoon?',
          answer: 'To ensure a comfortable, romantic pace without the 3:30 AM sub-zero start.'
        }
      ]
    }
  },

  // 9. Family / Senior-friendly (4N/5D)
  {
    id: 'lachung-yumthang-valley-family-comfort',
    slug: 'lachung-yumthang-valley-family-comfort',
    name: 'Lachung & Yumthang Valley Family Comfort Tour',
    tagline: 'Gentle, well-paced North Sikkim family tour capped at comfortable altitudes with spacious vehicles',
    duration: '5 days / 4 nights',
    daysCount: 5,
    nightsCount: 4,
    startingPriceInr: 15500,
    startingPriceNote: '₹15,500 per person based on a family of 4 travelling together. [CONFIRM PRICE] Varies with child policy and hotel room configuration.',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Kid-friendly meals, gentle driving hours, and spacious seating. Enquire for customized family quotations.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachung', 'Yumthang Valley'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Family Mountain Vacation',
    travelStyleCategory: 'Family & Soft Adventure',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 11,800 ft',
    maxAltitude: '11,800 ft (Yumthang Valley)',
    difficulty: 'easy',
    fitnessLevel: 'Easy',
    bestMonths: 'April to June and October to December',
    permitRequirements: 'Protected Area Permit (PAP). Original Voter ID / Passport for adults; Birth Certificate + school ID for children under 18. Four passport photos per person. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle all permit paperwork in Gangtok. Permits are issued at the discretion of local administration and army authorities.',
    roadAndWeatherNote: 'Frequent rest stops and hydration breaks are scheduled along the Teesta River highway to prevent travel fatigue for children and seniors.',
    whoItSuits: ['Families with school-age children and active grandparents', 'Travellers who want scenic snow without strenuous altitude climbs'],
    whoItDoesNotSuit: ['Infants under 2 years of age', 'Adventure travellers seeking extreme off-road trekking'],
    altitudeAndHealthNote: 'Altitude is capped at Yumthang (11,800 ft), avoiding the extreme 17,800 ft Gurudongmar heights. Lachung (8,600 ft) is well tolerated with warm clothing and gentle walking.',
    disclosures: [
      'Single-use plastic bottles are legally prohibited in North Sikkim; children should carry personal insulated bottles.',
      'Medical facilities in Lachung are basic army and primary health centers; carry your family’s routine prescriptions.'
    ],
    mainInclusions: [
      'Protected Area Permit paperwork processing assistance',
      'Dedicated comfortable vehicle (Innova Crysta or Scorpio) with patient driver',
      '4 Nights family accommodation (2N Gangtok, 2N Lachung)',
      'All meals in Lachung + Breakfasts in Gangtok',
      'First aid and high-altitude emergency kit'
    ],
    accommodationCategory: 'Family-Friendly Deluxe Mountain Hotels with heater facilities',
    transportDetails: 'Toyota Innova Crysta or Mahindra Scorpio with extra luggage space and experienced family driver',
    mealsSummary: 'Breakfasts in Gangtok; wholesome home-cooked buffet meals (B, L, D) in Lachung with non-spicy options for kids',
    inclusions: [
      'Dedicated private vehicle with fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '4 nights accommodation as per itinerary',
      'Meals as specified'
    ],
    exclusions: [
      'Airfare or train tickets',
      'Zero Point optional extension',
      'Personal laundry, beverages, and guide tips',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Yak photography for children at Yumthang',
      'Visit to Lachung Handicraft Centre'
    ],
    travelRequirements: [
      'Original Voter ID or Passport for adults; Birth Certificate & School ID for minors',
      '4 passport size colour photos per family member',
      'Warm layered clothing, thermals, gloves, and ear muffs for kids'
    ],
    seasonalAvailability: 'Operational from mid-September to mid-June. Peak snow months: January to March; Rhododendron bloom: April to May.',
    cancellationPolicy: '80% refund up to 14 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The Lachung & Yumthang Valley Family Comfort Tour is thoughtfully engineered for families travelling with children or senior parents. Understanding that extreme high-altitude climbs can cause acute stress, this itinerary completely bypasses the strenuous 17,800 ft Gurudongmar route, focusing instead on the gentle, fairy-tale landscape of Lachung at 8,600 ft. Children and seniors can comfortably stroll through the gentle alpine meadows of Yumthang Valley (11,800 ft), dip their fingers in warm sulphur hot springs, and watch grazing yaks against a backdrop of snow-capped mountains. With spacious Innova Crysta transport, patient drivers, and kid-friendly meals, your family enjoys North Sikkim in complete safety.',
    detailedItinerary: [
      {
        day: 1,
        title: 'NJP / Bagdogra to Gangtok with Rest Stops',
        description: 'Meet your mountain chauffeur at NJP Station or Bagdogra Airport. Drive along the Teesta River with scheduled rest stops at Melli and Rangpo. Arrive in Gangtok and check into your family suite. Evening at leisure on pedestrian MG Marg.',
        highlights: ['Comfortable transfer', 'Teesta views', 'MG Marg family stroll'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'NJP / Bagdogra -> Rangpo -> Gangtok',
        driveTime: '5 hours (125 km)',
        sightseeing: ['Coronation Bridge view', 'Rangpo garden']
      },
      {
        day: 2,
        title: 'Gangtok to Lachung Valley',
        description: 'Depart Gangtok at 10:00 AM after breakfast. Stop at Seven Sisters Waterfall where children can view the cascading tiers. Enjoy lunch in Chungthang and drive up to Lachung (8,600 ft). Check into your heated lodge and relax.',
        highlights: ['Seven Sisters Waterfall', 'Singhik views', 'Lachung arrival'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachung',
        driveTime: '6 hours (120 km)',
        sightseeing: ['Seven Sisters Falls', 'Chungthang Confluence']
      },
      {
        day: 3,
        title: 'Yumthang Valley Meadows & Hot Spring Bridge',
        description: 'Gentle 08:30 AM departure to Yumthang Valley (11,800 ft). Walk the flat gravel meadow paths along the river. Visit the warm sulphur spring footbridge. Return to Lachung for a relaxed hot lunch and afternoon visiting the Lachung monastery and cottage weavers.',
        highlights: ['Flat meadow walking at Yumthang', 'Hot spring footbridge', 'Lachung village culture'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachung -> Yumthang Valley -> Lachung',
        driveTime: '3 hours round trip',
        sightseeing: ['Yumthang Valley', 'Shingba Sanctuary', 'Lachung Monastery']
      },
      {
        day: 4,
        title: 'Lachung to Gangtok Descent',
        description: 'After a relaxed breakfast, begin the scenic return drive to Gangtok. Stop at Naga Waterfalls for family photos. Arrive in Gangtok by late afternoon for souvenir shopping on MG Marg.',
        highlights: ['Naga Waterfalls', 'Bheema Falls', 'MG Marg shopping'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Chungthang -> Mangan -> Gangtok',
        driveTime: '6 hours (120 km)',
        sightseeing: ['Naga Falls', 'Mangan valley vistas']
      },
      {
        day: 5,
        title: 'Gangtok to NJP / Bagdogra Departure',
        description: 'Breakfast at hotel. Private transfer down from Gangtok to NJP Railway Station or Bagdogra Airport for your journey home.',
        highlights: ['Scenic descent', 'Departure'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> NJP / Bagdogra',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta Valley views']
      }
    ],
    faqs: [
      {
        question: 'Are there western toilets in Lachung hotels?',
        answer: 'Yes, all our handpicked family partner hotels in Lachung feature attached western ceramic toilets with geyser hot water.'
      },
      {
        question: 'Is food suitable for young children in North Sikkim?',
        answer: 'Yes. Lodges provide simple, freshly cooked dal, rice, rotis, potato sabzi, chicken curry, and boiled eggs. Non-spicy portions are readily prepared for children upon request.'
      },
      {
        question: 'What documents are required for children under 18?',
        answer: 'Children must carry an original Birth Certificate or valid Passport, along with their School Photo ID card and 4 passport-size photographs.'
      },
      {
        question: 'Can seniors with knee problems manage this tour?',
        answer: 'Yes, Yumthang Valley features flat meadow areas right next to the parking lot, allowing seniors to enjoy the views without climbing steep inclines.'
      }
    ],
    seo: {
      title: 'North Sikkim Family Tour Package | Sikkim Tour Co.',
      metaDescription: 'Family-friendly 5-day North Sikkim tour to Lachung and Yumthang Valley. Paced for children and seniors, comfortable Innova transport, permits handled.',
      h1: 'Lachung & Yumthang Valley Family Comfort Tour (5D/4N)',
      primaryKeyword: 'North Sikkim family tour',
      secondaryKeywords: ['Lachung tour for family', 'Yumthang Valley senior friendly trip', 'North Sikkim package with kids'],
      suggestedInternalLinks: ['/destinations/yumthang-valley', '/packages', '/travel-guides/north-sikkim-permits']
    },
    schema: {
      touristTripName: 'Lachung & Yumthang Valley Family Comfort Tour',
      description: 'A gentle, family-paced 5-day tour of North Sikkim covering Lachung and Yumthang Valley with senior and child-friendly arrangements.',
      itinerary: ['Day 1: Arrival to Gangtok', 'Day 2: Gangtok to Lachung', 'Day 3: Yumthang Valley excursion', 'Day 4: Lachung to Gangtok', 'Day 5: Gangtok departure'],
      offerPriceInr: 15500,
      faqs: [
        {
          question: 'Are western toilets available in Lachung?',
          answer: 'Yes, all selected family lodges feature attached western toilets with geysers.'
        },
        {
          question: 'What documents do children need?',
          answer: 'Original birth certificate or passport with school photo ID.'
        }
      ]
    }
  },

  // 10. Specialty: Photography / Offbeat (5N/6D)
  {
    id: 'north-sikkim-landscape-photography-expedition',
    slug: 'north-sikkim-landscape-photography-expedition',
    name: 'North Sikkim Landscape & Astrophotography Expedition',
    tagline: 'Specialized photo tour capturing dawn alpenglow at Gurudongmar, dark-sky Milky Way in Lachen, and Yumthang waterfalls',
    duration: '6 days / 5 nights',
    daysCount: 6,
    nightsCount: 5,
    startingPriceInr: 24500,
    startingPriceNote: '₹24,500 per person based on 3-4 photographers sharing dedicated 4x4 vehicle with flexible shooting windows. [CONFIRM PRICE]',
    pricingBasis: 'per person',
    pricingTier: 'Custom Quote on Request',
    pricingNote: 'Includes early morning departures for golden hour and flexible stops for landscape photography. Enquire for specialized photo mentor quotes.',
    destinationsCovered: ['Gangtok', 'Chungthang', 'Lachen', 'Thangu', 'Gurudongmar Lake', 'Kala Patthar', 'Lachung', 'Yumthang Valley', 'Zero Point'],
    districtsCovered: ['North Sikkim', 'East Sikkim'],
    region: 'North Sikkim',
    travelStyle: 'Photography Expedition',
    travelStyleCategory: 'Wildlife & Eco',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    altitudeRange: '5,410 ft to 17,800 ft',
    maxAltitude: '17,800 ft (Gurudongmar Lake)',
    difficulty: 'challenging',
    fitnessLevel: 'Active / High-Altitude',
    bestMonths: 'October to November (clearest dark skies and alpenglow) and April (rhododendron colours)',
    permitRequirements: 'Protected Area Permit (PAP). Indian passport holders only for Gurudongmar Lake. Original Voter ID or Passport + 6 passport photographs required. Aadhaar and PAN cards are strictly not accepted.',
    permitNotes: 'We handle the permit paperwork with civilian and army checkposts. Drone usage is strictly prohibited across all border zones in North Sikkim by Indian defense regulations.',
    roadAndWeatherNote: 'Shooting at 17,800 ft requires cold-battery management. Sub-zero temperatures drain camera batteries rapidly. Roads past Thangu are gravel military trails.',
    whoItSuits: ['Landscape and night-sky photographers', 'Enthusiasts seeking raw Himalayan light, moraine textures, and unpolluted Milky Way skies'],
    whoItDoesNotSuit: ['Travellers looking for rushed checklist sightseeing', 'Those unwilling to endure early 3:30 AM cold morning shoots'],
    altitudeAndHealthNote: 'Standing stationary with heavy camera gear at 17,800 ft accelerates cold fatigue. Wear wind-resistant photography gloves with flip-open fingertips and stay well hydrated.',
    disclosures: [
      'Commercial drones are strictly illegal across all border districts of North Sikkim. Cameras and tripods are permitted.',
      'Battery charging can be slow in Lachen during sub-zero nights; carry at least 3-4 spare camera batteries and external power banks.',
      'Single-use plastic bottles are banned.'
    ],
    mainInclusions: [
      'North Sikkim Protected Area Permit processing assistance',
      'Dedicated 4WD vehicle with patient driver accustomed to photo halts',
      '5 Nights accommodation (3N Gangtok, 1N Lachen, 1N Lachung)',
      'All meals during North Sikkim leg',
      'Emergency portable oxygen cylinder'
    ],
    accommodationCategory: 'Deluxe Mountain Lodges with charging facilities',
    transportDetails: 'Mahindra Scorpio 4WD with rooftop luggage rack and spacious cabin for tripod gear',
    mealsSummary: 'Breakfasts in Gangtok; full board (Breakfast, Lunch, Dinner) in Lachen and Lachung',
    inclusions: [
      'Dedicated private vehicle with fuel, driver allowances, parking, and toll fees',
      'Inner Line and Protected Area Permit processing assistance',
      '5 nights accommodation as per itinerary',
      'Meals as specified'
    ],
    exclusions: [
      'Camera entry fees if levied at select monasteries',
      'Zero Point optional cab supplement',
      'Personal gear insurance and equipment rentals',
      'Travel and medical insurance'
    ],
    optionalActivities: [
      'Night-sky Milky Way shoot outside Lachen village (Bortuk ridge)',
      'Golden hour portrait sessions in Lachung traditional village'
    ],
    travelRequirements: [
      'Original Voter ID card or Passport',
      '6 passport size colour photos',
      'Sturdy tripod, spare camera batteries, cold-weather gloves, lens warmers'
    ],
    seasonalAvailability: 'October to November offers crystal clear skies; April to May offers rhododendron foreground blooms.',
    cancellationPolicy: '80% refund up to 15 days before arrival; 50% refund up to 7 days prior.',
    overview: 'The North Sikkim Landscape & Astrophotography Expedition is crafted specifically for serious photographers who recognize that the quality of Himalayan light is worth waking up before dawn for. Scheduled during the optimal visual seasons of October-November (for crystal air and dark skies) or April-May (for blooming floral carpets against snow), this itinerary provides flexible time for framing. Capture the morning alpenglow hitting Mount Siniolchu and Kangchengyao across the turquoise expanse of Gurudongmar Lake (17,800 ft), shoot the dark, star-saturated skies of Lachen free from light pollution, and frame the braided glacial waters of Yumthang. With a patient driver trained to accommodate photo stops, your portfolio will capture the raw soul of the Himalayas.',
    detailedItinerary: [
      {
        day: 1,
        title: 'Arrival Gangtok & Sunset Scouting at Tashi Viewpoint',
        description: 'Arrive in Gangtok from Bagdogra or NJP. Check into hotel and head to Tashi Viewpoint for sunset golden hour shooting across the Kanchenjunga range. Evening gear check and permit review.',
        highlights: ['Tashi Viewpoint sunset', 'Kanchenjunga golden hour', 'Gear prep'],
        mealsIncluded: 'Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Bagdogra / NJP -> Rangpo -> Gangtok',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Tashi Viewpoint', 'Coronation Bridge']
      },
      {
        day: 2,
        title: 'Gangtok to Lachen: Waterfalls & Gorge Photography',
        description: 'Depart Gangtok at 08:30 AM to catch morning light on Seven Sisters Waterfall. Photograph the sheer cliffs of the Teesta gorge, Singhik viewpoint, and the old iron suspension bridge at Chungthang. Arrive in Lachen for dusk photography.',
        highlights: ['Long-exposure waterfall photography', 'Teesta gorge cliffs', 'Lachen dusk light'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachen (Inside North Sikkim)',
        route: 'Gangtok -> Mangan -> Chungthang -> Lachen',
        driveTime: '6 to 7 hours with photo stops',
        sightseeing: ['Seven Sisters Falls', 'Singhik Ridge', 'Lachen Monastery']
      },
      {
        day: 3,
        title: 'First Light at Gurudongmar Lake (17,800 ft) & Night Astrophotography',
        description: 'Depart Lachen at 03:30 AM to capture dawn breaks over the cold tundra of Thangu. Reach Gurudongmar Lake by 07:30 AM as the first rays strike the snow peaks and mirror in the sacred water. Shoot Kala Patthar on the return. Transfer to Lachung for evening Milky Way framing.',
        highlights: ['First light over Gurudongmar Lake', 'Tundra moraine textures', 'Lachung dark sky shoot'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Lachung (Inside North Sikkim)',
        route: 'Lachen -> Gurudongmar -> Lachen -> Lachung',
        driveTime: '7 hours driving total',
        sightseeing: ['Thangu Plateau', 'Gurudongmar Lake', 'Kala Patthar']
      },
      {
        day: 4,
        title: 'Yumthang Valley Golden Hour & Zero Point Snow Vistas',
        description: 'Early morning shoot in Yumthang Valley capturing low-angle sunlight cutting through pine mist and reflecting off frost crystals. Continue to Zero Point for dramatic mountain pass panoramas. Return to Lachung for lunch and descend to Gangtok.',
        highlights: ['Mist and light in Yumthang', 'Zero Point jagged peaks', 'Descent light'],
        mealsIncluded: 'Breakfast, Lunch & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Lachung -> Yumthang -> Lachung -> Chungthang -> Gangtok',
        driveTime: '7 hours driving total',
        sightseeing: ['Yumthang Valley', 'Yumesamdong', 'Naga Falls']
      },
      {
        day: 5,
        title: 'Monastery Architecture & Cultural Portraits in Gangtok',
        description: 'Morning shoot at Rumtek Monastery capturing Tibetan prayer flags, ornate wood carvings, and monastic architecture. Visit Do Drul Chorten stupa and sunset shoot from Hanuman Tok.',
        highlights: ['Rumtek Monastery details', 'Hanuman Tok sunset panorama', 'MG Marg street life'],
        mealsIncluded: 'Breakfast & Dinner',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok local circuit',
        driveTime: '2.5 hours total',
        sightseeing: ['Rumtek Monastery', 'Hanuman Tok', 'Do Drul Chorten']
      },
      {
        day: 6,
        title: 'Gangtok to NJP / Bagdogra Departure',
        description: 'Breakfast at hotel. Private transfer down to Bagdogra Airport (IXB) or NJP Railway Station for your departure flight or train.',
        highlights: ['Scenic descent', 'Departure'],
        mealsIncluded: 'Breakfast',
        overnightStay: 'Gangtok (Inside East Sikkim)',
        route: 'Gangtok -> Rangpo -> NJP / Bagdogra',
        driveTime: '4.5 hours (125 km)',
        sightseeing: ['Teesta River gorge']
      }
    ],
    faqs: [
      {
        question: 'Are drones permitted for photography in North Sikkim?',
        answer: 'No. Flying civilian or commercial drones is strictly prohibited throughout North Sikkim due to its sensitive international border proximity and Indian defense regulations.'
      },
      {
        question: 'How do camera batteries perform at Gurudongmar Lake?',
        answer: 'Lithium-ion batteries lose 40% to 60% of their charge quickly in sub-zero morning temperatures. We advise keeping spare batteries in an inside jacket pocket close to body warmth.'
      },
      {
        question: 'Is a tripod necessary for this tour?',
        answer: 'A sturdy tripod is highly recommended for long exposures at waterfalls along the Teesta gorge and for night-sky astrophotography in Lachen and Lachung.'
      },
      {
        question: 'Does the driver allow unscheduled photo stops?',
        answer: 'Yes, our drivers assigned to this photography itinerary are briefed to safely pull over wherever scenic viewpoints and light conditions present compelling photo opportunities.'
      }
    ],
    seo: {
      title: 'North Sikkim Photography Tour | Sikkim Tour Co.',
      metaDescription: '6-day landscape & astrophotography tour in North Sikkim. Shoot Gurudongmar Lake dawn light, Yumthang Valley, and dark skies. Dedicated 4x4, permits handled.',
      h1: 'North Sikkim Landscape & Astrophotography Tour (6D/5N)',
      primaryKeyword: 'North Sikkim photography tour',
      secondaryKeywords: ['Gurudongmar photo tour', 'Sikkim landscape photography', 'Yumthang Valley photo package'],
      suggestedInternalLinks: ['/destinations/gurudongmar-lake', '/destinations/yumthang-valley', '/packages']
    },
    schema: {
      touristTripName: 'North Sikkim Landscape & Astrophotography Expedition',
      description: 'A dedicated 6-day photo expedition capturing dawn at Gurudongmar Lake, Yumthang Valley landscapes, and dark skies of North Sikkim.',
      itinerary: ['Day 1: Arrival & Tashi Viewpoint', 'Day 2: Gangtok to Lachen photo drive', 'Day 3: Gurudongmar dawn light & Lachung night sky', 'Day 4: Yumthang morning light to Gangtok', 'Day 5: Rumtek monastery & sunset', 'Day 6: Gangtok departure'],
      offerPriceInr: 24500,
      faqs: [
        {
          question: 'Are drones allowed in North Sikkim?',
          answer: 'No, drones are strictly banned in border zones by Indian military regulations.'
        },
        {
          question: 'Are photo stops allowed on the road?',
          answer: 'Yes, drivers are specially assigned to accommodate photography stops.'
        }
      ]
    }
  }
];
