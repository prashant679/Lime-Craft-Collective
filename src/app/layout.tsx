import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { SITE } from "@/components/layout/site";

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

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.limecraftcollective.com";
const siteUrl = rawSiteUrl.replace(
  "https://limecraftcollective.com",
  "https://www.limecraftcollective.com"
);

export const metadata: Metadata = {
  metadataBase: new URL("https://www.limecraftcollective.com"),
  alternates: {
    canonical: "/",
  },
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
  let siteName: string = SITE.name;
  let phone: string = SITE.phoneDisplay;
  let email: string = SITE.email;
  let address: string = SITE.address;
  let instagramUrl: string = SITE.instagramUrl;

  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{
        siteName,
        "logo": logo.asset->{ url },
        phone,
        email,
        address,
        instagramUrl
      }`,
    });
    const settings = data.data as {
      siteName?: string;
      logo?: { url?: string };
      phone?: string;
      email?: string;
      address?: string;
      instagramUrl?: string;
    } | null;
    logoUrl = settings?.logo?.url;
    if (settings?.siteName) siteName = settings.siteName;
    if (settings?.phone) phone = settings.phone;
    if (settings?.email) email = settings.email;
    if (settings?.address) address = settings.address;
    if (settings?.instagramUrl) instagramUrl = settings.instagramUrl;
  } catch {
    logoUrl = undefined;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    url: "https://www.limecraftcollective.com",
    logo: logoUrl || "https://www.limecraftcollective.com/icon.png",
    image: logoUrl || "https://www.limecraftcollective.com/icon.png",
    description:
      "Transforming raw concrete into elegant architectural statements. Premium micro concrete, limewash plasterwork, and bespoke surfaces for residential and commercial spaces.",
    telephone: phone,
    email: email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "F-1/298 Sangam Vihar",
      addressLocality: "New Delhi",
      postalCode: "110080",
      addressCountry: "IN",
      text: address,
    },
    areaServed: [
      "Delhi",
      "Delhi NCR",
      "Gurugram",
      "Noida",
      "Faridabad",
      "Ghaziabad",
      "India",
    ],
    priceRange: "$$$",
    sameAs: [instagramUrl, SITE.whatsappUrl].filter(Boolean),
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink selection:bg-terracotta/20 selection:text-terracotta">
        <LayoutWrapper logoUrl={logoUrl}>{children}</LayoutWrapper>
        <SanityLive />
      </body>
    </html>
  );
}