import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { CTABanner } from "@/components/ui/CTABanner";
import { SITE } from "@/components/layout/site";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 0;

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
  keyFeatures,
  perfectApplications,
  processSteps[]{ _key, title, description }
}`;

const galleryQuery = `*[_type == "galleryImage" && service->slug.current == $slug] | order(_createdAt desc){
  caption,
  image{ asset->{ url } }
}[0...8]`;

interface ServiceDoc {
  _id: string;
  name: string;
  slug: { current: string } | null;
  shortDescription?: string;
  description?: string;
  heroImage?: { asset?: { url?: string } };
  whyPoints?: { _key?: string; title: string; description: string }[];
  keyFeatures?: string[];
  perfectApplications?: string[];
  processSteps?: { _key?: string; title: string; description: string }[];
}

interface GalleryItem {
  caption?: string;
  image?: { asset?: { url?: string } };
}

interface ProcessStep {
  _key?: string;
  title: string;
  description: string;
}

const defaultProcess: ProcessStep[] = [
  { title: "Surface Preparation", description: "We assess and prepare the existing surface, ensuring it is sound, clean, and ready to accept the finish." },
  { title: "Base / First Layer", description: "The first coat is applied to establish a uniform, stable base for the surface." },
  { title: "Finishing Coat", description: "The finish coat is hand-troweled on, building the color, texture, and final character." },
  { title: "Sealing", description: "A protective seal locks in the finish, guarding it against daily wear and water." },
];

const processSteps: Record<string, ProcessStep[]> = {
  "micro-concrete": defaultProcess,
  limewash: [
    { title: "Surface Preparation", description: "We prepare the wall, ensuring it is clean, stable, and suitably porous for lime plaster." },
    { title: "Lime Base Coats", description: "Generous base coats of lime plaster build a breathable, absorbent foundation." },
    { title: "Hand-Applied Finish Coats", description: "The finish is troweled on by hand, layering the surface's natural antique variation and tone." },
    { title: "Curing & Treatment", description: "Lime cures and breathes as it dries, yielding a soft, matte, naturally durable surface." },
  ],
  "textured-finish": [
    { title: "Surface Preparation", description: "We prepare the base so it is clean, even, and ready to receive the hand-worked texture." },
    { title: "Base / First Layer", description: "A consistent base coat is applied to anchor and level the surface." },
    { title: "Texture Application", description: "The texture is worked by hand, building the depth, grain, and relief unique to your space." },
    { title: "Sealing", description: "A final seal protects the texture and keeps it hard-wearing and simple to maintain." },
  ],
  "terrazzo-flooring": [
    { title: "Surface Preparation", description: "We prepare the subfloor, ensuring it is level, sound, and clean before pouring begins." },
    { title: "Base / Pour", description: "The terrazzo mix — chips, marble, and binder — is poured and leveled in place." },
    { title: "Grinding & Polishing", description: "The cured slab is ground smooth and polished to reveal its aggregate and chosen finish." },
    { title: "Sealing", description: "A protective seal is applied to preserve the polish and protect the floor against wear and stains." },
  ],
};

function resolveHeroImage(service: ServiceDoc): string | undefined {
  return service.heroImage?.asset?.url || undefined;
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
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  let service: ServiceDoc | null = null;
  let gallery: GalleryItem[] = [];
  try {
    const data = await sanityFetch({
      query: serviceQuery,
      params: { slug },
    });
    service = ((data.data ?? null) as ServiceDoc | null) ?? null;

    const galleryData = await sanityFetch({
      query: galleryQuery,
      params: { slug },
    });
    gallery = ((galleryData.data ?? []) as GalleryItem[]).filter(
      (item) => item.image?.asset?.url,
    );
  } catch {
    service = null;
    gallery = [];
  }

  if (!service) notFound();

  const slugLower = slug.toLowerCase();
  const heroImage = resolveHeroImage(service);
  const whyPoints =
    service.whyPoints && service.whyPoints.length > 0
      ? service.whyPoints
      : undefined;
  const keyFeatures =
    service.keyFeatures && service.keyFeatures.length > 0
      ? service.keyFeatures
      : undefined;
  const perfectApplications =
    service.perfectApplications && service.perfectApplications.length > 0
      ? service.perfectApplications
      : undefined;
  const steps =
    service.processSteps && service.processSteps.length > 0
      ? service.processSteps.map((step, index) => ({
          title: step.title,
          description: step.description,
          _key: step._key ?? `step-${index}`,
        }))
      : processSteps[slugLower] ?? defaultProcess;
  const galleryImages: GalleryItem[] = gallery;

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

      {whyPoints && (
        <section className="py-12 sm:py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker={`Why ${service.name}`}
              accentTitle="Why"
              title={`Choose ${service.name}`}
              subtitle="The reasons this finish stands apart for both its look and its longevity."
            />
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whyPoints.map((point) => (
                <div
                  key={point._key ?? point.title}
                  className="rounded-[4px] border border-tan/60 bg-white/60 p-5 sm:p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <span
                    className="mb-3 sm:mb-4 block h-1 w-10 bg-terracotta"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {keyFeatures && (
        <section className="border-y border-tan/40 bg-white/50 py-12 sm:py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Performance"
              accentTitle="Key"
              title="Features"
              subtitle="The technical properties that make this finish dependable day in, day out."
            />
            <CheckList items={keyFeatures} columns={2} circleVariant="terracotta" />
          </div>
        </section>
      )}

      {perfectApplications && (
        <section className="py-12 sm:py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker="Where It Works"
              accentTitle="Perfect"
              title="Applications"
              subtitle="A few of the places this finish feels most at home."
            />
            <CheckList items={perfectApplications} columns={2} circleVariant="olive" />
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="How We Work"
            accentTitle="Our Application"
            title="Process"
            subtitle="From the first surface check to the final seal — every stage is done by hand, in order."
          />
          <ol className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step._key ?? step.title}
                className="relative rounded-[4px] border border-tan/60 bg-white/60 p-5 sm:p-6 md:p-8"
              >
                <span
                  className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-terracotta font-serif text-base sm:text-lg font-semibold text-cream"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-tan/40 bg-white/50 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Recent Work"
            accentTitle="Project"
            title="Gallery"
            subtitle={`A selection of completed ${service.name} surfaces.`}
          />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
            {galleryImages.map((item, idx) => (
              <li
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-tan/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={item.image!.asset!.url!}
                    alt={item.caption || `${service.name} project`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {item.caption && (
                  <>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3">
                      <p className="font-serif text-xs sm:text-sm font-semibold leading-snug text-cream">
                        {item.caption}
                      </p>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        title={`Let's talk ${service.name}`}
        subtitle="From a single feature surface to a full interior, we handcraft finishes to order. Tell us about your space."
      />
    </div>
  );
}