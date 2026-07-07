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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  /* ── Lenis smooth scroll + GSAP integration ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Loading gate
    const timer = setTimeout(() => setLoading(false), 1800);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  /* ── Global GSAP reveal animations ── */
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Reveal-up elements
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Reveal-left elements
      gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Reveal-right elements
      gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Reveal-scale elements
      gsap.utils.toArray<HTMLElement>(".reveal-scale").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Reveal-fade elements
      gsap.utils.toArray<HTMLElement>(".reveal-fade").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      // Stagger children: elements with data-stagger
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      });

      // Section tracking for nav dots
      gsap.utils.toArray<HTMLElement>(".section").forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
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
        <div
          style={{
            width: "50px",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
            borderRadius: "100px",
            animation: "pulse-soft 1.5s infinite",
          }}
        />
        <div className="loader-name">Danyal Tanveer</div>
        <div className="loader-sub">loading portfolio</div>
      </div>
    );
  }

  return (
    <div ref={mainRef}>
      {/* Header bar */}
      <header className="header-bar" id="header">
        <div className="header-name">
          <img src="/logo.png" alt="" className="header-logo" />
          <span>Danyal Tanveer</span>
        </div>
        <a href="mailto:danyaltanveer0276@gmail.com" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}>
          Get in Touch
        </a>
      </header>

      {/* Navigation dots */}
      <Nav chapters={chapters} activeSection={activeSection} />

      {/* Sections — alternating light/dark */}
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
