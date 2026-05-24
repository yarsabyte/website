"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { CanvasLoader } from "@/components/three/CanvasLoader";
import { InteractiveBlob } from "@/components/three/InteractiveBlob";

export function HeroCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.75]}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.28} />
        <directionalLight
          position={[5, 4, 6]}
          intensity={0.9}
          color="#62B0FF"
        />
        <directionalLight
          position={[-4, -2, 2]}
          intensity={0.35}
          color="#007EFF"
        />
        <InteractiveBlob />
      </Suspense>
    </Canvas>
  );
}

export { CanvasLoader };
