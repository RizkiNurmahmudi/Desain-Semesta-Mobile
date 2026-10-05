export type ScreenId =
  | 'splash'
  | 'profile-picker'
  | 'home'
  | 'concept-detail'
  | 'story'
  | 'simulation'
  | 'quiz'
  | 'quiz-result'
  | 'skill-map'
  | 'progress'
  | 'profile-settings';

export type UIMode = 'Penjelajah' | 'Pelajar' | 'Ahli';

export interface FamilyProfile {
  id: string;
  name: string;
  roleLabel: string;
  ageLabel: string;
  uiMode: UIMode;
  level: string;
  streakDays: number;
  xp: number;
  avatarKey: 'kirana' | 'dimas' | 'ratna' | 'arya' | 'custom';
  accentBg: string;
}

export type ContentBadgeType = 'cerita' | 'simulasi' | 'studi kasus';

export interface ConceptItem {
  id: string;
  title: string;
  category: 'Fisika' | 'Matematika';
  level: 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  progress: number;
  summary: string;
  iconKey: 'parabola' | 'momentum' | 'persen' | 'newton' | 'geometri' | 'energi';
  badges: ContentBadgeType[];
  status: 'tersedia' | 'dipelajari' | 'dikuasai' | 'ulangi';
}

export interface StoryPanelData {
  panelNumber: number;
  title: string;
  caption: string;
  speaker: string;
  dialogue: string;
  visualPrompt: string;
  formulaHint?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  contextNote: string;
  options: {
    id: string;
    label: string;
    text: string;
  }[];
  correctOptionId: string;
  hint: string;
  explanation: string;
}

export interface SkillNode {
  id: string;
  title: string;
  category: 'Fisika' | 'Matematika';
  level: string;
  status: 'tersedia' | 'dipelajari' | 'dikuasai' | 'ulangi';
  progress: number;
  x: number;
  y: number;
  description: string;
  prerequisites: string[];
}
