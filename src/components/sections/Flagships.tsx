"use client";

import React, { useState } from "react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  links: Record<string, string>;
  screenshots: string[];
  accentColor: string;
  diorama: string;
}

const projects: Project[] = [
  {
    id: "trak",
    title: "TRAK",
    tagline: "AI News Credibility Platform",
    description:
      "Capstone project — React Native mobile app + Django REST backend + a 3-model ensemble (RoBERTa, DeBERTa, custom classifier) scoring articles Real / Suspicious / Fake in real-time.",
    tech: ["React Native", "Django/DRF", "MongoDB", "RoBERTa", "DeBERTa", "JWT"],
    links: { "App Repo": "https://github.com/Danyal-0276/TRAK", "Backend": "https://github.com/Danyal-0276/TRAK-BACKEND" },
    screenshots: ["/projects/trak/1.png", "/projects/trak/2.png", "/projects/trak/3.png", "/projects/trak/4.png", "/projects/trak/5.png"],
    accentColor: "#06b6d4",
    diorama: "Rotating phone mockup streaming credibility meter",
  },
  {
    id: "pos",
    title: "POS Ecosystem",
    tagline: "Three repos, two live restaurant clients",
    description:
      "Commercial-grade point-of-sale system with a Next.js 15 customer frontend, management dashboard (POS-Admin), and a high-performance Express API with Redis caching.",
    tech: ["Next.js 15", "Express", "MongoDB", "JWT", "Redis", "Swagger"],
    links: { "Frontend": "https://github.com/Danyal-0276/POS-client", "Admin": "https://github.com/Danyal-0276/POS-Admin", "API": "https://github.com/Danyal-0276/POS-backend" },
    screenshots: ["/projects/pos/1.jpeg", "/projects/pos/2.jpeg", "/projects/pos/3.jpeg"],
    accentColor: "#f59e0b",
    diorama: "Three linked terminal meshes with pulsing connectors",
  },
  {
    id: "bert",
    title: "BERT Benchmark",
    tagline: "10-model fake news evaluation suite",
    description:
      "Deep benchmarking of 10 BERT-family Transformers (RoBERTa, DistilBERT, XLM-R, MobileBERT…) on a 10K fake-news split using PyTorch and HuggingFace, reporting MCC and AUC-ROC.",
    tech: ["PyTorch", "HuggingFace", "scikit-learn", "Pandas"],
    links: { "Repository": "https://github.com/Danyal-0276/Bert-Based-models-evaluation" },
    screenshots: ["/projects/bert/1.png", "/projects/bert/2.png"],
    accentColor: "#8b5cf6",
    diorama: "Bar-chart skyline — 10 glass columns of model accuracy",
  },
  {
    id: "nids",
    title: "NIDS",
    tagline: "Distributed Network Intrusion Detection",
    description:
      "Apache Spark MLlib ensemble (Naive Bayes + LR + GBT + RF) processing CIC-IDS2017 network traffic packets to detect cyber attacks in a distributed PDC pipeline.",
    tech: ["PySpark 3.5", "Apache Spark", "Naive Bayes", "GBT", "Random Forest"],
    links: { "Repository": "https://github.com/Danyal-0276/PDC-Project-Intrusion-Detection-System-" },
    screenshots: ["/projects/nids/1.png", "/projects/nids/2.png", "/projects/nids/3.png"],
    accentColor: "#ef4444",
    diorama: "Glowing shard cluster with Spark pipeline flow",
  },
  {
    id: "jarvis",
    title: "J.A.R.V.I.S",
    tagline: "Personal Gemini-powered AI assistant",
    description:
      "Python desktop AI assistant powered by Google Gemini APIs with speech recognition, text-to-speech (pyttsx3), and a 3D particle-sphere voice visualizer built with Eel.",
    tech: ["Python", "Eel", "Google Gemini", "SpeechRecognition", "pyttsx3"],
    links: { "Repository": "https://github.com/Danyal-0276/Jarvis" },
    screenshots: [],
    accentColor: "#3b82f6",
    diorama: "Breathing particle sphere responding to voice input",
  },
];

function Carousel({ screenshots, accent }: { screenshots: string[]; accent: string }) {
  const [idx, setIdx] = useState(0);
  if (!screenshots.length) {
    return (
      <div style={{
        aspectRatio: "16/10",
        borderRadius: "10px",
        background: "var(--ink-panel)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--stone-600)" }}>
          UI coming soon
        </span>
      </div>
    );
  }
  return (
    <div className="carousel-wrap" style={{ background: "#050810" }}>
      <img src={screenshots[idx]} alt="" />
      {screenshots.length > 1 && (
        <>
          <button className="carousel-btn carousel-btn-prev" onClick={() => setIdx((i) => (i - 1 + screenshots.length) % screenshots.length)} aria-label="Previous">‹</button>
          <button className="carousel-btn carousel-btn-next" onClick={() => setIdx((i) => (i + 1) % screenshots.length)} aria-label="Next">›</button>
          <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "5px" }}>
            {screenshots.map((_, i) => (
              <div key={i} onClick={() => setIdx(i)} style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: idx === i ? accent : "rgba(255,255,255,0.25)",
                cursor: "pointer", transition: "background 0.2s",
              }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Flagships() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section className="section section-dark section-padding-lg" data-section="3">
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <div className="label-mono reveal-up" style={{ color: "var(--accent-soft)", marginBottom: "0.75rem" }}>
            Chapter IV — Projects
          </div>
          <h2 className="heading-large reveal-up" style={{ color: "#fff" }}>
            The Build<br />
            <span className="text-gradient-accent">Corridor.</span>
          </h2>
        </div>

        {/* Project tab selector */}
        <div
          style={{ display: "flex", gap: "0", marginBottom: "3rem", overflowX: "auto", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          className="reveal-up"
          data-cursor
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(i)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.82rem",
                padding: "0.75rem 1.5rem",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${active === i ? p.accentColor : "transparent"}`,
                color: active === i ? "#fff" : "var(--stone-500)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
                letterSpacing: "-0.01em",
                flexShrink: 0,
              }}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active project detail */}
        <div className="grid-2" style={{ alignItems: "start", gap: "3rem" }}>

          {/* Left: info */}
          <div>
            <div
              style={{
                width: "36px",
                height: "3px",
                background: project.accentColor,
                borderRadius: "2px",
                marginBottom: "1.5rem",
                boxShadow: `0 0 12px ${project.accentColor}80`,
              }}
            />
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: "0.4rem",
            }}>
              {project.title}
            </h3>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: project.accentColor,
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}>
              {project.tagline}
            </p>
            <p style={{ color: "var(--stone-400)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              {project.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
              {project.tech.map((t) => (
                <span key={t} className="tag tag-dark" style={{ borderColor: `${project.accentColor}30`, color: project.accentColor }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {Object.entries(project.links).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                  style={{
                    fontSize: "0.78rem",
                    padding: "0.5rem 1rem",
                    borderColor: `${project.accentColor}40`,
                    color: project.accentColor,
                  }}
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right: screenshot carousel */}
          <div className="reveal-right">
            <Carousel screenshots={project.screenshots} accent={project.accentColor} />

            {/* Diorama concept note */}
            <div style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--stone-600)" }}>
                Diorama concept:
              </span>
              <p style={{ fontSize: "0.8rem", color: "var(--stone-500)", marginTop: "0.2rem" }}>
                {project.diorama}
              </p>
            </div>
          </div>
        </div>

        {/* Project dot selector */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "3rem", justifyContent: "center" }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background: active === i ? p.accentColor : "rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "all 0.3s var(--ease-out-expo)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
