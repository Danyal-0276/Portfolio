"use client";

import React, { useState } from "react";

const timelineEvents = [
  {
    year: "2022",
    title: "BS Computer Science",
    org: "University of Central Punjab",
    desc: "Specialized in distributed systems, NLP research, and ML architectures. Explored Apache Spark and deep learning pipelines.",
    color: "#e63946",
  },
  {
    year: "2023",
    title: "Full Stack Integration",
    org: "Live Restaurant Clients",
    desc: "Built production Express backends, Redis-cached APIs, and React dashboards for two live restaurant businesses.",
    color: "#2ec4b6",
  },
  {
    year: "2024",
    title: "ML Research & Capstone",
    org: "Transformers + TRAK Project",
    desc: "Benchmarked 10 BERT-family models on a 10K fake-news split. Built TRAK's 3-model credibility ensemble.",
    color: "#6366f1",
  },
];

const jsProjects = [
  "Calculator", "Weather App", "Quiz App", "Todo List", "Recipe Book",
  "Expense Tracker", "Movie Info", "Lyrics Finder", "Markdown Editor", "Drawing Board",
  "Piano Synth", "Typing Tester", "Image Slider", "Color Palette", "Password Gen",
  "Clock/Timer", "Voice Notes", "Memory Game",
];

export default function Origin() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section section-light section-padding" data-section="1">
      <div className="container">

        {/* Section header */}
        <div style={{ marginBottom: "5rem" }}>
          <div className="label-mono reveal-up" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
            Chapter II — Origin
          </div>
          <h2 className="heading-large reveal-up" style={{ color: "var(--stone-900)" }}>
            Where it all<br />
            <span className="text-gradient-accent">began.</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid-2" style={{ alignItems: "start" }}>

          {/* Left: Timeline */}
          <div className="reveal-left">
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--stone-500)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "2rem",
            }}>
              Timeline
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {timelineEvents.map((ev, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1px 1fr",
                    gap: "0 1.5rem",
                    paddingBottom: "2.5rem",
                  }}
                >
                  {/* Year */}
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: ev.color,
                    paddingTop: "4px",
                  }}>
                    {ev.year}
                  </div>

                  {/* Vertical line + dot */}
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: ev.color,
                      boxShadow: `0 0 12px ${ev.color}60`,
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                    }} />
                    {i < timelineEvents.length - 1 && (
                      <div style={{
                        flex: 1,
                        width: "1px",
                        background: "var(--stone-200)",
                        marginTop: "4px",
                      }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: "0" }}>
                    <h4 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--stone-900)",
                      marginBottom: "0.2rem",
                    }}>
                      {ev.title}
                    </h4>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--stone-400)",
                      marginBottom: "0.65rem",
                      letterSpacing: "0.04em",
                    }}>
                      {ev.org}
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--stone-600)", lineHeight: 1.65 }}>
                      {ev.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: JS Workshop shelf */}
          <div className="reveal-right">
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--stone-500)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.75rem",
            }}>
              JS Workshop Shelf
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--stone-500)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              18 vanilla-JS foundations. Hover to see each module initialize.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {jsProjects.map((name, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    padding: "0.35rem 0.7rem",
                    borderRadius: "6px",
                    border: `1px solid ${hovered === i ? "var(--accent)" : "var(--stone-200)"}`,
                    background: hovered === i ? "var(--accent-muted)" : "transparent",
                    color: hovered === i ? "var(--accent)" : "var(--stone-500)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    letterSpacing: "0.03em",
                  }}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Console readout */}
            <div style={{
              minHeight: "32px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--stone-400)",
              padding: "0.5rem 0",
              borderTop: "1px solid var(--stone-200)",
            }}>
              {hovered !== null ? (
                <span style={{ color: "var(--accent)" }}>
                  &gt; LOADED: {jsProjects[hovered].toUpperCase().replace(/\s/g, "_")}_MODULE ✓
                </span>
              ) : (
                <span style={{ color: "var(--stone-300)" }}>
                  &gt; hover a module to inspect...
                </span>
              )}
            </div>

            {/* Education card */}
            <div
              className="card"
              style={{ marginTop: "2rem", borderLeft: "3px solid var(--accent)" }}
            >
              <div className="label-mono" style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>
                Education
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--stone-900)", fontSize: "1rem", marginBottom: "0.25rem" }}>
                BS Computer Science
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--stone-500)" }}>
                University of Central Punjab, 2022–Present
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
