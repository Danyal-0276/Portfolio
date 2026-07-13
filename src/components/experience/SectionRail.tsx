'use client';

import { useEffect, useState } from 'react';
import { CHAPTERS } from '@/lib/chapters';
import { scrollToChapter } from '@/lib/scroll';

export default function SectionRail() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CHAPTERS.forEach((ch) => {
      const el = document.querySelector(`[data-chapter="${ch.id}"]`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(ch.id);
        },
        { threshold: 0.35, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="section-rail" aria-label="Section navigation">
      {CHAPTERS.map((ch) => (
        <button
          key={ch.id}
          className={`rail-dot ${active === ch.id ? 'is-active' : ''}`}
          aria-label={ch.label}
          title={ch.label}
          onClick={() => scrollToChapter(ch.id)}
        />
      ))}
    </nav>
  );
}
