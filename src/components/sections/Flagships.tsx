"use client";
import React, { useState } from "react";

const projects = [
  {
    id: "trak",
    title: "TRAK",
    tagline: "AI News Credibility Platform",
    desc: "React Native mobile app + Django REST backend + a 3-model voting ensemble (RoBERTa · DeBERTa · custom XGBoost) scoring articles Real / Suspicious / Fake in real-time.",
    tech: ["React Native","Django/DRF","MongoDB","RoBERTa","DeBERTa","JWT","Redis"],
    links: { "App Repo": "https://github.com/Danyal-0276/TRAK", "Backend": "https://github.com/Danyal-0276/TRAK-BACKEND" },
    shots: ["/projects/trak/1.png","/projects/trak/2.png","/projects/trak/3.png","/projects/trak/4.png","/projects/trak/5.png"],
    color: "#06b6d4",
  },
  {
    id: "pos",
    title: "POS Ecosystem",
    tagline: "Three repos · two live restaurant clients",
    desc: "Commercial-grade point-of-sale — Next.js 15 customer frontend, management dashboard, and a high-performance Express API with Redis caching and Swagger docs.",
    tech: ["Next.js 15","Express","MongoDB","Redis","JWT","Swagger"],
    links: { "Client": "https://github.com/Danyal-0276/POS-client", "Admin": "https://github.com/Danyal-0276/POS-Admin", "API": "https://github.com/Danyal-0276/POS-backend" },
    shots: ["/projects/pos/1.jpeg","/projects/pos/2.jpeg","/projects/pos/3.jpeg"],
    color: "#f59e0b",
  },
  {
    id: "bert",
    title: "BERT Benchmark",
    tagline: "10-model Transformer evaluation suite",
    desc: "Deep benchmarking of 10 BERT-family models on a 10K fake-news split using PyTorch and HuggingFace, reporting MCC, AUC-ROC, and F1-micro per architecture.",
    tech: ["PyTorch","HuggingFace","scikit-learn","Pandas","matplotlib"],
    links: { "Repository": "https://github.com/Danyal-0276/Bert-Based-models-evaluation" },
    shots: ["/projects/bert/1.png","/projects/bert/2.png"],
    color: "#8b5cf6",
  },
  {
    id: "nids",
    title: "NIDS",
    tagline: "Distributed Network Intrusion Detection",
    desc: "Apache Spark MLlib ensemble (Naive Bayes + Logistic Regression + GBT + Random Forest) processing CIC-IDS2017 packets in a distributed PDC pipeline.",
    tech: ["PySpark 3.5","Apache Spark","GBT","Random Forest","MLlib"],
    links: { "Repository": "https://github.com/Danyal-0276/PDC-Project-Intrusion-Detection-System-" },
    shots: ["/projects/nids/1.png","/projects/nids/2.png","/projects/nids/3.png"],
    color: "#ef4444",
  },
  {
    id: "jarvis",
    title: "J.A.R.V.I.S",
    tagline: "Gemini-powered personal AI assistant",
    desc: "Python desktop assistant with Google Gemini APIs, SpeechRecognition, pyttsx3 TTS, and a 3D particle-sphere voice visualizer built with Eel + Three.js.",
    tech: ["Python","Eel","Google Gemini","SpeechRecognition","pyttsx3"],
    links: { "Repository": "https://github.com/Danyal-0276/Jarvis" },
    shots: [],
    color: "#3b82f6",
  },
];

function Carousel({ shots, color }: { shots: string[]; color: string }) {
  const [idx, setIdx] = useState(0);
  if (!shots.length) return (
    <div className="carousel" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--stone-600)" }}>UI screenshots coming soon</span>
    </div>
  );
  return (
    <div className="carousel">
      <img src={shots[idx]} alt="" />
      {shots.length > 1 && (
        <>
          <button className="carousel-btn" style={{ left: 8 }} onClick={() => setIdx(i => (i - 1 + shots.length) % shots.length)}>‹</button>
          <button className="carousel-btn" style={{ right: 8 }} onClick={() => setIdx(i => (i + 1) % shots.length)}>›</button>
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
            {shots.map((_, i) => (
              <div key={i} onClick={() => setIdx(i)} style={{ width: 5, height: 5, borderRadius: "50%", background: idx === i ? color : "rgba(255,255,255,0.25)", cursor: "pointer", transition: "background 0.2s" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Flagships() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <section className="section section-dark section-pad-lg" data-section="3">
      <div className="container">

        <div style={{ marginBottom: "4rem" }}>
          <div className="label" data-up style={{ color: "var(--accent-soft)", marginBottom: "0.75rem" }}>Chapter IV — Projects</div>
          <h2 data-up style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", lineHeight: 1.05 }}>
            The Build<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-soft))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Corridor.</span>
          </h2>
        </div>

        {/* Project tabs */}
        <div data-up style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", overflowX: "auto", marginBottom: "3rem" }}>
          {projects.map((pr, i) => (
            <button key={pr.id} type="button" onClick={() => setActive(i)}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.82rem",
                padding: "0.75rem 1.4rem",
                background: "none", border: "none",
                borderBottom: `2px solid ${active === i ? pr.color : "transparent"}`,
                color: active === i ? "#fff" : "rgba(255,255,255,0.35)",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all 0.25s ease", flexShrink: 0,
              }}>
              {pr.title}
            </button>
          ))}
        </div>

        {/* Project detail */}
        <div className="grid-2" style={{ alignItems: "start", gap: "3.5rem" }}>
          <div>
            <div style={{ width: 40, height: 3, background: p.color, borderRadius: 2, boxShadow: `0 0 14px ${p.color}80`, marginBottom: "1.5rem" }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", color: "#fff", marginBottom: "0.4rem" }}>{p.title}</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: p.color, marginBottom: "1.5rem", letterSpacing: "0.05em" }}>{p.tagline}</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>{p.desc}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
              {p.tech.map(t => <span key={t} className="tag tag-dark" style={{ borderColor: `${p.color}30`, color: p.color }}>{t}</span>)}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {Object.entries(p.links).map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost-dark"
                  style={{ fontSize: "0.78rem", padding: "0.45rem 1rem", borderColor: `${p.color}45`, color: p.color }}>
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          <div data-right>
            <Carousel shots={p.shots} color={p.color} />
          </div>
        </div>

        {/* Dot selector */}
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "3rem" }}>
          {projects.map((pr, i) => (
            <div key={pr.id} onClick={() => setActive(i)} style={{
              width: active === i ? 22 : 7, height: 7, borderRadius: 100,
              background: active === i ? pr.color : "rgba(255,255,255,0.15)",
              cursor: "pointer", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
