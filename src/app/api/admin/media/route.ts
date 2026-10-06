import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { isCloudinaryConfigured, listMediaAssets } from "@/lib/cloudinary";

// Admin-only: backs the "choose from library" picker on image upload
// fields. Returns every image ever uploaded through the dashboard.
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ assets: [] });
  }

  const assets = await listMediaAssets();
  return NextResponse.json({
    assets: assets.map((asset) => ({
      publicId: asset.publicId,
      url: asset.url,
      thumbnailUrl: asset.thumbnailUrl,
      width: asset.width,
      height: asset.height,
    })),
  });
}
