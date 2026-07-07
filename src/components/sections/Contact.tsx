"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: '📄',
    label: 'Résumé',
    subtitle: 'Download my full technical experience.',
    action: 'Download PDF',
    isDownload: true,
    accentColor: '#ff003c',
  },
  {
    icon: '📧',
    label: 'Email',
    subtitle: 'Reach my inbox directly.',
    action: 'Send Email',
    href: 'mailto:danyaltanveer0276@gmail.com',
    accentColor: '#f59e0b',
  },
  {
    icon: '💻',
    label: 'GitHub',
    subtitle: 'Browse active repos & contributions.',
    action: 'github.com/Danyal-0276',
    href: 'https://github.com/Danyal-0276',
    accentColor: '#8b5cf6',
  },
  {
    icon: '🤝',
    label: 'LinkedIn',
    subtitle: 'Professional updates & connections.',
    action: 'Connect Now',
    href: 'https://linkedin.com/in/danyal-tanveer',
    accentColor: '#06b6d4',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = '/resume/Danyal_Tanveer-Resume.pdf';
      link.download = 'Danyal_Tanveer-Resume.pdf';
      link.click();
    }
  };

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
        gap: '3rem',
        minHeight: '100vh',
        padding: '5rem 1.5rem',
        maxWidth: '56rem',
        margin: '0 auto',
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <span className="chapter-number" style={{ display: 'block', marginBottom: '0.75rem' }}>
          Chapter VII: The Connection
        </span>

        <h2
          ref={titleRef}
          className="text-gradient"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, clipPath: "inset(0 0% 0 0%)", marginBottom: '1rem' }}
        >
          Get In Touch
        </h2>

        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <p
            ref={subRef}
            style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.6' }}
          >
            Open to full-stack engineering roles, NLP development projects, and technical collaborations. The corridor ends here — let&apos;s build something great.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1.5rem',
        position: 'relative',
        zIndex: 10,
      }}>
        {contactItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="contact-card glass-panel"
            style={{
              border: `1px solid ${item.accentColor}20`,
              background: `linear-gradient(135deg, rgba(0,0,0,0.55) 0%, ${item.accentColor}06 100%)`,
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${item.accentColor}40`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px ${item.accentColor}15`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${item.accentColor}20`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div
              className="contact-icon"
              style={{
                color: item.accentColor,
                border: `1px solid ${item.accentColor}30`,
                background: `${item.accentColor}10`,
              }}
            >
              {item.icon}
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
              {item.label}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.45' }}>
              {item.subtitle}
            </p>
            {item.isDownload ? (
              <button
                type="button"
                onClick={handleDownload}
                className="btn-primary interactive-ui"
                style={{
                  marginTop: '0.5rem',
                  background: item.accentColor,
                  borderColor: item.accentColor,
                  boxShadow: `0 0 15px ${item.accentColor}30`,
                  fontSize: '0.82rem',
                  padding: '0.55rem 1rem',
                }}
              >
                {item.action}
              </button>
            ) : (
              <a
                href={item.href}
                target={item.href?.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="btn-secondary interactive-ui"
                style={{
                  marginTop: '0.5rem',
                  borderColor: `${item.accentColor}35`,
                  color: item.accentColor,
                  fontSize: '0.82rem',
                  padding: '0.55rem 1rem',
                }}
              >
                {item.action}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer signature */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}>
          Danyal Tanveer · danyaltanveer0276@gmail.com · UCP Computer Science · 2026
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'rgba(255,0,60,0.5)',
          marginTop: '0.35rem',
        }}>
          &gt; end_of_corridor.exe — Thank you for flying through.
        </p>
      </motion.div>
    </section>
  );
}
