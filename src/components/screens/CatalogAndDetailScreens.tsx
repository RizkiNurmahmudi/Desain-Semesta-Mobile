import React, { useState, useEffect } from 'react';
import {
  Search,
  Play,
  ArrowLeft,
  BookOpen,
  Sliders,
  Factory,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  X,
  NotebookPen,
  Plus,
  Trash2,
  Pencil,
  Check,
  Bookmark,
  Flame,
} from 'lucide-react';
import { ConceptItem, FamilyProfile, ScreenId } from '../../types';
import { CONCEPTS_LIST, LEVEL_DESCRIPTIONS } from '../../data/semestaData';
import { ConceptVectorIcon, ProfileAvatar } from '../Illustrations';
import { BottomNav } from '../BottomNav';

export interface SavedConceptNote {
  id: string;
  conceptId: string;
  level: 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  tag: 'Inti Cerita' | 'Rumus Penting' | 'Ide Eksperimen';
  content: string;
  updatedAt: string;
}

const NOTES_STORAGE_KEY = 'semesta_catatan_saya_v1';

const DEFAULT_INITIAL_NOTES: SavedConceptNote[] = [
  {
    id: 'catatan-awal-1',
    conceptId: 'gerak-parabola',
    level: 'L2',
    tag: 'Rumus Penting',
    content:
      'Sudut 45° menghasilkan jangkauan mendatar paling jauh (40,8 m saat kecepatan awal 20 m/s). Di titik puncak tertinggi, kecepatan vertikal (vy) bernilai 0 m/s.',
    updatedAt: 'Tersimpan otomatis',
  },
];

// SVG Progress Ring helper for concept cards
const ProgressRing: React.FC<{ percent: number; size?: number }> = ({
  percent,
  size = 38,
}) => {
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const strokeColor =
    percent === 100
      ? '#22C55E'
      : percent >= 50
      ? '#1E6FB8'
      : percent > 0
      ? '#F59E0B'
      : '#CBD5E1';

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-extrabold text-[#1E293B] tabular-nums">
        {percent}%
      </span>
    </div>
  );
};

interface HomeCatalogScreenProps {
  activeProfile: FamilyProfile;
  onNavigate: (screen: ScreenId) => void;
  onSelectConcept: (concept: ConceptItem) => void;
  darkMode?: boolean;
}

