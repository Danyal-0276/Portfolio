'use client';

import { Html } from '@react-three/drei';

export default function ResumeDocument() {
  const handleOpen = () => {
    const link = document.createElement('a');
    link.href = '/resume/Danyal_Tanveer-Resume.pdf';
    link.download = 'Danyal_Tanveer-Resume.pdf';
    link.click();
  };

  return (
    <group position={[0, 0.05, 0]}>
      <mesh
        onClick={handleOpen}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[0.6, 0.8, 0.02]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.9} metalness={0} />
      </mesh>
      <Html position={[0, 0, 0.04]} transform occlude distanceFactor={6}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: '#444',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          Résumé — click to open
        </span>
      </Html>
    </group>
  );
}
