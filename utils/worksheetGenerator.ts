import { TribalLanguage, WorksheetItem } from '../types';
import { translateToTribal } from './translatorEngine';

export type TopicDomain = 
  | 'wildlife' 
  | 'market' 
  | 'festivals' 
  | 'classroom' 
  | 'body' 
  | 'numeracy' 
  | 'instruments' 
  | 'shapes' 
  | 'custom';

export interface TracingItem {
  glyph: string;
  name: string;
  pronunciation: string;
  hindiMeaning: string;
  strokeHint: string;
}

export interface MatchingPair {
  icon: string;
  tribalText: string;
  romanText: string;
  hindiText: string;
  englishText: string;
}

export interface CountingItem {
  icon: string;
  repeatCount: number;
  itemNameHindi: string;
  itemNameTribal: string;
  numeralExpected: number;
  tribalNumeral: string;
  questionPrompt?: string;
}

export interface ClozeItem {
  sentenceWithBlank: string;
  blankAnswer: string;
  hintHindi: string;
  options: string[];
}

export interface GeneratedWorksheetContent {
  domain: TopicDomain;
  domainLabel: string;
  domainLabelHindi: string;
  section1Title: string;
  section1Instructions: string;
  tracingItems: TracingItem[];
  section2Title: string;
  section2Instructions: string;
  matchingPairs: MatchingPair[];
  section3Title: string;
  section3Instructions: string;
  countingItems: CountingItem[];
  section4Title?: string;
  section4Instructions?: string;
  clozeItems?: ClozeItem[];
  drawingPrompt?: string;
  marketMathProblem?: {
    scenario: string;
    scenarioHindi: string;
    items: Array<{ name: string; price: number; icon: string }>;
    question: string;
    answer: string;
  };
}

export interface PresetTopicConfig {
  id: string;
  title: string;
  titleHindi: string;
  domain: TopicDomain;
  category: 'Ecology' | 'Market & Math' | 'Culture & Festivals' | 'Daily Life' | 'Numeracy';
  suggestedGrade: 'Grade 1' | 'Grade 2' | 'Grade 3';
  suggestedSubject: 'Literacy' | 'Numeracy';
  description: string;
}

export const PRESET_WORKSHEET_TOPICS: PresetTopicConfig[] = [
  {
    id: 'pt-forest-animals',
    title: 'Saranda Forest Animals & Wildlife Phonics',
    titleHindi: 'सारंडा वन के वन्यजीव एवं ध्वनि अभ्यास',
    domain: 'wildlife',
    category: 'Ecology',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Literacy',
    description: 'Explore tiger, peacock, elephant, deer and rabbit vocabulary with script letter strokes'
  },
  {
    id: 'pt-sal-trees',
    title: 'Sacred Sal & Mahua Forest Botany & Counting',
    titleHindi: 'सखुआ (साल) एवं महुआ वृक्ष प्रकृति गणना',
    domain: 'wildlife',
    category: 'Ecology',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Numeracy',
    description: 'Count sal leaves, mahua flowers, and seed pods (1-10) with tribal number names'
  },
  {
    id: 'pt-haat-bazaar-math',
    title: 'Weekly Haat-Bazaar Vegetable Arithmetic',
    titleHindi: 'साप्ताहिक हाट-बाजार सब्जी खरीद एवं जोड़',
    domain: 'market',
    category: 'Market & Math',
    suggestedGrade: 'Grade 2',
    suggestedSubject: 'Numeracy',
    description: 'Real-life market transactions with potatoes, brinjals, tomatoes, and rupee currency'
  },
  {
    id: 'pt-village-fruits',
    title: 'Village Orchard Fruits & Grouping in 5s',
    titleHindi: 'गांव के बगीचे के फल एवं ५-५ के समूह में गणना',
    domain: 'market',
    category: 'Market & Math',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Numeracy',
    description: 'Count and group mangoes, guavas, and jujube (ber) fruits with tribal script labels'
  },
  {
    id: 'pt-sarhul-baha',
    title: 'Sarhul / Baha Festival Spring Blossoms & Song',
    titleHindi: 'सरहुल / बाहा पर्व साल फूल एवं प्रकृति गीत',
    domain: 'festivals',
    category: 'Culture & Festivals',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Literacy',
    description: 'Sacred grove (Jaher / Desauli), white sal blossom tracing, and festival vocabulary'
  },
  {
    id: 'pt-sohrai-cattle',
    title: 'Sohrai Cattle Festival Patterns & Wall Art',
    titleHindi: 'सोहराय पशु वंदना एवं सोहराय भित्ति चित्रकला',
    domain: 'festivals',
    category: 'Culture & Festivals',
    suggestedGrade: 'Grade 2',
    suggestedSubject: 'Literacy',
    description: 'Traditional wall painting geometric motifs, cow adornments, and harvest thanksgiving words'
  },
  {
    id: 'pt-karam-sprouts',
    title: 'Karam Festival Jawar Sprout Rhythm & Cloze',
    titleHindi: 'करम पूजा जवा अंकुरण एवं लोककथा रिक्त स्थान',
    domain: 'festivals',
    category: 'Culture & Festivals',
    suggestedGrade: 'Grade 2',
    suggestedSubject: 'Literacy',
    description: 'Paddy germination, fraternal solidarity folklore, and connected sentence cloze'
  },
  {
    id: 'pt-musical-instruments',
    title: 'Mandar, Tamak & Rutu Tribal Instrument Math',
    titleHindi: 'मांदर, टमाक एवं रुतु वाद्ययंत्र ताल और गणना',
    domain: 'instruments',
    category: 'Culture & Festivals',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Numeracy',
    description: 'Count festive drum beats, bamboo flutes, and brass cymbals in traditional rhythm'
  },
  {
    id: 'pt-body-parts',
    title: 'My Body & Healthy Habits in Mother Tongue',
    titleHindi: 'हमारा शरीर एवं स्वस्थ आदतें (अंगों के नाम)',
    domain: 'body',
    category: 'Daily Life',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Literacy',
    description: 'Identify eyes, ears, hands, and feet in tribal scripts with hygiene routines'
  },
  {
    id: 'pt-classroom-actions',
    title: 'Classroom Daily Routines & Action Verbs',
    titleHindi: 'कक्षा के दैनिक निर्देश एवं क्रिया शब्द (Action Words)',
    domain: 'classroom',
    category: 'Daily Life',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Literacy',
    description: 'Read, write, count, sit, stand, and drink water in bilingual classroom interaction'
  },
  {
    id: 'pt-family-kinship',
    title: 'Our Family, Village (Hatu/Ato) & Kinship',
    titleHindi: 'हमारा परिवार, गांव और रिश्ते-नाते',
    domain: 'classroom',
    category: 'Daily Life',
    suggestedGrade: 'Grade 2',
    suggestedSubject: 'Literacy',
    description: 'Mother, father, grandparents, and village elders in mother tongue respect forms'
  },
  {
    id: 'pt-shapes-wall-art',
    title: 'Tribal Geometric Shapes & Pottery Patterns',
    titleHindi: 'पारंपरिक ज्यामितीय आकृतियां एवं मिट्टी के बर्तन',
    domain: 'shapes',
    category: 'Numeracy',
    suggestedGrade: 'Grade 2',
    suggestedSubject: 'Numeracy',
    description: 'Circles, triangles, symmetry, and geometric patterns in earthen pots and village huts'
  },
  {
    id: 'pt-archery-distance',
    title: 'Saranda Archery Distance & Mental Arithmetic',
    titleHindi: 'सारंडा पारंपरिक तीरंदाजी दूरी एवं मानसिक गणित',
    domain: 'numeracy',
    category: 'Numeracy',
    suggestedGrade: 'Grade 3',
    suggestedSubject: 'Numeracy',
    description: 'Multi-step arrow counting, distance estimation in paces (Kadam), and subtraction'
  },
  {
    id: 'pt-river-word-problems',
    title: 'Subarnarekha River Fishing & Word Problems',
    titleHindi: 'सुवर्णरेखा नदी मछली पकड़ना एवं इबारती सवाल',
    domain: 'numeracy',
    category: 'Numeracy',
    suggestedGrade: 'Grade 3',
    suggestedSubject: 'Numeracy',
    description: 'Story word problems with fish baskets, boats, and river crossings'
  },
  {
    id: 'pt-olchiki-vowels',
    title: 'Ol Chiki Alphabet Foundational Vowels (ᱚ ᱛ ᱜ ᱝ)',
    titleHindi: 'ओल चिकी वर्णमाला बुनियादी स्वर एवं व्यंजन',
    domain: 'wildlife',
    category: 'Ecology',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Literacy',
    description: 'Stroke order tracing for beginner Santhali learners with phonetic mouth shapes'
  },
  {
    id: 'pt-warang-consonants',
    title: 'Warang Chiti Letter Foundations (𑢹 𑢶 𑢱 𑢷)',
    titleHindi: 'वरंग क्षिति वर्ण अभ्यास (हो भाषा)',
    domain: 'classroom',
    category: 'Daily Life',
    suggestedGrade: 'Grade 1',
    suggestedSubject: 'Literacy',
    description: 'Foundational consonant tracing with directional arrow strokes for Ho language'
  }
];

