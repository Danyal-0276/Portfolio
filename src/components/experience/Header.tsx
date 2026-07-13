'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#hero" className="site-brand">
        <span style={{ color: 'var(--color-lime)' }}>◆</span>
        DANYAL TANVEER
      </a>
      <a href="/resume/Danyal_Tanveer-Resume.pdf" target="_blank" rel="noopener" className="btn btn-ghost">
        RESUME
      </a>
    </header>
  );
}
