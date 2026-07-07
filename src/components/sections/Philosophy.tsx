"use client";

import React, { useEffect, useRef, useState } from "react";

interface LogLine { text: string; type: "sys" | "ok" | "warn" | "cmd" }

const BOOT_SEQUENCE: LogLine[] = [
  { text: "J.A.R.V.I.S v4.1 — Gemini Core Active", type: "sys" },
  { text: "Loading speech recognition engine...", type: "sys" },
  { text: "SpeechRecognition: [ENABLED]", type: "ok" },
  { text: "pyttsx3 TTS: [ENABLED]", type: "ok" },
  { text: "Particle visualizer: [ACTIVE]", type: "ok" },
  { text: "Gemini API connection: [SECURE]", type: "ok" },
  { text: "Terminal ready. Type a command.", type: "warn" },
];

const COMMANDS: Record<string, LogLine[]> = {
  about: [
    { text: "Danyal Tanveer — Final-year CS @ UCP", type: "ok" },
    { text: "Full-Stack Dev + NLP/ML Engineer", type: "sys" },
  ],
  skills: [
    { text: "→ Languages: JS/TS, Python, SQL, C++, Kotlin", type: "ok" },
    { text: "→ AI/ML: RoBERTa, DeBERTa, PySpark", type: "ok" },
    { text: "→ Stack: Next.js 15, Express, Redis, MongoDB", type: "ok" },
  ],
  jarvis: [
    { text: "J.A.R.V.I.S online. Listening for commands.", type: "warn" },
    { text: "Gemini model: gemini-1.5-flash", type: "sys" },
    { text: "Voice channel: OPEN", type: "ok" },
  ],
  help: [
    { text: "Commands: about | skills | jarvis | clear", type: "sys" },
  ],
  clear: [],
};

// Canvas particle sphere
function ParticleSphere({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const S = 280;
    canvas.width = S;
    canvas.height = S;
    const cx = S / 2, cy = S / 2, R = 100;

    type P = { theta: number; phi: number; speed: number };
    const pts: P[] = Array.from({ length: 220 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      speed: 0.004 + Math.random() * 0.005,
    }));

    let frame = 0, raf: number;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, S, S);

      const breathe = 1 + Math.sin(frame * 0.02) * 0.05;
      const r = R * breathe;

      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r + 30);
      grd.addColorStop(0, active ? "rgba(46,196,182,0.12)" : "rgba(99,102,241,0.06)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 32, 0, Math.PI * 2);
      ctx.fill();

      pts.forEach((p) => {
        p.theta += p.speed * (active ? 1.8 : 1);
        const x = cx + r * Math.sin(p.phi) * Math.cos(p.theta);
        const y = cy + r * Math.cos(p.phi);
        const depth = (Math.sin(p.phi) * Math.cos(p.theta) + 1) / 2;
        const size = 1 + depth * 2;
        const alpha = 0.2 + depth * 0.65;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = active
          ? `rgba(46,196,182,${alpha})`
          : `rgba(99,102,241,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <canvas ref={canvasRef} style={{ display: "block", margin: "0 auto" }} aria-hidden="true" />
  );
}

export default function Philosophy() {
  const [logs, setLogs] = useState<LogLine[]>(BOOT_SEQUENCE);
  const [jarvisActive, setJarvisActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const run = (cmd: string) => {
    const key = cmd.trim().toLowerCase();
    if (key === "clear") {
      setLogs([]);
      setJarvisActive(false);
      return;
    }
    if (key === "jarvis") setJarvisActive(true);
    const out = COMMANDS[key] ?? [{ text: `Command not found: ${key}. Try 'help'`, type: "warn" as const }];
    setLogs((prev) => [
      ...prev,
      { text: `$ ${cmd}`, type: "cmd" },
      ...out,
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const logColors: Record<string, string> = {
    sys: "#94a3b8",
    ok: "#2ec4b6",
    warn: "#f59e0b",
    cmd: "#e2e8f0",
  };

  return (
    <section className="section section-dark section-padding" data-section="5">
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <div className="label-mono reveal-up" style={{ color: "var(--accent-soft)", marginBottom: "0.75rem" }}>
            Chapter VI — Philosophy
          </div>
          <h2 className="heading-large reveal-up" style={{ color: "#fff" }}>
            Cognitive<br />
            <span className="text-gradient-accent">Synthesis.</span>
          </h2>
        </div>

        <div className="grid-2" style={{ alignItems: "start", gap: "4rem" }}>

          {/* Left: Philosophy text + sphere */}
          <div className="reveal-left">
            <p style={{ color: "var(--stone-400)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Software should be active, intelligent storytelling — not passive logic. My work bridges systems engineering (APIs, cache, distributed computation) with applied NLP research.
            </p>
            <p style={{ color: "var(--stone-400)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "3rem" }}>
              J.A.R.V.I.S is the physical manifestation of this synthesis: a Gemini-powered desktop AI that hears your voice, reasons, and responds — all from a local Python process.
            </p>

            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <ParticleSphere active={jarvisActive} />
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: jarvisActive ? "#2ec4b6" : "#6366f1",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginTop: "0.75rem",
                transition: "color 0.5s ease",
              }}>
                {jarvisActive ? "J.A.R.V.I.S — ONLINE" : "Particle Sphere — Idle"}
              </div>
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="reveal-right">
            <div className="terminal" style={{ height: "400px", display: "flex", flexDirection: "column" }}>
              {/* Terminal bar */}
              <div className="terminal-bar">
                <div className="terminal-dot" style={{ background: "#ef4444" }} />
                <div className="terminal-dot" style={{ background: "#f59e0b" }} />
                <div className="terminal-dot" style={{ background: "#22c55e" }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "#4b5563",
                  marginLeft: "0.75rem",
                }}>
                  jarvis@danyal-os:~
                </span>
              </div>

              {/* Log output */}
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem 1.25rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                lineHeight: 1.6,
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}>
                {logs.map((l, i) => (
                  <div key={i} style={{ color: logColors[l.type] ?? "#94a3b8" }}>
                    {l.type === "cmd" ? (
                      <span>
                        <span style={{ color: "#2ec4b6", marginRight: "0.4rem" }}>❯</span>
                        {l.text.replace("$ ", "")}
                      </span>
                    ) : l.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Command buttons */}
              <div style={{
                padding: "0.6rem 1rem",
                background: "#101010",
                borderTop: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                gap: "0.4rem",
                flexWrap: "wrap",
              }}>
                {["about", "skills", "jarvis", "help", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => run(cmd)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: cmd === "jarvis" ? "#2ec4b6" : "#64748b",
                      padding: "0.28rem 0.65rem",
                      borderRadius: "5px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(46,196,182,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(46,196,182,0.3)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#2ec4b6";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLButtonElement).style.color = cmd === "jarvis" ? "#2ec4b6" : "#64748b";
                    }}
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
