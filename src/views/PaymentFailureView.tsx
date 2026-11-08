import React from 'react';
import { useRouter } from '../context/RouterContext';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import {
  XCircle,
  AlertTriangle,
  RotateCcw,
  MessageSquare,
  Phone,
  Home,
  Building,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export const PaymentFailureView: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const query = currentRoute.queryParams;

  const txnid = query.txnid || '';
  const errorMessage =
    query.error ||
    query.errorMessage ||
    'The transaction could not be completed by your bank or the payment session timed out.';
  const amount = query.amount ? parseFloat(query.amount) : 0;

  const retryUrl = `/pay-now${amount > 0 ? `?amount=${amount}` : ''}`;

  const whatsappMessage = encodeURIComponent(
    `Hi Sikkim Tour Co., my online payment failed (Ref: ${txnid || 'N/A'}). Error: ${errorMessage}. Please help me complete my booking.`
  );
  const whatsappUrl = `https://wa.me/917001846727?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          
          {/* Header Warning Icon */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <XCircle className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-mono uppercase tracking-wider font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Payment Not Completed</span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Transaction Incomplete
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              We were unable to verify your payment. No charges were captured by Sikkim Tour Co.
            </p>
          </div>

          {/* Error Details Box */}
          <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-3 text-xs sm:text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-stone-500 font-medium">Gateway Message:</span>
              <span className="text-right font-semibold text-red-700 max-w-[280px]">
                {errorMessage}
              </span>
            </div>

            {txnid && (
              <div className="flex items-center justify-between gap-4 border-t border-stone-200/70 pt-2.5">
                <span className="text-stone-500 font-medium">Attempt Reference ID:</span>
                <span className="font-mono text-stone-800">{txnid}</span>
              </div>
            )}

            {amount > 0 && (
              <div className="flex items-center justify-between gap-4 border-t border-stone-200/70 pt-2.5">
                <span className="text-stone-500 font-medium">Attempted Amount:</span>
                <span className="font-bold text-stone-900">₹{amount.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* Bank Refund Guarantee Notice */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950/90 leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Did money get debited from your account?</span>
            </div>
            <p>
              Do not worry. If funds were debited by your bank, UPI or card network, they are completely safe.
              In accordance with RBI regulations, failed gateway transactions are automatically credited back to your original source account within 2 to 4 working days.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(retryUrl)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-700 via-[#103D35] to-teal-800 hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#EBA94B]" />
              <span>Retry Payment via PayU</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ cta_location: 'payment_failure_page' })}
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-center cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Assistance on WhatsApp</span>
              </a>

              <a
                href="tel:+917001846727"
                onClick={() => trackPhoneClick({ click_location: 'payment_failure_page' })}
                className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-2 border border-stone-300 transition-colors text-center cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#103D35]" />
                <span>Call Desk: +91 70018 46727</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-50 text-stone-600 font-medium text-xs flex items-center justify-center gap-1.5 border border-stone-200 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-stone-500" />
              <span>Return to Homepage</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
