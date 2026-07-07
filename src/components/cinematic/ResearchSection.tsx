'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const models = [
  { name: 'DeBERTa v3', acc: 93.1, color: '#06b6d4' },
  { name: 'RoBERTa', acc: 91.5, color: '#8b5cf6' },
  { name: 'ELECTRA', acc: 91.0, color: '#14b8a6' },
  { name: 'XLM-R', acc: 90.8, color: '#c8ff00' },
  { name: 'DistilBERT', acc: 89.2, color: '#f59e0b' },
  { name: 'MobileBERT', acc: 88.0, color: '#10b981' },
];

export default function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bars = barsRef.current;
    if (!section || !bars) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bars.querySelectorAll('.research-bar'),
        { scaleY: 0 },
        {
          scaleY: 1,
          stagger: 0.06,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%' },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const max = Math.max(...models.map((m) => m.acc));

  return (
    <section id="research" ref={sectionRef} className="cine-section research-section">
      <div className="container-cine">
        <Badge className="reveal-up">Research Lab</Badge>
        <h2 className="cine-heading reveal-up">
          BERT<br /><span className="text-lime">SKYLINE</span>
        </h2>
        <p className="cine-sub reveal-up">
          10 Transformer architectures on 10K news articles — MCC, AUC-ROC, and ensemble voting.
        </p>

        <div className="research-layout">
          <div ref={barsRef} className="research-chart reveal-up">
            {models.map((m) => {
              const h = ((m.acc - 85) / (max - 85)) * 100;
              return (
                <div key={m.name} className="research-col">
                  <div
                    className="research-bar"
                    style={{ height: `${h}%`, background: `linear-gradient(180deg, ${m.color}, ${m.color}88)` }}
                  />
                  <span className="research-label">{m.acc}%</span>
                  <span className="research-name">{m.name}</span>
                </div>
              );
            })}
          </div>

          <div className="research-metrics reveal-stagger">
            {[
              { l: 'Accuracy', v: '93.1%', c: '#06b6d4' },
              { l: 'MCC Score', v: '0.841', c: '#8b5cf6' },
              { l: 'AUC-ROC', v: '0.97', c: '#c8ff00' },
              { l: 'Ensemble', v: '3-Model', c: '#f59e0b' },
            ].map((m) => (
              <div key={m.l} className="research-metric" style={{ borderColor: `${m.c}40` }}>
                <span>{m.l}</span>
                <strong style={{ color: m.c }}>{m.v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
