'use client';

import { skills } from '@/lib/projects';

const doubled = [...skills, ...skills];

export default function TechMarquee() {
  return (
    <section className="cine-section tech-marquee">
      <div className="marquee-row">
        <div className="marquee-track">
          {doubled.map((s, i) => (
            <span key={`${s.name}-${i}`} className="marquee-item">
              {s.name}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
      <div className="marquee-row marquee-reverse">
        <div className="marquee-track">
          {doubled.map((s, i) => (
            <span key={`r-${s.name}-${i}`} className="marquee-item marquee-dim">
              {s.category}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
