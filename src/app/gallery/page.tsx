import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore completed Micro Concrete, Limewash, Textured Finish, and Terrazzo projects by Lime Craft Collective across Delhi NCR and beyond.",
};

interface GalleryItem {
  caption: string;
  tag: string;
  image: string;
}

const fallbackItems: GalleryItem[] = [
  { caption: "Seamless micro concrete floor", tag: "Micro Concrete", image: "/images/pdf/microtopping-cover.jpg" },
  { caption: "Micro concrete finish in progress", tag: "Micro Concrete", image: "/images/pdf/microtopping-process.jpg" },
  { caption: "Commercial micro concrete floor", tag: "Micro Concrete", image: "/images/pdf/texture-1.jpg" },
  { caption: "Bespoke colored micro concrete", tag: "Micro Concrete", image: "/images/pdf/texture-2.jpg" },
  { caption: "Rough-texture micro surface", tag: "Micro Concrete", image: "/images/pdf/benefit-2.jpg" },
  { caption: "Limewash feature wall", tag: "Limewash", image: "/images/pdf/limewash-cover.jpg" },
  { caption: "Warm limewash living wall", tag: "Limewash", image: "/images/pdf/philosophy.jpg" },
  { caption: "Limewash texture detail", tag: "Limewash", image: "/images/pdf/texture-3.jpg" },
  { caption: "Breathable lime plaster", tag: "Limewash", image: "/images/pdf/benefit-1.jpg" },
  { caption: "Hand-applied textured finish", tag: "Textured Finish", image: "/images/Textured%20Finish/hero.jpeg" },
  { caption: "Textured finish wall detail", tag: "Textured Finish", image: "/images/Textured%20Finish/WhatsApp%20Image%202026-08-04%20at%203.41.41%20PM.jpeg" },
  { caption: "Textured feature surface", tag: "Textured Finish", image: "/images/Textured%20Finish/WhatsApp%20Image%202026-08-04%20at%203.41.18%20PM%20(1).jpeg" },
  { caption: "Hand-applied texture", tag: "Textured Finish", image: "/images/Textured%20Finish/WhatsApp%20Image%202026-08-04%20at%203.41.17%20PM.jpeg" },
  { caption: "Textured finish surface", tag: "Textured Finish", image: "/images/Textured%20Finish/WhatsApp%20Image%202026-08-04%20at%203.41.41%20PM1.jpeg" },
  { caption: "Subtle texture detail", tag: "Textured Finish", image: "/images/Textured%20Finish/WhatsApp%20Image%202026-08-04%20at%203.41.17%20PM%20(1).jpeg" },
  { caption: "Polished terrazzo flooring", tag: "Terrazzo Flooring", image: "/images/Terrazzo/Hero.jpeg" },
  { caption: "Terrazzo aggregate detail", tag: "Terrazzo Flooring", image: "/images/Terrazzo/sample.jpeg" },
  { caption: "Terrazzo speckle surface", tag: "Terrazzo Flooring", image: "/images/Terrazzo/sample2.jpeg" },
  { caption: "Seamless terrazzo floor", tag: "Terrazzo Flooring", image: "/images/Terrazzo/sample3.jpeg" },
  { caption: "Terrazzo finish option", tag: "Terrazzo Flooring", image: "/images/Terrazzo/sample5.jpeg" },
  { caption: "Terrazzo flooring showcase", tag: "Terrazzo Flooring", image: "/images/Terrazzo/12.jpeg" },
];

async function getGallery(): Promise<GalleryItem[]> {
  try {
    const data = await sanityFetch({
      query: `*[_type == "galleryImage"] | order(_createdAt desc) {
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
    const docs = ((data.data ?? []) as GalleryDoc[]).filter(
      (doc) => doc.image?.asset?.url,
    );
    if (docs.length === 0) return fallbackItems;
    return docs.map((doc) => ({
      caption: doc.caption || "Completed project",
      tag: doc.serviceName || "General",
      image: doc.image!.asset!.url!,
    }));
  } catch {
    return fallbackItems;
  }
}

export default async function GalleryPage() {
  const galleryItems = await getGallery();
  let heroImage = "/images/pdf/texture-2.jpg";

  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{ "hero": galleryHeroImage.asset->url }`,
    });
    const s = data.data as { hero?: string } | null;
    if (s?.hero) heroImage = s.hero;
  } catch {
    // Keep fallback
  }

  return (
    <div>
      <PageHero
        kicker="Our Work"
        title="Project Gallery"
        subtitle="A selection of completed surfaces — Micro Concrete, Limewash, Textured Finish, and Terrazzo — handcrafted for residential and commercial spaces."
        image={heroImage}
      />

      <section className="py-12 sm:py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {galleryItems.map((item, idx) => (
              <li
                key={idx}
                className="group relative overflow-hidden rounded-[4px] border border-tan/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8A47E]">
                    {item.tag}
                  </span>
                  <p className="mt-0.5 font-serif text-sm font-semibold text-cream sm:text-base">
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