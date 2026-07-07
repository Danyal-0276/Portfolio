'use client';

import { Text } from '@react-three/drei';
import ResumeDocument from '../objects/ResumeDocument';

const deskItems = [
  { label: 'Email', color: '#e63946', position: [-0.9, 0.12, 0.3] as [number, number, number], href: 'mailto:danyaltanveer0276@gmail.com' },
  { label: 'GitHub', color: '#6366f1', position: [0.9, 0.12, 0.3] as [number, number, number], href: 'https://github.com/Danyal-0276' },
  { label: 'LinkedIn', color: '#06b6d4', position: [0, 0.12, 0.55] as [number, number, number], href: 'https://linkedin.com/in/danyal-tanveer' },
];

export default function ContactDesk() {
  return (
    <group position={[0, 0.8, -185]}>
      <Text position={[0, 1.6, 0]} fontSize={0.14} color="#10b981" anchorX="center">
        Contact Desk
      </Text>
      {/* Desk surface */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[2.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.85} metalness={0.05} />
      </mesh>
      <group position={[-0.5, 0.05, -0.1]}>
        <ResumeDocument />
      </group>
      {deskItems.map((item) => (
        <mesh
          key={item.label}
          position={item.position}
          onClick={() => window.open(item.href, item.href.startsWith('mailto') ? '_self' : '_blank')}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'default'; }}
        >
          <boxGeometry args={[0.35, 0.06, 0.25]} />
          <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.25} />
        </mesh>
      ))}
      <pointLight position={[0, 1.5, 0.5]} intensity={1.2} color="#f4f1ea" distance={5} />
    </group>
  );
}
