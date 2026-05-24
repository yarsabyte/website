import type { Metadata } from "next";

import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sajilo Studio | Premium Digital Presence for Nepali Businesses",
  description:
    "Sajilo Studio builds websites, portfolios, posters, video edits, branding, and digital setup systems for Nepali businesses.",
  metadataBase: new URL("https://sajilostudio.com"),
  openGraph: {
    title: "Sajilo Studio",
    description:
      "Premium digital presence, websites, branding, posters, reels, and launch support for Nepali businesses.",
    siteName: "Sajilo Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <SmoothScrollProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
