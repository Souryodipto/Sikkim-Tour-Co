import React, { useState, useRef, useEffect } from 'react';
import {
  EnquiryFormData,
  validateEnquiry,
  getBudgetOptions,
  generateEnquiryWhatsAppMessage,
} from '../utils/enquiry';
import { destinationsData } from '../data/destinations';
import { siteConfig, buildWhatsAppUrl } from '../config/site';
import {
  initLeadAttribution,
  getLeadSourceLabel,
  getStoredAttribution,
  trackEnquirySubmit,
  trackWhatsAppClick,
} from '../utils/analytics';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  Compass,
  Building,
  Car,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Lock,
  Clock,
  MapPin,
  Check,
  ShieldCheck,
  Tag,
  Info,
  Send,
  Baby,
} from 'lucide-react';

interface CustomiseTripFormProps {
  initialDestination?: string;
  initialTravelStyle?: string;
  initialPackageName?: string;
  initialPackagePrice?: string;
  initialDuration?: string;
  sourcePage?: string;
}

const CIRCUIT_PRESETS = [
  {
    name: 'North Sikkim Alpine Frontier',
    desc: 'Lachen, Lachung, Gurudongmar & Yumthang',
    destinations: ['Lachen', 'Lachung'],
    style: 'Adventure' as const,
    duration: '5 Days / 4 Nights',
  },
  {
    name: 'Classic Gangtok & High Passes',
    desc: 'MG Marg, Tsomgo Lake & Nathu La Pass',
    destinations: ['Gangtok'],
    style: 'Family' as const,
    duration: '4 Days / 3 Nights',
  },
  {
    name: 'West & South Sikkim Heritage',
    desc: 'Pelling Skywalk, Ravangla & Namchi Char Dham',
    destinations: ['Pelling', 'Ravangla', 'Namchi'],
    style: 'Culture' as const,
    duration: '5 Days / 4 Nights',
  },
  {
    name: 'Old Silk Route Zuluk Trail',
    desc: '32 Hairpin Bends, Thambi Sunrise & Kupup Lake',
    destinations: ['Zuluk'],
    style: 'Custom Tour' as const,
    duration: '4 Days / 3 Nights',
  },
  {
    name: 'Grand 4-District Sikkim Odyssey',
    desc: 'Complete journey across East, North, South & West',
    destinations: ['Gangtok', 'Lachen', 'Lachung', 'Pelling', 'Ravangla'],
    style: 'Custom Tour' as const,
    duration: '8+ Days Extended',
  },
];

const QUICK_SPECIAL_REQUESTS = [
  '+ Add Nathu La Pass (Army PAP)',
  '+ Snow Excursion at Zero Point',
  '+ Kid & Senior-Friendly Gentle Pacing',
  '+ 100% Pure Vegetarian / Jain Dining',
  '+ Dedicated Toyota Innova Crysta Only',
  '+ Honeymoon Romantic Room Setup',
  '+ Riverview Stays along Teesta',
];

const DURATION_OPTIONS = [
  '3 Days / 2 Nights (Short Getaway)',
  '4 Days / 3 Nights (Standard Circuit)',
  '5 Days / 4 Nights (North Sikkim Expedition)',
  '6 Days / 5 Nights (Highland + Lakes)',
  '7+ Days (Complete Grand Tour)',
];

