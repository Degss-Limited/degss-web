import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/**
 * Verifies a Turnstile response token with Cloudflare. Returns true (skips
 * verification) when TURNSTILE_SECRET_KEY isn't set yet, so the form keeps
 * working before Turnstile is configured.
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    console.error("[turnstile] verification request failed:", err);
    return false;
  }
}
