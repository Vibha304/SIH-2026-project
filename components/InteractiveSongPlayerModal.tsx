import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Music, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Radio, 
  ChevronRight,
  Sliders,
  Award
} from 'lucide-react';
import { CulturalStory } from '../types';
import { SONG_DETAILS, SongVerse } from '../data/culturalDetailsData';
import { gameAudio } from '../utils/gameAudio';

export interface InteractiveSongPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: CulturalStory | null;
  uiLang: 'en' | 'hi';
}

export const InteractiveSongPlayerModal: React.FC<InteractiveSongPlayerModalProps> = ({
  isOpen,
  onClose,
  story,
  uiLang
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [tempo, setTempo] = useState<number>(1.0); // 0.7, 1.0, 1.2
  const [activeScript, setActiveScript] = useState<'script' | 'roman' | 'hindi' | 'english'>('script');
  const [drumLoopActive, setDrumLoopActive] = useState(true);
  const [activeDrumHit, setActiveDrumHit] = useState<string | null>(null);
  const [starsEarned, setStarsEarned] = useState(0);
  const [showPraise, setShowPraise] = useState(false);

  // Sing-along voice recorder state
  const [isRecordingSingAlong, setIsRecordingSingAlong] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Timer reference for synchronized karaoke line progression
  const songTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rhythmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [extraVerses, setExtraVerses] = useState<SongVerse[]>([]);
  const [isComposingVerse, setIsComposingVerse] = useState(false);

  const songData = story ? SONG_DETAILS[story.id] : null;
  const baseVerses: SongVerse[] = (story?.customVerses && story.customVerses.length > 0)
    ? story.customVerses
    : (songData?.verses || [
        {
          lineNum: 1,
          scriptText: story?.contentTribalScript || '',
          romanText: story?.contentTribalRoman || '',
          hindiText: story?.contentHindi || '',
          englishText: story?.contentEnglish || ''
        }
      ]);
  const verses: SongVerse[] = [...baseVerses, ...extraVerses];
  const instrumentTipText = story?.customInstrumentTip || songData?.instrumentTip || 'पारंपरिक मांदर और नगाड़े की थाप';

  // Stop everything on close or unmount
  useEffect(() => {
    if (!isOpen) {
      stopPlayback();
    } else {
      setExtraVerses([]);
      setActiveVerseIndex(0);
    }
  }, [isOpen, story?.id]);

  const handleComposeNewAiVerse = async () => {
    if (!story || isComposingVerse) return;
    setIsComposingVerse(true);
    try {
      const res = await fetch('/api/cultural/generate-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `${story.titleEnglish || story.titleHindi} - Additional Joyful Verse`,
          language: story.language,
          type: 'Song',
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.data?.customVerses?.length) {
        const nextLine = json.data.customVerses[0];
        const newVerse: SongVerse = {
          ...nextLine,
          lineNum: verses.length + 1,
        };
        setExtraVerses((prev) => [...prev, newVerse]);
        setActiveVerseIndex(verses.length);
        gameAudio.playSuccess();
      }
    } catch (err) {
      console.warn('Dynamic verse composition error:', err);
    } finally {
      setIsComposingVerse(false);
    }
  };

  const stopPlayback = () => {
    if (songTimerRef.current) clearInterval(songTimerRef.current);
    if (rhythmIntervalRef.current) clearInterval(rhythmIntervalRef.current);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    if (isRecordingSingAlong) {
      stopRecordingSingAlong();
    }
  };

  // Start karaoke playback with synchronized drum rhythm
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      setIsPlaying(true);
      gameAudio.playClick();
      playCurrentLine(activeVerseIndex);

      // Start drum rhythm loop if enabled
      if (drumLoopActive) {
        startRhythmEngine();
      }

      // Progress lines every ~4 seconds (adjusted by tempo)
      const lineDuration = Math.round(4000 / tempo);
      if (songTimerRef.current) clearInterval(songTimerRef.current);
      songTimerRef.current = setInterval(() => {
        setActiveVerseIndex((prev) => {
          const next = prev + 1;
          if (next >= verses.length) {
            // Reached end of song
            stopPlayback();
            setStarsEarned(5);
            setShowPraise(true);
            gameAudio.playPraiseChime();
            return 0;
          } else {
            playCurrentLine(next);
            return next;
          }
        });
      }, lineDuration);
    }
  };

  const playCurrentLine = (index: number) => {
    const verse = verses[index];
    if (!verse) return;
    const textToSpeak = activeScript === 'hindi' ? verse.hindiText : (verse.romanText || verse.hindiText);
    gameAudio.speakTribalWord(textToSpeak, tempo < 0.85);
  };

  const startRhythmEngine = () => {
    if (rhythmIntervalRef.current) clearInterval(rhythmIntervalRef.current);
    let beat = 0;
    const beatInterval = Math.round(600 / tempo); // ~100 bpm
    rhythmIntervalRef.current = setInterval(() => {
      beat = (beat + 1) % 4;
      if (beat === 0) {
        gameAudio.playMandar(true); // Bass Mandar
      } else if (beat === 2) {
        gameAudio.playDama(); // Sharp Nagara crack
      } else {
        gameAudio.playGhungroo(); // Light bell
      }
    }, beatInterval);
  };

  const handleManualDrumPad = (instrument: 'mandar' | 'dama' | 'tamak' | 'rutu' | 'ghungroo') => {
    setActiveDrumHit(instrument);
    if (instrument === 'mandar') gameAudio.playMandar(false);
    else if (instrument === 'dama') gameAudio.playDama();
    else if (instrument === 'tamak') gameAudio.playTamak();
    else if (instrument === 'rutu') gameAudio.playRutu(activeVerseIndex);
    else if (instrument === 'ghungroo') gameAudio.playGhungroo();

    setTimeout(() => setActiveDrumHit(null), 250);
  };

  // Sing-along voice recording
  const startRecordingSingAlong = async () => {
    try {
      gameAudio.playMicBeep('start');
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecordingSingAlong(true);
    } catch {
      // Offline fallback
      setIsRecordingSingAlong(true);
      setTimeout(() => {
        setIsRecordingSingAlong(false);
        setStarsEarned(4);
        gameAudio.playPraiseChime();
      }, 5000);
    }
  };

  const stopRecordingSingAlong = () => {
    gameAudio.playMicBeep('stop');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecordingSingAlong(false);
    setStarsEarned(5);
    setShowPraise(true);
    gameAudio.playPraiseChime();
  };

  if (!isOpen || !story) return null;

  return (
    <div 
      id="interactive-song-modal"
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              🎵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950">
                  {story.language} Traditional Folk Music
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                  Karaoke Sing-Along &bull; 100% Offline
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mt-1">
                {story.titleHindi}
              </h2>
              <div className="text-xs sm:text-sm font-bold text-emerald-800">
                {story.titleTribal}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopPlayback();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Script Selection Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3 p-1 bg-slate-100 rounded-xl shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveScript('script')}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
              activeScript === 'script' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            मातृभाषा ({story.language === 'Santhali' ? 'Ol Chiki' : story.language === 'Ho' ? 'Warang Chiti' : 'Mundari'})
          </button>
          <button
            onClick={() => setActiveScript('roman')}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
              activeScript === 'roman' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Roman Phonetics
          </button>
          <button
            onClick={() => setActiveScript('hindi')}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
              activeScript === 'hindi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            हिन्दी भावार्थ
          </button>
          <button
            onClick={() => setActiveScript('english')}
            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
              activeScript === 'english' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English Meaning
          </button>
        </div>

        {/* Synchronized Karaoke Verses Display */}
        <div className="flex-1 overflow-y-auto my-3.5 p-4 rounded-2xl bg-gradient-to-b from-amber-50/50 to-orange-50/40 border border-amber-200/70 space-y-3">
          {verses.map((verse, idx) => {
            const isCurrent = idx === activeVerseIndex;
            return (
              <div
                key={verse.lineNum}
                onClick={() => {
                  setActiveVerseIndex(idx);
                  playCurrentLine(idx);
                }}
                className={`p-3.5 rounded-xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-white border-orange-400 shadow-md scale-[1.01]'
                    : 'bg-white/60 border-slate-200/60 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {verse.lineNum}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Line {verse.lineNum}
                    </span>
                  </div>
                  {isCurrent && isPlaying && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                      सस्वर गायन (Singing)
                    </span>
                  )}
                </div>

                {/* Primary Script Text */}
                <div className={`mt-2 font-bold transition-colors ${
                  isCurrent ? 'text-orange-950 text-lg sm:text-xl' : 'text-slate-800 text-base sm:text-lg'
                }`}>
                  {activeScript === 'script' && verse.scriptText}
                  {activeScript === 'roman' && verse.romanText}
                  {activeScript === 'hindi' && verse.hindiText}
                  {activeScript === 'english' && verse.englishText}
                </div>

                {/* Sub-text Translation / Phonetic */}
                <div className="mt-1 text-xs text-slate-600 font-medium">
                  {activeScript === 'script' && (
                    <span className="italic text-emerald-800">{verse.romanText} &bull; {verse.hindiText}</span>
                  )}
                  {activeScript === 'roman' && (
                    <span className="text-slate-700">{verse.hindiText}</span>
                  )}
                  {activeScript === 'hindi' && (
                    <span className="italic text-orange-900">{verse.romanText}</span>
                  )}
                  {activeScript === 'english' && (
                    <span className="text-slate-600">{verse.hindiText}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Virtual Tribal Rhythm Drum Pads */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 shrink-0 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span>🥁</span>
              <span>झारखंड पारंपरिक ताल वाद्य पैड (Tap Drums to Accompany)</span>
            </span>
            <span className="text-[11px] text-slate-500 font-normal">
              {instrumentTipText}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => handleManualDrumPad('mandar')}
              className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeDrumHit === 'mandar'
                  ? 'bg-amber-200 border-amber-600 scale-95 shadow-inner'
                  : 'bg-white border-amber-300 hover:border-amber-500 hover:bg-amber-50'
              }`}
            >
              <span className="text-xl">🪘</span>
              <span className="text-[11px] font-black text-slate-900 mt-0.5">मांदर (Bass)</span>
              <span className="text-[9px] text-slate-500">धुम-धुम</span>
            </button>

            <button
              onClick={() => handleManualDrumPad('dama')}
              className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeDrumHit === 'dama'
                  ? 'bg-rose-200 border-rose-600 scale-95 shadow-inner'
                  : 'bg-white border-rose-300 hover:border-rose-500 hover:bg-rose-50'
              }`}
            >
              <span className="text-xl">🥁</span>
              <span className="text-[11px] font-black text-slate-900 mt-0.5">दमा / नगाड़ा</span>
              <span className="text-[9px] text-slate-500">दाम-दाम</span>
            </button>

            <button
              onClick={() => handleManualDrumPad('tamak')}
              className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeDrumHit === 'tamak'
                  ? 'bg-orange-200 border-orange-600 scale-95 shadow-inner'
                  : 'bg-white border-orange-300 hover:border-orange-500 hover:bg-orange-50'
              }`}
            >
              <span className="text-xl">🪘</span>
              <span className="text-[11px] font-black text-slate-900 mt-0.5">टमाक (Bass)</span>
              <span className="text-[9px] text-slate-500">थाप-थाप</span>
            </button>

            <button
              onClick={() => handleManualDrumPad('rutu')}
              className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeDrumHit === 'rutu'
                  ? 'bg-emerald-200 border-emerald-600 scale-95 shadow-inner'
                  : 'bg-white border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50'
              }`}
            >
              <span className="text-xl">🪈</span>
              <span className="text-[11px] font-black text-slate-900 mt-0.5">रूतू (Flute)</span>
              <span className="text-[9px] text-slate-500">तान</span>
            </button>

            <button
              onClick={() => handleManualDrumPad('ghungroo')}
              className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                activeDrumHit === 'ghungroo'
                  ? 'bg-purple-200 border-purple-600 scale-95 shadow-inner'
                  : 'bg-white border-purple-300 hover:border-purple-500 hover:bg-purple-50'
              }`}
            >
              <span className="text-xl">🔔</span>
              <span className="text-[11px] font-black text-slate-900 mt-0.5">घुंघरू</span>
              <span className="text-[9px] text-slate-500">छन-छन</span>
            </button>
          </div>
        </div>

        {/* Praise & Stars Toast */}
        {showPraise && (
          <div className="mt-2 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-950 animate-bounce">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              शानदार गायन! आपने पूरा लोकगीत गाकर 5 स्टार जीते! ⭐⭐⭐⭐⭐
            </span>
            <button
              onClick={() => setShowPraise(false)}
              className="text-xs text-emerald-800 underline cursor-pointer"
            >
              बंद करें
            </button>
          </div>
        )}

        {/* Bottom Playback & Voice Recording Bar */}
        <div className="pt-3 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Main Play/Pause Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>विराम (Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>गीत बजाएं (Play Song)</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setActiveVerseIndex(0);
                gameAudio.playClick();
                if (isPlaying) playCurrentLine(0);
              }}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              title="गीत पुनः शुरू करें"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Tempo Control Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setTempo(0.7)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  tempo === 0.7 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
                title="धीमी गति (Slow practice for children)"
              >
                🐢 0.7x
              </button>
              <button
                onClick={() => setTempo(1.0)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  tempo === 1.0 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => setTempo(1.2)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  tempo === 1.2 ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
                title="नृत्य गति (Festive Dance Pace)"
              >
                💃 1.2x
              </button>
            </div>
          </div>

          {/* Sing-Along Mic Recorder & AI Verse Composer */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleComposeNewAiVerse}
              disabled={isComposingVerse}
              className="px-3 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Dynamically compose a new folk song verse with AI"
            >
              <Sparkles className={`w-3.5 h-3.5 text-purple-700 ${isComposingVerse ? 'animate-spin' : ''}`} />
              <span>{isComposingVerse ? 'रच रहा है...' : '+ नया पद (AI Verse)'}</span>
            </button>

            {!isRecordingSingAlong ? (
              <button
                onClick={startRecordingSingAlong}
                className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-rose-600" />
                <span>गाकर रिकॉर्ड करें (Sing Along)</span>
              </button>
            ) : (
              <button
                onClick={stopRecordingSingAlong}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 animate-pulse transition-colors cursor-pointer"
              >
                <MicOff className="w-3.5 h-3.5" />
                <span>रिकॉर्डिंग रोकें (Stop)</span>
              </button>
            )}

            {recordedAudioUrl && (
              <audio src={recordedAudioUrl} controls className="h-8 w-44" />
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
