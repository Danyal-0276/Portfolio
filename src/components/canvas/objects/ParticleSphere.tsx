'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSphereProps {
  active?: boolean;
  scale?: number;
  color?: string;
}

export default function ParticleSphere({
  active = false,
  scale = 1,
  color = '#2ec4b6',
}: ParticleSphereProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 280;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      speed: 0.003 + Math.random() * 0.006,
      radius: 0.85 + Math.random() * 0.15,
    }));
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const breathe = 1 + Math.sin(t * 1.5) * 0.06 * (active ? 1.5 : 1);

    particles.forEach((p, i) => {
      p.theta += p.speed * (active ? 2.2 : 1);
      const r = p.radius * breathe * scale;
      const x = r * Math.sin(p.phi) * Math.cos(p.theta);
      const y = r * Math.cos(p.phi);
      const z = r * Math.sin(p.phi) * Math.sin(p.theta);
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.025 + (active ? 0.015 : 0));
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={active ? 0.9 : 0.45}
        transparent
        opacity={0.85}
      />
    </instancedMesh>
  );
}
