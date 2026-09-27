import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  TreePine, 
  Music, 
  CheckCircle2, 
  RefreshCw, 
  Globe, 
  GraduationCap, 
  X 
} from 'lucide-react';
import { CulturalGroundedData, TribalLanguage } from '../types';

interface CulturalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  defaultLanguage?: TribalLanguage;
  uiLang: 'en' | 'hi';
}

export const CulturalSearchModal: React.FC<CulturalSearchModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'Sarhul and Sal Blossom rituals',
  defaultLanguage = 'Santhali',
  uiLang,
}) => {
  const [query, setQuery] = useState(defaultTopic);
  const [language, setLanguage] = useState<TribalLanguage>(defaultLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [groundedData, setGroundedData] = useState<CulturalGroundedData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePerformSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/cultural/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language, topic: query }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch grounded cultural search data');
      }

      const json = await res.json();
      if (json.success && json.data) {
        setGroundedData(json.data);
      } else {
        throw new Error(json.error || 'No grounded data returned');
      }
    } catch (err: any) {
      console.warn('Cultural search fallback:', err?.message);
      setErrorMsg(err.message || 'Could not connect to cultural knowledge base');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 sm:p-6 flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Globe className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Cultural Knowledge Base
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mt-1">
                {uiLang === 'hi' ? 'झारखंड आदिवासी सांस्कृतिक शोध' : 'Jharkhand Tribal Cultural Search'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content & Search Input */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              {uiLang === 'hi' ? 'खोज विषय या लोककथा:' : 'Search Topic or Folklore:'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePerformSearch()}
                placeholder={uiLang === 'hi' ? 'उदा. सरहुल पर्व, करम डाल, मांदर वाद्य, बिरसा मुंडा...' : 'e.g. Sarhul festival, Karam tree, Madal drum, Birsa Munda...'}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as TribalLanguage)}
                className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="Santhali">Santhali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                <option value="Ho">Ho (𑢹𑣉𑣉 𑢱𑣎𑣜𑣉)</option>
                <option value="Mundari">Mundari (मुंडारी)</option>
              </select>
              <button
                onClick={handlePerformSearch}
                disabled={isLoading}
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>{uiLang === 'hi' ? 'खोजें' : 'Search'}</span>
              </button>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-semibold">{uiLang === 'hi' ? 'सुझाव:' : 'Suggestions:'}</span>
              {[
                'Sarhul Sal Blossom folklore',
                'Karam tree brotherhood festival',
                'Birsa Munda Ulihatu history',
                'Sohrai animal wall art tradition',
                'Madal & Dhumsa tribal drums'
              ].map((topic, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(topic);
                  }}
                  className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-medium text-slate-600 transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          {/* Results Display */}
          {groundedData && (
            <div className="space-y-4 pt-3 border-t border-slate-200">
              {/* Summary */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 mb-1">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>{uiLang === 'hi' ? 'शिक्षण सारांश' : 'Pedagogical Summary'}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  {groundedData.summary}
                </p>
              </div>

              {/* Historical Significance */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5 text-slate-700" />
                  <span>{uiLang === 'hi' ? 'ऐतिहासिक एवं सांस्कृतिक महत्व' : 'Historical & Cultural Context'}</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {groundedData.historicalSignificance}
                </p>
              </div>

              {/* Cultural Symbols & Classroom Activities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
                  <span className="text-xs font-bold text-amber-900 block mb-1.5">
                    {uiLang === 'hi' ? '🪶 सांस्कृतिक प्रतीक (Symbols)' : '🪶 Cultural Symbols'}
                  </span>
                  <ul className="text-xs text-amber-800 space-y-1">
                    {groundedData.culturalSymbols?.map((sym, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-sky-50/60 border border-sky-200/80 rounded-xl">
                  <span className="text-xs font-bold text-sky-900 block mb-1.5">
                    {uiLang === 'hi' ? '🎓 कक्षा गतिविधियां (Activities)' : '🎓 Classroom Activities'}
                  </span>
                  <ul className="text-xs text-sky-800 space-y-1">
                    {groundedData.classroomActivities?.map((act, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verified Sources & Grounding Queries */}
              {groundedData.searchQueries && groundedData.searchQueries.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {uiLang === 'hi' ? 'खोज पद:' : 'Search Queries Executed:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {groundedData.searchQueries.map((q, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono"
                      >
                        🔍 {q}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {groundedData.sources && groundedData.sources.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">
                    {uiLang === 'hi' ? 'प्रामाणिक संदर्भ व स्रोत:' : 'Verified Sources & Citations:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {groundedData.sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 text-[11px] font-medium text-slate-700 transition-colors"
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
