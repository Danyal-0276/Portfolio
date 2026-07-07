import * as THREE from 'three';

export const CHAPTER_COUNT = 7;

export const chapterProgress = [0.0, 0.15, 0.32, 0.55, 0.75, 0.88, 1.0];

export const chapterNames = [
  'Hero Room',
  'JS Workshop',
  'Constellation',
  'The Corridor',
  'ML Research',
  'Synthesis',
  'Contact Desk',
];

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

const _position = new THREE.Vector3();
const _lookAt = new THREE.Vector3();

export function getCameraFrame(progress: number) {
  const t = Math.max(0, Math.min(1, progress));
  return {
    position: positionCurve.getPoint(t, _position),
    lookAt: targetCurve.getPoint(t, _lookAt),
  };
}

export function getChapterFromProgress(progress: number): number {
  const t = Math.max(0, Math.min(1, progress));
  for (let i = chapterProgress.length - 1; i >= 0; i--) {
    if (t >= chapterProgress[i] - 0.02) return i;
  }
  return 0;
}

export function getProgressForChapter(chapter: number): number {
  return chapterProgress[Math.max(0, Math.min(CHAPTER_COUNT - 1, chapter))] ?? 0;
}
