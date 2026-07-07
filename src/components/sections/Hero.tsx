"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Box, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

/* ── Floating geometric shapes ── */
function FloatingShapes({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle mouse parallax
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current[0] * 0.15,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current[1] * -0.08,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Main distorted sphere — center focus */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <Sphere args={[1.1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#e63946"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={1}
          />
        </Sphere>
      </Float>

      {/* Torus ring orbiting */}
      <Float speed={0.8} rotationIntensity={1.5} floatIntensity={0.6}>
        <Torus args={[1.8, 0.04, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} transparent opacity={0.6} />
        </Torus>
      </Float>

      {/* Smaller accent sphere */}
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.8}>
        <Sphere args={[0.35, 32, 32]} position={[2.5, 1.2, -0.5]}>
          <meshStandardMaterial color="#2ec4b6" emissive="#2ec4b6" emissiveIntensity={0.4} roughness={0.1} metalness={0.9} />
        </Sphere>
      </Float>

      {/* Tiny wireframe cube */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <Box args={[0.5, 0.5, 0.5]} position={[-2.8, -0.8, 0]}>
          <meshStandardMaterial color="#6366f1" wireframe />
        </Box>
      </Float>

      {/* Small teal box */}
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={0.9}>
        <Box args={[0.3, 0.3, 0.3]} position={[-1.8, 1.8, -1]}>
          <meshStandardMaterial color="#e9c46a" emissive="#e9c46a" emissiveIntensity={0.3} roughness={0.3} metalness={0.7} />
        </Box>
      </Float>

      {/* Second torus, perpendicular */}
      <Float speed={0.6} rotationIntensity={0.9} floatIntensity={0.4}>
        <Torus args={[2.5, 0.025, 12, 120]} position={[0, 0, 0]} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.2} transparent opacity={0.35} />
        </Torus>
      </Float>
    </group>
  );
}

/* ── Particle cloud ── */
function Particles() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#e63946" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ── Camera setup ── */
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 5.5);
  }, [camera]);
  return null;
}

/* ── Main 3D Scene ── */
function Scene3D({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <CameraSetup />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#e63946" />
      <pointLight position={[3, 3, -2]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-3, 0, -3]} intensity={0.6} color="#2ec4b6" />
      <fog attach="fog" args={["#0a0908", 8, 20]} />

      <Particles />
      <FloatingShapes mouse={mouse} />
    </>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  // Hero entrance animation — runs after loading gate fades
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".hero-tag",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      )
      .fromTo(".hero-name-1",
        { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(".hero-name-2",
        { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" },
        "-=0.75"
      )
      .fromTo(".hero-role",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".hero-desc",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-btns",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-stat",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section section-dark"
      data-section="0"
      style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center" }}
    >
      {/* ── R3F Canvas — full background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas
          gl={{ antialias: true, alpha: false }}
          camera={{ fov: 55, near: 0.1, far: 100 }}
          style={{ background: "#0a0908" }}
        >
          <Scene3D mouse={mouse} />
        </Canvas>
      </div>

      {/* ── Gradient overlay — text legibility ── */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(105deg, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.7) 55%, rgba(10,9,8,0.2) 100%)",
        }}
      />

      {/* ── Text content ── */}
      <div
        ref={textRef}
        className="container"
        style={{ position: "relative", zIndex: 2, paddingTop: "7rem", paddingBottom: "5rem" }}
      >
        <div style={{ maxWidth: "620px" }}>
          {/* Chapter label */}
          <div
            className="hero-tag label"
            style={{ marginBottom: "1.75rem", opacity: 0 }}
          >
            Chapter I — Introduction
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
              overflow: "hidden",
            }}
          >
            <div className="hero-name-1" style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "#fff", opacity: 0 }}>
              Danyal
            </div>
            <div
              className="hero-name-2"
              style={{
                fontSize: "clamp(4rem, 10vw, 8rem)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                opacity: 0,
              }}
            >
              Tanveer
            </div>
          </div>

          {/* Role */}
          <div
            className="hero-role"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.9rem, 2.2vw, 1.15rem)",
              color: "var(--accent-soft)",
              fontWeight: 500,
              marginBottom: "1.25rem",
              opacity: 0,
            }}
          >
            Full-Stack Engineer · NLP/ML Researcher
          </div>

          {/* Description */}
          <p
            className="hero-desc"
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.8,
              maxWidth: "480px",
              marginBottom: "2.5rem",
              opacity: 0,
            }}
          >
            Final-year CS at UCP. I build production backends, Redis-cached APIs,
            and Transformer classification ensembles — then wrap them in interactive 3D experiences.
          </p>

          {/* CTAs */}
          <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0 }}>
            <button
              className="btn btn-red"
              onClick={() => {
                document.querySelectorAll(".section")[3]?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Projects
            </button>
            <a href="/resume/Danyal_Tanveer-Resume.pdf" download className="btn btn-ghost-dark">
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "5+", l: "Projects" },
              { n: "10", l: "ML Models" },
              { n: "2", l: "Live Clients" },
              { n: "20+", l: "Repos" },
            ].map((s, i) => (
              <div key={i} className="hero-stat" style={{ opacity: 0 }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--accent-soft)",
                  letterSpacing: "-0.03em",
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: "0.2rem",
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        className="hero-scroll"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 2,
          opacity: 0,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>
          scroll
        </span>
        <div style={{
          width: "1px",
          height: "44px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.3), transparent)",
          animation: "float 2.2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}
