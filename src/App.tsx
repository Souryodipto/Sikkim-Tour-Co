import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HimalayanLoadingScreen } from './components/HimalayanLoadingScreen';
import { CursorSnowTrail } from './components/CursorSnowTrail';

import { HomeView } from './views/HomeView';

const DestinationsView = React.lazy(() => import('./views/DestinationsView').then(m => ({ default: m.DestinationsView })));
const DestinationDetailView = React.lazy(() => import('./views/DestinationDetailView').then(m => ({ default: m.DestinationDetailView })));
const PackagesView = React.lazy(() => import('./views/PackagesView').then(m => ({ default: m.PackagesView })));
const PackageDetailView = React.lazy(() => import('./views/PackageDetailView').then(m => ({ default: m.PackageDetailView })));
const AccommodationsView = React.lazy(() => import('./views/AccommodationsView').then(m => ({ default: m.AccommodationsView })));
const AccommodationDetailView = React.lazy(() => import('./views/AccommodationDetailView').then(m => ({ default: m.AccommodationDetailView })));
const BookingCheckoutView = React.lazy(() => import('./views/BookingCheckoutView').then(m => ({ default: m.BookingCheckoutView })));
const BookingConfirmationView = React.lazy(() => import('./views/BookingConfirmationView').then(m => ({ default: m.BookingConfirmationView })));
const AdminDashboardView = React.lazy(() => import('./views/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));
const ExperiencesView = React.lazy(() => import('./views/ExperiencesView').then(m => ({ default: m.ExperiencesView })));
const ExperienceDetailView = React.lazy(() => import('./views/ExperienceDetailView').then(m => ({ default: m.ExperienceDetailView })));
const InternationalTravelView = React.lazy(() => import('./views/InternationalTravelView').then(m => ({ default: m.InternationalTravelView })));
const CustomiseTripView = React.lazy(() => import('./views/CustomiseTripView').then(m => ({ default: m.CustomiseTripView })));
const TravelGuidesView = React.lazy(() => import('./views/TravelGuidesView').then(m => ({ default: m.TravelGuidesView })));
const TravelGuideDetailView = React.lazy(() => import('./views/TravelGuideDetailView').then(m => ({ default: m.TravelGuideDetailView })));
const AboutView = React.lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));
const ContactView = React.lazy(() => import('./views/ContactView').then(m => ({ default: m.ContactView })));
const ReviewsView = React.lazy(() => import('./views/ReviewsView').then(m => ({ default: m.ReviewsView })));
const WeatherView = React.lazy(() => import('./views/WeatherView').then(m => ({ default: m.WeatherView })));
const PolicyView = React.lazy(() => import('./views/PolicyView').then(m => ({ default: m.PolicyView })));
const AdminEnquiriesView = React.lazy(() => import('./views/AdminEnquiriesView').then(m => ({ default: m.AdminEnquiriesView })));
const DisclosuresView = React.lazy(() => import('./views/DisclosuresView').then(m => ({ default: m.DisclosuresView })));
const FaqView = React.lazy(() => import('./views/FaqView').then(m => ({ default: m.FaqView })));

