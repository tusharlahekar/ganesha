INSERT OR IGNORE INTO categories (id, name) VALUES
  (1, 'Statues'),
  (2, 'Lamps'),
  (3, 'Altars');

INSERT OR IGNORE INTO products (id, category_id, name, description, price_cents, image_url) VALUES
  (1, 1, 'Ganesha Bronze Idol', 'Hand-finished bronze idol for meditation spaces.', 8900, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'),
  (2, 2, 'Lotus Glow Lamp', 'Warm, ambient lamp inspired by lotus petals.', 6500, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'),
  (3, 3, 'Home Puja Altar', 'Compact wooden altar with storage drawer.', 12900, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80');
