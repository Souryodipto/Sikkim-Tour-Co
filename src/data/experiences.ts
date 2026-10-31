export interface TravelExperience {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlightText: string;
  curatedPackageSlugs: string[];
  destinations: string[];
  suitableFor: string;
  keyFeatures: string[];
}

export const experiencesData: TravelExperience[] = [
  {
    id: 'complete-14-day-grand-expedition',
    slug: 'complete-14-day-grand-expedition',
    title: 'The Complete 14-Day Sikkim Grand Odyssey',
    subtitle: 'The ultimate 2-week journey spanning all 4 districts of the Himalayan Kingdom',
    description:
      'A masterfully planned 14-day trans-district odyssey traversing East, North, South, and West Sikkim. From sacred Gurudongmar Lake at 17,800 ft to the 1642 coronation throne of Yuksom and the organic slopes of Temi Tea Estate.',
    highlightText: 'Full cross-district immersion: 4 districts, 14 days, sacred lakes, royal ruins, and high mountain passes.',
    curatedPackageSlugs: ['grand-sikkim-odyssey-2-weeks', 'north-sikkim-adventure', 'west-south-sikkim-royal-heritage'],
    destinations: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    suitableFor: 'Himalayan explorers, In-depth cultural travelers, Photographers, Once-in-a-lifetime journeys',
    keyFeatures: [
      'Covers all 4 districts of Sikkim in an unhurried, logical sequence',
      'High-altitude permits pre-coordinated for Gurudongmar (17,800 ft) and Tsomgo Lake',
      'Complete royal dynasty heritage: Yuksom 1642 stone throne and Rabdentse ruins',
      'Dedicated private high-clearance SUV and senior mountain chauffeur',
    ],
  },
  {
    id: 'royal-heritage-and-monasteries',
    slug: 'royal-heritage-and-monasteries',
    title: 'Royal Heritage & Living Monasteries',
    subtitle: 'Birthplaces of kings, ancient palace ruins, and sacred Vajrayana sanctuaries',
    description:
      'Step into tranquil monastic courtyards where butter lamps flicker and chanting lamas preserve three centuries of the Namgyal dynasty. Explore the 1642 coronation throne at Yuksom, the majestic stone ruins of Rabdentse, and premier gompas including Rumtek, Pemayangtse, and Tashiding.',
    highlightText: 'Three centuries of royal Namgyal history, ancient coronation sites, and sacred relic chambers.',
    curatedPackageSlugs: ['west-south-sikkim-royal-heritage', 'grand-sikkim-odyssey-2-weeks', 'sikkim-royal-luxury-sanctuary'],
    destinations: ['Yuksom', 'Pelling & Rabdentse', 'Gangtok (Rumtek & Enchey)', 'Ravangla & Namchi'],
    suitableFor: 'History researchers, Spiritual seekers, Cultural anthropologists, Curious travelers',
    keyFeatures: [
      'Scholarly guided visits to Rumtek Dharma Chakra Centre and Pemayangtse',
      'Walking through the 17th-century royal palace ruins of Rabdentse',
      'The sacred stone coronation throne of Norbugang where Sikkim was founded in 1642',
      'Namgyal Institute of Tibetology housing 60,000+ ancient manuscripts',
    ],
  },
  {
    id: 'high-altitude-mountain-adventure',
    slug: 'high-altitude-mountain-adventure',
    title: 'High-Altitude Frontier Adventure',
    subtitle: 'Sacred glacial waters at 17,800 feet, raw alpine passes, and mountain ridges',
    description:
      'Ascend past the timberline into the rugged high-altitude plateau of North Sikkim and the Old Silk Route. Gaze upon the sacred frozen waters of Gurudongmar Lake, navigate the 32 hairpin loops of Zuluk, and touch perpetual snow at Zero Point and Kala Patthar.',
    highlightText: 'Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, Zero Point, and Nathu La Pass.',
    curatedPackageSlugs: ['north-sikkim-adventure', 'grand-sikkim-odyssey-2-weeks', 'gangtok-silk-route-escape'],
    destinations: ['Lachen', 'Gurudongmar Lake', 'Lachung & Yumthang', 'Zuluk Old Silk Route', 'Tsomgo Lake'],
    suitableFor: 'Adventure lovers, Photographers, Mountain trekkers, High-altitude enthusiasts',
    keyFeatures: [
      'High-clearance 4x4 / SUVs with seasoned Himalayan navigators',
      'Expedited Protected Area Permits (PAP) and military checkpost clearances',
      'Access to one of the world’s highest freshwater sacred lakes at 17,800 ft',
      'Stargazing beneath pollution-free high Himalayan night skies',
    ],
  },
  {
    id: 'romantic-himalayan-getaways',
    slug: 'romantic-himalayan-getaways',
    title: 'Romantic Himalayan Getaways',
    subtitle: 'Intimate mountain hideaways, sunrise balconies, and private dining above the mist',
    description:
      'Immerse yourselves in quiet alpine mornings framed by the Kanchenjunga range. Tailored for honeymoons and couples seeking unhurried moments, private scenic picnics in orange groves, and quiet candlelit evenings warmed by mountain hearths in Sikkim.',
    highlightText: 'Panoramic mountain-facing balconies and private candlelit dinners with Kanchenjunga views.',
    curatedPackageSlugs: ['sikkim-honeymoon-retreat', 'sikkim-royal-luxury-sanctuary', 'sikkim-highlights'],
    destinations: ['Pelling', 'Gangtok', 'Ravangla', 'Temi Organic Tea Estate'],
    suitableFor: 'Honeymooners, Couples celebrating anniversaries, Romantic mountain retreats',
    keyFeatures: [
      'Mountain-facing suites with private balconies overlooking Mount Kanchenjunga',
      'Curated couples dining and private tea-tasting sessions',
      'Unhurried, private transfers without tour groups',
      'Serene forest walks at sacred Khecheopalri Lake and Rabdentse ruins',
    ],
  },
  {
    id: 'family-holidays',
    slug: 'family-holidays',
    title: 'Family Mountain Holidays',
    subtitle: 'Safe, comfortable, and wonder-filled journeys for all generations',
    description:
      'Explore the wonders of Sikkim with spacious vehicles, gentle itineraries, interactive heritage visits, and comfortable hotels that cater seamlessly to children and grandparents alike without exhausting pacing.',
    highlightText: 'Carefully paced road journeys with child-friendly stops and comfortable multi-room stays.',
    curatedPackageSlugs: ['sikkim-highlights', 'gangtok-silk-route-escape', 'west-south-sikkim-royal-heritage'],
    destinations: ['Gangtok', 'Pelling', 'Namchi', 'Ravangla'],
    suitableFor: 'Multi-generational families, Parents with children, Small family reunions',
    keyFeatures: [
      'Spacious SUVs with considerate mountain chauffeurs',
      'Gentle pacing with minimal rapid altitude changes',
      'Ropeway cable car rides, glass skywalk, and scenic orange gardens',
      'Hotels with 24-hour heating, hot water, and flexible kid-friendly meal options',
    ],
  },
  {
    id: 'nature-and-photography',
    slug: 'nature-and-photography',
    title: 'Nature & Landscape Photography',
    subtitle: 'Alpine meadows, rhododendron sanctuaries, and golden sunrise peaks',
    description:
      'From the vibrant blooms of the Shingba and Varsey Rhododendron Sanctuaries to the dramatic first light striking the jagged summit of Kanchenjunga from Pelling and Singhik, this experience is tailored for photographers and nature enthusiasts.',
    highlightText: 'Golden hour vantage points, rare alpine flora, and biodiversity hot-spots in Sikkim.',
    curatedPackageSlugs: ['north-sikkim-adventure', 'grand-sikkim-odyssey-2-weeks'],
    destinations: ['Yumthang Valley', 'Singhik Viewpoint', 'Pelling', 'Varsey Sanctuary', 'Tsomgo Lake'],
    suitableFor: 'Photographers, Botanists, Birdwatchers, Nature documentary lovers',
    keyFeatures: [
      'Golden hour sunrise shoots at Singhik, Tashi Viewpoint, and Pelling balconies',
      'Spring wildflower expeditions in Yumthang and Varsey sanctuaries',
      'Birdwatching opportunities in high-altitude temperate and cloud forests',
      'Unhurried photo stops along crystalline rivers and alpine valleys',
    ],
  },
];
