import React, { useState } from 'react';
import {
  Smartphone,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Flame,
  BatteryFull,
} from 'lucide-react';
import { ConceptItem, FamilyProfile, ScreenId, UIMode } from './types';
import {
  CONCEPTS_LIST,
  INITIAL_PROFILES,
  SCREEN_META,
} from './data/semestaData';
import { SemestaAtomLogo, ProfileAvatar } from './components/Illustrations';
import {
  SplashScreen,
  ProfilePickerScreen,
} from './components/screens/OnboardingScreens';
import {
  HomeCatalogScreen,
  ConceptDetailScreen,
} from './components/screens/CatalogAndDetailScreens';
import {
  StoryViewerScreen,
  SimulationScreen,
  QuizScreen,
  QuizResultScreen,
} from './components/screens/LearningScreens';
import {
  SkillMapScreen,
  ProgressDashboardScreen,
  ProfileSettingsScreen,
} from './components/screens/MapProgressProfileScreens';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('concept-detail');
  const [viewMode, setViewMode] = useState<'single' | 'gallery'>('single');
  const [profiles, setProfiles] = useState<FamilyProfile[]>(INITIAL_PROFILES);
  const [activeProfile, setActiveProfile] = useState<FamilyProfile>(
    INITIAL_PROFILES[0] // Default: Kirana
  );
  const [selectedConcept, setSelectedConcept] = useState<ConceptItem>(
    CONCEPTS_LIST[0] // Default: Gerak Parabola
  );
  const [uiMode, setUiMode] = useState<UIMode>('Penjelajah');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const currentMetaIndex = SCREEN_META.findIndex((s) => s.id === activeScreen);
  const currentMeta = SCREEN_META[currentMetaIndex] || SCREEN_META[0];

  const handleSelectProfile = (profile: FamilyProfile) => {
    setActiveProfile(profile);
    setUiMode(profile.uiMode);
    setActiveScreen('home');
  };

  const handleAddProfile = (newProfile: FamilyProfile) => {
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfile(newProfile);
    setUiMode(newProfile.uiMode);
    setActiveScreen('home');
  };

  const renderScreenById = (screenId: ScreenId) => {
    switch (screenId) {
      case 'splash':
        return <SplashScreen onStart={() => setActiveScreen('profile-picker')} />;
      case 'profile-picker':
        return (
          <ProfilePickerScreen
            profiles={profiles}
            selectedProfileId={activeProfile.id}
            onSelectProfile={handleSelectProfile}
            onAddProfile={handleAddProfile}
          />
        );
      case 'home':
        return (
          <HomeCatalogScreen
            activeProfile={activeProfile}
            onNavigate={setActiveScreen}
            onSelectConcept={(concept) => setSelectedConcept(concept)}
            darkMode={darkMode}
          />
        );
      case 'concept-detail':
        return (
          <ConceptDetailScreen
            concept={selectedConcept}
            onNavigate={setActiveScreen}
          />
        );
      case 'story':
        return <StoryViewerScreen onNavigate={setActiveScreen} />;
      case 'simulation':
        return <SimulationScreen onNavigate={setActiveScreen} />;
      case 'quiz':
        return <QuizScreen onNavigate={setActiveScreen} />;
      case 'quiz-result':
        return <QuizResultScreen onNavigate={setActiveScreen} />;
      case 'skill-map':
        return (
          <SkillMapScreen onNavigate={setActiveScreen} darkMode={darkMode} />
        );
      case 'progress':
        return (
          <ProgressDashboardScreen
            onNavigate={setActiveScreen}
            darkMode={darkMode}
          />
        );
      case 'profile-settings':
        return (
          <ProfileSettingsScreen
            activeProfile={activeProfile}
            uiMode={uiMode}
            onChangeUiMode={setUiMode}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onNavigate={setActiveScreen}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EAF6FD] text-[#1E293B]">
      {/* Top Studio Navigation Bar (3-Zone Contract, 100% Bahasa Indonesia) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#89CFF0]/40 px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            setActiveScreen('splash');
          }}
          className="text-lg font-extrabold tracking-tight text-[#1E6FB8] whitespace-nowrap"
        >
          Semesta
        </a>

        {/* Zone 2: Quick Flow Navigation Links */}
        <nav
          aria-label="Alur Layar Utama"
          className="hidden md:flex items-center gap-5 text-xs font-bold text-slate-600"
        >
          <button
            type="button"
            onClick={() => {
              setViewMode('single');
              setActiveScreen('splash');
            }}
            className={`hover:text-[#1E6FB8] transition-colors whitespace-nowrap cursor-pointer ${
              activeScreen === 'splash' || activeScreen === 'profile-picker'
                ? 'text-[#1E6FB8] underline underline-offset-4'
                : ''
            }`}
          >
            Pembuka & Profil
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('single');
              setActiveScreen('home');
            }}
            className={`hover:text-[#1E6FB8] transition-colors whitespace-nowrap cursor-pointer ${
              activeScreen === 'home' || activeScreen === 'concept-detail'
                ? 'text-[#1E6FB8] underline underline-offset-4'
                : ''
            }`}
          >
            Katalog & Konsep
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('single');
              setActiveScreen('story');
            }}
            className={`hover:text-[#1E6FB8] transition-colors whitespace-nowrap cursor-pointer ${
              activeScreen === 'story' ? 'text-[#1E6FB8] underline underline-offset-4' : ''
            }`}
          >
            Cerita Visual
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('single');
              setActiveScreen('simulation');
            }}
            className={`hover:text-[#1E6FB8] transition-colors whitespace-nowrap cursor-pointer ${
              activeScreen === 'simulation'
                ? 'text-[#1E6FB8] underline underline-offset-4'
                : ''
            }`}
          >
            Simulasi
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('single');
              setActiveScreen('quiz');
            }}
            className={`hover:text-[#1E6FB8] transition-colors whitespace-nowrap cursor-pointer ${
              activeScreen === 'quiz' || activeScreen === 'quiz-result'
                ? 'text-[#1E6FB8] underline underline-offset-4'
                : ''
            }`}
          >
            Kuis & Skor
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('single');
              setActiveScreen('skill-map');
            }}
            className={`hover:text-[#1E6FB8] transition-colors whitespace-nowrap cursor-pointer ${
              activeScreen === 'skill-map' ||
              activeScreen === 'progress' ||
              activeScreen === 'profile-settings'
                ? 'text-[#1E6FB8] underline underline-offset-4'
                : ''
            }`}
          >
            Peta & Progres
          </button>
        </nav>

        {/* Zone 3: Primary View Switcher Action */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F4FAFE] p-1 rounded-xl border border-[#89CFF0]/50">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-[#1E6FB8] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Layar HP (360px)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-[#1E6FB8] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#1E293B]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Semua 11 Layar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Screen Quick-Selector Strip (visible on small screens when in single mode) */}
      {viewMode === 'single' && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {SCREEN_META.map((scr) => {
            const isActive = scr.id === activeScreen;
            return (
              <button
                key={scr.id}
                type="button"
                onClick={() => setActiveScreen(scr.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1E6FB8] text-white'
                    : 'bg-[#F4FAFE] text-slate-600 border border-slate-200/70'
                }`}
              >
                {scr.num}. {scr.title}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Workspace */}
      {viewMode === 'single' ? (
        <main className="flex-1 max-w-[1380px] w-full mx-auto px-0 sm:px-6 py-0 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Desktop): 11-Screen Interactive Index */}
          <aside className="hidden lg:block lg:col-span-4 bg-white rounded-3xl p-5 border border-[#89CFF0]/50 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <SemestaAtomLogo size={36} />
                <div>
                  <h2 className="text-sm font-extrabold text-[#1E293B]">
                    Daftar 11 Layar Aplikasi
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pilih layar atau gunakan tombol di dalam HP
                  </p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#1E6FB8] tabular-nums">
                {currentMeta.num}/11
              </span>
            </div>

            <div className="space-y-1.5">
              {SCREEN_META.map((item) => {
                const isSelected = item.id === activeScreen;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveScreen(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E6FB8] text-white shadow-xs'
                        : 'hover:bg-[#F4FAFE] text-[#1E293B]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 tabular-nums ${
                          isSelected
                            ? 'bg-[#FFC53D] text-[#1E293B]'
                            : 'bg-[#89CFF0]/25 text-[#1E6FB8]'
                        }`}
                      >
                        {item.num}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-extrabold truncate">
                          {item.title}
                        </div>
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-sky-100' : 'text-slate-500'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-[#FFC53D]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Center Column: Android 360px Mobile Device Viewport */}
          <section
            aria-label="Layar Aplikasi Mobile Semesta 360px"
            className="lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="w-full sm:w-[372px] bg-slate-900 sm:p-2.5 sm:rounded-[40px] sm:shadow-2xl sm:border-4 sm:border-slate-800">
              {/* Android Status Bar on Desktop Frame */}
              <div className="hidden sm:flex items-center justify-between px-5 py-1.5 bg-[#1E6FB8] text-white rounded-t-[30px] text-[11px] font-bold tabular-nums">
                <span>09:41</span>
                <div className="w-16 h-3 bg-slate-950/35 rounded-full" />
                <span className="flex items-center gap-1">100% <BatteryFull className="w-3.5 h-3.5" /></span>
              </div>

              {/* 360px Inner Mobile Screen Container */}
              <div className="w-full sm:w-[352px] mx-auto bg-[#F4FAFE] sm:rounded-b-[30px] overflow-hidden min-h-[680px]">
                {renderScreenById(activeScreen)}
              </div>
            </div>
          </section>

          {/* Right Column (Desktop): Active Screen Context & Quick Step Controls */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col gap-4">
            {/* Screen Stepper Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#89CFF0]/50 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-extrabold text-[#1E6FB8]">
                  Layar Aktif · {currentMeta.num} dari 11
                </span>
                <h2 className="text-xl font-extrabold text-[#1E293B] mt-0.5">
                  {currentMeta.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentMeta.subtitle}. Seluruh tombol, penggeser, dan tab di dalam layar ponsel dapat diklik secara langsung.
                </p>
              </div>

              {/* Prev / Next Screen Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  disabled={currentMetaIndex <= 0}
                  onClick={() => {
                    if (currentMetaIndex > 0) {
                      setActiveScreen(SCREEN_META[currentMetaIndex - 1].id);
                    }
                  }}
                  className="min-h-[44px] px-3 rounded-2xl bg-[#F4FAFE] hover:bg-[#89CFF0]/25 disabled:opacity-40 text-[#1E6FB8] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Layar Sebelumnya</span>
                </button>

                <button
                  type="button"
                  disabled={currentMetaIndex >= SCREEN_META.length - 1}
                  onClick={() => {
                    if (currentMetaIndex < SCREEN_META.length - 1) {
                      setActiveScreen(SCREEN_META[currentMetaIndex + 1].id);
                    }
                  }}
                  className="min-h-[44px] px-3 rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] disabled:opacity-40 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Layar Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Family Member Quick Switcher */}
            <div className="bg-white rounded-3xl p-5 border border-[#89CFF0]/50 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#1E293B]">
                  Profil Keluarga Saat Ini
                </h3>
                <span className="text-xs font-bold text-[#1E6FB8]">
                  Mode {uiMode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {profiles.slice(0, 4).map((prof) => {
                  const isCurrent = prof.id === activeProfile.id;
                  return (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => {
                        setActiveProfile(prof);
                        setUiMode(prof.uiMode);
                      }}
                      className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#89CFF0]/20 border-[#1E6FB8]'
                          : 'bg-[#F4FAFE] border-transparent hover:border-[#89CFF0]'
                      }`}
                    >
                      <ProfileAvatar avatarKey={prof.avatarKey} size={36} />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold truncate">
                          {prof.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500 fill-amber-400" /> {prof.streakDays} hari
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design System Summary Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#89CFF0]/50 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#1E6FB8]">
                <Sparkles className="w-4 h-4 text-[#FFC53D] fill-[#FFC53D]" />
                <span>Sistem Desain Semesta (Tema Biru Muda)</span>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                <div className="space-y-1">
                  <div className="h-8 rounded-xl bg-[#89CFF0] border border-slate-200" />
                  <span className="block font-mono-num">#89CFF0</span>
                </div>
                <div className="space-y-1">
                  <div className="h-8 rounded-xl bg-[#1E6FB8]" />
                  <span className="block font-mono-num">#1E6FB8</span>
                </div>
                <div className="space-y-1">
                  <div className="h-8 rounded-xl bg-[#FFC53D]" />
                  <span className="block font-mono-num">#FFC53D</span>
                </div>
                <div className="space-y-1">
                  <div className="h-8 rounded-xl bg-[#22C55E]" />
                  <span className="block font-mono-num">#22C55E</span>
                </div>
                <div className="space-y-1">
                  <div className="h-8 rounded-xl bg-[#F4FAFE] border border-slate-300" />
                  <span className="block font-mono-num">#F4FAFE</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <span>Tipografi: Plus Jakarta Sans · Sudut membulat 16–24px</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                  <span>Ilustrasi vektor datar buku cerita anak Indonesia</span>
                </div>
              </div>
            </div>
          </aside>
        </main>
      ) : (
        /* GALLERY VIEW: All 11 Screens Displayed Simultaneously at 360px Width */
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-[#89CFF0]/50 shadow-2xs">
            <div>
              <h1 className="text-xl font-extrabold text-[#1E293B]">
                Galeri Lengkap 11 Layar Aplikasi &ldquo;Semesta&rdquo;
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Seluruh 11 layar di bawah ini bersifat interaktif penuh. Klik tombol &ldquo;Fokus Layar&rdquo; pada kartu mana saja untuk membuka mode tampilan tunggal.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className="min-h-[44px] px-4 rounded-2xl bg-[#1E6FB8] text-white text-xs font-extrabold self-start sm:self-auto cursor-pointer"
            >
              Kembali ke Mode HP Tunggal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {SCREEN_META.map((scr) => (
              <div key={scr.id} className="flex flex-col items-center w-[360px]">
                {/* Screen Label Header */}
                <div className="w-full flex items-center justify-between mb-2.5 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#1E6FB8] text-white text-xs font-extrabold flex items-center justify-center tabular-nums">
                      {scr.num}
                    </span>
                    <div>
                      <h2 className="text-sm font-extrabold text-[#1E293B]">
                        {scr.title}
                      </h2>
                      <p className="text-[11px] text-slate-500">{scr.subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveScreen(scr.id);
                      setViewMode('single');
                    }}
                    className="px-2.5 py-1 rounded-xl bg-white border border-[#89CFF0] text-[#1E6FB8] text-[11px] font-extrabold hover:bg-[#89CFF0]/20 cursor-pointer"
                  >
                    Fokus Layar
                  </button>
                </div>

                {/* 360px Phone Frame */}
                <div className="w-[360px] rounded-[34px] bg-white border-4 border-slate-800 shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-1 bg-[#1E6FB8] text-white text-[10px] font-bold tabular-nums">
                    <span>09:41</span>
                    <span>Semesta · Layar {scr.num}</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full min-h-[680px] max-h-[720px] overflow-y-auto">
                    {renderScreenById(scr.id)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
