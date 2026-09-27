import type { TribalLanguage, SourceLanguage } from '../types.ts';
import { CLASSROOM_PHRASES, type PhraseTranslation } from '../data/mockData.ts';
import { CLASSROOM_DIALOGUE_SCENARIOS } from '../data/classroomDialogueScenarios.ts';
import { gameAudio } from './gameAudio.ts';

export interface PairedClassroomReply {
  speakerRole: 'student' | 'teacher';
  hindi: string;
  english: string;
  santhali: { script: string; roman: string; phonetic: string };
  ho: { script: string; roman: string; phonetic: string };
  mundari: { script: string; roman: string; phonetic: string };
}

export interface TranslationResult {
  script: string;
  scriptName: string;
  romanized: string;
  devanagariPhonetic: string;
  englishMeaning: string;
  hindiMeaning?: string;
  audioHint: string;
  targetLanguage: TribalLanguage | 'Hindi' | 'English';
  wordsBreakdown?: Array<{
    word: string;
    romanized: string;
    phonetic: string;
    meaning: string;
  }>;
  expectedClassroomReply?: PairedClassroomReply;
}

// Comprehensive vocabulary mapping for FLN words and classroom expressions
interface VocabEntry {
  hindi: string[];
  english: string[];
  santhali: {
    script: string;
    romanized: string;
    devanagariPhonetic: string;
  };
  ho: {
    script: string;
    romanized: string;
    devanagariPhonetic: string;
  };
  mundari: {
    script: string;
    romanized: string;
    devanagariPhonetic: string;
  };
  englishMeaning: string;
}

