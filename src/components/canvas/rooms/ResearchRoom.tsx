'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useChapterVisibility } from '@/lib/hooks';

const matrixPanels = [
  { label: 'BERT Benchmark', color: '#8b5cf6', position: [-1.2, 1.2, 0] as [number, number, number] },
  { label: 'TRAK Ensemble', color: '#06b6d4', position: [1.2, 1.2, 0] as [number, number, number] },
];

function ConfusionGrid({ color }: { color: string }) {
  const cells = 9;
  return (
    <group>
      {Array.from({ length: cells }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const intensity = [0.9, 0.3, 0.5, 0.2, 0.95, 0.4, 0.35, 0.25, 0.85][i];
        return (
          <mesh key={i} position={[(col - 1) * 0.18, (1 - row) * 0.18, 0.01]}>
            <planeGeometry args={[0.15, 0.15]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.2 + intensity * 0.6}
              emissive={color}
              emissiveIntensity={intensity * 0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function FloatingPanel({ label, color, position }: {
  label: string;
  color: string;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const visible = useChapterVisibility(4);

  useFrame((state) => {
    if (!ref.current || !visible) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.08;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <planeGeometry args={[1.1, 0.9]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.7} transparent opacity={0.35} roughness={0.1} />
      </mesh>
      <ConfusionGrid color={color} />
      <Html position={[0, -0.65, 0.05]} center distanceFactor={10}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color, whiteSpace: 'nowrap' }}>
          {label}
        </span>
      </Html>
    </group>
  );
}

export default function ResearchRoom() {
  return (
    <group position={[0, 0, -130]}>
      <Text position={[0, 2.2, 0]} fontSize={0.14} color="#2ec4b6" anchorX="center">
        ML Research Lab
      </Text>
      {matrixPanels.map((p) => (
        <FloatingPanel key={p.label} {...p} />
      ))}
      <pointLight position={[0, 2, 1]} intensity={1.5} color="#2ec4b6" distance={8} />
    </group>
  );
}
