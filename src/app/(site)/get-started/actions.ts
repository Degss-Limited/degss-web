"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createGetStartedSubmission } from "@/lib/data/submissions";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function submitGetStartedForm(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const requirement = String(formData.get("requirement") ?? "").trim();
  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");

  const [firstName, ...rest] = fullName.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  if (!firstName || !whatsapp || !email) {
    redirect("/get-started?error=1");
  }

  const headerList = await headers();
  const remoteIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const verified = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!verified) {
    redirect("/get-started?error=captcha");
  }

  try {
    await createGetStartedSubmission({
      firstName,
      lastName,
      email,
      phone: whatsapp,
      reason: interest,
      budget,
      timeline,
      message: requirement,
    });
  } catch (err) {
    console.error("[get-started] failed to save submission:", err);
    redirect("/get-started?error=1");
  }

  redirect("/get-started?sent=1");
}