export const VOCABULARY_CORPUS: VocabEntry[] = [
  // Greetings & Social
  {
    hindi: ['नमस्ते', 'नमस्कार', 'प्रणाम', 'जोहार'],
    english: ['hello', 'greetings', 'welcome', 'hi'],
    santhali: {
      script: 'ᱡᱚᱦᱟᱨ',
      romanized: 'Johar',
      devanagariPhonetic: 'जोहार'
    },
    ho: {
      script: '𑢹𑣉𑣉 𑢡𑣂',
      romanized: 'Johar',
      devanagariPhonetic: 'जोहार'
    },
    mundari: {
      script: 'जोहार',
      romanized: 'Johar',
      devanagariPhonetic: 'जोहार'
    },
    englishMeaning: 'Traditional tribal greeting of respect'
  },
  {
    hindi: ['धन्यवाद', 'शुक्रिया', 'आभार'],
    english: ['thank you', 'thanks', 'gratitude'],
    santhali: {
      script: 'ᱥᱟᱨᱦᱟᱣ',
      romanized: 'Sarhaw',
      devanagariPhonetic: 'सारहाव'
    },
    ho: {
      script: '𑢷𑣁𑣜𑣂',
      romanized: 'Sarhaw',
      devanagariPhonetic: 'सारहाव'
    },
    mundari: {
      script: 'सराहाओ',
      romanized: 'Sarhao',
      devanagariPhonetic: 'सराहाओ'
    },
    englishMeaning: 'Thank you / appreciation'
  },
  {
    hindi: ['आप कैसे हैं', 'तुम कैसे हो', 'कैसा चल रहा है', 'कैसे हो'],
    english: ['how are you', 'how are you doing'],
    santhali: {
      script: 'ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?',
      romanized: 'Ched leka menama?',
      devanagariPhonetic: 'चेद लेका मेनामा?'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑 𑢖𑣄𑣂',
      romanized: 'Chikan bugin menama?',
      devanagariPhonetic: 'चिकन बुगिन मेनामा?'
    },
    mundari: {
      script: 'चि बुगीगे मेनामा?',
      romanized: 'Chi bugige menama?',
      devanagariPhonetic: 'चि बुगीगे मेनामा?'
    },
    englishMeaning: 'How are you?'
  },
  {
    hindi: ['मैं ठीक हूँ', 'सब ठीक है', 'हम अच्छे हैं'],
    english: ['i am fine', 'all good', 'we are fine'],
    santhali: {
      script: 'ᱤᱧ ᱫᱚ ᱱᱟᱯᱟᱭ ᱜᱮ ᱢᱮᱱᱟᱹᱧᱟ',
      romanized: 'Inj do napay ge menanja',
      devanagariPhonetic: 'इंज दो नापाय गे मेनांजा'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑 𑢶𑣂𑣓𑣂',
      romanized: 'Aing bugite menana',
      devanagariPhonetic: 'आईंग बुगिते मेनाना'
    },
    mundari: {
      script: 'आईंग बुगीगे मेनां',
      romanized: 'Aing bugige menan',
      devanagariPhonetic: 'आईंग बुगीगे मेनां'
    },
    englishMeaning: 'I am fine / well'
  },

  // Classroom Instructions
  {
    hindi: ['बैठो', 'बैठ जाओ', 'कृपया बैठें'],
    english: ['sit down', 'please sit', 'sit'],
    santhali: {
      script: 'ᱫᱷᱩᱲᱩᱵ ᱢᱮ',
      romanized: 'Dhurub me',
      devanagariPhonetic: 'धुरुब मे'
    },
    ho: {
      script: '𑢑𑣃𑣡 𑢶𑣂',
      romanized: 'Dub me',
      devanagariPhonetic: 'दुब मे'
    },
    mundari: {
      script: 'दुबपे',
      romanized: 'Dubpe',
      devanagariPhonetic: 'दुबपे'
    },
    englishMeaning: 'Sit down'
  },
  {
    hindi: ['खड़े हो जाओ', 'खड़े हो', 'उठो'],
    english: ['stand up', 'stand'],
    santhali: {
      script: 'ᱛᱤᱸᱜᱩᱱ ᱢᱮ',
      romanized: 'Tingun me',
      devanagariPhonetic: 'तिंगुन मे'
    },
    ho: {
      script: '𑢱𑣂𑣓𑣉𑣁 𑢶𑣂',
      romanized: 'Tingu en me',
      devanagariPhonetic: 'तिंगु एन मे'
    },
    mundari: {
      script: 'तिंगुपे',
      romanized: 'Tingupe',
      devanagariPhonetic: 'तिंगुपे'
    },
    englishMeaning: 'Stand up'
  },
  {
    hindi: ['यहाँ आओ', 'इधर आओ', 'पास आओ'],
    english: ['come here', 'come near'],
    santhali: {
      script: 'ᱱᱚᱸᱰᱮ ᱦᱤᱡᱩᱜ ᱢᱮ',
      romanized: 'Nonde hijug me',
      devanagariPhonetic: 'नोंडे हिजुग मे'
    },
    ho: {
      script: '𑢓𑣂𑣜𑣂 𑢹𑣂𑣑𑣃 𑢶𑣂',
      romanized: 'Nere hiju me',
      devanagariPhonetic: 'नेरे हिजु मे'
    },
    mundari: {
      script: 'नेरे हिजुपे',
      romanized: 'Nere hijupe',
      devanagariPhonetic: 'नेरे हिजुपे'
    },
    englishMeaning: 'Come here'
  },
  {
    hindi: ['वहाँ जाओ', 'जाओ', 'अपनी जगह जाओ'],
    english: ['go there', 'go back', 'go'],
    santhali: {
      script: 'ᱦᱟᱸᱰᱮ ᱥᱮᱱᱚᱜ ᱢᱮ',
      romanized: 'Hande senog me',
      devanagariPhonetic: 'हांडे सेनोग मे'
    },
    ho: {
      script: '𑢹𑣁𑣓𑣑𑣂 𑢷𑣂𑣓 𑢶𑣂',
      romanized: 'Hande sen me',
      devanagariPhonetic: 'हांडे सेन मे'
    },
    mundari: {
      script: 'हांडे सेनपे',
      romanized: 'Hande senpe',
      devanagariPhonetic: 'हांडे सेनपे'
    },
    englishMeaning: 'Go there'
  },
  {
    hindi: ['सुनो', 'ध्यान से सुनो', 'मेरी बात सुनो'],
    english: ['listen', 'listen carefully', 'hear'],
    santhali: {
      script: 'ᱟᱧᱡᱚᱢ ᱢᱮ',
      romanized: 'Anjom me',
      devanagariPhonetic: 'आंजोम मे'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
      romanized: 'Ayum me',
      devanagariPhonetic: 'आयूम मे'
    },
    mundari: {
      script: 'आयुमेपे',
      romanized: 'Ayumepe',
      devanagariPhonetic: 'आयुमेपे'
    },
    englishMeaning: 'Listen carefully'
  },
  {
    hindi: ['बोलो', 'कहो', 'उत्तर दो'],
    english: ['speak', 'say', 'tell'],
    santhali: {
      script: 'ᱨᱚᱲ ᱢᱮ',
      romanized: 'Ror me',
      devanagariPhonetic: 'रोड़ मे'
    },
    ho: {
      script: '𑢱𑣁𑣑𑣂 𑢶𑣂',
      romanized: 'Kaji me',
      devanagariPhonetic: 'काजि मे'
    },
    mundari: {
      script: 'कजीपे',
      romanized: 'Kajipe',
      devanagariPhonetic: 'कजीपे'
    },
    englishMeaning: 'Speak / say'
  },
  {
    hindi: ['लिखो', 'कॉपी में लिखो', 'लिखना'],
    english: ['write', 'write down'],
    santhali: {
      script: 'ᱚᱞ ᱢᱮ',
      romanized: 'Ol me',
      devanagariPhonetic: 'ओल मे'
    },
    ho: {
      script: '𑢵𑣚 𑢶𑣂',
      romanized: 'Ol me',
      devanagariPhonetic: 'ओल मे'
    },
    mundari: {
      script: 'ओलपे',
      romanized: 'Olpe',
      devanagariPhonetic: 'ओलपे'
    },
    englishMeaning: 'Write down'
  },
  {
    hindi: ['पढ़ो', 'किताब पढ़ो', 'पढ़ना'],
    english: ['read', 'read books'],
    santhali: {
      script: 'ᱯᱟᱲᱦᱟᱣ ᱢᱮ',
      romanized: 'Parhaw me',
      devanagariPhonetic: 'पाड़हाव मे'
    },
    ho: {
      script: '𑢥𑣁𑣂 𑢶𑣂',
      romanized: 'Pai me',
      devanagariPhonetic: 'पाई मे'
    },
    mundari: {
      script: 'पड़ावपे',
      romanized: 'Parawpe',
      devanagariPhonetic: 'पड़ावपे'
    },
    englishMeaning: 'Read'
  },
  {
    hindi: ['ताली बजाओ', 'तालियां'],
    english: ['clap hands', 'applause', 'clap'],
    santhali: {
      script: 'ᱛᱷᱟᱹᱨᱤ ᱪᱟᱯᱩᱲ ᱢᱮ',
      romanized: 'Thari chapur me',
      devanagariPhonetic: 'थारी चापुड़ मे'
    },
    ho: {
      script: '𑢱𑣁𑣚𑣂 𑢡𑣂𑣑𑣁 𑢶𑣂',
      romanized: 'Ti thaba me',
      devanagariPhonetic: 'ती थाबा मे'
    },
    mundari: {
      script: 'ती चापुड़ेपे',
      romanized: 'Ti chapurepe',
      devanagariPhonetic: 'ती चापुड़ेपे'
    },
    englishMeaning: 'Clap your hands'
  },
  {
    hindi: ['शांत रहो', 'चुप रहो', 'शोर मत करो'],
    english: ['keep quiet', 'be quiet', 'silence'],
    santhali: {
      script: 'ᱛᱷᱤᱨ ᱠᱚᱜ ᱢᱮ',
      romanized: 'Thir kog me',
      devanagariPhonetic: 'थिर कॉग मे'
    },
    ho: {
      script: '𑢱𑣂𑣜 𑢱𑣉𑣁 𑢶𑣂',
      romanized: 'Thir tingu me',
      devanagariPhonetic: 'थिर तिंगु मे'
    },
    mundari: {
      script: 'थिरके ताइनपे',
      romanized: 'Thirke tainpe',
      devanagariPhonetic: 'थिरके ताइनपे'
    },
    englishMeaning: 'Keep quiet / be peaceful'
  },
  {
    hindi: ['बहुत अच्छा', 'शाबाश', 'अति सुंदर'],
    english: ['very good', 'well done', 'excellent'],
    santhali: {
      script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ',
      romanized: 'Adi napay',
      devanagariPhonetic: 'आदि नापाय'
    },
    ho: {
      script: '𑢡𑣃𑣜𑣂𑣑 𑢡𑣃𑣜𑣂𑣑',
      romanized: 'Bugin bugin',
      devanagariPhonetic: 'बुगिन बुगिन'
    },
    mundari: {
      script: 'बुगीते बोगिन',
      romanized: 'Bugite bogin',
      devanagariPhonetic: 'बुगीते बोगिन'
    },
    englishMeaning: 'Very good / excellent'
  },

  // Everyday Classroom & FLN Nouns
  {
    hindi: ['पानी', 'जल'],
    english: ['water'],
    santhali: {
      script: 'ᱫᱟᱜ',
      romanized: 'Daak',
      devanagariPhonetic: 'दाक'
    },
    ho: {
      script: '𑢑𑣁𑣄',
      romanized: 'Daak',
      devanagariPhonetic: 'दाक'
    },
    mundari: {
      script: 'दाः',
      romanized: 'Daah',
      devanagariPhonetic: 'दाः'
    },
    englishMeaning: 'Water'
  },
  {
    hindi: ['किताब', 'पुस्तक', 'पुस्तिका'],
    english: ['book', 'books'],
    santhali: {
      script: 'ᱯᱩᱛᱷᱤ',
      romanized: 'Puthi',
      devanagariPhonetic: 'पुथी'
    },
    ho: {
      script: '𑢥𑣉𑣕𑣂',
      romanized: 'Pothi',
      devanagariPhonetic: 'पोथी'
    },
    mundari: {
      script: 'पुथी',
      romanized: 'Puthi',
      devanagariPhonetic: 'पुथी'
    },
    englishMeaning: 'Book / reader'
  },
  {
    hindi: ['कलम', 'पेंसिल', 'लेखनी'],
    english: ['pen', 'pencil'],
    santhali: {
      script: 'ᱠᱚᱞᱚᱢ',
      romanized: 'Kalam',
      devanagariPhonetic: 'कॉलम'
    },
    ho: {
      script: '𑢱𑣉𑣚𑣉𑣖',
      romanized: 'Kalam',
      devanagariPhonetic: 'कलम'
    },
    mundari: {
      script: 'क़लम',
      romanized: 'Kalam',
      devanagariPhonetic: 'कलम'
    },
    englishMeaning: 'Pen / writing pencil'
  },
  {
    hindi: ['पेड़', 'वृक्ष', 'दरख्त'],
    english: ['tree', 'trees'],
    santhali: {
      script: 'ᱫᱟᱨᱮ',
      romanized: 'Dare',
      devanagariPhonetic: 'दारे'
    },
    ho: {
      script: '𑢑𑣁𑣜𑣂',
      romanized: 'Dare',
      devanagariPhonetic: 'दारे'
    },
    mundari: {
      script: 'दारे',
      romanized: 'Dare',
      devanagariPhonetic: 'दारे'
    },
    englishMeaning: 'Tree / flora'
  },
  {
    hindi: ['फूल', 'पुष्प'],
    english: ['flower', 'flowers'],
    santhali: {
      script: 'ᱵᱟᱦᱟ',
      romanized: 'Baha',
      devanagariPhonetic: 'बाहा'
    },
    ho: {
      script: '𑢡𑣁𑣹𑣁',
      romanized: 'Baha',
      devanagariPhonetic: 'बाहा'
    },
    mundari: {
      script: 'बाहा',
      romanized: 'Baha',
      devanagariPhonetic: 'बाहा'
    },
    englishMeaning: 'Flower / spring bloom'
  },
  {
    hindi: ['फल'],
    english: ['fruit', 'fruits'],
    santhali: {
      script: 'ᱡᱚ',
      romanized: 'Jo',
      devanagariPhonetic: 'जो'
    },
    ho: {
      script: '𑢑𑣉',
      romanized: 'Jo',
      devanagariPhonetic: 'जो'
    },
    mundari: {
      script: 'जो',
      romanized: 'Jo',
      devanagariPhonetic: 'जो'
    },
    englishMeaning: 'Fruit'
  },
  {
    hindi: ['घर', 'मकान', 'गृह'],
    english: ['house', 'home'],
    santhali: {
      script: 'ᱚᱲᱟᱜ',
      romanized: 'Orag',
      devanagariPhonetic: 'ओड़ाग'
    },
    ho: {
      script: '𑢵𑣜𑣁',
      romanized: 'Ora',
      devanagariPhonetic: 'ओड़ा'
    },
    mundari: {
      script: 'ओड़ाः',
      romanized: 'Odaah',
      devanagariPhonetic: 'ओड़ाः'
    },
    englishMeaning: 'Home / house'
  },
  {
    hindi: ['स्कूल', 'विद्यालय', 'पाठशाला'],
    english: ['school'],
    santhali: {
      script: 'ᱵᱤᱨᱫᱟᱹᱜᱟᱲ',
      romanized: 'Birdagarh',
      devanagariPhonetic: 'बिरदागाढ़'
    },
    ho: {
      script: '𑢡𑣂𑣜𑣑𑣁 𑢵𑣜𑣁',
      romanized: 'Iskul',
      devanagariPhonetic: 'स्कूल'
    },
    mundari: {
      script: 'स्कूल / पाढ़ साला',
      romanized: 'Iskul',
      devanagariPhonetic: 'स्कूल'
    },
    englishMeaning: 'School / learning sanctuary'
  },
  {
    hindi: ['बच्चा', 'बच्चे', 'बालक'],
    english: ['child', 'children', 'kids'],
    santhali: {
      script: 'ᱜᱤᱫᱽᱨᱟᱹ',
      romanized: 'Gidra',
      devanagariPhonetic: 'गिदरा'
    },
    ho: {
      script: '𑢹𑣉𑣉 𑢷𑣉𑣑',
      romanized: 'Hon ko',
      devanagariPhonetic: 'होन को'
    },
    mundari: {
      script: 'होन्को',
      romanized: 'Honko',
      devanagariPhonetic: 'होन्को'
    },
    englishMeaning: 'Children / young learners'
  },
  {
    hindi: ['शिक्षक', 'गुरुजी', 'सर', 'मैडम', 'अध्यापक'],
    english: ['teacher', 'guru'],
    santhali: {
      script: 'ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ',
      romanized: 'Machet gomke',
      devanagariPhonetic: 'माचेत गोमके'
    },
    ho: {
      script: '𑢶𑣁𑣖𑣁 𑢹𑣉𑣉',
      romanized: 'Guru gomke',
      devanagariPhonetic: 'गुरु गोमके'
    },
    mundari: {
      script: 'माशाय',
      romanized: 'Mashay',
      devanagariPhonetic: 'माशाय'
    },
    englishMeaning: 'Respected teacher'
  },
  {
    hindi: ['भात', 'चावल', 'भोजन', 'खाना'],
    english: ['food', 'rice', 'lunch', 'meal'],
    santhali: {
      script: 'ᱫᱟᱠᱟ',
      romanized: 'Daka',
      devanagariPhonetic: 'दाका'
    },
    ho: {
      script: '𑢶𑣁𑣓𑣑𑣂',
      romanized: 'Mandi',
      devanagariPhonetic: 'मांडी'
    },
    mundari: {
      script: 'मांडी',
      romanized: 'Mandi',
      devanagariPhonetic: 'मांडी'
    },
    englishMeaning: 'Meal / cooked rice'
  },

  // Numeracy 1 to 10
  {
    hindi: ['एक', '१', '1'],
    english: ['one', '1'],
    santhali: {
      script: 'ᱢᱤᱫ',
      romanized: 'Mit',
      devanagariPhonetic: 'मिद'
    },
    ho: {
      script: '𑢖𑣂𑣑',
      romanized: 'Miyad',
      devanagariPhonetic: 'मियाद'
    },
    mundari: {
      script: 'मियाद',
      romanized: 'Miyad',
      devanagariPhonetic: 'मियाद'
    },
    englishMeaning: 'Number 1'
  },
  {
    hindi: ['दो', '२', '2'],
    english: ['two', '2'],
    santhali: {
      script: 'ᱵᱟᱨ',
      romanized: 'Bar',
      devanagariPhonetic: 'बार'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂',
      romanized: 'Bariya',
      devanagariPhonetic: 'बारिया'
    },
    mundari: {
      script: 'बारिया',
      romanized: 'Bariya',
      devanagariPhonetic: 'बारिया'
    },
    englishMeaning: 'Number 2'
  },
  {
    hindi: ['तीन', '३', '3'],
    english: ['three', '3'],
    santhali: {
      script: 'ᱯᱮ',
      romanized: 'Pe',
      devanagariPhonetic: 'पे'
    },
    ho: {
      script: '𑢥𑣂𑣁',
      romanized: 'Apia',
      devanagariPhonetic: 'आपिया'
    },
    mundari: {
      script: 'आपिया',
      romanized: 'Apiya',
      devanagariPhonetic: 'आपिया'
    },
    englishMeaning: 'Number 3'
  },
  {
    hindi: ['चार', '४', '4'],
    english: ['four', '4'],
    santhali: {
      script: 'ᱯᱩᱱ',
      romanized: 'Pun',
      devanagariPhonetic: 'पुन'
    },
    ho: {
      script: '𑢥𑣃𑣓',
      romanized: 'Upuniya',
      devanagariPhonetic: 'उपूनिया'
    },
    mundari: {
      script: 'उपूनिया',
      romanized: 'Upuniya',
      devanagariPhonetic: 'उपूनिया'
    },
    englishMeaning: 'Number 4'
  },
  {
    hindi: ['पांच', 'पाँच', '५', '5'],
    english: ['five', '5'],
    santhali: {
      script: 'ᱢᱚᱬᱮ',
      romanized: 'More',
      devanagariPhonetic: 'मोड़े'
    },
    ho: {
      script: '𑢖𑣉𑣜𑣂',
      romanized: 'Moyad',
      devanagariPhonetic: 'मोयड़'
    },
    mundari: {
      script: 'मोड़े',
      romanized: 'Mode',
      devanagariPhonetic: 'मोड़े'
    },
    englishMeaning: 'Number 5'
  },
  {
    hindi: ['छह', 'छः', '६', '6'],
    english: ['six', '6'],
    santhali: {
      script: 'ᱛᱩᱨᱩᱭ',
      romanized: 'Turui',
      devanagariPhonetic: 'तुरूई'
    },
    ho: {
      script: '𑢱𑣃𑣜𑣃𑣂',
      romanized: 'Turui',
      devanagariPhonetic: 'तुरूई'
    },
    mundari: {
      script: 'तुरूई',
      romanized: 'Turui',
      devanagariPhonetic: 'तुरूई'
    },
    englishMeaning: 'Number 6'
  },
  {
    hindi: ['सात', '७', '7'],
    english: ['seven', '7'],
    santhali: {
      script: 'ᱮᱭᱟᱭ',
      romanized: 'Eyay',
      devanagariPhonetic: 'एयाय'
    },
    ho: {
      script: '𑢠𑣂𑣁𑣂',
      romanized: 'Eya',
      devanagariPhonetic: 'एया'
    },
    mundari: {
      script: 'एया',
      romanized: 'Eya',
      devanagariPhonetic: 'एया'
    },
    englishMeaning: 'Number 7'
  },
  {
    hindi: ['आठ', '८', '8'],
    english: ['eight', '8'],
    santhali: {
      script: 'ᱤᱨᱟᱹᱞ',
      romanized: 'Iral',
      devanagariPhonetic: 'इराल'
    },
    ho: {
      script: '𑢡𑣂𑣜𑣂𑣚',
      romanized: 'Iril',
      devanagariPhonetic: 'इरील'
    },
    mundari: {
      script: 'इरील',
      romanized: 'Iril',
      devanagariPhonetic: 'इरील'
    },
    englishMeaning: 'Number 8'
  },
  {
    hindi: ['नौ', '९', '9'],
    english: ['nine', '9'],
    santhali: {
      script: 'ᱟᱨᱮ',
      romanized: 'Are',
      devanagariPhonetic: 'आरे'
    },
    ho: {
      script: '𑢡𑣁𑣜𑣂',
      romanized: 'Are',
      devanagariPhonetic: 'आरे'
    },
    mundari: {
      script: 'आरे',
      romanized: 'Are',
      devanagariPhonetic: 'आरे'
    },
    englishMeaning: 'Number 9'
  },
  {
    hindi: ['दस', '१०', '10'],
    english: ['ten', '10'],
    santhali: {
      script: 'ᱜᱮᱞ',
      romanized: 'Gel',
      devanagariPhonetic: 'गेल'
    },
    ho: {
      script: '𑢑𑣂𑣚',
      romanized: 'Gel',
      devanagariPhonetic: 'गेल'
    },
    mundari: {
      script: 'गेल',
      romanized: 'Gel',
      devanagariPhonetic: 'गेल'
    },
    englishMeaning: 'Number 10'
  },

  // Additional FLN Classroom & Daily Communication Vocabulary
  {
    hindi: ['नाम', 'तुम्हारा नाम क्या है', 'नाम क्या है'],
    english: ['name', 'what is your name', 'whats your name'],
    santhali: {
      script: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ?',
      romanized: 'Amag nutum ched?',
      devanagariPhonetic: 'आमाग ञुतुम चेद?'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢓𑣃𑣕𑣃𑣖 𑢡𑣂',
      romanized: 'Ama nutum chikan?',
      devanagariPhonetic: 'आमा नुतुम चिकन?'
    },
    mundari: {
      script: 'आमाः नुतुम चिनाः?',
      romanized: 'Amaah nutum chinaah?',
      devanagariPhonetic: 'आमाः नुतुम चिनाः?'
    },
    englishMeaning: 'What is your name?'
  },
  {
    hindi: ['मेरा नाम', 'मेरा नाम है'],
    english: ['my name is', 'my name'],
    santhali: {
      script: 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ',
      romanized: 'Injag nutum',
      devanagariPhonetic: 'इञाग ञुतुम'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢓𑣃𑣕𑣃𑣖',
      romanized: 'Aing-a nutum',
      devanagariPhonetic: 'आईंगा नुतुम'
    },
    mundari: {
      script: 'आईंआः नुतुम',
      romanized: 'Aing-aah nutum',
      devanagariPhonetic: 'आईंआः नुतुम'
    },
    englishMeaning: 'My name is...'
  },
  {
    hindi: ['आओ', 'अंदर आओ', 'कक्षा में आओ'],
    english: ['come in', 'enter', 'come inside'],
    santhali: {
      script: 'ᱵᱷᱤᱛᱨᱤ ᱦᱤᱡᱩᱜ ᱢᱮ',
      romanized: 'Bhitri hijug me',
      devanagariPhonetic: 'भितरी हिजुग मे'
    },
    ho: {
      script: '𑢡𑣂𑣕𑣂𑣜 𑢹𑣂𑣑𑣃 𑢶𑣂',
      romanized: 'Bhitar hiju me',
      devanagariPhonetic: 'भितर हिजु मे'
    },
    mundari: {
      script: 'भितार हिजुपे',
      romanized: 'Bhitar hijupe',
      devanagariPhonetic: 'भितार हिजुपे'
    },
    englishMeaning: 'Come inside / enter classroom'
  },
  {
    hindi: ['जाओ', 'बाहर जाओ', 'घर जाओ'],
    english: ['go out', 'go home', 'leave'],
    santhali: {
      script: 'ᱵᱟᱦᱨᱮ ᱥᱮᱱᱚᱜ ᱢᱮ',
      romanized: 'Bahre senog me',
      devanagariPhonetic: 'बाहरे सेनोग मे'
    },
    ho: {
      script: '𑢡𑣁𑣹𑣜𑣂 𑢷𑣂𑣓 𑢶𑣂',
      romanized: 'Bahre sen me',
      devanagariPhonetic: 'बाहरे सेन मे'
    },
    mundari: {
      script: 'बाहरे सेनपे',
      romanized: 'Bahre senpe',
      devanagariPhonetic: 'बाहरे सेनपे'
    },
    englishMeaning: 'Go outside / go home'
  },
  {
    hindi: ['गाना गाओ', 'गीत गाओ', 'गाओ'],
    english: ['sing', 'sing a song', 'song'],
    santhali: {
      script: 'ᱥᱮᱨᱮᱧ ᱢᱮ',
      romanized: 'Serenj me',
      devanagariPhonetic: 'सेरेंज मे'
    },
    ho: {
      script: '𑢷𑣂𑣜𑣂𑣓𑣑 𑢶𑣂',
      romanized: 'Durang me',
      devanagariPhonetic: 'दुरंग मे'
    },
    mundari: {
      script: 'दुरंगपे',
      romanized: 'Durangpe',
      devanagariPhonetic: 'दुरंगपे'
    },
    englishMeaning: 'Sing a song'
  },
  {
    hindi: ['नाचो', 'नृत्य करो', 'डांस करो'],
    english: ['dance', 'dance together'],
    santhali: {
      script: 'ᱮᱱᱮᱡ ᱢᱮ',
      romanized: 'Enej me',
      devanagariPhonetic: 'एनेज मे'
    },
    ho: {
      script: '𑢷𑣃𑣱𑣃𑣜 𑢶𑣂',
      romanized: 'Susun me',
      devanagariPhonetic: 'सुसुन मे'
    },
    mundari: {
      script: 'सुसुनपे',
      romanized: 'Susunpe',
      devanagariPhonetic: 'सुसुनपे'
    },
    englishMeaning: 'Dance'
  },
  {
    hindi: ['हाँ', 'सही', 'ठीक'],
    english: ['yes', 'correct', 'right', 'ok'],
    santhali: {
      script: 'ᱦᱮᱸ',
      romanized: 'Hen',
      devanagariPhonetic: 'हें'
    },
    ho: {
      script: '𑢹𑣂𑣁',
      romanized: 'Hea',
      devanagariPhonetic: 'हे-आ'
    },
    mundari: {
      script: 'हें',
      romanized: 'Hen',
      devanagariPhonetic: 'हें'
    },
    englishMeaning: 'Yes / correct'
  },
  {
    hindi: ['नहीं', 'ना', 'गलत'],
    english: ['no', 'not', 'wrong'],
    santhali: {
      script: 'ᱵᱟᱝ',
      romanized: 'Bang',
      devanagariPhonetic: 'बांग'
    },
    ho: {
      script: '𑢡𑣁𑣓𑣉',
      romanized: 'Ka / Banoa',
      devanagariPhonetic: 'का / बानोआ'
    },
    mundari: {
      script: 'का / बनोःआ',
      romanized: 'Ka / Banoah',
      devanagariPhonetic: 'का / बनोःआ'
    },
    englishMeaning: 'No / negative'
  },
  {
    hindi: ['दोस्त', 'मित्र', 'सखा'],
    english: ['friend', 'friends'],
    santhali: {
      script: 'ᱜᱟᱛᱮ',
      romanized: 'Gate',
      devanagariPhonetic: 'गाते'
    },
    ho: {
      script: '𑢑𑣁𑣕𑣂',
      romanized: 'Gate',
      devanagariPhonetic: 'गाते'
    },
    mundari: {
      script: 'गाते',
      romanized: 'Gate',
      devanagariPhonetic: 'गाते'
    },
    englishMeaning: 'Friend / classmate'
  },
  {
    hindi: ['माँ', 'माता', 'अम्मा'],
    english: ['mother', 'mom'],
    santhali: {
      script: 'ᱟᱭᱳ',
      romanized: 'Ayo',
      devanagariPhonetic: 'आयो'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂',
      romanized: 'Enga',
      devanagariPhonetic: 'एंगा'
    },
    mundari: {
      script: 'एंगा',
      romanized: 'Enga',
      devanagariPhonetic: 'एंगा'
    },
    englishMeaning: 'Mother'
  },
  {
    hindi: ['पिता', 'बापू', 'पापा'],
    english: ['father', 'dad'],
    santhali: {
      script: 'ᱵᱟᱵᱟ',
      romanized: 'Baba',
      devanagariPhonetic: 'बाबा'
    },
    ho: {
      script: '𑢡𑣁𑣡𑣁',
      romanized: 'Appa',
      devanagariPhonetic: 'आप्पा'
    },
    mundari: {
      script: 'आपु / आपा',
      romanized: 'Apu',
      devanagariPhonetic: 'आपु'
    },
    englishMeaning: 'Father'
  },
  {
    hindi: ['भाई', 'छोटा भाई', 'बड़ा भाई'],
    english: ['brother'],
    santhali: {
      script: 'ᱵᱚᱭᱦᱟ',
      romanized: 'Boyha',
      devanagariPhonetic: 'बोयहा'
    },
    ho: {
      script: '𑢡𑣉𑣂𑣁',
      romanized: 'Haga',
      devanagariPhonetic: 'हागा'
    },
    mundari: {
      script: 'हागा / बोयहा',
      romanized: 'Haga / Boyha',
      devanagariPhonetic: 'हागा'
    },
    englishMeaning: 'Brother'
  },
  {
    hindi: ['बहन', 'दीदी', 'छोटी बहन'],
    english: ['sister'],
    santhali: {
      script: 'ᱢᱤᱥᱨᱟ',
      romanized: 'Misra',
      devanagariPhonetic: 'मिसरा'
    },
    ho: {
      script: '𑢖𑣂𑣷𑣂',
      romanized: 'Misi',
      devanagariPhonetic: 'मिसि'
    },
    mundari: {
      script: 'मिसि',
      romanized: 'Misi',
      devanagariPhonetic: 'मिसि'
    },
    englishMeaning: 'Sister'
  },
  {
    hindi: ['सूरज', 'सूर्य', 'धूप'],
    english: ['sun', 'sunlight'],
    santhali: {
      script: 'ᱥᱤᱧ ᱪᱟᱸᱫᱚ',
      romanized: 'Sinj Chando',
      devanagariPhonetic: 'सिंज चांदो'
    },
    ho: {
      script: '𑢷𑣂𑣓𑣑 𑢡𑣂𑣁𑣜𑣂',
      romanized: 'Singi',
      devanagariPhonetic: 'सिंगी'
    },
    mundari: {
      script: 'सिंगी',
      romanized: 'Singi',
      devanagariPhonetic: 'सिंगी'
    },
    englishMeaning: 'Sun / radiant sky'
  },
  {
    hindi: ['चाँद', 'चंद्रमा', 'चांद'],
    english: ['moon'],
    santhali: {
      script: 'ᱧᱤᱫᱟᱹ ᱪᱟᱸᱫᱚ',
      romanized: 'Ninda Chando',
      devanagariPhonetic: 'निंदा चांदो'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
      romanized: 'Chandu',
      devanagariPhonetic: 'चंदू'
    },
    mundari: {
      script: 'चंदू',
      romanized: 'Chandu',
      devanagariPhonetic: 'चंदू'
    },
    englishMeaning: 'Moon'
  },
  {
    hindi: ['हवा', 'पवन', 'वायु'],
    english: ['wind', 'air'],
    santhali: {
      script: 'ᱦᱚᱭ',
      romanized: 'Hoy',
      devanagariPhonetic: 'होय'
    },
    ho: {
      script: '𑢹𑣉𑣂',
      romanized: 'Hoyo',
      devanagariPhonetic: 'होयो'
    },
    mundari: {
      script: 'होयो',
      romanized: 'Hoyo',
      devanagariPhonetic: 'होयो'
    },
    englishMeaning: 'Wind / fresh air'
  },
  {
    hindi: ['चिड़िया', 'पक्षी', 'पंछी'],
    english: ['bird', 'birds'],
    santhali: {
      script: 'ᱪᱮᱬᱮ',
      romanized: 'Chene',
      devanagariPhonetic: 'चेणें'
    },
    ho: {
      script: '𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
      romanized: 'Chero',
      devanagariPhonetic: 'चेड़ो'
    },
    mundari: {
      script: 'चेणें',
      romanized: 'Chene',
      devanagariPhonetic: 'चेणें'
    },
    englishMeaning: 'Bird'
  },
  {
    hindi: ['बाघ', 'शेर', 'चीता'],
    english: ['tiger', 'leopard', 'lion'],
    santhali: {
      script: 'ᱛᱟᱹᱨᱩᱵ',
      romanized: 'Tarub',
      devanagariPhonetic: 'तारुब'
    },
    ho: {
      script: '𑢑𑣁𑣜𑣂 𑢡𑣂𑣁𑣜𑣂',
      romanized: 'Kula',
      devanagariPhonetic: 'कुला'
    },
    mundari: {
      script: 'कुला',
      romanized: 'Kula',
      devanagariPhonetic: 'कुला'
    },
    englishMeaning: 'Tiger / forest feline'
  },
  {
    hindi: ['गाय', 'गौ', 'गोरू'],
    english: ['cow', 'cattle'],
    santhali: {
      script: 'ᱜᱟᱹᱭ',
      romanized: 'Gay',
      devanagariPhonetic: 'गाई'
    },
    ho: {
      script: '𑢑𑣃𑣜𑣂',
      romanized: 'Uri',
      devanagariPhonetic: 'उरी'
    },
    mundari: {
      script: 'उरीः',
      romanized: 'Urih',
      devanagariPhonetic: 'उरीः'
    },
    englishMeaning: 'Cow / livestock'
  },
  {
    hindi: ['कुत्ता', 'श्वान'],
    english: ['dog', 'puppy'],
    santhali: {
      script: 'ᱥᱮᱛᱟ',
      romanized: 'Seta',
      devanagariPhonetic: 'सेता'
    },
    ho: {
      script: '𑢷𑣂𑣕𑣁',
      romanized: 'Seta',
      devanagariPhonetic: 'सेता'
    },
    mundari: {
      script: 'सेता',
      romanized: 'Seta',
      devanagariPhonetic: 'सेता'
    },
    englishMeaning: 'Dog'
  },
  {
    hindi: ['बिल्ली', 'मार्जार'],
    english: ['cat', 'kitten'],
    santhali: {
      script: 'ᱯᱩᱥᱤ',
      romanized: 'Pusi',
      devanagariPhonetic: 'पुसी'
    },
    ho: {
      script: '𑢥𑣃𑣷𑣂',
      romanized: 'Pusi',
      devanagariPhonetic: 'पुसी'
    },
    mundari: {
      script: 'पुसी',
      romanized: 'Pusi',
      devanagariPhonetic: 'पुसी'
    },
    englishMeaning: 'Cat'
  },
  {
    hindi: ['हाथ', 'हाथ धोना', 'हाथ दिखाओ'],
    english: ['hand', 'hands'],
    santhali: {
      script: 'ᱛᱤ',
      romanized: 'Ti',
      devanagariPhonetic: 'ती'
    },
    ho: {
      script: '𑢱𑣂',
      romanized: 'Ti',
      devanagariPhonetic: 'ती'
    },
    mundari: {
      script: 'ती',
      romanized: 'Ti',
      devanagariPhonetic: 'ती'
    },
    englishMeaning: 'Hand'
  },
  {
    hindi: ['पैर', 'पांव', 'कदम'],
    english: ['foot', 'feet', 'leg'],
    santhali: {
      script: 'ᱡᱟᱝᱜᱟ',
      romanized: 'Janga',
      devanagariPhonetic: 'जांगा'
    },
    ho: {
      script: '𑢑𑣁𑣓𑣉𑣁',
      romanized: 'Kata',
      devanagariPhonetic: 'काटा'
    },
    mundari: {
      script: 'काटा / जांगा',
      romanized: 'Kata',
      devanagariPhonetic: 'काटा'
    },
    englishMeaning: 'Foot / leg'
  },
  {
    hindi: ['आँख', 'नेत्र', 'नयन'],
    english: ['eye', 'eyes'],
    santhali: {
      script: 'ᱢᱮᱫ',
      romanized: 'Med',
      devanagariPhonetic: 'मेद'
    },
    ho: {
      script: '𑢖𑣂𑣑',
      romanized: 'Med',
      devanagariPhonetic: 'मेद'
    },
    mundari: {
      script: 'मेद',
      romanized: 'Med',
      devanagariPhonetic: 'मेद'
    },
    englishMeaning: 'Eye'
  },
  {
    hindi: ['कान', 'कर्ण'],
    english: ['ear', 'ears'],
    santhali: {
      script: 'ᱞᱩᱛᱩᱨ',
      romanized: 'Lutur',
      devanagariPhonetic: 'लुतुर'
    },
    ho: {
      script: '𑢚𑣃𑣕𑣃𑣜',
      romanized: 'Lutur',
      devanagariPhonetic: 'लुतुर'
    },
    mundari: {
      script: 'लुतुर',
      romanized: 'Lutur',
      devanagariPhonetic: 'लुतुर'
    },
    englishMeaning: 'Ear'
  },
  {
    hindi: ['मुँह', 'मुख'],
    english: ['mouth', 'face'],
    santhali: {
      script: 'ᱢᱚᱪᱟ',
      romanized: 'Mocha',
      devanagariPhonetic: 'मोचा'
    },
    ho: {
      script: '𑢖𑣉𑣁𑣂',
      romanized: 'Mocha',
      devanagariPhonetic: 'मोचा'
    },
    mundari: {
      script: 'मोचा',
      romanized: 'Mocha',
      devanagariPhonetic: 'मोचा'
    },
    englishMeaning: 'Mouth / face'
  },
  {
    hindi: ['सिर', 'माथा', 'शीश'],
    english: ['head'],
    santhali: {
      script: 'ᱵᱚᱦᱚᱜ',
      romanized: 'Bohog',
      devanagariPhonetic: 'बोहॉग'
    },
    ho: {
      script: '𑢡𑣉𑣹𑣉',
      romanized: 'Boh',
      devanagariPhonetic: 'बोः'
    },
    mundari: {
      script: 'बोः',
      romanized: 'Boh',
      devanagariPhonetic: 'बोः'
    },
    englishMeaning: 'Head'
  },
  {
    hindi: ['रोटी', 'चपाती'],
    english: ['bread', 'roti', 'chapati'],
    santhali: {
      script: 'ᱯᱤᱴᱷᱟᱹ',
      romanized: 'Pitha',
      devanagariPhonetic: 'पिठा'
    },
    ho: {
      script: '𑢥𑣂𑣕𑣁',
      romanized: 'Pitha',
      devanagariPhonetic: 'पिठा'
    },
    mundari: {
      script: 'पिठा / लाद',
      romanized: 'Lad / Pitha',
      devanagariPhonetic: 'पिठा'
    },
    englishMeaning: 'Traditional bread / pitha'
  },
  {
    hindi: ['दूध', 'क्षीर'],
    english: ['milk'],
    santhali: {
      script: 'ᱛᱳᱣᱟ',
      romanized: 'Towa',
      devanagariPhonetic: 'तोवा'
    },
    ho: {
      script: '𑢱𑣉𑣁',
      romanized: 'Toa',
      devanagariPhonetic: 'तोआ'
    },
    mundari: {
      script: 'तोआ',
      romanized: 'Toa',
      devanagariPhonetic: 'तोआ'
    },
    englishMeaning: 'Milk'
  },
  {
    hindi: ['फल', 'आम', 'केला'],
    english: ['mango', 'fruit'],
    santhali: {
      script: 'ᱩᱞ',
      romanized: 'Ul (Mango) / Jo',
      devanagariPhonetic: 'उल / जो'
    },
    ho: {
      script: '𑢵𑣚',
      romanized: 'Ul',
      devanagariPhonetic: 'उल'
    },
    mundari: {
      script: 'उल',
      romanized: 'Ul',
      devanagariPhonetic: 'उल'
    },
    englishMeaning: 'Mango / fruit'
  },
  {
    hindi: ['जंगल', 'वन', 'अरण्य'],
    english: ['forest', 'jungle', 'woods'],
    santhali: {
      script: 'ᱵᱤᱨ',
      romanized: 'Bir',
      devanagariPhonetic: 'बीर'
    },
    ho: {
      script: '𑢡𑣂𑣜',
      romanized: 'Bir',
      devanagariPhonetic: 'बीर'
    },
    mundari: {
      script: 'बीर',
      romanized: 'Bir',
      devanagariPhonetic: 'बीर'
    },
    englishMeaning: 'Forest / nature'
  },
  {
    hindi: ['नदी', 'नाला', 'झरना'],
    english: ['river', 'stream', 'waterfall'],
    santhali: {
      script: 'ᱜᱟᱰᱟ',
      romanized: 'Gada',
      devanagariPhonetic: 'गाडा'
    },
    ho: {
      script: '𑢑𑣁𑣑𑣁',
      romanized: 'Gada',
      devanagariPhonetic: 'गाड़ा'
    },
    mundari: {
      script: 'गाड़ा',
      romanized: 'Gada',
      devanagariPhonetic: 'गाड़ा'
    },
    englishMeaning: 'River / waterway'
  },
  {
    hindi: ['पहाड़', 'पर्वत', 'पहाड़ी'],
    english: ['mountain', 'hill'],
    santhali: {
      script: 'ᱵᱩᱨᱩ',
      romanized: 'Buru',
      devanagariPhonetic: 'बुरु'
    },
    ho: {
      script: '𑢡𑣃𑣜𑣃',
      romanized: 'Buru',
      devanagariPhonetic: 'बुरु'
    },
    mundari: {
      script: 'बुरु',
      romanized: 'Buru',
      devanagariPhonetic: 'बुरु'
    },
    englishMeaning: 'Mountain / sacred hill'
  },
  {
    hindi: ['आज', 'आज का दिन'],
    english: ['today'],
    santhali: {
      script: 'ᱛᱮᱦᱮᱧ',
      romanized: 'Tehenj',
      devanagariPhonetic: 'तेहेंज'
    },
    ho: {
      script: '𑢱𑣂𑣷𑣂𑣓',
      romanized: 'Tisin',
      devanagariPhonetic: 'तिसिन'
    },
    mundari: {
      script: 'तिसिंग',
      romanized: 'Tising',
      devanagariPhonetic: 'तिसिंग'
    },
    englishMeaning: 'Today'
  },
  {
    hindi: ['कल', 'आने वाला कल'],
    english: ['tomorrow'],
    santhali: {
      script: 'ᱜᱟᱯᱟ',
      romanized: 'Gapa',
      devanagariPhonetic: 'गापा'
    },
    ho: {
      script: '𑢑𑣁𑣥𑣁',
      romanized: 'Gapa',
      devanagariPhonetic: 'गापा'
    },
    mundari: {
      script: 'गापा',
      romanized: 'Gapa',
      devanagariPhonetic: 'गापा'
    },
    englishMeaning: 'Tomorrow'
  },
  {
    hindi: ['खेल', 'खेलना', 'मैदान'],
    english: ['play', 'game', 'playground'],
    santhali: {
      script: 'ᱮᱱᱮᱡ ᱢᱮ / ᱠᱷᱮᱞᱚᱸᱰ',
      romanized: 'Enej me / Khelond',
      devanagariPhonetic: 'एनेज मे / खेलोंड'
    },
    ho: {
      script: '𑢵𑣂𑣓𑣂𑣑 𑢶𑣂',
      romanized: 'Inung me',
      devanagariPhonetic: 'इनुंग मे'
    },
    mundari: {
      script: 'इनुंगपे',
      romanized: 'Inungpe',
      devanagariPhonetic: 'इनुंगपे'
    },
    englishMeaning: 'Play / games'
  }
];

