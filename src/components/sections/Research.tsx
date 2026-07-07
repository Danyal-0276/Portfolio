"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const models = [
  { name: "DeBERTa v3", acc: 93.1, mcc: 0.841, color: "#06b6d4" },
  { name: "RoBERTa",    acc: 91.5, mcc: 0.812, color: "#8b5cf6" },
  { name: "XLM-R",      acc: 90.8, mcc: 0.798, color: "#e63946" },
  { name: "DistilBERT", acc: 89.2, mcc: 0.765, color: "#f59e0b" },
  { name: "MobileBERT", acc: 88.0, mcc: 0.742, color: "#10b981" },
  { name: "BERT Base",  acc: 87.5, mcc: 0.730, color: "#6366f1" },
  { name: "BERT Large", acc: 88.9, mcc: 0.758, color: "#ec4899" },
  { name: "ALBERT",     acc: 86.4, mcc: 0.718, color: "#f97316" },
  { name: "ELECTRA",    acc: 91.0, mcc: 0.805, color: "#14b8a6" },
  { name: "LongFormer", acc: 87.1, mcc: 0.724, color: "#a78bfa" },
];

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        onEnter: () => setAnimated(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate bars when visible
  useEffect(() => {
    if (!animated || !chartRef.current) return;
    const bars = chartRef.current.querySelectorAll<HTMLDivElement>(".research-bar");
    gsap.fromTo(
      bars,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, duration: 1, ease: "power3.out", stagger: 0.06 }
    );
  }, [animated]);

  const maxAcc = Math.max(...models.map((m) => m.acc));

  return (
    <section
      ref={sectionRef}
      className="section section-light section-padding"
      data-section="4"
    >
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <div className="label-mono reveal-up" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
            Chapter V — Research
          </div>
          <h2 className="heading-large reveal-up" style={{ color: "var(--stone-900)" }}>
            BERT Benchmark<br />
            <span className="text-gradient-accent">Skyline.</span>
          </h2>
          <p className="body-text reveal-up" style={{ maxWidth: "520px", marginTop: "1.25rem" }}>
            10 Transformer architectures benchmarked on a 10,000-article fake-news split.
            Hover each bar to inspect MCC scores.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: "start", gap: "4rem" }}>

          {/* Left: Bar chart */}
          <div className="reveal-left">
            <div
              ref={chartRef}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "0.6rem",
                height: "260px",
                padding: "1.5rem 1rem 1rem",
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid var(--stone-200)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* Y-axis grid */}
              {[25, 50, 75, 100].map((pct) => (
                <div key={pct} style={{
                  position: "absolute",
                  left: "1rem",
                  right: "1rem",
                  bottom: `${pct * 1.8 + 16}px`,
                  borderTop: "1px dashed var(--stone-100)",
                  pointerEvents: "none",
                }}>
                  <span style={{
                    position: "absolute",
                    left: "-2.5rem",
                    top: "-8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--stone-300)",
                  }}>
                    {(75 + pct * 0.2).toFixed(0)}%
                  </span>
                </div>
              ))}

              {models.map((m, i) => {
                const heightPct = ((m.acc - 85) / (maxAcc - 85)) * 100;
                const isHov = hovered === i;
                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Tooltip */}
                    {isHov && (
                      <div style={{
                        position: "absolute",
                        bottom: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--stone-900)",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "0.5rem 0.65rem",
                        fontSize: "0.68rem",
                        whiteSpace: "nowrap",
                        zIndex: 20,
                        fontFamily: "var(--font-mono)",
                        boxShadow: `0 4px 16px ${m.color}40`,
                        border: `1px solid ${m.color}40`,
                        pointerEvents: "none",
                      }}>
                        <div style={{ fontWeight: 700, color: m.color }}>{m.acc}% acc</div>
                        <div style={{ color: "var(--stone-400)", marginTop: "1px" }}>MCC {m.mcc}</div>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      className="research-bar"
                      style={{
                        width: "80%",
                        height: `${Math.max(12, heightPct * 1.8)}px`,
                        background: `linear-gradient(180deg, ${m.color} 0%, ${m.color}90 100%)`,
                        borderRadius: "4px 4px 0 0",
                        boxShadow: isHov ? `0 0 20px ${m.color}60` : `0 0 6px ${m.color}20`,
                        transition: "box-shadow 0.2s, transform 0.2s",
                        transform: isHov ? "scaleX(1.1)" : "scaleX(1)",
                        cursor: "pointer",
                      }}
                    />

                    {/* Label */}
                    <div style={{
                      marginTop: "0.4rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      color: isHov ? "var(--stone-900)" : "var(--stone-400)",
                      textAlign: "center",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      height: "52px",
                      lineHeight: 1.2,
                      overflow: "hidden",
                      transition: "color 0.2s",
                    }}>
                      {m.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: TRAK ensemble results */}
          <div className="reveal-right">
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "var(--stone-900)",
              marginBottom: "0.5rem",
            }}>
              TRAK Ensemble Results
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--stone-500)", marginBottom: "2rem", lineHeight: 1.65 }}>
              3-model majority-vote classifier combining RoBERTa (syntax parsing), DeBERTa (semantic depth), and a custom XGBoost tiebreaker.
            </p>

            {/* 2x2 metric grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { label: "Accuracy", value: "93.1%", color: "#06b6d4", bg: "rgba(6,182,212,0.06)", border: "rgba(6,182,212,0.2)" },
                { label: "MCC Score", value: "0.841", color: "#8b5cf6", bg: "rgba(99,102,241,0.06)", border: "rgba(99,102,241,0.2)" },
                { label: "True Negative (Fake)", value: "92.8%", color: "#10b981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.2)" },
                { label: "AUC-ROC", value: "0.97", color: "#f59e0b", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)" },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: m.bg,
                    border: `1px solid ${m.border}`,
                    borderRadius: "12px",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ fontSize: "0.7rem", color: "var(--stone-500)", fontFamily: "var(--font-mono)", marginBottom: "0.35rem" }}>
                    {m.label}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: m.color,
                    letterSpacing: "-0.03em",
                  }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Methodology tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["RoBERTa", "DeBERTa v3", "PyTorch", "10K articles", "MCC", "AUC-ROC", "F1-micro", "Voting Ensemble"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
