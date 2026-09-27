// Detailed interactive content for all Cultural Stories, Songs, Folklore and Games
// Tailored for Jharkhand MTB-MLE Foundational Literacy & Numeracy (FLN) in Ho, Mundari, and Santhali

export interface SongVerse {
  lineNum: number;
  scriptText: string;
  romanText: string;
  hindiText: string;
  englishText: string;
}

export interface SongDetails {
  id: string;
  title: string;
  rhythmBpm: number;
  drumPattern: 'karam' | 'sohrai' | 'mage' | 'baha' | 'jadur' | 'nursery';
  instrumentTip: string;
  verses: SongVerse[];
  danceStepsSummary: string;
}

export interface StoryScene {
  sceneNum: number;
  sceneTitleHindi: string;
  sceneTitleTribal: string;
  illustrationIcon: string;
  paragraphScript: string;
  paragraphRoman: string;
  paragraphHindi: string;
  paragraphEnglish: string;
  keyVocabulary: { word: string; roman: string; meaning: string }[];
}

export interface StoryQuizQuestion {
  questionHindi: string;
  questionEnglish: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StoryDetails {
  id: string;
  moralLesson: string;
  culturalInsight: string;
  scenes: StoryScene[];
  quiz: StoryQuizQuestion[];
  sequencingSteps?: string[];
}

// -------------------------------------------------------------
// SONG DETAILS FOR ALL SONGS (c2, c5, c7, c8, c10, c11, c14)
// -------------------------------------------------------------
export const SONG_DETAILS: Record<string, SongDetails> = {
  c2: {
    id: 'c2',
    title: 'करम नृत्य गीत (Ho Karam Song)',
    rhythmBpm: 92,
    drumPattern: 'karam',
    instrumentTip: 'मांदर (Dumang) और नगाड़ा (Dama) की ताल: धिन-ता, धिन-ता, धा-धिन-ता!',
    danceStepsSummary: 'लड़के आगे मांदर बजाते हैं और लड़कियां पीछे हाथ में हाथ डालकर अर्धचंद्राकार कदमताल करती हैं।',
    verses: [
      {
        lineNum: 1,
        scriptText: '𑢱𑣎𑣜𑣉𑣖 𑢯𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂,',
        romanText: 'Karam durang Ho hon ko lagid,',
        hindiText: 'करम गीत हो बच्चों के लिए प्यारा,',
        englishText: 'The sweet Karam folk song for Ho children,'
      },
      {
        lineNum: 2,
        scriptText: '𑢜𑣃𑣎𑣃 𑢵𑢷𑣉 𑢯𑣁𑣖𑣁 𑢯𑣃𑣖𑣁𑣑 𑢯𑣁𑣑𑣂 𑢷𑣄,',
        romanText: 'Rutu odo dama dumang sadi te,',
        hindiText: 'बांसुरी और दमा-मांदर की गूंजती धुन पर,',
        englishText: 'To the rhythm of bamboo flutes and double-headed drums,'
      },
      {
        lineNum: 3,
        scriptText: '𑢜𑣁𑣎𑣂 𑢱𑣉 𑢷𑣓𑣄𑣑 𑢱𑣁𑣓𑣁 𑢜𑣁𑣞𑣱𑣁 𑢷𑣄,',
        romanText: 'Rajiko enej tana raska te,',
        hindiText: 'आनंद से झूमते हुए सभी कदम मिलाते हैं,',
        englishText: 'The village dances in joyful harmony,'
      },
      {
        lineNum: 4,
        scriptText: '𑢹𑣄𑢜𑣉 𑢡𑣉𑣑 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢵𑢖𑣁𑣜 𑢷𑣓𑣄𑣑! ',
        romanText: 'Hero bonte hon ko lagid omar tana!',
        hindiText: 'प्रकृति और धरती मां का आशीर्वाद पाते हैं!',
        englishText: 'Receiving bountiful blessings from Mother Earth!'
      }
    ]
  },
  c5: {
    id: 'c5',
    title: 'सोहराय गाय-बैल वंदना गीत (Santhali Sohrai Cattle Song)',
    rhythmBpm: 96,
    drumPattern: 'sohrai',
    instrumentTip: 'टमाक (Tamak) और तुमदाक (Tumdak) की भारी थाप: ढुम-तक, ढुम-तक!',
    danceStepsSummary: 'गोहाल (गौशाला) की परिक्रमा करते हुए गायों के सींगों पर तेल और सिंदूर लगाते हुए झूमर नृत्य।',
    verses: [
      {
        lineNum: 1,
        scriptText: 'ᱪᱟᱸᱫᱚ ᱵᱚᱸᱜᱟ ᱫᱟᱭᱟ ᱛᱮ ᱦᱟᱥᱟ ᱫᱷᱟᱹᱨᱛᱤ,',
        romanText: 'Chando Bonga daya te hasa dharti,',
        hindiText: 'सूर्य देव की कृपा से यह हरी-भरी धरती,',
        englishText: 'By the grace of Chando Bonga upon the verdant earth,'
      },
      {
        lineNum: 2,
        scriptText: 'ᱜᱟᱹᱭ ᱰᱟᱝᱨᱟ ᱠᱚ ᱥᱟᱡᱟᱣ ᱠᱟᱛᱮ ᱥᱚᱦᱨᱟᱭ ᱦᱤᱡᱩᱜ,',
        romanText: 'Gai dangra ko sajaw kate Sohrai hijug,',
        hindiText: 'गाय-बैलों को सजाकर सोहराय उत्सव आया,',
        englishText: 'Adorning cattle with blossoms as Sohrai arrives,'
      },
      {
        lineNum: 3,
        scriptText: 'ᱛᱩᱢᱫᱟᱜ ᱛᱟᱢᱟᱠ ᱥᱟᱰᱮ ᱛᱮ ᱠᱚᱲᱟ ᱠᱩᱲᱤ ᱠᱚ ᱮᱱᱮᱡ,',
        romanText: 'Tumdak tamak sade te kora kuri ko enej,',
        hindiText: 'तुमदाक और टमाक की धुन पर युवक-युवतियां नाचें,',
        englishText: 'To drums echoing, young boys and girls dance,'
      },
      {
        lineNum: 4,
        scriptText: 'ᱥᱩᱠᱷ ᱥᱟᱹᱱᱛᱤ ᱛᱮ ᱟᱹᱛᱩ ᱯᱮᱨᱮᱡ ᱠᱟᱱᱟ! ',
        romanText: 'Sukh santi te atu perej kana!',
        hindiText: 'सुख और शांति से हमारा गांव भर गया!',
        englishText: 'Our village is filled with peace and abundance!'
      }
    ]
  },
  c7: {
    id: 'c7',
    title: 'बाहा पर्व सखुआ फूल गीत (Santhali Baha Spring Song)',
    rhythmBpm: 88,
    drumPattern: 'baha',
    instrumentTip: 'बांसुरी (Flute) और मधुर मंजीरा: तिन-तिन-ता, तिन-तिन-ता!',
    danceStepsSummary: 'सखुआ के सफेद फूल बालों में लगाकर वसंत की नई कोंपलों का स्वागत करने वाला कोमल नृत्य।',
    verses: [
      {
        lineNum: 1,
        scriptText: 'ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱯᱷᱩᱴᱤ ᱟᱠᱟᱱ,',
        romanText: 'Sarjom baha phuti akan,',
        hindiText: 'साल के पेड़ों पर सुगंधित फूल खिल गए हैं,',
        englishText: 'Fragrant sal blossoms have unfurled in the woods,'
      },
      {
        lineNum: 2,
        scriptText: 'ᱵᱤᱨ ᱫᱤᱥᱚᱢ ᱥᱚᱲᱚᱢ ᱟᱠᱟᱱ᱾',
        romanText: 'Bir disom sodom akan.',
        hindiText: 'पूरा वन प्रदेश खुशबू से महक उठा है।',
        englishText: 'The entire forest breeze is filled with sweetness.'
      },
      {
        lineNum: 3,
        scriptText: 'ᱪᱮᱬᱮ ᱠᱚ ᱨᱟᱜᱟ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ,',
        romanText: 'Chene ko raga raska te,',
        hindiText: 'चिड़ियाँ आनंद से चहक रही हैं,',
        englishText: 'Birds are singing in sweet jubilation,'
      },
      {
        lineNum: 4,
        scriptText: 'ᱵᱟᱦᱟ ᱯᱟᱨᱟᱵᱽ ᱥᱮᱴᱮᱨ ᱟᱠᱟᱱ᱾',
        romanText: 'Baha parab seter akan.',
        hindiText: 'हमारा पावन बाहा पर्व आ गया है।',
        englishText: 'The sacred spring festival has arrived.'
      }
    ]
  },
  c8: {
    id: 'c8',
    title: 'हो मागे पर्व लोकगीत (Ho Mage Awakening Song)',
    rhythmBpm: 94,
    drumPattern: 'mage',
    instrumentTip: 'रूतू (Rutu flute) और दमा (Dama) का तीव्र तालमेल: ताक-धिन, ताक-धिन!',
    danceStepsSummary: 'धान कटाई के बाद अखड़ा में गांव के सभी बुजुर्ग और बच्चे सामूहिक घेरा बनाकर गाते हैं।',
    verses: [
      {
        lineNum: 1,
        scriptText: '𑢶𑣁𑣋𑣄 𑢯𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢷𑣉𑣄𑣉𑣜,',
        romanText: 'Mage durang Ho hon ko lagid gokor,',
        hindiText: 'मागे गीत हो बालकों का परम गौरव है,',
        englishText: 'The Mage song is the highest pride of Ho children,'
      },
      {
        lineNum: 2,
        scriptText: '𑢜𑣃𑣎𑣃 𑢵𑢷𑣉 𑢯𑣁𑣖𑣁 𑢯𑣃𑣖𑣁𑣑 𑢯𑣁𑣑𑣂 𑢷𑣄,',
        romanText: 'Rutu odo dama dumang sadi te,',
        hindiText: 'बांसुरी और नगाड़ों की गूंजती ताल पर,',
        englishText: 'To flutes and resonant drums playing together,'
      },
      {
        lineNum: 3,
        scriptText: '𑢜𑣁𑣎𑣂 𑢱𑣉 𑢷𑣓𑣄𑣑 𑢱𑣁𑣓𑣁 𑢜𑣁𑣞𑣱𑣁 𑢷𑣄,',
        romanText: 'Rajiko enej tana raska te,',
        hindiText: 'खुशी-खुशी पूरा गांव एक साथ नाचता है,',
        englishText: 'The entire village dances with brimming joy,'
      },
      {
        lineNum: 4,
        scriptText: '𑢓𑣃𑢡𑣁 𑢯𑣂𑣜𑢶𑣁 𑢵𑢖𑣁𑣜 𑢷𑣓𑣄𑣑 𑢷𑣂𑣅𑢡𑣉𑣅𑣁! ',
        romanText: 'Nua sirma omar tana Singbonga!',
        hindiText: 'सूर्य देव हमें नया वर्ष और समृद्धि देते हैं!',
        englishText: 'Singbonga blesses us with a new year of prosperity!'
      }
    ]
  },
  c10: {
    id: 'c10',
    title: 'कोल्हान वन्यजीव बालगीत (Kolhan Animal Rhyme)',
    rhythmBpm: 104,
    drumPattern: 'nursery',
    instrumentTip: 'हाथ की ताली (Clapping) और घुंघरू (Ankle bell): एक-दो, तीन-चार!',
    danceStepsSummary: 'बच्चे बाघ, मोर, हाथी की नकल करते हुए गोल घेरे में फुदकते हैं।',
    verses: [
      {
        lineNum: 1,
        scriptText: '𑢱𑣃𑣚 𑢱𑣃𑣚 𑢡𑣂𑣜 𑢜𑣄 𑢱𑣃𑣚,',
        romanText: 'Kul kul bir re kul,',
        hindiText: 'जंगल में बाघ, भयानक बाघ (१ बाघ),',
        englishText: 'Tiger, striped tiger in the woods (1 Tiger),'
      },
      {
        lineNum: 2,
        scriptText: '𑢹𑣁𑣎𑣂 𑢹𑣁𑣎𑣂 𑢶𑣁𑣜𑣁𑣑 𑢹𑣁𑣎𑣂,',
        romanText: 'Hati hati marang hati,',
        hindiText: 'हाथी, विशालकाय हाथी (२ हाथी),',
        englishText: 'Elephant, mighty elephant walking tall (2 Elephants),'
      },
      {
        lineNum: 3,
        scriptText: '𑢶𑣁𑢜𑣁 𑢵𑢷𑣉 𑢰𑣂𑣑 𑢯𑣃𑣜𑣂𑣑 𑢱𑣁𑣓𑣁,',
        romanText: 'Mara odo chidu durang kana,',
        hindiText: 'मोर नाचे और नन्हीं चिड़िया गाए,',
        englishText: 'Peacocks dance and little birds sing,'
      },
      {
        lineNum: 4,
        scriptText: '𑢜𑣁𑣞𑣱𑣁 𑢷𑣄 𑢹𑣉𑣓 𑢱𑣉 𑢚𑣂𑣓𑣂𑣑 𑢱𑣁𑣓𑣁! ',
        romanText: 'Raska te hon ko chikit tana!',
        hindiText: 'हंसते-खेलते बच्चे गिनती सीखें!',
        englishText: 'Laughing, the children count them all!'
      }
    ]
  },
  c11: {
    id: 'c11',
    title: 'जादुर वसंत नृत्य गीत (Mundari Jadur Spring Song)',
    rhythmBpm: 90,
    drumPattern: 'jadur',
    instrumentTip: 'मांदर (Dumang) की धीमी और गहरी लहरदार थाप: धिक-ता, धिक-ता, धिक-तान!',
    danceStepsSummary: 'लड़कियां एक-दूसरे की कमर में हाथ डालकर आगे-पीछे मंद गति से झूलती हैं।',
    verses: [
      {
        lineNum: 1,
        scriptText: 'सरजोम बा फुटी लेना रे हातू-हातू,',
        romanText: 'Sarjom ba phuti lena re hatu-hatu,',
        hindiText: 'गांव-गांव में सखुआ के फूल खिल उठे हैं,',
        englishText: 'Sal blossoms have bloomed across the hamlet,'
      },
      {
        lineNum: 2,
        scriptText: 'दामा-दुमंग साड़ी ते रस्का तना,',
        romanText: 'Dama-dumang sadi te raska tana,',
        hindiText: 'दमा और मांदर की आवाज से मन प्रसन्न है,',
        englishText: 'To drums echoing, hearts fill with joy,'
      },
      {
        lineNum: 3,
        scriptText: 'जादुर दुरुंग सेनोः तना अखड़ा रे,',
        romanText: 'Jadur durang senoh tana akhra re,',
        hindiText: 'अखड़ा में मधुर जादुर गीत गूंज रहा है,',
        englishText: 'The timeless Jadur song ripples in the Akhra,'
      },
      {
        lineNum: 4,
        scriptText: 'नुआ सिरमा बोंगा दया ते सुकु तना! ',
        romanText: 'Nowa sirma bonga daya te suku tana!',
        hindiText: 'नए साल में सिंगबोंगा की कृपा से सब सुखी हैं!',
        englishText: 'Under Singbonga grace, our new year is peaceful!'
      }
    ]
  },
  c14: {
    id: 'c14',
    title: 'मागे दुरुंग - शीतकालीन उत्सव (Mundari Mage Song)',
    rhythmBpm: 92,
    drumPattern: 'mage',
    instrumentTip: 'दुमंग (Mandar) और रुतू (Flute): तिनक-तान, तिनक-तान!',
    danceStepsSummary: 'नया चावल और गुड़ की पीठा खाकर गांव वाले रात भर अखड़ा में अलाव के चारों ओर गाते हैं।',
    verses: [
      {
        lineNum: 1,
        scriptText: 'इरि-गुंदली बागे केते बाबा इरल ते,',
        romanText: 'Iri-gundli bage kete baba iral te,',
        hindiText: 'धान की फसल समेटकर खलिहान में रखकर,',
        englishText: 'Having harvested and gathered the golden grain,'
      },
      {
        lineNum: 2,
        scriptText: 'हुरिंग-मारंग जारवा लेना अखड़ा रे,',
        romanText: 'Huring-marang jarwa lena akhra re,',
        hindiText: 'छोटे-बड़े सभी अखड़ा में एकत्र हुए हैं,',
        englishText: 'Young and old gather together at the Akhra,'
      },
      {
        lineNum: 3,
        scriptText: 'चाउली पीठा जोम केते दुरुंग तना,',
        romanText: 'Chauli pitha jom kete durang tana,',
        hindiText: 'चावल का मीठा पीठा खाकर गीत गा रहे हैं,',
        englishText: 'Sharing sweet rice pitha and singing songs,'
      },
      {
        lineNum: 4,
        scriptText: 'मागे परब रे हातू रस्का ते पेरेंज तना! ',
        romanText: 'Mage parab re hatu raska te perenj tana!',
        hindiText: 'मागे पर्व पर हमारा गांव खुशियों से भर गया!',
        englishText: 'On Mage festival, our village overflows with warmth!'
      }
    ]
  }
};

// -------------------------------------------------------------
// STORY & FOLKLORE DETAILS (c1, c3, c6, c9, c12, c13)
// -------------------------------------------------------------
export const STORY_DETAILS: Record<string, StoryDetails> = {
  c1: {
    id: 'c1',
    moralLesson: 'प्रकृति और साल के वनों की रक्षा करना हमारा पहला कर्तव्य है।',
    culturalInsight: 'सारना स्थल संथाली समाज का पवित्र उपवन है जहाँ जाहिर एरा (ग्राम देवी) वास करती हैं।',
    scenes: [
      {
        sceneNum: 1,
        sceneTitleHindi: 'पवित्र सारना उपवन',
        sceneTitleTribal: 'ᱥᱟᱨᱱᱟ ᱡᱟᱭᱜᱟ',
        illustrationIcon: '🌲',
        paragraphScript: 'ᱥᱟᱨᱱᱟ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱠᱚᱣᱟᱜ ᱡᱚᱛᱚ ᱠᱷᱚᱱ ᱯᱩᱱᱟᱹᱭ ᱡᱟᱭᱜᱟ ᱠᱟᱱᱟ᱾ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱵᱩᱴᱟᱹ ᱨᱮ ᱡᱟᱦᱮᱨ ᱮᱨᱟ ᱠᱚ ᱥᱮᱵᱟᱭᱟ᱾',
        paragraphRoman: 'Sarna do Santhal kowag joto khon punai jayga kana. Sarjom dare buta re Jaher Era ko sebaya.',
        paragraphHindi: 'सारना संथालियों का सबसे पवित्र प्राकृतिक स्थल है। साल (सखुआ) के घने वृक्षों की छांव में जाहिर एरा की आराधना होती है।',
        paragraphEnglish: 'The Sarna is the sacred sanctuary of the Santhal. Beneath the canopy of ancient Sal trees, deities of nature are revered.',
        keyVocabulary: [
          { word: 'ᱥᱟᱨᱱᱟ (Sarna)', roman: 'Sarna', meaning: 'पवित्र उपवन (Sacred Grove)' },
          { word: 'ᱥᱟᱨᱡᱚᱢ (Sarjom)', roman: 'Sarjom', meaning: 'सखुआ / साल का वृक्ष (Sal Tree)' }
        ]
      },
      {
        sceneNum: 2,
        sceneTitleHindi: 'नायके का आह्वान',
        sceneTitleTribal: 'ᱱᱟᱭᱠᱮ ᱵᱚᱸᱜᱟ',
        illustrationIcon: '🕊️',
        paragraphScript: 'ᱱᱟᱭᱠᱮ ᱵᱟᱵᱟ ᱫᱟᱜ ᱫᱩᱞ ᱠᱟᱛᱮ ᱪᱟᱸᱫᱚ ᱵᱚᱸᱜᱟ ᱴᱷᱮᱱ ᱟᱹᱛᱩ ᱨᱮᱭᱟᱜ ᱵᱷᱟᱹᱞᱟᱹᱭ ᱞᱟᱹᱜᱤᱫ ᱠᱚᱭᱟ᱾',
        paragraphRoman: 'Nayke Baba daag dul kate Chando Bonga then atu reyag bhalai lagid koya.',
        paragraphHindi: 'ग्राम पुजारी (नायके बाबा) पवित्र जल छिड़ककर सूर्य देव से गांव के स्वास्थ्य और अच्छी वर्षा की प्रार्थना करते हैं।',
        paragraphEnglish: 'The village priest sprinkles sacred spring water, praying to the Sun God for rainfall and community wellbeing.',
        keyVocabulary: [
          { word: 'ᱱᱟᱭᱠᱮ (Nayke)', roman: 'Nayke', meaning: 'ग्राम पुजारी (Village Priest)' },
          { word: 'ᱫᱟᱜ (Daak)', roman: 'Daak', meaning: 'जल / पानी (Water)' }
        ]
      },
      {
        sceneNum: 3,
        sceneTitleHindi: 'प्रकृति से अटूट बंधन',
        sceneTitleTribal: 'ᱫᱟᱨᱮ ᱟᱨ ᱢᱟᱹᱱᱢᱤ',
        illustrationIcon: '🌿',
        paragraphScript: 'ᱡᱟᱦᱟᱸᱭ ᱫᱟᱨᱮ ᱫᱚᱦᱚᱭᱟ, ᱩᱱᱤ ᱜᱮ ᱡᱤᱣᱤ ᱧᱟᱢᱟ᱾ ᱥᱟᱱᱛᱟᱲ ᱠᱚ ᱥᱟᱨᱡᱚᱢ ᱵᱟᱦᱟ ᱨᱟᱹᱥᱠᱟᱹ ᱛᱮ ᱠᱚ ᱦᱟᱹᱴᱤᱧᱟ᱾',
        paragraphRoman: 'Jahay dare dohoya, uni ge jiwi nyama. Santhal ko sarjom baha raska te ko hatinga.',
        paragraphHindi: 'जो पेड़ की रक्षा करता है, वही सच्चा जीवन पाता है। सभी ग्रामीण आपस में सखुआ के फूल बांटकर प्रेम बढ़ाते हैं।',
        paragraphEnglish: 'He who guards the trees protects life itself. The villagers share sal blossoms in joyful fraternity.',
        keyVocabulary: [
          { word: 'ᱫᱟᱨᱮ (Dare)', roman: 'Dare', meaning: 'पेड़ / वृक्ष (Tree)' },
          { word: 'ᱵᱟᱦᱟ (Baha)', roman: 'Baha', meaning: 'फूल (Flower)' }
        ]
      }
    ],
    quiz: [
      {
        questionHindi: 'सारना स्थल पर किन पेड़ों की पूजा की जाती है?',
        questionEnglish: 'Which trees canopy the sacred Sarna grove?',
        options: ['साल / सखुआ (Sarjom)', 'नीम (Neem)', 'पीपल (Pipal)', 'बरगद (Banyan)'],
        correctIndex: 0,
        explanation: 'सारना में मुख्य रूप से सखुआ (साल) के प्राचीन पेड़ों का उपवन होता है।'
      },
      {
        questionHindi: 'संथाली समाज में ग्राम पुजारी को क्या कहा जाता है?',
        questionEnglish: 'What is the traditional Santhal village priest called?',
        options: ['नायके (Nayke)', 'माझी (Manjhi)', 'गोड़ेत (Godet)', 'पाहन (Pahan)'],
        correctIndex: 0,
        explanation: 'संथाली परंपरा में पूजा संपन्न कराने वाले पुजारी को नायके (Nayke) कहते हैं।'
      }
    ]
  },
  c3: {
    id: 'c3',
    moralLesson: 'धरती माता और सूर्य देव का मिलन हमें सिखाता है कि खेती ऋतुओं के चक्र से बंधी है।',
    culturalInsight: 'सरहुल (बाहा) मुंडा समाज का नववर्ष है; जब तक साल पर फूल न आएं, नई फसल नहीं खाई जाती।',
    scenes: [
      {
        sceneNum: 1,
        sceneTitleHindi: 'वसंत का आगमन',
        sceneTitleTribal: 'बाहा परब',
        illustrationIcon: '🌸',
        paragraphScript: 'फागुन बोंगा रे सरजोम दारे रे पुंडी बा फुटी लेना। हातू रेन मुंडा को रस्का लेना।',
        paragraphRoman: 'Phagun bonga re sarjom dare re pundi ba phuti lena. Hatu ren Munda ko raska lena.',
        paragraphHindi: 'फागुन मास में जब सखुआ के पेड़ों पर सफेद फूल खिले, तो पूरा मुंडा गांव खुशियों से झूम उठा।',
        paragraphEnglish: 'When fragrant white blossoms appeared on sal trees in early spring, the entire Munda village rejoiced.',
        keyVocabulary: [
          { word: 'बा (Ba)', roman: 'Ba', meaning: 'फूल (Flower)' },
          { word: 'सरजोम (Sarjom)', roman: 'Sarjom', meaning: 'सखुआ वृक्ष (Sal Tree)' }
        ]
      },
      {
        sceneNum: 2,
        sceneTitleHindi: 'धरती और सूर्य का विवाह',
        sceneTitleTribal: 'हासा ओन्दो सिंगबोंगा',
        illustrationIcon: '☀️',
        paragraphScript: 'पाहन आबा सरना रे हासा ओन्दो सिंगबोंगा रेन बिहा मनातिंग केदा। नया बाबा जोम लगिद नेहोरा।',
        paragraphRoman: 'Pahan Aaba Sarna re Hasa ondo Singbonga ren biha manating keda. Naya baba jom lagid nehora.',
        paragraphHindi: 'पाहन जी ने सरना में धरती माता और सूर्य देव के विवाह की रस्म कराई और नई फसल के लिए प्रार्थना की।',
        paragraphEnglish: 'The Pahan solemnized the ceremonial union of Mother Earth and the Sun God, blessing the soil for sowing.',
        keyVocabulary: [
          { word: 'हासा (Hasa)', roman: 'Hasa', meaning: 'मिट्टी / धरती (Earth / Soil)' },
          { word: 'सिंगबोंगा (Singbonga)', roman: 'Singbonga', meaning: 'सूर्य देव (Sun Deity)' }
        ]
      },
      {
        sceneNum: 3,
        sceneTitleHindi: 'अखड़ा में सामूहिक नृत्य',
        sceneTitleTribal: 'अखड़ा दुरुंग',
        illustrationIcon: '🥁',
        paragraphScript: 'कुड़ी-कोड़ा को ती-रे ती साबोः केते जादुर दुरुंग केदा। हातू रे दाः गामे काने सुकु तना।',
        paragraphRoman: 'Kuri-kora ko ti-re ti saboh kete Jadur durang keda. Hatu re daah game kane suku tana.',
        paragraphHindi: 'युवक-युवतियों ने हाथ जोड़कर जादुर नृत्य किया और समय पर बारिश होने का उल्लास मनाया।',
        paragraphEnglish: 'Holding hands in crescent arcs, the youth danced Jadur steps, anticipating timely monsoon showers.',
        keyVocabulary: [
          { word: 'ती (Ti)', roman: 'Ti', meaning: 'हाथ (Hand)' },
          { word: 'दाः (Daah)', roman: 'Daah', meaning: 'जल / वर्षा (Rain / Water)' }
        ]
      }
    ],
    quiz: [
      {
        questionHindi: 'सरहुल पर्व पर किस पेड़ के फूल बांटे जाते हैं?',
        questionEnglish: 'Which flower blossoms are distributed during Sarhul?',
        options: ['सखुआ / साल के फूल (Sarjom Ba)', 'कमल (Lotus)', 'गुलाब (Rose)', 'गेंदा (Marigold)'],
        correctIndex: 0,
        explanation: 'सरहुल पर पाहन प्रत्येक घर में सखुआ (साल) के पवित्र सफेद फूल बांटते हैं।'
      },
      {
        questionHindi: 'मुंडा परंपरा में ग्राम पुजारी को क्या कहते हैं?',
        questionEnglish: 'What is the Munda village priest called?',
        options: ['पाहन (Pahan)', 'देउरी (Deori)', 'पुजारी (Pujari)', 'प्रधान (Pradhan)'],
        correctIndex: 0,
        explanation: 'मुंडा परंपरा में धार्मिक अनुष्ठान करने वाले पुजारी को पाहन कहते हैं।'
      }
    ]
  },
  c6: {
    id: 'c6',
    moralLesson: 'सभी मानव एक ही परिवार के हैं; हमें प्रकृति के साथ संतुलन बनाकर जीना चाहिए।',
    culturalInsight: 'संथाली सृष्टि कथा में प्रथम मानव पिलचु हाड़ाम और पिलचु बुढ़ी हिहिरी पिपिरी में हंस के अंडों से जन्मे थे।',
    scenes: [
      {
        sceneNum: 1,
        sceneTitleHindi: 'हिहिरी पिपिरी की उत्पत्ति',
        sceneTitleTribal: 'ᱦᱤᱦᱤᱲᱤ ᱯᱤᱯᱤᱲᱤ ᱡᱟᱱᱟᱢ',
        illustrationIcon: '🦢',
        paragraphScript: 'ᱪᱟᱸᱫᱚ ᱵᱚᱸᱜᱟ ᱫᱟᱭᱟ ᱛᱮ ᱦᱟᱸᱥ ᱦᱟᱸᱥᱤᱞ ᱵᱤᱞᱤ ᱠᱷᱚᱱ ᱯᱤᱞᱪᱩ ᱦᱟᱲᱟᱢ ᱟᱨ ᱯᱤᱞᱪᱩ ᱵᱩᱰᱷᱤ ᱡᱟᱱᱟᱢ ᱞᱮᱱᱟ᱾',
        paragraphRoman: 'Chando Bonga daya te Hans Hansil bili khon Pilchu Haram ar Pilchu Budhi janam lena.',
        paragraphHindi: 'ठाकुर जिउ के आशीर्वाद से दो हंसों के अंडों से प्रथम मानव युगल पिलचु हाड़ाम और पिलचु बुढ़ी का जन्म हुआ।',
        paragraphEnglish: 'By divine grace, from celestial swan eggs hatched the first human ancestors: Pilchu Haram and Pilchu Budhi.',
        keyVocabulary: [
          { word: 'ᱦᱟᱸᱥ (Hans)', roman: 'Hans', meaning: 'हंस पक्षी (Swan)' },
          { word: 'ᱵᱤᱞᱤ (Bili)', roman: 'Bili', meaning: 'अंडा (Egg)' }
        ]
      },
      {
        sceneNum: 2,
        sceneTitleHindi: 'मरांग बुरु का मार्गदर्शन',
        sceneTitleTribal: 'ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱥᱮᱬᱟ',
        illustrationIcon: '⛰️',
        paragraphScript: 'ᱢᱟᱨᱟᱝ ᱵᱩᱨᱩ ᱩᱱᱠᱤᱱ ᱫᱚ ᱵᱤᱨ ᱨᱮ ᱡᱚᱢ ᱧᱩ, ᱪᱟᱥ ᱵᱟᱥ ᱟᱨ ᱨᱟᱱ ᱢᱩᱨᱜᱟᱹᱱ ᱥᱮᱬᱟᱣᱟᱫ ᱠᱤᱱᱟ᱾',
        paragraphRoman: 'Marang Buru unkin do bir re jom nyu, chas bas ar ran murgan senawad kina.',
        paragraphHindi: 'महान पर्वत देवता मरांग बुरु ने उन्हें कंद-मूल चुनने, धान की खेती करने और जड़ी-बूटियों की पहचान सिखाई।',
        paragraphEnglish: 'The great mountain guardian Marang Buru taught them agriculture, gathering fruits, and healing herbs.',
        keyVocabulary: [
          { word: 'ᱵᱤᱨ (Bir)', roman: 'Bir', meaning: 'जंगल / वन (Forest)' },
          { word: 'ᱪᱟᱥ (Chas)', roman: 'Chas', meaning: 'खेती / कृषि (Farming)' }
        ]
      },
      {
        sceneNum: 3,
        sceneTitleHindi: 'बारह गोत्रों का विस्तार',
        sceneTitleTribal: 'ᱜᱮᱞᱵᱟᱨ ᱯᱟᱹᱨᱤᱥ',
        illustrationIcon: '👨‍👩‍👧‍👦',
        paragraphScript: 'ᱩᱱᱠᱤᱱ ᱨᱤᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱠᱷᱚᱱ ᱜᱮᱞᱵᱟᱨ ᱯᱟᱹᱨᱤᱥ (ᱦᱟᱸᱥᱫᱟᱜ, ᱢᱩᱨᱢᱩ, ᱠᱤᱥᱠᱩ, ᱦᱮᱢᱵᱽᱨᱚᱢ) ᱵᱮᱱᱟᱣ ᱮᱱᱟ᱾',
        paragraphRoman: 'Unkin rin gidra ko khon Gelbar Paris (Hansda, Murmu, Kisku, Hembrom) benaw ena.',
        paragraphHindi: 'उनकी संतानों से संथाली समाज के बारह प्रमुख गोत्रों (हांसदा, मुर्मू, किस्कू, हेम्ब्रम आदि) का जन्म हुआ।',
        paragraphEnglish: 'From their lineage arose the twelve ancestral clans of the Santhal people living in harmony with nature.',
        keyVocabulary: [
          { word: 'ᱜᱤᱫᱽᱨᱟᱹ (Gidra)', roman: 'Gidra', meaning: 'बच्चे (Children)' },
          { word: 'ᱯᱟᱹᱨᱤᱥ (Paris)', roman: 'Paris', meaning: 'गोत्र / कुल (Clan)' }
        ]
      }
    ],
    quiz: [
      {
        questionHindi: 'संथाली लोकगाथा में प्रथम मानव युगल का क्या नाम है?',
        questionEnglish: 'What are the names of the primordial human ancestors in Santhal lore?',
        options: ['पिलचु हाड़ाम और पिलचु बुढ़ी', 'बिरसा और काली', 'सिंगबोंगा और जाहिर', 'सिदो और कान्हू'],
        correctIndex: 0,
        explanation: 'संथाली सृष्टि कथा के अनुसार प्रथम माता-पिता पिलचु हाड़ाम और पिलचु बुढ़ी हैं।'
      },
      {
        questionHindi: 'पिलचु हाड़ाम और बुढ़ी का जन्म किस स्थान पर माना जाता है?',
        questionEnglish: 'Where did Pilchu Haram and Budhi hatch according to legend?',
        options: ['हिहिरी पिपिरी (Hihiri Pipiri)', 'सारंडा (Saranda)', 'उलिहातू (Ulihatu)', 'पारसनाथ (Parasnath)'],
        correctIndex: 0,
        explanation: 'संथाली परंपरा में मानव उत्पत्ति स्थल हिहिरी पिपिरी माना गया है।'
      }
    ]
  },
  c9: {
    id: 'c9',
    moralLesson: 'बीज बोने से पूर्व धरती को नमन करना कृषि और पर्यावरण के प्रति सम्मान का प्रतीक है।',
    culturalInsight: 'हो जनजाति में आषाढ़ के महीने में पहली वर्षा के बाद हेरो पर्व मनाकर ही धान के बीज बोए जाते हैं।',
    scenes: [
      {
        sceneNum: 1,
        sceneTitleHindi: 'पहली वर्षा की फुहार',
        sceneTitleTribal: '𑢑𑣁𑣄 𑢋𑣁𑢶𑣄',
        illustrationIcon: '🌧️',
        paragraphScript: '𑢡𑣁𑢞𑣁𑣑 𑢡𑣉𑣅𑣁 𑢜𑣄 𑢑𑣁𑣄 𑢋𑣁𑢶𑣄 𑢷𑣁𑣓𑣁᱾ 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢨𑣁𑣞 𑢡𑣂𑣁𑣜𑣂 𑢡𑣁𑢡𑣁 𑢰𑣂𑣅𑣁𑣜 𑢷𑣓𑣄𑣑᱾',
        paragraphRoman: 'Ashad bonga re daah game tana. Ho hon chas lagid baba jiyad tana.',
        paragraphHindi: 'आषाढ़ महीने में जब आकाश से पहली वर्षा की फुहारें गिरीं, तो किसानों ने धान के बीज तैयार किए।',
        paragraphEnglish: 'With the first monsoon showers in Ashad, Ho agrarian families readied golden paddy seeds.',
        keyVocabulary: [
          { word: '𑢑𑣁𑣄 (Daah)', roman: 'Daah', meaning: 'वर्षा / पानी (Rain)' },
          { word: '𑢡𑣁𑢡𑣁 (Baba)', roman: 'Baba', meaning: 'धान / धान का बीज (Paddy)' }
        ]
      },
      {
        sceneNum: 2,
        sceneTitleHindi: 'देशाउली में हेरो अनुष्ठान',
        sceneTitleTribal: '𑢷𑣄𑢯𑣁𑣃𑣚𑣂 𑢹𑣄𑢜𑣉',
        illustrationIcon: '🌾',
        paragraphScript: '𑢷𑣄𑣉𑣜𑣂 𑢡𑣁𑢡𑣁 𑢷𑣄𑢯𑣁𑣃𑣚𑣂 𑢜𑣄 𑢡𑣁𑢡𑣁 𑢡𑣉𑣅𑣁 𑢱𑣄𑢷𑣁᱾ 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢡𑣂𑣁𑣜𑣂 𑢯𑣃𑣜𑣂𑣑 𑢱𑣁𑣓𑣁᱾',
        paragraphRoman: 'Deori Baba Desauli re baba bonga keda. Ho hon ko lagid durang kana.',
        paragraphHindi: 'ग्राम पुजारी देउरी बाबा ने देशाउली (पवित्र उपवन) में धान के बीजों को मंत्रोच्चार से अभिमंत्रित किया।',
        paragraphEnglish: 'The Deori priest consecrated the paddy seeds at Desauli, chanting prayers for fertile fields.',
        keyVocabulary: [
          { word: '𑢷𑣄𑣉𑣜𑣂 (Deori)', roman: 'Deori', meaning: 'हो पुजारी (Ho Priest)' },
          { word: '𑢷𑣄𑢯𑣁𑣃𑣚𑣂 (Desauli)', roman: 'Desauli', meaning: 'पवित्र उपवन (Sacred Grove)' }
        ]
      },
      {
        sceneNum: 3,
        sceneTitleHindi: 'खेतों में बीज छिड़कना',
        sceneTitleTribal: '𑢹𑣄𑢜𑣉 𑢡𑣉𑣓𑢷𑣄',
        illustrationIcon: '🌱',
        paragraphScript: '𑢵𑢷𑣉 𑢡𑣂𑣜 𑢜𑣄 𑢡𑣁𑢡𑣁 𑢹𑣄𑢜𑣉 𑢱𑣄𑢷𑣁᱾ 𑢷𑣂𑣅𑢡𑣉𑣅𑣁 𑢡𑣂𑣁𑣜𑣂 𑢷𑣁𑣄 𑢡𑣂𑣁𑣜𑣂 𑢵𑢖𑣁𑣜 𑢷𑣓𑣄𑣑! ',
        paragraphRoman: 'Odo bir re baba hero keda. Singbonga lagid daah lagid omar tana!',
        paragraphHindi: 'इसके बाद पूरे गांव ने खेतों में जाकर बीज बोए। प्रकृति ने अच्छी उपज का वरदान दिया।',
        paragraphEnglish: 'Then the families joyously broadcast seeds into tilled furrows, blessed with green sproutings.',
        keyVocabulary: [
          { word: '𑢹𑣄𑢜𑣉 (Hero)', roman: 'Hero', meaning: 'बीज बोना (Sowing Seeds)' },
          { word: '𑢷𑣂𑣅𑢡𑣉𑣅𑣁 (Singbonga)', roman: 'Singbonga', meaning: 'सर्वोच्च ईश्वर (Creator Deity)' }
        ]
      }
    ],
    quiz: [
      {
        questionHindi: 'हो भाषा में "हेरो" का क्या अर्थ है?',
        questionEnglish: 'What does the word "Hero" mean in Ho?',
        options: ['बीज बोना (Sowing Seeds)', 'फसल काटना (Harvest)', 'नृत्य करना (Dance)', 'शिकार करना (Hunt)'],
        correctIndex: 0,
        explanation: 'हो भाषा में हेरो का अर्थ बीज बोना (Broadcasting seeds) होता है।'
      },
      {
        questionHindi: 'हो जनजाति के गांव के पुजारी को क्या कहते हैं?',
        questionEnglish: 'What is the village priest called in the Ho community?',
        options: ['देउरी (Deori)', 'पाहन (Pahan)', 'नायके (Nayke)', 'ओझा (Ojha)'],
        correctIndex: 0,
        explanation: 'हो समाज में धार्मिक अनुष्ठान कराने वाले आदरणीय पुजारी को देउरी कहते हैं।'
      }
    ]
  },
  c12: {
    id: 'c12',
    moralLesson: 'मातृभूमि, जल-जंगल-जमीन और स्वाभिमान की रक्षा के लिए सत्य और शिक्षा के मार्ग पर चलना चाहिए।',
    culturalInsight: 'धरती आबा बिरसा मुंडा ने 1895-1900 में जल-जंगल-जमीन की रक्षा के लिए उलगुलान का नेतृत्व किया था।',
    scenes: [
      {
        sceneNum: 1,
        sceneTitleHindi: 'उलिहातू का वीर सपूत',
        sceneTitleTribal: 'उलिहातू रेन बिरसा',
        illustrationIcon: '🏹',
        paragraphScript: 'खूंटी जिला रेन उलिहातू हातू रे बिरसा मुंडा जनाम लेना। इनि हासा-दारे ओन्दो होड़ो को आतिंग केदा।',
        paragraphRoman: 'Khunti jila ren Ulihatu hatu re Birsa Munda janam lena. Ini hasa-dare ondo hodo ko ating keda.',
        paragraphHindi: 'खूंटी के उलिहातू गांव में वीर बालक बिरसा मुंडा का जन्म हुआ। उन्होंने बचपन से ही जंगल और प्रकृति से गहरा प्रेम किया।',
        paragraphEnglish: 'In Ulihatu village of Khunti, brave Birsa Munda was born, deeply bonded to the sacred sal forests.',
        keyVocabulary: [
          { word: 'हातू (Hatu)', roman: 'Hatu', meaning: 'गांव (Village)' },
          { word: 'होड़ो (Hodo)', roman: 'Hodo', meaning: 'मनुष्य / आदिवासी (People / Humans)' }
        ]
      },
      {
        sceneNum: 2,
        sceneTitleHindi: 'उलगुलान का शंखनाद',
        sceneTitleTribal: 'उलगुलान जागवार',
        illustrationIcon: '🔥',
        paragraphScript: 'बिरसा आबा मुंडा दिशुम रे उलगुलान केदा। जल, जंगल, जमीन अबुआः राज बेनाव लगिद।',
        paragraphRoman: 'Birsa Aaba Munda disum re Ulgulan keda. Jal, jungle, zameen abuah raj benaw lagid.',
        paragraphHindi: 'धरती आबा ने घोषणा की: "अबुआ दिशुम रे अबुआ राज" (हमारे देश में हमारा शासन)। उन्होंने धनुष-बाण लेकर अन्याय के विरुद्ध बिगुल फूंका।',
        paragraphEnglish: 'Dharti Aba proclaimed self-governance: "Abuah Raj in Abuah Disum", rallying communities to protect their ancestral lands.',
        keyVocabulary: [
          { word: 'उलगुलान (Ulgulan)', roman: 'Ulgulan', meaning: 'महासंग्राम / क्रांति (Revolution)' },
          { word: 'दिशुम (Disum)', roman: 'Disum', meaning: 'देश / मातृभूमि (Homeland)' }
        ]
      },
      {
        sceneNum: 3,
        sceneTitleHindi: 'अमर प्रेरणा - धरती आबा',
        sceneTitleTribal: 'धरती आबा बिरसा',
        illustrationIcon: '⭐',
        paragraphScript: 'बिरसा आबा गो जोहार! इनि अबु को शिक्षा ओन्दो सुकु ते ताइन सेणावादा।',
        paragraphRoman: 'Birsa Aaba go johar! Ini abu ko shiksha ondo suku te tain senawada.',
        paragraphHindi: 'धरती आबा को हमारा शत-शत नमन! उन्होंने हमें स्वाभिमान, शिक्षा और एकता के साथ जीने का संदेश दिया।',
        paragraphEnglish: 'Salutations to Dharti Aba! His courage illuminates our path to education, dignity, and cultural pride.',
        keyVocabulary: [
          { word: 'जोहार (Johar)', roman: 'Johar', meaning: 'प्रणाम / अभिवादन (Traditional Salutation)' },
          { word: 'सुकु (Suku)', roman: 'Suku', meaning: 'सुख / शांति (Peace / Joy)' }
        ]
      }
    ],
    quiz: [
      {
        questionHindi: 'भगवान बिरसा मुंडा का जन्म झारखंड के किस गांव में हुआ था?',
        questionEnglish: 'In which Jharkhand village was Birsa Munda born?',
        options: ['उलिहातू, खूंटी (Ulihatu)', 'सारंडा (Saranda)', 'नेतरहाट (Netarhat)', 'चाईबासा (Chaibasa)'],
        correctIndex: 0,
        explanation: 'भगवान बिरसा मुंडा का जन्म खूंटी जिले के उलिहातू गांव में 15 नवंबर 1875 को हुआ था।'
      },
      {
        questionHindi: 'बिरसा मुंडा द्वारा चलाए गए स्वाधीनता आंदोलन को क्या कहा जाता है?',
        questionEnglish: 'What is the freedom movement led by Birsa Munda called?',
        options: ['उलगुलान (Ulgulan)', 'चिपको (Chipko)', 'संथाल हुल (Santhal Hul)', 'दांडी मार्च (Dandi March)'],
        correctIndex: 0,
        explanation: 'मुंडारी भाषा में बिरसा मुंडा के ऐतिहासिक आंदोलन को उलगुलान (महासंग्राम) कहा जाता है।'
      }
    ]
  },
  c13: {
    id: 'c13',
    moralLesson: 'दूसरों के साथ वैसा ही आचरण करो जैसा व्यवहार तुम अपने लिए चाहते हो।',
    culturalInsight: 'मुंडारी पंचतंत्र कथा जो जंगलों में साझा भोजन और सहानुभूति का मूल्य सिखाती है।',
    scenes: [
      {
        sceneNum: 1,
        sceneTitleHindi: 'लोमड़ी और सारस की मित्रता',
        sceneTitleTribal: 'तुयु ओन्दो कोवा',
        illustrationIcon: '🦊',
        paragraphScript: 'खूंटी रेन बीर रे मिद तुयु ओन्दो मिद कोवा गाते ताएकेना। तुयु चालाक ताएकेना।',
        paragraphRoman: 'Khunti ren bir re mid tuyu ondo mid kowa gate taekena. Tuyu chalak taekena.',
        paragraphHindi: 'खूंटी के जंगल में एक लोमड़ी और एक सारस में मित्रता थी। लोमड़ी बहुत चतुर और नटखट थी।',
        paragraphEnglish: 'In the woodland of Khunti, a clever fox and a graceful crane were forest companions.',
        keyVocabulary: [
          { word: 'तुयु (Tuyu)', roman: 'Tuyu', meaning: 'लोमड़ी (Fox)' },
          { word: 'कोवा (Kowa)', roman: 'Kowa', meaning: 'सारस पक्षी (Crane)' }
        ]
      },
      {
        sceneNum: 2,
        sceneTitleHindi: 'समतल पत्तल की खीर',
        sceneTitleTribal: 'पत्तल रे मण्डी',
        illustrationIcon: '🥣',
        paragraphScript: 'तुयु कोवा के समतल साकम रे खीर जोम लगिद ओमादा। कोवा रेन चुंचु लातूर रे खीर का सोब लेना।',
        paragraphRoman: 'Tuyu kowa ke samtal sakam re kheer jom lagid omada. Kowa ren chunchu latur re kheer ka sob lena.',
        paragraphHindi: 'लोमड़ी ने सारस को समतल पत्ते पर खीर परोसी। सारस अपनी लंबी चोंच के कारण खीर नहीं खा सका।',
        paragraphEnglish: 'The fox served rice pudding on a flat sal leaf; the crane could not eat with its slender beak.',
        keyVocabulary: [
          { word: 'साकम (Sakam)', roman: 'Sakam', meaning: 'पत्ता / पत्तल (Sal Leaf)' },
          { word: 'मण्डी (Mandi)', roman: 'Mandi', meaning: 'भोजन / चावल (Meal / Rice)' }
        ]
      },
      {
        sceneNum: 3,
        sceneTitleHindi: 'सुराहीदार घड़े में दावत',
        sceneTitleTribal: 'टुंकी रे जोम-ञू',
        illustrationIcon: '🏺',
        paragraphScript: 'दोसर दिन कोवा तुयु के सुराही टुंकी रे जोम ओमादा। तुयु बुझौ केदा जे गाते के दुख का ओमोः दरकार।',
        paragraphRoman: 'Dosar din kowa tuyu ke surahi tunki re jom omada. Tuyu bujhau keda je gate ke dukh ka omoh darkar.',
        paragraphHindi: 'अगले दिन सारस ने लोमड़ी को संकरे मुंह वाले घड़े में खीर दी। लोमड़ी को अपनी गलती समझ आ गई और दोनों ने प्रेम से मिलकर खाया।',
        paragraphEnglish: 'The next day, the crane served soup in a tall narrow jug. The fox learned empathy, and both shared happily.',
        keyVocabulary: [
          { word: 'टुंकी (Tunki)', roman: 'Tunki', meaning: 'मिट्टी का घड़ा (Narrow Clay Pot)' },
          { word: 'गाते (Gate)', roman: 'Gate', meaning: 'मित्र / सखा (Friend)' }
        ]
      }
    ],
    quiz: [
      {
        questionHindi: 'मुंडारी भाषा में लोमड़ी को क्या कहा जाता है?',
        questionEnglish: 'What is a fox called in Mundari?',
        options: ['तुयु (Tuyu)', 'कुल (Kul)', 'मेरोम (Merom)', 'हाती (Hati)'],
        correctIndex: 0,
        explanation: 'मुंडारी में लोमड़ी को तुयु (Tuyu) कहते हैं।'
      },
      {
        questionHindi: 'इस लोककथा से बच्चों को क्या सीख मिलती है?',
        questionEnglish: 'What is the moral of this traditional fable?',
        options: ['दूसरों के साथ सम्मान व बराबरी का व्यवहार करें', 'लोमड़ी सबसे तेज है', 'सारस उड़ नहीं सकता', 'अकेले खाना खाएं'],
        correctIndex: 0,
        explanation: 'यह कहानी सिखाती है कि मित्रता में एक-दूसरे की जरूरतों का ख्याल रखना चाहिए।'
      }
    ]
  }
};
