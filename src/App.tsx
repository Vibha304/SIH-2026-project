import React, { useState } from 'react';
import { LayoutDashboard, Mic, GraduationCap, FileText, BookOpen } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { WorksheetsView } from './components/WorksheetsView';
import { CulturalLibraryView } from './components/CulturalLibraryView';
import { VoiceTranslatorView } from './components/VoiceTranslatorView';
import { AdvancedTeacherSupportView } from './components/AdvancedTeacherSupportView';
import { AddStudentModal } from './components/AddStudentModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { WorksheetViewerModal } from './components/WorksheetViewerModal';
import { 
  INITIAL_STUDENTS, 
  INITIAL_WORKSHEETS, 
  CULTURAL_STORIES, 
  FLN_SKILLS 
} from './data/mockData';
import { Student, WorksheetItem, CulturalStory, TribalLanguage } from './types';
import { generateDynamicWorksheetContent } from './utils/worksheetGenerator';
import { trStudentName, trLanguage } from './utils/i18n';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('translator');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(248);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [uiLang, setUiLang] = useState<'en' | 'hi'>('hi');

  // App data state
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [worksheets, setWorksheets] = useState<WorksheetItem[]>(INITIAL_WORKSHEETS);
  const [culturalStories, setCulturalStories] = useState<CulturalStory[]>(CULTURAL_STORIES);

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [previewWorksheet, setPreviewWorksheet] = useState<WorksheetItem | null>(null);

  // Dynamic titles matching Screenshot
  const getHeaderMeta = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: uiLang === 'hi' ? 'डैशबोर्ड' : 'Dashboard',
          subtitle: uiLang === 'hi' ? 'मूल्यांकन और छात्र अवलोकन' : 'Assessment analytics & overview'
        };
      case 'translator':
        return {
          title: uiLang === 'hi' ? 'ध्वनि अनुवादक' : 'Voice Translator',
          subtitle: uiLang === 'hi' ? '3 सेकंड से कम विलंबता में आदिवासी भाषा अनुवाद' : 'Real-time sub-3s voice translation'
        };
      case 'teacher-support':
        return {
          title: uiLang === 'hi' ? 'उन्नत शिक्षक संबल' : 'Advanced Teacher Support',
          subtitle: uiLang === 'hi' ? 'पाठ योजनाकार, उच्चारण कोच, सांस्कृतिक उदाहरण व शब्दकोश' : 'AI Lesson Planner, Pronunciation Coach, Context & Dictionary'
        };
      case 'worksheets':
        return {
          title: uiLang === 'hi' ? 'कार्यपत्रक' : 'Worksheets',
          subtitle: uiLang === 'hi' ? 'निपुण भारत संरेखित कार्यपत्रक' : 'NIPUN-aligned worksheets'
        };
      case 'cultural':
        return {
          title: uiLang === 'hi' ? 'सांस्कृतिक पुस्तकालय' : 'Cultural Library',
          subtitle: uiLang === 'hi' ? 'ऑफ़लाइन लोककथाएं और गीत' : 'Offline cultural content'
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Assessment analytics & overview'
        };
    }
  };

  // Handlers
  const handleAddStudent = (newStudent: Student) => {
    setStudents([newStudent, ...students]);
  };

  const handleAssignWorksheet = (worksheetId: string, studentIds: string[]) => {
    setWorksheets(worksheets.map(w => {
      if (w.id === worksheetId) {
        return {
          ...w,
          status: 'assigned',
          assignedCount: w.assignedCount + studentIds.length
        };
      }
      return w;
    }));
  };

  const handleCreateCustomWorksheet = (newWorksheet: WorksheetItem) => {
    setWorksheets([newWorksheet, ...worksheets]);
  };

  const handleToggleDownloadStory = (id: string) => {
    setCulturalStories(culturalStories.map(s => {
      if (s.id === id) {
        return { ...s, isDownloaded: !s.isDownloaded };
      }
      return s;
    }));
  };

  const handleAddWorksheetFromPhrase = (phrase: string, translation: string, lang: TribalLanguage) => {
    const customWs: WorksheetItem = {
      id: `w-phrase-${Date.now()}`,
      title: `${phrase.slice(0, 24)} (${lang})`,
      titleHindi: `${phrase} (${trLanguage(lang, 'hi')})`,
      grade: 'Grade 1',
      description: `Targeted bilingual practice for "${phrase}" translated to ${lang}: "${translation}"`,
      languages: [lang],
      subject: 'Literacy',
      type: 'fill-blank',
      status: 'assigned',
      assignedCount: 1,
      completedCount: 0,
      script: lang === 'Santhali' ? 'Ol Chiki' : lang === 'Ho' ? 'Warang Chiti' : 'Devanagari'
    };
    customWs.customExercisePayload = generateDynamicWorksheetContent(customWs);
    setWorksheets([customWs, ...worksheets]);
    setPreviewWorksheet(customWs);
    setActiveTab('worksheets');
  };

  const { title, subtitle } = getHeaderMeta();

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setSelectedStudent(updatedStudent);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased overflow-x-hidden">
      {/* Navigation Drawer / Resizable Desktop Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        uiLang={uiLang}
        isPinned={isSidebarPinned}
        sidebarWidth={sidebarWidth}
        onResizeWidth={setSidebarWidth}
      />

      {/* Responsive Content Wrapper shifting smoothly when desktop sidebar is docked */}
      <div
        style={isSidebarPinned ? { paddingLeft: undefined } : undefined}
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isSidebarPinned ? 'lg:pl-[var(--sidebar-w)]' : ''
        }`}
        ref={(el) => {
          if (el) {
            el.style.setProperty('--sidebar-w', `${sidebarWidth}px`);
          }
        }}
      >
        {/* Top App Bar */}
        <Header
          title={title}
          subtitle={subtitle}
          onToggleSidebar={() => setSidebarOpen(true)}
          uiLang={uiLang}
          onToggleUiLang={() => setUiLang(uiLang === 'en' ? 'hi' : 'en')}
          onSetUiLang={setUiLang}
          isFullWidth={isFullWidth}
          onToggleFullWidth={() => setIsFullWidth((prev) => !prev)}
          isSidebarPinned={isSidebarPinned}
          onTogglePinSidebar={() => setIsSidebarPinned((prev) => !prev)}
        />

        {/* Main Content Area - Fully Responsive & Resizable across Mobile, Tablet, and PC */}
        <main
          className={`flex-1 p-3 sm:p-5 lg:p-8 pb-24 lg:pb-10 w-full mx-auto transition-all duration-200 ${
            isFullWidth ? 'max-w-full' : 'max-w-7xl'
          }`}
        >
          {activeTab === 'dashboard' && (
            <DashboardView
              students={students}
              flnSkills={FLN_SKILLS}
              onOpenAddStudent={() => setIsAddStudentOpen(true)}
              onSelectStudent={(student) => setSelectedStudent(student)}
              onNavigateToWorksheets={() => setActiveTab('worksheets')}
              onNavigateToTranslator={() => setActiveTab('translator')}
              uiLang={uiLang}
            />
          )}

          {activeTab === 'translator' && (
            <VoiceTranslatorView
              onAddWorksheetFromPhrase={handleAddWorksheetFromPhrase}
              uiLang={uiLang}
            />
          )}

          {activeTab === 'teacher-support' && (
            <AdvancedTeacherSupportView
              uiLang={uiLang}
              onNavigateToWorksheets={() => setActiveTab('worksheets')}
              onNavigateToTranslator={() => setActiveTab('translator')}
            />
          )}

          {activeTab === 'worksheets' && (
            <WorksheetsView
              worksheets={worksheets}
              students={students}
              onAssignWorksheet={handleAssignWorksheet}
              onPreviewWorksheet={(ws) => setPreviewWorksheet(ws)}
              onCreateCustomWorksheet={handleCreateCustomWorksheet}
              uiLang={uiLang}
            />
          )}

          {activeTab === 'cultural' && (
            <CulturalLibraryView
              stories={culturalStories}
              onToggleDownload={handleToggleDownloadStory}
              onCreateCustomStory={(newStory) => setCulturalStories((prev) => [newStory, ...prev])}
              uiLang={uiLang}
            />
          )}
        </main>
      </div>

      {/* Responsive Mobile & Tablet Bottom Quick Navigation Bar */}
      <nav
        id="mobile-bottom-nav"
        aria-label={uiLang === 'hi' ? 'त्वरित नेविगेशन' : 'Quick Navigation'}
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 px-1.5 py-1.5 flex items-center justify-around shadow-lg print:hidden"
      >
        {[
          { id: 'dashboard' as NavTab, icon: LayoutDashboard, labelHi: 'डैशबोर्ड', labelEn: 'Dashboard' },
          { id: 'translator' as NavTab, icon: Mic, labelHi: 'अनुवादक', labelEn: 'Translator' },
          { id: 'teacher-support' as NavTab, icon: GraduationCap, labelHi: 'शिक्षक संबल', labelEn: 'Support' },
          { id: 'worksheets' as NavTab, icon: FileText, labelHi: 'कार्यपत्रक', labelEn: 'Worksheets' },
          { id: 'cultural' as NavTab, icon: BookOpen, labelHi: 'पुस्तकालय', labelEn: 'Library' },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer min-w-[56px] ${
                isActive
                  ? 'text-emerald-800 bg-emerald-50/90'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-700 stroke-[2.4]' : 'text-slate-500'}`} />
              <span className="truncate max-w-[68px]">{uiLang === 'hi' ? item.labelHi : item.labelEn}</span>
            </button>
          );
        })}
      </nav>

      {/* Modals */}
      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
        uiLang={uiLang}
      />

      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onUpdateStudent={handleUpdateStudent}
        availableMasterWorksheets={worksheets}
        onGenerateTargetedWorksheet={(st) => {
          const ws: WorksheetItem = {
            id: `w-diag-${Date.now()}`,
            title: `FLN Diagnostic Remediation: ${st.name}`,
            titleHindi: `${trStudentName(st.name, 'hi')} के लिए लक्षित अभ्यास कार्यपत्रक`,
            grade: st.grade,
            description: `Personalized ${st.language} mother tongue & Hindi bridge reading exercises for ${st.name}`,
            languages: [st.language],
            subject: 'Literacy',
            type: 'tracing',
            status: 'assigned',
            assignedCount: 1,
            completedCount: 0,
            script: st.language === 'Santhali' ? 'Ol Chiki' : st.language === 'Ho' ? 'Warang Chiti' : 'Devanagari'
          };
          ws.customExercisePayload = generateDynamicWorksheetContent(ws);
          setWorksheets([ws, ...worksheets]);

          // Also automatically append to student's assigned worksheets
          const targetLevel = st.flnLevel === 'beginner' ? 'Foundational' : st.flnLevel === 'intermediate' ? 'Emerging' : 'Proficient';
          const newStudentAssignment = {
            id: `sw_diag_${Date.now()}`,
            title: ws.title,
            titleHindi: ws.titleHindi,
            skillLevel: targetLevel as any,
            subject: 'Literacy' as const,
            status: 'in_progress' as const,
            assignedDate: 'Today'
          };
          const updated = {
            ...st,
            assignedWorksheets: [newStudentAssignment, ...(st.assignedWorksheets || [])]
          };
          handleUpdateStudent(updated);

          setPreviewWorksheet(ws);
          setActiveTab('worksheets');
        }}
        onStartVoiceAssessment={(st) => {
          setActiveTab('translator');
        }}
        uiLang={uiLang}
      />

      <WorksheetViewerModal
        worksheet={previewWorksheet}
        onClose={() => setPreviewWorksheet(null)}
        uiLang={uiLang}
      />
    </div>
  );
}
