import React from 'react';
import { 
  LayoutDashboard, 
  Mic, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  X
} from 'lucide-react';

export type NavTab = 'dashboard' | 'translator' | 'worksheets' | 'cultural' | 'teacher-support';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  uiLang: 'en' | 'hi';
  isPinned?: boolean;
  sidebarWidth?: number;
  onResizeWidth?: (newWidth: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  uiLang,
  isPinned = false,
  sidebarWidth = 248,
  onResizeWidth
}) => {
  const startResize = (e: React.MouseEvent) => {
    if (!onResizeWidth) return;
    e.preventDefault();
    const startX = e.clientX;
    const startW = sidebarWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextWidth = Math.max(210, Math.min(360, startW + delta));
      onResizeWidth(nextWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const navItems = [
    {
      id: 'translator' as NavTab,
      labelEn: 'Voice Translator',
      labelHi: 'ध्वनि अनुवादक',
      icon: Mic,
    },
    {
      id: 'worksheets' as NavTab,
      labelEn: 'Worksheets',
      labelHi: 'द्विभाषी कार्यपत्रक',
      icon: FileText,
    },
    {
      id: 'teacher-support' as NavTab,
      labelEn: 'Teacher Support',
      labelHi: 'शिक्षक संबल',
      icon: GraduationCap,
    },
    {
      id: 'cultural' as NavTab,
      labelEn: 'Cultural Library',
      labelHi: 'सांस्कृतिक पुस्तकालय',
      icon: BookOpen,
    },
    {
      id: 'dashboard' as NavTab,
      labelEn: 'Dashboard & Roster',
      labelHi: 'डैशबोर्ड व छात्र',
      icon: LayoutDashboard,
    }
  ];

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Slide-out drawer or Docked Desktop Sidebar */}
      <aside
        id="app-navigation-drawer"
        style={isPinned ? { width: `${sidebarWidth}px` } : undefined}
        className={`fixed top-0 left-0 bottom-0 bg-white border-r border-slate-200/80 z-50 transform transition-transform duration-200 ease-out flex flex-col ${
          isPinned
            ? 'lg:translate-x-0 lg:z-20'
            : 'w-64 shadow-xl'
        } ${isOpen ? 'translate-x-0 w-64 shadow-xl' : isPinned ? '-translate-x-full lg:translate-x-0' : '-translate-x-full'}`}
      >
        {/* Interactive Drag Resizer Handle on Right Edge */}
        {onResizeWidth && (
          <div
            onMouseDown={startResize}
            title={uiLang === 'hi' ? 'साइडबार की चौड़ाई बदलें' : 'Drag to resize sidebar'}
            className="hidden lg:block absolute top-0 right-0 bottom-0 w-1 cursor-col-resize hover:bg-emerald-500/40 active:bg-emerald-600/60 transition-colors z-30"
          />
        )}

        {/* Brand Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-base shrink-0">
              प
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-900 tracking-tight truncate">
                {uiLang === 'hi' ? 'पलाश (PALASH)' : 'PALASH FLN'}
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {uiLang === 'hi' ? 'मातृभाषा प्राथमिक शिक्षा' : 'Jharkhand MTB-MLE'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-sidebar"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={uiLang === 'hi' ? 'साइडबार बंद करें' : 'Close sidebar'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Single-Line Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700 stroke-[2.2]' : 'text-slate-400'}`} />
                <span className="truncate">
                  {uiLang === 'hi' ? item.labelHi : item.labelEn}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Quiet Footer: Supported Tribal Languages */}
        <div className="px-4 py-3.5 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
          <div className="font-semibold text-slate-700 text-[11px]">
            {uiLang === 'hi' ? 'मातृभाषा सेतु (NIPUN)' : 'Mother Tongue Bridge'}
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>🌲 {uiLang === 'hi' ? 'संथाली' : 'Santhali'}</span>
            <span className="text-slate-400">Ol Chiki</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>🪶 {uiLang === 'hi' ? 'हो' : 'Ho'}</span>
            <span className="text-slate-400">Warang Chiti</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>🌿 {uiLang === 'hi' ? 'मुंडारी' : 'Mundari'}</span>
            <span className="text-slate-400">Devanagari</span>
          </div>
        </div>
      </aside>
    </>
  );
};
