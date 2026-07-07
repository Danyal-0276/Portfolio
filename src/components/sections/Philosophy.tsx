"use client";
import React, { useEffect, useRef, useState } from "react";

const BOOT: Array<{text: string; type: string}> = [
  { text: "J.A.R.V.I.S v4.1 — Gemini Core Active", type: "sys" },
  { text: "SpeechRecognition: [ENABLED]", type: "ok" },
  { text: "pyttsx3 TTS: [ENABLED]", type: "ok" },
  { text: "Particle visualizer: [ACTIVE]", type: "ok" },
  { text: "Gemini API connection: [SECURE]", type: "ok" },
  { text: "Terminal ready. Type a command below.", type: "warn" },
];
const CMDS: Record<string, Array<{text: string; type: string}>> = {
  about:    [{ text: "Danyal Tanveer — Final-year CS @ UCP. Full-Stack + NLP/ML Engineer.", type: "ok" }],
  skills:   [{ text: "→ JS/TS, Python, SQL, Kotlin, C++", type: "ok" }, { text: "→ Next.js 15, Express, Django, Redis", type: "ok" }, { text: "→ RoBERTa, DeBERTa, PySpark, PyTorch", type: "ok" }],
  jarvis:   [{ text: "J.A.R.V.I.S ONLINE. Voice channel: OPEN. Particle sphere ACTIVATING...", type: "warn" }],
  projects: [{ text: "→ TRAK · POS Ecosystem · BERT Benchmark · NIDS · J.A.R.V.I.S", type: "ok" }],
  help:     [{ text: "Commands: about | skills | jarvis | projects | clear", type: "sys" }],
  clear:    [],
};

function Sphere({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const S = 260; c.width = S; c.height = S;
    const cx = S/2, cy = S/2, R = 95;
    type P = { theta: number; phi: number; spd: number };
    const pts: P[] = Array.from({ length: 200 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      spd: 0.004 + Math.random() * 0.005,
    }));
    let frame = 0, raf: number;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, S, S);
      const b = 1 + Math.sin(frame * 0.02) * 0.05;
      const r = R * b;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 28);
      grd.addColorStop(0, active ? "rgba(46,196,182,0.14)" : "rgba(99,102,241,0.07)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, r + 30, 0, Math.PI * 2); ctx.fill();
      pts.forEach(p => {
        p.theta += p.spd * (active ? 2 : 1);
        const x = cx + r * Math.sin(p.phi) * Math.cos(p.theta);
        const y = cy + r * Math.cos(p.phi);
        const d = (Math.sin(p.phi) * Math.cos(p.theta) + 1) / 2;
        ctx.beginPath();
        ctx.arc(x, y, 1 + d * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = active ? `rgba(46,196,182,${0.2 + d * 0.7})` : `rgba(99,102,241,${0.2 + d * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} aria-hidden />;
}

export default function Philosophy() {
  const [logs, setLogs] = useState(BOOT);
  const [jarvis, setJarvis] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const run = (cmd: string) => {
    const key = cmd.trim().toLowerCase();
    if (key === "clear") { setLogs([]); setJarvis(false); return; }
    if (key === "jarvis") setJarvis(true);
    const out = CMDS[key] ?? [{ text: `Unknown command: "${key}". Try 'help'.`, type: "warn" }];
    setLogs(prev => [...prev, { text: `$ ${cmd}`, type: "cmd" }, ...out]);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  const C: Record<string, string> = { sys: "#6b7280", ok: "#2ec4b6", warn: "#f59e0b", cmd: "#e2e8f0" };

  return (
    <section className="section section-dark section-pad" data-section="5">
      <div className="container">

        <div style={{ marginBottom: "4rem" }}>
          <div className="label" data-up style={{ color: "var(--accent-soft)", marginBottom: "0.75rem" }}>Chapter VI — Philosophy</div>
          <h2 data-up style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", lineHeight: 1.05 }}>
            Cognitive<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-soft))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Synthesis.</span>
          </h2>
        </div>

        <div className="grid-2" style={{ alignItems: "start", gap: "4rem" }}>

          {/* Left: philosophy + sphere */}
          <div data-left>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.02rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              Software should be active, intelligent storytelling — not passive logic. My work bridges systems engineering with applied NLP research.
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.02rem", lineHeight: 1.85, marginBottom: "3rem" }}>
              J.A.R.V.I.S is that synthesis — a Gemini-powered desktop AI that hears, reasons, and responds. Run the <code style={{ color: "var(--teal)", fontSize: "0.85rem" }}>jarvis</code> command to activate its particle sphere.
            </p>
            <div style={{ textAlign: "center" }}>
              <Sphere active={jarvis} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.75rem", color: jarvis ? "var(--teal)" : "#6366f1", transition: "color 0.6s" }}>
                {jarvis ? "J.A.R.V.I.S — ONLINE" : "Particle Sphere — Idle"}
              </div>
            </div>
          </div>

          {/* Right: terminal */}
          <div data-right>
            <div className="terminal" style={{ display: "flex", flexDirection: "column", height: "420px" }}>
              <div className="terminal-bar">
                <div className="tdot" style={{ background: "#ef4444" }} />
                <div className="tdot" style={{ background: "#f59e0b" }} />
                <div className="tdot" style={{ background: "#22c55e" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#4b5563", marginLeft: "0.75rem" }}>jarvis@danyal-os:~</span>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", fontFamily: "var(--font-mono)", fontSize: "0.73rem", lineHeight: 1.65, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                {logs.map((l, i) => (
                  <div key={i} style={{ color: C[l.type] ?? "#6b7280" }}>
                    {l.type === "cmd" ? <span><span style={{ color: "#2ec4b6", marginRight: "0.4rem" }}>❯</span>{l.text.slice(2)}</span> : l.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div style={{ padding: "0.55rem 1rem", background: "#111", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {["about","skills","jarvis","projects","help","clear"].map(cmd => (
                  <button key={cmd} type="button" onClick={() => run(cmd)}
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: cmd === "jarvis" ? "#2ec4b6" : "#555", padding: "0.26rem 0.62rem", borderRadius: 5, fontFamily: "var(--font-mono)", fontSize: "0.67rem", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = "#2ec4b6"; (e.target as HTMLButtonElement).style.borderColor = "rgba(46,196,182,0.3)"; }}
                    onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = cmd === "jarvis" ? "#2ec4b6" : "#555"; (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
