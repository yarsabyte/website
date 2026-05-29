import type { Metadata } from "next";

import { ContactPageClient } from "@/components/sections/contact-page-client";

export const metadata: Metadata = {
  title: "Contact | Yarsa Byte",
  description:
    "Start a project with Yarsa Byte for websites, portfolios, posters, reels, branding, and digital launch support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
