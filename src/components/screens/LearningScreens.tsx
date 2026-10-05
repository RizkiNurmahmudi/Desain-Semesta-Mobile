import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ScreenId } from '../../types';
import {
  STORY_PANELS,
  STORY_METADATA,
  QUIZ_QUESTIONS,
} from '../../data/semestaData';
import {
  StoryPanelIllustration,
  TrophyVectorIllustration,
  ProfileAvatar,
} from '../Illustrations';

// ============================================================================
// SCREEN 5: STORY VIEWER
// ============================================================================
interface StoryViewerScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const StoryViewerScreen: React.FC<StoryViewerScreenProps> = ({
  onNavigate,
}) => {
  // Default to panel 3 of 6 (index 2) as specified in prompt
  const [panelIdx, setPanelIdx] = useState(2);
  const [showStoryNotes, setShowStoryNotes] = useState(false);

  const currentPanel = STORY_PANELS[panelIdx];
  const totalPanels = STORY_PANELS.length;

  const handleNext = () => {
    if (panelIdx < totalPanels - 1) {
      setPanelIdx(panelIdx + 1);
    } else {
      onNavigate('simulation');
    }
  };

  return (
    <div className="min-h-[680px] h-full flex flex-col justify-between bg-[#F4FAFE] text-[#1E293B]">
      {/* Top Bar */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-slate-200/70 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('concept-detail')}
          className="min-w-[44px] min-h-[44px] -ml-1 rounded-2xl flex items-center justify-center text-[#1E293B] hover:bg-slate-100 cursor-pointer"
          aria-label="Kembali ke Detail Konsep"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold text-[#1E6FB8]">
            Cerita Bergambar · L2
          </span>
          <h1 className="text-sm font-extrabold text-[#1E293B]">
            Panel {currentPanel.panelNumber} dari {totalPanels}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowStoryNotes(!showStoryNotes)}
          className="min-h-[40px] px-2.5 rounded-xl bg-[#89CFF0]/20 text-[#1E6FB8] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
          title="Lihat catatan naskah & deskripsi ilustrasi"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Naskah</span>
        </button>
      </div>

      {/* Full-width Flat-Vector Illustration Panel */}
      <div className="w-full bg-[#E1F4FD] border-b border-[#89CFF0]/40 relative overflow-hidden">
        <StoryPanelIllustration panelNumber={currentPanel.panelNumber} />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-xl text-[11px] font-extrabold text-[#1E6FB8] shadow-2xs">
          {currentPanel.panelNumber}. {currentPanel.title}
        </div>
      </div>

      {/* Story Body: Dialogue Bubble + Caption */}
      <div className="px-4 py-4 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Dialogue Speech Bubble */}
          <div className="bg-white rounded-3xl p-3.5 border-2 border-[#89CFF0] shadow-xs relative">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <ProfileAvatar
                  avatarKey={
                    currentPanel.speaker.includes('Dimas')
                      ? 'dimas'
                      : currentPanel.speaker.includes('Ratna')
                      ? 'ratna'
                      : 'kirana'
                  }
                  size={42}
                />
              </div>
              <div className="flex-1">
                <span className="text-xs font-extrabold text-[#1E6FB8] block mb-0.5">
                  {currentPanel.speaker} berkata:
                </span>
                <p className="text-xs font-semibold text-[#1E293B] leading-relaxed italic">
                  &ldquo;{currentPanel.dialogue}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Caption Card */}
          <div className="bg-white/90 rounded-2xl p-3.5 border border-slate-200/70">
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentPanel.caption}
            </p>
            {currentPanel.formulaHint && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#1E6FB8]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC53D] fill-[#FFC53D] shrink-0" />
                <span>Inti Konsep: {currentPanel.formulaHint}</span>
              </div>
            )}
          </div>

          {/* Optional Collapsible Children's Storybook Format Box */}
          {showStoryNotes && (
            <div className="bg-[#FFFBEB] border border-[#FFC53D] rounded-2xl p-3 text-[11px] text-slate-700 space-y-1.5">
              <div>
                <strong className="text-[#1E293B]">Judul:</strong> {STORY_METADATA.judul}
              </div>
              <div>
                <strong className="text-[#1E293B]">Sinopsis:</strong> {STORY_METADATA.sinopsis}
              </div>
              <div>
                <strong className="text-[#1E293B]">Cerita:</strong> {currentPanel.caption}
              </div>
              <div className="text-slate-600 italic">
                <strong>(Prompt Visual:</strong> {currentPanel.visualPrompt}
                <strong>)</strong>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Controls: Dots Indicator (panel 3 of 6), "Lanjut" button, "Lewati ke simulasi" link */}
        <div className="pt-2 space-y-3">
          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Pilih panel cerita">
            {STORY_PANELS.map((panel, idx) => {
              const isCurrent = idx === panelIdx;
              return (
                <button
                  key={panel.panelNumber}
                  type="button"
                  onClick={() => setPanelIdx(idx)}
                  aria-label={`Panel ${panel.panelNumber} dari ${totalPanels}`}
                  aria-selected={isCurrent}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'w-7 bg-[#1E6FB8]'
                      : 'w-2.5 bg-[#89CFF0]/60 hover:bg-[#89CFF0]'
                  }`}
                />
              );
            })}
          </div>

          {/* Primary "Lanjut" Button + Previous button */}
          <div className="flex items-center gap-2.5">
            {panelIdx > 0 && (
              <button
                type="button"
                onClick={() => setPanelIdx(panelIdx - 1)}
                className="min-h-[50px] px-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              >
                Sebelumnya
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 min-h-[50px] rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] active:scale-[0.98] text-white font-extrabold text-sm shadow-md shadow-[#1E6FB8]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{panelIdx === totalPanels - 1 ? 'Mulai Simulasi' : 'Lanjut'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Subtle "Lewati ke simulasi" link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate('simulation')}
              className="text-xs font-semibold text-slate-500 hover:text-[#1E6FB8] underline underline-offset-4 py-1 cursor-pointer"
            >
              Lewati ke simulasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SCREEN 6: INTERACTIVE SIMULATION
// ============================================================================
interface SimulationScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({
  onNavigate,
}) => {
  // Default values matching prompt: "Sudut 45°" and "Kecepatan 20 m/s" -> "Jangkauan: 40,8 m"
  const [angle, setAngle] = useState<number>(45);
  const [velocity, setVelocity] = useState<number>(20);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressT, setProgressT] = useState<number>(0.65); // Show projectile mid-arc initially
  const [showFormula, setShowFormula] = useState<boolean>(false);

  const animRef = useRef<number | null>(null);

  const g = 9.8;
  const rad = (angle * Math.PI) / 180;
  const rangeMeters = (velocity * velocity * Math.sin(2 * rad)) / g;
  const maxHeightMeters = (velocity * velocity * Math.pow(Math.sin(rad), 2)) / (2 * g);
  const totalTime = (2 * velocity * Math.sin(rad)) / g;

  const formatComma = (num: number) => num.toFixed(1).replace('.', ',');

  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setProgressT((prev) => {
        const next = prev + dt * 0.55;
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (progressT >= 1) {
      setProgressT(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setAngle(45);
    setVelocity(20);
    setProgressT(0.65);
  };

  // Map physics coordinates (0..80m horizontal, 0..35m vertical) to SVG canvas (340 x 195)
  const startX = 34;
  const groundY = 166;
  const scaleX = 3.2; // 1 meter = 3.2px
  const scaleY = 3.2;

  // Generate trajectory points
  const points: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    const t = frac * totalTime;
    const xMeters = velocity * Math.cos(rad) * t;
    const yMeters = velocity * Math.sin(rad) * t - 0.5 * g * t * t;
    const px = startX + xMeters * scaleX;
    const py = groundY - Math.max(0, yMeters) * scaleY;
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }

  // Current projectile position at progressT
  const currentT = progressT * totalTime;
  const ballXMeters = velocity * Math.cos(rad) * currentT;
  const ballYMeters = Math.max(
    0,
    velocity * Math.sin(rad) * currentT - 0.5 * g * currentT * currentT
  );
  const ballPx = startX + ballXMeters * scaleX;
  const ballPy = groundY - ballYMeters * scaleY;

  const landingPx = startX + rangeMeters * scaleX;
  const targetPx = startX + 40.816 * scaleX; // Target placed at 40,8 m!

  return (
    <div className="min-h-[680px] h-full flex flex-col justify-between bg-[#F4FAFE] text-[#1E293B]">
      {/* Top Bar */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-slate-200/70 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('concept-detail')}
          className="min-w-[44px] min-h-[44px] -ml-1 rounded-2xl flex items-center justify-center text-[#1E293B] hover:bg-slate-100 cursor-pointer"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold text-[#1E6FB8]">
            Laboratorium Virtual · L2
          </span>
          <h1 className="text-base font-extrabold text-[#1E293B]">
            Simulasi Gerak Parabola
          </h1>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('quiz')}
          className="min-h-[40px] px-3 rounded-xl bg-[#FFC53D]/35 text-[#1E293B] text-xs font-extrabold hover:bg-[#FFC53D]/55 cursor-pointer"
        >
          Kuis
        </button>
      </div>

      <div className="px-4 py-3.5 space-y-3.5 flex-1">
        {/* Interactive Canvas Area */}
        <div className="rounded-3xl bg-[#E1F4FD] border-2 border-[#89CFF0] overflow-hidden shadow-xs relative">
          {/* HUD Chip Overlay */}
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <div className="bg-[#1E6FB8] text-white px-3 py-1.5 rounded-2xl shadow-sm text-xs font-extrabold tabular-nums">
              Jangkauan: {formatComma(rangeMeters)} m
            </div>
            <div className="bg-white/90 backdrop-blur-xs text-[#1E293B] px-2.5 py-1 rounded-xl text-[11px] font-bold border border-[#89CFF0] tabular-nums">
              Tinggi maks: {formatComma(maxHeightMeters)} m
            </div>
          </div>

          <svg
            viewBox="0 0 340 195"
            className="w-full h-auto block select-none"
            role="img"
            aria-label="Kanvas simulasi lintasan gerak parabola"
          >
            {/* Coordinate grid lines */}
            <g stroke="#89CFF0" strokeOpacity="0.45" strokeWidth="1">
              <line x1="34" y1="40" x2="34" y2="166" />
              <line x1="98" y1="40" x2="98" y2="166" />
              <line x1="162" y1="40" x2="162" y2="166" />
              <line x1="226" y1="40" x2="226" y2="166" />
              <line x1="290" y1="40" x2="290" y2="166" />
              <line x1="20" y1="134" x2="325" y2="134" />
              <line x1="20" y1="102" x2="325" y2="102" />
              <line x1="20" y1="70" x2="325" y2="70" />
            </g>

            {/* Ground grass strip */}
            <rect x="0" y="166" width="340" height="29" fill="#4ADE80" />
            <line x1="0" y1="166" x2="340" y2="166" stroke="#16A34A" strokeWidth="2" />

            {/* Distance markers on grass */}
            <g fill="#1E293B" fontSize="9" fontWeight="700">
              <text x="34" y="182" textAnchor="middle">0 m</text>
              <text x="98" y="182" textAnchor="middle">20 m</text>
              <text x="164" y="182" textAnchor="middle">40,8 m</text>
              <text x="230" y="182" textAnchor="middle">60 m</text>
            </g>

            {/* Target Bullseye at 40,8 m */}
            <g transform={`translate(${targetPx}, ${groundY})`}>
              <ellipse cx="0" cy="0" rx="14" ry="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="7" ry="2.5" fill="#FFC53D" />
              {/* Flag on target */}
              <line x1="0" y1="0" x2="0" y2="-22" stroke="#1E293B" strokeWidth="1.8" />
              <polygon points="0,-22 14,-17 0,-12" fill="#22C55E" />
            </g>

            {/* Full Dashed Trajectory Preview */}
            <polyline
              fill="none"
              stroke="#1E6FB8"
              strokeWidth="3"
              strokeDasharray="5 5"
              strokeLinecap="round"
              points={points.join(' ')}
            />

            {/* Launcher angle arc */}
            <line
              x1={startX}
              y1={groundY}
              x2={startX + 28 * Math.cos(rad)}
              y2={groundY - 28 * Math.sin(rad)}
              stroke="#1E6FB8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx={startX} cy={groundY} r="7" fill="#1E6FB8" />

            {/* Landing Spot Marker */}
            <circle cx={landingPx} cy={groundY} r="4.5" fill="#1E6FB8" />

            {/* Active Projectile Ball in Warm Amber */}
            <g transform={`translate(${ballPx}, ${ballPy})`}>
              <circle r="11" fill="#FFC53D" fillOpacity="0.35" />
              <circle r="7.5" fill="#FFC53D" stroke="#1E6FB8" strokeWidth="2.2" />
            </g>
          </svg>
        </div>

        {/* Sliders Container */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-2xs space-y-4">
          {/* Slider 1: Sudut 45° */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="slider-sudut"
                className="text-xs font-extrabold text-[#1E293B]"
              >
                Sudut {angle}°
              </label>
              <span className="text-[11px] font-semibold text-[#1E6FB8] tabular-nums">
                {angle === 45 ? '★ Sudut Optimal (45°)' : `Rentang: 15° – 80°`}
              </span>
            </div>
            <input
              id="slider-sudut"
              type="range"
              min={15}
              max={80}
              step={1}
              value={angle}
              onChange={(e) => {
                setAngle(Number(e.target.value));
                setProgressT(0.65);
              }}
              className="w-full semesta-slider bg-[#89CFF0]/45"
            />
          </div>

          {/* Slider 2: Kecepatan 20 m/s */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="slider-kecepatan"
                className="text-xs font-extrabold text-[#1E293B]"
              >
                Kecepatan {velocity} m/s
              </label>
              <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                Waktu melayang: {formatComma(totalTime)} dtk
              </span>
            </div>
            <input
              id="slider-kecepatan"
              type="range"
              min={10}
              max={30}
              step={1}
              value={velocity}
              onChange={(e) => {
                setVelocity(Number(e.target.value));
                setProgressT(0.65);
              }}
              className="w-full semesta-slider bg-[#FFC53D]/45"
            />
          </div>

          {/* Playback Buttons: Mulai / Jeda / Reset */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={handlePlayToggle}
              className={`min-h-[46px] rounded-2xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-slate-200 text-slate-700'
                  : 'bg-[#1E6FB8] text-white shadow-sm shadow-[#1E6FB8]/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Mulai</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="min-h-[46px] rounded-2xl bg-[#89CFF0]/25 hover:bg-[#89CFF0]/40 text-[#1E6FB8] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Pause className="w-4 h-4" />
              <span>Jeda</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="min-h-[46px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Expandable "Lihat rumus" Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            aria-expanded={showFormula}
            className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span className="text-xs font-extrabold text-[#1E6FB8] flex items-center gap-2">
              <span>Lihat rumus</span>
              <span className="text-[11px] font-medium text-slate-500">
                (Jangkauan & Tinggi Maksimum)
              </span>
            </span>
            {showFormula ? (
              <ChevronUp className="w-4 h-4 text-[#1E6FB8]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#1E6FB8]" />
            )}
          </button>

          {showFormula && (
            <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#F4FAFE] font-mono-num text-[#1E293B] space-y-1">
                <div className="font-bold text-[#1E6FB8]">
                  Jangkauan (R) = (v₀² · sin(2θ)) / g
                </div>
                <div className="text-slate-600 text-[11px]">
                  R = ({velocity}² · sin({2 * angle}°)) / 9,8 ={' '}
                  <strong className="text-[#1E293B]">{formatComma(rangeMeters)} m</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Karena nilai maksimum dari <span className="font-mono-num">sin(2θ)</span> adalah 1 (saat <span className="font-mono-num">2θ = 90°</span>), maka sudut <strong className="text-[#1E6FB8]">θ = 45°</strong> selalu memberikan jangkauan terjauh!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA to Quiz */}
      <div className="px-4 py-3 bg-white border-t border-slate-200/70">
        <button
          type="button"
          onClick={() => onNavigate('quiz')}
          className="w-full min-h-[48px] rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Lanjut ke Latihan Kuis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// SCREEN 7: QUIZ ("Soal 2 dari 5")
// ============================================================================
interface QuizScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate }) => {
  // Default to question index 1 so screen opens showing "Soal 2 dari 5"
  const [questionIdx, setQuestionIdx] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>('B');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[questionIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = ((questionIdx + 1) / totalQuestions) * 100;

  const handleCheckOrContinue = () => {
    if (!hasChecked) {
      setHasChecked(true);
    } else {
      onNavigate('quiz-result');
    }
  };

  const handleSwitchQuestion = (idx: number) => {
    setQuestionIdx(idx);
    setSelectedOption(QUIZ_QUESTIONS[idx].correctOptionId);
    setHasChecked(false);
    setShowHint(false);
  };

  return (
    <div className="min-h-[680px] h-full flex flex-col justify-between bg-[#F4FAFE] text-[#1E293B]">
      {/* Top Bar with "Soal 2 dari 5" progress */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-slate-200/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('simulation')}
            className="min-w-[44px] min-h-[44px] -ml-1 rounded-2xl flex items-center justify-center text-[#1E293B] hover:bg-slate-100 cursor-pointer"
            aria-label="Kembali ke Simulasi"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="text-center">
            <span className="text-xs font-extrabold text-[#1E6FB8] tabular-nums">
              Soal {currentQuestion.id} dari {totalQuestions}
            </span>
          </div>

          {/* Question number pills for quick jump */}
          <div className="flex items-center gap-1">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSwitchQuestion(idx)}
                className={`w-6 h-6 rounded-lg text-[11px] font-bold tabular-nums cursor-pointer ${
                  idx === questionIdx
                    ? 'bg-[#1E6FB8] text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#89CFF0] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%`, backgroundColor: '#1E6FB8' }}
          />
        </div>
      </div>

      {/* Question Card & 4 Answer Options */}
      <div className="px-4 py-4 space-y-3.5 flex-1">
        {/* Question Card */}
        <div className="bg-white rounded-3xl p-4 border border-[#89CFF0]/60 shadow-2xs">
          <span className="text-[11px] font-bold text-[#1E6FB8] block mb-1">
            {currentQuestion.contextNote}
          </span>
          <h2 className="text-sm font-extrabold text-[#1E293B] leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Answer Option Cards */}
        <div className="space-y-2.5" role="radiogroup" aria-label="Pilihan jawaban">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === currentQuestion.correctOptionId;

            let cardStyle = 'bg-white border-slate-200/90 text-[#1E293B] hover:border-[#89CFF0]';
            if (hasChecked) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-[#22C55E] text-emerald-950 ring-2 ring-[#22C55E]/30';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-amber-50 border-[#F59E0B] text-amber-950';
              }
            } else if (isSelected) {
              cardStyle = 'bg-[#89CFF0]/20 border-[#1E6FB8] text-[#1E293B] ring-2 ring-[#1E6FB8]/20';
            }

            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  setSelectedOption(opt.id);
                  setHasChecked(false);
                }}
                className={`w-full min-h-[54px] p-3.5 rounded-2xl border-2 text-left flex items-center gap-3 transition-all active:scale-[0.99] cursor-pointer ${cardStyle}`}
              >
                <span
                  className={`w-8 h-8 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#1E6FB8] text-white'
                      : 'bg-[#F4FAFE] text-[#1E6FB8] border border-[#89CFF0]/40'
                  }`}
                >
                  {opt.label}
                </span>
                <span className="text-xs font-bold leading-snug flex-1">
                  {opt.text}
                </span>
                {hasChecked && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Box when "Petunjuk" is toggled */}
        {showHint && (
          <div className="p-3.5 rounded-2xl bg-[#FFC53D]/25 border border-[#FFC53D] text-xs text-[#1E293B] flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">Petunjuk Belajar:</span>
              <span>{currentQuestion.hint}</span>
            </div>
          </div>
        )}

        {/* Explanation Box after checking */}
        {hasChecked && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-[#22C55E] text-xs text-emerald-950">
            <span className="font-extrabold block text-[#22C55E] mb-0.5">
              ✓ Pembahasan:
            </span>
            <span>{currentQuestion.explanation}</span>
          </div>
        )}
      </div>

      {/* Bottom Action Bar: "Petunjuk" button + "Periksa" CTA */}
      <div className="p-4 bg-white border-t border-slate-200/70 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="min-h-[50px] px-4 rounded-2xl bg-[#FFC53D]/30 hover:bg-[#FFC53D]/45 text-[#1E293B] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <Lightbulb className="w-4 h-4 text-amber-700" />
          <span>Petunjuk</span>
        </button>

        <button
          type="button"
          onClick={handleCheckOrContinue}
          className="flex-1 min-h-[50px] rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] active:scale-[0.98] text-white font-extrabold text-sm shadow-md shadow-[#1E6FB8]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{hasChecked ? 'Lihat Hasil Kuis' : 'Periksa'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// SCREEN 8: QUIZ RESULT
// ============================================================================
interface QuizResultScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const QuizResultScreen: React.FC<QuizResultScreenProps> = ({
  onNavigate,
}) => {
  const [barWidth, setBarWidth] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidth(85);
    }, 180);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[680px] h-full flex flex-col justify-between bg-[#F4FAFE] text-[#1E293B] px-5 py-6">
      {/* Top Celebration Badge */}
      <div className="text-center">
        <span className="inline-block text-xs font-extrabold text-[#1E6FB8] bg-[#89CFF0]/25 px-3.5 py-1.5 rounded-2xl">
          Latihan Selesai · Gerak Parabola L2
        </span>
      </div>

      {/* Center Trophy Flat Illustration, "Hebat! Skor 80", "+24 XP" chip */}
      <div className="my-auto flex flex-col items-center text-center py-4">
        <div className="mb-4">
          <TrophyVectorIllustration size={140} />
        </div>

        <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
          Hebat! Skor 80
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-[250px] leading-relaxed">
          Kamu berhasil menjawab 4 dari 5 soal konsep lintasan parabola dengan tepat!
        </p>

        {/* "+24 XP" Chip */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFC53D] text-[#1E293B] font-extrabold text-sm shadow-sm tabular-nums">
          <Sparkles className="w-4 h-4 fill-[#1E293B]" />
          <span>+24 XP</span>
        </div>

        {/* Animated Mastery Progress Bar */}
        <div className="w-full bg-white rounded-3xl p-4 mt-6 border border-[#89CFF0]/50 shadow-2xs text-left">
          <div className="flex items-center justify-between text-xs font-extrabold mb-2">
            <span className="text-[#1E293B]">Penguasaan Gerak Parabola</span>
            <span className="text-[#22C55E] tabular-nums">{barWidth}% (Naik +25%)</span>
          </div>

          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${barWidth}%`,
                background: 'linear-gradient(90deg, #89CFF0 0%, #1E6FB8 60%, #22C55E 100%)',
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span>Level 2 Dikuasai</span>
            <span className="font-bold text-[#1E6FB8]">Siap ke materi berikutnya!</span>
          </div>
        </div>
      </div>

      {/* Bottom Recommendation CTA: "Lanjut ke: Momentum & Tumbukan" */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => onNavigate('skill-map')}
          className="w-full min-h-[54px] rounded-2xl bg-[#1E6FB8] hover:bg-[#185a96] active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-[#1E6FB8]/20 flex items-center justify-center gap-2 px-4 transition-all cursor-pointer"
        >
          <span>Lanjut ke: Momentum & Tumbukan</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="w-full min-h-[44px] rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Kembali ke Katalog Utama
        </button>
      </div>
    </div>
  );
};
