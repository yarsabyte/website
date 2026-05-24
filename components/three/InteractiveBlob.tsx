"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Group, Mesh } from "three";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BLOB_CONFIG, damp } from "@/lib/three-utils";

export function InteractiveBlob() {
  const groupRef = useRef<Group>(null);
  const wireRef = useRef<Mesh>(null);
  const reduceMotion = useReducedMotion();

  useFrame((state, delta) => {
    const group = groupRef.current;
    const wire = wireRef.current;
    if (!group) {
      return;
    }

    if (!reduceMotion) {
      const { pointer } = state;
      const targetRotY = pointer.x * BLOB_CONFIG.cursorRotationInfluence;
      const targetRotX = -pointer.y * BLOB_CONFIG.cursorRotationInfluence * 0.55;
      const targetPosX = pointer.x * BLOB_CONFIG.cursorPositionInfluence;
      const targetPosY = pointer.y * BLOB_CONFIG.cursorPositionInfluence * 0.45;

      group.rotation.y = damp(group.rotation.y, targetRotY, 4, delta);
      group.rotation.x = damp(group.rotation.x, targetRotX, 4, delta);
      group.position.x = damp(group.position.x, targetPosX, 4, delta);
      group.position.y = damp(group.position.y, targetPosY, 4, delta);

      if (wire) {
        wire.rotation.y += BLOB_CONFIG.rotationSpeed;
        wire.rotation.z += BLOB_CONFIG.rotationSpeed * 0.4;
      }
    } else if (wire) {
      wire.rotation.y += BLOB_CONFIG.rotationSpeed * 0.25;
    }
  });

  return (
    <group ref={groupRef} scale={BLOB_CONFIG.scale}>
      <mesh>
        <icosahedronGeometry args={[1, BLOB_CONFIG.geometryDetail]} />
        <MeshDistortMaterial
          color={BLOB_CONFIG.color}
          transparent
          opacity={BLOB_CONFIG.opacity}
          roughness={0.15}
          metalness={0.55}
          distort={BLOB_CONFIG.distortionStrength}
          speed={BLOB_CONFIG.distortionSpeed}
        />
      </mesh>

      <mesh ref={wireRef} scale={1.04}>
        <icosahedronGeometry args={[1, 4]} />
        <meshBasicMaterial
          color={BLOB_CONFIG.wireframeColor}
          wireframe
          transparent
          opacity={BLOB_CONFIG.patternIntensity}
        />
      </mesh>

      <pointLight
        position={[0.2, 0.3, 1.8]}
        color={BLOB_CONFIG.glowColor}
        intensity={BLOB_CONFIG.glowIntensity}
        distance={8}
      />
    </group>
  );
}
