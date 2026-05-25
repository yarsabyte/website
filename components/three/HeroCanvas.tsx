"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { CanvasLoader } from "@/components/three/CanvasLoader";
import { InteractiveBlob } from "@/components/three/InteractiveBlob";

export function HeroCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [0, 0, 6.8], fov: 36 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.14} color="#2a2840" />
        <directionalLight position={[2, 3, 5]} intensity={0.22} color="#4a4868" />
        <InteractiveBlob />
      </Suspense>
    </Canvas>
  );
}

export { CanvasLoader };
