"use client";

export function HeroSphere() {
  return (
    <div
      className="relative aspect-square w-[min(72vw,28rem)] max-w-full lg:w-[32rem]"
      aria-hidden="true"
    >
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_35%_28%,color-mix(in_srgb,var(--sky)_28%,transparent),transparent_55%),radial-gradient(circle_at_68%_72%,color-mix(in_srgb,var(--blue)_22%,transparent),transparent_50%),radial-gradient(circle_at_50%_50%,#0a0e28,#14183a_68%,#000_100%)] shadow-[0_0_120px_color-mix(in_srgb,var(--blue)_32%,transparent)]" />

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
              stroke="color-mix(in srgb, var(--sky) 55%, transparent)"
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
          stroke="color-mix(in srgb, var(--foreground) 18%, transparent)"
          strokeWidth="0.8"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="178"
          stroke="color-mix(in srgb, var(--sky) 35%, transparent)"
          strokeWidth="0.6"
          transform="rotate(32 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="120"
          ry="178"
          stroke="color-mix(in srgb, var(--blue) 28%, transparent)"
          strokeWidth="0.6"
          transform="rotate(-28 200 200)"
        />
      </svg>

      <div className="absolute inset-[18%] rounded-full border border-foreground/10 bg-[radial-gradient(circle_at_30%_25%,color-mix(in_srgb,var(--foreground)_12%,transparent),transparent_60%)]" />
    </div>
  );
}