export const HomeCatalogScreen: React.FC<HomeCatalogScreenProps> = ({
  activeProfile,
  onNavigate,
  onSelectConcept,
  darkMode = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  const filterChips = ['Semua', 'Fisika', 'Matematika', 'L0', 'L1', 'L2', 'L3'];

  const filteredConcepts = CONCEPTS_LIST.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Fisika' || activeFilter === 'Matematika') {
      return item.category === activeFilter;
    }
    return item.level === activeFilter;
  });

  return (
    <div
      className={`min-h-[680px] h-full flex flex-col justify-between ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F4FAFE] text-[#1E293B]'
      }`}
    >
      <div className="px-4 pt-5 pb-6 space-y-4 flex-1">
        {/* Top Greeting Bar */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onNavigate('profile-picker')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            title="Ganti profil belajar"
          >
            <ProfileAvatar avatarKey={activeProfile.avatarKey} size={44} />
            <div>
              <h1 className="text-lg font-extrabold tracking-tight leading-tight group-hover:text-[#1E6FB8] transition-colors">
                Halo, {activeProfile.name}!
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {activeProfile.roleLabel}
              </p>
            </div>
          </button>

          {/* Streak Flame Badge */}
          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className="min-h-[40px] px-3 py-1.5 rounded-2xl bg-[#FFC53D]/25 border border-[#FFC53D] text-[#1E293B] font-extrabold text-xs flex items-center gap-1.5 shadow-2xs active:scale-95 transition-transform cursor-pointer tabular-nums"
          >
            <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> {activeProfile.streakDays} hari</span>
          </button>
        </div>

        {/* Search Bar "Cari konsep..." */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari konsep..."
            aria-label="Cari konsep fisika atau matematika"
            className={`w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-2xl text-sm font-medium border transition-colors focus:outline-none ${
              darkMode
                ? 'bg-slate-900 border-slate-800 text-slate-100 focus:border-[#89CFF0]'
                : 'bg-white border-slate-200/90 text-[#1E293B] focus:border-[#1E6FB8]'
            }`}
          />
        </div>

        {/* "Lanjutkan belajar" Hero Card */}
        <div
          className="rounded-3xl p-4 text-white shadow-md shadow-[#1E6FB8]/15 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #1E6FB8 0%, #2980B9 60%, #52B2E8 100%)',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <span className="text-[11px] font-bold text-[#FFC53D] tracking-wide">
                Lanjutkan belajar
              </span>
              <h2 className="text-lg font-extrabold tracking-tight text-white">
                Gerak Parabola · L2
              </h2>
              <p className="text-xs text-sky-100 leading-snug">
                Bagian 2: Menemukan sudut lemparan terjauh
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectConcept(CONCEPTS_LIST[0]);
                onNavigate('concept-detail');
              }}
              aria-label="Putar pelajaran Gerak Parabola"
              className="w-12 h-12 rounded-2xl bg-[#FFC53D] hover:bg-[#fbbf24] text-[#1E293B] flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-[#1E293B] ml-0.5" />
            </button>
          </div>

          {/* 60% Progress Bar */}
          <div className="mt-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-sky-100 tabular-nums">
              <span>Progres Bab</span>
              <span>60%</span>
            </div>
            <div className="w-full h-2.5 bg-white/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFC53D] rounded-full transition-all duration-300"
                style={{ width: '60%' }}
              />
            </div>
          </div>
        </div>

        {/* Filter Chips (Semua, Fisika, Matematika, L0, L1, L2, L3) */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5"
          role="tablist"
          aria-label="Filter konsep"
        >
          {filterChips.map((chip) => {
            const active = activeFilter === chip;
            return (
              <button
                key={chip}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveFilter(chip)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1E6FB8] text-white shadow-xs'
                    : darkMode
                    ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-[#89CFF0]'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:border-[#89CFF0]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Concept Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-extrabold">Jelajahi Konsep</h2>
            <span className="text-xs text-slate-500 font-medium tabular-nums">
              {filteredConcepts.length} materi
            </span>
          </div>

          {filteredConcepts.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-center border border-slate-200/70">
              <p className="text-sm font-bold text-slate-700">
                Konsep tidak ditemukan
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Coba kata kunci lain atau pilih filter &ldquo;Semua&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredConcepts.map((concept) => (
                <button
                  key={concept.id}
                  type="button"
                  onClick={() => {
                    onSelectConcept(concept);
                    onNavigate('concept-detail');
                  }}
                  className={`text-left p-3.5 rounded-3xl transition-all duration-150 active:scale-[0.98] flex flex-col justify-between cursor-pointer ${
                    darkMode
                      ? 'bg-slate-900 border border-slate-800 hover:border-[#89CFF0]'
                      : 'bg-white border border-slate-200/80 hover:border-[#89CFF0] shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Top row: Icon + Progress Ring */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <ConceptVectorIcon iconKey={concept.iconKey} size={42} />
                      <ProgressRing percent={concept.progress} size={38} />
                    </div>

                    {/* Category & Level metadata */}
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1E6FB8]">
                      <span>{concept.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.level}</span>
                    </div>

                    {/* Concept Title */}
                    <h3 className="text-sm font-extrabold leading-snug mt-0.5 line-clamp-1">
                      {concept.title}
                    </h3>
                  </div>

                  {/* Content Type Badges (cerita, simulasi, studi kasus) */}
                  <div className="flex flex-wrap items-center gap-1 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {concept.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                          badge === 'cerita'
                            ? 'bg-[#89CFF0]/25 text-[#1E6FB8]'
                            : badge === 'simulasi'
                            ? 'bg-[#FFC53D]/30 text-amber-900'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeScreen="home" onNavigate={onNavigate} darkMode={darkMode} />
    </div>
  );
};

interface ConceptDetailScreenProps {
  concept: ConceptItem;
  onNavigate: (screen: ScreenId) => void;
}

export const ConceptDetailScreen: React.FC<ConceptDetailScreenProps> = ({
  concept,
  onNavigate,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<
    'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
  >('L2');
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);

  // State for "Catatan Saya" persisted in LocalStorage
  const [notes, setNotes] = useState<SavedConceptNote[]>(() => {
    try {
      const raw = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback if localStorage is unavailable
    }
    return DEFAULT_INITIAL_NOTES;
  });

  const [noteInput, setNoteInput] = useState('');
  const [selectedTag, setSelectedTag] = useState<
    'Inti Cerita' | 'Rumus Penting' | 'Ide Eksperimen'
  >('Rumus Penting');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  // Sync notes to LocalStorage whenever `notes` changes
  useEffect(() => {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Ignore storage quota errors
    }
  }, [notes]);

  const conceptNotes = notes.filter((n) => n.conceptId === concept.id);

  const triggerFeedback = (msg: string) => {
    setSaveFeedback(msg);
    setTimeout(() => {
      setSaveFeedback(null);
    }, 2500);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = noteInput.trim();
    if (!trimmed) return;

    const nowTime = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (editingNoteId) {
      setNotes((prev) =>
        prev.map((item) =>
          item.id === editingNoteId
            ? {
                ...item,
                content: trimmed,
                tag: selectedTag,
                level: selectedLevel,
                updatedAt: `Diperbarui ${nowTime}`,
              }
            : item
        )
      );
      setEditingNoteId(null);
      triggerFeedback('Catatan berhasil diperbarui di LocalStorage');
    } else {
      const newNote: SavedConceptNote = {
        id: `catatan-${Date.now()}`,
        conceptId: concept.id,
        level: selectedLevel,
        tag: selectedTag,
        content: trimmed,
        updatedAt: `Hari ini · ${nowTime}`,
      };
      setNotes((prev) => [newNote, ...prev]);
      triggerFeedback('Catatan disimpan ke LocalStorage');
    }

    setNoteInput('');
  };

  const handleStartEdit = (note: SavedConceptNote) => {
    setEditingNoteId(note.id);
    setNoteInput(note.content);
    setSelectedTag(note.tag);
    setSelectedLevel(note.level);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((item) => item.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null);
      setNoteInput('');
    }
    triggerFeedback('Catatan dihapus');
  };

  const quickTemplates = [
    'Sudut 45° menghasilkan jarak lemparan paling jauh.',
    'Rumus Jangkauan: R = (v₀² · sin 2θ) / g.',
    'Sudut 30° dan 60° memiliki titik jatuh yang sama jauh.',
  ];

  const levels: ('L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5')[] = [
    'L0',
    'L1',
    'L2',
    'L3',
    'L4',
    'L5',
  ];

  const levelInfo = LEVEL_DESCRIPTIONS[selectedLevel];

  const lessonBlocks = [
    {
      id: 'cerita',
      title: 'Cerita bergambar',
      subtitle: 'Lengkungan Pelangi untuk Mangga Manis · 6 panel',
      statusText: 'Selesai sebagian',
      badgeColor: 'bg-[#89CFF0]/25 text-[#1E6FB8]',
      icon: BookOpen,
      onClick: () => onNavigate('story'),
    },
    {
      id: 'simulasi',
      title: 'Simulasi interaktif',
      subtitle: 'Uji sudut lemparan 45° & kecepatan awal 20 m/s',
      statusText: 'Siap dicoba',
      badgeColor: 'bg-[#FFC53D]/35 text-amber-900',
      icon: Sliders,
      onClick: () => onNavigate('simulation'),
    },
    {
      id: 'studi-kasus',
      title: 'Studi kasus industri',
      subtitle: 'Air Mancur Menari & Peluncuran Roket LAPAN',
      statusText: 'Wawasan nyata',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: Factory,
      onClick: () => setShowCaseStudyModal(true),
    },
    {
      id: 'kuis',
      title: 'Latihan & Kuis',
      subtitle: '5 soal pemahaman konsep · Hadiah +24 XP',
      statusText: 'Soal 2/5',
      badgeColor: 'bg-sky-100 text-[#1E6FB8]',
      icon: HelpCircle,
      onClick: () => onNavigate('quiz'),
    },
  ];

  return (
    <div className="min-h-[680px] h-full flex flex-col justify-between bg-[#F4FAFE] text-[#1E293B] relative">
      {/* Top App Bar */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-slate-200/70 sticky top-0 z-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="min-w-[44px] min-h-[44px] -ml-1 rounded-2xl flex items-center justify-center text-[#1E293B] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          aria-label="Kembali ke Katalog"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold text-[#1E6FB8]">
            {concept.category} · Bab Utama
          </span>
          <h1 className="text-base font-extrabold text-[#1E293B] leading-tight">
            {concept.title}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('skill-map')}
          className="min-w-[44px] min-h-[44px] rounded-2xl flex items-center justify-center text-[#1E6FB8] text-xs font-bold hover:bg-[#89CFF0]/20 cursor-pointer"
        >
          Peta
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-4 flex-1">
        {/* Concept Hero Summary Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#89CFF0]/50 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <ConceptVectorIcon iconKey={concept.iconKey} size={54} />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E6FB8]">
                <span>Penguasaan saat ini: {concept.progress}%</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600">{levelInfo.duration}</span>
              </div>
              <h2 className="text-lg font-extrabold text-[#1E293B] mt-0.5">
                {concept.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                {concept.summary}
              </p>
            </div>
          </div>

          {/* Level Selector Pills L0–L5 */}
          <div className="mt-4 pt-3.5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-700">
                Pilih Kedalaman Materi:
              </span>
              <span className="font-semibold text-[#1E6FB8]">
                {levelInfo.ageTarget}
              </span>
            </div>

            <div
              className="grid grid-cols-6 gap-1.5 bg-[#F4FAFE] p-1.5 rounded-2xl border border-slate-200/70"
              role="tablist"
              aria-label="Tingkat kesulitan L0 sampai L5"
            >
              {levels.map((lvl) => {
                const isSelected = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`min-h-[40px] rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E6FB8] text-white shadow-xs scale-[1.02]'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Level Explanation */}
            <div className="mt-2.5 px-3 py-2 rounded-2xl bg-[#89CFF0]/15 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#1E6FB8] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-extrabold text-[#1E6FB8]">
                  {selectedLevel} — {levelInfo.name}:{' '}
                </span>
                <span className="text-slate-700">{levelInfo.desc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Block List */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-extrabold text-slate-500 px-1">
            Tahapan Belajar ({selectedLevel})
          </h3>

          {lessonBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <button
                key={block.id}
                type="button"
                onClick={block.onClick}
                className="w-full text-left bg-white hover:border-[#1E6FB8] border border-slate-200/80 rounded-3xl p-3.5 flex items-center gap-3.5 shadow-2xs active:scale-[0.99] transition-all cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${block.badgeColor}`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                    <span>Bagian 0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1E6FB8]">{block.statusText}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#1E293B] truncate">
                    {block.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {block.subtitle}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-[#F4FAFE] flex items-center justify-center text-[#1E6FB8] shrink-0">
                  {index === 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ================================================================ */}
        {/* FITUR "CATATAN SAYA" (LOCALSTORAGE)                              */}
        {/* ================================================================ */}
        <section
          aria-label="Catatan Saya"
          className="bg-white rounded-3xl p-4 border-2 border-[#89CFF0]/70 shadow-2xs space-y-3.5"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC53D]/30 text-[#1E293B] flex items-center justify-center shrink-0">
                <NotebookPen className="w-5 h-5 text-[#1E6FB8] stroke-[2.3]" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1E293B]">
                  Catatan Saya
                </h3>
                <p className="text-[11px] text-slate-500">
                  Simpan ringkasan pribadi & poin penting ({conceptNotes.length}{' '}
                  tersimpan)
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-[#1E6FB8] bg-[#89CFF0]/20 px-2.5 py-1 rounded-xl whitespace-nowrap">
              Tersimpan Lokal
            </span>
          </div>

          {/* Save / Delete Toast Feedback */}
          {saveFeedback && (
            <div className="px-3 py-2 rounded-2xl bg-emerald-50 border border-[#22C55E]/40 text-emerald-900 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>{saveFeedback}</span>
            </div>
          )}

          {/* Note Input Form */}
          <form onSubmit={handleSaveNote} className="space-y-2.5">
            {/* Note Category Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(
                ['Rumus Penting', 'Inti Cerita', 'Ide Eksperimen'] as const
              ).map((tagOption) => {
                const isSelected = selectedTag === tagOption;
                return (
                  <button
                    key={tagOption}
                    type="button"
                    onClick={() => setSelectedTag(tagOption)}
                    className={`min-h-[34px] px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E6FB8] text-white'
                        : 'bg-[#F4FAFE] text-slate-600 border border-slate-200/80 hover:border-[#89CFF0]'
                    }`}
                  >
                    {tagOption}
                  </button>
                );
              })}
            </div>

            {/* Textarea for personal summary */}
            <div>
              <textarea
                rows={3}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder={`Tulis ringkasan pribadi atau poin penting materi ${concept.title} (${selectedLevel})...`}
                aria-label="Isi catatan pribadi"
                className="w-full p-3 rounded-2xl bg-[#F4FAFE] border border-slate-200/90 text-xs text-[#1E293B] placeholder:text-slate-400 focus:bg-white focus:border-[#1E6FB8] focus:outline-none leading-relaxed resize-none"
              />
            </div>

            {/* Quick Insert Poin Penting Chips */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 block">
                Tambahkan cepat poin penting:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickTemplates.map((tpl) => (
                  <button
                    key={tpl}
                    type="button"
                    onClick={() =>
                      setNoteInput((prev) =>
                        prev ? `${prev} ${tpl}` : tpl
                      )
                    }
                    className="text-left text-[10px] font-semibold px-2.5 py-1 rounded-xl bg-[#89CFF0]/15 hover:bg-[#89CFF0]/30 text-[#1E6FB8] transition-colors cursor-pointer"
                  >
                    + {tpl}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit / Cancel Edit Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {editingNoteId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingNoteId(null);
                    setNoteInput('');
                  }}
                  className="min-h-[44px] px-3.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Batal Ubah
                </button>
              )}
              <button
                type="submit"
                disabled={!noteInput.trim()}
                className="flex-1 min-h-[44px] rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] disabled:opacity-45 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {editingNoteId ? 'Perbarui Catatan' : 'Simpan ke Catatan Saya'}
                </span>
              </button>
            </div>
          </form>

          {/* Saved Notes List */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            {conceptNotes.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#F4FAFE] text-center">
                <p className="text-xs font-bold text-slate-600">
                  Belum ada catatan untuk {concept.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tulis poin penting di atas agar mudah diingat saat mengulang materi bersama keluarga.
                </p>
              </div>
            ) : (
              conceptNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3.5 rounded-2xl bg-[#F4FAFE] border border-[#89CFF0]/45 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                      <Bookmark className="w-3.5 h-3.5 text-[#1E6FB8] fill-[#89CFF0]" />
                      <span className="text-[#1E6FB8]">{note.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700">{note.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400 font-medium">
                        {note.updatedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(note)}
                        aria-label="Ubah catatan"
                        className="w-8 h-8 rounded-xl bg-white hover:bg-[#89CFF0]/25 text-[#1E6FB8] flex items-center justify-center border border-slate-200/70 cursor-pointer"
                        title="Ubah catatan"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        aria-label="Hapus catatan"
                        className="w-8 h-8 rounded-xl bg-white hover:bg-rose-50 text-rose-600 flex items-center justify-center border border-slate-200/70 cursor-pointer"
                        title="Hapus catatan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#1E293B] leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Bottom Sticky CTA "Mulai pelajaran" */}
      <div className="p-4 bg-white border-t border-slate-200/70 sticky bottom-0 z-20">
        <button
          type="button"
          onClick={() => onNavigate('story')}
          className="w-full min-h-[52px] rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-[#1E6FB8]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Mulai pelajaran</span>
        </button>
      </div>

      {/* Studi Kasus Industri Modal */}
      {showCaseStudyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-[350px] bg-white rounded-3xl p-5 shadow-2xl border border-[#89CFF0]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl">
                Studi Kasus Industri Nusantara
              </span>
              <button
                type="button"
                onClick={() => setShowCaseStudyModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"
                aria-label="Tutup studi kasus"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="text-base font-extrabold text-[#1E293B]">
              Air Mancur Menari & Roket Uji LAPAN
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              Insinyur tata air di Taman Monas dan teknisi dirgantara BRIN/LAPAN
              menggunakan rumus{' '}
              <strong className="text-[#1E6FB8]">Gerak Parabola</strong> untuk
              mengatur sudut nosel air serta lintasan roket sonde atmosfer.
            </p>
            <div className="mt-3 p-3 rounded-2xl bg-[#F4FAFE] border border-[#89CFF0]/40 text-xs space-y-1.5">
              <div className="font-bold text-[#1E6FB8]">Fakta Rekayasa:</div>
              <p className="text-slate-700">
                Dengan mengatur tekanan pompa (kecepatan awal v₀) dan kemiringan
                pipa 45°, semburan air dapat melompati kolam selebar 40 meter
                dengan presisi tinggi!
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setShowCaseStudyModal(false)}
                className="flex-1 min-h-[44px] rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCaseStudyModal(false);
                  onNavigate('simulation');
                }}
                className="flex-1 min-h-[44px] rounded-xl bg-[#1E6FB8] text-white text-xs font-bold"
              >
                Coba di Simulasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
