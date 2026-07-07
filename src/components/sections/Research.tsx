"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const modelsData = [
  { name: 'DeBERTa v3', acc: 93.1, mcc: 0.841, color: '#ff003c' },
  { name: 'RoBERTa',    acc: 91.5, mcc: 0.812, color: '#8b5cf6' },
  { name: 'XLM-R',      acc: 90.8, mcc: 0.798, color: '#06b6d4' },
  { name: 'DistilBERT', acc: 89.2, mcc: 0.765, color: '#f59e0b' },
  { name: 'MobileBERT', acc: 88.0, mcc: 0.742, color: '#10b981' },
  { name: 'BERT Base',  acc: 87.5, mcc: 0.730, color: '#6b7280' },
];

export default function Research() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(title1Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        clipPath: "inset(0 50% 0 50%)",
        duration: 1.2,
        ease: "power3.inOut",
      });
      gsap.from(title2Ref.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        clipPath: "inset(0 50% 0 50%)",
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.1,
      });
      gsap.from(subRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        yPercent: 100,
        duration: 0.9,
        ease: "power3.out",
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setBarsAnimated(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-two-col"
    >
      {/* Left Column: Bar Chart Skyline */}
      <div style={{ flex: '1 1 320px', position: 'relative', zIndex: 10 }}>
        <span className="chapter-number" style={{ display: 'block', marginBottom: '0.75rem' }}>
          Chapter V: Applied Research
        </span>

        <h2
          ref={title1Ref}
          className="text-gradient"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, clipPath: "inset(0 0% 0 0%)", marginBottom: '1rem' }}
        >
          BERT Benchmark Skyline
        </h2>

        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <p
            ref={subRef}
            style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: '1.6' }}
          >
            MCC comparison across 6 Transformer architectures on a 10K fake-news split. Hover columns to inspect metrics.
          </p>
        </div>

        {/* Column chart */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: '240px',
          background: 'rgba(255,255,255,0.01)',
          padding: '1.5rem 1rem 1rem',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          position: 'relative',
          gap: '0.5rem',
        }}>
          {/* Y-axis grid lines */}
          {[100, 75, 50, 25].map(pct => (
            <div key={pct} style={{
              position: 'absolute',
              left: '1rem',
              right: '1rem',
              bottom: `${(pct / 100) * 160 + 16}px`,
              borderTop: '1px solid rgba(255,255,255,0.04)',
              pointerEvents: 'none',
            }} />
          ))}

          {modelsData.map((model, idx) => {
            const isHovered = hoveredIdx === idx;
            // Map acc (75–95) to height 0–160px
            const heightPx = barsAnimated ? Math.max(16, (model.acc - 75) * 8) : 0;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        bottom: `${heightPx + 10}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(5,8,16,0.97)',
                        border: `1px solid ${model.color}50`,
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.72rem',
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                        boxShadow: `0 4px 16px rgba(0,0,0,0.6), 0 0 12px ${model.color}30`,
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{model.acc}% Acc</div>
                      <div style={{ color: model.color, fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>MCC: {model.mcc}</div>
                    </motion.div>
                  )}

                  {/* Bar */}
                  <div style={{
                    width: '80%',
                    height: `${heightPx}px`,
                    background: `linear-gradient(180deg, ${model.color} 0%, ${model.color}80 100%)`,
                    borderRadius: '4px 4px 0 0',
                    boxShadow: isHovered ? `0 0 20px ${model.color}60` : 'none',
                    transition: 'height 1s cubic-bezier(0.16,1,0.3,1), transform 0.2s ease, box-shadow 0.2s ease',
                    transform: isHovered ? 'scaleX(1.08)' : 'scaleX(1)',
                  }} />
                </div>

                <div style={{
                  fontSize: '0.6rem',
                  fontFamily: 'var(--font-mono)',
                  color: isHovered ? '#ffffff' : 'var(--text-muted)',
                  marginTop: '0.6rem',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  transition: 'color 0.2s ease',
                }}>
                  {model.name.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Credibility Metrics Panel */}
      <div style={{ flex: '1 1 320px', position: 'relative', zIndex: 10 }}>
        <h2
          ref={title2Ref}
          className="text-gradient"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, clipPath: "inset(0 0% 0 0%)", marginBottom: '2rem' }}
        >
          Credibility Metrics
        </h2>

        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '18px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#ff003c',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.5rem',
          }}>
            Capstone: Misinformation Indexing
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            TRAK Ensemble Outcomes
          </h3>

          {/* 2x2 Confusion Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>
            {[
              { label: 'True Positive (Real)', value: '89.4%', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', color: '#10b981' },
              { label: 'False Negative', value: '10.6%', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', color: '#f87171' },
              { label: 'False Positive', value: '7.2%', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', color: '#f87171' },
              { label: 'True Negative (Fake)', value: '92.8%', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', color: '#10b981' },
            ].map((cell, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: cell.bg,
                  border: `1px solid ${cell.border}`,
                  padding: '1rem',
                  borderRadius: '10px',
                }}
              >
                <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cell.label}</div>
                <div style={{ fontWeight: 800, color: cell.color, fontSize: '1.6rem', marginTop: '0.25rem', fontFamily: 'var(--font-heading)' }}>{cell.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Methodology notes */}
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1rem' }}>
            The TRAK ensemble uses a voting schema — RoBERTa parses syntactic structure while DeBERTa processes deep semantic signals — classifying articles as Real, Suspicious, or Fake.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['RoBERTa', 'DeBERTa v3', 'MCC', 'AUC-ROC', 'F1-micro', '10K split'].map((tag, i) => (
              <span key={i} className="tech-tag" style={{ fontSize: '0.7rem' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
