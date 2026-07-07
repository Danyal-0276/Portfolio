'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CursorGlow from '@/components/background/CursorGlow';
import Nav from '@/components/dom/Nav';

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const Origin = dynamic(() => import('@/components/sections/Origin'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Flagships = dynamic(() => import('@/components/sections/Flagships'), { ssr: false });
const Research = dynamic(() => import('@/components/sections/Research'), { ssr: false });
const Philosophy = dynamic(() => import('@/components/sections/Philosophy'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = ['Intro', 'Origin', 'Stack', 'Projects', 'Research', 'Philosophy', 'Contact'];
const DARK_SECTIONS = new Set([0, 3, 5]);

export default function ProjectCard2D() {
  const [ready, setReady] = useState(false);
  const [activeSection, setActive] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    }
    gsap.ticker.add(raf);
    const timer = setTimeout(() => setReady(true), 1000);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-up]').forEach((el) => {
        gsap.fromTo(el, { y: 55, opacity: 0 }, {
          scrollTrigger: { trigger: el, start: 'top 90%' },
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        });
      });
      gsap.utils.toArray<HTMLElement>('.section[data-section]').forEach((section) => {
        const idx = parseInt(section.dataset.section ?? '0', 10);
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActive(idx),
          onEnterBack: () => setActive(idx),
        });
      });
      ScrollTrigger.refresh();
    }, mainRef);
    return () => ctx.revert();
  }, [ready]);

  if (!ready) {
    return (
      <div className="loading-screen">
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>
          Danyal Tanveer
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--stone-400)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Loading accessible view
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef}>
      <CursorGlow />
      <Nav chapters={CHAPTERS} activeSection={activeSection} isDark={DARK_SECTIONS.has(activeSection)} />
      <Hero />
      <Origin />
      <Skills />
      <Flagships />
      <Research />
      <Philosophy />
      <Contact />
    </div>
  );
}
