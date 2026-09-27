import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, RotateCcw, Footprints, AlertTriangle, Star, Award } from 'lucide-react';
import { TribalLanguage } from '../types';
import { gameAudio } from '../utils/gameAudio';

export interface GediStiltGameProps {
  selectedLanguage: TribalLanguage;
  onAddScore: (points: number) => void;
}

export const GediStiltGame: React.FC<GediStiltGameProps> = ({
  selectedLanguage,
  onAddScore
}) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 20
  const [lastFoot, setLastFoot] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [hurdleAt, setHurdleAt] = useState<number | null>(7); // Puddle at 7, Branch at 14
  const [stiltBalance, setStiltBalance] = useState<number>(100); // 0-100%

  const TARGET_STEPS = 20;

  // Tribal numbers list (1-20)
  const tribalNumberNames: Record<TribalLanguage, string[]> = {
    Ho: [
      'मिआद (Miyad)', 'बारिया (Bariya)', 'आपेया (Apeya)', 'उपुनया (Upunya)', 'मोणे (Mone)',
      'तुरुई (Turui)', 'एया (Eya)', 'इरुल (Irul)', 'आरे (Are)', 'गेल (Gel)',
      'गेल मिआद (Gel Miyad)', 'गेल बारिया (Gel Bariya)', 'गेल आपेया (Gel Apeya)', 'गेल उपुनया (Gel Upunya)', 'गेल मोणे (Gel Mone)',
      'गेल तुरुई (Gel Turui)', 'गेल एया (Gel Eya)', 'गेल इरुल (Gel Irul)', 'गेल आरे (Gel Are)', 'हिसि (Hisi - 20)'
    ],
    Santhali: [
      'ᱢᱤᱫ (Mit)', 'ᱵᱟᱨ (Bar)', 'ᱯᱮ (Pe)', 'ᱯᱩᱱ (Pun)', 'ᱢᱚᱬᱮ (Mone)',
      'ᱛᱩᱨᱩᱭ (Turui)', 'ᱮᱭᱟᱭ (Eyae)', 'ᱤᱨᱟᱹᱞ (Iral)', 'ᱟᱨᱮ (Are)', 'ᱜᱮᱞ (Gel)',
      'ᱜᱮᱞ ᱢᱤᱫ (Gel Mit)', 'ᱜᱮᱞ ᱵᱟᱨ (Gel Bar)', 'ᱜᱮᱞ ᱯᱮ (Gel Pe)', 'ᱜᱮᱞ ᱯᱩᱱ (Gel Pun)', 'ᱜᱮᱞ ᱢᱚᱬᱮ (Gel Mone)',
      'ᱜᱮᱞ ᱛᱩᱨᱩᱭ (Gel Turui)', 'ᱜᱮᱞ ᱮᱭᱟᱭ (Gel Eyae)', 'ᱜᱮᱞ ᱤᱨᱟᱹᱞ (Gel Iral)', 'ᱜᱮᱞ ᱟᱨᱮ (Gel Are)', 'ᱤᱥᱤ (Isi - 20)'
    ],
    Mundari: [
      'मिआद (Miyad)', 'बारिया (Bariya)', 'आपेया (Apeya)', 'उपुन (Upun)', 'मोड़े (Mode)',
      'तुरुइ (Turui)', 'एया (Eya)', 'इरल (Iral)', 'आरे (Are)', 'गेल (Gel)',
      'गेल मिआद (Gel Miyad)', 'गेल बारिया (Gel Bariya)', 'गेल आपेया (Gel Apeya)', 'गेल उपुन (Gel Upun)', 'गेल मोड़े (Gel Mode)',
      'गेल तुरुइ (Gel Turui)', 'गेल एया (Gel Eya)', 'गेल इरल (Gel Iral)', 'गेल आरे (Gel Are)', 'हिसि (Hisi - 20)'
    ]
  };

  const handleStep = (foot: 'left' | 'right') => {
    if (isFinished) return;

    // Check hurdle encounter
    if ((currentStep === 6 || currentStep === 13) && hurdleAt !== null) {
      setFeedback('⚠️ आगे गड्ढा / बाधा है! पहले "कूदें (Jump)" बटन दबाएं!');
      gameAudio.playClick();
      return;
    }

    if (lastFoot === foot) {
      // Stepped with the same foot twice: balance wobble!
      setStiltBalance((prev) => Math.max(20, prev - 15));
      setFeedback('संतुलन डगमगाया! दोनों पैरों को बारी-बारी (Left फिर Right) बढ़ाएं!');
      gameAudio.playTryAgain();
    } else {
      // Successful step!
      gameAudio.playStiltStep(foot === 'right');
      setLastFoot(foot);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setStiltBalance((prev) => Math.min(100, prev + 10));

      const numName = tribalNumberNames[selectedLanguage][nextStep - 1] || `${nextStep}`;
      setFeedback(`शाबाश! कदम ${nextStep}: ${numName}`);
      gameAudio.speakTribalWord(numName.split(' ')[0], true);

      // Check hurdles ahead
      if (nextStep === 6) setHurdleAt(7);
      else if (nextStep === 13) setHurdleAt(14);
      else setHurdleAt(null);

      // Reached goal!
      if (nextStep >= TARGET_STEPS) {
        setIsFinished(true);
        onAddScore(50);
        gameAudio.playSuccess();
      }
    }
  };

  const handleJump = () => {
    if (isFinished) return;
    if (currentStep === 6 || currentStep === 13) {
      gameAudio.playArrowRelease();
      const nextStep = currentStep + 2;
      setCurrentStep(nextStep);
      setHurdleAt(null);
      setFeedback('🎉 शानदार छलांग! आपने बाधा पार कर ली! (+२ कदम आगे)');
      const numName = tribalNumberNames[selectedLanguage][nextStep - 1] || `${nextStep}`;
      gameAudio.speakTribalWord(numName.split(' ')[0], true);

      if (nextStep >= TARGET_STEPS) {
        setIsFinished(true);
        onAddScore(50);
        gameAudio.playSuccess();
      }
    } else {
      gameAudio.playClick();
      setFeedback('अभी कूदने की आवश्यकता नहीं है, ताल मिलाकर आगे बढ़ते रहें!');
    }
  };

  const resetGame = () => {
    setCurrentStep(0);
    setLastFoot(null);
    setFeedback(null);
    setIsFinished(false);
    setHurdleAt(7);
    setStiltBalance(100);
  };

  const progressPercent = Math.min(100, Math.round((currentStep / TARGET_STEPS) * 100));

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-emerald-950">
            गेदी एनांग (Gedi Enang) &bull; बांस स्टिल्ट संतुलन एवं दिशा दौड़
          </div>
          <div className="text-xs text-emerald-800 mt-0.5">
            बांस की गेदी (Stilts) पर खड़े होकर बाएं (लिंडा) और दाएं (जोम) पैर को बारी-बारी से बढ़ाएं और २० कदम पूरे करें!
          </div>
        </div>
        <button
          onClick={resetGame}
          className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>पुनः शुरू करें</span>
        </button>
      </div>

      {/* Track & Stilt Runner Field */}
      <div className="relative p-6 bg-gradient-to-b from-amber-50 to-emerald-50 rounded-2xl border-2 border-emerald-300 overflow-hidden min-h-[260px] flex flex-col justify-between">
        
        {/* Top Distance & Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-black text-slate-800 mb-1.5">
            <span className="flex items-center gap-1">
              <Footprints className="w-4 h-4 text-emerald-800" />
              <span>दूरी: {currentStep} / {TARGET_STEPS} कदम (Paces)</span>
            </span>
            <span className="text-emerald-900 font-mono">
              {progressPercent}% पूर्ण
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-200 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Distance milestone labels */}
          <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1 px-1">
            <span>प्रारंभ (०)</span>
            <span>५ कदम</span>
            <span>१० कदम (मध्य)</span>
            <span>१५ कदम</span>
            <span className="text-emerald-800">लक्ष्य (२०) 🏁</span>
          </div>
        </div>

        {/* Visual Animated Runner on Stilts */}
        <div className="relative my-6 py-4 flex items-center justify-center">
          {isFinished ? (
            <div className="text-center animate-bounce">
              <div className="text-5xl mb-2">🏆</div>
              <h3 className="text-lg font-black text-emerald-950">
                अद्भुत संतुलन! आपने २० कदम की दौड़ जीत ली!
              </h3>
              <p className="text-xs text-emerald-800 font-bold mt-1">
                +५० स्टार अंक अर्जित! आपने आदिवासियों के पारंपरिक संतुलन कौशल में महारत हासिल की।
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="relative inline-block transition-transform duration-150">
                {/* Visual Stilt Character */}
                <div className="text-5xl select-none">
                  {lastFoot === 'left' ? '🏃‍♂️' : '🏃'}
                </div>
                {/* Bamboo Poles Indicator */}
                <div className="flex justify-center gap-6 mt-1">
                  <div className={`w-2 h-10 rounded-sm transition-all ${lastFoot === 'left' ? 'bg-amber-600 -translate-y-2' : 'bg-amber-800'}`} />
                  <div className={`w-2 h-10 rounded-sm transition-all ${lastFoot === 'right' ? 'bg-amber-600 -translate-y-2' : 'bg-amber-800'}`} />
                </div>
              </div>

              {/* Live Tribal Spoken Step Word */}
              <div className="mt-2 text-xs font-black text-slate-800 bg-white/80 px-3 py-1 rounded-full border border-slate-200 inline-block shadow-xs">
                {currentStep === 0
                  ? 'शुरू करने के लिए नीचे बायां पैर दबाएं'
                  : `कदम ${currentStep}: ${tribalNumberNames[selectedLanguage][currentStep - 1] || ''}`}
              </div>
            </div>
          )}
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="p-2 bg-slate-900/90 text-white rounded-xl text-xs font-bold text-center">
            {feedback}
          </div>
        )}
      </div>

      {/* Control Buttons (Left Stilt, Jump, Right Stilt) */}
      {!isFinished && (
        <div className="grid grid-cols-3 gap-3">
          {/* Left Foot (लिंडा) */}
          <button
            onClick={() => handleStep('left')}
            className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              lastFoot === 'right' || lastFoot === null
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800 shadow-md scale-102 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 opacity-60'
            }`}
          >
            <span className="text-2xl">🦶</span>
            <span className="font-black text-sm mt-1">बायां पैर (Left)</span>
            <span className="text-[11px] opacity-80">लिंडा (Linda Stilt)</span>
          </button>

          {/* Jump / Clear Hurdle */}
          <button
            onClick={handleJump}
            className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              currentStep === 6 || currentStep === 13
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-lg scale-105 animate-bounce'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <span className="text-2xl">🦘</span>
            <span className="font-black text-sm mt-1">कूदें (Jump)</span>
            <span className="text-[10px]">बाधा पार करें</span>
          </button>

          {/* Right Foot (जोम) */}
          <button
            onClick={() => handleStep('right')}
            className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              lastFoot === 'left'
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-800 shadow-md scale-102 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 opacity-60'
            }`}
          >
            <span className="text-2xl">🦶</span>
            <span className="font-black text-sm mt-1">दायां पैर (Right)</span>
            <span className="text-[11px] opacity-80">जोम (Jom Stilt)</span>
          </button>
        </div>
      )}

      {/* FLN Educational note */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>FLN कौशल: १ से २० तक मातृभाषा संख्या गणना एवं गति संतुलन</span>
        </span>
        <span className="font-bold text-emerald-800">
          गेदी एनांग &bull; हो / मुंडारी खेल
        </span>
      </div>
    </div>
  );
};
