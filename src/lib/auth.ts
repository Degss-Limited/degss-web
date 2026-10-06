import "server-only";
import { randomBytes, createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "degss_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Generate one (e.g. `openssl rand -base64 32`) and add it to your env."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
};

export async function createSessionToken(session: AdminSession) {
  return new SignJWT({ email: session.email, name: session.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      clockTolerance: 30,
    });
    if (!payload.sub || typeof payload.email !== "string") return null;
    return {
      sub: payload.sub,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : "",
    };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_DURATION_SECONDS;

export const PASSWORD_RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/** Returns { token, tokenHash }. Only tokenHash is ever stored. */
export function createPasswordResetToken() {
  const token = randomBytes(32).toString("hex");
  return { token, tokenHash: hashResetToken(token) };
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
