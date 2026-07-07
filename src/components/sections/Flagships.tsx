"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projects, secondaryProjects } from '@/lib/projects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ImageCarousel({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  if (!screenshots || screenshots.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % screenshots.length);
  };
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '220px',
      margin: '1.25rem 0',
      borderRadius: '10px',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      background: '#050810',
    }}>
      <img
        src={screenshots[currentIdx]}
        alt={`${title} snapshot ${currentIdx + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
      {screenshots.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            style={{
              position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(3,7,18,0.85)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: '32px', height: '32px', color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', zIndex: 10, transition: 'all 0.2s ease',
            }}
          >&#8249;</button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(3,7,18,0.85)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: '32px', height: '32px', color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', zIndex: 10, transition: 'all 0.2s ease',
            }}
          >&#8250;</button>
          <div style={{
            position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '5px', zIndex: 10,
          }}>
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: '6px', height: '6px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                  background: currentIdx === idx ? 'var(--accent-red)' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Flagships() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        clipPath: "inset(0 50% 0 50%)",
        duration: 1.2,
        ease: "power3.inOut",
      });
      gsap.from(subRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        yPercent: 100,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        minHeight: '100vh',
        padding: '5rem 1.5rem',
        maxWidth: '72rem',
        margin: '0 auto',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <span className="chapter-number" style={{ display: 'block', marginBottom: '0.75rem' }}>
          Chapter IV: Flagships
        </span>

        <h2
          ref={titleRef}
          className="text-gradient"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, clipPath: "inset(0 0% 0 0%)", marginBottom: '1rem' }}
        >
          The Build Corridor
        </h2>

        <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
          <p
            ref={subRef}
            style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', maxWidth: '640px' }}
          >
            Five flagship repositories — the real narrative arc from fundamentals to production systems to ML research. Each diorama is a room in the corridor.
          </p>
        </div>

        {/* Flagship Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="glass-panel"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                borderRadius: '18px',
                borderLeft: `4px solid ${project.accentColor}`,
                borderTop: '1px solid var(--border-color)',
                borderRight: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                background: `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, ${project.accentColor}06 100%)`,
              }}
            >
              <div>
                {/* Accent dot + title */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: project.accentColor,
                    boxShadow: `0 0 10px ${project.accentColor}`,
                    flexShrink: 0,
                    marginTop: '0.45rem',
                  }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                    {project.title}
                  </h3>
                </div>
                <p style={{ color: project.accentColor, fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', marginLeft: '1.6rem' }}>
                  {project.tagline}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: '1.65', marginBottom: '0.5rem' }}>
                  {project.description}
                </p>

                <ImageCarousel screenshots={project.screenshots} title={project.title} />
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                <div className="tech-tags" style={{ marginBottom: '1.5rem' }}>
                  {project.tech.map((t, sIdx) => (
                    <span
                      key={sIdx}
                      className="tech-tag"
                      style={{
                        fontSize: '0.72rem',
                        borderColor: `${project.accentColor}30`,
                        color: project.accentColor,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {Object.entries(project.links).map(([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={name === 'pos' || name === 'app' || name === 'repo' ? 'btn-primary' : 'btn-secondary'}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.75rem',
                        borderRadius: '8px',
                        ...(name === 'pos' || name === 'app' || name === 'repo'
                          ? { background: project.accentColor, borderColor: project.accentColor, boxShadow: `0 0 12px ${project.accentColor}40` }
                          : {}),
                      }}
                    >
                      {name.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary / Archive Shelf */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}>
            — Archive Shelf
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {secondaryProjects.map((proj, idx) => (
              <motion.div
                key={idx}
                className="glass-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  borderLeft: `3px solid ${proj.accentColor}`,
                  borderTop: '1px solid var(--border-color)',
                  borderRight: '1px solid var(--border-color)',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.5rem' }}>
                  {proj.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: '1.55', marginBottom: '1rem' }}>
                  {proj.description}
                </p>
                {'screenshots' in proj && proj.screenshots && proj.screenshots.length > 0 && (
                  <ImageCarousel screenshots={proj.screenshots} title={proj.title} />
                )}
                <div className="tech-tags">
                  {proj.tech.map((t, si) => (
                    <span key={si} className="tech-tag" style={{ fontSize: '0.7rem' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
