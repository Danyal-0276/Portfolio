'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';
import ChapterProgress from '../ChapterProgress';

const chapter = CHAPTERS[4];

const METRICS = [
  { label: 'MCC', value: 0.82, color: '#10b981' },
  { label: 'AUC', value: 0.91, color: '#34d399' },
  { label: 'F1', value: 0.78, color: '#6ee7b7' },
  { label: 'ACC', value: 0.85, color: '#a7f3d0' },
  { label: 'REC', value: 0.80, color: '#059669' },
];

export default function ResearchChapter() {
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

      tl.from('.research-head', { opacity: 0, y: 50, duration: 0.1 })
        .from('.research-bar', { scaleY: 0, stagger: 0.05, duration: 0.12 }, 0.1)
        .from('.research-note', { opacity: 0, x: 40, stagger: 0.06, duration: 0.08 }, 0.15)
        .to('.research-float-doc', { y: -150, rotation: 8, x: 30, duration: 0.35 }, 0.2)
        .to('.research-head', { y: -40, opacity: 0.25, duration: 0.2 }, 0.65);
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={trackRef}
      id="research"
      className="chapter-track"
      data-chapter="research"
      style={{ height: `${chapter.scrollVh}vh`, '--chapter-accent': chapter.accent } as React.CSSProperties}
    >
      <div ref={pinRef} className="chapter-pin">
        <div className="float-layer">
          <div
            className="float-item research-float-doc"
            style={{
              top: '18%', right: '10%',
              width: 180, height: 240,
              borderRadius: 8,
              border: '1px solid rgba(16,185,129,0.2)',
              background: 'rgba(16,185,129,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(16,185,129,0.5)',
            }}
          >
            BERT BENCHMARK
          </div>
        </div>

        <div className="chapter-inner">
          <p className="chapter-tag research-head">Chapter 04</p>
          <h2 className="chapter-title research-head">RESEARCH<br />& DATA</h2>
          <p className="chapter-body research-head">
            10 transformer models evaluated on a 10K news split. Spark MLlib ensembles on CIC-IDS2017 network traffic.
          </p>

          <div className="research-bars">
            {METRICS.map((m) => (
              <div key={m.label} className="research-bar-col">
                <div
                  className="research-bar"
                  data-value={m.value}
                  style={{ height: `${m.value * 100}%`, background: m.color }}
                />
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['RoBERTa · DeBERTa · DistilBERT ensemble', 'PySpark GBT + RF intrusion pipeline', 'Gemini API desktop assistant'].map((note) => (
              <p key={note} className="research-note" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
                ◆ {note}
              </p>
            ))}
          </div>
        </div>

        <ChapterProgress trackRef={trackRef} label="RESEARCH" />
      </div>
    </div>
  );
}
