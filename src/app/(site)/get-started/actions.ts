"use server";

import { redirect } from "next/navigation";
import { createGetStartedSubmission } from "@/lib/data/submissions";

export async function submitGetStartedForm(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const requirement = String(formData.get("requirement") ?? "").trim();

  const [firstName, ...rest] = fullName.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  if (!firstName || !whatsapp || !email) {
    redirect("/get-started?error=1");
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
