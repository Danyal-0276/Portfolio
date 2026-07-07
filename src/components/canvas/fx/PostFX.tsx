'use client';

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useDeviceTier } from '@/lib/hooks';

export default function PostFX() {
  const tier = useDeviceTier();
  if (tier !== 'high') return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.35} luminanceThreshold={0.6} luminanceSmoothing={0.9} />
      <Vignette eskil={false} offset={0.12} darkness={0.55} />
    </EffectComposer>
  );
}
