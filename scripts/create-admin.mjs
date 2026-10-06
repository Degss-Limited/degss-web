// Creates (or updates the password for) an admin login.
//
// Usage:
//   node --env-file=.env.local scripts/create-admin.mjs you@degsslimited.com "a strong password" "Your Name"
//
// Falls back to ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD / ADMIN_SEED_NAME from
// the env file if no arguments are passed.
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import WebSocket from "ws";

const [, , argEmail, argPassword, argName] = process.argv;

const email = argEmail || process.env.ADMIN_SEED_EMAIL;
const password = argPassword || process.env.ADMIN_SEED_PASSWORD;
const name = argName || process.env.ADMIN_SEED_NAME || "Admin";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run this with: node --env-file=.env.local scripts/create-admin.mjs ..."
  );
  process.exit(1);
}

if (!email || !password) {
  console.error(
    "Missing email/password. Pass them as arguments or set ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  realtime: { transport: WebSocket },
});
const password_hash = await bcrypt.hash(password, 12);

const { error } = await supabase
  .from("admin_users")
  .upsert(
    { email: email.trim().toLowerCase(), password_hash, name },
    { onConflict: "email" }
  );

if (error) {
  console.error("Failed to create admin:", error.message);
  process.exit(1);
}

console.log(`Admin ready: ${email}`);
