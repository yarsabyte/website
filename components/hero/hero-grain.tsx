"use client";

/** Subtle static film grain over the hero */
export function HeroGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.09]"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
        backgroundSize: "96px 96px",
      }}
    />
  );
}
