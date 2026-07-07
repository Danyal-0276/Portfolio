"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Canvas particle field for hero background
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouseX = W / 2;
    let mouseY = H / 2;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });

    const NUM = 80;
    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number };

    const particles: P[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        // Mouse attraction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.vx += (dx / dist) * 0.006;
          p.vy += (dy / dist) * 0.006;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,57,70,${p.opacity})`;
        ctx.fill();
      });

      // Draw connection lines between close particles
      for (let i = 0; i < NUM; i++) {
        for (let j = i + 1; j < NUM; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230,57,70,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.6,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance — stagger each line
      const tl = gsap.timeline({ delay: 1.9 }); // after loading gate
      tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-line-1", { y: 80, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.2")
        .from(".hero-line-2", { y: 80, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.2")
        .from(".hero-portrait", { scale: 0.85, opacity: 0, duration: 1.2, ease: "power3.out" }, "<-1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-dark"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "5rem",
      }}
      data-section="0"
    >
      {/* Particle field */}
      <ParticleField />

      {/* Radial spotlight from top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,57,70,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, padding: "4rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: Text */}
          <div>
            {/* Chapter tag */}
            <div
              className="hero-tag label-mono"
              style={{ color: "var(--accent-soft)", marginBottom: "1.5rem", opacity: 0 }}
            >
              Chapter I — Introduction
            </div>

            {/* Big name */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                marginBottom: "1rem",
              }}
            >
              <div
                className="hero-line-1"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 8rem)",
                  color: "#fff",
                  opacity: 0,
                }}
              >
                Danyal
              </div>
              <div
                className="hero-line-2"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 8rem)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.25)",
                  opacity: 0,
                }}
              >
                Tanveer
              </div>
            </div>

            {/* Subtitle */}
            <p
              className="hero-sub"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "var(--stone-400)",
                lineHeight: 1.7,
                maxWidth: "480px",
                marginBottom: "2.5rem",
                opacity: 0,
              }}
            >
              Final-year CS undergrad at UCP. I build production backends,
              Transformer classification ensembles, and agentic AI systems.
            </p>

            {/* CTAs */}
            <div
              className="hero-ctas"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0 }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  document.querySelectorAll(".section")[3]?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Projects →
              </button>
              <a
                href="/resume/Danyal_Tanveer-Resume.pdf"
                download
                className="btn btn-dark"
              >
                Download CV
              </a>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: "3rem",
                marginTop: "4rem",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { n: "5+", l: "Flagship Projects" },
                { n: "10", l: "ML Models Evaluated" },
                { n: "2", l: "Live Clients" },
                { n: "20+", l: "GitHub Repos" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="reveal-up"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--accent-soft)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="label-mono"
                    style={{ color: "var(--stone-500)", marginTop: "0.25rem" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait */}
          <div
            className="hero-portrait"
            style={{
              display: "none",
              flexShrink: 0,
              opacity: 0,
            }}
          >
          </div>
        </div>
      </div>

      {/* Portrait — positioned on right for larger screens */}
      <div
        className="hero-portrait"
        style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0,
          zIndex: 2,
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Glow ring */}
          <div
            style={{
              position: "absolute",
              inset: "-20px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)",
              animation: "pulse-soft 3s infinite",
            }}
          />
          <img
            src="/textures/portrait.png"
            alt="Danyal Tanveer"
            style={{
              width: "clamp(180px, 20vw, 280px)",
              height: "clamp(180px, 20vw, 280px)",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid rgba(230,57,70,0.4)",
              position: "relative",
              zIndex: 1,
              boxShadow: "0 0 60px rgba(230,57,70,0.15)",
            }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0,
          color: "var(--stone-500)",
          zIndex: 2,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(180deg, var(--stone-500), transparent)",
            animation: "float 2s infinite",
          }}
        />
      </div>
    </section>
  );
}
