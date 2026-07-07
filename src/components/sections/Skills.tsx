"use client";
import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "JavaScript / TypeScript", level: 95, cat: "Languages", color: "#e63946" },
  { name: "Python",                  level: 90, cat: "Languages", color: "#e63946" },
  { name: "Kotlin / SQL / C++",      level: 76, cat: "Languages", color: "#e63946" },
  { name: "Next.js 16",              level: 93, cat: "Frameworks", color: "#6366f1" },
  { name: "React / React Native",    level: 91, cat: "Frameworks", color: "#6366f1" },
  { name: "Django / Express",        level: 86, cat: "Frameworks", color: "#6366f1" },
  { name: "HuggingFace Transformers",level: 83, cat: "AI / ML", color: "#2ec4b6" },
  { name: "PyTorch",                 level: 80, cat: "AI / ML", color: "#2ec4b6" },
  { name: "Apache Spark",            level: 76, cat: "AI / ML", color: "#2ec4b6" },
  { name: "MongoDB / PostgreSQL",    level: 88, cat: "Databases", color: "#e9c46a" },
  { name: "Redis",                   level: 79, cat: "Databases", color: "#e9c46a" },
];
const cats = ["Languages", "Frameworks", "AI / ML", "Databases"];

export default function Skills() {
  const [cat, setCat] = useState("Languages");
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => skills.filter(s => s.cat === cat), [cat]);
  const color = filtered[0]?.color ?? "#e63946";

  const animateBars = useCallback(() => {
    if (!barsRef.current) return;
    const fills = barsRef.current.querySelectorAll<HTMLDivElement>(".skill-bar-fill");
    gsap.fromTo(fills,
      { width: "0%" },
      { width: (i: number) => `${filtered[i]?.level ?? 0}%`, duration: 1.1, ease: "power3.out", stagger: 0.07 }
    );
  }, [filtered]);

  // Animate on category change
  useEffect(() => { animateBars(); }, [animateBars]);

  // Animate on scroll enter
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: animateBars,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [animateBars]);

  return (
    <section ref={sectionRef} className="section section-warm section-pad" data-section="2">
      <div className="container-sm">

        <div style={{ marginBottom: "4rem" }}>
          <div className="label" data-up style={{ marginBottom: "0.75rem" }}>Chapter III — Stack</div>
          <h2 data-up style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--stone-900)", lineHeight: 1.05 }}>
            Tools of the<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-soft))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>trade.</span>
          </h2>
        </div>

        {/* Category pills */}
        <div data-up style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {cats.map(c => {
            const catColor = skills.find(s => s.cat === c)?.color ?? "#e63946";
            const active = cat === c;
            return (
              <button key={c} type="button" onClick={() => setCat(c)}
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.82rem",
                  padding: "0.52rem 1.2rem", borderRadius: "100px",
                  border: `1.5px solid ${active ? catColor : "var(--stone-300)"}`,
                  background: active ? catColor : "transparent",
                  color: active ? "#fff" : "var(--stone-600)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: active ? `0 4px 14px ${catColor}40` : "none",
                }}>
                {c}
              </button>
            );
          })}
        </div>

        {/* Skill bars */}
        <div ref={barsRef} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {filtered.map((s, i) => (
            <div key={`${cat}-${i}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "0.95rem", color: "var(--stone-800)" }}>{s.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 600, color, background: `${color}12`, padding: "0.1rem 0.45rem", borderRadius: 4 }}>
                  {s.level}%
                </span>
              </div>
              <div className="progress-track">
                <div className="skill-bar-fill progress-fill" style={{ width: "0%", background: `linear-gradient(90deg, ${color}90, ${color})`, boxShadow: `0 0 8px ${color}40` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div data-fade style={{ marginTop: "5rem" }}>
          <div className="marquee-wrap">
            <div className="marquee-inner">
              {[...skills, ...skills].map((s, i) => (
                <span key={i} className="tag" style={{ flexShrink: 0 }}>{s.name}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
