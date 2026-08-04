import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SplitSection } from "@/components/ui/SplitSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { SwatchGrid } from "@/components/ui/SwatchGrid";
import { CTABanner } from "@/components/ui/CTABanner";
import { SITE } from "@/components/layout/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Microtopping",
  description:
    "Ultra-thin, seamless decorative concrete coatings for floors and walls — custom colors and textures, built for water, wear, and stains.",
};

const whyPoints = [
  {
    title: "Seamless, Joint-Free Surfaces",
    description:
      "A continuous, uninterrupted finish that reads as one considered material — no grout lines, no breaks.",
  },
  {
    title: "Water, Wear & Stain Resistance",
    description:
      "Engineered for durability, making it well suited to bathrooms and high-moisture spaces.",
  },
  {
    title: "Custom Colors & Textures",
    description:
      "A fully customizable palette from muted earth tones to bold hues, in Smooth, Semi-Rough, or Rough textures.",
  },
  {
    title: "Modern Application, Lasting Performance",
    description:
      "Applied in ultra-thin coats over sound existing surfaces — no demolition, no change to floor levels.",
  },
  {
    title: "Ideal for Luxury Interiors",
    description:
      "A sleek, modern aesthetic that suits residential and commercial interiors alike.",
  },
];

const textures = [
  {
    name: "Smooth",
    description:
      "A polished, refined surface with subtle variation — the quiet, minimalist choice for modern interiors.",
  },
  {
    name: "Semi-Rough",
    description:
      "A tactile, light-textured finish that adds gentle depth and character underfoot.",
  },
  {
    name: "Rough",
    description:
      "A more pronounced, matte texture with visible trowel character for an earthy, artisanal feel.",
  },
];

const maintenancePoints = [
  "Sweep or vacuum regularly to remove dirt and grit.",
  "Clean spills promptly with a damp cloth.",
  "Use pH-neutral detergents for routine cleaning.",
  "Protect the surface during heavy work or moving furniture.",
  "Apply occasional protective treatments to preserve the finish.",
];

const microtoppingSwatches = [
  { name: "Smooth", finish: "Smooth Texture", tone: "tan" as const, image: "/images/pdf/swatch-smooth.jpg" },
  { name: "Semi-Rough", finish: "Semi-Rough Texture", tone: "olive" as const, image: "/images/pdf/swatch-semi.jpg" },
  { name: "Rough", finish: "Rough Texture", tone: "ink" as const, image: "/images/pdf/swatch-rough.jpg" },
  { name: "Bespoke Color", finish: "Custom Hues", tone: "terracotta" as const, image: "/images/pdf/texture-3.jpg" },
];

export default function MicrotoppingPage() {
  return (
    <div>
      <PageHero
        kicker="Microtopping"
        accentTitle="The Art"
        title="of Minimalism"
        subtitle="Microtopping is the art of minimalism — a seamless, modern surface achieved with an ultra-thin decorative concrete coating."
        image="/images/pdf/microtopping-cover.jpg"
      >
        <Button href={SITE.whatsappUrl} variant="terracotta" size="md">
          Get a Microtopping Quote
        </Button>
      </PageHero>

      <SplitSection
        kicker="Overview"
        title="Ultra-Thin, Seamlessly Applied"
        subtitle="Applied at up to 3mm over existing floors or walls, microtopping creates a joint-free, architectural surface without demolition — and without changing floor levels."
        image={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
            <Image
              src="/images/pdf/microtopping-process.jpg"
              alt="Seamless microtopping floor"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      />

      <section className="border-y border-tan/40 bg-white/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Why Microtopping?"
            accentTitle="Why"
            title="Microtopping"
            subtitle="Five reasons this finish stands apart for both its look and its longevity."
          />
          <CheckList items={whyPoints} columns={2} circleVariant="terracotta" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Texture & Tone"
            accentTitle="Texture"
            title="& Tone"
            subtitle="Choose the character of your surface — from a quiet, polished plane to a pronounced matte texture."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {textures.map((texture) => (
              <div
                key={texture.name}
                className="rounded-[4px] border border-tan/60 bg-white/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mb-4 block h-1 w-10 bg-terracotta" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-semibold text-ink">{texture.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{texture.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-tan/40 bg-white/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Swatch Picker"
            title="Choose a Finish"
            align="center"
            subtitle="Tap a swatch to preview it enlarged. A fully customizable palette is available on request."
          />
          <SwatchGrid swatches={microtoppingSwatches} />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Care & Maintenance"
            accentTitle="Simple"
            title="Maintenance"
            subtitle="Microtopping is low-maintenance by design. A few simple habits keep it looking new."
          />
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] border border-tan/60">
              <Image
                src="/images/pdf/texture-1.jpg"
                alt="Maintained microtopping surface"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <CheckList items={maintenancePoints} columns={1} circleVariant="olive" />
          </div>
        </div>
      </section>

      <CTABanner
        title="Seamless, at any scale"
        subtitle="From a single feature floor to a full interior, microtopping transforms surfaces. Let&apos;s talk about yours."
      />
    </div>
  );
}