'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[0];

export default function HeroChapter() {
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

      tl.from('.hero-tag', { opacity: 0, y: 40, duration: 0.08 })
        .from('.hero-line-1', { opacity: 0, x: -80, duration: 0.1 }, 0.02)
        .from('.hero-line-2', { opacity: 0, x: 80, duration: 0.1 }, 0.06)
        .from('.hero-line-3', { opacity: 0, y: 60, duration: 0.1 }, 0.1)
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.08 }, 0.14)
        .from('.hero-stat', { opacity: 0, y: 40, stagger: 0.04, duration: 0.06 }, 0.18)
        .from('.hero-portrait-box', { opacity: 0, scale: 0.85, y: 60, duration: 0.12 }, 0.2)
        .from('.hero-cta', { opacity: 0, y: 20, stagger: 0.03, duration: 0.05 }, 0.26)
        .to('.float-orb-a', { y: -120, x: 40, rotation: 45, duration: 0.3 }, 0.1)
        .to('.float-orb-b', { y: -200, x: -60, rotation: -30, duration: 0.35 }, 0.15)
        .to('.float-orb-c', { y: -160, scale: 1.4, duration: 0.3 }, 0.2)
        .to('.hero-portrait-box', { y: -80, scale: 0.92, duration: 0.25 }, 0.45)
        .to('.hero-name', { y: -60, opacity: 0.3, duration: 0.3 }, 0.55)
        .to('.hero-stats-row', { y: -40, opacity: 0, duration: 0.2 }, 0.6)
        .to('.hero-cta', { opacity: 0, y: -30, duration: 0.15 }, 0.65);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="hero"
      className="chapter-track"
      data-chapter="hero"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="float-layer">
          <div className="float-item float-orb-a" style={{ top: '15%', left: '10%', width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(200,255,0,0.3)' }} />
          <div className="float-item float-orb-b" style={{ top: '60%', right: '20%', width: 120, height: 120, borderRadius: '50%', background: 'rgba(200,255,0,0.06)' }} />
          <div className="float-item float-orb-c" style={{ bottom: '25%', left: '35%', width: 6, height: 6, borderRadius: '50%', background: chapter.accent }} />
        </div>

        <div className="chapter-inner">
          <p className="chapter-tag hero-tag">Software Engineer · AI/ML · Full Stack</p>
          <h1 className="hero-name">
            <span className="hero-line-1">DANYAL</span>
            <span className="hero-line-2 outline">TANVEER</span>
            <span className="hero-line-3" style={{ color: chapter.accent, fontSize: '0.45em' }}>BUILDING AT THE EDGE</span>
          </h1>
          <p className="chapter-body hero-sub">
            I ship production systems — from React Native apps and Django APIs to PyTorch research pipelines and Spark-scale ML.
          </p>

          <div className="hero-stats-row">
            {[
              { n: '5+', l: 'Flagship Projects' },
              { n: '2', l: 'Live POS Clients' },
              { n: '10', l: 'BERT Models Benchmarked' },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <div className="hero-stat-num">{s.n}</div>
                <div className="hero-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="btn-row">
            <a href="#projects" className="btn btn-lime hero-cta">VIEW WORK</a>
            <a href="#contact" className="btn btn-ghost hero-cta">GET IN TOUCH</a>
          </div>
        </div>

        <div className="hero-portrait-box">
          <Image src="/textures/portrait.png" alt="Danyal Tanveer" width={300} height={380} priority />
        </div>

        <ChapterProgress trackRef={trackRef} label="INTRO" />
      </div>
    </div>
  );
}
