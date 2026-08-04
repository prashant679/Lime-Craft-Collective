import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { SplitSection } from "@/components/ui/SplitSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { SwatchGrid } from "@/components/ui/SwatchGrid";
import { CTABanner } from "@/components/ui/CTABanner";
import { SITE } from "@/components/layout/site";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 60;

const serviceQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  shortDescription,
  description,
  heroImage{ asset->{ url } },
  whyPoints[]{
    _key,
    title,
    description
  },
  swatches[]->{
    _id,
    name,
    textureCategory,
    shortDescription,
    image{ asset->{ url } }
  }
}`;

interface SanitySwatch {
  _id: string;
  name: string;
  textureCategory?: "smooth" | "semiRough" | "rough" | "signature";
  shortDescription?: string;
  image?: { asset?: { url?: string } };
}

interface ServiceDoc {
  _id: string;
  name: string;
  slug: { current: string } | null;
  shortDescription?: string;
  description?: string;
  heroImage?: { asset?: { url?: string } };
  whyPoints?: { _key?: string; title: string; description: string }[];
  swatches?: SanitySwatch[];
}

const fallbackHeroImages: Record<string, string> = {
  microtopping: "/images/pdf/microtopping-cover.jpg",
  limewash: "/images/pdf/limewash-cover.jpg",
  terrazzo: "/images/pdf/texture-1.jpg",
};

const fallbackSwatchImages: Record<string, string> = {
  smooth: "/images/pdf/swatch-smooth.jpg",
  semiRough: "/images/pdf/swatch-semi.jpg",
  rough: "/images/pdf/swatch-rough.jpg",
  signature: "/images/pdf/swatch-silk.jpg",
};

const finishLabels: Record<string, string> = {
  smooth: "Smooth Texture",
  semiRough: "Semi-Rough Texture",
  rough: "Rough Texture",
  signature: "Signature Finish",
};

function toTone(category?: string): "terracotta" | "olive" | "ink" | "tan" {
  switch (category) {
    case "signature":
      return "ink";
    case "rough":
      return "olive";
    case "semiRough":
      return "tan";
    default:
      return "terracotta";
  }
}

function resolveSwatchImage(swatch: SanitySwatch): string | undefined {
  const url = swatch.image?.asset?.url;
  if (url) return url;
  return swatch.textureCategory
    ? fallbackSwatchImages[swatch.textureCategory]
    : undefined;
}

function resolveHeroImage(slug: string, service: ServiceDoc): string {
  const url = service.heroImage?.asset?.url;
  if (url) return url;
  return (
    fallbackHeroImages[slug.toLowerCase()] ||
    fallbackHeroImages[service.name.toLowerCase()] ||
    "/images/pdf/texture-1.jpg"
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const data = await sanityFetch({
    query: `*[_type == "service"][0...50] { slug }`,
  });
  return ((data.data ?? []) as { slug: { current: string } | null }[])
    .filter((service) => service.slug?.current)
    .map((service) => ({ slug: service.slug!.current }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await sanityFetch({
    query: serviceQuery,
    params: { slug },
  });
  const service = (data.data ?? undefined) as ServiceDoc | undefined;

  return {
    title: service?.name ?? slug,
    description: service?.shortDescription || service?.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  let service: ServiceDoc | null = null;
  try {
    const data = await sanityFetch({
      query: serviceQuery,
      params: { slug },
    });
    service = ((data.data ?? null) as ServiceDoc | null) ?? null;
  } catch {
    service = null;
  }

  if (!service) notFound();

  const heroImage = resolveHeroImage(slug, service);
  const whyPoints =
    service.whyPoints && service.whyPoints.length > 0
      ? service.whyPoints
      : undefined;
  const swatches =
    service.swatches && service.swatches.length > 0
      ? service.swatches
      : undefined;

  return (
    <div>
      <PageHero
        kicker={service.name}
        accentTitle=""
        title={service.name}
        subtitle={service.shortDescription || service.description}
        image={heroImage}
        imageAlt={`${service.name} finish`}
      >
        <Button href={SITE.whatsappUrl} variant="terracotta" size="md">
          Get a {service.name} Quote
        </Button>
      </PageHero>

      {service.description && (
        <SplitSection
          kicker="Overview"
          accentTitle=""
          title={service.name}
          subtitle={service.description}
          image={
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
              <Image
                src={heroImage}
                alt={`${service.name} finish`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          }
        />
      )}

      {whyPoints && (
        <section className="border-y border-tan/40 bg-white/50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker={`Why ${service.name}?`}
              accentTitle="Why"
              title={service.name}
              subtitle="The reasons this finish stands apart for both its look and its longevity."
            />
            <CheckList items={whyPoints} columns={2} circleVariant="terracotta" />
          </div>
        </section>
      )}

      {swatches && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Texture & Tone"
              title="Choose a Finish"
              align="center"
              subtitle="Tap a swatch to preview it enlarged. A fully customizable palette is available on request."
            />
            <SwatchGrid
              swatches={swatches.map((swatch) => ({
                name: swatch.name,
                finish:
                  finishLabels[swatch.textureCategory ?? ""] ||
                  swatch.shortDescription,
                tone: toTone(swatch.textureCategory),
                image: resolveSwatchImage(swatch),
              }))}
            />
          </div>
        </section>
      )}

      <CTABanner
        title={`Let's talk ${service.name}`}
        subtitle="From a single feature surface to a full interior, we handcraft finishes to order. Tell us about your space."
      />
    </div>
  );
}
