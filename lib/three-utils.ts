/**
 * Central tweak panel for the hero 3D blob.
 * Adjust values here; no need to dig through component files.
 */
export const BLOB_CONFIG = {
  /** Overall mesh scale inside the canvas */
  scale: 1.6,
  /** Vertex noise displacement strength */
  distortAmount: 0.16,
  /** Core fill; keep the glass body dark against the hero navy */
  coreColor: "#121a42",
  /** Fresnel rim; blue-violet edge glow */
  rimColor: "#3d50a4",
  /** Organic cell lines */
  gridColor: "#7785d4",
  /** Back-face halo for depth */
  rimGlowColor: "#4c63ca",
  rimGlowCore: "#172052",
  /** Cell density */
  gridScale: 8.2,
  /** Cell line brightness */
  gridStrength: 0.68,
  /** Fresnel rim intensity */
  rimStrength: 1.02,
  /** Surface opacity */
  opacity: 0.68,
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
