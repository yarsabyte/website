"use client";

export function HeroSphere() {
  return (
    <div
      className="relative aspect-square w-[min(72vw,28rem)] max-w-full lg:w-[32rem]"
      aria-hidden="true"
    >
      <div className="absolute inset-[8%] rounded-full bg-[#0d1128] shadow-[0_0_80px_rgba(0,126,255,0.18)]" />

      <svg
        className="absolute inset-0 size-full animate-[sphereSpin_28s_linear_infinite] opacity-70"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hex-grid" width="28" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M14 2 L26 9 L26 23 L14 30 L2 23 L2 9 Z"
              stroke="rgba(98, 176, 255, 0.45)"
              strokeWidth="0.6"
              fill="none"
            />
          </pattern>
        </defs>
        <circle cx="200" cy="200" r="178" fill="url(#hex-grid)" />
        <ellipse
          cx="200"
          cy="200"
          rx="178"
          ry="178"
          stroke="rgba(238, 238, 242, 0.14)"
          strokeWidth="0.8"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="178"
          stroke="rgba(98, 176, 255, 0.35)"
          strokeWidth="0.6"
          transform="rotate(32 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="178"
          stroke="rgba(0, 126, 255, 0.28)"
          strokeWidth="0.6"
          transform="rotate(-28 200 200)"
        />
      </svg>

      <div className="absolute inset-[18%] rounded-full border border-foreground/10 bg-[#14183a]" />
    </div>
  );
}
