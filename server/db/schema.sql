-- ============================================================
-- VillageConnect — Supabase PostgreSQL Schema
-- Run this once in the Supabase SQL Editor
-- ============================================================

-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  email text unique not null,
  password text not null,
  role text not null default 'user',
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  image text,
  title text,
  description text,
  category text,
  brand text,
  price numeric default 0,
  sale_price numeric default 0,
  total_stock integer default 0,
  average_review numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Addresses
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  address text,
  city text,
  pincode text,
  phone text,
  notes text,
  created_at timestamptz default now()
);

-- Carts (one cart per user)
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade unique,
  created_at timestamptz default now()
);

-- Cart Items
create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity integer not null check (quantity >= 1)
);

-- Orders (cart_items and address_info stored as JSONB for flexibility)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  cart_id uuid,
  cart_items jsonb,
  address_info jsonb,
  order_status text,
  payment_method text,
  payment_status text,
  total_amount numeric,
  order_date timestamptz,
  order_update_date timestamptz,
  payment_id text,
  payer_id text
);

-- Product Reviews
create table if not exists product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references users(id),
  username text,
  review_message text,
  review_value integer,
  created_at timestamptz default now()
);

-- Feature / Banner Images
create table if not exists features (
  id uuid primary key default gen_random_uuid(),
  image text,
  created_at timestamptz default now()
);
