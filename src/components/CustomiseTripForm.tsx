import React, { useState } from 'react';
import {
  EnquiryFormData,
  validateEnquiry,
  getBudgetOptions,
  generateEnquiryWhatsAppMessage,
} from '../utils/enquiry';
import { destinationsData } from '../data/destinations';
import { siteConfig, buildWhatsAppUrl } from '../config/site';
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
} from 'lucide-react';

interface CustomiseTripFormProps {
  initialDestination?: string;
  initialTravelStyle?: string;
  sourcePage?: string;
}

export const CustomiseTripForm: React.FC<CustomiseTripFormProps> = ({
  initialDestination,
  initialTravelStyle = 'Family',
  sourcePage = '/customise-trip',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [serverNotice, setServerNotice] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    adultCount: 2,
    childCount: 0,
    destinations: initialDestination ? [initialDestination] : ['Gangtok', 'Pelling'],
    startingCity: 'Bagdogra Airport (IXB)',
    budget: '₹20,000 – ₹40,000 per person',
    preferredCurrency: 'INR',
    hotelCategory: 'Deluxe (4-Star equivalent)',
    transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)',
    travelStyle: (initialTravelStyle as any) || 'Family',
    specialRequests: '',
    sourcePage,
  });

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
        errors.phone = 'Please provide a valid phone number';
      }
    } else if (currentStep === 2) {
      if (formData.travellerCategory === 'international' && (!formData.nationality || formData.nationality.trim().length < 2)) {
        errors.nationality = 'Please specify your nationality / country of passport for permit planning';
      }
    } else if (currentStep === 3) {
      if (!formData.arrivalDate) {
        errors.arrivalDate = 'Please select your estimated arrival date';
      }
      if (!formData.departureDate) {
        errors.departureDate = 'Please select your estimated departure date';
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
    const validation = validateEnquiry(formData);
    if (!validation.success) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setServerNotice('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setSubmissionId(result.enquiryId || `BK-${Date.now().toString().slice(-6)}`);
        setServerNotice(
          result.storageType === 'supabase'
            ? 'Enquiry recorded in secure cloud database.'
            : 'Enquiry securely received and dispatched to our Gangtok travel desk.'
        );
        setSubmitSuccess(true);
      } else {
        // Fallback gracefully without losing data
        const fallbackId = `BK-${Date.now().toString().slice(-6)}`;
        setSubmissionId(fallbackId);
        setServerNotice('Enquiry prepared locally. Please click below to send directly to our WhatsApp travel desk.');
        setSubmitSuccess(true);
      }
    } catch {
      // Local fallback
      const fallbackId = `BK-${Date.now().toString().slice(-6)}`;
      setSubmissionId(fallbackId);
      setServerNotice('Network notice: Enquiry prepared. Continue via instant WhatsApp to finalize with our travel desk.');
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = buildWhatsAppUrl(generateEnquiryWhatsAppMessage(formData));

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-md border border-stone-200 p-8 sm:p-10 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-[#173D35]/10 text-[#173D35] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[#173D35]" />
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173D35] mb-2">
          Your Himalayan Journey Enquiry is Received
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 mb-4 max-w-lg mx-auto">
          Thank you, <strong className="text-stone-800">{formData.fullName}</strong>. Reference ID:{' '}
          <span className="font-mono font-semibold text-[#173D35]">{submissionId}</span>. Our Gangtok team will review vehicle availability, seasonal permit logistics, and hotel allocations for your requested dates ({formData.arrivalDate} to {formData.departureDate}).
        </p>

        {serverNotice && (
          <div className="inline-block px-3 py-1 bg-stone-50 border border-stone-200 rounded-xs text-[11px] text-stone-600 mb-6">
            {serverNotice}
          </div>
        )}

        <div className="p-5 bg-[#F8F6F0] rounded-md border border-stone-200/80 mb-6 text-left text-xs space-y-2 text-stone-700">
          <div className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5">
            Enquiry Summary
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-stone-500">Destinations:</span> {formData.destinations.join(', ')}
            </div>
            <div>
              <span className="text-stone-500">Travellers:</span> {formData.adultCount} Adults, {formData.childCount} Children
            </div>
            <div>
              <span className="text-stone-500">Hotel Tier:</span> {formData.hotelCategory}
            </div>
            <div>
              <span className="text-stone-500">Transport:</span> {formData.transportPreference}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm rounded-sm transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Fast-Track on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setSubmitSuccess(false);
              setCurrentStep(1);
            }}
            className="w-full sm:w-auto py-3 px-5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-sm transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md border border-stone-200 shadow-md overflow-hidden max-w-3xl mx-auto">
      {/* Form Header with Step Tracker */}
      <div className="bg-[#173D35] p-6 text-white">
        <div className="flex items-center justify-between text-xs text-[#C4A36A] font-medium tracking-wider uppercase mb-1">
          <span>Custom Itinerary Builder</span>
          <span>Step {currentStep} of 5</span>
        </div>
        <h3 className="font-editorial text-2xl font-bold">
          {currentStep === 1 && '1. Traveller Contact Details'}
          {currentStep === 2 && '2. Domestic or International Category'}
          {currentStep === 3 && '3. Dates & Preferred Destinations'}
          {currentStep === 4 && '4. Hotel, Transport & Budget Preferences'}
          {currentStep === 5 && '5. Review & Submit Enquiry'}
        </h3>
        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-1 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-[#C4A36A] h-full transition-all duration-300"
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
                  placeholder="e.g. Rahul Sharma / Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full bg-stone-50 border rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35] ${
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
                    className={`w-full bg-stone-50 border rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35] ${
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
                    className={`w-full bg-stone-50 border rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35] ${
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
                  className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
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
                  className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                >
                  <option value="WhatsApp">WhatsApp (Fastest response)</option>
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
                  className={`p-4 text-left rounded-sm border transition-all ${
                    formData.travellerCategory === 'domestic'
                      ? 'border-[#173D35] bg-[#173D35]/5 ring-1 ring-[#173D35]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-sm text-[#173D35] mb-1">
                    Indian Domestic Traveller
                  </div>
                  <div className="text-xs text-stone-600">
                    Indian citizens residing in India or holding Indian Passports. Standard Inner Line Permits apply for North Sikkim / Tsomgo Lake.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('travellerCategory', 'international');
                    handleInputChange('preferredCurrency', 'USD');
                  }}
                  className={`p-4 text-left rounded-sm border transition-all ${
                    formData.travellerCategory === 'international'
                      ? 'border-[#173D35] bg-[#173D35]/5 ring-1 ring-[#173D35]'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-sm text-[#173D35] mb-1">
                    International Traveller
                  </div>
                  <div className="text-xs text-stone-600">
                    Foreign passport holders. Requires Restricted Area Permits (RAP / ILP). Minimum group of 2 persons required for protected sectors.
                  </div>
                </button>
              </div>
            </div>

            {formData.travellerCategory === 'international' && (
              <div className="p-4 bg-[#F8F6F0] rounded-sm border border-stone-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Country of Passport / Nationality *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Kingdom, Germany, United States, Bangladesh..."
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-sm py-2 px-3 text-sm text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
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
                  <strong>Important Permit Advisory:</strong> Foreign visitors can visit Gangtok, Pelling, Darjeeling, and Lachung/Yumthang with RAP. Gurudongmar Lake and Nathu La Pass are currently restricted to Indian nationals under official border security regulations.
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Dates, passenger count, destinations */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
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
                        const diff = Math.ceil((new Date(formData.departureDate).getTime() - new Date(val).getTime()) / 86400000) + 1;
                        if (diff > 0) handleInputChange('numberOfDays', diff);
                      }
                    }}
                    className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
                {formErrors.arrivalDate && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.arrivalDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
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
                        const diff = Math.ceil((new Date(val).getTime() - new Date(formData.arrivalDate).getTime()) / 86400000) + 1;
                        if (diff > 0) handleInputChange('numberOfDays', diff);
                      }
                    }}
                    className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
                {formErrors.departureDate && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.departureDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Number of Days
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="number"
                    min="1"
                    max="30"
                    placeholder="e.g. 5"
                    value={formData.numberOfDays || ''}
                    onChange={(e) => handleInputChange('numberOfDays', e.target.value ? Math.max(1, parseInt(e.target.value) || 1) : undefined)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Number of Adults (Age 12+) *
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.adultCount}
                    onChange={(e) => handleInputChange('adultCount', Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Number of Children (Under 12)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.childCount}
                  onChange={(e) => handleInputChange('childCount', Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Select Destinations to Include *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {destinationsData.map((d) => {
                  const isChecked = formData.destinations.includes(d.name);
                  return (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => handleDestinationToggle(d.name)}
                      className={`p-2.5 text-left text-xs rounded-sm border transition-all ${
                        isChecked
                          ? 'border-[#173D35] bg-[#173D35] text-white font-medium'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="line-clamp-1">{d.name}</div>
                      <div className={`text-[10px] ${isChecked ? 'text-[#DFC89E]' : 'text-stone-500'}`}>
                        {d.yearRoundAccess ? 'Year-Round' : 'Seasonal'}
                      </div>
                    </button>
                  );
                })}
              </div>
              {formErrors.destinations && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.destinations}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Starting City or Arrival Airport *
              </label>
              <div className="relative">
                <Compass className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Bagdogra Airport (IXB), Pakyong Airport (PYG), NJP Railway, or Kolkata"
                  value={formData.startingCity}
                  onChange={(e) => handleInputChange('startingCity', e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Preferences & Budget */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Budget per Person ({formData.preferredCurrency})
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
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
                  className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                >
                  <option value="Family">Family Holiday (Relaxed & Comfortable)</option>
                  <option value="Honeymoon">Honeymoon / Romantic (Private & Scenic)</option>
                  <option value="Adventure">Adventure (North Sikkim & High Altitude)</option>
                  <option value="Culture">Culture, Monasteries & Heritage</option>
                  <option value="Luxury">Luxury & Heritage Stays</option>
                  <option value="Budget">Budget Friendly</option>
                  <option value="Custom Tour">Custom Private Tour</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hotel Category Preference
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={formData.hotelCategory}
                    onChange={(e) => handleInputChange('hotelCategory', e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                  >
                    <option value="Budget / Homestay">Budget / Authentic Homestay</option>
                    <option value="Standard (3-Star equivalent)">Standard (3-Star equivalent)</option>
                    <option value="Deluxe (4-Star equivalent)">Deluxe (4-Star with Mountain Views)</option>
                    <option value="Luxury Boutique / Heritage">Luxury Boutique / Heritage Manors</option>
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
                    className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                  >
                    <option value="Private Dedicated Vehicle (Innova/Scorpio)">
                      Private Dedicated Vehicle (Innova / Scorpio SUV)
                    </option>
                    <option value="Standard Private Vehicle (WagonR/Bolero)">
                      Standard Private Vehicle (WagonR / Bolero)
                    </option>
                    <option value="Shared / Flexible">
                      Shared / Flexible options
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Special Requests or Specific Interests (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Vegetarian dining only, senior citizen in group who cannot walk long stairs, desire to visit Rumtek monastery scholar, photography sunrise focus..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Review and Submit */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-stone-50 rounded-sm border border-stone-200 text-xs space-y-3">
              <div className="font-semibold text-stone-800 uppercase tracking-wider text-[11px] pb-1 border-b border-stone-200">
                Please Review Your Journey Requirements
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                <div>
                  <span className="text-stone-500 block">Lead Traveller:</span>
                  <strong>{formData.fullName}</strong> ({formData.email}, {formData.phone})
                </div>
                <div>
                  <span className="text-stone-500 block">Traveller Category:</span>
                  {formData.travellerCategory === 'domestic'
                    ? 'Indian Domestic Traveller'
                    : `International Traveller (${formData.nationality})`}
                </div>
                <div>
                  <span className="text-stone-500 block">Travel Dates:</span>
                  {formData.arrivalDate} to {formData.departureDate}
                </div>
                <div>
                  <span className="text-stone-500 block">Party Size:</span>
                  {formData.adultCount} Adults, {formData.childCount} Children
                </div>
                <div>
                  <span className="text-stone-500 block">Destinations:</span>
                  {formData.destinations.join(', ')}
                </div>
                <div>
                  <span className="text-stone-500 block">Starting Point:</span>
                  {formData.startingCity}
                </div>
                <div>
                  <span className="text-stone-500 block">Hotel & Transport:</span>
                  {formData.hotelCategory} · {formData.transportPreference}
                </div>
                <div>
                  <span className="text-stone-500 block">Indicative Budget:</span>
                  {formData.budget}
                </div>
              </div>

              {formData.specialRequests && (
                <div className="pt-2 border-t border-stone-200">
                  <span className="text-stone-500 block">Special Requests:</span>
                  <p className="italic">{formData.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xs border border-stone-200/60">
              <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Your privacy is respected. We never sell contact information or spam your email. Data is used exclusively to prepare your custom itinerary quotation.
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
              className="inline-flex items-center gap-1.5 py-2 px-4 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-sm transition-colors"
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
              className="inline-flex items-center gap-1.5 py-2 px-5 text-xs font-semibold text-[#173D35] bg-[#C4A36A] hover:bg-[#DFC89E] rounded-sm transition-colors shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold text-white bg-[#173D35] hover:bg-[#0F2A24] rounded-sm transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-1">⌛</span>
                  <span>Sending Enquiry...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C4A36A]" />
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
