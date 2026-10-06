import "server-only";
import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfigured() {
  if (configured) return;

  if (process.env.CLOUDINARY_URL) {
    // The SDK parses CLOUDINARY_URL automatically when config() is called
    // with no arguments, as long as the env var is set.
    cloudinary.config({ secure: true });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  configured = true;
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_URL ||
      (process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET)
  );
}

/**
 * Uploads an image file to Cloudinary and returns its secure delivery URL.
 */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_URL (or CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET)."
    );
  }
  ensureConfigured();

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `degss/${folder}`, resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

/**
 * Uploads multiple image files to Cloudinary in parallel.
 */
export async function uploadImages(files: File[], folder: string): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImage(file, folder)));
}

/**
 * Reads an optional "<fieldName>File" upload from form data and uploads it
 * to Cloudinary when present. Falls back to the "<fieldName>Current" hidden
 * field (the existing image URL) so edit forms don't require re-uploading.
 */
export async function resolveUploadedImage(
  formData: FormData,
  fieldName: string,
  folder: string
): Promise<string> {
  const file = formData.get(`${fieldName}File`);
  if (file instanceof File && file.size > 0) {
    return uploadImage(file, folder);
  }
  return String(formData.get(`${fieldName}Current`) ?? "").trim();
}

export type MediaAsset = {
  publicId: string;
  url: string;
  thumbnailUrl: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
  createdAt: string;
};

function toThumbnailUrl(url: string): string {
  return url.replace("/upload/", "/upload/c_fill,w_400,h_400,q_auto,f_auto/");
}

/**
 * Lists every image ever uploaded through the admin dashboard (anything
 * under the "degss/" folder prefix), newest first.
 */
export async function listMediaAssets(): Promise<MediaAsset[]> {
  if (!isCloudinaryConfigured()) return [];
  ensureConfigured();

  const assets: MediaAsset[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "degss/",
      max_results: 100,
      next_cursor: nextCursor,
    });

    for (const resource of result.resources ?? []) {
      assets.push({
        publicId: resource.public_id,
        url: resource.secure_url,
        thumbnailUrl: toThumbnailUrl(resource.secure_url),
        format: resource.format,
        bytes: resource.bytes,
        width: resource.width,
        height: resource.height,
        createdAt: resource.created_at,
      });
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  assets.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return assets;
}

/**
 * Permanently deletes an image from Cloudinary. Does not check whether the
 * image is still referenced by a property or team member — if it is, that
 * listing's image will break.
 */
export async function deleteMediaAsset(publicId: string): Promise<void> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }
  ensureConfigured();

  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
