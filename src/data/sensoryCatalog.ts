import type { ObjectItem, SenseId, SenseMeta, WordBankEntry } from '../types/game';

export const SENSES: Record<SenseId, SenseMeta> = {
  penglihatan: {
    id: 'penglihatan',
    name: 'Penglihatan',
    phraseHint: 'Seolah melihat',
    mechanicLabel: 'Pandang & Cahaya',
    shortDesc: 'Menggambarkan warna, bentuk, dan rupa benda yang tampak.',
    accentHex: '#0EA5E9',
    keyHint: '1',
  },
  pendengaran: {
    id: 'pendengaran',
    name: 'Pendengaran',
    phraseHint: 'Seolah mendengar',
    mechanicLabel: 'Ketuk & Dengarkan',
    shortDesc: 'Menggambarkan bunyi, nada, atau gema yang terdengar.',
    accentHex: '#F59E0B',
    keyHint: '2',
  },
  penciuman: {
    id: 'penciuman',
    name: 'Penciuman',
    phraseHint: 'Seolah mencium',
    mechanicLabel: 'Kibas & Hirup',
    shortDesc: 'Menggambarkan wangi atau aroma yang tercium.',
    accentHex: '#10B981',
    keyHint: '3',
  },
  pengecapan: {
    id: 'pengecapan',
    name: 'Pengecapan',
    phraseHint: 'Seolah mengecap',
    mechanicLabel: 'Sajikan & Cicipi',
    shortDesc: 'Menggambarkan cita rasa makanan atau minuman saat dicicipi.',
    accentHex: '#F43F5E',
    keyHint: '4',
  },
  perabaan: {
    id: 'perabaan',
    name: 'Perabaan',
    phraseHint: 'Seolah merasakan',
    mechanicLabel: 'Sentuh & Usap',
    shortDesc: 'Menggambarkan tekstur permukaan dan kesan sentuhan pada kulit.',
    accentHex: '#FB923C',
    keyHint: '5',
  },
};

export const SENSE_ORDER: SenseId[] = [
  'penglihatan',
  'pendengaran',
  'penciuman',
  'pengecapan',
  'perabaan',
];

