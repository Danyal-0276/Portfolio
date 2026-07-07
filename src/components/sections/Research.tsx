"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const models = [
  { name: "DeBERTa v3", acc: 93.1, mcc: 0.841, color: "#06b6d4" },
  { name: "RoBERTa",    acc: 91.5, mcc: 0.812, color: "#8b5cf6" },
  { name: "ELECTRA",    acc: 91.0, mcc: 0.805, color: "#14b8a6" },
  { name: "XLM-R",      acc: 90.8, mcc: 0.798, color: "#e63946" },
  { name: "BERT Large", acc: 88.9, mcc: 0.758, color: "#ec4899" },
  { name: "DistilBERT", acc: 89.2, mcc: 0.765, color: "#f59e0b" },
  { name: "MobileBERT", acc: 88.0, mcc: 0.742, color: "#10b981" },
  { name: "BERT Base",  acc: 87.5, mcc: 0.730, color: "#6366f1" },
  { name: "ALBERT",     acc: 86.4, mcc: 0.718, color: "#f97316" },
  { name: "LongFormer", acc: 87.1, mcc: 0.724, color: "#a78bfa" },
];

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef   = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const maxAcc = Math.max(...models.map(m => m.acc));

  const runBars = useCallback(() => {
    if (!chartRef.current) return;
    const bars = chartRef.current.querySelectorAll<HTMLDivElement>(".res-bar");
    gsap.fromTo(bars,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.1, ease: "power3.out", stagger: 0.05, transformOrigin: "bottom center" }
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: "top 68%", onEnter: runBars });
    }, sectionRef);
    return () => ctx.revert();
  }, [runBars]);

  return (
    <section ref={sectionRef} className="section section-light section-pad" data-section="4">
      <div className="container">

        <div style={{ marginBottom: "4rem" }}>
          <div className="label" data-up style={{ marginBottom: "0.75rem" }}>Chapter V — Research</div>
          <h2 data-up style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--stone-900)", lineHeight: 1.05 }}>
            BERT Benchmark<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-soft))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Skyline.</span>
          </h2>
          <p data-up style={{ fontSize: "0.95rem", color: "var(--stone-500)", maxWidth: "520px", marginTop: "1rem", lineHeight: 1.75 }}>
            10 Transformer architectures benchmarked on 10,000 news articles. Hover bars to see MCC scores.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: "start", gap: "4rem" }}>

          {/* Chart */}
          <div data-left>
            <div ref={chartRef} style={{
              display: "flex", alignItems: "flex-end", gap: "0.5rem",
              height: "260px", padding: "1.5rem 1rem 0.75rem",
              background: "#fff", borderRadius: "16px",
              border: "1px solid var(--stone-200)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
              position: "relative",
            }}>
              {models.map((m, i) => {
                const h = Math.max(14, ((m.acc - 85) / (maxAcc - 85)) * 190);
                const isHov = hovered === i;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                    {isHov && (
                      <div style={{
                        position: "absolute", bottom: `${h + 8}px`, left: "50%", transform: "translateX(-50%)",
                        background: "var(--stone-900)", color: "#fff", borderRadius: "8px",
                        padding: "0.45rem 0.65rem", fontSize: "0.66rem",
                        fontFamily: "var(--font-mono)", whiteSpace: "nowrap", zIndex: 20,
                        border: `1px solid ${m.color}50`,
                        boxShadow: `0 4px 16px ${m.color}40`,
                      }}>
                        <div style={{ fontWeight: 700, color: m.color }}>{m.acc}% acc</div>
                        <div style={{ color: "var(--stone-400)", marginTop: 1 }}>MCC {m.mcc}</div>
                      </div>
                    )}
                    <div className="res-bar" style={{
                      width: "80%", height: h,
                      background: `linear-gradient(180deg, ${m.color} 0%, ${m.color}90 100%)`,
                      borderRadius: "4px 4px 0 0",
                      boxShadow: isHov ? `0 0 20px ${m.color}70` : `0 0 6px ${m.color}25`,
                      transition: "box-shadow 0.2s, transform 0.15s",
                      transform: isHov ? "scaleX(1.12)" : "scaleX(1)",
                      cursor: "pointer",
                    }} />
                    <div style={{
                      marginTop: "0.3rem", fontFamily: "var(--font-mono)", fontSize: "0.5rem",
                      color: isHov ? "var(--stone-900)" : "var(--stone-400)",
                      textAlign: "center", writingMode: "vertical-rl", transform: "rotate(180deg)",
                      height: "44px", overflow: "hidden", transition: "color 0.2s",
                    }}>
                      {m.name.split(" ")[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metrics */}
          <div data-right>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", color: "var(--stone-900)", marginBottom: "0.5rem" }}>
              TRAK Ensemble Results
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--stone-500)", marginBottom: "2rem", lineHeight: 1.7 }}>
              3-model majority-vote: RoBERTa (syntax) · DeBERTa (semantics) · XGBoost tiebreaker.
            </p>

            <div data-stagger style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { l: "Accuracy",       v: "93.1%", color: "#06b6d4", bg: "rgba(6,182,212,0.06)",   border: "rgba(6,182,212,0.2)"   },
                { l: "MCC Score",      v: "0.841", color: "#8b5cf6", bg: "rgba(99,102,241,0.06)",  border: "rgba(99,102,241,0.2)"  },
                { l: "True Neg (Fake)",v: "92.8%", color: "#10b981", bg: "rgba(16,185,129,0.06)",  border: "rgba(16,185,129,0.2)"  },
                { l: "AUC-ROC",        v: "0.97",  color: "#f59e0b", bg: "rgba(245,158,11,0.06)",  border: "rgba(245,158,11,0.2)"  },
              ].map((m, i) => (
                <div key={i} style={{ background: m.bg, border: `1px solid ${m.border}`, borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--stone-500)", fontFamily: "var(--font-mono)", marginBottom: "0.3rem" }}>{m.l}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 700, color: m.color, letterSpacing: "-0.03em" }}>{m.v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["RoBERTa","DeBERTa v3","PyTorch","10K articles","MCC","AUC-ROC","F1-micro","Voting Ensemble"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
