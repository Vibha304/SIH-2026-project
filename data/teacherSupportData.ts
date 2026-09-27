import { 
  TeacherLessonPlan, 
  ContextualExampleData, 
  PronunciationPracticeWord, 
  CrossLanguageDictionaryEntry 
} from '../types';

export const INITIAL_LESSON_PLANS: TeacherLessonPlan[] = [
  {
    id: 'lp-santhali-grade1-greetings',
    title: 'Warm Welcome & Classroom Directives in Mother Tongue',
    titleHindi: 'कक्षा में स्वागत व मातृभाषा अभिवादन सेतु (कक्षा 1)',
    grade: 'Grade 1',
    subject: 'Literacy',
    targetLanguage: 'Santhali',
    duration: '45-Minute Daily',
    culturalTheme: 'Daily school arrival & community respect (जोहार / ᱡᱚᱦᱟᱨ परंपरा)',
    nipunOutcomes: [
      'Children express basic daily greetings in both mother tongue and simple Hindi',
      'Children recognize spoken phonemes and respond to standard classroom directives without fear'
    ],
    nipunOutcomesHindi: [
      'बच्चे अपनी मातृभाषा और सरल हिन्दी में सहज अभिवादन कर सकें',
      'कक्षा के सरल निर्देशों (बैठें, सुनें, पुस्तक खोलें) को समझकर सक्रिय प्रतिक्रिया दें'
    ],
    keyVocabulary: [
      { hindi: 'नमस्ते / प्रणाम', tribal: 'Johar', script: 'ᱡᱚᱦᱟᱨ', phonetic: 'जोहार' },
      { hindi: 'शुभ प्रभात', tribal: 'Sagun setah', script: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ', phonetic: 'सागुन सेताः' },
      { hindi: 'बैठ जाओ', tribal: 'Dhurub me', script: 'ᱫᱷᱩᱲᱩᱵ ᱢᱮ', phonetic: 'धुरुब मे' },
      { hindi: 'किताब खोलो', tribal: 'Puthi jhij me', script: 'ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱢᱮ', phonetic: 'पुथी झिज मे' }
    ],
    steps: [
      {
        title: '☀️ Circle Time & Warm-Up',
        titleHindi: '☀️ सत्रारंभ व मातृभाषा अभिवादन',
        durationMinutes: 10,
        description: 'Gather children in a circle. Teacher bows hands and greets in Santhali: "ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ" (Johar gidra ko / नमस्ते बच्चों).',
        teacherScriptBilingual: 'शिक्षक: "ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ!" (नमस्ते बच्चों! शुभ प्रभात!)',
        studentResponseTribal: 'छात्र: "ᱡᱚᱦᱟᱨ ᱜᱩᱨᱩᱡᱤ! ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ!" (Johar Guruji! Sagun setah!)',
        phoneticAid: 'सागुन सेताः - अंतिम "ग" पर हल्का विराम दें',
        pedagogicalTip: 'Use a smile and eye contact; acknowledging their mother tongue breaks the silence and anxiety on day 1.'
      },
      {
        title: '🗣️ Direct Instruction (Mother Tongue Bridge)',
        titleHindi: '🗣️ प्रत्यक्ष शिक्षण (द्विभाषी सेतु)',
        durationMinutes: 15,
        description: 'Introduce two action commands: "ᱫᱷᱩᱲᱩᱵ ᱢᱮ" (Dhurub me / बैठ जाओ) and "ᱛᱤᱸᱜᱩᱱ ᱢᱮ" (Tingun me / खड़े हो जाओ). Repeat with clear physical gestures.',
        teacherScriptBilingual: 'शिक्षक: "सब सुनो: जब मैं बोलूं \'ᱫᱷᱩᱲᱩᱵ ᱢᱮ\' (Dhurub me), तब सब बैठेंगे। जब बोलूं \'ᱛᱤᱸᱜᱩᱱ ᱢᱮ\' (Tingun me), तब सब खड़े होंगे।"',
        studentResponseTribal: 'बच्चे शारीरिक क्रिया करके दोहराते हैं: "ᱫᱷᱩᱲᱩᱵ ᱢᱮ" (बैठना), "ᱛᱤᱸᱜᱩᱱ ᱢᱮ" (खड़ा होना)',
        phoneticAid: 'धुरुब मे (Dhurub me) / तिंगुन मे (Tingun me)',
        pedagogicalTip: 'Total Physical Response (TPR) technique ensures comprehension before requiring verbal output.'
      },
      {
        title: '🤝 Guided Peer Practice',
        titleHindi: '🤝 मार्गदर्शित समूह अभ्यास',
        durationMinutes: 10,
        description: 'Pair students up. One student gives the command in Santhali while the peer demonstrates the physical action, then switch.',
        teacherScriptBilingual: 'शिक्षक: "जोड़ी बनाओ। एक बच्चा बोलेगा \'ᱫᱷᱩᱲᱩᱵ ᱢᱮ\', दूसरा बैठेगा। फिर बारी बदलो।"',
        studentResponseTribal: 'साथी एक दूसरे को निर्देश देते हैं और हंसते हुए अभ्यास करते हैं।',
        phoneticAid: 'प्रोत्साहन दें: "ᱱᱟᱯᱟᱭ!" (Napay! / बहुत बढ़िया!)',
        pedagogicalTip: 'Peer talk in native dialect builds spontaneous communication without fear of making mistakes.'
      },
      {
        title: '✍️ Worksheet & Visual Tracing',
        titleHindi: '✍️ कार्यपत्रक व रेखांकन गतिविधि',
        durationMinutes: 8,
        description: 'Hand out Worksheet with Ol Chiki character ᱡ and matching picture of folded greeting hands.',
        teacherScriptBilingual: 'शिक्षक: "अपनी कार्यपत्रक पर हाथ जोड़ते हुए चित्र में रंग भरें और \'ᱡ\' वर्ण पर उंगली फिराएं।"',
        studentResponseTribal: 'चित्र में रंग भरना और मौखिक रूप से "ᱡᱚᱦᱟᱨ" दोहराना।',
        phoneticAid: 'जोहार (Johar)',
        pedagogicalTip: 'Multi-sensory engagement cements the letter-sound correspondence.'
      },
      {
        title: '🎯 2-Minute Diagnostic Exit Ticket',
        titleHindi: '🎯 2 मिनट त्वरित समझ आकलन',
        durationMinutes: 2,
        description: 'Quick formative check: Say "Dhurub me" and see if all children sit down without Hindi translation.',
        teacherScriptBilingual: 'शिक्षक: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱫᱷᱩᱲᱩᱵ ᱢᱮ!" (बच्चों, बैठ जाओ!)',
        studentResponseTribal: 'सभी बच्चे एक साथ मुस्कुराते हुए बैठ जाते हैं।',
        phoneticAid: 'शत-प्रतिशत प्रतिक्रिया की पुष्टि करें',
        pedagogicalTip: 'If 80%+ respond correctly, the learning outcome is achieved.'
      }
    ],
    diagnosticCheckHindi: 'क्या सभी बच्चे बिना झिझक "जोहार" बोल पा रहे हैं और "धुरुब मे" सुनकर बैठते हैं?',
    diagnosticCheckEnglish: 'Can all children comfortably greet "Johar" and follow the "Dhurub me" directive?'
  },
  {
    id: 'lp-ho-grade1-counting',
    title: 'Foundational Counting 1-5 with Forest Seeds & Ho Numbers',
    titleHindi: 'इमली के बीज व हो संख्या 1 से 5 (कक्षा 1 संख्या ज्ञान)',
    grade: 'Grade 1',
    subject: 'Numeracy',
    targetLanguage: 'Ho',
    duration: '45-Minute Daily',
    culturalTheme: 'Forest foraging & seeds counting (इमली के बीज / ᱡᱚ ᱡᱟᱝ)',
    nipunOutcomes: [
      'Children associate quantities 1 to 5 with spoken Ho numerals (Miyad, Baria, Apea, Upunya, Moya)',
      'Children count real tangible objects in 1-to-1 correspondence'
    ],
    nipunOutcomesHindi: [
      'बच्चे 1 से 5 तक की वस्तुओं को हो भाषा की संख्याओं (मियाद, बारिया, आपिया, उपुन्या, मोया) से गिन सकें',
      'एक-से-एक संगति (1-to-1 correspondence) से वस्तुओं को छूकर गिनें'
    ],
    keyVocabulary: [
      { hindi: 'एक (1)', tribal: 'Miyad', script: '𑣑𑣈𑣖𑣁𑣑', phonetic: 'मियाद' },
      { hindi: 'दो (2)', tribal: 'Baria', script: '𑣓𑣁𑣜𑣂𑣗𑣁', phonetic: 'बारिया' },
      { hindi: 'तीन (3)', tribal: 'Apea', script: '𑣁𑣑𑣂𑣗𑣁', phonetic: 'आपिया' },
      { hindi: 'चार (4)', tribal: 'Upunya', script: '𑣖𑣑𑣂𑣗𑣓𑣁', phonetic: 'उपुन्या' },
      { hindi: 'पांच (5)', tribal: 'Moya', script: '𑣑𑣉𑣗𑣁', phonetic: 'मोया' }
    ],
    steps: [
      {
        title: '☀️ Circle Time & Rhythm Chant',
        titleHindi: '☀️ संख्या लयबद्ध गीत',
        durationMinutes: 10,
        description: "Sing a rhythmic counting chant clapping hands: 'Miyad, Baria, Apea! Moya tit\\' te sab me!' (1, 2, 3! 5 उंगलियां पकड़ो!)",
        teacherScriptBilingual: 'शिक्षक: "बच्चों, तालियां बजाते हुए बोलेंगे: मियाद (1), बारिया (2), आपिया (3), उपुन्या (4), मोया (5)!"',
        studentResponseTribal: 'बच्चे ताली बजाते हुए हो भाषा में लय दोहराते हैं।',
        phoneticAid: 'मियाद, बारिया, आपिया, उपुन्या, मोया',
        pedagogicalTip: 'Rhythmic clapping connects motor memory with abstract numerical symbols.'
      },
      {
        title: '🗣️ Direct Instruction with Tamarind Seeds',
        titleHindi: '🗣️ इमली के बीजों से प्रत्यक्ष संख्या ज्ञान',
        durationMinutes: 15,
        description: 'Place tamarind seeds on the desk. Touch one by one counting aloud in Ho, then bridge to Hindi.',
        teacherScriptBilingual: 'शिक्षक: "ये देखो: मियाद (एक), बारिया (दो), आपिया (तीन)। कितने बीज हैं? आपिया!"',
        studentResponseTribal: 'बच्चे अंगुलियों से छूकर बोलते हैं: "आपिया!"',
        phoneticAid: 'आपिया (3)',
        pedagogicalTip: 'Tangible local concrete manipulatives remove math anxiety.'
      },
      {
        title: '🤝 Partner Count & Share',
        titleHindi: '🤝 जोड़ी में गिनो और बताओ',
        durationMinutes: 10,
        description: 'Distribute 5 seeds to each pair. One student places seeds, second student counts aloud in Ho.',
        teacherScriptBilingual: 'शिक्षक: "अपने साथी को 4 बीज दो और पूछो: कितना हुआ? साथी बोलेगा \'उपुन्या\'।"',
        studentResponseTribal: 'छात्र: "उपुन्या!" (4)',
        phoneticAid: 'उपुन्या (4)',
        pedagogicalTip: 'Encourage peer validation—children celebrate when their partner gets it right.'
      },
      {
        title: '✍️ Tactile Number Drawing',
        titleHindi: '✍️ मिट्टी या स्लेट पर अंक आकृतियां',
        durationMinutes: 8,
        description: 'Children draw 3 circles on their slates and place 3 seeds inside each circle.',
        teacherScriptBilingual: 'शिक्षक: "स्लेट पर 3 गोले बनाएं और प्रत्येक में एक बीज रखें।"',
        studentResponseTribal: 'स्लेट पर चित्र बनाकर हो संख्या बोलना।',
        phoneticAid: 'बारिया (2) / आपिया (3)',
        pedagogicalTip: 'Connecting quantity to visual representation is foundational FLN numeracy.'
      },
      {
        title: '🎯 Quick Exit Check',
        titleHindi: '🎯 त्वरित संख्या खेल',
        durationMinutes: 2,
        description: 'Teacher flashes 4 fingers: children shout out the Ho numeral.',
        teacherScriptBilingual: 'शिक्षक 4 उंगलियां दिखाते हैं: "कितनी उंगलियां?"',
        studentResponseTribal: 'सभी बच्चे: "उपुन्या!" (Upunya!)',
        phoneticAid: 'उपुन्या',
        pedagogicalTip: 'Instant subitizing recognition without needing to count one-by-one.'
      }
    ],
    diagnosticCheckHindi: 'क्या बच्चे 1 से 5 तक की वस्तुओं को देखकर सही हो संख्या बोल लेते हैं?',
    diagnosticCheckEnglish: 'Can children count 1 to 5 objects accurately in Ho language?'
  },
  {
    id: 'lp-mundari-grade2-plants',
    title: 'Parts of Plants & Forest Life in Mundari',
    titleHindi: 'पेड़-पौधे और जंगल के साथी (कक्षा 2 मुंडारी पर्यावरण व भाषा)',
    grade: 'Grade 2',
    subject: 'Literacy',
    targetLanguage: 'Mundari',
    duration: '45-Minute Daily',
    culturalTheme: 'Sacred grove & tree parts (सरहुल व सखुआ का पेड़)',
    nipunOutcomes: [
      'Children name parts of a tree (root, trunk, leaf, flower, fruit) in Mundari and Hindi',
      'Children construct simple oral sentences describing forest trees'
    ],
    nipunOutcomesHindi: [
      'बच्चे पेड़ के मुख्य अंगों (जड़, तना, पत्ती, फूल, फल) को मुंडारी व हिन्दी में पहचान सकें',
      'स्थानीय पौधों और पेड़ों पर सरल मौखिक वाक्य बोल सकें'
    ],
    keyVocabulary: [
      { hindi: 'पेड़ / वृक्ष', tribal: 'Daru', script: 'दारू', phonetic: 'दारू' },
      { hindi: 'पत्ती', tribal: 'Sakam', script: 'साकम', phonetic: 'साकम' },
      { hindi: 'फूल', tribal: 'Baha', script: 'बाहा', phonetic: 'बाहा' },
      { hindi: 'फल', tribal: 'Jowar', script: 'जोवार', phonetic: 'जोवार' },
      { hindi: 'जड़', tribal: 'Red', script: 'रेद', phonetic: 'रेद' }
    ],
    steps: [
      {
        title: '☀️ Outdoor Observation Walk',
        titleHindi: '☀️ विद्यालय परिसर में पेड़ अवलोकन',
        durationMinutes: 10,
        description: 'Take children near a tree in the schoolyard. Touch the trunk and leaf, discussing in Mundari.',
        teacherScriptBilingual: 'शिक्षक: "बच्चों, यह क्या है? मुंडारी में इसे \'दारू\' (Daru) कहते हैं।"',
        studentResponseTribal: 'बच्चे पेड़ को छूकर बोलते हैं: "दारू! साकम (पत्ती)!"',
        phoneticAid: 'दारू (Daru) / साकम (Sakam)',
        pedagogicalTip: 'Nature is the living textbook in tribal education; physical contact enlivens learning.'
      },
      {
        title: '🗣️ Parts of Plant Song',
        titleHindi: '🗣️ पेड़ के अंग: अभिनय गीत',
        durationMinutes: 15,
        description: 'Sing interactive rhyme touching feet for roots (रेद), body for trunk (दारू), hands for leaves (साकम), head for flower (बाहा).',
        teacherScriptBilingual: 'शिक्षक: "रेद-रेद जमीन में, दारू सीधा खड़ा, साकम हवा में झूमे, बाहा महके बड़ा!"',
        studentResponseTribal: 'बच्चे शारीरिक अभिनय के साथ मुंडारी शब्द दोहराते हैं।',
        phoneticAid: 'रेद, दारू, साकम, बाहा, जोवार',
        pedagogicalTip: 'Kinesthetic matching helps bilingual vocabulary retention for FLN Grade 2.'
      },
      {
        title: '🤝 Leaf Sorting Activity',
        titleHindi: '🤝 गिरे हुए पत्तों का वर्गीकरण',
        durationMinutes: 10,
        description: 'Children bring fallen leaves from the yard. In groups, count and sort them by shape in Mundari.',
        teacherScriptBilingual: 'शिक्षक: "साकम (पत्तियों) को छोटे और बड़े के अनुसार अलग करें।"',
        studentResponseTribal: 'समूह में पत्तियां गिनते हैं: "मियाद साकम, बारिया साकम..."',
        phoneticAid: 'साकम (पत्ती)',
        pedagogicalTip: 'Blends foundational numeracy (counting) with environmental science and tribal vocabulary.'
      },
      {
        title: '✍️ Leaf Rubbing Art on Paper',
        titleHindi: '✍️ पत्ते की छाप व नाम लेखन',
        durationMinutes: 8,
        description: 'Place leaf under paper and rub with crayon to reveal veins. Label with \'साकम\' and \'पत्ती\'.',
        teacherScriptBilingual: 'शिक्षक: "पत्ते पर रंग फेरें और ऊपर \'साकम\' लिखें।"',
        studentResponseTribal: 'बच्चे सुंदर पत्ते की छाप बनाकर मुंडारी शब्द लिखते हैं।',
        phoneticAid: 'साकम',
        pedagogicalTip: 'Integrates local indigenous Sohrai art patterns into language literacy.'
      },
      {
        title: '🎯 Exit Quiz',
        titleHindi: '🎯 त्वरित मौखिक प्रश्नोत्तरी',
        durationMinutes: 2,
        description: 'Hold up a yellow flower: "इसे मुंडारी में क्या कहते हैं?"',
        teacherScriptBilingual: 'शिक्षक फूल दिखाते हैं: "इसे मुंडारी में क्या कहते हैं?"',
        studentResponseTribal: 'छात्र: "बाहा!" (Baha!)',
        phoneticAid: 'बाहा',
        pedagogicalTip: 'Positive reinforcement with praise: "बुगी! बेस!" (बहुत अच्छा!)'
      }
    ],
    diagnosticCheckHindi: 'क्या बच्चे पेड़ के 3 से अधिक अंगों को मुंडारी में सही पहचान कर बोल लेते हैं?',
    diagnosticCheckEnglish: 'Can students identify at least 3 parts of a tree in Mundari?'
  }
];

export const INITIAL_PRONUNCIATION_WORDS: PronunciationPracticeWord[] = [
  {
    id: 'pron-1',
    hindiMeaning: 'नमस्ते / प्रणाम (झारखंड का पवित्र अभिवादन)',
    englishMeaning: 'Traditional respectful greeting (Hello / Greetings)',
    category: 'Greetings',
    language: 'Santhali',
    script: 'ᱡᱚᱦᱟᱨ',
    scriptName: 'Ol Chiki',
    romanized: 'Johar',
    devanagariPhonetic: 'जोहार',
    audioPronunciationText: 'जोहार',
    phoneticCoachingTip: 'दोनों हाथों को जोड़कर चेहरे पर सौम्य भाव के साथ "जो" को लंबा और "हार" को स्पष्ट बोलें।',
    phoneticCoachingTipHindi: 'दोनों हाथ जोड़कर "जोहार" बोलें। "जो" पर हल्का बल दें।',
    difficulty: 'Easy',
    sampleAudioPitch: [220, 240, 260, 230, 210]
  },
  {
    id: 'pron-2',
    hindiMeaning: 'शुभ प्रभात / सुबह की राम-राम',
    englishMeaning: 'Good morning',
    category: 'Greetings',
    language: 'Santhali',
    script: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ',
    scriptName: 'Ol Chiki',
    romanized: 'Sagun setah',
    devanagariPhonetic: 'सागुन सेताः',
    audioPronunciationText: 'सागुन सेताः',
    phoneticCoachingTip: 'महत्वपूर्ण: संथाली में "ᱥᱮᱛᱟᱜ" के अंत में "ग" को पूरा "ग" न बोलें! यह संथाली का checked consonant (गले में हल्की सांस रोकना) है, अतः "सेताः" जैसा हल्का विराम दें।',
    phoneticCoachingTipHindi: 'ध्यान दें: "सेताग" के अंत में पूरा "ग" न बोलकर गले में हल्का सांस रोकें ("सेताः")।',
    difficulty: 'Medium',
    sampleAudioPitch: [210, 250, 280, 220, 190]
  },
  {
    id: 'pron-3',
    hindiMeaning: 'बैठ जाओ (कक्षा निर्देश)',
    englishMeaning: 'Sit down (Classroom directive)',
    category: 'Classroom',
    language: 'Santhali',
    script: 'ᱫᱷᱩᱲᱩᱵ ᱢᱮ',
    scriptName: 'Ol Chiki',
    romanized: 'Dhurub me',
    devanagariPhonetic: 'धुरुब मे',
    audioPronunciationText: 'धुरुब मे',
    phoneticCoachingTip: '"धु" पर कोमल तालव्य उच्चारण करें और "मे" को संक्षिप्त रखें।',
    phoneticCoachingTipHindi: 'कक्षा में हाथ से नीचे बैठने का इशारा करते हुए "धुरुब मे" कहें।',
    difficulty: 'Easy',
    sampleAudioPitch: [240, 230, 210, 190]
  },
  {
    id: 'pron-4',
    hindiMeaning: 'किताब / पुस्तक',
    englishMeaning: 'Book',
    category: 'Classroom',
    language: 'Santhali',
    script: 'ᱯᱩᱛᱷᱤ',
    scriptName: 'Ol Chiki',
    romanized: 'Puthi',
    devanagariPhonetic: 'पुथी',
    audioPronunciationText: 'पुथी',
    phoneticCoachingTip: '"पु" के बाद "थी" पर महाप्राण ध्वनि (aspirated th) स्पष्ट निकालें।',
    phoneticCoachingTipHindi: '"पुथी" बोलते समय "थी" पर जोर दें।',
    difficulty: 'Easy',
    sampleAudioPitch: [230, 270, 220]
  },
  {
    id: 'pron-5',
    hindiMeaning: 'पानी (जीवनदायिनी धारा)',
    englishMeaning: 'Water',
    category: 'Glottal Stops',
    language: 'Santhali',
    script: 'ᱫᱟᱜ',
    scriptName: 'Ol Chiki',
    romanized: "Da'",
    devanagariPhonetic: 'दाः',
    audioPronunciationText: 'दाः',
    phoneticCoachingTip: 'अत्यंत विशिष्ट स्वर: साधारण हिन्दी "दाग" नहीं है! अंतिम ध्वनि गले में रुकती है (glottal stop)। इसे "दा" बोलकर तुरंत स्वर बंद करें (दाः)।',
    phoneticCoachingTipHindi: 'विशेष: संथाली में "दाग" नहीं बल्कि "दाः" बोलें। गले की सांस को झटके से रोकें।',
    difficulty: 'Challenging',
    sampleAudioPitch: [260, 290, 180]
  },
  {
    id: 'pron-6',
    hindiMeaning: 'पेड़ / सखुआ का वृक्ष',
    englishMeaning: 'Tree',
    category: 'Nature',
    language: 'Santhali',
    script: 'ᱫᱟᱨᱮ',
    scriptName: 'Ol Chiki',
    romanized: 'Dare',
    devanagariPhonetic: 'दारे',
    audioPronunciationText: 'दारे',
    phoneticCoachingTip: '"दा" और "रे" दोनों स्पष्ट व मधुर ध्वनियां हैं।',
    phoneticCoachingTipHindi: 'मधुर आवाज में "दारे" बोलें।',
    difficulty: 'Easy',
    sampleAudioPitch: [220, 240, 210]
  },
  {
    id: 'pron-7',
    hindiMeaning: 'एक (1) - हो भाषा संख्या',
    englishMeaning: 'One (Numeral 1)',
    category: 'Numbers',
    language: 'Ho',
    script: '𑣑𑣈𑣖𑣁𑣑',
    scriptName: 'Warang Chiti',
    romanized: 'Miyad',
    devanagariPhonetic: 'मियाद',
    audioPronunciationText: 'मियाद',
    phoneticCoachingTip: 'हो भाषा में 1 को "मियाद" कहते हैं। अंतिम "द" पर हल्का विराम दें।',
    phoneticCoachingTipHindi: 'उंगली से 1 दिखाते हुए "मियाद" बोलें।',
    difficulty: 'Easy',
    sampleAudioPitch: [230, 250, 210]
  },
  {
    id: 'pron-8',
    hindiMeaning: 'दो (2) - हो भाषा संख्या',
    englishMeaning: 'Two (Numeral 2)',
    category: 'Numbers',
    language: 'Ho',
    script: '𑣓𑣁𑣜𑣂𑣗𑣁',
    scriptName: 'Warang Chiti',
    romanized: 'Baria',
    devanagariPhonetic: 'बारिया',
    audioPronunciationText: 'बारिया',
    phoneticCoachingTip: '"बा-रि-या" तीनों अक्षरों को समान गति से बोलें।',
    phoneticCoachingTipHindi: 'दो उंगलियां दिखाते हुए "बारिया" बोलें।',
    difficulty: 'Easy',
    sampleAudioPitch: [210, 230, 240]
  },
  {
    id: 'pron-9',
    hindiMeaning: 'तीन (3) - हो भाषा संख्या',
    englishMeaning: 'Three (Numeral 3)',
    category: 'Numbers',
    language: 'Ho',
    script: '𑣁𑣑𑣂𑣗𑣁',
    scriptName: 'Warang Chiti',
    romanized: 'Apea',
    devanagariPhonetic: 'आपिया',
    audioPronunciationText: 'आपिया',
    phoneticCoachingTip: '"आ" को लंबा खींचकर "पिया" को जल्दी जोड़ें।',
    phoneticCoachingTipHindi: 'तीन उंगलियां दिखाते हुए "आपिया" बोलें।',
    difficulty: 'Easy',
    sampleAudioPitch: [220, 260, 230]
  },
  {
    id: 'pron-10',
    hindiMeaning: 'फूल (प्रकृति का उपहार)',
    englishMeaning: 'Flower',
    category: 'Nature',
    language: 'Mundari',
    script: 'बाहा',
    scriptName: 'Devanagari',
    romanized: 'Baha',
    devanagariPhonetic: 'बाहा',
    audioPronunciationText: 'बाहा',
    phoneticCoachingTip: 'दोनों अक्षर दीर्घ "ा" की मात्रा के साथ हैं: बा-हा। सरहुल में सखुआ फूल को बाहा कहते हैं।',
    phoneticCoachingTipHindi: 'हल्की मुस्कान के साथ "बाहा" बोलें।',
    difficulty: 'Easy',
    sampleAudioPitch: [240, 260, 220]
  },
  {
    id: 'pron-11',
    hindiMeaning: 'बहुत अच्छा! शाबाश! (प्रोत्साहन)',
    englishMeaning: 'Very good! Well done! (Praise)',
    category: 'Classroom',
    language: 'Santhali',
    script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ',
    scriptName: 'Ol Chiki',
    romanized: 'Adi napay',
    devanagariPhonetic: 'अडी नापाय',
    audioPronunciationText: 'अडी नापाय',
    phoneticCoachingTip: 'कक्षा में बच्चों की सराहना के लिए इसका प्रयोग करें। "अडी" का अर्थ बहुत, "नापाय" का अर्थ अच्छा।',
    phoneticCoachingTipHindi: 'तालियां बजाते हुए "अडी नापाय" बोलकर बच्चों का उत्साहवर्धन करें।',
    difficulty: 'Medium',
    sampleAudioPitch: [220, 270, 250, 230]
  },
  {
    id: 'pron-12',
    hindiMeaning: 'सूर्य / सूरज देवता',
    englishMeaning: 'Sun (Singbonga / Nature divinity)',
    category: 'Nature',
    language: 'Ho',
    script: '𑣑𑣂𑣑𑣂',
    scriptName: 'Warang Chiti',
    romanized: 'Singi',
    devanagariPhonetic: 'सिंगी',
    audioPronunciationText: 'सिंगी',
    phoneticCoachingTip: 'हो और मुंडारी में सूर्य को "सिंगी" (Singi) कहते हैं। "सीं" पर अनुस्वार का हल्का नासिक्य स्वर रहता है।',
    phoneticCoachingTipHindi: 'आसमान की ओर संकेत करते हुए "सिंगी" बोलें।',
    difficulty: 'Easy',
    sampleAudioPitch: [230, 250, 220]
  }
];

export const INITIAL_CONTEXTUAL_EXAMPLES: ContextualExampleData[] = [
  {
    id: 'ctx-addition-sarhul',
    concept: 'Foundational Addition (1 to 10)',
    conceptHindi: 'बुनियादी जोड़ (1 से 10 तक संख्या संक्रिया)',
    targetLanguage: 'Santhali',
    culturalAnalogy: 'Sarhul Festival Sal Flower Offerings: Combining 3 Sal blossoms from one grove with 2 Sal blossoms from another creates 5 blossoms (Mid, Bar, Pe, Pon, More) for the village priest (Naike).',
    culturalAnalogyHindi: 'सरहुल पर्व में सखुआ (साल) के फूल: जब गांव के पुजारी (नायके बाबा) को एक थाली में 3 सखुआ फूल (Pe baha) और दूसरी थाली से 2 सखुआ फूल (Bar baha) मिलाकर भेंट किए जाते हैं, तो कुल 5 फूल (More baha) बनते हैं।',
    classroomMicroStory: {
      title: 'Mangal and Sombari at the Spring Stream',
      titleHindi: 'मंगल और सोमबारी की महुआ टोकरी',
      storyHindi: 'सुबह-सुबह मंगल ने महुआ के पेड़ के नीचे से 4 गिरे हुए फूल (Pon baha) चुने। उसकी छोटी बहन सोमबारी दौड़कर आई और उसने 3 और फूल (Pe baha) टोकरी में डाल दिए। दोनों ने मिलकर गिना: 1, 2, 3, 4, 5, 6, 7 (Yay baha)! वे खुश होकर घर दौड़े।',
      tribalPhrases: [
        { tribal: 'Pon baha', script: 'ᱯᱚᱱ ᱵᱟᱦᱟ', phonetic: 'पोन बाहा', meaning: '4 फूल' },
        { tribal: 'Pe baha', script: 'ᱯᱮ ᱵᱟᱦᱟ', phonetic: 'पे बाहा', meaning: '3 फूल' },
        { tribal: 'Yay baha', script: 'ᱭᱟᱭ ᱵᱟᱦᱟ', phonetic: 'याय बाहा', meaning: '7 फूल' }
      ]
    },
    classroomActivity: {
      title: 'Tamarind Seed Grove Math Game',
      titleHindi: 'इमली के बीज और पत्ते वाला जोड़ खेल',
      materialsNeeded: 'विद्यालय परिसर से गिरे इमली के बीज (या कंकड़) और दो साल के पत्ते (सखुआ पत्ता)।',
      stepByStepHindi: [
        'प्रत्येक बच्चे की मेज पर दो सखुआ पत्ते रखें।',
        'पहले पत्ते पर 3 बीज और दूसरे पत्ते पर 2 बीज रखने को कहें।',
        'संथाली में कहें: "ᱢᱤᱫ ᱴᱷᱮᱱ ᱢᱮᱥᱟᱭ ᱯᱮ" (Mid then mesay pe / दोनों को एक साथ मिलाओ)।',
        'बच्चे बीजों को अपनी हथेली में मिलाकर एक साथ गिनेंगे: 1, 2, 3, 4, 5!',
        'शिक्षक श्यामपट्ट पर लिखेंगे: 3 + 2 = 5 और बच्चे संथाली में बोलेंगे: "ᱢᱚᱬᱮ" (More)!'
      ]
    }
  },
  {
    id: 'ctx-shapes-sohrai',
    concept: '2D Geometric Shapes & Spatial Sense',
    conceptHindi: 'आकृतियां और आकृतियों की पहचान (त्रिभुज, वृत्त, चौकोर)',
    targetLanguage: 'Ho',
    culturalAnalogy: 'Sohrai & Khovar Mud Wall Murals: Traditional tribal homes feature triangular mountain peaks (बुरु), circular suns (सिंगी), and wave patterns painted with local red (गेरू) and white clay (दुधी मिट्टी).',
    culturalAnalogyHindi: 'सोहराई भित्ति चित्र और ज्यामिति: आदिवासी घरों की मिट्टी की दीवारों पर बने सोहराई चित्रों में तीन कोनों वाले पहाड़ (बुरु / त्रिभुज), गोल सूरज (सिंगी / वृत्त), और चौकोर आंगन (चतुर्भुज) प्रकृति के गहरे गणितीय रूप हैं।',
    classroomMicroStory: {
      title: 'Birsa Decorates the School Wall',
      titleHindi: 'बिरसा और सोहराई आकृतियां',
      storyHindi: 'दीपावली के बाद सोहराई पर्व पर बिरसा ने अपनी कक्षा की दीवार पर गेरू से तीन कोनों वाला सुंदर पहाड़ बनाया। गुरुजी ने पूछा: "इसके कितने कोने हैं?" बिरसा ने गिना: "आपिया (3)!" फिर उसने ऊपर गोल सिंगी (सूरज) बनाया। पूरी कक्षा खुशी से झूम उठी।',
      tribalPhrases: [
        { tribal: 'Apea kona', script: '𑣁𑣑𑣂𑣗𑣁 𑣏𑣉𑣓𑣁', phonetic: 'आपिया कोना', meaning: 'तीन कोने (त्रिभुज)' },
        { tribal: 'Gol singi', script: '𑣋𑣉𑣚 𑣑𑣂𑣑𑣂', phonetic: 'गोल सिंगी', meaning: 'गोल सूरज (वृत्त)' }
      ]
    },
    classroomActivity: {
      title: 'Stick & Clay Shape Builders',
      titleHindi: 'बांस की तीली और मिट्टी से आकृतियां बनाना',
      materialsNeeded: 'झाड़ू की सींकें (या पतली बांस की तीलियां) और गीली मिट्टी की छोटी गोलियां।',
      stepByStepHindi: [
        'बच्चों को 3-3 तीलियां और मिट्टी की गोलियां दें।',
        'तीलियों को मिट्टी के कोनों में जोड़कर त्रिभुज (बुरु / पहाड़) बनाने को कहें।',
        'पूछें: "कितनी तीलियां लगीं?" बच्चे हो भाषा में जवाब देंगे: "आपिया!" (3)',
        'फिर 4 तीलियां देकर चौकोर (घर का कमरा) बनाने को कहें: "उपुन्या!" (4)',
        'इस प्रकार बच्चे बिना किसी रटने के ज्यामितीय कोनों और भुजाओं को अपनी स्थानीय कला से सीख जाते हैं।'
      ]
    }
  },
  {
    id: 'ctx-measurement-haat',
    concept: 'Non-Standard Measurement & Comparison',
    conceptHindi: 'मापन: लंबा-छोटा, भारी-हल्का (स्थानीय हाट-बाजार संदर्भ)',
    targetLanguage: 'Mundari',
    culturalAnalogy: 'Weekly Village Haat (हाट बाजार) Measurement: In tribal weekly markets, grain is measured in bamboo bowls (पइला / Paila) and bamboo strips are measured by hand-spans (बीत्ता / Bitta) and cubits (हाथ / Hathe).',
    culturalAnalogyHindi: 'साप्ताहिक हाट-बाजार का नाप-तौल: आदिवासी ग्रामीण हाट में महुआ और धान को लकड़ी के \'पइला\' से नापते हैं, और चटाई व रस्सियों को \'बीत्ता\' (हाथ की बित्ता) से नापते हैं।',
    classroomMicroStory: {
      title: 'Somra goes to the Tuesday Haat',
      titleHindi: 'सोमरा की हाट यात्रा',
      storyHindi: 'सोमरा अपनी दादी के साथ मंगलवार की हाट गया। दादी ने बांस की टोकरी नापने के लिए अपने हाथ का उपयोग किया: एक बीत्ता, दो बीत्ता! फिर उन्होंने 3 पइला धान देकर सुंदर मिट्टी की सुराही ली। सोमरा ने सीखा कि हमारे हाथ और बर्तन ही हमारे पहले तराजू और नाप हैं।',
      tribalPhrases: [
        { tribal: 'Miyad paila', script: 'मियाद पइला', phonetic: 'मियाद पइला', meaning: '1 पइला (मापक कटोरा)' },
        { tribal: 'Marang daru', script: 'मारांग दारू', phonetic: 'मारांग दारू', meaning: 'बड़ा/लंबा पेड़' }
      ]
    },
    classroomActivity: {
      title: 'Classroom Hand-Span Measurement Hunt',
      titleHindi: 'कक्षा बित्ता (Hand-span) नाप खोज खेल',
      materialsNeeded: 'बच्चों की स्वयं की हथेलियां, स्लेट, पाठ्यपुस्तक और कक्षा की मेज।',
      stepByStepHindi: [
        'बच्चों को सिखाएं कि अंगूठे से कनिष्ठिका उंगली तक की दूरी \'एक बित्ता\' है।',
        'अपनी स्लेट को नापें: "यह कितने बित्ते की है?" (मुंडारी में 1, 2 गिनें)।',
        'फिर अपनी कक्षा की मेज को नापें।',
        'तुलना करें: कौन सा लंबा है (मारांग) और कौन सा छोटा है (हुडिंग)।',
        'बच्चे प्रत्यक्ष अनुभव से लंबाई की अवधारणा को आत्मसात करते हैं।'
      ]
    }
  }
];

export const CROSS_LANGUAGE_DICTIONARY: CrossLanguageDictionaryEntry[] = [
  {
    id: 'dict-1',
    hindi: 'नमस्ते / प्रणाम / जोहार',
    english: 'Hello / Respectful Greeting',
    category: 'Classroom',
    santhali: { script: 'ᱡᱚᱦᱟᱨ', roman: 'Johar', phonetic: 'जोहार' },
    ho: { script: '𑣓𑣉𑣄𑣁𑣜', roman: 'Johar', phonetic: 'जोहार' },
    mundari: { script: 'जोहार', roman: 'Johar', phonetic: 'जोहार' },
    culturalUsageNoteHindi: 'झारखंड की सभी जनजातियों का पारंपरिक आदरसूचक अभिवादन। दोनों हाथ जोड़कर बोला जाता है।',
    culturalUsageNoteEnglish: 'Universal respectful tribal greeting in Jharkhand, spoken with folded hands.'
  },
  {
    id: 'dict-2',
    hindi: 'पानी / जल',
    english: 'Water',
    category: 'Nature',
    santhali: { script: 'ᱫᱟᱜ', roman: "Da'", phonetic: 'दाः' },
    ho: { script: '𑣑𑣁𑣄', roman: "Da'", phonetic: 'दाः' },
    mundari: { script: 'दाः / Da', roman: "Da'", phonetic: 'दाः' },
    culturalUsageNoteHindi: 'संथाली और हो में अंतिम ध्वनि पर glottal stop (गले में हल्का विराम) होता है।',
    culturalUsageNoteEnglish: 'Pronounced with a characteristic checked glottal stop at the end.'
  },
  {
    id: 'dict-3',
    hindi: 'किताब / पुस्तक',
    english: 'Book',
    category: 'Classroom',
    santhali: { script: 'ᱯᱩᱛᱷᱤ', roman: 'Puthi', phonetic: 'पुथी' },
    ho: { script: '𑣑𑣖𑣕𑣂', roman: 'Puthi', phonetic: 'पुथी' },
    mundari: { script: 'पुथी', roman: 'Puthi', phonetic: 'पुथी' },
    culturalUsageNoteHindi: 'विद्यालय में पठन-पाठन की पाठ्यपुस्तक को पुथी कहा जाता है।',
    culturalUsageNoteEnglish: 'Standard school reading textbook.'
  },
  {
    id: 'dict-4',
    hindi: 'पेड़ / वृक्ष',
    english: 'Tree',
    category: 'Nature',
    santhali: { script: 'ᱫᱟᱨᱮ', roman: 'Dare', phonetic: 'दारे' },
    ho: { script: '𑣑𑣁𑣜𑣖', roman: 'Daru', phonetic: 'दारू' },
    mundari: { script: 'दारू', roman: 'Daru', phonetic: 'दारू' },
    culturalUsageNoteHindi: 'झारखंड में सखुआ (साल) और महुआ के पेड़ जीवन और संस्कृति के केंद्र हैं।',
    culturalUsageNoteEnglish: 'Sacred Sal and Mahua trees central to tribal life and worship.'
  },
  {
    id: 'dict-5',
    hindi: 'सूरज / सूर्य',
    english: 'Sun',
    category: 'Nature',
    santhali: { script: 'ᱥᱤᱧ ᱪᱟᱸᱫᱚ', roman: 'Sin Chando', phonetic: 'सिं चांदो' },
    ho: { script: '𑣑𑣂𑣑𑣂', roman: 'Singi', phonetic: 'सिंगी' },
    mundari: { script: 'सिंगी', roman: 'Singi', phonetic: 'सिंगी' },
    culturalUsageNoteHindi: 'प्रकृति पूजक जनजातियों में सूर्य जीवन और ऊर्जा का मुख्य प्रतीक है।',
    culturalUsageNoteEnglish: 'Symbol of light, warmth and spiritual divinity.'
  },
  {
    id: 'dict-6',
    hindi: 'फूल',
    english: 'Flower',
    category: 'Nature',
    santhali: { script: 'ᱵᱟᱦᱟ', roman: 'Baha', phonetic: 'बाहा' },
    ho: { script: '𑣓𑣁𑣄𑣁', roman: 'Baha', phonetic: 'बाहा' },
    mundari: { script: 'बाहा', roman: 'Baha', phonetic: 'बाहा' },
    culturalUsageNoteHindi: 'सरहुल पर्व को संथाली और मुंडारी में "बाहा पर्व" भी कहा जाता है।',
    culturalUsageNoteEnglish: 'Sarhul spring festival is also celebrated as the Baha flower festival.'
  },
  {
    id: 'dict-7',
    hindi: 'एक (1)',
    english: 'One (1)',
    category: 'Numbers',
    santhali: { script: 'ᱢᱤᱫ', roman: 'Mid', phonetic: 'मिद' },
    ho: { script: '𑣑𑣈𑣖𑣁𑣑', roman: 'Miyad', phonetic: 'मियाद' },
    mundari: { script: 'मियाद', roman: 'Miyad', phonetic: 'मियाद' },
    culturalUsageNoteHindi: 'संख्या ज्ञान की प्रारंभिक इकाई।',
    culturalUsageNoteEnglish: 'Foundational numeral 1.'
  },
  {
    id: 'dict-8',
    hindi: 'दो (2)',
    english: 'Two (2)',
    category: 'Numbers',
    santhali: { script: 'ᱵᱟᱨ', roman: 'Bar', phonetic: 'बार' },
    ho: { script: '𑣓𑣁𑣜𑣂𑣗𑣁', roman: 'Baria', phonetic: 'बारिया' },
    mundari: { script: 'बारिया', roman: 'Baria', phonetic: 'बारिया' },
    culturalUsageNoteHindi: 'जोड़ी या दो वस्तुओं के लिए प्रयुक्त।',
    culturalUsageNoteEnglish: 'Foundational numeral 2.'
  },
  {
    id: 'dict-9',
    hindi: 'तीन (3)',
    english: 'Three (3)',
    category: 'Numbers',
    santhali: { script: 'ᱯᱮ', roman: 'Pe', phonetic: 'पे' },
    ho: { script: '𑣁𑣑𑣂𑣗𑣁', roman: 'Apea', phonetic: 'आपिया' },
    mundari: { script: 'आपिया', roman: 'Apea', phonetic: 'आपिया' },
    culturalUsageNoteHindi: 'त्रिभुज और संख्या 3 का आधार।',
    culturalUsageNoteEnglish: 'Foundational numeral 3.'
  },
  {
    id: 'dict-10',
    hindi: 'चार (4)',
    english: 'Four (4)',
    category: 'Numbers',
    santhali: { script: 'ᱯᱚᱱ', roman: 'Pon', phonetic: 'पोन' },
    ho: { script: '𑣖𑣑𑣂𑣗𑣓𑣁', roman: 'Upunya', phonetic: 'उपुन्या' },
    mundari: { script: 'उपुन्या', roman: 'Upunya', phonetic: 'उपुन्या' },
    culturalUsageNoteHindi: 'चौकोर और चार दिशाओं के लिए।',
    culturalUsageNoteEnglish: 'Foundational numeral 4.'
  },
  {
    id: 'dict-11',
    hindi: 'पांच (5)',
    english: 'Five (5)',
    category: 'Numbers',
    santhali: { script: 'ᱢᱚᱬᱮ', roman: 'More', phonetic: 'मोड़े' },
    ho: { script: '𑣑𑣉𑣗𑣁', roman: 'Moya', phonetic: 'मोया' },
    mundari: { script: 'मोड़े / Moya', roman: 'Mode', phonetic: 'मोड़े' },
    culturalUsageNoteHindi: 'हाथ की 5 उंगलियां (पंजे की गिनती)।',
    culturalUsageNoteEnglish: 'Foundational numeral 5 representing one hand.'
  },
  {
    id: 'dict-12',
    hindi: 'बैठो / बैठ जाओ',
    english: 'Sit down',
    category: 'Actions',
    santhali: { script: 'ᱫᱷᱩᱲᱩᱵ ᱢᱮ', roman: 'Dhurub me', phonetic: 'धुरुब मे' },
    ho: { script: '𑣑𑣖𑣓𑣖𑣓 𑣑𑣈', roman: 'Dubun me', phonetic: 'दुबुन मे' },
    mundari: { script: 'दुबुन मे', roman: 'Dubun me', phonetic: 'दुबुन मे' },
    culturalUsageNoteHindi: 'कक्षा में बच्चों को अपनी जगह पर बैठने का विनम्र निर्देश।',
    culturalUsageNoteEnglish: 'Standard classroom directive to take a seat.'
  },
  {
    id: 'dict-13',
    hindi: 'खड़े हो जाओ',
    english: 'Stand up',
    category: 'Actions',
    santhali: { script: 'ᱛᱤᱸᱜᱩᱱ ᱢᱮ', roman: 'Tingun me', phonetic: 'तिंगुन मे' },
    ho: { script: '𑣕𑣂𑣑𑣖𑣓 𑣑𑣈', roman: 'Tingun me', phonetic: 'तिंगुन मे' },
    mundari: { script: 'तिंगुन मे', roman: 'Tingun me', phonetic: 'तिंगुन मे' },
    culturalUsageNoteHindi: 'कक्षा में खड़े होकर उत्तर देने या गतिविधि करने का निर्देश।',
    culturalUsageNoteEnglish: 'Classroom directive to rise or stand up.'
  },
  {
    id: 'dict-14',
    hindi: 'पढ़ो / पढ़ना',
    english: 'Read / Study',
    category: 'Classroom',
    santhali: { script: 'ᱯᱟᱲᱦᱟᱣ ᱢᱮ', roman: 'Parhaw me', phonetic: 'पढ़ाव मे' },
    ho: { script: '𑣉𑣓𑣉𑣚 𑣑𑣈', roman: 'Olol me', phonetic: 'ओलोल मे' },
    mundari: { script: 'पढ़ाव मे', roman: 'Parhaw me', phonetic: 'पढ़ाव मे' },
    culturalUsageNoteHindi: 'पुस्तक पढ़ने का निर्देश।',
    culturalUsageNoteEnglish: 'Directive to read text or book.'
  },
  {
    id: 'dict-15',
    hindi: 'लिखो / लिखना',
    english: 'Write',
    category: 'Classroom',
    santhali: { script: 'ᱚᱞ ᱢᱮ', roman: 'Ol me', phonetic: 'ओल मे' },
    ho: { script: '𑣉𑣚 𑣑𑣈', roman: 'Ol me', phonetic: 'ओल मे' },
    mundari: { script: 'ओल मे', roman: 'Ol me', phonetic: 'ओल मे' },
    culturalUsageNoteHindi: 'स्लेट या कॉपी पर अक्षर लिखने का निर्देश (ओल चिकी का "ओल" भी इसी से बना है)।',
    culturalUsageNoteEnglish: 'Directive to write (Ol Chiki name derives from Ol meaning to write).'
  },
  {
    id: 'dict-16',
    hindi: 'घर / मकान',
    english: 'Home / House',
    category: 'Family',
    santhali: { script: 'ᱚᱲᱟᱜ', roman: "Orah", phonetic: 'ओड़ाः' },
    ho: { script: '𑣉𑣟𑣁𑣄', roman: "Owa'", phonetic: 'ओवाः' },
    mundari: { script: 'ओड़ाः', roman: "Orah", phonetic: 'ओड़ाः' },
    culturalUsageNoteHindi: 'मिट्टी और खपरैल का सुंदर आदिवासी घर।',
    culturalUsageNoteEnglish: 'Traditional earthen home with thatched or tiled roof.'
  },
  {
    id: 'dict-17',
    hindi: 'मां / माताजी',
    english: 'Mother',
    category: 'Family',
    santhali: { script: 'ᱟᱭᱳ', roman: 'Ayo', phonetic: 'आयो' },
    ho: { script: '𑣈𑣑𑣁', roman: 'Enga', phonetic: 'एंगा' },
    mundari: { script: 'एंगा / आयो', roman: 'Ayo', phonetic: 'आयो' },
    culturalUsageNoteHindi: 'मातृभाषा में मां का अत्यंत आत्मीय संबोधन।',
    culturalUsageNoteEnglish: 'Affectionate native term for mother.'
  },
  {
    id: 'dict-18',
    hindi: 'पिताजी / बापू',
    english: 'Father',
    category: 'Family',
    santhali: { script: 'ᱵᱟᱵᱟ', roman: 'Baba', phonetic: 'बाबा' },
    ho: { script: '𑣁𑣑𑣖', roman: 'Apu', phonetic: 'आपु' },
    mundari: { script: 'आपु / बाबा', roman: 'Apu', phonetic: 'आपु' },
    culturalUsageNoteHindi: 'पिता के लिए सम्मानजनक संबोधन।',
    culturalUsageNoteEnglish: 'Respectful term for father.'
  },
  {
    id: 'dict-19',
    hindi: 'बच्चा / बालक / बालिका',
    english: 'Child / Student',
    category: 'Family',
    santhali: { script: 'ᱜᱤᱫᱽᱨᱟᱹ', roman: 'Gidra', phonetic: 'गिदरा' },
    ho: { script: '𑣄𑣉𑣓', roman: 'Hon', phonetic: 'होन' },
    mundari: { script: 'होन / गिदरा', roman: 'Hon', phonetic: 'होन' },
    culturalUsageNoteHindi: 'कक्षा के नन्हे छात्र-छात्राओं के लिए वात्सल्यपूर्ण शब्द।',
    culturalUsageNoteEnglish: 'Affectionate word for young child or pupil.'
  },
  {
    id: 'dict-20',
    hindi: 'हाथ',
    english: 'Hand',
    category: 'Body',
    santhali: { script: 'ᱛᱤ', roman: 'Ti', phonetic: 'ती' },
    ho: { script: '𑣕𑣂', roman: 'Ti', phonetic: 'ती' },
    mundari: { script: 'ती', roman: 'Ti', phonetic: 'ती' },
    culturalUsageNoteHindi: 'ताली बजाने और हाथ धोकर भोजन करने की आदतों में प्रयुक्त।',
    culturalUsageNoteEnglish: 'Body part hand, used in clapping and sanitation rhymes.'
  },
  {
    id: 'dict-21',
    hindi: 'आंख',
    english: 'Eye',
    category: 'Body',
    santhali: { script: 'ᱢᱮᱫ', roman: 'Med', phonetic: 'मेद' },
    ho: { script: '𑣑𑣈𑣑', roman: 'Med', phonetic: 'मेद' },
    mundari: { script: 'मेद', roman: 'Med', phonetic: 'मेद' },
    culturalUsageNoteHindi: 'देखने और वर्ण पहचानने की शारीरिक गतिविधि में।',
    culturalUsageNoteEnglish: 'Organ of sight, used in observation tasks.'
  },
  {
    id: 'dict-22',
    hindi: 'कान',
    english: 'Ear',
    category: 'Body',
    santhali: { script: 'ᱞᱩᱛᱩᱨ', roman: 'Lutur', phonetic: 'लुंतुर' },
    ho: { script: '𑣚𑣖𑣕𑣖𑣜', roman: 'Lutur', phonetic: 'लुंतुर' },
    mundari: { script: 'लुतुर', roman: 'Lutur', phonetic: 'लुंतुर' },
    culturalUsageNoteHindi: '"ध्यान से सुनो" निर्देश में कान की ओर इशारा करने के लिए।',
    culturalUsageNoteEnglish: 'Organ of hearing, used in listening comprehension.'
  },
  {
    id: 'dict-23',
    hindi: 'चिड़िया / पक्षी',
    english: 'Bird',
    category: 'Animals',
    santhali: { script: 'ᱪᱮᱬᱮ', roman: 'Chene', phonetic: 'चेणे' },
    ho: { script: '𑣏𑣈𑣓𑣈', roman: 'Chene', phonetic: 'चेणे' },
    mundari: { script: 'चेणे', roman: 'Chene', phonetic: 'चेणे' },
    culturalUsageNoteHindi: 'झारखंड के जंगलों की रंग-बिरंगी चिड़ियों की पहचान में।',
    culturalUsageNoteEnglish: 'Forest birds in local folklore.'
  },
  {
    id: 'dict-24',
    hindi: 'नदी / धारा',
    english: 'River / Stream',
    category: 'Nature',
    santhali: { script: 'ᱜᱟᱰᱟ', roman: 'Gada', phonetic: 'गाडा' },
    ho: { script: '𑣄𑣁𑣑𑣁', roman: 'Gada', phonetic: 'गाडा' },
    mundari: { script: 'गाडा', roman: 'Gada', phonetic: 'गाडा' },
    culturalUsageNoteHindi: 'दामोदर, सुवर्णरेखा और कोयल जैसी पावन नदियों के लिए।',
    culturalUsageNoteEnglish: 'Flowing river or local seasonal stream.'
  },
  {
    id: 'dict-25',
    hindi: 'बहुत अच्छा / शाबाश',
    english: 'Very Good / Excellent',
    category: 'Classroom',
    santhali: { script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ', roman: 'Adi napay', phonetic: 'अडी नापाय' },
    ho: { script: '𑣓𑣖𑣄𑣂', roman: 'Bugi', phonetic: 'बुगी' },
    mundari: { script: 'बुगी / बेस', roman: 'Bugi / Bes', phonetic: 'बुगी' },
    culturalUsageNoteHindi: 'कक्षा में बच्चों के सही उत्तर पर प्रशंसा और आत्मविश्वास बढ़ाने के लिए।',
    culturalUsageNoteEnglish: 'Praise term to encourage students.'
  }
];
