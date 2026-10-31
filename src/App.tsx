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
