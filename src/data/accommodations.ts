export interface RoomType {
  id: string;
  name: string;
  description: string;
  capacity: string;
  bedType: string;
  pricePerNightInr: number;
  features: string[];
}

export interface Accommodation {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  district: 'East Sikkim' | 'West Sikkim' | 'North Sikkim' | 'South Sikkim';
  location: string;
  elevationFt: number;
  propertyType: 'Luxury Heritage' | 'Boutique Resort' | 'Mountain Homestay' | 'Eco Lodge' | 'Tea Estate Retreat';
  startingPriceInr: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  highlights: string[];
  amenities: string[];
  roomTypes: RoomType[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    childPolicy: string;
    pets: string;
  };
  coordinates: { lat: number; lng: number };
  verifiedBadge: boolean;
}

export const accommodationsData: Accommodation[] = [
  {
    id: 'elgin-nor-khill-gangtok',
    slug: 'elgin-nor-khill-gangtok',
    name: 'The Elgin Nor-Khill Heritage Resort',
    tagline: 'Royal sanctuary built in 1932 by Chogyal Tashi Namgyal with classic Sikkimese woodwork',
    district: 'East Sikkim',
    location: 'Paljor Stadium Road, Gangtok',
    elevationFt: 5410,
    propertyType: 'Luxury Heritage',
    startingPriceInr: 12500,
    rating: 4.8,
    reviewCount: 142,
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Meaning "Jewel of the Jewels" in Bhutia, The Elgin Nor-Khill was built in 1932 by the King of Sikkim (the 11th Chogyal Tashi Namgyal) as the royal guesthouse for visiting dignitaries, including the Dalai Lama and Hollywood royalty. It retains hand-painted Sikkimese Buddhist motifs, burma teak floors, crackling open fireplaces, and majestic views of the Gangtok valley.',
    highlights: [
      'Original 1932 Royal guesthouse with preserved period furniture',
      'Handcrafted dragon motifs and antique Tibetan lithographs',
      'Afternoon tea lounge overlooking manicured Himalayan gardens',
      'Walking distance from MG Marg and Ridge Park',
    ],
    amenities: [
      'Mountain View',
      'Open Fireplace',
      'Fine Dining Restaurant (Shangri-La)',
      'Free High-Speed Wi-Fi',
      'Centrally Heated Rooms',
      'Spa & Wellness',
      'Concierge & Chauffeur Desk',
      'Luggage Assistance',
    ],
    roomTypes: [
      {
        id: 'deluxe-suite',
        name: 'Royal Heritage Deluxe Room',
        description: 'Teak wood flooring, ornate four-poster bed, bay windows with valley views, and heated en-suite marble bath.',
        capacity: '2 Adults, 1 Child',
        bedType: 'King Size Bed',
        pricePerNightInr: 12500,
        features: ['Valley View', 'Central Heating', 'Complimentary High Tea', 'Heritage Fireplace'],
      },
      {
        id: 'nor-khill-suite',
        name: 'Chogyal Royal Suite',
        description: 'Spacious imperial suite featuring a separate living parlour with private heritage artefacts and mountain vistas.',
        capacity: '2 Adults, 2 Children',
        bedType: 'Grand Four-Poster King',
        pricePerNightInr: 18500,
        features: ['Panoramic View', 'Separate Living Room', 'Butler Service', 'Complimentary Breakfast & Dinner'],
      },
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation up to 7 days before arrival. 50% retained within 7 days.',
      childPolicy: 'Children under 5 years stay complimentary sharing existing bedding.',
      pets: 'Pets not permitted due to antique heritage flooring.',
    },
    coordinates: { lat: 27.3314, lng: 88.6138 },
    verifiedBadge: true,
  },
  {
    id: 'mayfair-spa-resort-gangtok',
    slug: 'mayfair-spa-resort-gangtok',
    name: 'Mayfair Spa Resort & Casino Gangtok',
    tagline: '5-star Himalayan luxury spread over 48 acres of virgin pine forest & monastic architecture',
    district: 'East Sikkim',
    location: 'Ranipool, Gangtok',
    elevationFt: 4600,
    propertyType: 'Boutique Resort',
    startingPriceInr: 14000,
    rating: 4.9,
    reviewCount: 218,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Set against lush green hills and cascading stream valleys, Mayfair Spa Resort blends Sikkim monastic architecture with world-class wellness hospitality. Featuring an award-winning spa, heated indoor plunge pools, live casino gaming, and multiple fine-dining restaurants serving traditional Sikkimese thalis alongside international cuisine.',
    highlights: [
      'Award-winning Mayfair Spa with holistic Tibetan herbal therapies',
      'Heated pool, fitness centre, and scenic jogging trails through bamboo groves',
      'Authentic Bhutanese and Sikkimese wood carving exterior details',
      'Peaceful suburban altitude avoiding Gangtok city traffic',
    ],
    amenities: [
      'Luxury Spa & Steam Room',
      'Heated Indoor Pool',
      'Live Onsite Casino',
      'Multiple Fine Dining Venues',
      'High-Speed Wi-Fi',
      'Children Play Zone',
      'Valet Parking',
      '24/7 Room Service',
    ],
    roomTypes: [
      {
        id: 'forest-cottage',
        name: 'Deluxe Forest Cottage',
        description: 'Standalone pine cottage with private balcony facing the forested stream gorge.',
        capacity: '2 Adults, 1 Child',
        bedType: 'King or Twin Beds',
        pricePerNightInr: 14000,
        features: ['Forest Balcony', 'Deep Soaking Tub', 'Complimentary Buffet Breakfast', 'High-Speed Wi-Fi'],
      },
      {
        id: 'grand-villa',
        name: 'Imperial Spa Villa with Private Plunge Pool',
        description: 'Exclusive two-bedroom private villa with temperature-controlled dip pool and dedicated attendant.',
        capacity: '4 Adults',
        bedType: '2 King Beds',
        pricePerNightInr: 28000,
        features: ['Private Plunge Pool', 'Personal Butler', 'Airport Luxury Transfer Included', 'Spa Credit'],
      },
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation up to 48 hours prior to check-in.',
      childPolicy: 'Children below 6 years stay free. Extra bed available upon request.',
      pets: 'Small pets allowed in designated garden villas with prior intimation.',
    },
    coordinates: { lat: 27.2917, lng: 88.5866 },
    verifiedBadge: true,
  },
  {
    id: 'chumbi-mountain-retreat-pelling',
    slug: 'chumbi-mountain-retreat-pelling',
    name: 'The Chumbi Mountain Retreat & Spa',
    tagline: 'Artisanal Himalayan retreat with unobstructed panoramic views of Mount Kanchenjunga',
    district: 'West Sikkim',
    location: 'Naku Chumbong, Pelling',
    elevationFt: 6900,
    propertyType: 'Boutique Resort',
    startingPriceInr: 11000,
    rating: 4.8,
    reviewCount: 96,
    heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Created by Sikkimese filmmaker Ugyen Chophel, The Chumbi Mountain Retreat is an architectural homage to ancient Sikkimese palace design. Built with locally dressed river stones, reclaimed timber, hand-beaten brass, and traditional wood carvings, every room commands an uninterrupted sunrise view over the 28,169-foot Kanchenjunga massif.',
    highlights: [
      'Unobstructed front-row panorama of Mount Kanchenjunga',
      'Traditional Dottho hot stone herbal herbal baths',
      'Organic kitchen gardens providing heirloom buckwheat and black cardamom',
      'Private library of rare Himalayan and Buddhist literature',
    ],
    amenities: [
      'Direct Kanchenjunga View',
      'Dottho Herbal Hot Stone Bath',
      'Organic Farm-to-Table Restaurant',
      'Wood Fire Pit & Evening Star Gazing',
      'Wi-Fi in Public Spaces',
      'Traditional Sikkimese Cultural Evenings',
    ],
    roomTypes: [
      {
        id: 'kanchenjunga-suite',
        name: 'Massif View Hermitage Room',
        description: 'Large picture windows framed in hand-carved cedar wood, overlooking snow peaks.',
        capacity: '2 Adults',
        bedType: 'King Size Hand-Hewn Bed',
        pricePerNightInr: 11000,
        features: ['Peak Sunrise View', 'Underfloor Heating', 'Organic Tea Basket', 'Complimentary Breakfast'],
      },
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation up to 5 days before scheduled arrival.',
      childPolicy: 'Children over 6 years accommodated with extra mattress.',
      pets: 'Not permitted.',
    },
    coordinates: { lat: 27.3155, lng: 88.2324 },
    verifiedBadge: true,
  },
  {
    id: 'yarlam-resort-lachung',
    slug: 'yarlam-resort-lachung',
    name: 'Yarlam Resort Lachung',
    tagline: 'High-altitude premier comfort with central heating facing the Lachung Chu river',
    district: 'North Sikkim',
    location: 'Lachung Valley, North Sikkim',
    elevationFt: 8610,
    propertyType: 'Boutique Resort',
    startingPriceInr: 8500,
    rating: 4.7,
    reviewCount: 112,
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'In the remote, sub-alpine mountain village of Lachung, Yarlam Resort provides exceptional warmth and modern comfort where winter temperatures regularly plunge below freezing. Built with heavy wood insulation, radiator central heating, and large double-glazed windows framing alpine snow peaks and pine forests.',
    highlights: [
      'Reliable radiator heating and 24/7 hot running mountain spring water',
      'Closest luxury base for morning excursions to Yumthang Valley & Zero Point',
      'Freshly prepared hot buffets with both mountain and Indian comfort dishes',
      'Emergency medical oxygen support available on-site',
    ],
    amenities: [
      'Central Heating',
      'Hot Water Boilers',
      'Onsite Restaurant with Full Board',
      'Oxygen Support Concentrators',
      'Generator Power Backup',
      'Heated Electric Blankets',
    ],
    roomTypes: [
      {
        id: 'alpine-deluxe',
        name: 'Alpine Valley Deluxe Room',
        description: 'Double glazed room with wooden paneling, electric fleece blankets, and panoramic pine forest views.',
        capacity: '2 Adults, 1 Child',
        bedType: 'Twin or Queen Bed',
        pricePerNightInr: 8500,
        features: ['Heating Radiator', 'Electric Blankets', 'Full Board (Breakfast, Lunch, Dinner)', 'Hot Water Shower'],
      },
    ],
    policies: {
      checkIn: '12:00',
      checkOut: '10:00',
      cancellation: 'Cancellations 10 days prior are 80% refundable; permits and mountain food supplies non-refundable within 7 days.',
      childPolicy: 'Children under 5 years stay free.',
      pets: 'Pets not permitted.',
    },
    coordinates: { lat: 27.6891, lng: 88.7431 },
    verifiedBadge: true,
  },
  {
    id: 'apple-orchard-resort-lachen',
    slug: 'apple-orchard-resort-lachen',
    name: 'The Apple Orchard Resort Lachen',
    tagline: 'Authentic stone & pine sanctuary nestled in an apple grove at 9,000 ft',
    district: 'North Sikkim',
    location: 'Lachen Hamlet, North Sikkim',
    elevationFt: 9020,
    propertyType: 'Eco Lodge',
    startingPriceInr: 7800,
    rating: 4.6,
    reviewCount: 78,
    heroImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Perched at 9,020 ft inside a private heirloom apple grove, The Apple Orchard Resort serves as the premier acclimatisation base for early-morning expeditions to Gurudongmar Lake (17,800 ft). Constructed from natural river slate and aromatic pine wood, with a roaring woodstove in the dining hall and hearty Sikkimese food.',
    highlights: [
      'Prime base for pre-dawn starts to Gurudongmar Lake',
      'Surrounded by organic apple trees and blooming rhododendrons',
      'Traditional Bukharis (Himalayan woodstoves) warming guest common areas',
      'Warm local staff belonging to the ancient Lachen Dzumsa community',
    ],
    amenities: [
      'Wood Fire Stove (Bukhari)',
      'Electric Bed Warmers',
      'Hearty Mountain Dining Buffet',
      'Hot Water Bottles Provided',
      'Power Backup',
      'Acclimatisation Tea Station',
    ],
    roomTypes: [
      {
        id: 'orchard-room',
        name: 'Deluxe Orchard Wooden Cottage',
        description: 'Pine-paneled mountain bedroom with heated duvets and stunning views of Mount Lhamo Khang.',
        capacity: '2 Adults',
        bedType: 'Double Bed',
        pricePerNightInr: 7800,
        features: ['Mountain Ridge View', 'Electric Duvet', 'All Meals Included', 'Early 4:30 AM Tea Service'],
      },
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '09:00 (Accommodates early departure for Gurudongmar)',
      cancellation: 'Non-refundable within 5 days due to remote transport logistics.',
      childPolicy: 'Children over 7 years only recommended due to altitude considerations.',
      pets: 'Pets not allowed.',
    },
    coordinates: { lat: 27.7167, lng: 88.5577 },
    verifiedBadge: true,
  },
  {
    id: 'temi-tea-bungalow',
    slug: 'temi-tea-bungalow',
    name: 'Temi Tea Heritage Estate Bungalow',
    tagline: 'Colonial-style planter bungalow inside Sikkim’s sole organic royal tea garden',
    district: 'South Sikkim',
    location: 'Temi Tarku, South Sikkim',
    elevationFt: 4800,
    propertyType: 'Tea Estate Retreat',
    startingPriceInr: 9500,
    rating: 4.9,
    reviewCount: 64,
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Immerse yourself in serenity amidst 450 acres of terraced tea slopes established in 1969 by the last King of Sikkim. The heritage bungalow offers antique four-poster beds, morning tea plucking walks with estate supervisors, and private tea tastings of award-winning first-flush Temi organic black tea overlooking Mount Kanchenjunga.',
    highlights: [
      'Located directly in the middle of Sikkim’s only organic tea garden',
      'Private walking access through terraced emerald tea slopes',
      'Master tea tasting sessions conducted by resident tea planters',
      'Stunning views of Mount Tendong and the Teesta gorge',
    ],
    amenities: [
      'Tea Estate Views',
      'Complimentary Tea Tasting',
      'Guided Factory Tour',
      'Private Verandah',
      'Organic Meals',
      'Free Wi-Fi',
      'Driver Accommodation',
    ],
    roomTypes: [
      {
        id: 'planters-suite',
        name: 'The Planter’s Heritage Suite',
        description: 'Colonial style suite with polished rosewood writing desk, high ceilings, and wraparound veranda.',
        capacity: '2 Adults',
        bedType: 'Four-Poster King',
        pricePerNightInr: 9500,
        features: ['Wraparound Verandah', 'Private Tea Service', 'Fireplace', 'Breakfast & High Tea Included'],
      },
    ],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation up to 4 days prior.',
      childPolicy: 'Children of all ages welcome.',
      pets: 'Pets permitted on leash in garden grounds.',
    },
    coordinates: { lat: 27.2341, lng: 88.4219 },
    verifiedBadge: true,
  },
  {
    id: 'yangsum-farm-homestay',
    slug: 'yangsum-farm-homestay',
    name: 'Yangsum Heritage Farmstead',
    tagline: '1833 Bhutia family farmstead amidst cardamom groves & organic orchards',
    district: 'West Sikkim',
    location: 'Rinchenpong, West Sikkim',
    elevationFt: 5200,
    propertyType: 'Mountain Homestay',
    startingPriceInr: 6800,
    rating: 4.9,
    reviewCount: 88,
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Run by the Tshering family since 1833, Yangsum Farm sits on 44 private acres of organic crops, cardamom forest, and mandarin orange orchards. Guests dine around the traditional hearth with the host family, eating freshly harvested organic mountain greens, slow-cooked pork with local chilies, and sourdough breads.',
    highlights: [
      'Over 190 years of continuous Bhutia family stewardship',
      '100% certified organic farm-to-table cuisine prepared with wood smoke',
      'Serene forest walks through ancient magnolia and rhododendron woods',
      'Exceptional birdwatching with over 80 documented Himalayan avian species',
    ],
    amenities: [
      'Organic Farm Dining',
      'Cooking Demonstrations',
      'Guided Orchard Walks',
      'Kanchenjunga Ridge Vista',
      'Hot Showers',
      'Home Library',
    ],
    roomTypes: [
      {
        id: 'heritage-cottage',
        name: 'Traditional Bhutia Farm Room',
        description: 'Handmade stone and wood cottage featuring handcrafted wool rugs and private patio.',
        capacity: '2 Adults, 1 Child',
        bedType: 'Handmade Queen Bed',
        pricePerNightInr: 6800,
        features: ['Orchard View', 'All Three Meals (Organic Farm Spread)', 'Tea & Snacks', 'Guided Farm Walk'],
      },
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation up to 7 days before arrival.',
      childPolicy: 'Children under 6 stay free. Wonderful nature education for kids.',
      pets: 'Friendly pets welcome with prior notice.',
    },
    coordinates: { lat: 27.2458, lng: 88.2711 },
    verifiedBadge: true,
  },
  {
    id: 'silk-route-retreat-zuluk',
    slug: 'silk-route-retreat-zuluk',
    name: 'Old Silk Route Cloud Lodge Zuluk',
    tagline: 'High-altitude homestay perch above the clouds at 9,400 ft overlooking 32 hairpin bends',
    district: 'East Sikkim',
    location: 'Zuluk Hamlet, Old Silk Route',
    elevationFt: 9400,
    propertyType: 'Mountain Homestay',
    startingPriceInr: 4500,
    rating: 4.7,
    reviewCount: 52,
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    overview:
      'Perched on the rugged ridgeline of the trans-Himalayan Old Silk Route where camel caravans once rested on their journey into Tibet. This warm family-run lodge offers hot tea by the wood stove, home-cooked momos, warm thick quilts, and instant access to the sunrise spectacle at Thambi Viewpoint (11,200 ft).',
    highlights: [
      'Direct access to the 32 hairpin loops of Zuluk',
      '15 minutes drive to Thambi Viewpoint for sunrise over Kanchenjunga',
      'Authentic hospitality by local mountain family',
      'Warm wood-paneled bedrooms with mountain quilts',
    ],
    amenities: [
      'Heated Blankets',
      'Home Cooked Meals',
      'Hot Bucket Water / Geyser',
      'Campfire on Request',
      'Permit Assistance',
    ],
    roomTypes: [
      {
        id: 'zuluk-ridge-room',
        name: 'Ridge View Pine Room',
        description: 'Cozy alpine room overlooking misty gorges and prayer flag-strewn ridges.',
        capacity: '2 Adults',
        bedType: 'Double Bed',
        pricePerNightInr: 4500,
        features: ['Valley View', 'Includes Dinner & Breakfast', 'Electric Blanket'],
      },
    ],
    policies: {
      checkIn: '13:00',
      checkOut: '10:00',
      cancellation: 'Free cancellation up to 3 days prior.',
      childPolicy: 'Children welcome.',
      pets: 'Not permitted.',
    },
    coordinates: { lat: 27.2514, lng: 88.7842 },
    verifiedBadge: true,
  },
];
