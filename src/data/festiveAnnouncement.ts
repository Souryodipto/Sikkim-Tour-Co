/**
 * Christmas & December Special Promotional Announcement Data
 * Sikkim Tour Co. - Official Festive Campaign
 */

export interface SightseeingAttraction {
  id: number;
  name: string;
  icon: string;
  category: 'Lake & Pass' | 'Spiritual Landmark' | 'Viewpoint' | 'Waterfall' | 'Botanical' | 'Urban & Culture';
  description: string;
  highlightNote?: string;
}

export interface FestiveAnnouncement {
  title: string;
  subtitle: string;
  heroPitch: string;
  originalPrice: string;
  specialPrice: string;
  priceTag: string;
  attractions: SightseeingAttraction[];
  whyChoosePoints: string[];
  closingTagline: string;
  contactNumber: string;
  contactDisplay: string;
  importantNotes: string[];
  fullFormattedText: string;
}

export const FESTIVE_ANNOUNCEMENT_DATA: FestiveAnnouncement = {
  title: 'CHRISTMAS & DECEMBER SPECIAL — SIKKIM TOUR CO.',
  subtitle: 'YOUR WINTER ESCAPE TO THE HIMALAYAS!',
  heroPitch:
    'Dreaming of snow-covered mountains, breathtaking Himalayan valleys, beautiful waterfalls, peaceful monasteries, and unforgettable winter memories? This December, escape to the magical mountains of Sikkim and experience an incredible holiday filled with adventure, natural beauty, and festive vibes!',
  originalPrice: '₹18,999/-',
  specialPrice: '₹9,999/-',
  priceTag: 'PER PERSON',
  attractions: [
    {
      id: 1,
      name: 'Tsomgo Lake',
      icon: '💙',
      category: 'Lake & Pass',
      description:
        'Discover the magnificent Tsomgo Lake, a stunning high-altitude lake surrounded by towering Himalayan mountains. During winter, the lake and its surroundings can transform into a breathtaking snowy landscape, creating unforgettable photo opportunities.',
      highlightNote: 'Glacial alpine lake at 12,310 ft',
    },
    {
      id: 2,
      name: 'Nathula Pass',
      icon: '🏔️',
      category: 'Lake & Pass',
      description:
        'Experience the thrill of visiting Nathula Pass, a historic mountain pass near the India–China border. Enjoy spectacular mountain views and the unique atmosphere of this high-altitude destination. Visits are subject to permits, weather conditions, and official access restrictions.',
      highlightNote: 'Historic Indo-China mountain frontier at 14,140 ft',
    },
    {
      id: 3,
      name: 'Baba Mandir',
      icon: '🙏',
      category: 'Spiritual Landmark',
      description:
        'Visit the famous Baba Harbhajan Singh Mandir, a spiritually significant destination surrounded by the majestic Eastern Himalayas. Discover its fascinating history while enjoying the peaceful mountain scenery.',
      highlightNote: 'Spiritual landmark honoring the legendary Soldier Saint',
    },
    {
      id: 4,
      name: 'Tashi View Point',
      icon: '🌄',
      category: 'Viewpoint',
      description:
        'Witness breathtaking panoramic views of the Himalayan mountain ranges from Tashi View Point. On clear days, you may even catch a glimpse of the magnificent Kanchenjunga range.',
      highlightNote: 'Panoramic morning vistas of Mt. Kanchenjunga',
    },
    {
      id: 5,
      name: 'Hanuman Tok',
      icon: '🙏',
      category: 'Spiritual Landmark',
      description:
        'Visit Hanuman Tok, a beautiful hilltop temple known for its peaceful surroundings, spiritual atmosphere, and spectacular views of the surrounding mountains.',
      highlightNote: 'Hilltop sanctuary at 7,200 ft with pristine mountain air',
    },
    {
      id: 6,
      name: 'Banjhakri Falls',
      icon: '💦',
      category: 'Waterfall',
      description:
        'Explore the beautiful Banjhakri Falls and Energy Park, where cascading water, lush greenery, landscaped pathways, and traditional Sikkimese-inspired sculptures create a wonderful sightseeing experience.',
      highlightNote: '100-foot natural cascading waterfall & shamanic sculpture park',
    },
    {
      id: 7,
      name: 'Bakthang Waterfalls',
      icon: '🌊',
      category: 'Waterfall',
      description:
        'Enjoy the natural beauty of Bakthang Waterfalls, a scenic attraction near Gangtok where flowing water and lush surroundings offer a refreshing stop for photography and relaxation.',
      highlightNote: 'Scenic mountain stream cascade along the North Sikkim highway',
    },
    {
      id: 8,
      name: 'Orchid Show',
      icon: '🌺',
      category: 'Botanical',
      description:
        "Discover the colourful beauty of Sikkim's orchids at the Orchid Show. Admire beautiful floral displays and explore the region's rich variety of ornamental plants and flowers, subject to seasonal availability.",
      highlightNote: 'Over 500 indigenous Himalayan orchid varieties',
    },
    {
      id: 9,
      name: 'Ganesh Tok',
      icon: '✨',
      category: 'Spiritual Landmark',
      description:
        'Visit Ganesh Tok, a charming hilltop temple offering beautiful views of Gangtok and the surrounding Himalayan landscape. It is an excellent spot for sightseeing and photography.',
      highlightNote: 'Glass viewing gallery with bird’s-eye views of Gangtok valley',
    },
    {
      id: 10,
      name: 'MG Marg, Gangtok',
      icon: '🏙️',
      category: 'Urban & Culture',
      description:
        "Take a relaxing walk along the vibrant MG Marg, Gangtok's famous pedestrian boulevard. Explore local shops, cafés, restaurants, and festive decorations while experiencing the lively atmosphere of the city.",
      highlightNote: 'Litter-free, vehicle-free European-style mountain promenade',
    },
    {
      id: 11,
      name: 'Lal Bazaar',
      icon: '🛍️',
      category: 'Urban & Culture',
      description:
        'Explore Lal Bazaar, a traditional local market where you can discover regional products, local culture, and the everyday life of Sikkim.',
      highlightNote: 'Authentic local market: yak cheese (chhurpi), tea, and handicrafts',
    },
  ],
  whyChoosePoints: [
    'Breathtaking Himalayan mountain views',
    'A chance to experience beautiful winter landscapes',
    'Scenic waterfalls and peaceful natural surroundings',
    'Beautiful temples and spiritually significant destinations',
    'Colourful floral attractions and local culture',
    'Incredible photography opportunities',
    'A memorable Christmas and December holiday experience',
  ],
  closingTagline: 'THIS CHRISTMAS, GIVE YOURSELF THE GIFT OF THE MOUNTAINS! 🏔️❤️',
  contactNumber: '917001846727',
  contactDisplay: '+91 7001846727',
  importantNotes: [
    'Snowfall is weather-dependent and cannot be guaranteed.',
    'Nathula Pass, Tsomgo Lake, and other restricted areas are subject to permits, government regulations, and weather conditions.',
    'Orchid displays and seasonal attractions are subject to availability.',
    'The ₹9,999/- offer is subject to package terms, travel dates, availability, and confirmed inclusions. Please contact us before booking.',
  ],
  fullFormattedText: `🎄❄️ CHRISTMAS & DECEMBER SPECIAL — SIKKIM TOUR CO. ❄️🎄

🏔️ YOUR WINTER ESCAPE TO THE HIMALAYAS!

Dreaming of snow-covered mountains, breathtaking Himalayan valleys, beautiful waterfalls, peaceful monasteries, and unforgettable winter memories? This December, escape to the magical mountains of Sikkim and experience an incredible holiday filled with adventure, natural beauty, and festive vibes!

✨ EXCLUSIVE DECEMBER OFFER ✨

~~₹18,999/-~~  
🔥 NOW JUST ₹9,999/- PER PERSON! 🔥

Get ready to explore the beauty of Gangtok, witness spectacular Himalayan landscapes, and discover some of Sikkim's most iconic tourist attractions with Sikkim Tour Co.

━━━━━━━━━━━━━━━━━━

🏔️ EXPLORE THE BEAUTY OF SIKKIM

💙 1. TSOMGO LAKE  
Discover the magnificent Tsomgo Lake, a stunning high-altitude lake surrounded by towering Himalayan mountains. During winter, the lake and its surroundings can transform into a breathtaking snowy landscape, creating unforgettable photo opportunities.

🏔️ 2. NATHULA PASS  
Experience the thrill of visiting Nathula Pass, a historic mountain pass near the India–China border. Enjoy spectacular mountain views and the unique atmosphere of this high-altitude destination. Visits are subject to permits, weather conditions, and official access restrictions.

🙏 3. BABA MANDIR  
Visit the famous Baba Harbhajan Singh Mandir, a spiritually significant destination surrounded by the majestic Eastern Himalayas. Discover its fascinating history while enjoying the peaceful mountain scenery.

🌄 4. TASHI VIEW POINT  
Witness breathtaking panoramic views of the Himalayan mountain ranges from Tashi View Point. On clear days, you may even catch a glimpse of the magnificent Kanchenjunga range.

🙏 5. HANUMAN TOK  
Visit Hanuman Tok, a beautiful hilltop temple known for its peaceful surroundings, spiritual atmosphere, and spectacular views of the surrounding mountains.

💦 6. BANJHAKRI FALLS  
Explore the beautiful Banjhakri Falls and Energy Park, where cascading water, lush greenery, landscaped pathways, and traditional Sikkimese-inspired sculptures create a wonderful sightseeing experience.

🌊 7. BAKTHANG WATERFALLS  
Enjoy the natural beauty of Bakthang Waterfalls, a scenic attraction near Gangtok where flowing water and lush surroundings offer a refreshing stop for photography and relaxation.

🌺 8. ORCHID SHOW  
Discover the colourful beauty of Sikkim's orchids at the Orchid Show. Admire beautiful floral displays and explore the region's rich variety of ornamental plants and flowers, subject to seasonal availability.

✨ 9. GANESH TOK  
Visit Ganesh Tok, a charming hilltop temple offering beautiful views of Gangtok and the surrounding Himalayan landscape. It is an excellent spot for sightseeing and photography.

🏙️ 10. MG MARG, GANGTOK  
Take a relaxing walk along the vibrant MG Marg, Gangtok's famous pedestrian boulevard. Explore local shops, cafés, restaurants, and festive decorations while experiencing the lively atmosphere of the city.

🛍️ 11. LAL BAZAAR  
Explore Lal Bazaar, a traditional local market where you can discover regional products, local culture, and the everyday life of Sikkim.

━━━━━━━━━━━━━━━━━━

❄️ WHY CHOOSE SIKKIM THIS DECEMBER?

🏔️ Breathtaking Himalayan mountain views  
❄️ A chance to experience beautiful winter landscapes  
💦 Scenic waterfalls and peaceful natural surroundings  
🙏 Beautiful temples and spiritually significant destinations  
🌺 Colourful floral attractions and local culture  
📸 Incredible photography opportunities  
🎄 A memorable Christmas and December holiday experience

Whether you're travelling with friends, planning a family vacation, or looking for a refreshing getaway with your loved ones, Sikkim offers a wonderful combination of mountain adventure, natural beauty, and cultural experiences.

━━━━━━━━━━━━━━━━━━

💰 EXCLUSIVE DECEMBER PACKAGE OFFER

~~₹18,999/-~~  
🔥 ₹9,999/- PER PERSON 🔥

Make your winter vacation memorable with Sikkim Tour Co.!

📲 READY TO BOOK YOUR HIMALAYAN ADVENTURE?

Contact us today to enquire about available travel dates, package inclusions, and booking details.

📞 WhatsApp / Call: +91 7001846727

🌐 SIKKIM TOUR CO.  
Your Journey. Our Mountains.

🎅 THIS CHRISTMAS, GIVE YOURSELF THE GIFT OF THE MOUNTAINS! 🏔️❤️

━━━━━━━━━━━━━━━━━━

📌 Important Information:  
• Snowfall is weather-dependent and cannot be guaranteed.  
• Nathula Pass, Tsomgo Lake, and other restricted areas are subject to permits, government regulations, and weather conditions.  
• Orchid displays and seasonal attractions are subject to availability.  
• The ₹9,999/- offer is subject to package terms, travel dates, availability, and confirmed inclusions. Please contact us before booking.`,
};
