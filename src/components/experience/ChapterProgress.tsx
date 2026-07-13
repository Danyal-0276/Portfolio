'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Props {
  trackRef: React.RefObject<HTMLElement | null>;
  label: string;
}

export default function ChapterProgress({ trackRef, label }: Props) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(fill, { width: `${self.progress * 100}%` });
      },
    });

    return () => st.kill();
  }, [trackRef]);

  return (
    <div className="chapter-progress">
      <span className="chapter-progress-label">{label}</span>
      <div className="chapter-progress-bar">
        <div ref={fillRef} className="chapter-progress-fill" />
      </div>
      <span className="chapter-progress-label">SCROLL</span>
    </div>
  );
}
