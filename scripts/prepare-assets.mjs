import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "assets");
const outDir = join(root, "public", "media");
const manifestFile = join(root, "src", "lib", "generated", "media.ts");

const INK = { r: 26, g: 20, b: 17 };
const BONE = { r: 244, g: 240, b: 232 };

const LOGO_SHEET = "Crystal Kizor Logo Collection.png";

const LOGO_CELLS = [
  { slug: "wordmark-stacked", x: [0.012, 0.432], y: [0.03, 0.78] },
  { slug: "monogram", x: [0.455, 0.655], y: [0.04, 0.36] },
  { slug: "wordmark-inline", x: [0.678, 0.988], y: [0.04, 0.36] },
  { slug: "signature", x: [0.455, 0.655], y: [0.53, 0.86] },
  { slug: "monogram-ring", x: [0.678, 0.988], y: [0.53, 0.86] },
];

const MARK_BOX = { x: [0.455, 0.655], y: [0.04, 0.36] };

const PHOTOS = [
  { file: "Crystal_s pictures/Architectural Studio Portrait.png", slug: "crystal-standing", width: 1600 },
  { file: "Crystal_s pictures/Earthy Editorial Portrait by African Architecture.png", slug: "crystal-seated", width: 2000 },
  { file: "Crystal_s pictures/Confident Designer in Studio Workspace.png", slug: "crystal-arms-folded", width: 1800 },
  { file: "Crystal_s pictures/Architectural Designer in Her Studio.png", slug: "crystal-at-desk", width: 1800 },
  { file: "Crystal_s pictures/Poised in a Warm Design Studio.png", slug: "crystal-poised", width: 1800 },
  { file: "Crystal_s pictures/Cozy Architecture Podcast Workspace.png", slug: "crystal-recording", width: 1800 },

  { file: "Nature Home 2/1.png", slug: "earth-house-approach", width: 2200 },
  { file: "Nature Home 2/2.jpeg", slug: "earth-house-courtyard", width: 1800 },
  { file: "Nature Home 2/3.jpeg", slug: "earth-house-threshold", width: 1800 },
  { file: "Nature Home 2/4.jpeg", slug: "earth-house-bedroom", width: 1800 },
  { file: "Nature Home 2/6.jpeg", slug: "earth-house-living", width: 1800 },
  { file: "Nature Home 2/7.jpeg", slug: "earth-house-veranda", width: 1800 },
  { file: "Nature Home 2/8.jpeg", slug: "earth-house-garden", width: 1800 },

  { file: "Nature Home/25.png", slug: "nature-home-street", width: 2000 },
  { file: "Nature Home/Front View with Tree shade.jpeg", slug: "nature-home-tree-shade", width: 1800 },
  { file: "Nature Home/Shade with Cantilevers.jpeg", slug: "nature-home-cantilever", width: 1800 },
  { file: "Nature Home/New tree_back garden.jpeg", slug: "nature-home-back-garden", width: 1800 },
  { file: "Nature Home/Family Sitting Room 2.jpeg", slug: "nature-home-sitting-room", width: 1800 },
  { file: "Nature Home/Bedroom 3.jpeg", slug: "nature-home-bedroom", width: 1800 },
  { file: "Nature Home/Dividers.jpeg", slug: "nature-home-screen", width: 1800 },
  { file: "Nature Home/31 2.jpeg", slug: "nature-home-atrium", width: 1800 },
  { file: "Nature Home/27F5948D-36C1-4A55-84AA-0641349797D2_1_105_c.jpeg", slug: "nature-home-stair", width: 1600 },
  { file: "Nature Home/78FFAF38-4097-40FA-93AB-CE632EFB666E_1_105_c.jpeg", slug: "nature-home-detail", width: 1600 },
  { file: "Nature Home/7292B8D4-723A-4F36-AA1C-51F390A3813B_1_105_c 2 2.jpeg", slug: "nature-home-dining", width: 1600 },
  { file: "Nature Home/B56D4EDB-41B6-48F7-AF8C-13AFA6AFCC76_1_201_a.jpeg", slug: "nature-home-lounge", width: 1600 },
  { file: "Nature Home/ED948444-A053-4E8D-87A5-900D66602868_1_201_a.jpeg", slug: "nature-home-kitchen", width: 1600 },

  { file: "Community Centre Project/IMG_2102 2.PNG", slug: "kasa-kofo-elevation", width: 2200 },
  { file: "Community Centre Project/IMG_2105 2.JPG", slug: "kasa-kofo-assembly", width: 2000 },
  { file: "Community Centre Project/IMG_2041 2.PNG", slug: "kasa-kofo-canopy", width: 1800 },
  { file: "Community Centre Project/IMG_2103 2.PNG", slug: "kasa-kofo-workshop", width: 1800 },
  { file: "Community Centre Project/IMG_2104 2.PNG", slug: "kasa-kofo-library", width: 1800 },
];

