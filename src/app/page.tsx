import React from "react";
import Image from "next/image";
import { ArrowRight, Layers, MessageCircle, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { SplitSection } from "@/components/ui/SplitSection";
import { CTABanner } from "@/components/ui/CTABanner";
import { SITE } from "@/components/layout/site";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 0;

const philosophyPoints = [
  {
    title: "Environmentally Responsible Materials",
    description:
      "Low-VOC, sustainable mineral plasters and eco-conscious concrete formulations.",
  },
  {
    title: "Exceptional Quality & Transparent Pricing",
    description:
      "Craftsmanship backed by honest project estimates with zero hidden costs.",
  },
  {
    title: "Continuous Innovation",
    description:
      "Constantly refining techniques to deliver modern, long-lasting surface artistry.",
  },
  {
    title: "Social & Material Responsibility",
    description:
      "Bespoke architectural finishes created with care for craftsmen and clients alike.",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Effortless Transformation",
    description:
      "Thin-coat finishes that renew tired floors and walls without demolition — a fresh start for any interior.",
    image: "/images/pdf/benefit-1.jpg",
    alt: "Fresh, renewed surface after a thin-coat finish",
  },
  {
    icon: Layers,
    title: "Seamless Aesthetic",
    description:
      "Joint-free, continuous surfaces in custom colors and textures that read as one considered material.",
    image: "/images/pdf/benefit-2.jpg",
    alt: "Seamless, joint-free textured surface",
  },
  {
    icon: Wind,
    title: "Crafted to Last",
    description:
      "Durable, water-and-wear-resistant finishes designed for years of quiet, low-maintenance performance.",
    image: "/images/pdf/benefit-3.jpg",
    alt: "Durable handcrafted surface finish",
  },
];

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
}

const services: ServiceCard[] = [
  {
    href: "/services/micro-concrete",
    title: "Micro Concrete",
    description:
      "Ultra-thin decorative concrete coatings creating seamless, modern surfaces for floors and walls.",
    image: "/images/pdf/microtopping-cover.jpg",
    alt: "Seamless micro concrete finish",
  },
  {
    href: "/services/limewash",
    title: "Limewash",
    description:
      "Pure-limestone plasterwork with a natural texture and antique character, breathable and hypoallergenic.",
    image: "/images/pdf/limewash-cover.jpg",
    alt: "Limewash limestone plaster finish",
  },
  {
    href: "/services/textured-finish",
    title: "Textured Finish",
    description:
      "Hand-applied textures that bring tactile depth to walls and floors — dimension without pattern or noise.",
    image: "/images/Textured%20Finish/hero.jpeg",
    alt: "Hand-applied textured finish",
  },
  {
    href: "/services/terrazzo-flooring",
    title: "Terrazzo Flooring",
    description:
      "Timeless speckled elegance poured and polished to a seamless, durable finish built to last generations.",
    image: "/images/Terrazzo/Hero.jpeg",
    alt: "Polished terrazzo flooring",
  },
];

const galleryItems = [
  {
    image: "/images/pdf/microtopping-cover.jpg",
    caption: "Seamless micro concrete floor",
    tag: "Micro Concrete",
  },
  {
    image: "/images/pdf/limewash-cover.jpg",
    caption: "Limewash feature wall",
    tag: "Limewash",
  },
  {
    image: "/images/Textured%20Finish/hero.jpeg",
    caption: "Hand-applied textured finish",
    tag: "Textured Finish",
  },
  {
    image: "/images/Terrazzo/Hero.jpeg",
    caption: "Polished terrazzo floor",
    tag: "Terrazzo Flooring",
  },
  {
    image: "/images/pdf/benefit-2.jpg",
    caption: "Rough-texture surface",
    tag: "Micro Concrete",
  },
  {
    image: "/images/pdf/texture-3.jpg",
    caption: "Breathable lime plaster",
    tag: "Limewash",
  },
];

