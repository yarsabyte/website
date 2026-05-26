import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { PageLoader } from "@/components/page-loader";
import { ScrollHexBackground } from "@/components/scroll-hex-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sajilo Studio — Digital Studio in Nepal",
  description:
    "Sajilo Studio helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
  metadataBase: new URL("https://sajilostudio.com"),
  openGraph: {
    title: "Sajilo Studio — Digital Studio in Nepal",
    description:
      "Sajilo Studio helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-foreground">
        <PageLoader>
          <div className="site-frame">
            <ScrollHexBackground />
            <div className="site-frame-content">
              <SmoothScrollProvider>
                <SiteHeader />
                {children}
              </SmoothScrollProvider>
            </div>
          </div>
        </PageLoader>
      </body>
    </html>
  );
}
