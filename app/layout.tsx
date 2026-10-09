import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import { getSiteSettings } from "@/sanity/queries";

import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import process from "process";
const headlineFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-headline",
});
const bodyFont = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
});
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = settings?.seo;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
    title: seo?.metaTitle || settings?.heroTitle || "PetVet Landscaping",
    description: seo?.metaDescription || settings?.heroDescription,
    keywords: seo?.metaKeywords,
    alternates: {
      canonical: seo?.canonicalUrl || process.env.NEXT_PUBLIC_SITE_URL,
    },
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle,
      description: seo?.ogDescription || seo?.metaDescription,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: settings?.businessName || "PetVet",
      type: "website",
    },
    twitter: {
      card: seo?.twitterCard || "summary_large_image",
      title: seo?.ogTitle || seo?.metaTitle,
      description: seo?.ogDescription || seo?.metaDescription,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headlineFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