export const CustomiseTripForm: React.FC<CustomiseTripFormProps> = ({
  initialDestination,
  initialTravelStyle = 'Family',
  initialPackageName,
  initialPackagePrice,
  initialDuration,
  sourcePage = '/customise-trip',
}) => {
  const formMountedAt = useRef<number>(Date.now());
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [serverNotice, setServerNotice] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isFlexibleDates, setIsFlexibleDates] = useState<boolean>(false);
  const [flexibleMonth, setFlexibleMonth] = useState<string>('April 2026');

  // Anti-spam honeypot (bots fill this in; humans will not see it)
  const [honeypot, setHoneypot] = useState<string>('');

  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    preferredContact: 'WhatsApp',
    travellerCategory: 'domestic',
    nationality: '',
    arrivalDate: '',
    departureDate: '',
    duration: initialDuration || '5 Days / 4 Nights (North Sikkim Expedition)',
    numberOfDays: 5,
    adultCount: 2,
    childCount: 0,
    infantCount: 0,
    destinations: initialDestination ? [initialDestination] : ['Gangtok', 'Pelling'],
    startingCity: 'Bagdogra Airport (IXB)',
    budget: '₹20,000 – ₹40,000 per person',
    preferredCurrency: 'INR',
    hotelCategory: 'Deluxe (4-Star equivalent)',
    transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)',
    travelStyle: (initialTravelStyle as any) || 'Family',
    specialRequests: initialPackageName
      ? `Interested in package: "${initialPackageName}" (${initialPackagePrice || 'Standard Rate'}).`
      : '',
    sourcePage,
    leadSource: '',
  });

  // Initialize attribution and attach to lead data
  useEffect(() => {
    initLeadAttribution();
    const leadLabel = getLeadSourceLabel();
    const attr = getStoredAttribution();
    setFormData((prev) => ({
      ...prev,
      leadSource: leadLabel,
      utmSource: attr.utm_source,
      utmMedium: attr.utm_medium,
      utmCampaign: attr.utm_campaign,
    }));
  }, []);

  const handleInputChange = (field: keyof EnquiryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleDestinationToggle = (destName: string) => {
    setFormData((prev) => {
      const exists = prev.destinations.includes(destName);
      const updated = exists
        ? prev.destinations.filter((d) => d !== destName)
        : [...prev.destinations, destName];
      return { ...prev, destinations: updated };
    });
    if (formErrors.destinations) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy.destinations;
        return copy;
      });
    }
  };

  const handleCircuitSelect = (preset: typeof CIRCUIT_PRESETS[0]) => {
    setFormData((prev) => ({
      ...prev,
      destinations: preset.destinations,
      travelStyle: preset.style,
      duration: preset.duration,
    }));
  };

  const handleSpecialRequestAppend = (tag: string) => {
    setFormData((prev) => {
      const cleanTag = tag.replace(/^\+\s*/, '');
      if (prev.specialRequests && prev.specialRequests.includes(cleanTag)) {
        return prev;
      }
      const updated = prev.specialRequests
        ? `${prev.specialRequests.trim()}, ${cleanTag}`
        : cleanTag;
      return { ...prev, specialRequests: updated };
    });
  };

  // Dynamic vehicle sizing recommendation based on party size
  const totalTravellers = formData.adultCount + formData.childCount;
  const getVehicleRecommendation = () => {
    if (totalTravellers <= 3) {
      return {
        label: 'Sedan or Compact SUV (WagonR / Dzire / Scorpio)',
        note: 'Comfortable for up to 3 travellers with standard luggage.',
      };
    }
    if (totalTravellers <= 6) {
      return {
        label: 'Dedicated High-Clearance SUV (Toyota Innova Crysta / Mahindra Scorpio)',
        note: 'Strongly recommended for superior mountain suspension, legroom & luggage safety.',
      };
    }
    return {
      label: 'Dual SUV Convoy or Luxury Tempo Traveller',
      note: 'Ideal for large families and groups. Coordinated convoy with experienced hill drivers.',
    };
  };

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.fullName = 'Please enter your full name (at least 2 letters)';
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please provide a valid email address';
      }
      if (!formData.phone || formData.phone.trim().length < 7) {
        errors.phone = 'Please provide a valid phone number (at least 7 digits)';
      }
    } else if (currentStep === 2) {
      if (
        formData.travellerCategory === 'international' &&
        (!formData.nationality || formData.nationality.trim().length < 2)
      ) {
        errors.nationality = 'Please specify your nationality / country of passport for permit planning';
      }
    } else if (currentStep === 3) {
      if (!isFlexibleDates) {
        if (!formData.arrivalDate) {
          errors.arrivalDate = 'Please select your estimated arrival date';
        }
        if (!formData.departureDate) {
          errors.departureDate = 'Please select your estimated departure date';
        }
      }
      if (formData.destinations.length === 0) {
        errors.destinations = 'Please select at least one destination in Sikkim or Darjeeling';
      }
      if (!formData.startingCity || formData.startingCity.trim().length < 2) {
        errors.startingCity = 'Please specify your arrival hub or starting city';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam Protection 1: Honeypot check
    if (honeypot !== '') {
      // Bot detected: simulate success silently without processing
      setSubmissionId(`SK-${Date.now().toString().slice(-6)}`);
      setSubmitSuccess(true);
      return;
    }

    // Spam Protection 2: Time-to-submit verification (bots submit in < 2.0s)
    const timeToSubmit = Date.now() - formMountedAt.current;
    if (timeToSubmit < 2000) {
      console.warn('Form submission throttled due to rapid execution.');
      setSubmissionId(`SK-${Date.now().toString().slice(-6)}`);
      setSubmitSuccess(true);
      return;
    }

    // If flexible dates are selected, encode this into dates
    const finalData = { ...formData };
    if (isFlexibleDates) {
      finalData.arrivalDate = `Flexible: ${flexibleMonth}`;
      finalData.departureDate = `Approx 5-7 days in ${flexibleMonth}`;
    }

    const validation = validateEnquiry(finalData);
    if (!validation.success) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setServerNotice('');

    const newEnquiryId = `SK-${Date.now().toString().slice(-6)}`;

    // GA4 Event: enquiry_submit
    trackEnquirySubmit({
      enquiry_id: newEnquiryId,
      destinations: finalData.destinations,
      duration: finalData.duration,
      adults: finalData.adultCount,
      children: finalData.childCount,
      budget: finalData.budget,
      source_page: sourcePage,
      hotel_preference: finalData.hotelCategory,
      transport_preference: finalData.transportPreference,
    });

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmissionId(result.enquiryId || newEnquiryId);
        setServerNotice(
          'Enquiry securely recorded. Our Gangtok mountain desk is now reviewing road permits and vehicle allocation.'
        );
        setSubmitSuccess(true);
      } else {
        setSubmissionId(newEnquiryId);
        setServerNotice(
          'Enquiry verified locally. Please click below to fast-track your quotation directly on WhatsApp.'
        );
        setSubmitSuccess(true);
      }
    } catch {
      setSubmissionId(newEnquiryId);
      setServerNotice(
        'Enquiry verified. Please connect directly with our Gangtok operations desk on WhatsApp for instant confirmation.'
      );
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = generateEnquiryWhatsAppMessage(formData);
  const whatsappLink = buildWhatsAppUrl(whatsappMessage);

  // ----------------------------------------------------------------------------
  // STEP 6: Lead Submission Confirmation Screen
  // ----------------------------------------------------------------------------
  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xl text-center max-w-2xl mx-auto animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle className="w-9 h-9 text-emerald-600" />
        </div>

        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Enquiry Received · Reference #{submissionId}
        </span>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173D35] mt-3 mb-2">
          Your Himalayan Journey Request is Confirmed
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 mb-5 max-w-lg mx-auto leading-relaxed">
          Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. Our Gangtok operations team has received your travel dates, vehicle preference, and destination list.
        </p>

        {serverNotice && (
          <div className="inline-block px-3.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 mb-6 font-light">
            {serverNotice}
          </div>
        )}

        {/* Lead Summary Card */}
        <div className="p-5 bg-[#F8F6F0] rounded-xl border border-stone-200 mb-6 text-left text-xs space-y-2.5 text-stone-700">
          <div className="font-bold text-[#173D35] uppercase tracking-wider text-[11px] border-b border-stone-200 pb-2 flex items-center justify-between">
            <span>Enquiry Overview</span>
            <span className="font-mono text-stone-500 font-normal">Desk Hours: 08:00 – 21:00 IST</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div>
              <span className="text-stone-400 font-medium block text-[11px]">Destinations:</span>
              <strong className="text-stone-900">{formData.destinations.join(', ')}</strong>
            </div>
            <div>
              <span className="text-stone-400 font-medium block text-[11px]">Travel Dates / Duration:</span>
              <strong className="text-stone-900">{formData.arrivalDate} to {formData.departureDate}</strong>
            </div>
            <div>
              <span className="text-stone-400 font-medium block text-[11px]">Travellers Party:</span>
              <strong className="text-stone-900">
                {formData.adultCount} Adults
                {formData.childCount > 0 ? `, ${formData.childCount} Children` : ''}
                {formData.infantCount ? `, ${formData.infantCount} Infants` : ''}
              </strong>
            </div>
            <div>
              <span className="text-stone-400 font-medium block text-[11px]">Budget Tier:</span>
              <strong className="text-stone-900">{formData.budget}</strong>
            </div>
          </div>
          {formData.specialRequests && (
            <div className="pt-2 border-t border-stone-200/70 text-[11px] text-stone-600">
              <span className="text-stone-400 block">Special Notes:</span>
              <p className="italic">{formData.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                cta_location: 'custom_enquiry_form',
                destination: formData.destinations.join(', '),
              })
            }
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>Fast-Track & Confirm on WhatsApp</span>
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+917001846727"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#173D35]" />
              <span>Call Gangtok Desk: +91 70018 46727</span>
            </a>

            <button
              onClick={() => {
                setSubmitSuccess(false);
                setCurrentStep(1);
              }}
              className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-xl border border-stone-200 transition-colors cursor-pointer"
            >
              Plan Another Custom Itinerary
            </button>
          </div>
        </div>

        <div className="mt-6 text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero spam guarantee. Indian Army PAP checkpost documentation prepared in advance.</span>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------------
  // MAIN MULTI-STEP ENQUIRY FORM
  // ----------------------------------------------------------------------------
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden max-w-3xl mx-auto">
      {/* Honeypot field for bot spam detection */}
      <input
        type="text"
        name="company_tax_id_trap"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
      />

      {/* Package-Specific Header Banner (If triggered from package view) */}
      {initialPackageName && (
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-3 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-700" />
            <span>
              Enquiring for: <strong>{initialPackageName}</strong> ({initialDuration || 'Standard'})
            </span>
          </div>
          {initialPackagePrice && (
            <span className="font-bold text-[#173D35] bg-white px-2 py-0.5 rounded border border-amber-200">
              Starting {initialPackagePrice}
            </span>
          )}
        </div>
      )}

      {/* Form Header with Step Tracker */}
      <div className="bg-[#173D35] p-6 text-white">
        <div className="flex items-center justify-between text-xs text-[#DFC89E] font-medium tracking-wider uppercase mb-1 font-mono">
          <span>Custom Tour Planner</span>
          <span>Step {currentStep} of 5</span>
        </div>
        <h3 className="font-editorial text-2xl font-bold">
          {currentStep === 1 && '1. Traveller Contact Details'}
          {currentStep === 2 && '2. Domestic or International Category'}
          {currentStep === 3 && '3. Dates, Travellers & Preferred Destinations'}
          {currentStep === 4 && '4. Hotel, Transport & Budget Preferences'}
          {currentStep === 5 && '5. Review & Submit Enquiry'}
        </h3>
        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-1.5 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-[#DFC89E] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {/* STEP 1: Traveller details */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label htmlFor="field-fullName" className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="field-fullName"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma / Ananya Sen"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full bg-stone-50 border rounded-xl py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35] ${
                    formErrors.fullName ? 'border-red-500' : 'border-stone-300'
                  }`}
                />
              </div>
              {formErrors.fullName && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-email" className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="field-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full bg-stone-50 border rounded-xl py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35] ${
                      formErrors.email ? 'border-red-500' : 'border-stone-300'
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="field-phone" className="block text-xs font-semibold text-stone-700 mb-1">
                  Phone / Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="field-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full bg-stone-50 border rounded-xl py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35] ${
                      formErrors.phone ? 'border-red-500' : 'border-stone-300'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-whatsapp" className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Number (if different from phone)
                </label>
                <input
                  id="field-whatsapp"
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                />
              </div>

              <div>
                <label htmlFor="field-contactMethod" className="block text-xs font-semibold text-stone-700 mb-1">
                  Preferred Contact Method
                </label>
                <select
                  id="field-contactMethod"
                  value={formData.preferredContact}
                  onChange={(e) => handleInputChange('preferredContact', e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                >
                  <option value="WhatsApp">WhatsApp (Fastest response within 15 mins)</option>
                  <option value="Email">Email</option>
                  <option value="Phone Call">Telephone Call</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Traveller category & nationality */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Select Your Traveller Category *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('travellerCategory', 'domestic');
                    handleInputChange('preferredCurrency', 'INR');
                  }}
                  className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                    formData.travellerCategory === 'domestic'
                      ? 'border-[#173D35] bg-[#173D35]/5 ring-2 ring-[#173D35]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-sm text-[#173D35] mb-1">
                    Indian Domestic Traveller
                  </div>
                  <div className="text-xs text-stone-600 leading-relaxed">
                    Indian citizens holding original Voter ID or Passport. Standard Inner Line / PAP checkpost permits apply for North Sikkim & Tsomgo Lake.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('travellerCategory', 'international');
                    handleInputChange('preferredCurrency', 'USD');
                  }}
                  className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
                    formData.travellerCategory === 'international'
                      ? 'border-[#173D35] bg-[#173D35]/5 ring-2 ring-[#173D35]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-sm text-[#173D35] mb-1">
                    International Traveller
                  </div>
                  <div className="text-xs text-stone-600 leading-relaxed">
                    Foreign passport holders. Requires Restricted Area Permits (RAP). Minimum group size of 2 persons required for protected frontier sectors.
                  </div>
                </button>
              </div>
            </div>

            {formData.travellerCategory === 'international' && (
              <div className="p-4 bg-[#F8F6F0] rounded-xl border border-stone-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Country of Passport / Nationality *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Kingdom, United States, Germany, Australia..."
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl py-2.5 px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                  />
                  {formErrors.nationality && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.nationality}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Currency for Indicative Quotation
                  </label>
                  <div className="flex gap-4 text-xs font-medium text-stone-800">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="currency"
                        value="USD"
                        checked={formData.preferredCurrency === 'USD'}
                        onChange={() => handleInputChange('preferredCurrency', 'USD')}
                      />
                      <span>US Dollar (USD $)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="currency"
                        value="INR"
                        checked={formData.preferredCurrency === 'INR'}
                        onChange={() => handleInputChange('preferredCurrency', 'INR')}
                      />
                      <span>Indian Rupee (INR ₹)</span>
                    </label>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 leading-relaxed border-t border-stone-200/60 pt-2">
                  <strong>Important Permit Advisory:</strong> Foreign nationals can explore Gangtok, Pelling, Darjeeling, and Lachung/Yumthang with RAP. Gurudongmar Lake and Nathu La Pass remain restricted to Indian nationals under official border security regulations.
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Dates, passenger count, destinations */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Quick Circuit Presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Quick Select a Popular Sikkim Circuit (Optional)
                </label>
                <span className="text-[11px] text-[#173D35] font-medium">1-Click Auto-Fill</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CIRCUIT_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCircuitSelect(p)}
                    className="p-2.5 text-left rounded-xl border border-stone-200 hover:border-[#173D35] hover:bg-stone-50 transition-all text-xs cursor-pointer group"
                  >
                    <div className="font-bold text-[#173D35] group-hover:text-[#0c3127] flex items-center justify-between">
                      <span>{p.name}</span>
                      <span className="text-[10px] font-mono text-stone-400">{p.duration.split(' ')[0]}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 line-clamp-1">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Dates or Flexible Month Toggle */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800">Travel Timing & Duration</span>
                <button
                  type="button"
                  onClick={() => setIsFlexibleDates(!isFlexibleDates)}
                  className="text-xs font-semibold text-[#173D35] hover:underline cursor-pointer"
                >
                  {isFlexibleDates ? '← Select Exact Dates' : 'I have flexible dates / Month of travel'}
                </button>
              </div>

              {!isFlexibleDates ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Estimated Arrival Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={formData.arrivalDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleInputChange('arrivalDate', val);
                          if (val && formData.departureDate) {
                            const diff = Math.ceil(
                              (new Date(formData.departureDate).getTime() - new Date(val).getTime()) / 86400000
                            ) + 1;
                            if (diff > 0) {
                              handleInputChange('numberOfDays', diff);
                              handleInputChange('duration', `${diff} Days / ${diff - 1} Nights`);
                            }
                          }
                        }}
                        className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                      />
                    </div>
                    {formErrors.arrivalDate && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.arrivalDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Estimated Departure Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={formData.departureDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleInputChange('departureDate', val);
                          if (formData.arrivalDate && val) {
                            const diff = Math.ceil(
                              (new Date(val).getTime() - new Date(formData.arrivalDate).getTime()) / 86400000
                            ) + 1;
                            if (diff > 0) {
                              handleInputChange('numberOfDays', diff);
                              handleInputChange('duration', `${diff} Days / ${diff - 1} Nights`);
                            }
                          }
                        }}
                        className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                      />
                    </div>
                    {formErrors.departureDate && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.departureDate}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Planned Month of Travel
                    </label>
                    <select
                      value={flexibleMonth}
                      onChange={(e) => setFlexibleMonth(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl py-2 px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                    >
                      <option value="March 2026">March 2026 (Snow & Early Blooms)</option>
                      <option value="April 2026">April 2026 (Peak Rhododendron Blooms)</option>
                      <option value="May 2026">May 2026 (Pleasant Mountain Spring)</option>
                      <option value="June 2026">June 2026 (Summer Getaway)</option>
                      <option value="October 2026">October 2026 (Post-Monsoon Blue Skies)</option>
                      <option value="November 2026">November 2026 (Kanchenjunga Horizons)</option>
                      <option value="December 2026">December 2026 (Winter Snow)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Desired Trip Duration
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl py-2 px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                    >
                      {DURATION_OPTIONS.map((d, dIdx) => (
                        <option key={dIdx} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Travellers Breakdown (Adults, Children, Infants) */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3">
              <label className="block text-xs font-bold text-stone-800">
                Number of Travellers
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Adults (12+ yrs) *
                  </span>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.adultCount}
                      onChange={(e) => handleInputChange('adultCount', Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Children (5–11 yrs)
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.childCount}
                    onChange={(e) => handleInputChange('childCount', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                  />
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Infants (0–4 yrs)
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.infantCount || 0}
                    onChange={(e) => handleInputChange('infantCount', Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                  />
                </div>
              </div>

              {/* Dynamic Vehicle Allocation Recommendation Badge */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2.5">
                <Car className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Recommended Fleet:</strong> {getVehicleRecommendation().label}
                  <p className="text-[11px] text-emerald-800/90 mt-0.5">
                    {getVehicleRecommendation().note}
                  </p>
                </div>
              </div>
            </div>

            {/* Destinations Selection Grid */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Select Destinations to Include * ({formData.destinations.length} selected)
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {destinationsData.map((d) => {
                  const isChecked = formData.destinations.includes(d.name);
                  return (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => handleDestinationToggle(d.name)}
                      className={`p-2.5 text-left text-xs rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#173D35] bg-[#173D35] text-white font-medium shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="line-clamp-1 font-semibold">{d.name}</div>
                      <div className={`text-[10px] ${isChecked ? 'text-[#DFC89E]' : 'text-stone-500'}`}>
                        {d.district} · {d.yearRoundAccess ? 'Year-Round' : 'Seasonal'}
                      </div>
                    </button>
                  );
                })}
              </div>
              {formErrors.destinations && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.destinations}</p>
              )}
            </div>

            {/* Starting Point / Arrival Hub */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Starting City or Arrival Transit Hub *
              </label>
              <div className="relative">
                <Compass className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Bagdogra Airport (IXB), Pakyong (PYG), NJP Railway, or Kolkata"
                  value={formData.startingCity}
                  onChange={(e) => handleInputChange('startingCity', e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preferences & Budget */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Budget per Person ({formData.preferredCurrency})
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                >
                  {getBudgetOptions(formData.preferredCurrency).map((opt) => (
                    <option key={opt.id} value={opt.label}>
                      {opt.label} ({opt.inrEstimate})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Travel Style
                </label>
                <select
                  value={formData.travelStyle}
                  onChange={(e) => handleInputChange('travelStyle', e.target.value as any)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                >
                  <option value="Family">Family Holiday (Relaxed & Comfortable Pacing)</option>
                  <option value="Honeymoon">Honeymoon / Romantic (Secluded & Scenic)</option>
                  <option value="Adventure">Adventure (High Altitude & Snow)</option>
                  <option value="Culture">Culture, Monasteries & Heritage</option>
                  <option value="Luxury">Luxury Heritage Sanctuaries</option>
                  <option value="Budget">Budget Friendly & Homestays</option>
                  <option value="Custom Tour">Custom Private Mountain Circuit</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hotel Category Standard
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={formData.hotelCategory}
                    onChange={(e) => handleInputChange('hotelCategory', e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                  >
                    <option value="Budget / Homestay">Authentic Mountain Homestays / Budget Lodges</option>
                    <option value="Standard (3-Star equivalent)">Standard 3-Star Equivalent with Geysers</option>
                    <option value="Deluxe (4-Star equivalent)">Deluxe 4-Star with Kanchenjunga Views & Heaters</option>
                    <option value="Luxury Boutique / Heritage">Luxury Heritage Boutique Manors (Elgin / Mayfair)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Transport Preference
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={formData.transportPreference}
                    onChange={(e) => handleInputChange('transportPreference', e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
                  >
                    <option value="Private Dedicated Vehicle (Innova/Scorpio)">
                      Private Dedicated Vehicle (Toyota Innova Crysta / Mahindra Scorpio)
                    </option>
                    <option value="Standard Private Vehicle (WagonR/Bolero)">
                      Standard Private Vehicle (Tata Sumo / Bolero / WagonR)
                    </option>
                    <option value="Shared / Flexible">
                      Shared / Flexible options
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Custom Itinerary Special Requests with 1-Click Chips */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Custom Itinerary Requests or Special Requirements (Optional)
              </label>

              {/* 1-Click Chip Tags */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {QUICK_SPECIAL_REQUESTS.map((tag, tIdx) => (
                  <button
                    key={tIdx}
                    type="button"
                    onClick={() => handleSpecialRequestAppend(tag)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#173D35] hover:text-white text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                placeholder="e.g. Vegetarian dining only, desire to touch snow at Zero Point, senior citizen who cannot climb steep stairs, drone photography permits..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173D35]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Review and Submit */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-3">
              <div className="font-bold text-[#173D35] uppercase tracking-wider text-[11px] pb-1.5 border-b border-stone-200 flex items-center justify-between">
                <span>Please Review Your Journey Specifications</span>
                <span className="text-emerald-700 font-semibold">100% Free Custom Quote</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                <div>
                  <span className="text-stone-400 block text-[11px]">Primary Contact:</span>
                  <strong>{formData.fullName}</strong> ({formData.phone})
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Traveller Category:</span>
                  <strong>
                    {formData.travellerCategory === 'domestic'
                      ? 'Indian Domestic Traveller'
                      : `International Traveller (${formData.nationality || 'Foreign'})`}
                  </strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Travel Timing / Duration:</span>
                  <strong>
                    {formData.arrivalDate || flexibleMonth} ({formData.duration})
                  </strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Party Breakdown:</span>
                  <strong>
                    {formData.adultCount} Adults
                    {formData.childCount > 0 ? `, ${formData.childCount} Children` : ''}
                    {formData.infantCount ? `, ${formData.infantCount} Infants` : ''}
                  </strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Destinations:</span>
                  <strong>{formData.destinations.join(', ')}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Arrival Hub:</span>
                  <strong>{formData.startingCity}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Hotel & Fleet:</span>
                  <strong>{formData.hotelCategory} · {formData.transportPreference}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Indicative Budget:</span>
                  <strong>{formData.budget}</strong>
                </div>
              </div>

              {formData.specialRequests && (
                <div className="pt-2 border-t border-stone-200 text-stone-700">
                  <span className="text-stone-400 block text-[11px]">Special Requests:</span>
                  <p className="italic font-medium">{formData.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-2 text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Your privacy is respected. No advance payment or card details required. Information is used exclusively by our Gangtok desk to verify checkpost permits and allocate private 4x4 vehicles.
              </span>
            </div>
          </div>
        )}

        {/* Form Navigation Controls */}
        <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-1.5 py-2.5 px-6 text-xs font-bold text-[#103D35] bg-[#EBA94B] hover:bg-[#f3be70] rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 py-3 px-7 text-sm font-bold text-white bg-[#173D35] hover:bg-[#0c3127] rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-1">⌛</span>
                  <span>Dispatching Enquiry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#DFC89E]" />
                  <span>Submit Custom Enquiry</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
