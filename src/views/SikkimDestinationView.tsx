import React from 'react';
import { useRouter } from '../context/RouterContext';
import {
  Compass,
  MapPin,
  Mountain,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Calendar,
  Clock,
  Car,
  ChevronRight,
} from 'lucide-react';
import { siteConfig } from '../config/site';

interface RegionalDestinationCard {
  id: string;
  regionName: string;
  regionParam: string;
  badge: string;
  tagline: string;
  description: string;
  imageUrl: string;
  destinations: string[];
  altitude: string;
  permitStatus: string;
  packageCount: string;
}

const SIKKIM_REGIONS: RegionalDestinationCard[] = [
  {
    id: 'north-sikkim',
    regionName: 'NORTH SIKKIM',
    regionParam: 'North Sikkim',
    badge: 'High Altitude Alpine Frontier',
    tagline: 'Gurudongmar Lake, Yumthang Valley of Flowers & Zero Point',
    description:
      'Home to dramatic cold-desert plateaus, sacred glacial lakes at 17,800 ft, and the famous rhododendron sanctuaries of Lachung. Protected border zone requiring Indian Army liaison.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      'Gangtok',
      'Lachen',
      'Lachung',
      'Gurudongmar Lake',
      'Yumthang Valley',
      'Zero Point',
      'Thangu Valley',
    ],
    altitude: 'Up to 17,800 ft (Gurudongmar)',
    permitStatus: 'Protected Area Permit (PAP) Mandatory (Voter ID / Passport required)',
    packageCount: '15 Curated Packages',
  },
  {
    id: 'east-sikkim',
    regionName: 'EAST SIKKIM',
    regionParam: 'East Sikkim',
    badge: 'Capital & Old Silk Route',
    tagline: 'Gangtok, Tsomgo Glacial Lake, Nathula Pass & 32 Zigzag Loops',
    description:
      'The bustling cultural core and capital city of Gangtok, paired with high-altitude border passes at Nathula (14,140 ft) and the winding historic trade trails of the Old Silk Route.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      'Gangtok',
      'Tsomgo Lake',
      'Nathula Pass',
      'Baba Mandir',
      'Zuluk',
      'Nathang Valley',
      'Aritar',
      'Silk Route',
    ],
    altitude: '5,400 ft to 14,140 ft (Nathula)',
    permitStatus: 'PAP Required for Tsomgo, Nathula & Silk Route',
    packageCount: '16 Curated Packages',
  },
  {
    id: 'west-sikkim',
    regionName: 'WEST SIKKIM',
    regionParam: 'West Sikkim',
    badge: 'Royal Heritage & Kanchenjunga Vistas',
    tagline: 'Pelling Glass Skywalk, Ancient Yuksom, Barsey Sanctuary & Kaluk',
    description:
      'The historical cradle of the Sikkim Kingdom with 17th-century coronation thrones, India\'s first Glass Skywalk, sacred leaf-free lakes, and prime front-row views of Mount Kanchenjunga.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      'Pelling',
      'Yuksom',
      'Kaluk',
      'Rinchenpong',
      'Uttarey',
      'Okhrey',
      'Hilley',
      'Barsey',
    ],
    altitude: '5,500 ft to 10,000 ft (Barsey)',
    permitStatus: 'No Border Permits Required for Indian Citizens',
    packageCount: '14 Curated Packages',
  },
  {
    id: 'south-sikkim',
    regionName: 'SOUTH SIKKIM',
    regionParam: 'South Sikkim',
    badge: 'Spiritual Haven & Organic Tea',
    tagline: 'Ravangla 130-ft Buddha Park, Temi Tea Estate & Namchi Char Dham',
    description:
      'A serene realm of monumental religious statues, rolling organic tea gardens, and peaceful natural hot springs. Mild temperate climate ideal for families and senior travelers.',
    imageUrl: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=1600&q=80',
    destinations: [
      'Namchi',
      'Ravangla',
      'Temi Tea Garden',
      'Borong and nearby attractions',
    ],
    altitude: '4,500 ft to 7,000 ft (Ravangla)',
    permitStatus: 'No Border Permits Required for Indian Citizens',
    packageCount: '11 Curated Packages',
  },
];

