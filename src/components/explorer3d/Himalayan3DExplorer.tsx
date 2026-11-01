import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useRouter } from '../../context/RouterContext';
import {
  Compass,
  Layers,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Clock,
  Sparkles,
  Maximize2,
  ChevronRight,
  Eye,
  Camera,
  Share2,
  AlertTriangle,
  Send,
  Navigation,
} from 'lucide-react';

export interface RealMapPoint {
  id: string;
  name: string;
  localName?: string;
  district: 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim';
  elevationFt: number;
  elevationM: number;
  lat: number;
  lng: number;
  zoomLevel: number;
  tagline: string;
  overview: string;
  bestSeason: string;
  roadStatus: 'Clear & Open' | 'Permit Checkpoint' | 'Snow Caution' | 'Army Restricted';
  drivingFromGangtok: string;
  permitRequirement: string;
  armyNotice?: string;
  highlights: string[];
  imageUrl: string;
  packageSlug?: string;
  destinationSlug?: string;
}

export const REAL_SIKKIM_POINTS: RealMapPoint[] = [
  {
    id: 'gurudongmar-lake',
    name: 'Gurudongmar Lake',
    localName: 'गुरुडोंगमार झील (Beyul Demazong)',
    district: 'North Sikkim',
    elevationFt: 17800,
    elevationM: 5430,
    lat: 28.0167,
    lng: 88.71,
    zoomLevel: 13,
    tagline: 'One of the highest freshwater lakes on Earth, sacred to Buddhists and Sikhs',
    overview:
      'Perched on the desolate Tibetan border plateau at 17,800 ft, sacred Gurudongmar Lake was blessed in the 8th century by Guru Padmasambhava. Even in brutal sub-zero winter temperatures (-35°C), a portion of the sacred turquoise water remains miraculously unfrozen.',
    bestSeason: 'April to June & October to mid-December',
    roadStatus: 'Permit Checkpoint',
    drivingFromGangtok: '175 km · ~8 hours (Requires overnight stay at Lachen)',
    permitRequirement: 'Protected Area Permit (PAP) mandatory. Indian nationals only.',
    armyNotice: 'Indian Army checkposts strictly mandate original Voter ID or Passport. Aadhaar and PAN cards are strictly NOT accepted.',
    highlights: ['17,800 ft sacred alpine lake', 'Never-freezing holy water patch', 'Mount Gurudongmar view', 'Chopta Valley trans-Himalayan plateau'],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'north-sikkim-high-altitude-expedition',
    destinationSlug: 'north-sikkim',
  },
  {
    id: 'yumthang-valley',
    name: 'Yumthang Valley of Flowers',
    localName: 'युमथांग घाटी (Shingba Rhododendron Sanctuary)',
    district: 'North Sikkim',
    elevationFt: 11693,
    elevationM: 3564,
    lat: 27.8286,
    lng: 88.7022,
    zoomLevel: 13,
    tagline: 'Glacial valley framed by sheer granite cliffs and 24 blooming wild rhododendron species',
    overview:
      'Carved by the crystal-clear Lachung Chu river, Yumthang Valley is the botanical crown of the Eastern Himalayas. Between April and May, ancient rhododendron trees bloom across the entire valley floor from pale cream to fiery crimson.',
    bestSeason: 'April to May (Rhododendron blooms) & October to December (Snow peaks)',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '140 km · ~6.5 hours (Overnight at Lachung)',
    permitRequirement: 'Protected Area Permit (PAP) mandatory for all visitors. Accessible to foreign tourists with Restricted Area Permits.',
    highlights: ['Shingba Rhododendron Sanctuary', 'Natural thermal hot springs', 'Glacial Lachung Chu river meadows', 'Yak pastures'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'north-sikkim-high-altitude-expedition',
    destinationSlug: 'north-sikkim',
  },
  {
    id: 'zero-point',
    name: 'Zero Point (Yumesamdong)',
    localName: 'ज़ीरो पॉइंट (15,300 ft Snowline)',
    district: 'North Sikkim',
    elevationFt: 15300,
    elevationM: 4663,
    lat: 27.9125,
    lng: 88.7389,
    zoomLevel: 13,
    tagline: 'The edge of civilization where all vehicular roads terminate against permanent snow',
    overview:
      'Located 25 km beyond Yumthang Valley close to the Chinese border, Zero Point is where three high-altitude mountain rivers converge amidst permanent snowfields. The air is thin, crisp, and pure Himalayan wilderness.',
    bestSeason: 'March to June & October to December',
    roadStatus: 'Snow Caution',
    drivingFromGangtok: '165 km · ~7.5 hours via Lachung',
    permitRequirement: 'Protected Area Permit (PAP) issued under special North Sikkim border clearance.',
    armyNotice: 'High-altitude cold and wind. Low atmospheric oxygen. Not recommended for infants under 3 years.',
    highlights: ['Permanent snowfields', 'Convergence of 3 mountain rivers', 'Hot maggi & tea at 15,300 ft'],
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'north-sikkim-high-altitude-expedition',
    destinationSlug: 'north-sikkim',
  },
  {
    id: 'lachen',
    name: 'Lachen Hamlet',
    localName: 'लाचेन (Big Pass)',
    district: 'North Sikkim',
    elevationFt: 9020,
    elevationM: 2750,
    lat: 27.7167,
    lng: 88.55,
    zoomLevel: 13,
    tagline: 'Traditional Lachenpa village governed by the historic Dzumsa democratic council',
    overview:
      'The base camp village for Gurudongmar Lake. Lachen maintains ancient self-governing Dzumsa tribal councils, bans single-use plastic bottles, and features traditional timber lodges nestled under colossal pine cliffs.',
    bestSeason: 'March to June & September to December',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '115 km · ~5.5 hours',
    permitRequirement: 'Protected Area Permit (PAP) mandatory.',
    highlights: ['Lachen Monastery', 'Dzumsa council tradition', 'Base for Gurudongmar Lake'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'north-sikkim-high-altitude-expedition',
    destinationSlug: 'north-sikkim',
  },
  {
    id: 'lachung',
    name: 'Lachung Village',
    localName: 'लाचुंग (Small Pass)',
    district: 'North Sikkim',
    elevationFt: 8610,
    elevationM: 2624,
    lat: 27.6891,
    lng: 88.743,
    zoomLevel: 13,
    tagline: 'Charming alpine mountain hamlet gateway to Yumthang Valley and Zero Point',
    overview:
      'Settled along both banks of the Lachung Chu river, Lachung is renowned for apple orchards, traditional wood-and-stone houses, and warm mountain hospitality beneath waterfalls cascading from cliff faces.',
    bestSeason: 'March to May & October to December',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '118 km · ~6 hours',
    permitRequirement: 'Protected Area Permit (PAP) mandatory.',
    highlights: ['Lachung Monastery', 'Apple orchards', 'Waterfalls along village fringes', 'Base for Yumthang'],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'north-sikkim-high-altitude-expedition',
    destinationSlug: 'north-sikkim',
  },
  {
    id: 'gangtok',
    name: 'Gangtok Capital Ridge',
    localName: 'गंगटोक (The Hilltop Ridge)',
    district: 'East Sikkim',
    elevationFt: 5410,
    elevationM: 1650,
    lat: 27.3389,
    lng: 88.6065,
    zoomLevel: 13,
    tagline: 'Capital city of royal heritage, pedestrian MG Marg & Kanchenjunga sunrise views',
    overview:
      'Perched along a mountain ridge overlooking the Ranipool River, Gangtok is the vibrant cultural and political heart of Sikkim. Famous for the clean, smoke-free pedestrian promenade of MG Marg, the Namgyal Institute of Tibetology, and royal monasteries.',
    bestSeason: 'September to June',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: 'Local Hub · 120 km from Bagdogra (4 hrs) / 35 km from Pakyong Airport (1 hr)',
    permitRequirement: 'Open access for Indian citizens. Free Inner Line Permit (ILP) on arrival for foreign tourists.',
    highlights: ['Pedestrian MG Marg', 'Namgyal Institute of Tibetology', 'Rumtek Royal Monastery', 'Gangtok Cable Car Ropeway'],
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'gangtok-tsomgo-weekend-getaway',
    destinationSlug: 'gangtok',
  },
  {
    id: 'tsomgo-lake',
    name: 'Sacred Tsomgo (Changu) Lake',
    localName: 'त्सोंगमो झील (12,313 ft Glacial Oval)',
    district: 'East Sikkim',
    elevationFt: 12313,
    elevationM: 3753,
    lat: 27.3742,
    lng: 88.7619,
    zoomLevel: 13,
    tagline: 'Glacial alpine lake sacred to Buddhist lamas who divined future omens in its changing water colors',
    overview:
      'Located 38 km from Gangtok along the Jawaharlal Nehru Road, Tsomgo Lake sits in a steep mountain bowl fed by snowmelt. In winter it freezes into crystalline ice; in spring the banks bloom with primulas and blue poppies.',
    bestSeason: 'October to December (Crystal reflections) & January to March (Snow & frozen lake)',
    roadStatus: 'Permit Checkpoint',
    drivingFromGangtok: '38 km · ~2 hours',
    permitRequirement: 'Protected Area Permit (PAP) mandatory.',
    armyNotice: 'Indian Army 17 Mountain Division checkpoint. Original Voter ID or Passport required.',
    highlights: ['12,313 ft glacial lake', 'Passenger Cable Car Ropeway to 14,000 ft', 'Decorated Yak rides', 'Alpine prayer flags'],
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'gangtok-tsomgo-weekend-getaway',
    destinationSlug: 'tsomgo-lake',
  },
  {
    id: 'nathula-pass',
    name: 'Nathu La Pass (14,140 ft)',
    localName: 'नाथू ला (The Listening Ears Pass)',
    district: 'East Sikkim',
    elevationFt: 14140,
    elevationM: 4310,
    lat: 27.3865,
    lng: 88.831,
    zoomLevel: 13,
    tagline: 'Historic Indo-China border mountain pass on the ancient Old Silk Route',
    overview:
      'Nathu La connects Sikkim with the Chumbi Valley of Tibet. Once a vital branch of the historic Silk Route trade caravan trails, it features the international border fence where Indian Army soldiers and Chinese PLA sentries stand guard.',
    bestSeason: 'May to October & October to mid-December (Open Wed to Sun for permitted visitors)',
    roadStatus: 'Army Restricted',
    drivingFromGangtok: '56 km · ~3 hours',
    permitRequirement: 'Special Protected Area Permit (PAP) approved by Sikkim Police and Army HQ. Indian citizens only.',
    armyNotice: 'Closed on Mondays and Tuesdays. Foreign nationals strictly restricted by Indian Ministry of Home Affairs.',
    highlights: ['Indo-China international border gate', 'Nehru Memorial Stone', 'War Memorial', 'Old Silk Route trade checkpoint'],
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'grand-sikkim-odyssey-2-weeks',
    destinationSlug: 'tsomgo-lake',
  },
  {
    id: 'zuluk-silk-route',
    name: 'Zuluk & 32 Hairpin Loops',
    localName: 'जुलुक (Old Silk Route 32 Hairpins)',
    district: 'East Sikkim',
    elevationFt: 9400,
    elevationM: 2865,
    lat: 27.2514,
    lng: 88.7842,
    zoomLevel: 13,
    tagline: 'Legendary 32-hairpin switchback loops carved on a single mountain face',
    overview:
      'Once a transit campsite for mule caravans trading silk, salt, and wool with Tibet, Zuluk offers one of the most thrilling mountain road engineering spectacles on Earth with sunrise vistas of Mount Kanchenjunga from Thambi viewpoint.',
    bestSeason: 'October to May (Best visibility & snow experience)',
    roadStatus: 'Permit Checkpoint',
    drivingFromGangtok: '90 km · ~4.5 hours via Rongli',
    permitRequirement: 'Protected Area Permit (PAP) mandatory.',
    highlights: ['32 Hairpin switchback curves', 'Thambi Viewpoint sunrise', 'Traditional village homestays', 'Old Silk Route trails'],
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'old-silk-route-zuluk-hairpins',
    destinationSlug: 'east-sikkim',
  },
  {
    id: 'pelling',
    name: 'Pelling Mountain Ridge',
    localName: 'पेलिंग (West Sikkim Kanchenjunga Sanctuary)',
    district: 'West Sikkim',
    elevationFt: 7200,
    elevationM: 2195,
    lat: 27.3167,
    lng: 88.2333,
    zoomLevel: 13,
    tagline: 'The closest unobstructed 180-degree panoramic vantage point of Mount Kanchenjunga',
    overview:
      'Pelling sits on a high mountain ridge directly facing the towering Kanchenjunga massif. Home to the royal Nyingma monastery of Pemayangtse (1705 CE), the 17th-century Rabdentse Palace ruins, and India’s premier Glass Skywalk.',
    bestSeason: 'October to May (Crystal mountain views)',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '115 km · ~4.5 hours',
    permitRequirement: 'Open access for all travelers.',
    highlights: ['180-degree Kanchenjunga view', 'Pelling Glass Skywalk & 137-ft Chenrezig', 'Pemayangtse Monastery', 'Rabdentse Palace ruins'],
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'royal-buddhist-heritage-sacred-monasteries',
    destinationSlug: 'pelling',
  },
  {
    id: 'khecheopalri-lake',
    name: 'Sacred Khecheopalri Lake',
    localName: 'खेचोपलरी झील (Wish-Fulfilling Footprint Lake)',
    district: 'West Sikkim',
    elevationFt: 5600,
    elevationM: 1707,
    lat: 27.3522,
    lng: 88.1994,
    zoomLevel: 13,
    tagline: 'Sacred wish-fulfilling lake where birds are said to catch every leaf that falls into the water',
    overview:
      'Revered by Buddhists as the sacred footprint of Goddess Tara and by Lepchas as the home of the mountain goddess, Khecheopalri Lake remains completely mirror-clear surrounded by ancient moss-draped forest and fluttering prayer flags.',
    bestSeason: 'Year-round; October to May is peaceful',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '140 km · ~5 hours via Pelling',
    permitRequirement: 'Open access. Visitors remove shoes before wooden lake jetty.',
    highlights: ['Sacred wish-fulfilling lake jetty', 'Miraculously clean waters', 'Surrounding holy prayer flags', 'Panoramic ridge hike'],
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'spiritual-solace-sacred-lakes',
    destinationSlug: 'west-sikkim',
  },
  {
    id: 'yuksom',
    name: 'Historic Yuksom (1642 CE)',
    localName: 'युक्सोम (The Meeting Place of the Three Holy Lamas)',
    district: 'West Sikkim',
    elevationFt: 5840,
    elevationM: 1780,
    lat: 27.3697,
    lng: 88.2239,
    zoomLevel: 13,
    tagline: 'The historic first coronation capital of Sikkim and gateway to Kanchenjunga National Park',
    overview:
      'In 1642 CE, three venerable Buddhist lamas from Tibet converged here and crowned Phuntsog Namgyal as the first Chogyal (king) of Sikkim at the stone Coronation Throne of Norbugang. Yuksom is also the starting trailhead for the famous Dzongri and Goecha La trek.',
    bestSeason: 'October to May',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '145 km · ~5.5 hours',
    permitRequirement: 'Open access. Forest permit for Dzongri trek.',
    highlights: ['Coronation Throne of Norbugang', 'Dubdi 1701 CE Monastery', 'Kathok Sacred Lake', 'Gateway to Kanchenjunga Park'],
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'kanchenjunga-active-trekker-yuksom',
    destinationSlug: 'west-sikkim',
  },
  {
    id: 'namchi',
    name: 'Namchi Cultural Complex',
    localName: 'नामची (Solophok Char Dham & Samdruptse)',
    district: 'South Sikkim',
    elevationFt: 4314,
    elevationM: 1315,
    lat: 27.1667,
    lng: 88.35,
    zoomLevel: 13,
    tagline: 'Home of the 135-foot Golden Guru Padmasambhava and Solophok Char Dham',
    overview:
      'The administrative capital of South Sikkim. Samdruptse Hill ("The Wish-Fulfilling Well") features the iconic 135-ft golden statue of Guru Rinpoche, while Solophok Hill hosts the grand Siddhesvara Dhaam cultural complex with its 108-foot Shiva temple.',
    bestSeason: 'Year-round; October to May is optimal',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '78 km · ~2.5 hours',
    permitRequirement: 'Open access for all travelers.',
    highlights: ['135-ft Golden Guru Padmasambhava at Samdruptse', 'Solophok Char Dham 108-ft Shiva', 'Tarey Bhir knife-edge ridge walk'],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'royal-buddhist-heritage-sacred-monasteries',
    destinationSlug: 'namchi',
  },
  {
    id: 'ravangla',
    name: 'Ravangla Buddha Park',
    localName: 'रवांगला (Tathagata Tsal)',
    district: 'South Sikkim',
    elevationFt: 7000,
    elevationM: 2134,
    lat: 27.3061,
    lng: 88.3631,
    zoomLevel: 13,
    tagline: 'Monumental 130-foot bronze statue of Lord Buddha consecrated by the 14th Dalai Lama',
    overview:
      'Set against the towering backdrop of Mount Narsing and Mount Kabru, Tathagata Tsal (Buddha Park) spans manicured spiritual gardens centered on a monumental 130-foot bronze Buddha statue.',
    bestSeason: 'October to May (Clear skies & cham festival dances)',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '65 km · ~2.5 hours',
    permitRequirement: 'Open access.',
    highlights: ['130-ft bronze Buddha statue', 'Dalai Lama consecrated museum', 'Palchen Choeling Ralang Monastery', 'Maenam Wildlife Sanctuary'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'spiritual-solace-sacred-lakes',
    destinationSlug: 'ravangla',
  },
  {
    id: 'temi-tea',
    name: 'Temi Organic Tea Estate',
    localName: 'टेमी चाय बागान (The Only Tea Garden in Sikkim)',
    district: 'South Sikkim',
    elevationFt: 5500,
    elevationM: 1676,
    lat: 27.2403,
    lng: 88.4239,
    zoomLevel: 13,
    tagline: '440 rolling acres of 100% certified organic tea terraces established in 1969 by the last Chogyal',
    overview:
      'Established in 1969 by King Palden Thondup Namgyal, Temi is the only tea garden in the entire state of Sikkim. Blanketing the emerald slopes of Tendong Hill, it produces prized organic golden and first-flush orthodox teas.',
    bestSeason: 'March to November (Plucking season) & November (Cherry blossoms)',
    roadStatus: 'Clear & Open',
    drivingFromGangtok: '50 km · ~2 hours',
    permitRequirement: 'Open access.',
    highlights: ['100% certified organic tea factory tour', 'Tea tasting salon', 'Cherry blossom boulevard in November', 'Zip-lining over tea bushes'],
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'sikkim-darjeeling-colonial-tea-circuits',
    destinationSlug: 'south-sikkim',
  },
  {
    id: 'kanchenjunga',
    name: 'Mount Kanchenjunga (28,169 ft)',
    localName: 'कंगचेनद्ज़ोंगा (Five Treasures of the High Snow)',
    district: 'West Sikkim',
    elevationFt: 28169,
    elevationM: 8586,
    lat: 27.7025,
    lng: 88.1475,
    zoomLevel: 12,
    tagline: 'Third-highest peak on Earth and guardian deity of Sikkim',
    overview:
      'The sacred heart of Sikkim. In accordance with Sikkimese religious traditions and treaties with the British in 1955, mountaineering expeditions stop a few yards short of the true summit to keep the peak uncontaminated.',
    bestSeason: 'October to December & March to May for views',
    roadStatus: 'Snow Caution',
    drivingFromGangtok: 'Visible across all ridges; trekking trailhead at Yuksom (145 km)',
    permitRequirement: 'Khangchendzonga National Park wilderness permit for trekking routes.',
    highlights: ['Third highest mountain in the world', 'Sacred five snow treasures', 'UNESCO World Heritage Mixed Site', 'Alpenglow sunrise'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    packageSlug: 'grand-sikkim-odyssey-2-weeks',
    destinationSlug: 'west-sikkim',
  },
];

export const Himalayan3DExplorer: React.FC = () => {
  const { navigate } = useRouter();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [selectedPoint, setSelectedPoint] = useState<RealMapPoint>(REAL_SIKKIM_POINTS[0]);
  const [districtFilter, setDistrictFilter] = useState<'All' | 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim'>('All');
  const [mapStyle, setMapStyle] = useState<'satellite' | 'topo' | 'streets'>('satellite');
  const [is3dPerspective, setIs3dPerspective] = useState<boolean>(true);

  // Initialize Leaflet Map with High-Resolution Satellite Tiles
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Sikkim: 27.5330° N, 88.5122° E, Zoom level 9
    const map = L.map(mapContainerRef.current, {
      center: [27.533, 88.512],
      zoom: 9,
      minZoom: 8,
      maxZoom: 17,
      zoomControl: false,
    });

    // Custom Top-Right Zoom controls
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Primary Satellite Tile Layer: Esri World Imagery (High-Res Real Satellite Photos)
    const esriSatellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Esri World Imagery | High-Res Satellite | Sikkim Tour Co.',
        maxZoom: 18,
      }
    );

    esriSatellite.addTo(map);

    // Save map instance
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map layer on style change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapStyle === 'satellite') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { attribution: 'Esri World Imagery | Satellite', maxZoom: 18 }
      ).addTo(map);
    } else if (mapStyle === 'topo') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri World Topographic | Himalayan Contours',
          maxZoom: 18,
        }
      ).addTo(map);
    } else {
      // 100% Open Access Road & Highway Map (Zero API Key Required, Complete Himalayan Roads & Passes)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | Himalayan Highways & Roads',
        maxZoom: 19,
      }).addTo(map);
    }
  }, [mapStyle]);

  // Render interactive markers on map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered =
      districtFilter === 'All'
        ? REAL_SIKKIM_POINTS
        : REAL_SIKKIM_POINTS.filter((p) => p.district === districtFilter);

    filtered.forEach((pt) => {
      const isSelected = selectedPoint.id === pt.id;

      // Custom mountain pin icon HTML with 3D elevation badge
      const iconHtml = `
        <div class="relative flex flex-col items-center justify-center cursor-pointer group">
          <div class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
            isSelected
              ? 'bg-[#EBA94B] ring-4 ring-white text-[#103D35] scale-125 z-50'
              : 'bg-[#103D35] text-[#EBA94B] hover:scale-110 hover:bg-[#185247] ring-2 ring-[#EBA94B]/70'
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
            </svg>
          </div>
          <div class="mt-1 px-2 py-0.5 whitespace-nowrap rounded text-[11px] font-semibold tracking-wide shadow-md pointer-events-none transition-all ${
            isSelected
              ? 'bg-[#103D35] text-white ring-1 ring-[#EBA94B]'
              : 'bg-white/95 text-[#103D35] group-hover:bg-[#103D35] group-hover:text-white'
          }">
            ${pt.name} · ${pt.elevationFt.toLocaleString('en-IN')} ft
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-himalayan-pin',
        html: iconHtml,
        iconSize: [36, 44],
        iconAnchor: [18, 22],
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        flyToPoint(pt);
      });

      markersRef.current.push(marker);
    });
  }, [districtFilter, selectedPoint]);

  // Fly to point on map
  const flyToPoint = (pt: RealMapPoint) => {
    setSelectedPoint(pt);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([pt.lat, pt.lng], pt.zoomLevel, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  };

  const filteredPoints =
    districtFilter === 'All'
      ? REAL_SIKKIM_POINTS
      : REAL_SIKKIM_POINTS.filter((p) => p.district === districtFilter);

  const whatsappMessage = encodeURIComponent(
    `Hi Sikkim Tour Co., I am inquiring about travel details and permits for ${selectedPoint.name} (${selectedPoint.elevationFt.toLocaleString('en-IN')} ft) in ${selectedPoint.district}. Could you share an indicative quote and route itinerary?`
  );

  return (
    <div className="relative w-full h-[840px] bg-[#0A2621] overflow-hidden rounded-2xl border border-[#EBA94B]/30 shadow-2xl flex flex-col font-sans">
      {/* TOP HEADER CONTROLS BAR (OFFICIAL LOGO PALETTE) */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#103D35]/95 backdrop-blur-md border-b border-[#EBA94B]/30 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EBA94B]/20 border border-[#EBA94B]/60 flex items-center justify-center text-[#EBA94B] shadow-sm">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg tracking-wide text-white font-bold">
                Real Sikkim Satellite & Mountain Map
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#EBA94B] text-[#103D35] font-extrabold shadow-xs">
                Live GIS
              </span>
            </div>
            <p className="text-xs text-white/80">
              Esri World Imagery satellite photography, verified GPS coordinates & altitude profiles
            </p>
          </div>
        </div>

        {/* MAP LAYER SWITCHER & 3D CONTROLS */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Layer switcher */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/15">
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mapStyle === 'satellite'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              🛰️ Satellite
            </button>
            <button
              onClick={() => setMapStyle('topo')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mapStyle === 'topo'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              🏔️ Topo Relief
            </button>
            <button
              onClick={() => setMapStyle('streets')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mapStyle === 'streets'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              🗺️ Roads
            </button>
          </div>

          {/* 3D Perspective Tilt Toggle */}
          <button
            onClick={() => setIs3dPerspective(!is3dPerspective)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              is3dPerspective
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B]'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
            }`}
            title="Tilt map to experience 3D mountain flight relief"
          >
            <Layers className="w-3.5 h-3.5" />
            {is3dPerspective ? 'Exit 3D Tilt' : '3D Relief Tilt'}
          </button>

          {/* Whole Sikkim Reset */}
          <button
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo([27.533, 88.512], 9, { duration: 1 });
              }
            }}
            className="p-1.5 rounded-lg bg-white/10 text-white/80 hover:text-white hover:bg-white/20 border border-white/20"
            title="Reset to whole Sikkim view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DISTRICT FILTER CHIPS */}
      <div className="relative z-10 flex items-center gap-2 px-5 py-2.5 bg-[#0A2621]/90 border-b border-white/10 overflow-x-auto text-xs text-white">
        <span className="text-white/60 font-medium">Filter District:</span>
        {(['All', 'North Sikkim', 'East Sikkim', 'West Sikkim', 'South Sikkim'] as const).map(
          (district) => (
            <button
              key={district}
              onClick={() => setDistrictFilter(district)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                districtFilter === district
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold shadow-xs'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {district}
            </button>
          )
        )}
      </div>

      {/* MAP MAIN WORKSPACE */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* LEAFLET MAP ELEMENT */}
        <div
          ref={mapContainerRef}
          className={`w-full h-full transition-transform duration-700 ease-out ${
            is3dPerspective
              ? 'origin-bottom transform perspective-[1400px] rotate-x-[24deg] scale-[1.04] brightness-105'
              : ''
          }`}
          style={{ zIndex: 1 }}
        />

        {/* LEFT ELEVATION CHECKPOINTS LIST */}
        <div className="absolute top-4 left-4 z-10 w-76 max-h-[88%] bg-[#103D35]/95 backdrop-blur-md rounded-xl border border-[#EBA94B]/30 shadow-2xl p-3 flex flex-col text-white hidden md:flex">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#EBA94B] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" /> Elevation Checkpoints
            </span>
            <span className="text-[11px] text-white/60 font-mono">
              {filteredPoints.length} Spots
            </span>
          </div>

          <div className="overflow-y-auto pr-1 mt-2 space-y-1.5 flex-1 custom-scrollbar">
            {filteredPoints.map((pt) => {
              const isSelected = selectedPoint.id === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => flyToPoint(pt)}
                  className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start justify-between gap-2 border ${
                    isSelected
                      ? 'bg-[#EBA94B]/25 border-[#EBA94B] text-white shadow-md'
                      : 'bg-black/30 border-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-white flex items-center gap-1.5 truncate">
                      <MapPin
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? 'text-[#EBA94B]' : 'text-[#3B7FA3]'
                        }`}
                      />
                      <span className="truncate">{pt.name}</span>
                    </div>
                    <div className="text-[10px] text-white/60 ml-5 truncate mt-0.5">{pt.district}</div>
                  </div>
                  <div className="text-right whitespace-nowrap shrink-0">
                    <span
                      className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        pt.elevationFt >= 14000
                          ? 'bg-red-500/25 text-red-200 border border-red-500/40'
                          : pt.elevationFt >= 10000
                          ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40'
                          : 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
                      }`}
                    >
                      {pt.elevationFt.toLocaleString('en-IN')} ft
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SELECTED POINT DETAIL DRAWER */}
        {selectedPoint && (
          <div className="absolute top-4 right-4 z-10 w-96 max-h-[92%] bg-[#103D35]/95 backdrop-blur-md rounded-xl border border-[#EBA94B]/40 shadow-2xl overflow-hidden flex flex-col text-white">
            {/* DESTINATION IMAGE */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={selectedPoint.imageUrl}
                alt={selectedPoint.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103D35] via-transparent to-black/40" />
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[#EBA94B] font-mono text-xs font-bold border border-[#EBA94B]/40">
                {selectedPoint.elevationFt.toLocaleString('en-IN')} ft ({selectedPoint.elevationM} m)
              </div>
              <div className="absolute bottom-2 left-3">
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[#EBA94B] text-[#103D35] font-bold">
                  {selectedPoint.district}
                </span>
                <h4 className="font-serif text-lg text-white font-bold mt-1 leading-tight">
                  {selectedPoint.name}
                </h4>
              </div>
            </div>

            {/* DETAILS CONTENT */}
            <div className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs text-white/85 custom-scrollbar">
              <p className="text-white/90 leading-relaxed italic border-l-2 border-[#EBA94B] pl-2.5">
                "{selectedPoint.tagline}"
              </p>

              <p className="text-white/75 leading-relaxed">{selectedPoint.overview}</p>

              {/* MANDATORY ARMY PERMIT DISCLOSURE */}
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 space-y-1">
                <div className="flex items-center gap-1.5 text-red-300 font-semibold text-[11px]">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  Mandatory Permit & Army Checkpoint Rule
                </div>
                <p className="text-[11px] text-red-200/90 leading-relaxed">
                  {selectedPoint.permitRequirement}
                </p>
                {selectedPoint.armyNotice && (
                  <p className="text-[10px] text-amber-300/95 font-medium mt-1 pt-1 border-t border-red-500/20">
                    ⚠️ {selectedPoint.armyNotice}
                  </p>
                )}
              </div>

              {/* TRANSIT & ROAD ADVISORY */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/10">
                  <div className="text-white/50 text-[10px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#EBA94B]" /> Driving Duration
                  </div>
                  <div className="font-medium text-white/90 mt-0.5">
                    {selectedPoint.drivingFromGangtok}
                  </div>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/10">
                  <div className="text-white/50 text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#EBA94B]" /> Best Season
                  </div>
                  <div className="font-medium text-white/90 mt-0.5">
                    {selectedPoint.bestSeason}
                  </div>
                </div>
              </div>

              {/* HIGHLIGHTS BULLETS */}
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#EBA94B] font-semibold mb-1.5">
                  Key Highlights:
                </div>
                <ul className="space-y-1">
                  {selectedPoint.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-white/80 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EBA94B]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DIRECT WHATSAPP & EMAIL CONVERSION (NO ACCOUNT NEEDED) */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <a
                  href={`https://wa.me/917001846727?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Chat on WhatsApp for this Spot
                </a>

                <a
                  href={`mailto:info@sikkimtourco.com?subject=Inquiry for ${encodeURIComponent(
                    selectedPoint.name
                  )}&body=Hi Sikkim Tour Co., I want to plan a journey to ${encodeURIComponent(
                    selectedPoint.name
                  )} (Altitude: ${selectedPoint.elevationFt.toLocaleString('en-IN')} ft).`}
                  className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  Email Us an Inquiry
                </a>

                {selectedPoint.packageSlug && (
                  <button
                    onClick={() => navigate(`/packages/${selectedPoint.packageSlug}`)}
                    className="w-full py-1.5 text-center text-[#EBA94B] hover:text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-all"
                  >
                    View Corresponding Tour Package <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BAR WITH ADVISORY REMINDER */}
      <div className="relative z-10 px-5 py-2.5 bg-[#103D35] border-t border-[#EBA94B]/30 text-[11px] text-white/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#EBA94B] shrink-0" />
          <span>
            <strong>Real Mountain Reality:</strong> High border passes (Gurudongmar 17,800 ft, Nathula 14,140 ft, Zero Point 15,300 ft) require acclimatization & army permits. Carry original Voter ID or Passport.
          </span>
        </div>
        <div className="text-[#EBA94B] font-semibold flex items-center gap-1 shrink-0">
          <span>Concierge WhatsApp: +91 70018 46727</span>
        </div>
      </div>
    </div>
  );
};
