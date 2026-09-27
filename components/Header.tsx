import React from 'react';
import { Menu, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  onToggleSidebar: () => void;
  uiLang: 'en' | 'hi';
  onToggleUiLang: () => void;
  onSetUiLang?: (lang: 'en' | 'hi') => void;
  isFullWidth?: boolean;
  onToggleFullWidth?: () => void;
  isSidebarPinned?: boolean;
  onTogglePinSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onToggleSidebar,
  uiLang,
  onToggleUiLang,
  onSetUiLang,
  isFullWidth = false,
  onToggleFullWidth,
  isSidebarPinned = false,
  onTogglePinSidebar
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 sm:px-6 py-2.5 sticky top-0 z-30 flex items-center justify-between gap-3">
      {/* Left section: Mobile Hamburger / Desktop Sidebar Toggle & Page Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          id="btn-sidebar-toggle"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0"
          title={uiLang === 'hi' ? 'नेविगेशन मेनू खोलें' : 'Toggle Navigation Menu'}
          aria-label={uiLang === 'hi' ? 'नेविगेशन मेनू खोलें' : 'Toggle Navigation Menu'}
        >
          <Menu className="w-5 h-5" />
        </button>

        {onTogglePinSidebar && (
          <button
            type="button"
            id="btn-pin-sidebar-desktop"
            onClick={onTogglePinSidebar}
            className="hidden lg:flex items-center justify-center p-2 -ml-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title={
              isSidebarPinned
                ? (uiLang === 'hi' ? 'साइडबार छुपाएं' : 'Collapse Sidebar')
                : (uiLang === 'hi' ? 'साइडबार दिखाएं' : 'Expand Sidebar')
            }
          >
            {isSidebarPinned ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        )}

        <div className="min-w-0 flex items-baseline gap-2.5">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
            {title}
          </h1>
          <span className="hidden md:inline text-slate-300" aria-hidden="true">·</span>
          <p className="hidden md:block text-xs text-slate-500 truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right section: Clean Language Toggle, Width Toggle & Teacher Avatar */}
      <div className="flex items-center gap-2 shrink-0">
        {/* UI Language Segmented Switcher (HI / EN) */}
        <div
          id="btn-toggle-ui-language"
          className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80"
          role="group"
          aria-label={uiLang === 'hi' ? 'भाषा चुनें' : 'Select Interface Language'}
        >
          <button
            type="button"
            onClick={() => onSetUiLang ? onSetUiLang('hi') : (uiLang !== 'hi' && onToggleUiLang())}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              uiLang === 'hi'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="हिन्दी इंटरफ़ेस चुनें"
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => onSetUiLang ? onSetUiLang('en') : (uiLang !== 'en' && onToggleUiLang())}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              uiLang === 'en'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Switch to English Interface"
          >
            EN
          </button>
        </div>

        {/* Workspace Width Toggle (Icon Button) */}
        {onToggleFullWidth && (
          <button
            type="button"
            id="btn-toggle-workspace-width"
            onClick={onToggleFullWidth}
            className="hidden md:flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title={
              isFullWidth
                ? (uiLang === 'hi' ? 'मानक चौड़ाई' : 'Centered View')
                : (uiLang === 'hi' ? 'पूर्ण चौड़ाई' : 'Full Width View')
            }
          >
            {isFullWidth ? <Minimize2 className="w-4 h-4 text-emerald-700" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}

        {/* Teacher Avatar */}
        <div
          id="user-avatar-teacher"
          className="w-8 h-8 rounded-full bg-emerald-700 text-white font-semibold flex items-center justify-center text-xs cursor-pointer hover:bg-emerald-800 transition-colors"
          title={uiLang === 'hi' ? 'शिक्षक प्रोफ़ाइल - झारखंड' : 'Teacher Profile - Jharkhand'}
        >
          {uiLang === 'hi' ? 'शि' : 'T'}
        </div>
      </div>
    </header>
  );
};
