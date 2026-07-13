'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, refreshScroll } from '@/lib/scroll';
import WorldBackground from './WorldBackground';
import Header from './Header';
import SectionRail from './SectionRail';
import Preloader from './Preloader';
import HeroChapter from './sections/HeroChapter';
import OriginChapter from './sections/OriginChapter';
import ProjectsChapter from './sections/ProjectsChapter';
import SkillsChapter from './sections/SkillsChapter';
import ResearchChapter from './sections/ResearchChapter';
import PhilosophyChapter from './sections/PhilosophyChapter';
import ContactChapter from './sections/ContactChapter';

export default function Experience() {
  const [ready, setReady] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const onPreloadDone = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);

    cleanupRef.current = initSmoothScroll();

    const progress = progressRef.current;
    if (progress) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
      });
    }

    const t = setTimeout(() => refreshScroll(), 300);

    return () => {
      clearTimeout(t);
      cleanupRef.current?.();
    };
  }, [ready]);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />
      <WorldBackground />
      <Header />
      <SectionRail />

      {!ready && <Preloader onDone={onPreloadDone} />}

      <main className="experience">
        <HeroChapter />
        <OriginChapter />
        <ProjectsChapter />
        <SkillsChapter />
        <ResearchChapter />
        <PhilosophyChapter />
        <ContactChapter />
      </main>
    </>
  );
}
