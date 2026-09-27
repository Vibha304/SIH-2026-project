import { WorksheetItem, CulturalStory } from '../types';

export type UILang = 'en' | 'hi';

const STUDENT_NAME_HI_MAP: Record<string, string> = {
  'Amit Soren': 'अमित सोरेन',
  'Priya Kisku': 'प्रिया किस्कू',
  'Ravi Hansda': 'रवि हांसदा',
  'Sita Murmu': 'सीता मुर्मू',
  'John Baskey': 'जॉन बास्के',
  'Lakhi Soren': 'लखी सोरेन',
  'Rani Munda': 'रानी मुंडा',
  'Birsa Ho': 'बिरसा हो',
  'Somi Hansda': 'सोमी हांसदा',
  'Mangal Purty': 'मंगल पूर्ति',
  'Phoolo Murmu': 'फूलो मुर्मू',
  'Karan Soren': 'करण सोरेन',
  'Lakshmi Baskey': 'लक्ष्मी बास्के',
  'Sukra Oraon': 'सुक्रा उरांव',
  'Champa Hembram': 'चंपा हेम्ब्रम',
  'Salkhan Tudu': 'सालखन टुडू',
  'Dulari Marandi': 'दुलारी मरांडी',
  'Jatra Bhagat': 'जत्रा भगत',
  'Baha Kisku': 'बाहा किस्कू',
  'Sidhu Besra': 'सिधू बेसरा',
  'Kanhu Murmu': 'कान्हू मुर्मू',
  'Chand Hansda': 'चाँद हांसदा',
  'Bhairav Soren': 'भैरव सोरेन',
  'Jhano Murmu': 'झानो मुर्मू',
};

const WORD_HI_MAP: Record<string, string> = {
  amit: 'अमित',
  priya: 'प्रिया',
  ravi: 'रवि',
  sita: 'सीता',
  john: 'जॉन',
  lakhi: 'लखी',
  rani: 'रानी',
  munda: 'मुंडा',
  birsa: 'बिरसा',
  ho: 'हो',
  somi: 'सोमी',
  hansda: 'हांसदा',
  mangal: 'मंगल',
  purty: 'पूर्ति',
  phoolo: 'फूलो',
  murmu: 'मुर्मू',
  karan: 'करण',
  soren: 'सोरेन',
  lakshmi: 'लक्ष्मी',
  baskey: 'बास्के',
  sukra: 'सुक्रा',
  oraon: 'उरांव',
  champa: 'चंपा',
  hembram: 'हेम्ब्रम',
  salkhan: 'सालखन',
  tudu: 'टुडू',
  dulari: 'दुलारी',
  marandi: 'मरांडी',
  jatra: 'जत्रा',
  bhagat: 'भगत',
  baha: 'बाहा',
  kisku: 'किस्कू',
  sidhu: 'सिधू',
  besra: 'बेसरा',
  kanhu: 'कान्हू',
  chand: 'चाँद',
  bhairav: 'भैरव',
  jhano: 'झानो',
  sinku: 'सिंकू',
  gagrai: 'गागराई',
  soy: 'सोय',
  laguri: 'लागुरी',
  topno: 'तोपनो',
  bhengra: 'भेंगरा',
  horo: 'होरो',
  champia: 'चम्पिया',
  biruli: 'बिरुली',
  arjun: 'अर्जुन',
  sunil: 'सुनील',
  sunita: 'सुनीता',
  geeta: 'गीता',
  reeta: 'रीता',
  ram: 'राम',
  shyam: 'श्याम',
  mohan: 'मोहन',
  sohan: 'सोहन',
  rohan: 'रोहन',
  pooja: 'पूजा',
  anjali: 'अंजलि',
  rahul: 'राहुल',
  sumit: 'सुमित',
  kiran: 'किरण',
  jyoti: 'ज्योती',
  asha: 'आशा',
  usha: 'उषा',
  rekha: 'रेखा',
  suman: 'सुमन',
  kusum: 'कुसुम',
  pawan: 'पवन',
  deepak: 'दीपक',
  prakash: 'प्रकाश',
  vikas: 'विकास',
  sanjay: 'संजय',
  vijay: 'विजय',
  ajay: 'अजय',
  suraj: 'सूरज',
  chandan: 'चंदन',
  kundan: 'कुंदन',
  nisha: 'निशा',
  disha: 'दिशा',
  mamta: 'ममता',
  kavita: 'कविता',
  savita: 'सविता',
  anita: 'अनीता',
  meena: 'मीना',
  reena: 'रीना',
  seema: 'सीमा',
  neha: 'नेहा',
  sneha: 'स्नेहा',
};

