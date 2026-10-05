import React from 'react';
import { BookOpen, Compass, BarChart3, UserRound } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  darkMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  darkMode = false,
}) => {
  const tabs: {
    id: ScreenId;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'home', label: 'Katalog', icon: BookOpen },
    { id: 'skill-map', label: 'Peta', icon: Compass },
    { id: 'progress', label: 'Progres', icon: BarChart3 },
    { id: 'profile-settings', label: 'Profil', icon: UserRound },
  ];

  return (
    <nav
      aria-label="Navigasi Utama"
      className={`sticky bottom-0 left-0 right-0 z-30 border-t px-2 py-1.5 backdrop-blur-md transition-colors ${
        darkMode
          ? 'bg-slate-900/95 border-slate-800 text-slate-300'
          : 'bg-white/95 border-[#89CFF0]/35 text-[#1E293B]'
      }`}
    >
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center rounded-2xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? darkMode
                    ? 'bg-[#1E6FB8]/30 text-[#89CFF0] font-bold'
                    : 'bg-[#89CFF0]/25 text-[#1E6FB8] font-bold'
                  : darkMode
                  ? 'text-slate-400 hover:text-slate-200 font-medium'
                  : 'text-slate-500 hover:text-[#1E293B] font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <span className="text-[11px] leading-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
