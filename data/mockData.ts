import type { Student, WorksheetItem, CulturalStory, FLNSkillMetric, MemoryBudgetMetric } from '../types.ts';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Amit Soren',
    avatarLetter: 'A',
    language: 'Santhali',
    grade: 'Grade 2',
    flnLevel: 'intermediate',
    avgScore: 72,
    assessmentsCompleted: 3,
    motherTongueProficiency: 82,
    hindiBridgeProficiency: 65,
    lastAssessed: 'Yesterday',
    notes: 'Excels at oral storytelling in Santhali; developing confidence reading Ol Chiki vowels and Devanagari consonants.',
    assignedWorksheets: [
      {
        id: 'sw_1_1',
        title: 'Ol Chiki Vowel Tracing (ᱚ ᱟ ᱤ ᱩ)',
        titleHindi: 'ओल चिकी स्वर आरेखन',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '12 Sep 2026',
        completedDate: '14 Sep 2026',
        score: 95
      },
      {
        id: 'sw_1_2',
        title: 'Santhali Pebble & Bead Counting 1-10',
        titleHindi: 'संथाली १-१० कंकड़ गणना',
        skillLevel: 'Foundational',
        subject: 'Numeracy',
        status: 'completed',
        assignedDate: '12 Sep 2026',
        completedDate: '15 Sep 2026',
        score: 90
      },
      {
        id: 'sw_1_3',
        title: 'Baha Spring Flower Vocabulary Matching',
        titleHindi: 'बाहा वसंत पुष्प शब्द मिलान',
        skillLevel: 'Emerging',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '14 Sep 2026',
        completedDate: '17 Sep 2026',
        score: 82
      },
      {
        id: 'sw_1_4',
        title: 'Ol Chiki Number Bingo (1-20)',
        titleHindi: 'ओल चिकी संख्या बिंगो १-२०',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '16 Sep 2026'
      },
      {
        id: 'sw_1_5',
        title: 'Pilchu Haram Creation Cloze Activity',
        titleHindi: 'पिलचु हाड़ाम कथा रिक्त स्थान',
        skillLevel: 'Proficient',
        subject: 'Literacy',
        status: 'in_progress',
        assignedDate: '17 Sep 2026'
      },
      {
        id: 'sw_1_6',
        title: 'Paddy Granary Measurement & Subtraction',
        titleHindi: 'धान भंडार मापन एवं घटाव',
        skillLevel: 'Proficient',
        subject: 'Numeracy',
        status: 'pending',
        assignedDate: '18 Sep 2026'
      }
    ]
  },
  {
    id: 's2',
    name: 'Priya Kisku',
    avatarLetter: 'P',
    language: 'Ho',
    grade: 'Grade 1',
    flnLevel: 'beginner',
    avgScore: 46,
    assessmentsCompleted: 2,
    motherTongueProficiency: 70,
    hindiBridgeProficiency: 35,
    lastAssessed: '3 days ago',
    notes: 'Needs phonics reinforcement for initial consonant sounds in Ho and basic Hindi picture-vocabulary pairing.',
    assignedWorksheets: [
      {
        id: 'sw_2_1',
        title: 'Warang Chiti Consonant Tracing (𑢹, 𑢶, 𑢱)',
        titleHindi: 'वरंग क्षिति वर्ण आरेखन',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '10 Sep 2026',
        completedDate: '13 Sep 2026',
        score: 75
      },
      {
        id: 'sw_2_2',
        title: 'Kolhan Forest Animal Phonics Match',
        titleHindi: 'कोल्हान वन्यजीव ध्वनि मिलान',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '12 Sep 2026',
        completedDate: '16 Sep 2026',
        score: 68
      },
      {
        id: 'sw_2_3',
        title: 'Single-Digit Forest Arrow Counting 1-10',
        titleHindi: 'एक-अंकीय तीर गणना १-१०',
        skillLevel: 'Foundational',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '15 Sep 2026'
      },
      {
        id: 'sw_2_4',
        title: 'Ho Forest Counting Bingo 1-20',
        titleHindi: 'हो वन संख्या बिंगो १-२०',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '16 Sep 2026'
      },
      {
        id: 'sw_2_5',
        title: 'Mage Festival Drum Addition',
        titleHindi: 'मागे पर्व मांदर जोड़',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'pending',
        assignedDate: '17 Sep 2026'
      },
      {
        id: 'sw_2_6',
        title: 'Hero Parab Monsoon Cloze Story',
        titleHindi: 'हेरो पर्व मानसून कहानी',
        skillLevel: 'Proficient',
        subject: 'Literacy',
        status: 'pending',
        assignedDate: '18 Sep 2026'
      }
    ]
  },
  {
    id: 's3',
    name: 'Ravi Hansda',
    avatarLetter: 'R',
    language: 'Mundari',
    grade: 'Grade 3',
    flnLevel: 'advanced',
    avgScore: 87,
    assessmentsCompleted: 4,
    motherTongueProficiency: 92,
    hindiBridgeProficiency: 84,
    lastAssessed: 'Today',
    notes: 'Fluent bilingual reader in Mundari and Hindi; ready for multi-step addition and subtraction word problems.',
    assignedWorksheets: [
      {
        id: 'sw_3_1',
        title: 'Mundari Phonics Tracing (अ, स, द, प)',
        titleHindi: 'मुंडारी प्राथमिक ध्वनि आरेखन',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '08 Sep 2026',
        completedDate: '09 Sep 2026',
        score: 98
      },
      {
        id: 'sw_3_2',
        title: 'Sal Seed Counting Dot Cards 1-10',
        titleHindi: 'सखुआ बीज बिंदु कार्ड गणना',
        skillLevel: 'Foundational',
        subject: 'Numeracy',
        status: 'completed',
        assignedDate: '09 Sep 2026',
        completedDate: '10 Sep 2026',
        score: 100
      },
      {
        id: 'sw_3_3',
        title: 'Sarhul Blossom Nature Word Match',
        titleHindi: 'सरहुल फूल प्रकृति शब्द मिलान',
        skillLevel: 'Emerging',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '11 Sep 2026',
        completedDate: '13 Sep 2026',
        score: 94
      },
      {
        id: 'sw_3_4',
        title: 'Akhra Dance Drum Addition Practice',
        titleHindi: 'अखड़ा सामूहिक नृत्य वाद्य जोड़',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'completed',
        assignedDate: '13 Sep 2026',
        completedDate: '15 Sep 2026',
        score: 91
      },
      {
        id: 'sw_3_5',
        title: 'Dharti Aba Birsa Munda Story Cloze',
        titleHindi: 'धरती आबा बिरसा मुंडा गाथा',
        skillLevel: 'Proficient',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '15 Sep 2026',
        completedDate: '17 Sep 2026',
        score: 88
      },
      {
        id: 'sw_3_6',
        title: 'Weekly Haat Village Market Arithmetic',
        titleHindi: 'साप्ताहिक हाट ग्रामीण बाजार अंकगणित',
        skillLevel: 'Proficient',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '18 Sep 2026'
      }
    ]
  },
  {
    id: 's4',
    name: 'Sita Murmu',
    avatarLetter: 'S',
    language: 'Santhali',
    grade: 'Grade 1',
    flnLevel: 'beginner',
    avgScore: 42,
    assessmentsCompleted: 2,
    motherTongueProficiency: 65,
    hindiBridgeProficiency: 30,
    lastAssessed: '4 days ago',
    notes: 'Requires concrete manipulatives (beads, pebbles) for number sense 1-10; benefits from Santhali counting chants.',
    assignedWorksheets: [
      {
        id: 'sw_4_1',
        title: 'Ol Chiki Letter Formation Basics',
        titleHindi: 'संथाली ओल चिकी वर्ण निर्माण',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '11 Sep 2026',
        completedDate: '15 Sep 2026',
        score: 70
      },
      {
        id: 'sw_4_2',
        title: 'Pebble Counting Chants 1-10',
        titleHindi: 'कंकड़ गिनती १-१० अभ्यास',
        skillLevel: 'Foundational',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '14 Sep 2026'
      },
      {
        id: 'sw_4_3',
        title: 'Santhali Number Bingo (1-20)',
        titleHindi: 'संख्या बिंगो खेल १-२०',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'pending',
        assignedDate: '16 Sep 2026'
      },
      {
        id: 'sw_4_4',
        title: 'Sohrai Cattle Festival Visual Math',
        titleHindi: 'सोहराय पर्व सचित्र जोड़',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'pending',
        assignedDate: '17 Sep 2026'
      },
      {
        id: 'sw_4_5',
        title: 'Pilchu Haram Folk Story Cloze',
        titleHindi: 'पिलचु हाड़ाम लोककथा',
        skillLevel: 'Proficient',
        subject: 'Literacy',
        status: 'pending',
        assignedDate: '18 Sep 2026'
      }
    ]
  },
  {
    id: 's5',
    name: 'John Baskey',
    avatarLetter: 'J',
    language: 'Ho',
    grade: 'Grade 2',
    flnLevel: 'intermediate',
    avgScore: 70,
    assessmentsCompleted: 4,
    motherTongueProficiency: 78,
    hindiBridgeProficiency: 62,
    lastAssessed: '2 days ago',
    notes: 'Very vocal in Ho; shows steady improvement converting Ho numbers to Hindi written numerals.',
    assignedWorksheets: [
      {
        id: 'sw_5_1',
        title: 'Warang Chiti Alphabet Tracing',
        titleHindi: 'वरंग क्षिति वर्णमाला आरेखन',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '10 Sep 2026',
        completedDate: '12 Sep 2026',
        score: 88
      },
      {
        id: 'sw_5_2',
        title: 'Ho Forest Counting (1-10)',
        titleHindi: 'हो वन संख्या गणना १-१०',
        skillLevel: 'Foundational',
        subject: 'Numeracy',
        status: 'completed',
        assignedDate: '11 Sep 2026',
        completedDate: '13 Sep 2026',
        score: 85
      },
      {
        id: 'sw_5_3',
        title: 'Kolhan Animal Phonics Recognition',
        titleHindi: 'कोल्हान वन्यजीव शब्दावली',
        skillLevel: 'Emerging',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '13 Sep 2026',
        completedDate: '16 Sep 2026',
        score: 79
      },
      {
        id: 'sw_5_4',
        title: 'Mage Drum Addition Manipulatives',
        titleHindi: 'मागे पर्व वाद्ययंत्र जोड़',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '15 Sep 2026'
      },
      {
        id: 'sw_5_5',
        title: 'Saranda Archery Distance Math',
        titleHindi: 'सारंडा तीरंदाजी दूरी अंकगणित',
        skillLevel: 'Proficient',
        subject: 'Numeracy',
        status: 'pending',
        assignedDate: '17 Sep 2026'
      }
    ]
  },
  {
    id: 's6',
    name: 'Lakhi Soren',
    avatarLetter: 'L',
    language: 'Mundari',
    grade: 'Grade 3',
    flnLevel: 'intermediate',
    avgScore: 74,
    assessmentsCompleted: 3,
    motherTongueProficiency: 80,
    hindiBridgeProficiency: 70,
    lastAssessed: '5 days ago',
    notes: 'Good grasp of bilingual classroom instructions; working on reading short paragraphs independently.',
    assignedWorksheets: [
      {
        id: 'sw_6_1',
        title: 'Mundari Phonics & Consonant Drill',
        titleHindi: 'मुंडारी प्राथमिक ध्वनि अभ्यास',
        skillLevel: 'Foundational',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '09 Sep 2026',
        completedDate: '11 Sep 2026',
        score: 92
      },
      {
        id: 'sw_6_2',
        title: 'Mundari Sal Seed Number Cards 1-10',
        titleHindi: 'सखुआ बीज संख्या कार्ड १-१०',
        skillLevel: 'Foundational',
        subject: 'Numeracy',
        status: 'completed',
        assignedDate: '10 Sep 2026',
        completedDate: '12 Sep 2026',
        score: 90
      },
      {
        id: 'sw_6_3',
        title: 'Sarhul Blossom Nature Match',
        titleHindi: 'सरहुल फूल प्रकृति मिलान',
        skillLevel: 'Emerging',
        subject: 'Literacy',
        status: 'completed',
        assignedDate: '12 Sep 2026',
        completedDate: '15 Sep 2026',
        score: 84
      },
      {
        id: 'sw_6_4',
        title: 'Akhra Drum Addition Practice',
        titleHindi: 'अखड़ा मांदर जोड़ अभ्यास',
        skillLevel: 'Emerging',
        subject: 'Numeracy',
        status: 'in_progress',
        assignedDate: '14 Sep 2026'
      },
      {
        id: 'sw_6_5',
        title: 'Birsa Munda Biography Reading',
        titleHindi: 'बिरसा मुंडा जीवनी पठन',
        skillLevel: 'Proficient',
        subject: 'Literacy',
        status: 'in_progress',
        assignedDate: '16 Sep 2026'
      },
      {
        id: 'sw_6_6',
        title: 'Haat Village Market Currency Math',
        titleHindi: 'हाट ग्रामीण बाजार मुद्रा गणित',
        skillLevel: 'Proficient',
        subject: 'Numeracy',
        status: 'pending',
        assignedDate: '18 Sep 2026'
      }
    ]
  }
];

