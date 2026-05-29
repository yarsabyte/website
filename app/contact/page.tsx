import type { Metadata } from "next";

import { ContactPageClient } from "@/components/sections/contact-page-client";

export const metadata: Metadata = {
  title: "Contact | Portfoo",
  description:
    "Start a project with Portfoo for websites, portfolios, posters, reels, branding, and digital launch support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
