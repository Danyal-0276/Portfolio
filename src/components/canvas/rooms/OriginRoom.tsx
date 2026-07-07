'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';

const jsProjects = [
  'Calculator', 'Weather App', 'Quiz App', 'Todo List', 'Recipe Book',
  'Expense Tracker', 'Movie Info', 'Lyrics Finder', 'Markdown Editor',
  'Drawing Board', 'Piano Synth', 'Typing Tester', 'Image Slider',
  'Color Palette', 'Password Gen', 'Clock/Timer', 'Voice Notes', 'Memory Game',
];

export default function OriginRoom() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const dummy = useRef(new THREE.Object3D());

  useFrame(() => {
    if (!ref.current) return;
    jsProjects.forEach((_, i) => {
      const row = Math.floor(i / 6);
      const col = i % 6;
      const x = (col - 2.5) * 0.35;
      const y = 0.15 + row * 0.35 + (hovered === i ? 0.1 : 0);
      const z = row * 0.05;
      dummy.current.position.set(x, y, z);
      dummy.current.scale.setScalar(hovered === i ? 1.15 : 1);
      dummy.current.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.current.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -15]}>
      <Text position={[0, 1.8, 0]} fontSize={0.14} color="#e63946" anchorX="center">
        JS Workshop Shelf
      </Text>
      <mesh position={[0, 0.5, -0.2]}>
        <boxGeometry args={[2.4, 0.06, 0.8]} />
        <meshStandardMaterial color="#292524" roughness={0.8} />
      </mesh>
      <instancedMesh
        ref={ref}
        args={[undefined, undefined, jsProjects.length]}
        onPointerMove={(e) => setHovered(e.instanceId ?? null)}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={0.35} />
      </instancedMesh>
      {hovered !== null && (
        <Html position={[(hovered % 6 - 2.5) * 0.35, 0.6, 0]} center distanceFactor={10}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#e63946', whiteSpace: 'nowrap' }}>
            {jsProjects[hovered]}
          </span>
        </Html>
      )}
    </group>
  );
}
