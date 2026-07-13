'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  glow?: string;
  style?: React.CSSProperties;
}

export default function MagneticCard({ children, className = '', depth = 14, glow, style }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 18 });
  const y = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(y, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-depth, depth]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-card ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        ...style,
        ...(glow ? { '--card-glow': glow } as React.CSSProperties : {}),
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03, z: 40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="magnetic-card-shine" aria-hidden />
      {children}
    </motion.div>
  );
}