export const INITIAL_WORKSHEETS: WorksheetItem[] = [
  // ==========================================
  // HO (𑢹𑣉𑣉 𑢱𑣁𑣎𑣂) - 6 Dedicated Worksheets
  // ==========================================
  {
    id: 'w_ho_1',
    title: 'Warang Chiti Alphabet Tracing',
    titleHindi: 'वरंग क्षिति वर्णमाला आरेखन (ट्रेसिंग)',
    grade: 'Grade 1',
    description: 'Practice foundational Warang Chiti consonants (𑢹, 𑢶, 𑢱, 𑢷) with directional stroke lines and Hindi phonetics',
    languages: ['Ho'],
    subject: 'Literacy',
    type: 'tracing',
    status: 'completed',
    assignedCount: 4,
    completedCount: 4,
    script: 'Warang Chiti (𑢹𑣉𑣉)'
  },
  {
    id: 'w_ho_2',
    title: 'Kolhan Animal Phonics & Sound Match',
    titleHindi: 'कोल्हान वन्यजीव ध्वनि एवं शब्दावली मिलान',
    grade: 'Grade 1',
    description: 'Match Ho forest animal names: tiger (Kul 𑢱𑣃𑣚), elephant (Hati 𑢹𑣁𑣎𑣂), and peacock (Mara 𑢶𑣁𑢜𑣁) with picture clues',
    languages: ['Ho'],
    subject: 'Literacy',
    type: 'matching',
    status: 'completed',
    assignedCount: 4,
    completedCount: 3,
    script: 'Warang Chiti & Hindi Bridge'
  },
  {
    id: 'w_ho_3',
    title: 'Ho Forest Counting & Numeral Bingo (1-20)',
    titleHindi: 'हो वन संख्या गणना एवं बिंगो खेल (१-२०)',
    grade: 'Grade 1',
    description: 'Count forest trees, birds, and arrows in Ho numerals (𑣑, 𑣡, 𑣁, 𑣂, 𑣃) with bilingual number labels',
    languages: ['Ho'],
    subject: 'Numeracy',
    type: 'matching',
    status: 'completed',
    assignedCount: 5,
    completedCount: 5,
    script: 'Warang Chiti Numerals'
  },
  {
    id: 'w_ho_4',
    title: 'Mage Festival Drum Addition',
    titleHindi: 'मागे पर्व मांदर एवं दमा-दुमंग सचित्र जोड़',
    grade: 'Grade 2',
    description: 'Visual addition problems counting festive Dama, Dumang, and Rutu flute instruments in Kolhan villages',
    languages: ['Ho'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'in_progress',
    assignedCount: 4,
    completedCount: 2,
    script: 'Visual Math Manipulatives'
  },
  {
    id: 'w_ho_5',
    title: 'Hero Parab Seed Sowing Story Cloze',
    titleHindi: 'हेरो पर्व बीज बुवाई कहानी रिक्त स्थान पूर्ति',
    grade: 'Grade 2',
    description: 'Fill in missing Ho vocabulary words about monsoon rains, paddy seeds, and Desauli sacred grove prayers',
    languages: ['Ho'],
    subject: 'Literacy',
    type: 'fill-blank',
    status: 'assigned',
    assignedCount: 3,
    completedCount: 1,
    script: 'Warang Chiti & Devanagari'
  },
  {
    id: 'w_ho_6',
    title: 'Saranda Archery Distance & Arrow Math',
    titleHindi: 'सारंडा तीरंदाजी दूरी एवं मानसिक अंकगणित',
    grade: 'Grade 3',
    description: 'Solve practical arithmetic word problems calculating arrow bundles (Sar-Aa) and target ring scores in Ho and Hindi',
    languages: ['Ho'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'assigned',
    assignedCount: 3,
    completedCount: 0,
    script: 'Ho Numeracy Manipulatives'
  },

  // ==========================================
  // MUNDARI (मुंडारी) - 6 Dedicated Worksheets
  // ==========================================
  {
    id: 'w_mun_1',
    title: 'Mundari Foundational Phonics Tracing',
    titleHindi: 'मुंडारी प्राथमिक ध्वनि एवं वर्ण आरेखन',
    grade: 'Grade 1',
    description: 'Letter tracing for Mundari foundational sounds (अ, स, द, प) paired with village vocabulary (आतु, सरजोम, दाः, पुथी)',
    languages: ['Mundari'],
    subject: 'Literacy',
    type: 'tracing',
    status: 'completed',
    assignedCount: 4,
    completedCount: 4,
    script: 'Devanagari (मुंडारी ध्वनि)'
  },
  {
    id: 'w_mun_2',
    title: 'Mundari Sal Seed & Berry Counting (1-20)',
    titleHindi: 'मुंडारी सखुआ बीज एवं बेर फल गणना (१-२०)',
    grade: 'Grade 1',
    description: 'Foundational numeracy counting sal tree seeds and berries (मियाद, बारिया, आपेया, उपुनया, मोड़ेया) with dot cards',
    languages: ['Mundari'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'completed',
    assignedCount: 4,
    completedCount: 4,
    script: 'Mundari Bilingual Numerals'
  },
  {
    id: 'w_mun_3',
    title: 'Sarhul Blossom & Forest Nature Word Match',
    titleHindi: 'सरहुल फूल एवं वन प्रकृति शब्द मिलान',
    grade: 'Grade 2',
    description: 'Connect Mundari terms (सरजोम Sarjom, दाः Daah, सिंगी Singi, बुरु Buru, पुथी Puthi) with illustrations and Hindi meanings',
    languages: ['Mundari'],
    subject: 'Literacy',
    type: 'matching',
    status: 'in_progress',
    assignedCount: 4,
    completedCount: 2,
    script: 'Devanagari Mundari & Hindi'
  },
  {
    id: 'w_mun_4',
    title: 'Akhra Dance Drum Addition & Regrouping',
    titleHindi: 'अखड़ा सामूहिक नृत्य वाद्ययंत्र जोड़ अभ्यास',
    grade: 'Grade 2',
    description: 'Visual addition counting Nagada, Dhol, and Madal drums played during Sarhul and Karam celebrations',
    languages: ['Mundari'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'assigned',
    assignedCount: 3,
    completedCount: 1,
    script: 'Visual Math Manipulatives'
  },
  {
    id: 'w_mun_5',
    title: 'Dharti Aba Birsa Munda Story Cloze',
    titleHindi: 'धरती आबा बिरसा मुंडा गाथा पठन एवं बोध',
    grade: 'Grade 2',
    description: 'Complete missing words in short biographical sentences honoring Birsa Munda of Ulihatu in Khunti district',
    languages: ['Mundari'],
    subject: 'Literacy',
    type: 'fill-blank',
    status: 'completed',
    assignedCount: 3,
    completedCount: 3,
    script: 'Bilingual Prose'
  },
  {
    id: 'w_mun_6',
    title: 'Weekly Haat Village Market Arithmetic',
    titleHindi: 'साप्ताहिक हाट ग्रामीण बाजार अंकगणित',
    grade: 'Grade 3',
    description: 'Practical word problems calculating costs of earthen pots, bamboo mats, and mustard oil at the village Haat',
    languages: ['Mundari'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'assigned',
    assignedCount: 3,
    completedCount: 0,
    script: 'Applied FLN Numeracy'
  },

  // ==========================================
  // SANTHALI (ᱥᱟᱱᱛᱟᱲᱤ) - 6 Dedicated Worksheets
  // ==========================================
  {
    id: 'w_san_1',
    title: 'Ol Chiki Vowel Tracing (La, At, Ag, Ang)',
    titleHindi: 'संथाली ओल चिकी स्वर एवं वर्ण आरेखन',
    grade: 'Grade 1',
    description: 'Master Ol Chiki letter strokes for foundational characters (ᱚ, ᱛ, ᱜ, ᱝ) with Hindi sound guidance',
    languages: ['Santhali'],
    subject: 'Literacy',
    type: 'tracing',
    status: 'completed',
    assignedCount: 5,
    completedCount: 5,
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)'
  },
  {
    id: 'w_san_2',
    title: 'Santhali Number Bingo (1-20 in Ol Chiki)',
    titleHindi: 'ओल चिकी संख्या बिंगो एवं गणना (१-२०)',
    grade: 'Grade 1',
    description: 'Identify and color Ol Chiki numerals (᱑, ᱒, ᱓, ᱔, ᱕) matched with Hindi digits and dot tallies',
    languages: ['Santhali'],
    subject: 'Numeracy',
    type: 'matching',
    status: 'completed',
    assignedCount: 4,
    completedCount: 4,
    script: 'Ol Chiki Numerals'
  },
  {
    id: 'w_san_3',
    title: 'Sohrai Cattle Festival Picture Addition',
    titleHindi: 'सोहराय गो-वंदना सचित्र जोड़ अभ्यास',
    grade: 'Grade 2',
    description: 'Visual addition counting decorated cattle, brass neck bells, and wall Sohrai murals',
    languages: ['Santhali'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'in_progress',
    assignedCount: 4,
    completedCount: 2,
    script: 'Visual Math Manipulatives'
  },
  {
    id: 'w_san_4',
    title: 'Baha Spring Flower & Woodland Vocabulary',
    titleHindi: 'बाहा वसंत पुष्प एवं वन शब्दावली मिलान',
    grade: 'Grade 2',
    description: 'Match Santhali terms (ᱫᱟᱨᱮ Dare, ᱫᱟᱜ Daak, ᱯᱩᱛᱷᱤ Puthi, ᱵᱟᱦᱟ Baha) with Hindi vocabulary and pictures',
    languages: ['Santhali'],
    subject: 'Literacy',
    type: 'matching',
    status: 'completed',
    assignedCount: 4,
    completedCount: 4,
    script: 'Ol Chiki & Romanized Santhali'
  },
  {
    id: 'w_san_5',
    title: 'Pilchu Haram Genesis Tale Cloze Activity',
    titleHindi: 'पिलचु हाड़ाम उत्पत्ति कथा रिक्त स्थान पूर्ति',
    grade: 'Grade 2',
    description: 'Fill in blanks in the Santhal creation folktale about Hihiri Pipiri, swan eggs, and Marang Buru',
    languages: ['Santhali'],
    subject: 'Literacy',
    type: 'fill-blank',
    status: 'assigned',
    assignedCount: 3,
    completedCount: 1,
    script: 'Ol Chiki & Devanagari'
  },
  {
    id: 'w_san_6',
    title: 'Paddy Granary Measurement & Subtraction',
    titleHindi: 'धान भंडार मापन एवं घटाव अंकगणित',
    grade: 'Grade 3',
    description: 'Calculate traditional grain storage measures (Paura, Kathi, Teva) and remaining grain bags after distribution',
    languages: ['Santhali'],
    subject: 'Numeracy',
    type: 'math-visual',
    status: 'assigned',
    assignedCount: 3,
    completedCount: 0,
    script: 'Bilingual Applied Numeracy'
  }
];

export const CULTURAL_STORIES: CulturalStory[] = [
  {
    id: 'c1',
    titleHindi: 'सारना पूजा की कहानी',
    titleTribal: 'ᱥᱟᱨᱱᱟ ᱵᱚᱸᱜᱟ ᱠᱟᱹᱦᱱᱤ',
    titleEnglish: 'Story of Sarna Worship',
    subtitle: 'The sacred grove worship tradition of the Santhal people',
    language: 'Santhali',
    type: 'Story',
    duration: '8 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'सारना स्थल संथाली और अन्य आदिवासी समुदायों के लिए सबसे पवित्र प्राकृतिक देवस्थान है। साल (सखुआ) के पेड़ों के नीचे ग्राम देवता जाहिर एरा की पूजा की जाती है ताकि प्रकृति और मनुष्य के बीच सामंजस्य बना रहे।',
    contentTribalScript: 'ᱥᱟᱨᱱᱟ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱠᱚᱣᱟᱜ ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱯᱩᱱᱟᱹᱭ ᱡᱟᱭᱜᱟ ᱠᱟᱱᱟ᱾ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱵᱩᱴᱟᱹ ᱨᱮ ᱡᱟᱦᱮᱨ ᱮᱨᱟ ᱵᱚᱸᱜᱟ ᱠᱚ ᱥᱮᱵᱟᱭᱟ᱾',
    contentTribalRoman: 'Sarna do Santhal kowag joto khon punai jayga kana. Sarjom dare buta re Jaher Era bonga ko sebaya.',
    contentEnglish: 'The Sarna is the most sacred sanctuary for the Santhal and other indigenous communities. Under the canopy of Sal trees, deities of nature are venerated to preserve ecology and community well-being.',
    audioDurationSec: 480
  },
  {
    id: 'c2',
    titleHindi: 'करम नृत्य गीत',
    titleTribal: '𑢹𑣉𑣉 𑢱𑣎𑣜𑣉𑣖 𑢯𑣃𑣜𑣂𑣑',
    titleEnglish: 'Karam Festival Dance Songs',
    subtitle: 'Traditional Karam dance songs celebrating nature and harvest',
    language: 'Ho',
    type: 'Song',
    duration: '5 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'करम पर्व भाई-बहन के प्रेम, प्रकृति की पूजा और अच्छी फसल की कामना का सबसे उल्लासपूर्ण त्योहार है। करम डाल की परिक्रमा करते हुए पारंपरिक मांदर और नगाड़े की थाप पर लोकगीत गाए जाते हैं।',
    contentTribalScript: '𑢱𑣎𑣜𑣉𑣖 𑢯𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢶𑣂𑣑𑣁𑣖 𑢯𑣃𑣜𑣂𑣑 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Karam durang Ho hon ko lagid bidayan durang kana. Dama dumang sadi te raska te eneko.',
    contentEnglish: 'The Karam festival honors brother-sister kinship and bountiful agrarian harvests. Community elders and children circle the sacred branch, chanting celebratory folk songs to the rhythm of tribal drums.',
    audioDurationSec: 300
  },
  {
    id: 'c3',
    titleHindi: 'सरहुल और साल के फूल',
    titleTribal: 'ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ / ᱥᱟᱨᱦᱩᱞ',
    titleEnglish: 'Sarhul & The Sacred Sal Blossoms',
    subtitle: 'Spring folklore welcoming new foliage and agrarian prosperity',
    language: 'Mundari',
    type: 'Folklore',
    duration: '6 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'सरहुल या बाहा पर्व धरती माता और सूर्य देव के विवाह का प्रतीक है। जब साल के पेड़ों पर सफेद सुगंधित फूल खिलते हैं, तभी मुंडा समाज नए साल की शुरुआत मनाता है और खेतों में जुताई प्रारंभ करता है।',
    contentTribalScript: 'बाहा परब रे हासा ओन्दो सिंगबोंगा रेन बिहा मनातिंग तना। सरजोम बा फुटी लेन खान नोवा सिरमा एतोहोब तना।',
    contentTribalRoman: 'Baha parab re Hasa ondo Singbonga ren biha manating tana. Sarjom ba phuti len khan nowa sirma etohob tana.',
    contentEnglish: 'Sarhul signifies the divine union of Mother Earth and the Sun. Only after the fragrant white Sal blossoms appear do Munda families celebrate the new agrarian year and commence tilling the soil.',
    audioDurationSec: 360
  },
  {
    id: 'c4',
    titleHindi: 'तीरंदाजी और जंगल की पहेलियां',
    titleTribal: '𑢷𑣁𑣜 𑢡𑣁𑣁 𑢰𑣂𑣁𑣜𑣂 𑢱𑣁𑣄𑣂',
    titleEnglish: 'Forest Riddles & Traditional Archery',
    subtitle: 'Interactive tribal counting riddles and hand-eye games for FLN',
    language: 'Ho',
    type: 'Game',
    duration: '7 min',
    colorTheme: 'orange',
    isDownloaded: false,
    contentHindi: 'जंगल के पशु-पक्षियों के कदमों के निशान पहचानना और बांस के धनुष से निशाने साधने की प्राचीन कला। इस खेल के माध्यम से बच्चे संख्याओं की गिनती और दिशाओं का ज्ञान सीखते हैं।',
    contentTribalScript: '𑢷𑣁𑣜 𑢡𑣁𑣁 𑢨𑣂𑣓𑣂𑣑 𑢨𑣉𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢷𑣂𑣅𑣁𑣜𑣂 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Sar aa chikit Ho hon ko lagid karkai inung kana. Lekha odo disum nam tana.',
    contentEnglish: 'Identifying forest bird tracks and estimating distances through archery. Through this traditional pastime, learners acquire numeracy and observational dexterity.',
    audioDurationSec: 420
  },
  {
    id: 'c5',
    titleHindi: 'सोहराय गाय-बैल वंदना गीत',
    titleTribal: 'ᱥᱚᱦᱨᱟᱭ ᱯᱟᱨᱟᱵᱽ ᱥᱮᱨᱮᱧ',
    titleEnglish: 'Sohrai Cattle Festival Folk Song',
    subtitle: 'Sacred harvest and cattle thanksgiving song in Ol Chiki and Hindi',
    language: 'Santhali',
    type: 'Song',
    duration: '6 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'सोहराय संथाली समाज का सबसे बड़ा कृषि उत्सव है। कार्तिक अमावस्या को पशुधन (गाय-बैलों) के प्रति कृतज्ञता व्यक्त की जाती है। उनके सींगों पर तेल और सिंदूर लगाकर मांदर और टमाक की गूंजती थाप पर यह पारंपरिक गीत गाया जाता है।',
    contentTribalScript: 'ᱪᱟᱸᱫᱚ ᱵᱚᱸᱜᱟ ᱫᱟᱭᱟ ᱛᱮ, ᱦᱟᱥᱟ ᱫᱷᱟᱹᱨᱛᱤ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ, ᱜᱟᱹᱭ ᱰᱟᱝᱨᱟ ᱠᱚ ᱥᱟᱡᱟᱣ ᱠᱟᱛᱮ, ᱥᱚᱦᱨᱟᱭ ᱥᱮᱨᱮᱧ ᱮᱱᱮᱡ ᱠᱟᱱᱟ᱾',
    contentTribalRoman: 'Chando Bonga daya te, hasa dharti raska te, gai dangra ko sajaw kate, Sohrai seren enej kana.',
    contentEnglish: 'Sohrai is the grand cattle veneration and post-harvest celebration. By the grace of the Supreme Creator, villagers adorn oxen and cows, dancing joyously to the thunderous beats of Tamak and Tumdak drums.',
    audioDurationSec: 360
  },
  {
    id: 'c6',
    titleHindi: 'पिलचु हाड़ाम और पिलचु बुढ़ी की उत्पत्ति कथा',
    titleTribal: 'ᱯᱤᱞᱪᱩ ᱦᱟᱲᱟᱢ ᱟᱨ ᱯᱤᱞᱪᱩ ᱵᱩᱰᱷᱤ ᱠᱟᱹᱦᱱᱤ',
    titleEnglish: 'Genesis of Pilchu Haram & Pilchu Budhi',
    subtitle: 'Santhal primordial creation folklore of humanity born at Hihiri Pipiri',
    language: 'Santhali',
    type: 'Folklore',
    duration: '9 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'संथाली लोकगाथा के अनुसार, ठाकुर जिउ के आशीर्वाद से दो हंस (हांस और हांसिल) के अंडों से प्रथम मानव युगल पिलचु हाड़ाम और पिलचु बुढ़ी का जन्म हुआ। मरांग बुरु ने उन्हें जंगल में फल चुनने, कृषि करने और प्रकृति की रक्षा करने का मार्ग दिखाया।',
    contentTribalScript: 'ᱦᱤᱦᱤᱲᱤ ᱯᱤᱯᱤᱲᱤ ᱨᱮ ᱦᱟᱸᱥ ᱦᱟᱸᱥᱤᱞ ᱵᱤᱞᱤ ᱠᱷᱚᱱ ᱯᱤᱞᱪᱩ ᱦᱟᱲᱟᱢ ᱟᱨ ᱯᱤᱞᱪᱩ ᱵᱩᱰᱷᱤ ᱠᱤᱱ ᱡᱟᱱᱟᱢ ᱞᱮᱱᱟ᱾ ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱠᱤᱱ ᱥᱮᱬᱟᱣᱟᱫ ᱠᱤᱱᱟ᱾',
    contentTribalRoman: 'Hihiri Pipiri re Hans Hansil bili khon Pilchu Haram ar Pilchu Budhi kin janam lena. Marang Buru kin senawad kina.',
    contentEnglish: 'According to revered Santhal genesis folklore, the first human couple hatched from the celestial swan eggs at Hihiri Pipiri. Marang Buru tutored them in farming, medicinal plants, and living harmoniously with the sal forests.',
    audioDurationSec: 540
  },
  {
    id: 'c7',
    titleHindi: 'बाहा पर्व सखुआ फूल गीत',
    titleTribal: 'ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱥᱟᱨᱡᱚᱢ ᱥᱮᱨᱮᱧ',
    titleEnglish: 'Baha Flower Festival Spring Song',
    subtitle: 'Choral spring song celebrating blooming Sal blossoms and new life',
    language: 'Santhali',
    type: 'Song',
    duration: '5 min',
    colorTheme: 'green',
    isDownloaded: false,
    contentHindi: 'फागुन और चैत के महीने में जब सखुआ (साल) के पेड़ों पर नए पत्ते और सफेद फूल खिलते हैं, तब संथाली बस्तियों में बाहा पर्व मनाया जाता है। नायके (पुजारी) पवित्र फूल हर घर में बांटते हैं और लड़कियां बालों में फूल सजाकर नृत्य करती हैं।',
    contentTribalScript: 'ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱯᱷᱩᱴᱤ ᱟᱠᱟᱱ, ᱵᱤᱨ ᱫᱤᱥᱚᱢ ᱥᱚᱲᱚᱢ ᱟᱠᱟᱱ᱾ ᱪᱮᱬᱮ ᱠᱚ ᱨᱟᱜᱟ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ, ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱥᱮᱴᱮᱨ ᱟᱠᱟᱱ᱾',
    contentTribalRoman: 'Sarjom baha phuti akan, bir disom sodom akan. Chene ko raga raska te, Baha parab seter akan.',
    contentEnglish: 'White sal blossoms have unfurled, spreading sweet woodland fragrance across the plateau. Birds sing in jubilation as the village welcomes spring with sacred baha dances.',
    audioDurationSec: 300
  },
  {
    id: 'c8',
    titleHindi: 'हो मागे पर्व लोकगीत',
    titleTribal: '𑢶𑣁𑣋𑣄 𑢯𑣃𑣜𑣂𑣑 - 𑢹𑣉𑣉 𑢷𑣂𑣁𑣜𑣂',
    titleEnglish: 'Ho Mage Festival Awakening Song',
    subtitle: 'The premier national festival of the Ho tribe celebrating post-harvest renewal',
    language: 'Ho',
    type: 'Song',
    duration: '6 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'मागे पर्व हो समुदाय का सबसे बड़ा वार्षिक लोकपर्व है। धान की कटाई के बाद जब खलिहान खाली हो जाते हैं, तब देउरी (पुजारी) ग्राम-शुद्धि करते हैं। बांसुरी (रूतू) और दमा-दुमंग के साथ पूरा गांव सात दिनों तक नृत्य और गायन में डूब जाता है।',
    contentTribalScript: '𑢶𑣁𑣋𑣄 𑢯𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢷𑣉𑣄𑣉𑣜 𑢯𑣃𑣜𑣂𑣑 𑢱𑣁𑣓𑣁᱾ 𑢜𑣃𑣎𑣃 𑢵𑢷𑣉 𑢯𑣁𑣖𑣁 𑢯𑣃𑣖𑣁𑣑 𑢯𑣁𑣑𑣂 𑢷𑣄 𑢜𑣁𑣎𑣂 𑢱𑣉 𑢷𑣓𑣄𑣑 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Mage durang Ho hon ko lagid gokor durang kana. Rutu odo dama dumang sadi te rajiko enej tana.',
    contentEnglish: 'Mage is the paramount seasonal festival of the Ho people of West Singhbhum. After granaries are replenished, the Deori purifies the hamlets while flutes (Rutu) and resonant drums fill the air with joyful agrarian harmonies.',
    audioDurationSec: 360
  },
  {
    id: 'c9',
    titleHindi: 'हेरो पर्व और बीज बोने की परंपरा',
    titleTribal: '𑢹𑣄𑢜𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢱𑣁𑣄𑣂',
    titleEnglish: 'Hero Parab: Sacred Seed Sowing Lore',
    subtitle: 'Agricultural prayer for germinating seeds and timely monsoon showers',
    language: 'Ho',
    type: 'Folklore',
    duration: '8 min',
    colorTheme: 'orange',
    isDownloaded: false,
    contentHindi: 'हेरो का अर्थ होता है "बीज बोना"। आषाढ़ मास में जब पहली वर्षा होती है, तब देउरी देशाउली (पवित्र उपवन) में धान के बीजों को मंत्रोच्चार के साथ अभिमंत्रित करते हैं। यह कथा बच्चों को सिखाती है कि धरती से अन्न प्राप्त करने के लिए प्रकृति का सम्मान अनिवार्य है।',
    contentTribalScript: '𑢹𑣄𑢜𑣉 𑢡𑣉𑣑 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢷𑣄𑣉𑣜𑣂 𑢷𑣄𑢯𑣁𑣃𑣚𑣂 𑢜𑣄 𑢡𑣉𑣑 𑢵𑢖𑣁𑣜 𑢷𑣓𑣄𑣑 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Hero bonte hon ko lagid Deori Desauli re bon omar tana. Gamah daah nam lagid Singbonga ko aashirwad.',
    contentEnglish: 'Hero signifies the sacred act of sowing seeds. Before broadcasting paddy, the village elders assemble at the sacred grove to seek blessings from Singbonga and Desauli for equitable rainfall and disease-free saplings.',
    audioDurationSec: 480
  },
  {
    id: 'c10',
    titleHindi: 'कोल्हान वन्यजीव और बाल गीत',
    titleTribal: '𑢱𑣉𑣚𑣹𑣁𑣓 𑢷𑣉𑣑 𑢯𑣃𑣜𑣂𑣑',
    titleEnglish: 'Kolhan Children Jungle Animal Song',
    subtitle: 'Playful phonics rhyme teaching animal names and counting in Ho',
    language: 'Ho',
    type: 'Song',
    duration: '4 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'सारंडा और कोल्हान के जंगलों में रहने वाले मोर, बाघ, हाथी और हिरण पर आधारित यह बालगीत प्राथमिक कक्षा के बच्चों में भाषा और संख्यात्मक कौशल (FLN) को खेल-खेल में विकसित करता है।',
    contentTribalScript: '𑢱𑣃𑣚 𑢱𑣃𑣚 𑢡𑣂𑣜 𑢜𑣄 𑢱𑣃𑣚, 𑢹𑣁𑣎𑣂 𑢹𑣁𑣎𑣂 𑢶𑣁𑣜𑣁𑣑 𑢹𑣁𑣎𑣂᱾ 𑢶𑣁𑢜𑣁 𑢵𑢷𑣉 𑢰𑣂𑣑 𑢯𑣃𑣜𑣂𑣑 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Kul kul bir re kul, hati hati marang hati. Mara odo chidu durang kana, raska te kowa leka.',
    contentEnglish: 'Tiger in the deep forest, mighty elephant walking tall, peacocks dancing and woodland birds chirping. A rhythmic kindergarten song linking tribal fauna vocabulary to foundational counting.',
    audioDurationSec: 240
  },
  {
    id: 'c11',
    titleHindi: 'जादुर वसंत नृत्य गीत',
    titleTribal: 'जादुर दुरुंग - सरजोम बा',
    titleEnglish: 'Jadur Spring Dance Song',
    subtitle: 'Lyrical antiphonal chorus sung by Munda youth welcoming new foliage',
    language: 'Mundari',
    type: 'Song',
    duration: '5 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'जादुर मुंडारी समुदाय का सबसे सुंदर और लयबद्ध वसंतकालीन लोकनृत्य गीत है। इसमें लड़के मांदर और नगाड़ा बजाते हैं तथा लड़कियां कदम से कदम मिलाकर अर्धचंद्राकार घेरे में गाती हैं। यह गीत नई कोंपलों और जीवन के उल्लास को समर्पित है।',
    contentTribalScript: 'सरजोम बा फुटी लेना रे, हातू-हातू रस्का तना। दामा-दुमंग साड़ी ते, जादुर दुरुंग सेनोः तना।',
    contentTribalRoman: 'Sarjom ba phuti lena re, hatu-hatu raska tana. Dama-dumang sadi te, Jadur durang senoh tana.',
    contentEnglish: 'The sal trees are in fragrant bloom and joyful energy ripples across every hamlet. To the cadence of dama and dumang drums, the youth join hands to sing the timeless Jadur melody.',
    audioDurationSec: 300
  },
  {
    id: 'c12',
    titleHindi: 'भगवान बिरसा मुंडा उलगुलान गाथा',
    titleTribal: 'धरती आबा बिरसा दुरुंग',
    titleEnglish: 'Ballad of Dharti Aba Birsa Munda',
    subtitle: 'Revered historical ballad recounting the courage and vision of Birsa Munda',
    language: 'Mundari',
    type: 'Folklore',
    duration: '8 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'उलिहातू के वीर सपूत बिरसा मुंडा ने जल, जंगल और जमीन की रक्षा के लिए उलगुलान (महासंग्राम) का शंखनाद किया था। मुंडारी लोकगीतों में बिरसा भगवान को धरती आबा (धरती के पिता) के रूप में याद किया जाता है, जिन्होंने स्वाभिमान और शिक्षा का दीप जलाया।',
    contentTribalScript: 'उलिहातू रेन बिरसा आबा, हासा-दाः रेन जोगाड़ आबा। उलगुलान ते मुंडा दिशुम जागवार केदा।',
    contentTribalRoman: 'Ulihatu ren Birsa Aaba, Hasa-Daah ren jogad Aaba. Ulgulan te Munda disum jagwar keda.',
    contentEnglish: 'Born in Ulihatu, Dharti Aba Birsa Munda mobilized the forest communities to protect self-determination, forest rights, and indigenous culture. His inspirational ballad is chanted across the Chotanagpur plateau.',
    audioDurationSec: 480
  },
  {
    id: 'c13',
    titleHindi: 'चतुर लोमड़ी और सारस की मुंडारी लोककथा',
    titleTribal: 'तुयु ओन्दो कोवा रेन कहनी',
    titleEnglish: 'The Forest Fox and the Wise Crane',
    subtitle: 'Classic indigenous moral fable teaching honesty, sharing, and empathy',
    language: 'Mundari',
    type: 'Story',
    duration: '7 min',
    colorTheme: 'green',
    isDownloaded: false,
    contentHindi: 'खूंटी के जंगलों में प्रचलित यह कहानी सिखाती है कि दूसरों के साथ वैसा ही व्यवहार करना चाहिए जैसा हम अपने लिए चाहते हैं। लोमड़ी ने जब सारस को समतल पत्तल में खीर परोसी तो सारस खा नहीं सका, परंतु बाद में दोनों ने मिल-बांटकर खाना सीख लिया।',
    contentTribalScript: 'तुयु ओन्दो कोवा रेन सांगीन गाते ताएकेना। दोनो हातू रे जोम-ञू हटिंग केदा ओन्दो सुकु ते ताएकेना।',
    contentTribalRoman: 'Tuyu ondo kowa ren sangin gate taekena. Doko hatu re jom-nyu hating keda ondo suku te taekena.',
    contentEnglish: 'A beloved Chotanagpur woodland tale where a mischievous fox and a patient crane discover that true camaraderie requires mutual respect, thoughtful sharing of forest meals, and kindness.',
    audioDurationSec: 420
  },
  {
    id: 'c14',
    titleHindi: 'मागे दुरुंग - शीतकालीन फसल उत्सव',
    titleTribal: 'मागे दुरुंग - नुआ सिरमा',
    titleEnglish: 'Mundari Mage Post-Harvest Chorus',
    subtitle: 'Traditional winter thanksgiving ballad welcoming guests and relatives',
    language: 'Mundari',
    type: 'Song',
    duration: '5 min',
    colorTheme: 'green',
    isDownloaded: true,
    contentHindi: 'मुंडा समाज में पौष-माघ के महीने में मागे पर्व पर खलिहान की पूजा होती है। नए चावल के पीठा बनाकर रिश्तेदारों को आमंत्रित किया जाता है। शाम को अखड़ा में गांव के सभी लोग मिलकर यह मधुर गीत गाते हैं।',
    contentTribalScript: 'इरि-गुंदली बागे केते, बाबा इरल ते हुरिंग-मारंग जारवा लेना। अखड़ा रे रस्का ते दुरुंग तना।',
    contentTribalRoman: 'Iri-gundli bage kete, baba iral te huring-marang jarwa lena. Akhra re raska te durang tana.',
    contentEnglish: 'Having gathered the winter paddy, kin and neighbors assemble at the village Akhra. Sharing warm rice pitha delicacies, the community rejoices in health, unity, and bountiful winter harvests.',
    audioDurationSec: 300
  },
  {
    id: 'c15',
    titleHindi: 'हाट-बाजार संख्या बाज़ार एवं मुद्रा खेल',
    titleTribal: 'ᱦᱟᱴ ᱵᱟᱡᱟᱨ ᱞᱮᱠᱷᱟ ᱮᱱᱮᱡ',
    titleEnglish: 'Haat-Bazaar Market Math Mart',
    subtitle: 'Interactive village shopping arithmetic and coin counting game for primary FLN',
    language: 'Santhali',
    type: 'Game',
    duration: '8 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'साप्ताहिक ग्रामीण हाट में आलू, बैंगन, मिट्टी के बर्तन और ताजे आम खरीदने का खेल। बच्चे टोकरी में वस्तुओं की गिनती, पांच और दस के समूहों में जोड़ तथा सिक्कों का हिसाब-किताब सीखते हैं।',
    contentTribalScript: 'ᱦᱟᱴ ᱨᱮ ᱟᱹᱞᱩ, ᱵᱮᱸᱜᱟᱲ ᱟᱨ ᱩᱞ ᱠᱤᱨᱤᱧ ᱨᱮᱭᱟᱜ ᱮᱱᱮᱡ᱾ ᱢᱚᱬᱮ ᱟᱨ ᱜᱮᱞ ᱴᱟᱠᱟ ᱨᱮᱭᱟᱜ ᱦᱤᱥᱟᱹᱵᱽ᱾',
    contentTribalRoman: 'Hat re alu, bengar ar ul kirinj reyag enej. Mone ar gel taka reyag hisab.',
    contentEnglish: 'An engaging village market simulation where children pick fresh produce and earthenware into their baskets, mastering counting and rupee currency transactions.',
    audioDurationSec: 480
  },
  {
    id: 'c16',
    titleHindi: 'शब्द-चित्र एवं लिपि मिलान खेल',
    titleTribal: '𑢱𑣃𑣚 𑢶𑣁𑢜𑣁 𑢡𑣂𑢷𑣁𑣡 𑢱𑣁𑣄𑣂',
    titleEnglish: 'Tribal Script & Picture Flashcard Match',
    subtitle: 'Tactile card matching connecting Ol Chiki and Warang Chiti words with animal pictograms',
    language: 'Ho',
    type: 'Game',
    duration: '6 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'बाघ (कुल), मोर (मारा), साल (सरजोम) और जल (दाः) जैसे मूलभूत शब्दों को पहचान कर चित्र से मिलान करने का खेल। इसमें ध्वनि उच्चारण और स्मृति कौशल का अभ्यास होता है।',
    contentTribalScript: '𑢱𑣃𑣚, 𑢶𑣁𑢜𑣁 𑢵𑢷𑣉 𑢯𑣁𑣜𑢰𑣉𑢶 𑢷𑣂𑣓𑣂𑣑 𑢨𑣉𑣉 𑢱𑣁𑣄𑣂 𑢷𑣓𑣄𑣑 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Kul, Mara odo Sarjom chikit Ho inung tana. Enej te hon ko chikit nam tana.',
    contentEnglish: 'Fast-paced phonics match pairing tribal wildlife words with vivid illustrations, reinforcing letter recognition and offline oral pronunciation.',
    audioDurationSec: 360
  },
  {
    id: 'c17',
    titleHindi: 'गेदी एनांग - बांस स्टिल्ट संतुलन एवं दिशा खेल',
    titleTribal: '𑢋𑣂𑢷𑣂 𑢡𑣂𑢓𑣁𑣅 - 𑢡𑣁𑢶𑢡𑣃 𑢱𑣁𑣄𑣂',
    titleEnglish: 'Gedi Enang - Traditional Bamboo Stilt Race',
    subtitle: 'Indigenous balance sports teaching left-right spatial directions and step counting',
    language: 'Ho',
    type: 'Game',
    duration: '9 min',
    colorTheme: 'orange',
    isDownloaded: false,
    contentHindi: 'हो जनजाति का प्राचीन खेल जिसमें बच्चे बांस के डंडों पर संतुलन बनाकर तेज दौड़ते हैं। इस खेल से दिशा ज्ञान (बायां-दायां), कदमों की गिनती और शारीरिक स्फूर्ति का विकास होता है।',
    contentTribalScript: '𑢋𑣂𑢷𑣂 𑢡𑣂𑢓𑣁𑣅 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣁𑣄𑣂 𑢱𑣁𑣓𑣁᱾ 𑢡𑣁𑢶𑢡𑣃 𑢷𑣄 𑢨𑣃𑢡𑣂 𑢱𑣁𑢷𑣄 𑢷𑣓𑣄𑣑 𑢱𑣁𑣓𑣁᱾',
    contentTribalRoman: 'Gedi enang Ho hon ko lagid karkai inung kana. Bamboo te dube kate nir tana.',
    contentEnglish: 'A time-honored Kolhan stilt racing sport where children pace atop bamboo footrests, developing spatial agility and foundational distance counting.',
    audioDurationSec: 540
  },
  {
    id: 'c18',
    titleHindi: 'काटी खेल - संथाली लकड़ी चक्र प्रहार',
    titleTribal: 'ᱠᱟᱹᱴᱤ ᱮᱱᱮᱡ ᱟᱨ ᱞᱮᱠᱷᱟ',
    titleEnglish: 'Kati Khel - Traditional Wooden Disc Strike',
    subtitle: 'Post-harvest folk game measuring distances in paces and calculating team scores',
    language: 'Santhali',
    type: 'Game',
    duration: '10 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'संथाल परगना का अत्यंत लोकप्रिय सामूहिक खेल। सोहराय पर्व के बाद खेतों में लकड़ी के अर्धचंद्राकार डंडे से गोल चक्र को दूर से निशाना लगाया जाता है। इसमें दूरी मापन (कदमों की गिनती) और समूह जोड़ सीखा जाता है।',
    contentTribalScript: 'ᱠᱟᱹᱴᱤ ᱮᱱᱮᱡ ᱨᱮ ᱠᱟᱴ ᱨᱮᱭᱟᱜ ᱜᱩᱞᱟᱹᱭ ᱠᱚ ᱴᱷᱩᱠᱟᱹᱣᱟ᱾ ᱥᱟᱺᱜᱤᱧ ᱞᱮᱠᱷᱟ ᱟᱨ ᱡᱚᱲ ᱥᱮᱬᱟ ᱮᱫᱟ᱾',
    contentTribalRoman: 'Kati enej re kat reyag gulai ko thukawa. Sanginj lekha ar jod sena eda.',
    contentEnglish: 'A celebrated Santhal team sport where players strike circular wooden discs across open grounds, reinforcing step measurement and arithmetic tallying.',
    audioDurationSec: 600
  },
  {
    id: 'c19',
    titleHindi: 'कुल-मेरोम - बाघ और बकरी रणनीति बोर्ड खेल',
    titleTribal: 'कुल-मेरोम इनांग - मुंडारी खेल',
    titleEnglish: 'Kul-Merom - Tiger & Goats Spatial Board Game',
    subtitle: 'Traditional geometry and logic puzzle played on mud-etched village boards',
    language: 'Mundari',
    type: 'Game',
    duration: '7 min',
    colorTheme: 'orange',
    isDownloaded: true,
    contentHindi: 'जमीन पर ज्यामितीय रेखाएं खींचकर पत्थरों से खेला जाने वाला रणनीति खेल। चार बाघ और बीस बकरियों के बीच यह खेल बच्चों में स्थानिक समझ (Spatial Geometry), घटाव और तार्किक चिंतन को बढ़ाता है।',
    contentTribalScript: 'कुल ओन्दो मेरोम हातू रे ओते रे खूंट बेनाव केते इनुंग तना। बारिस मेरोम ओन्दो उपुन कुल रेन जोगाड़।',
    contentTribalRoman: 'Kul ondo merom hatu re ote re khunt benaw kete inung tana. Baris merom ondo upun kul ren jogad.',
    contentEnglish: 'An ancient Jharkhand checkering board game with four tigers and twenty goats, cultivating tactical geometry, subtraction, and strategic logic.',
    audioDurationSec: 420
  }
];

export const FLN_SKILLS: FLNSkillMetric[] = [
  {
    id: 'f1',
    name: 'Letter & Script Recognition',
    hindiName: 'अक्षर एवं लिपि पहचान (Ol Chiki / Warang Chiti / Devanagari)',
    category: 'literacy',
    averageScore: 68,
    targetBenchmark: 75,
    studentsAtGradeLevel: 4,
    totalStudents: 6
  },
  {
    id: 'f2',
    name: 'Oral Mother-Tongue Fluency',
    hindiName: 'मातृभाषा मौखिक प्रवाह (Ho, Mundari, Santhali)',
    category: 'literacy',
    averageScore: 82,
    targetBenchmark: 70,
    studentsAtGradeLevel: 5,
    totalStudents: 6
  },
  {
    id: 'f3',
    name: 'Hindi Bridge Vocabulary',
    hindiName: 'हिन्दी सेतु शब्दावली (Tribal-to-Hindi Transition)',
    category: 'literacy',
    averageScore: 54,
    targetBenchmark: 65,
    studentsAtGradeLevel: 2,
    totalStudents: 6
  },
  {
    id: 'f4',
    name: 'Number Sense 1-99',
    hindiName: 'संख्या ज्ञान 1 से 99 (द्विभाषी गणना)',
    category: 'numeracy',
    averageScore: 71,
    targetBenchmark: 75,
    studentsAtGradeLevel: 4,
    totalStudents: 6
  },
  {
    id: 'f5',
    name: 'Visual Operations (Addition/Subtraction)',
    hindiName: 'मूर्त संक्रियाएं (जोड़ व घटाव)',
    category: 'numeracy',
    averageScore: 61,
    targetBenchmark: 70,
    studentsAtGradeLevel: 3,
    totalStudents: 6
  }
];

export const MEMORY_BUDGET_METRICS: MemoryBudgetMetric[] = [
  {
    component: 'whisper.cpp (ASR Tiny INT8)',
    allocatedMb: 138,
    maxLimitMb: 180,
    status: 'optimal',
    description: 'Quantized acoustic model loaded directly via native C++ mmap. Bypasses JVM Heap.'
  },
  {
    component: 'CTranslate2 (NMT INT8 Engine)',
    allocatedMb: 184,
    maxLimitMb: 240,
    status: 'optimal',
    description: 'Hindi <-> Ho/Mundari/Santhali quantized transformer weights with KV caching.'
  },
  {
    component: 'Piper TTS (Offline Voice Synthesizer)',
    allocatedMb: 62,
    maxLimitMb: 90,
    status: 'optimal',
    description: 'On-device VITS-based acoustic synthesizer yielding natural indigenous prosody.'
  },
  {
    component: 'App Runtime & SQLite Database',
    allocatedMb: 76,
    maxLimitMb: 120,
    status: 'optimal',
    description: 'Cached student roster, offline worksheets, and audio assets inside native SQLite.'
  }
];

// Offline translation corpus for classroom instructions & FLN communication
export interface PhraseTranslation {
  hindi: string;
  english: string;
  category: string;
  translations: {
    Santhali: {
      script: string;
      scriptName: 'Ol Chiki' | 'Devanagari';
      romanized: string;
      devanagariPhonetic: string;
      audioHint: string;
    };
    Ho: {
      script: string;
      scriptName: 'Warang Chiti' | 'Devanagari';
      romanized: string;
      devanagariPhonetic: string;
      audioHint: string;
    };
    Mundari: {
      script: string;
      scriptName: 'Devanagari / Mundari Bani';
      romanized: string;
      devanagariPhonetic: string;
      audioHint: string;
    };
  };
}

export const CLASSROOM_PHRASES: PhraseTranslation[] = [
  {
    hindi: 'बच्चों, अपनी किताबें खोलो',
    english: 'Children, open your books',
    category: 'Instruction',
    translations: {
      Santhali: {
        script: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱩᱜᱽᱦᱟᱹᱣ ᱢᱮ',
        scriptName: 'Ol Chiki',
        romanized: 'Gidra ko, apeyag puthi ughaw me',
        devanagariPhonetic: 'गिदरा को, आपेयाग पुथी उग्हाव मे',
        audioHint: 'Direct classroom opening instruction'
      },
      Ho: {
        script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢡𑣂𑣁𑣜𑣂 𑢥𑣉𑣕𑣂 𑢵𑣂𑣓𑣂𑣑 𑢖𑣄𑣂',
        scriptName: 'Warang Chiti',
        romanized: 'Hon ko, apeya pothi ughao me',
        devanagariPhonetic: 'होन को, आपेया पोथी उघाओ मे',
        audioHint: 'Clear, gentle vocal cadence'
      },
      Mundari: {
        script: 'होन्को, आपेया पुथी निड़ाएपे',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Honko, apeya puthi niraepe',
        devanagariPhonetic: 'होन्को, आपेया पुथी निड़ाएपे',
        audioHint: 'Standard Mundari classroom directive'
      }
    }
  },
  {
    hindi: 'आज हम गिनती 1 से 10 तक सीखेंगे',
    english: 'Today we will learn counting 1 to 10',
    category: 'Numeracy',
    translations: {
      Santhali: {
        script: 'ᱛᱮᱦᱮᱧ ᱫᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ',
        scriptName: 'Ol Chiki',
        romanized: 'Tehenj do mid khon gel habij lekha bon chedog-a',
        devanagariPhonetic: 'तेहेंज दो मिद खोन गेल हाबीज लेखा बोन चेदोग-आ',
        audioHint: 'Count: Mit, Bar, Pe, Pun, More, Turui, Eya, Iril, Are, Gel'
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢖𑣂𑣑 𑢷𑣂𑣑 𑢡𑣂 𑢵𑣂𑣓𑣂𑣑 𑢥𑣂𑣁 𑢱𑣂',
        scriptName: 'Warang Chiti',
        romanized: 'Tisin bu miyad ete gel lekha eto-a',
        devanagariPhonetic: 'तिसिन बु मियाद एते गेल लेखा एतो-आ',
        audioHint: 'Count: Miyad, Bariyad, Apeyad, Upuniyad, Moyad'
      },
      Mundari: {
        script: 'तिसिंग अले मियाद एते गेल लेके लेखा इतुन-आ',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Tising ale miyad ete gel leke lekha itun-a',
        devanagariPhonetic: 'तिसिंग अले मियाद एते गेल लेके लेखा इतुन-आ',
        audioHint: 'Foundational numeracy chant'
      }
    }
  },
  {
    hindi: 'शाबाश! बहुत अच्छा उत्तर दिया',
    english: 'Well done! Very good answer',
    category: 'Encouragement',
    translations: {
      Santhali: {
        script: 'ᱵᱮᱥ ᱩᱛᱟᱹᱨ! ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱨᱚᱲ ᱠᱮᱫᱼᱟᱢ',
        scriptName: 'Ol Chiki',
        romanized: 'Bes utar! Adi napay ror ked-am',
        devanagariPhonetic: 'बेस उतार! आदि नापाय रोड़ केद-आम',
        audioHint: 'Warm affirmative tone'
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢯𑣃𑣜𑣂𑣑 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
        scriptName: 'Warang Chiti',
        romanized: 'Bugite! Adi bugin kaji kedam',
        devanagariPhonetic: 'बुगिते! आदि बुगिन काजि केदाम',
        audioHint: 'High praise in Ho'
      },
      Mundari: {
        script: 'बुगीते! आदि बोगिन काजी ताना',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Bugite! Adi bogin kaji tana',
        devanagariPhonetic: 'बुगीते! आदि बोगिन काजी ताना',
        audioHint: 'Positive reinforcement'
      }
    }
  },
  {
    hindi: 'क्या तुम्हें पानी पीने जाना है?',
    english: 'Do you want to drink water?',
    category: 'Care',
    translations: {
      Santhali: {
        script: 'ᱪᱮᱫ ᱟᱢ ᱫᱟᱜ ᱧᱩ ᱥᱟᱱᱟᱭᱮᱫ ᱢᱮᱭᱟ?',
        scriptName: 'Ol Chiki',
        romanized: 'Ched am daak nu sanayed meya?',
        devanagariPhonetic: 'चेद आम दाक नू सानायेद मेया?',
        audioHint: 'Gentle inquiry'
      },
      Ho: {
        script: '𑢡𑣂𑣁𑣜𑣂 𑢑𑣁𑣄 𑢓𑣃𑣁𑣑 𑢖𑣄𑣂',
        scriptName: 'Warang Chiti',
        romanized: 'Chikan am daak nuyte sena-a?',
        devanagariPhonetic: 'चिकन आम दाक नुयते सेना-आ?',
        audioHint: 'Basic student need'
      },
      Mundari: {
        script: 'चि आम दाः नुएते सेनाम?',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Chi am daah nue te senam?',
        devanagariPhonetic: 'चि आम दाः नुएते सेनाम?',
        audioHint: 'Compassionate question'
      }
    }
  },
  {
    hindi: 'श्यामपट्ट (ब्लैकबोर्ड) की तरफ देखो',
    english: 'Look towards the blackboard',
    category: 'Instruction',
    translations: {
      Santhali: {
        script: 'ᱠᱟᱞᱟ ᱯᱟᱴᱟ ᱥᱮᱫ ᱠᱚᱭᱚᱜᱽ ᱢᱮ',
        scriptName: 'Ol Chiki',
        romanized: 'Kala pata sed koyog me',
        devanagariPhonetic: 'काला पाटा सेद कोयॉग मे',
        audioHint: 'Direct eye contact directive'
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣉𑣜𑣑 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
        scriptName: 'Warang Chiti',
        romanized: 'Hende board saing nel me',
        devanagariPhonetic: 'हेंडे बोर्ड साइंग नेल मे',
        audioHint: 'Classroom focus instruction'
      },
      Mundari: {
        script: 'हेंदे पाता साः नेलेपे',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Hende pata sah nelepe',
        devanagariPhonetic: 'हेंदे पाता साः नेलेपे',
        audioHint: 'Visual attention call'
      }
    }
  },
  {
    hindi: 'कृपया ध्यान से सुनो और मेरे बाद दोहराओ',
    english: 'Please listen carefully and repeat after me',
    category: 'Literacy',
    translations: {
      Santhali: {
        script: 'ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ ᱟᱨ ᱤᱧ ᱛᱟᱭᱚᱢ ᱨᱚᱲ ᱢᱮ',
        scriptName: 'Ol Chiki',
        romanized: 'Dheyan te anjom me ar inj tayom ror me',
        devanagariPhonetic: 'धेयान ते आंजोम मे आर इंज तायोम रोड़ मे',
        audioHint: 'Choral repetition exercise'
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑 𑢱𑣂𑣁𑣓𑣉𑣁',
        scriptName: 'Warang Chiti',
        romanized: 'Bugi leka ayum me odo aing tayom kaji me',
        devanagariPhonetic: 'बुगि लेका आयूम मे ओदो आइंग तायोम काजि मे',
        audioHint: 'Oral foundational phonics'
      },
      Mundari: {
        script: 'बुगीते आयुमेपे आन्दो आईंग तायोम कजीपे',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Bugite ayumepe ando aing tayom kajipe',
        devanagariPhonetic: 'बुगीते आयुमेपे आन्दो आईंग तायोम कजीपे',
        audioHint: 'Language acquisition drill'
      }
    }
  },
  {
    hindi: 'अपना गृहकार्य (होमवर्क) दिखाओ',
    english: 'Show your homework',
    category: 'Assessment',
    translations: {
      Santhali: {
        script: 'ᱟᱢᱟᱜ ᱚᱲᱟᱜ ᱠᱟᱹᱢᱤ ᱩᱫᱩᱜ ᱢᱮ',
        scriptName: 'Ol Chiki',
        romanized: 'Amag orag kami udug me',
        devanagariPhonetic: 'आमाग ओड़ाग कामी उदुग मे',
        audioHint: 'Daily check-in'
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑 𑢥𑣉𑣕𑣂',
        scriptName: 'Warang Chiti',
        romanized: 'Ama ora kami nel-rikaing me',
        devanagariPhonetic: 'आमा ओड़ा कामी नेल-रिकाईंग मे',
        audioHint: 'Checking FLN tasks'
      },
      Mundari: {
        script: 'आमा ओड़ाः कामी नेल-रिकाएमे',
        scriptName: 'Devanagari / Mundari Bani',
        romanized: 'Ama odaah kami nel-rikaeme',
        devanagariPhonetic: 'आमा ओड़ाः कामी नेल-रिकाएमे',
        audioHint: 'Homework inspection'
      }
    }
  }
];

export const TRIBAL_DICTIONARY: Record<string, { Santhali: string; Ho: string; Mundari: string }> = {
  'नमस्ते': { Santhali: 'ᱡᱚᱦᱟᱨ (Johar)', Ho: '𑢹𑣉𑣉 𑢡𑣂 (Johar)', Mundari: 'जोहार (Johar)' },
  'धन्यवाद': { Santhali: 'ᱥᱟᱨᱦᱟᱣ (Sarhaw)', Ho: '𑢷𑣁𑣜𑣂 (Sarhaw)', Mundari: 'सराहाओ (Sarhao)' },
  'पानी': { Santhali: 'ᱫᱟᱜ (Daak)', Ho: '𑢑𑣁𑣄 (Daak)', Mundari: 'दाः (Daah)' },
  'किताब': { Santhali: 'ᱯᱩᱛᱷᱤ (Puthi)', Ho: '𑢥𑣉𑣕𑣂 (Pothi)', Mundari: 'पुथी (Puthi)' },
  'पेड़': { Santhali: 'ᱫᱟᱨᱮ (Dare)', Ho: '𑢑𑣁𑣜𑣂 (Dare)', Mundari: 'दारे (Dare)' },
  'घर': { Santhali: 'ᱚᱲᱟᱜ (Orag)', Ho: '𑢵𑣜𑣁 (Ora)', Mundari: 'ओड़ाः (Odaah)' },
  'एक': { Santhali: 'ᱢᱤᱫ (Mit)', Ho: '𑢖𑣂𑣑 (Miyad)', Mundari: 'मियाद (Miyad)' },
  'दो': { Santhali: 'ᱵᱟᱨ (Bar)', Ho: '𑢡𑣂𑣁𑣜𑣂 (Bariya)', Mundari: 'बारिया (Bariya)' },
  'तीन': { Santhali: 'ᱯᱮ (Pe)', Ho: '𑢥𑣂𑣁 (Apia)', Mundari: 'आपिया (Apiya)' },
  'चार': { Santhali: 'ᱯᱩᱱ (Pun)', Ho: '𑢥𑣃𑣓 (Upuniya)', Mundari: 'उपूनिया (Upuniya)' },
  'पांच': { Santhali: 'ᱢᱚᱬᱮ (More)', Ho: '𑢖𑣉𑣜𑣂 (Moyad)', Mundari: 'मोड़े (Mode)' }
};