const AppContent: React.FC = () => {
  const { currentRoute, navigate } = useRouter();

  const renderCurrentView = () => {
    switch (currentRoute.view) {
      case 'home':
        return <HomeView />;
      case 'disclosures':
        return <DisclosuresView />;
      case 'destinations':
        return <DestinationsView />;
      case 'destination-detail':
        return <DestinationDetailView slug={currentRoute.slug || 'gangtok'} />;
      case 'packages':
        return <PackagesView />;
      case 'gangtok-packages':
        return (
          <PackagesView
            destinationTag="Gangtok"
            customH1="Gangtok Tour Packages &amp; Sightseeing Itineraries (2026)"
            customSubtitle="Handcrafted 3 to 7-day Gangtok holiday packages featuring Tsomgo Lake, Nathula Pass, MG Marg stays, and private mountain transport."
            customBadge="Gangtok &amp; East Sikkim Packages"
          />
        );
      case 'north-sikkim-packages':
        return (
          <PackagesView
            districtFilter="North Sikkim"
            customH1="North Sikkim Tour Packages: Lachen, Lachung, Gurudongmar &amp; Yumthang"
            customSubtitle="Official 3 to 6-day North Sikkim expeditions to Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, Zero Point, and Lachen/Lachung with dedicated Army permit paperwork handling."
            customBadge="North Sikkim Alpine Frontier"
          />
        );
      case 'pelling-packages':
        return (
          <PackagesView
            districtFilter="West Sikkim"
            customH1="Pelling Tour Packages: West Sikkim Kanchenjunga &amp; Heritage Trails"
            customSubtitle="Scenic Pelling tour packages featuring the Glass Skywalk, Rabdentse Palace ruins, Pemayangtse Monastery, and panoramic views of Mount Kanchenjunga."
            customBadge="Pelling &amp; West Sikkim Packages"
          />
        );
      case 'silk-route-packages':
        return (
          <PackagesView
            categoryFilter="Silk Route"
            customH1="Old Silk Route Zuluk Tour Packages: 32 Hairpin Bends &amp; Kupup Lake"
            customSubtitle="Traverse the historic Himalayan Silk Route across Zuluk, Lungthung sunrise point, Thambi view, Kupup Elephant Lake, and Baba Mandir."
            customBadge="Old Silk Route Zuluk Circuit"
          />
        );
      case 'honeymoon-packages':
        return (
          <PackagesView
            categoryFilter="Honeymoon &amp; Luxury"
            customH1="Sikkim Honeymoon Packages: Romantic Himalayan Stays &amp; Starlit Valleys"
            customSubtitle="Tailored romantic escapes with luxury heritage boutique stays, private chauffeurs, candlelit dinners in Gangtok and Pelling, and serene lake excursions."
            customBadge="Honeymoon &amp; Romantic Luxury"
          />
        );
      case 'family-packages':
        return (
          <PackagesView
            categoryFilter="Family &amp; Soft Adventure"
            customH1="Sikkim Family Tour Packages: Leisure Mountain Vacations for All Ages"
            customSubtitle="Thoughtfully paced family itineraries with comfortable Innova transport, kid-friendly nature walks, cable car rides, and relaxed mountain resorts."
            customBadge="Family Mountain Holidays"
          />
        );
      case 'east-sikkim-packages':
        return (
          <PackagesView
            districtFilter="East Sikkim"
            customH1="East Sikkim Tour Packages: Gangtok, Tsomgo Lake &amp; Old Silk Route"
            customSubtitle="Official East Sikkim tours featuring MG Marg, Tsomgo Lake, Baba Mandir, Nathu La pass, and the 32 hairpin turns of Zuluk with permit processing."
            customBadge="East Sikkim Border Passes &amp; Capital"
          />
        );
      case 'west-sikkim-packages':
        return (
          <PackagesView
            districtFilter="West Sikkim"
            customH1="West Sikkim Tour Packages: Pelling, Pemayangtse &amp; Ancient Yuksom"
            customSubtitle="Scenic West Sikkim tours featuring the Pelling Glass Skywalk, Rabdentse royal ruins, sacred Khecheopalri Lake, and Dubdi Monastery with Kanchenjunga views."
            customBadge="West Sikkim Royal Heritage"
          />
        );
      case 'south-sikkim-packages':
      case 'darjeeling-packages':
        return (
          <PackagesView
            districtFilter="South Sikkim"
            customH1="South Sikkim Tour Packages: Ravangla, Buddha Park, Temi Tea &amp; Namchi"
            customSubtitle="Handcrafted 3 to 7-day South Sikkim holidays featuring the 130-ft Buddha Park, organic Temi Tea Garden, Samdruptse Hill, and Char Dham pilgrimage."
            customBadge="South Sikkim Cultural &amp; Tea Haven"
          />
        );
      case 'gurudongmar-tour':
        return (
          <PackagesView
            destinationTag="Gurudongmar"
            customH1="Gurudongmar Lake Tour Packages (17,800 ft) | High Altitude Alpine Expeditions"
            customSubtitle="Ascend to sacred Gurudongmar Lake with acclimitized Lachen night halts, verified 4x4 Mahindra Scorpio/Innova Crysta, and complete Indian Army checkpost permit paperwork handling."
            customBadge="17,800 ft High Altitude Sanctuary"
          />
        );
      case 'nathula-tour':
        return (
          <PackagesView
            destinationTag="Nathu La"
            customH1="Nathu La Pass &amp; Tsomgo Lake Tour Packages | Army Permit Paperwork Desk"
            customSubtitle="Experience the historic Indo-China Silk Route border at 14,140 ft, sacred Tsomgo (Changu) Lake, and Baba Harbhajan Mandir with Wednesday–Sunday military permit paperwork processing."
            customBadge="Indo-China Border Pass (14,140 ft)"
          />
        );
      case 'kolkata-packages':
        return (
          <PackagesView
            customH1="Sikkim Tour Packages from Kolkata (2026) | Direct NJP Express Trains &amp; Flights"
            customSubtitle="Curated Sikkim holiday packages for Kolkata travelers. Coordinated with Sealdah/Howrah express trains (Darjeeling Mail, Padatik, Vande Bharat) to NJP and direct flights from Kolkata (CCU) to Bagdogra. Dedicated 4x4 mountain cabs waiting at NJP station, verified Bengali-friendly hotels, and 100% Indian Army permit clearance."
            customBadge="Kolkata to Sikkim Gateway | Direct NJP Trains &amp; CCU Flights"
          />
        );
      case 'kalyani-packages':
        return (
          <PackagesView
            customH1="Sikkim Tour Packages from Kalyani &amp; Nadia (2026) | Direct NJP Train Pickup"
            customSubtitle="Specialized Sikkim travel packages for travelers from Kalyani, Kanchrapara, Naihati, and Sealdah Main Line. Coordinated with North Bengal express trains passing or boarding near Kalyani to NJP, direct private Innova Crysta / 4x4 Scorpio pickup right at NJP station platform, verified Bengali meals, and North Sikkim checkpost permits."
            customBadge="Kalyani &amp; Sealdah Main Line to Sikkim Specialist"
          />
        );
      case 'bagdogra-packages':
        return (
          <PackagesView
            customH1="Sikkim Tour Packages from NJP Railway Station &amp; Bagdogra Airport"
            customSubtitle="Direct platform-side pickup at NJP (New Jalpaiguri Junction) and Bagdogra International Airport (IXB). Private Innova Crystas and 4x4 Scorpios waiting on arrival for direct scenic transfers to Gangtok, Pelling, and North Sikkim without broker delays or shared cab hassles."
            customBadge="Direct NJP Platform &amp; IXB Airport Terminal Transfers"
          />
        );
      case 'delhi-packages':
        return (
          <PackagesView
            customH1="Sikkim Tour Packages from Delhi | Flight-Inclusive Himalayan Holidays"
            customSubtitle="Curated Sikkim holiday packages from Delhi NCR with IGI Airport flight coordination, dedicated Innova Crysta mountain fleets, North Sikkim permits, and luxury heritage resort stays."
            customBadge="Delhi to Sikkim Holiday Circuits"
          />
        );
      case 'sikkim-tour':
        return (
          <PackagesView
            customH1="Sikkim Tour Packages: Handcrafted Himalayan Circuits (2026)"
            customSubtitle="Plan your complete Sikkim tour with Sikkim Tour Company. Dedicated 4x4 mountain vehicles, complete Indian Army permit paperwork clearances, and handpicked heritage stays across all 4 districts."
            customBadge="Premier Sikkim Tour Packages"
          />
        );
      case 'sikkim-tour-company':
        return <AboutView />;
      case 'north-india-tour':
        return (
          <PackagesView
            customH1="Grand Sikkim &amp; Eastern Himalayan Expedition Circuits (2026)"
            customSubtitle="Connect major Indian transit hubs (Delhi, Kolkata, Bagdogra) to the high-altitude wonders of North Sikkim (Gurudongmar Lake, Yumthang), organic Temi tea gardens, and sacred Kanchenjunga passes."
            customBadge="Grand Sikkim Expeditions"
          />
        );
      case 'faqs':
        return <FaqView />;
      case 'package-detail':
        return <PackageDetailView slug={currentRoute.slug || 'gangtok-escape'} />;
      case 'stays':
        return <AccommodationsView />;
      case 'stay-detail':
        return <AccommodationDetailView slug={currentRoute.slug || 'elgin-nor-khill-gangtok'} />;
      case 'checkout':
        return <BookingCheckoutView />;
      case 'booking-confirmation':
        return <BookingConfirmationView bookingId={currentRoute.slug || 'BK-2026-9482'} />;

      case 'login':
      case 'register':
      case 'account':
        return <HomeView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'experiences':
        return <ExperiencesView />;
      case 'experience-detail':
        return <ExperienceDetailView slug={currentRoute.slug || 'romantic-himalayan-getaways'} />;
      case 'international-travel':
        return <InternationalTravelView />;
      case 'customise-trip':
        return <CustomiseTripView />;
      case 'travel-guides':
        return <TravelGuidesView />;
      case 'travel-guide-detail':
        return <TravelGuideDetailView slug={currentRoute.slug || 'best-time-to-visit-sikkim'} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'reviews':
        return <ReviewsView />;
      case 'weather':
        return <WeatherView />;
      case 'privacy-policy':
        return <PolicyView type="privacy" />;
      case 'terms-and-conditions':
        return <PolicyView type="terms" />;
      case 'cancellation-policy':
        return <PolicyView type="cancellation" />;
      case 'refund-policy':
        return <PolicyView type="refund" />;
      case 'admin-enquiries':
        return <AdminEnquiriesView />;
      default:
        return (
          <div className="pt-32 pb-24 text-center px-4 max-w-xl mx-auto">
            <h1 className="font-editorial text-4xl font-bold text-[#173D35] mb-3">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              The mountain trail you are looking for does not exist or has been moved.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24]"
            >
              Return to Homepage
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#0A2621] text-[#202724] relative">
      {/* 4-Second Creative Himalayan Loading Screen */}
      <HimalayanLoadingScreen durationMs={4000} />

      {/* Interactive Alpine Mouse Cursor Snowflake Trail */}
      <CursorSnowTrail />

      {/* Top Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1" id="main-content">
        <React.Suspense
          fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center text-white/80">
              <div className="w-8 h-8 border-2 border-[#EBA94B] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="font-mono text-xs uppercase tracking-widest text-[#DFC89E]">
                Opening Himalayan Trail...
              </p>
            </div>
          }
        >
          {renderCurrentView()}
        </React.Suspense>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </RouterProvider>
  );
}
