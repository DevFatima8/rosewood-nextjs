import { createGalleryImage, listGalleryImages } from "@/db/gallery-repository";
import { uploadGalleryImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function GET() {
  try {
    return NextResponse.json(await listGalleryImages());
  } catch (error) {
    console.error("Gallery fetch failed", error);
    return NextResponse.json({ error: "Gallery could not be loaded. Check DATABASE_URL." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get("image");
    const title = String(data.get("title") ?? "").trim().slice(0, 120);
    const altText = String(data.get("altText") ?? "").trim().slice(0, 180);
    if (!(file instanceof File) || !title) return NextResponse.json({ error: "Title and image are required." }, { status: 400 });
    if (!allowedTypes.has(file.type) || file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Use a JPG, PNG, WEBP or GIF image under 8 MB." }, { status: 400 });

    const uploaded = await uploadGalleryImage(Buffer.from(await file.arrayBuffer()));
    const image = await createGalleryImage({ title, altText: altText || title, imageUrl: uploaded.secure_url, cloudinaryPublicId: uploaded.public_id });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Gallery upload failed", error);
    const errMessage = error instanceof Error ? error.message : "Image upload failed.";
    const message = errMessage.includes("Cloudinary credentials")
      ? errMessage
      : `Image upload failed: ${errMessage}. Verify Cloudinary and database connection.`;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
