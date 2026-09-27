import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Trophy, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Target, 
  HelpCircle, 
  Layers,
  Award,
  Star,
  ChevronRight,
  Footprints,
  Shield
} from 'lucide-react';
import { TribalLanguage } from '../types';
import { gameAudio } from '../utils/gameAudio';
import { GediStiltGame } from './GediStiltGame';
import { KatiDiscStrikeGame } from './KatiDiscStrikeGame';
import { KulMeromBoardGame } from './KulMeromBoardGame';

export interface InteractiveGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGameId?: string;
  uiLang: 'en' | 'hi';
}

type GameTab = 'market' | 'matching' | 'riddles' | 'archery' | 'gedi' | 'kati' | 'kulmerom' | 'folklore_games';

interface MarketItem {
  id: string;
  nameHindi: string;
  nameTribal: string;
  scriptGlyph: string;
  icon: string;
  price: number;
}

interface MatchCard {
  id: string;
  type: 'image' | 'word';
  pairId: string;
  content: string;
  subContent?: string;
  icon?: string;
  soundText?: string;
}

const resolveInitialTab = (id: string): GameTab => {
  if (id === 'c15' || id.includes('market')) return 'market';
  if (id === 'c16' || id.includes('match')) return 'matching';
  if (id === 'c4' || id.includes('archery')) return 'archery';
  if (id.includes('riddle')) return 'riddles';
  if (id === 'c17' || id.includes('gedi') || id.includes('stilt')) return 'gedi';
  if (id === 'c18' || id.includes('kati') || id.includes('disc')) return 'kati';
  if (id === 'c19' || id.includes('kul') || id.includes('merom') || id.includes('tiger')) return 'kulmerom';
  if (id.includes('traditional') || id.includes('lore') || id.startsWith('g')) return 'folklore_games';
  return 'market';
};

