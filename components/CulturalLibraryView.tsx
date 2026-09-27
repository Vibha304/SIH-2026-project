import React, { useState } from 'react';
import { 
  WifiOff, 
  Search, 
  BookOpen, 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  Download, 
  CheckCircle2, 
  X, 
  Sparkles, 
  TreePine, 
  Feather, 
  Sprout, 
  Share2,
  Mic,
  Languages,
  Award,
  Plus,
  RefreshCw
} from 'lucide-react';
import { CulturalStory, TribalLanguage } from '../types';
import { TribalFlashcardsView } from './TribalFlashcardsView';
import { InteractiveSongPlayerModal } from './InteractiveSongPlayerModal';
import { InteractiveStoryModal } from './InteractiveStoryModal';
import { InteractiveGamesModal } from './InteractiveGamesModal';
import { CulturalSearchModal } from './CulturalSearchModal';
import { EducationalVideosSection } from './EducationalVideosSection';
import { trStoryTitle, trStorySubtitle, trStoryType, trStoryDuration, trLanguage } from '../utils/i18n';

interface CulturalLibraryViewProps {
  stories: CulturalStory[];
  onToggleDownload: (id: string) => void;
  onCreateCustomStory?: (newStory: CulturalStory) => void;
  uiLang: 'en' | 'hi';
  onOpenInteractiveGame?: (gameId?: string) => void;
}

