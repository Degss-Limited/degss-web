# degss-web
Official Company Website

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Admin dashboard

The site has an admin dashboard at `/admin` for editing site content (properties,
services, team, FAQs) and viewing messages submitted through the Contact and
Get Started forms. It's backed by Supabase (Postgres).

### One-time setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com).
2. **Run the schema**: open the SQL Editor in your Supabase project and run
   the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. **Load existing content** (optional but recommended): also run
   [`supabase/seed.sql`](supabase/seed.sql) to carry over the properties,
   FAQs, team members, and services that were previously hardcoded in the
   site. Regenerate it any time from source with
   `node scripts/generate-seed.mjs`.
4. **Set environment variables**: copy `.env.example` to `.env.local` and
   fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` — from your
     Supabase project's Settings → API.
   - `ADMIN_SESSION_SECRET` — any long random string, e.g.
     `openssl rand -base64 32`.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` (optional)
     — from [dash.cloudflare.com](https://dash.cloudflare.com) → Turnstile.
     Adds a CAPTCHA to the public Contact form; the form works fine without
     it until both are set.
5. **Create your admin login**:
   ```bash
   node --env-file=.env.local scripts/create-admin.mjs you@degsslimited.com "a strong password" "Your Name"
   ```
6. Run `npm run dev` and sign in at `http://localhost:3000/admin/login`.

Without these env vars set, the public site still runs — the properties,
FAQs, team, and services sections just render empty until Supabase is
configured, and `/admin` will show a warning banner instead of crashing.

### Notes on scope

- Editable via `/admin`: properties, services (the navbar's "What We Do"
  menu), team members, FAQs, and the Contact/Get Started form submissions.
- Not editable via `/admin`: freeform marketing copy (the About page,
  Terms, Privacy Policy, homepage hero text) — those stay in their page
  files under `src/app/(site)/`.
- Images for properties, team members, and the main property photo are
  plain URLs (paste a link to an already-hosted image) rather than file
  uploads, to keep the admin simple. There's no Supabase Storage bucket
  wired up yet — that would be a natural next step if file uploads are
  needed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
