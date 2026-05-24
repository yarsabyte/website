import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import { PageLoader } from "@/components/page-loader";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sajilo Studio — Creative Digital Studio in Nepal",
  description:
    "Sajilo Studio helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
  metadataBase: new URL("https://sajilostudio.com"),
  openGraph: {
    title: "Sajilo Studio — Creative Digital Studio in Nepal",
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
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <SmoothScrollProvider>
          <PageLoader>
            <SiteHeader />
            {children}
            <SiteFooter />
          </PageLoader>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
