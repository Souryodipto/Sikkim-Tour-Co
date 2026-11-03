/**
 * Google Analytics 4 (GA4) & Lead Attribution Engine for Sikkim Tour Co.
 * 
 * Safely dispatches GA4 standard and custom conversion events without breaking
 * when adblockers or offline modes are active.
 * Manages first-touch and last-touch UTM attribution parameters for lead tracking.
 */

export interface LeadAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer: string;
  landing_page: string;
  captured_at: string;
}

const STORAGE_KEY = 'stc_lead_attribution';

/**
 * Initialize and persist first-touch lead attribution in sessionStorage.
 * Captures UTM parameters, search engines, social referrers, and original landing page.
 */
export function initLeadAttribution(): LeadAttribution {
  if (typeof window === 'undefined') {
    return {
      referrer: 'Direct / Server',
      landing_page: '/',
      captured_at: new Date().toISOString(),
    };
  }

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || undefined;
    const utm_medium = urlParams.get('utm_medium') || undefined;
    const utm_campaign = urlParams.get('utm_campaign') || undefined;
    const utm_term = urlParams.get('utm_term') || undefined;
    const utm_content = urlParams.get('utm_content') || undefined;

    let referrer = document.referrer || 'Direct';
    if (referrer.includes(window.location.hostname)) {
      referrer = 'Direct / Internal';
    } else if (referrer.includes('google.')) {
      referrer = 'Google Organic';
    } else if (referrer.includes('bing.')) {
      referrer = 'Bing Organic';
    } else if (referrer.includes('facebook.') || referrer.includes('fb.')) {
      referrer = 'Facebook';
    } else if (referrer.includes('instagram.')) {
      referrer = 'Instagram';
    } else if (referrer.includes('t.co') || referrer.includes('twitter.') || referrer.includes('x.com')) {
      referrer = 'Twitter/X';
    } else if (referrer.includes('youtube.')) {
      referrer = 'YouTube';
    }

    const attribution: LeadAttribution = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      referrer,
      landing_page: window.location.pathname + window.location.search,
      captured_at: new Date().toISOString(),
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return {
      referrer: 'Direct',
      landing_page: window.location.pathname,
      captured_at: new Date().toISOString(),
    };
  }
}

/**
 * Retrieves the stored lead attribution summary.
 */
export function getStoredAttribution(): LeadAttribution {
  if (typeof window === 'undefined') {
    return {
      referrer: 'Direct',
      landing_page: '/',
      captured_at: new Date().toISOString(),
    };
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }

  return initLeadAttribution();
}

/**
 * Returns a human-friendly lead source string (e.g. "Google Organic", "Instagram / summer-snow")
 */
export function getLeadSourceLabel(): string {
  const attr = getStoredAttribution();
  if (attr.utm_source) {
    const parts = [attr.utm_source];
    if (attr.utm_medium) parts.push(attr.utm_medium);
    if (attr.utm_campaign) parts.push(`camp:${attr.utm_campaign}`);
    return parts.join(' / ');
  }
  return attr.referrer || 'Direct Website Visitor';
}

/**
 * Internal safe event dispatcher for Google Analytics 4 (gtag) and dataLayer.
 */
function sendGa4Event(eventName: string, params: Record<string, any>) {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Analytics gtag()
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    }

    // 2. Google Tag Manager dataLayer
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
      });
    }

    // 3. Dispatch DOM CustomEvent for debugging and automated testing
    const event = new CustomEvent('stc_analytics', {
      detail: { event: eventName, params },
    });
    document.dispatchEvent(event);

    // 4. Console log in development mode
    if (import.meta.env.DEV) {
      console.debug(`[GA4 Event: ${eventName}]`, params);
    }
  } catch (err) {
    // Fail silently so user experience is never interrupted by tracking failures
  }
}

// ============================================================================
// GA4 Conversion Events
// ============================================================================

/**
 * 1. whatsapp_click
 * Triggered whenever a visitor initiates a direct WhatsApp enquiry.
 */
export function trackWhatsAppClick(params: {
  cta_location: 'navbar' | 'floating_button' | 'hero' | 'package_detail' | 'mobile_sticky_bar' | 'custom_enquiry_form' | 'blog_guide' | 'footer' | string;
  package_name?: string;
  destination?: string;
  tariff?: number | string;
}) {
  const attribution = getStoredAttribution();
  sendGa4Event('whatsapp_click', {
    ...params,
    phone_number: '+917001846727',
    lead_source: getLeadSourceLabel(),
    referrer: attribution.referrer,
    landing_page: attribution.landing_page,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 2. enquiry_submit
 * Triggered when a custom tour or package enquiry is successfully submitted.
 */
export function trackEnquirySubmit(params: {
  enquiry_id: string;
  destinations: string[];
  duration?: string;
  adults: number;
  children: number;
  budget: string;
  source_page: string;
  hotel_preference?: string;
  transport_preference?: string;
}) {
  const attribution = getStoredAttribution();
  sendGa4Event('enquiry_submit', {
    ...params,
    destinations_count: params.destinations.length,
    destinations_string: params.destinations.join(', '),
    total_travellers: params.adults + params.children,
    lead_source: getLeadSourceLabel(),
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    referrer: attribution.referrer,
    landing_page: attribution.landing_page,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 3. package_view
 * Triggered when a visitor views a specific package detail page.
 */
export function trackPackageView(params: {
  package_id: string;
  package_name: string;
  region: string;
  price?: number;
  duration: string;
}) {
  sendGa4Event('package_view', {
    ...params,
    currency: 'INR',
    timestamp: new Date().toISOString(),
  });
}

/**
 * 4. phone_click
 * Triggered when a visitor clicks to call the mountain desk.
 */
export function trackPhoneClick(params: {
  phone_number?: string;
  click_location: string;
}) {
  sendGa4Event('phone_click', {
    phone_number: params.phone_number || '+917001846727',
    click_location: params.click_location,
    timestamp: new Date().toISOString(),
  });
}

/**
 * 5. booking_confirmed
 * Triggered when a direct booking or offline mountain reservation is confirmed.
 */
export function trackBookingConfirmed(params: {
  booking_id: string;
  package_name?: string;
  value?: number;
  currency?: string;
}) {
  const attribution = getStoredAttribution();
  sendGa4Event('booking_confirmed', {
    ...params,
    currency: params.currency || 'INR',
    lead_source: getLeadSourceLabel(),
    timestamp: new Date().toISOString(),
  });
}

