"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  Color,
  DoubleSide,
  ShaderMaterial,
  type Group,
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

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: blobVertexShader,
      fragmentShader: blobFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uDistort: { value: BLOB_CONFIG.distortAmount },
        uCoreColor: { value: hexToVec3(BLOB_CONFIG.coreColor) },
        uRimColor: { value: hexToVec3(BLOB_CONFIG.rimColor) },
        uGridColor: { value: hexToVec3(BLOB_CONFIG.gridColor) },
        uGridScale: { value: BLOB_CONFIG.gridScale },
        uGridStrength: { value: BLOB_CONFIG.gridStrength },
        uRimStrength: { value: BLOB_CONFIG.rimStrength },
        uOpacity: { value: BLOB_CONFIG.opacity },
      },
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
  }, []);

  const rimMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: blobVertexShader,
      fragmentShader: blobFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uDistort: { value: BLOB_CONFIG.distortAmount * 1.04 },
        uCoreColor: { value: hexToVec3(BLOB_CONFIG.rimGlowCore) },
        uRimColor: { value: hexToVec3(BLOB_CONFIG.rimGlowColor) },
        uGridColor: { value: hexToVec3("#000000") },
        uGridScale: { value: 0 },
        uGridStrength: { value: 0 },
        uRimStrength: { value: 1.1 },
        uOpacity: { value: 0.18 },
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      side: BackSide,
    });
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const t = performance.now() * 0.001;
    material.uniforms.uTime.value = t;
    rimMaterial.uniforms.uTime.value = t;

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
    <group ref={groupRef} scale={BLOB_CONFIG.scale}>
      <mesh material={material}>
        <icosahedronGeometry args={[1, BLOB_CONFIG.geometryDetail]} />
      </mesh>
      <mesh material={rimMaterial} scale={1.02}>
        <icosahedronGeometry args={[1, Math.max(3, BLOB_CONFIG.geometryDetail - 1)]} />
      </mesh>
    </group>
  );
}
