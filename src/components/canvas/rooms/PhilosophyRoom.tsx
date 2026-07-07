'use client';

import { Text } from '@react-three/drei';
import ParticleSphere from '../objects/ParticleSphere';
import { usePortfolioStore } from '@/lib/store';

export default function PhilosophyRoom() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const active = scrollProgress > 0.82 && scrollProgress < 0.95;

  return (
    <group position={[0, 1.8, -160]}>
      <Text position={[0, 2.5, 0]} fontSize={0.14} color="#2ec4b6" anchorX="center">
        Cognitive Synthesis
      </Text>
      <Text
        position={[0, 2.1, 0]}
        fontSize={0.06}
        color="#888888"
        anchorX="center"
        maxWidth={3.5}
        textAlign="center"
      >
        Software should be active, intelligent storytelling — not passive logic.
      </Text>
      <ParticleSphere active={active} scale={1.2} color="#2ec4b6" />
      <pointLight position={[0, 1, 1]} intensity={active ? 2.5 : 1} color="#2ec4b6" distance={6} />
    </group>
  );
}