export const OBJECTS: ObjectItem[] = [
  // PENGLIHATAN
  {
    id: 'pelangi',
    name: 'Pelangi Senja',
    category: 'Pemandangan Alam',
    sense: 'penglihatan',
    mechanicType: 'focus_lens',
    instruction:
      'Sapukan kabut tipis atau atur kejelasan pandang untuk menikmati lengkungan langit.',
    sensoryDiscovery:
      'Seolah-olah kita melihat langsung bentangan tujuh warna yang bersinar terang di ufuk.',
    sentenceParts: [
      'Usai hujan reda, lengkungan pita ',
      ' tampak ',
      ' membentang di kaki langit.',
    ],
    targetWords: ['warna-warni', 'cerah'],
    distractorWords: ['bergema', 'harum', 'dingin', 'asam'],
    hintClue: 'Kalimat ini menonjolkan keindahan rupa dan warna yang ditangkap oleh mata.',
    visual: {
      primaryColor: '#38BDF8',
      secondaryColor: '#F59E0B',
      accentColor: '#EC4899',
      visualDetailTags: ['Tujuh Pita Warna', 'Cahaya Senja', 'Lengkungan Indah'],
    },
  },
  {
    id: 'mercusuar',
    name: 'Lampu Mercusuar',
    category: 'Pemandangan Pantai',
    sense: 'penglihatan',
    mechanicType: 'focus_lens',
    instruction:
      'Nyalakan cahaya menara dan arahkan pandangan ke puncak mercusuar di tepi laut.',
    sensoryDiscovery:
      'Seolah-olah kita melihat sorot sinar putih yang amat terang menembus gelapnya malam.',
    sentenceParts: [
      'Dari puncak menara, sorot cahayanya tampak ',
      ' dan ',
      ' memandu kapal di laut gelap.',
    ],
    targetWords: ['menyilaukan', 'berkilau'],
    distractorWords: ['nyaring', 'kasar', 'wangi', 'manis'],
    hintClue: 'Perhatikan kesan cahaya yang begitu terang saat dilihat dari kejauhan.',
    visual: {
      primaryColor: '#FDE047',
      secondaryColor: '#0284C7',
      accentColor: '#F8FAFC',
      visualDetailTags: ['Sorot Terang', 'Pantulan Kaca', 'Cahaya Putih'],
    },
  },
  {
    id: 'bunga-matahari',
    name: 'Bunga Matahari',
    category: 'Flora Taman',
    sense: 'penglihatan',
    mechanicType: 'focus_lens',
    instruction:
      'Arahkan pandangan ke hamparan kelopak kuning untuk melihat coraknya dengan jelas.',
    sensoryDiscovery:
      'Seolah-olah kita melihat mahkota kuning cerah yang paling menonjol di tengah kebun.',
    sentenceParts: [
      'Di tengah taman hijau, kelopak kuningnya terlihat ',
      ' dan sangat ',
      ' dari kejauhan.',
    ],
    targetWords: ['cerah', 'mencolok'],
    distractorWords: ['bertalu', 'semerbak', 'licin', 'gurih'],
    hintClue: 'Deskripsi ini berfokus pada tampilan warna kuning yang langsung menarik perhatian.',
    visual: {
      primaryColor: '#FACC15',
      secondaryColor: '#78350F',
      accentColor: '#4ADE80',
      visualDetailTags: ['Kelopak Kuning', 'Warna Kontras', 'Tampak Jelas'],
    },
  },

  // PENDENGARAN
  {
    id: 'gendang',
    name: 'Gendang Tradisional',
    category: 'Alat Musik Daerah',
    sense: 'pendengaran',
    mechanicType: 'sound_wave',
    instruction:
      'Tabuh bagian tengah dan tepi gendang untuk mendengarkan irama suaranya.',
    sensoryDiscovery:
      'Seolah-olah kita mendengar dentuman ritmis yang memantul memenuhi panggung.',
    sentenceParts: [
      'Saat panggung dibuka, tabuhan gendang terdengar ',
      ' berirama dan ',
      ' di seluruh pendopo.',
    ],
    targetWords: ['bertalu', 'bergema'],
    distractorWords: ['berkilau', 'tajam', 'asin', 'harum'],
    hintClue: 'Kalimat menggambarkan bunyi tabuhan berulang yang memantul di telinga.',
    visual: {
      primaryColor: '#B45309',
      secondaryColor: '#FDE68A',
      accentColor: '#F59E0B',
      soundPreset: 'drum',
    },
  },
  {
    id: 'gitar',
    name: 'Gitar Akustik',
    category: 'Alat Musik Petik',
    sense: 'pendengaran',
    mechanicType: 'sound_wave',
    instruction:
      'Petik senar gitar satu per satu atau sapukan jemari untuk mendengarkan alunan nadanya.',
    sensoryDiscovery:
      'Seolah-olah kita mendengar petikan dawai yang selaras, jernih, dan menenangkan.',
    sentenceParts: [
      'Ketika jemari memetik senarnya, alunan nada terdengar ',
      ' dan ',
      ' jernih di ruang tamu.',
    ],
    targetWords: ['merdu', 'berdenting'],
    distractorWords: ['menyilaukan', 'kasar', 'pahit', 'menyengat'],
    hintClue: 'Perhatikan kata yang melukiskan keindahan suara petikan dawai.',
    visual: {
      primaryColor: '#92400E',
      secondaryColor: '#FCD34D',
      accentColor: '#FBBF24',
      soundPreset: 'guitar',
    },
  },
  {
    id: 'weker',
    name: 'Jam Weker Klasik',
    category: 'Benda Sehari-hari',
    sense: 'pendengaran',
    mechanicType: 'sound_wave',
    instruction:
      'Bunyikan lonceng jam weker atau dengarkan suara jarum detiknya yang teratur.',
    sensoryDiscovery:
      'Seolah-olah kita mendengar suara dering keras disusul bunyi jarum yang ajek.',
    sentenceParts: [
      'Tepat pukul lima pagi, lonceng weker berdering ',
      ' setelah semalaman ',
      ' pelan di meja.',
    ],
    targetWords: ['nyaring', 'berdetak'],
    distractorWords: ['warna-warni', 'lembut', 'asam', 'wangi'],
    hintClue: 'Melukiskan suara dering yang lantang dan ketukan detik yang teratur.',
    visual: {
      primaryColor: '#DC2626',
      secondaryColor: '#E2E8F0',
      accentColor: '#F59E0B',
      soundPreset: 'alarm',
    },
  },

  // PENCIUMAN
  {
    id: 'melati',
    name: 'Bunga Melati',
    category: 'Taman Pekarangan',
    sense: 'penciuman',
    mechanicType: 'scent_fan',
    instruction:
      'Kibaskan angin lembut di atas kelopak melati untuk menghirup wanginya.',
    sensoryDiscovery:
      'Seolah-olah kita mencium wangi bunga putih yang menyebar lembut di udara pagi.',
    sentenceParts: [
      'Di teras pagi hari, kuntum putih itu menebarkan bau ',
      ' yang ',
      ' hingga ke dalam rumah.',
    ],
    targetWords: ['harum', 'semerbak'],
    distractorWords: ['bergema', 'asin', 'kasar', 'cerah'],
    hintClue: 'Kalimat menggambarkan wewangian bunga yang menyebar luas.',
    visual: {
      primaryColor: '#F8FAFC',
      secondaryColor: '#10B981',
      accentColor: '#A7F3D0',
      aromaNotes: ['Wangi Kelopak', 'Sejuk Pagi', 'Lembut Menenangkan'],
    },
  },
  {
    id: 'kopi',
    name: 'Kopi Tubruk Hangat',
    category: 'Sajian Kedai',
    sense: 'penciuman',
    mechanicType: 'scent_fan',
    instruction:
      'Kibaskan uap hangat dari cangkir kopi untuk menangkap aroma seduhannya.',
    sensoryDiscovery:
      'Seolah-olah kita mencium aroma biji kopi panggang yang kuat dan khas.',
    sentenceParts: [
      'Begitu air panas dituang, uap kopi menguarkan aroma ',
      ' namun ',
      ' tajam di hidung.',
    ],
    targetWords: ['sedap', 'menyengat'],
    distractorWords: ['berkilau', 'bertalu', 'licin', 'legit'],
    hintClue: 'Menggambarkan bau seduhan kopi yang kuat dan langsung tercium.',
    visual: {
      primaryColor: '#451A03',
      secondaryColor: '#D6D3D1',
      accentColor: '#34D399',
      aromaNotes: ['Aroma Sangrai', 'Uap Pekat', 'Khas Kedai'],
    },
  },
  {
    id: 'roti',
    name: 'Roti Panggang Mentega',
    category: 'Sajian Sarapan',
    sense: 'penciuman',
    mechanicType: 'scent_fan',
    instruction:
      'Kibaskan embusan hangat dari roti panggang untuk merasakan keharumannya.',
    sensoryDiscovery:
      'Seolah-olah kita mencium bau panggangan mentega hangat yang membangkitkan selera.',
    sentenceParts: [
      'Dari dapur pagi itu, roti yang baru matang berbau ',
      ' dan amat ',
      ' selera sarapan.',
    ],
    targetWords: ['wangi', 'menggugah'],
    distractorWords: ['nyaring', 'tajam', 'pahit', 'mencolok'],
    hintClue: 'Melukiskan aroma makanan hangat yang mengundang keinginan untuk makan.',
    visual: {
      primaryColor: '#D97706',
      secondaryColor: '#FEF3C7',
      accentColor: '#34D399',
      aromaNotes: ['Mentega Hangat', 'Gandum Panggang', 'Harum Dapur'],
    },
  },

  // PENGECAPAN
  {
    id: 'jeruk-nipis',
    name: 'Jeruk Nipis Segar',
    category: 'Buah & Minuman',
    sense: 'pengecapan',
    mechanicType: 'taste_dropper',
    instruction:
      'Peras belahan jeruk nipis ke dalam gelas saji lalu cicipi kesegarannya.',
    sensoryDiscovery:
      'Seolah-olah kita mengecap sensasi kecut alami yang langsung menyegarkan mulut.',
    sentenceParts: [
      'Saat diminum siang hari, perasan buah hijau ini terasa ',
      ' namun sangat ',
      ' di tenggorokan.',
    ],
    targetWords: ['asam', 'segar'],
    distractorWords: ['bergema', 'kasar', 'menyilaukan', 'wangi'],
    hintClue: 'Kalimat menggambarkan cita rasa buah jeruk saat dicicipi.',
    visual: {
      primaryColor: '#65A30D',
      secondaryColor: '#D9F99D',
      accentColor: '#F43F5E',
      tasteActionLabel: 'Peras ke Gelas',
      tasteMood: 'asam',
    },
  },
  {
    id: 'gula-merah',
    name: 'Gula Merah Aren',
    category: 'Pangan Tradisional',
    sense: 'pengecapan',
    mechanicType: 'taste_dropper',
    instruction:
      'Sendokkan lelehan gula aren ke atas sajian hangat untuk mencicipi rasanya.',
    sensoryDiscovery:
      'Seolah-olah kita mengecap cita rasa manis pekat khas nira aren Nusantara.',
    sentenceParts: [
      'Campuran kuah santan dan keping aren ini terasa ',
      ' serta begitu ',
      ' saat dicicipi.',
    ],
    targetWords: ['manis', 'legit'],
    distractorWords: ['berdetak', 'dingin', 'harum', 'berkilau'],
    hintClue: 'Melukiskan rasa gula aren yang pekat di lidah saat dinikmati.',
    visual: {
      primaryColor: '#78350F',
      secondaryColor: '#F59E0B',
      accentColor: '#FB7185',
      tasteActionLabel: 'Tuang Lelehan Aren',
      tasteMood: 'manis',
    },
  },
  {
    id: 'garam-laut',
    name: 'Garam Laut Kristal',
    category: 'Bumbu Masakan',
    sense: 'pengecapan',
    mechanicType: 'taste_dropper',
    instruction:
      'Taburkan sejumput kristal garam ke mangkuk kuah hangat untuk mencicipi rasanya.',
    sensoryDiscovery:
      'Seolah-olah kita mengecap perpaduan rasa asin alami yang memperkaya hidangan.',
    sentenceParts: [
      'Setelah ditaburi sejumput kristal laut, kuah hangat terasa ',
      ' dan makin ',
      ' di lidah.',
    ],
    targetWords: ['asin', 'gurih'],
    distractorWords: ['merdu', 'lembut', 'warna-warni', 'semerbak'],
    hintClue: 'Menggambarkan perubahan cita rasa masakan setelah diberi bumbu garam.',
    visual: {
      primaryColor: '#F8FAFC',
      secondaryColor: '#BAE6FD',
      accentColor: '#FB7185',
      tasteActionLabel: 'Taburkan ke Kuah',
      tasteMood: 'asin',
    },
  },

  // PERABAAN
  {
    id: 'es-batu',
    name: 'Es Batu Kristal',
    category: 'Benda Sekitar',
    sense: 'perabaan',
    mechanicType: 'texture_rub',
    instruction:
      'Sentuh dan usap permukaan balok es untuk merasakan kesan dingin serta kelicinannya.',
    sensoryDiscovery:
      'Seolah-olah kita merasakan dingin yang menggigit dan permukaan licin di telapak tangan.',
    sentenceParts: [
      'Ketika digenggam, permukaan balok es terasa sangat ',
      ' sekaligus ',
      ' di telapak tangan.',
    ],
    targetWords: ['dingin', 'licin'],
    distractorWords: ['nyaring', 'harum', 'asam', 'cerah'],
    hintClue: 'Melukiskan sensasi suhu dan permukaan halus berair yang dirasakan kulit.',
    visual: {
      primaryColor: '#7DD3FC',
      secondaryColor: '#E0F2FE',
      accentColor: '#38BDF8',
      touchFeeling: 'Dingin sejuk menyengat kulit',
      touchSurface: 'Basah, rata, dan mudah tergelincir',
      roughnessAudio: 10,
    },
  },
  {
    id: 'durian',
    name: 'Kulit Durian',
    category: 'Buah Nusantara',
    sense: 'perabaan',
    mechanicType: 'texture_rub',
    instruction:
      'Usap perlahan bagian kulit buah durian untuk merasakan permukaan durinya.',
    sensoryDiscovery:
      'Seolah-olah kita meraba tonjolan duri keras yang runcing di ujung jari.',
    sentenceParts: [
      'Kita harus berhati-hati memegangnya karena kulit durian terasa ',
      ' dan sangat ',
      ' di jari.',
    ],
    targetWords: ['tajam', 'kasar'],
    distractorWords: ['merdu', 'manis', 'berkilau', 'semerbak'],
    hintClue: 'Menggambarkan kesan sentuhan kulit buah yang berduri runcing dan tidak rata.',
    visual: {
      primaryColor: '#65A30D',
      secondaryColor: '#A16207',
      accentColor: '#FB923C',
      touchFeeling: 'Menusuk ujung jari bila ditekan',
      touchSurface: 'Berbenjol keras dan berduri runcing',
      roughnessAudio: 95,
    },
  },
  {
    id: 'kapas',
    name: 'Kapas Murni',
    category: 'Benda Sekitar',
    sense: 'perabaan',
    mechanicType: 'texture_rub',
    instruction:
      'Sentuh dan usap gumpalan kapas dengan lembut untuk merasakan permukaannya.',
    sensoryDiscovery:
      'Seolah-olah kita meraba serat empuk yang ringan dan nyaman menyentuh kulit.',
    sentenceParts: [
      'Saat disentuhkan ke pipi, gumpalan serat kapas terasa ',
      ' dan begitu ',
      ' menyapu kulit.',
    ],
    targetWords: ['lembut', 'halus'],
    distractorWords: ['bergema', 'asin', 'menyengat', 'menyilaukan'],
    hintClue: 'Menggambarkan kesan sentuhan yang empuk dan rata tanpa kekasaran.',
    visual: {
      primaryColor: '#F8FAFC',
      secondaryColor: '#E2E8F0',
      accentColor: '#FDBA74',
      touchFeeling: 'Empuk, ringan, dan nyaman di kulit',
      touchSurface: 'Rata tanpa sudut yang kasar',
      roughnessAudio: 5,
    },
  },
];

