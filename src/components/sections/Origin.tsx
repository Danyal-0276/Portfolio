"use client";
import React, { useState } from "react";

const timeline = [
  {
    year: "2022",
    title: "BS Computer Science",
    org: "University of Central Punjab",
    desc: "Foundations in distributed systems, data structures, and algorithms. Explored machine learning pipelines and NLP research methodologies.",
    color: "#e63946",
  },
  {
    year: "2023",
    title: "Full-Stack Production",
    org: "Live Restaurant Clients",
    desc: "Designed and shipped Express APIs with Redis caching, Next.js frontends, and MongoDB clusters for two live commercial clients.",
    color: "#2ec4b6",
  },
  {
    year: "2024",
    title: "ML Research & Capstone",
    org: "TRAK Ensemble System",
    desc: "Benchmarked 10 BERT-family models on 10K news articles. Built TRAK — a 3-model credibility voting ensemble with 93.1% accuracy.",
    color: "#6366f1",
  },
];

const jsProjects = [
  "Calculator","Weather App","Quiz App","Todo List","Recipe Book",
  "Expense Tracker","Movie Info","Lyrics Finder","Markdown Editor",
  "Drawing Board","Piano Synth","Typing Tester","Image Slider",
  "Color Palette","Password Gen","Clock/Timer","Voice Notes","Memory Game",
];

export default function Origin() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section section-light section-pad" data-section="1">
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <div className="label" data-up style={{ marginBottom: "0.75rem" }}>Chapter II — Origin</div>
          <h2
            data-up
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "var(--stone-900)",
              lineHeight: 1.05,
            }}
          >
            Where it all<br />
            <span style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>began.</span>
          </h2>
        </div>

        <div className="grid-2" style={{ alignItems: "start" }}>

          {/* Left: Timeline */}
          <div data-left>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--stone-400)", marginBottom: "2rem" }}>
              Timeline
            </p>

            {timeline.map((ev, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "56px 20px 1fr", gap: "0 1rem", paddingBottom: "2.5rem" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: ev.color, fontWeight: 600, paddingTop: "2px" }}>
                  {ev.year}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: ev.color, boxShadow: `0 0 12px ${ev.color}80`, flexShrink: 0, zIndex: 1 }} />
                  {i < timeline.length - 1 && <div style={{ flex: 1, width: 1, background: "var(--stone-200)", marginTop: 4 }} />}
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem", color: "var(--stone-900)", marginBottom: "0.2rem" }}>{ev.title}</h4>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--stone-400)", marginBottom: "0.6rem", letterSpacing: "0.04em" }}>{ev.org}</div>
                  <p style={{ fontSize: "0.9rem", color: "var(--stone-600)", lineHeight: 1.7 }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: JS shelf + education */}
          <div data-right>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--stone-400)", marginBottom: "0.75rem" }}>
              JS Workshop Shelf — 18 Foundations
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--stone-500)", marginBottom: "1.25rem", lineHeight: 1.65 }}>
              Before the corridor, there was the workshop. Hover each module.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.25rem" }}>
              {jsProjects.map((name, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    padding: "0.28rem 0.65rem",
                    borderRadius: "5px",
                    border: `1px solid ${hovered === i ? "var(--accent)" : "var(--stone-200)"}`,
                    background: hovered === i ? "var(--accent-muted)" : "transparent",
                    color: hovered === i ? "var(--accent)" : "var(--stone-500)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {name}
                </button>
              ))}
            </div>

            <div style={{ minHeight: "28px", borderTop: "1px solid var(--stone-200)", paddingTop: "0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
              {hovered !== null
                ? <span style={{ color: "var(--accent)" }}>&gt; LOADED: {jsProjects[hovered].replace(/\s/g, "_").toUpperCase()}_MODULE ✓</span>
                : <span style={{ color: "var(--stone-300)" }}>&gt; hover a module...</span>}
            </div>

            {/* Education card */}
            <div className="card" style={{ marginTop: "2rem", borderLeft: "3px solid var(--accent)" }}>
              <div className="label" style={{ marginBottom: "0.5rem" }}>Education</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "var(--stone-900)", marginBottom: "0.25rem" }}>
                BS Computer Science
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--stone-500)" }}>
                University of Central Punjab · 2022–Present
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
