"use client";
import React, { useState } from "react";

const links = [
  { icon: "✉", label: "Email", val: "danyaltanveer0276@gmail.com", href: "mailto:danyaltanveer0276@gmail.com", color: "#e63946", action: "Send Message" },
  { icon: "⌥", label: "GitHub", val: "github.com/Danyal-0276",         href: "https://github.com/Danyal-0276",                  color: "#6366f1", action: "Browse Repos" },
  { icon: "◈", label: "LinkedIn", val: "linkedin.com/in/danyal-tanveer", href: "https://linkedin.com/in/danyal-tanveer",          color: "#06b6d4", action: "Connect" },
  { icon: "↓", label: "Résumé",   val: "Danyal_Tanveer-Resume.pdf",       href: "/resume/Danyal_Tanveer-Resume.pdf",              color: "#10b981", action: "Download PDF", download: true },
];

export default function Contact() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section className="section section-warm section-pad" data-section="6">
      <div className="container-sm">

        <div style={{ marginBottom: "5rem", textAlign: "center" }}>
          <div className="label" data-up style={{ marginBottom: "0.75rem" }}>Chapter VII — Contact</div>
          <h2 data-up style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "var(--stone-900)", lineHeight: 1.05 }}>
            Let&apos;s build<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-soft))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>something great.</span>
          </h2>
          <p data-up style={{ fontSize: "0.95rem", color: "var(--stone-500)", maxWidth: "440px", margin: "1.25rem auto 0", lineHeight: 1.75 }}>
            Open to full-stack engineering roles, NLP projects, and technical collaborations.
          </p>
        </div>

        {/* Cards */}
        <div data-stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "5rem" }}>
          {links.map((l, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{
                background: "#fff", borderRadius: 14, padding: "2rem 1.5rem",
                border: `1px solid ${hov === i ? `${l.color}40` : "var(--stone-200)"}`,
                boxShadow: hov === i ? `0 14px 44px ${l.color}14` : "0 2px 12px rgba(0,0,0,0.03)",
                transform: hov === i ? "translateY(-6px)" : "translateY(0)",
                transition: "all 0.3s ease",
                display: "flex", flexDirection: "column", gap: "0.5rem",
              }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${l.color}12`, border: `1px solid ${l.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "0.5rem", color: l.color, fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                {l.icon}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "var(--stone-800)" }}>{l.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.63rem", color: "var(--stone-400)", wordBreak: "break-all" }}>{l.val}</div>
              {l.download ? (
                <a href={l.href} download style={{ marginTop: "auto", paddingTop: "1rem", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.78rem", color: l.color, textDecoration: "none" }}>
                  {l.action} ↓
                </a>
              ) : (
                <a href={l.href} target={l.href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer" style={{ marginTop: "auto", paddingTop: "1rem", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.78rem", color: l.color, textDecoration: "none" }}>
                  {l.action} ↗
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid var(--stone-200)", paddingTop: "3rem", textAlign: "center" }} data-fade>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: "var(--stone-900)", marginBottom: "0.5rem" }}>
            Danyal Tanveer
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--stone-400)" }}>
            Full-Stack Developer · NLP/ML Researcher · UCP 2026
          </div>
          <div style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--stone-300)" }}>
            Built with Next.js 15 · React Three Fiber · GSAP · Lenis
          </div>
          <div style={{ width: 1, height: 50, background: "linear-gradient(180deg, var(--accent), transparent)", margin: "1.5rem auto 0", opacity: 0.4 }} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--stone-300)" }}>end_of_corridor</div>
        </div>
      </div>
    </section>
  );
}