export const InteractiveGamesModal: React.FC<InteractiveGamesModalProps> = ({
  isOpen,
  onClose,
  initialGameId = 'market',
  uiLang
}) => {
  const [activeTab, setActiveTab] = useState<GameTab>(resolveInitialTab(initialGameId));

  useEffect(() => {
    if (initialGameId) {
      setActiveTab(resolveInitialTab(initialGameId));
    }
  }, [initialGameId, isOpen]);

  const [selectedLanguage, setSelectedLanguage] = useState<TribalLanguage>('Ho');
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(3);

  // -------------------------------------------------------------
  // GAME 1: HAAT-BAZAAR MARKET MATH STATE
  // -------------------------------------------------------------
  const [basket, setBasket] = useState<MarketItem[]>([]);
  const [marketRound, setMarketRound] = useState(1);
  const [marketFeedback, setMarketFeedback] = useState<string | null>(null);

  const marketItems: MarketItem[] = [
    { 
      id: 'm1', 
      nameHindi: 'आलू', 
      nameTribal: selectedLanguage === 'Ho' ? 'Alu (𑢡𑣚𑣃)' : selectedLanguage === 'Mundari' ? 'Alu (आलू)' : 'Alu (ᱟᱹᱞᱩ)', 
      scriptGlyph: selectedLanguage === 'Ho' ? '𑢡𑣚𑣃' : selectedLanguage === 'Mundari' ? 'आलू' : 'ᱟᱹᱞᱩ',
      icon: '🥔', 
      price: 2 
    },
    { 
      id: 'm2', 
      nameHindi: 'बैंगन', 
      nameTribal: selectedLanguage === 'Ho' ? 'Benga (𑢡𑣂𑢱𑣉)' : selectedLanguage === 'Mundari' ? 'Benga (बेंगड़ा)' : 'Bengar (ᱵᱮᱸᱜᱟᱲ)', 
      scriptGlyph: selectedLanguage === 'Ho' ? '𑢡𑣂𑢱𑣉' : selectedLanguage === 'Mundari' ? 'बेंगड़ा' : 'ᱵᱮᱸᱜᱟᱲ',
      icon: '🍆', 
      price: 3 
    },
    { 
      id: 'm3', 
      nameHindi: 'आम', 
      nameTribal: selectedLanguage === 'Ho' ? 'Uli (𑢡𑣃𑣚𑣂)' : selectedLanguage === 'Mundari' ? 'Uli (ऊली)' : 'Ul (ᱩᱞ)', 
      scriptGlyph: selectedLanguage === 'Ho' ? '𑢡𑣃𑣚𑣂' : selectedLanguage === 'Mundari' ? 'ऊली' : 'ᱩᱞ',
      icon: '🥭', 
      price: 4 
    },
    { 
      id: 'm4', 
      nameHindi: 'मिट्टी की मटकी', 
      nameTribal: selectedLanguage === 'Ho' ? 'Chukri (𑢨𑣃𑢱𑣜𑣂)' : selectedLanguage === 'Mundari' ? 'Tunki (टुंकी)' : 'Chukri (ᱪᱩᱠᱨᱤ)', 
      scriptGlyph: selectedLanguage === 'Ho' ? '𑢨𑣃𑢱𑣜𑣂' : selectedLanguage === 'Mundari' ? 'टुंकी' : 'ᱪᱩᱠᱨᱤ',
      icon: '🏺', 
      price: 5 
    }
  ];

  // Target task for Market Math
  const marketTasks = [
    { targetAlu: 2, targetUli: 2, expectedTotalQty: 4, expectedCost: 12, promptHindi: 'टोकरी में २ आलू और २ आम डालें। कुल कितनी वस्तुएं हुईं?' },
    { targetAlu: 1, targetBenga: 2, expectedTotalQty: 3, expectedCost: 8, promptHindi: '१ आलू और २ बैंगन खरीदें। कुल कितने रुपये हुए?' },
    { targetUli: 3, targetChukri: 1, expectedTotalQty: 4, expectedCost: 17, promptHindi: '३ आम और १ मटकी टोकरी में रखें। कुल सामान गिनें।' }
  ];
  const currentTask = marketTasks[(marketRound - 1) % marketTasks.length];

  const handleAddToBasket = (item: MarketItem) => {
    gameAudio.playClick();
    setBasket([...basket, item]);
  };

  const handleRemoveFromBasket = (index: number) => {
    gameAudio.playClick();
    setBasket(basket.filter((_, idx) => idx !== index));
  };

  const checkMarketTask = () => {
    if (basket.length === currentTask.expectedTotalQty) {
      gameAudio.playSuccess();
      setScore((s) => s + 20);
      setStars((st) => Math.min(st + 1, 5));
      setMarketFeedback('शाबाश! आपने सही सामान चुना। कुल: ' + basket.length + ' वस्तुएं! (+20 Points)');
      setTimeout(() => {
        setBasket([]);
        setMarketRound((r) => r + 1);
        setMarketFeedback(null);
      }, 2000);
    } else {
      gameAudio.playClick();
      setMarketFeedback(`टोकरी में ${basket.length} वस्तुएं हैं, पर लक्ष्य ${currentTask.expectedTotalQty} का है। पुनः प्रयास करें!`);
    }
  };

  // -------------------------------------------------------------
  // GAME 2: WORD & PICTURE MATCHING STATE
  // -------------------------------------------------------------
  const [matchSelection, setMatchSelection] = useState<MatchCard | null>(null);
  const [solvedPairIds, setSolvedPairIds] = useState<string[]>([]);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);

  const rawMatchCards: MatchCard[] = [
    { id: 'img-1', type: 'image', pairId: 'pair-tiger', content: '🐅', subContent: 'बाघ (Tiger)' },
    { id: 'word-1', type: 'word', pairId: 'pair-tiger', content: selectedLanguage === 'Ho' ? '𑢱𑣃𑣚 (Kul)' : selectedLanguage === 'Mundari' ? 'कुल (Kul)' : 'ᱛᱟᱹᱨᱩᱵ (Tarup)', subContent: 'Tiger', soundText: 'Kul' },
    
    { id: 'img-2', type: 'image', pairId: 'pair-peacock', content: '🦚', subContent: 'मोर (Peacock)' },
    { id: 'word-2', type: 'word', pairId: 'pair-peacock', content: selectedLanguage === 'Ho' ? '𑢶𑣁𑢜𑣁 (Mara)' : selectedLanguage === 'Mundari' ? 'मारा (Mara)' : 'ᱢᱟᱨᱟᱜ (Marak)', subContent: 'Peacock', soundText: 'Mara' },

    { id: 'img-3', type: 'image', pairId: 'pair-tree', content: '🌲', subContent: 'सखुआ (Sal Tree)' },
    { id: 'word-3', type: 'word', pairId: 'pair-tree', content: selectedLanguage === 'Ho' ? '𑢯𑣁𑣜𑢰𑣉𑢶 (Sarjom)' : selectedLanguage === 'Mundari' ? 'सरजोम (Sarjom)' : 'ᱥᱟᱨᱡᱚᱢ (Sarjom)', subContent: 'Sal Tree', soundText: 'Sarjom' },

    { id: 'img-4', type: 'image', pairId: 'pair-water', content: '💧', subContent: 'पानी (Water)' },
    { id: 'word-4', type: 'word', pairId: 'pair-water', content: selectedLanguage === 'Ho' ? '𑢨𑣁𑣄 (Daa)' : selectedLanguage === 'Mundari' ? 'दाः (Daah)' : 'ᱫᱟᱜ (Daak)', subContent: 'Water', soundText: 'Daak' }
  ];

  const handleCardClick = (card: MatchCard) => {
    if (solvedPairIds.includes(card.pairId)) return;

    gameAudio.playClick();
    if (card.soundText) {
      gameAudio.speakTribalWord(card.soundText);
    }

    if (!matchSelection) {
      setMatchSelection(card);
    } else {
      if (matchSelection.id === card.id) {
        setMatchSelection(null);
        return;
      }
      if (matchSelection.pairId === card.pairId && matchSelection.type !== card.type) {
        // Matched!
        gameAudio.playSuccess();
        setSolvedPairIds([...solvedPairIds, card.pairId]);
        setScore((s) => s + 25);
        setMatchMessage('अति सुंदर! सही मिलान (+25 Points)');
        setMatchSelection(null);
        setTimeout(() => setMatchMessage(null), 1800);
      } else {
        setMatchMessage('यह मिलान सही नहीं है, दोबारा सोचें!');
        setMatchSelection(null);
        setTimeout(() => setMatchMessage(null), 1500);
      }
    }
  };

  const resetMatching = () => {
    setSolvedPairIds([]);
    setMatchSelection(null);
    setMatchMessage(null);
  };

  // -------------------------------------------------------------
  // GAME 3: FOREST ANIMAL RIDDLES STATE
  // -------------------------------------------------------------
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [riddleFeedback, setRiddleFeedback] = useState<string | null>(null);

  const riddles = [
    {
      question: 'मैं सारंडा वन का सबसे शक्तिशाली जीव हूँ। मेरे शरीर पर काली धारियां हैं और हो भाषा में मुझे "कुल" कहते हैं। बताओ मैं कौन हूँ?',
      questionEnglish: 'I am the striped ruler of Saranda forest. In Ho I am called Kul. Who am I?',
      options: [
        { icon: '🐅', label: 'बाघ (Kul / Tarup)', isCorrect: true },
        { icon: '🐘', label: 'हाथी (Hati)', isCorrect: false },
        { icon: '🦌', label: 'हिरण (Jhilig)', isCorrect: false },
        { icon: '🦚', label: 'मोर (Mara)', isCorrect: false }
      ],
      funFact: 'हो एवं संथाली संस्कृति में बाघ को वन का रक्षक माना जाता है।'
    },
    {
      question: 'जब वर्षा ऋतु आती है, तो मैं अपने सुंदर पंख फैलाकर नाचता हूँ। संथाली में मुझे "माराग" कहते हैं। बताओ मैं कौन हूँ?',
      questionEnglish: 'When monsoon rains arrive, I spread my iridescent feathers to dance. Who am I?',
      options: [
        { icon: '🦜', label: 'तोता (Chende)', isCorrect: false },
        { icon: '🦚', label: 'मोर (Mara / Marak)', isCorrect: true },
        { icon: '🐇', label: 'खरगोश (Kulai)', isCorrect: false },
        { icon: '🐟', label: 'मछली (Haku)', isCorrect: false }
      ],
      funFact: 'मोर के पंखों का उपयोग पारंपरिक करम और मागे नृत्य के मुकुट में किया जाता है।'
    },
    {
      question: 'मेरे बड़े-बड़े कान हैं, लंबी सूंड है और मैं भारी लट्ठे उठाता हूँ। मुंडारी में मुझे "हाती" कहते हैं। बताओ मैं कौन हूँ?',
      questionEnglish: 'I have vast fan-like ears, a mighty trunk and walk gently in Dalma hills. Who am I?',
      options: [
        { icon: '🐻', label: 'भालू (Bana)', isCorrect: false },
        { icon: '🦌', label: 'हिरण (Jhilig)', isCorrect: false },
        { icon: '🐘', label: 'हाथी (Hati)', isCorrect: true },
        { icon: '🐎', label: 'घोड़ा (Sadom)', isCorrect: false }
      ],
      funFact: 'झारखंड के दलमा अभयारण्य में हाथियों के संरक्षण के लिए विशेष गलियारे बनाए गए हैं।'
    }
  ];
  const currentRiddle = riddles[riddleIndex % riddles.length];

  const handleAnswerRiddle = (isCorrect: boolean) => {
    if (isCorrect) {
      gameAudio.playSuccess();
      setScore((s) => s + 30);
      setStars((st) => Math.min(st + 1, 5));
      setRiddleFeedback('वाह! बिल्कुल सही उत्तर (+30 Points)');
      setTimeout(() => {
        setRiddleIndex((i) => i + 1);
        setRiddleFeedback(null);
      }, 2200);
    } else {
      gameAudio.playClick();
      setRiddleFeedback('गलत उत्तर, पहेली को फिर से पढ़ें!');
      setTimeout(() => setRiddleFeedback(null), 1800);
    }
  };

  // -------------------------------------------------------------
  // GAME 4: TRADITIONAL ARCHERY TARGET MATH
  // -------------------------------------------------------------
  const [archeryProblemIndex, setArcheryProblemIndex] = useState(0);
  const [arrowFlying, setArrowFlying] = useState(false);
  const [hitTarget, setHitTarget] = useState<number | null>(null);
  const [archeryFeedback, setArcheryFeedback] = useState<string | null>(null);

  const archeryProblems = [
    {
      equation: '३ + २ = ?',
      equationHo: '𑣁 + 𑣡 = 𑣖 (Mone / 5)',
      targetAnswer: 5,
      targets: [
        { value: 4, tribal: selectedLanguage === 'Ho' ? '𑣂 (Upunya)' : selectedLanguage === 'Santhali' ? '᱔ (Pon)' : '४ (उपुनया)' },
        { value: 5, tribal: selectedLanguage === 'Ho' ? '𑣖 (Mone)' : selectedLanguage === 'Santhali' ? '᱕ (Mone)' : '५ (मोड़ेया)' },
        { value: 6, tribal: selectedLanguage === 'Ho' ? '𑣗 (Turui)' : selectedLanguage === 'Santhali' ? '᱖ (Turui)' : '६ (तुरुइया)' }
      ]
    },
    {
      equation: '४ + ३ = ?',
      equationHo: '𑣂 + 𑣁 = 𑣘 (Eya / 7)',
      targetAnswer: 7,
      targets: [
        { value: 6, tribal: selectedLanguage === 'Ho' ? '𑣗 (Turui)' : selectedLanguage === 'Santhali' ? '᱖ (Turui)' : '६ (तुरुइया)' },
        { value: 7, tribal: selectedLanguage === 'Ho' ? '𑣘 (Eya)' : selectedLanguage === 'Santhali' ? '᱗ (Eyae)' : '७ (एया)' },
        { value: 8, tribal: selectedLanguage === 'Ho' ? '𑣙 (Irul)' : selectedLanguage === 'Santhali' ? '᱘ (Iral)' : '८ (इरलिया)' }
      ]
    },
    {
      equation: '८ - ५ = ?',
      equationHo: '𑣙 - 𑣖 = 𑣁 (Apeya / 3)',
      targetAnswer: 3,
      targets: [
        { value: 2, tribal: selectedLanguage === 'Ho' ? '𑣡 (Bariya)' : selectedLanguage === 'Santhali' ? '᱒ (Bar)' : '२ (बारिया)' },
        { value: 3, tribal: selectedLanguage === 'Ho' ? '𑣁 (Apeya)' : selectedLanguage === 'Santhali' ? '᱓ (Pe)' : '३ (आपेया)' },
        { value: 4, tribal: selectedLanguage === 'Ho' ? '𑣂 (Upunya)' : selectedLanguage === 'Santhali' ? '᱔ (Pon)' : '४ (उपुनया)' }
      ]
    }
  ];
  const currentArchery = archeryProblems[archeryProblemIndex % archeryProblems.length];

  const shootArrowAt = (targetVal: number) => {
    if (arrowFlying) return;
    gameAudio.playArrowRelease();
    setArrowFlying(true);
    setHitTarget(targetVal);

    setTimeout(() => {
      if (targetVal === currentArchery.targetAnswer) {
        gameAudio.playSuccess();
        setScore((s) => s + 40);
        setArcheryFeedback(`🎯 सटीक निशाना! लक्ष्य भेदा: ${targetVal} (+40 Points)`);
        setTimeout(() => {
          setArrowFlying(false);
          setHitTarget(null);
          setArcheryFeedback(null);
          setArcheryProblemIndex((i) => i + 1);
        }, 2000);
      } else {
        gameAudio.playClick();
        setArcheryFeedback(`निशाना चूका! सही उत्तर ${currentArchery.targetAnswer} था। पुनः प्रयास करें!`);
        setTimeout(() => {
          setArrowFlying(false);
          setHitTarget(null);
          setArcheryFeedback(null);
        }, 1800);
      }
    }, 600);
  };

  // -------------------------------------------------------------
  // TRADITIONAL GAMES FOLKLORE & RULES
  // -------------------------------------------------------------
  const traditionalGames = [
    {
      id: 'tg-gedi',
      title: 'गेदी एनांग (Gedi Enang) - बांस स्टिल्ट संतुलन खेल',
      tribe: 'हो समुदाय (Ho Tribe)',
      icon: '🎋',
      summary: 'बांस के डंडों (Stilts) पर खड़े होकर दौड़ने और संतुलन बनाने का पारंपरिक खेल।',
      flnBenefit: 'दिशा ज्ञान (Left/Right), कदमों की गिनती (Step Counting) और गति का अनुमान।'
    },
    {
      id: 'tg-kati',
      title: 'काटी खेल (Kati Khel) - अर्धचंद्राकार लकड़ी एवं चक्र प्रहार',
      tribe: 'संथाली समुदाय (Santhal Tribe)',
      icon: '🥏',
      summary: 'सोहराय पर्व के बाद युवा अर्धचंद्राकार लकड़ी की छड़ी से गोल लकड़ी के चक्र (काटी) को दूर से निशाना लगाते हैं।',
      flnBenefit: 'दूरी मापन (Distance Measurement in Paces), स्कोर गणना और टीम जोड़।'
    },
    {
      id: 'tg-kulmerom',
      title: 'कुल-मेरोम (Kul-Merom) - बाघ और बकरी रणनीति खेल',
      tribe: 'मुंडारी एवं हो समुदाय (Mundari & Ho)',
      icon: '🐅',
      summary: 'जमीन पर बनाई गई ज्यामितीय रेखाओं पर खेला जाने वाला पारंपरिक आदिवासी बोर्ड खेल (Checkers-like strategy)।',
      flnBenefit: 'स्थानिक समझ (Spatial Geometry), पैटर्न पहचान और तार्किक घटाव।'
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      id="interactive-games-modal"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full p-4 sm:p-7 shadow-2xl border border-slate-200 flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  PALASH Interactive FLN Games
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  100% Offline &middot; Zero Cloud
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {uiLang === 'hi' ? 'आदिवासी मातृभाषा खेल एवं गतिविधियां' : 'Tribal Mother Tongue Interactive Games'}
              </h2>
            </div>
          </div>

          {/* Score, Stars & Language Switcher */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Stars & Score Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <div className="flex items-center text-amber-500 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 mr-0.5" />
                {score} pts
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="text-xs text-slate-600 font-semibold">
                ⭐ × {stars}
              </div>
            </div>

            {/* Target Language selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as TribalLanguage)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800"
            >
              <option value="Ho">🪶 Ho (Warang Chiti)</option>
              <option value="Mundari">🌿 Mundari (Devanagari)</option>
              <option value="Santhali">🌲 Santhali (Ol Chiki)</option>
            </select>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 pb-2 border-b border-slate-100 shrink-0 text-xs font-bold">
          <button
            id="tab-game-market"
            onClick={() => setActiveTab('market')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'market'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>हाट-बाजार गणित (Market Math)</span>
          </button>

          <button
            id="tab-game-matching"
            onClick={() => setActiveTab('matching')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>शब्द-चित्र मिलान (Script Match)</span>
          </button>

          <button
            id="tab-game-riddles"
            onClick={() => setActiveTab('riddles')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'riddles'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>वन्यजीव पहेली (Forest Riddles)</span>
          </button>

          <button
            id="tab-game-archery"
            onClick={() => setActiveTab('archery')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'archery'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>तीरंदाजी निशाना (Archery Math)</span>
          </button>

          <button
            id="tab-game-gedi"
            onClick={() => setActiveTab('gedi')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'gedi'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>गेदी एनांग (Bamboo Stilt &bull; c17)</span>
          </button>

          <button
            id="tab-game-kati"
            onClick={() => setActiveTab('kati')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kati'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>काटी खेल (Disc Strike &bull; c18)</span>
          </button>

          <button
            id="tab-game-kulmerom"
            onClick={() => setActiveTab('kulmerom')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kulmerom'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>कुल-मेरोम (Tiger & Goats &bull; c19)</span>
          </button>

          <button
            id="tab-game-folklore"
            onClick={() => setActiveTab('folklore_games')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'folklore_games'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>पारंपरिक खेल परिचय (Traditional Lore)</span>
          </button>
        </div>

        {/* Active Game Canvas Area */}
        <div className="flex-1 overflow-y-auto py-3">
          
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: HAAT BAZAAR MATH MART */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'market' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-900">
                    गोल-१: हाट खरीदारी चुनौती (Round {marketRound})
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">
                    {currentTask.promptHindi}
                  </div>
                </div>
                <div className="text-xs bg-amber-200/70 text-amber-900 px-2.5 py-1 rounded-lg font-bold">
                  लक्ष्य: {currentTask.expectedTotalQty} वस्तुएं
                </div>
              </div>

              {marketFeedback && (
                <div className="p-2.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl text-center animate-in fade-in">
                  {marketFeedback}
                </div>
              )}

              {/* Market Stalls */}
              <div>
                <div className="text-xs font-bold text-slate-600 mb-2">
                  हाट की दुकानें (दुकान से सामान चुनने के लिए क्लिक करें):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {marketItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddToBasket(item)}
                      className="p-3 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-center transition-all cursor-pointer group bg-white shadow-2xs"
                    >
                      <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="font-bold text-slate-900 text-sm">
                        {item.nameHindi}
                      </div>
                      <div className="text-xs text-emerald-800 font-medium">
                        {item.nameTribal}
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-slate-500">
                        ₹{item.price} / नग
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Shopping Basket */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    <span>आपकी खरीदारी टोकरी (Basket Items: {basket.length}):</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800">
                    कुल मूल्य: ₹{basket.reduce((acc, curr) => acc + curr.price, 0)}
                  </div>
                </div>

                {basket.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400 border border-dashed border-slate-300 rounded-lg">
                    टोकरी खाली है। ऊपर दी गई दुकानों से फल-सब्जियां चुनें।
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {basket.map((item, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleRemoveFromBasket(idx)}
                        className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-50 hover:border-rose-300 cursor-pointer shadow-2xs"
                        title="हटाने के लिए क्लिक करें"
                      >
                        <span>{item.icon}</span>
                        <span>{item.nameHindi}</span>
                        <span className="text-slate-400 text-[10px]">✕</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setBasket([])}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    टोकरी खाली करें (Clear)
                  </button>
                  <button
                    onClick={checkMarketTask}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span>उत्तर जांचें (Check Answer)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: WORD & PICTURE MATCHING */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'matching' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    मातृभाषा लिपि एवं चित्र मिलान कार्ड खेल
                  </div>
                  <div className="text-xs text-emerald-800">
                    पहले चित्र पर टैप करें, फिर उसके सही मातृभाषा शब्द पर टैप करें।
                  </div>
                </div>
                <button
                  onClick={resetMatching}
                  className="px-3 py-1 text-xs font-bold bg-white text-emerald-800 border border-emerald-300 rounded-lg hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>रीसेट</span>
                </button>
              </div>

              {matchMessage && (
                <div className="p-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl text-center">
                  {matchMessage}
                </div>
              )}

              {/* 2x4 Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {rawMatchCards.map((card) => {
                  const isSolved = solvedPairIds.includes(card.pairId);
                  const isSelected = matchSelection?.id === card.id;

                  return (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      disabled={isSolved}
                      className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[110px] ${
                        isSolved
                          ? 'bg-emerald-50 border-emerald-400 opacity-60'
                          : isSelected
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 scale-102 shadow-md'
                          : 'bg-white border-slate-200 hover:border-emerald-500 hover:bg-slate-50 shadow-2xs'
                      }`}
                    >
                      {card.type === 'image' ? (
                        <>
                          <div className="text-4xl mb-1">{card.content}</div>
                          <div className="text-xs font-semibold text-slate-700">{card.subContent}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-lg font-black text-slate-900">{card.content}</div>
                          <div className="text-xs text-emerald-800 font-medium mt-0.5">{card.subContent}</div>
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                            <Volume2 className="w-3 h-3" />
                            <span>उच्चारण सुनें</span>
                          </div>
                        </>
                      )}

                      {isSolved && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>पूर्ण</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {solvedPairIds.length === 4 && (
                <div className="p-4 bg-emerald-100 rounded-xl text-center space-y-2">
                  <div className="text-2xl">🎉 🌟 🏆</div>
                  <div className="font-bold text-emerald-900 text-sm">
                    शानदार! आपने सभी ४ शब्दों और चित्रों का सफल मिलान किया!
                  </div>
                  <button
                    onClick={resetMatching}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-800"
                  >
                    दोबारा खेलें (Play Again)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: FOREST ANIMAL RIDDLES */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'riddles' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-sm">
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                  <span>पहेली संख्या: {riddleIndex + 1}</span>
                  <button
                    onClick={() => gameAudio.speakTribalWord(currentRiddle.question)}
                    className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg text-white text-xs cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>पहेली सुनें</span>
                  </button>
                </div>
                <div className="text-base font-semibold text-white leading-relaxed mt-1">
                  {currentRiddle.question}
                </div>
                <div className="text-xs text-slate-300 italic mt-1">
                  {currentRiddle.questionEnglish}
                </div>
              </div>

              {riddleFeedback && (
                <div className="p-2.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl text-center">
                  {riddleFeedback}
                </div>
              )}

              <div className="text-xs font-bold text-slate-600">
                सही उत्तर पर टैप करें:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentRiddle.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerRiddle(opt.isCorrect)}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 bg-white text-center transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </div>
                    <div className="font-bold text-slate-900 text-xs">
                      {opt.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Cultural Insight Card */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2">
                <span className="text-base">💡</span>
                <div>
                  <span className="font-bold">सांस्कृतिक ज्ञान: </span>
                  {currentRiddle.funFact}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: TRADITIONAL ARCHERY TARGET MATH */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'archery' && (
            <div className="space-y-4">
              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-orange-950">
                    सारंडा पारंपरिक तीरंदाजी FLN गणित निशाना (Question {archeryProblemIndex + 1})
                  </div>
                  <div className="text-xs text-orange-800 font-medium mt-0.5">
                    धनुष से उस लक्ष्य (Target) पर तीर चलाएं जो समीकरण का सही उत्तर है!
                  </div>
                </div>
                <div className="text-sm font-extrabold text-orange-950 bg-orange-200/80 px-3 py-1 rounded-xl">
                  {currentArchery.equation}
                </div>
              </div>

              {archeryFeedback && (
                <div className="p-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl text-center">
                  {archeryFeedback}
                </div>
              )}

              {/* Target Range Board */}
              <div className="relative p-8 bg-linear-to-b from-sky-50 to-emerald-50 rounded-2xl border-2 border-slate-300 text-center min-h-[220px] flex flex-col items-center justify-center overflow-hidden">
                
                {/* Visual Bamboo Bow at bottom */}
                <div className="text-3xl mb-3 flex items-center gap-2">
                  <span>🏹</span>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    पारंपरिक बांस धनुष (Desi Bow)
                  </span>
                </div>

                {/* Targets Row */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  {currentArchery.targets.map((tgt) => (
                    <button
                      key={tgt.value}
                      onClick={() => shootArrowAt(tgt.value)}
                      disabled={arrowFlying}
                      className={`p-4 rounded-2xl border-3 text-center transition-all cursor-pointer flex flex-col items-center justify-center relative group ${
                        hitTarget === tgt.value
                          ? 'bg-amber-100 border-amber-500 scale-105 shadow-lg'
                          : 'bg-white border-slate-300 hover:border-orange-500 hover:scale-103 shadow-xs'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-rose-50 border-2 border-rose-500 flex items-center justify-center text-rose-700 font-black text-lg mb-1 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                        {tgt.value}
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        {tgt.tribal}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        निशाना लगाएं 🎯
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-[11px] text-slate-500 font-medium">
                  मातृभाषा अंक समीकरण: <span className="font-bold text-emerald-800">{currentArchery.equationHo}</span>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: GEDI ENANG (BAMBOO STILT RACE - c17) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'gedi' && (
            <GediStiltGame
              selectedLanguage={selectedLanguage}
              onAddScore={(pts) => {
                setScore((s) => s + pts);
                setStars((st) => Math.min(5, st + 1));
              }}
            />
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 6: KATI KHEL (WOODEN DISC STRIKE - c18) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'kati' && (
            <KatiDiscStrikeGame
              selectedLanguage={selectedLanguage}
              onAddScore={(pts) => {
                setScore((s) => s + pts);
                setStars((st) => Math.min(5, st + 1));
              }}
            />
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 7: KUL-MEROM (TIGER & GOATS BOARD GAME - c19) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'kulmerom' && (
            <KulMeromBoardGame
              selectedLanguage={selectedLanguage}
              onAddScore={(pts) => {
                setScore((s) => s + pts);
                setStars((st) => Math.min(5, st + 1));
              }}
            />
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 8: TRADITIONAL TRIBAL GAMES LORE */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'folklore_games' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-xs font-bold text-emerald-950">
                  झारखंड के पारंपरिक आदिवासी खेल एवं FLN सीखने के कौशल
                </div>
                <div className="text-xs text-emerald-800">
                  ये पारंपरिक खेल सदियों से बच्चों में गणितीय गणना, शारीरिक संतुलन एवं सामाजिक सहयोग का विकास करते हैं।
                </div>
              </div>

              <div className="space-y-3">
                {traditionalGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{game.icon}</span>
                        <h4 className="font-bold text-slate-900 text-sm">{game.title}</h4>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {game.tribe}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {game.summary}
                    </p>
                    <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>FLN शैक्षणिक लाभ: {game.flnBenefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div>
            NIPUN Bharat &bull; PALASH Mother Tongue Foundational Games
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            खेल समाप्त करें (Exit Games)
          </button>
        </div>

      </div>
    </div>
  );
};
