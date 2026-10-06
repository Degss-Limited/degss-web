import { NextResponse } from "next/server";
import { listServices } from "@/lib/data/services";

// Public, read-only: powers the "What We Do" navbar menu on the client.
export async function GET() {
  const services = await listServices();
  return NextResponse.json(
    services.map((service) => ({
      label: service.label,
      slug: service.slug,
      description: service.description,
      iconName: service.iconName,
    }))
  );
}
