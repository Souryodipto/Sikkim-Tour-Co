export interface PolicySection {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const policiesData = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'October 2026',
    intro:
      'Sikkim Tour Co. ("we", "our", or "the company") is committed to safeguarding the privacy and personal data of our travellers. This Privacy Policy details how we collect, handle, and protect your information when you enquire or communicate with us.',
    sections: [
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'We collect only the essential details necessary to evaluate, plan, and execute your Himalayan travel enquiry: your full name, email address, telephone/WhatsApp number, nationality category, dates of intended travel, preferred destinations, passenger counts, and travel preferences.',
          'We do not collect sensitive personal banking details, credit card numbers, or unnecessary identity documents through ordinary online enquiry forms. Mandatory government permit documents (such as passport copies or voter IDs required for Sikkim checkpost clearances) are requested only after a confirmed booking itinerary has been agreed upon, and are transmitted securely.',
        ],
      },
      {
        heading: '2. Purpose of Data Processing',
        paragraphs: [
          'Your data is utilised strictly to prepare personalized travel quotations, coordinate with vetted transport partners and verified accommodations in Sikkim and Darjeeling, and provide on-ground operational support during your journey.',
          'We will never sell, lease, or distribute your personal contact information to third-party marketing companies, advertisers, or lead brokers.',
        ],
      },
      {
        heading: '3. Data Security & Storage',
        paragraphs: [
          'Enquiry records are stored in secure, access-controlled databases with industry-standard encryption. Access is restricted exclusively to authorized travel coordination personnel responsible for your quotation.',
        ],
      },
      {
        heading: '4. Your Rights',
        paragraphs: [
          'You retain the right to inspect, correct, or request the permanent deletion of your contact records from our systems at any time by emailing us at info@sikkimtourco.com.',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'October 2026',
    intro:
      'Please read these terms and conditions carefully before confirming a travel itinerary with Sikkim Tour Co. By requesting a quotation or confirming an itinerary, you acknowledge and accept these operational terms.',
    sections: [
      {
        heading: '1. Quotations and Indicative Pricing',
        paragraphs: [
          'All packages and itineraries published on our website, brochures, or marketing materials are offered on a custom quote basis without generic fixed pricing. Official, binding commercial quotations are delivered in writing via email or official WhatsApp correspondence following mutual agreement on dates, accommodation categories, vehicle allocations, and specific travel inclusions.',
          'Quotations remain valid for 7 calendar days from the date of issuance, subject to real-time hotel room availability and transport tariffs.',
        ],
      },
      {
        heading: '2. Permits and Government Clearances',
        paragraphs: [
          'Entry to certain areas of Sikkim (including Tsomgo Lake, Nathula Pass, and all of North Sikkim) is subject to Inner Line Permits (ILP) or Protected Area Permits (PAP) issued at the discretion of the Sikkim Tourism Department and Indian Military Authorities.',
          'Sikkim Tour Co. assists guests in lodging permit applications; however, we cannot guarantee permit issuance or access if routes are sealed by authorities due to border security, geopolitical restrictions, or unforeseen military maneuvers.',
        ],
      },
      {
        heading: '3. Route Alterations & Force Majeure',
        paragraphs: [
          'The Eastern Himalayas are subject to rapid weather shifts, seasonal snowfall, road clearances, and sudden landslides along mountain corridors like the NH-10 Teesta Valley highway. For the safety of our travellers and crew, Sikkim Tour Co. and our experienced mountain chauffeurs reserve the right to alter route sequences, detour via alternate passes, or substitute equivalent destinations if an area becomes impassable.',
        ],
      },
      {
        heading: '4. Health, Fitness & High Altitude',
        paragraphs: [
          'Travellers are responsible for ensuring they possess suitable physical fitness for high-altitude travel (particularly North Sikkim and Gurudongmar Lake at 17,800 ft). We strongly recommend comprehensive travel and medical insurance.',
        ],
      },
    ],
  },

  cancellation: {
    title: 'Cancellation Policy',
    lastUpdated: 'October 2026',
    intro:
      'We understand that plans can change unexpectedly. Because Himalayan hotels, high-clearance mountain vehicles, and permit allocations require substantial pre-commitments, our cancellation schedule is structured as follows.',
    sections: [
      {
        heading: '1. Standard Cancellation Timeline',
        paragraphs: [
          '30 days or more prior to arrival: Full refund minus a nominal administrative processing fee of ₹1,500 per booking.',
          '15 to 29 days prior to arrival: 75% refund of total itinerary quotation value.',
          '8 to 14 days prior to arrival: 50% refund of total itinerary quotation value.',
          'Within 7 days of arrival or No-Show: Non-refundable, as vehicles, mountain guides, and hotel rooms are prepaid and cannot be re-allocated on short notice.',
        ],
      },
      {
        heading: '2. Force Majeure & Severe Weather Closures',
        paragraphs: [
          'If an entire destination sector (e.g. North Sikkim) is closed by the District Administration or Army before commencement of the sector due to severe landslides or snowfall, we will make every effort to substitute an alternate circuit (such as Pelling or Darjeeling) or refund the unexpended transport/permit components.',
        ],
      },
    ],
  },

  refund: {
    title: 'Refund Policy',
    lastUpdated: 'October 2026',
    intro:
      'This Refund Policy outlines how refund claims are processed following eligible cancellations or adjustments.',
    sections: [
      {
        heading: '1. Processing Method and Timeline',
        paragraphs: [
          'Approved refunds are credited back to the original source bank account or payment method utilized during booking. International refunds are remitted via standard international bank wire transfer.',
          'Refunds are processed within 7 to 10 working days from the date of written cancellation confirmation.',
        ],
      },
      {
        heading: '2. Non-Refundable Items',
        paragraphs: [
          'Government statutory permit fees, Nathu La application processing charges, train/flight booking tickets (subject to railway/airline specific cancellation tariffs), and payment gateway transaction surcharges are non-refundable.',
        ],
      },
    ],
  },

  disclaimer: {
    title: 'Travel & Legal Disclaimer',
    lastUpdated: 'October 2026',
    intro:
      'Important notices regarding travel permissions, high altitude, road conditions, and external regulations.',
    sections: [
      {
        heading: '1. No Legal Guarantees for International Entry',
        paragraphs: [
          'Sikkim Tour Co. provides guidance based on current guidelines issued by the Ministry of External Affairs, Ministry of Home Affairs, and Government of Sikkim. We do not provide legal guarantees regarding Indian visa issuance or Protected Area Permit approval. Entry permissions remain under the exclusive sovereignty of the Government of India and local border security authorities.',
        ],
      },
      {
        heading: '2. Mountain Road Hazards and Travel Time Fluctuations',
        paragraphs: [
          'Mountain travel times in the Eastern Himalayas cannot be calculated by standard highway averages. Road conditions, construction, monsoon debris, and military convoys can introduce unexpected delays. Travellers are advised not to book same-day tight flight connections immediately following high-altitude or long cross-valley transit days.',
        ],
      },
      {
        heading: '3. Indicative Content Notice',
        paragraphs: [
          'All itineraries, travel guides, and photographs are curated to provide realistic depictions of the Eastern Himalayas. Package starting prices are indicative launch baselines and subject to season, vehicle type, and room tier selection.',
        ],
      },
    ],
  },
};
