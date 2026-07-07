import * as THREE from 'three';

export const materials = {
  glass: new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.85,
    transparent: true,
    opacity: 0.75,
    thickness: 0.4,
  }),

  badgeMetal: new THREE.MeshPhysicalMaterial({
    color: '#1a1a1a',
    metalness: 0.9,
    roughness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  }),

  terminalGlow: new THREE.MeshStandardMaterial({
    color: '#2ec4b6',
    emissive: '#2ec4b6',
    emissiveIntensity: 0.45,
    metalness: 0.6,
    roughness: 0.35,
  }),

  deskWood: new THREE.MeshStandardMaterial({
    color: '#3d2b1f',
    roughness: 0.85,
    metalness: 0.05,
  }),

  paper: new THREE.MeshStandardMaterial({
    color: '#f4f1ea',
    roughness: 0.9,
    metalness: 0,
  }),
};
