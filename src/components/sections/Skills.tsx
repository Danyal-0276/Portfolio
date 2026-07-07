"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "JavaScript", level: 95, cat: "Languages", color: "#e63946" },
  { name: "TypeScript", level: 90, cat: "Languages", color: "#e63946" },
  { name: "Python", level: 90, cat: "Languages", color: "#e63946" },
  { name: "Kotlin", level: 75, cat: "Languages", color: "#e63946" },
  { name: "SQL / C++", level: 78, cat: "Languages", color: "#e63946" },

  { name: "Next.js 15", level: 92, cat: "Frameworks", color: "#6366f1" },
  { name: "React / Native", level: 90, cat: "Frameworks", color: "#6366f1" },
  { name: "Django / DRF", level: 85, cat: "Frameworks", color: "#6366f1" },
  { name: "Express.js", level: 87, cat: "Frameworks", color: "#6366f1" },

  { name: "PyTorch", level: 80, cat: "AI / ML", color: "#2ec4b6" },
  { name: "HuggingFace Transformers", level: 82, cat: "AI / ML", color: "#2ec4b6" },
  { name: "BERT Ensemble", level: 85, cat: "AI / ML", color: "#2ec4b6" },
  { name: "Apache Spark", level: 75, cat: "AI / ML", color: "#2ec4b6" },

  { name: "MongoDB", level: 88, cat: "Databases", color: "#e9c46a" },
  { name: "PostgreSQL", level: 82, cat: "Databases", color: "#e9c46a" },
  { name: "Redis", level: 78, cat: "Databases", color: "#e9c46a" },
];

const categories = ["Languages", "Frameworks", "AI / ML", "Databases"];

export default function Skills() {
  const [activeCat, setActiveCat] = useState("Languages");
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const filtered = skills.filter((s) => s.cat === activeCat);
  const accentColor = filtered[0]?.color ?? "#e63946";

  // Animate bars on category change
  useEffect(() => {
    if (!barsRef.current) return;
    const fills = barsRef.current.querySelectorAll<HTMLDivElement>(".skill-fill");
    gsap.fromTo(
      fills,
      { width: "0%" },
      {
        width: (i) => `${filtered[i]?.level ?? 0}%`,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.07,
      }
    );
  }, [activeCat]);

  // Animate bars on scroll enter
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          const fills = barsRef.current?.querySelectorAll<HTMLDivElement>(".skill-fill");
          if (!fills) return;
          gsap.fromTo(fills, { width: "0%" }, {
            width: (i) => `${filtered[i]?.level ?? 0}%`,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.07,
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-warm section-padding"
      data-section="2"
    >
      <div className="container-narrow">

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <div className="label-mono reveal-up" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
            Chapter III — Stack
          </div>
          <h2 className="heading-large reveal-up" style={{ color: "var(--stone-900)" }}>
            Tools of the<br />
            <span className="text-gradient-accent">trade.</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}
          className="reveal-up"
        >
          {categories.map((cat) => {
            const catColor = skills.find((s) => s.cat === cat)?.color ?? "#e63946";
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "100px",
                  border: `1.5px solid ${active ? catColor : "var(--stone-300)"}`,
                  background: active ? catColor : "transparent",
                  color: active ? "#fff" : "var(--stone-600)",
                  cursor: "pointer",
                  transition: "all 0.25s var(--ease-out-expo)",
                  boxShadow: active ? `0 4px 14px ${catColor}40` : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills list */}
        <div ref={barsRef} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {filtered.map((skill, i) => (
            <div key={`${activeCat}-${i}`}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "var(--stone-800)",
                }}>
                  {skill.name}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: accentColor,
                  background: `${accentColor}12`,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                }}>
                  {skill.level}%
                </span>
              </div>

              <div className="progress-track">
                <div
                  className="skill-fill progress-fill"
                  style={{
                    width: "0%",
                    background: `linear-gradient(90deg, ${accentColor}aa, ${accentColor})`,
                    boxShadow: `0 0 8px ${accentColor}40`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Marquee tag cloud */}
        <div
          style={{
            marginTop: "5rem",
            overflow: "hidden",
            maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
          className="reveal-fade"
        >
          <div className="marquee-track" style={{ gap: "1rem" }}>
            {[...skills, ...skills].map((s, i) => (
              <span
                key={i}
                className="tag"
                style={{ whiteSpace: "nowrap", flexShrink: 0 }}
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
