import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");
    const prefix = searchParams.get("prefix") || "past";

    if (!folder) {
      return Response.json({ images: [] });
    }

    const dir = path.join(process.cwd(), "public", "assets", "images", folder);
    if (!fs.existsSync(dir)) {
      return Response.json({ images: [] });
    }

    const files = fs.readdirSync(dir);
    const regex = new RegExp(`^${prefix}(\\d+)\\.(png|jpg|jpeg|webp)$`, "i");

    const matches = files
      .filter((file) => regex.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(regex)[1], 10);
        const numB = parseInt(b.match(regex)[1], 10);
        return numA - numB;
      })
      .map((file) => ({
        src: `/assets/images/${folder}/${file}`,
        name: file,
        caption: `${folder} · ${file}`,
      }));

    return Response.json({ images: matches });
  } catch (error) {
    return Response.json({ images: [] });
  }
}