export const SikkimDestinationView: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#CA1D3B] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigate('/destinations')}
            className="hover:text-[#CA1D3B] transition-colors cursor-pointer"
          >
            Destinations
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#0F2B48]">Sikkim Regional Hub</span>
        </nav>

        {/* Hero Photographic Banner with Smooth Yatra Branding */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-2xl min-h-[340px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-12 text-white bg-[#0F2B48]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80"
            alt="The Himalayan Kingdom of Sikkim"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B48]/95 via-[#0F2B48]/60 to-black/30" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CA1D3B] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                <Compass className="w-3.5 h-3.5" />
                Sikkim Destination Guide
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                4 Geographical Regions · 36 Curated Itineraries
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Explore Sikkim by Region: North, East, West &amp; South
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
              From the extreme high-altitude glacial waters of Gurudongmar (17,800 ft) to the organic tea estates of Temi and royal coronation thrones of Yuksom. Select your preferred region below to explore dedicated tour packages with private mountain fleets and army permit handling.
            </p>
          </div>
        </div>

        {/* Crucial Regional Clarification Alert */}
        <div className="mb-10 p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-stone-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase font-bold tracking-wider text-amber-900">
              Important Geographical Clarification
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>North Sikkim</strong> is an alpine district within the state of Sikkim (encompassing Lachen, Lachung, Gurudongmar Lake, and Yumthang Valley). It is <strong>completely separate</strong> from North-East India (which refers to the entire seven-sister regional bloc). North Sikkim operates under special Sikkim Police and Indian Army Protected Area Permit (PAP) regulations.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#CA1D3B] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Four Regional Gateways</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2B48]">
            Choose Your Sikkim Destination Region
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Click on any region card below to open its dedicated package catalogue and day-by-day itineraries.
          </p>
        </div>

        {/* FOUR LARGE PHOTOGRAPHIC REGIONAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SIKKIM_REGIONS.map((region) => (
            <div
              key={region.id}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photographic Card Header */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={region.imageUrl}
                  alt={region.regionName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B48]/95 via-[#0F2B48]/40 to-transparent" />

                {/* Region Badge & Package Count */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#CA1D3B] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {region.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                    {region.packageCount}
                  </span>
                </div>

                {/* Title & Tagline inside Hero */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="text-[11px] font-mono tracking-widest uppercase text-[#CA1D3B] bg-white/95 px-2 py-0.5 rounded-xs inline-block mb-1.5 font-bold">
                    {region.regionName}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white drop-shadow-sm leading-snug">
                    {region.tagline}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {region.description}
                </p>

                {/* Destinations Covered List */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#0F2B48] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#CA1D3B]" />
                    <span>Key Destinations Covered:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {region.destinations.map((dest, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 shadow-2xs"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Logistics Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-[#0F2B48] shrink-0" />
                    <span className="truncate">{region.altitude}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{region.permitStatus}</span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-3 border-t border-stone-100">
                  <button
                    onClick={() =>
                      navigate(`/packages?region=${encodeURIComponent(region.regionParam)}`)
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#0F2B48] hover:bg-[#CA1D3B] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md cursor-pointer group-hover:translate-y-[-1px]"
                  >
                    <span>View {region.regionName} Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customise Sikkim Trip Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0F2B48] via-[#163a5f] to-[#0F2B48] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Tailored Multi-District Itineraries</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Looking for a combined Sikkim tour linking multiple regions?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              We design bespoke private circuits across North, East, West, and South Sikkim with dedicated Innova / Scorpio fleets, vetted chauffeurs, and pre-arranged Protected Area Permits.
            </p>
          </div>

          <button
            onClick={() => navigate('/customise-trip?dest=Sikkim')}
            className="px-6 py-3.5 bg-[#CA1D3B] hover:bg-[#b01833] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            Request a Custom Sikkim Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default SikkimDestinationView;

