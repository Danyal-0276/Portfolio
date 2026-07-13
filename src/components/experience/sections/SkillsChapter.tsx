'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import { skills } from '@/lib/projects';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[3];
const NODES = skills.slice(0, 12);

export default function SkillsChapter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const radius = 160;

      NODES.forEach((_, i) => {
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        const el = pin.querySelector(`.skill-node-${i}`);
        if (!el) return;
        gsap.set(el, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          xPercent: -50,
          yPercent: -50,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: pin,
        },
      });

      tl.from('.skills-head', { opacity: 0, y: 50, duration: 0.1 })
        .from('.skill-node', { opacity: 0, scale: 0, stagger: 0.03, duration: 0.08 }, 0.08)
        .to('.skills-orbit', { rotation: 120, duration: 0.4 }, 0.15)
        .to('.skill-node', { scale: (i) => 1 + (NODES[i]?.level ?? 80) / 200, stagger: 0.02, duration: 0.25 }, 0.35)
        .to('.skills-head', { y: -30, opacity: 0.3, duration: 0.2 }, 0.6)
        .to('.skill-node', { y: '+=80', opacity: 0.3, stagger: 0.02, duration: 0.2 }, 0.65);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="skills"
      className="chapter-track"
      data-chapter="skills"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="chapter-inner">
          <p className="chapter-tag skills-head">Chapter 03</p>
          <h2 className="chapter-title skills-head">THE<br />STACK</h2>
          <p className="chapter-body skills-head">
            Languages, frameworks, ML tooling, and infrastructure — orbiting the work I ship.
          </p>
        </div>

        <div className="skills-orbit">
          {NODES.map((s, i) => (
            <span key={s.name} className={`skill-node skill-node-${i}`} style={{ borderColor: `${chapter.accent}30` }}>
              {s.name}
            </span>
          ))}
        </div>

        <ChapterProgress trackRef={trackRef} label="STACK" />
      </div>
    </div>
  );
}
