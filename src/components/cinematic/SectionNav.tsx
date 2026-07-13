'use client';

import { scrollToSection } from '@/lib/useCinematicScroll';

const SECTIONS = [
  { id: '#hero', label: 'Intro' },
  { id: '#origin', label: 'Origin' },
  { id: '#voyage', label: 'Voyage' },
  { id: '#research', label: 'Research' },
  { id: '#philosophy', label: 'Philosophy' },
  { id: '#contact', label: 'Contact' },
];

export default function SectionNav({ active }: { active: number }) {
  return (
    <nav className="section-nav" aria-label="Sections">
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className={`section-nav-dot ${active === i ? 'active' : ''}`}
          onClick={() => scrollToSection(s.id)}
          aria-label={`Go to ${s.label}`}
        >
          <span className="section-nav-label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
