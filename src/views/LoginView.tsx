import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Mail, Send, ShieldCheck, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { navigate } = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('traveler@example.com');
  const [password, setPassword] = useState('himalayas2026');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(email);
    if (res.success) {
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } else {
      setErrorMsg(res.message || 'Login failed. Please check credentials.');
    }
  };

  const handleDemoLogin = async (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@sikkimtourcompany.com');
      await login('admin@sikkimtourcompany.com', 'admin');
      navigate('/admin');
    } else {
      setEmail('traveler@example.com');
      await login('traveler@example.com', 'customer');
      navigate('/account');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-28 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-stone-200 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0b1e17] text-[#c59b27] mb-3 border border-[#c59b27]/40 shadow-sm">
            <img src="/logo.png" alt="Sikkim Tour Co." className="w-12 h-12 rounded-full object-cover" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D35]">
            Sikkim Tour Co.
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-mono uppercase tracking-wider">
            Your Journey. Our Mountains.
          </p>
        </div>

        {/* ZERO ACCOUNT BARRIER NOTICE */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No Account or Sign Up Required!</span>
          </div>
          <p className="text-emerald-800/90 leading-relaxed text-[11px]">
            At Sikkim Tour Co., all travelers can browse destinations, view packages, use the AI planner, and track bookings directly without creating an account or memorizing passwords.
          </p>
          <button
            onClick={() => navigate('/account')}
            className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Open Booking & Voucher Tracker Directly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* DIRECT WHATSAPP & EMAIL */}
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold text-center">
            Or Contact Our Concierge Desk
          </div>
          <a
            href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (+91 70018 46727)</span>
          </a>
          <a
            href="mailto:info@sikkimtourcompany.com?subject=Travel Inquiry - Sikkim Tour Co."
            className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs flex items-center justify-center gap-2 border border-stone-200 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#173D35]" />
            <span>Email info@sikkimtourcompany.com</span>
          </a>
        </div>

        {/* OPTIONAL INTERNAL DESK LOGIN (FOR OPERATIONS STAFF) */}
        <div className="pt-4 border-t border-stone-200">
          <div className="text-[10px] text-stone-400 uppercase font-mono tracking-wider font-semibold text-center mb-2.5">
            Internal Operations Staff Access
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('customer')}
              className="py-1.5 px-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded text-[11px] font-medium text-stone-700 flex items-center justify-center gap-1"
            >
              <UserCheck className="w-3 h-3 text-emerald-600" /> Demo Traveler
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-1.5 px-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded text-[11px] font-medium text-stone-700 flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-[#c59b27]" /> Admin Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
