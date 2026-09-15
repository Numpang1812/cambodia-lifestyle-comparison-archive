import fs from "fs";
import path from "path";
import sharp from "sharp";

const HEIC_RE = /\.(heic|heif)$/i;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");
    const prefix = searchParams.get("prefix") || "past";
    const file = searchParams.get("file");

    if (!folder) {
      return Response.json({ images: [] });
    }

    const dir = path.join(process.cwd(), "public", "assets", "images", folder);

    // Convert HEIC/HEIF on the fly — most browsers cannot decode these natively
    if (file && HEIC_RE.test(file)) {
      const safe = path.basename(file);
      const full = path.join(dir, safe);
      if (!full.startsWith(dir) || !fs.existsSync(full)) {
        return new Response("Not found", { status: 404 });
      }
      const buffer = await sharp(full).jpeg({ quality: 82 }).toBuffer();
      return new Response(buffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (!fs.existsSync(dir)) {
      return Response.json({ images: [] });
    }

    const files = fs.readdirSync(dir);
    const regex = new RegExp(`^${prefix}(\\d+)\\.(png|jpe?g|webp|heic|heif)$`, "i");

    const matches = files
      .filter((file) => regex.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(regex)[1], 10);
        const numB = parseInt(b.match(regex)[1], 10);
        return numA - numB;
      })
      .map((file) => ({
        src: HEIC_RE.test(file)
          ? `/api/gallery?folder=${encodeURIComponent(folder)}&file=${encodeURIComponent(file)}`
          : `/assets/images/${folder}/${file}`,
        name: file,
        caption: `${folder} · ${file}`,
      }));

    return Response.json({ images: matches });
  } catch (error) {
    return Response.json({ images: [] });
  }
}
