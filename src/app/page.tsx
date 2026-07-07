"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Image from "next/image";
import Nav from "@/components/dom/Nav";
import CursorGlow from "@/components/background/CursorGlow";

// Lazy load heavy sections
const Hero       = dynamic(() => import("@/components/sections/Hero"),       { ssr: false });
const Origin     = dynamic(() => import("@/components/sections/Origin"),     { ssr: false });
const Skills     = dynamic(() => import("@/components/sections/Skills"),     { ssr: false });
const Flagships  = dynamic(() => import("@/components/sections/Flagships"),  { ssr: false });
const Research   = dynamic(() => import("@/components/sections/Research"),   { ssr: false });
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"), { ssr: false });
const Contact    = dynamic(() => import("@/components/sections/Contact"),    { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = ["Intro", "Origin", "Stack", "Projects", "Research", "Philosophy", "Contact"];
const DARK_SECTIONS = new Set([0, 3, 5]); // Hero, Flagships, Philosophy

export default function Home() {
  const [ready, setReady]             = useState(false);
  const [activeSection, setActive]    = useState(0);
  const [headerScrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // ── FIX: force scroll to top on every load ──
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  // ── Lenis smooth scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Wire Lenis → GSAP ticker (correct pattern for Lenis 1.x)
    function raf(time: number) {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrolled(scroll > 60);
    });

    // Loading gate — just 1.4s
    const timer = setTimeout(() => setReady(true), 1400);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      clearTimeout(timer);
    };
  }, []);

  // ── GSAP scroll-reveal — runs AFTER content is ready ──
  useEffect(() => {
    if (!ready) return;

    // Wait two frames so the DOM is fully painted
    let rafId: number;
    let ctx: gsap.Context | undefined;
    const setup = () => {
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          ctx = gsap.context(() => {

            // ── Animate all [data-up] elements ──
            gsap.utils.toArray<HTMLElement>("[data-up]").forEach((el) => {
              const delay = Number(el.dataset.delay ?? 0);
              gsap.fromTo(el,
                { y: 55, opacity: 0 },
                {
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none",
                  },
                  y: 0, opacity: 1,
                  duration: 0.85,
                  delay,
                  ease: "power3.out",
                }
              );
            });

            // ── Animate all [data-left] elements ──
            gsap.utils.toArray<HTMLElement>("[data-left]").forEach((el) => {
              gsap.fromTo(el,
                { x: -60, opacity: 0 },
                {
                  scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                  x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                }
              );
            });

            // ── Animate all [data-right] elements ──
            gsap.utils.toArray<HTMLElement>("[data-right]").forEach((el) => {
              gsap.fromTo(el,
                { x: 60, opacity: 0 },
                {
                  scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                  x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                }
              );
            });

            // ── Stagger child groups [data-stagger] ──
            gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
              const children = Array.from(container.children) as HTMLElement[];
              if (!children.length) return;
              gsap.fromTo(children,
                { y: 40, opacity: 0 },
                {
                  scrollTrigger: { trigger: container, start: "top 86%", toggleActions: "play none none none" },
                  y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
                }
              );
            });

            // ── Fade in [data-fade] ──
            gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
              gsap.fromTo(el,
                { opacity: 0 },
                {
                  scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                  opacity: 1, duration: 1.1, ease: "power2.out",
                }
              );
            });

            // ── Scale in [data-scale] ──
            gsap.utils.toArray<HTMLElement>("[data-scale]").forEach((el) => {
              gsap.fromTo(el,
                { scale: 0.88, opacity: 0 },
                {
                  scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
                  scale: 1, opacity: 1, duration: 0.9, ease: "power3.out",
                }
              );
            });

            // ── Section tracking for nav ──
            gsap.utils.toArray<HTMLElement>(".section[data-section]").forEach((section) => {
              const idx = parseInt(section.dataset.section ?? "0", 10);
              ScrollTrigger.create({
                trigger: section,
                start: "top 55%",
                end: "bottom 55%",
                onEnter: () => setActive(idx),
                onEnterBack: () => setActive(idx),
              });
            });

            // Refresh after all triggers are created
            ScrollTrigger.refresh();

          }, mainRef);
        });
      });
    };

    setup();
    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [ready]);

  const isDark = DARK_SECTIONS.has(activeSection);

  // ── Loading Screen ──
  if (!ready) {
    return (
      <div className="loading-screen">
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
          letterSpacing: "-0.03em",
          color: "var(--stone-900)",
        }}>
          Danyal Tanveer
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--stone-400)",
        }}>
          initializing 3D experience
        </div>
        <div style={{
          width: "160px", height: "2px",
          background: "var(--stone-200)",
          borderRadius: "100px",
          overflow: "hidden",
          marginTop: "1rem",
        }}>
          <div style={{
            height: "100%", background: "var(--accent)",
            borderRadius: "100px",
            animation: "grow-bar 1.3s ease forwards",
          }} />
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef}>
      {/* Cursor ambient glow */}
      <CursorGlow />

      {/* Sticky Header */}
      <header
        className={`header ${isDark ? "dark" : ""} ${headerScrolled ? "scrolled" : ""}`}
      >
        <a href="#" className="header-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <Image src="/logo.png" alt="DT" width={26} height={26} style={{ borderRadius: 6, objectFit: "contain" }} />
          <span>Danyal Tanveer</span>
        </a>
        <a
          href="mailto:danyaltanveer0276@gmail.com"
          className={`btn ${isDark ? "btn-ghost-dark" : "btn-ghost-light"}`}
          style={{ fontSize: "0.75rem", padding: "0.42rem 1rem" }}
        >
          Contact
        </a>
      </header>

      {/* Section Nav dots */}
      <Nav chapters={CHAPTERS} activeSection={activeSection} isDark={isDark} />

      {/* Page Sections */}
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
