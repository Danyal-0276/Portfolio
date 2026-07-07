'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '@/lib/projects';
import { useCameraPath } from '@/lib/hooks';

const categories = ['Languages', 'Frameworks', 'AI/ML', 'Databases', 'Tools'] as const;
const categoryColors: Record<string, string> = {
  Languages: '#e63946',
  Frameworks: '#6366f1',
  'AI/ML': '#2ec4b6',
  Databases: '#e9c46a',
  Tools: '#f59e0b',
};

function SkillGroup({ category, radius, speed, offset }: {
  category: string;
  radius: number;
  speed: number;
  offset: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const groupSkills = skills.filter((s) => s.category === category);
  const color = categoryColors[category] ?? '#fff';
  const { localProgress } = useCameraPath(2);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed + offset + localProgress * 0.4;
  });

  return (
    <group ref={groupRef}>
      {groupSkills.map((skill, i) => {
        const angle = (i / groupSkills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={skill.name} position={[x, Math.sin(angle * 2) * 0.2, z]}>
            <mesh>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <Html distanceFactor={12} center style={{ pointerEvents: 'none' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color, whiteSpace: 'nowrap' }}>
                {skill.name}
              </span>
            </Html>
          </group>
        );
      })}
      <Text position={[0, 0.5, 0]} fontSize={0.07} color={color} anchorX="center">
        {category}
      </Text>
    </group>
  );
}

export default function SkillsConstellation() {
  return (
    <group position={[0, 1, -30]}>
      <Text position={[0, 2, 0]} fontSize={0.14} color="#6366f1" anchorX="center">
        Skills Constellation
      </Text>
      {categories.map((cat, i) => (
        <SkillGroup
          key={cat}
          category={cat}
          radius={0.6 + i * 0.35}
          speed={0.15 + i * 0.04}
          offset={i * 1.2}
        />
      ))}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}
