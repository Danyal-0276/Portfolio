"use client";

import React, { useState, useRef } from "react";

const contactItems = [
  {
    icon: "✉️",
    label: "Email",
    value: "danyaltanveer0276@gmail.com",
    action: "Send Message",
    href: "mailto:danyaltanveer0276@gmail.com",
    color: "#e63946",
  },
  {
    icon: "💻",
    label: "GitHub",
    value: "github.com/Danyal-0276",
    action: "View Repos",
    href: "https://github.com/Danyal-0276",
    color: "#6366f1",
  },
  {
    icon: "🤝",
    label: "LinkedIn",
    value: "linkedin.com/in/danyal-tanveer",
    action: "Connect",
    href: "https://linkedin.com/in/danyal-tanveer",
    color: "#06b6d4",
  },
  {
    icon: "📄",
    label: "Résumé",
    value: "Danyal_Tanveer-Resume.pdf",
    action: "Download PDF",
    href: "/resume/Danyal_Tanveer-Resume.pdf",
    download: true,
    color: "#10b981",
  },
];

export default function Contact() {
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="section section-warm section-padding"
      data-section="6"
    >
      <div className="container-narrow">

        {/* Header */}
        <div style={{ marginBottom: "5rem", textAlign: "center" }}>
          <div className="label-mono reveal-up" style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
            Chapter VII — Contact
          </div>
          <h2 className="heading-large reveal-up" style={{ color: "var(--stone-900)" }}>
            Let&apos;s build<br />
            <span className="text-gradient-accent">something great.</span>
          </h2>
          <p className="body-text reveal-up" style={{ maxWidth: "480px", margin: "1.25rem auto 0" }}>
            Open to full-stack engineering roles, NLP development projects, and technical collaborations. The corridor ends here.
          </p>
        </div>

        {/* Contact cards */}
        <div
          data-stagger
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem",
            marginBottom: "5rem",
          }}
        >
          {contactItems.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "2rem 1.5rem",
                border: `1px solid ${hovered === i ? `${item.color}40` : "var(--stone-200)"}`,
                boxShadow: hovered === i ? `0 12px 40px ${item.color}15` : "0 2px 12px rgba(0,0,0,0.03)",
                transition: "all 0.3s var(--ease-out-expo)",
                transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {/* Icon */}
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: `${item.color}10`,
                border: `1px solid ${item.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                marginBottom: "0.5rem",
              }}>
                {item.icon}
              </div>

              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--stone-800)",
              }}>
                {item.label}
              </div>

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--stone-400)",
                wordBreak: "break-all",
              }}>
                {item.value}
              </div>

              {/* Action link */}
              {item.download ? (
                <a
                  href={item.href}
                  download
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    color: item.color,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  {item.action} ↓
                </a>
              ) : (
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    color: item.color,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  {item.action} ↗
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--stone-200)", paddingTop: "3rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "var(--stone-900)", marginBottom: "0.5rem" }}>
            Danyal Tanveer
          </div>
          <div className="label-mono" style={{ color: "var(--stone-400)" }}>
            Full-Stack Developer · NLP/ML Engineer · UCP 2026
          </div>
          <div style={{ marginTop: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--stone-300)" }}>
            Built with Next.js 15 · Three.js · GSAP · Lenis · Framer Motion
          </div>

          {/* Accent line */}
          <div style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(180deg, var(--accent), transparent)",
            margin: "1.5rem auto 0",
            opacity: 0.4,
          }} />
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--stone-300)",
            marginTop: "0",
          }}>
            end_of_corridor
          </div>
        </div>
      </div>
    </section>
  );
}
