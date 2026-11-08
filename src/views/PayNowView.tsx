import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { tourPackagesData } from '../data/packages';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare,
  Building,
  Check,
  ChevronDown,
} from 'lucide-react';

export const PayNowView: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const query = currentRoute.queryParams;

  // Selected package or custom
  const initialPackageSlug = query.package || '';
  const initialTitle = query.title || '';
  const initialAmount = query.amount ? Number(query.amount) : 5000;

  const matchedPkg = tourPackagesData.find((p) => p.slug === initialPackageSlug);

  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>(initialPackageSlug);
  const [selectedPresetAmount, setSelectedPresetAmount] = useState<number | 'custom'>(
    [5000, 10000, 15000, 20000].includes(initialAmount) ? initialAmount : 'custom'
  );
  const [amount, setAmount] = useState<number>(initialAmount > 0 ? initialAmount : 5000);
  const [customAmountInput, setCustomAmountInput] = useState<string>(
    initialAmount > 0 ? String(initialAmount) : '5000'
  );

  // Traveler Details Form
  const [fullName, setFullName] = useState<string>(query.name || '');
  const [email, setEmail] = useState<string>(query.email || '');
  const [phone, setPhone] = useState<string>(query.phone || '');
  const [bookingNotes, setBookingNotes] = useState<string>(
    query.notes || (initialTitle ? `Booking for ${initialTitle}` : '')
  );

  // Payment Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update amount when package selection changes
  const handlePackageChange = (slug: string) => {
    setSelectedPackageSlug(slug);
    if (!slug) return;
    const pkg = tourPackagesData.find((p) => p.slug === slug);
    if (pkg && pkg.startingPriceInr > 0) {
      setAmount(pkg.startingPriceInr);
      setCustomAmountInput(String(pkg.startingPriceInr));
      setSelectedPresetAmount('custom');
      if (!bookingNotes) {
        setBookingNotes(`Booking for ${pkg.name} (${pkg.duration})`);
      }
    }
  };

  const handlePresetSelect = (preset: number) => {
    setSelectedPresetAmount(preset);
    setAmount(preset);
    setCustomAmountInput(String(preset));
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmountInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
    setSelectedPresetAmount('custom');
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name as on government photo ID.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address for receipt and voucher delivery.');
      return;
    }

    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!amount || amount < 1) {
      setErrorMessage('Payment amount must be at least ₹1.00');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedPkgObj = tourPackagesData.find((p) => p.slug === selectedPackageSlug);
      const productinfo = selectedPkgObj
        ? selectedPkgObj.name.slice(0, 95)
        : (bookingNotes.trim() || 'Sikkim Tour Package Booking').slice(0, 95);

      const payload = {
        amount,
        firstname: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanPhone,
        productinfo,
        udf1: selectedPackageSlug || 'custom-payment',
        udf2: bookingNotes.slice(0, 95),
      };

      const res = await fetch('/api/payu/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.actionUrl || !data.params) {
        throw new Error(data.message || 'Unable to generate secure PayU payment session.');
      }

      // Dynamically construct and auto-submit the standard PayU Hosted Checkout form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.actionUrl;
      form.style.display = 'none';

      Object.entries(data.params).forEach(([key, val]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(val);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error('PayU Payment initiation error:', err);
      setErrorMessage(
        err.message || 'Payment initiation failed. Please check your details or connect with our WhatsApp desk.'
      );
      setIsSubmitting(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/917001846727?text=${encodeURIComponent(
    `Hi Sikkim Tour Co., I need assistance with online payment of ₹${amount.toLocaleString('en-IN')}. Name: ${fullName || 'Guest'}.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb / Header Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103D35]/10 border border-[#103D35]/20 text-[#103D35] text-xs font-mono uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-Bit SSL Encrypted PayU Gateway</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103D35] tracking-tight">
            Pay Online Securely
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Pay booking advances, token reservations, or custom tour invoices directly to{' '}
            <strong className="text-stone-900">Sikkim Tour Co.</strong> via instant UPI, Credit/Debit Cards, or Net Banking.
          </p>
        </div>

        {/* Payment Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Left Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Payment Error</div>
                  <div>{errorMessage}</div>
                </div>
              </div>
            )}

            <form onSubmit={handlePaySubmit} className="space-y-6">
              
              {/* 1. SELECT PACKAGE OR SERVICE */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Tour Package or Service (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedPackageSlug}
                    onChange={(e) => handlePackageChange(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-[#FAFAF8] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-800 appearance-none focus:outline-hidden focus:border-[#103D35] focus:ring-1 focus:ring-[#103D35]"
                  >
                    <option value="">-- Custom Payment / Advance Deposit --</option>
                    {tourPackagesData.map((pkg) => (
                      <option key={pkg.slug} value={pkg.slug}>
                        {pkg.name} ({pkg.duration}) · ₹{pkg.startingPriceInr.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3.5 top-3 pointer-events-none" />
                </div>
                {matchedPkg && (
                  <p className="text-[11px] text-emerald-800 font-medium">
                    ✓ Selected: {matchedPkg.name} ({matchedPkg.region})
                  </p>
                )}
              </div>

              {/* 2. CHOOSE PAYMENT AMOUNT */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Select Payment Amount (INR)
                  </label>
                  <span className="text-[10px] text-stone-500 font-mono">Zero Payment Gateway Fee</span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[5000, 10000, 15000, 20000].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => handlePresetSelect(preset)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                        selectedPresetAmount === preset
                          ? 'bg-[#103D35] text-white border-[#103D35] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ₹{preset.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-stone-400">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={customAmountInput}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-2.5 bg-[#FAFAF8] border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-hidden focus:border-[#103D35] focus:ring-1 focus:ring-[#103D35]"
                    required
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-stone-500 font-medium">INR</span>
                </div>
              </div>

              {/* 3. TRAVELER DETAILS */}
              <div className="space-y-4 pt-2 border-t border-stone-100">
                <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Primary Traveler Details
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rohan Mukherjee"
                    required
                    className="w-full text-xs sm:text-sm bg-[#FAFAF8] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:border-[#103D35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rohan@example.com"
                      required
                      className="w-full text-xs sm:text-sm bg-[#FAFAF8] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:border-[#103D35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">
                      Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98301 23456"
                      required
                      className="w-full text-xs sm:text-sm bg-[#FAFAF8] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:border-[#103D35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Booking Notes / Travel Dates / Quotation Ref (Optional)
                  </label>
                  <input
                    type="text"
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="e.g. Advance for 4 travelers starting Nov 25 from NJP"
                    className="w-full text-xs sm:text-sm bg-[#FAFAF8] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-hidden focus:border-[#103D35]"
                  />
                </div>
              </div>

              {/* 4. SUBMIT ACTION BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-700 via-[#103D35] to-teal-800 hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg border border-emerald-400/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Connecting to Secure PayU Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#EBA94B]" />
                      <span>Pay ₹{amount.toLocaleString('en-IN')} Securely via PayU</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Merchant</span>
                </span>
                <span>•</span>
                <span>Instant Receipt Delivery</span>
                <span>•</span>
                <span>RBI Compliant</span>
              </div>
            </form>
          </div>

          {/* Sidebar Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Payment Summary Box */}
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Payment Summary
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Instant Credit
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Selected Amount:</span>
                  <span className="font-bold text-stone-900">₹{amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Gateway Surcharge:</span>
                  <span className="font-bold text-emerald-700">FREE (₹0)</span>
                </div>
                <div className="flex justify-between">
                  <span>GST on Payment:</span>
                  <span className="text-stone-500">Included</span>
                </div>
                <div className="border-t border-stone-100 pt-2.5 flex justify-between items-baseline">
                  <span className="font-bold text-stone-900 text-sm">Total to Pay:</span>
                  <span className="font-editorial text-2xl font-bold text-[#103D35]">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Accepted Payment Modes Badges */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <div className="text-[10px] font-bold uppercase text-stone-500 tracking-wider">
                  Supported Payment Methods
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#F8F6F0] p-2 rounded-lg border border-stone-200/80 flex items-center gap-1.5 font-medium text-stone-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>UPI / QR (GPay, PhonePe, Paytm)</span>
                  </div>
                  <div className="bg-[#F8F6F0] p-2 rounded-lg border border-stone-200/80 flex items-center gap-1.5 font-medium text-stone-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Debit &amp; Credit Cards</span>
                  </div>
                  <div className="bg-[#F8F6F0] p-2 rounded-lg border border-stone-200/80 flex items-center gap-1.5 font-medium text-stone-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Net Banking (50+ Banks)</span>
                  </div>
                  <div className="bg-[#F8F6F0] p-2 rounded-lg border border-stone-200/80 flex items-center gap-1.5 font-medium text-stone-800">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>RuPay, Visa, Mastercard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Himalayan Operator Guarantee Card */}
            <div className="bg-[#103D35] text-white rounded-2xl p-6 shadow-md space-y-3.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EBA94B]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#EBA94B] font-bold">
                  Sikkim Tour Co. Guarantee
                </span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed">
                Your payment goes directly to our registered Gangtok mountain desk on Paljor Stadium Road.
                Every confirmed booking includes 100% Indian Army permit handling, dedicated 4x4 mountain vehicles,
                and 24/7 concierge assistance.
              </p>
              <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>Instant official payment confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Check className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>Transparent refund &amp; cancellation policy</span>
                </div>
              </div>
            </div>

            {/* Need Direct Assistance Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 text-center">
              <div className="text-xs font-bold text-stone-800">
                Prefer to pay via direct NEFT / Bank Transfer?
              </div>
              <p className="text-xs text-stone-600">
                Our team can share our official current account bank details directly via WhatsApp or Email.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ cta_location: 'pay_now_sidebar' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Help</span>
                </a>
                <a
                  href="tel:+917001846727"
                  onClick={() => trackPhoneClick({ click_location: 'pay_now_sidebar' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors border border-stone-300"
                >
                  <Phone className="w-3.5 h-3.5 text-[#103D35]" />
                  <span>Call +91 70018 46727</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
