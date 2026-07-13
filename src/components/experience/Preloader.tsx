'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface Props {
  onDone: () => void;
}

export default function Preloader({ onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onDone();
      },
    });

    tl.from('.preloader-text', { opacity: 0, y: 30, duration: 0.6 })
      .to('.preloader-text', { opacity: 0, y: -20, duration: 0.5, delay: 0.4 })
      .to('.preloader', { opacity: 0, duration: 0.4 });

    return () => { tl.kill(); };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="preloader">
      <p className="preloader-text">DANYAL TANVEER</p>
    </div>
  );
}
