'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useCinematicScroll } from '@/lib/useCinematicScroll';
import ChromaBackground from './ChromaBackground';
import SiteHeader from './SiteHeader';
import OrbitalHero from './OrbitalHero';
import TechMarquee from './TechMarquee';
import QuoteSection from './QuoteSection';
import ProjectVoyage from './ProjectVoyage';
import ResearchDeck from './ResearchDeck';
import PhilosophySection from './PhilosophySection';
import ContactFooter from './ContactFooter';
import ScrollProgress from './ScrollProgress';
import SectionNav from './SectionNav';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicShell() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useCinematicScroll((y) => setScrolled(y > 60));

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    const loader = loaderRef.current;
    if (!main || !loader) return;

    const ctx = gsap.context(() => {
      // Quote text splits apart on scroll
      const quote = main.querySelector('.quote-text');
      if (quote) {
        gsap.fromTo(
          quote,
          { scale: 1.2, filter: 'blur(6px)' },
          {
            scale: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: { trigger: quote, start: 'top bottom', end: 'center center', scrub: 1 },
          },
        );
      }

      // Section tracking
      const sectionIds = ['#hero', '#origin', '#voyage', '#research', '#philosophy', '#contact'];
      sectionIds.forEach((id, i) => {
        const section = main.querySelector(id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(i),
          onEnterBack: () => setActiveSection(i),
        });
      });

      // Loader exit
      gsap.to(loader, {
        autoAlpha: 0,
        duration: 0.9,
        delay: 1,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          setLoaded(true);
          ScrollTrigger.refresh();
        },
      });
    }, main);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t1 = setTimeout(refresh, 400);
    const t2 = setTimeout(refresh, 1500);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div ref={loaderRef} className="intro-loader">
        <div className="intro-content">
          <motion.p
            className="intro-name"
            initial={{ letterSpacing: '0.5em', opacity: 0 }}
            animate={{ letterSpacing: '0.08em', opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            DANYAL TANVEER
          </motion.p>
          <div className="intro-bar"><div className="intro-bar-fill" /></div>
          <p className="intro-sub">Calibrating flight path</p>
        </div>
      </div>

      <div ref={mainRef} className="cinematic-app">
        <ChromaBackground />
        <ScrollProgress />
        <SiteHeader scrolled={scrolled} />
        {loaded && <SectionNav active={activeSection} />}

        <main className="cinematic-main">
          <OrbitalHero />
          <TechMarquee />
          <QuoteSection />
          <ProjectVoyage />
          <ResearchDeck />
          <PhilosophySection />
          <ContactFooter />
        </main>
      </div>
    </>
  );
}
