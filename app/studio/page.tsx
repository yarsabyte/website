import type { Metadata } from "next";

import { StudioPageClient } from "@/components/sections/studio-page-client";

export const metadata: Metadata = {
  title: "Studio | Portfoo",
  description:
    "Meet the Portfoo studio, a motion-led digital team for websites, portfolios, campaigns, and launch-ready online presence.",
};

export default function StudioPage() {
  return <StudioPageClient />;
}
