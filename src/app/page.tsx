"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "@/components/sections/Hero";
import Origin from "@/components/sections/Origin";
import Skills from "@/components/sections/Skills";
import Flagships from "@/components/sections/Flagships";
import Research from "@/components/sections/Research";
import Philosophy from "@/components/sections/Philosophy";
import Contact from "@/components/sections/Contact";
import Nav from "@/components/dom/Nav";
import CursorGlow from "@/components/background/CursorGlow";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  "Introduction",
  "Origin",
  "Stack",
  "Projects",
  "Research",
  "Philosophy",
  "Contact",
];

// Dark sections (inverted header + nav)
const DARK_SECTIONS = [0, 3, 5];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  /* ── Lenis smooth scroll + GSAP ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setHeaderScrolled(scroll > 60);
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => setLoading(false), 1800);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  /* ── Global scroll-reveal animations ── */
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const revealUp = gsap.utils.toArray<HTMLElement>(".reveal-up");
      revealUp.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        });
      });

      const revealLeft = gsap.utils.toArray<HTMLElement>(".reveal-left");
      revealLeft.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
        });
      });

      const revealRight = gsap.utils.toArray<HTMLElement>(".reveal-right");
      revealRight.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
        });
      });

      const revealScale = gsap.utils.toArray<HTMLElement>(".reveal-scale");
      revealScale.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          scale: 1, opacity: 1, duration: 1, ease: "power3.out",
        });
      });

      const revealFade = gsap.utils.toArray<HTMLElement>(".reveal-fade");
      revealFade.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          opacity: 1, duration: 1.2, ease: "power2.out",
        });
      });

      // Stagger containers
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        gsap.fromTo(
          Array.from(container.children),
          { y: 40, opacity: 0 },
          {
            scrollTrigger: { trigger: container, start: "top 85%", toggleActions: "play none none none" },
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          }
        );
      });

      // Header color on dark sections
      const sections = gsap.utils.toArray<HTMLElement>(".section");
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(i),
          onEnterBack: () => setActiveSection(i),
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(180deg, var(--accent), transparent)",
          animation: "pulse-soft 1.5s infinite",
          marginBottom: "1rem",
        }} />
        <div className="loader-name">Danyal Tanveer</div>
        <div className="loader-sub">initializing portfolio</div>
        <div style={{
          width: "180px",
          height: "2px",
          background: "var(--stone-200)",
          borderRadius: "100px",
          overflow: "hidden",
          marginTop: "1.5rem",
        }}>
          <div style={{
            height: "100%",
            width: "0%",
            background: "var(--accent)",
            borderRadius: "100px",
            animation: "grow 1.5s ease forwards",
          }} />
        </div>
        <style>{`
          @keyframes grow { to { width: 100%; } }
        `}</style>
      </div>
    );
  }

  const isDark = DARK_SECTIONS.includes(activeSection);

  return (
    <div ref={mainRef}>
      {/* Cursor glow effect */}
      <CursorGlow />

      {/* Sticky header */}
      <header
        className={`header-bar ${headerScrolled ? "scrolled" : ""} ${isDark ? "on-dark" : ""}`}
        style={{ color: isDark ? "#fff" : "var(--stone-900)" }}
      >
        <div className="header-name">
          <img src="/logo.png" alt="DT" className="header-logo" />
          <span>Danyal Tanveer</span>
        </div>
        <a
          href="mailto:danyaltanveer0276@gmail.com"
          className={`btn ${isDark ? "btn-dark" : "btn-outline"}`}
          style={{ fontSize: "0.75rem", padding: "0.45rem 1rem" }}
        >
          Get in Touch
        </a>
      </header>

      {/* Navigation dots */}
      <Nav chapters={chapters} activeSection={activeSection} />

      {/* Sections */}
      <Hero />
      <Origin />
      <Skills />
      <Flagships />
      <Research />
      <Philosophy />
      <Contact />
    </div>
  );
}
