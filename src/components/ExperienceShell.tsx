'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePortfolioStore } from '@/lib/store';
import { CHAPTER_COUNT, getChapterFromProgress, getProgressForChapter } from '@/lib/cameraPaths';
import type { DeviceTier } from '@/lib/store';
import Nav from '@/components/dom/Nav';
import ChapterLabel from '@/components/dom/ChapterLabel';
import ChapterOverlay from '@/components/dom/ChapterOverlay';

const Experience = dynamic(() => import('@/components/canvas/Experience'), { ssr: false });

const CHAPTERS = ['Intro', 'Origin', 'Stack', 'Projects', 'Research', 'Philosophy', 'Contact'];
const DARK_SECTIONS = new Set([0, 3, 5]);

interface ExperienceShellProps {
  deviceTier: DeviceTier;
}

export default function ExperienceShell({ deviceTier }: ExperienceShellProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const activeChapter = usePortfolioStore((s) => s.activeChapter);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);
  const setActiveChapter = usePortfolioStore((s) => s.setActiveChapter);
  const setDeviceTier = usePortfolioStore((s) => s.setDeviceTier);

  useEffect(() => {
    setDeviceTier(deviceTier);
  }, [deviceTier, setDeviceTier]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setScrollProgress(progress);
      setActiveChapter(getChapterFromProgress(progress));
      setHeaderScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setScrollProgress, setActiveChapter]);

  const scrollToChapter = (chapter: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = getProgressForChapter(chapter) * max;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const isDark = DARK_SECTIONS.has(activeChapter);

  return (
    <>
      <Experience deviceTier={deviceTier} />

      {!isLoaded && (
        <div className="loading-screen" style={{ zIndex: 300 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', color: 'var(--stone-900)' }}>
            Danyal Tanveer
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--stone-400)' }}>
            Initializing 3D build corridor
          </div>
          <div style={{ width: 160, height: 2, background: 'var(--stone-200)', borderRadius: 100, overflow: 'hidden', marginTop: '1rem' }}>
            <div style={{ height: '100%', background: 'var(--accent)', borderRadius: 100, animation: 'grow-bar 1.3s ease forwards' }} />
          </div>
        </div>
      )}

      <header className={`header ${isDark ? 'dark' : ''} ${headerScrolled ? 'scrolled' : ''}`}>
        <a
          href="#"
          className="header-brand"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <Image src="/logo.png" alt="DT" width={26} height={26} style={{ borderRadius: 6, objectFit: 'contain' }} />
          <span>Danyal Tanveer</span>
        </a>
        <a href="mailto:danyaltanveer0276@gmail.com" className={`btn ${isDark ? 'btn-ghost-dark' : 'btn-ghost-light'}`} style={{ fontSize: '0.75rem', padding: '0.42rem 1rem' }}>
          Contact
        </a>
      </header>

      <Nav chapters={CHAPTERS} activeSection={activeChapter} isDark={isDark} onChapterClick={scrollToChapter} />
      <ChapterLabel />
      <ChapterOverlay />

      <div
        ref={scrollRef}
        className="scroll-track"
        style={{ height: `${CHAPTER_COUNT * 100}vh`, position: 'relative', zIndex: 1, pointerEvents: 'none' }}
        aria-hidden
      />
    </>
  );
}