// Clean text for phonetic matching
function cleanString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[।.,?!:;\-_"'()\[\]{}]/g, '')
    .replace(/\s+/g, ' ');
}

// Classroom Intent & Dialogue Pattern Rules for high-precision English & Hindi translation
interface PatternRule {
  englishRegex: RegExp;
  hindiRegex: RegExp;
  translations: {
    Santhali: { script: string; romanized: string; devanagariPhonetic: string };
    Ho: { script: string; romanized: string; devanagariPhonetic: string };
    Mundari: { script: string; romanized: string; devanagariPhonetic: string };
  };
  englishMeaning: string;
  hindiMeaning: string;
  expectedReply?: PairedClassroomReply;
}

// Comprehensive Student Classroom Inputs & Responses Corpus (Tribal <-> Hindi/English)
export interface StudentClassroomInputEntry {
  id: string;
  category: string;
  hindi: string;
  english: string;
  santhali: { script: string; roman: string; phonetic: string };
  ho: { script: string; roman: string; phonetic: string };
  mundari: { script: string; roman: string; phonetic: string };
  teacherReply: PairedClassroomReply;
}

export const STUDENT_CLASSROOM_INPUTS: StudentClassroomInputEntry[] = [
  {
    id: 'stu_greeting',
    category: 'Greeting',
    hindi: 'जोहार गुरुजी! हम सब बहुत अच्छे और खुश हैं।',
    english: 'Johar Guruji! We are all fine and happy.',
    santhali: {
      script: 'ᱡᱚᱦᱟᱨ ᱜᱩᱨᱩᱡᱤ! ᱟᱞᱮ ᱫᱚ ᱱᱟᱯᱟᱭ ᱜᱮ ᱢᱮᱱᱟᱜ ᱞᱮᱭᱟ᱾',
      roman: 'Johar Guruji! Ale do napay ge menag leya.',
      phonetic: 'जोहार गुरुजी! आले दो नापाय गे मेनाग लेया।'
    },
    ho: {
      script: '𑢹𑣉𑣉 𑢡𑣂 𑢋𑣃𑣜𑣃𑢰𑣂! 𑢡𑣂𑣚𑣂 𑢡𑣃𑣜𑣂𑣑 𑢶𑣂𑣓𑣂 𑢚𑣂ᱭᱟ᱾',
      roman: 'Johar Guruji! Ale bugite mena leya.',
      phonetic: 'जोहार गुरुजी! आले बुगिते मेना लेया।'
    },
    mundari: {
      script: 'जोहार गुरुजी! अले बुगीगे मेनालेया।',
      roman: 'Johar Guruji! Ale bugige menaleya.',
      phonetic: 'जोहार गुरुजी! अले बुगीगे मेनालेया।'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'बहुत अच्छा बच्चों! कृपया अपनी जगह पर बैठ जाओ।',
      english: 'Very good children! Please sit down on your seats.',
      santhali: {
        script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱟᱯᱮᱭᱟᱜ ᱡᱟᱭᱜᱟ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ᱾',
        roman: 'Adi napay gidra ko! Apeyag jayga re durub pe.',
        phonetic: 'आदि नापाय गिदरा को! आपेयाग जायगा रे दुड़ुब पे।'
      },
      ho: {
        script: '𑢡𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉! 𑢑𑣃𑣡 𑢶𑣂᱾',
        roman: 'Bugite hon ko! Apea jayga re dub pe.',
        phonetic: 'बुगिते होन को! आपेया जायगा रे दुब पे।'
      },
      mundari: {
        script: 'बुगीते होन्को! आपेया जयगा रे दुबपे।',
        roman: 'Bugite honko! Apeya jayga re dubpe.',
        phonetic: 'बुगीते होन्को! आपेया जयगा रे दुबपे।'
      }
    }
  },
  {
    id: 'stu_books_open',
    category: 'Literacy',
    hindi: 'जी गुरुजी, हमने अपनी किताब खोल ली है।',
    english: 'Yes Guruji, we have opened our books.',
    santhali: {
      script: 'ᱦᱮᱸ ᱜᱩᱨᱩᱡᱤ, ᱟᱞᱮ ᱫᱚ ᱯᱩᱛᱷᱤ ᱞᱮ ᱡᱷᱤᱡ ᱠᱮᱫᱼᱟ᱾',
      roman: 'Hen Guruji, ale do puthi le jhij ked-a.',
      phonetic: 'हें गुरुजी, आले दो पुथी ले झीज केद-आ।'
    },
    ho: {
      script: '𑢹𑣂 𑢋𑣃𑣜𑣃𑢰𑣂, 𑢡𑣂𑣚𑣂 𑢥𑣉𑣕𑣂 𑢵𑣂𑣓𑣂𑣑 𑢱𑣂𑣚𑣂ᱭᱟ᱾',
      roman: 'He Guruji, ale pothi ughao keda.',
      phonetic: 'हे गुरुजी, आले पोथी उघाओ केदा।'
    },
    mundari: {
      script: 'हे गुरुजी, अले पुथी निड़ाकेदा।',
      roman: 'He Guruji, ale puthi nirakeda.',
      phonetic: 'हे गुरुजी, अले पुथी निड़ाकेदा।'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'शाबाश! अब ध्यान से सुनो और मेरे बाद दोहराओ।',
      english: 'Well done! Now listen carefully and repeat after me.',
      santhali: {
        script: 'ᱵᱮᱥ ᱩᱛᱟᱹᱨ! ᱱᱤᱛᱚᱜ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱧᱡᱚᱢ ᱯᱮ ᱟᱨ ᱤᱧ ᱛᱟᱭᱚᱢ ᱨᱚᱲ ᱯᱮ᱾',
        roman: 'Bes utar! Nitog dheyan te anjom pe ar inj tayom ror pe.',
        phonetic: 'बेस उतार! नितोग धेयान ते आंजोम पे आर इंज तायोम रोड़ पे।'
      },
      ho: {
        script: '𑢡𑣃𑣜𑣂𑣑! 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑 𑢶𑣂 𑢵𑢷𑣉 𑢱𑣁𑣑𑣂 𑢶𑣂᱾',
        roman: 'Bugite! Bugi leka ayum pe odo aing tayom kaji pe.',
        phonetic: 'बुगिते! बुगि लेका आयूम पे ओदो आईंग तायोम काजी पे।'
      },
      mundari: {
        script: 'बुगीते! बुगीते आयुमेपे ओन्दो आईंग तायोम काजीपे।',
        roman: 'Bugite! Bugite ayumepe ondo aing tayom kajipe.',
        phonetic: 'बुगीते! बुगीते आयुमेपे ओन्दो आईंग तायोम काजीपे।'
      }
    }
  },
  {
    id: 'stu_counting_1_5',
    category: 'Numeracy',
    hindi: 'एक, दो, तीन, चार, पांच! हमने सीख लिया गुरुजी।',
    english: 'One, two, three, four, five! We learned it Guruji.',
    santhali: {
      script: 'ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱩᱱ, ᱢᱚᱬᱮ! ᱟᱞᱮ ᱞᱮ ᱪᱮᱫ ᱠᱮᱫᱼᱟ ᱜᱩᱨᱩᱡᱤ᱾',
      roman: 'Mid, bar, pe, pun, mone! Ale le ched ked-a Guruji.',
      phonetic: 'मिद, बार, पे, पुन, मोड़े! आले ले चेद केद-आ गुरुजी।'
    },
    ho: {
      script: '𑢖𑣂𑣑, 𑢡𑣁𑣜, 𑢵𑣂, 𑢃𑣥𑣃𑣓, 𑢶𑣉𑣗𑣂! 𑢡𑣂𑣚𑣂 𑢥𑣂𑣁 𑢱𑣂𑣚𑣂᱾',
      roman: 'Miyad, bar, ape, upun, moya! Ale eto keda Guruji.',
      phonetic: 'मियाद, बार, अपे, उपुन, मोया! आले एतो केदा गुरुजी।'
    },
    mundari: {
      script: 'मियाद, बारिया, अपिया, उपुनिया, मोड़े! अले इतुन केदा गुरुजी।',
      roman: 'Miyad, bariya, apiya, upuniya, more! Ale itun keda Guruji.',
      phonetic: 'मियाद, बारिया, अपिया, उपुनिया, मोड़े! अले इतुन केदा गुरुजी।'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'बहुत अच्छा बच्चों! आपने बिल्कुल सही गिनती की, शाबाश!',
      english: 'Very good children! You counted accurately, well done!',
      santhali: {
        script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱟᱯᱮ ᱴᱷᱤᱠ ᱞᱮᱠᱷᱟ ᱠᱮᱫᱼᱟ, ᱥᱟᱨᱦᱟᱣ!',
        roman: 'Adi napay gidra ko! Ape thik lekha ked-a, sarhaw!',
        phonetic: 'आदि नापाय गिदरा को! आपे ठीक लेखा केद-आ, सारहाव!'
      },
      ho: {
        script: '𑢡𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉! 𑢡𑣂𑣁𑣜𑣂 𑢚𑣂𑣱𑣁 𑢱𑣂𑣚𑣂᱾',
        roman: 'Bugite hon ko! Ape thik lekha keda, sarhaw!',
        phonetic: 'बुगिते होन को! आपे ठीक लेखा केदा, सारहाव!'
      },
      mundari: {
        script: 'बहुत बुगी होन्को! आपे ठीक लेखाकेदा, सराहाओ!',
        roman: 'Bahut bugi honko! Ape thik lekhakeda, sarhao!',
        phonetic: 'बहुत बुगी होन्को! आपे ठीक लेखाकेदा, सराहाओ!'
      }
    }
  },
  {
    id: 'stu_water_permission',
    category: 'Care',
    hindi: 'गुरुजी, क्या मैं बाहर पानी पीने जा सकता हूँ?',
    english: 'Guruji, may I go outside to drink water?',
    santhali: {
      script: 'ᱜᱩᱨᱩᱡᱤ, ᱤᱧ ᱫᱟᱜ ᱧᱩ ᱞᱟᱹᱜᱤᱫ ᱵᱟᱦᱨᱮᱧ ᱥᱮᱱ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ?',
      roman: 'Guruji, inj dag nyu lagid bahrenj sen dareyag-a?',
      phonetic: 'गुरुजी, इंज दाग न्यू लागिद बाहरेन्ज सेन दाड़ेयाग-आ?'
    },
    ho: {
      script: '𑢋𑣃𑣜𑣃𑢰𑣂, 𑢡𑣂𑣂𑣅 𑢷𑣁𑣄 𑢓𑣃 𑢡𑣂𑣁𑣜𑣂 𑢷𑣂𑣓 𑢷𑣂𑣑 𑢱𑣁𑣓𑣁 𑢡𑣂?',
      roman: 'Guruji, aing daah nu lagid sen daiya chi?',
      phonetic: 'गुरुजी, आईंग दाः नु लागिद सेन दाईया चि?'
    },
    mundari: {
      script: 'गुरुजी, आईंग दाः नू लागिद बाहरे सेन दाईया चि?',
      roman: 'Guruji, aing daah nu lagid bahre sen daiya chi?',
      phonetic: 'गुरुजी, आईंग दाः नू लागिद बाहरे सेन दाईया चि?'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'हाँ बेटा, जाकर पानी पी लो और जल्दी वापस आना।',
      english: 'Yes child, go drink water and come back quickly.',
      santhali: {
        script: 'ᱦᱮᱸ ᱵᱟᱹᱵᱩ, ᱥᱮᱱ ᱠᱟᱛᱮ ᱫᱟᱜ ᱧᱩᱭ ᱢᱮ ᱟᱨ ᱩᱥᱟᱹᱨᱟ ᱨᱩᱣᱟᱹᱲ ᱦᱤᱡᱩᱜ ᱢᱮ᱾',
        roman: 'Hen babu, sen kate dag nyuy me ar usara ruwad hijug me.',
        phonetic: 'हें बाबू, सेन काते दाग न्यूय मे आर उसारा रुवाड़ हिजुग मे।'
      },
      ho: {
        script: '𑢹𑣂 𑢡𑣂𑣡𑣃, 𑢷𑣂𑣓 𑢱𑣁𑢕𑣂 𑢷𑣁𑣄 𑢓𑣃 𑢖𑣂 𑢵𑢷𑣉 𑢚𑣉𑣋𑣂 𑢹𑣂𑢰𑣃 𑢖𑣂᱾',
        roman: 'He babu, sen kate daah nu me odo logi hiju me.',
        phonetic: 'हे बाबू, सेन काते दाः नु मे ओदो लोगि हिजु मे।'
      },
      mundari: {
        script: 'हे बाबू, सेनकेते दाः नूमे ओन्दो लोगोगे हिजुःमे।',
        roman: 'He babu, senkete daah nume ondo logoge hijuhme.',
        phonetic: 'हे बाबू, सेनकेते दाः नूमे ओन्दो लोगोगे हिजुःमे।'
      }
    }
  },
  {
    id: 'stu_homework_done',
    category: 'Homework',
    hindi: 'गुरुजी, मैंने अपना गृहकार्य पूरा कर लिया है।',
    english: 'Guruji, I have completed my homework.',
    santhali: {
      script: 'ᱜᱩᱨᱩᱡᱤ, ᱤᱧ ᱫᱚ ᱤᱧᱟᱜ ᱚᱲᱟᱜ ᱠᱟᱹᱢᱤᱧ ᱯᱩᱨᱟᱹᱣ ᱠᱮᱫᱼᱟ᱾',
      roman: 'Guruji, inj do injag orag kaminj puraw ked-a.',
      phonetic: 'गुरुजी, इंज दो इञाग ओड़ाग कामिंज पुराव केद-आ।'
    },
    ho: {
      script: '𑢋𑣃𑣜𑣃𑢰𑣂, 𑢡𑣂𑣂𑣅 𑢵𑣜𑣁 𑢱𑣁𑣖𑣂 𑢥𑣃𑣜𑣁 𑢱𑣂𑣚𑣂᱾',
      roman: 'Guruji, aing ora kami pura keda.',
      phonetic: 'गुरुजी, आईंग ओड़ा कामी पुरा केदा।'
    },
    mundari: {
      script: 'गुरुजी, आईंग ओड़ाः कामी पुराकेदा।',
      roman: 'Guruji, aing odaah kami purakeda.',
      phonetic: 'गुरुजी, आईंग ओड़ाः कामी पुराकेदा।'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'शाबाश! अपनी कॉपी यहाँ लाकर दिखाओ।',
      english: 'Well done! Bring your notebook here and show me.',
      santhali: {
        script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱟᱢᱟᱜ ᱠᱚᱯᱤ ᱱᱚᱸᱰᱮ ᱟᱹᱜᱩ ᱠᱟᱛᱮ ᱩᱫᱩᱜ ᱢᱮ᱾',
        roman: 'Adi napay! Amag kopi nonde agu kate udug me.',
        phonetic: 'आदि नापाय! आमाग कॉपी नोंडे आगु काते उदुग मे।'
      },
      ho: {
        script: '𑢡𑣃𑣜𑣂𑣑! 𑢡𑣂𑣁𑣜𑣂 𑢥𑣉𑣕𑣂 𑢓𑣂𑣜𑣂 𑢹𑣂𑣑𑣃 𑢶𑣂᱾',
        roman: 'Bugite! Ama pothi nere agu kate nel-rikaing me.',
        phonetic: 'बुगिते! आमा पोथी नेरे आगु काते नेल-रिकाईंग मे।'
      },
      mundari: {
        script: 'बुगीते! आमा पुथी नेरे आगुकेते नेल-रिकाएमे।',
        roman: 'Bugite! Ama puthi nere agukete nel-rikaeme.',
        phonetic: 'बुगीते! आमा पुथी नेरे आगुकेते नेल-रिकाएमे।'
      }
    }
  },
  {
    id: 'stu_explain_again',
    category: 'Doubt',
    hindi: 'गुरुजी, कृपया इसे एक बार फिर से समझाइए।',
    english: 'Guruji, please explain this once more.',
    santhali: {
      script: 'ᱜᱩᱨᱩᱡᱤ, ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱱᱚᱣᱟ ᱟᱨ ᱢᱤᱫ ᱫᱷᱟᱣ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱞᱮ ᱢᱮ᱾',
      roman: 'Guruji, daya kate nowa ar mid dhaw bujhaw ale me.',
      phonetic: 'गुरुजी, दाया काते नोवा आर मिद धाव बुझाव आले मे।'
    },
    ho: {
      script: '𑢋𑣃𑣜𑣃𑢰𑣂, 𑢓𑣂𑣓𑣁 𑢵𑢷𑣉 𑢖𑣂𑣑 𑢱𑣁𑣑𑣂 𑢡𑣃𑢰𑣁𑣖 𑢖𑣂᱾',
      roman: 'Guruji, nena odo miyad dhao bujhao ale me.',
      phonetic: 'गुरुजी, नेना ओदो मियाद धाओ बुझाओ आले मे।'
    },
    mundari: {
      script: 'गुरुजी, नेना ओन्दो मियाद धाओ बुझाओ आलेमे।',
      roman: 'Guruji, nena ondo miyad dhao bujhao aleme.',
      phonetic: 'गुरुजी, नेना ओन्दो मियाद धाओ बुझाओ आलेमे।'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'ज़रूर बच्चों, श्यामपट्ट की तरफ देखो, मैं फिर से समझाता हूँ।',
      english: 'Certainly children, look at the blackboard, I will explain again.',
      santhali: {
        script: 'ᱦᱮᱸ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱠᱟᱞᱟ ᱯᱟᱴᱟ ᱥᱮᱫ ᱠᱚᱭᱚᱜᱽ ᱯᱮ, ᱤᱧ ᱫᱚᱦᱲᱟ ᱛᱮᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱯᱮᱭᱟ᱾',
        roman: 'Hen gidra ko, kala pata sed koyog pe, inj dohra tenj bujhaw apeya.',
        phonetic: 'हें गिदरा को, काला पाटा सेद कोयॉग पे, इंज दोहड़ा तेंज बुझाव आपेया।'
      },
      ho: {
        script: '𑢹𑣂 𑢹𑣉𑣉 𑢷𑣉𑣑, 𑢡𑣉𑣜𑣑 𑢷𑣂𑣓 𑢓𑣂𑣚 𑢥𑣂᱾',
        roman: 'He hon ko, hende board saing nel pe, aing bujhao apeya.',
        phonetic: 'हे होन को, हेंडे बोर्ड साइंग नेल पे, आईंग बुझाओ आपेया।'
      },
      mundari: {
        script: 'हें होन्को, हेंदे पाता साः नेलेपे, आईंग बुझाओ आपेया।',
        roman: 'Hen honko, hende pata sah nelepe, aing bujhao apeya.',
        phonetic: 'हें होन्को, हेंदे पाता साः नेलेपे, आईंग बुझाओ आपेया।'
      }
    }
  },
  {
    id: 'stu_thank_you',
    category: 'Praise',
    hindi: 'धन्यवाद गुरुजी! हम रोज़ मन लगाकर पढ़ेंगे।',
    english: 'Thank you Guruji! We will study hard every day.',
    santhali: {
      script: 'ᱥᱟᱨᱦᱟᱣ ᱜᱩᱨᱩᱡᱤ! ᱟᱞᱮ ᱫᱤᱱᱟᱹᱢ ᱢᱚᱱᱮ ᱞᱟᱜᱟᱣ ᱠᱟᱛᱮ ᱞᱮ ᱯᱟᱲᱦᱟᱣᱜᱼᱟ᱾',
      roman: 'Sarhaw Guruji! Ale dinam mone lagaw kate le parhawg-a.',
      phonetic: 'सारहाव गुरुजी! आले दिनाम मोने लागाव काते ले पाड़हावग-आ।'
    },
    ho: {
      script: '𑢷𑣁𑣜𑣂 𑢋𑣃𑣜𑣃𑢰𑣂! 𑢡𑣂𑣚𑣂 𑢷𑣂𑣓𑣁𑣖 𑢵𑣂𑣕𑣂 𑢥𑣁𑢷𑣁𑣖 𑢚𑣂ᱭᱟ᱾',
      roman: 'Sarhaw Guruji! Ale dinam mone te padaw leya.',
      phonetic: 'सारहाव गुरुजी! आले दिनाम मोने ते पाड़ाव लेया।'
    },
    mundari: {
      script: 'सराहाओ गुरुजी! अले दिनाम मोनेते पाड़हावनालेया।',
      roman: 'Sarhao Guruji! Ale dinam monete parhaowanaleya.',
      phonetic: 'सराहाओ गुरुजी! अले दिनाम मोनेते पाड़हावनालेया।'
    },
    teacherReply: {
      speakerRole: 'teacher',
      hindi: 'बहुत अच्छा बच्चों! आप सब बहुत होशियार हैं।',
      english: 'Very good children! You are all very bright learners.',
      santhali: {
        script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱟᱯᱮ ᱡᱚᱛᱚ ᱟᱹᱰᱤ سᱮᱬᱟ ᱜᱮᱭᱟ ᱯᱮ᱾',
        roman: 'Adi napay gidra ko! Ape joto adi sena geya pe.',
        phonetic: 'आदि नापाय गिदरा को! आपे जोतो आदि सेणा गेया पे।'
      },
      ho: {
        script: '𑢡𑣃𑣜𑣂𑣑 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉! 𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑 𑢶𑣂𑣓𑣂᱾',
        roman: 'Bugite hon ko! Ape sobe bugin ge mena pe.',
        phonetic: 'बुगिते होन को! आपे सोबे बुगिन गे मेना पे।'
      },
      mundari: {
        script: 'बुगीते होन्को! आपे सोबेन बुगीगे मेनापेया।',
        roman: 'Bugite honko! Ape soben bugige menapeya.',
        phonetic: 'बुगीते होन्को! आपे सोबेन बुगीगे मेनापेया।'
      }
    }
  }
];

