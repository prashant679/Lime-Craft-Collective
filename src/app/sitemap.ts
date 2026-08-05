import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";

const defaultServiceSlugs = [
  "micro-concrete",
  "limewash",
  "textured-finish",
  "terrazzo-flooring",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.limecraftcollective.com";
  const baseUrl = rawBaseUrl.replace(
    "https://limecraftcollective.com",
    "https://www.limecraftcollective.com"
  );

  let serviceSlugs = defaultServiceSlugs;
  try {
    const data = await sanityFetch({
      query: `*[_type == "service"][0...50] { "slug": slug.current }`,
    });
    const fetched = ((data.data ?? []) as { slug?: string }[])
      .map((s) => s.slug)
      .filter((s): s is string => Boolean(s));

    if (fetched.length > 0) {
      serviceSlugs = Array.from(new Set([...defaultServiceSlugs, ...fetched]));
    }
  } catch {
    serviceSlugs = defaultServiceSlugs;
  }

  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
