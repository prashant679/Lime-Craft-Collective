import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Decorative concrete services by Lime Craft Collective — Micro Concrete, Limewash, Textured Finish, and bespoke Terrazzo Flooring.",
};

interface ServiceDoc {
  _id: string;
  name: string;
  slug: { current: string } | null;
  shortDescription?: string;
  heroImage?: { asset?: { url?: string } };
}

interface ServiceCard {
  href: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
}

const heroFallbacks: Record<string, string> = {
  "micro-concrete": "/images/pdf/microtopping-cover.jpg",
  limewash: "/images/pdf/limewash-cover.jpg",
  "textured-finish": "/images/Textured%20Finish/hero.jpeg",
  "terrazzo-flooring": "/images/Terrazzo/Hero.jpeg",
};

const fallbackServices: ServiceCard[] = [
  {
    href: "/services/micro-concrete",
    title: "Micro Concrete",
    tagline: "The art of minimalism",
    description:
      "Ultra-thin (up to 3mm) decorative concrete coatings applied over existing floors or walls. Seamless, joint-free surfaces with custom colors and textures.",
    image: "/images/pdf/microtopping-cover.jpg",
    alt: "Micro Concrete — seamless concrete coating",
  },
  {
    href: "/services/limewash",
    title: "Limewash",
    tagline: "Enduring works of material art",
    description:
      "Pure-limestone plaster finishes rooted in Roman plasterwork heritage. Breathable, hypoallergenic and antimicrobial, with a natural antique character.",
    image: "/images/pdf/limewash-cover.jpg",
    alt: "Limewash — natural limestone plaster",
  },
  {
    href: "/services/textured-finish",
    title: "Textured Finish",
    tagline: "Dimension, by hand",
    description:
      "Hand-applied textures that bring tactile depth to walls and floors — light and shadow do the work, without pattern or noise.",
    image: "/images/Textured%20Finish/hero.jpeg",
    alt: "Textured Finish — hand-applied surface",
  },
  {
    href: "/services/terrazzo-flooring",
    title: "Terrazzo Flooring",
    tagline: "Bespoke, poured to last",
    description:
      "Timeless speckled elegance poured and polished with a modern, custom palette — a seamless, durable finish built to last generations.",
    image: "/images/Terrazzo/Hero.jpeg",
    alt: "Terrazzo — bespoke poured flooring",
  },
];

async function getServices(): Promise<ServiceCard[]> {
  try {
    const data = await sanityFetch({
      query: `*[_type == "service"] | order(name asc) {
        _id,
        name,
        slug,
        shortDescription,
        heroImage{ asset->{ url } }
      }`,
    });
    const docs = ((data.data ?? []) as ServiceDoc[]).filter(
      (doc) => doc.slug?.current,
    );
    if (docs.length === 0) return fallbackServices;
    return docs.map((doc) => {
      const slug = doc.slug!.current!;
      return {
        href: `/services/${slug}`,
        title: doc.name,
        tagline: "Handcrafted for your space",
        description: doc.shortDescription || doc.name,
        image: doc.heroImage?.asset?.url || heroFallbacks[slug] || "/images/pdf/texture-1.jpg",
        alt: `${doc.name} — handcrafted surface`,
      };
    });
  } catch {
    return fallbackServices;
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  let heroImage = "/images/pdf/texture-2.jpg";

  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{ "hero": servicesHeroImage.asset->url }`,
    });
    const s = data.data as { hero?: string } | null;
    if (s?.hero) heroImage = s.hero;
  } catch {
    // Keep fallback
  }

  return (
    <div>
      <PageHero
        kicker="Our Services"
        title="Surfaces, Handcrafted"
        subtitle="Four ways to bring warm, considered texture into your space — each one bespoke, each one built to last."
        image={heroImage}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 md:space-y-24 lg:px-8">
          {services.map((service, idx) => (
            <div
              key={service.href}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] border border-tan/60">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
                  {service.tagline}
                </span>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}