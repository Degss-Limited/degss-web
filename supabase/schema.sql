-- DEGSS admin dashboard schema
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).
-- All tables have Row Level Security enabled with NO policies, so only
-- server-side code using the service role key (which bypasses RLS) can
-- read or write. The anon/public key has no access to anything here.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Admins
-- ---------------------------------------------------------------------------
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text not null,
  reset_token_hash text,
  reset_token_expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- If you already ran this file before password reset support was added,
-- run this against your existing database instead of the CREATE TABLE above:
-- alter table admin_users add column if not exists reset_token_hash text;
-- alter table admin_users add column if not exists reset_token_expires_at timestamptz;

alter table admin_users enable row level security;

-- ---------------------------------------------------------------------------
-- Hero slides (homepage background slideshow)
-- ---------------------------------------------------------------------------
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  alt text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table hero_slides enable row level security;

-- ---------------------------------------------------------------------------
-- Properties
-- ---------------------------------------------------------------------------
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  price text not null,
  description text not null,
  about text[] not null default '{}',
  image text not null,
  gallery text[] not null default '{}',
  beds integer not null default 0,
  baths integer not null default 0,
  sqft text not null default '',
  highlight text not null default '',
  status text not null default 'Available' check (status in ('Available', 'Under Offer', 'Sold')),
  property_type text not null default '',
  year_built integer,
  lot_size text not null default '',                                         
  parking text not null default '',
  features text[] not null default '{}',
  neighborhood_name text not null default '',
  neighborhood_city text not null default '',
  neighborhood_description text not null default '',
  listing_type text not null default 'Building' check (listing_type in ('Building', 'Land')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- If you already ran this file before land listings were supported, run
-- this against your existing database instead of the CREATE TABLE above:
-- alter table properties add column if not exists listing_type text not null default 'Building' check (listing_type in ('Building', 'Land'));

-- If you already ran this file before the "Sold" status was added, run this
-- against your existing database instead of the CREATE TABLE above:
-- alter table properties drop constraint if exists properties_status_check;
-- alter table properties add constraint properties_status_check check (status in ('Available', 'Under Offer', 'Sold'));

alter table properties enable row level security;

-- ---------------------------------------------------------------------------
-- FAQs
-- ---------------------------------------------------------------------------
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table faqs enable row level security;

-- ---------------------------------------------------------------------------
-- Team members
-- ---------------------------------------------------------------------------
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  photo text not null,
  bio text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table team_members enable row level security;

-- ---------------------------------------------------------------------------
-- Services (the "What We Do" navbar mega-menu, and each /services/[slug] page)
-- ---------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  slug text not null unique,
  description text not null default '',
  icon_name text not null default 'BuildingIcon',
  hero_image text not null default '',
  intro text not null default '',
  features text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- If you already ran this file before the service detail page (hero image,
-- intro, feature list) became admin-editable, run this against your existing
-- database instead of the CREATE TABLE above:
-- alter table services add column if not exists hero_image text not null default '';
-- alter table services add column if not exists intro text not null default '';
-- alter table services add column if not exists features text[] not null default '{}';
--
-- Optional one-time backfill for the six services that previously had this
-- content hardcoded in src/data/service-content.ts (safe to skip for rows
-- you've already edited from the admin dashboard):
-- update services set
--   hero_image = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
--   intro = 'DEGSS designs and builds residential and mixed-use developments across Lagos — taking positioned land from planning through construction to handover, with a focus on spaces that hold their value long after the keys change hands.',
--   features = ARRAY['Site planning & feasibility studies', 'Architectural design & regulatory approvals', 'Construction management & quality assurance', 'Handover coordination & documentation', 'Post-handover support']::text[]
--   where slug = 'development' and hero_image = '';
-- update services set
--   hero_image = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop',
--   intro = 'We help individuals, families, and investors identify and secure land and property with genuine long-term potential — verified titles, strategic locations, and terms structured to protect the buyer from the first conversation to closing.',
--   features = ARRAY['Site identification & due diligence', 'Title verification & documentation review', 'Negotiation on your behalf', 'Structured payment plans', 'Handover & registration support']::text[]
--   where slug = 'acquisition' and hero_image = '';
-- update services set
--   hero_image = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop',
--   intro = 'Independent, experience-led advice for anyone facing a real estate decision — whether that''s where to buy, how to structure an investment, or how to evaluate a piece of land before committing.',
--   features = ARRAY['Investment & location advisory', 'Market & feasibility assessment', 'Documentation & compliance guidance', 'Portfolio strategy for local and diaspora investors', 'One-on-one consultation sessions']::text[]
--   where slug = 'consulting' and hero_image = '';
-- update services set
--   hero_image = 'https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1600&auto=format&fit=crop',
--   intro = 'Ownership doesn''t end at closing. We manage land and property on behalf of owners — protecting it from encroachment, keeping it development-ready, and helping it grow in value over time.',
--   features = ARRAY['Land security & site monitoring', 'Property & facility management', 'Tenant sourcing & management', 'Maintenance coordination', 'Regular owner reporting']::text[]
--   where slug = 'management' and hero_image = '';
-- update services set
--   hero_image = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
--   intro = 'Land banked for the future doesn''t have to sit idle. We partner with landowners and investors to put land to productive agricultural use ahead of development, turning otherwise dormant assets into a source of value.',
--   features = ARRAY['Land preparation & cultivation', 'Crop selection & farm management', 'Yield monitoring & reporting', 'Revenue-sharing structures for landowners', 'Sustainable land-use practices']::text[]
--   where slug = 'agro-farming' and hero_image = '';
-- update services set
--   hero_image = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop',
--   intro = 'Prime Circle gives members structured access to curated real estate opportunities — pooling resources for entry into properties and developments that would otherwise be out of individual reach.',
--   features = ARRAY['Curated investment opportunities', 'Structured entry & exit terms', 'Transparent reporting to members', 'Access to landbanking & development deals', 'Dedicated relationship support']::text[]
--   where slug = 'prime-circle' and hero_image = '';

alter table services enable row level security;

-- ---------------------------------------------------------------------------
-- Testimonials (homepage client quotes)
-- ---------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  quote text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- If you already created this table with a "photo" column, run this against
-- your existing database instead of the CREATE TABLE above:
-- alter table testimonials drop column if exists photo;

alter table testimonials enable row level security;

-- ---------------------------------------------------------------------------
-- Blog posts (the DEGSS journal)
-- ---------------------------------------------------------------------------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text not null default '',
  author text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

-- ---------------------------------------------------------------------------
-- Contact form submissions
-- ---------------------------------------------------------------------------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null default '',
  message text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

-- ---------------------------------------------------------------------------
-- Get-started form submissions
-- ---------------------------------------------------------------------------
create table if not exists get_started_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null default '',
  reason text not null default '',
  budget text not null default '',
  timeline text not null default '',
  message text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table get_started_submissions enable row level security;

-- ---------------------------------------------------------------------------
-- Site traffic (lightweight first-party pageview tracking)
-- ---------------------------------------------------------------------------
create table if not exists site_visits (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text not null default '',
  visitor_id text not null default '',
  created_at timestamptz not null default now()
);

alter table site_visits enable row level security;

create index if not exists hero_slides_sort_order_idx on hero_slides (sort_order, created_at);
create index if not exists properties_sort_order_idx on properties (sort_order, created_at);
create index if not exists faqs_sort_order_idx on faqs (sort_order, created_at);
create index if not exists team_members_sort_order_idx on team_members (sort_order, created_at);
create index if not exists services_sort_order_idx on services (sort_order, created_at);
create index if not exists blog_posts_created_at_idx on blog_posts (created_at desc);
create index if not exists blog_posts_status_idx on blog_posts (status);
create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);
create index if not exists get_started_submissions_created_at_idx on get_started_submissions (created_at desc);
create index if not exists site_visits_created_at_idx on site_visits (created_at desc);
