import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { siteConfig } from '../config/site';
import { updatePageSeo } from '../utils/seo';

export interface RouteMatch {
  pathname: string;
  view:
    | 'home'
    | 'destinations'
    | 'destination-detail'
    | 'packages'
    | 'package-detail'
    | 'gangtok-packages'
    | 'north-sikkim-packages'
    | 'pelling-packages'
    | 'silk-route-packages'
    | 'honeymoon-packages'
    | 'family-packages'
    | 'darjeeling-packages'
    | 'gurudongmar-tour'
    | 'nathula-tour'
    | 'kolkata-packages'
    | 'bagdogra-packages'
    | 'delhi-packages'
    | 'sikkim-tour'
    | 'sikkim-tour-company'
    | 'north-india-tour'
    | 'faqs'
    | 'stays'
    | 'stay-detail'
    | 'checkout'
    | 'booking-confirmation'

    | 'login'
    | 'register'
    | 'account'
    | 'admin'
    | 'experiences'
    | 'experience-detail'
    | 'international-travel'
    | 'customise-trip'
    | 'travel-guides'
    | 'travel-guide-detail'
    | 'about'
    | 'contact'
    | 'reviews'
    | 'weather'
    | 'privacy-policy'
    | 'terms-and-conditions'
    | 'disclosures'
    | 'cancellation-policy'
    | 'refund-policy'
    | 'admin-enquiries'
    | 'not-found';
  slug?: string;
  queryParams: Record<string, string>;
}

