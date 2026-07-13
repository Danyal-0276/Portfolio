'use client';

import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Code2, Mail } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MagneticCard from './MagneticCard';

gsap.registerPlugin(ScrollTrigger);

export default function OrbitalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const portraitX = useTransform(springX, [-1, 1], [-18, 18]);
  const portraitY = useTransform(springY, [-1, 1], [-12, 12]);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    if (!section || !orbit) return;

    const ctx = gsap.context(() => {
      // Continuous orbit spin
      gsap.to(orbit, { rotation: 360, duration: 40, ease: 'none', repeat: -1 });

      // Intro slam
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .from('.hero-badge', { y: 50, autoAlpha: 0, duration: 0.7 })
        .from('.hero-char', { y: '120%', rotateX: -40, autoAlpha: 0, duration: 1, stagger: 0.04 }, '-=0.2')
        .from('.orbit-card', { scale: 0, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(2)' }, '-=0.6')
        .from('.hero-portrait-wrap', { scale: 0.7, autoAlpha: 0, duration: 1.1 }, '-=0.8');

      // Cards BREAK orbit and FLY toward voyage on scroll
      const cards = gsap.utils.toArray<HTMLElement>('.orbit-card');
      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        gsap.to(card, {
          x: Math.cos(angle) * window.innerWidth * 0.55,
          y: Math.sin(angle) * window.innerHeight * 0.45 + 400,
          rotation: (Math.random() - 0.5) * 60,
          scale: 0.4,
          autoAlpha: 0,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });

      // Title parallax split
      gsap.to('.hero-title-block', {
        y: -120,
        scale: 0.85,
        autoAlpha: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="orbital-hero"
      onMouseMove={onMouseMove}
    >
      <div className="hero-center-glow" aria-hidden />

      {/* Orbiting project cards */}
      <div ref={orbitRef} className="orbit-ring">
        {projects.map((p, i) => {
          const angle = (i / projects.length) * 360;
          return (
            <MagneticCard
              key={p.id}
              className="orbit-card"
              glow={p.accentColor}
              depth={10}
              style={{
                '--orbit-angle': `${angle}deg`,
                '--accent': p.accentColor,
              } as CSSProperties}
            >
              <div className="orbit-card-inner">
                {p.screenshots[0] ? (
                  <Image src={p.screenshots[0]} alt="" fill sizes="120px" className="object-cover" />
                ) : (
                  <span className="orbit-fallback">{p.title[0]}</span>
                )}
              </div>
              <span className="orbit-label">{p.title.split('—')[0].trim()}</span>
            </MagneticCard>
          );
        })}
      </div>

      <div className="hero-title-block">
        <Badge className="hero-badge">Final-Year CS · UCP · 2026</Badge>
        <h1 className="hero-mega-title">
          {'DANYAL TANVEER'.split('').map((char, i) => (
            <span key={i} className="hero-char-wrap">
              <span className="hero-char">{char === ' ' ? '\u00A0' : char}</span>
            </span>
          ))}
        </h1>
        <p className="hero-tagline">Full-Stack Engineer · NLP/ML Researcher</p>
        <div className="hero-actions">
          <Button asChild size="lg"><a href="#voyage">Enter The Voyage</a></Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/resume/Danyal_Tanveer-Resume.pdf" download>CV</a>
          </Button>
        </div>
      </div>

      <motion.div className="hero-portrait-wrap" style={{ x: portraitX, y: portraitY }}>
        <MagneticCard className="hero-portrait-card" depth={8} glow="#c8ff00">
          <Image src="/textures/portrait.png" alt="Danyal Tanveer" width={300} height={380} className="hero-portrait-img" priority />
        </MagneticCard>
      </motion.div>

      <div className="hero-scroll-hint">
        <span>Scroll — cards detach &amp; fly</span>
        <ArrowDown className="hero-scroll-icon" />
      </div>

      <div className="hero-social">
        <a href="mailto:danyaltanveer0276@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></a>
        <a href="https://github.com/Danyal-0276" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Code2 className="h-4 w-4" /></a>
      </div>
    </section>
  );
}
