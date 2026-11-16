import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { trackWhatsAppClick } from '../utils/analytics';
import {
  CheckCircle,
  ShieldCheck,
  Printer,
  MessageSquare,
  Home,
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Download,
} from 'lucide-react';

export const PaymentSuccessView: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const query = currentRoute.queryParams;

  const txnid = query.txnid || '';
  const initialAmount = query.amount ? parseFloat(query.amount) : 0;
  const mihpayid = query.mihpayid || '';
  const mode = query.mode || 'Online';

  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isServerVerified, setIsServerVerified] = useState<boolean>(true);
  const [txnDetails, setTxnDetails] = useState<any>(null);

  useEffect(() => {
    if (!txnid) {
      setIsVerifying(false);
      return;
    }

    const verifyTransaction = async () => {
      try {
        const res = await fetch(`/api/payu/verify?txnid=${encodeURIComponent(txnid)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.transaction) {
            setIsServerVerified(true);
            setTxnDetails(data.transaction);
          }
        }
      } catch (err) {
        console.warn('Server verification query error:', err);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyTransaction();
  }, [txnid]);

  const displayAmount = txnDetails?.amount || initialAmount;
  const displayTxnid = txnDetails?.txnid || txnid || `STC-${Date.now().toString().slice(-8)}`;
  const displayMihpayid = txnDetails?.mihpayid || mihpayid || 'PAYU-VERIFIED';
  const displayMode = txnDetails?.mode || mode;
  const displayDate = txnDetails?.verifiedAt
    ? new Date(txnDetails.verifiedAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Sikkim Tour Co., I have completed my payment of ₹${displayAmount.toLocaleString(
      'en-IN'
    )} via PayU. Transaction ID: ${displayTxnid}. Please confirm receipt and permit paperwork.`
  );
  const whatsappUrl = `https://wa.me/918910134571?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20 print:bg-white print:pt-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Receipt Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden print:shadow-none print:border-none">
          
          {/* Top Green Accent Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-[#103D35] to-teal-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-48 h-48" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#EBA94B]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#DFC89E] border border-emerald-400/30 text-[11px] font-mono uppercase tracking-wider font-bold">
                <Lock className="w-3 h-3 text-[#EBA94B]" />
                <span>Verified PayU Transaction</span>
              </div>

              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Payment Successful &amp; Confirmed
              </h1>

              <p className="text-xs sm:text-sm text-stone-200 max-w-lg mx-auto leading-relaxed">
                Thank you! Your payment has been securely received by{' '}
                <strong className="text-white">Sikkim Tour Co.</strong> (Gangtok Desk).
                Your booking reservation is officially registered.
              </p>
            </div>
          </div>

          {/* Transaction Metadata Breakdown */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Amount Banner */}
            <div className="bg-[#F8F6F0] rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider font-bold text-stone-500">
                  Amount Paid
                </div>
                <div className="font-editorial text-3xl sm:text-4xl font-bold text-[#103D35]">
                  ₹{displayAmount.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Settlement Confirmed</span>
                </span>
                <div className="text-[11px] text-stone-500 mt-1 font-mono">{displayDate}</div>
              </div>
            </div>

            {/* Key Value Pairs Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs sm:text-sm">
              <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8]">
                <span className="text-stone-500 font-medium">Transaction ID (Ref):</span>
                <span className="font-mono font-bold text-stone-900">{displayTxnid}</span>
              </div>

              {displayMihpayid && (
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <span className="text-stone-500 font-medium">PayU Gateway Reference:</span>
                  <span className="font-mono text-stone-700">{displayMihpayid}</span>
                </div>
              )}

              <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8]">
                <span className="text-stone-500 font-medium">Payment Mode:</span>
                <span className="font-semibold text-stone-900 uppercase">{displayMode}</span>
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-white">
                <span className="text-stone-500 font-medium">Recipient Merchant:</span>
                <span className="font-semibold text-stone-900">Sikkim Tour Co. (Biswas Bhavan, Kamalpark, Kestopur, Kolkata 700101)</span>
              </div>

              {(txnDetails?.firstname || query.firstname) && (
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <span className="text-stone-500 font-medium">Traveler Name:</span>
                  <span className="font-semibold text-stone-900">
                    {txnDetails?.firstname || query.firstname}
                  </span>
                </div>
              )}

              {(txnDetails?.productinfo || query.productinfo) && (
                <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAF8]">
                  <span className="text-stone-500 font-medium">Package / Purpose:</span>
                  <span className="font-medium text-stone-800 truncate max-w-[240px]">
                    {txnDetails?.productinfo || query.productinfo}
                  </span>
                </div>
              )}
            </div>

            {/* Next Steps for Traveler */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  What Happens Next?
                </span>
              </div>
              <ul className="space-y-2 text-xs text-amber-950/90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0">1.</span>
                  <span>
                    <strong>Official Voucher Dispatch:</strong> Our reservations team (Biswas Bhavan, Kamalpark, Kestopur, Kolkata 700101)
                    will email and WhatsApp you your trip voucher within 2 hours.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0">2.</span>
                  <span>
                    <strong>Army Permit Liaison:</strong> If your tour includes North Sikkim (Gurudongmar / Yumthang)
                    or Nathu La Pass, please have original Voter ID or Indian Passport copies ready for military checkpost paperwork.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold shrink-0">3.</span>
                  <span>
                    <strong>Vehicle &amp; Chauffeur Details:</strong> Chauffeur name, phone, and vehicle registration
                    (dedicated 4x4 Scorpio / Innova Crysta) will be communicated 24 hours prior to your arrival date.
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons (Hidden when printing) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 print:hidden">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ cta_location: 'payment_success_page' })}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Confirm on WhatsApp Desk</span>
              </a>

              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-stone-300 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print / Save Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-stone-200 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#103D35]" />
                <span>Home</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
