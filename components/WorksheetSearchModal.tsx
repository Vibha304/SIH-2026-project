import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Check, 
  Plus, 
  FileText, 
  ExternalLink, 
  RefreshCw, 
  X 
} from 'lucide-react';
import { WorksheetGroundedData, TribalLanguage, WorksheetItem } from '../types';

interface WorksheetSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  uiLang: 'en' | 'hi';
  onAddWorksheetFromSearch: (worksheet: WorksheetItem) => void;
}

export const WorksheetSearchModal: React.FC<WorksheetSearchModalProps> = ({
  isOpen,
  onClose,
  uiLang,
  onAddWorksheetFromSearch,
}) => {
  const [topic, setTopic] = useState('Saranda Forest Sal Trees & Local Haat Produce');
  const [language, setLanguage] = useState<TribalLanguage>('Santhali');
  const [grade, setGrade] = useState('Grade 1');
  const [domain, setDomain] = useState('wildlife');
  const [isLoading, setIsLoading] = useState(false);
  const [groundedData, setGroundedData] = useState<WorksheetGroundedData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/worksheets/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language, grade, domain }),
      });

      if (!res.ok) throw new Error('Failed to query regional knowledge base for worksheet content');

      const json = await res.json();
      if (json.success && json.data) {
        setGroundedData(json.data);
      } else {
        throw new Error(json.error || 'No grounded worksheet results');
      }
    } catch (err: any) {
      console.warn('Worksheet search fallback:', err?.message);
      setErrorMsg(err.message || 'Error connecting to regional knowledge base');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertIntoWorksheet = () => {
    if (!groundedData) return;

    const vocabExercises = groundedData.recommendedVocabulary?.slice(0, 4).map((v) => ({
      hindi: v.wordHindi,
      tribalScript: v.wordTribal,
      tribalRoman: v.pronunciation,
      phonetic: v.pronunciation,
      meaningEn: v.wordEnglish,
      culturalNote: v.culturalNote
    })) || [];

    const newWs: WorksheetItem = {
      id: `w-search-${Date.now()}`,
      title: `${topic} (${language})`,
      titleHindi: `${topic} - झारखंड संदर्भ FLN`,
      grade,
      description: groundedData.contextSummary?.slice(0, 160) || `Contextual worksheet in ${language}`,
      languages: [language],
      subject: domain === 'market' ? 'Numeracy' : 'Literacy',
      type: domain === 'market' ? 'math-visual' : 'tracing',
      status: 'assigned',
      assignedCount: 1,
      completedCount: 0,
      script: language === 'Santhali' ? 'Ol Chiki' : language === 'Ho' ? 'Warang Chiti' : 'Devanagari',
      topicDomain: domain as any,
      customExercisePayload: {
        domain,
        topic,
        grade,
        language,
        culturalContext: groundedData.contextSummary,
        exercises: vocabExercises,
        mathContext: groundedData.mathScenario ? {
          problem: groundedData.mathScenario.problem,
          answer: groundedData.mathScenario.answer,
          visualItem: 'basket'
        } : undefined
      }
    };

    onAddWorksheetFromSearch(newWs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Regional Context Grounding
              </span>
              <span className="text-xs text-emerald-200 font-semibold">&bull; FLN NIPUN Context</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1">
              {uiLang === 'hi' ? 'वास्तविक संदर्भ खोज: कार्यपत्रक निर्माता' : 'Jharkhand Contextual Worksheet Creator'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search controls */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'खोज विषय / स्थानीय संदर्भ:' : 'Search Topic / Real-world Context:'}
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g. Saranda forest wildlife, Haat market pottery, Kendu leaves"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as TribalLanguage)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="Santhali">Santhali</option>
                <option value="Ho">Ho</option>
                <option value="Mundari">Mundari</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
              </select>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
              >
                <option value="wildlife">Forest Wildlife & Trees</option>
                <option value="market">Rural Haat Market Math</option>
                <option value="festivals">Tribal Festivals & Music</option>
                <option value="classroom">Classroom Everyday FLN</option>
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>{uiLang === 'hi' ? 'स्थानीय संदर्भ खोजें' : 'Find Regional Context'}</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          {/* Results section */}
          {groundedData && (
            <div className="space-y-4 pt-3 border-t border-slate-200">
              {/* Context Summary */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  {uiLang === 'hi' ? 'खोज निष्कर्ष सारांश (Search Findings):' : 'Verified Regional Context:'}
                </span>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  {groundedData.contextSummary}
                </p>
              </div>

              {/* Recommended Grounded Vocabulary */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  {uiLang === 'hi' ? 'प्रामाणिक स्थानीय शब्दावली (Verified Vocabulary):' : 'Recommended Grounded Vocabulary:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {groundedData.recommendedVocabulary?.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{item.wordHindi}</span>
                        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {item.wordTribal}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.wordEnglish} &bull; {item.pronunciation}
                      </div>
                      <div className="text-[10px] text-slate-600 italic">
                        {item.culturalNote}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grounded Math Scenario if available */}
              {groundedData.mathScenario && (
                <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Calculator className="w-3.5 h-3.5 text-amber-700" />
                    <span>{groundedData.mathScenario.title}</span>
                  </div>
                  <p className="text-xs text-amber-800 font-medium">
                    {groundedData.mathScenario.problem}
                  </p>
                  <p className="text-[11px] text-amber-700 italic">
                    Solution: {groundedData.mathScenario.answer}
                  </p>
                </div>
              )}

              {/* Action: Convert to Worksheet */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConvertIntoWorksheet}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{uiLang === 'hi' ? 'इस संदर्भ से कार्यपत्रक बनाएं' : 'Create Grounded Worksheet'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
