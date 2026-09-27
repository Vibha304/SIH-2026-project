import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Mic, 
  MicOff, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  HelpCircle, 
  BookOpen, 
  Wind,
  Award,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { CulturalStory, TribalLanguage } from '../types';
import { STORY_DETAILS, StoryScene, StoryQuizQuestion } from '../data/culturalDetailsData';
import { gameAudio } from '../utils/gameAudio';

export interface InteractiveStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: CulturalStory | null;
  uiLang: 'en' | 'hi';
  onOpenPronunciationPractice?: (lang: TribalLanguage) => void;
}

export const InteractiveStoryModal: React.FC<InteractiveStoryModalProps> = ({
  isOpen,
  onClose,
  story,
  uiLang,
  onOpenPronunciationPractice
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeScript, setActiveScript] = useState<'script' | 'roman' | 'hindi' | 'english'>('script');
  const [ambientNature, setAmbientNature] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{ word: string; roman: string; meaning: string } | null>(null);

  // Quiz state
  const [activeTab, setActiveTab] = useState<'story' | 'quiz'>('story');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Voice Read-Along state
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [readAlongPraise, setReadAlongPraise] = useState<string | null>(null);
  const [extraScenes, setExtraScenes] = useState<StoryScene[]>([]);
  const [extraQuiz, setExtraQuiz] = useState<StoryQuizQuestion[]>([]);
  const [isGeneratingScene, setIsGeneratingScene] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const ambientTimerRef = useRef<NodeJS.Timeout | null>(null);

  const storyData = story ? STORY_DETAILS[story.id] : null;
  const baseScenes: StoryScene[] = (story?.customScenes && story.customScenes.length > 0)
    ? story.customScenes
    : (storyData?.scenes || [
        {
          sceneNum: 1,
          sceneTitleHindi: story?.titleHindi || '',
          sceneTitleTribal: story?.titleTribal || '',
          illustrationIcon: story?.type === 'Folklore' ? '📜' : '📖',
          paragraphScript: story?.contentTribalScript || '',
          paragraphRoman: story?.contentTribalRoman || '',
          paragraphHindi: story?.contentHindi || '',
          paragraphEnglish: story?.contentEnglish || '',
          keyVocabulary: [
            { word: story?.titleTribal || '', roman: story?.titleEnglish || '', meaning: story?.titleHindi || '' }
          ]
        }
      ]);
  const scenes: StoryScene[] = [...baseScenes, ...extraScenes];

  const currentScene = scenes[currentSceneIdx] || scenes[0];
  const baseQuiz: StoryQuizQuestion[] = (story?.customQuiz && story.customQuiz.length > 0)
    ? story.customQuiz
    : (storyData?.quiz || []);
  const quizList: StoryQuizQuestion[] = [...baseQuiz, ...extraQuiz];
  const moralText = story?.customMoralLesson || storyData?.moralLesson || '';
  const insightText = story?.customCulturalInsight || storyData?.culturalInsight || '';

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    } else {
      setCurrentSceneIdx(0);
      setActiveTab('story');
      setQuizAnswers({});
      setQuizSubmitted(false);
      setExtraScenes([]);
      setExtraQuiz([]);
    }
  }, [isOpen, story?.id]);

  const handleGenerateAiSceneAndQuiz = async () => {
    if (!story || isGeneratingScene) return;
    setIsGeneratingScene(true);
    try {
      const res = await fetch('/api/cultural/generate-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `${story.titleEnglish || story.titleHindi} - Next Chapter & Continuation`,
          language: story.language,
          type: story.type === 'Folklore' ? 'Folklore' : 'Story',
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.data?.customScenes?.length) {
        const newSceneRaw = json.data.customScenes[0];
        const newScene: StoryScene = {
          ...newSceneRaw,
          sceneNum: scenes.length + 1,
        };
        setExtraScenes((prev) => [...prev, newScene]);
        if (Array.isArray(json.data.customQuiz) && json.data.customQuiz.length > 0) {
          setExtraQuiz((prev) => [...prev, ...json.data.customQuiz]);
        }
        setCurrentSceneIdx(scenes.length);
        gameAudio.playSuccess();
      }
    } catch (err) {
      console.warn('Dynamic scene generation error:', err);
    } finally {
      setIsGeneratingScene(false);
    }
  };

  const handleGenerateAiQuiz = async () => {
    if (!story || isGeneratingQuiz) return;
    setIsGeneratingQuiz(true);
    try {
      const res = await fetch('/api/cultural/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: `${story.titleHindi} (${story.titleEnglish || story.titleTribal})`,
          language: story.language,
          contextText: scenes.map((s) => s.paragraphHindi).join(' '),
          count: 2,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && Array.isArray(json.data) && json.data.length > 0) {
        setExtraQuiz((prev) => [...prev, ...json.data]);
        setQuizSubmitted(false);
        gameAudio.playSuccess();
      }
    } catch (err) {
      console.warn('Dynamic story quiz generation error:', err);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  useEffect(() => {
    if (ambientNature) {
      gameAudio.playForestAmbience();
      ambientTimerRef.current = setInterval(() => {
        gameAudio.playForestAmbience();
      }, 7000);
    } else {
      if (ambientTimerRef.current) clearInterval(ambientTimerRef.current);
    }
    return () => {
      if (ambientTimerRef.current) clearInterval(ambientTimerRef.current);
    };
  }, [ambientNature]);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (ambientTimerRef.current) clearInterval(ambientTimerRef.current);
    setIsPlaying(false);
  };

  const handlePlayScene = (idx: number) => {
    const scene = scenes[idx];
    if (!scene) return;
    setIsPlaying(true);
    const textToSpeak = activeScript === 'hindi' ? scene.paragraphHindi : (scene.paragraphRoman || scene.paragraphHindi);
    gameAudio.speakTribalWord(textToSpeak, false);
    const estDuration = Math.max(2500, Math.min(8000, textToSpeak.length * 95));
    setTimeout(() => {
      setIsPlaying(false);
    }, estDuration);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      handlePlayScene(currentSceneIdx);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIdx < scenes.length - 1) {
      const next = currentSceneIdx + 1;
      setCurrentSceneIdx(next);
      if (isPlaying) handlePlayScene(next);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      const prev = currentSceneIdx - 1;
      setCurrentSceneIdx(prev);
      if (isPlaying) handlePlayScene(prev);
    }
  };

  const handleAnswerQuiz = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    gameAudio.playClick();
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuiz = () => {
    let score = 0;
    quizList.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 50;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    if (score >= 50) {
      gameAudio.playSuccess();
    } else {
      gameAudio.playTryAgain();
    }
  };

  const handleVoiceEcho = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      gameAudio.playPraiseChime();
      setReadAlongPraise('शाबाश! आपने बहुत सुंदर और शुद्ध उच्चारण के साथ पढ़ा! ⭐⭐⭐');
      setTimeout(() => setReadAlongPraise(null), 4000);
    } else {
      setIsRecordingVoice(true);
      gameAudio.playMicBeep('start');
      setTimeout(() => {
        setIsRecordingVoice(false);
        gameAudio.playPraiseChime();
        setReadAlongPraise('शाबाश! आपने बहुत सुंदर और शुद्ध उच्चारण के साथ पढ़ा! ⭐⭐⭐');
        setTimeout(() => setReadAlongPraise(null), 4000);
      }, 3500);
    }
  };

  if (!isOpen || !story) return null;

  return (
    <div 
      id="interactive-story-modal"
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          stopAudio();
          onClose();
        }
      }}
    >
      <div className={`bg-white rounded-3xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-200 ${
        isMaximized ? 'max-w-[98vw] h-[95vh] max-h-[95vh]' : 'max-w-3xl max-h-[92vh]'
      }`}>
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
              {story.type === 'Folklore' ? '📜' : '📖'}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  {story.language} &bull; {story.type === 'Folklore' ? (uiLang === 'hi' ? 'प्राचीन लोकगाथा' : 'Folklore') : (uiLang === 'hi' ? 'रोचक कहानी' : 'Story')}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {uiLang === 'hi' ? 'सचित्र कथा पुस्तक' : 'Interactive Storybook'}
                </span>
              </div>
              <h2 className="text-base sm:text-2xl font-black text-slate-900 mt-1 truncate">
                {uiLang === 'hi' ? story.titleHindi : (story.titleEnglish || story.titleHindi)}
              </h2>
              <div className="text-xs sm:text-sm font-bold text-emerald-800 truncate">
                {story.titleTribal}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isMaximized ? (uiLang === 'hi' ? 'छोटा करें' : 'Restore size') : (uiLang === 'hi' ? 'पूर्ण स्क्रीन आकार' : 'Maximize view')}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs: Story Reader vs Comprehension Quiz */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-1 shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'story' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>सचित्र कहानी (Scenes)</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>कहानी समझ प्रश्न (Quiz &bull; {quizList.length})</span>
            </button>
          </div>

          {/* Ambient Nature soundscape toggle */}
          <button
            onClick={() => setAmbientNature(!ambientNature)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              ambientNature 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Toggle gentle woodland nature sounds"
          >
            <Wind className={`w-3.5 h-3.5 ${ambientNature ? 'text-emerald-600 animate-spin' : 'text-slate-400'}`} />
            <span>वन परिवेश ध्वनि (Nature FX)</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: ILLUSTRATED SCENE STORY READER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'story' && (
          <div className="flex-1 flex flex-col min-h-0 my-3 space-y-3 overflow-y-auto">
            
            {/* Scene Card Header with Progress Indicators */}
            <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentScene.illustrationIcon}</span>
                <div>
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    दृश्य {currentSceneIdx + 1} / {scenes.length}: {currentScene.sceneTitleTribal}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {currentScene.sceneTitleHindi}
                  </h4>
                </div>
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5">
                {scenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentSceneIdx(i);
                      if (isPlaying) handlePlayScene(i);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === currentSceneIdx ? 'w-6 bg-emerald-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Script Selection Bar for Story Content */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 text-xs font-bold">
              <button
                onClick={() => setActiveScript('script')}
                className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                  activeScript === 'script' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                मातृभाषा लिपि
              </button>
              <button
                onClick={() => setActiveScript('roman')}
                className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                  activeScript === 'roman' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Roman Phonetic
              </button>
              <button
                onClick={() => setActiveScript('hindi')}
                className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                  activeScript === 'hindi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                हिन्दी अनुवाद
              </button>
              <button
                onClick={() => setActiveScript('english')}
                className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                  activeScript === 'english' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                English
              </button>
            </div>

            {/* Primary Story Text Container with Word Highlighting */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-lg leading-relaxed font-normal">
              {activeScript === 'script' && (
                <div className="font-semibold text-emerald-950 text-lg sm:text-xl">
                  {currentScene.paragraphScript}
                </div>
              )}
              {activeScript === 'roman' && (
                <div className="italic text-slate-800 font-medium">
                  {currentScene.paragraphRoman}
                </div>
              )}
              {activeScript === 'hindi' && (
                <div className="text-slate-900 font-medium">
                  {currentScene.paragraphHindi}
                </div>
              )}
              {activeScript === 'english' && (
                <div className="text-slate-700 text-sm sm:text-base">
                  {currentScene.paragraphEnglish}
                </div>
              )}

              {/* Sub-bilingual helper line */}
              <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-700">हिन्दी भावार्थ: </span>
                {currentScene.paragraphHindi}
              </div>
            </div>

            {/* Tap-to-Speak Vocabulary Cards */}
            {currentScene.keyVocabulary.length > 0 && (
              <div className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>💡</span>
                    <span>महत्वपूर्ण शब्दावली (Tap word to hear speech)</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    FLN द्विभाषी शब्द संवर्धन
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentScene.keyVocabulary.map((vocab, vIdx) => (
                    <button
                      key={vIdx}
                      onClick={() => {
                        setSelectedWord(vocab);
                        gameAudio.playClick();
                        gameAudio.speakTribalWord(vocab.roman || vocab.word);
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 hover:bg-emerald-50/50 text-left transition-all cursor-pointer group"
                    >
                      <div className="text-xs font-black text-emerald-950 group-hover:text-emerald-700">
                        {vocab.word}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {vocab.meaning}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural Insight & Moral Box */}
            {(insightText || moralText) && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5">
                <span className="text-lg">🌿</span>
                <div>
                  <span className="font-bold">सांस्कृतिक व नैतिक सीख: </span>
                  {moralText} {insightText ? `• ${insightText}` : ''}
                </div>
              </div>
            )}

            {/* Read-Along Voice Practice feedback */}
            {readAlongPraise && (
              <div className="p-3 bg-emerald-100 border border-emerald-400 rounded-xl text-xs font-bold text-emerald-950 text-center animate-bounce">
                {readAlongPraise}
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: COMPREHENSION QUIZ */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'quiz' && (
          <div className="flex-1 overflow-y-auto my-3 space-y-4 p-1">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  {uiLang === 'hi' ? 'कहानी समझ व आकलन पहेली (Comprehension Check)' : 'Story Comprehension & Vocabulary Quiz'}
                </div>
                <div className="text-xs text-emerald-800 mt-0.5">
                  {uiLang === 'hi'
                    ? 'कहानी के आधार पर सही उत्तर चुनें या AI से नए प्रश्न जोड़ें।'
                    : 'Select the best answer based on the story or generate new AI questions.'}
                </div>
              </div>
              <button
                type="button"
                id="btn-story-generate-ai-quiz"
                onClick={handleGenerateAiQuiz}
                disabled={isGeneratingQuiz}
                className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingQuiz ? 'animate-spin' : ''}`} />
                <span>
                  {isGeneratingQuiz
                    ? (uiLang === 'hi' ? 'AI प्रश्न बन रहे हैं...' : 'Generating...')
                    : (uiLang === 'hi' ? '+ नए AI प्रश्न जोड़ें' : '+ Generate AI Questions')}
                </span>
              </button>
            </div>

            <div className="space-y-4">
              {quizList.map((q, qIdx) => {
                const userSelected = quizAnswers[qIdx];
                const isCorrect = userSelected === q.correctIndex;
                return (
                  <div key={qIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {qIdx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900">
                          {q.questionHindi}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {q.questionEnglish}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userSelected === optIdx;
                        let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-400';
                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isChosen) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                          }
                        } else if (isChosen) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswerQuiz(qIdx, optIdx)}
                            disabled={quizSubmitted}
                            className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`p-2.5 rounded-xl text-xs ${
                        isCorrect ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'bg-rose-50 text-rose-900'
                      }`}>
                        {isCorrect ? '✅ सही उत्तर! ' : '❌ गलत उत्तर। '}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action / Results */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                {quizSubmitted ? (
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-800">
                    <Award className="w-4 h-4" />
                    <span>कुल स्कोर: {quizScore} अंक &bull; {quizScore >= 50 ? '⭐⭐⭐ उत्कृष्ट!' : 'पुनः प्रयास करें'}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">
                    सभी प्रश्नों का उत्तर देने के बाद 'जांचें' बटन दबाएं।
                  </span>
                )}
              </div>

              <button
                onClick={quizSubmitted ? () => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                } : handleCheckQuiz}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                {quizSubmitted ? 'दोबारा खेलें (Reset)' : 'उत्तर जांचें (Check Answers)'}
              </button>
            </div>
          </div>
        )}

        {/* Bottom Scene Carousel Controls & Audio Narration Bar */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Navigation between scenes */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevScene}
              disabled={currentSceneIdx === 0}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 text-slate-700 transition-colors cursor-pointer"
              title="पिछला दृश्य (Previous Scene)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="px-4 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>रोकें (Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>कहानी सुनें (Narration)</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextScene}
              disabled={currentSceneIdx === scenes.length - 1}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 text-slate-700 transition-colors cursor-pointer"
              title="अगला दृश्य (Next Scene)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Voice Read-Along Echo & AI Scene Generator Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGenerateAiSceneAndQuiz}
              disabled={isGeneratingScene}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Dynamically generate a new story scene and comprehension question with AI"
            >
              <Sparkles className={`w-3.5 h-3.5 text-purple-700 ${isGeneratingScene ? 'animate-spin' : ''}`} />
              <span>{isGeneratingScene ? 'रच रहा है...' : '+ नया दृश्य जोड़ें (AI Scene)'}</span>
            </button>

            <button
              onClick={handleVoiceEcho}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isRecordingVoice
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {isRecordingVoice ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{isRecordingVoice ? 'सुन रहा है...' : 'बोलकर दोहराएं (Voice Echo)'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
