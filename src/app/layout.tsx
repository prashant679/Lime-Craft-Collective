import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/live";

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

export const metadata: Metadata = {
  title: {
    default: "Lime Craft Collective — Handcrafted Luxury Textures",
    template: "%s | Lime Craft Collective",
  },
  description:
    "Transforming raw concrete into elegant architectural statements. Premium micro concrete, limewash plasterwork, and bespoke surfaces for residential and commercial spaces.",
  icons: {
    icon: [
      { url: "/images/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/images/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: { url: "/images/favicon.ico", type: "image/x-icon" },
    apple: { url: "/images/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
  manifest: "/images/site.webmanifest",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-terracotta focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Navbar logoUrl={logoUrl} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer logoUrl={logoUrl} />
      </body>
    </html>
  );
}