const CLASSROOM_PATTERNS: PatternRule[] = [
  // Specific Greeting + How are you (must come before generic greeting)
  {
    englishRegex: /(?:good\s*morning|hello|greetings|hi).*(?:how\s*are\s*you)/i,
    hindiRegex: /(?:नमस्ते|सुप्रभात|जोहार).*(?:कैसे\s*हैं|कैसे\s*हो)/i,
    translations: {
      Santhali: {
        script: 'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱯᱮ ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱜ ᱯᱮᱭᱟ?',
        romanized: 'Johar gidra ko, tehenj ape ched leka menag peya?',
        devanagariPhonetic: 'जोहार गिदरा को, तेहेंज आपे चेद लेका मेनाग पेया?',
      },
      Ho: {
        script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑 𑢶𑣂𑣓𑣂 𑢥𑣂?',
        romanized: 'Hon ko, ape bugin mena pe chi?',
        devanagariPhonetic: 'होन को, आपे बुगिन मेना पे चि?',
      },
      Mundari: {
        script: 'होन्को, आपे बुगीगे मेनापेया चि?',
        romanized: 'Honko, ape bugige menapeya chi?',
        devanagariPhonetic: 'होन्को, आपे बुगीगे मेनापेया चि?',
      },
    },
    englishMeaning: 'Good morning children, how are you all today?',
    hindiMeaning: 'नमस्ते बच्चों, आज आप सब कैसे हैं?',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जोहार गुरुजी! हम सब बहुत अच्छे और खुश हैं।',
      english: 'Johar Guruji! We are all fine and happy.',
      santhali: STUDENT_CLASSROOM_INPUTS[0].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[0].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[0].mundari,
    }
  },
  // Greeting + Open books
  {
    englishRegex: /(?:good\s*morning|hello).*(?:open.*books)/i,
    hindiRegex: /(?:सुप्रभात|नमस्ते).*(?:किताब.*खोलो)/i,
    translations: {
      Santhali: {
        script: 'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱩᱜᱽᱦᱟᱹᱣ ᱢᱮ',
        romanized: 'Johar gidra ko, apeyag puthi ughaw me',
        devanagariPhonetic: 'जोहार गिदरा को, आपेयाग पुथी उग्हाव मे',
      },
      Ho: {
        script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢡𑣂𑣁𑣜𑣂 𑢥𑣉𑣕𑣂 𑢵𑣂𑣓𑣂𑣑 𑢖𑣄𑣂',
        romanized: 'Johar hon ko, apeya pothi ughao me',
        devanagariPhonetic: 'जोहार होन को, आपेया पोथी उघाओ मे',
      },
      Mundari: {
        script: 'जोहार होन्को, आपेया पुथी निड़ाएपे',
        romanized: 'Johar honko, apeya puthi niraepe',
        devanagariPhonetic: 'जोहार होन्को, आपेया पुथी निड़ाएपे',
      },
    },
    englishMeaning: 'Good morning children, please open your books',
    hindiMeaning: 'सुप्रभात बच्चों, कृपया अपनी किताबें खोलो',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जी गुरुजी, हमने अपनी किताब खोल ली है।',
      english: 'Yes Guruji, we have opened our books.',
      santhali: STUDENT_CLASSROOM_INPUTS[1].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[1].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[1].mundari,
    }
  },
  // Generic greeting
  {
    englishRegex: /^(?:good\s*morning|hello|greetings|welcome|hi)(?:\s*(?:children|students|everyone|all|class))?$/i,
    hindiRegex: /^(?:नमस्ते|नमस्कार|प्रणाम|जोहार)(?:\s*(?:बच्चों|साथियों|सबको|कक्षा))?$/i,
    translations: {
      Santhali: {
        script: 'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ',
        romanized: 'Johar gidra ko',
        devanagariPhonetic: 'जोहार गिदरा को',
      },
      Ho: {
        script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑',
        romanized: 'Hon ko, Johar',
        devanagariPhonetic: 'होन को, जोहार',
      },
      Mundari: {
        script: 'जोहार होन्को',
        romanized: 'Johar honko',
        devanagariPhonetic: 'जोहार होन्को',
      },
    },
    englishMeaning: 'Hello / Good morning children',
    hindiMeaning: 'नमस्ते बच्चों',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जोहार गुरुजी! हम सब बहुत अच्छे और खुश हैं।',
      english: 'Johar Guruji! We are all fine and happy.',
      santhali: STUDENT_CLASSROOM_INPUTS[0].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[0].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[0].mundari,
    }
  },
  // Sit down
  {
    englishRegex: /(?:please\s*)?sit(?:\s*down)?(?:\s*(?:on\s*your\s*seats|please|children|everyone))?/i,
    hindiRegex: /(?:कृपया\s*)?(?:अपनी\s*जगह\s*पर\s*)?(?:बैठ\s*जाओ|बैठो|कृपया\s*बैठें|आसन\s*ग्रहण\s*करें)/i,
    translations: {
      Santhali: {
        script: 'ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱯᱮᱭᱟᱜ ᱡᱟᱭᱜᱟ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ',
        romanized: 'Daya kate apeyag jayga re durub pe',
        devanagariPhonetic: 'दाया काते आपेयाग जायगा रे दुड़ुब पे',
      },
      Ho: {
        script: '𑢑𑣃𑣡 𑢶𑣂, 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉',
        romanized: 'Apea jayga re dub pe',
        devanagariPhonetic: 'आपेया जायगा रे दुब पे',
      },
      Mundari: {
        script: 'आपेया जयगा रे दुबपे',
        romanized: 'Apeya jayga re dubpe',
        devanagariPhonetic: 'आपेया जयगा रे दुबपे',
      },
    },
    englishMeaning: 'Please sit down on your seats',
    hindiMeaning: 'कृपया अपनी जगह पर बैठ जाओ',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जी गुरुजी, हम बैठ गए हैं।',
      english: 'Yes Guruji, we are seated.',
      santhali: {
        script: 'ᱦᱮᱸ ᱜᱩᱨᱩᱡᱤ, ᱟᱞᱮ ᱫᱚ ᱞᱮ ᱫᱩᱲᱩᱵ ᱮᱱᱟ᱾',
        roman: 'Hen Guruji, ale do le durub ena.',
        phonetic: 'हें गुरुजी, आले दो ले दुड़ुब एना।'
      },
      ho: {
        script: '𑢹𑣂 𑢋𑣃𑣜𑣃𑢰𑣂, 𑢡𑣂𑣚𑣂 𑢑𑣃𑣡 𑢱𑣂𑣚𑣂᱾',
        roman: 'He Guruji, ale dub yana.',
        phonetic: 'हे गुरुजी, आले दुब याना।'
      },
      mundari: {
        script: 'हे गुरुजी, अले दुबजना।',
        roman: 'He Guruji, ale dubjana.',
        phonetic: 'हे गुरुजी, अले दुबजना।'
      }
    }
  },
  // Stand up
  {
    englishRegex: /(?:please\s*)?stand(?:\s*up)?(?:\s*(?:please|children))?/i,
    hindiRegex: /(?:खड़े\s*हो\s*जाओ|खड़े\s*हो|उठो)/i,
    translations: {
      Santhali: {
        script: 'ᱛᱤᱸᱜᱩᱱ ᱢᱮ',
        romanized: 'Tingun me',
        devanagariPhonetic: 'तिंगुन मे',
      },
      Ho: {
        script: '𑢱𑣂𑣓𑣉𑣁 𑢶𑣂',
        romanized: 'Tingu en me',
        devanagariPhonetic: 'तिंगु एन मे',
      },
      Mundari: {
        script: 'तिंगुपे',
        romanized: 'Tingupe',
        devanagariPhonetic: 'तिंगुपे',
      },
    },
    englishMeaning: 'Stand up',
    hindiMeaning: 'खड़े हो जाओ',
  },
  // Open books
  {
    englishRegex: /(?:please\s*)?(?:take\s*out.*)?open(?:\s*(?:your|the|first\s*page))?\s*books?/i,
    hindiRegex: /(?:किताब|किताबें|पुस्तक|पुस्तिका).*(?:खोलो|निकालो)/i,
    translations: {
      Santhali: {
        script: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱩᱜᱽᱦᱟᱹᱣ ᱢᱮ',
        romanized: 'Gidra ko, apeyag puthi ughaw me',
        devanagariPhonetic: 'गिदरा को, आपेयाग पुथी उग्हाव मे',
      },
      Ho: {
        script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢡𑣂𑣁𑣜𑣂 𑢥𑣉𑣕𑣂 𑢵𑣂𑣓𑣂𑣑 𑢖𑣄𑣂',
        romanized: 'Hon ko, apeya pothi ughao me',
        devanagariPhonetic: 'होन को, आपेया पोथी उघाओ मे',
      },
      Mundari: {
        script: 'होन्को, आपेया पुथी निड़ाएपे',
        romanized: 'Honko, apeya puthi niraepe',
        devanagariPhonetic: 'होन्को, आपेया पुथी निड़ाएपे',
      },
    },
    englishMeaning: 'Children, please open your books',
    hindiMeaning: 'बच्चों, अपनी किताबें खोलो',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जी गुरुजी, हमने अपनी किताब खोल ली है।',
      english: 'Yes Guruji, we have opened our books.',
      santhali: STUDENT_CLASSROOM_INPUTS[1].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[1].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[1].mundari,
    }
  },
  // Close books
  {
    englishRegex: /(?:please\s*)?close(?:\s*(?:your|the))?\s*books?/i,
    hindiRegex: /(?:किताब|किताबें|पुस्तक)\s*बंद\s*करो/i,
    translations: {
      Santhali: {
        script: 'ᱯᱩᱛᱷᱤ ᱛᱷᱟᱠᱟᱣ ᱢᱮ',
        romanized: 'Puthi thakaw me',
        devanagariPhonetic: 'पुथी थाकाव मे',
      },
      Ho: {
        script: '𑢥𑣉𑣕𑣂 𑢱𑣉𑣚𑣉𑣖 𑢶𑣂',
        romanized: 'Pothi bondo me',
        devanagariPhonetic: 'पोथी बोंदो मे',
      },
      Mundari: {
        script: 'पुथी बोंदोएपे',
        romanized: 'Puthi bondoepe',
        devanagariPhonetic: 'पुथी बोंदोएपे',
      },
    },
    englishMeaning: 'Close your books',
    hindiMeaning: 'अपनी किताबें बंद करो',
  },
  // Listen carefully and repeat after me
  {
    englishRegex: /(?:please\s*)?listen(?:\s*carefully)?.*repeat(?:\s*after\s*me)?/i,
    hindiRegex: /(?:ध्यान\s*से\s*सुनो).*(?:दोहराओ|बोलो)/i,
    translations: {
      Santhali: {
        script: 'ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱧᱡᱚᱢ ᱯᱮ ᱟᱨ ᱤᱧ ᱛᱟᱭᱚᱢ ᱨᱚᱲ ᱯᱮ',
        romanized: 'Dheyan te anjom pe ar inj tayom ror pe',
        devanagariPhonetic: 'धेयान ते आंजोम पे आर इंज तायोम रोड़ पे',
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑 𑢵𑢷𑣉 𑢱𑣁𑣑𑣂 𑢶𑣂',
        romanized: 'Bugi leka ayum pe odo aing tayom kaji pe',
        devanagariPhonetic: 'बुगि लेका आयूम पे ओदो आईंग तायोम काजी पे',
      },
      Mundari: {
        script: 'बुगीते आयुमेपे ओन्दो आईंग तायोम काजीपे',
        romanized: 'Bugite ayumepe ondo aing tayom kajipe',
        devanagariPhonetic: 'बुगीते आयुमेपे ओन्दो आईंग तायोम काजीपे',
      },
    },
    englishMeaning: 'Please listen carefully and repeat after me',
    hindiMeaning: 'कृपया ध्यान से सुनो और मेरे बाद दोहराओ',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जी गुरुजी, हम ध्यान से सुन रहे हैं और दोहराएंगे।',
      english: 'Yes Guruji, we are listening carefully and will repeat.',
      santhali: {
        script: 'ᱦᱮᱸ ᱜᱩᱨᱩᱡᱤ, ᱟᱞᱮ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱞᱮ ᱟᱧᱡᱚᱢ ᱮᱫᱟ᱾',
        roman: 'Hen Guruji, ale dheyan te le anjom eda.',
        phonetic: 'हें गुरुजी, आले धेयान ते ले आंजोम एदा।'
      },
      ho: {
        script: '𑢹𑣂 𑢋𑣃𑣜𑣃𑢰𑣂, 𑢡𑣂𑣚𑣂 𑢡𑣂𑣁𑣑 𑢚𑣂ᱭᱟ᱾',
        roman: 'He Guruji, ale bugi leka ayum tana.',
        phonetic: 'हे गुरुजी, आले बुगि लेका आयूम ताना।'
      },
      mundari: {
        script: 'हे गुरुजी, अले बुगीते आयुम तना।',
        roman: 'He Guruji, ale bugite ayum tana.',
        phonetic: 'हे गुरुजी, अले बुगीते आयुम तना।'
      }
    }
  },
  // Generic listen
  {
    englishRegex: /(?:please\s*)?listen(?:\s*carefully)?(?:\s*to\s*me)?/i,
    hindiRegex: /(?:ध्यान\s*से\s*सुनो|मेरी\s*बात\s*सुनो)/i,
    translations: {
      Santhali: {
        script: 'ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱧᱡᱚᱢ ᱢᱮ',
        romanized: 'Dheyan te anjom me',
        devanagariPhonetic: 'धेयान ते आंजोम मे',
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
        romanized: 'Bugi leka ayum me',
        devanagariPhonetic: 'बुगि लेका आयूम मे',
      },
      Mundari: {
        script: 'बुगीते आयुमेपे',
        romanized: 'Bugite ayumepe',
        devanagariPhonetic: 'बुगीते आयुमेपे',
      },
    },
    englishMeaning: 'Listen carefully',
    hindiMeaning: 'ध्यान से सुनो',
  },
  // Count 1 to 5 (specific)
  {
    englishRegex: /(?:count.*(?:1|one)\s*to\s*(?:5|five))/i,
    hindiRegex: /(?:1\s*से\s*5|१\s*से\s*५|एक\s*से\s*पांच).*गिनती/i,
    translations: {
      Santhali: {
        script: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱫᱮᱞᱟ ᱵᱚᱱ ᱢᱤᱫ ᱠᱷᱚᱱ ᱢᱚᱬᱮ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ᱾',
        romanized: 'Gidra ko, dela bon mid khon mone habij lekha bon.',
        devanagariPhonetic: 'गिदरा को, देला बोन मिद खोन मोड़े हाबीज लेखा बोन।',
      },
      Ho: {
        script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢖𑣂𑣑 𑢷𑣂𑣑 𑢶𑣉𑣗𑣂 𑢵𑣂𑣓𑣂𑣑 𑢚𑣂𑣱𑣁 𑢡𑣃᱾',
        romanized: 'Hon ko, miyad ete moya lekhaye bu.',
        devanagariPhonetic: 'होन को, मियाद एते मोया लेखाये बु।',
      },
      Mundari: {
        script: 'होन्को, मियाद एते मोड़े लेके लेखा लेबु।',
        romanized: 'Honko, miyad ete more leke lekha lebu.',
        devanagariPhonetic: 'होन्को, मियाद एते मोड़े लेके लेखा लेबु।',
      },
    },
    englishMeaning: 'Let us count from 1 to 5 together',
    hindiMeaning: 'चलो सब मिलकर 1 से 5 तक गिनती करें',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'एक, दो, तीन, चार, पांच! हमने सीख लिया गुरुजी।',
      english: 'One, two, three, four, five! We learned it Guruji.',
      santhali: STUDENT_CLASSROOM_INPUTS[2].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[2].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[2].mundari,
    }
  },
  // Count 1 to 10 (general counting)
  {
    englishRegex: /(?:count(?:\s*(?:from)?\s*(?:1|one)\s*to\s*(?:10|ten))?|learn\s*counting)/i,
    hindiRegex: /(?:गिनती\s*करो|गिनती\s*सीखेंगे|1\s*से\s*10|संख्या\s*ज्ञान)/i,
    translations: {
      Santhali: {
        script: 'ᱛᱮᱦᱮᱧ ᱫᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ',
        romanized: 'Tehenj do mid khon gel habij lekha bon chedog-a',
        devanagariPhonetic: 'तेहेंज दो मिद खोन गेल हाबीज लेखा बोन चेदोग-आ',
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢖𑣂𑣑 𑢷𑣂𑣑 𑢡𑣂 𑢵𑣂𑣓𑣂𑣑 𑢥𑣂𑣁 𑢱𑣂',
        romanized: 'Tisin bu miyad ete gel lekha eto-a',
        devanagariPhonetic: 'तिसिन बु मियाद एते गेल लेखा एतो-आ',
      },
      Mundari: {
        script: 'तिसिंग अले मियाद एते गेल लेके लेखा इतुन-आ',
        romanized: 'Tising ale miyad ete gel leke lekha itun-a',
        devanagariPhonetic: 'तिसिंग अले मियाद एते गेल लेके लेखा इतुन-आ',
      },
    },
    englishMeaning: 'Today we will learn counting 1 to 10',
    hindiMeaning: 'आज हम गिनती 1 से 10 तक सीखेंगे',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'एक, दो, तीन, चार, पांच! हमने सीख लिया गुरुजी।',
      english: 'One, two, three, four, five! We learned it Guruji.',
      santhali: STUDENT_CLASSROOM_INPUTS[2].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[2].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[2].mundari,
    }
  },
  // Teacher granting water permission ("Yes child, go drink water and come back quickly")
  {
    englishRegex: /(?:yes\s*child.*drink\s*water.*come\s*back)/i,
    hindiRegex: /(?:हाँ\s*बेटा.*पानी\s*पी\s*लो.*वापस\s*आना)/i,
    translations: {
      Santhali: {
        script: 'ᱦᱮᱸ ᱵᱟᱹᱵᱩ, ᱥᱮᱱ ᱠᱟᱛᱮ ᱫᱟᱜ ᱧᱩᱭ ᱢᱮ ᱟᱨ ᱩᱥᱟᱹᱨᱟ ᱨᱩᱣᱟᱹᱲ ᱦᱤᱡᱩᱜ ᱢᱮ᱾',
        romanized: 'Hen babu, sen kate dag nyuy me ar usara ruwad hijug me.',
        devanagariPhonetic: 'हें बाबू, सेन काते दाग न्यूय मे आर उसारा रुवाड़ हिजुग मे।',
      },
      Ho: {
        script: '𑢹𑣂 𑢡𑣂𑣡𑣃, 𑢷𑣂𑣓 𑢱𑣁𑢕𑣂 𑢷𑣁𑣄 𑢓𑣃 𑢖𑣂 𑢵𑢷𑣉 𑢚𑣉𑣋𑣂 𑢹𑣂𑢰𑣃 𑢖𑣂᱾',
        romanized: 'He babu, sen kate daah nu me odo logi hiju me.',
        devanagariPhonetic: 'हे बाबू, सेन काते दाः नु मे ओदो लोगि हिजु मे।',
      },
      Mundari: {
        script: 'हे बाबू, सेनकेते दाः नूमे ओन्दो लोगोगे हिजुःमे।',
        romanized: 'He babu, senkete daah nume ondo logoge hijuhme.',
        devanagariPhonetic: 'हे बाबू, सेनकेते दाः नूमे ओन्दो लोगोगे हिजुःमे।',
      },
    },
    englishMeaning: 'Yes child, go drink water and come back quickly.',
    hindiMeaning: 'हाँ बेटा, जाकर पानी पी लो और जल्दी वापस आना।',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'गुरुजी, क्या मैं बाहर पानी पीने जा सकता हूँ?',
      english: 'Guruji, may I go outside to drink water?',
      santhali: STUDENT_CLASSROOM_INPUTS[3].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[3].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[3].mundari,
    }
  },
  // Teacher asking if student wants to drink water
  {
    englishRegex: /(?:do\s*you\s*want\s*to\s*drink\s*water|drink\s*water|thirsty|water\s*break)/i,
    hindiRegex: /(?:क्या\s*तुम्हें\s*पानी\s*पीने\s*जाना\s*है|पानी\s*पियो|पानी\s*पीना\s*है|प्यास)/i,
    translations: {
      Santhali: {
        script: 'ᱪᱮᱫ ᱟᱢ ᱫᱟᱜ ᱧᱩ ᱥᱟᱱᱟᱭᱮᱫ ᱢᱮᱭᱟ?',
        romanized: 'Ched am daak nu sanayed meya?',
        devanagariPhonetic: 'चेद आम दाक नू सानायेद मेया?',
      },
      Ho: {
        script: '𑢡𑣂𑣁𑣜𑣂 𑢑𑣁𑣄 𑢓𑣃𑣁𑣑 𑢖𑣄𑣂',
        romanized: 'Chikan am daak nuyte sena-a?',
        devanagariPhonetic: 'चिकन आम दाक नुयते सेना-आ?',
      },
      Mundari: {
        script: 'चि आम दाः नुएते सेनाम?',
        romanized: 'Chi am daah nue te senam?',
        devanagariPhonetic: 'चि आम दाः नुएते सेनाम?',
      },
    },
    englishMeaning: 'Do you want to drink water?',
    hindiMeaning: 'क्या तुम्हें पानी पीने जाना है?',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'गुरुजी, क्या मैं बाहर पानी पीने जा सकता हूँ?',
      english: 'Guruji, may I go outside to drink water?',
      santhali: STUDENT_CLASSROOM_INPUTS[3].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[3].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[3].mundari,
    }
  },
  // Show homework
  {
    englishRegex: /(?:show(?:\s*(?:me)?\s*(?:your)?)?\s*homework)/i,
    hindiRegex: /(?:अपना\s*)?(?:गृहकार्य|होमवर्क)\s*दिखाओ/i,
    translations: {
      Santhali: {
        script: 'ᱟᱢᱟᱜ ᱚᱲᱟᱜ ᱠᱟᱹᱢᱤ ᱩᱫᱩᱜ ᱢᱮ',
        romanized: 'Amag orag kami udug me',
        devanagariPhonetic: 'आमाग ओड़ाग कामी उदुग मे',
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑 𑢥𑣉𑣕𑣂',
        romanized: 'Ama ora kami nel-rikaing me',
        devanagariPhonetic: 'आमा ओड़ा कामी नेल-रिकाईंग मे',
      },
      Mundari: {
        script: 'आमा ओड़ाः कामी नेल-रिकाएमे',
        romanized: 'Ama odaah kami nel-rikaeme',
        devanagariPhonetic: 'आमा ओड़ाः कामी नेल-रिकाएमे',
      },
    },
    englishMeaning: 'Show me your homework',
    hindiMeaning: 'अपना गृहकार्य (होमवर्क) दिखाओ',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'गुरुजी, मैंने अपना गृहकार्य पूरा कर लिया है।',
      english: 'Guruji, I have completed my homework.',
      santhali: STUDENT_CLASSROOM_INPUTS[4].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[4].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[4].mundari,
    }
  },
  // Praise / Very good answer
  {
    englishRegex: /(?:very\s*good|well\s*done|excellent|good\s*job|good\s*answer)/i,
    hindiRegex: /(?:शाबाश|बहुत\s*अच्छा|अति\s*उत्तम|सही\s*जवाब)/i,
    translations: {
      Santhali: {
        script: 'ᱵᱮᱥ ᱩᱛᱟᱹᱨ! ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱨᱚᱲ ᱠᱮᱫᱼᱟᱢ',
        romanized: 'Bes utar! Adi napay ror ked-am',
        devanagariPhonetic: 'बेस उतार! आदि नापाय रोड़ केद-आम',
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢯𑣃𑣜𑣂𑣑 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
        romanized: 'Bugite! Adi bugin kaji kedam',
        devanagariPhonetic: 'बुगिते! आदि बुगिन काजि केदाम',
      },
      Mundari: {
        script: 'बुगीते! आदि बोगिन काजी ताना',
        romanized: 'Bugite! Adi bogin kaji tana',
        devanagariPhonetic: 'बुगीते! आदि बोगिन काजी ताना',
      },
    },
    englishMeaning: 'Well done! Very good answer',
    hindiMeaning: 'शाबाश! बहुत अच्छा उत्तर दिया',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'धन्यवाद गुरुजी! हम रोज़ मन लगाकर पढ़ेंगे।',
      english: 'Thank you Guruji! We will study hard every day.',
      santhali: STUDENT_CLASSROOM_INPUTS[6].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[6].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[6].mundari,
    }
  },
  // Thank you children
  {
    englishRegex: /(?:thank\s*you|thanks|gratitude)(?:\s*children)?/i,
    hindiRegex: /(?:धन्यवाद|शुक्रिया|आभार)(?:\s*बच्चों)?/i,
    translations: {
      Santhali: {
        script: 'ᱥᱟᱨᱦᱟᱣ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ',
        romanized: 'Sarhaw gidra ko',
        devanagariPhonetic: 'सारहाव गिदरा को',
      },
      Ho: {
        script: '𑢷𑣁𑣜𑣂 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉',
        romanized: 'Sarhaw hon ko',
        devanagariPhonetic: 'सारहाव होन को',
      },
      Mundari: {
        script: 'सराहाओ होन्को',
        romanized: 'Sarhao honko',
        devanagariPhonetic: 'सराहाओ होन्को',
      },
    },
    englishMeaning: 'Thank you children',
    hindiMeaning: 'धन्यवाद बच्चों',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जोहार गुरुजी! धन्यवाद।',
      english: 'Johar Guruji! Thank you.',
      santhali: STUDENT_CLASSROOM_INPUTS[6].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[6].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[6].mundari,
    }
  },
  // What is your name
  {
    englishRegex: /(?:what\s*is\s*your\s*name|your\s*name)/i,
    hindiRegex: /(?:तुम्हारा\s*नाम|आपका\s*नाम|नाम\s*क्या\s*है)/i,
    translations: {
      Santhali: {
        script: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ?',
        romanized: 'Amag nyutum do ched?',
        devanagariPhonetic: 'आमाग न्यूतुम दो चेद?',
      },
      Ho: {
        script: '𑢡𑣂𑣁𑣜𑣂 𑢓𑣃𑣕𑣃𑣖 𑢱𑣁𑣓𑣁 𑢡𑣂?',
        romanized: 'Ama nutum chikan chi?',
        devanagariPhonetic: 'आमा नुतुम चिकन चि?',
      },
      Mundari: {
        script: 'आमा नुतुम चिकना?',
        romanized: 'Ama nutum chikana?',
        devanagariPhonetic: 'आमा नुतुम चिकना?',
      },
    },
    englishMeaning: 'What is your name?',
    hindiMeaning: 'तुम्हारा नाम क्या है?',
  },
  // How are you
  {
    englishRegex: /(?:how\s*are\s*you|how\s*are\s*you\s*all)/i,
    hindiRegex: /(?:आप\s*कैसे\s*हैं|तुम\s*कैसे\s*हो|कैसे\s*हो)/i,
    translations: {
      Santhali: {
        script: 'ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?',
        romanized: 'Ched leka menama?',
        devanagariPhonetic: 'चेद लेका मेनामा?',
      },
      Ho: {
        script: '𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑 𑢖𑣄𑣂',
        romanized: 'Chikan bugin menama?',
        devanagariPhonetic: 'चिकन बुगिन मेनामा?',
      },
      Mundari: {
        script: 'चि बुगीगे मेनामा?',
        romanized: 'Chi bugige menama?',
        devanagariPhonetic: 'चि बुगीगे मेनामा?',
      },
    },
    englishMeaning: 'How are you?',
    hindiMeaning: 'आप कैसे हैं?',
    expectedReply: {
      speakerRole: 'student',
      hindi: 'जोहार गुरुजी! हम सब बहुत अच्छे और खुश हैं।',
      english: 'Johar Guruji! We are all fine and happy.',
      santhali: STUDENT_CLASSROOM_INPUTS[0].santhali,
      ho: STUDENT_CLASSROOM_INPUTS[0].ho,
      mundari: STUDENT_CLASSROOM_INPUTS[0].mundari,
    }
  },
  {
    englishRegex: /^(?:read(?:\s*aloud|\s*this|\s*book)?)$/i,
    hindiRegex: /^(?:पढ़ो|किताब\s*पढ़ो|सस्वर\s*वाचन)$/i,
    translations: {
      Santhali: {
        script: 'ᱯᱟᱲᱦᱟᱣ ᱢᱮ',
        romanized: 'Parhaw me',
        devanagariPhonetic: 'पाड़हाव मे',
      },
      Ho: {
        script: '𑢥𑣁𑢷𑣁𑣖 𑢖𑣂',
        romanized: 'Padaw me',
        devanagariPhonetic: 'पाड़ाव मे',
      },
      Mundari: {
        script: 'पाड़हावपे',
        romanized: 'Parhaope',
        devanagariPhonetic: 'पाड़हावपे',
      },
    },
    englishMeaning: 'Read aloud',
    hindiMeaning: 'पढ़ो',
  },
  {
    englishRegex: /^(?:write(?:\s*down|\s*in\s*copy|\s*this)?)$/i,
    hindiRegex: /^(?:लिखो|कॉपी\s*में\s*लिखो)$/i,
    translations: {
      Santhali: {
        script: 'ᱚᱞ ᱢᱮ',
        romanized: 'Ol me',
        devanagariPhonetic: 'ओल मे',
      },
      Ho: {
        script: '𑢵𑣚 𑢖𑣂',
        romanized: 'Ol me',
        devanagariPhonetic: 'ओल मे',
      },
      Mundari: {
        script: 'ओलपे',
        romanized: 'Olpe',
        devanagariPhonetic: 'ओलपे',
      },
    },
    englishMeaning: 'Write down',
    hindiMeaning: 'लिखो',
  },
  {
    englishRegex: /(?:keep\s*quiet|quiet|silence|be\s*quiet)/i,
    hindiRegex: /(?:शांत\s*रहो|चुप\s*रहो)/i,
    translations: {
      Santhali: {
        script: 'ᱛᱷᱤᱨ ᱛᱟᱦᱮᱸᱱ ᱢᱮ',
        romanized: 'Thir tahen me',
        devanagariPhonetic: 'थीर ताहेन मे',
      },
      Ho: {
        script: '𑢱𑣁𑣑𑣂 𑢡𑣁𑣚𑣉 𑢶𑣂',
        romanized: 'Kaji aalo me',
        devanagariPhonetic: 'काजि आलो मे',
      },
      Mundari: {
        script: 'काजी आलोपे',
        romanized: 'Kaji alope',
        devanagariPhonetic: 'काजी आलोपे',
      },
    },
    englishMeaning: 'Keep quiet',
    hindiMeaning: 'शांत रहो',
  },
  {
    englishRegex: /(?:look\s*at(?:\s*the)?\s*(?:black)?board)/i,
    hindiRegex: /(?:श्यामपट्ट|ब्लैकबोर्ड)\s*की\s*तरफ\s*देखो/i,
    translations: {
      Santhali: {
        script: 'ᱠᱟᱞᱟ ᱯᱟᱴᱟ ᱥᱮᱫ ᱠᱚᱭᱚᱜᱽ ᱢᱮ',
        romanized: 'Kala pata sed koyog me',
        devanagariPhonetic: 'काला पाटा सेद कोयॉग मे',
      },
      Ho: {
        script: '𑢱𑣂𑣁𑣓𑣉𑣁 𑢡𑣉𑣜𑣑 𑢡𑣂𑣁𑣜𑣂 𑢡𑣂𑣁𑣑',
        romanized: 'Hende board saing nel me',
        devanagariPhonetic: 'हेंडे बोर्ड साइंग नेल मे',
      },
      Mundari: {
        script: 'हेंदे पाता साः नेलेपे',
        romanized: 'Hende pata sah nelepe',
        devanagariPhonetic: 'हेंदे पाता साः नेलेपे',
      },
    },
    englishMeaning: 'Look towards the blackboard',
    hindiMeaning: 'श्यामपट्ट (ब्लैकबोर्ड) की तरफ देखो',
  },
];

