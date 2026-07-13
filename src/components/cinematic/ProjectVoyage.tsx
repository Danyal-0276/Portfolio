'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';
import MagneticCard from './MagneticCard';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ProjectVoyage() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.voyage-card');
      const bgs = gsap.utils.toArray<HTMLElement>('.voyage-bg-slice');
      const copies = gsap.utils.toArray<HTMLElement>('.voyage-copy');
      const count = cards.length;

      // Master scrubbed timeline — each project is a "beat"
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: () => `+=${count * window.innerHeight * 0.85}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const copy = copies[i];
        const bg = bgs[i];
        const enterDur = 1;
        const holdDur = 0.35;

        // Background crossfade
        master.to(bgs, { autoAlpha: 0, duration: 0.3, ease: 'power2.inOut' }, i * (enterDur + holdDur));
        master.to(bg, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, i * (enterDur + holdDur));

        if (i === 0) {
          master.fromTo(
            card,
            { x: '-120vw', y: '40vh', rotation: -25, scale: 0.45, autoAlpha: 0 },
            { x: '0vw', y: '0vh', rotation: 0, scale: 1, autoAlpha: 1, duration: enterDur, ease: 'power3.out' },
            0,
          );
          master.fromTo(copy, { x: 80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: enterDur * 0.8, ease: 'power3.out' }, 0.15);
        } else {
          const prev = cards[i - 1];
          const prevCopy = copies[i - 1];

          master.to(
            prev,
            {
              motionPath: {
                path: [
                  { x: 0, y: 0 },
                  { x: window.innerWidth * 0.35, y: -window.innerHeight * 0.15 },
                  { x: '110vw', y: '-30vh' },
                ],
                curviness: 1.2,
              },
              rotation: 18,
              scale: 0.35,
              autoAlpha: 0,
              duration: enterDur,
              ease: 'power2.in',
            },
            i * (enterDur + holdDur),
          );

          master.to(prevCopy, { x: -60, autoAlpha: 0, duration: enterDur * 0.5, ease: 'power2.in' }, i * (enterDur + holdDur));

          master.fromTo(
            card,
            { x: '-110vw', y: '50vh', rotation: -30, scale: 0.4, autoAlpha: 0 },
            { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: enterDur, ease: 'power4.out' },
            i * (enterDur + holdDur) + 0.05,
          );

          master.fromTo(
            copy,
            { x: 100, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: enterDur * 0.7, ease: 'power3.out' },
            i * (enterDur + holdDur) + 0.2,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="voyage" ref={sectionRef} className="project-voyage">
      {/* Per-project background color washes */}
      <div className="voyage-bg-stack">
        {projects.map((p) => (
          <div
            key={p.id}
            className="voyage-bg-slice"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${p.accentColor}35, transparent 70%),
                           radial-gradient(ellipse 60% 50% at 80% 70%, ${p.accentColor}20, transparent),
                           linear-gradient(160deg, #050508 0%, ${p.accentColor}12 50%, #030306 100%)`,
              ...( { '--accent': p.accentColor } as CSSProperties ),
            }}
          />
        ))}
      </div>

      <div className="voyage-header">
        <Badge>The Build · Voyage</Badge>
        <h2 className="voyage-heading">PROJECT<br /><span>FLIGHT PATH</span></h2>
        <p className="voyage-hint">Each scroll beat launches a new card — background shifts with the repo.</p>
      </div>

      <div ref={stageRef} className="voyage-stage">
        {projects.map((p) => (
          <div key={p.id} className="voyage-beat">
            <MagneticCard className="voyage-card" glow={p.accentColor} depth={16}>
              <div className="voyage-card-visual">
                {p.screenshots[0] ? (
                  <Image src={p.screenshots[0]} alt={p.title} fill sizes="(max-width:768px) 90vw, 50vw" className="object-cover" priority={p.id === 'trak'} />
                ) : (
                  <div className="voyage-placeholder" style={{ background: `${p.accentColor}22` }}>
                    <span style={{ color: p.accentColor }}>{p.title.split(' ')[0]}</span>
                  </div>
                )}
                <div className="voyage-card-scan" />
              </div>
              <div className="voyage-card-meta">
                <span className="voyage-index">{String(projects.indexOf(p) + 1).padStart(2, '0')}</span>
                <span className="voyage-card-title">{p.title.split('—')[0].trim()}</span>
              </div>
            </MagneticCard>

            <div className="voyage-copy">
              <p className="voyage-tagline" style={{ color: p.accentColor }}>{p.tagline}</p>
              <p className="voyage-desc">{p.description}</p>
              <div className="voyage-tech">
                {p.tech.slice(0, 5).map((t) => (
                  <span key={t} style={{ borderColor: `${p.accentColor}40`, color: p.accentColor }}>{t}</span>
                ))}
              </div>
              <Link href={Object.values(p.links)[0]} target="_blank" className="voyage-link" style={{ color: p.accentColor }}>
                Open repository <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="voyage-progress">
        {projects.map((p, i) => (
          <span key={p.id} className="voyage-tick" style={{ background: p.accentColor }}>
            {String(i + 1).padStart(2, '0')}
          </span>
        ))}
      </div>
    </section>
  );
}
