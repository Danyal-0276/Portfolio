"use client";

import React from "react";

interface NavProps {
  chapters: string[];
  activeSection: number;
}

const darkSections = [0, 3, 5]; // Hero, Flagships, Philosophy are dark

export default function Nav({ chapters, activeSection }: NavProps) {
  const isDark = darkSections.includes(activeSection);

  const handleClick = (index: number) => {
    const el = document.querySelectorAll(".section")[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav-fixed" aria-label="Page sections">
      {chapters.map((chapter, i) => (
        <button
          key={i}
          className={`nav-dot ${activeSection === i ? "active" : ""} ${isDark ? "on-dark" : ""}`}
          onClick={() => handleClick(i)}
          aria-label={`Go to ${chapter}`}
          title={chapter}
          type="button"
        >
          <span className="nav-tooltip">{chapter}</span>
        </button>
      ))}
    </nav>
  );
}
