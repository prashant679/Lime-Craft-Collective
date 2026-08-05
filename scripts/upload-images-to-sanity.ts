import { getCliClient } from "sanity/cli";
import fs from "fs";
import path from "path";

const client = getCliClient({ apiVersion: "2026-08-04" });

// Map folder/file to service slug
function getServiceSlugForPath(relPath: string): string | null {
  const lower = relPath.toLowerCase();
  if (lower.includes("micro concrete") || lower.includes("microtopping")) {
    return "service-micro-concrete";
  }
  if (lower.includes("limewash")) {
    return "service-limewash";
  }
  if (lower.includes("textured finish")) {
    return "service-textured-finish";
  }
  if (lower.includes("terrazzo")) {
    return "service-terrazzo-flooring";
  }
  return null;
}

// Generate human-readable caption
function getCaptionForPath(filename: string, relPath: string): string {
  const basename = path.basename(filename, path.extname(filename));
  const serviceSlug = getServiceSlugForPath(relPath);
  let category = "Surface finish";
  if (serviceSlug === "service-micro-concrete") category = "Micro Concrete";
  else if (serviceSlug === "service-limewash") category = "Limewash";
  else if (serviceSlug === "service-textured-finish") category = "Textured Finish";
  else if (serviceSlug === "service-terrazzo-flooring") category = "Terrazzo Flooring";

  if (basename === "hero" || basename === "Hero") return `${category} hero showcase`;
  if (basename.includes("WhatsApp")) return `${category} project detail`;
  if (basename.startsWith("sample")) return `${category} sample`;
  if (basename.startsWith("texture")) return `${category} texture`;
  if (basename.startsWith("benefit")) return `${category} feature surface`;
  return `${category} showcase`;
}

async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext) && !file.includes("favicon") && !file.includes("apple-touch") && !file.includes("manifest")) {
        arrayOfFiles.push(fullPath);
      }
    }
  }
  return arrayOfFiles;
}

