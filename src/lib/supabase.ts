import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { WebSocketLikeConstructor } from "@supabase/realtime-js";
import WebSocket from "ws";

// ws's constructor type doesn't structurally match realtime-js's
// WebSocketLikeConstructor (differing `address` param types), even though
// it satisfies the interface at runtime.
const WebSocketTransport = WebSocket as unknown as WebSocketLikeConstructor;

let client: SupabaseClient | null | undefined;

/**
 * Server-only Supabase client using the service role key, which bypasses
 * Row Level Security. Never import this file from a "use client" component.
 *
 * Returns null when Supabase env vars aren't configured yet, so pages can
 * render an empty/fallback state instead of crashing before setup is done.
 */
export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set — database features are disabled."
    );
    client = null;
    return client;
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Node < 22 has no native WebSocket global, which the realtime client
    // requires even though this app never uses realtime subscriptions.
    realtime: { transport: WebSocketTransport },
  });
  return client;
}
