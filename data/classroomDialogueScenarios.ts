import type { ClassroomDialogueScenario } from '../types.ts';

export const CLASSROOM_DIALOGUE_SCENARIOS: ClassroomDialogueScenario[] = [
  {
    id: 'sc_greeting',
    title: 'Morning Greeting & Well-being',
    titleHindi: 'सुबह की प्रार्थना एवं जोहार संवाद',
    category: 'Greeting',
    teacherPromptHindi: 'नमस्ते बच्चों, आज आप सब कैसे हैं?',
    teacherPromptEnglish: 'Hello children, how are you all today?',
    expectedStudentReplyHindi: 'जोहार गुरुजी! हम सब बहुत अच्छे और खुश हैं।',
    expectedStudentReplyEnglish: 'Johar Guruji! We are all fine and happy.',
    dialoguePairs: [
      {
        speaker: 'teacher',
        hindi: 'नमस्ते बच्चों, आज आप सब कैसे हैं?',
        english: 'Hello children, how are you all today?',
        santhali: {
          script: 'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱯᱮ ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱜ ᱯᱮᱭᱟ?',
          roman: 'Johar gidra ko, tehenj ape ched leka menag peya?',
          phonetic: 'जोहार गिदरा को, तेहेंज आपे चेद लेका मेनाग पेया?'
        },
        ho: {
          script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢡𑣂𑣁𑣜𑣂 𑢡𑣃𑣜𑣂𑣑 𑢶𑣂𑣓𑣂 𑢥𑣂?',
          roman: 'Hon ko, ape bugin mena pe chi?',
          phonetic: 'होन को, आपे बुगिन मेना पे चि?'
        },
        mundari: {
          script: 'होन्को, आपे बुगीगे मेनापेया चि?',
          roman: 'Honko, ape bugige menapeya chi?',
          phonetic: 'होन्को, आपे बुगीगे मेनापेया चि?'
        }
      },
      {
        speaker: 'student',
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
        }
      }
    ]
  },
  {
    id: 'sc_numeracy',
    title: 'FLN Numeracy: Counting 1 to 5',
    titleHindi: 'संख्या ज्ञान: १ से ५ तक सामूहिक गिनती',
    category: 'Numeracy',
    teacherPromptHindi: 'बच्चों, चलो सब मिलकर 1 से 5 तक गिनती करें।',
    teacherPromptEnglish: 'Children, let us count together from 1 to 5.',
    expectedStudentReplyHindi: 'एक, दो, तीन, चार, पांच! हमने सीख लिया गुरुजी।',
    expectedStudentReplyEnglish: 'One, two, three, four, five! We learned it Guruji.',
    dialoguePairs: [
      {
        speaker: 'teacher',
        hindi: 'बच्चों, चलो सब मिलकर 1 से 5 तक गिनती करें।',
        english: 'Children, let us count together from 1 to 5.',
        santhali: {
          script: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱫᱮᱞᱟ ᱵᱚᱱ ᱢᱤᱫ ᱠᱷᱚᱱ ᱢᱚᱬᱮ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ᱾',
          roman: 'Gidra ko, dela bon mid khon mone habij lekha bon.',
          phonetic: 'गिदरा को, देला बोन मिद खोन मोड़े हाबीज लेखा बोन।'
        },
        ho: {
          script: '𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉, 𑢖𑣂𑣑 𑢷𑣂𑣑 𑢶𑣉𑣗𑣂 𑢵𑣂𑣓𑣂𑣑 𑢚𑣂𑣱𑣁 𑢡𑣃᱾',
          roman: 'Hon ko, miyad ete moya lekhaye bu.',
          phonetic: 'होन को, मियाद एते मोया लेखाये बु।'
        },
        mundari: {
          script: 'होन्को, मियाद एते मोड़े लेके लेखा लेबु।',
          roman: 'Honko, miyad ete more leke lekha lebu.',
          phonetic: 'होन्को, मियाद एते मोड़े लेके लेखा लेबु।'
        }
      },
      {
        speaker: 'student',
        hindi: 'एक, दो, तीन, चार, पांच!',
        english: 'One, two, three, four, five!',
        santhali: {
          script: 'ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱩᱱ, ᱢᱚᱬᱮ!',
          roman: 'Mid, bar, pe, pun, mone!',
          phonetic: 'मिद, बार, पे, पुन, मोड़े!'
        },
        ho: {
          script: '𑢖𑣂𑣑, 𑢡𑣁𑣜, 𑢵𑣂, 𑢃𑣥𑣃𑣓, 𑢶𑣉𑣗𑣂!',
          roman: 'Miyad, bar, ape, upun, moya!',
          phonetic: 'मियाद, बार, अपे, उपुन, मोया!'
        },
        mundari: {
          script: 'मियाद, बारिया, अपिया, उपुनिया, मोड़े!',
          roman: 'Miyad, bariya, apiya, upuniya, more!',
          phonetic: 'मियाद, बारिया, अपिया, उपुनिया, मोड़े!'
        }
      }
    ]
  },
  {
    id: 'sc_books',
    title: 'Classroom Instruction: Open Books',
    titleHindi: 'कक्षा निर्देश: किताबें निकालो और खोलो',
    category: 'Literacy',
    teacherPromptHindi: 'सब बच्चे अपनी-अपनी किताब निकालो और पहला पन्ना खोलो।',
    teacherPromptEnglish: 'All children, take out your books and open the first page.',
    expectedStudentReplyHindi: 'जी गुरुजी, हमने अपनी किताब खोल ली है।',
    expectedStudentReplyEnglish: 'Yes Guruji, we have opened our books.',
    dialoguePairs: [
      {
        speaker: 'teacher',
        hindi: 'सब बच्चे अपनी-अपनी किताब निकालो और पहला पन्ना खोलो।',
        english: 'All children, take out your books and open the first page.',
        santhali: {
          script: 'ᱥᱟᱱᱟᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱚᱰᱚᱠ ᱯᱮ ᱟᱨ ᱯᱩᱭᱞᱩ ᱥᱟᱠᱟᱢ ᱡᱷᱤᱡ ᱯᱮ᱾',
          roman: 'Sanam gidra apeyag puthi odok pe ar puylu sakam jhij pe.',
          phonetic: 'सानाम गिदरा आपेयाग पुथी ओडोक पे आर पुयलु साकाम झीज पे।'
        },
        ho: {
          script: '𑢷𑣉𑣡𑣂 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢥𑣉𑣕𑣂 𑢵𑣂𑣑𑣉𑣱 𑢥𑣂 𑢵𑢷𑣉 𑢷𑣁𑣱𑣁𑣖 𑢵𑣂𑣓𑣂𑣑 𑢖𑣄𑣂᱾',
          roman: 'Sobe hon ko pothi urung pe odo sakam ughao me.',
          phonetic: 'सोबे होन को पोथी उरुंग पे ओदो साकाम उघाओ मे।'
        },
        mundari: {
          script: 'सोबेन होन्को पुथी ओड़ोंगपे ओन्दो सिदंग साकम निड़ाएपे।',
          roman: 'Soben honko puthi orongpe ondo sidang sakam niraepe.',
          phonetic: 'सोबेन होन्को पुथी ओड़ोंगपे ओन्दो सिदंग साकम निड़ाएपे।'
        }
      },
      {
        speaker: 'student',
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
        }
      }
    ]
  },
  {
    id: 'sc_care',
    title: 'Student Permission: Water Break',
    titleHindi: 'छात्र अनुमति: पानी पीने जाना',
    category: 'Care',
    teacherPromptHindi: 'हाँ बेटा, जाकर पानी पी लो और जल्दी वापस आना।',
    teacherPromptEnglish: 'Yes child, go drink water and come back quickly.',
    expectedStudentReplyHindi: 'गुरुजी, क्या मैं बाहर पानी पीने जा सकता हूँ?',
    expectedStudentReplyEnglish: 'Guruji, may I go outside to drink water?',
    dialoguePairs: [
      {
        speaker: 'student',
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
        }
      },
      {
        speaker: 'teacher',
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
    ]
  },
  {
    id: 'sc_praise',
    title: 'Teacher Praise & Assessment',
    titleHindi: 'शिक्षक प्रशंसा एवं शाबाशी',
    category: 'Praise',
    teacherPromptHindi: 'बहुत अच्छा बच्चों! आपने बिल्कुल सही जवाब दिया, शाबाश!',
    teacherPromptEnglish: 'Very good children! You gave the correct answer, well done!',
    expectedStudentReplyHindi: 'धन्यवाद गुरुजी! हम रोज़ मन लगाकर पढ़ेंगे।',
    expectedStudentReplyEnglish: 'Thank you Guruji! We will study hard every day.',
    dialoguePairs: [
      {
        speaker: 'teacher',
        hindi: 'बहुत अच्छा बच्चों! आपने बिल्कुल सही जवाब दिया, शाबाश!',
        english: 'Very good children! You gave the correct answer, well done!',
        santhali: {
          script: 'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ! ᱟᱯᱮ ᱴᱷᱤᱠ ᱨᱚᱲ ᱠᱮᱫᱼᱟ, ᱥᱟᱨᱦᱟᱣ!',
          roman: 'Aadi napay gidra ko! Ape thik ror ked-a, sarhaw!',
          phonetic: 'आडी नापाय गिदरा को! आपे ठीक रोड़ केद-आ, सारहाव!'
        },
        ho: {
          script: '𑢡𑣃𑣜𑣂𑣑 𑢡𑣂𑢷𑣁𑣖 𑢹𑣉𑣉 𑢷𑣉𑣑 𑢱𑣉! 𑢡𑣂𑣁𑣜𑣂 𑢷𑣁𑣜𑣂 𑢱𑣁𑣓𑣁᱾',
          roman: 'Bugite hon ko! Ape thik kaji keda, sarhaw!',
          phonetic: 'बुगिते होन को! आपे ठीक काजी केदा, सारहाव!'
        },
        mundari: {
          script: 'बहुत बुगी होन्को! आपे ठीक काजीकेदा, जोहार!',
          roman: 'Bahut bugi honko! Ape thik kajikeda, sarhaw!',
          phonetic: 'बहुत बुगी होन्को! आपे ठीक काजीकेदा, सारहाव!'
        }
      },
      {
        speaker: 'student',
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
        }
      }
    ]
  }
];
