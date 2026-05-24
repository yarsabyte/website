/**
 * Central tweak panel for the hero 3D blob.
 * Adjust values here — no need to dig through component files.
 */
export const BLOB_CONFIG = {
  /** Overall mesh scale inside the canvas */
  scale: 1.35,
  /** Base fill color of the distorted sphere */
  color: "#0c1438",
  /** Hex / wireframe line color */
  wireframeColor: "#62B0FF",
  /** Surface opacity (0–1) */
  opacity: 0.92,
  /** MeshDistortMaterial distort amount */
  distortionStrength: 0.38,
  /** MeshDistortMaterial animation speed */
  distortionSpeed: 1.2,
  /** Icosahedron subdivision (higher = smoother, heavier) */
  geometryDetail: 32,
  /** Wireframe layer opacity — pattern intensity */
  patternIntensity: 0.42,
  /** Idle Y rotation per frame */
  rotationSpeed: 0.0025,
  /** How much the cursor tilts the blob (radians) */
  cursorRotationInfluence: 0.45,
  /** How much the cursor shifts blob position */
  cursorPositionInfluence: 0.22,
  /** Inner point-light color */
  glowColor: "#007EFF",
  /** Inner point-light strength */
  glowIntensity: 2.4,
} as const;

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

export function damp(current: number, target: number, smoothness: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-smoothness * delta));
}