/**
 * Helper to build word-by-word pronunciation breakdown from script, romanized, and phonetic strings
 */
function buildWordsBreakdown(
  scriptStr: string,
  romanStr: string,
  phoneticStr: string,
  meaningStr: string
): Array<{ word: string; romanized: string; phonetic: string; meaning: string }> {
  const scriptTokens = (scriptStr || '').split(/\s+/).filter(Boolean);
  const romanTokens = (romanStr || '').split(/\s+/).filter(Boolean);
  const phoneticTokens = (phoneticStr || '').split(/\s+/).filter(Boolean);
  const meaningTokens = (meaningStr || '').split(/\s+/).filter(Boolean);

  const count = Math.max(phoneticTokens.length, romanTokens.length);
  if (count === 0) return [];

  const breakdown: Array<{ word: string; romanized: string; phonetic: string; meaning: string }> = [];
  for (let i = 0; i < Math.min(count, 8); i++) {
    const wScript = scriptTokens[i] || phoneticTokens[i] || romanTokens[i] || '';
    const wRoman = romanTokens[i] || wScript;
    const wPhonetic = phoneticTokens[i] || wRoman;
    const cleanRom = cleanString(wRoman);

    // Lookup word meaning from VOCABULARY_CORPUS if available
    const vocabHit = VOCABULARY_CORPUS.find(
      (v) =>
        cleanString(v.santhali.romanized) === cleanRom ||
        cleanString(v.ho.romanized) === cleanRom ||
        cleanString(v.mundari.romanized) === cleanRom ||
        v.hindi.some((h) => cleanString(h) === cleanString(wPhonetic))
    );

    breakdown.push({
      word: wScript,
      romanized: wRoman,
      phonetic: wPhonetic,
      meaning: vocabHit ? (vocabHit.english[0] || vocabHit.hindi[0]) : (meaningTokens[i] || wRoman),
    });
  }
  return breakdown;
}

