"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  Color,
  DoubleSide,
  type Group,
  type ShaderMaterial,
} from "three";

import { blobFragmentShader, blobVertexShader } from "@/components/three/blob-shaders";
import { usePagePointer } from "@/hooks/usePagePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BLOB_CONFIG, damp } from "@/lib/three-utils";

function hexToVec3(hex: string): [number, number, number] {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}

export function InteractiveBlob() {
  const groupRef = useRef<Group>(null);
  const pointer = usePagePointer();
  const reduceMotion = useReducedMotion();

  const materialRef = useRef<ShaderMaterial>(null);
  const rimMaterialRef = useRef<ShaderMaterial>(null);

  const surfaceUniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uDistort: { value: BLOB_CONFIG.distortAmount },
      uCoreColor: { value: hexToVec3(BLOB_CONFIG.coreColor) },
      uRimColor: { value: hexToVec3(BLOB_CONFIG.rimColor) },
      uGridColor: { value: hexToVec3(BLOB_CONFIG.gridColor) },
      uGridScale: { value: BLOB_CONFIG.gridScale },
      uGridStrength: { value: BLOB_CONFIG.gridStrength },
      uRimStrength: { value: BLOB_CONFIG.rimStrength },
      uOpacity: { value: BLOB_CONFIG.opacity },
    };
  }, []);

  const rimUniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uDistort: { value: BLOB_CONFIG.distortAmount * 1.04 },
      uCoreColor: { value: hexToVec3(BLOB_CONFIG.rimGlowCore) },
      uRimColor: { value: hexToVec3(BLOB_CONFIG.rimGlowColor) },
      uGridColor: { value: hexToVec3("#000000") },
      uGridScale: { value: 0 },
      uGridStrength: { value: 0 },
      uRimStrength: { value: 1.1 },
      uOpacity: { value: 0.16 },
    };
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const t = performance.now() * 0.001;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (rimMaterialRef.current) {
      rimMaterialRef.current.uniforms.uTime.value = t;
    }

    if (reduceMotion) {
      group.rotation.y += BLOB_CONFIG.idleRotationSpeed * 0.25 * delta;
      return;
    }

    const { x, y } = pointer.current;
    const targetRotY = x * BLOB_CONFIG.cursorRotationInfluence;
    const targetRotX = y * BLOB_CONFIG.cursorRotationInfluence * 0.42;

    group.rotation.y = damp(
      group.rotation.y,
      targetRotY,
      BLOB_CONFIG.rotationSmoothing,
      delta,
    );
    group.rotation.x = damp(
      group.rotation.x,
      targetRotX,
      BLOB_CONFIG.rotationSmoothing,
      delta,
    );

    group.rotation.y += BLOB_CONFIG.idleRotationSpeed * delta;
  });

  return (
    <group ref={groupRef} scale={BLOB_CONFIG.scale} rotation={[0.12, -0.34, -0.08]}>
      <mesh>
        <sphereGeometry args={[1, 96, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          uniforms={surfaceUniforms}
          transparent
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
      <mesh scale={1.045}>
        <sphereGeometry args={[1, 72, 48]} />
        <shaderMaterial
          ref={rimMaterialRef}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          uniforms={rimUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          side={BackSide}
        />
      </mesh>
    </group>
  );
}
