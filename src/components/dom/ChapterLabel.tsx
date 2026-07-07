'use client';

import { usePortfolioStore } from '@/lib/store';
import { chapterNames } from '@/lib/cameraPaths';

const CHAPTER_LABELS = [
  'Chapter I — Introduction',
  'Chapter II — Origin',
  'Chapter III — Stack',
  'Chapter IV — The Build',
  'Chapter V — Research',
  'Chapter VI — Philosophy',
  'Chapter VII — Contact',
];

export default function ChapterLabel() {
  const activeChapter = usePortfolioStore((s) => s.activeChapter);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const isDark = [0, 3, 5].includes(activeChapter);

  return (
    <div
      className="chapter-label"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2.5rem',
        zIndex: 20,
        pointerEvents: 'none',
        opacity: scrollProgress < 0.98 ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <div
        className="label"
        style={{
          color: isDark ? 'var(--accent-soft)' : 'var(--accent)',
          marginBottom: '0.35rem',
        }}
      >
        {CHAPTER_LABELS[activeChapter]}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: isDark ? 'rgba(255,255,255,0.35)' : 'var(--stone-400)',
          letterSpacing: '0.08em',
        }}
      >
        {chapterNames[activeChapter]} · {Math.round(scrollProgress * 100)}%
      </div>
    </div>
  );
}