const toBlur = async (buffer) => {
  const data = await sharp(buffer).resize(20, null, { fit: "inside" }).webp({ quality: 28 }).toBuffer();
  return `data:image/webp;base64,${data.toString("base64")}`;
};

const tintFromAlpha = async (input, colour) => {
  const flat = await sharp(input).flatten({ background: "#f5f2ec" }).greyscale().removeAlpha().png().toBuffer();
  const { width, height } = await sharp(flat).metadata();
  const alpha = await sharp(flat)
    .negate()
    .normalise()
    .linear(1.35, -48)
    .removeAlpha()
    .extractChannel(0)
    .raw()
    .toBuffer();

  if (alpha.length !== width * height) {
    throw new Error(`alpha channel mismatch: ${alpha.length} vs ${width * height}`);
  }

  return sharp({ create: { width, height, channels: 3, background: colour } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();
};

const buildLogos = async () => {
  const sheet = join(src, LOGO_SHEET);
  const { width, height } = await sharp(sheet).metadata();
  const entries = {};

  for (const cell of LOGO_CELLS) {
    const left = Math.round(cell.x[0] * width);
    const top = Math.round(cell.y[0] * height);
    const cell_png = await sharp(sheet)
      .extract({
        left,
        top,
        width: Math.round((cell.x[1] - cell.x[0]) * width),
        height: Math.round((cell.y[1] - cell.y[0]) * height),
      })
      .png()
      .toBuffer();

    const cropped = await sharp(cell_png).trim({ threshold: 12 }).png().toBuffer();

    const meta = await sharp(cropped).metadata();
    const pad = Math.round(Math.max(meta.width, meta.height) * 0.04);
    const padded = await sharp(cropped)
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#f5f2ec" })
      .toBuffer();

    for (const [tone, colour] of [
      ["ink", INK],
      ["bone", BONE],
    ]) {
      const out = await tintFromAlpha(padded, colour);
      const meta2 = await sharp(out).metadata();
      const name = `${cell.slug}-${tone}.png`;
      await writeFile(join(outDir, "brand", name), out);
      entries[`${cell.slug}-${tone}`] = {
        src: `/media/brand/${name}`,
        width: meta2.width,
        height: meta2.height,
      };
    }
  }

  const markCell = await sharp(join(src, LOGO_SHEET))
    .extract({
      left: Math.round(MARK_BOX.x[0] * width),
      top: Math.round(MARK_BOX.y[0] * height),
      width: Math.round((MARK_BOX.x[1] - MARK_BOX.x[0]) * width),
      height: Math.round((MARK_BOX.y[1] - MARK_BOX.y[0]) * height),
    })
    .png()
    .toBuffer();

  const monogram = await tintFromAlpha(
    await sharp(markCell)
      .trim({ threshold: 12 })
      .extend({ top: 24, bottom: 24, left: 24, right: 24, background: "#f5f2ec" })
      .png()
      .toBuffer(),
    BONE,
  );

  const icon = await sharp({
    create: { width: 512, height: 512, channels: 4, background: "#1a1411" },
  })
    .composite([{ input: await sharp(monogram).resize(300, 300, { fit: "inside" }).toBuffer(), gravity: "centre" }])
    .png()
    .toBuffer();

  await mkdir(join(root, "src", "app"), { recursive: true });
  await writeFile(join(root, "src", "app", "icon.png"), icon);
  await writeFile(join(root, "src", "app", "apple-icon.png"), await sharp(icon).resize(180, 180).png().toBuffer());

  return entries;
};

const buildPhotos = async () => {
  const entries = {};
  for (const photo of PHOTOS) {
    const pipeline = sharp(join(src, photo.file), { limitInputPixels: false })
      .rotate()
      .resize({ width: photo.width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 });

    const buffer = await pipeline.toBuffer();
    const meta = await sharp(buffer).metadata();
    await writeFile(join(outDir, "work", `${photo.slug}.webp`), buffer);
    entries[photo.slug] = {
      src: `/media/work/${photo.slug}.webp`,
      width: meta.width,
      height: meta.height,
      blurDataURL: await toBlur(buffer),
    };
  }
  return entries;
};

const run = async () => {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(join(outDir, "brand"), { recursive: true });
  await mkdir(join(outDir, "work"), { recursive: true });
  await mkdir(dirname(manifestFile), { recursive: true });

  const [brand, work] = await Promise.all([buildLogos(), buildPhotos()]);

  const body = `export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export const BRAND = ${JSON.stringify(brand, null, 2)} as const satisfies Record<string, MediaAsset>;

export const WORK = ${JSON.stringify(work, null, 2)} as const satisfies Record<string, MediaAsset>;

export type BrandKey = keyof typeof BRAND;
export type WorkKey = keyof typeof WORK;
`;

  await writeFile(manifestFile, body);

  const total = Object.keys(brand).length + Object.keys(work).length;
  console.log(`prepared ${total} assets -> public/media`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
