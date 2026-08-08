import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret || cloudName === "your_cloud_name") {
    throw new Error("Cloudinary credentials are not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.");
  }
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
}

export async function uploadGalleryImage(buffer: Buffer): Promise<UploadApiResponse> {
  configureCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      folder: "rosewood-hotel/gallery",
      resource_type: "image",
      transformation: [{ width: 2400, height: 2400, crop: "limit", quality: "auto", fetch_format: "auto" }],
    }, (error, result) => {
      if (error || !result) reject(error ?? new Error("Cloudinary upload returned no result."));
      else resolve(result);
    });
    stream.end(buffer);
  });
}

export async function deleteGalleryImage(publicId: string) {
  configureCloudinary();
  return cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true });
}