interface RouterContextType {
  currentRoute: RouteMatch;
  navigate: (to: string, replace?: boolean) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function parsePath(fullPath: string): RouteMatch {
  const [pathPart, queryPart] = fullPath.split('?');
  const pathname = pathPart.replace(/\/+$/, '') || '/';
  
  const queryParams: Record<string, string> = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      queryParams[key] = val;
    });
  }

  // Route mapping
  if (pathname === '/' || pathname === '') {
    return { pathname, view: 'home', queryParams };
  }
  if (pathname === '/destinations') {
    return { pathname, view: 'destinations', queryParams };
  }
  if (pathname.startsWith('/destinations/')) {
    const slug = pathname.replace('/destinations/', '');
    return { pathname, view: 'destination-detail', slug, queryParams };
  }
  if (pathname === '/packages') {
    return { pathname, view: 'packages', queryParams };
  }
  if (pathname === '/gangtok-tour-packages' || pathname === '/gangtok-packages') {
    return { pathname, view: 'gangtok-packages', queryParams };
  }
  if (pathname === '/north-sikkim-tour-packages' || pathname === '/north-sikkim-packages') {
    return { pathname, view: 'north-sikkim-packages', queryParams };
  }
  if (pathname === '/pelling-tour-packages' || pathname === '/pelling-packages') {
    return { pathname, view: 'pelling-packages', queryParams };
  }
  if (pathname === '/silk-route-tour-packages' || pathname === '/silk-route-packages' || pathname === '/zuluk-packages') {
    return { pathname, view: 'silk-route-packages', queryParams };
  }
  if (pathname === '/sikkim-honeymoon-packages' || pathname === '/honeymoon-packages') {
    return { pathname, view: 'honeymoon-packages', queryParams };
  }
  if (pathname === '/sikkim-family-tour-packages' || pathname === '/family-packages') {
    return { pathname, view: 'family-packages', queryParams };
  }
  if (pathname === '/sikkim-darjeeling-tour-packages' || pathname === '/darjeeling-packages') {
    return { pathname, view: 'darjeeling-packages', queryParams };
  }
  if (pathname === '/gurudongmar-lake-tour' || pathname === '/gurudongmar-tour') {
    return { pathname, view: 'gurudongmar-tour', queryParams };
  }
  if (pathname === '/nathula-pass-tour' || pathname === '/nathula-pass-permit-tour' || pathname === '/nathula-tour') {
    return { pathname, view: 'nathula-tour', queryParams };
  }
  if (pathname === '/sikkim-packages-from-kolkata' || pathname === '/sikkim-tour-from-kolkata') {
    return { pathname, view: 'kolkata-packages', queryParams };
  }
  if (pathname === '/sikkim-packages-from-bagdogra-njp' || pathname === '/sikkim-tour-from-bagdogra' || pathname === '/sikkim-packages-from-njp') {
    return { pathname, view: 'bagdogra-packages', queryParams };
  }
  if (pathname === '/sikkim-packages-from-delhi' || pathname === '/sikkim-tour-from-delhi') {
    return { pathname, view: 'delhi-packages', queryParams };
  }
  if (pathname === '/sikkim-tour' || pathname === '/sikkim-tours' || pathname === '/sikkim-tour-package' || pathname === '/sikkim-tour-packages') {
    return { pathname, view: 'sikkim-tour', queryParams };
  }
  if (pathname === '/sikkim-tour-company' || pathname === '/sikkim-tour-co' || pathname === '/sikkim-travel-company') {
    return { pathname, view: 'sikkim-tour-company', queryParams };
  }
  if (pathname === '/north-india-tour' || pathname === '/north-india-tours' || pathname === '/north-india-tour-packages' || pathname === '/north-india-packages') {
    return { pathname, view: 'north-india-tour', queryParams };
  }
  if (pathname === '/faqs' || pathname === '/faq' || pathname === '/questions') {
    return { pathname, view: 'faqs', queryParams };
  }
  if (pathname.startsWith('/packages/')) {
    const slug = pathname.replace('/packages/', '');
    return { pathname, view: 'package-detail', slug, queryParams };
  }
  if (pathname === '/stays' || pathname === '/accommodations' || pathname === '/hotels') {
    return { pathname, view: 'stays', queryParams };
  }
  if (pathname.startsWith('/stays/')) {
    const slug = pathname.replace('/stays/', '');
    return { pathname, view: 'stay-detail', slug, queryParams };
  }
  if (pathname.startsWith('/accommodations/')) {
    const slug = pathname.replace('/accommodations/', '');
    return { pathname, view: 'stay-detail', slug, queryParams };
  }
  if (pathname === '/checkout' || pathname.startsWith('/book/')) {
    return { pathname, view: 'checkout', queryParams };
  }
  if (pathname.startsWith('/booking-confirmation/')) {
    const slug = pathname.replace('/booking-confirmation/', '');
    return { pathname, view: 'booking-confirmation', slug, queryParams };
  }
  if (
    pathname === '/ai-planner' ||
    pathname === '/plan-my-journey' ||
    pathname === '/3d-explorer' ||
    pathname === '/interactive-3d'
  ) {
    return { pathname: '/packages', view: 'packages', queryParams };
  }
  if (
    pathname === '/login' ||
    pathname === '/sign-in' ||
    pathname === '/register' ||
    pathname === '/sign-up' ||
    pathname === '/account' ||
    pathname === '/profile' ||
    pathname === '/my-bookings'
  ) {
    return { pathname: '/', view: 'home', queryParams };
  }
  if (pathname === '/admin' || pathname === '/admin/dashboard') {
    return { pathname, view: 'admin', queryParams };
  }
  if (pathname === '/experiences') {
    return { pathname, view: 'experiences', queryParams };
  }
  if (pathname.startsWith('/experiences/')) {
    const slug = pathname.replace('/experiences/', '');
    return { pathname, view: 'experience-detail', slug, queryParams };
  }
  if (pathname === '/international-travel' || pathname === '/international-travellers') {
    return { pathname, view: 'international-travel', queryParams };
  }
  if (pathname === '/customise-trip' || pathname === '/customize-trip') {
    return { pathname, view: 'customise-trip', queryParams };
  }
  if (pathname === '/travel-guides' || pathname === '/guides' || pathname === '/blog' || pathname === '/blogs') {
    return { pathname, view: 'travel-guides', queryParams };
  }
  if (pathname.startsWith('/travel-guides/')) {
    const slug = pathname.replace('/travel-guides/', '');
    return { pathname, view: 'travel-guide-detail', slug, queryParams };
  }
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    return { pathname, view: 'travel-guide-detail', slug, queryParams };
  }
  if (pathname.startsWith('/blogs/')) {
    const slug = pathname.replace('/blogs/', '');
    return { pathname, view: 'travel-guide-detail', slug, queryParams };
  }
  if (pathname.startsWith('/guides/')) {
    const slug = pathname.replace('/guides/', '');
    return { pathname, view: 'travel-guide-detail', slug, queryParams };
  }
  if (pathname === '/about' || pathname === '/about-us') {
    return { pathname, view: 'about', queryParams };
  }
  if (pathname === '/contact' || pathname === '/contact-us') {
    return { pathname, view: 'contact', queryParams };
  }
  if (pathname === '/reviews' || pathname === '/testimonials') {
    return { pathname, view: 'reviews', queryParams };
  }
  if (pathname === '/weather' || pathname === '/live-weather') {
    return { pathname, view: 'weather', queryParams };
  }
  if (pathname === '/privacy-policy') {
    return { pathname, view: 'privacy-policy', queryParams };
  }
  if (pathname === '/disclosures' || pathname === '/permits' || pathname === '/mandatory-disclosures') {
    return { pathname, view: 'disclosures', queryParams };
  }
  if (pathname === '/terms-and-conditions' || pathname === '/terms') {
    return { pathname, view: 'terms-and-conditions', queryParams };
  }
  if (pathname === '/cancellation-policy') {
    return { pathname, view: 'cancellation-policy', queryParams };
  }
  if (pathname === '/refund-policy') {
    return { pathname, view: 'refund-policy', queryParams };
  }
  if (pathname === '/admin/enquiries' || pathname === '/admin-enquiries') {
    return { pathname, view: 'admin-enquiries', queryParams };
  }

  return { pathname, view: 'not-found', queryParams };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteMatch>(() => {
    if (typeof window !== 'undefined') {
      return parsePath(window.location.pathname + window.location.search);
    }
    return { pathname: '/', view: 'home', queryParams: {} };
  });

  const navigate = (to: string, replace = false) => {
    if (typeof window === 'undefined') return;

    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    const newRoute = parsePath(to);
    setCurrentRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parsePath(window.location.pathname + window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title, meta tags, OpenGraph, canonical URL, and dynamic JSON-LD per route
  useEffect(() => {
    updatePageSeo(currentRoute);
  }, [currentRoute]);

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
