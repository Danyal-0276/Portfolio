'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';

const models = [
  { name: 'DeBERTa v3', acc: 93.1, color: '#06b6d4' },
  { name: 'RoBERTa', acc: 91.5, color: '#8b5cf6' },
  { name: 'ELECTRA', acc: 91.0, color: '#14b8a6' },
  { name: 'XLM-R', acc: 90.8, color: '#c8ff00' },
  { name: 'DistilBERT', acc: 89.2, color: '#f59e0b' },
  { name: 'MobileBERT', acc: 88.0, color: '#10b981' },
];

export default function ResearchDeck() {
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const layerY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.deck-card');

      // Fan out cards on scroll
      cards.forEach((card, i) => {
        const spread = (i - (cards.length - 1) / 2) * 28;
        gsap.fromTo(
          card,
          { x: 0, y: 200, rotation: 0, scale: 0.6, autoAlpha: 0 },
          {
            x: spread,
            y: -i * 12,
            rotation: spread * 0.4,
            scale: 1,
            autoAlpha: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1,
            },
          },
        );
      });

      // Bars grow
      gsap.fromTo(
        '.deck-bar',
        { scaleY: 0 },
        {
          scaleY: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 55%' },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const max = Math.max(...models.map((m) => m.acc));

  return (
    <section id="research" ref={sectionRef} className="research-deck">
      <motion.div className="research-deck-bg" style={{ y: layerY }} aria-hidden />

      <div className="container-cine">
        <Badge>Research Lab</Badge>
        <h2 className="cine-heading">BERT<br /><span className="text-lime">DECK</span></h2>
        <p className="cine-sub">Cards fan out as you arrive — benchmark skyline builds behind.</p>

        <div ref={deckRef} className="deck-stage">
          {models.map((m, i) => (
            <motion.div
              key={m.name}
              className="deck-card"
              style={{ zIndex: models.length - i, '--card-color': m.color } as CSSProperties}
              whileHover={{ y: -20, scale: 1.05, rotate: 0, zIndex: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="deck-card-acc">{m.acc}%</span>
              <span className="deck-card-name">{m.name}</span>
              <div className="deck-card-bar" style={{ height: `${((m.acc - 85) / (max - 85)) * 100}%`, background: m.color }} />
            </motion.div>
          ))}
        </div>

        <div className="deck-chart">
          {models.map((m) => {
            const h = ((m.acc - 85) / (max - 85)) * 100;
            return (
              <div key={m.name} className="deck-col">
                <div className="deck-bar" style={{ height: `${h}%`, background: `linear-gradient(180deg, ${m.color}, ${m.color}66)` }} />
                <span>{m.acc}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
