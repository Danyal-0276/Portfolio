'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[1];

const TIMELINE = [
  { year: '2020', title: 'First Code', text: 'Started with vanilla JS mini-projects — calculators, weather apps, quizzes. Learned the browser from the ground up.' },
  { year: '2022', title: 'Full Stack', text: 'Moved into React, Django, and mobile with Kotlin. Built real apps that people could actually use.' },
  { year: '2024', title: 'AI & Research', text: 'Deep learning capstone with BERT ensembles, Spark MLlib for intrusion detection, Gemini-powered assistants.' },
  { year: '2025', title: 'Production', text: 'POS ecosystem deployed to live restaurant clients. TRAK credibility platform shipped end-to-end.' },
];

export default function OriginChapter() {
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

      tl.from('.origin-head', { opacity: 0, y: 50, duration: 0.1 })
        .from('.origin-line', { opacity: 0, x: -60, stagger: 0.08, duration: 0.1 }, 0.08)
        .to('.origin-float-ring', { rotation: 180, scale: 1.3, y: -100, duration: 0.35 }, 0.15)
        .to('.origin-line', { y: (i) => -30 * (i + 1), opacity: (i) => (i < 2 ? 1 : 0.4), stagger: 0.05, duration: 0.3 }, 0.35)
        .to('.origin-line:nth-child(3)', { opacity: 1, x: 0, duration: 0.15 }, 0.55)
        .to('.origin-line:nth-child(4)', { opacity: 1, x: 0, duration: 0.15 }, 0.7)
        .to('.origin-head', { y: -40, opacity: 0.2, duration: 0.2 }, 0.75);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="origin"
      className="chapter-track"
      data-chapter="origin"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="float-layer">
          <div
            className="float-item origin-float-ring"
            style={{
              top: '20%', right: '12%',
              width: 200, height: 200,
              borderRadius: '50%',
              border: `1px solid ${chapter.accent}40`,
            }}
          />
        </div>

        <div className="chapter-inner">
          <p className="chapter-tag origin-head">Chapter 01</p>
          <h2 className="chapter-title origin-head">WHERE IT<br />STARTED</h2>
          <p className="chapter-body origin-head">
            From browser fundamentals to production deployments — every project built the next layer of skill.
          </p>

          <div className="origin-lines">
            {TIMELINE.map((item) => (
              <div key={item.year} className="origin-line">
                <span className="origin-year">{item.year}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChapterProgress trackRef={trackRef} label="ORIGIN" />
      </div>
    </div>
  );
}
