import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CTABanner } from "@/components/ui/CTABanner";
import { sanityFetch } from "@/sanity/lib/live";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore completed Micro Concrete, Limewash, Textured Finish, and Terrazzo projects by Lime Craft Collective across Delhi NCR and beyond.",
  alternates: {
    canonical: "/gallery",
  },
};

interface GalleryItem {
  caption: string;
  tag: string;
  image: string;
}

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
    return docs.map((doc) => ({
      caption: doc.caption || "Completed project",
      tag: doc.serviceName || "General",
      image: doc.image!.asset!.url!,
    }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const galleryItems = await getGallery();
  let heroImage: string | undefined = undefined;

  try {
    const data = await sanityFetch({
      query: `*[_type == "siteSettings"][0]{ "hero": galleryHeroImage.asset->url }`,
    });
    const s = data.data as { hero?: string } | null;
    if (s?.hero) heroImage = s.hero;
  } catch {
    heroImage = undefined;
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
          {galleryItems.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
              {galleryItems.map((item, idx) => (
                <li
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-tan/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
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
          ) : (
            <div className="py-12 text-center text-muted font-serif text-lg">
              No gallery images uploaded yet. Upload project photos in Sanity Studio to feature them here.
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Want a surface like these?"
        subtitle="Every project starts with a conversation. Tell us about your space and we&apos;ll bring the same craft to it."
      />
    </div>
  );
}