export default async function Home() {
  let serviceCards: ServiceCard[] = services;
  let homeHeroImage = "/images/pdf/hero.jpg";
  let homeAboutImage = "/images/pdf/about.jpeg";
  let benefitImages = [
    "/images/pdf/benefit-1.jpg",
    "/images/pdf/benefit-2.jpg",
    "/images/pdf/benefit-3.jpg",
  ];
  let recentGallery = galleryItems;

  try {
    const settingsData = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{
        "homeHero": homeHeroImage.asset->url,
        "homeAbout": homeAboutImage.asset->url,
        "b1": benefitImage1.asset->url,
        "b2": benefitImage2.asset->url,
        "b3": benefitImage3.asset->url
      }`,
    });
    const s = settingsData.data as {
      homeHero?: string;
      homeAbout?: string;
      b1?: string;
      b2?: string;
      b3?: string;
    } | null;
    if (s?.homeHero) homeHeroImage = s.homeHero;
    if (s?.homeAbout) homeAboutImage = s.homeAbout;
    if (s?.b1) benefitImages[0] = s.b1;
    if (s?.b2) benefitImages[1] = s.b2;
    if (s?.b3) benefitImages[2] = s.b3;
  } catch {
    // Keep fallbacks
  }

  try {
    const galleryData = await sanityFetch({
      query: `*[_type == "galleryImage"] | order(_createdAt desc)[0...6] {
        caption,
        image{ asset->{ url } },
        "serviceName": service->name
      }`,
    });
    type GalleryDoc = {
      caption?: string;
      image?: { asset?: { url?: string } };
      serviceName?: string;
    };
    const docs = ((galleryData.data ?? []) as GalleryDoc[]).filter(
      (doc) => doc.image?.asset?.url,
    );
    if (docs.length > 0) {
      recentGallery = docs.map((doc) => ({
        image: doc.image!.asset!.url!,
        caption: doc.caption || "Seamless surface finish",
        tag: doc.serviceName || "Decorative Concrete",
      }));
    }
  } catch {
    // Keep fallbacks
  }

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
    type ServiceDoc = {
      _id: string;
      name: string;
      slug: { current: string } | null;
      shortDescription?: string;
      heroImage?: { asset?: { url?: string } };
    };
    const docs = ((data.data ?? []) as ServiceDoc[]).filter(
      (doc) => doc.slug?.current,
    );
    if (docs.length > 0) {
      const imageFor: Record<string, { image: string; alt: string }> = {
        "micro-concrete": { image: "/images/pdf/microtopping-cover.jpg", alt: "Micro Concrete finish" },
        limewash: { image: "/images/pdf/limewash-cover.jpg", alt: "Limewash finish" },
        "textured-finish": { image: "/images/Textured%20Finish/hero.jpeg", alt: "Textured finish" },
        "terrazzo-flooring": { image: "/images/Terrazzo/Hero.jpeg", alt: "Terrazzo flooring" },
      };
      serviceCards = docs.map((service) => {
        const slug = service.slug!.current!;
        const fallback = imageFor[slug];
        const img = service.heroImage?.asset?.url || fallback?.image || "";
        return {
          title: service.name,
          description: service.shortDescription || service.name,
          href: `/services/${slug}`,
          image: img,
          alt: fallback?.alt ?? `${service.name} finish`,
        };
      });
    }
  } catch {
    serviceCards = services;
  }

  const benefitList = benefits.map((b, idx) => ({
    ...b,
    image: benefitImages[idx] || b.image,
  }));

  return (
    <div>
      <section className="relative flex min-h-[72vh] items-center overflow-hidden">
        <Image
          src={homeHeroImage}
          alt="Lime Craft Collective — handcrafted luxury concrete textures"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-32 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/80">
            Lime Craft Collective
          </span>
          <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.15] tracking-tight text-cream text-balance sm:text-5xl md:text-7xl">
            Handcrafted{" "}
            <span className="font-normal italic text-[#E8A47E]">Luxury Textures</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-cream/85 md:text-xl">
            Transforming raw concrete into elegant architectural statements across
            residential and commercial spaces.
          </p>
          <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
            <Button
              href={SITE.whatsappUrl}
              variant="terracotta"
              size="lg"
              icon={<MessageCircle className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Get a Quote on WhatsApp
            </Button>
            <Button
              href="/services"
              variant="cream"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>

      <SplitSection
        kicker="About Us"
        accentTitle="About"
        title="Us — Raw Concrete, Considered"
        subtitle="We blend luxury aesthetics with durability and cost efficiency to redefine what a surface can be. Every project is an opportunity to turn an everyday material into a quiet piece of craftsmanship."
        image={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
            <Image
              src={homeAboutImage}
              alt="Micro Concrete finish in progress"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <p className="mt-4 text-base leading-relaxed text-muted">
          From seamless floors to breathable lime plasterwork, our work spans residential
          interiors and commercial spaces across Delhi NCR and beyond.
        </p>
        <div className="mt-8">
          <Button href="/about" variant="outline" size="md">
            Read Our Story
          </Button>
        </div>
      </SplitSection>

      <section className="border-y border-tan/40 bg-white/50 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Our Philosophy"
            accentTitle="Crafted"
            title="with Purpose & Precision"
            subtitle="Four principles guide every material choice, every trowel stroke, and every project we take on."
          />
          <CheckList items={philosophyPoints} columns={2} circleVariant="ink" />
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="What We Do"
            title="Our Services"
            subtitle="Four ways to bring warm, handcrafted texture into your space."
          />
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-[4px] border border-tan/60 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/50 hover:shadow-md"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#7C8266] to-[#565C45]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8 pt-5 sm:pt-6">
                  <span className="mb-3 sm:mb-4 h-1 w-10 bg-terracotta" aria-hidden="true" />
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink transition-colors group-hover:text-terracotta">
                    {service.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 flex-1 text-xs sm:text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-terracotta">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-tan/40 bg-white/50 py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Why Choose Us"
            title="Key Benefits"
            align="center"
            subtitle="The difference between a coating and a craft."
          />
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {benefitList.map((benefit) => (
              <div
                key={benefit.title}
                className="group overflow-hidden rounded-[4px] border border-tan/60 bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 sm:p-6 md:p-8 pt-6">
                  <span className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-ink text-cream">
                    <benefit.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Recent Work"
            title="From the Gallery"
            subtitle="A glimpse of the surfaces we handcraft — explore the full portfolio on the Gallery page."
          />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {recentGallery.map((item, idx) => (
              <li
                key={idx}
                className="group relative aspect-[3/2] overflow-hidden rounded-[4px] border border-tan/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Link href="/gallery" aria-label={`View ${item.caption} in the gallery`}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#E8A47E]">
                      {item.tag}
                    </span>
                    <p className="mt-0.5 font-serif text-xs font-semibold text-cream line-clamp-1 sm:text-base">
                      {item.caption}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 sm:mt-10 text-center">
            <Button href="/gallery" variant="outline" size="lg" className="w-full sm:w-auto">
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