export const WORD_BANK_ENTRIES: WordBankEntry[] = [
  // Penglihatan
  {
    word: 'warna-warni',
    sense: 'penglihatan',
    meaning: 'Memiliki bermacam-macam warna yang tampak jelas oleh mata.',
    exampleSentence: 'Lengkungan pelangi tampak warna-warni di langit senja.',
  },
  {
    word: 'cerah',
    sense: 'penglihatan',
    meaning: 'Tampak terang, berseri, dan jernih dipandang mata.',
    exampleSentence: 'Kelopak bunga matahari berwarna kuning cerah.',
  },
  {
    word: 'menyilaukan',
    sense: 'penglihatan',
    meaning: 'Sangat terang hingga membuat mata terasa silau saat memandang.',
    exampleSentence: 'Sorot lampu mercusuar menyilaukan pandangan dari jarak dekat.',
  },
  {
    word: 'berkilau',
    sense: 'penglihatan',
    meaning: 'Memantulkan cahaya secara gemerlap dan tampak cemerlang.',
    exampleSentence: 'Kaca menara berkilau memantulkan sinar di malam hari.',
  },
  {
    word: 'mencolok',
    sense: 'penglihatan',
    meaning: 'Sangat menonjol dan langsung menarik perhatian pandangan mata.',
    exampleSentence: 'Warna kuning bunga itu tampak mencolok di antara dedaunan hijau.',
  },

  // Pendengaran
  {
    word: 'bergema',
    sense: 'pendengaran',
    meaning: 'Suara terdengar memantul dan berkumandang di suatu ruang.',
    exampleSentence: 'Tabuhan gendang bergema memenuhi halaman pendopo.',
  },
  {
    word: 'bertalu',
    sense: 'pendengaran',
    meaning: 'Bunyi ketukan atau tabuhan yang berulang-ulang secara beruntun.',
    exampleSentence: 'Irama gendang terdengar bertalu menyambut tamu kehormatan.',
  },
  {
    word: 'merdu',
    sense: 'pendengaran',
    meaning: 'Suara atau alunan nada terdengar elok, selaras, dan sedap didengar.',
    exampleSentence: 'Petikan gitar akustik mengalun merdu mengiringi lagu.',
  },
  {
    word: 'berdenting',
    sense: 'pendengaran',
    meaning: 'Menimbulkan bunyi nyaring yang bening seperti dawai atau logam dipetik.',
    exampleSentence: 'Senar gitar berdenting jernih saat dipetik perlahan.',
  },
  {
    word: 'nyaring',
    sense: 'pendengaran',
    meaning: 'Bunyi terdengar keras, tinggi, dan jelas sampai ke telinga.',
    exampleSentence: 'Lonceng jam weker berdering nyaring membangunkan seisi kamar.',
  },
  {
    word: 'berdetak',
    sense: 'pendengaran',
    meaning: 'Menimbulkan bunyi klik pendek yang berulang teratur setiap detik.',
    exampleSentence: 'Jarum jam weker berdetak pelan di keheningan malam.',
  },

  // Penciuman
  {
    word: 'harum',
    sense: 'penciuman',
    meaning: 'Berbau wangi dan sedap saat terhirup oleh indra penciuman.',
    exampleSentence: 'Kuntum melati mengeluarkan bau harum di pagi hari.',
  },
  {
    word: 'semerbak',
    sense: 'penciuman',
    meaning: 'Aroma wangi yang menyebar merata memenuhi ruangan atau taman.',
    exampleSentence: 'Wangi bunga melati semerbak hingga ke teras depan.',
  },
  {
    word: 'sedap',
    sense: 'penciuman',
    meaning: 'Berbau lezat dan khas sehingga menyenangkan untuk dihirup.',
    exampleSentence: 'Seduhan kopi tubruk menebarkan aroma yang sedap.',
  },
  {
    word: 'menyengat',
    sense: 'penciuman',
    meaning: 'Aroma terasa amat kuat dan tajam saat masuk ke rongga hidung.',
    exampleSentence: 'Aroma kopi sangrai terasa menyengat dari balik cangkir.',
  },
  {
    word: 'wangi',
    sense: 'penciuman',
    meaning: 'Memiliki bau sedap yang lembut dan nyaman tercium.',
    exampleSentence: 'Roti mentega yang baru matang berbau wangi.',
  },
  {
    word: 'menggugah',
    sense: 'penciuman',
    meaning: 'Aroma hangat yang membangkitkan keinginan untuk mencicipi.',
    exampleSentence: 'Bau roti panggang sangat menggugah selera sarapan.',
  },

  // Pengecapan
  {
    word: 'asam',
    sense: 'pengecapan',
    meaning: 'Rasa masam atau kecut seperti jeruk nipis dan cuka.',
    exampleSentence: 'Air perasan jeruk nipis terasa asam di lidah.',
  },
  {
    word: 'segar',
    sense: 'pengecapan',
    meaning: 'Memberi rasa nyaman, ringan, dan melegakan dahaga.',
    exampleSentence: 'Minuman jeruk dingin terasa sangat segar di siang terik.',
  },
  {
    word: 'manis',
    sense: 'pengecapan',
    meaning: 'Rasa lezat seperti gula, madu, atau nira tebu dan aren.',
    exampleSentence: 'Gula aren menghadirkan rasa manis alami pada jajanan pasar.',
  },
  {
    word: 'legit',
    sense: 'pengecapan',
    meaning: 'Manis pekat, kental, dan terasa nikmat di lidah.',
    exampleSentence: 'Kuah gula merah terasa kental dan legit.',
  },
  {
    word: 'asin',
    sense: 'pengecapan',
    meaning: 'Cita rasa khas garam laut atau air laut.',
    exampleSentence: 'Sejumput garam memberi rasa asin yang pas pada masakan.',
  },
  {
    word: 'gurih',
    sense: 'pengecapan',
    meaning: 'Rasa sedap dan nikmat yang membuat hidangan terasa lebih kaya.',
    exampleSentence: 'Sup hangat terasa makin gurih setelah dibumbui.',
  },

  // Perabaan
  {
    word: 'dingin',
    sense: 'perabaan',
    meaning: 'Terasa sejuk sekali hingga membeku saat menyentuh kulit.',
    exampleSentence: 'Balok es batu terasa dingin saat digenggam.',
  },
  {
    word: 'licin',
    sense: 'perabaan',
    meaning: 'Permukaan terasa sangat rata dan basah sehingga mudah tergelincir.',
    exampleSentence: 'Permukaan es yang mulai basah terasa licin di tangan.',
  },
  {
    word: 'tajam',
    sense: 'perabaan',
    meaning: 'Memiliki ujung runcing yang terasa menusuk bila disentuh.',
    exampleSentence: 'Duri kulit durian terasa tajam di ujung jari.',
  },
  {
    word: 'kasar',
    sense: 'perabaan',
    meaning: 'Permukaan tidak rata, berbenjol, atau terasa kesat saat diraba.',
    exampleSentence: 'Kulit buah durian memiliki permukaan yang kasar.',
  },
  {
    word: 'lembut',
    sense: 'perabaan',
    meaning: 'Terasa empuk, lentur, dan tidak keras ketika ditekan kulit.',
    exampleSentence: 'Gumpalan kapas terasa lembut saat disentuhkan ke pipi.',
  },
  {
    word: 'halus',
    sense: 'perabaan',
    meaning: 'Permukaan rata, licin tipis, dan tidak menimbulkan rasa kasar.',
    exampleSentence: 'Serat kapas murni terasa halus di telapak tangan.',
  },
];
