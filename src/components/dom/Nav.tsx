"use client";
import React from "react";

interface NavProps {
  chapters: string[];
  activeSection: number;
  isDark: boolean;
}

export default function Nav({ chapters, activeSection, isDark }: NavProps) {
  const handleClick = (i: number) => {
    const sections = document.querySelectorAll(".section[data-section]");
    sections[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav-fixed" aria-label="Page sections">
      {chapters.map((ch, i) => (
        <button
          key={i}
          type="button"
          className={`nav-dot ${activeSection === i ? "active" : ""} ${isDark ? "on-dark" : ""}`}
          onClick={() => handleClick(i)}
          aria-label={`Go to ${ch}`}
        >
          <span className="nav-label">{ch}</span>
        </button>
      ))}
    </nav>
  );
}
