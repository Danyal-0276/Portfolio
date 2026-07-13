'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[6];

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Danyal-0276', sub: '@Danyal-0276' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/danyal-tanveer', sub: 'Connect professionally' },
  { label: 'Email', href: 'mailto:danyaltanveer.dev@gmail.com', sub: 'danyaltanveer.dev@gmail.com' },
  { label: 'Resume', href: '/resume/Danyal_Tanveer-Resume.pdf', sub: 'Download PDF' },
];

export default function ContactChapter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: pin,
        },
      });

      tl.from('.contact-head', { opacity: 0, y: 50, duration: 0.1 })
        .from('.contact-card', { opacity: 0, y: 60, rotation: 3, stagger: 0.05, duration: 0.1 }, 0.1)
        .to('.contact-float', { y: -120, x: 40, rotation: 20, duration: 0.35 }, 0.2)
        .to('.contact-card', { y: -20, stagger: 0.03, duration: 0.25 }, 0.45)
        .to('.contact-head', { y: -30, opacity: 0.4, duration: 0.2 }, 0.6);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="contact"
      className="chapter-track"
      data-chapter="contact"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="float-layer">
          <div
            className="float-item contact-float"
            style={{
              top: '12%', right: '15%',
              width: 100, height: 100,
              borderRadius: '50%',
              border: `1px solid ${chapter.accent}50`,
              background: `${chapter.accent}10`,
            }}
          />
        </div>

        <div className="chapter-inner">
          <p className="chapter-tag contact-head">Chapter 06</p>
          <h2 className="chapter-title contact-head">LET&apos;S<br />BUILD</h2>
          <p className="chapter-body contact-head">
            Open to internships, collaborations, and ambitious projects. Reach out — I respond fast.
          </p>

          <div className="contact-cards">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="contact-card">
                <strong>{l.label}</strong>
                <span>{l.sub}</span>
              </a>
            ))}
          </div>

          <p style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)' }}>
            © 2025 DANYAL TANVEER — BUILT WITH NEXT.JS + GSAP
          </p>
        </div>

        <ChapterProgress trackRef={trackRef} label="CONTACT" />
      </div>
    </div>
  );
}
