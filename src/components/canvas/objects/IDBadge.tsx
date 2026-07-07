'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/lib/store';

export default function IDBadge() {
  const texture = useTexture('/textures/portrait.png');
  const ref = useRef<THREE.Group>(null);
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);

  const hudMode = scrollProgress > 0.04;
  const targetPos = useRef(new THREE.Vector3(0, 0.2, 0));
  const targetScale = useRef(1);

  useFrame((state) => {
    if (!ref.current) return;

    if (hudMode) {
      targetPos.current.set(-3.2, 2.4, -2);
      targetScale.current = 0.35;
    } else {
      targetPos.current.set(0, 0.2, 0);
      targetScale.current = 1;
    }

    const lerpFactor = reducedMotion ? 1 : 0.06;
    ref.current.position.lerp(targetPos.current, lerpFactor);
    const s = THREE.MathUtils.lerp(ref.current.scale.x, targetScale.current, lerpFactor);
    ref.current.scale.setScalar(s);

    if (!reducedMotion) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        state.pointer.x * 0.15,
        0.05,
      );
    }
  });

  return (
    <group>
      <group ref={ref}>
        <mesh>
          <planeGeometry args={[1.2, 1.6]} />
          <meshPhysicalMaterial
            map={texture}
            roughness={0.35}
            clearcoat={0.6}
            metalness={0.15}
          />
        </mesh>
        {!hudMode && (
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[1.35, 1.75]} />
            <meshPhysicalMaterial color="#111" metalness={0.95} roughness={0.2} clearcoat={1} />
          </mesh>
        )}
      </group>
      <pointLight position={[1.5, 1, 1]} intensity={1.2} color="#2ec4b6" distance={6} />
    </group>
  );
}