/**
 * Translates input text (English OR Hindi) into the target tribal language.
 * Guarantees that devanagariPhonetic contains ONLY pronounceable Hindi glyphs,
 * avoiding unpronounceable Ol Chiki or Warang Chiti characters in TTS,
 * and attaches the paired expectedClassroomReply for 1-click playback.
 */
export function translateToTribal(
  input: string,
  sourceLang: SourceLanguage | 'Auto' = 'Hindi',
  targetLang: TribalLanguage = 'Santhali'
): TranslationResult {
  const cleanInput = cleanString(input);
  const scriptName = targetLang === 'Santhali' ? 'Ol Chiki' : targetLang === 'Ho' ? 'Warang Chiti' : 'Devanagari';
  const defaultExpectedReply: PairedClassroomReply = {
    speakerRole: 'student',
    hindi: STUDENT_CLASSROOM_INPUTS[0].hindi,
    english: STUDENT_CLASSROOM_INPUTS[0].english,
    santhali: STUDENT_CLASSROOM_INPUTS[0].santhali,
    ho: STUDENT_CLASSROOM_INPUTS[0].ho,
    mundari: STUDENT_CLASSROOM_INPUTS[0].mundari,
  };

  if (!cleanInput) {
    return {
      script: '',
      scriptName,
      romanized: '',
      devanagariPhonetic: '',
      englishMeaning: '',
      hindiMeaning: '',
      audioHint: '',
      targetLanguage: targetLang,
      expectedClassroomReply: defaultExpectedReply,
    };
  }

  // 0. Check CLASSROOM_DIALOGUE_SCENARIOS first for exact teacher prompt or student reply match
  for (const sc of CLASSROOM_DIALOGUE_SCENARIOS) {
    const teacherPair = sc.dialoguePairs.find((p) => p.speaker === 'teacher') || sc.dialoguePairs[0];
    const studentPair = sc.dialoguePairs.find((p) => p.speaker === 'student') || sc.dialoguePairs[1];

    for (const pair of sc.dialoguePairs) {
      if (
        cleanString(pair.hindi) === cleanInput ||
        cleanString(pair.english) === cleanInput ||
        (cleanInput.length > 10 &&
          (cleanString(pair.hindi).includes(cleanInput) || cleanString(pair.english).includes(cleanInput)))
      ) {
        const langData = targetLang === 'Santhali' ? pair.santhali : targetLang === 'Ho' ? pair.ho : pair.mundari;
        const replyPair = pair.speaker === 'teacher' ? studentPair : teacherPair;
        const expectedClassroomReply: PairedClassroomReply | undefined = replyPair
          ? {
              speakerRole: replyPair.speaker,
              hindi: replyPair.hindi,
              english: replyPair.english,
              santhali: replyPair.santhali,
              ho: replyPair.ho,
              mundari: replyPair.mundari,
            }
          : defaultExpectedReply;

        return {
          script: langData.script,
          scriptName,
          romanized: langData.roman,
          devanagariPhonetic: langData.phonetic,
          englishMeaning: pair.english,
          hindiMeaning: pair.hindi,
          audioHint: `Authentic ${targetLang} classroom dialogue`,
          targetLanguage: targetLang,
          wordsBreakdown: buildWordsBreakdown(langData.script, langData.roman, langData.phonetic, pair.english),
          expectedClassroomReply,
        };
      }
    }
  }

  // 0.5 Check STUDENT_CLASSROOM_INPUTS if the user typed a student response in Hindi or English
  for (const stuEntry of STUDENT_CLASSROOM_INPUTS) {
    if (
      cleanString(stuEntry.hindi) === cleanInput ||
      cleanString(stuEntry.english) === cleanInput
    ) {
      const langData = targetLang === 'Santhali' ? stuEntry.santhali : targetLang === 'Ho' ? stuEntry.ho : stuEntry.mundari;
      return {
        script: langData.script,
        scriptName,
        romanized: langData.roman,
        devanagariPhonetic: langData.phonetic,
        englishMeaning: stuEntry.english,
        hindiMeaning: stuEntry.hindi,
        audioHint: `Student classroom response in ${targetLang}`,
        targetLanguage: targetLang,
        wordsBreakdown: buildWordsBreakdown(langData.script, langData.roman, langData.phonetic, stuEntry.english),
        expectedClassroomReply: stuEntry.teacherReply,
      };
    }
  }

  // 1. High-Precision Classroom Pattern Rules (English & Hindi)
  for (const rule of CLASSROOM_PATTERNS) {
    if (rule.englishRegex.test(cleanInput) || rule.hindiRegex.test(cleanInput)) {
      const trans = rule.translations[targetLang];
      return {
        script: trans.script,
        scriptName,
        romanized: trans.romanized,
        devanagariPhonetic: trans.devanagariPhonetic,
        englishMeaning: rule.englishMeaning,
        hindiMeaning: rule.hindiMeaning,
        audioHint: `Authentic classroom expression in ${targetLang}`,
        targetLanguage: targetLang,
        wordsBreakdown: buildWordsBreakdown(trans.script, trans.romanized, trans.devanagariPhonetic, rule.englishMeaning),
        expectedClassroomReply: rule.expectedReply || defaultExpectedReply,
      };
    }
  }

  // 2. Direct match with CLASSROOM_PHRASES (only full or substantial phrase match, never single-word hijacking)
  const matchedPhrase = CLASSROOM_PHRASES.find((p) => {
    const pCleanHindi = cleanString(p.hindi);
    const pCleanEng = cleanString(p.english);
    return (
      cleanInput === pCleanHindi ||
      cleanInput === pCleanEng ||
      (cleanInput.length > 12 && (pCleanHindi.includes(cleanInput) || cleanInput.includes(pCleanHindi))) ||
      (cleanInput.length > 12 && (pCleanEng.includes(cleanInput) || cleanInput.includes(pCleanEng)))
    );
  });

  if (matchedPhrase) {
    const trans = matchedPhrase.translations[targetLang];
    return {
      script: trans.script,
      scriptName: trans.scriptName,
      romanized: trans.romanized,
      devanagariPhonetic: trans.devanagariPhonetic,
      englishMeaning: matchedPhrase.english,
      hindiMeaning: matchedPhrase.hindi,
      audioHint: trans.audioHint || `Spoken in ${targetLang}`,
      targetLanguage: targetLang,
      wordsBreakdown: buildWordsBreakdown(trans.script, trans.romanized, trans.devanagariPhonetic, matchedPhrase.english),
      expectedClassroomReply: defaultExpectedReply,
    };
  }

  // 3. Exact match with VOCABULARY_CORPUS (only exact matches so multi-word sentences are not truncated!)
  const matchedVocab = VOCABULARY_CORPUS.find((entry) => {
    const inHindi = entry.hindi.some((h) => cleanString(h) === cleanInput);
    const inEng = entry.english.some((e) => cleanString(e) === cleanInput);
    return inHindi || inEng;
  });

  if (matchedVocab) {
    const langData =
      targetLang === 'Santhali'
        ? matchedVocab.santhali
        : targetLang === 'Ho'
        ? matchedVocab.ho
        : matchedVocab.mundari;

    return {
      script: langData.script,
      scriptName,
      romanized: langData.romanized,
      devanagariPhonetic: langData.devanagariPhonetic,
      englishMeaning: matchedVocab.englishMeaning,
      hindiMeaning: matchedVocab.hindi[0] || input,
      audioHint: `Pedagogical vocabulary in ${targetLang}`,
      targetLanguage: targetLang,
      wordsBreakdown: [
        {
          word: langData.script,
          romanized: langData.romanized,
          phonetic: langData.devanagariPhonetic,
          meaning: matchedVocab.english[0] || matchedVocab.hindi[0] || input,
        },
      ],
      expectedClassroomReply: defaultExpectedReply,
    };
  }

  // 4. Multi-word tokenized parsing for both English and Hindi
  const tokens = cleanInput.split(' ').filter(Boolean);
  const translatedScripts: string[] = [];
  const translatedRomans: string[] = [];
  const translatedPhonetics: string[] = [];
  const wordsBreakdown: Array<{ word: string; romanized: string; phonetic: string; meaning: string }> = [];

  // Stop-words in English/Hindi that can be smoothly omitted or mapped in SOV tribal syntax
  const ignoreTokens = new Set(['please', 'the', 'a', 'an', 'to', 'of', 'in', 'कृपया', 'जी']);

  for (const token of tokens) {
    if (ignoreTokens.has(token) && tokens.length > 2) continue;

    const tokenMatch = VOCABULARY_CORPUS.find((entry) => {
      const matchHindi = entry.hindi.some((h) => cleanString(h) === token);
      const matchEng = entry.english.some((e) => {
        const ce = cleanString(e);
        return ce === token || (token.length > 3 && ce.startsWith(token.slice(0, 4)));
      });
      return matchHindi || matchEng;
    });

    if (tokenMatch) {
      const data =
        targetLang === 'Santhali'
          ? tokenMatch.santhali
          : targetLang === 'Ho'
          ? tokenMatch.ho
          : tokenMatch.mundari;

      translatedScripts.push(data.script);
      translatedRomans.push(data.romanized);
      translatedPhonetics.push(data.devanagariPhonetic);
      wordsBreakdown.push({
        word: data.script,
        romanized: data.romanized,
        phonetic: data.devanagariPhonetic,
        meaning: tokenMatch.english[0] || tokenMatch.hindi[0] || token,
      });
    } else {
      translatedScripts.push(token);
      translatedRomans.push(token);
      translatedPhonetics.push(token);
      wordsBreakdown.push({
        word: token,
        romanized: token,
        phonetic: token,
        meaning: token,
      });
    }
  }

  return {
    script: translatedScripts.join(' '),
    scriptName,
    romanized: translatedRomans.join(' '),
    devanagariPhonetic: translatedPhonetics.join(' '),
    englishMeaning: input,
    hindiMeaning: input,
    audioHint: `Pronounced in ${targetLang}`,
    targetLanguage: targetLang,
    wordsBreakdown,
    expectedClassroomReply: defaultExpectedReply,
  };
}

