import type { Metadata } from "next";

import { WorkPageClient } from "@/components/sections/work-page-client";

export const metadata: Metadata = {
  title: "Work | Portfoo",
  description:
    "Explore Portfoo work across websites, portfolios, digital launch systems, and campaign-ready creative.",
};

export default function WorkPage() {
  return <WorkPageClient />;
}
