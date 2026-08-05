import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.limecraftcollective.com";
  const baseUrl = rawBaseUrl.replace(
    "https://limecraftcollective.com",
    "https://www.limecraftcollective.com"
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