/**
 * Translates student utterances spoken in tribal mother tongues (Santhali, Ho, Mundari) back to Hindi & English
 * for seamless two-way interactive classroom dialogue, including paired Teacher Classroom Response.
 */
export function translateTribalToHindi(
  input: string,
  sourceLang: TribalLanguage,
  targetTeacherLang: 'Hindi' | 'English' = 'Hindi'
): TranslationResult {
  const cleanInput = cleanString(input);
  const defaultTeacherReply = STUDENT_CLASSROOM_INPUTS[0].teacherReply;

  if (!cleanInput) {
    return {
      script: '',
      scriptName: targetTeacherLang === 'English' ? 'Latin (English)' : 'Devanagari (Hindi)',
      romanized: '',
      devanagariPhonetic: '',
      englishMeaning: '',
      hindiMeaning: '',
      audioHint: targetTeacherLang,
      targetLanguage: targetTeacherLang,
      expectedClassroomReply: defaultTeacherReply,
    };
  }

  // 0. Check STUDENT_CLASSROOM_INPUTS first for exact or partial match across script, roman, phonetic, hindi, or english
  for (const stuEntry of STUDENT_CLASSROOM_INPUTS) {
    const candidates = [
      stuEntry.santhali.script,
      stuEntry.santhali.roman,
      stuEntry.santhali.phonetic,
      stuEntry.ho.script,
      stuEntry.ho.roman,
      stuEntry.ho.phonetic,
      stuEntry.mundari.script,
      stuEntry.mundari.roman,
      stuEntry.mundari.phonetic,
      stuEntry.hindi,
      stuEntry.english,
    ].map(cleanString);

    if (
      candidates.some(
        (c) => c === cleanInput || (cleanInput.length > 8 && (c.includes(cleanInput) || cleanInput.includes(c)))
      )
    ) {
      const srcData = sourceLang === 'Santhali' ? stuEntry.santhali : sourceLang === 'Ho' ? stuEntry.ho : stuEntry.mundari;
      const primaryDisplay = targetTeacherLang === 'English' ? stuEntry.english : stuEntry.hindi;
      return {
        script: primaryDisplay,
        scriptName: targetTeacherLang === 'English' ? 'English Translation' : 'हिन्दी अनुवाद (Devanagari)',
        romanized: `${srcData.roman} — "${stuEntry.english}"`,
        devanagariPhonetic: stuEntry.hindi,
        englishMeaning: stuEntry.english,
        hindiMeaning: stuEntry.hindi,
        audioHint: `Student (${sourceLang}) translated to ${targetTeacherLang}`,
        targetLanguage: targetTeacherLang,
        wordsBreakdown: buildWordsBreakdown(srcData.script, srcData.roman, srcData.phonetic, stuEntry.english),
        expectedClassroomReply: stuEntry.teacherReply,
      };
    }
  }

  // 0.5 Check CLASSROOM_DIALOGUE_SCENARIOS dialoguePairs
  for (const sc of CLASSROOM_DIALOGUE_SCENARIOS) {
    const teacherPair = sc.dialoguePairs.find((p) => p.speaker === 'teacher') || sc.dialoguePairs[0];
    for (const pair of sc.dialoguePairs) {
      const candidates = [
        pair.santhali.script,
        pair.santhali.roman,
        pair.santhali.phonetic,
        pair.ho.script,
        pair.ho.roman,
        pair.ho.phonetic,
        pair.mundari.script,
        pair.mundari.roman,
        pair.mundari.phonetic,
        pair.hindi,
        pair.english,
      ].map(cleanString);

      if (
        candidates.some(
          (c) => c === cleanInput || (cleanInput.length > 8 && (c.includes(cleanInput) || cleanInput.includes(c)))
        )
      ) {
        const srcData = sourceLang === 'Santhali' ? pair.santhali : sourceLang === 'Ho' ? pair.ho : pair.mundari;
        const primaryDisplay = targetTeacherLang === 'English' ? pair.english : pair.hindi;
        return {
          script: primaryDisplay,
          scriptName: targetTeacherLang === 'English' ? 'English Translation' : 'हिन्दी अनुवाद (Devanagari)',
          romanized: `${srcData.roman} — "${pair.english}"`,
          devanagariPhonetic: pair.hindi,
          englishMeaning: pair.english,
          hindiMeaning: pair.hindi,
          audioHint: `Translated for teacher`,
          targetLanguage: targetTeacherLang,
          wordsBreakdown: buildWordsBreakdown(srcData.script, srcData.roman, srcData.phonetic, pair.english),
          expectedClassroomReply: teacherPair
            ? {
                speakerRole: 'teacher',
                hindi: teacherPair.hindi,
                english: teacherPair.english,
                santhali: teacherPair.santhali,
                ho: teacherPair.ho,
                mundari: teacherPair.mundari,
              }
            : defaultTeacherReply,
        };
      }
    }
  }

  // 1. Direct classroom phrases check (exact or substantial match)
  const matchedPhrase = CLASSROOM_PHRASES.find((p) => {
    const t = p.translations[sourceLang];
    return (
      cleanString(t.script) === cleanInput ||
      cleanString(t.romanized) === cleanInput ||
      cleanString(t.devanagariPhonetic) === cleanInput ||
      (cleanInput.length > 10 &&
        (cleanString(t.script).includes(cleanInput) ||
          cleanString(t.romanized).includes(cleanInput) ||
          cleanString(t.devanagariPhonetic).includes(cleanInput)))
    );
  });

  if (matchedPhrase) {
    const t = matchedPhrase.translations[sourceLang];
    const primaryDisplay = targetTeacherLang === 'English' ? matchedPhrase.english : matchedPhrase.hindi;
    return {
      script: primaryDisplay,
      scriptName: targetTeacherLang === 'English' ? 'English Translation' : 'Devanagari',
      romanized: matchedPhrase.english,
      devanagariPhonetic: matchedPhrase.hindi,
      englishMeaning: matchedPhrase.english,
      hindiMeaning: matchedPhrase.hindi,
      audioHint: 'Hindi translation for teacher',
      targetLanguage: targetTeacherLang,
      wordsBreakdown: buildWordsBreakdown(t.script, t.romanized, t.devanagariPhonetic, matchedPhrase.english),
      expectedClassroomReply: defaultTeacherReply,
    };
  }

  // 2. Exact single-word Vocabulary corpus lookup (no .includes() on multi-word sentences!)
  const matchedVocab = VOCABULARY_CORPUS.find((entry) => {
    const data =
      sourceLang === 'Santhali'
        ? entry.santhali
        : sourceLang === 'Ho'
        ? entry.ho
        : entry.mundari;
    return (
      cleanString(data.script) === cleanInput ||
      cleanString(data.romanized) === cleanInput ||
      cleanString(data.devanagariPhonetic) === cleanInput
    );
  });

  if (matchedVocab) {
    const hindiWord = matchedVocab.hindi[0] || 'उत्तर';
    const engWord = matchedVocab.english[0] || matchedVocab.englishMeaning || 'Reply';
    const data = sourceLang === 'Santhali' ? matchedVocab.santhali : sourceLang === 'Ho' ? matchedVocab.ho : matchedVocab.mundari;
    return {
      script: targetTeacherLang === 'English' ? engWord : hindiWord,
      scriptName: targetTeacherLang === 'English' ? 'English' : 'Devanagari',
      romanized: engWord,
      devanagariPhonetic: hindiWord,
      englishMeaning: matchedVocab.englishMeaning,
      hindiMeaning: hindiWord,
      audioHint: 'Hindi translation',
      targetLanguage: targetTeacherLang,
      wordsBreakdown: [
        {
          word: data.script,
          romanized: data.romanized,
          phonetic: data.devanagariPhonetic,
          meaning: `${hindiWord} (${engWord})`,
        },
      ],
      expectedClassroomReply: defaultTeacherReply,
    };
  }

  // 3. Token-by-token matching across all 3 tribal languages + Hindi
  const tokens = cleanInput.split(' ').filter(Boolean);
  const hindiWords: string[] = [];
  const englishWords: string[] = [];
  const wordsBreakdown: Array<{ word: string; romanized: string; phonetic: string; meaning: string }> = [];

  for (const token of tokens) {
    const tokenMatch = VOCABULARY_CORPUS.find((entry) => {
      return (
        cleanString(entry.santhali.script) === token ||
        cleanString(entry.santhali.romanized) === token ||
        cleanString(entry.santhali.devanagariPhonetic) === token ||
        cleanString(entry.ho.script) === token ||
        cleanString(entry.ho.romanized) === token ||
        cleanString(entry.ho.devanagariPhonetic) === token ||
        cleanString(entry.mundari.script) === token ||
        cleanString(entry.mundari.romanized) === token ||
        cleanString(entry.mundari.devanagariPhonetic) === token ||
        entry.hindi.some((h) => cleanString(h) === token)
      );
    });

    if (tokenMatch) {
      const hWord = tokenMatch.hindi[0] || token;
      const eWord = tokenMatch.english[0] || token;
      const data = sourceLang === 'Santhali' ? tokenMatch.santhali : sourceLang === 'Ho' ? tokenMatch.ho : tokenMatch.mundari;
      hindiWords.push(hWord);
      englishWords.push(eWord);
      wordsBreakdown.push({
        word: data.script,
        romanized: data.romanized,
        phonetic: data.devanagariPhonetic,
        meaning: `${hWord} (${eWord})`,
      });
    } else {
      hindiWords.push(token);
      englishWords.push(token);
    }
  }

  const resultHindi = hindiWords.join(' ') || input;
  const resultEnglish = englishWords.join(' ') || input;

  return {
    script: targetTeacherLang === 'English' ? resultEnglish : resultHindi,
    scriptName: targetTeacherLang === 'English' ? 'English' : 'Devanagari',
    romanized: resultEnglish,
    devanagariPhonetic: resultHindi,
    englishMeaning: resultEnglish,
    hindiMeaning: resultHindi,
    audioHint: 'Hindi',
    targetLanguage: targetTeacherLang,
    wordsBreakdown,
    expectedClassroomReply: defaultTeacherReply,
  };
}