export function detectDomainFromWorksheet(ws: WorksheetItem): TopicDomain {
  if (ws.topicDomain) return ws.topicDomain;

  const t = (ws.title + ' ' + (ws.titleHindi || '') + ' ' + ws.description).toLowerCase();

  if (t.includes('bazaar') || t.includes('market') || t.includes('हाट') || t.includes('सब्जी') || t.includes('rupee') || t.includes('vegetable') || t.includes('fruit') || t.includes('फल')) {
    return 'market';
  }
  if (t.includes('sarhul') || t.includes('sohrai') || t.includes('karam') || t.includes('baha') || t.includes('parab') || t.includes('festival') || t.includes('पर्व') || t.includes('त्योहार')) {
    return 'festivals';
  }
  if (t.includes('mandar') || t.includes('drum') || t.includes('tamak') || t.includes('rutu') || t.includes('flute') || t.includes('वाद्य') || t.includes('मांदर')) {
    return 'instruments';
  }
  if (t.includes('body') || t.includes('अंग') || t.includes('शरीर') || t.includes('eye') || t.includes('hand') || t.includes('habit') || t.includes('swasth')) {
    return 'body';
  }
  if (t.includes('class') || t.includes('routine') || t.includes('action') || t.includes('कक्षा') || t.includes('क्रिया') || t.includes('निर्देश') || t.includes('family') || t.includes('परिवार')) {
    return 'classroom';
  }
  if (t.includes('shape') || t.includes('geometry') || t.includes('आकृति') || t.includes('चित्रकला') || t.includes('wall')) {
    return 'shapes';
  }
  if (t.includes('numer') || t.includes('count') || t.includes('math') || t.includes('संख्या') || t.includes('गणना') || t.includes('जोड़') || t.includes('घटाव') || t.includes('archery') || t.includes('तीरंदाजी')) {
    return 'numeracy';
  }
  return 'wildlife';
}

/**
 * Generate full dynamic, topic-specific exercises tailored for Ho, Mundari, or Santhali.
 */
