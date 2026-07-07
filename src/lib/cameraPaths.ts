// Chapter mapping to progress — pure data, no THREE.js dependency
export const chapterProgress = [
  0.0,   // 0: Hero
  0.15,  // 1: Origin
  0.32,  // 2: Skills
  0.55,  // 3: Build (average of corridor)
  0.75,  // 4: Research
  0.88,  // 5: Philosophy
  1.0,   // 6: Contact
];

export const chapterNames = [
  'Hero Room',
  'JS Workshop',
  'Constellation',
  'The Corridor',
  'ML Research',
  'Synthesis',
  'Contact Desk',
];

// Room positions in 3D space (for reference / future R3F scene)
export const roomPositions = {
  hero: 0,
  origin: -15,
  skills: -30,
  buildStart: -55,
  buildStep: 11,
  research: -130,
  philosophy: -155,
  contact: -185,
};

// Camera path helper — lazily imports THREE only in browser context
// This avoids SSR issues with THREE.js
export async function getCameraFrameAsync(progress: number) {
  if (typeof window === 'undefined') return null;
  const THREE = await import('three');

  const positionPoints = [
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(2.5, 1.5, -12),
    new THREE.Vector3(-4, 2, -30),
    new THREE.Vector3(0, 1.2, -55),
    new THREE.Vector3(0, 1.2, -78),
    new THREE.Vector3(0, 1.2, -102),
    new THREE.Vector3(3.2, 1, -130),
    new THREE.Vector3(0, 1.8, -155),
    new THREE.Vector3(0, 1.4, -181.5),
  ];

  const targetPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.5, 0.8, -15),
    new THREE.Vector3(0, 1, -30),
    new THREE.Vector3(0, 1.2, -66),
    new THREE.Vector3(0, 1.2, -88),
    new THREE.Vector3(0, 1.2, -112),
    new THREE.Vector3(-2.5, 0.8, -133),
    new THREE.Vector3(0, 1.8, -160),
    new THREE.Vector3(0, 0.8, -185),
  ];

  const positionCurve = new THREE.CatmullRomCurve3(positionPoints);
  const targetCurve = new THREE.CatmullRomCurve3(targetPoints);

  const t = Math.max(0, Math.min(1, progress));
  return {
    position: positionCurve.getPoint(t),
    lookAt: targetCurve.getPoint(t),
  };
}
