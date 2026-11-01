import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { HelpCircle, Search, ChevronDown, MessageSquare, Phone, ShieldCheck, FileCheck2, Calendar, Car, Mountain, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'permits' | 'booking' | 'transport' | 'season' | 'health' | 'international';
}

const FAQS: FaqItem[] = [
  // PERMITS
  {
    category: 'permits',
    question: 'What identity documents are strictly required for Sikkim Army permits (Nathu La, Gurudongmar)?',
    answer:
      'Indian nationals MUST carry their original Voter ID Card or Indian Passport along with 4 passport-size photographs. Please note: Indian Army checkposts strictly DO NOT accept Aadhaar cards or PAN cards for protected border security zone permits (Gurudongmar Lake, Yumthang Valley, Zero Point, and Nathu La Pass).',
  },
  {
    category: 'permits',
    question: 'How far in advance must permits be processed?',
    answer:
      'Inner Line and Protected Area Permits (PAP) must be applied for 24 to 48 hours prior to your travel date through a registered Sikkim tour operator like Sikkim Tour Co. We handle the entire documentation and checkpost clearance on your behalf.',
  },
  {
    category: 'permits',
    question: 'Can foreign nationals visit North Sikkim and Nathu La Pass?',
    answer:
      'Under Ministry of Home Affairs regulations, foreign nationals are strictly prohibited from visiting Nathu La Pass and Gurudongmar Lake due to international border security. However, foreign nationals CAN visit Lachung and Yumthang Valley in North Sikkim and Tsomgo Lake in East Sikkim with Protected Area Permits, provided they travel in a group of 2 or more with a registered local tour operator.',
  },
  // BOOKING
  {
    category: 'booking',
    question: 'Do I need to register or create an account to book with Sikkim Tour Co.?',
    answer:
      'No. Sikkim Tour Co. operates with zero login friction. You do not need to create accounts or remember passwords. Simply explore our 15 curated packages or tailor-made trip planner, then connect directly with our Gangtok operations desk via WhatsApp (+91 70018 46727) or Email (info@sikkimtourco.com).',
  },
  {
    category: 'booking',
    question: 'How does pricing work? Why are fixed prices not shown on every package?',
    answer:
      'Mountain travel in the Himalayas involves seasonal variables: high-altitude 4x4 vehicle rates, military permit surcharges, dynamic hotel room inventories, and party sizes. We provide custom itemized quotations with zero hidden charges within 15 minutes of receiving your travel dates and group preferences.',
  },
  {
    category: 'booking',
    question: 'Can I pay directly on the website? How are bookings confirmed?',
    answer:
      'No. Sikkim Tour Co. does NOT accept or process direct payments on this website. Because high-altitude permits (Nathu La, Gurudongmar Lake, Yumthang) and mountain hotel inventories must be verified manually by our Gangtok travel desk, reservations submitted on this site are 100% free requests. Once your travel dates, vehicle allocation, and traveler identity documents are verified, our desk issues an official itemized proforma invoice and voucher, and payment is settled directly with our registered office via official bank transfer (NEFT/RTGS) or UPI with tax invoices.',
  },
  // TRANSPORT
  {
    category: 'transport',
    question: 'How do I reach Gangtok from Bagdogra Airport (IXB) or NJP Railway Station?',
    answer:
      'Gangtok is located approximately 120-125 km from Bagdogra Airport (IXB) and New Jalpaiguri Railway Station (NJP). The drive takes around 4.5 to 5 hours along the scenic NH10 Teesta River highway. Sikkim Tour Co. arranges private airport pickup in verified mountain vehicles (Toyota Innova Crysta, Scorpio, or Bolero).',
  },
  {
    category: 'transport',
    question: 'Can I self-drive my personal car to North Sikkim?',
    answer:
      'No. Outside private vehicles (non-commercial or non-Sikkim registered) are strictly prohibited by Sikkim transport authorities from entering protected areas like Lachen, Lachung, and Gurudongmar Lake due to challenging terrain and strict syndicate regulations. All tourists must travel in Sikkim-registered commercial tourist vehicles with local certified drivers.',
  },
  {
    category: 'transport',
    question: 'What vehicles are used for high-altitude North Sikkim and Silk Route tours?',
    answer:
      'We assign robust 4x4 and high-clearance mountain vehicles: Toyota Innova Crysta for premium luxury comfort, or Mahindra Scorpio / Bolero 4x4 for rugged terrain and snowy mountain passes.',
  },
  // SEASON
  {
    category: 'season',
    question: 'What is the absolute best time to visit Sikkim?',
    answer:
      'The two prime seasons are: 1) Spring (March to May) for mild weather and magnificent rhododendron and orchid blooms across Yumthang and Barsey; 2) Autumn (October to mid-December) for crystal-clear blue skies and panoramic views of Mount Kanchenjunga (28,169 ft).',
  },
  {
    category: 'season',
    question: 'When can I experience snowfall in Sikkim?',
    answer:
      'Snowfall typically occurs from late December to February in high-altitude regions including Zero Point, Yumthang Valley, Gurudongmar Lake, and Tsomgo Lake. Warm multi-layer thermal clothing and 4x4 vehicles are required for winter snow trips.',
  },
  {
    category: 'season',
    question: 'Is Sikkim safe to visit during the monsoon (July to August)?',
    answer:
      'While southern Sikkim and Gangtok remain lush and green, heavy monsoon showers can cause landslides and temporary road blockages along the NH10 highway and North Sikkim routes. For high-altitude expeditions, we recommend traveling in Spring or Autumn.',
  },
  // HEALTH
  {
    category: 'health',
    question: 'How do I prevent Acute Mountain Sickness (AMS) at Gurudongmar Lake (17,800 ft)?',
    answer:
      'Gurudongmar Lake sits at an extreme elevation of 17,800 ft. To ensure safe acclimatization, our itineraries mandate an overnight stay at Lachen (9,000 ft) before ascending. Travelers should stay well-hydrated, avoid alcohol, ascend gradually, and consult their doctor regarding preventive medicines like Diamox if needed. Portable oxygen cylinders are available in our vehicles.',
  },
  {
    category: 'health',
    question: 'Are there age restrictions for visiting Gurudongmar Lake?',
    answer:
      'Due to thin air and low oxygen levels, infants under 5 years and elderly travelers with severe cardiac or respiratory conditions are advised by medical guidelines to avoid ascending beyond Chopta Valley (13,000 ft). Our drivers monitor oxygen saturation and descend immediately if any traveler feels unwell.',
  },
  // INTERNATIONAL
  {
    category: 'international',
    question: 'What permits do foreign nationals need to enter Sikkim?',
    answer:
      'Foreign nationals require an Inner Line Permit (ILP) / Restricted Area Permit (RAP) in addition to a valid Indian Tourist Visa. ILPs are issued free of charge at border checkposts (Rangpo and Melli) or major Indian airports upon showing a valid passport and visa.',
  },
];