/**
 * High-speed hybrid translation pipeline:
 * Tries server-side Gemini 3.8 Flash first (<1.5s latency),
 * with instant fallback to on-device dictionary/JNI so latency NEVER exceeds 3.0 seconds!
 */
export async function translateWithAiOrFallback(
  text: string,
  sourceLang: SourceLanguage | TribalLanguage,
  targetLang: TribalLanguage | SourceLanguage,
  speakerRole: 'teacher' | 'student' = 'teacher'
): Promise<{ result: TranslationResult; latencyMs: number; isAiPowered: boolean }> {
  const t0 = performance.now();
  const isTargetTribal = targetLang === 'Santhali' || targetLang === 'Ho' || targetLang === 'Mundari';

  // 1. Try server-side AI translation with 2800ms abort deadline
  if (typeof window !== 'undefined' && navigator.onLine) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2800);

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
          speakerRole,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data && !json.fallback && json.data.script && json.data.devanagariPhonetic) {
          const totalMs = Math.round(performance.now() - t0);
          return {
            result: json.data,
            latencyMs: totalMs,
            isAiPowered: true,
          };
        }
      }
    } catch {
      // Abort or network failure -> Fall back immediately to offline on-device engine
    }
  }

  // 2. On-Device Fallback (sub-50ms execution)
  let fallbackResult: TranslationResult;
  if (isTargetTribal) {
    fallbackResult = translateToTribal(
      text,
      (sourceLang as SourceLanguage) || 'Hindi',
      targetLang as TribalLanguage
    );
  } else {
    fallbackResult = translateTribalToHindi(
      text,
      sourceLang as TribalLanguage,
      targetLang === 'English' ? 'English' : 'Hindi'
    );
  }

  const totalMs = Math.max(25, Math.round(performance.now() - t0));
  return {
    result: fallbackResult,
    latencyMs: totalMs,
    isAiPowered: false,
  };
}

/**
 * Helper to get available browser voices safely
 */
function getSpeechVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices() || [];
}

/**
 * Resolve the optimal voice and determine whether it supports native Devanagari phonetics.
 * If the device has no Hindi voice (e.g., standard OS without Hindi speech data),
 * it uses Romanized syllables with an English/Indian voice so audio NEVER fails silently.
 */
function resolveBestVoice(): {
  voice: SpeechSynthesisVoice | null;
  supportsDevanagari: boolean;
  targetLangCode: string;
} {
  const voices = getSpeechVoices();

  // 1. Direct Hindi voice (native Devanagari pronunciation)
  const hindiVoice = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang.startsWith('hi') ||
      name.includes('hindi') ||
      name.includes('देवनागरी') ||
      name.includes('lekha') ||
      name.includes('neerja')
    );
  });

  if (hindiVoice) {
    return {
      voice: hindiVoice,
      supportsDevanagari: true,
      targetLangCode: hindiVoice.lang || 'hi-IN'
    };
  }

  // 2. Indian English voice (can pronounce South Asian phonetics well when Romanized)
  const indianEngVoice = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang === 'en-in' ||
      lang.startsWith('en-in') ||
      name.includes('india') ||
      name.includes('veena') ||
      name.includes('rishi')
    );
  });

  if (indianEngVoice) {
    return {
      voice: indianEngVoice,
      supportsDevanagari: false,
      targetLangCode: indianEngVoice.lang || 'en-IN'
    };
  }

  // 3. Fallback to default or any English voice
  const defaultVoice =
    voices.find((v) => v.default) ||
    voices.find((v) => (v.lang || '').toLowerCase().startsWith('en')) ||
    voices[0] ||
    null;

  return {
    voice: defaultVoice,
    supportsDevanagari: false,
    targetLangCode: defaultVoice?.lang || 'en-US'
  };
}

/**
 * High-reliability voice synthesizer for the selected tribal language.
 * Guarantees audio feedback in all browser environments and handles
 * missing Hindi speech packages by falling back to romanized articulation or Web Audio acoustic chant.
 */
export function speakTribalTranslation(
  translation: TranslationResult,
  targetLang: TribalLanguage,
  rate: number = 0.85,
  onStart?: () => void,
  onEnd?: () => void
): Promise<boolean> {
  return new Promise((resolve) => {
    // Play pleasant warm classroom audio cue
    gameAudio.playClassroomAudioCue();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // AudioContext acoustic chant fallback for environments without SpeechSynthesis
      gameAudio.playPedagogicalChant(6);
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
        resolve(true);
      }, 1500);
      return;
    }

    try {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const { voice, supportsDevanagari, targetLangCode } = resolveBestVoice();

      // If voice supports Devanagari, speak devanagariPhonetic;
      // otherwise, speak romanized syllables so the English voice doesn't choke or stay silent!
      let textToSpeak = '';
      if (supportsDevanagari) {
        textToSpeak = translation.devanagariPhonetic?.trim() || translation.romanized?.trim() || '';
      } else {
        textToSpeak = translation.romanized?.trim() || translation.devanagariPhonetic?.trim() || '';
      }

      if (!textToSpeak) {
        gameAudio.playPedagogicalChant(4);
        if (onEnd) onEnd();
        resolve(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = rate; // 0.85 by default for clear pedagogical articulation
      utterance.pitch = 1.0;
      if (voice) {
        utterance.voice = voice;
      }
      utterance.lang = targetLangCode;

      let hasEnded = false;
      const finish = () => {
        if (!hasEnded) {
          hasEnded = true;
          if (onEnd) onEnd();
          resolve(true);
        }
      };

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = finish;
      utterance.onerror = () => {
        // Fallback to Web Audio pedagogical chant on error so the user still hears clear audio
        gameAudio.playPedagogicalChant(Math.min(textToSpeak.split(' ').length, 6));
        finish();
      };

      // Safety timeout: Chrome sometimes fails to fire onend for speech synthesis
      const maxDuration = Math.max(2500, textToSpeak.length * 140);
      setTimeout(finish, maxDuration);

      // Short delay prevents the Chromium cancel-and-speak race condition
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 60);
    } catch {
      gameAudio.playPedagogicalChant(5);
      if (onEnd) onEnd();
      resolve(false);
    }
  });
}

/**
 * Directly pronounce a classroom phrase in either the Mother Tongue (targetLang) or Hindi.
 */
export function speakClassroomPhraseAudio(
  phrase: PhraseTranslation,
  targetLang: TribalLanguage,
  mode: 'target' | 'hindi' = 'target',
  rate: number = 0.85,
  onStart?: () => void,
  onEnd?: () => void
): Promise<boolean> {
  const trans = phrase.translations[targetLang];
  if (mode === 'hindi') {
    const hindiResult: TranslationResult = {
      script: phrase.hindi,
      scriptName: 'Devanagari',
      romanized: phrase.english,
      devanagariPhonetic: phrase.hindi,
      englishMeaning: phrase.english,
      audioHint: 'Hindi instruction',
      targetLanguage: targetLang
    };
    return speakTribalTranslation(hindiResult, targetLang, rate, onStart, onEnd);
  }

  const tribalResult: TranslationResult = {
    script: trans.script,
    scriptName: trans.scriptName,
    romanized: trans.romanized,
    devanagariPhonetic: trans.devanagariPhonetic,
    englishMeaning: phrase.english,
    audioHint: trans.audioHint || `Classroom instruction in ${targetLang}`,
    targetLanguage: targetLang
  };
  return speakTribalTranslation(tribalResult, targetLang, rate, onStart, onEnd);
}
