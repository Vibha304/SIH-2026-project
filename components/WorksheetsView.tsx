import React, { useState } from 'react';
import { 
  BookOpen, 
  Calculator, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Send, 
  Printer, 
  Filter, 
  Sparkles, 
  Download, 
  Eye, 
  Languages, 
  RotateCcw,
  Shuffle,
  Check
} from 'lucide-react';
import { WorksheetItem, Student, TribalLanguage } from '../types';
import { TopicDomain, PRESET_WORKSHEET_TOPICS, generateDynamicWorksheetContent } from '../utils/worksheetGenerator';
import { WorksheetSearchModal } from './WorksheetSearchModal';
import {
  trWorksheetTitle,
  trWorksheetDesc,
  trGrade,
  trScript,
  trLanguage,
  trSubject,
  trWorksheetType,
  trStudentName
} from '../utils/i18n';

interface WorksheetsViewProps {
  worksheets: WorksheetItem[];
  students: Student[];
  onAssignWorksheet: (worksheetId: string, studentIds: string[]) => void;
  onPreviewWorksheet: (worksheet: WorksheetItem) => void;
  onCreateCustomWorksheet: (newWorksheet: WorksheetItem) => void;
  uiLang: 'en' | 'hi';
}

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({
  worksheets,
  students,
  onAssignWorksheet,
  onPreviewWorksheet,
  onCreateCustomWorksheet,
  uiLang
}) => {
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | 'Hindi' | 'Ho' | 'Mundari' | 'Santhali'>('all');
  const [assigningWorksheet, setAssigningWorksheet] = useState<WorksheetItem | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // New dynamic worksheet generator form state
  const [genTopic, setGenTopic] = useState('Sal Forest Animals & Counting');
  const [genDomain, setGenDomain] = useState<TopicDomain>('wildlife');
  const [genLanguage, setGenLanguage] = useState<TribalLanguage>('Santhali');
  const [genGrade, setGenGrade] = useState('Grade 1');
  const [genSubject, setGenSubject] = useState<'Literacy' | 'Numeracy'>('Literacy');
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isGeneratingAiWorksheet, setIsGeneratingAiWorksheet] = useState(false);

  // Stats calculation matching Screenshot 4 (1 Assigned, 1 In Progress, 4 Completed)
  const assignedCount = worksheets.filter((w) => w.status === 'assigned').length;
  const inProgressCount = worksheets.filter((w) => w.status === 'in_progress').length;
  const completedCount = worksheets.filter((w) => w.status === 'completed').length;

  // Language count helper for quick-action toggle badges
  const getLanguageCount = (lang: 'all' | 'Hindi' | 'Ho' | 'Mundari' | 'Santhali') => {
    return worksheets.filter((w) => {
      const matchesGrade = selectedGradeFilter === 'all' || w.grade === selectedGradeFilter;
      if (!matchesGrade) return false;
      if (lang === 'all') return true;
      if (lang === 'Hindi') {
        return Boolean(w.titleHindi) || (w.languages as string[]).includes('Hindi');
      }
      if (lang === 'Ho') {
        return w.languages.includes('Ho');
      }
      if (lang === 'Mundari') {
        return w.languages.includes('Mundari');
      }
      if (lang === 'Santhali') {
        return w.languages.includes('Santhali');
      }
      return false;
    }).length;
  };

  const filteredWorksheets = worksheets.filter((w) => {
    const matchesGrade = selectedGradeFilter === 'all' || w.grade === selectedGradeFilter;
    let matchesLang = true;
    if (selectedLanguageFilter === 'Hindi') {
      matchesLang = Boolean(w.titleHindi) || (w.languages as string[]).includes('Hindi');
    } else if (selectedLanguageFilter === 'Ho') {
      matchesLang = w.languages.includes('Ho');
    } else if (selectedLanguageFilter === 'Mundari') {
      matchesLang = w.languages.includes('Mundari');
    } else if (selectedLanguageFilter === 'Santhali') {
      matchesLang = w.languages.includes('Santhali');
    }
    return matchesGrade && matchesLang;
  });

  const handleOpenAssign = (ws: WorksheetItem) => {
    setAssigningWorksheet(ws);
    // pre-select students in matching grade
    const defaultStudents = students
      .filter((s) => s.grade === ws.grade)
      .map((s) => s.id);
    setSelectedStudentIds(defaultStudents);
  };

  const handleConfirmAssign = () => {
    if (assigningWorksheet) {
      onAssignWorksheet(assigningWorksheet.id, selectedStudentIds);
      setAssigningWorksheet(null);
    }
  };

  const handleRandomizeTopic = () => {
    const domains: TopicDomain[] = ['wildlife', 'market', 'festivals', 'classroom', 'body', 'numeracy', 'instruments', 'shapes'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const matchingPresets = PRESET_WORKSHEET_TOPICS.filter((p) => p.domain === randomDomain);
    const randomPreset = matchingPresets[Math.floor(Math.random() * matchingPresets.length)] || PRESET_WORKSHEET_TOPICS[0];
    const languages: TribalLanguage[] = ['Santhali', 'Ho', 'Mundari'];
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    const grades = ['Grade 1', 'Grade 2', 'Grade 3'];
    const randomGrade = grades[Math.floor(Math.random() * grades.length)];

    setGenDomain(randomDomain);
    setGenTopic(randomPreset.title);
    setGenSubject(randomPreset.suggestedSubject);
    setGenLanguage(randomLang);
    setGenGrade(randomGrade);
    setIsCustomMode(false);
  };

  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = isCustomMode && customTopicInput.trim() ? customTopicInput.trim() : genTopic;
    const finalDomain = genDomain;
    setIsGeneratingAiWorksheet(true);

    const newWs: WorksheetItem = {
      id: `w-${Date.now()}`,
      title: `${finalTopic} (${genLanguage} & Hindi)`,
      titleHindi: `${finalTopic} (${genLanguage === 'Ho' ? 'हो' : genLanguage === 'Mundari' ? 'मुंडारी' : 'संथाली'} एवं हिन्दी अभ्यास)`,
      grade: genGrade,
      description: `Dynamic bilingual ${genSubject.toLowerCase()} worksheet in ${genLanguage} and Hindi for "${finalTopic}"`,
      languages: [genLanguage],
      subject: genSubject,
      type: genSubject === 'Literacy' ? 'tracing' : 'math-visual',
      status: 'assigned',
      assignedCount: 1,
      completedCount: 0,
      script: genLanguage === 'Santhali' ? 'Ol Chiki' : genLanguage === 'Ho' ? 'Warang Chiti' : 'Devanagari',
      topicDomain: finalDomain
    };

    try {
      const res = await fetch('/api/worksheets/generate-dynamic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: finalTopic,
          domain: finalDomain,
          language: genLanguage,
          grade: genGrade,
          subject: genSubject,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        newWs.customExercisePayload = json.data;
      } else {
        newWs.customExercisePayload = generateDynamicWorksheetContent(newWs);
      }
    } catch {
      newWs.customExercisePayload = generateDynamicWorksheetContent(newWs);
    } finally {
      setIsGeneratingAiWorksheet(false);
    }

    onCreateCustomWorksheet(newWs);
    setShowGeneratorModal(false);
    onPreviewWorksheet(newWs);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10">
      {/* Compact Header & Inline Status Summary Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {uiLang === 'hi' ? 'निपुण भारत द्विभाषी कार्यपत्रक' : 'NIPUN Bharat Bilingual Worksheets'}
          </h2>
          {/* Quiet inline status counts instead of 3 giant stat boxes */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span id="stat-worksheet-assigned">
              <strong className="text-slate-900 tabular-nums">{assignedCount}</strong> {uiLang === 'hi' ? 'आवंटित' : 'Assigned'}
            </span>
            <span aria-hidden="true">·</span>
            <span id="stat-worksheet-in-progress">
              <strong className="text-amber-700 tabular-nums">{inProgressCount}</strong> {uiLang === 'hi' ? 'प्रगति पर' : 'In Progress'}
            </span>
            <span aria-hidden="true">·</span>
            <span id="stat-worksheet-completed">
              <strong className="text-emerald-700 tabular-nums">{completedCount}</strong> {uiLang === 'hi' ? 'पूर्ण' : 'Completed'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-google-search-worksheet"
            onClick={() => setShowSearchModal(true)}
            className="bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            title={uiLang === 'hi' ? 'झारखंड संदर्भ के साथ कार्यपत्रक' : 'Jharkhand Context Worksheet'}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{uiLang === 'hi' ? 'संदर्भ खोज कार्यपत्रक' : 'Search Context'}</span>
          </button>

          <button
            id="btn-generate-worksheet"
            onClick={() => setShowGeneratorModal(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{uiLang === 'hi' ? 'नया कार्यपत्रक बनाएं' : 'Generate Worksheet'}</span>
          </button>
        </div>
      </div>

      {/* Unified Language & Grade Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Language Segmented Filter */}
        <div 
          id="worksheet-language-quick-toggle"
          className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs w-fit"
          role="group"
          aria-label="Filter worksheets by target language"
        >
          <button
            id="toggle-lang-all"
            onClick={() => setSelectedLanguageFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLanguageFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {uiLang === 'hi' ? 'सभी' : 'All'} ({getLanguageCount('all')})
          </button>
          <button
            id="toggle-lang-santhali"
            onClick={() => setSelectedLanguageFilter('Santhali')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLanguageFilter === 'Santhali'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌲 {uiLang === 'hi' ? 'संथाली' : 'Santhali'}
          </button>
          <button
            id="toggle-lang-ho"
            onClick={() => setSelectedLanguageFilter('Ho')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLanguageFilter === 'Ho'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🪶 {uiLang === 'hi' ? 'हो' : 'Ho'}
          </button>
          <button
            id="toggle-lang-mundari"
            onClick={() => setSelectedLanguageFilter('Mundari')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLanguageFilter === 'Mundari'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌿 {uiLang === 'hi' ? 'मुंडारी' : 'Mundari'}
          </button>
          <button
            id="toggle-lang-hindi"
            onClick={() => setSelectedLanguageFilter('Hindi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedLanguageFilter === 'Hindi'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🇮🇳 {uiLang === 'hi' ? 'हिन्दी' : 'Hindi'}
          </button>
        </div>

        {/* Grade Segmented Filter */}
        <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs w-fit">
          {(['all', 'Grade 1', 'Grade 2', 'Grade 3'] as const).map((gr) => (
            <button
              key={gr}
              onClick={() => setSelectedGradeFilter(gr)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGradeFilter === gr
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {gr === 'all'
                ? (uiLang === 'hi' ? 'सभी कक्षाएं' : 'All Grades')
                : gr === 'Grade 1'
                ? (uiLang === 'hi' ? 'कक्षा 1' : 'Grade 1')
                : gr === 'Grade 2'
                ? (uiLang === 'hi' ? 'कक्षा 2' : 'Grade 2')
                : (uiLang === 'hi' ? 'कक्षा 3' : 'Grade 3')}
            </button>
          ))}

          {(selectedLanguageFilter !== 'all' || selectedGradeFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedLanguageFilter('all');
                setSelectedGradeFilter('all');
              }}
              className="px-2.5 py-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              title={uiLang === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Worksheets Grid */}
      {filteredWorksheets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
            <Languages className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {uiLang === 'hi' ? 'कोई कार्यपत्रक नहीं मिला' : 'No worksheets found'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {uiLang === 'hi' 
              ? 'चयनित भाषा या कक्षा के लिए कार्यपत्रक उपलब्ध नहीं है। फ़िल्टर हटाएं या नया कार्यपत्रक बनाएं।' 
              : 'No worksheets found for current filters. Try resetting filters or generate a new one!'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setSelectedLanguageFilter('all');
                setSelectedGradeFilter('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
            >
              {uiLang === 'hi' ? 'सभी फ़िल्टर हटाएं' : 'Clear All Filters'}
            </button>
            <button
              onClick={() => setShowGeneratorModal(true)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              {uiLang === 'hi' ? '+ नया कार्यपत्रक बनाएं' : '+ Generate Worksheet'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredWorksheets.map((ws) => {
            const isLiteracy = ws.subject === 'Literacy';
            return (
              <div
                key={ws.id}
                id={`worksheet-card-${ws.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Header with Icon and Title */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isLiteracy ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {isLiteracy ? (
                        <BookOpen className="w-6 h-6 stroke-[2.2]" />
                      ) : (
                        <Calculator className="w-6 h-6 stroke-[2.2]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                          {trWorksheetTitle(ws, uiLang)}
                        </h3>
                      </div>
                      <p className="text-xs font-medium text-emerald-800/80 mt-0.5">
                        {uiLang === 'hi'
                          ? `${trSubject(ws.subject, 'hi')} • ${trWorksheetType(ws.type, 'hi')}`
                          : (ws.titleHindi || `${ws.subject} • ${trWorksheetType(ws.type, 'en')}`)}
                      </p>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5">
                        {trGrade(ws.grade, uiLang)} • {trScript(ws.script, uiLang)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-3.5 line-clamp-2">
                    {trWorksheetDesc(ws, uiLang)}
                  </p>
                </div>

                {/* Single Clean Footer: 3-Language Translation Switcher on Left + Preview & Assign on Right */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  {/* Direct 3 Tribal Language Translation Buttons */}
                  <div className="flex flex-wrap items-center gap-1">
                    {(['Santhali', 'Ho', 'Mundari'] as TribalLanguage[]).map((tLang) => {
                      const isDefault = ws.languages[0] === tLang;
                      return (
                        <button
                          key={tLang}
                          type="button"
                          onClick={() =>
                            onPreviewWorksheet({
                              ...ws,
                              languages: [tLang],
                            })
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                            isDefault
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                          title={
                            uiLang === 'hi'
                              ? `${trLanguage(tLang, 'hi')} में कार्यपत्रक खोलें`
                              : `Open worksheet translated in ${tLang}`
                          }
                        >
                          {tLang === 'Santhali'
                            ? (uiLang === 'hi' ? '🌲 संथाली' : '🌲 Santhali')
                            : tLang === 'Ho'
                            ? (uiLang === 'hi' ? '🪶 हो' : '🪶 Ho')
                            : (uiLang === 'hi' ? '🌿 मुंडारी' : '🌿 Mundari')}
                        </button>
                      );
                    })}
                  </div>

                  {/* Action buttons: Preview & Assign */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onPreviewWorksheet(ws)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{uiLang === 'hi' ? 'देखें' : 'Preview'}</span>
                    </button>
                    <button
                      id={`btn-assign-${ws.id}`}
                      onClick={() => handleOpenAssign(ws)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{uiLang === 'hi' ? 'सौंपें' : 'Assign'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Assign to Students Modal */}
      {assigningWorksheet && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <h3 className="text-lg font-bold text-slate-900">
              {uiLang === 'hi' ? 'कार्यपत्रक सौंपें' : 'Assign Worksheet'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {uiLang === 'hi' ? (
                <><strong>{trWorksheetTitle(assigningWorksheet, 'hi')}</strong> प्राप्त करने के लिए छात्रों का चयन करें</>
              ) : (
                <>Select students to receive <strong>{assigningWorksheet.title}</strong></>
              )}
            </p>

            <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
              {students.map((student) => {
                const isChecked = selectedStudentIds.includes(student.id);
                return (
                  <label
                    key={student.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer pt-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudentIds([...selectedStudentIds, student.id]);
                          } else {
                            setSelectedStudentIds(selectedStudentIds.filter((id) => id !== student.id));
                          }
                        }}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{trStudentName(student.name, uiLang)}</div>
                        <div className="text-xs text-slate-500">{trGrade(student.grade, uiLang)} • {trLanguage(student.language, uiLang)}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {student.avgScore}%
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setAssigningWorksheet(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmAssign}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                {uiLang === 'hi' ? `सौंपने की पुष्टि करें (${selectedStudentIds.length})` : `Confirm Assign (${selectedStudentIds.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Generator Modal with Dynamic Domain & Topic Synthesizer */}
      {showGeneratorModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <form 
            onSubmit={handleGenerateSubmit}
            className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 my-4 max-h-[92vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {uiLang === 'hi' ? 'गतिशील कार्यपत्रक निर्माता' : 'Dynamic Synthesizer'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {uiLang === 'hi' ? 'निपुण भारत संरेखित' : 'NIPUN Bharat Aligned'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {uiLang === 'hi' ? 'द्विभाषी कार्यपत्रक निर्माता' : 'Bilingual FLN Worksheet Generator'}
                </h3>
              </div>

              {/* Surprise Me / Randomize Button */}
              <button
                type="button"
                onClick={handleRandomizeTopic}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
                title={uiLang === 'hi' ? 'यादृच्छिक विषय, भाषा और कक्षा चुनें' : 'Randomize topic, language, and grade'}
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>{uiLang === 'hi' ? '🎲 कोई भी विषय चुनें' : '🎲 Surprise Me'}</span>
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm overflow-y-auto py-3 pr-1 flex-1">
              
              {/* Target Tribal Language Selector */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {uiLang === 'hi' ? '१. लक्षित मातृभाषा चुनें' : '1. Target Tribal Mother Tongue'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Santhali', 'Ho', 'Mundari'] as TribalLanguage[]).map((lang) => (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => setGenLanguage(lang)}
                      className={`p-2 rounded-xl text-center border font-semibold transition-all cursor-pointer ${
                        genLanguage === lang
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'Santhali'
                        ? (uiLang === 'hi' ? '🌲 संथाली' : '🌲 Santhali')
                        : lang === 'Ho'
                        ? (uiLang === 'hi' ? '🪶 हो' : '🪶 Ho')
                        : (uiLang === 'hi' ? '🌿 मुंडारी' : '🌿 Mundari')}
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                        {lang === 'Santhali'
                          ? (uiLang === 'hi' ? 'ओल चिकी (ᱚᱞ ᱪᱤᱠᱤ)' : 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)')
                          : lang === 'Ho'
                          ? (uiLang === 'hi' ? 'वारंग क्षिति (𑢹𑣉𑣉)' : 'Warang Chiti (𑢹𑣉𑣉)')
                          : (uiLang === 'hi' ? 'देवनागरी (मुंडारी)' : 'Devanagari (मुंडारी)')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject and Target Grade */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {uiLang === 'hi' ? '२. विषय' : '2. Subject'}
                  </label>
                  <select
                    value={genSubject}
                    onChange={(e) => setGenSubject(e.target.value as 'Literacy' | 'Numeracy')}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium"
                  >
                    <option value="Literacy">{uiLang === 'hi' ? 'साक्षरता (भाषा एवं लिपि)' : 'Literacy (Script & Reading)'}</option>
                    <option value="Numeracy">{uiLang === 'hi' ? 'संख्या ज्ञान (गणना एवं गणित)' : 'Numeracy (Counting & Math)'}</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {uiLang === 'hi' ? '३. लक्षित कक्षा' : '3. Target Grade'}
                  </label>
                  <select
                    value={genGrade}
                    onChange={(e) => setGenGrade(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white font-medium"
                  >
                    <option value="Grade 1">{uiLang === 'hi' ? 'कक्षा 1 (बुनियादी स्तर)' : 'Grade 1 (Foundational)'}</option>
                    <option value="Grade 2">{uiLang === 'hi' ? 'कक्षा 2 (उभरता स्तर)' : 'Grade 2 (Emerging)'}</option>
                    <option value="Grade 3">{uiLang === 'hi' ? 'कक्षा 3 (दक्ष स्तर)' : 'Grade 3 (Proficient)'}</option>
                  </select>
                </div>
              </div>

              {/* Topic Domain Selection Badges */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  {uiLang === 'hi' ? '४. पाठ्यक्रम विषय क्षेत्र' : '4. Curriculum Domain'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'wildlife' as TopicDomain, icon: '🌲', labelHi: 'वन्यजीव एवं सारंडा', labelEn: 'Wildlife & Forest' },
                    { id: 'market' as TopicDomain, icon: '🛒', labelHi: 'हाट-बाजार गणित', labelEn: 'Village Market Math' },
                    { id: 'festivals' as TopicDomain, icon: '🥁', labelHi: 'त्योहार (सोहराय, करम, मागे)', labelEn: 'Tribal Festivals' },
                    { id: 'classroom' as TopicDomain, icon: '🏫', labelHi: 'कक्षा एवं दिनचर्या', labelEn: 'Classroom & Routine' },
                    { id: 'body' as TopicDomain, icon: '🖐️', labelHi: 'शरीर के अंग', labelEn: 'Body Parts' },
                    { id: 'numeracy' as TopicDomain, icon: '🔢', labelHi: 'जनजातीय संख्या ज्ञान', labelEn: 'Tribal Numeracy' },
                    { id: 'instruments' as TopicDomain, icon: '🪘', labelHi: 'मांदर व संगीत', labelEn: 'Musical Instruments' }
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => {
                        setGenDomain(d.id);
                        setIsCustomMode(false);
                        const match = PRESET_WORKSHEET_TOPICS.find((p) => p.domain === d.id);
                        if (match) {
                          setGenTopic(match.title);
                          setGenSubject(match.suggestedSubject);
                        }
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer border ${
                        genDomain === d.id && !isCustomMode
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{d.icon}</span>
                      <span>{uiLang === 'hi' ? d.labelHi : d.labelEn}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsCustomMode(true)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer border ${
                      isCustomMode
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>✏️</span>
                    <span>{uiLang === 'hi' ? 'अपना विषय लिखें' : 'Custom Topic'}</span>
                  </button>
                </div>
              </div>

              {/* Topic Select or Custom Input */}
              {isCustomMode ? (
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
                  <label className="font-semibold text-slate-800 block mb-1">
                    {uiLang === 'hi' ? 'कस्टम कक्षा विषय लिखें:' : 'Enter Custom Topic Name:'}
                  </label>
                  <input
                    type="text"
                    placeholder={uiLang === 'hi' ? 'उदा. धान रोपाई और गिनती, झारखंड की नदियाँ' : 'e.g., Paddy planting & counting, Rivers of Jharkhand'}
                    value={customTopicInput}
                    onChange={(e) => setCustomTopicInput(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {uiLang === 'hi'
                      ? 'अभ्यास सामग्री चयनित विषय क्षेत्र के अनुसार स्वतः तैयार होगी।'
                      : 'Exercises will automatically synthesize around your chosen topic.'}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {uiLang === 'hi' ? '५. पाठ का शीर्षक चुनें' : '5. Curated Lesson Focus'}
                  </label>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {PRESET_WORKSHEET_TOPICS
                      .filter((p) => p.domain === genDomain)
                      .map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setGenTopic(preset.title);
                            setGenSubject(preset.suggestedSubject);
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            genTopic === preset.title
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <div>{uiLang === 'hi' ? preset.titleHindi : preset.title}</div>
                            <div className="text-[11px] text-slate-500 font-normal">
                              {uiLang === 'hi'
                                ? `${trSubject(preset.suggestedSubject, 'hi')} • ${trGrade(preset.suggestedGrade, 'hi')}`
                                : `${preset.titleHindi} • ${preset.suggestedGrade}`}
                            </div>
                          </div>
                          {genTopic === preset.title && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Live Preview of Dynamic Exercises */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {uiLang === 'hi' ? 'कार्यपत्रक सामग्री का पूर्वावलोकन:' : 'Generated Sections Preview:'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 mt-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">
                      {uiLang === 'hi' ? 'अभ्यास १ (लिपि/वर्ण):' : 'Section 1 (Script/Tracing):'}
                    </span>
                    {genDomain === 'market' 
                      ? (uiLang === 'hi' ? '₹ मूल्य, १-५ सिक्के व मात्रा चिह्न' : '₹ Currency, 1-5 Coins & Symbols')
                      : genLanguage === 'Santhali' 
                      ? (uiLang === 'hi' ? 'ᱚ, ᱛ, ᱜ, ᱝ (ओल चिकी लिपि)' : 'ᱚ, ᱛ, ᱜ, ᱝ (Ol Chiki)')
                      : genLanguage === 'Ho' 
                      ? (uiLang === 'hi' ? '𑢡, 𑢱, 𑢶, 𑢯 (वारंग क्षिति)' : '𑢡, 𑢱, 𑢶, 𑢯 (Warang Chiti)')
                      : (uiLang === 'hi' ? 'अ, क, म, स (मुंडारी)' : 'अ, क, म, स (Mundari)')}
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">
                      {uiLang === 'hi' ? 'अभ्यास २ (शब्दावली मिलान):' : 'Section 2 (Word Matching):'}
                    </span>
                    {genDomain === 'wildlife' 
                      ? (uiLang === 'hi' ? 'बाघ, मोर, साल, जल (४ चित्र)' : 'Tiger, Peacock, Sal, Water (4 pairs)')
                      : genDomain === 'market' 
                      ? (uiLang === 'hi' ? 'आलू, बैंगन, मटकी, आम (४ चित्र)' : 'Potato, Brinjal, Pot, Mango (4 pairs)')
                      : (uiLang === 'hi' ? 'विषय आधारित ४ सचित्र शब्द' : '4 domain-specific illustrated words')}
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">
                      {uiLang === 'hi' ? 'अभ्यास ३ व ४:' : 'Sections 3 & 4:'}
                    </span>
                    {genDomain === 'market'
                      ? (uiLang === 'hi' ? 'हाट-बाजार जोड़ घटाव समस्या' : 'Village market addition/subtraction')
                      : (uiLang === 'hi' ? 'चित्र वस्तु गणना + रिक्त स्थान' : 'Visual object counting + fill-in-blank')}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowGeneratorModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isGeneratingAiWorksheet}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 text-emerald-200 ${isGeneratingAiWorksheet ? 'animate-spin' : ''}`} />
                <span>
                  {isGeneratingAiWorksheet
                    ? (uiLang === 'hi' ? 'गतिशील अभ्यास तैयार हो रहा है...' : 'Synthesizing Dynamic Exercises...')
                    : (uiLang === 'hi' ? 'नया कार्यपत्रक बनाएं' : 'Generate Dynamic Worksheet')}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Google Search Grounded Contextual Worksheet Modal */}
      {showSearchModal && (
        <WorksheetSearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          uiLang={uiLang}
          onAddWorksheetFromSearch={(newWs) => {
            onCreateCustomWorksheet(newWs);
          }}
        />
      )}
    </div>
  );
};