export function generateDynamicWorksheetContent(
  ws: WorksheetItem, 
  variantOffset = 0
): GeneratedWorksheetContent {
  const lang: TribalLanguage = ws.languages[0] || 'Santhali';
  const isHo = lang === 'Ho';
  const isMundari = lang === 'Mundari';
  const isSanthali = lang === 'Santhali';
  const isMath = ws.subject === 'Numeracy' || ws.type === 'math-visual';
  const domain = detectDomainFromWorksheet(ws);

  const rotateArray = <T,>(arr: T[], offset: number): T[] => {
    if (!Array.isArray(arr) || arr.length <= 1 || offset === 0) return arr || [];
    const k = offset % arr.length;
    return [...arr.slice(k), ...arr.slice(0, k)];
  };

  const getTribalNumeral = (num: number, targetLang: TribalLanguage): string => {
    const hoDigits = ['𑣐', '𑣑', '𑣡', '𑣁', '𑣂', '𑣖', '𑣗', '𑣘', '𑣙', '𑣇', '𑣈'];
    const munDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'];
    const sanDigits = ['᱐', '᱑', '᱒', '᱓', '᱔', '᱕', '᱖', '᱗', '᱘', '᱙', '᱑᱐'];
    if (num >= 0 && num <= 10) {
      return targetLang === 'Ho' ? hoDigits[num] : targetLang === 'Mundari' ? munDigits[num] : sanDigits[num];
    }
    return String(num);
  };

  const defaultScriptGlyphs: Record<TribalLanguage, TracingItem[]> = {
    Ho: [
      { glyph: '𑢹', name: 'Hoo', pronunciation: 'Ho', hindiMeaning: 'हो वर्ण', strokeHint: 'ऊपर से सीधा मोड़' },
      { glyph: '𑢶', name: 'Maa', pronunciation: 'Ma', hindiMeaning: 'म वर्ण', strokeHint: 'वक्राकार घुमाव' },
      { glyph: '𑢱', name: 'Kaa', pronunciation: 'Ka', hindiMeaning: 'क वर्ण', strokeHint: 'गोला बनाकर नीचे' },
      { glyph: '𑢯', name: 'Saa', pronunciation: 'Sa', hindiMeaning: 'स वर्ण', strokeHint: 'खड़ी रेखा पर जोड़' }
    ],
    Mundari: [
      { glyph: 'अ', name: 'A', pronunciation: 'A', hindiMeaning: 'अ वर्ण', strokeHint: 'उ बनाकर आड़ी रेखा' },
      { glyph: 'स', name: 'Sa', pronunciation: 'Sa', hindiMeaning: 'स वर्ण', strokeHint: 'र बनाकर बीच से जोड़ें' },
      { glyph: 'द', name: 'Da', pronunciation: 'Da', hindiMeaning: 'द वर्ण', strokeHint: 'ट बनाकर मोड़ें' },
      { glyph: 'म', name: 'Ma', pronunciation: 'Ma', hindiMeaning: 'म वर्ण', strokeHint: 'खड़ी और आड़ी रेखा' }
    ],
    Santhali: [
      { glyph: 'ᱚ', name: 'La', pronunciation: 'O', hindiMeaning: 'ᱚ (ल)', strokeHint: 'ᱚᱞ ᱪᱤᱠᱤ ᱯᱩᱭᱞᱩ' },
      { glyph: 'ᱛ', name: 'Ot', pronunciation: 'Ta', hindiMeaning: 'ᱛ (त)', strokeHint: 'ᱛᱟᱹᱨᱩᱵ ᱪᱤᱠᱤ' },
      { glyph: 'ᱜ', name: 'Ag', pronunciation: 'Ga', hindiMeaning: 'ᱜ (ग)', strokeHint: 'ᱜᱟᱹᱭ ᱪᱤᱠᱤ ᱚᱞ' },
      { glyph: 'ᱢ', name: 'Am', pronunciation: 'Ma', hindiMeaning: 'ᱢ (म)', strokeHint: 'ᱢᱟᱨᱟᱜ ᱪᱤᱠᱤ' }
    ]
  };

  // If ws has an AI-generated or Search-Grounded customExercisePayload, render it dynamically and translate to target `lang`!
  if (ws.customExercisePayload) {
    const payload = ws.customExercisePayload;
    if (Array.isArray(payload.tracingItems) && Array.isArray(payload.matchingPairs) && Array.isArray(payload.countingItems)) {
      const translatedPairs: MatchingPair[] = payload.matchingPairs.map((p: MatchingPair) => {
        const cleanHindi = (p.hindiText || '').replace(/\s*\([^)]*\)/g, '').trim();
        const tr = translateToTribal(cleanHindi || p.englishText || p.romanText, 'Hindi', lang);
        return {
          ...p,
          tribalText: `${tr.script} (${tr.romanized})`,
          romanText: tr.romanized,
        };
      });

      const translatedCounting: CountingItem[] = payload.countingItems.map((c: CountingItem, i: number) => {
        const adjustedCount = variantOffset === 0 ? c.repeatCount : ((c.repeatCount + variantOffset + i) % 6) + 2;
        const baseEmoji = (c.icon || '🌿').trim().split(/\s+/)[0] || '🌿';
        const cleanHindi = (c.itemNameHindi || '').replace(/\s*\([^)]*\)/g, '').trim();
        const tr = translateToTribal(cleanHindi, 'Hindi', lang);
        return {
          ...c,
          repeatCount: adjustedCount,
          icon: Array(adjustedCount).fill(baseEmoji).join(' '),
          itemNameTribal: `${tr.script} (${tr.romanized})`,
          numeralExpected: adjustedCount,
          tribalNumeral: getTribalNumeral(adjustedCount, lang),
        };
      });

      return {
        ...payload,
        tracingItems: rotateArray(defaultScriptGlyphs[lang], variantOffset),
        matchingPairs: rotateArray(translatedPairs, variantOffset),
        countingItems: translatedCounting,
      };
    }

    // Grounded search payload conversion ({ exercises, mathContext, culturalContext, topic })
    if (Array.isArray(payload.exercises) && payload.exercises.length > 0) {
      const icons = ['🌿', '🧺', '🌳', '🏺', '🌾', '🦚'];
      const pairs: MatchingPair[] = payload.exercises.slice(0, 4).map((ex: any, idx: number) => {
        const cleanHindi = (ex.hindi || '').replace(/\s*\([^)]*\)/g, '').trim();
        const tr = translateToTribal(cleanHindi || ex.meaningEn || '', 'Hindi', lang);
        return {
          icon: ex.icon || icons[idx % icons.length],
          tribalText: `${tr.script || ex.tribalScript || ''} (${tr.romanized || ex.tribalRoman || ''})`,
          romanText: tr.romanized || ex.tribalRoman || ex.phonetic || '',
          hindiText: `${ex.hindi || ''} (${ex.meaningEn || ''})`,
          englishText: ex.meaningEn || '',
        };
      });

      const counting: CountingItem[] = pairs.slice(0, 3).map((p, idx) => {
        const count = ((idx + 3 + variantOffset) % 5) + 2;
        return {
          icon: Array(count).fill(p.icon).join(' '),
          repeatCount: count,
          itemNameHindi: p.hindiText,
          itemNameTribal: p.tribalText,
          numeralExpected: count,
          tribalNumeral: getTribalNumeral(count, lang),
        };
      });

      return {
        domain: (payload.domain as TopicDomain) || domain,
        domainLabel: payload.topic || ws.title,
        domainLabelHindi: ws.titleHindi || payload.topic || 'संदर्भ आधारित अभ्यास',
        section1Title: `अभ्यास १: ${lang} लिपि एवं ध्वनि अभ्यास (Script & Phoneme Tracing)`,
        section1Instructions: 'नीचे दिए गए अक्षरों को पेंसिल से ३ बार ट्रेस करें और उच्चारण करें:',
        tracingItems: rotateArray(defaultScriptGlyphs[lang], variantOffset),
        section2Title: `अभ्यास २: स्थानीय शब्दावली मिलान (${payload.topic || ws.title})`,
        section2Instructions: 'चित्र और आदिवासी शब्द को उसके सही हिन्दी अर्थ से रेखा खींचकर मिलाएं:',
        matchingPairs: rotateArray(pairs, variantOffset),
        section3Title: 'अभ्यास ३: स्थानीय वस्तुओं की गणना (Contextual Visual Counting)',
        section3Instructions: 'वस्तुओं को गिनें और कोष्ठक में सही संख्या लिखें:',
        countingItems: counting,
        section4Title: 'अभ्यास ४: व्यावहारिक संदर्भ प्रश्न (Contextual Problem & Cloze)',
        marketMathProblem: payload.mathContext
          ? {
              scenario: payload.mathContext.problem,
              scenarioHindi: payload.culturalContext || payload.mathContext.problem,
              items: pairs.slice(0, 2).map((p, i) => ({
                name: p.hindiText,
                price: (i + 1) * 10 + variantOffset * 5,
                icon: p.icon,
              })),
              question: payload.mathContext.problem,
              answer: payload.mathContext.answer || '',
            }
          : undefined,
        drawingPrompt: `यहां "${payload.topic || ws.title}" का सुंदर चित्र बनाएं और मातृभाषा में नाम लिखें`,
      };
    }
  }

  // -------------------------------------------------------------
  // 1. MARKET & BAZAAR DOMAIN
  // -------------------------------------------------------------
  if (domain === 'market') {
    const marketPairs: Record<TribalLanguage, MatchingPair[]> = {
      Ho: [
        { icon: '🥔', tribalText: '𑢡𑣚𑣃 (Alu)', romanText: 'Alu', hindiText: 'आलू (Potato)', englishText: 'Potato' },
        { icon: '🧅', tribalText: '𑢷𑣂𑢷𑣁𑣓 (Piyan)', romanText: 'Piyan', hindiText: 'प्याज (Onion)', englishText: 'Onion' },
        { icon: '🍆', tribalText: '𑢡𑣂𑢱𑣉 (Benga)', romanText: 'Benga', hindiText: 'बैंगन (Brinjal)', englishText: 'Brinjal' },
        { icon: '🥭', tribalText: '𑢡𑣃𑣚𑣂 (Uli)', romanText: 'Uli', hindiText: 'आम (Mango)', englishText: 'Mango' }
      ],
      Mundari: [
        { icon: '🥔', tribalText: 'आलू (Alu)', romanText: 'Alu', hindiText: 'आलू (Potato)', englishText: 'Potato' },
        { icon: '🧅', tribalText: 'पियाज (Piyaj)', romanText: 'Piyaj', hindiText: 'प्याज (Onion)', englishText: 'Onion' },
        { icon: '🍆', tribalText: 'बेंगड़ा (Benga)', romanText: 'Benga', hindiText: 'बैंगन (Eggplant)', englishText: 'Eggplant' },
        { icon: '🥭', tribalText: 'ऊली (Uli)', romanText: 'Uli', hindiText: 'आम (Mango)', englishText: 'Mango' }
      ],
      Santhali: [
        { icon: '🥔', tribalText: 'ᱟᱹᱞᱩ (Alu)', romanText: 'Alu', hindiText: 'आलू (Potato)', englishText: 'Potato' },
        { icon: '🧅', tribalText: 'ᱯᱮᱭᱟᱸᱡᱽ (Peyanj)', romanText: 'Peyanj', hindiText: 'प्याज (Onion)', englishText: 'Onion' },
        { icon: '🍆', tribalText: 'ᱵᱮᱸᱜᱟᱲ (Bengar)', romanText: 'Bengar', hindiText: 'बैंगन (Brinjal)', englishText: 'Brinjal' },
        { icon: '🥭', tribalText: 'ᱩᱞ (Ul)', romanText: 'Ul', hindiText: 'आम (Mango)', englishText: 'Mango' }
      ]
    };

    const tracingNumerals: Record<TribalLanguage, TracingItem[]> = {
      Ho: [
        { glyph: '𑣖', name: 'Mone', pronunciation: 'Five', hindiMeaning: '५ (पाँच रु.)', strokeHint: 'शीर्ष से वक्र नीचे' },
        { glyph: '𑣗', name: 'Turui', pronunciation: 'Six', hindiMeaning: '६ (छह रु.)', strokeHint: 'दाएं से घुमाव' },
        { glyph: '𑣘', name: 'Eya', pronunciation: 'Seven', hindiMeaning: '७ (सात रु.)', strokeHint: 'खड़ी रेखा एवं वर्तुल' },
        { glyph: '𑣈', name: 'Gele', pronunciation: 'Ten', hindiMeaning: '१० (दस रु. का सिक्का)', strokeHint: 'पूर्ण दस का अंक' }
      ],
      Mundari: [
        { glyph: '५', name: 'Morea', pronunciation: 'Morea', hindiMeaning: '५ (पाँच)', strokeHint: 'ऊपर से मोड़कर नीचे' },
        { glyph: '६', name: 'Turuiya', pronunciation: 'Turuiya', hindiMeaning: '६ (छह)', strokeHint: 'दायां गोला बनाकर' },
        { glyph: '७', name: 'Eya', pronunciation: 'Eya', hindiMeaning: '७ (सात)', strokeHint: 'घुमावदार रेखा' },
        { glyph: '१०', name: 'Gelea', pronunciation: 'Gelea', hindiMeaning: '१० (दस)', strokeHint: 'एक और शून्य' }
      ],
      Santhali: [
        { glyph: '᱕', name: 'Mone', pronunciation: 'Mone', hindiMeaning: '५ (पाँच)', strokeHint: 'ᱢᱚᱬᱮ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: '᱖', name: 'Turui', pronunciation: 'Turui', hindiMeaning: '६ (छह)', strokeHint: 'ᱛᱩᱨᱩᱭ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: '᱗', name: 'Eyae', pronunciation: 'Eyae', hindiMeaning: '७ (सात)', strokeHint: 'ᱮᱭᱟᱭ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: '᱑᱐', name: 'Gel', pronunciation: 'Gel', hindiMeaning: '१० (दस)', strokeHint: 'ᱜᱮᱞ ᱪᱤᱠᱤ ᱚᱞ' }
      ]
    };

    return {
      domain: 'market',
      domainLabel: 'Weekly Haat-Bazaar Math',
      domainLabelHindi: 'साप्ताहिक हाट-बाजार अंकगणित',
      section1Title: 'अभ्यास १: हाट-बाजार मुद्रा एवं संख्या ट्रेसिंग (Market Currency & Numeral Tracing)',
      section1Instructions: 'सिक्कों के मान पहचानें और दिए गए अंकों को पेंसिल से ३ बार ट्रेस करें (Trace each numeral 3 times):',
      tracingItems: tracingNumerals[lang],
      section2Title: 'अभ्यास २: बाजार की सब्जियों का मातृभाषा-हिन्दी मिलान (Bilingual Vegetable Matching)',
      section2Instructions: 'चित्र को पहचान कर सही नाम से रेखा खींचकर मिलाएं (Draw lines connecting picture to words):',
      matchingPairs: marketPairs[lang],
      section3Title: 'अभ्यास ३: हाट में खरीदारी की गणना (Haat Shopping Basket Count & Addition)',
      section3Instructions: 'टोकरी में रखी वस्तुओं को गिनें और कुल संख्या लिखें (Count the items in each basket):',
      countingItems: [
        {
          icon: '🥔',
          repeatCount: 4 + (variantOffset % 3),
          itemNameHindi: 'आलू (Potatoes)',
          itemNameTribal: isHo ? '𑢡𑣚𑣃' : isMundari ? 'आलू' : 'ᱟᱹᱞᱩ',
          numeralExpected: 4 + (variantOffset % 3),
          tribalNumeral: isHo ? '𑣂' : isMundari ? '४' : '᱔'
        },
        {
          icon: '🍆',
          repeatCount: 6,
          itemNameHindi: 'बैंगन (Brinjals)',
          itemNameTribal: isHo ? '𑢡𑣂𑢱𑣉' : isMundari ? 'बेंगड़ा' : 'ᱵᱮᱸᱜᱟᱲ',
          numeralExpected: 6,
          tribalNumeral: isHo ? '𑣗' : isMundari ? '६' : '᱖'
        },
        {
          icon: '🥭',
          repeatCount: 3 + (variantOffset % 2),
          itemNameHindi: 'पके आम (Ripe Mangoes)',
          itemNameTribal: isHo ? '𑢡𑣃𑣚𑣂' : isMundari ? 'ऊली' : 'ᱩᱞ',
          numeralExpected: 3 + (variantOffset % 2),
          tribalNumeral: isHo ? '𑣁' : isMundari ? '३' : '᱓'
        }
      ],
      section4Title: 'अभ्यास ४: हाट-बाजार का इबारती प्रश्न (Haat Word Problem & Bill Calculation)',
      section4Instructions: 'प्रश्न को ध्यान से पढ़ें और जोड़कर उत्तर लिखें (Solve the word problem):',
      marketMathProblem: {
        scenario: 'बिरसा हाट-बाजार गया। उसने ₹५ का आलू और ₹४ का बैंगन खरीदा।',
        scenarioHindi: 'Birsa visited the Haat. He bought potatoes for ₹5 and brinjals for ₹4.',
        items: [
          { name: 'आलू (Alu)', price: 5, icon: '🥔' },
          { name: 'बैंगन (Benga)', price: 4, icon: '🍆' }
        ],
        question: 'बिरसा ने दुकानदार को कुल कितने रुपये दिए? (₹5 + ₹4 = ?)',
        answer: '₹९ (Rupees Nine / Ho: 𑣇 Taka / Ol Chiki: ᱙ ᱴᱟᱠᱟ)'
      }
    };
  }

  // -------------------------------------------------------------
  // 2. FESTIVALS & CULTURAL TRADITIONS DOMAIN
  // -------------------------------------------------------------
  if (domain === 'festivals') {
    const festivalPairs: Record<TribalLanguage, MatchingPair[]> = {
      Ho: [
        { icon: '🌸', tribalText: '𑢡𑣁𑣁 (Baa / Sarjom Ba)', romanText: 'Baa', hindiText: 'सरहुल का साल फूल', englishText: 'Sal Flower' },
        { icon: '𑢯', tribalText: '𑢡𑣂𑢷𑣁𑣜 (Desauli)', romanText: 'Desauli', hindiText: 'पवित्र स्थल (जाहिर थान)', englishText: 'Sacred Grove' },
        { icon: '🪘', tribalText: '𑢨𑣃𑢶𑣁𑣅 (Dumang)', romanText: 'Dumang', hindiText: 'मांदर बाजा (Mandar)', englishText: 'Tribal Drum' },
        { icon: '🌾', tribalText: '𑢰𑣁𑣝𑣁𑣜 (Jawa)', romanText: 'Jawa', hindiText: 'करम जावा अंकुर', englishText: 'Sprouted Seedling' }
      ],
      Mundari: [
        { icon: '🌸', tribalText: 'सरजोम बा (Sarjom Ba)', romanText: 'Sarjom Ba', hindiText: 'सखुआ का फूल (Sal Bloom)', englishText: 'Sal Flower' },
        { icon: '🌳', tribalText: 'जाहेर थान (Jaher Than)', romanText: 'Jaher Than', hindiText: 'पूजा स्थल (Sacred Grove)', englishText: 'Sacred Grove' },
        { icon: '🪘', tribalText: 'दुमंग (Dumang)', romanText: 'Dumang', hindiText: 'पारंपरिक मांदर (Drum)', englishText: 'Mandar Drum' },
        { icon: '🌾', tribalText: 'जावा डाली (Jawa Dali)', romanText: 'Jawa Dali', hindiText: 'करम जावा टोकरी', englishText: 'Sprouted Basket' }
      ],
      Santhali: [
        { icon: '🌸', tribalText: 'ᱵᱟᱦᱟ (Baha)', romanText: 'Baha', hindiText: 'बाहा पर्व का साल फूल', englishText: 'Sal Blossom' },
        { icon: '🌳', tribalText: 'ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ (Jaher Than)', romanText: 'Jaher Than', hindiText: 'पवित्र जाहेर थान', englishText: 'Sacred Grove' },
        { icon: '🪘', tribalText: 'ᱛᱩᱢᱫᱟᱜ (Tumdak)', romanText: 'Tumdak', hindiText: 'मांदर (Sacred Drum)', englishText: 'Tumdak Drum' },
        { icon: '🎨', tribalText: 'ᱥᱚᱦᱨᱟᱭ ᱪᱤᱛᱟᱹᱨ (Sohrai Chitar)', romanText: 'Sohrai Chitar', hindiText: 'सोहराय भित्ति चित्रकला', englishText: 'Sohrai Wall Art' }
      ]
    };

    const festivalLetters: Record<TribalLanguage, TracingItem[]> = {
      Ho: [
        { glyph: '𑢡', name: 'Baa', pronunciation: 'Ba', hindiMeaning: 'बा (फूल / बाहा)', strokeHint: 'बायें से दायें अर्धवृत्त' },
        { glyph: '𑢯', name: 'Saa', pronunciation: 'Sa', hindiMeaning: 'सा (सरजोम / साल)', strokeHint: 'सीधी रेखा मोड़कर' },
        { glyph: '𑢱', name: 'Kaa', pronunciation: 'Ka', hindiMeaning: 'का (करम पर्व)', strokeHint: 'मध्य से चक्राकार' },
        { glyph: '𑢨', name: 'Daa', pronunciation: 'Da', hindiMeaning: 'दा (दमा-दुमंग बाजा)', strokeHint: 'नीचे झुकी रेखा' }
      ],
      Mundari: [
        { glyph: 'ब', name: 'Ba', pronunciation: 'Ba', hindiMeaning: 'बा (फूल)', strokeHint: 'गोला बनाकर बीच में काटें' },
        { glyph: 'स', name: 'Sa', pronunciation: 'Sa', hindiMeaning: 'स (सरहुल पर्व)', strokeHint: 'र बनाकर आड़ी रेखा' },
        { glyph: 'क', name: 'Ka', pronunciation: 'Ka', hindiMeaning: 'क (करम डाली)', strokeHint: 'खड़ी रेखा पर दोनों ओर घुमाव' },
        { glyph: 'द', name: 'Da', pronunciation: 'Da', hindiMeaning: 'द (दुमंग मांदर)', strokeHint: 'छोटा ट बनाकर मोड़ें' }
      ],
      Santhali: [
        { glyph: 'ᱵ', name: 'Ob', pronunciation: 'Ba', hindiMeaning: 'ᱵ (बाहा पर्व)', strokeHint: 'ᱵᱟᱦᱟ ᱯᱩᱭᱞᱩ ᱪᱤᱠᱤ' },
        { glyph: 'ᱥ', name: 'Is', pronunciation: 'Sa', hindiMeaning: 'ᱥ (सोहराय पर्व)', strokeHint: 'ᱥᱚᱦᱨᱟᱭ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: 'ᱠ', name: 'Ak', pronunciation: 'Ka', hindiMeaning: 'ᱠ (करम पूजा)', strokeHint: 'ᱠᱟᱨᱟᱢ ᱫᱟᱨᱮ ᱪᱤᱠᱤ' },
        { glyph: 'ᱛ', name: 'Ot', pronunciation: 'Ta', hindiMeaning: 'ᱛ (तुमक/टमाक)', strokeHint: 'ᱛᱩᱢᱫᱟᱜ ᱪᱤᱠᱤ' }
      ]
    };

    return {
      domain: 'festivals',
      domainLabel: 'Tribal Cultural Festivals',
      domainLabelHindi: 'आदिवासी सांस्कृतिक पर्व एवं परंपराएं',
      section1Title: 'अभ्यास १: सांस्कृतिक पर्व वर्ण ट्रेसिंग (Cultural Festival Script Tracing)',
      section1Instructions: 'पर्व के प्रमुख अक्षरों को पेंसिल से ३ बार ट्रेस करें और बोलें (Trace 3 times & pronounce):',
      tracingItems: festivalLetters[lang],
      section2Title: 'अभ्यास २: पर्व-प्रतीक एवं शब्दावली मिलान (Festival Symbols Matching)',
      section2Instructions: 'सांस्कृतिक प्रतीकों को उनके सही मातृभाषा एवं हिन्दी अर्थ से मिलाएं:',
      matchingPairs: festivalPairs[lang],
      section3Title: 'अभ्यास ३: उत्सव सामग्री एवं वाद्ययंत्र गणना (Festival Objects Counting)',
      section3Instructions: 'पर्व के लिए आवश्यक सामग्री को गिनें और संख्या लिखें (Count festival items):',
      countingItems: [
        {
          icon: '🌸',
          repeatCount: 5,
          itemNameHindi: 'सरहुल के साल फूल (Sal Flowers)',
          itemNameTribal: isHo ? '𑢡𑣁𑣁' : isMundari ? 'सरजोम बा' : 'ᱵᱟᱦᱟ',
          numeralExpected: 5,
          tribalNumeral: isHo ? '𑣖' : isMundari ? '५' : '᱕'
        },
        {
          icon: '🪘',
          repeatCount: 2,
          itemNameHindi: 'मांदर (Mandar Drums)',
          itemNameTribal: isHo ? '𑢨𑣃𑢶𑣁𑣅' : isMundari ? 'दुमंग' : 'ᱛᱩᱢᱫᱟᱜ',
          numeralExpected: 2,
          tribalNumeral: isHo ? '𑣡' : isMundari ? '२' : '᱒'
        },
        {
          icon: '🪔',
          repeatCount: 7,
          itemNameHindi: 'सोहराय के दीपक (Clay Lamps)',
          itemNameTribal: isHo ? '𑢨𑣂𑢷𑣁' : isMundari ? 'दिया' : 'ᱫᱤᱣᱟ',
          numeralExpected: 7,
          tribalNumeral: isHo ? '𑣘' : isMundari ? '७' : '᱗'
        }
      ],
      section4Title: 'अभ्यास ४: लोकगीत पंक्ति पूर्ति (Festival Rhyme Cloze & Drawing)',
      section4Instructions: 'रिक्त स्थान में उचित शब्द भरें या अपनी पसंद का सोहराय चित्र बनाएं:',
      clozeItems: [
        {
          sentenceWithBlank: isHo ? 'सरहुल पर्व में हम _____ के पेड़ की पूजा करते हैं।' : isMundari ? 'बाहा परब रे अबु _____ बा अतुंग तना।' : 'ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱨᱮ _____ ᱵᱟᱦᱟ ᱠᱚ ᱦᱟᱹᱴᱤᱧᱟ᱾',
          blankAnswer: isHo ? 'साल / सखुआ (Sarjom)' : isMundari ? 'सरजोम (Sarjom)' : 'ᱥᱟᱨᱡᱚᱢ (Sarjom)',
          hintHindi: 'सखुआ (साल) का वृक्ष',
          options: ['सरजोम (Sal)', 'महुआ (Mahua)', 'आम (Mango)']
        }
      ],
      drawingPrompt: 'नीचे दिए गए बॉक्स में सोहराय पर्व की पारंपरिक ज्यामितीय आकृति या मांदर का चित्र बनाएं:'
    };
  }

  // -------------------------------------------------------------
  // 3. HUMAN BODY, HEALTH & SENSES DOMAIN
  // -------------------------------------------------------------
  if (domain === 'body') {
    const bodyPairs: Record<TribalLanguage, MatchingPair[]> = {
      Ho: [
        { icon: '👁️', tribalText: '𑢶𑣂𑣑 (Med)', romanText: 'Med', hindiText: 'आंख (Eye)', englishText: 'Eye' },
        { icon: '👂', tribalText: '𑢚𑣃𑢷𑣃𑣜 (Lutur)', romanText: 'Lutur', hindiText: 'कान (Ear)', englishText: 'Ear' },
        { icon: '✋', tribalText: '𑢷𑣂 (Ti)', romanText: 'Ti', hindiText: 'हाथ (Hand)', englishText: 'Hand' },
        { icon: '🦶', tribalText: '𑢱𑣁𑢷𑣁 (Kata)', romanText: 'Kata', hindiText: 'पैर (Foot)', englishText: 'Foot' }
      ],
      Mundari: [
        { icon: '👁️', tribalText: 'मेद (Med)', romanText: 'Med', hindiText: 'आंख (Eye)', englishText: 'Eye' },
        { icon: '👂', tribalText: 'लुतुर (Lutur)', romanText: 'Lutur', hindiText: 'कान (Ear)', englishText: 'Ear' },
        { icon: '✋', tribalText: 'ती (Ti)', romanText: 'Ti', hindiText: 'हाथ (Hand)', englishText: 'Hand' },
        { icon: '🦶', tribalText: 'काटा (Kata)', romanText: 'Kata', hindiText: 'पैर (Foot)', englishText: 'Foot' }
      ],
      Santhali: [
        { icon: '👁️', tribalText: 'ᱢᱮᱫ (Med)', romanText: 'Med', hindiText: 'आंख (Eye)', englishText: 'Eye' },
        { icon: '👂', tribalText: 'ᱞᱩᱛᱩᱨ (Lutur)', romanText: 'Lutur', hindiText: 'कान (Ear)', englishText: 'Ear' },
        { icon: '✋', tribalText: 'ᱛᱤ (Ti)', romanText: 'Ti', hindiText: 'हाथ (Hand)', englishText: 'Hand' },
        { icon: '🦶', tribalText: 'ᱡᱟᱝᱜᱟ / ᱠᱟᱴᱟ (Janga)', romanText: 'Janga', hindiText: 'पैर (Foot/Leg)', englishText: 'Foot' }
      ]
    };

    const bodyLetters: Record<TribalLanguage, TracingItem[]> = {
      Ho: [
        { glyph: '𑢶', name: 'Maa', pronunciation: 'Ma', hindiMeaning: 'म (मेद / आंख)', strokeHint: 'ऊपर से सीधा मोड़' },
        { glyph: '𑢚', name: 'Laa', pronunciation: 'La', hindiMeaning: 'ल (लुतुर / कान)', strokeHint: 'वर्तुलाकार घुमाव' },
        { glyph: '𑢷', name: 'Taa', pronunciation: 'Ta', hindiMeaning: 'त (ती / हाथ)', strokeHint: 'सीधी खड़ी रेखा' },
        { glyph: '𑢱', name: 'Kaa', pronunciation: 'Ka', hindiMeaning: 'क (काटा / पैर)', strokeHint: 'पूर्ण वृत्ताकार' }
      ],
      Mundari: [
        { glyph: 'म', name: 'Ma', pronunciation: 'Ma', hindiMeaning: 'म (मेद / आंख)', strokeHint: 'सीधी रेखा और गोला' },
        { glyph: 'ल', name: 'La', pronunciation: 'La', hindiMeaning: 'ल (लुतुर / कान)', strokeHint: 'दोहरे वक्र से' },
        { glyph: 'त', name: 'Ta', pronunciation: 'Ta', hindiMeaning: 'त (ती / हाथ)', strokeHint: 'नीचे झुकी रेखा' },
        { glyph: 'क', name: 'Ka', pronunciation: 'Ka', hindiMeaning: 'क (काटा / पैर)', strokeHint: 'खड़ी रेखा पर दोनों ओर' }
      ],
      Santhali: [
        { glyph: 'ᱢ', name: 'Am', pronunciation: 'Ma', hindiMeaning: 'ᱢ (ᱢᱮᱫ / आंख)', strokeHint: 'ᱢᱮᱫ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: 'ᱞ', name: 'Ol', pronunciation: 'La', hindiMeaning: 'ᱞ (ᱞᱩᱛᱩᱨ / कान)', strokeHint: 'ᱞᱩᱛᱩᱨ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: 'ᱛ', name: 'Ot', pronunciation: 'Ta', hindiMeaning: 'ᱛ (ᱛᱤ / हाथ)', strokeHint: 'ᱛᱤ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: 'ᱡ', name: 'Aj', pronunciation: 'Ja', hindiMeaning: 'ᱡ (ᱡᱟᱝᱜᱟ / पैर)', strokeHint: 'ᱡᱟᱝᱜᱟ ᱪᱤᱠᱤ ᱚᱞ' }
      ]
    };

    return {
      domain: 'body',
      domainLabel: 'Anatomy & Senses',
      domainLabelHindi: 'हमारा शरीर एवं ज्ञानेंद्रियां',
      section1Title: 'अभ्यास १: शरीर के अंगों के शुरुआती अक्षर (Body Part Script Tracing)',
      section1Instructions: 'अंगों के नाम के प्रथम अक्षर को पेंसिल से ३ बार ट्रेस करें (Trace initial letters 3 times):',
      tracingItems: bodyLetters[lang],
      section2Title: 'अभ्यास २: अंग-चित्र एवं मातृभाषा मिलान (Match Body Parts to Tribal Words)',
      section2Instructions: 'चित्र को उसके सही मातृभाषा व हिन्दी नाम से रेखा खींचकर मिलाएं:',
      matchingPairs: bodyPairs[lang],
      section3Title: 'अभ्यास ३: हमारे पास कितने अंग हैं? (How Many Body Parts Do We Have?)',
      section3Instructions: 'दिए गए अंगों की संख्या गिनें और कोष्ठक में लिखें (Count our body parts):',
      countingItems: [
        {
          icon: '👁️ 👁️',
          repeatCount: 2,
          itemNameHindi: 'आंखें (Two Eyes to see)',
          itemNameTribal: isHo ? '𑢶𑣂𑣑' : isMundari ? 'मेद' : 'ᱢᱮᱫ',
          numeralExpected: 2,
          tribalNumeral: isHo ? '𑣡' : isMundari ? '२' : '᱒'
        },
        {
          icon: '✋ ✋',
          repeatCount: 2,
          itemNameHindi: 'हाथ (Two Hands to work)',
          itemNameTribal: isHo ? '𑢷𑣂' : isMundari ? 'ती' : 'ᱛᱤ',
          numeralExpected: 2,
          tribalNumeral: isHo ? '𑣡' : isMundari ? '२' : '᱒'
        },
        {
          icon: '🖐️',
          repeatCount: 5,
          itemNameHindi: 'एक हाथ की उंगलियां (5 Fingers)',
          itemNameTribal: isHo ? '𑢷𑣂 𑢱𑣁𑢷𑣁' : isMundari ? 'ती काटा' : 'ᱛᱤ ᱜᱩᱬᱤ',
          numeralExpected: 5,
          tribalNumeral: isHo ? '𑣖' : isMundari ? '५' : '᱕'
        }
      ],
      section4Title: 'अभ्यास ४: स्वस्थ आदतें (Healthy Hygiene Habits Cloze)',
      section4Instructions: 'वाक्य को पूरा करें (Fill in the blanks about cleanliness):',
      clozeItems: [
        {
          sentenceWithBlank: 'भोजन करने से पहले हमें साबुन और जल से अपने _____ धोने चाहिए।',
          blankAnswer: isHo ? 'हाथ (Ti / 𑢷𑣂)' : isMundari ? 'हाथ (ती / Ti)' : 'हाथ (ᱛᱤ / Ti)',
          hintHindi: 'हाथ (Hands)',
          options: ['हाथ (Ti)', 'पैर (Kata)', 'कान (Lutur)']
        }
      ]
    };
  }

  // -------------------------------------------------------------
  // 4. CLASSROOM & ACTION WORDS DOMAIN
  // -------------------------------------------------------------
  if (domain === 'classroom') {
    const classPairs: Record<TribalLanguage, MatchingPair[]> = {
      Ho: [
        { icon: '📖', tribalText: '𑢡𑣂𑢷𑣁𑣡 (Parhao / Padh)', romanText: 'Parhao', hindiText: 'पढ़ना (Read)', englishText: 'Read' },
        { icon: '✍️', tribalText: '𑢡𑣉𑣚 (Ol)', romanText: 'Ol', hindiText: 'लिखना (Write)', englishText: 'Write' },
        { icon: '🪑', tribalText: '𑢨𑣃𑢡𑣂 (Dube)', romanText: 'Dube', hindiText: 'बैठना (Sit)', englishText: 'Sit' },
        { icon: '💧', tribalText: '𑢨𑣁𑣄 𑢓𑣃 (Daa Nu)', romanText: 'Daa Nu', hindiText: 'पानी पीना (Drink Water)', englishText: 'Drink Water' }
      ],
      Mundari: [
        { icon: '📖', tribalText: 'पढ़ाव (Parhao)', romanText: 'Parhao', hindiText: 'पढ़ना (Read)', englishText: 'Read' },
        { icon: '✍️', tribalText: 'ओल (Ol)', romanText: 'Ol', hindiText: 'लिखना (Write)', englishText: 'Write' },
        { icon: '🪑', tribalText: 'दुबे (Dub)', romanText: 'Dub', hindiText: 'बैठना (Sit)', englishText: 'Sit' },
        { icon: '💧', tribalText: 'दाः नू (Daah Nu)', romanText: 'Daah Nu', hindiText: 'पानी पीना (Drink)', englishText: 'Drink' }
      ],
      Santhali: [
        { icon: '📖', tribalText: 'ᱯᱟᱲᱦᱟᱣ (Parhaw)', romanText: 'Parhaw', hindiText: 'पढ़ना (Read)', englishText: 'Read' },
        { icon: '✍️', tribalText: 'ᱚᱞ (Ol)', romanText: 'Ol', hindiText: 'लिखना (Write)', englishText: 'Write' },
        { icon: '🪑', tribalText: 'ᱫᱩᱲᱩᱵ (Durup)', romanText: 'Durup', hindiText: 'बैठना (Sit)', englishText: 'Sit' },
        { icon: '💧', tribalText: 'ᱫᱟᱜ ᱧᱩ (Daak Nyu)', romanText: 'Daak Nyu', hindiText: 'पानी पीना (Drink Water)', englishText: 'Drink Water' }
      ]
    };

    const classLetters: Record<TribalLanguage, TracingItem[]> = {
      Ho: [
        { glyph: '𑢡', name: 'Paa', pronunciation: 'Pa', hindiMeaning: 'प (पढ़ाव / पढ़ना)', strokeHint: 'ऊपर से सीधा मोड़' },
        { glyph: '𑢉', name: 'O', pronunciation: 'O', hindiMeaning: 'ओ (ओल / लिखना)', strokeHint: 'गोलाकार चक्र' },
        { glyph: '𑢨', name: 'Daa', pronunciation: 'Da', hindiMeaning: 'द (दुबे / बैठना)', strokeHint: 'नीचे झुकाव' },
        { glyph: '𑢓', name: 'Naa', pronunciation: 'Na', hindiMeaning: 'न (नू / पीना)', strokeHint: 'खड़ी रेखा पर घुमाव' }
      ],
      Mundari: [
        { glyph: 'प', name: 'Pa', pronunciation: 'Pa', hindiMeaning: 'प (पुथी / पढ़ना)', strokeHint: 'ऊपर से मोड़कर नीचे' },
        { glyph: 'ओ', name: 'O', pronunciation: 'O', hindiMeaning: 'ओ (ओल / लिखना)', strokeHint: 'आ पर मात्रा' },
        { glyph: 'द', name: 'Da', pronunciation: 'Da', hindiMeaning: 'द (दुबे / बैठना)', strokeHint: 'ट बनाकर घुमाएं' },
        { glyph: 'न', name: 'Na', pronunciation: 'Na', hindiMeaning: 'न (नू / पानी पीना)', strokeHint: 'गोल घुंडी से' }
      ],
      Santhali: [
        { glyph: 'ᱯ', name: 'Ep', pronunciation: 'Pa', hindiMeaning: 'ᱯ (ᱯᱟᱲᱦᱟᱣ / पढ़ना)', strokeHint: 'ᱯᱟᱲᱦᱟᱣ ᱪᱤᱠᱤ' },
        { glyph: 'ᱚ', name: 'La', pronunciation: 'O', hindiMeaning: 'ᱚ (ᱚᱞ / लिखना)', strokeHint: 'ᱚᱞ ᱯᱩᱭᱞᱩ ᱪᱤᱠᱤ' },
        { glyph: 'ᱫ', name: 'Ud', pronunciation: 'Da', hindiMeaning: 'ᱫ (ᱫᱩᱲᱩᱵ / बैठना)', strokeHint: 'ᱫᱩᱲᱩᱵ ᱪᱤᱠᱤ' },
        { glyph: 'ᱧ', name: 'Uny', pronunciation: 'Nya', hindiMeaning: 'ᱧ (ᱧᱩ / पीना)', strokeHint: 'ᱧᱩ ᱪᱤᱠᱤ ᱚᱞ' }
      ]
    };

    return {
      domain: 'classroom',
      domainLabel: 'Classroom Daily Routines & Actions',
      domainLabelHindi: 'कक्षा के दैनिक निर्देश एवं क्रिया शब्द',
      section1Title: 'अभ्यास १: क्रिया शब्दों के प्रारंभिक वर्ण (Action Words Script Tracing)',
      section1Instructions: 'दिए गए अक्षरों को पेंसिल से ३ बार ट्रेस करें और बोलकर अभ्यास करें:',
      tracingItems: classLetters[lang],
      section2Title: 'अभ्यास २: कक्षा गतिविधियों का शब्द मिलान (Match Classroom Actions)',
      section2Instructions: 'चित्र में बच्चे जो कार्य कर रहे हैं, उसे सही शब्द से जोड़ें:',
      matchingPairs: classPairs[lang],
      section3Title: 'अभ्यास ३: कक्षा सामग्री की गिनती (Count Classroom Objects)',
      section3Instructions: 'कक्षा में रखी गई वस्तुओं को गिनें और संख्या लिखें:',
      countingItems: [
        {
          icon: '📖 📖 📖 📖',
          repeatCount: 4,
          itemNameHindi: 'किताबें (Books / Puthi)',
          itemNameTribal: isHo ? '𑢡𑣃𑢷𑣂' : isMundari ? 'पुथी' : 'ᱯᱩᱛᱷᱤ',
          numeralExpected: 4,
          tribalNumeral: isHo ? '𑣂' : isMundari ? '४' : '᱔'
        },
        {
          icon: '✏️ ✏️ ✏️ ✏️ ✏️ ✏️',
          repeatCount: 6,
          itemNameHindi: 'पेंसिलें (Pencils to write)',
          itemNameTribal: isHo ? '𑢡𑣉𑣚 𑢱𑣁𑣚𑣁𑢶' : isMundari ? 'ओल कलम' : 'ᱚᱞ ᱠᱟᱞᱟᱢ',
          numeralExpected: 6,
          tribalNumeral: isHo ? '𑣗' : isMundari ? '६' : '᱖'
        },
        {
          icon: '🎒 🎒 🎒',
          repeatCount: 3,
          itemNameHindi: 'स्कूली बस्ते (School Bags)',
          itemNameTribal: isHo ? '𑢰𑣉𑣚𑣁' : isMundari ? 'झोला' : 'ᱡᱷᱚᱞᱟ',
          numeralExpected: 3,
          tribalNumeral: isHo ? '𑣁' : isMundari ? '३' : '᱓'
        }
      ],
      section4Title: 'अभ्यास ४: शिक्षक का निर्देश समझें (Teacher Classroom Instructions)',
      section4Instructions: 'सही निर्देश पर सही (✓) का निशान लगाएं:'
    };
  }

  // -------------------------------------------------------------
  // 5. NUMERACY & ADVANCED MATH DOMAIN
  // -------------------------------------------------------------
  if (domain === 'numeracy') {
    const mathNumerals: Record<TribalLanguage, TracingItem[]> = {
      Ho: [
        { glyph: '𑣑', name: 'Miyad', pronunciation: 'Miyad', hindiMeaning: '१ (एक)', strokeHint: 'ऊपर से नीचे सीधी रेखा' },
        { glyph: '𑣡', name: 'Bariya', pronunciation: 'Bariya', hindiMeaning: '२ (दो)', strokeHint: 'वक्र बनाकर क्षैतिज रेखा' },
        { glyph: '𑣁', name: 'Apeya', pronunciation: 'Apeya', hindiMeaning: '३ (तीन)', strokeHint: 'दोहरा अर्धवृत्त' },
        { glyph: '𑣂', name: 'Upunya', pronunciation: 'Upunya', hindiMeaning: '४ (चार)', strokeHint: 'तिरछी रेखा जोड़कर' }
      ],
      Mundari: [
        { glyph: '१', name: 'Miyad', pronunciation: 'Miyad', hindiMeaning: '१ (एक)', strokeHint: 'गोला बनाकर नीचे डंडी' },
        { glyph: '२', name: 'Baria', pronunciation: 'Baria', hindiMeaning: '२ (दो)', strokeHint: 'अर्धवृत्त बनाकर नीचे मोड़ें' },
        { glyph: '३', name: 'Apea', pronunciation: 'Apea', hindiMeaning: '३ (तीन)', strokeHint: 'दो घुमावदार चाप' },
        { glyph: '४', name: 'Upunya', pronunciation: 'Upunya', hindiMeaning: '४ (चार)', strokeHint: 'लूप बनाकर नीचे' }
      ],
      Santhali: [
        { glyph: '᱑', name: 'Mit', pronunciation: 'Mit', hindiMeaning: '१ (एक)', strokeHint: 'ᱢᱤᱫ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: '᱒', name: 'Bar', pronunciation: 'Bar', hindiMeaning: '२ (दो)', strokeHint: 'ᱵᱟᱨ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: '᱓', name: 'Pe', pronunciation: 'Pe', hindiMeaning: '३ (तीन)', strokeHint: 'ᱯᱮ ᱪᱤᱠᱤ ᱚᱞ' },
        { glyph: '᱔', name: 'Pon', pronunciation: 'Pon', hindiMeaning: '४ (चार)', strokeHint: 'ᱯᱩᱱ ᱪᱤᱠᱤ ᱚᱞ' }
      ]
    };

    const mathPairs: Record<TribalLanguage, MatchingPair[]> = {
      Ho: [
        { icon: '🏹 🏹 🏹', tribalText: '𑣁 (Apeya)', romanText: 'Apeya', hindiText: '३ (तीन तीर)', englishText: '3 Arrows' },
        { icon: '🪘 🪘 🪘 🪘 🪘', tribalText: '𑣖 (Mone)', romanText: 'Mone', hindiText: '५ (पाँच मांदर)', englishText: '5 Drums' },
        { icon: '🪵 🪵', tribalText: '𑣡 (Bariya)', romanText: 'Bariya', hindiText: '२ (दो लट्ठे)', englishText: '2 Logs' },
        { icon: '🛖 🛖 🛖 🛖', tribalText: '𑣂 (Upunya)', romanText: 'Upunya', hindiText: '४ (चार झोपड़ियां)', englishText: '4 Huts' }
      ],
      Mundari: [
        { icon: '🏹 🏹 🏹', tribalText: '३ (आपेया)', romanText: 'Apea', hindiText: '३ (तीन तीर)', englishText: '3 Arrows' },
        { icon: '🪘 🪘 🪘 🪘 🪘', tribalText: '५ (मोड़ेया)', romanText: 'Morea', hindiText: '५ (पाँच मांदर)', englishText: '5 Drums' },
        { icon: '🪵 🪵', tribalText: '२ (बारिया)', romanText: 'Baria', hindiText: '२ (दो लट्ठे)', englishText: '2 Logs' },
        { icon: '🛖 🛖 🛖 🛖', tribalText: '४ (उपुनया)', romanText: 'Upunya', hindiText: '४ (चार घर)', englishText: '4 Huts' }
      ],
      Santhali: [
        { icon: '🏹 🏹 🏹', tribalText: '᱓ (ᱯᱮ / Pe)', romanText: 'Pe', hindiText: '३ (तीन तीर)', englishText: '3 Arrows' },
        { icon: '🪘 🪘 🪘 🪘 🪘', tribalText: '᱕ (ᱢᱚᱬᱮ / Mone)', romanText: 'Mone', hindiText: '५ (पाँच मांदर)', englishText: '5 Drums' },
        { icon: '🪵 🪵', tribalText: '᱒ (ᱵᱟᱨ / Bar)', romanText: 'Bar', hindiText: '२ (दो लट्ठे)', englishText: '2 Logs' },
        { icon: '🛖 🛖 🛖 🛖', tribalText: '᱔ (ᱯᱩᱱ / Pon)', romanText: 'Pon', hindiText: '४ (चार घर)', englishText: '4 Huts' }
      ]
    };

    return {
      domain: 'numeracy',
      domainLabel: 'Tribal FLN Numeracy & Counting',
      domainLabelHindi: 'बुनियादी संख्या ज्ञान एवं संक्रियाएं',
      section1Title: 'अभ्यास १: मातृभाषा अंक ट्रेसिंग (Tribal Script Numeral Tracing)',
      section1Instructions: 'मातृभाषा की लिपि में अंकों को पहचानें और ३ बार ट्रेस करें (Trace numerals 3x):',
      tracingItems: mathNumerals[lang],
      section2Title: 'अभ्यास २: वस्तु समूह एवं संख्या मिलान (Group Counting to Numeral Matching)',
      section2Instructions: 'चित्र में वस्तुओं को गिनकर सही मातृभाषा अंक से मिलाएं:',
      matchingPairs: mathPairs[lang],
      section3Title: 'अभ्यास ३: सचित्र जोड़ एवं घटाव (Visual Addition & Subtraction)',
      section3Instructions: 'सचित्र समीकरणों को हल करें और कुल संख्या लिखें:',
      countingItems: [
        {
          icon: '🏹 🏹 🏹 + 🏹 🏹',
          repeatCount: 5,
          itemNameHindi: 'तीरंदाजी तीर (3 + 2 = 5)',
          itemNameTribal: isHo ? '𑢷𑣁𑣜 𑢡𑣁𑣁' : isMundari ? 'सार आ' : 'ᱥᱟᱨ ᱟᱜ',
          numeralExpected: 5,
          tribalNumeral: isHo ? '𑣖' : isMundari ? '५' : '᱕'
        },
        {
          icon: '🐟 🐟 🐟 🐟 + 🐟 🐟 🐟',
          repeatCount: 7,
          itemNameHindi: 'नदी की मछलियां (4 + 3 = 7)',
          itemNameTribal: isHo ? '𑢹𑣁𑣱𑣃' : isMundari ? 'हाकू' : 'ᱦᱟᱹᱠᱩ',
          numeralExpected: 7,
          tribalNumeral: isHo ? '𑣘' : isMundari ? '७' : '᱗'
        },
        {
          icon: '🪘 🪘 🪘 🪘 - 🪘',
          repeatCount: 3,
          itemNameHindi: 'मांदर घटाव (4 - 1 = 3)',
          itemNameTribal: isHo ? '𑢨𑣃𑢶𑣁𑣅' : isMundari ? 'दुमंग' : 'ᱛᱩᱢᱫᱟᱜ',
          numeralExpected: 3,
          tribalNumeral: isHo ? '𑣁' : isMundari ? '३' : '᱓'
        }
      ],
      section4Title: 'अभ्यास ४: मानसिक अंकगणित (Mental Math Sequences)',
      section4Instructions: 'छूटी हुई संख्या को पहचान कर भरें (Fill in missing numbers: 1, 2, __, 4, 5)'
    };
  }

  // -------------------------------------------------------------
  // DEFAULT / WILDLIFE & FOREST ECOLOGY DOMAIN
  // -------------------------------------------------------------
  const wildlifePairs: Record<TribalLanguage, MatchingPair[]> = {
    Ho: [
      { icon: '🐅', tribalText: '𑢱𑣃𑣚 (Kul)', romanText: 'Kul', hindiText: 'बाघ (Tiger)', englishText: 'Tiger' },
      { icon: '🐘', tribalText: '𑢹𑣁𑣎𑣂 (Hati)', romanText: 'Hati', hindiText: 'हाथी (Elephant)', englishText: 'Elephant' },
      { icon: '🦚', tribalText: '𑢶𑣁𑢜𑣁 (Mara)', romanText: 'Mara', hindiText: 'मोर (Peacock)', englishText: 'Peacock' },
      { icon: '🌲', tribalText: '𑢯𑣁𑣜𑢰𑣉𑢶 (Sarjom)', romanText: 'Sarjom', hindiText: 'साल / सखुआ का पेड़', englishText: 'Sal Tree' }
    ],
    Mundari: [
      { icon: '🐅', tribalText: 'कुल (Kul)', romanText: 'Kul', hindiText: 'बाघ (Tiger)', englishText: 'Tiger' },
      { icon: '🐘', tribalText: 'हाती (Hati)', romanText: 'Hati', hindiText: 'हाथी (Elephant)', englishText: 'Elephant' },
      { icon: '🦚', tribalText: 'मारा (Mara)', romanText: 'Mara', hindiText: 'मोर (Peacock)', englishText: 'Peacock' },
      { icon: '🌲', tribalText: 'सरजोम (Sarjom)', romanText: 'Sarjom', hindiText: 'सखुआ का पेड़ (Sal Tree)', englishText: 'Sal Tree' }
    ],
    Santhali: [
      { icon: '🐅', tribalText: 'ᱛᱟᱹᱨᱩᱵ (Tarup)', romanText: 'Tarup', hindiText: 'बाघ (Tiger)', englishText: 'Tiger' },
      { icon: '🐘', tribalText: 'ᱦᱟᱹᱛᱤ (Hati)', romanText: 'Hati', hindiText: 'हाथी (Elephant)', englishText: 'Elephant' },
      { icon: '🦚', tribalText: 'ᱢᱟᱨᱟᱜ (Marak)', romanText: 'Marak', hindiText: 'मोर (Peacock)', englishText: 'Peacock' },
      { icon: '🌲', tribalText: 'ᱫᱟᱨᱮ / ᱥᱟᱨᱡᱚᱢ (Dare)', romanText: 'Dare', hindiText: 'पेड़ / सखुआ (Tree)', englishText: 'Sal Tree' }
    ]
  };

  const wildlifeLetters: Record<TribalLanguage, TracingItem[]> = {
    Ho: [
      { glyph: '𑢹', name: 'Hoo', pronunciation: 'Ho', hindiMeaning: 'हो (हाती / हाथी)', strokeHint: 'ऊपर से सीधा मोड़' },
      { glyph: '𑢶', name: 'Maa', pronunciation: 'Ma', hindiMeaning: 'म (मारा / मोर)', strokeHint: 'वक्राकार घुमाव' },
      { glyph: '𑢱', name: 'Kaa', pronunciation: 'Ka', hindiMeaning: 'क (कुल / बाघ)', strokeHint: 'गोला बनाकर नीचे' },
      { glyph: '𑢯', name: 'Saa', pronunciation: 'Sa', hindiMeaning: 'स (सरजोम / साल)', strokeHint: 'खड़ी रेखा पर जोड़' }
    ],
    Mundari: [
      { glyph: 'अ', name: 'A', pronunciation: 'A', hindiMeaning: 'अ (आतु / गांव)', strokeHint: 'उ बनाकर आड़ी रेखा' },
      { glyph: 'स', name: 'Sa', pronunciation: 'Sa', hindiMeaning: 'स (सरजोम / सखुआ)', strokeHint: 'र बनाकर बीच से जोड़ें' },
      { glyph: 'द', name: 'Da', pronunciation: 'Da', hindiMeaning: 'द (दाः / जल)', strokeHint: 'ट बनाकर मोड़ें' },
      { glyph: 'प', name: 'Pa', pronunciation: 'Pa', hindiMeaning: 'प (पुथी / पुस्तक)', strokeHint: 'यू आकार से नीचे' }
    ],
    Santhali: [
      { glyph: 'ᱚ', name: 'La', pronunciation: 'O', hindiMeaning: 'ᱚ (ल)', strokeHint: 'ᱚᱞ ᱪᱤᱠᱤ ᱯᱩᱭᱞᱩ' },
      { glyph: 'ᱛ', name: 'Ot', pronunciation: 'Ta', hindiMeaning: 'ᱛ (ᱛᱟᱹᱨᱩᱵ / बाघ)', strokeHint: 'ᱛᱟᱹᱨᱩᱵ ᱪᱤᱠᱤ' },
      { glyph: 'ᱜ', name: 'Ag', pronunciation: 'Ga', hindiMeaning: 'ᱜ (ग)', strokeHint: 'ᱜᱟᱹᱭ ᱪᱤᱠᱤ ᱚᱞ' },
      { glyph: 'ᱢ', name: 'Am', pronunciation: 'Ma', hindiMeaning: 'ᱢ (ᱢᱟᱨᱟᱜ / मोर)', strokeHint: 'ᱢᱟᱨᱟᱜ ᱪᱤᱠᱤ' }
    ]
  };

  return {
    domain: 'wildlife',
    domainLabel: 'Forest Wildlife & Ecology',
    domainLabelHindi: 'जंगल के वन्यजीव एवं पर्यावरण',
    section1Title: 'अभ्यास १: वनस्पति एवं जीव वर्ण ट्रेसिंग (Wildlife Phonics Script Tracing)',
    section1Instructions: 'नीचे दिए गए अक्षरों को पेंसिल से ३ बार ट्रेस करें और उच्चारण करें (Trace 3 times & pronounce):',
    tracingItems: wildlifeLetters[lang],
    section2Title: 'अभ्यास २: जंगल के साथी - चित्र एवं शब्दावली मिलान (Forest Animal Vocabulary Matching)',
    section2Instructions: 'चित्र को उसके सही मातृभाषा और हिन्दी नाम से रेखा खींचकर मिलाएं:',
    matchingPairs: wildlifePairs[lang],
    section3Title: 'अभ्यास ३: जंगल के जानवरों की गिनती (Count Forest Animals & Birds)',
    section3Instructions: 'चित्रों को गिनें और कोष्ठक में सही संख्या लिखें (Count the animals):',
    countingItems: [
      {
        icon: '🦌 🦌 🦌 🦌',
        repeatCount: 4,
        itemNameHindi: 'हिरण (Deer in Saranda Forest)',
        itemNameTribal: isHo ? '𑢰𑣂𑢚𑣂𑢱 (Jhilig)' : isMundari ? 'झिलिग' : 'ᱡᱷᱤᱞ',
        numeralExpected: 4,
        tribalNumeral: isHo ? '𑣂' : isMundari ? '४' : '᱔'
      },
      {
        icon: '🦚 🦚 🦚',
        repeatCount: 3,
        itemNameHindi: 'नाचते मोर (Dancing Peacocks)',
        itemNameTribal: isHo ? '𑢶𑣁𑢜𑣁' : isMundari ? 'मारा' : 'ᱢᱟᱨᱟᱜ',
        numeralExpected: 3,
        tribalNumeral: isHo ? '𑣁' : isMundari ? '३' : '᱓'
      },
      {
        icon: '🦜 🦜 🦜 🦜 🦜',
        repeatCount: 5,
        itemNameHindi: 'पेड़ पर पक्षी (Birds on Sal Tree)',
        itemNameTribal: isHo ? '𑢨𑣂𑢓𑣂𑢑' : isMundari ? 'चेँड़े' : 'ᱪᱮᱬᱮ',
        numeralExpected: 5,
        tribalNumeral: isHo ? '𑣖' : isMundari ? '५' : '᱕'
      }
    ],
    section4Title: 'अभ्यास ४: जंगल की पहेली (Forest Animal Riddle)',
    section4Instructions: 'पहेली को सुलझाएं और सही विकल्प पर गोला बनाएं:',
    clozeItems: [
      {
        sentenceWithBlank: 'मैं जंगल का सबसे बड़ा जीव हूँ, मेरी लंबी सूंड है और हो भाषा में मुझे "हाती" कहते हैं।',
        blankAnswer: 'हाथी (Elephant / Hati)',
        hintHindi: 'हाथी (Elephant)',
        options: ['हाथी (Hati)', 'बाघ (Kul)', 'हिरण (Jhilig)']
      }
    ]
  };
}
