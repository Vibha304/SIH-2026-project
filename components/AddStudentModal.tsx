import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { Student, TribalLanguage, FLNLevel } from '../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => void;
  uiLang: 'en' | 'hi';
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  uiLang
}) => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState<TribalLanguage>('Santhali');
  const [grade, setGrade] = useState('Grade 1');
  const [flnLevel, setFlnLevel] = useState<FLNLevel>('beginner');
  const [initialScore, setInitialScore] = useState(60);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent: Student = {
      id: `s-${Date.now()}`,
      name: name.trim(),
      avatarLetter: name.trim()[0].toUpperCase(),
      language,
      grade,
      flnLevel,
      avgScore: initialScore,
      assessmentsCompleted: 1,
      motherTongueProficiency: initialScore + 15 > 95 ? 95 : initialScore + 15,
      hindiBridgeProficiency: Math.max(25, initialScore - 15),
      lastAssessed: 'Today',
      notes: notes.trim() || `Enrolled in PALASH MTB-MLE ${language} foundational cohort.`
    };

    onAddStudent(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150"
      >
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {uiLang === 'hi' ? 'नया छात्र जोड़ें' : 'Add New Student'}
              </h3>
              <p className="text-xs text-slate-500">
                {uiLang === 'hi' ? 'पलाश मातृभाषा शिक्षण समूह में छात्र का नामांकन करें' : 'Enroll student into PALASH MTB-MLE cohort'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-4 text-xs sm:text-sm">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {uiLang === 'hi' ? 'छात्र का पूरा नाम *' : 'Student Full Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={uiLang === 'hi' ? 'उदा., सुनील मुर्मू, अंजलि हो' : 'e.g., Sunil Murmu, Anjali Ho'}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {uiLang === 'hi' ? 'मातृभाषा चुनें *' : 'Mother Tongue *'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Santhali', 'Ho', 'Mundari'] as TribalLanguage[]).map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 px-2 rounded-xl text-center border font-semibold text-xs transition-all ${
                    language === lang
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'Santhali'
                    ? (uiLang === 'hi' ? '🌲 संथाली' : '🌲 Santhali')
                    : lang === 'Ho'
                    ? (uiLang === 'hi' ? '🪶 हो' : '🪶 Ho')
                    : (uiLang === 'hi' ? '🌿 मुंडारी' : '🌿 Mundari')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'कक्षा' : 'Grade'}
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value="Grade 1">{uiLang === 'hi' ? 'कक्षा 1' : 'Grade 1'}</option>
                <option value="Grade 2">{uiLang === 'hi' ? 'कक्षा 2' : 'Grade 2'}</option>
                <option value="Grade 3">{uiLang === 'hi' ? 'कक्षा 3' : 'Grade 3'}</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {uiLang === 'hi' ? 'दक्षता स्तर' : 'FLN Level'}
              </label>
              <select
                value={flnLevel}
                onChange={(e) => setFlnLevel(e.target.value as FLNLevel)}
                className="w-full p-2 rounded-lg border border-slate-200 bg-white"
              >
                <option value="beginner">{uiLang === 'hi' ? 'प्रारंभिक (आरंभिक)' : 'Beginner'}</option>
                <option value="intermediate">{uiLang === 'hi' ? 'मध्यम स्तर' : 'Intermediate'}</option>
                <option value="advanced">{uiLang === 'hi' ? 'उन्नत (प्रवीण)' : 'Advanced'}</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">
                {uiLang === 'hi' ? 'प्रारंभिक मूल्यांकन प्राप्तांक' : 'Initial Diagnostic Score'}
              </label>
              <span className="font-bold text-emerald-700">{initialScore}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="95"
              value={initialScore}
              onChange={(e) => setInitialScore(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {uiLang === 'hi' ? 'शिक्षक टिप्पणी' : 'Teacher Notes'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={uiLang === 'hi' ? 'उदा., ध्वनि अभ्यास की आवश्यकता है, गीतों से जल्दी सीखता है' : 'e.g. Needs phonics support, responds well to songs'}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
          >
            {uiLang === 'hi' ? 'छात्र सहेजें' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
};
