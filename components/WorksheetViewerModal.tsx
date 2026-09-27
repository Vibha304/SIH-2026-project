import React, { useEffect, useState } from 'react';
import { X, Printer, ArrowLeft, FileDown, CheckCircle2, Sparkles, Shuffle, RefreshCw, Volume2, Maximize2, Minimize2, Languages } from 'lucide-react';
import { WorksheetItem, TribalLanguage } from '../types';
import { generateDynamicWorksheetContent } from '../utils/worksheetGenerator';
import { translateToTribal } from '../utils/translatorEngine';
import { speakHumanLikeTranslation } from '../utils/humanSpeechSynthesizer';
import { trWorksheetTitle, trGrade, trScript, trLanguage } from '../utils/i18n';

interface WorksheetViewerModalProps {
  worksheet: WorksheetItem | null;
  onClose: () => void;
  uiLang: 'en' | 'hi';
}

export const WorksheetViewerModal: React.FC<WorksheetViewerModalProps> = ({
  worksheet,
  onClose,
  uiLang
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [dynamicPayload, setDynamicPayload] = useState<any>(null);
  const [isRegeneratingAi, setIsRegeneratingAi] = useState(false);
  const [customFocusPrompt, setCustomFocusPrompt] = useState('');
  const [showCustomFocusBar, setShowCustomFocusBar] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Selected Tribal Language to translate the worksheet into (defaults to worksheet's primary language)
  const [selectedLanguage, setSelectedLanguage] = useState<TribalLanguage>('Santhali');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Reset state when worksheet changes
  useEffect(() => {
    setDynamicPayload(worksheet?.customExercisePayload || null);
    setVariantIndex(0);
    setCustomFocusPrompt('');
    setShowCustomFocusBar(false);
    if (worksheet?.languages?.[0]) {
      setSelectedLanguage(worksheet.languages[0]);
    }
  }, [worksheet?.id, worksheet?.languages?.[0]]);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!worksheet) return null;

  const activeScript =
    selectedLanguage === 'Santhali'
      ? 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)'
      : selectedLanguage === 'Ho'
      ? 'Warang Chiti (𑢹𑣉𑣉)'
      : 'Devanagari (मुंडारी)';

  const effectiveWorksheet: WorksheetItem = dynamicPayload
    ? {
        ...worksheet,
        languages: [selectedLanguage],
        script: activeScript,
        customExercisePayload: dynamicPayload
      }
    : {
        ...worksheet,
        languages: [selectedLanguage],
        script: activeScript
      };

  // Generate dynamic content translated in the selected tribal language (Santhali, Ho, or Mundari)
  const content = generateDynamicWorksheetContent(effectiveWorksheet, variantIndex);

  // Single-click audio pronunciation helper
  const handleSpeakItem = (id: string, textOrHindi: string, romanFallback: string) => {
    setSpeakingId(id);
    const cleanHindi = textOrHindi.replace(/\s*\([^)]*\)/g, '').trim();
    const translated = translateToTribal(cleanHindi || romanFallback, 'Hindi', selectedLanguage);

    speakHumanLikeTranslation(
      {
        script: translated.script || textOrHindi,
        scriptName: selectedLanguage === 'Santhali' ? 'Ol Chiki' : selectedLanguage === 'Ho' ? 'Warang Chiti' : 'Devanagari',
        romanized: translated.romanized || romanFallback || cleanHindi,
        devanagariPhonetic: translated.devanagariPhonetic || cleanHindi || romanFallback,
        englishMeaning: romanFallback,
        hindiMeaning: cleanHindi,
        audioHint: `Worksheet audio in ${selectedLanguage}`,
        targetLanguage: selectedLanguage,
      },
      selectedLanguage,
      {
        speechRate: 0.85,
        preferHumanTts: true,
        onStart: () => setSpeakingId(id),
        onEnd: () => setSpeakingId(null),
      }
    ).catch(() => {
      setSpeakingId(null);
    });
  };

  const handleRegenerateWithAi = async (focusText?: string) => {
    setIsRegeneratingAi(true);
    const topicToUse = (focusText && focusText.trim()) ? focusText.trim() : worksheet.title;
    try {
      const res = await fetch('/api/worksheets/generate-dynamic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          domain: worksheet.topicDomain || 'wildlife',
          language: selectedLanguage,
          grade: worksheet.grade || 'Grade 1',
          subject: worksheet.subject || 'Literacy',
        }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setDynamicPayload(json.data);
        worksheet.customExercisePayload = json.data;
        setShowCustomFocusBar(false);
      }
    } catch (err) {
      console.warn('AI worksheet regeneration fallback:', err);
      setVariantIndex((v) => (v + 1) % 3);
    } finally {
      setIsRegeneratingAi(false);
    }
  };

  const handlePrint = () => {
    window.focus();
    window.print();
  };

  const handleDownloadHTML = () => {
    const printArea = document.getElementById('printable-worksheet-area');
    if (!printArea) return;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${worksheet.title} (${selectedLanguage} - Set ${String.fromCharCode(65 + variantIndex)}) - PALASH MTB-MLE Jharkhand</title>
  <style>
    @page { size: A4 portrait; margin: 10mm 15mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      margin: 0;
      padding: 20px;
    }
    .print-bar {
      text-align: center;
      margin-bottom: 20px;
      padding: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }
    .print-btn {
      background: #047857;
      color: #ffffff;
      padding: 8px 18px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    #printable-worksheet-area {
      max-width: 800px;
      margin: 0 auto;
      border: 2px solid #0f172a;
      padding: 25px 30px;
      border-radius: 8px;
      background: #ffffff;
    }
    @media print {
      .print-bar { display: none !important; }
      body { padding: 0 !important; }
      #printable-worksheet-area { border: none !important; padding: 0 !important; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">🖨️ Print Worksheet / Save as PDF</button>
    <span style="font-size: 12px; color: #64748b; margin-left: 10px;">(NIPUN Bharat &bull; PALASH ${selectedLanguage} &amp; Hindi Bilingual Worksheet)</span>
  </div>
  ${printArea.outerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PALASH_${worksheet.title.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedLanguage}_Set${String.fromCharCode(65 + variantIndex)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Shuffled right-side pairs for visual matching exercise so children draw real lines
  const rightPairs = [...content.matchingPairs].sort((a, b) => {
    const hashA = (a.hindiText.charCodeAt(0) + variantIndex * 7) % 10;
    const hashB = (b.hindiText.charCodeAt(0) + variantIndex * 7) % 10;
    return hashA - hashB;
  });

  return (
    <div 
      id="worksheet-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div className={`bg-white rounded-2xl w-full my-2 sm:my-4 p-4 sm:p-6 shadow-2xl border border-slate-200 flex flex-col relative transition-all duration-200 ${
        isMaximized ? 'max-w-[98vw] h-[96vh] max-h-[96vh]' : 'max-w-4xl max-h-[92vh]'
      }`}>
        {/* Sticky Modal Action Header (Not printed) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200 print:hidden shrink-0">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{uiLang === 'hi' ? content.domainLabelHindi : content.domainLabel}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {trGrade(worksheet.grade, uiLang)} • {trLanguage(selectedLanguage, uiLang)} &amp; {uiLang === 'hi' ? 'हिन्दी' : 'Hindi'}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 mt-1 break-words">
              {trWorksheetTitle(worksheet, uiLang)}
            </h2>
          </div>

          {/* Action buttons & Variant Switcher */}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            {/* Variant Set Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <span className="text-[11px] text-slate-500 px-1.5 hidden sm:inline">
                {uiLang === 'hi' ? 'सेट:' : 'Set:'}
              </span>
              {(['A', 'B', 'C'] as const).map((setLetter, idx) => {
                const displayLetter = uiLang === 'hi' ? (idx === 0 ? 'अ' : idx === 1 ? 'ब' : 'स') : setLetter;
                return (
                  <button
                    key={setLetter}
                    id={`btn-variant-${setLetter.toLowerCase()}`}
                    onClick={() => setVariantIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      variantIndex === idx
                        ? 'bg-white text-emerald-800 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={uiLang === 'hi' ? `अभ्यास सेट ${displayLetter} चुनें` : `Switch to Exercise Variant Set ${setLetter}`}
                  >
                    {displayLetter}
                  </button>
                );
              })}
              <button
                onClick={() => setVariantIndex((v) => (v + 1) % 3)}
                className="p-1 text-slate-500 hover:text-emerald-700 transition-colors ml-0.5 cursor-pointer"
                title={uiLang === 'hi' ? 'अभ्यास प्रश्न बदलें' : 'Shuffle dynamic items'}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Dynamic Regenerate & Customize Button */}
            <button
              id="btn-regenerate-ai-worksheet"
              onClick={() => setShowCustomFocusBar(!showCustomFocusBar)}
              disabled={isRegeneratingAi}
              className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={uiLang === 'hi' ? 'नये अभ्यास प्रश्न बनाएं' : 'Generate fresh exercises for this worksheet'}
            >
              <RefreshCw className={`w-3.5 h-3.5 text-purple-700 ${isRegeneratingAi ? 'animate-spin' : ''}`} />
              <span>{uiLang === 'hi' ? 'नया अभ्यास' : 'Dynamic Remix'}</span>
            </button>

            <button
              id="btn-download-worksheet-html"
              onClick={handleDownloadHTML}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">{uiLang === 'hi' ? 'डाउनलोड पूर्ण' : 'Downloaded'}</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">{uiLang === 'hi' ? 'फ़ाइल सहेजें' : 'Save HTML'}</span>
                </>
              )}
            </button>
            <button
              id="btn-print-worksheet"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{uiLang === 'hi' ? 'प्रिंट करें' : 'Print'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
              title={isMaximized ? (uiLang === 'hi' ? 'सामान्य आकार' : 'Restore Size') : (uiLang === 'hi' ? 'पूर्ण स्क्रीन आकार' : 'Maximize Worksheet')}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              id="btn-close-worksheet-top"
              onClick={onClose}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              aria-label="Close worksheet"
            >
              <X className="w-4 h-4" />
              <span>{uiLang === 'hi' ? 'बंद करें' : 'Close'}</span>
            </button>
          </div>
        </div>

        {/* Option to Translate Worksheet into any of the 3 Tribal Languages (Not printed) */}
        <div className="mb-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-2 print:hidden shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Languages className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {uiLang === 'hi'
                ? 'कार्यपत्रक को ३ जनजातीय भाषाओं में अनुवाद करें:'
                : 'Translate Worksheet in 3 Tribal Languages:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(['Santhali', 'Ho', 'Mundari'] as TribalLanguage[]).map((lang) => {
              const isSelected = selectedLanguage === lang;
              const label =
                lang === 'Santhali'
                  ? (uiLang === 'hi' ? '🌲 संथाली (Ol Chiki)' : '🌲 Santhali (Ol Chiki)')
                  : lang === 'Ho'
                  ? (uiLang === 'hi' ? '🪶 हो (Warang Chiti)' : '🪶 Ho (Warang Chiti)')
                  : (uiLang === 'hi' ? '🌿 मुंडारी (Devanagari)' : '🌿 Mundari (Devanagari)');
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Dynamic AI Topic Customizer Bar (Not printed) */}
        {showCustomFocusBar && (
          <div className="mb-3 p-3 bg-purple-50/80 border border-purple-200 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2 print:hidden shrink-0">
            <input
              type="text"
              value={customFocusPrompt}
              onChange={(e) => setCustomFocusPrompt(e.target.value)}
              placeholder={
                uiLang === 'hi'
                  ? 'नया विषय या शब्दावली लिखें (उदा. नदी की मछलियां और नाव गिनती)...'
                  : 'Enter custom topic focus (e.g., River fishing & bamboo baskets)...'
              }
              className="flex-1 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleRegenerateWithAi(customFocusPrompt)}
                disabled={isRegeneratingAi}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isRegeneratingAi ? 'animate-spin' : ''}`} />
                <span>
                  {isRegeneratingAi
                    ? (uiLang === 'hi' ? 'निर्मित हो रहा है...' : 'Generating...')
                    : (uiLang === 'hi' ? 'अभ्यास बदलें' : 'Generate New Exercises')}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDynamicPayload(null);
                  setVariantIndex((v) => (v + 1) % 3);
                  setShowCustomFocusBar(false);
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                {uiLang === 'hi' ? 'डिफ़ॉल्ट रीसेट' : 'Reset Default'}
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Printable Worksheet Body (Clean Original Layout) */}
        <div className="overflow-y-auto pr-1 flex-1">
          <div 
            id="printable-worksheet-area"
            className="border-2 border-slate-800 rounded-xl p-5 sm:p-7 bg-white text-slate-900 font-sans print:border-none print:p-0 shadow-xs"
          >
            {/* Institutional Header */}
            <div className="text-center border-b-2 border-slate-800 pb-3">
              <div className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
                {uiLang === 'hi'
                  ? 'विद्यालय शिक्षा एवं साक्षरता विभाग · झारखंड सरकार'
                  : 'Department of School Education & Literacy · Government of Jharkhand'}
              </div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-950 mt-1">
                {uiLang === 'hi'
                  ? 'पलाश मातृभाषा आधारित बहुभाषी शिक्षण कार्यक्रम (MTB-MLE)'
                  : 'PALASH Mother Tongue-Based Multilingual Education (MTB-MLE)'}
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-emerald-900 mt-1 flex items-center justify-center gap-2">
                <span>
                  {uiLang === 'hi'
                    ? `बुनियादी साक्षरता एवं संख्या ज्ञान कार्यपत्रक · ${trGrade(worksheet.grade, 'hi')}`
                    : `FLN Bilingual Practice Worksheet · ${worksheet.grade}`}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-[11px]">
                  {uiLang === 'hi'
                    ? `सेट ${variantIndex === 0 ? 'अ' : variantIndex === 1 ? 'ब' : 'स'}`
                    : `Set ${String.fromCharCode(65 + variantIndex)}`}
                </span>
              </div>
              <div className="text-xs text-slate-600 font-medium mt-0.5">
                {uiLang === 'hi' ? 'भाषाएं:' : 'Languages:'}{' '}
                {trLanguage(selectedLanguage, uiLang)} &amp; {uiLang === 'hi' ? 'हिन्दी' : 'Hindi'} •{' '}
                {uiLang === 'hi' ? 'लिपि:' : 'Script:'} {trScript(activeScript, uiLang)}
              </div>
            </div>

            {/* Student details fill-in line */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-slate-300 text-xs font-semibold text-slate-800">
              <div>
                {uiLang === 'hi' ? 'विद्यार्थी का नाम:' : 'Student Name:'}{' '}
                <span className="inline-block border-b border-slate-400 w-32">&nbsp;</span>
              </div>
              <div>
                {uiLang === 'hi' ? 'अनुक्रमांक:' : 'Roll No:'}{' '}
                <span className="inline-block border-b border-slate-400 w-20">&nbsp;</span>
              </div>
              <div className="sm:text-right">
                {uiLang === 'hi' ? 'दिनांक:' : 'Date:'}{' '}
                <span className="inline-block border-b border-slate-400 w-24">&nbsp;</span>
              </div>
            </div>

            {/* Dynamic Section 1: Letter / Script / Numeral Practice */}
            <div className="mt-4 space-y-2.5 worksheet-exercise-block">
              <div className="text-xs sm:text-sm font-bold bg-slate-100 p-2 rounded-lg border border-slate-200">
                {uiLang === 'hi' ? content.section1Title.replace(/\s*\([A-Za-z\s&/,-]+\)/g, '') : content.section1Title}
              </div>
              <p className="text-[11px] text-slate-600 italic px-1">
                {uiLang === 'hi' ? content.section1Instructions.replace(/\s*\([A-Za-z\s&/.,'-]+\)/g, '') : content.section1Instructions}
              </p>

              {/* Dynamic Tracing Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3 worksheet-tracing-grid">
                {content.tracingItems.map((item, idx) => (
                  <div key={idx} className="border-2 border-dashed border-slate-400 rounded-xl p-3 bg-slate-50/40 relative">
                    <button
                      type="button"
                      onClick={() => handleSpeakItem(`trace-${idx}`, item.hindiMeaning, item.pronunciation)}
                      className={`absolute top-2 right-2 p-1 rounded-md border transition-colors cursor-pointer print:hidden ${
                        speakingId === `trace-${idx}`
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-white hover:bg-emerald-50 text-emerald-700 border-slate-200'
                      }`}
                      title={uiLang === 'hi' ? 'उच्चारण सुनें' : 'Listen pronunciation'}
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                    <div className="text-3xl font-extrabold text-slate-900">{item.glyph}</div>
                    <div className="text-xs text-slate-700 mt-1 font-bold">
                      {item.name} • {item.hindiMeaning}
                    </div>
                    <div className="text-[10px] text-emerald-800/80 mt-0.5">
                      {item.strokeHint}
                    </div>
                    {/* Dotted Practice Boxes */}
                    <div className="flex justify-center gap-1.5 mt-2 pt-2 border-t border-slate-200">
                      <span className="w-7 h-7 rounded border border-dashed border-slate-400 inline-flex items-center justify-center text-xs text-slate-300 select-none">
                        {item.glyph}
                      </span>
                      <span className="w-7 h-7 rounded border border-dashed border-slate-400 inline-block"></span>
                      <span className="w-7 h-7 rounded border border-dashed border-slate-400 inline-block"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Section 2: Bilingual Vocabulary & Picture Matching */}
            <div className="mt-5 space-y-2.5 worksheet-exercise-block">
              <div className="text-xs sm:text-sm font-bold bg-slate-100 p-2 rounded-lg border border-slate-200">
                {uiLang === 'hi' ? content.section2Title.replace(/\s*\([A-Za-z\s&/,-]+\)/g, '') : content.section2Title}
              </div>
              <p className="text-[11px] text-slate-600 italic px-1">
                {uiLang === 'hi' ? content.section2Instructions.replace(/\s*\([A-Za-z\s&/.,'-]+\)/g, '') : content.section2Instructions}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold p-2 worksheet-matching-block">
                {/* Left Column: Icons + Tribal Script Words */}
                <div className="space-y-2.5">
                  {content.matchingPairs.map((pair, idx) => (
                    <div 
                      key={`left-${idx}`} 
                      className="p-2.5 border border-slate-300 rounded-lg flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="text-lg shrink-0">{pair.icon}</span>
                        <span className="font-bold text-slate-900 truncate">{pair.tribalText}</span>
                        <button
                          type="button"
                          onClick={() => handleSpeakItem(`match-${idx}`, pair.hindiText, pair.romanText)}
                          className={`p-1 rounded border transition-colors cursor-pointer print:hidden shrink-0 ${
                            speakingId === `match-${idx}`
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-slate-50 hover:bg-emerald-50 text-emerald-700 border-slate-200'
                          }`}
                          title={uiLang === 'hi' ? 'उच्चारण सुनें' : 'Listen'}
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </span>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0"></span>
                    </div>
                  ))}
                </div>

                {/* Right Column: Shuffled Hindi & English meanings */}
                <div className="space-y-2.5">
                  {rightPairs.map((pair, idx) => (
                    <div 
                      key={`right-${idx}`} 
                      className="p-2.5 border border-slate-300 rounded-lg flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 shrink-0"></span>
                      <span className="text-slate-800 font-bold text-right">{pair.hindiText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Section 3: Visual Contextual Counting & Numeracy */}
            <div className="mt-5 space-y-2.5 worksheet-exercise-block">
              <div className="text-xs sm:text-sm font-bold bg-slate-100 p-2 rounded-lg border border-slate-200">
                {uiLang === 'hi' ? content.section3Title.replace(/\s*\([A-Za-z\s&/,-]+\)/g, '') : content.section3Title}
              </div>
              <p className="text-[11px] text-slate-600 italic px-1">
                {uiLang === 'hi' ? content.section3Instructions.replace(/\s*\([A-Za-z\s&/.,'-]+\)/g, '') : content.section3Instructions}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                {content.countingItems.map((item, idx) => (
                  <div key={idx} className="border border-slate-300 rounded-xl p-3 bg-slate-50/30">
                    <div className="text-xl mb-1.5 flex flex-wrap items-center justify-center gap-1 tracking-wider min-h-[32px]">
                      {item.icon}
                    </div>
                    <div className="text-slate-900 font-bold text-xs">
                      {item.itemNameHindi}
                    </div>
                    <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                      {item.itemNameTribal} ({item.tribalNumeral})
                    </div>
                    <div className="mt-2 text-slate-700 border-t border-dashed border-slate-300 pt-2 font-mono font-bold">
                      {uiLang === 'hi' ? 'उत्तर:' : 'Answer:'} [ _____ ]{' '}
                      <span className="text-slate-400 text-[10px]">
                        ({item.numeralExpected} / {item.tribalNumeral})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Section 4: Word Problem / Cloze / Drawing */}
            {content.marketMathProblem && (
              <div className="mt-5 space-y-2 worksheet-exercise-block">
                <div className="text-xs sm:text-sm font-bold bg-slate-100 p-2 rounded-lg border border-slate-200">
                  {uiLang === 'hi'
                    ? (content.section4Title?.replace(/\s*\([A-Za-z\s&/-]+\)/g, '') || 'अभ्यास ४: हाट-बाजार का व्यावहारिक प्रश्न')
                    : (content.section4Title || 'Section 4: Practical Market Math Problem')}
                </div>
                <div className="border border-slate-300 rounded-xl p-3.5 bg-amber-50/40 text-xs">
                  <div className="font-semibold text-slate-900">{content.marketMathProblem.scenario}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{content.marketMathProblem.scenarioHindi}</div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                    {content.marketMathProblem.items.map((it, idx) => (
                      <div key={idx} className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 flex items-center gap-1.5 font-medium">
                        <span>{it.icon}</span>
                        <span>{it.name}: ₹{it.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-dashed border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-800">
                    <div className="font-medium">{content.marketMathProblem.question}</div>
                    <div className="font-bold border-b border-slate-400 px-3 py-0.5 shrink-0">
                      {uiLang === 'hi' ? 'उत्तर: ₹ [ _______ ]' : 'Answer: ₹ [ _______ ]'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {content.clozeItems && (
              <div className="mt-5 space-y-2 worksheet-exercise-block">
                <div className="text-xs sm:text-sm font-bold bg-slate-100 p-2 rounded-lg border border-slate-200">
                  {uiLang === 'hi'
                    ? (content.section4Title?.replace(/\s*\([A-Za-z\s&/-]+\)/g, '') || 'अभ्यास ४: रिक्त स्थान पूर्ति')
                    : (content.section4Title || 'Section 4: Fill in the Blank')}
                </div>
                {content.clozeItems.map((cloze, idx) => (
                  <div key={idx} className="border border-slate-300 rounded-xl p-3 text-xs bg-slate-50/40">
                    <div className="font-semibold text-slate-900 leading-relaxed">
                      {cloze.sentenceWithBlank}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-slate-500 text-[11px]">{uiLang === 'hi' ? 'विकल्प:' : 'Options:'}</span>
                      {cloze.options.map((opt, oIdx) => (
                        <span key={oIdx} className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-semibold">
                          [ &nbsp; ] {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {content.drawingPrompt && (
              <div className="mt-5 space-y-2 worksheet-exercise-block">
                <div className="text-xs sm:text-sm font-bold bg-slate-100 p-2 rounded-lg border border-slate-200">
                  {uiLang === 'hi' ? 'रचनात्मक चित्रण गतिविधि:' : 'Creative Visual Expression:'}
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-xl h-24 flex items-center justify-center text-xs text-slate-400 text-center p-2">
                  {content.drawingPrompt}
                </div>
              </div>
            )}

            {/* Teacher Signature Footer */}
            <div className="mt-6 pt-3 border-t-2 border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 worksheet-signature-block">
              <div>
                {uiLang === 'hi'
                  ? 'मूल्यांकन श्रेणी: [ क ]   [ ख ]   [ ग ]'
                  : 'Assessment Grade: [ A ]   [ B ]   [ C ]'}
              </div>
              <div>
                {uiLang === 'hi'
                  ? 'शिक्षक/शिक्षिका हस्ताक्षर: ____________________'
                  : 'Teacher Signature: ____________________'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Footer with Close Button (Not printed) */}
        <div className="pt-3 mt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden shrink-0 bg-white">
          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            {uiLang === 'hi' ? (
              <>वापस जाने के लिए <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px]">Esc</kbd> दबाएं या बंद करें पर क्लिक करें</>
            ) : (
              <>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px]">Esc</kbd> or click Close to return</>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <button
              id="btn-close-worksheet-bottom"
              onClick={onClose}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{uiLang === 'hi' ? 'कार्यपत्रक बंद करें' : 'Close Worksheet'}</span>
            </button>
            <button
              onClick={handleDownloadHTML}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{uiLang === 'hi' ? 'फ़ाइल सहेजें' : 'Save Printable HTML'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{uiLang === 'hi' ? 'प्रिंट / पीडीएफ सहेजें' : 'Print / Save PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
