'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import { projects } from '@/lib/projects';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[2];

export default function ProjectsChapter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>('.project-beat');

      const worldBg = document.querySelector('.world-bg');
      const worldOrb1 = document.querySelector('.world-orb-1');
      const worldOrb2 = document.querySelector('.world-orb-2');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: pin,
        },
      });

      tl.from('.projects-intro', { opacity: 0, y: 60, duration: 0.06 });

      const beatDur = 0.16;
      beats.forEach((beat, i) => {
        const card = beat.querySelector('.project-card');
        const info = beat.querySelector('.project-info');
        const start = 0.08 + i * beatDur;

        tl.set(beat, { visibility: 'visible', autoAlpha: i === 0 ? 1 : 0 }, start);
        if (i > 0) {
          tl.to(beats[i - 1], { autoAlpha: 0, y: -80, duration: beatDur * 0.3 }, start);
        }
        tl.fromTo(beat, { autoAlpha: 0, y: 120 }, { autoAlpha: 1, y: 0, duration: beatDur * 0.4 }, start);
        if (card) tl.fromTo(card, { y: 80, rotation: 4 }, { y: 0, rotation: 0, duration: beatDur * 0.4 }, start);
        if (info) tl.fromTo(info, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: beatDur * 0.35 }, start + 0.02);
        tl.to(beat, { y: -40, duration: beatDur * 0.25 }, start + beatDur * 0.65);
      });

      tl.to('.projects-intro', { opacity: 0, y: -40, duration: 0.08 }, 0.06);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="projects"
      className="chapter-track"
      data-chapter="projects"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="projects-intro" style={{ position: 'absolute', top: '6rem', left: '2rem', zIndex: 3 }}>
          <p className="chapter-tag">Chapter 02</p>
          <h2 className="chapter-title">SELECTED<br />WORK</h2>
        </div>

        {projects.map((p, i) => (
          <div
            key={p.id}
            className="project-beat"
            data-project-beat
            data-accent={p.accentColor}
            data-bg={i % 2 === 0 ? '#060810' : '#0a0814'}
            style={{ visibility: i === 0 ? 'visible' : 'hidden', opacity: i === 0 ? 1 : 0 }}
          >
            <div className="project-stage">
              <div className="project-card">
                {p.screenshots[0] ? (
                  <div className="project-card-img">
                    <Image src={p.screenshots[0]} alt={p.title} fill sizes="(max-width:900px) 90vw, 500px" />
                  </div>
                ) : (
                  <div className="project-card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', color: p.accentColor }}>
                    {p.title.split(' ')[0]}
                  </div>
                )}
                <div className="project-card-body">
                  <h3>{p.title}</h3>
                  <p>{p.tagline}</p>
                </div>
              </div>

              <div className="project-info">
                <h3 style={{ color: p.accentColor }}>{p.title}</h3>
                <p className="project-tagline" style={{ color: p.accentColor }}>{p.tagline}</p>
                <p className="project-desc">{p.description}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} style={{ borderColor: `${p.accentColor}40`, color: p.accentColor }}>{t}</span>
                  ))}
                </div>
                {Object.entries(p.links).map(([k, url]) => (
                  <a key={k} href={url} target="_blank" rel="noopener" className="project-link" style={{ color: p.accentColor }}>
                    VIEW {k.toUpperCase()} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}

        <ChapterProgress trackRef={trackRef} label="PROJECTS" />
      </div>
    </div>
  );
}
