import { findGalleryImage, removeGalleryImage, updateGalleryImage } from "@/db/gallery-repository";
import { deleteGalleryImage, uploadGalleryImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  try {
    const id = Number((await context.params).id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid image ID." }, { status: 400 });
    const current = await findGalleryImage(id);
    if (!current) return NextResponse.json({ error: "Image not found." }, { status: 404 });

    const data = await request.formData();
    const title = String(data.get("title") ?? "").trim().slice(0, 120);
    const altText = String(data.get("altText") ?? "").trim().slice(0, 180);
    const file = data.get("image");
    if (!title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

    let imageUrl = current.imageUrl;
    let cloudinaryPublicId = current.cloudinaryPublicId;
    if (file instanceof File && file.size > 0) {
      if (!allowedTypes.has(file.type) || file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Use a JPG, PNG, WEBP or GIF image under 8 MB." }, { status: 400 });
      const uploaded = await uploadGalleryImage(Buffer.from(await file.arrayBuffer()));
      imageUrl = uploaded.secure_url;
      cloudinaryPublicId = uploaded.public_id;
    }

    const updated = await updateGalleryImage(id, { title, altText: altText || title, imageUrl, cloudinaryPublicId });
    if (file instanceof File && file.size > 0 && current.cloudinaryPublicId) await deleteGalleryImage(current.cloudinaryPublicId);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Gallery update failed", error);
    const message = error instanceof Error && error.message.includes("Cloudinary credentials") ? error.message : "Image could not be updated.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: Context) {
  try {
    const id = Number((await context.params).id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid image ID." }, { status: 400 });
    const removed = await removeGalleryImage(id);
    if (!removed) return NextResponse.json({ error: "Image not found." }, { status: 404 });
    if (removed.cloudinaryPublicId) await deleteGalleryImage(removed.cloudinaryPublicId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gallery delete failed", error);
    return NextResponse.json({ error: "Image could not be deleted." }, { status: 500 });
  }
}
