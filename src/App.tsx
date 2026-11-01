import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { HomeView } from './views/HomeView';
import { DestinationsView } from './views/DestinationsView';
import { DestinationDetailView } from './views/DestinationDetailView';
import { PackagesView } from './views/PackagesView';
import { PackageDetailView } from './views/PackageDetailView';
import { AccommodationsView } from './views/AccommodationsView';
import { AccommodationDetailView } from './views/AccommodationDetailView';
import { BookingCheckoutView } from './views/BookingCheckoutView';
import { BookingConfirmationView } from './views/BookingConfirmationView';
import { AiPlannerView } from './views/AiPlannerView';
import { Explorer3DView } from './views/Explorer3DView';

import { AdminDashboardView } from './views/AdminDashboardView';
import { ExperiencesView } from './views/ExperiencesView';
import { ExperienceDetailView } from './views/ExperienceDetailView';
import { InternationalTravelView } from './views/InternationalTravelView';
import { CustomiseTripView } from './views/CustomiseTripView';
import { TravelGuidesView } from './views/TravelGuidesView';
import { TravelGuideDetailView } from './views/TravelGuideDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { ReviewsView } from './views/ReviewsView';
import { WeatherView } from './views/WeatherView';
import { PolicyView } from './views/PolicyView';
import { AdminEnquiriesView } from './views/AdminEnquiriesView';
import { DisclosuresView } from './views/DisclosuresView';
import { FaqView } from './views/FaqView';

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
      case 'darjeeling-packages':
        return (
          <PackagesView
            destinationTag="Darjeeling"
            customH1="Sikkim &amp; Darjeeling Tour Packages: Himalayan Toy Train &amp; Tea Estates"
            customSubtitle="Combined multi-destination holidays covering Darjeeling Tiger Hill sunrise, UNESCO World Heritage toy train, tea garden stays, and Gangtok."
            customBadge="Sikkim &amp; Darjeeling Combined"
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
            customH1="Sikkim Tour Packages from Kolkata | Direct Train &amp; Flight Holidays"
            customSubtitle="Handcrafted Sikkim tour packages for Kolkata travelers. Seamless coordination with Sealdah/Howrah express trains to NJP and direct flights to Bagdogra, verified Bengali/Indian meals, and private mountain transport."
            customBadge="Customized Holidays from Kolkata"
          />
        );
      case 'bagdogra-packages':
        return (
          <PackagesView
            customH1="Sikkim Tour Packages from Bagdogra Airport &amp; NJP Railway Station"
            customSubtitle="Direct terminal pickup at Bagdogra Airport (IXB) and NJP Junction. Private 4x4 SUVs waiting at arrival for seamless transfers to Gangtok, Pelling, and North Sikkim without broker delays."
            customBadge="Direct IXB &amp; NJP Terminal Transfers"
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
      case 'ai-planner':
        return <AiPlannerView />;
      case 'explorer-3d':
        return <Explorer3DView />;
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
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#202724]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1" id="main-content">
        {renderCurrentView()}
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
