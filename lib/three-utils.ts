/**
 * Central tweak panel for the hero 3D blob.
 * Adjust values here — no need to dig through component files.
 */
export const BLOB_CONFIG = {
  /** Overall mesh scale inside the canvas */
  scale: 1.65,
  /** Icosahedron subdivision (4–6 is a good balance) */
  geometryDetail: 5,
  /** Vertex noise displacement strength */
  distortAmount: 0.2,
  /** Core fill — match hero background navy */
  coreColor: "#14183a",
  /** Fresnel rim — muted navy-violet, not blue */
  rimColor: "#3a3858",
  /** Hex grid lines — soft desaturated lavender-gray */
  gridColor: "#6e6c88",
  /** Back-face halo for depth */
  rimGlowColor: "#2e2c48",
  rimGlowCore: "#1c1d3f",
  /** Hex cell density */
  gridScale: 9.5,
  /** Hex line brightness */
  gridStrength: 0.34,
  /** Fresnel rim intensity */
  rimStrength: 0.72,
  /** Surface opacity */
  opacity: 0.88,
  /** How much page cursor tilts the blob (radians) */
  cursorRotationInfluence: 0.62,
  /** Rotation smoothing (higher = snappier) */
  rotationSmoothing: 3.2,
  /** Subtle idle Y spin (rad/s) when not moving mouse much */
  idleRotationSpeed: 0.06,
} as const;

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

export function damp(
  current: number,
  target: number,
  smoothness: number,
  delta: number,
): number {
  return lerp(current, target, 1 - Math.exp(-smoothness * delta));
}
