import type { Metadata } from "next";

import { ServicesPageClient } from "@/components/sections/services-page-client";

export const metadata: Metadata = {
  title: "Services | Portfoo",
  description:
    "Explore Portfoo services for websites, portfolios, poster design, reels, branding, and digital setup for Nepali businesses.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
