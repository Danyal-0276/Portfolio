'use client';

import { Text } from '@react-three/drei';
import IDBadge from '../objects/IDBadge';

export default function HeroRoom() {
  return (
    <group position={[0, 0, 0]}>
      <IDBadge />
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
      >
        DANYAL TANVEER
      </Text>
      <Text
        position={[0, -2.05, 0]}
        fontSize={0.07}
        color="#2ec4b6"
        anchorX="center"
        anchorY="middle"
      >
        Full-Stack Engineer · NLP/ML Researcher
      </Text>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0a0908" roughness={1} />
      </mesh>
    </group>
  );
}
