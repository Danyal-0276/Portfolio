'use client';

import Image from 'next/image';
import { ArrowDown, Code2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  return (
    <section id="hero" className="cine-section hero-section">
      <div className="hero-glow" aria-hidden />

      <div className="hero-inner">
        <Badge variant="default" className="hero-badge">
          Final-Year CS · UCP · 2026
        </Badge>

        <h1 className="hero-title">
          <span className="hero-line-wrap"><span className="hero-line">DANYAL</span></span>
          <span className="hero-line-wrap"><span className="hero-line hero-outline">TANVEER</span></span>
        </h1>

        <p className="hero-sub">Full-Stack Engineer · NLP/ML Researcher</p>

        <p className="hero-desc">
          Production backends, Transformer ensembles, and cinematic digital experiences —
          from live restaurant POS systems to fake-news detection at scale.
        </p>

        <div className="hero-actions">
          <Button asChild size="lg">
            <a href="#projects">Explore The Build</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/resume/Danyal_Tanveer-Resume.pdf" download>Download CV</a>
          </Button>
        </div>

        <div className="hero-stats">
          {[
            { n: '5+', l: 'Flagship Projects' },
            { n: '10', l: 'ML Models' },
            { n: '2', l: 'Live Clients' },
            { n: '20+', l: 'Repositories' },
          ].map((s) => (
            <div key={s.l} className="hero-stat">
              <span className="hero-stat-n">{s.n}</span>
              <span className="hero-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-portrait">
        <div className="hero-portrait-ring" />
        <div className="hero-portrait-glow" />
        <Image
          src="/textures/portrait.png"
          alt="Danyal Tanveer"
          width={340}
          height={420}
          className="hero-portrait-img"
          priority
        />
      </div>

      <div className="hero-scroll-hint">
        <span>Scroll to drive</span>
        <ArrowDown className="hero-scroll-icon" />
      </div>

      <div className="hero-social">
        <a href="mailto:danyaltanveer0276@gmail.com" aria-label="Email">
          <Mail className="h-4 w-4" />
        </a>
        <a href="https://github.com/Danyal-0276" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Code2 className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
