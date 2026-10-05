import React, { useState } from 'react';
import { ArrowRight, Plus, Sparkles, Check, X } from 'lucide-react';
import { FamilyProfile, UIMode } from '../../types';
import { SemestaAtomLogo, ProfileAvatar } from '../Illustrations';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div
      className="min-h-[680px] h-full flex flex-col justify-between px-6 py-8 relative overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg, #CBEBFC 0%, #89CFF0 42%, #DFF3FD 78%, #F4FAFE 100%)',
      }}
    >
      {/* Decorative flat-vector storybook clouds and stars */}
      <svg
        className="absolute top-6 left-0 w-full h-44 pointer-events-none opacity-85"
        viewBox="0 0 360 160"
        fill="none"
      >
        <circle cx="48" cy="36" r="5" fill="#FFC53D" />
        <circle cx="312" cy="28" r="6" fill="#FFC53D" />
        <circle cx="280" cy="84" r="4" fill="#FFFFFF" />
        {/* Soft cloud left */}
        <g fill="#FFFFFF" fillOpacity="0.75">
          <rect x="16" y="68" width="76" height="22" rx="11" />
          <circle cx="38" cy="66" r="14" />
          <circle cx="62" cy="64" r="16" />
        </g>
        {/* Soft cloud right */}
        <g fill="#FFFFFF" fillOpacity="0.75">
          <rect x="255" y="42" width="84" height="24" rx="12" />
          <circle cx="280" cy="40" r="15" />
          <circle cx="308" cy="38" r="17" />
        </g>
      </svg>

      {/* Top subtle family tag */}
      <div className="relative z-10 flex items-center justify-center pt-2">
        <span className="text-xs font-semibold tracking-wide text-[#1E6FB8] bg-white/75 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl">
          Fisika · Matematika · Keluarga Indonesia
        </span>
      </div>

      {/* Center Atom Logo, App Name "Semesta", Tagline */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-6">
        <div className="p-3 rounded-[36px] bg-white/65 shadow-lg shadow-[#1E6FB8]/10 mb-6">
          <SemestaAtomLogo size={116} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-[#1E293B] mb-3">
          Semesta
        </h1>

        <p className="text-base font-semibold text-[#1E293B]/85 max-w-[260px] leading-relaxed text-balance">
          Dari nol sampai ahli, dalam satu tempat
        </p>

        <p className="text-xs text-[#1E293B]/70 mt-3 max-w-[250px] leading-relaxed">
          Cerita bergambar, simulasi interaktif, dan latihan seru untuk anak, remaja, hingga orang tua.
        </p>
      </div>

      {/* Bottom Primary CTA Button */}
      <div className="relative z-10 flex flex-col gap-3 pt-4">
        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[54px] bg-[#1E6FB8] hover:bg-[#185a96] active:scale-[0.98] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#1E6FB8]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <span>Mulai Belajar</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        <p className="text-center text-[11px] font-medium text-[#1E293B]/65">
          Bebas iklan · Aman untuk anak & keluarga
        </p>
      </div>
    </div>
  );
};

interface ProfilePickerScreenProps {
  profiles: FamilyProfile[];
  selectedProfileId: string;
  onSelectProfile: (profile: FamilyProfile) => void;
  onAddProfile: (newProfile: FamilyProfile) => void;
}

export const ProfilePickerScreen: React.FC<ProfilePickerScreenProps> = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
  onAddProfile,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'Anak' | 'Remaja' | 'Orang Tua' | 'Dewasa Muda'>('Anak');
  const [newAge, setNewAge] = useState('10');

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const modeMap: Record<string, UIMode> = {
      Anak: 'Penjelajah',
      Remaja: 'Pelajar',
      'Orang Tua': 'Pelajar',
      'Dewasa Muda': 'Ahli',
    };

    const created: FamilyProfile = {
      id: `profil-${Date.now()}`,
      name: newName.trim(),
      roleLabel: `${newRole} · ${modeMap[newRole]}`,
      ageLabel: `${newAge} tahun`,
      uiMode: modeMap[newRole],
      level: 'Level 1',
      streakDays: 1,
      xp: 100,
      avatarKey: 'custom',
      accentBg: '#E1F4FD',
    };

    onAddProfile(created);
    setNewName('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-[680px] h-full flex flex-col justify-between bg-[#F4FAFE] px-5 py-6 relative">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SemestaAtomLogo size={32} />
            <span className="font-extrabold text-base text-[#1E6FB8]">Semesta</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">Keluarga Belajar</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
          Siapa yang belajar?
        </h1>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          Pilih profil agar materi cerita dan simulasi menyesuaikan tingkat belajarmu.
        </p>

        {/* Avatar Grid */}
        <div className="grid grid-cols-2 gap-3.5 mt-5">
          {profiles.map((profile) => {
            const isSelected = profile.id === selectedProfileId;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => onSelectProfile(profile)}
                className={`group relative flex flex-col items-center text-center p-4 rounded-3xl bg-white transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-[#1E6FB8] shadow-md shadow-[#1E6FB8]/10'
                    : 'border border-slate-200/80 hover:border-[#89CFF0]'
                }`}
              >
                {isSelected && (
                  <span
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#1E6FB8] text-white flex items-center justify-center"
                    aria-label="Profil terpilih"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}

                <div className="mb-2.5 transition-transform duration-150 group-hover:scale-105">
                  <ProfileAvatar avatarKey={profile.avatarKey} size={68} />
                </div>

                <h2 className="text-base font-extrabold text-[#1E293B] leading-snug">
                  {profile.name}
                </h2>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                  {profile.roleLabel}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#1E6FB8] tabular-nums">
                  <span>{profile.level}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-600">🔥 {profile.streakDays} hr</span>
                </div>
              </button>
            );
          })}

          {/* Dashed "Tambah profil" card */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="min-h-[168px] flex flex-col items-center justify-center text-center p-4 rounded-3xl border-2 border-dashed border-[#89CFF0] bg-[#89CFF0]/10 hover:bg-[#89CFF0]/20 active:scale-[0.98] transition-all cursor-pointer col-span-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#89CFF0] flex items-center justify-center text-[#1E6FB8] mb-2 shadow-xs">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-[#1E6FB8]">Tambah profil</span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Tambahkan adik, kakak, atau anggota keluarga lain
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Tip */}
      <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
        <span>Ketuk kartu untuk masuk ke Katalog</span>
        <span className="font-semibold text-[#1E6FB8] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FFC53D] fill-[#FFC53D]" />4 Profil Aktif
        </span>
      </div>

      {/* Modal Tambah Profil */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[330px] bg-white rounded-3xl p-5 shadow-xl border border-[#89CFF0]/40">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold text-[#1E293B]">
                Tambah Profil Keluarga
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bima"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#1E6FB8] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Peran Keluarga
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(
                        e.target.value as 'Anak' | 'Remaja' | 'Orang Tua' | 'Dewasa Muda'
                      )
                    }
                    className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white focus:border-[#1E6FB8] focus:outline-none"
                  >
                    <option value="Anak">Anak (8+)</option>
                    <option value="Remaja">Remaja</option>
                    <option value="Orang Tua">Orang Tua</option>
                    <option value="Dewasa Muda">Dewasa Muda</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Usia (Tahun)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#1E6FB8] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 min-h-[44px] rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 min-h-[44px] rounded-xl bg-[#1E6FB8] text-white text-xs font-bold shadow-sm"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
