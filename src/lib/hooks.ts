'use client';

import { useMemo } from 'react';
import { usePortfolioStore, type DeviceTier } from './store';
import { CHAPTER_COUNT } from './cameraPaths';

export function useDeviceTier(): DeviceTier {
  return usePortfolioStore((s) => s.deviceTier);
}

export function useCameraPath(chapterIndex: number) {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const chapterStart = chapterIndex / CHAPTER_COUNT;
  const chapterEnd = (chapterIndex + 1) / CHAPTER_COUNT;

  const localProgress = useMemo(() => {
    if (scrollProgress <= chapterStart) return 0;
    if (scrollProgress >= chapterEnd) return 1;
    return (scrollProgress - chapterStart) / (chapterEnd - chapterStart);
  }, [scrollProgress, chapterStart, chapterEnd]);

  return { scrollProgress, localProgress };
}

export function useChapterVisibility(chapterIndex: number, margin = 0.06): boolean {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const chapterStart = chapterIndex / CHAPTER_COUNT;
  const chapterEnd = (chapterIndex + 1) / CHAPTER_COUNT;
  return scrollProgress >= chapterStart - margin && scrollProgress <= chapterEnd + margin;
}
