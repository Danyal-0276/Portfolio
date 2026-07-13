export interface ChapterTheme {
  id: string;
  label: string;
  scrollVh: number;
  bg: string;
  accent: string;
  orb: string;
}

export const CHAPTERS: ChapterTheme[] = [
  { id: 'hero',      label: 'Intro',     scrollVh: 420, bg: '#050608', accent: '#c8ff00', orb: 'rgba(200,255,0,0.35)' },
  { id: 'origin',    label: 'Origin',    scrollVh: 380, bg: '#0a0618', accent: '#a78bfa', orb: 'rgba(167,139,250,0.3)' },
  { id: 'projects',  label: 'Projects',  scrollVh: 520, bg: '#060810', accent: '#06b6d4', orb: 'rgba(6,182,212,0.3)' },
  { id: 'skills',    label: 'Stack',     scrollVh: 340, bg: '#040d10', accent: '#2ec4b6', orb: 'rgba(46,196,182,0.28)' },
  { id: 'research',  label: 'Research',  scrollVh: 360, bg: '#061008', accent: '#10b981', orb: 'rgba(16,185,129,0.28)' },
  { id: 'philosophy',label: 'Mindset',   scrollVh: 320, bg: '#100a04', accent: '#f59e0b', orb: 'rgba(245,158,11,0.25)' },
  { id: 'contact',   label: 'Contact',   scrollVh: 280, bg: '#060a14', accent: '#3b82f6', orb: 'rgba(59,130,246,0.28)' },
];

export function chapterSelector(id: string) {
  return `[data-chapter="${id}"]`;
}