function phoneticLatinToDevanagari(word: string): string {
  const lower = word.toLowerCase().trim();
  if (!lower) return word;
  if (WORD_HI_MAP[lower]) return WORD_HI_MAP[lower];
  if (/[\u0900-\u097F]/.test(word)) return word;

  const map: Record<string, string> = {
    ksh: 'क्ष', tr: 'त्र', gy: 'ज्ञ', sh: 'श', chh: 'छ', ch: 'च',
    kh: 'ख', gh: 'घ', jh: 'झ', th: 'थ', dh: 'ध', ph: 'फ', bh: 'भ',
    aa: 'आ', ee: 'ई', oo: 'ऊ', ai: 'ऐ', au: 'औ',
    k: 'क', g: 'ग', j: 'ज', t: 'त', d: 'द', n: 'न', p: 'प', b: 'ब',
    m: 'म', y: 'य', r: 'र', l: 'ल', v: 'व', w: 'व', s: 'स', h: 'ह',
    a: 'अ', i: 'इ', u: 'उ', e: 'ए', o: 'ओ'
  };
  let res = '';
  let idx = 0;
  while (idx < lower.length) {
    let matched = false;
    for (const len of [3, 2, 1]) {
      const sub = lower.slice(idx, idx + len);
      if (map[sub]) {
        const isVowel = ['aa', 'ee', 'oo', 'ai', 'au', 'a', 'i', 'u', 'e', 'o'].includes(sub);
        if (isVowel && idx > 0) {
          const matraMap: Record<string, string> = {
            aa: 'ा', a: '', i: 'ि', ee: 'ी', u: 'ु', oo: 'ू', e: 'े', ai: 'ै', o: 'ो', au: 'ौ'
          };
          res += matraMap[sub] ?? '';
        } else {
          res += map[sub];
        }
        idx += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      res += lower[idx];
      idx++;
    }
  }
  return res || word;
}

export function trStudentName(name: string, uiLang: UILang): string {
  if (!name) return '';
  if (uiLang === 'en') {
    for (const [en, hi] of Object.entries(STUDENT_NAME_HI_MAP)) {
      if (hi === name) return en;
    }
    return name;
  }
  if (STUDENT_NAME_HI_MAP[name]) {
    return STUDENT_NAME_HI_MAP[name];
  }
  return name
    .split(/\s+/)
    .map((part) => phoneticLatinToDevanagari(part))
    .join(' ');
}

export function trStudentInitials(name: string, initials: string | undefined, uiLang: UILang): string {
  if (uiLang === 'en') {
    return initials || name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  const hiName = trStudentName(name, 'hi');
  const parts = hiName.trim().split(/\s+/);
  const getFirstSyllable = (w: string) => {
    const match = w.match(/^[\u0900-\u097F][\u093E-\u094C\u0901-\u0903]?/);
    return match ? match[0] : w.slice(0, 1);
  };
  return getFirstSyllable(parts[0] || 'छ');
}

export function trLanguage(lang: string, uiLang: UILang): string {
  if (uiLang === 'en') return lang;
  const map: Record<string, string> = {
    'Ho': 'हो',
    'Mundari': 'मुंडारी',
    'Santhali': 'संथाली',
    'Kurukh': 'कुड़ुख',
    'Kharia': 'खड़िया',
    'Hindi': 'हिन्दी',
    'All': 'सभी भाषाएं',
  };
  return map[lang] || lang;
}

export function trScript(script: string | undefined, uiLang: UILang): string {
  if (!script) return '';
  if (uiLang === 'en') return script;
  const map: Record<string, string> = {
    'Warang Chiti': 'वारंग क्षिति लिपि',
    'Warang Chiti (𑢹𑣉𑣉)': 'वारंग क्षिति लिपि (𑢹𑣉𑣉)',
    'Warang Chiti & Hindi Bridge': 'वारंग क्षिति एवं हिन्दी सेतु',
    'Warang Chiti Numerals': 'वारंग क्षिति संख्यांक',
    'Visual Math Manipulatives': 'सचित्र गणितीय अभ्यास',
    'Warang Chiti & Devanagari': 'वारंग क्षिति एवं देवनागरी',
    'Ho Numeracy Manipulatives': 'हो संख्यात्मक अभ्यास',
    'Devanagari': 'देवनागरी लिपि',
    'Devanagari (मुंडारी ध्वनि)': 'देवनागरी (मुंडारी ध्वनि)',
    'Mundari Bilingual Numerals': 'मुंडारी द्विभाषी संख्यांक',
    'Devanagari Mundari & Hindi': 'देवनागरी मुंडारी एवं हिन्दी',
    'Bilingual Prose': 'द्विभाषी गद्य पठन',
    'Applied FLN Numeracy': 'व्यावहारिक संख्या ज्ञान',
    'Ol Chiki': 'ओल चिकी लिपि',
    'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)': 'ओल चिकी लिपि (ᱚᱞ ᱪᱤᱠᱤ)',
    'Ol Chiki Numerals': 'ओल चिकी संख्यांक',
    'Ol Chiki & Romanized Santhali': 'ओल चिकी एवं संथाली उच्चारण',
    'Ol Chiki & Devanagari': 'ओल चिकी एवं देवनागरी',
    'Bilingual Applied Numeracy': 'द्विभाषी व्यावहारिक गणित',
    'Devanagari / Tolong Siki': 'देवनागरी / तोलोंग सिकी लिपि',
  };
  return map[script] || script
    .replace(/Warang Chiti/gi, 'वारंग क्षिति')
    .replace(/Ol Chiki/gi, 'ओल चिकी')
    .replace(/Devanagari/gi, 'देवनागरी');
}

export function trGrade(grade: string, uiLang: UILang): string {
  if (!grade) return '';
  if (uiLang === 'en') return grade;
  return grade
    .replace(/Grades\s+/gi, 'कक्षा ')
    .replace(/Grade\s+/gi, 'कक्षा ')
    .replace(/Class\s+/gi, 'कक्षा ');
}

export function trSubject(subject: string, uiLang: UILang): string {
  if (uiLang === 'en') return subject;
  const map: Record<string, string> = {
    'Literacy': 'साक्षरता',
    'Numeracy': 'संख्या ज्ञान',
    'Vocabulary': 'शब्दावली',
    'Oral Assessment': 'मौखिक मूल्यांकन',
    'Folklore': 'लोककथा व संस्कृति',
    'All': 'सभी विषय',
  };
  return map[subject] || subject;
}

export function trWorksheetType(type: string, uiLang: UILang): string {
  if (uiLang === 'en') {
    const enMap: Record<string, string> = {
      'tracing': 'Script Tracing',
      'matching': 'Picture-Word Matching',
      'counting': 'Counting & Numeracy',
      'math-visual': 'Visual Math',
      'fill-blank': 'Fill in the Blanks',
    };
    return enMap[type] || type;
  }
  const hiMap: Record<string, string> = {
    'tracing': 'वर्ण आरेखन (ट्रेसिंग)',
    'matching': 'चित्र-शब्द मिलान',
    'counting': 'गिनती एवं संख्या ज्ञान',
    'math-visual': 'सचित्र गणित अभ्यास',
    'fill-blank': 'रिक्त स्थान पूर्ति',
  };
  return hiMap[type] || type;
}

export function trSkillLevel(level: string, uiLang: UILang): string {
  if (uiLang === 'en') {
    const enMap: Record<string, string> = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'Foundational': 'Foundational',
      'Emerging': 'Emerging',
      'Proficient': 'Proficient',
    };
    return enMap[level] || level;
  }
  const hiMap: Record<string, string> = {
    'beginner': 'प्रारंभिक स्तर',
    'intermediate': 'मध्यम स्तर',
    'advanced': 'उन्नत स्तर',
    'Foundational': 'बुनियादी स्तर',
    'Emerging': 'उभरता स्तर',
    'Proficient': 'दक्ष स्तर',
  };
  return hiMap[level] || level;
}

const WORKSHEET_DESC_HI_MAP: Record<string, string> = {
  'w_ho_1': 'दिशात्मक रेखाओं और हिन्दी ध्वन्यात्मक संकेतों के साथ बुनियादी वारंग क्षिति व्यंजनों (𑢹, 𑢶, 𑢱, 𑢷) के लेखन का अभ्यास करें।',
  'w_ho_2': 'हो भाषा के वन्यजीवों—बाघ (कुल 𑢱𑣃𑣚), हाथी (हाती 𑢹𑣁𑣎𑣂) और मोर (मारा 𑢶𑣁𑢜𑣁)—के नामों का चित्र संकेतों से मिलान करें।',
  'w_ho_3': 'द्विभाषी संख्या नामों के साथ हो संख्यांकों (𑣑, 𑣡, 𑣁, 𑣂, 𑣃) में जंगल के पेड़ों, पक्षियों और तीरों की गिनती करें।',
  'w_ho_4': 'कोल्हान के गाँवों में मागे पर्व के अवसर पर बजाए जाने वाले दमा, दुमंग और रूतू बाँसुरी वाद्यों की सचित्र जोड़ समस्याएं।',
  'w_ho_5': 'मानसून की बारिश, धान के बीजों और देशाउली सरना प्रार्थना से जुड़े हो भाषा के शब्दों से रिक्त स्थान भरें।',
  'w_ho_6': 'हो और हिन्दी में तीरों के गट्ठर (सार-आ) और निशाने के अंकों की गणना करने वाले व्यावहारिक गणितीय प्रश्न हल करें।',
  'w_mun_1': 'गाँव की शब्दावली (आतु, सरजोम, दाः, पुथी) के साथ मुंडारी की मूल ध्वनियों (अ, स, द, प) का अक्षर लेखन अभ्यास।',
  'w_mun_2': 'बिंदु कार्डों की सहायता से मुंडारी संख्याओं (मियाद, बारिया, आपेया, उपुनया, मोड़ेया) में सखुआ बीज और बेर फलों की गिनती।',
  'w_mun_3': 'मुंडारी शब्दों (सरजोम, दाः, सिंगी, बुरु, पुथी) को चित्रों और उनके हिन्दी अर्थों के साथ जोड़ें।',
  'w_mun_4': 'सरहुल और करम उत्सव में बजाए जाने वाले नगाड़ा, ढोल और मादल वाद्यों की गिनती व सचित्र जोड़ का अभ्यास।',
  'w_mun_5': 'खूंटी जिले के उलिहातू में जन्मे धरती आबा बिरसा मुंडा के जीवन पर आधारित वाक्यों में रिक्त स्थान भरें।',
  'w_mun_6': 'साप्ताहिक ग्रामीण हाट में मिट्टी के बर्तनों, बाँस की चटाई और सरसों तेल के मूल्य की गणना के व्यावहारिक प्रश्न।',
  'w_san_1': 'हिन्दी ध्वनि मार्गदर्शन के साथ ओल चिकी लिपि के बुनियादी अक्षरों (ᱚ, ᱛ, ᱜ, ᱝ) के लेखन का अभ्यास करें।',
  'w_san_2': 'हिन्दी अंकों और बिंदु चिह्नों के साथ ओल चिकी संख्यांकों (᱑, ᱒, ᱓, ᱔, ᱕) को पहचानें और रंग भरें।',
  'w_san_3': 'सोहराय पर्व में सजे हुए गाय-बैलों, पीतल की घंटियों और दीवार के सोहराय भित्तिचित्रों की गिनती कर जोड़ें।',
  'w_san_4': 'संथाली शब्दों (ᱫᱟᱨᱮ दारे, ᱫᱟᱜ दाग, ᱯᱩᱛᱷᱤ पुथी, ᱵᱟᱦᱟ बाहा) का हिन्दी अर्थों और चित्रों से मिलान करें।',
  'w_san_5': 'हिहिड़ी पिपिड़ी, हंस के अंडों और मरांग बुरु से जुड़ी संथाल उत्पत्ति लोककथा के रिक्त स्थानों की पूर्ति करें।',
  'w_san_6': 'पारंपरिक अनाज मापन इकाइयों (पउरा, काठी, तेवा) और वितरण के बाद बचे धान के बोरों का घटाव हल करें।',
};

export function trWorksheetTitle(ws: Pick<WorksheetItem, 'id' | 'title' | 'titleHindi'>, uiLang: UILang): string {
  if (uiLang === 'en') {
    return ws.title;
  }
  if (ws.titleHindi) {
    return ws.titleHindi
      .replace(/\(Ho\)/gi, '(हो)')
      .replace(/\(Mundari\)/gi, '(मुंडारी)')
      .replace(/\(Santhali\)/gi, '(संथाली)')
      .replace(/Grade\s+(\d+)/gi, 'कक्षा $1');
  }
  return ws.title
    .replace(/FLN Diagnostic Remediation:/gi, 'निदानात्मक उपचारात्मक अभ्यास:')
    .replace(/Ho/g, 'हो')
    .replace(/Mundari/g, 'मुंडारी')
    .replace(/Santhali/g, 'संथाली');
}

export function trWorksheetDesc(ws: Pick<WorksheetItem, 'id' | 'description' | 'languages' | 'subject'>, uiLang: UILang): string {
  if (uiLang === 'en') {
    return ws.description;
  }
  if (WORKSHEET_DESC_HI_MAP[ws.id]) {
    return WORKSHEET_DESC_HI_MAP[ws.id];
  }
  const langsHi = (ws.languages || []).map(l => trLanguage(l, 'hi')).join(', ');
  const subjHi = trSubject(ws.subject || 'Literacy', 'hi');
  if (ws.description.includes('Targeted bilingual practice')) {
    return `${langsHi} और हिन्दी सेतु शिक्षण के लिए लक्षित द्विभाषी ${subjHi} अभ्यास कार्यपत्रक।`;
  }
  if (ws.description.includes('Personalized')) {
    return `${langsHi} मातृभाषा और हिन्दी सेतु पठन कौशल के लिए व्यक्तिगत निपुण भारत अभ्यास कार्यपत्रक।`;
  }
  return `${langsHi} और हिन्दी माध्यम में निपुण भारत संरेखित इंटरैक्टिव द्विभाषी ${subjHi} अभ्यास कार्यपत्रक।`;
}

export function trAssignedWorksheetTitle(title: string, titleHindi: string | undefined, uiLang: UILang): string {
  if (uiLang === 'en') return title;
  if (titleHindi) {
    let res = titleHindi;
    for (const [en, hi] of Object.entries(STUDENT_NAME_HI_MAP)) {
      res = res.replace(en, hi);
    }
    return res;
  }
  return title;
}

export function trAssignedDate(dateStr: string | undefined, uiLang: UILang): string {
  if (!dateStr) return '';
  if (uiLang === 'en') return dateStr;
  const map: Record<string, string> = {
    'Today': 'आज',
    'Just now': 'अभी-अभी',
    'Yesterday': 'कल',
    '1 day ago': '1 दिन पहले',
    '2 days ago': '2 दिन पहले',
    '3 days ago': '3 दिन पहले',
    '4 days ago': '4 दिन पहले',
    '5 days ago': '5 दिन पहले',
    '6 days ago': '6 दिन पहले',
    '1 week ago': '1 सप्ताह पहले',
    '2 weeks ago': '2 सप्ताह पहले',
  };
  if (map[dateStr]) return map[dateStr];
  return dateStr
    .replace(/\bJan\b/gi, 'जनवरी')
    .replace(/\bFeb\b/gi, 'फ़रवरी')
    .replace(/\bMar\b/gi, 'मार्च')
    .replace(/\bApr\b/gi, 'अप्रैल')
    .replace(/\bMay\b/gi, 'मई')
    .replace(/\bJun\b/gi, 'जून')
    .replace(/\bJul\b/gi, 'जुलाई')
    .replace(/\bAug\b/gi, 'अगस्त')
    .replace(/\bSep\b/gi, 'सितंबर')
    .replace(/\bOct\b/gi, 'अक्टूबर')
    .replace(/\bNov\b/gi, 'नवंबर')
    .replace(/\bDec\b/gi, 'दिसंबर')
    .replace(/days ago/gi, 'दिन पहले')
    .replace(/day ago/gi, 'दिन पहले')
    .replace(/weeks ago/gi, 'सप्ताह पहले')
    .replace(/week ago/gi, 'सप्ताह पहले');
}

const STUDENT_NOTES_HI_MAP: Record<string, string> = {
  'Excels at oral storytelling in Santhali; developing confidence reading Ol Chiki vowels and Devanagari consonants.':
    'संथाली में मौखिक कहानी सुनाने में उत्कृष्ट; ओल चिकी स्वरों और देवनागरी व्यंजनों को पढ़ने में आत्मविश्वास बढ़ रहा है।',
  'Needs phonics reinforcement for initial consonant sounds in Ho and basic Hindi picture-vocabulary pairing.':
    'हो भाषा में प्रारंभिक व्यंजन ध्वनियों और बुनियादी हिन्दी चित्र-शब्दावली मिलान के लिए अतिरिक्त ध्वनि अभ्यास की आवश्यकता है।',
  'Fluent bilingual reader in Mundari and Hindi; ready for multi-step addition and subtraction word problems.':
    'मुंडारी और हिन्दी में धाराप्रवाह द्विभाषी पाठक; बहु-चरणीय जोड़ और घटाव के व्यावहारिक प्रश्नों के लिए पूर्णतः तैयार।',
  'Requires concrete manipulatives (beads, pebbles) for number sense 1-10; benefits from Santhali counting chants.':
    '1 से 10 तक संख्या ज्ञान के लिए मूर्त वस्तुओं (मोती, कंकड़) की आवश्यकता है; संथाली गिनती गीतों से तेजी से सीखती है।',
  'Very vocal in Ho; shows steady improvement converting Ho numbers to Hindi written numerals.':
    'हो भाषा में मुखर अभिव्यक्ति; हो संख्याओं को लिखित हिन्दी अंकों में बदलने में निरंतर सुधार दिख रहा है।',
  'Good grasp of bilingual classroom instructions; working on reading short paragraphs independently.':
    'द्विभाषी कक्षा निर्देशों की अच्छी समझ; छोटे अनुच्छेदों को स्वतंत्र रूप से पढ़ने का अभ्यास कर रही है।',
};

export function trStudentNotes(notes: string | undefined, uiLang: UILang): string {
  if (!notes) return '';
  if (uiLang === 'en') return notes;
  if (STUDENT_NOTES_HI_MAP[notes]) return STUDENT_NOTES_HI_MAP[notes];
  if (notes.includes('Enrolled in PALASH MTB-MLE')) {
    return 'पलाश मातृभाषा आधारित बहुभाषी शिक्षण कार्यक्रम के बुनियादी समूह में नामांकित।';
  }
  return notes;
}

export function trFlnSkillName(skill: { id: string; name: string; hindiName?: string; nameHindi?: string }, uiLang: UILang): string {
  if (uiLang === 'en') return skill.name;
  const rawHi = skill.hindiName || skill.nameHindi || skill.name;
  return rawHi
    .replace(/\(Ol Chiki \/ Warang Chiti \/ Devanagari\)/gi, '(ओल चिकी / वारंग क्षिति / देवनागरी)')
    .replace(/\(Ho, Mundari, Santhali\)/gi, '(हो, मुंडारी, संथाली)')
    .replace(/\(Tribal-to-Hindi Transition\)/gi, '(मातृभाषा से हिन्दी सेतु)');
}

const STORY_SUBTITLE_HI_MAP: Record<string, string> = {
  'c1': 'संथाल समुदाय की पवित्र सरना (जाहेर थान) प्रकृति उपासना परंपरा की प्रेरक कहानी',
  'c2': 'प्रकृति और अच्छी फसल के उत्सव में गाए जाने वाले पारंपरिक करम नृत्य लोकगीत',
  'c3': 'नई कोंपलों और कृषि समृद्धि का स्वागत करने वाली वसंतकालीन सरहुल लोकगाथा',
  'c4': 'बुनियादी संख्या ज्ञान और एकाग्रता के लिए इंटरैक्टिव जंगल पहेलियाँ एवं तीरंदाजी खेल',
  'c5': 'ओल चिकी और हिन्दी में फसल कटाई एवं पशुधन आभार का पवित्र सोहराय लोकगीत',
  'c6': 'हिहिड़ी पिपिड़ी में मानवता की उत्पत्ति की प्राचीन संथाल लोकगाथा',
  'c7': 'सखुआ (साल) के खिलते फूलों और वसंत के आगमन का सामूहिक बाहा लोकगीत',
  'c8': 'फसल कटाई के बाद नवचेतना का संदेश देने वाला हो जनजाति का प्रमुख मागे पर्व गीत',
  'c9': 'अंकुरित होते बीजों और समय पर मानसून वर्षा के लिए पारंपरिक हेरो पर्व लोकगाथा',
  'c10': 'हो भाषा में पशु-पक्षियों के नाम और गिनती सिखाने वाला मनोरंजक बाल-गीत',
  'c11': 'नई पत्तियों के स्वागत में मुंडा युवाओं द्वारा गाया जाने वाला लयबद्ध जादुर वसंत गीत',
  'c12': 'धरती आबा बिरसा मुंडा के साहस, स्वाभिमान और उलगुलान की ऐतिहासिक वीरगाथा',
  'c13': 'ईमानदारी, मिल-बांटकर खाने और सहानुभूति की सीख देने वाली मुंडारी नैतिक लोककथा',
  'c14': 'अतिथियों और रिश्तेदारों के स्वागत में गाया जाने वाला शीतकालीन मागे फसल उत्सव गीत',
  'c15': 'प्राथमिक संख्या ज्ञान के लिए साप्ताहिक ग्रामीण हाट खरीदारी और सिक्कों की गिनती का खेल',
  'c16': 'ओल चिकी और वारंग क्षिति शब्दों को पशु चित्रों से जोड़ने वाला स्पर्शनीय कार्ड मिलान खेल',
  'c17': 'बायां-दायां दिशा ज्ञान और कदमों की गिनती सिखाने वाला पारंपरिक बाँस गेदी दौड़ खेल',
  'c18': 'कदमों में दूरी मापन और टीम के अंकों का जोड़ सिखाने वाला संथाली काटी चक्र खेल',
  'c19': 'मिट्टी पर बनी रेखाओं पर खेला जाने वाला पारंपरिक बाघ-बकरी (कुल-मेरोम) ज्यामितीय तर्क खेल',
};

export function trStoryTitle(story: CulturalStory, uiLang: UILang): string {
  if (uiLang === 'en') return story.titleEnglish || story.titleHindi;
  return story.titleHindi;
}

export function trStorySubtitle(story: CulturalStory, uiLang: UILang): string {
  if (uiLang === 'en') return story.subtitle;
  if (STORY_SUBTITLE_HI_MAP[story.id]) return STORY_SUBTITLE_HI_MAP[story.id];
  if (story.contentHindi) return story.contentHindi.slice(0, 95) + '...';
  return `${trLanguage(story.language, 'hi')} भाषा की पारंपरिक शैक्षिक सामग्री`;
}

export function trStoryType(type: string, uiLang: UILang): string {
  if (uiLang === 'en') return type;
  const map: Record<string, string> = {
    'Story': 'कहानी',
    'story': 'कहानी',
    'Song': 'लोकगीत',
    'song': 'लोकगीत',
    'Folklore': 'लोकगाथा',
    'Game': 'शैक्षणिक खेल',
    'riddle': 'पहेली',
  };
  return map[type] || type;
}

export function trStoryDuration(duration: string, uiLang: UILang): string {
  if (uiLang === 'en') return duration;
  return duration
    .replace(/\bmins?\b/gi, 'मिनट')
    .replace(/\bpages?\b/gi, 'पृष्ठ')
    .replace(/\bsecs?\b/gi, 'सेकंड')
    .replace(/\bInteractive\b/gi, 'इंटरएक्टिव');
}