export const FaqView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#103D35]/10 text-[#103D35] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-[#EBA94B]" />
            <span>Official Sikkim Tour Co. Knowledge Base</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103D35] tracking-tight mb-4">
            Frequently Asked Questions &amp; Traveler Guidelines
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Verified answers on Indian Army checkpost rules, vehicle options, best seasons, high-altitude health, and booking procedures with Gangtok&apos;s premier licensed tour operator.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search permit rules, cabs, Gurudongmar, costs..."
              className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-stone-300 text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#103D35]/30 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'permits', label: 'Army Permits & ID Proof' },
            { id: 'booking', label: 'Booking & Payments' },
            { id: 'transport', label: 'Cabs & Airport Routes' },
            { id: 'season', label: 'Best Seasons & Snow' },
            { id: 'health', label: 'High Altitude & AMS' },
            { id: 'international', label: 'Foreign Tourists' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#103D35] text-white shadow-md ring-2 ring-[#EBA94B]/40'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-14">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
              <p className="text-sm text-stone-600 mb-3">No matching answers found for "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-[#103D35] text-white text-xs font-bold rounded-lg"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#103D35]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#EBA94B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-stone-100">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Help Banner */}
        <div className="p-8 rounded-2xl bg-[#103D35] text-white border border-[#EBA94B]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Have a Specific Question About Your Travel Dates?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Connect directly with our Gangtok operations desk. We verify weather, road clearances, and permit quotas in real-time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20a%20question%20regarding%20my%20Sikkim%20trip%20planning."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="tel:+917001846727"
              className="px-5 py-3 rounded-xl bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 fill-[#103D35]" />
              <span>Call Us (+91 70018 46727)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
