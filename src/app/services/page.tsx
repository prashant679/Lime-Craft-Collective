import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 0;

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
  image?: string;
  alt: string;
}

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
    return docs.map((doc) => {
      const slug = doc.slug!.current!;
      return {
        href: `/services/${slug}`,
        title: doc.name,
        tagline: "Handcrafted for your space",
        description: doc.shortDescription || doc.name,
        image: doc.heroImage?.asset?.url || undefined,
        alt: `${doc.name} — handcrafted surface`,
      };
    });
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  let heroImage: string | undefined = undefined;

  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{ "hero": servicesHeroImage.asset->url }`,
    });
    const s = data.data as { hero?: string } | null;
    if (s?.hero) heroImage = s.hero;
  } catch {
    heroImage = undefined;
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
              className={`grid items-center gap-10 ${
                service.image ? "lg:grid-cols-2 lg:gap-16" : ""
              } ${
                idx % 2 === 1 && service.image ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {service.image && (
                <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] border border-tan/60">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
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