'use client';

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Environment } from '@react-three/drei';
import CameraRig from './CameraRig';
import PostFX from './fx/PostFX';
import HeroRoom from './rooms/HeroRoom';
import OriginRoom from './rooms/OriginRoom';
import SkillsConstellation from './rooms/SkillsConstellation';
import BuildCorridor from './rooms/BuildCorridor';
import ResearchRoom from './rooms/ResearchRoom';
import PhilosophyRoom from './rooms/PhilosophyRoom';
import ContactDesk from './rooms/ContactDesk';
import { usePortfolioStore } from '@/lib/store';
import type { DeviceTier } from '@/lib/store';

function SceneContent() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} castShadow />
      <fog attach="fog" args={['#0a0908', 15, 80]} />
      <Environment preset="city" />
      <HeroRoom />
      <OriginRoom />
      <SkillsConstellation />
      <BuildCorridor />
      <ResearchRoom />
      <PhilosophyRoom />
      <ContactDesk />
      <PostFX />
      <Preload all />
    </>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#e63946" wireframe />
    </mesh>
  );
}

interface ExperienceProps {
  deviceTier: DeviceTier;
}

export default function Experience({ deviceTier }: ExperienceProps) {
  const setLoaded = usePortfolioStore((s) => s.setIsLoaded);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  const dpr = deviceTier === 'high' ? 2 : deviceTier === 'mid' ? 1.5 : 1;
  const fov = typeof window !== 'undefined' && window.innerWidth < 768 ? 65 : 55;

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{ antialias: deviceTier !== 'low', alpha: false, powerPreference: 'high-performance' }}
      camera={{ fov, near: 0.1, far: 250, position: [0, 0, 5] }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#0a0908' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          usePortfolioStore.getState().setUse3D(false);
        });
      }}
    >
      <Suspense fallback={<Loader />}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
