import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SplitSection } from "@/components/ui/SplitSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckList } from "@/components/ui/CheckList";
import { CTABanner } from "@/components/ui/CTABanner";
import { Button } from "@/components/ui/Button";

import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Lime Craft Collective — transforming raw concrete into elegant architectural statements through micro concrete, limewash, textured finishes, and terrazzo flooring.",
};

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

export default async function AboutPage() {
  let heroImage: string | undefined = undefined;
  let whoWeAreImage: string | undefined = undefined;
  let visionImage: string | undefined = undefined;

  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{
        "hero": aboutHeroImage.asset->url,
        "who": aboutWhoWeAreImage.asset->url,
        "vision": aboutVisionImage.asset->url
      }`,
    });
    const s = data.data as { hero?: string; who?: string; vision?: string } | null;
    if (s?.hero) heroImage = s.hero;
    if (s?.who) whoWeAreImage = s.who;
    if (s?.vision) visionImage = s.vision;
  } catch {
    // Keep undefined
  }

  return (
    <div>
      <PageHero
        kicker="About Lime Craft Collective"
        accentTitle="Our"
        title="Story"
        subtitle="Raw concrete, elevated into quiet, handcrafted luxury."
        image={heroImage}
      />

      <SplitSection
        kicker="Who We Are"
        title="Transforming Raw Concrete into Elegant Statements"
        subtitle="Lime Craft Collective specializes in decorative concrete surfaces — micro concrete and limewash — for residential and commercial spaces. We blend luxury aesthetics with durability and cost efficiency to redefine what a surface can be."
        image={
          whoWeAreImage ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
              <Image
                src={whoWeAreImage}
                alt="Our craft in progress"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : undefined
        }
      />

      <SplitSection
        imageSide="right"
        kicker="Our Vision"
        accentTitle="Our"
        title="Vision"
        subtitle="We believe concrete can be a premium design medium. Through bespoke, handcrafted surfaces, we aim to change how people see and live with an everyday material — turning the ordinary into something considered and enduring."
        image={
          visionImage ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-tan/60">
              <Image
                src={visionImage}
                alt="Bespoke limewash finish"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : undefined
        }
      />

      <section className="border-y border-tan/40 bg-white/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Our Philosophy"
            accentTitle="What"
            title="We Stand For"
            subtitle="Four principles shape every material choice, every trowel stroke, and every project we take on."
          />
          <CheckList items={philosophyPoints} columns={2} circleVariant="ink" />
          <div className="mt-10">
            <Button href="/services" variant="outline" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>
      </section>

      <CTABanner
        title="Let&apos;s craft something enduring"
        subtitle="Tell us about your space and we&apos;ll help you choose the right finish."
      />
    </div>
  );
}