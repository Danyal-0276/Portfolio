'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '@/lib/projects';
import ParticleSphere from './ParticleSphere';
import { usePortfolioStore } from '@/lib/store';

interface ProjectDioramaProps {
  project: Project;
  position: [number, number, number];
  active: boolean;
}

function TrakDiorama({ active }: { active: boolean }) {
  const needle = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!needle.current) return;
    needle.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.2) * 0.4;
  });
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.35, 0.65, 0.05]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} emissive={active ? '#06b6d4' : '#000'} emissiveIntensity={active ? 0.3 : 0} />
      </mesh>
      <mesh ref={needle} position={[0, 0.35, 0.06]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.25, 0.01]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={active ? 1 : 0.3} />
      </mesh>
    </group>
  );
}

function PosDiorama({ active }: { active: boolean }) {
  const positions: [number, number, number][] = [[-0.6, 0.4, 0], [0, 0.4, 0], [0.6, 0.4, 0]];
  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.4, 0.5, 0.08]} />
          <meshStandardMaterial color="#1e293b" emissive="#f59e0b" emissiveIntensity={active ? 0.5 : 0.1} />
        </mesh>
      ))}
      {active && (
        <mesh position={[0, 0.45, 0]}>
          <torusGeometry args={[0.55, 0.008, 8, 64]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}

function BertDiorama({ active }: { active: boolean }) {
  const heights = [0.4, 0.55, 0.7, 0.85, 0.95, 0.75, 0.6, 0.5, 0.65, 0.8];
  return (
    <group>
      {heights.map((h, i) => (
        <mesh key={i} position={[(i - 4.5) * 0.14, h / 2, 0]}>
          <boxGeometry args={[0.1, h, 0.1]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            transmission={0.6}
            transparent
            opacity={active ? 0.85 : 0.4}
            roughness={0.05}
            emissive="#8b5cf6"
            emissiveIntensity={active ? 0.2 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

function NidsDiorama({ active }: { active: boolean }) {
  const nodes = 12;
  return (
    <group>
      {Array.from({ length: nodes }).map((_, i) => {
        const angle = (i / nodes) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.7, 0.3 + (i % 3) * 0.15, Math.sin(angle) * 0.7]}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={active && i % 4 === 0 ? 0.8 : 0.15} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.35, 0.5, 4]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={active ? 0.6 : 0.1} wireframe />
      </mesh>
    </group>
  );
}

function DioramaVisual({ project, active }: { project: Project; active: boolean }) {
  switch (project.id) {
    case 'trak': return <TrakDiorama active={active} />;
    case 'pos-ecosystem': return <PosDiorama active={active} />;
    case 'bert-benchmark': return <BertDiorama active={active} />;
    case 'nids': return <NidsDiorama active={active} />;
    case 'jarvis': return <ParticleSphere active={active} scale={0.55} color="#3b82f6" />;
    default: return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={project.accentColor} emissive={project.accentColor} emissiveIntensity={active ? 0.4 : 0.1} />
      </mesh>
    );
  }
}

export default function ProjectDiorama({ project, position, active }: ProjectDioramaProps) {
  const setHovered = usePortfolioStore((s) => s.setHoveredProjectId);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, active ? 0 : 0.15, 0.03);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(project.id)}
      onPointerOut={() => setHovered(null)}
    >
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[2.4, 0.08, 2.4]} />
        <meshStandardMaterial color="#141210" roughness={0.9} />
      </mesh>
      <pointLight position={[0, 1.5, 0.5]} intensity={active ? 2 : 0.3} color={project.accentColor} distance={4} />
      <DioramaVisual project={project} active={active} />
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.12}
        color={active ? '#ffffff' : '#888888'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.title.split('—')[0].trim()}
      </Text>
      {active && (
        <Html position={[0, -0.5, 1.2]} center distanceFactor={8}>
          <div style={{
            background: 'rgba(10,9,8,0.85)',
            border: `1px solid ${project.accentColor}40`,
            borderRadius: 8,
            padding: '0.5rem 0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: '#fff',
            maxWidth: 180,
            pointerEvents: 'none',
          }}>
            {project.tagline}
          </div>
        </Html>
      )}
    </group>
  );
}
