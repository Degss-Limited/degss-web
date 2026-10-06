import "server-only";

/**
 * No email provider is wired up yet. This logs the reset link to the server
 * console so the flow is usable in development. To make this real, swap the
 * body of this function for a call to your provider of choice (Resend,
 * Postmark, SES, etc.) — nothing else in the reset flow needs to change.
 */
export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: {
  to: string;
  resetUrl: string;
}) {
  console.log(
    `[email] Password reset requested for ${to}.\n` +
      `[email] No email provider is configured — link (valid 1 hour):\n` +
      `[email] ${resetUrl}`
  );
}
