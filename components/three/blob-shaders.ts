export const blobVertexShader = /* glsl */ `
uniform float uTime;
uniform float uDistort;

varying vec3 vNormal;
varying vec3 vLocalPos;
varying vec3 vWorldPos;
varying vec3 vViewDir;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p =
    permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
    i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
  vec3 pos = position;
  float t = uTime * 0.35;

  float n1 = snoise(pos * 1.15 + vec3(t * 0.4, t * 0.25, 0.0));
  float n2 = snoise(pos * 2.35 + vec3(0.0, t * 0.35, t * 0.2)) * 0.52;
  float displacement = (n1 + n2) * uDistort;

  vec3 displaced = pos + normal * displacement;
  vec4 world = modelMatrix * vec4(displaced, 1.0);

  vLocalPos = displaced;
  vWorldPos = world.xyz;
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(cameraPosition - world.xyz);

  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const blobFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uCoreColor;
uniform vec3 uRimColor;
uniform vec3 uGridColor;
uniform float uGridScale;
uniform float uGridStrength;
uniform float uRimStrength;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vLocalPos;
varying vec3 vWorldPos;
varying vec3 vViewDir;

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123);
}

float cellBorder(vec2 uv, float scale) {
  vec2 p = uv * scale;
  vec2 i = floor(p);
  vec2 f = fract(p);
  float nearestDist = 8.0;
  float secondDist = 8.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 cell = vec2(float(x), float(y));
      vec2 jitter = hash22(i + cell);
      vec2 seed = cell + 0.38 + 0.42 * jitter;
      vec2 offset = seed - f;
      float dist = dot(offset, offset);

      if (dist < nearestDist) {
        secondDist = nearestDist;
        nearestDist = dist;
      } else if (dist < secondDist) {
        secondDist = dist;
      }
    }
  }

  float borderDist = secondDist - nearestDist;
  float line = 1.0 - smoothstep(0.035, 0.09, borderDist);
  float glow = 1.0 - smoothstep(0.09, 0.2, borderDist);
  return clamp(line + glow * 0.26, 0.0, 1.0);
}

float cellularTexture(vec3 p, vec3 n, float scale) {
  vec3 weights = pow(abs(n), vec3(2.25));
  weights /= max(weights.x + weights.y + weights.z, 0.0001);

  vec3 drift = vec3(
    sin(uTime * 0.16) * 0.035,
    cos(uTime * 0.13) * 0.035,
    sin(uTime * 0.11 + 1.4) * 0.035
  );

  float xy = cellBorder(p.xy + drift.xy, scale);
  float yz = cellBorder(p.yz + drift.yz + vec2(0.17, -0.08), scale * 1.04);
  float zx = cellBorder(p.zx + drift.zx + vec2(-0.11, 0.15), scale * 0.96);

  return xy * weights.z + yz * weights.x + zx * weights.y;
}

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vViewDir);

  float facing = max(dot(n, v), 0.0);
  float fresnel = pow(1.0 - facing, 2.05);
  float softRim = pow(fresnel, 1.22) * uRimStrength;
  float depthShade = smoothstep(-0.72, 0.8, vWorldPos.z);

  vec3 cellPos = normalize(vLocalPos) + vLocalPos * 0.1;
  float grid = cellularTexture(cellPos, n, uGridScale);
  float fineVein = sin((cellPos.x + cellPos.y * 0.74 + cellPos.z * 0.38 + uTime * 0.025) * 22.0);
  grid = clamp(grid + smoothstep(0.82, 1.0, fineVein) * 0.08, 0.0, 1.0);

  float gridLine = grid * uGridStrength;

  vec3 innerTone = uCoreColor * mix(0.44, 1.05, depthShade);
  vec3 glassTone = mix(innerTone, uRimColor, fresnel * 0.52 + grid * 0.08);
  vec3 color = glassTone;
  color += uRimColor * softRim * 0.62;
  color += uGridColor * gridLine * (0.54 + fresnel * 0.42);
  color += uRimColor * pow(max(dot(n, normalize(vec3(-0.4, 0.35, 0.85))), 0.0), 8.0) * 0.16;

  float alpha = uOpacity * (0.48 + fresnel * 0.42 + gridLine * 0.14);
  gl_FragColor = vec4(color, alpha);
}
`;
