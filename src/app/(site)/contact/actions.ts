"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createContactSubmission } from "@/lib/data/submissions";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function submitContactForm(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");

  if (!firstName || !lastName || !email) {
    redirect("/contact?error=1#contact-form");
  }

  const headerList = await headers();
  const remoteIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const verified = await verifyTurnstileToken(turnstileToken, remoteIp);
  if (!verified) {
    redirect("/contact?error=captcha#contact-form");
  }

  try {
    await createContactSubmission({ firstName, lastName, email, phone, message });
  } catch (err) {
    console.error("[contact] failed to save submission:", err);
    redirect("/contact?error=1#contact-form");
  }

  redirect("/contact?sent=1#contact-form");
}
