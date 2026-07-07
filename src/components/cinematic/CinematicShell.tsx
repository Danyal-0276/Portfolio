'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import AnimatedBackground from './AnimatedBackground';
import SiteHeader from './SiteHeader';
import HeroSection from './HeroSection';
import TechMarquee from './TechMarquee';
import QuoteSection from './QuoteSection';
import HorizontalGallery from './HorizontalGallery';
import SplitPanels from './SplitPanels';
import ProjectShowcase from './ProjectShowcase';
import ResearchSection from './ResearchSection';
import PhilosophySection from './PhilosophySection';
import ContactFooter from './ContactFooter';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicShell() {
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      setScrolled(scroll > 80);
    });

    const loadTimer = setTimeout(() => {
      setReady(true);
      ScrollTrigger.refresh();
    }, 1600);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        const delay = parseFloat(el.dataset.delay ?? '0');
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
        const delay = parseFloat(el.dataset.delay ?? '0');
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach((container) => {
        const children = Array.from(container.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: container, start: 'top 82%', toggleActions: 'play none none none' },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('.hero-line, .hero-badge, .hero-sub, .hero-desc, .hero-actions, .hero-stats, .hero-scroll-hint, .hero-social').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: parseFloat(el.dataset.delay ?? '0') + 0.2 });
      });

      ScrollTrigger.refresh();
    }, mainRef);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [ready]);

  if (!ready) {
    return (
      <div className="intro-loader">
        <AnimatedBackground />
        <div className="intro-content">
          <p className="intro-name">DANYAL TANVEER</p>
          <div className="intro-bar"><div className="intro-bar-fill" /></div>
          <p className="intro-sub">Loading cinematic experience</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="cinematic-app">
      <AnimatedBackground />
      <SiteHeader scrolled={scrolled} />
      <main className="cinematic-main">
        <HeroSection />
        <TechMarquee />
        <QuoteSection />
        <HorizontalGallery />
        <SplitPanels />
        <ProjectShowcase />
        <ResearchSection />
        <PhilosophySection />
        <ContactFooter />
      </main>
    </div>
  );
}
