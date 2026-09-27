import React, { useState } from 'react';
import { 
  X, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Plus,
  Trash2,
  Clock,
  Layers,
  BarChart2,
  Check,
  Calendar,
  Filter
} from 'lucide-react';
import { Student, StudentWorksheetAssignment, FLNSkillStage, WorksheetItem } from '../types';
import {
  trStudentName,
  trStudentInitials,
  trGrade,
  trLanguage,
  trSkillLevel,
  trAssignedWorksheetTitle,
  trAssignedDate,
  trStudentNotes,
  trWorksheetTitle,
  trSubject
} from '../utils/i18n';

interface StudentDetailModalProps {
  student: Student | null;
  onClose: () => void;
  onGenerateTargetedWorksheet: (student: Student) => void;
  onStartVoiceAssessment: (student: Student) => void;
  onUpdateStudent?: (updatedStudent: Student) => void;
  availableMasterWorksheets?: WorksheetItem[];
  uiLang: 'en' | 'hi';
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onGenerateTargetedWorksheet,
  onStartVoiceAssessment,
  onUpdateStudent,
  availableMasterWorksheets = [],
  uiLang
}) => {
  // Modal Navigation
  const [activeTab, setActiveTab] = useState<'tracker' | 'diagnostics'>('tracker');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<'all' | FLNSkillStage>('all');

  // Teacher Add Worksheet Form State
  const [isAddingWorksheet, setIsAddingWorksheet] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleHindi, setNewTitleHindi] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<FLNSkillStage>('Foundational');
  const [newSubject, setNewSubject] = useState<'Literacy' | 'Numeracy'>('Literacy');
  const [newStatus, setNewStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [newScore, setNewScore] = useState<number>(85);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  if (!student) return null;

  const isSanthali = student.language === 'Santhali';
  const isHo = student.language === 'Ho';
  const langIcon = isSanthali ? '🌲' : isHo ? '🪶' : '🌿';

  const assignments = student.assignedWorksheets || [];

  // Categorized metrics calculation
  const getStatsForLevel = (level: FLNSkillStage) => {
    const items = assignments.filter(a => a.skillLevel === level);
    const completed = items.filter(a => a.status === 'completed').length;
    const inProgress = items.filter(a => a.status === 'in_progress').length;
    const pending = items.filter(a => a.status === 'pending').length;
    const total = items.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { items, completed, inProgress, pending, total, percentage };
  };

  const foundationalStats = getStatsForLevel('Foundational');
  const emergingStats = getStatsForLevel('Emerging');
  const proficientStats = getStatsForLevel('Proficient');

  const totalAssigned = assignments.length;
  const totalCompleted = assignments.filter(a => a.status === 'completed').length;
  const totalInProgress = assignments.filter(a => a.status === 'in_progress').length;
  const totalPending = assignments.filter(a => a.status === 'pending').length;
  const overallPercentage = totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;

  // Actions
  const handleToggleStatus = (assignmentId: string, currentStatus: 'completed' | 'in_progress' | 'pending') => {
    if (!onUpdateStudent) return;
    
    // Cycle status: pending -> in_progress -> completed -> pending
    let nextStatus: 'completed' | 'in_progress' | 'pending' = 'completed';
    if (currentStatus === 'pending') nextStatus = 'in_progress';
    else if (currentStatus === 'in_progress') nextStatus = 'completed';
    else if (currentStatus === 'completed') nextStatus = 'pending';

    const updatedAssignments = assignments.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: nextStatus,
          completedDate: nextStatus === 'completed' ? 'Today' : undefined,
          score: nextStatus === 'completed' ? (a.score || 85) : undefined
        };
      }
      return a;
    });

    const updatedStudent: Student = {
      ...student,
      assignedWorksheets: updatedAssignments
    };
    onUpdateStudent(updatedStudent);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    if (!onUpdateStudent) return;
    const updatedAssignments = assignments.filter(a => a.id !== assignmentId);
    const updatedStudent: Student = {
      ...student,
      assignedWorksheets: updatedAssignments
    };
    onUpdateStudent(updatedStudent);
  };

  const handleOpenAddForLevel = (level: FLNSkillStage) => {
    setNewSkillLevel(level);
    setIsAddingWorksheet(true);
    setSelectedPresetId('');
  };

  const handlePresetSelect = (worksheetId: string) => {
    setSelectedPresetId(worksheetId);
    if (!worksheetId) {
      setNewTitle('');
      setNewTitleHindi('');
      return;
    }
    const found = availableMasterWorksheets.find(w => w.id === worksheetId);
    if (found) {
      setNewTitle(found.title);
      setNewTitleHindi(found.titleHindi || '');
      setNewSubject(found.subject);
      // Auto-suggest level based on type/grade
      if (found.type === 'tracing' || found.grade === 'Grade 1') {
        setNewSkillLevel('Foundational');
      } else if (found.type === 'matching' || found.grade === 'Grade 2') {
        setNewSkillLevel('Emerging');
      } else {
        setNewSkillLevel('Proficient');
      }
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAssignment: StudentWorksheetAssignment = {
      id: `sw_${Date.now()}`,
      title: newTitle.trim(),
      titleHindi: newTitleHindi.trim() || undefined,
      skillLevel: newSkillLevel,
      subject: newSubject,
      status: newStatus,
      assignedDate: 'Today',
      completedDate: newStatus === 'completed' ? 'Today' : undefined,
      score: newStatus === 'completed' ? newScore : undefined
    };

    const updatedStudent: Student = {
      ...student,
      assignedWorksheets: [newAssignment, ...assignments]
    };

    if (onUpdateStudent) {
      onUpdateStudent(updatedStudent);
    }

    // Reset form
    setNewTitle('');
    setNewTitleHindi('');
    setSelectedPresetId('');
    setIsAddingWorksheet(false);
  };

  // Filter master worksheets relevant to student
  const studentMasterWorksheets = availableMasterWorksheets.filter(w => 
    w.languages.includes(student.language) || (w.languages as string[]).includes('Hindi')
  );

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        id="modal-student-detail"
        className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-800 font-bold text-lg flex items-center justify-center border-2 border-emerald-500/40 shadow-xs">
              {trStudentInitials(student.name, student.avatarLetter, uiLang)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {trStudentName(student.name, uiLang)}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {trGrade(student.grade, uiLang)}
                </span>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                  student.flnLevel === 'advanced' ? 'bg-emerald-100 text-emerald-800' :
                  student.flnLevel === 'intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {trSkillLevel(student.flnLevel, uiLang)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{langIcon} {trLanguage(student.language, uiLang)}</span>
                <span>•</span>
                <span>
                  {uiLang === 'hi' ? 'अंतिम मूल्यांकन:' : 'Last Assessed:'}{' '}
                  <strong className="text-slate-700">{trAssignedDate(student.lastAssessed, uiLang)}</strong>
                </span>
                <span>•</span>
                <span>
                  {uiLang === 'hi' ? 'दक्षता प्राप्तांक:' : 'FLN Score:'}{' '}
                  <strong className={student.avgScore >= 70 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>{student.avgScore}%</strong>
                </span>
              </div>
            </div>
          </div>
          <button
            id="btn-close-student-detail"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-3 pb-2 border-b border-slate-100 shrink-0">
          <button
            id="tab-btn-fln-tracker"
            onClick={() => setActiveTab('tracker')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{uiLang === 'hi' ? 'कार्यपत्रक प्रगति ट्रैकर' : 'FLN Worksheet Progress'}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'tracker' ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {totalCompleted}/{totalAssigned} ({overallPercentage}%)
            </span>
          </button>

          <button
            id="tab-btn-diagnostics"
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{uiLang === 'hi' ? 'द्विभाषी निदान एवं शिक्षक टिप्पणी' : 'Bilingual Diagnostics & Notes'}</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 text-xs sm:text-sm pr-1">
          {activeTab === 'tracker' ? (
            <div className="space-y-4">
              {/* High-Level Visual Completion Progress Card */}
              <div 
                id="fln-progress-summary-card"
                className="p-4 rounded-xl bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50 border border-slate-200/90 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {uiLang === 'hi' ? 'निपुण दक्षता प्रगति ट्रैकर' : 'FLN Milestone Completion Tracker'}
                      </h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {uiLang === 'hi' ? `${trGrade(student.grade, 'hi')} लक्ष्य` : `${student.grade} FLN Targets`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {uiLang === 'hi'
                        ? 'बुनियादी, उभरते और दक्ष स्तरों में वर्गीकृत शिक्षक-आवंटित कार्यपत्रक'
                        : 'Teacher-assigned worksheets grouped by Foundational, Emerging, and Proficient competencies'}
                    </p>
                  </div>

                  <button
                    id="btn-open-add-worksheet-top"
                    onClick={() => setIsAddingWorksheet(!isAddingWorksheet)}
                    className="self-start sm:self-auto px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>
                      {isAddingWorksheet
                        ? (uiLang === 'hi' ? 'जोड़ना रद्द करें' : 'Cancel Adding')
                        : (uiLang === 'hi' ? '+ कार्यपत्रक सौंपें' : '+ Assign Worksheet')}
                    </span>
                  </button>
                </div>

                {/* Completion Metric & Segmented Bar */}
                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">
                        {uiLang === 'hi' ? `${overallPercentage}% कुल पूर्णता` : `${overallPercentage}% Overall Completion`}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {uiLang === 'hi' ? `(${totalAssigned} में से ${totalCompleted} पूर्ण)` : `(${totalCompleted} of ${totalAssigned} finished)`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        {uiLang === 'hi' ? 'पूर्ण:' : 'Done:'} <strong>{totalCompleted}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                        {uiLang === 'hi' ? 'प्रगति पर:' : 'In Progress:'} <strong>{totalInProgress}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                        {uiLang === 'hi' ? 'लंबित:' : 'Pending:'} <strong>{totalPending}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Visual Stacked Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${totalAssigned > 0 ? (totalCompleted / totalAssigned) * 100 : 0}%` }}
                      title={uiLang === 'hi' ? `पूर्ण: ${totalCompleted}` : `Completed: ${totalCompleted}`}
                    />
                    <div 
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${totalAssigned > 0 ? (totalInProgress / totalAssigned) * 100 : 0}%` }}
                      title={uiLang === 'hi' ? `प्रगति पर: ${totalInProgress}` : `In Progress: ${totalInProgress}`}
                    />
                  </div>
                </div>

                {/* Level Quick Stats Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3.5 pt-3 border-t border-slate-200/60 text-center">
                  <div 
                    onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'Foundational' ? 'all' : 'Foundational')}
                    className={`p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer ${
                      selectedSkillFilter === 'Foundational'
                        ? 'bg-emerald-100/70 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-white/80 border-emerald-200/80 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-emerald-900 flex items-center justify-center gap-1">
                      <span>🌱</span> {uiLang === 'hi' ? 'बुनियादी स्तर' : 'Foundational'}
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-emerald-700 mt-0.5">
                      {foundationalStats.percentage}%
                    </div>
                    <div className="text-[10px] text-emerald-800/80 font-medium">
                      {foundationalStats.completed}/{foundationalStats.total} {uiLang === 'hi' ? 'पूर्ण' : 'Completed'}
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'Emerging' ? 'all' : 'Emerging')}
                    className={`p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer ${
                      selectedSkillFilter === 'Emerging'
                        ? 'bg-amber-100/70 border-amber-500 ring-2 ring-amber-500/20'
                        : 'bg-white/80 border-amber-200/80 hover:bg-amber-50/50'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-amber-900 flex items-center justify-center gap-1">
                      <span>🌿</span> {uiLang === 'hi' ? 'उभरता स्तर' : 'Emerging'}
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-amber-700 mt-0.5">
                      {emergingStats.percentage}%
                    </div>
                    <div className="text-[10px] text-amber-800/80 font-medium">
                      {emergingStats.completed}/{emergingStats.total} {uiLang === 'hi' ? 'पूर्ण' : 'Completed'}
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'Proficient' ? 'all' : 'Proficient')}
                    className={`p-2 sm:p-2.5 rounded-lg border transition-all cursor-pointer ${
                      selectedSkillFilter === 'Proficient'
                        ? 'bg-sky-100/70 border-sky-500 ring-2 ring-sky-500/20'
                        : 'bg-white/80 border-sky-200/80 hover:bg-sky-50/50'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-sky-900 flex items-center justify-center gap-1">
                      <span>🌳</span> {uiLang === 'hi' ? 'दक्ष स्तर' : 'Proficient'}
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-sky-700 mt-0.5">
                      {proficientStats.percentage}%
                    </div>
                    <div className="text-[10px] text-sky-800/80 font-medium">
                      {proficientStats.completed}/{proficientStats.total} {uiLang === 'hi' ? 'पूर्ण' : 'Completed'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Teacher Form: Assign New FLN Worksheet */}
              {isAddingWorksheet && (
                <form 
                  id="form-add-fln-worksheet"
                  onSubmit={handleCreateAssignment}
                  className="p-4 rounded-xl bg-slate-50 border-2 border-emerald-600/30 space-y-3.5 animate-in fade-in duration-200 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                      <Plus className="w-4 h-4 text-emerald-700" />
                      <span>
                        {uiLang === 'hi'
                          ? `${trStudentName(student.name, 'hi')} को नया कार्यपत्रक सौंपें`
                          : `Assign New FLN Worksheet to ${student.name}`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddingWorksheet(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                  </div>

                  {/* Preset Quick-Selector from Curriculum Library */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      {uiLang === 'hi' ? 'विकल्प क: मुख्य पाठ्यक्रम से चुनें (वैकल्पिक)' : 'Option A: Select from Master Curriculum (Optional)'}
                    </label>
                    <select
                      value={selectedPresetId}
                      onChange={(e) => handlePresetSelect(e.target.value)}
                      className="w-full text-xs rounded-lg border border-slate-200 p-2 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="">
                        {uiLang === 'hi' ? '-- उपलब्ध पाठ्यक्रम कार्यपत्रकों में से चुनें --' : '-- Choose from available curriculum worksheets --'}
                      </option>
                      {studentMasterWorksheets.map(ws => (
                        <option key={ws.id} value={ws.id}>
                          {trGrade(ws.grade, uiLang)} • {trSubject(ws.subject, uiLang)}: {trWorksheetTitle(ws, uiLang)} ({ws.languages.map(l => trLanguage(l, uiLang)).join(', ')})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Worksheet Title (or custom input) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {uiLang === 'hi' ? 'कार्यपत्रक का शीर्षक *' : 'Worksheet Title *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder={uiLang === 'hi' ? 'उदा. वारंग क्षिति वर्ण आरेखन' : 'e.g. Warang Chiti Letter Tracing'}
                        className="w-full text-xs rounded-lg border border-slate-200 p-2 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {uiLang === 'hi' ? 'हिन्दी उपशीर्षक (वैकल्पिक)' : 'Hindi Subtitle (Optional)'}
                      </label>
                      <input
                        type="text"
                        value={newTitleHindi}
                        onChange={(e) => setNewTitleHindi(e.target.value)}
                        placeholder={uiLang === 'hi' ? 'उदा. वरंग क्षिति वर्ण आरेखन' : 'e.g. वरंग क्षिति वर्ण आरेखन'}
                        className="w-full text-xs rounded-lg border border-slate-200 p-2 bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Categorized FLN Skill Level Radio Pills */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {uiLang === 'hi' ? 'दक्षता स्तर चुनें *' : 'Categorize by FLN Skill Level *'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewSkillLevel('Foundational')}
                        className={`p-2 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          newSkillLevel === 'Foundational'
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>🌱 {uiLang === 'hi' ? 'बुनियादी' : 'Foundational'}</span>
                        <span className={`text-[10px] font-normal ${newSkillLevel === 'Foundational' ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {uiLang === 'hi' ? 'अक्षर एवं १-१० गणना' : 'Letters & 1-10 math'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewSkillLevel('Emerging')}
                        className={`p-2 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          newSkillLevel === 'Emerging'
                            ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>🌿 {uiLang === 'hi' ? 'उभरता' : 'Emerging'}</span>
                        <span className={`text-[10px] font-normal ${newSkillLevel === 'Emerging' ? 'text-amber-100' : 'text-slate-400'}`}>
                          {uiLang === 'hi' ? 'शब्द एवं १-२० गणित' : 'Words & 1-20 math'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setNewSkillLevel('Proficient')}
                        className={`p-2 rounded-lg border text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
                          newSkillLevel === 'Proficient'
                            ? 'bg-sky-700 text-white border-sky-800 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span>🌳 {uiLang === 'hi' ? 'दक्ष स्तर' : 'Proficient'}</span>
                        <span className={`text-[10px] font-normal ${newSkillLevel === 'Proficient' ? 'text-sky-100' : 'text-slate-400'}`}>
                          {uiLang === 'hi' ? 'गद्यांश एवं व्यावहारिक गणित' : 'Passages & word math'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Subject & Initial Status */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {uiLang === 'hi' ? 'विषय' : 'Subject'}
                      </label>
                      <select
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value as 'Literacy' | 'Numeracy')}
                        className="w-full text-xs rounded-lg border border-slate-200 p-2 bg-white focus:outline-none"
                      >
                        <option value="Literacy">{uiLang === 'hi' ? '📖 साक्षरता' : '📖 Literacy'}</option>
                        <option value="Numeracy">{uiLang === 'hi' ? '🔢 संख्या ज्ञान' : '🔢 Numeracy'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {uiLang === 'hi' ? 'प्रारंभिक स्थिति' : 'Initial Status'}
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as any)}
                        className="w-full text-xs rounded-lg border border-slate-200 p-2 bg-white focus:outline-none"
                      >
                        <option value="pending">{uiLang === 'hi' ? '📋 निर्धारित (लंबित)' : '📋 Pending'}</option>
                        <option value="in_progress">{uiLang === 'hi' ? '⏳ प्रगति पर' : '⏳ In Progress'}</option>
                        <option value="completed">{uiLang === 'hi' ? '✅ पूर्ण' : '✅ Completed'}</option>
                      </select>
                    </div>

                    {newStatus === 'completed' && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                          {uiLang === 'hi' ? 'प्राप्तांक (%)' : 'Score (%)'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={newScore}
                          onChange={(e) => setNewScore(Number(e.target.value))}
                          className="w-full text-xs rounded-lg border border-slate-200 p-2 bg-white focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Form Submission */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsAddingWorksheet(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                    >
                      {uiLang === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{uiLang === 'hi' ? 'सहेजें और सौंपें' : 'Save & Assign Worksheet'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Categorized Skill Sections List */}
              <div className="space-y-4">
                {/* 1. FOUNDATIONAL LEVEL */}
                {(selectedSkillFilter === 'all' || selectedSkillFilter === 'Foundational') && (
                  <div 
                    id="section-fln-foundational"
                    className="border border-emerald-200/90 rounded-xl overflow-hidden bg-white shadow-xs"
                  >
                    {/* Header */}
                    <div className="bg-emerald-50/70 p-3 sm:px-4 border-b border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                          🌱
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-emerald-950 text-xs sm:text-sm">
                              {uiLang === 'hi' ? 'बुनियादी दक्षता स्तर' : 'Foundational FLN Level'}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-800">
                              {foundationalStats.completed}/{foundationalStats.total} {uiLang === 'hi' ? 'पूर्ण' : 'Completed'} ({foundationalStats.percentage}%)
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-800/80 mt-0.5">
                            {uiLang === 'hi'
                              ? 'वर्ण ध्वनि पहचान, अक्षर आरेखन (ट्रेसिंग) और १ से १० तक मूर्त संख्या गणना'
                              : 'Alphabet phonics, letter stroke tracing & 1-10 concrete numeral counting'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenAddForLevel('Foundational')}
                        className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 px-2 py-1 rounded-md bg-white/80 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>{uiLang === 'hi' ? 'जोड़ें' : 'Add'}</span>
                      </button>
                    </div>

                    {/* Progress Bar for Foundational */}
                    <div className="px-4 pt-2.5 pb-1">
                      <div className="w-full h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                        <div 
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${foundationalStats.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Worksheets list */}
                    <div className="p-3 sm:p-4 divide-y divide-slate-100">
                      {foundationalStats.items.length === 0 ? (
                        <div className="text-center py-4 text-xs text-slate-400">
                          {uiLang === 'hi' ? 'बुनियादी स्तर में अभी कोई कार्यपत्रक आवंटित नहीं है।' : 'No worksheets assigned in Foundational stage yet.'}
                        </div>
                      ) : (
                        foundationalStats.items.map(item => (
                          <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                title={uiLang === 'hi' ? 'स्थिति बदलने के लिए क्लिक करें' : 'Click to toggle status (Pending -> In Progress -> Completed)'}
                                className="shrink-0 p-1 hover:scale-110 transition-transform cursor-pointer"
                              >
                                {item.status === 'completed' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                ) : item.status === 'in_progress' ? (
                                  <Clock className="w-4 h-4 text-amber-500 fill-amber-50" />
                                ) : (
                                  <FileText className="w-4 h-4 text-slate-300" />
                                )}
                              </button>
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">
                                  {trAssignedWorksheetTitle(item.title, item.titleHindi, uiLang)}
                                </div>
                                {uiLang === 'en' && item.titleHindi && (
                                  <div className="text-[11px] text-slate-500 font-hindi truncate">
                                    {item.titleHindi}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                                  <span>
                                    {item.subject === 'Literacy'
                                      ? (uiLang === 'hi' ? '📖 साक्षरता' : '📖 Literacy')
                                      : (uiLang === 'hi' ? '🔢 संख्या ज्ञान' : '🔢 Numeracy')}
                                  </span>
                                  <span>•</span>
                                  <span>{uiLang === 'hi' ? 'आवंटित:' : 'Assigned:'} {trAssignedDate(item.assignedDate, uiLang)}</span>
                                  {item.score && (
                                    <>
                                      <span>•</span>
                                      <span className="font-bold text-emerald-700">
                                        {uiLang === 'hi' ? 'प्राप्तांक:' : 'Score:'} {item.score}%
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Status badge that can also be clicked to toggle */}
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                                  item.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : item.status === 'in_progress'
                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {item.status === 'completed'
                                  ? (uiLang === 'hi' ? '✓ पूर्ण' : '✓ Completed')
                                  : item.status === 'in_progress'
                                  ? (uiLang === 'hi' ? '⏳ प्रगति पर' : '⏳ In Progress')
                                  : (uiLang === 'hi' ? '📋 लंबित' : '📋 Pending')}
                              </button>

                              <button
                                onClick={() => handleDeleteAssignment(item.id)}
                                title={uiLang === 'hi' ? 'कार्यपत्रक हटाएं' : 'Remove assignment'}
                                className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 2. EMERGING LEVEL */}
                {(selectedSkillFilter === 'all' || selectedSkillFilter === 'Emerging') && (
                  <div 
                    id="section-fln-emerging"
                    className="border border-amber-200/90 rounded-xl overflow-hidden bg-white shadow-xs"
                  >
                    {/* Header */}
                    <div className="bg-amber-50/70 p-3 sm:px-4 border-b border-amber-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center text-xs font-bold">
                          🌿
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-amber-950 text-xs sm:text-sm">
                              {uiLang === 'hi' ? 'उभरता दक्षता स्तर' : 'Emerging FLN Level'}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                              {emergingStats.completed}/{emergingStats.total} {uiLang === 'hi' ? 'पूर्ण' : 'Completed'} ({emergingStats.percentage}%)
                            </span>
                          </div>
                          <p className="text-[11px] text-amber-900/80 mt-0.5">
                            {uiLang === 'hi'
                              ? 'अक्षर संयोजन, द्विभाषी शब्द मिलान और १ से २० तक सचित्र जोड़ अभ्यास'
                              : 'Syllable blending, bilingual flashcards & 1-20 visual manipulatives addition'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenAddForLevel('Emerging')}
                        className="text-[11px] font-bold text-amber-900 hover:text-amber-950 px-2 py-1 rounded-md bg-white/80 border border-amber-200 hover:bg-amber-100 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>{uiLang === 'hi' ? 'जोड़ें' : 'Add'}</span>
                      </button>
                    </div>

                    {/* Progress Bar for Emerging */}
                    <div className="px-4 pt-2.5 pb-1">
                      <div className="w-full h-1.5 rounded-full bg-amber-100 overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${emergingStats.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Worksheets list */}
                    <div className="p-3 sm:p-4 divide-y divide-slate-100">
                      {emergingStats.items.length === 0 ? (
                        <div className="text-center py-4 text-xs text-slate-400">
                          {uiLang === 'hi' ? 'उभरते स्तर में अभी कोई कार्यपत्रक आवंटित नहीं है।' : 'No worksheets assigned in Emerging stage yet.'}
                        </div>
                      ) : (
                        emergingStats.items.map(item => (
                          <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                title={uiLang === 'hi' ? 'स्थिति बदलने के लिए क्लिक करें' : 'Click to toggle status (Pending -> In Progress -> Completed)'}
                                className="shrink-0 p-1 hover:scale-110 transition-transform cursor-pointer"
                              >
                                {item.status === 'completed' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                ) : item.status === 'in_progress' ? (
                                  <Clock className="w-4 h-4 text-amber-500 fill-amber-50" />
                                ) : (
                                  <FileText className="w-4 h-4 text-slate-300" />
                                )}
                              </button>
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">
                                  {trAssignedWorksheetTitle(item.title, item.titleHindi, uiLang)}
                                </div>
                                {uiLang === 'en' && item.titleHindi && (
                                  <div className="text-[11px] text-slate-500 font-hindi truncate">
                                    {item.titleHindi}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                                  <span>
                                    {item.subject === 'Literacy'
                                      ? (uiLang === 'hi' ? '📖 साक्षरता' : '📖 Literacy')
                                      : (uiLang === 'hi' ? '🔢 संख्या ज्ञान' : '🔢 Numeracy')}
                                  </span>
                                  <span>•</span>
                                  <span>{uiLang === 'hi' ? 'आवंटित:' : 'Assigned:'} {trAssignedDate(item.assignedDate, uiLang)}</span>
                                  {item.score && (
                                    <>
                                      <span>•</span>
                                      <span className="font-bold text-emerald-700">
                                        {uiLang === 'hi' ? 'प्राप्तांक:' : 'Score:'} {item.score}%
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                                  item.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : item.status === 'in_progress'
                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {item.status === 'completed'
                                  ? (uiLang === 'hi' ? '✓ पूर्ण' : '✓ Completed')
                                  : item.status === 'in_progress'
                                  ? (uiLang === 'hi' ? '⏳ प्रगति पर' : '⏳ In Progress')
                                  : (uiLang === 'hi' ? '📋 लंबित' : '📋 Pending')}
                              </button>

                              <button
                                onClick={() => handleDeleteAssignment(item.id)}
                                title={uiLang === 'hi' ? 'कार्यपत्रक हटाएं' : 'Remove assignment'}
                                className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 3. PROFICIENT LEVEL */}
                {(selectedSkillFilter === 'all' || selectedSkillFilter === 'Proficient') && (
                  <div 
                    id="section-fln-proficient"
                    className="border border-sky-200/90 rounded-xl overflow-hidden bg-white shadow-xs"
                  >
                    {/* Header */}
                    <div className="bg-sky-50/70 p-3 sm:px-4 border-b border-sky-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-sky-700 text-white flex items-center justify-center text-xs font-bold">
                          🌳
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sky-950 text-xs sm:text-sm">
                              {uiLang === 'hi' ? 'दक्ष / निपुण स्तर' : 'Proficient FLN Level'}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200/70 text-sky-900">
                              {proficientStats.completed}/{proficientStats.total} {uiLang === 'hi' ? 'पूर्ण' : 'Completed'} ({proficientStats.percentage}%)
                            </span>
                          </div>
                          <p className="text-[11px] text-sky-900/80 mt-0.5">
                            {uiLang === 'hi'
                              ? 'लोककथा रिक्त स्थान पूर्ति, जीवनी पठन और ग्रामीण हाट अंकगणित'
                              : 'Connected story cloze, biographical reading & village Haat arithmetic'}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenAddForLevel('Proficient')}
                        className="text-[11px] font-bold text-sky-900 hover:text-sky-950 px-2 py-1 rounded-md bg-white/80 border border-sky-200 hover:bg-sky-100 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5]" />
                        <span>{uiLang === 'hi' ? 'जोड़ें' : 'Add'}</span>
                      </button>
                    </div>

                    {/* Progress Bar for Proficient */}
                    <div className="px-4 pt-2.5 pb-1">
                      <div className="w-full h-1.5 rounded-full bg-sky-100 overflow-hidden">
                        <div 
                          className="h-full bg-sky-600 rounded-full transition-all duration-300"
                          style={{ width: `${proficientStats.percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Worksheets list */}
                    <div className="p-3 sm:p-4 divide-y divide-slate-100">
                      {proficientStats.items.length === 0 ? (
                        <div className="text-center py-4 text-xs text-slate-400">
                          {uiLang === 'hi' ? 'दक्ष स्तर में अभी कोई कार्यपत्रक आवंटित नहीं है।' : 'No worksheets assigned in Proficient stage yet.'}
                        </div>
                      ) : (
                        proficientStats.items.map(item => (
                          <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                title={uiLang === 'hi' ? 'स्थिति बदलने के लिए क्लिक करें' : 'Click to toggle status (Pending -> In Progress -> Completed)'}
                                className="shrink-0 p-1 hover:scale-110 transition-transform cursor-pointer"
                              >
                                {item.status === 'completed' ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                ) : item.status === 'in_progress' ? (
                                  <Clock className="w-4 h-4 text-amber-500 fill-amber-50" />
                                ) : (
                                  <FileText className="w-4 h-4 text-slate-300" />
                                )}
                              </button>
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">
                                  {trAssignedWorksheetTitle(item.title, item.titleHindi, uiLang)}
                                </div>
                                {uiLang === 'en' && item.titleHindi && (
                                  <div className="text-[11px] text-slate-500 font-hindi truncate">
                                    {item.titleHindi}
                                  </div>
                                )}
                                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                                  <span>
                                    {item.subject === 'Literacy'
                                      ? (uiLang === 'hi' ? '📖 साक्षरता' : '📖 Literacy')
                                      : (uiLang === 'hi' ? '🔢 संख्या ज्ञान' : '🔢 Numeracy')}
                                  </span>
                                  <span>•</span>
                                  <span>{uiLang === 'hi' ? 'आवंटित:' : 'Assigned:'} {trAssignedDate(item.assignedDate, uiLang)}</span>
                                  {item.score && (
                                    <>
                                      <span>•</span>
                                      <span className="font-bold text-emerald-700">
                                        {uiLang === 'hi' ? 'प्राप्तांक:' : 'Score:'} {item.score}%
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                                  item.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : item.status === 'in_progress'
                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {item.status === 'completed'
                                  ? (uiLang === 'hi' ? '✓ पूर्ण' : '✓ Completed')
                                  : item.status === 'in_progress'
                                  ? (uiLang === 'hi' ? '⏳ प्रगति पर' : '⏳ In Progress')
                                  : (uiLang === 'hi' ? '📋 लंबित' : '📋 Pending')}
                              </button>

                              <button
                                onClick={() => handleDeleteAssignment(item.id)}
                                title={uiLang === 'hi' ? 'कार्यपत्रक हटाएं' : 'Remove assignment'}
                                className="text-slate-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Tab 2: Diagnostics & Language Progression */
            <div className="space-y-4">
              {/* Dual Language Bridge Bars */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  {uiLang === 'hi' ? 'द्विभाषी सेतु दक्षता प्रगति' : 'Bilingual FLN Bridge Progression'}
                </h4>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">
                      {langIcon}{' '}
                      {uiLang === 'hi'
                        ? `${trLanguage(student.language, 'hi')} मातृभाषा प्रवाह`
                        : `${student.language} Mother Tongue Fluency`}
                    </span>
                    <span className="font-bold text-emerald-700">{student.motherTongueProficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full" 
                      style={{ width: `${student.motherTongueProficiency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">
                      🇮🇳 {uiLang === 'hi' ? 'हिन्दी सेतु शब्दावली संक्रमण' : 'Hindi Bridge Vocabulary Transition'}
                    </span>
                    <span className="font-bold text-sky-700">{student.hindiBridgeProficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className="h-full bg-sky-600 rounded-full" 
                      style={{ width: `${student.hindiBridgeProficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Assessment Summary Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-xs text-slate-500 font-medium">
                    {uiLang === 'hi' ? 'औसत निपुण प्राप्तांक' : 'Average FLN Score'}
                  </div>
                  <div className={`text-2xl font-extrabold mt-0.5 ${
                    student.avgScore >= 70 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {student.avgScore}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-xs text-slate-500 font-medium">
                    {uiLang === 'hi' ? 'पूर्ण किए गए मूल्यांकन' : 'Completed Assessments'}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                    {student.assessmentsCompleted}
                  </div>
                </div>
              </div>

              {/* Teacher Diagnostic Notes */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="font-bold text-amber-950 text-xs flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  {uiLang === 'hi' ? 'शिक्षक अवलोकन एवं शिक्षण पथ' : 'Teacher Observation & Learning Path'}
                </div>
                <p className="text-amber-900 text-xs leading-relaxed">
                  {trStudentNotes(student.notes, uiLang)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2 justify-end shrink-0">
          <button
            onClick={() => {
              onStartVoiceAssessment(student);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-700" />
            <span>{uiLang === 'hi' ? 'ध्वनि अनुवाद अभ्यास' : 'Voice Translate Practice'}</span>
          </button>

          <button
            onClick={() => {
              onGenerateTargetedWorksheet(student);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>{uiLang === 'hi' ? 'उपचारात्मक कार्यपत्रक बनाएं' : 'Generate Remedial Worksheet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
