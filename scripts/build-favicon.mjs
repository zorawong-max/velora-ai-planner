// One-off/reusable script: rasterizes public/brand/favicon.svg into
// src/app/favicon.ico. Run with: node scripts/build-favicon.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SVG_PATH = path.join(__dirname, "..", "public", "brand", "favicon.svg");
const OUT_PATH = path.join(__dirname, "..", "src", "app", "favicon.ico");
const SIZES = [16, 32, 48];

async function main() {
  const pngBuffers = await Promise.all(
    SIZES.map((size) => sharp(SVG_PATH, { density: 384 }).resize(size, size).png().toBuffer()),
  );

  // ICO container: 6-byte header + one 16-byte directory entry per image,
  // followed by the raw PNG bytes for each image (modern ICO allows
  // PNG-compressed entries directly — every current browser/OS supports it).
  const numImages = pngBuffers.length;
  let offset = 6 + 16 * numImages;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  for (let i = 0; i < numImages; i++) {
    const size = SIZES[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset
    offset += buf.length;
    dirEntries.push(entry);
  }

  const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  writeFileSync(OUT_PATH, ico);
  console.log(`Wrote ${OUT_PATH} (${ico.length} bytes, sizes: ${SIZES.join(", ")})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
