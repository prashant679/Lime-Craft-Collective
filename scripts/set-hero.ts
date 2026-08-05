import { getCliClient } from "sanity/cli";

async function main() {
  const client = getCliClient({ apiVersion: "2026-08-04" });

  await client
    .patch("service-limewash")
    .set({
      heroImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: "image-cc62738d91362632c9d9d9ece4657191fb1dbbda-1920x1080-jpg",
        },
      },
    })
    .commit();

  await client
    .patch("siteSettings")
    .set({
      servicesHeroImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: "image-cc62738d91362632c9d9d9ece4657191fb1dbbda-1920x1080-jpg",
        },
      },
    })
    .commit();

  console.log("Successfully updated Limewash and Services hero images in Sanity!");
}

main().catch(console.error);