async function run() {
  console.log("Starting Sanity image upload and sync script...");

  const publicImagesDir = path.join(process.cwd(), "public", "images");
  const allImagePaths = await getAllFiles(publicImagesDir);
  console.log(`Found ${allImagePaths.length} local images to process.`);

  // Query existing assets in Sanity to avoid re-uploading identical files
  const existingAssets = await client.fetch<Array<{ _id: string; originalFilename?: string }>>(`*[_type == "sanity.imageAsset"]{ _id, originalFilename }`);
  const assetMapByFilename: Record<string, string> = {};
  for (const asset of existingAssets) {
    if (asset.originalFilename) {
      assetMapByFilename[asset.originalFilename] = asset._id;
    }
  }

  const uploadedAssetsByPath: Record<string, string> = {};

  for (const filePath of allImagePaths) {
    const filename = path.basename(filePath);
    const relPath = path.relative(publicImagesDir, filePath);

    let assetId = assetMapByFilename[filename];

    if (!assetId) {
      console.log(`Uploading new image: ${relPath}...`);
      try {
        const stream = fs.createReadStream(filePath);
        const asset = await client.assets.upload("image", stream, {
          filename,
        });
        assetId = asset._id;
        console.log(`Uploaded ${relPath} => ${assetId}`);
      } catch (err) {
        console.error(`Failed to upload ${relPath}:`, err);
        continue;
      }
    } else {
      console.log(`Already exists in Sanity: ${relPath} => ${assetId}`);
    }

    uploadedAssetsByPath[relPath] = assetId;
  }

  // Helper to get asset ID by relative path segment
  const findAssetId = (subStr: string): string | undefined => {
    const key = Object.keys(uploadedAssetsByPath).find((k) =>
      k.toLowerCase().includes(subStr.toLowerCase())
    );
    return key ? uploadedAssetsByPath[key] : undefined;
  };

  // 1. Update siteSettings
  console.log("Updating siteSettings document...");
  const homeHeroAsset = findAssetId("pdf/hero.jpg") || findAssetId("hero");
  const servicesHeroAsset = findAssetId("pdf/texture-2.jpg") || findAssetId("texture");
  const aboutHeroAsset = findAssetId("pdf/about.jpeg") || findAssetId("about");
  const aboutWhoAsset = findAssetId("pdf/microtopping-process.jpg") || findAssetId("process");
  const aboutVisionAsset = findAssetId("pdf/philosophy.jpg") || findAssetId("philosophy");
  const galleryHeroAsset = findAssetId("pdf/texture-2.jpg") || findAssetId("texture");
  const faqsHeroAsset = findAssetId("pdf/philosophy.jpg") || findAssetId("philosophy");
  const b1Asset = findAssetId("pdf/benefit-1.jpg");
  const b2Asset = findAssetId("pdf/benefit-2.jpg");
  const b3Asset = findAssetId("pdf/benefit-3.jpg");

  const siteSettingsPatch: Record<string, any> = {};
  if (homeHeroAsset) siteSettingsPatch.homeHeroImage = { _type: "image", asset: { _type: "reference", _ref: homeHeroAsset } };
  if (servicesHeroAsset) siteSettingsPatch.servicesHeroImage = { _type: "image", asset: { _type: "reference", _ref: servicesHeroAsset } };
  if (aboutHeroAsset) siteSettingsPatch.aboutHeroImage = { _type: "image", asset: { _type: "reference", _ref: aboutHeroAsset } };
  if (aboutWhoAsset) siteSettingsPatch.aboutWhoWeAreImage = { _type: "image", asset: { _type: "reference", _ref: aboutWhoAsset } };
  if (aboutVisionAsset) siteSettingsPatch.aboutVisionImage = { _type: "image", asset: { _type: "reference", _ref: aboutVisionAsset } };
  if (galleryHeroAsset) siteSettingsPatch.galleryHeroImage = { _type: "image", asset: { _type: "reference", _ref: galleryHeroAsset } };
  if (faqsHeroAsset) siteSettingsPatch.faqsHeroImage = { _type: "image", asset: { _type: "reference", _ref: faqsHeroAsset } };
  if (b1Asset) siteSettingsPatch.benefitImage1 = { _type: "image", asset: { _type: "reference", _ref: b1Asset } };
  if (b2Asset) siteSettingsPatch.benefitImage2 = { _type: "image", asset: { _type: "reference", _ref: b2Asset } };
  if (b3Asset) siteSettingsPatch.benefitImage3 = { _type: "image", asset: { _type: "reference", _ref: b3Asset } };

  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "Lime Craft Collective Settings",
  });
  await client.patch("siteSettings").set(siteSettingsPatch).commit();
  console.log("siteSettings updated successfully.");

  // 2. Ensure each Service has a heroImage
  console.log("Verifying service hero images...");
  const serviceHeroMapping: Record<string, string | undefined> = {
    "service-micro-concrete": findAssetId("pdf/microtopping-cover.jpg") || findAssetId("micro concrete/hero"),
    "service-limewash": findAssetId("pdf/limewash-cover.jpg") || findAssetId("limewash/1"),
    "service-textured-finish": findAssetId("textured finish/hero.jpeg") || findAssetId("textured"),
    "service-terrazzo-flooring": findAssetId("terrazzo/hero.jpeg") || findAssetId("terrazzo"),
  };

  for (const [serviceId, assetId] of Object.entries(serviceHeroMapping)) {
    if (assetId) {
      await client
        .patch(serviceId)
        .set({
          heroImage: { _type: "image", asset: { _type: "reference", _ref: assetId } },
        })
        .commit();
      console.log(`Updated service ${serviceId} with heroImage ${assetId}`);
    }
  }

  // 3. Create galleryImage documents for newly uploaded images
  console.log("Checking galleryImage documents...");
  const existingGalleryDocAssetRefs = await client.fetch<string[]>(
    `*[_type == "galleryImage"].image.asset._ref`
  );
  const existingRefSet = new Set(existingGalleryDocAssetRefs.filter(Boolean));

  let createdCount = 0;
  for (const [relPath, assetId] of Object.entries(uploadedAssetsByPath)) {
    if (existingRefSet.has(assetId)) {
      continue;
    }

    const filename = path.basename(relPath);
    const serviceSlug = getServiceSlugForPath(relPath);
    const caption = getCaptionForPath(filename, relPath);

    const doc: any = {
      _type: "galleryImage",
      caption,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    };

    if (serviceSlug) {
      doc.service = {
        _type: "reference",
        _ref: serviceSlug,
      };
    }

    await client.create(doc);
    existingRefSet.add(assetId);
    createdCount++;
    console.log(`Created galleryImage for ${relPath} (${caption})`);
  }

  console.log(`Done! Uploaded assets and created ${createdCount} missing galleryImage documents.`);
}

run().catch((err) => {
  console.error("Error running upload script:", err);
  process.exit(1);
});
