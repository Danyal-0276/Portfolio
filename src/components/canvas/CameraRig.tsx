'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getCameraFrame } from '@/lib/cameraPaths';
import { usePortfolioStore } from '@/lib/store';

export default function CameraRig() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const reducedMotion = usePortfolioStore((s) => s.reducedMotion);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const frame = getCameraFrame(scrollProgress);
    if (reducedMotion) {
      camera.position.copy(frame.position);
      target.current.copy(frame.lookAt);
    } else {
      camera.position.lerp(frame.position, 0.08);
      target.current.lerp(frame.lookAt, 0.08);
    }
    camera.lookAt(target.current);
  });

  return null;
}
