export interface AiPlannerRequest {
  startingCity: string;
  daysCount: number;
  travelMonth: string;
  travelerType: 'couple' | 'family' | 'solo' | 'friends' | 'corporate';
  adultCount: number;
  childCount: number;
  budgetTier: 'budget' | 'moderate' | 'luxury';
  pace: 'relaxed' | 'moderate' | 'packed';
  accommodationTier: 'Standard' | 'Deluxe' | 'Luxury Boutique';
  vehicleType: 'Shared Mountain 4x4' | 'Dedicated SUV (Innova/Scorpio)' | 'Luxury Toyota Crysta';
  interests: string[];
  fitnessLevel: 'easy' | 'moderate' | 'high';
  specialRequests?: string;
}

export interface AiItineraryDay {
  dayNumber: number;
  title: string;
  route: string;
  drivingDistanceKm: number;
  drivingTimeHours: string;
  altitudeFt: number;
  description: string;
  activities: string[];
  morningSpot: string;
  afternoonSpot: string;
  eveningSpot: string;
  overnightStay: string;
  meals: string;
  permitNotice?: string;
  altitudeAcclimatizationTip?: string;
}

export interface AiItineraryResult {
  id: string;
  createdAt: string;
  tripTitle: string;
  tagline: string;
  destinationsCovered: string[];
  districtsCovered: string[];
  totalEstimatedCostInr: number;
  costBreakdown: {
    transportInr: number;
    staysInr: number;
    permitsAndEntryInr: number;
    foodAndMiscInr: number;
    gstTaxInr: number;
  };
  days: AiItineraryDay[];
  matchingPackageSlug: string;
  weatherAndPackingTips: string[];
  permitRequirements: string[];
  altitudeWarnings: string[];
}

