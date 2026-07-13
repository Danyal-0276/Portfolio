'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';

const moments = projects.flatMap((p) =>
  p.screenshots.slice(0, 2).map((shot, i) => ({
    id: `${p.id}-${i}`,
    title: p.title.split('—')[0].trim(),
    subtitle: p.tagline,
    image: shot,
    color: p.accentColor,
    link: Object.values(p.links)[0],
  })),
);

export default function HorizontalGallery() {
  return (
    <section id="projects" className="cine-section horizontal-gallery">
      <div className="horizontal-gallery-header">
        <Badge data-reveal>Moments · The Build</Badge>
        <h2 className="cine-heading" data-reveal>
          PROJECT<br /><span className="text-lime">CORRIDOR</span>
        </h2>
        <p className="cine-sub" data-reveal>
          Keep scrolling — this section pins and drives sideways through flagship repos.
        </p>
      </div>

      <div className="horizontal-track">
        {moments.map((m) => (
          <a
            key={m.id}
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            className="moment-card"
            style={{ '--accent': m.color } as CSSProperties}
          >
            <div className="moment-card-image">
              <Image src={m.image} alt={m.title} fill sizes="420px" className="object-cover" />
              <div className="moment-card-overlay" />
              <span className="moment-card-num">{m.id.split('-')[0].toUpperCase()}</span>
            </div>
            <div className="moment-card-body">
              <span className="moment-card-tag">{m.subtitle}</span>
              <h3>{m.title}</h3>
              <ExternalLink className="h-4 w-4 text-lime" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
