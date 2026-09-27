import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, RotateCcw, Target, Star, Award, Sliders } from 'lucide-react';
import { TribalLanguage } from '../types';
import { gameAudio } from '../utils/gameAudio';

export interface KatiDiscStrikeGameProps {
  selectedLanguage: TribalLanguage;
  onAddScore: (points: number) => void;
}

export const KatiDiscStrikeGame: React.FC<KatiDiscStrikeGameProps> = ({
  selectedLanguage,
  onAddScore
}) => {
  const [targetDistance, setTargetDistance] = useState<5 | 10 | 15>(5);
  const [power, setPower] = useState<number>(50);
  const [aimAngle, setAimAngle] = useState<'left' | 'center' | 'right'>('center');
  const [isStriking, setIsStriking] = useState(false);
  const [discPosition, setDiscPosition] = useState<number>(0); // 0 (start) to 100 (target)
  const [feedback, setFeedback] = useState<string | null>(null);
  const [cumulativeScore, setCumulativeScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Power oscillation loop
  const powerIncreasingRef = useRef(true);
  useEffect(() => {
    if (isStriking) return;
    const interval = setInterval(() => {
      setPower((prev) => {
        if (prev >= 95) powerIncreasingRef.current = false;
        if (prev <= 15) powerIncreasingRef.current = true;
        return powerIncreasingRef.current ? prev + 5 : prev - 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isStriking]);

  const handleStrike = () => {
    if (isStriking) return;
    setIsStriking(true);
    gameAudio.playWoodHit();

    // Calculate required power for selected distance
    const targetPower = targetDistance === 5 ? 35 : targetDistance === 10 ? 65 : 90;
    const diff = Math.abs(power - targetPower);

    // Animate disc motion
    let currentPos = 0;
    const targetFinal = Math.min(100, Math.max(10, Math.round((power / targetPower) * 75)));
    const animInterval = setInterval(() => {
      currentPos += 5;
      setDiscPosition(currentPos);
      if (currentPos >= targetFinal) {
        clearInterval(animInterval);
        finishStrike(diff, targetFinal);
      }
    }, 30);
  };

  const finishStrike = (diff: number, finalPos: number) => {
    setAttempts((a) => a + 1);

    if (diff <= 15 && aimAngle === 'center') {
      // Direct Bullseye strike on the wooden disc!
      gameAudio.playWoodHit();
      gameAudio.playSuccess();
      const earned = targetDistance * 10;
      setCumulativeScore((s) => s + earned);
      onAddScore(earned);
      setFeedback(`🎯 सटीक प्रहार! काटी चक्र लक्ष्य पर लगा! +${earned} अंक!`);
    } else if (diff <= 25) {
      // Close hit
      gameAudio.playSuccess();
      const earned = targetDistance * 5;
      setCumulativeScore((s) => s + earned);
      onAddScore(earned);
      setFeedback(`काटी चक्र लक्ष्य के निकट रुका! +${earned} अंक!`);
    } else if (power < 30) {
      gameAudio.playTryAgain();
      setFeedback('प्रहार धीमा था! काटी चक्र लक्ष्य तक नहीं पहुंचा। थोड़ी अधिक शक्ति लगाएं!');
    } else {
      gameAudio.playTryAgain();
      setFeedback('प्रहार बहुत तेज था! काटी चक्र लक्ष्य से आगे निकल गया!');
    }

    setTimeout(() => {
      setIsStriking(false);
      setDiscPosition(0);
    }, 2500);
  };

  const resetGame = () => {
    setCumulativeScore(0);
    setAttempts(0);
    setFeedback(null);
    setDiscPosition(0);
    setIsStriking(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-amber-950">
            काटी खेल (Kati Khel) &bull; संथाली पारंपरिक लकड़ी चक्र प्रहार
          </div>
          <div className="text-xs text-amber-800 mt-0.5">
            काटी डांग (घुमावदार लकड़ी की छड़ी) से काटी चक्र पर प्रहार कर ५, १० या १५ कदम के लक्ष्य को भेदें!
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-black text-amber-900 shadow-2xs">
            कुल स्कोर: {cumulativeScore}
          </div>
          <button
            onClick={resetGame}
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Distance Selector */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
        <span className="text-xs font-bold text-slate-600 pl-2">लक्ष्य दूरी चुनें:</span>
        <button
          onClick={() => setTargetDistance(5)}
          disabled={isStriking}
          className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            targetDistance === 5 ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-amber-50'
          }`}
        >
          ५ कदम (5 Paces &bull; 50 pts)
        </button>
        <button
          onClick={() => setTargetDistance(10)}
          disabled={isStriking}
          className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            targetDistance === 10 ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-amber-50'
          }`}
        >
          १० कदम (10 Paces &bull; 100 pts)
        </button>
        <button
          onClick={() => setTargetDistance(15)}
          disabled={isStriking}
          className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            targetDistance === 15 ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-amber-50'
          }`}
        >
          १५ कदम (15 Paces &bull; 150 pts)
        </button>
      </div>

      {/* Playing Field / Court Graphic */}
      <div className="relative p-6 bg-gradient-to-b from-amber-100/60 to-orange-100/70 rounded-2xl border-2 border-amber-300 min-h-[220px] flex flex-col justify-between overflow-hidden">
        
        {/* Target Ring at far end */}
        <div className="flex items-center justify-between px-4 pb-2 border-b border-amber-200 text-xs font-bold text-amber-900">
          <span>प्रहार रेखा (Strike Line)</span>
          <span className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-rose-600" />
            <span>लक्ष्य चक्र: {targetDistance} कदम (Target Ring)</span>
          </span>
        </div>

        {/* Dynamic Disc Sliding Track */}
        <div className="relative h-20 my-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center px-4 overflow-hidden">
          {/* Target marker */}
          <div
            className="absolute top-2 bottom-2 w-12 rounded-xl border-2 border-dashed border-rose-500 bg-rose-100/50 flex flex-col items-center justify-center text-[10px] font-black text-rose-700"
            style={{
              left: `${targetDistance === 5 ? '35%' : targetDistance === 10 ? '65%' : '88%'}`
            }}
          >
            🎯
            <span>{targetDistance}k</span>
          </div>

          {/* Sliding Kati Disc */}
          <div
            className="absolute transition-all duration-75 flex items-center justify-center"
            style={{ left: `${Math.max(2, Math.min(90, discPosition))}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-amber-800 border-2 border-amber-950 text-white font-black text-xs flex items-center justify-center shadow-md">
              🪵
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="p-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold text-center animate-in fade-in">
            {feedback}
          </div>
        )}
      </div>

      {/* Aim & Power Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Aim Angle */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
          <div className="text-xs font-bold text-slate-700">
            दिशा कोण (Aim Angle)
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => setAimAngle('left')}
              disabled={isStriking}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                aimAngle === 'left' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              ↖️ बायां (-15°)
            </button>
            <button
              onClick={() => setAimAngle('center')}
              disabled={isStriking}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                aimAngle === 'center' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              ⬆️ सीधा (0°)
            </button>
            <button
              onClick={() => setAimAngle('right')}
              disabled={isStriking}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                aimAngle === 'right' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              ↗️ दायां (+15°)
            </button>
          </div>
        </div>

        {/* Power Meter & Strike Trigger */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>प्रहार शक्ति (Strike Power)</span>
              <span className="font-mono text-amber-900">{power}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 transition-all duration-50"
                style={{ width: `${power}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleStrike}
            disabled={isStriking}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs shadow-md disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>🪵</span>
            <span>काटी चक्र पर प्रहार करें (Strike Disc!)</span>
          </button>
        </div>
      </div>

      {/* FLN Educational Note */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-700" />
          <span>FLN कौशल: दूरी अनुमान, ५-१०-१५ का जोड़ (Arithmetic Addition) एवं भौतिकी संतुलन</span>
        </span>
        <span className="font-bold text-amber-900">
          काटी खेल &bull; संथाली पारंपरिक खेल
        </span>
      </div>
    </div>
  );
};
