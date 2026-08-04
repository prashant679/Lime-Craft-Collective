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
  title: "Limewash",
  description:
    "Pure-limestone plaster finishes rooted in Roman heritage — breathable, hypoallergenic, antimicrobial, with a natural antique character.",
};

const features = [
  {
    title: "Breathable & Hypoallergenic",
    description:
      "Natural limestone plaster lets surfaces breathe, helping regulate indoor humidity and reduce allergens.",
  },
  {
    title: "Antimicrobial by Nature",
    description:
      "The naturally alkaline character of lime resists mold and mildew growth on the wall.",
  },
  {
    title: "Roman Plasterwork Heritage",
    description:
      "A material art refined over centuries — finished here with a modern, handcrafted touch.",
  },
  {
    title: "A Robust, Imperfect Beauty",
    description:
      "Each wall carries the subtle variation and antique character unique to hand-troweled lime.",
  },
];

const limewashSwatches = [
  { name: "Liquid Metal", finish: "Signature Finish", tone: "ink" as const, image: "/images/pdf/swatch-metal.jpg" },
  { name: "Lime Silk", finish: "Signature Finish", tone: "tan" as const, image: "/images/pdf/swatch-silk.jpg" },
  { name: "Lime Crumbled", finish: "Signature Finish", tone: "olive" as const, image: "/images/pdf/swatch-semi.jpg" },
  { name: "Lime Rustic", finish: "Signature Finish", tone: "terracotta" as const, image: "/images/pdf/swatch-rough.jpg" },
];

export default function LimewashPage() {
  return (
    <div>
      <PageHero
        kicker="Limewash"
        accentTitle="Enduring"
        title="Material Art"
        subtitle="Limewash is pure-limestone plasterwork — a breathable, hypoallergenic finish rooted in Roman plasterwork heritage, prized for its natural texture and antique character."
        image="/images/pdf/limewash-cover.jpg"
      >
        <Button href={SITE.whatsappUrl} variant="terracotta" size="md">
          Get a Limewash Quote
        </Button>
      </PageHero>

      <SplitSection
        kicker="Overview"
        accentTitle="Pure"
        title="Limestone, by Hand"
        subtitle="Crafted from natural limestone, limewash is typically applied to walls to create a warm, textured surface that ages beautifully and stays healthy in humid and allergic environments."
        image={
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
            <Image
              src="/images/pdf/limewash-cover.jpg"
              alt="Limewash feature wall"
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
            kicker="Why Limewash?"
            accentTitle="Why"
            title="Limewash"
            subtitle="A natural material with benefits modern finishes struggle to match."
          />
          <CheckList items={features} columns={2} circleVariant="olive" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Signature Finishes"
            title="Four Ways to Finish"
            align="center"
            subtitle="Our signature limewash finishes — each with its own texture and character. Tap a swatch to preview it."
          />
          <SwatchGrid swatches={limewashSwatches} />
        </div>
      </section>

      <section className="border-y border-tan/40 bg-white/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="In Context"
            title="Limewash in the Home"
            subtitle="From calm, textured living walls to striking feature surfaces, limewash brings warmth and depth to any interior."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
              <Image
                src="/images/pdf/philosophy.jpg"
                alt="Limewash living room wall"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] border border-tan/60">
                <Image
                  src="/images/pdf/texture-2.jpg"
                  alt="Lime Silk finish detail"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] border border-tan/60">
                <Image
                  src="/images/pdf/texture-3.jpg"
                  alt="Liquid Metal feature surface"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Walls with a story"
        subtitle="Bring the warmth and heritage of lime into your space — let&apos;s discuss the right finish for your walls."
      />
    </div>
  );
}