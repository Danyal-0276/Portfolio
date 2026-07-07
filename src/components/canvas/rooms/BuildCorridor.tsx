'use client';

import { projects } from '@/lib/projects';
import { roomPositions } from '@/lib/cameraPaths';
import ProjectDiorama from '../objects/ProjectDiorama';
import { usePortfolioStore } from '@/lib/store';

export default function BuildCorridor() {
  const scrollProgress = usePortfolioStore((s) => s.scrollProgress);
  const corridorStart = 0.38;
  const corridorEnd = 0.68;
  const corridorT = Math.max(0, Math.min(1, (scrollProgress - corridorStart) / (corridorEnd - corridorStart)));

  return (
    <group>
      {projects.map((project, i) => {
        const z = roomPositions.buildStart - i * roomPositions.buildStep;
        const bayCenter = (i + 0.5) / projects.length;
        const active = Math.abs(corridorT - bayCenter) < 0.22;
        return (
          <ProjectDiorama
            key={project.id}
            project={project}
            position={[0, 0, z]}
            active={active}
          />
        );
      })}
      {/* Corridor walls */}
      <mesh position={[0, 1.5, -78]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.05, 3, 60]} />
        <meshStandardMaterial color="#141210" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-2.5, 1.5, -78]}>
        <boxGeometry args={[0.05, 3, 60]} />
        <meshStandardMaterial color="#141210" transparent opacity={0.5} />
      </mesh>
      <mesh position={[2.5, 1.5, -78]}>
        <boxGeometry args={[0.05, 3, 60]} />
        <meshStandardMaterial color="#141210" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
