CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS murtis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  height NUMERIC(6, 2) NOT NULL,
  weight NUMERIC(6, 2) NOT NULL,
  material TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  image_urls TEXT[] NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_eco_friendly BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  murti_id UUID REFERENCES murtis(id),
  quantity INTEGER NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  order_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_murtis_category ON murtis(category);
CREATE INDEX IF NOT EXISTS idx_murtis_price ON murtis(price);
CREATE INDEX IF NOT EXISTS idx_murtis_color ON murtis(color);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
