import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://limecraftcollective.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lime Craft Collective — Handcrafted Luxury Textures",
    template: "%s | Lime Craft Collective",
  },
  description:
    "Transforming raw concrete into elegant architectural statements. Premium micro concrete, limewash plasterwork, and bespoke surfaces for residential and commercial spaces.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: { url: "/favicon.ico", type: "image/x-icon" },
    apple: { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Lime Craft Collective — Handcrafted Luxury Textures",
    description:
      "Transforming raw concrete into elegant architectural statements. Premium micro concrete, limewash plasterwork, and bespoke surfaces for residential and commercial spaces.",
    url: siteUrl,
    siteName: "Lime Craft Collective",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lime Craft Collective — Handcrafted Luxury Textures",
    description:
      "Transforming raw concrete into elegant architectural statements.",
  },
  appleWebApp: {
    title: "Limecraft",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl: string | undefined;
  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{ "logo": logo.asset->{ url } }`,
    });
    const settings = data.data as { logo?: { url?: string } } | null;
    logoUrl = settings?.logo?.url;
  } catch {
    logoUrl = undefined;
  }

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink selection:bg-terracotta/20 selection:text-terracotta">
        <LayoutWrapper logoUrl={logoUrl}>{children}</LayoutWrapper>
        <SanityLive />
      </body>
    </html>
  );
}