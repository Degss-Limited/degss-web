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
-- Services (the "What We Do" navbar mega-menu)
-- ---------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  slug text not null unique,
  description text not null default '',
  icon_name text not null default 'BuildingIcon',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create index if not exists properties_sort_order_idx on properties (sort_order, created_at);
create index if not exists faqs_sort_order_idx on faqs (sort_order, created_at);
create index if not exists team_members_sort_order_idx on team_members (sort_order, created_at);
create index if not exists services_sort_order_idx on services (sort_order, created_at);
create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);
create index if not exists get_started_submissions_created_at_idx on get_started_submissions (created_at desc);
create index if not exists site_visits_created_at_idx on site_visits (created_at desc);
