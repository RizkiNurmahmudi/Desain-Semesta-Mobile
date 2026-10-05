import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  FileDown,
  Sun,
  Moon,
  ArrowRight,
  Users,
  Check,
  Flame,
  Star,
} from 'lucide-react';
import { FamilyProfile, ScreenId, SkillNode, UIMode } from '../../types';
import {
  SKILL_NODES,
  SKILL_EDGES,
  MASTERY_BARS,
  BADGE_SHELF,
  OFFLINE_PACKAGES,
} from '../../data/semestaData';
import { BadgeVectorIcon, ProfileAvatar } from '../Illustrations';
import { BottomNav } from '../BottomNav';

// ============================================================================
// SCREEN 9: PETA KETERAMPILAN (SKILL MAP)
// ============================================================================
interface SkillMapScreenProps {
  onNavigate: (screen: ScreenId) => void;
  darkMode?: boolean;
}

export const SkillMapScreen: React.FC<SkillMapScreenProps> = ({
  onNavigate,
  darkMode = false,
}) => {
  const [selectedNode, setSelectedNode] = useState<SkillNode>(
    SKILL_NODES.find((n) => n.id === 'gerak-parabola') || SKILL_NODES[4]
  );
  const [zoom, setZoom] = useState<number>(1);

  const getStatusStyle = (status: SkillNode['status']) => {
    switch (status) {
      case 'dikuasai':
        return {
          fill: '#22C55E',
          stroke: '#15803D',
          textColor: '#FFFFFF',
          label: 'Dikuasai',
          badgeClass: 'bg-emerald-100 text-emerald-800',
        };
      case 'dipelajari':
        return {
          fill: '#89CFF0',
          stroke: '#1E6FB8',
          textColor: '#1E293B',
          label: 'Sedang dipelajari',
          badgeClass: 'bg-[#89CFF0]/35 text-[#1E6FB8]',
        };
      case 'ulangi':
        return {
          fill: '#FFC53D',
          stroke: '#D97706',
          textColor: '#1E293B',
          label: 'Perlu diulang',
          badgeClass: 'bg-amber-100 text-amber-900',
        };
      default:
        return {
          fill: '#E2E8F0',
          stroke: '#64748B',
          textColor: '#334155',
          label: 'Tersedia',
          badgeClass: 'bg-slate-200 text-slate-700',
        };
    }
  };

  return (
    <div
      className={`min-h-[680px] h-full flex flex-col justify-between ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F4FAFE] text-[#1E293B]'
      }`}
    >
      {/* Top Header & Legend */}
      <div
        className={`px-4 pt-4 pb-3 border-b ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/70'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold tracking-tight">
              Peta Keterampilan
            </h1>
            <p className="text-xs text-slate-500">
              Ketuk simpul konsep untuk melihat jalur prasyarat belajar
            </p>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-[#F4FAFE] dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.8, Number((z - 0.15).toFixed(2))))}
              aria-label="Perkecil peta"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#1E6FB8] hover:bg-white cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              aria-label="Atur ulang ukuran peta"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 hover:bg-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.3, Number((z + 0.15).toFixed(2))))}
              aria-label="Perbesar peta"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#1E6FB8] hover:bg-white cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Color Legend */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-[11px] font-bold">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            <span>Dikuasai</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#89CFF0] border border-[#1E6FB8]" />
            <span>Sedang dipelajari</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC53D] border border-amber-600" />
            <span>Perlu diulang</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-500" />
            <span>Tersedia</span>
          </span>
        </div>
      </div>

      {/* Interactive Zoomable Node Graph Canvas */}
      <div className="relative flex-1 overflow-auto bg-[#EBF6FD] dark:bg-slate-900 flex items-center justify-center p-2">
        <div
          className="transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg
            width="335"
            height="495"
            viewBox="0 0 335 495"
            className="select-none"
            role="img"
            aria-label="Grafik prasyarat konsep fisika dan matematika"
          >
            {/* Prerequisite Lines (Edges) */}
            {SKILL_EDGES.map((edge) => {
              const fromNode = SKILL_NODES.find((n) => n.id === edge.from);
              const toNode = SKILL_NODES.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted =
                selectedNode.id === fromNode.id || selectedNode.id === toNode.id;

              return (
                <g key={`${edge.from}-${edge.to}`}>
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? '#1E6FB8' : '#94A3B8'}
                    strokeWidth={isHighlighted ? 3.5 : 2.2}
                    strokeDasharray={toNode.status === 'tersedia' ? '5 5' : undefined}
                  />
                </g>
              );
            })}

            {/* Concept Nodes */}
            {SKILL_NODES.map((node) => {
              const st = getStatusStyle(node.status);
              const isSelected = selectedNode.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer"
                >
                  {/* Selection pulse ring */}
                  {isSelected && (
                    <circle
                      r="39"
                      fill="none"
                      stroke="#1E6FB8"
                      strokeWidth="3"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r="31"
                    fill={st.fill}
                    stroke={isSelected ? '#1E6FB8' : st.stroke}
                    strokeWidth={isSelected ? '3.5' : '2.5'}
                  />

                  {/* Level Pill inside Node */}
                  <text
                    y="-6"
                    textAnchor="middle"
                    fill={st.textColor}
                    fontSize="10"
                    fontWeight="800"
                  >
                    {node.level} · {node.progress}%
                  </text>

                  {/* Short Node Name inside or below */}
                  <rect
                    x="-54"
                    y="16"
                    width="108"
                    height="22"
                    rx="8"
                    fill="#FFFFFF"
                    stroke={isSelected ? '#1E6FB8' : '#CBD5E1'}
                    strokeWidth="1.5"
                  />
                  <text
                    y="30"
                    textAnchor="middle"
                    fill="#1E293B"
                    fontSize="9.5"
                    fontWeight="800"
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bottom Sheet showing Selected Concept Info */}
      <div
        className={`rounded-t-3xl p-4 border-t shadow-lg transition-colors ${
          darkMode
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-[#89CFF0]/60 text-[#1E293B]'
        }`}
      >
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-3" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${
                  getStatusStyle(selectedNode.status).badgeClass
                }`}
              >
                {getStatusStyle(selectedNode.status).label}
              </span>
              <span className="text-xs font-bold text-[#1E6FB8]">
                {selectedNode.category} · {selectedNode.level}
              </span>
            </div>

            <h2 className="text-base font-extrabold mt-1">{selectedNode.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
              {selectedNode.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('concept-detail')}
            className="min-h-[44px] px-3.5 rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
          >
            <span>Buka</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {selectedNode.prerequisites.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            <strong className="text-slate-700 dark:text-slate-300">Prasyarat: </strong>
            {selectedNode.prerequisites.join(' · ')}
          </div>
        )}
      </div>

      <BottomNav activeScreen="skill-map" onNavigate={onNavigate} darkMode={darkMode} />
    </div>
  );
};

// ============================================================================
// SCREEN 10: PROGRESS DASHBOARD
// ============================================================================
interface ProgressDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  darkMode?: boolean;
}

