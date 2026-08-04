import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore completed microtopping and limewash projects by Lime Craft Collective across Delhi NCR and beyond.",
};

interface GalleryItem {
  caption: string;
  tag: string;
  image: string;
  aspect: "3/2" | "4/5" | "square";
}

const galleryItems: GalleryItem[] = [
  { caption: "Seamless microtopping floor", tag: "Microtopping", image: "/images/pdf/microtopping-cover.jpg", aspect: "3/2" },
  { caption: "Limewash feature wall", tag: "Limewash", image: "/images/pdf/limewash-cover.jpg", aspect: "4/5" },
  { caption: "Smooth texture surface", tag: "Microtopping", image: "/images/pdf/swatch-smooth.jpg", aspect: "square" },
  { caption: "Rough-texture finish", tag: "Microtopping", image: "/images/pdf/swatch-rough.jpg", aspect: "3/2" },
  { caption: "Breathable lime plaster", tag: "Limewash", image: "/images/pdf/philosophy.jpg", aspect: "4/5" },
  { caption: "Residential microtopping", tag: "Microtopping", image: "/images/pdf/microtopping-process.jpg", aspect: "square" },
  { caption: "Lime Silk finish detail", tag: "Limewash", image: "/images/pdf/swatch-silk.jpg", aspect: "3/2" },
  { caption: "Liquid Metal feature surface", tag: "Limewash", image: "/images/pdf/swatch-metal.jpg", aspect: "4/5" },
  { caption: "Commercial microtopping lobby", tag: "Microtopping", image: "/images/pdf/texture-1.jpg", aspect: "square" },
  { caption: "Lime Rustic wall", tag: "Limewash", image: "/images/pdf/swatch-semi.jpg", aspect: "3/2" },
  { caption: "Bespoke color microtopping", tag: "Microtopping", image: "/images/pdf/texture-2.jpg", aspect: "4/5" },
  { caption: "Hand-troweled lime texture", tag: "Limewash", image: "/images/pdf/texture-3.jpg", aspect: "square" },
];

const aspectClasses: Record<GalleryItem["aspect"], string> = {
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  square: "aspect-square",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        kicker="Our Work"
        title="Project Gallery"
        subtitle="A selection of completed surfaces — microtopping and limewash — handcrafted for residential and commercial spaces."
        image="/images/pdf/texture-1.jpg"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {galleryItems.map((item, idx) => (
              <li
                key={idx}
                className="group relative overflow-hidden rounded-[4px] border border-tan/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`relative ${aspectClasses[item.aspect]}`}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A47E]">
                    {item.tag}
                  </span>
                  <p className="mt-0.5 font-serif text-base font-semibold text-cream">
                    {item.caption}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        title="Want a surface like these?"
        subtitle="Every project starts with a conversation. Tell us about your space and we&apos;ll bring the same craft to it."
      />
    </div>
  );
}