"use client";

import dynamic from "next/dynamic";

const CinematicShell = dynamic(() => import("@/components/cinematic/CinematicShell"), { ssr: false });

export default function Home() {
  return <CinematicShell />;
}
