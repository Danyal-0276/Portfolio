"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'input';
}

const commands = {
  about: 'Danyal Tanveer — Final-year CS student at UCP. Specializes in full-stack platforms with Redis caching and custom NLP/ML pipelines.',
  skills: 'Languages: JS/TS, Python, SQL, C++, Kotlin. Frameworks: Next.js 15, React Native, Django, Express. AI: RoBERTa, DeBERTa, PySpark.',
  philosophy: 'Build production-grade backends, synthesize them with state-of-the-art NLP. Rigor meets cognitive intelligence.',
  jarvis: 'J.A.R.V.I.S is live. Gemini-powered desktop assistant. SpeechRecognition: [ENABLED]. pyttsx3: [ENABLED]. Particle UI: [ACTIVE].',
  clear: '',
};

// Particle Sphere (CSS/canvas-based since no R3F in this DOM section)
function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width = 300;
    const H = canvas.height = 300;
    const cx = W / 2;
    const cy = H / 2;
    const R = 110;
    const NUM = 200;
    let frame = 0;

    type Particle = { theta: number; phi: number; r: number; speed: number };
    const particles: Particle[] = Array.from({ length: NUM }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      r: R + (Math.random() - 0.5) * 18,
      speed: 0.003 + Math.random() * 0.004,
    }));

    let animId: number;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Breathing glow
      const breathScale = 1 + Math.sin(frame * 0.025) * 0.06;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * breathScale + 20);
      grd.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      grd.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, R * breathScale + 25, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach(p => {
        p.theta += p.speed;
        // Project 3D sphere coords to 2D
        const x = cx + p.r * Math.sin(p.phi) * Math.cos(p.theta) * breathScale;
        const y = cy + p.r * Math.cos(p.phi) * breathScale;
        const depth = Math.sin(p.phi) * Math.cos(p.theta) * 0.5 + 0.5;
        const size = 1.2 + depth * 1.8;
        const alpha = 0.3 + depth * 0.65;

        // Color: blend blue → cyan based on depth
        const r = Math.round(59 + (6 - 59) * depth);
        const g = Math.round(130 + (182 - 130) * depth);
        const b = Math.round(246 + (212 - 246) * depth);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', margin: '0 auto', opacity: 0.95 }}
      aria-label="J.A.R.V.I.S particle sphere visualization"
    />
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const [logs, setLogs] = useState<LogLine[]>([
    { text: 'Jarvis OS v4.1 — Active Terminal Initialized.', type: 'info' },
    { text: 'Loading backend and ML verification scripts...', type: 'info' },
    { text: 'nextjs_pos_client.ts .............. [OK]', type: 'success' },
    { text: 'evaluate_transformers.py .......... [OK]', type: 'success' },
    { text: 'spark_ids_network.scala ........... [OK]', type: 'success' },
    { text: 'gemini_eel_assistant.py ........... [OK]', type: 'success' },
    { text: 'Terminal ready. Type a command below.', type: 'warn' },
  ]);

  const handleCommand = (cmd: keyof typeof commands) => {
    if (cmd === 'clear') {
      setLogs([]);
      return;
    }
    const output = commands[cmd];
    setLogs(prev => [
      ...prev,
      { text: `> run ${cmd}`, type: 'input' },
      { text: output, type: 'info' },
    ]);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

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

  const logColors: Record<LogLine['type'], string> = {
    info: 'var(--text-secondary)',
    success: '#10b981',
    warn: '#f59e0b',
    input: '#06b6d4',
  };

  return (
    <section ref={sectionRef} className="section-two-col">
      {/* Left: Philosophy text + Jarvis sphere */}
      <div style={{ flex: '1 1 320px', position: 'relative', zIndex: 10 }}>
        <span className="chapter-number" style={{ display: 'block', marginBottom: '0.75rem' }}>
          Chapter VI: Synthesis
        </span>

        <h2
          ref={titleRef}
          className="text-gradient"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, clipPath: "inset(0 0% 0 0%)", marginBottom: '1.5rem' }}
        >
          Engineering Philosophy
        </h2>

        <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
          <div ref={subRef}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.04rem', lineHeight: '1.72', marginBottom: '1.25rem' }}>
              Software should not be passive logic — it should be active, intelligent storytelling. My work bridges systems-level engineering (databases, API gateways, cache layers) with applied natural language processing.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.04rem', lineHeight: '1.72' }}>
              J.A.R.V.I.S, the Gemini-powered speech assistant I engineered, is the manifestation of this synergy — unifying local Python scripts with artificial cognitive nodes. The particle sphere is its heartbeat.
            </p>
          </div>
        </div>

        {/* J.A.R.V.I.S Particle Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '1.5rem',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '260px', height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulse 3s infinite alternate',
          }} />
          <ParticleSphere />
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#06b6d4',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginTop: '0.75rem',
          }}>
            J.A.R.V.I.S — Particle Sphere Active
          </p>
        </motion.div>
      </div>

      {/* Right: Interactive Terminal */}
      <div style={{ flex: '1 1 320px', position: 'relative', zIndex: 10 }}>
        <div
          className="crt-screen"
          style={{
            background: '#030712',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            height: '420px',
          }}
        >
          {/* Terminal top bar */}
          <div style={{
            background: '#0d1221',
            padding: '0.6rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              marginLeft: '1rem',
            }}>
              jarvis@danyal-os:~ — terminal
            </span>
          </div>

          {/* Log output */}
          <div style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.76rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            lineHeight: '1.5',
          }}>
            {logs.map((log, idx) => (
              <div key={idx} style={{ color: logColors[log.type] }}>
                {log.type === 'input' ? (
                  <span>
                    <span style={{ color: '#10b981', marginRight: '0.4rem' }}>❯</span>
                    {log.text.replace('> ', '')}
                  </span>
                ) : log.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Command buttons */}
          <div style={{
            padding: '0.75rem 1rem',
            background: '#060c1a',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}>
            {(Object.keys(commands) as Array<keyof typeof commands>).map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleCommand(cmd)}
                className="interactive-ui"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: cmd === 'jarvis' ? '#06b6d4' : 'var(--text-secondary)',
                  padding: '0.32rem 0.7rem',
                  fontSize: '0.7rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(6,182,212,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(6,182,212,0.3)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#06b6d4';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = cmd === 'jarvis' ? '#06b6d4' : 'var(--text-secondary)';
                }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
