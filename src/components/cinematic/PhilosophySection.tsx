'use client';

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BOOT = [
  { text: 'J.A.R.V.I.S v4.1 — Gemini Core Active', type: 'sys' },
  { text: 'SpeechRecognition: [ENABLED]', type: 'ok' },
  { text: 'Particle visualizer: [ACTIVE]', type: 'ok' },
  { text: 'Terminal ready.', type: 'warn' },
];

const CMDS: Record<string, string[]> = {
  about: ['Danyal Tanveer — Full-Stack + NLP/ML Engineer @ UCP.'],
  skills: ['JS/TS · Python · Next.js · RoBERTa · PySpark'],
  projects: ['TRAK · POS · BERT · NIDS · J.A.R.V.I.S'],
  help: ['Commands: about | skills | projects | clear'],
};

export default function PhilosophySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logs, setLogs] = useState<Array<{ text: string; type: string }>>(BOOT);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    const S = 280;
    c.width = S;
    c.height = S;
    const cx = S / 2;
    const cy = S / 2;
    const pts = Array.from({ length: 220 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      spd: 0.004 + Math.random() * 0.005,
    }));
    let frame = 0;
    let raf: number;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, S, S);
      const b = 1 + Math.sin(frame * 0.02) * 0.06;
      const r = 100 * b;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 30);
      g.addColorStop(0, active ? 'rgba(200,255,0,0.15)' : 'rgba(46,196,182,0.08)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 35, 0, Math.PI * 2);
      ctx.fill();

      pts.forEach((p) => {
        p.theta += p.spd * (active ? 2.5 : 1);
        const x = cx + r * Math.sin(p.phi) * Math.cos(p.theta);
        const y = cy + r * Math.cos(p.phi);
        const d = (Math.sin(p.phi) * Math.cos(p.theta) + 1) / 2;
        ctx.beginPath();
        ctx.arc(x, y, 1 + d * 2, 0, Math.PI * 2);
        ctx.fillStyle = active
          ? `rgba(200,255,0,${0.3 + d * 0.7})`
          : `rgba(46,196,182,${0.2 + d * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const run = (cmd: string) => {
    const key = cmd.trim().toLowerCase();
    if (key === 'clear') { setLogs([]); setActive(false); return; }
    if (key === 'jarvis') setActive(true);
    const out = CMDS[key] ?? [`Unknown: "${key}". Try 'help'.`];
    setLogs((prev) => [...prev, { text: `$ ${cmd}`, type: 'cmd' }, ...out.map((t) => ({ text: t, type: 'ok' }))]);
  };

  return (
    <section id="philosophy" className="cine-section philosophy-section">
      <div className="container-cine philosophy-grid">
        <div className="philosophy-left">
          <Badge variant="outline" data-reveal>Philosophy</Badge>
          <h2 className="cine-heading" data-reveal>
            COGNITIVE<br /><span className="text-lime">SYNTHESIS</span>
          </h2>
          <p className="cine-sub" data-reveal>
            J.A.R.V.I.S — a Gemini-powered desktop AI that hears, reasons, and responds.
            Run <code className="text-lime">jarvis</code> in the terminal.
          </p>
          <canvas ref={canvasRef} className="philosophy-sphere" aria-hidden />
          <p className={`sphere-status ${active ? 'active' : ''}`}>
            {active ? 'J.A.R.V.I.S — ONLINE' : 'Particle Sphere — Idle'}
          </p>
        </div>

        <div className="philosophy-terminal" data-reveal>
          <div className="terminal-bar">
            <span className="tdot bg-red-500" />
            <span className="tdot bg-amber-500" />
            <span className="tdot bg-green-500" />
            <span className="font-mono text-[0.62rem] text-white/30 ml-2">jarvis@danyal-os:~</span>
          </div>
          <div className="terminal-body">
            {logs.map((l, i) => (
              <div key={i} className={`log-${l.type}`}>{l.text}</div>
            ))}
          </div>
          <div className="terminal-cmds">
            {['about', 'skills', 'jarvis', 'projects', 'help', 'clear'].map((cmd) => (
              <Button key={cmd} variant="ghost" size="sm" onClick={() => run(cmd)}>
                {cmd}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
