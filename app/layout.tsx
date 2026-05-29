import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";

import { PageLoader } from "@/components/page-loader";
import { ScrollHexBackground } from "@/components/scroll-hex-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--next-display-font",
  fallback: ["Arial Black", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Yarsa Byte | IT company in Nepal",
  description:
    "Yarsa Byte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
  metadataBase: new URL("https://yarsabyte.com"),
  openGraph: {
    title: "Yarsa Byte | IT company in Nepal",
    description:
      "Yarsa Byte helps Nepali businesses create websites, portfolios, posters, videos, reels, branding, and digital setups for a professional online presence.",
    siteName: "Yarsa Byte",
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
    <html lang="en" className={`h-full antialiased ${archivoBlack.variable}`}>
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