export const ProgressDashboardScreen: React.FC<ProgressDashboardScreenProps> = ({
  onNavigate,
  darkMode = false,
}) => {
  const [selectedBadgeId, setSelectedBadgeId] = useState<string>('penjelajah-parabola');
  const activeBadge =
    BADGE_SHELF.find((b) => b.id === selectedBadgeId) || BADGE_SHELF[0];

  return (
    <div
      className={`min-h-[680px] h-full flex flex-col justify-between ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F4FAFE] text-[#1E293B]'
      }`}
    >
      <div className="px-4 pt-5 pb-6 space-y-4 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Progres Belajar
            </h1>
            <p className="text-xs text-slate-500">
              Ringkasan capaian konsep dan ketekunan harian
            </p>
          </div>
          {/* Level Badge */}
          <span className="px-3 py-1.5 rounded-2xl bg-[#1E6FB8] text-white text-xs font-extrabold shadow-2xs">
            Level 7 · Penjelajah
          </span>
        </div>

        {/* Streak Flame "🔥 12 hari" & "⭐ 1.240 XP" */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-3xl border flex items-center gap-3 ${
              darkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-[#FFC53D] shadow-2xs'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFC53D]/30 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-amber-600 fill-amber-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 block">
                Rentetan Belajar
              </span>
              <span className="text-lg font-extrabold tabular-nums flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-400" /> 12 hari
              </span>
            </div>
          </div>

          <div
            className={`p-4 rounded-3xl border flex items-center gap-3 ${
              darkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-[#89CFF0] shadow-2xs'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#89CFF0]/30 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#1E6FB8] fill-[#FFC53D]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 block">
                Total Pengalaman
              </span>
              <span className="text-lg font-extrabold text-[#1E6FB8] tabular-nums flex items-center gap-1.5">
                <Star className="w-5 h-5 text-[#1E6FB8] fill-[#FFC53D]" /> 1.240 XP
              </span>
            </div>
          </div>
        </div>

        {/* Amber "Perlu diulang: Persen" Warning Card */}
        <div className="rounded-3xl p-4 bg-[#FFFBEB] border-2 border-[#F59E0B] text-[#1E293B] flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC53D] flex items-center justify-center text-amber-950 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-amber-950">
                Perlu diulang: Persen
              </h2>
              <p className="text-xs text-amber-900/80 leading-snug mt-0.5">
                Penguasaan konsep perbandingan perseratus turun ke 42%. Yuk segarkan ingatan 5 menit!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('quiz')}
            className="min-h-[42px] px-3 rounded-2xl bg-[#F59E0B] hover:bg-amber-600 text-white text-xs font-extrabold shrink-0 transition-colors cursor-pointer"
          >
            Ulangi
          </button>
        </div>

        {/* "Penguasaan konsep" Horizontal Bars */}
        <div
          className={`rounded-3xl p-4 border space-y-3.5 ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold">Penguasaan konsep</h2>
            <span className="text-xs font-bold text-[#1E6FB8]">5 Bab Aktif</span>
          </div>

          <div className="space-y-3">
            {MASTERY_BARS.map((item) => {
              const barColor =
                item.status === 'dikuasai'
                  ? '#22C55E'
                  : item.status === 'dipelajari'
                  ? '#1E6FB8'
                  : '#F59E0B';

              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{item.title}</span>
                    <span className="font-extrabold tabular-nums text-slate-600 dark:text-slate-300">
                      {item.percent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percent}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badge Shelf Row ("Rak Lencana") */}
        <div
          className={`rounded-3xl p-4 border ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold">Koleksi Lencana</h2>
            <span className="text-xs font-bold text-amber-600">4 Terbuka</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {BADGE_SHELF.map((badge) => {
              const isSelected = badge.id === selectedBadgeId;
              return (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => setSelectedBadgeId(badge.id)}
                  className={`p-2 rounded-2xl flex flex-col items-center text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#89CFF0]/25 ring-2 ring-[#1E6FB8]'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <BadgeVectorIcon iconType={badge.iconType} />
                  <span className="text-[10px] font-bold leading-tight mt-1.5 line-clamp-2">
                    {badge.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-[#FFC53D] fill-[#FFC53D] shrink-0" />
            <span>
              <strong>{activeBadge.title}:</strong> {activeBadge.desc}
            </span>
          </div>
        </div>
      </div>

      <BottomNav activeScreen="progress" onNavigate={onNavigate} darkMode={darkMode} />
    </div>
  );
};

// ============================================================================
// SCREEN 11: PROFILE & SETTINGS
// ============================================================================
interface ProfileSettingsScreenProps {
  activeProfile: FamilyProfile;
  uiMode: UIMode;
  onChangeUiMode: (mode: UIMode) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  activeProfile,
  uiMode,
  onChangeUiMode,
  darkMode,
  onToggleDarkMode,
  onNavigate,
}) => {
  const [packages, setPackages] = useState(OFFLINE_PACKAGES);
  const [exportSuccess, setExportSuccess] = useState(false);

  const togglePackageDownload = (id: string) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === id ? { ...pkg, downloaded: !pkg.downloaded } : pkg
      )
    );
  };

  const handleExportData = () => {
    const payload = {
      aplikasi: 'Semesta',
      profil: activeProfile.name,
      modeAntarmuka: uiMode,
      tanggalEkspor: new Date().toISOString(),
      xp: 1240,
      rentetanHari: 12,
      penguasaanKonsep: MASTERY_BARS,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-belajar-semesta-${activeProfile.name.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const modes: { id: UIMode; desc: string }[] = [
    { id: 'Penjelajah', desc: 'Anak 8+ · Cerita visual & panduan ramah' },
    { id: 'Pelajar', desc: 'Remaja · Simulasi & konsep seimbang' },
    { id: 'Ahli', desc: 'Dewasa · Rumus lengkap & analisis mendalam' },
  ];

  return (
    <div
      className={`min-h-[680px] h-full flex flex-col justify-between ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F4FAFE] text-[#1E293B]'
      }`}
    >
      <div className="px-4 pt-5 pb-6 space-y-4 flex-1">
        {/* Profile Header Card */}
        <div
          className={`rounded-3xl p-4 border flex items-center justify-between gap-3 ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-[#89CFF0]/60 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <ProfileAvatar avatarKey={activeProfile.avatarKey} size={60} />
            <div>
              <span className="text-[11px] font-bold text-[#1E6FB8]">
                Profil Keluarga Aktif
              </span>
              <h1 className="text-lg font-extrabold leading-tight">
                {activeProfile.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeProfile.roleLabel} · {activeProfile.ageLabel}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('profile-picker')}
            className="min-h-[42px] px-3 rounded-2xl bg-[#89CFF0]/25 hover:bg-[#89CFF0]/40 text-[#1E6FB8] text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Ganti</span>
          </button>
        </div>

        {/* UI Mode Selector: Penjelajah / Pelajar / Ahli */}
        <div
          className={`rounded-3xl p-4 border space-y-3 ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div>
            <h2 className="text-sm font-extrabold">Mode Tampilan Belajar</h2>
            <p className="text-xs text-slate-500">
              Sesuaikan gaya penjelasan materi dengan tingkat kenyamananmu
            </p>
          </div>

          <div
            className="grid grid-cols-3 gap-1.5 bg-[#F4FAFE] dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/70 dark:border-slate-700"
            role="tablist"
            aria-label="Mode tampilan"
          >
            {modes.map((m) => {
              const active = uiMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChangeUiMode(m.id)}
                  className={`min-h-[42px] rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1E6FB8] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/60'
                  }`}
                >
                  {m.id}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#1E6FB8] font-semibold bg-[#89CFF0]/15 px-3 py-2 rounded-xl">
            Mode {uiMode}: {modes.find((m) => m.id === uiMode)?.desc}
          </p>
        </div>

        {/* Theme Toggle Row */}
        <div
          className={`rounded-3xl p-4 border flex items-center justify-between ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#89CFF0]/25 text-[#1E6FB8] flex items-center justify-center">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-sm font-extrabold">Tema Tampilan</h2>
              <p className="text-xs text-slate-500">
                {darkMode ? 'Mode Malam Bintang (Gelap)' : 'Mode Cerah Samudra (Biru Muda)'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleDarkMode}
            role="switch"
            aria-checked={darkMode}
            className={`min-h-[42px] px-3.5 rounded-2xl font-extrabold text-xs transition-colors cursor-pointer ${
              darkMode
                ? 'bg-[#FFC53D] text-slate-900'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {darkMode ? 'Cerah' : 'Gelap'}
          </button>
        </div>

        {/* "Unduhan offline" Row with Storage Sizes */}
        <div
          className={`rounded-3xl p-4 border space-y-3 ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#1E6FB8]" />
              <h2 className="text-sm font-extrabold">Unduhan offline</h2>
            </div>
            <span className="text-xs font-extrabold text-[#1E6FB8] tabular-nums">
              70,5 MB terpakai
            </span>
          </div>

          <div className="space-y-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-2.5 rounded-2xl bg-[#F4FAFE] dark:bg-slate-800/80 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <h3 className="text-xs font-extrabold truncate">{pkg.title}</h3>
                  <p className="text-[11px] text-slate-500 tabular-nums">
                    {pkg.details} · <strong>{pkg.size}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => togglePackageDownload(pkg.id)}
                  className={`min-h-[36px] px-3 rounded-xl text-[11px] font-extrabold shrink-0 transition-colors cursor-pointer ${
                    pkg.downloaded
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#1E6FB8] text-white'
                  }`}
                >
                  {pkg.downloaded ? 'Tersimpan' : 'Unduh'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* "Ekspor data" Row */}
        <div
          className={`rounded-3xl p-4 border flex items-center justify-between gap-3 ${
            darkMode
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFC53D]/30 text-amber-900 flex items-center justify-center shrink-0">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold">Ekspor data</h2>
              <p className="text-xs text-slate-500">
                Simpan riwayat belajar & capaian keluarga (.JSON)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportData}
            className="min-h-[42px] px-3.5 rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] text-white text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            {exportSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Tersimpan</span>
              </>
            ) : (
              <span>Ekspor</span>
            )}
          </button>
        </div>
      </div>

      <BottomNav
        activeScreen="profile-settings"
        onNavigate={onNavigate}
        darkMode={darkMode}
      />
    </div>
  );
};
