'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth + 200}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="cine-section horizontal-gallery">
      <div className="horizontal-gallery-header">
        <Badge>Moments · The Build</Badge>
        <h2 className="cine-heading reveal-up">
          PROJECT<br /><span className="text-lime">CORRIDOR</span>
        </h2>
        <p className="cine-sub reveal-up">
          Scroll horizontally through flagship repos — production systems, ML research, and agentic AI.
        </p>
      </div>

      <div ref={trackRef} className="horizontal-track">
        {moments.map((m) => (
          <a
            key={m.id}
            href={m.link}
            target="_blank"
            rel="noopener noreferrer"
            className="moment-card"
            style={{ '--accent': m.color } as React.CSSProperties}
          >
            <div className="moment-card-image">
              <Image src={m.image} alt={m.title} fill sizes="400px" className="object-cover" />
              <div className="moment-card-overlay" />
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
