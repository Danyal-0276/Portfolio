import type { DeviceTier } from './store';

export interface DeviceCapabilityResult {
  tier: DeviceTier;
  reducedMotion: boolean;
  use3D: boolean;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function probeWebGL2(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch {
    return false;
  }
}

function estimateTier(): DeviceTier {
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 4 : 4;
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const hasWebGL2 = probeWebGL2();

  if (!hasWebGL2) return 'low';
  if (width < 768 || cores <= 4) return 'mid';
  if (cores >= 8 && width >= 1024) return 'high';
  return 'mid';
}

export async function detectDeviceCapability(): Promise<DeviceCapabilityResult> {
  const reducedMotion = prefersReducedMotion();
  const tier = estimateTier();
  const use3D = tier !== 'low' && !reducedMotion;

  return { tier, reducedMotion, use3D };
}