export function generateAlgorithmicHimalayanItinerary(req: AiPlannerRequest): AiItineraryResult {
  const days = Math.min(Math.max(req.daysCount || 5, 3), 14);
  const adults = req.adultCount || 2;
  const children = req.childCount || 0;

  // Rate tiers per person per day
  let dailyStayCost = 3500;
  if (req.accommodationTier === 'Luxury Boutique') dailyStayCost = 7500;
  if (req.accommodationTier === 'Standard') dailyStayCost = 2200;

  let dailyVehicleCost = 4500;
  if (req.vehicleType === 'Luxury Toyota Crysta') dailyVehicleCost = 6500;
  if (req.vehicleType === 'Shared Mountain 4x4') dailyVehicleCost = 2000;

  const staysCost = Math.round(dailyStayCost * (adults + children * 0.5) * (days - 1));
  const transportCost = Math.round(dailyVehicleCost * days);
  const permitsAndEntry = (adults + children) * 1200 + 1500;
  const foodCost = Math.round((adults * 900 + children * 500) * days);
  const subtotal = staysCost + transportCost + permitsAndEntry + foodCost;
  const gstTax = Math.round(subtotal * 0.05);
  const totalCost = subtotal + gstTax;

  const itineraryDays: AiItineraryDay[] = [];

  // Day 1: Arrival & Acclimatization in Gangtok
  itineraryDays.push({
    dayNumber: 1,
    title: `Arrival in Sikkim · ${req.startingCity} to Gangtok`,
    route: `${req.startingCity} → Teesta Valley → Gangtok (124 km)`,
    drivingDistanceKm: 124,
    drivingTimeHours: '4.5 - 5 hrs',
    altitudeFt: 5410,
    description: `Ascend along the emerald Teesta river into the hills of East Sikkim. Check into your ${req.accommodationTier} mountain property. In the evening, take a slow stroll along pedestrian MG Marg, admiring Victorian cast-iron lamp posts and tasting fresh steamed momos.`,
    activities: [
      'Scenic mountain highway drive past Sevoke coronation bridge',
      'Check-in and room orientation with hot ginger-honey tea',
      'Evening acclimatisation walk along pedestrian MG Marg',
    ],
    morningSpot: `${req.startingCity} departure`,
    afternoonSpot: 'Teesta River Confluence (Melli checkpost)',
    eveningSpot: 'MG Marg, Gangtok',
    overnightStay: 'Gangtok, East Sikkim',
    meals: 'Dinner recommendations provided',
    altitudeAcclimatizationTip: 'Drink plenty of warm water. Avoid strenuous exertion on Day 1 to ease elevation transition.',
  });

  // Day 2: East Sikkim Royal & Spiritual Trail
  itineraryDays.push({
    dayNumber: 2,
    title: 'Sacred Glacial Tsomgo Lake & High Mountain Pass',
    route: 'Gangtok → Tsomgo Lake (Changu) → Baba Mandir (80 km return)',
    drivingDistanceKm: 80,
    drivingTimeHours: '3.5 hrs total driving',
    altitudeFt: 12313,
    description: `Ascend through sub-alpine mist along the historic Indo-China trade highway to sacred Tsomgo Lake at 12,313 ft. Witness the high-altitude glacial waters whose colors once divined royal Sikkim prophecies. Visit the revered Baba Harbhajan Singh Memorial shrine.`,
    activities: [
      'Excursion to sacred Tsomgo Glacial Lake (12,313 ft)',
      'High-altitude cable car ropeway over the glacial bowl',
      'Pay respects at historic Baba Harbhajan Mandir',
      'Sunset views at Tashi Viewpoint returning to Gangtok',
    ],
    morningSpot: 'Tsomgo Glacial Lake',
    afternoonSpot: 'Baba Mandir Shrine (13,123 ft)',
    eveningSpot: 'Tashi Viewpoint, Gangtok',
    overnightStay: 'Gangtok, East Sikkim',
    meals: 'Breakfast at hotel, Warm mountain lunch en route',
    permitNotice: 'Special Protected Area Permit (PAP) processed 24 hours prior with Army clearance.',
    altitudeAcclimatizationTip: 'Keep ears and head covered with woolens. High mountain winds drop temperatures rapidly.',
  });

  // If 3 days: Day 3 is departure
  if (days === 3) {
    itineraryDays.push({
      dayNumber: 3,
      title: `Rumtek Monastery & Scenic Departure to ${req.startingCity}`,
      route: `Gangtok → Rumtek Monastery → ${req.startingCity} (128 km)`,
      drivingDistanceKm: 128,
      drivingTimeHours: '5 hrs',
      altitudeFt: 5410,
      description: `Visit the venerable Rumtek Dharma Chakra Centre, the worldwide seat-in-exile of the Gyalwa Karmapa, viewing the sacred Golden Stupa. Descend through the scenic foothills toward your return transport.`,
      activities: ['Rumtek Monastery & Golden Stupa exploration', 'Sikkim handicraft souvenir shopping', 'Airport/station drop-off'],
      morningSpot: 'Rumtek Monastery',
      afternoonSpot: 'Rangpo river border',
      eveningSpot: `${req.startingCity} departure`,
      overnightStay: 'Departure',
      meals: 'Breakfast at hotel',
    });
  }

  // If 4 or 5 days: include West Sikkim or North Sikkim depending on interest
  if (days >= 4) {
    const prefersNorth = req.interests.some((i) => i.toLowerCase().includes('lake') || i.toLowerCase().includes('rhododendron'));

    if (prefersNorth && days >= 5) {
      // North Sikkim 2-day loop
      itineraryDays.push({
        dayNumber: 3,
        title: 'Expedition North · Gangtok to Lachung Valley',
        route: 'Gangtok → Seven Sisters Falls → Chungthang → Lachung (118 km)',
        drivingDistanceKm: 118,
        drivingTimeHours: '6 hrs',
        altitudeFt: 8610,
        description: 'Spectacular alpine transit through sheer granite gorges of the North. Stop at the roaring Seven Sisters Waterfall and the sacred Padmasambhava boulder at Chungthang. Arrive in the picturesque hamlet of Lachung.',
        activities: ['Seven Sisters Waterfall photo stop', 'Chungthang sacred rock & river confluence', 'Lachung village evening walk'],
        morningSpot: 'Seven Sisters Falls',
        afternoonSpot: 'Chungthang Confluence',
        eveningSpot: 'Lachung Hamlet',
        overnightStay: 'Lachung, North Sikkim',
        meals: 'Breakfast in Gangtok, Hot lunch en route, Fresh dinner in Lachung',
        permitNotice: 'North Sikkim Protected Area Permit (PAP) mandatory.',
      });

      itineraryDays.push({
        dayNumber: 4,
        title: 'Yumthang Valley of Flowers & Zero Point Permafrost',
        route: 'Lachung → Yumthang (11,693 ft) → Zero Point (15,300 ft) → Gangtok (145 km)',
        drivingDistanceKm: 145,
        drivingTimeHours: '6.5 hrs',
        altitudeFt: 11693,
        description: 'Pre-dawn drive up the pine-fringed Lachung Chu river valley to the world-renowned Yumthang Valley and Shingba Rhododendron Sanctuary. Continue to the permafrost border of Zero Point before returning south.',
        activities: ['Yumthang Valley of Flowers', 'Shingba Rhododendron Sanctuary', 'Natural sulphur hot springs', 'Zero Point permafrost ridge'],
        morningSpot: 'Yumthang Valley',
        afternoonSpot: 'Zero Point (15,300 ft)',
        eveningSpot: 'Gangtok return',
        overnightStay: 'Gangtok, East Sikkim',
        meals: 'Breakfast at lodge, Mountain lunch, Dinner in Gangtok',
        altitudeAcclimatizationTip: 'Zero Point is at 15,300 ft. Walk in measured steps and sip hot soup at the local stalls.',
      });
    } else {
      // West Sikkim loop (Pelling, Royal Capital)
      itineraryDays.push({
        dayNumber: 3,
        title: 'Scenic Transit to West Sikkim · Rabdentse Palace Ruins',
        route: 'Gangtok → Ravangla Buddha Park → Pelling (130 km)',
        drivingDistanceKm: 130,
        drivingTimeHours: '4.5 hrs',
        altitudeFt: 7200,
        description: 'Cross into the mist-draped hills of West Sikkim. Explore the monumental 130-foot Ravangla Buddha statue consecrated by the Dalai Lama. Walk the protected oak trails to Rabdentse—the second royal capital of Sikkim from 1670 to 1814—standing on the King’s judgment throne facing Mount Kanchenjunga.',
        activities: [
          'Ravangla Buddha Park (Tathagata Tsal)',
          'Rabdentse Royal Palace archaeological ruins & judgment seat',
          'Sunset over Mount Kanchenjunga from Pelling ridge',
        ],
        morningSpot: 'Ravangla Buddha Park',
        afternoonSpot: 'Rabdentse Palace Ruins',
        eveningSpot: 'Pelling Helipad Viewpoint',
        overnightStay: 'Pelling, West Sikkim',
        meals: 'Breakfast in Gangtok, Lunch in Ravangla, Dinner in Pelling',
      });

      itineraryDays.push({
        dayNumber: 4,
        title: 'Premier Pemayangtse Monastery & Sacred Khecheopalri Lake',
        route: 'Pelling → Pemayangtse → Khecheopalri Lake → Pelling (65 km circuit)',
        drivingDistanceKm: 65,
        drivingTimeHours: '3 hrs driving',
        altitudeFt: 7200,
        description: 'Explore the 1705 Pemayangtse Monastery, premier Nyingma monastery of Sikkim, viewing the 7-tiered hand-carved Santopalri celestial palace. Walk to wish-fulfilling Khecheopalri Lake shaped like Tara’s sacred footprint.',
        activities: [
          'Pemayangtse Monastery & 7-tiered Santopalri woodwork',
          'Pelling Glass Skywalk & 137-ft Chenrezig statue',
          'Sacred Khecheopalri Wish-Fulfilling Lake',
          'Kanchenjunga Waterfalls',
        ],
        morningSpot: 'Pemayangtse Monastery',
        afternoonSpot: 'Khecheopalri Lake',
        eveningSpot: 'Pelling Skywalk',
        overnightStay: 'Pelling, West Sikkim',
        meals: 'Breakfast at hotel, Lunch near Khecheopalri, Dinner in Pelling',
      });
    }

    // Departure Day
    itineraryDays.push({
      dayNumber: days,
      title: `Farewell Kanchenjunga Sunrise · Return to ${req.startingCity}`,
      route: `Pelling / Gangtok → Teesta Valley → ${req.startingCity}`,
      drivingDistanceKm: 135,
      drivingTimeHours: '4.5 hrs',
      altitudeFt: 5410,
      description: 'Savor a breathtaking golden sunrise over the Kanchenjunga massif from your balcony. Conclude your curated Himalayan journey with a private drop-off.',
      activities: ['Golden sunrise photography', 'Leisurely terrace breakfast', 'Scenic mountain descent transfer'],
      morningSpot: 'Kanchenjunga Sunrise Vantage',
      afternoonSpot: 'Sevoke foothills',
      eveningSpot: `${req.startingCity} onward connection`,
      overnightStay: 'Departure',
      meals: 'Breakfast at hotel',
    });
  }

  // Matching slug
  let matchingSlug = 'sikkim-highlights';
  if (days >= 12) matchingSlug = 'grand-sikkim-odyssey-2-weeks';
  else if (itineraryDays.some((d) => d.title.includes('Lachung'))) matchingSlug = 'north-sikkim-adventure';
  else if (itineraryDays.some((d) => d.title.includes('Rabdentse'))) matchingSlug = 'west-south-sikkim-royal-heritage';

  return {
    id: `ITN-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    tripTitle: `${days}-Day Curated Himalayan Discovery`,
    tagline: `Customized for ${req.travelerType} travelers with ${req.pace} pace and verified high-altitude logistics`,
    destinationsCovered: ['Gangtok', 'Tsomgo Lake', days >= 5 ? 'Lachung / Yumthang' : 'Pelling', 'Rabdentse'],
    districtsCovered: days >= 5 ? ['East Sikkim', 'North Sikkim', 'West Sikkim'] : ['East Sikkim', 'West Sikkim'],
    totalEstimatedCostInr: totalCost,
    costBreakdown: {
      staysInr: staysCost,
      transportInr: transportCost,
      permitsAndEntryInr: permitsAndEntry,
      foodAndMiscInr: foodCost,
      gstTaxInr: gstTax,
    },
    days: itineraryDays,
    matchingPackageSlug: matchingSlug,
    weatherAndPackingTips: [
      `Expected ${req.travelMonth} climate: Crisp mornings (8°C to 14°C) with cold high passes (-2°C to 5°C).`,
      'Dress in 3 breathable layers: Thermal base layer, fleece mid-layer, and windproof outer shell.',
      'Sturdy gripped walking shoes essential for monastery courtyards and stone ruins.',
    ],
    permitRequirements: [
      'Inner Line Permits (ILP) required for all travelers entering Sikkim.',
      'Special Protected Area Permits (PAP) mandatory for Tsomgo Lake, Nathula Pass, and North Sikkim.',
      'Indian citizens require original Voter ID or Passport + 4 passport photos. (Aadhaar/PAN are NOT accepted at Army checkposts).',
      'Foreign citizens require valid Indian Visa + minimum group of 2 with registered local agency for North Sikkim & Tsomgo.',
    ],
    altitudeWarnings: [
      'Elevation changes from 5,410 ft (Gangtok) up to 12,300+ ft at high passes.',
      'Remain well-hydrated with warm fluids. Avoid heavy alcohol on day 1.',
      'Our dedicated drivers carry emergency first-aid kits and acclimatization stops.',
    ],
  };
}