export const CulturalLibraryView: React.FC<CulturalLibraryViewProps> = ({
  stories,
  onToggleDownload,
  onCreateCustomStory,
  uiLang,
  onOpenInteractiveGame
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'flashcards'>('stories');
  const [flashcardLangFilter, setFlashcardLangFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Dynamic AI Cultural Material Creator State
  const [localGeneratedStories, setLocalGeneratedStories] = useState<CulturalStory[]>([]);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [genTopic, setGenTopic] = useState('');
  const [genLanguage, setGenLanguage] = useState<TribalLanguage>('Santhali');
  const [genType, setGenType] = useState<'Story' | 'Song' | 'Folklore'>('Story');
  const [isGeneratingMaterial, setIsGeneratingMaterial] = useState(false);

  // Interactive Content Modals State
  const [activeSongStory, setActiveSongStory] = useState<CulturalStory | null>(null);
  const [activeStoryItem, setActiveStoryItem] = useState<CulturalStory | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchModalTopic, setSearchModalTopic] = useState<string>('Sarhul and Sal Blossom festival');

  const allStories = [
    ...localGeneratedStories.filter((ls) => !stories.some((s) => s.id === ls.id)),
    ...stories
  ];

  // Filter logic
  const filteredStories = allStories.filter((item) => {
    const matchesSearch = 
      item.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'all' || item.language === selectedLanguage;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesLang && matchesType;
  });

  const handleGenerateDynamicMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetTopic = genTopic.trim() || 'Birsa Munda & Forest Harmony';
    setIsGeneratingMaterial(true);

    try {
      const res = await fetch('/api/cultural/generate-material', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: targetTopic,
          language: genLanguage,
          type: genType,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        const created: CulturalStory = json.data;
        setLocalGeneratedStories((prev) => [created, ...prev]);
        if (onCreateCustomStory) {
          onCreateCustomStory(created);
        }
        setIsGeneratorOpen(false);
        setGenTopic('');
        // Automatically open the newly generated story or song
        if (created.type === 'Song') {
          setActiveSongStory(created);
        } else {
          setActiveStoryItem(created);
        }
      }
    } catch (err) {
      console.warn('Cultural material fallback:', err);
    } finally {
      setIsGeneratingMaterial(false);
    }
  };

  const handleOpenItem = (story: CulturalStory) => {
    if (story.type === 'Song') {
      setActiveSongStory(story);
    } else if (story.type === 'Game') {
      if (onOpenInteractiveGame) {
        onOpenInteractiveGame(story.id);
      }
      setActiveGameId(story.id);
      setIsGameModalOpen(true);
    } else {
      // Story or Folklore
      setActiveStoryItem(story);
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10">
      {/* Unified Top Navigation & Action Toolbar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left: Segmented View & Interactive Lab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
          <button
            id="tab-cultural-stories"
            onClick={() => setActiveTab('stories')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stories'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>{uiLang === 'hi' ? 'कथाएं एवं लोकगीत' : 'Stories & Songs'}</span>
            <span className="text-[11px] text-slate-400">({stories.length})</span>
          </button>

          <button
            id="tab-cultural-flashcards"
            onClick={() => {
              setFlashcardLangFilter('all');
              setActiveTab('flashcards');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-emerald-600" />
            <span>{uiLang === 'hi' ? 'उच्चारण फ़्लैशकार्ड' : 'Pronunciation Flashcards'}</span>
          </button>

          <button
            id="btn-launch-interactive-games-banner"
            onClick={() => {
              if (onOpenInteractiveGame) {
                onOpenInteractiveGame();
              } else {
                setActiveGameId('market');
                setIsGameModalOpen(true);
              }
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-amber-900 hover:bg-white/70 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🎮</span>
            <span>{uiLang === 'hi' ? 'बाल खेल (FLN Games)' : 'FLN Games'}</span>
          </button>
        </div>

        {/* Right: Create & Research Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-open-cultural-search"
            onClick={() => {
              setSearchModalTopic('Jharkhand tribal lore, festivals and sacred groves');
              setIsSearchModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{uiLang === 'hi' ? 'सांस्कृतिक शोध' : 'Cultural Research'}</span>
          </button>

          <button
            id="btn-open-dynamic-story-creator"
            onClick={() => {
              setActiveTab('stories');
              setIsGeneratorOpen(!isGeneratorOpen);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{uiLang === 'hi' ? 'नई कहानी / गीत रचें' : 'Create Story / Song'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic AI Story, Folklore & Folk Song Creator Panel */}
      {isGeneratorOpen && activeTab === 'stories' && (
        <form
          onSubmit={handleGenerateDynamicMaterial}
          className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>
                {uiLang === 'hi'
                  ? 'गतिशील मातृभाषा कहानी, लोकगाथा या कराओके लोकगीत निर्माता'
                  : 'Dynamic Bilingual Story, Folklore & Karaoke Song Generator'}
              </span>
            </h4>
            <button
              type="button"
              onClick={() => setIsGeneratorOpen(false)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'विषय या प्रसंग:' : 'Topic / Moral / Theme:'}
              </label>
              <input
                type="text"
                value={genTopic}
                onChange={(e) => setGenTopic(e.target.value)}
                placeholder={
                  uiLang === 'hi'
                    ? 'उदा. बिरसा मुंडा का बचपन, नदी की मछलियों की गिनती, करम पर्व का गीत...'
                    : 'e.g. Clever Rabbit in Saranda, Counting Raindrops Song, Honesty at the Haat...'
                }
                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'मातृभाषा:' : 'Tribal Language:'}
              </label>
              <select
                value={genLanguage}
                onChange={(e) => setGenLanguage(e.target.value as TribalLanguage)}
                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="Santhali">{uiLang === 'hi' ? '🌲 संथाली (ओल चिकी)' : '🌲 Santhali (Ol Chiki)'}</option>
                <option value="Ho">{uiLang === 'hi' ? '🪶 हो (वरंग क्षिति)' : '🪶 Ho (Warang Chiti)'}</option>
                <option value="Mundari">{uiLang === 'hi' ? '🌿 मुंडारी (देवनागरी)' : '🌿 Mundari (Devanagari)'}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'विधा:' : 'Material Format:'}
              </label>
              <select
                value={genType}
                onChange={(e) => setGenType(e.target.value as 'Story' | 'Song' | 'Folklore')}
                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="Story">{uiLang === 'hi' ? '📖 सचित्र कहानी (प्रश्नोत्तरी सहित)' : '📖 Interactive Story + Quiz'}</option>
                <option value="Song">{uiLang === 'hi' ? '🎵 लोकगीत (कराओके व मांदर ताल)' : '🎵 Karaoke Song + Drum Pads'}</option>
                <option value="Folklore">{uiLang === 'hi' ? '📜 प्राचीन लोकगाथा' : '📜 Tribal Folklore'}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsGeneratorOpen(false)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isGeneratingMaterial}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {isGeneratingMaterial ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{uiLang === 'hi' ? 'रचा जा रहा है...' : 'Synthesizing...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{uiLang === 'hi' ? 'इंटरएक्टिव सामग्री बनाएं' : 'Generate & Open Material'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'flashcards' ? (
        <TribalFlashcardsView
          initialLanguage={flashcardLangFilter}
          uiLang={uiLang}
          onClose={() => setActiveTab('stories')}
        />
      ) : (
        /* STORIES & LORE TAB CONTENT */
        <div className="space-y-5">
          {/* Unified Search, Language & Type Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="input-cultural-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={uiLang === 'hi' ? 'कहानियां, लोकगीत, परंपराएं खोजें...' : 'Search stories, songs, traditions...'}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600"
                />
              </div>

              {/* Language Segmented Filter */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
                <button
                  id="filter-lang-all"
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLanguage === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {uiLang === 'hi' ? 'सभी भाषाएं' : 'All'} ({stories.length})
                </button>
                <button
                  id="filter-lang-santhali"
                  onClick={() => setSelectedLanguage('Santhali')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLanguage === 'Santhali'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🌲 {uiLang === 'hi' ? 'संथाली' : 'Santhali'}
                </button>
                <button
                  id="filter-lang-ho"
                  onClick={() => setSelectedLanguage('Ho')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLanguage === 'Ho'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🪶 {uiLang === 'hi' ? 'हो' : 'Ho'}
                </button>
                <button
                  id="filter-lang-mundari"
                  onClick={() => setSelectedLanguage('Mundari')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedLanguage === 'Mundari'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🌿 {uiLang === 'hi' ? 'मुंडारी' : 'Mundari'}
                </button>
              </div>
            </div>

            {/* Content Type Filter Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  id="filter-type-all"
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedType === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {uiLang === 'hi' ? 'सभी प्रकार' : 'All Types'}
                </button>
                {['Song', 'Story', 'Folklore', 'Game'].map((type) => {
                  const count = stories.filter((s) => s.type === type).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={type}
                      id={`filter-type-${type.toLowerCase()}`}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                        selectedType === type
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{type === 'Song' ? '🎵' : type === 'Story' ? '📖' : type === 'Folklore' ? '✨' : '🎯'}</span>
                      <span>{trStoryType(type, uiLang)} ({count})</span>
                    </button>
                  );
                })}
              </div>

              <span className="text-[11px] text-slate-400">
                {uiLang === 'hi' ? 'सभी सामग्री ऑफ़लाइन कैश उपलब्ध' : 'All content cached for offline playback'}
              </span>
            </div>
          </div>

          {/* Cultural Content Cards Grid (Directly matching Screenshot 5) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredStories.map((story) => {
              const isGreen = story.colorTheme === 'green';
              const isHo = story.language === 'Ho';
              const isMundari = story.language === 'Mundari';
              const badgeIcon = isHo ? '🪶' : isMundari ? '🌿' : '🌲';
              const headerBg = isGreen ? 'bg-emerald-700' : 'bg-amber-600';
              const isSong = story.type === 'Song';
              const isGame = story.type === 'Game';

              return (
                <div
                  key={story.id}
                  id={`cultural-card-${story.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div
                    onClick={() => handleOpenItem(story)}
                    className="cursor-pointer"
                  >
                    {/* Header Banner (Matching Screenshot 5) */}
                    <div className={`${headerBg} h-32 sm:h-36 relative flex items-center justify-center text-white transition-opacity group-hover:opacity-95`}>
                      {/* Central Large Icon */}
                      {isSong ? (
                        <Music className="w-12 h-12 stroke-[1.8] text-white/90" />
                      ) : isGame ? (
                        <Sparkles className="w-12 h-12 stroke-[1.8] text-white/90" />
                      ) : (
                        <BookOpen className="w-12 h-12 stroke-[1.8] text-white/90" />
                      )}

                      {/* Top Right Language Badge */}
                      <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 text-slate-900 flex items-center justify-center text-sm shadow-sm">
                        {badgeIcon}
                      </div>

                      {/* Bottom Left Content Type Chip */}
                      <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-white text-slate-900 text-xs font-bold shadow-xs flex items-center gap-1">
                        <span>{isSong ? '🎵' : isGame ? '🎮' : '📖'}</span>
                        <span>{trStoryType(story.type, uiLang)}</span>
                      </div>

                      {/* Hover Interactive Indicator */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 fill-slate-900" />
                          <span>
                            {isGame
                              ? (uiLang === 'hi' ? 'खेल शुरू करें' : 'Start Game')
                              : isSong
                              ? (uiLang === 'hi' ? 'गीत बजाएं' : 'Play Song')
                              : (uiLang === 'hi' ? 'कहानी पढ़ें' : 'Read Story')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug font-devanagari group-hover:text-emerald-700 transition-colors">
                        {trStoryTitle(story, uiLang)}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
                        {trStorySubtitle(story, uiLang)}
                      </p>
                      <div className="mt-2 text-[11px] font-mono text-emerald-800/80 bg-emerald-50/50 px-2 py-0.5 rounded inline-block">
                        {story.titleTribal}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer (Matching Screenshot 5: ▷ 8 min, speaker, download + Pronunciation Practice) */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    {/* Play duration / Game launch / Pronunciation */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleOpenItem(story)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isGame
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                            : isSong
                            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>
                          {isGame
                            ? (uiLang === 'hi' ? 'खेलें' : 'Play')
                            : isSong
                            ? (uiLang === 'hi' ? 'गाएं व सुनें' : 'Sing & Play')
                            : (uiLang === 'hi' ? 'पढ़ें व सुनें' : 'Read & Listen')}
                        </span>
                      </button>

                      <span className="text-xs text-slate-500 font-medium">
                        {trStoryDuration(story.duration, uiLang)}
                      </span>

                      {/* Quick Pronunciation Practice for this story's language */}
                      <button
                        onClick={() => {
                          setFlashcardLangFilter(story.language);
                          setActiveTab('flashcards');
                        }}
                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title={uiLang === 'hi' ? 'इस भाषा के शब्दों के उच्चारण का अभ्यास करें' : 'Practice pronunciation of vocabulary in this language'}
                      >
                        <Mic className="w-3 h-3 text-emerald-700" />
                        <span>{uiLang === 'hi' ? 'उच्चारण' : 'Speak'}</span>
                      </button>
                    </div>

                    {/* Action Icons: Speaker & Download */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenItem(story)}
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        title={uiLang === 'hi' ? 'इंटरएक्टिव अनुभव खोलें' : 'Open Interactive Experience'}
                        aria-label="Play audio"
                      >
                        <Volume2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                      <button
                        onClick={() => onToggleDownload(story.id)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          story.isDownloaded
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                        }`}
                        title={story.isDownloaded ? (uiLang === 'hi' ? 'ऑफ़लाइन उपयोग के लिए सहेजा गया' : 'Cached for offline use') : (uiLang === 'hi' ? 'ऑफ़लाइन उपयोग के लिए सहेजें' : 'Cache for offline use')}
                        aria-label="Download for offline"
                      >
                        {story.isDownloaded ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {uiLang === 'hi' ? 'कोई सांस्कृतिक कहानी या लोकगीत नहीं मिला' : 'No cultural stories or songs found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {uiLang === 'hi'
                  ? 'हमारे जनजातीय लोकसाहित्य और संगीत संग्रह को देखने के लिए अपनी खोज या भाषा फ़िल्टर बदलें।'
                  : 'Try adjusting your search query or language filter to explore our tribal folklore and music collection.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLanguage('all');
                  setSelectedType('all');
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                {uiLang === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
              </button>
            </div>
          )}

          {/* Educational Videos Section (Veo 3 AI Video Visuals) */}
          <EducationalVideosSection
            uiLang={uiLang}
          />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 1. INTERACTIVE SONG PLAYER MODAL (KARAOKE & SYNTH ENGINE) */}
      {/* ------------------------------------------------------------- */}
      {activeSongStory && (
        <InteractiveSongPlayerModal
          story={activeSongStory}
          isOpen={!!activeSongStory}
          onClose={() => setActiveSongStory(null)}
          uiLang={uiLang}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE STORY & FOLKLORE MODAL (SCENES, ECHO & QUIZ) */}
      {/* ------------------------------------------------------------- */}
      {activeStoryItem && (
        <InteractiveStoryModal
          story={activeStoryItem}
          isOpen={!!activeStoryItem}
          onClose={() => setActiveStoryItem(null)}
          uiLang={uiLang}
          onOpenPronunciationPractice={(lang: TribalLanguage) => {
            setActiveStoryItem(null);
            setFlashcardLangFilter(lang);
            setActiveTab('flashcards');
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE FLN & TRIBAL GAMES MODAL */}
      {/* ------------------------------------------------------------- */}
      {isGameModalOpen && (
        <InteractiveGamesModal
          isOpen={isGameModalOpen}
          onClose={() => setIsGameModalOpen(false)}
          initialGameId={activeGameId || 'market'}
          uiLang={uiLang}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. GOOGLE SEARCH GROUNDED CULTURAL RESEARCH MODAL */}
      {/* ------------------------------------------------------------- */}
      {isSearchModalOpen && (
        <CulturalSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          defaultTopic={searchModalTopic}
          defaultLanguage={selectedLanguage !== 'all' ? (selectedLanguage as TribalLanguage) : 'Santhali'}
          uiLang={uiLang}
        />
      )}
    </div>
  );
};
