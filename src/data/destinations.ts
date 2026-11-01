export interface TouristSpot {
  id: string;
  name: string;
  altNames?: string[];
  district: 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim';
  elevation: string;
  historicalPeriod: string;
  history: string;
  visitingTips: string[];
  bestTime: string;
  permitRequired: boolean;
  permitNotes?: string;
  imageUrl: string;
  imageCaption: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  district: 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim';
  elevation: string;
  recommendedDuration: string;
  bestSeason: string;
  yearRoundAccess: boolean;
  permitRequired: boolean;
  permitDetails?: string;
  seasonalAdvisory: string;
  shortDescription: string;
  fullOverview: string;
  historyOverview: string;
  royalHeritage: string;
  keyHighlights: string[];
  travelTips: string[];
  nearestHub: string;
  suitableFor: string[];
  spots: TouristSpot[];
}

// -------------------------------------------------------------
// ALL TOURIST SPOTS IN SIKKIM CLASSIFIED BY DISTRICT WITH DEEP HISTORY
// -------------------------------------------------------------

export const northSikkimSpots: TouristSpot[] = [
  {
    id: 'gurudongmar-lake',
    name: 'Gurudongmar Lake',
    altNames: ['Gurudogmar Tso', 'Holy Lake of North Sikkim'],
    district: 'North Sikkim',
    elevation: '5,430 m (17,800 ft)',
    historicalPeriod: '8th Century CE (Guru Padmasambhava) & 15th Century CE (Guru Nanak)',
    history:
      'Perched on the desolate Tibetan plateau at 17,800 feet, Gurudongmar is one of the highest freshwater lakes in the world and one of the most sacred pilgrimage shrines in the Eastern Himalayas. According to Tibetan Buddhist chronicles, in the 8th century CE, Guru Padmasambhava (Guru Rinpoche) visited this frozen wasteland while blessing the sacred hidden land of Sikkim (Beyul Demazong). The local nomadic Dokpas pleaded with him because the lake froze solid throughout the harsh winters, leaving no drinking water. Guru Rinpoche touched a specific part of the lake with his staff, causing it to miraculously thaw; to this day, even when temperatures plunge to -35°C in mid-winter, that exact portion of the lake remains unfrozen. In Sikh history, during his travels to Tibet (Udasin), Guru Nanak Dev Ji visited the lake in the early 15th century, also striking the ice to provide succour to thirsty herdsmen.',
    visitingTips: [
      'Depart Lachen by 4:00 AM to reach the lake before high midday winds and cloud buildup.',
      'Walk deliberately and breathe slowly; atmospheric oxygen is roughly 50% of sea level.',
      'Restricted to Indian citizens only due to proximity to the international border; Army clearances are mandatory.',
    ],
    bestTime: 'April to June & October to November (Crystal clear reflections)',
    permitRequired: true,
    permitNotes: 'Protected Area Permit (PAP) issued by Sikkim Tourism and Army authorities. Indian nationals only.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The sacred azure waters of Gurudongmar Lake at 17,800 ft framed by Mount Gurudongmar',
  },
  {
    id: 'yumthang-valley',
    name: 'Yumthang Valley',
    altNames: ['Sikkim Valley of Flowers', 'Shingba Rhododendron Sanctuary'],
    district: 'North Sikkim',
    elevation: '3,564 m (11,693 ft)',
    historicalPeriod: 'Ancient Trans-Himalayan Grazing Realm & Royal Forest Reserve',
    history:
      'Yumthang Valley is a high-altitude glacial valley carved by the crystal-clear Lachung Chu river. In classical Sikkimese folklore, Yumthang was revered as the earthly garden of the protective deities of Mount Kanchenjunga. The British botanist and explorer Sir Joseph Dalton Hooker spent weeks here in 1849 cataloging over 24 species of wild rhododendrons, an expedition that introduced Himalayan flora to Kew Gardens and fascinated Victorian Europe. The valley encompasses the Shingba Rhododendron Sanctuary, where ancient trees bloom from pale pink to fiery crimson between April and May, set against sheer granite cliff walls.',
    visitingTips: [
      'Spring (April–May) presents the rhododendron bloom; December to February is buried in thick snow.',
      'Stop at the natural sulphur hot springs across the pedestrian footbridge for soothing warmth.',
    ],
    bestTime: 'March to June (Wildflowers) and October to December (Snow peaks)',
    permitRequired: true,
    permitNotes: 'Protected Area Permit required for all visitors. Foreign nationals permitted in groups of 2+.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Yumthang Valley meadows with the Lachung Chu river winding through alpine pine forests',
  },
  {
    id: 'zero-point-yumesamdong',
    name: 'Zero Point (Yumesamdong)',
    altNames: ['Yumesamdong', 'The Edge of Civilisation'],
    district: 'North Sikkim',
    elevation: '4,663 m (15,300 ft)',
    historicalPeriod: 'Ancient Nomadic Dokpa Yak Route',
    history:
      'Zero Point marks the literal terminus of the civilian motorable road in North Sikkim, situated just 15 km beyond Yumthang Valley near the Chinese border. For centuries, this rugged valley of three converging snow-fed streams was used solely by nomadic Tibetan and Sikkimese Dokpas who grazed their long-haired yaks during summer months. The landscape features zero tree growth, high-altitude permafrost, and sheer snow-clad cirques where snow leopards and blue sheep (Bharal) roam.',
    visitingTips: [
      'Carries an additional union charge from Lachung; road conditions determine daily access.',
      'Wear insulated snow boots and windproof layers; wind chills can be extreme.',
    ],
    bestTime: 'April to June & October to December',
    permitRequired: true,
    permitNotes: 'PAP required; accessible only via registered Sikkim operators.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Permafrost snowfields and converging glacial streams at Zero Point (15,300 ft)',
  },
  {
    id: 'lachen-village',
    name: 'Lachen Village',
    altNames: ['Big Pass Village', 'Gateway to Gurudongmar'],
    district: 'North Sikkim',
    elevation: '2,750 m (9,020 ft)',
    historicalPeriod: 'Centuries-Old Indigenous Dzumsa Council System',
    history:
      'Lachen, which translates to "Big Pass" in Bhutia, is an authentic mountain village perched over the roaring Lachen Chu gorge. Remarkably, Lachen operates under the traditional "Dzumsa" administrative system—a direct democratic village council that predates modern Indian municipal governance. Headed by two elected Pipons (village chiefs), the Dzumsa regulates community laws, grazing rights, seasonal migrations, and environmental protection without external bureaucracy.',
    visitingTips: [
      'Base village for early morning ascent to Gurudongmar Lake.',
      'Rooms are cozy wooden lodges; hot water is usually supplied via geyser or traditional wood-fired buckets.',
    ],
    bestTime: 'March to June & October to December',
    permitRequired: true,
    permitNotes: 'PAP required; checkpost verification at Chungthang.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Traditional wooden houses and pine groves of Lachen Village under dramatic mist',
  },
  {
    id: 'lachung-village-monastery',
    name: 'Lachung Village & Monastery',
    altNames: ['Samten Cheling Gompa', 'Small Pass Village'],
    district: 'North Sikkim',
    elevation: '2,624 m (8,610 ft)',
    historicalPeriod: '1880 CE Monastic Foundation',
    history:
      'Lachung ("Small Pass") is nestled amidst picturesque apple and peach orchards flanked by vertical cascading waterfalls. The Lachung Monastery (Samten Cheling), constructed in 1880 under the Nyingma order, is renowned for its vibrant murals depicting Vajrayana deities and the Guru Tsokhang. Like its sister village Lachen, Lachung strictly preserves the Dzumsa council system, where village elders assemble in traditional robes to resolve local matters.',
    visitingTips: [
      'Base camp for exploring Yumthang Valley and Zero Point.',
      'Try the local organic apple cider and warm mountain thukpa prepared by local homestay hosts.',
    ],
    bestTime: 'March to June (Flowers) & October to December (Snow Peaks)',
    permitRequired: true,
    permitNotes: 'PAP required for all domestic and international guests.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The ornate wooden facade of Lachung Monastery framed by steep alpine mountains',
  },
  {
    id: 'chopta-valley',
    name: 'Chopta Valley',
    altNames: ['Chopta Alpine Meadow'],
    district: 'North Sikkim',
    elevation: '4,023 m (13,200 ft)',
    historicalPeriod: 'Ancient Trans-Himalayan Nomadic Route',
    history:
      'Chopta Valley is a breathtaking sub-alpine valley situated between Lachen and Thangu. It is famed for its meandering alpine streams, rare medicinal herbs, and seasonal alpine gentians and primulas. Before modern border closures in 1962, this valley served as an active transit route for trans-Himalayan salt and wool traders traversing between Sikkim and Shigatse in Tibet.',
    visitingTips: [
      'Stop here for photography on the drive between Lachen and Gurudongmar Lake.',
      'Brisk winds are common; maintain a steady walking pace.',
    ],
    bestTime: 'April to June & October to November',
    permitRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Meandering glacial river in Chopta Valley flanked by snow-capped peaks',
  },
  {
    id: 'kala-patthar-north-sikkim',
    name: 'Kala Patthar North Sikkim',
    altNames: ['Black Rock Snowfield'],
    district: 'North Sikkim',
    elevation: '4,511 m (14,800 ft)',
    historicalPeriod: 'High Himalayan Glacial Moraine',
    history:
      'Situated above the hamlet of Thangu, Kala Patthar ("Black Rock") features a stark contrast of jet-black jagged cliffs rising directly out of perpetual white snowfields. It has become an iconic high-altitude snow destination where travellers can touch snow almost throughout the year, even when lower valleys have begun to thaw.',
    visitingTips: [
      'Requires optional local permit and driver supplement from Lachen.',
      'High wind exposure; carry polarized sunglasses to prevent snow blindness.',
    ],
    bestTime: 'October to May',
    permitRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Black metamorphic mountain walls meeting pristine untouched snow at Kala Patthar',
  },
  {
    id: 'mount-katao',
    name: 'Mount Katao',
    altNames: ['Katao Snow Peak'],
    district: 'North Sikkim',
    elevation: '4,572 m (15,000 ft)',
    historicalPeriod: 'Sikkim-Tibet Frontier Ridge',
    history:
      'Mount Katao is a dramatic pyramid-shaped snow peak located 28 km from Lachung. Draped in dense pine and rhododendron forests in its lower reaches and sheer glacial moraines near its summit, Katao has historically served as a military vigilance post. It is prized by travellers for snow tubing, panoramic photographs, and pristine virgin snow.',
    visitingTips: [
      'Requires special Army checkpost permission arranged on the day from Lachung.',
      'Ideal excursion on Day 2 of a North Sikkim tour.',
    ],
    bestTime: 'December to May (for prime snow cover)',
    permitRequired: true,
    permitNotes: 'Army checkpost permit issued selectively based on border protocol.',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Snow-draped alpine pines and jagged ridges of Mount Katao',
  },
  {
    id: 'chungthang-confluence',
    name: 'Chungthang Confluence & Sacred Rock',
    altNames: ['Naydo Sacred Stone', 'Teesta Origin'],
    district: 'North Sikkim',
    elevation: '1,790 m (5,870 ft)',
    historicalPeriod: '8th Century CE (Padmasambhava Rock Legend)',
    history:
      'Chungthang is the strategic junction where the two great northern rivers of Sikkim—the Lachen Chu and Lachung Chu—merge to form the roaring Teesta River. Legend records that Guru Padmasambhava paused at this sacred confluence and rested atop a massive boulder known as "Naydo". He consumed a portion of his meal and blessed the soil, casting grains of paddy over the stone. Uniquely in all of high-altitude North Sikkim where paddy does not typically grow, rice continues to sprout around this sacred rock. A historic Gurudwara also commemorates the legendary visit of Guru Nanak.',
    visitingTips: [
      'Essential transit stop for all travellers heading to Lachen or Lachung.',
      'Visit the sacred rock shrine near the Army outpost.',
    ],
    bestTime: 'Year-Round',
    permitRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The sacred confluence of Lachen Chu and Lachung Chu at Chungthang',
  },
  {
    id: 'phodong-monastery',
    name: 'Phodong Monastery',
    altNames: ['Phodong Karma Kagyu Gompa'],
    district: 'North Sikkim',
    elevation: '1,370 m (4,500 ft)',
    historicalPeriod: '1740 CE (Reign of 4th Chogyal Gyurmed Namgyal)',
    history:
      'Phodong Monastery is one of the six premier royal monasteries of Sikkim, belonging to the Karma Kagyu lineage. Founded in 1740 by the 4th Chogyal, Gyurmed Namgyal, it preserves historic murals of Mahakala, the sixteen Arhats, and an ancient lineage of tantric monastic dances (Cham). It stands as a monumental testament to the deep patronage of the Namgyal royal dynasty in North Sikkim.',
    visitingTips: [
      'Located 38 km north of Gangtok on the North Sikkim highway.',
      'The annual Cham dance festival held in December (28th and 29th day of Tibetan calendar) is a cultural masterpiece.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Historic gilded roof and ceremonial courtyard of Phodong Monastery',
  },
  {
    id: 'labrang-monastery',
    name: 'Labrang Monastery',
    altNames: ['The Octagonal Monastery of North Sikkim'],
    district: 'North Sikkim',
    elevation: '1,450 m (4,750 ft)',
    historicalPeriod: '1844 CE (Founded by Latsun Chempo Royal Lineage)',
    history:
      'Perched just one kilometer above Phodong Monastery, Labrang Monastery is celebrated as one of the most architecturally unique monastic structures in the Himalayas. Built in 1844, its sanctum is constructed in a rare octagonal stone design ("Rirab Lobling") that has survived earthquakes and alpine winters unaltered. It represents the Nyingma tradition and houses sacred bronze relics and centuries-old wooden printing blocks.',
    visitingTips: [
      'Combine with Phodong Monastery in a quiet morning cultural excursion.',
      'Walk through the surrounding cypress and oak groves for supreme tranquility.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The ancient stone octagonal structure of Labrang Monastery',
  },
  {
    id: 'singhik-viewpoint',
    name: 'Singhik Viewpoint',
    altNames: ['The World’s Greatest Vertical Mountain Vista'],
    district: 'North Sikkim',
    elevation: '1,560 m (5,118 ft)',
    historicalPeriod: 'Historical Lepcha Vantage Point',
    history:
      'Singhik Viewpoint offers arguably the single most staggering topographical panorama in the entire Himalayas. Looking west across the deep chasm of the Teesta River, travellers witness Mount Kanchenjunga (8,586 m) and Mount Siniolchu (6,888 m) soaring nearly 7,000 vertical meters above the valley floor. In the 1890s, the renowned British mountaineer Douglas Freshfield described Mount Siniolchu as "the most superb triumph of mountain architecture in the world."',
    visitingTips: [
      'Early sunrise (5:30–6:30 AM) is when the peaks glow in molten gold.',
      'Stop here during the Gangtok–Lachen transit.',
    ],
    bestTime: 'October to December & March to May',
    permitRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Mount Siniolchu and Kanchenjunga soaring above mist-filled valleys at Singhik',
  },
  {
    id: 'dzongu-lepcha-reserve',
    name: 'Dzongu Lepcha Protected Reserve',
    altNames: ['Mayel Lyang', 'The Hidden Lepcha Paradise'],
    district: 'North Sikkim',
    elevation: '1,000 m to 3,600 m',
    historicalPeriod: '1958 CE Royal Decree of Chogyal Tashi Namgyal',
    history:
      'Dzongu is the sanctified ancestral homeland of the indigenous Rongpa (Lepcha) people of Sikkim. In 1958, recognizing the existential threat of modernization to the indigenous culture, the 11th Chogyal, Sir Tashi Namgyal, signed a historic royal decree officially designating Dzongu as an exclusively protected indigenous tribal reserve where non-Lepchas are forbidden from buying land. Lepchas consider themselves born from the pure snows of Mount Kanchenjunga and revere plants, streams, and mountain spirits through ancient animist Mun and Boongthing rituals.',
    visitingTips: [
      'Requires special tribal entry permits coordinated through Sikkim Tour Co.',
      'Stay in authentic Lepcha bamboo homestays with home-cooked organic millet and mountain herbs.',
    ],
    bestTime: 'October to May',
    permitRequired: true,
    permitNotes: 'Special Protected Tribal Area Permit required.',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pristine emerald terraced hills and sacred bamboo bridges of Dzongu',
  },
  {
    id: 'seven-sisters-waterfall',
    name: 'Seven Sisters Waterfall & Naga Falls',
    altNames: ['North Sikkim Cascades'],
    district: 'North Sikkim',
    elevation: '1,100 m (3,600 ft)',
    historicalPeriod: 'Natural Geological Cascade',
    history:
      'Tumbling off the sheer granite bluffs along the Gangtok–Mangan highway, the Seven Sisters Waterfall plunges in seven distinct tiered steps down lush subtropical vegetation. Together with the roaring Naga Waterfall further north, these cascades fed by high glacial springs have provided rest and refresh stops for royal caravans and pilgrims for generations.',
    visitingTips: [
      'A scenic 40-minute drive north of Gangtok; a footbridge offers safe viewing and photography.',
      'Carry waterproof sleeves for cameras as spray can be heavy.',
    ],
    bestTime: 'Year-Round (Spectacular volume in monsoon and autumn)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Multi-tiered white cascade of Seven Sisters Waterfall tumbling through lush green cliffs',
  },
];

export const eastSikkimSpots: TouristSpot[] = [
  {
    id: 'gangtok-mg-marg',
    name: 'Gangtok & MG Marg Promenade',
    altNames: ['Mahatma Gandhi Marg', 'Capital Heart of Sikkim'],
    district: 'East Sikkim',
    elevation: '1,650 m (5,410 ft)',
    historicalPeriod: '1894 CE Royal Capital Relocation under Chogyal Thutob Namgyal',
    history:
      'Gangtok was transformed into the sovereign capital of the Kingdom of Sikkim in 1894 when the 9th Chogyal, Sir Thutob Namgyal, relocated the royal court from Tumlong to establish modern administrative institutions. Today, the centerpiece of Gangtok is MG Marg—India’s first vehicle-free, litter-free pedestrian promenade. Lined with Victorian wrought-iron lampposts, floral flowerbeds, traditional bakeries, and mountain cafes, it exemplifies Sikkim’s modern eco-conscious civic pride while honoring its royal history.',
    visitingTips: [
      'Completely vehicle-free; no cars or two-wheelers permitted on the promenade.',
      'Smoking and littering carry immediate municipal fines; enjoy peaceful evening walks.',
    ],
    bestTime: 'Year-Round',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The pristine pedestrian boulevard of MG Marg, Gangtok with Victorian lamps and flowers',
  },
  {
    id: 'tsomgo-lake',
    name: 'Tsomgo Lake (Changu Lake)',
    altNames: ['Tsongmo Lake', 'Sacred Glacial Lake of the East'],
    district: 'East Sikkim',
    elevation: '3,753 m (12,313 ft)',
    historicalPeriod: 'Ancient Tibetan Trade Highway & Buddhist Divination Lake',
    history:
      'Nestled 38 km from Gangtok along the historic Indo-China trade highway, Tsomgo Lake (in Bhutia: "Source of the Water") is a sacred high-altitude oval lake held in deep reverence by Buddhists and Hindus alike. In ancient times, Buddhist lamas would study the subtle changes in the water’s color to divine the future of the Kingdom of Sikkim: dark stormy shades foretold drought or war, while clear turquoise waters predicted peace and bumper harvests. The lake remains frozen solid from December until April, surrounded by rugged snow-clad alpine peaks.',
    visitingTips: [
      'Dress warmly in heavy windproof jackets; sudden icy winds are common.',
      'Enjoy a scenic ride on the high-altitude ropeway cable car overlooking the lake.',
    ],
    bestTime: 'October to May (Crisp skies & snow)',
    permitRequired: true,
    permitNotes: 'Protected Area Permit required; applied 1 day in advance through registered Sikkim travel agency.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pristine oval waters of sacred Tsomgo Lake reflecting snowy Himalayan peaks',
  },
  {
    id: 'nathu-la-pass',
    name: 'Nathu La Pass',
    altNames: ['The Ancient Silk Route Border', 'Listening Ears Pass'],
    district: 'East Sikkim',
    elevation: '4,310 m (14,140 ft)',
    historicalPeriod: 'Ancient Silk Route & 1904 Younghusband Expedition',
    history:
      'Nathu La, which means "Pass of the Listening Ears" in Tibetan, is a historic mountain pass on the trans-Himalayan Old Silk Route between India and the Tibet Autonomous Region. Through this pass, thousands of yak and mule caravans historically transported silk, tea, musk, spices, and Tibetan wool. In 1904, the British military expedition led by Francis Younghusband crossed Nathu La into Lhasa. After the 1962 border war and historic skirmishes in 1967, the pass was reopened in 2006 for bilateral border trade. Visitors can stand just meters away from the Chinese military post and exchange friendly waves across the barbed international border.',
    visitingTips: [
      'Accessible to Indian nationals only (Wednesdays through Sundays, subject to Army permits).',
      'Atmospheric oxygen is thin; avoid running and carry personal thermal wear.',
    ],
    bestTime: 'May to October & sunny winter days (closed during heavy snowfall)',
    permitRequired: true,
    permitNotes: 'Special Military & Civil Police permit with photo ID. Indian citizens only.',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The dramatic high-altitude crest of Nathu La Pass (14,140 ft) on the Indo-China frontier',
  },
  {
    id: 'baba-harbhajan-mandir',
    name: 'Baba Harbhajan Singh Memorial (Old & New Baba Mandir)',
    altNames: ['Baba Mandir', 'Hero of Nathula'],
    district: 'East Sikkim',
    elevation: '4,000 m (13,123 ft)',
    historicalPeriod: '1968 CE Military Legend',
    history:
      'One of the most unique military folk shrines in the world, Baba Mandir is dedicated to Sepoy Harbhajan Singh of the 23rd Punjab Regiment. In October 1968, while escorting a mule column across the perilous snows of Tukla, Sepoy Harbhajan Singh slipped into a frozen torrent and drowned. Legend holds that he appeared in a dream to a fellow soldier, pointing out the exact spot where his body lay and requesting a memorial shrine. Ever since, Indian soldiers stationed along the frontier revere Baba as the supernatural protector of the border who warns soldiers of impending enemy movements or blizzards.',
    visitingTips: [
      'Included in standard Tsomgo Lake full-day circuits.',
      'The Old Baba Mandir lies further up on the original Silk Route road near Kupup.',
    ],
    bestTime: 'October to May',
    permitRequired: true,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The reverent high-altitude temple of Baba Harbhajan Singh amidst prayer flags',
  },
  {
    id: 'rumtek-monastery',
    name: 'Rumtek Monastery (Dharma Chakra Centre)',
    altNames: ['Dharma Chakra Centre', 'Seat of the Gyalwa Karmapa'],
    district: 'East Sikkim',
    elevation: '1,500 m (4,920 ft)',
    historicalPeriod: '1966 CE (Consecrated by His Holiness the 16th Karmapa)',
    history:
      'Located 24 km from Gangtok, Rumtek Monastery is the most significant and prestigious seat of the Karma Kagyu lineage outside of Tibet. Originally founded in the mid-18th century by the 9th Karmapa Wangchuk Dorje with royal support from Chogyal Gyurmed Namgyal, the modern grand monastery was rebuilt between 1962 and 1966 by His Holiness the 16th Gyalwa Karmapa, Rangjung Rigpe Dorje, following his exile from Tsurphu Monastery in Tibet. The complex houses the breathtaking Golden Stupa containing the holy relics of the 16th Karmapa, exquisite 300-year-old thangkas, and ancient silk embroideries.',
    visitingTips: [
      'Carry government photo ID for standard security check at the monastery gateway.',
      'Walk up the paved incline through monk quarters and visit the Golden Stupa hall behind the main shrine.',
    ],
    bestTime: 'Year-Round (Morning prayers at 6:00 AM are deeply moving)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The majestic Dharma Chakra Centre of Rumtek Monastery surrounded by prayer flags',
  },
  {
    id: 'enchey-monastery',
    name: 'Enchey Monastery',
    altNames: ['The Solitary Hermitage Gompa'],
    district: 'East Sikkim',
    elevation: '1,700 m (5,580 ft)',
    historicalPeriod: '1840 CE (Blessed by Tantric Master Lama Drupthob Karpo) & 1909 CE Rebuild',
    history:
      'Perched on a quiet forested spur above Gangtok with an unbroken view of Mount Kanchenjunga, Enchey ("The Solitary Temple") was founded on a holy site blessed in the mid-19th century by the legendary tantric master Lama Drupthob Karpo, revered in folklore as the "Flying Lama" for his supernatural levitation abilities. In 1909, the 10th Chogyal Sir Sidkeong Tulku Namgyal rebuilt the present monastery in the shape of a pagoda, dedicating it to the protective deities of Sikkim. The monastery belongs to the Mindrolling Nyingma tradition.',
    visitingTips: [
      'A serene 10-minute drive from MG Marg.',
      'The annual Cham dance held in January features magnificent masks representing the guardian spirits.',
    ],
    bestTime: 'Year-Round',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Traditional pagoda-style wooden eaves and dragon murals of Enchey Monastery',
  },
  {
    id: 'namgyal-institute-of-tibetology',
    name: 'Namgyal Institute of Tibetology & Do-Drul Chorten',
    altNames: ['NIT Gangtok', 'Trulshik Rinpoche Stupa'],
    district: 'East Sikkim',
    elevation: '1,524 m (5,000 ft)',
    historicalPeriod: '1945 CE (Do-Drul Chorten) & 1958 CE (NIT Inauguration by Nehru)',
    history:
      'The Namgyal Institute of Tibetology was inaugurated on 1 October 1958 by India’s first Prime Minister, Pandit Jawaharlal Nehru, alongside the 14th Dalai Lama and Chogyal Sir Tashi Namgyal. Constructed in classical Sikkimese palace architecture, it is one of the world’s leading research institutions for Mahayana and Vajrayana Buddhism, housing over 60,000 rare Tibetan manuscripts, 11th-century bronzes, and sacred ritual artifacts. Adjacent lies the Do-Drul Chorten, a massive golden-spired stupa built in 1945 by Trulshik Rinpoche to subdue negative spirits that once haunted the mountain ridge, surrounded by 108 Mani prayer wheels.',
    visitingTips: [
      'Open Monday to Saturday; photography inside museum galleries is strictly restricted.',
      'Circumambulate the Do-Drul Chorten in a clockwise direction as is traditional.',
    ],
    bestTime: 'Year-Round',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The golden spire of Do-Drul Chorten and traditional eaves of Namgyal Institute of Tibetology',
  },
  {
    id: 'zuluk-old-silk-route',
    name: 'Zuluk (Dzuluk) & Old Silk Route',
    altNames: ['The 32 Hairpin Loops', 'Thambi Viewpoint', 'Kupup Elephant Lake'],
    district: 'East Sikkim',
    elevation: '2,865 m to 4,000 m (9,400 ft to 13,100 ft)',
    historicalPeriod: 'Historic Trans-Himalayan Silk & Caravan Trade Route',
    history:
      'Zuluk is a historic mountain hamlet on the rugged southern slopes of East Sikkim along the ancient trans-Himalayan Silk Route connecting Kalimpong and Gangtok to Lhasa via the Jelep La pass. The drive ascending from Zuluk to Thambi Viewpoint navigates 32 jaw-dropping hairpin loops (Bhulbhulaiya), hailed as an engineering marvel and one of the world’s most scenic mountain roads. Higher up along the ridge lie Lungthung, the high-altitude Tukla Valley war memorial, and Kupup Lake (Elephant Lake), shaped exactly like a resting elephant.',
    visitingTips: [
      'Stay in traditional homestays run by local mountain families in Zuluk or Rongli.',
      'Witness sunrise over Kanchenjunga from Thambi Viewpoint (11,200 ft).',
    ],
    bestTime: 'September to December (Clear views) & April to May (Wildflower blooms)',
    permitRequired: true,
    permitNotes: 'Silk Route Inner Line Permit issued from Rongli SDPO.',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The legendary 32 hairpin turns of the Old Silk Route winding through Zuluk',
  },
  {
    id: 'tashi-viewpoint-ganesh-tok',
    name: 'Tashi Viewpoint, Ganesh Tok & Hanuman Tok',
    altNames: ['Royal Panoramic Viewpoints of East Sikkim'],
    district: 'East Sikkim',
    elevation: '1,800 m to 2,200 m (5,900 ft to 7,200 ft)',
    historicalPeriod: '1914–1963 CE (Reign of 11th Chogyal Sir Tashi Namgyal)',
    history:
      'Constructed by the 11th Chogyal of Sikkim, Sir Tashi Namgyal (who reigned from 1914 to 1963), Tashi Viewpoint was designed as a royal pavilion to contemplate sunrise across Mount Kanchenjunga and Mount Siniolchu. Higher up along the forested ridge, Ganesh Tok and Hanuman Tok offer elevated viewpoints managed with meticulous cleanliness by the Indian Army. In Sikkimese royal lore, Hanuman Tok is an ancient spiritual spot where Lord Hanuman is said to have rested during his flight carrying the Sanjeevani herb.',
    visitingTips: [
      'Reach Tashi Viewpoint at first light (5:45 AM) for the sunrise crown of pink and gold.',
      'Combine all three viewpoints in an unhurried 3-hour morning circuit from Gangtok.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Golden morning light striking Mount Kanchenjunga as viewed from Tashi Viewpoint',
  },
  {
    id: 'ban-jhakri-falls',
    name: 'Ban Jhakri Falls & Shamanic Heritage Park',
    altNames: ['The Forest Shaman Waterfall'],
    district: 'East Sikkim',
    elevation: '1,400 m (4,600 ft)',
    historicalPeriod: 'Ancient Indigenous Shamanic & Animist Folklore',
    history:
      'Set in a lush subtropical valley near Gangtok, Ban Jhakri Falls cascades 100 feet down moss-covered cliffs. The park is dedicated to "Ban Jhakri" (the Jungle Shaman)—a central figure in ancient indigenous Sikkimese and Nepali folklore who protects woodland medicines and initiates gifted mountain youths into sacred healing rites. Beautiful stone sculptures depict the traditional animist rituals of the forest healers.',
    visitingTips: [
      'Ideal family-friendly park with paved walking paths and traditional bridges.',
      'Located 7 km from Gangtok town center.',
    ],
    bestTime: 'Year-Round',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The 100-foot natural cascade of Ban Jhakri Falls amidst subtropical forest',
  },
  {
    id: 'saramsa-garden',
    name: 'Saramsa Garden & Ipecac Garden',
    altNames: ['Royal Orchid & Medicinal Estate'],
    district: 'East Sikkim',
    elevation: '1,100 m (3,600 ft)',
    historicalPeriod: '1922 CE (Created by Namgyal Royal Forest Department)',
    history:
      'Established in 1922 by the royal forest department of Sikkim, Saramsa Garden was originally conceived to cultivate Cephaelis ipecacuanha (an exotic medicinal herb used to treat dysentery) for the royal court and British residency officers. Over the decades, it evolved into an expansive royal botanical sanctuary renowned for breeding rare hybrid Himalayan orchids, ornamental conifers, and tropical plants.',
    visitingTips: [
      'Located 14 km from Gangtok near Ranipool.',
      'A peaceful botanical retreat with sprawling manicured lawns and orchid greenhouses.',
    ],
    bestTime: 'March to May & October to December',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Lush manicured lawns and rare Himalayan orchids at Saramsa Garden',
  },
];

export const westSikkimSpots: TouristSpot[] = [
  {
    id: 'yuksom-norbugang',
    name: 'Yuksom & Norbugang Coronation Throne',
    altNames: ['The Birthplace of the Kingdom of Sikkim', 'Norbugang Throne of 1642'],
    district: 'West Sikkim',
    elevation: '1,780 m (5,840 ft)',
    historicalPeriod: '1642 CE (Coronation of 1st Chogyal Phuntsog Namgyal)',
    history:
      'Yuksom (meaning "Meeting Place of the Three Wise Monks" in Lepcha/Bhutia) is the historic birthplace of the sovereign Kingdom of Sikkim. In 1642 CE, fulfilling an ancient prophecy made by Guru Padmasambhava eight centuries earlier, three revered Tibetan lamas from distinct Nyingma traditions—Lhatsun Chempo, Nga-dak Sempa Chempo, and Kartok Kuntu Zangpo—converged at Yuksom from Tibet. There, they discovered Phuntsog Namgyal, a direct descendant of the Minyak royal lineage, and consecrated him as the first Chogyal ("Dharma King") of Sikkim. The coronation took place atop the sacred stone throne at Norbugang, where the original stone seat of the king, the seats of the three lamas, the coronation stupa, and the sacred footprint of Lama Lhatsun Chempo embedded in rock remain preserved under venerable pine trees.',
    visitingTips: [
      'Take time to walk the quiet flagstone path to the stone coronation throne.',
      'Yuksom is also the historic trailhead for the famous Dzongri and Goecha La trek to the base of Kanchenjunga.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The sacred stone coronation throne of Norbugang where Sikkim was founded in 1642',
  },
  {
    id: 'dubdi-monastery',
    name: 'Dubdi Monastery (The Hermit’s Cell)',
    altNames: ['Yuksom Gompa', 'Oldest Monastery in Sikkim'],
    district: 'West Sikkim',
    elevation: '2,100 m (6,900 ft)',
    historicalPeriod: '1701 CE (Established by Lama Lhatsun Chempo)',
    history:
      'Perched on an isolated forested ridge high above Yuksom, Dubdi ("The Hermit’s Cell") is widely recognized as the oldest standing Buddhist monastery in Sikkim. Established in 1701 CE during the reign of the 1st Chogyal Phuntsog Namgyal by Lama Lhatsun Chempo, the monastery was designed as a solitary meditation hermitage for yogis. The two-story stone structure houses painted statues of the founding lamas, ancient manuscripts, and vibrant murals depicting the guardian deities of the four quarters.',
    visitingTips: [
      'Requires a scenic 45-minute uphill trek from Yuksom through tranquil chestnut and oak forests.',
      'Wear sturdy walking shoes; the peaceful silence at the monastery summit is unforgettable.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The ancient stone hermitage of Dubdi Monastery perched high above Yuksom',
  },
  {
    id: 'rabdentse-ruins',
    name: 'Rabdentse Palace Ruins',
    altNames: ['Second Royal Capital of Sikkim (1670–1814)'],
    district: 'West Sikkim',
    elevation: '2,072 m (6,800 ft)',
    historicalPeriod: '1670–1814 CE (Reign of 2nd Chogyal Tensung Namgyal to 1814 Gurkha Wars)',
    history:
      'Hidden within a dense canopy of ancient oak, chestnut, and rhododendron trees near Pelling lies Rabdentse, the second sovereign royal capital of the Kingdom of Sikkim from 1670 until 1814. Established by Tensung Namgyal (the 2nd Chogyal, who had three queens from Tibet, Bhutan, and Lepcha nobility), the palace commanded an impregnable defensive spur with direct line-of-sight to Mount Kanchenjunga. Rabdentse remained the flourishing epicenter of Sikkimese royal life for 144 years until it was besieged and sacked during the fierce Gurkha invasions of 1814. Today, its grand royal stone chortens, the king’s raised judgment throne ("Dap-Lhang"), the queen’s private courtyard, and stone foundations are protected by the Archaeological Survey of India (ASI).',
    visitingTips: [
      'Walk the 1.5 km stone path through the peaceful bird-filled forest from the main road.',
      'The viewpoint from the royal stone throne directly facing Mount Kanchenjunga is an architectural marvel.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The regal stone chortens and palace foundations of Rabdentse against Himalayan horizons',
  },
  {
    id: 'pemayangtse-monastery',
    name: 'Pemayangtse Monastery',
    altNames: ['The Perfect Sublime Lotus Gompa', 'Premier Nyingma Monastery of Sikkim'],
    district: 'West Sikkim',
    elevation: '2,085 m (6,840 ft)',
    historicalPeriod: '1705 CE (Founded by Lama Lhatsun Chempo)',
    history:
      'Pemayangtse ("Perfect Sublime Lotus") is the premier monastery of the Nyingma order in Sikkim, founded in 1705 CE by Lama Lhatsun Chempo during the reign of Chogyal Chagdor Namgyal. Historically, Pemayangtse was designated as a royal monastery where only "Ta-tshang" (pure celibate monks of high character) were admitted, and its head lama held the sole constitutional authority to crown the Chogyal of Sikkim with the royal cap. The monastery houses the legendary "Santopalri"—a staggering seven-tiered, hand-carved wooden masterwork depicting Guru Padmasambhava’s celestial palace, crafted single-handedly over five painstaking years by the late Dungzin Rinpoche.',
    visitingTips: [
      'The masterwork Santopalri wooden sculpture is on the third floor of the monastery.',
      'Maintain quiet and remove shoes before entering the main prayer hall.',
    ],
    bestTime: 'Year-Round (Spectacular Cham festival in February)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The ancient sanctum of Pemayangtse Monastery overlooking snow-capped peaks',
  },
  {
    id: 'khecheopalri-lake',
    name: 'Sacred Khecheopalri Lake',
    altNames: ['Kha-Chot-Palri', 'Wish-Fulfilling Sacred Lake'],
    district: 'West Sikkim',
    elevation: '1,700 m (5,600 ft)',
    historicalPeriod: 'Ancient Mythological Footprint of Goddess Tara',
    history:
      'Hidden within sacred virgin forest in West Sikkim, Khecheopalri is one of the holiest pilgrimage lakes in the Himalayas, revered by Buddhists as the footprint of Goddess Tara (Jetsun Dölma) and by Hindus as the footprint of Lord Shiva. The lake is an integral part of the sacred Buddhist geography (Beyul Demazong). According to centuries-old folklore, holy birds inhabit the surrounding forest canopy and diligently swoop down to pluck away every single leaf that falls onto the lake’s mirror-like water, preserving its immaculate purity. Pilgrims tie prayer flags and whisper wishes at the wooden jetty.',
    visitingTips: [
      'Silence is requested along the bamboo prayer-flag walkway leading to the water.',
      'Do not touch or disturb the sacred fish in the lake.',
    ],
    bestTime: 'October to May (Annual Chho-Tsho festival in March/April)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The mirror-like waters of sacred Khecheopalri Lake surrounded by prayer flags',
  },
  {
    id: 'pelling-skywalk-chenrezig',
    name: 'Pelling Glass Skywalk & Chenrezig Monument',
    altNames: ['Avalokiteshvara Statue Pelling', 'Sikkim Glass Bridge'],
    district: 'West Sikkim',
    elevation: '2,200 m (7,200 ft)',
    historicalPeriod: '2018 CE Consecration',
    history:
      'Standing majestically atop a high ridge facing Mount Kanchenjunga, the Chenrezig statue rises 137 feet in shimmering gold, honoring Chenrezig (Avalokiteshvara), the Bodhisattva of Infinite Compassion. Leading to the monument is India’s first high-altitude glass skywalk, cantilevered out over sheer thousand-foot drops into the misty valleys below. The site blends modern engineering with deep Vajrayana spiritual heritage.',
    visitingTips: [
      'Visitors remove shoes and walk in socks on the glass transparent panels.',
      'Unsurpassed 360-degree views of Kanchenjunga on clear mornings.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The 137-foot golden Chenrezig statue and glass skywalk cantilevered above the valleys of Pelling',
  },
  {
    id: 'tashiding-monastery',
    name: 'Tashiding Monastery & Sacred Chorten Thongwa Rangdol',
    altNames: ['The Devoted Heart of Sikkim Gompa', 'Bhumchu Festival Monastery'],
    district: 'West Sikkim',
    elevation: '1,460 m (4,800 ft)',
    historicalPeriod: '1717 CE (Reign of 3rd Chogyal Chagdor Namgyal)',
    history:
      'Perched atop a heart-shaped conical hill between the Rathong and Rangit rivers, Tashiding ("The Auspicious Glory") is revered as the spiritual navel of Sikkim. Founded in 1717 CE by Ngadak Sempa Chempo, Tashiding holds the sacred "Chorten Thongwa Rangdol" (the Stupa that Liberates by Mere Sight). It is the venue of the legendary annual "Bhumchu" holy water festival: a centuries-old consecrated brass vase containing blessed water is ceremoniously opened on the 15th day of the first Tibetan month; the level and clarity of the water divines whether peace, drought, or prosperity will come to Sikkim during the year.',
    visitingTips: [
      'Accessible via a scenic mountain spur between Pelling and Ravangla.',
      'Walk through the stone mani wall containing hundreds of carved sacred mantras.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The sacred stupa complex and whitewashed halls of Tashiding Monastery',
  },
  {
    id: 'singshore-bridge',
    name: 'Singshore Bridge',
    altNames: ['Second Highest Suspension Bridge in Asia'],
    district: 'West Sikkim',
    elevation: '1,500 m (4,920 ft)',
    historicalPeriod: 'Engineering Milestone of West Sikkim',
    history:
      'With a span of over 240 meters and suspended more than 100 meters above a roaring river gorge, Singshore Bridge is the highest bridge in Sikkim and the second highest suspension bridge in all of Asia. Built to connect the remote mountain hamlets of Dentam and Uttarey, it offers breathtaking views down into deep abyss canyons lined with waterfalls.',
    visitingTips: [
      'Located 25 km from Pelling; pairs wonderfully with an excursion to Uttarey.',
      'Stop at the Alpine cheese factory in Dentam nearby to sample fresh mountain cheese.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The breathtaking span of Singshore Bridge suspended over a massive mountain abyss',
  },
  {
    id: 'kanchenjunga-falls-rimbi',
    name: 'Kanchenjunga Falls & Rimbi Orange Garden',
    altNames: ['Glacial Cascade of West Sikkim'],
    district: 'West Sikkim',
    elevation: '1,600 m (5,250 ft)',
    historicalPeriod: 'Perennial High Glacial Stream',
    history:
      'Tumbling down sheer granite boulders with thundering power, Kanchenjunga Falls is a perennial cascade fed directly by melting glaciers high on Mount Kanchenjunga. Hidden for generations behind dense cardamom groves, it was discovered in the mid-1990s and has become an iconic stop in West Sikkim. Further down lies Rimbi Orange Garden along the banks of the Rimbi River, where heritage citrus orchards thrive.',
    visitingTips: [
      'Located along the road connecting Pelling to Yuksom.',
      'Small cafes near the falls serve warm masala chai and freshly roasted corn.',
    ],
    bestTime: 'Year-Round (Roaring discharge after monsoon)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Thundering white torrents of Kanchenjunga Falls cascading off granite boulders',
  },
  {
    id: 'varsey-rhododendron-sanctuary',
    name: 'Varsey Rhododendron Sanctuary',
    altNames: ['The Red Valley of West Sikkim'],
    district: 'West Sikkim',
    elevation: '2,200 m to 3,100 m (7,200 ft to 10,200 ft)',
    historicalPeriod: '1998 CE Protected Sanctuary Decree',
    history:
      'Spanning 104 square kilometers along the Singalila ridge bordering Nepal, Varsey is a pristine high-altitude rhododendron sanctuary. In April and May, the sanctuary bursts into a sea of fiery scarlet red flowers (Rhododendron arboreum). The tranquil trail from Hilley to Varsey is a gentle 4-kilometer ridge walk offering panoramic vistas of Kanchenjunga without steep mountain ascents.',
    visitingTips: [
      'The 4 km nature walk from Hilley is gentle and well-paved; suitable for nature-lovers of all ages.',
      'Carry binoculars for sighting rare laughingthrushes, blood pheasants, and red pandas.',
    ],
    bestTime: 'April to May (Peak flower blooming season) & October to November (Clear skies)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Vibrant scarlet rhododendron blossoms framing Mount Kanchenjunga in Varsey Sanctuary',
  },
];

export const southSikkimSpots: TouristSpot[] = [
  {
    id: 'samdruptse-hill',
    name: 'Samdruptse Hill (Colossal Guru Padmasambhava)',
    altNames: ['The Wish-Fulfilling Hill', 'World’s Tallest Guru Rinpoche Statue'],
    district: 'South Sikkim',
    elevation: '2,134 m (7,000 ft)',
    historicalPeriod: '1997 CE (Foundation Laid by Dalai Lama) & 2004 CE Consecration',
    history:
      'Samdruptse, which translates in Bhutia to "The Wish-Fulfilling Hill", has been revered for centuries in Sikkimese folklore as a dormant volcano. Ancient prophecies warned that if the mountain ever awoke, it would devastate the valleys below. To permanently pacify the geological forces and bestow peace upon the world, the royal government and spiritual councils constructed the monumental 135-foot statue of Guru Padmasambhava atop the peak. Its foundation stone was laid by His Holiness the 14th Dalai Lama in October 1997. Overlaid with shimmering copper and gold leaf, it is the tallest statue of Guru Padmasambhava in the world.',
    visitingTips: [
      'Located 7 km from Namchi town center.',
      'The inner sanctum contains rare archival photographs of Sikkim’s royal era.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The monumental 135-foot golden statue of Guru Padmasambhava atop Samdruptse Hill',
  },
  {
    id: 'siddhesvara-dhaam-char-dham',
    name: 'Siddhesvara Dhaam (Char Dham Solophok)',
    altNames: ['Namchi Char Dham', 'Solophok Hill Sacred Complex'],
    district: 'South Sikkim',
    elevation: '1,675 m (5,500 ft)',
    historicalPeriod: '2011 CE Consecration',
    history:
      'Perched atop Solophok Hill in South Sikkim, Siddhesvara Dhaam is a grand 29-hectare spiritual pilgrimage complex. At its center stands a towering 108-foot statue of Lord Shiva seated in meditation. Surrounding the main shrine are architectural replicas of the four most sacred Hindu Dhams of India (Badrinath, Jagannath, Dwarka, and Rameshwaram) along with replicas of the twelve sacred Jyotirlingas, allowing pilgrims to visit all sacred shrines in one mountain sanctuary.',
    visitingTips: [
      'Comprehensive cultural complex with wide paved courtyards and mountain views.',
      'Musical fountain and evening illumination make it a memorable sunset visit.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The 108-foot statue of Lord Shiva at Siddhesvara Dhaam (Char Dham) Solophok Hill',
  },
  {
    id: 'ravangla-buddha-park',
    name: 'Ravangla Buddha Park (Tathagata Tsal)',
    altNames: ['Tathagata Tsal', '130-ft Buddha of Ravangla'],
    district: 'South Sikkim',
    elevation: '2,134 m (7,000 ft)',
    historicalPeriod: '2006–2013 CE (Consecrated by 14th Dalai Lama on 25 March 2013)',
    history:
      'Constructed between 2006 and 2013 to commemorate the 2550th birth anniversary of Gautama Buddha, Tathagata Tsal (Buddha Park) is a masterwork of Himalayan sacred art. The centerpiece is a colossal 130-foot high bronze statue of the Buddha, consecrated by the 14th Dalai Lama on 25 March 2013. The statue is flanked by Mount Narsing, Mount Kabru, and the Kanchenjunga range, set in sprawling manicured stone gardens with revolving prayer wheels and a museum detailing the life of the Buddha.',
    visitingTips: [
      'Early morning (6:30–8:30 AM) offers crystal clear peak reflections before clouds roll in.',
      'Walk inside the museum hall situated directly beneath the lotus base of the Buddha statue.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The 130-foot bronze statue of Gautama Buddha at Ravangla against snowy mountain peaks',
  },
  {
    id: 'temi-tea-estate',
    name: 'Temi Organic Tea Estate',
    altNames: ['The Only Tea Garden in Sikkim', '1969 Royal Tea Garden of the Chogyal'],
    district: 'South Sikkim',
    elevation: '1,200 m to 1,800 m (4,000 ft to 6,000 ft)',
    historicalPeriod: '1969 CE (Established by the Last Chogyal Palden Thondup Namgyal)',
    history:
      'Established in 1969 by the last reigning Chogyal of Sikkim, Palden Thondup Namgyal, Temi is the **only tea estate in the entire state of Sikkim**. Created to provide sustainable livelihoods and rehabilitation for Tibetan refugees who fled to Sikkim, the tea estate blankets 440 rolling emerald acres along the gentle slopes of Tendong Hill. Temi is 100% certified organic, producing some of the world’s most prized orthodox black, white, and golden-tipped teas, celebrated internationally for their delicate floral aroma and muscatel bouquet.',
    visitingTips: [
      'Visit the tea factory for a guided tasting of first-flush and white teas.',
      'In November, blooming cherry blossom trees line the road winding through the tea terraces.',
    ],
    bestTime: 'March to November (Plucking season) & November (Cherry Blossom Bloom)',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Rolling emerald green terraces of Temi Organic Tea Estate with snow peaks in the distance',
  },
  {
    id: 'tarey-bhir-ridge',
    name: 'Tarey Bhir 10,000-ft Ridge Walk',
    altNames: ['The Knife-Edge Cliff of South Sikkim'],
    district: 'South Sikkim',
    elevation: '3,048 m (10,000 ft)',
    historicalPeriod: 'Geological Ridge Landmark',
    history:
      'Tarey Bhir is an extraordinary geological ridge walk in South Sikkim near Sadam village. A stone-paved walkway spans nearly 3 kilometers along the knife-edge crest of a mountain ridge, dropping sheer over 3,000 vertical feet down into the roaring confluence of the Teesta and Rangit river valleys below. It offers an exhilarating feeling of walking on top of the world.',
    visitingTips: [
      'Dress in warm windproof clothes; winds along the open crest can be brisk.',
      'Wear sturdy walking shoes for the 2 km paved ridge walk.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The stone pathway along the 10,000-ft knife-edge ridge of Tarey Bhir overlooking river gorges',
  },
  {
    id: 'ralang-monastery',
    name: 'Ralang Monastery & Palchen Choeling Monastic Institute',
    altNames: ['Old Ralang Gompa & New Ralang Complex'],
    district: 'South Sikkim',
    elevation: '1,828 m (6,000 ft)',
    historicalPeriod: '1768 CE (4th Chogyal Gyurmed Namgyal) & 1995 CE New Institute',
    history:
      'Old Ralang Monastery was founded in 1768 CE to commemorate the holy pilgrimage of the 9th Karmapa to Sikkim. When the 9th Karmapa tossed blessed grains of rice from Tibet during the consecration ceremony, grains miraculously landed upon the hilltop of Ralang, marking it as holy ground. In 1995, His Eminence the 12th Goshir Gyaltsab Rinpoche built the palatial New Palchen Choeling Monastic Institute nearby, one of the largest and most magnificent Buddhist universities in the Eastern Himalayas.',
    visitingTips: [
      'Located 13 km from Ravangla.',
      'Famous for the grand Pang Lhabsol Cham dance held annually in autumn.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The grand ornate facade and golden stupas of New Ralang Monastic Institute',
  },
  {
    id: 'tendong-hill',
    name: 'Tendong Hill (The Upraised Horn of Lepcha Legend)',
    altNames: ['The Sacred Refuge Peak'],
    district: 'South Sikkim',
    elevation: '2,600 m (8,530 ft)',
    historicalPeriod: 'Ancient Prehistoric Lepcha Deluge Mythology',
    history:
      'Tendong Hill holds the most sanctified place in indigenous Lepcha mythology. According to ancient lore, during a catastrophic prehistoric deluge when the Teesta and Rangit rivers flooded the entire earth, Tendong miraculously rose out of the rising waters like an elephant’s trunk or an auspicious horn (Tendong in Lepcha means "The Upraised Horn") to rescue and shelter the ancestors of the Lepcha tribe. Every year during the sacred "Tendong Lho Rum Faat" festival, Lepchas from across the Himalayas gather to offer thanks to the mountain spirit.',
    visitingTips: [
      'A scenic 6-kilometer trekking trail from Damthang through dense oak and magnolia forests leads to the summit watchtower.',
      'Panoramic 360-degree views covering all four districts of Sikkim.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Forest-shrouded peak of Tendong Hill where Lepcha ancestors were saved from the great deluge',
  },
  {
    id: 'maenam-hill-sanctuary',
    name: 'Maenam Wildlife Sanctuary & Hill',
    altNames: ['The Treasure House of Medicines'],
    district: 'South Sikkim',
    elevation: '3,230 m (10,600 ft)',
    historicalPeriod: 'Ancient Meditation Hermitage of Guru Padmasambhava',
    history:
      'Towering over Ravangla, Maenam-la in the Lepcha language translates to "The Treasure-House of Medicines". The sanctuary blankets 35 square kilometers of temperate cloud forest, home to medicinal plants, musk deer, leopards, and red pandas. At the summit sits a revered hermitage where Guru Padmasambhava meditated in solitude while exploring the hidden valleys of Sikkim.',
    visitingTips: [
      'A rewarding 4-hour ridge hike from Ravangla; bring drinking water and light snacks.',
      'On clear days, the summit reveals Mount Kanchenjunga as well as the plains of Bengal to the south.',
    ],
    bestTime: 'October to May',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Misty temperate rhododendron forest inside Maenam Wildlife Sanctuary',
  },
  {
    id: 'borong-hot-springs',
    name: 'Borong Hot Springs (Borong Tatopani)',
    altNames: ['Sacred Sulphur Springs of the Rangit'],
    district: 'South Sikkim',
    elevation: '1,460 m (4,800 ft)',
    historicalPeriod: 'Traditional Himalayan Mineral Therapy',
    history:
      'Nestled along the scenic banks of the Rangit River near Borong village in South Sikkim, Borong Tatopani is a natural thermal sulphur spring. For centuries, mountain villagers and monks have traveled here in winter to soak in the therapeutic mineral-rich waters, believed to cure joint ailments and skin conditions naturally.',
    visitingTips: [
      'Located 17 km from Ravangla.',
      'Combine with birdwatching trails in the quiet mountain village of Borong.',
    ],
    bestTime: 'November to March',
    permitRequired: false,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Natural thermal springs along the emerald waters of the Rangit River in Borong',
  },
];

// Combine all spots for global queries and district lookups
export const allSikkimSpots: TouristSpot[] = [
  ...northSikkimSpots,
  ...eastSikkimSpots,
  ...westSikkimSpots,
  ...southSikkimSpots,
];

// -------------------------------------------------------------
// PRIMARY SIKKIM DISTRICT DESTINATIONS (4 MAIN SIKKIM DISTRICTS)
// -------------------------------------------------------------

export const destinationsData: Destination[] = [
  {
    id: 'north-sikkim',
    slug: 'north-sikkim',
    name: 'North Sikkim (Mangan District)',
    tagline: 'High-Altitude Wilderness, Sacred Gurudongmar Lake (17,800 ft) & Rhododendron Valleys',
    district: 'North Sikkim',
    elevation: '1,790 m to 5,430 m (5,870 ft to 17,800 ft)',
    recommendedDuration: '3 to 5 Days',
    bestSeason: 'March to June (Flowers) & October to mid-December (Clear Snow Peaks)',
    yearRoundAccess: false,
    permitRequired: true,
    permitDetails:
      'Protected Area Permits (PAP) mandatory for all visitors. Gurudongmar Lake and high border posts are strictly for Indian nationals under Ministry of Home Affairs rules. Foreign visitors are permitted in Lachung & Yumthang Valley in groups of 2+ booked through registered Sikkim agencies.',
    seasonalAdvisory:
      'Subject to high-altitude snowfall and weather clearances. Winter roads to Gurudongmar can face temporary closures between late December and February. Peak monsoon (July–August) is avoided due to landslides along the Teesta gorge.',
    shortDescription:
      'Raw, untamed frontier of the Eastern Himalayas: sacred Gurudongmar Lake at 17,800 ft, Yumthang Valley of Flowers, Zero Point, traditional Dzumsa village councils, and the Dzongu Lepcha reserve.',
    fullOverview:
      'North Sikkim is the majestic, rugged crown of the state. Ascending from the subtropical valleys of Mangan and the holy confluence of Chungthang, the terrain opens into glacial river valleys and sweeping Tibetan plateaus. It is home to Lachen and Lachung—distinct mountain communities governed by the centuries-old Dzumsa self-governing council—and acts as the sacred gateway to Gurudongmar Lake, one of the highest sacred water bodies on Earth.',
    historyOverview:
      'Historically, North Sikkim served as the vital trans-Himalayan trade corridor between the Kingdom of Sikkim and Shigatse in Tibet. The region is sanctified by the 8th-century journey of Guru Padmasambhava, who blessed its lakes and mountains. Under the Namgyal dynasty, royal monasteries including Phodong (founded 1740) and Labrang (1844) were constructed, while the indigenous Lepcha reserve of Dzongu was codified in 1958 by royal decree of Chogyal Tashi Namgyal to protect the first inhabitants of the land.',
    royalHeritage:
      'Patronized by the 4th Chogyal Gyurmed Namgyal, who founded the Phodong Royal Monastery. In 1958, Chogyal Tashi Namgyal granted royal protected reserve status to Dzongu. Governed locally by the indigenous Dzumsa council system, preserving centuries of autonomy.',
    spots: northSikkimSpots,
    keyHighlights: [
      'Sacred Gurudongmar Lake at 17,800 ft, blessed by Guru Rinpoche and Guru Nanak',
      'Yumthang Valley of Flowers & Shingba Rhododendron Sanctuary with 24 wild species',
      'Zero Point (Yumesamdong) at 15,300 ft at the edge of the Tibetan snow frontier',
      'Authentic Dzumsa democratic village systems in Lachen and Lachung',
      'Phodong & Labrang Monasteries preserving sacred royal Tibetan Buddhist lineages',
      'Singhik Viewpoint offering a staggering 7,000m vertical elevation view of Kanchenjunga & Siniolchu',
    ],
    travelTips: [
      'High-altitude acclimatisation is essential; drink plenty of water and avoid over-exertion at 17,000+ ft.',
      'Carry valid government photo IDs (Passport / Voter ID) with 4 passport photographs for military permits.',
      'Pack heavy thermal clothing, woolen gloves, and windproof jackets even during spring and autumn.',
    ],
    nearestHub: 'Gangtok (120 km / 6–8 hours mountain road travel)',
    suitableFor: ['Adventure Explorers', 'Photographers', 'Pilgrims', 'High-Altitude Travellers'],
  },
  {
    id: 'east-sikkim',
    slug: 'east-sikkim',
    name: 'East Sikkim (Gangtok & Pakyong Districts)',
    tagline: 'The Royal Capital Promenade, Sacred Tsomgo Lake, Nathu La & the Old Silk Route',
    district: 'East Sikkim',
    elevation: '1,500 m to 4,310 m (4,920 ft to 14,140 ft)',
    recommendedDuration: '3 to 4 Days',
    bestSeason: 'Year-Round (Autumn & Spring are crystal-clear; Winter brings snow at Tsomgo)',
    yearRoundAccess: true,
    permitRequired: true,
    permitDetails:
      'Gangtok city is open to all travellers without special permits. Excursions to Tsomgo Lake, Nathu La Pass, and Zuluk Old Silk Route require Protected Area Permits (Nathu La restricted to Indian nationals on designated days).',
    seasonalAdvisory:
      'Gangtok is accessible comfortably all 12 months. High mountain passes (Tsomgo and Nathu La) experience winter snowfall from December to March; Army snow-clearance teams ensure safe daily operations.',
    shortDescription:
      'The administrative and cultural pulse of Sikkim: pedestrian MG Marg, Rumtek Dharma Chakra Centre, sacred Tsomgo Lake (12,313 ft), Nathu La border pass, and the 32 hairpin loops of Zuluk Old Silk Route.',
    fullOverview:
      'Perched on a cloud-brushed ridge facing Mount Kanchenjunga, East Sikkim is the historic epicenter of the state. With vehicular traffic restricted on the immaculate MG Marg promenade, Gangtok invites relaxed cultural discovery. From the venerable Enchey and Rumtek monasteries to the Namgyal Institute of Tibetology, the royal viewpoints, and the dramatic high passes of Tsomgo Lake, Nathu La, and Zuluk, East Sikkim bridges royal antiquity with clean modern Himalayan living.',
    historyOverview:
      'Gangtok was established as the royal capital of the Kingdom of Sikkim in 1894 by the 9th Chogyal Sir Thutob Namgyal, replacing Tumlong. During the late 19th and early 20th centuries, it grew into an important trans-Himalayan trade hub connecting British India with Tibet through the historic passes of Nathu La and Jelep La. Following the 1959 Tibetan uprising, His Holiness the 16th Gyalwa Karmapa established Rumtek Monastery here as the worldwide seat-in-exile of the Karma Kagyu lineage. In 1975, Sikkim formally acceded as the 22nd state of the Indian Union.',
    royalHeritage:
      'Royal capital established in 1894 by Chogyal Thutob Namgyal; home to the Chogyal Royal Palace, the Namgyal Institute of Tibetology (founded 1958 by Chogyal Tashi Namgyal and Prime Minister Nehru), and royal viewpoints constructed under 20th-century royal decree.',
    spots: eastSikkimSpots,
    keyHighlights: [
      'Strolling along vehicle-free, floral MG Marg lined with cafes and mountain bakeries',
      'Sacred glacial waters of Tsomgo Lake (12,313 ft) and Baba Harbhajan Mandir',
      'Historic Nathu La Pass on the Indo-China frontier (14,140 ft)',
      'Rumtek Monastery (Dharma Chakra Centre), seat of the 16th Gyalwa Karmapa with its Golden Stupa',
      'Namgyal Institute of Tibetology housing 60,000+ ancient Mahayana manuscripts and relics',
      'Zuluk and the 32 hairpin loops of the historic Old Silk Route to Tibet',
    ],
    travelTips: [
      'Pakyong Airport (PYG) is 30 km away; Bagdogra Airport (IXB) is approx. 4.5 hours scenic drive.',
      'Sikkim strictly enforces a ban on single-use plastics and smoking in public zones.',
      'Apply for Tsomgo and Nathu La permits 1 day in advance through Sikkim Tour Co.',
    ],
    nearestHub: 'Pakyong Airport (30 km) / Bagdogra Airport (125 km) / NJP Railway Station (120 km)',
    suitableFor: ['Families', 'Couples', 'Solo Travellers', 'History Enthusiasts', 'First-Time Visitors'],
  },
  {
    id: 'west-sikkim',
    slug: 'west-sikkim',
    name: 'West Sikkim (Gyalshing & Soreng Districts)',
    tagline: 'Birthplace of the Kingdom in 1642, Ancient Royal Capital Ruins & Front-Row Kanchenjunga Vistas',
    district: 'West Sikkim',
    elevation: '1,460 m to 2,200 m (4,800 ft to 7,200 ft)',
    recommendedDuration: '3 to 5 Days',
    bestSeason: 'September to May (Autumn and winter provide crystal-clear mountain panoramas)',
    yearRoundAccess: true,
    permitRequired: false,
    seasonalAdvisory:
      'Accessible comfortably year-round. Autumn and winter feature the clearest morning sunrises over Mount Kanchenjunga. Spring (April–May) brings blazing red rhododendron blooms in Varsey.',
    shortDescription:
      'The sacred historical cradle of Sikkim: Yuksom 1642 coronation throne, Dubdi Monastery, 17th-century Rabdentse Royal Palace ruins, premier Pemayangtse Monastery, and sacred Khecheopalri Lake.',
    fullOverview:
      'West Sikkim is the spiritual and historical soul of the Himalayas. Framed by unobstructed, front-row views of Mount Kanchenjunga, this region is where the Kingdom of Sikkim was born in 1642 at Yuksom. Walking through ancient oak and rhododendron forests, travellers encounter the regal stone ruins of the 17th-century royal capital of Rabdentse, the sacred wish-fulfilling waters of Khecheopalri Lake, the premier monastic treasures of Pemayangtse, and India’s first high-altitude glass skywalk.',
    historyOverview:
      'In 1642, three venerable Tibetan lamas gathered at Yuksom to consecrate Phuntsog Namgyal as the first Chogyal, founding the Namgyal dynasty that ruled Sikkim for over three centuries until 1975. In 1670, the 2nd Chogyal Tensung Namgyal moved the royal capital to Rabdentse, building stone palaces, council thrones, and royal chortens. Pemayangtse Monastery was founded in 1705 as the royal temple whose head lama crowned the kings. After withstanding repeated conflicts, Rabdentse was sacked in 1814 during the Gurkha invasions, leaving behind haunting stone ruins surrounded by sacred forests.',
    royalHeritage:
      'Birthplace of the Namgyal Royal Dynasty in 1642 at the Norbugang Throne in Yuksom. Rabdentse served as the sovereign Royal Capital from 1670 to 1814. Pemayangtse Monastery held the exclusive royal constitutional prerogative to crown the Chogyals of Sikkim.',
    spots: westSikkimSpots,
    keyHighlights: [
      'Norbugang Coronation Stone Throne in Yuksom where the Kingdom was established in 1642',
      'Rabdentse Palace Ruins: ancient stone courtyards and royal throne overlooking Kanchenjunga',
      'Pemayangtse Monastery housing the 7-tiered hand-carved wooden Santopalri masterpiece',
      'Sacred Khecheopalri Wish-Fulfilling Lake where holy birds pluck away fallen leaves',
      'Pelling Glass Skywalk and the 137-foot golden Chenrezig Avalokiteshvara monument',
      'Singshore Bridge: the highest suspension bridge in Sikkim at over 100 meters above the gorge',
    ],
    travelTips: [
      'Wake up at 5:30 AM in Pelling for the unmissable sunrise lighting up Mount Kanchenjunga in gold.',
      'Wear sturdy walking shoes for heritage walks through Rabdentse Ruins and Dubdi Monastery.',
      'Allow at least 2 nights in Pelling and 1-2 nights in Yuksom for an unhurried royal heritage immersion.',
    ],
    nearestHub: 'Bagdogra Airport (135 km / approx. 5 hours) / Gangtok (115 km / 4.5 hours)',
    suitableFor: ['Heritage Seekers', 'Couples', 'Honeymooners', 'Families', 'Spiritual Travellers'],
  },
  {
    id: 'south-sikkim',
    slug: 'south-sikkim',
    name: 'South Sikkim (Namchi District)',
    tagline: 'Monumental 135-ft Guru Padmasambhava, Ravangla Buddha Park & Sikkim’s Only 100% Organic Tea Garden',
    district: 'South Sikkim',
    elevation: '1,200 m to 2,600 m (4,000 ft to 8,530 ft)',
    recommendedDuration: '2 to 3 Days',
    bestSeason: 'Year-Round (Gentle, comfortable climate with pleasant winters and cherry blossoms)',
    yearRoundAccess: true,
    permitRequired: false,
    seasonalAdvisory:
      'Gentle, mild Himalayan weather throughout the year. November showcases blooming pink cherry blossoms along the Temi Tea Estate terraces.',
    shortDescription:
      'Spiritual epicenters and royal estates: the world’s tallest Guru Padmasambhava statue (135 ft) on Samdruptse Hill, Char Dham Solophok, Ravangla Buddha Park, Temi Organic Tea Estate, and Tarey Bhir.',
    fullOverview:
      'Set against rolling mountain terraces, pine forests, and emerald tea bushes, South Sikkim is a tranquil sanctuary of pilgrimage and heritage. It is home to Samdruptse Hill, crowned by the colossal 135-foot statue of Guru Padmasambhava; the pristine Ravangla Buddha Park (Tathagata Tsal) with its 130-foot bronze Buddha statue consecrated by the Dalai Lama; the dramatic 10,000-foot ridge walk of Tarey Bhir; and the famous Temi Tea Estate, the only tea garden in the entire state of Sikkim, established in 1969 by the last Chogyal.',
    historyOverview:
      'South Sikkim is steeped in ancient Lepcha creation legends and royal patronage. Tendong Hill is revered in Lepcha folklore as the holy mountain that rose like a horn to save mankind during the great cosmic deluge. In 1768, the 4th Chogyal founded Ralang Monastery. In modern times, the 12th Chogyal, Palden Thondup Namgyal, established the Temi Tea Estate in 1969 to rehabilitate Tibetan refugees. Samdruptse Hill was sanctified in 1997 by the Dalai Lama, who laid the foundation stone for the giant Guru Padmasambhava statue to bring everlasting peace to the Himalayas.',
    royalHeritage:
      'Established by royal decree of the last Chogyal, Palden Thondup Namgyal, who created the state’s sole tea estate at Temi in 1969. Royal Kagyu monastery of Ralang founded under the 4th Chogyal.',
    spots: southSikkimSpots,
    keyHighlights: [
      'Samdruptse Hill with the monumental 135-foot golden statue of Guru Padmasambhava',
      'Ravangla Buddha Park (Tathagata Tsal) featuring the 130-foot bronze statue consecrated by the Dalai Lama',
      'Temi Tea Estate: 440 acres of rolling certified organic tea terraces established in 1969 by the Chogyal',
      'Siddhesvara Dhaam (Char Dham) cultural complex with its 108-foot Shiva statue on Solophok Hill',
      'Tarey Bhir 10,000-ft knife-edge stone ridge walk with 3,000-ft drops into the Teesta gorge',
      'Ancient Lepcha sacred deluge refuge peak of Tendong Hill and Ralang Monastery',
    ],
    travelTips: [
      'Stop at Temi Tea Garden for a fresh cup of organic first-flush tea and direct estate tea purchases.',
      'Pairs seamlessly on the scenic drive between Gangtok and Pelling.',
      'Dress comfortably for walks around the spacious Buddha Park and Char Dham Solophok.',
    ],
    nearestHub: 'Bagdogra Airport (100 km / approx. 3.5 hours) / Gangtok (78 km / 2.5 hours)',
    suitableFor: ['Families', 'Couples', 'Pilgrims', 'Culture Seekers', 'Relaxed Travellers'],
  },
];

// Backwards-compatible aliases so existing navigation links (/destinations/gangtok, /destinations/pelling, etc.) continue to work perfectly!
export const destinationAliases: Record<string, string> = {
  gangtok: 'east-sikkim',
  'tsomgo-lake': 'east-sikkim',
  pelling: 'west-sikkim',
  yuksom: 'west-sikkim',
  namchi: 'south-sikkim',
  ravangla: 'south-sikkim',
  'yumthang-valley': 'north-sikkim',
  'eastern-himalayan-experiences': 'north-sikkim',
  'eastern-himalayas': 'north-sikkim',
};
