import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Decorative concrete surfaces by Lime Craft Collective — Microtopping, Limewash, and bespoke Terrazzo Flooring.",
};

const services = [
  {
    href: "/services/microtopping",
    title: "Microtopping",
    tagline: "The art of minimalism",
    description:
      "Ultra-thin (up to 3mm) decorative concrete coatings applied over existing floors or walls. Seamless, joint-free surfaces with custom colors and textures.",
    image: "/images/pdf/microtopping-cover.jpg",
    alt: "Microtopping — seamless concrete coating",
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
    href: "/contact",
    title: "Terrazzo Flooring",
    tagline: "Bespoke, on request",
    description:
      "We also offer bespoke Terrazzo Flooring. A short conversation is all it takes to discuss your project — get in touch to learn more.",
    image: "/images/pdf/texture-1.jpg",
    alt: "Terrazzo — bespoke flooring",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        kicker="Our Services"
        title="Surfaces, Handcrafted"
        subtitle="Three ways to bring warm, considered texture into your space — each one bespoke, each one built to last."
        image="/images/pdf/texture-2.jpg"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 md:space-y-24 lg:px-8">
          {services.map((service, idx) => (
            <div
              key={service.title}
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