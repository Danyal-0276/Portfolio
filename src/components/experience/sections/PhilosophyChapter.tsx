'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[5];

const QUOTES = [
  'Ship fast, measure everything, iterate on real feedback.',
  'The best interface is the one that gets out of the way.',
  'Research without production is theory. Production without research is guesswork.',
];

export default function PhilosophyChapter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const quotes = gsap.utils.toArray<HTMLElement>('.phil-quote');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: pin,
        },
      });

      tl.from('.phil-head', { opacity: 0, y: 50, duration: 0.1 });

      quotes.forEach((q, i) => {
        const start = 0.1 + i * 0.22;
        if (i > 0) tl.to(quotes[i - 1], { opacity: 0, y: -60, duration: 0.1 }, start);
        tl.fromTo(q, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.12 }, start);
        tl.to(q, { y: -30, duration: 0.08 }, start + 0.14);
      });

      tl.to('.phil-head', { opacity: 0.2, y: -40, duration: 0.15 }, 0.7);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="philosophy"
      className="chapter-track"
      data-chapter="philosophy"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="chapter-inner">
          <p className="chapter-tag phil-head">Chapter 05</p>
          <h2 className="chapter-title phil-head">HOW I<br />THINK</h2>

          <div style={{ position: 'relative', minHeight: 200, marginTop: '2rem' }}>
            {QUOTES.map((q, i) => (
              <p
                key={q}
                className="philosophy-quote phil-quote"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: 0,
                  opacity: i === 0 ? 1 : 0,
                  color: i === 1 ? chapter.accent : '#fff',
                }}
              >
                &ldquo;{q}&rdquo;
              </p>
            ))}
          </div>
        </div>

        <div className="marquee-band" style={{ position: 'absolute', bottom: '5rem', left: 0, right: 0 }}>
          <div className="marquee-track">
            {[...Array(2)].map((_, gi) => (
              <span key={gi}>
                BUILD · SHIP · MEASURE · ITERATE · LEARN · DEPLOY · RESEARCH · SCALE ·
              </span>
            ))}
          </div>
        </div>

        <ChapterProgress trackRef={trackRef} label="MINDSET" />
      </div>
    </div>
  );
}
