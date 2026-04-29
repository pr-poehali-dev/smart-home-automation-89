
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_letter VARCHAR(2) DEFAULT '',
  rating NUMERIC(3,2) DEFAULT 5.00,
  deals_count INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) DEFAULT '🎮'
);

INSERT INTO games (slug, name, emoji) VALUES
  ('cs2', 'CS2', '🔫'),
  ('dota2', 'Dota 2', '⚔️'),
  ('gta5', 'GTA V', '🚗'),
  ('valorant', 'Valorant', '🎯'),
  ('wow', 'World of Warcraft', '🧙'),
  ('pubg', 'PUBG', '🪖'),
  ('fortnite', 'Fortnite', '🏗️'),
  ('minecraft', 'Minecraft', '⛏️'),
  ('roblox', 'Roblox', '🟥'),
  ('lol', 'League of Legends', '🏆'),
  ('rust', 'Rust', '🔧'),
  ('apex', 'Apex Legends', '💫'),
  ('overwatch', 'Overwatch 2', '🦸'),
  ('tf2', 'Team Fortress 2', '🎩'),
  ('other', 'Другая игра', '🎮');

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10) DEFAULT '📦'
);

INSERT INTO categories (slug, name, emoji) VALUES
  ('accounts', 'Аккаунты', '👤'),
  ('currency', 'Валюта', '💰'),
  ('items', 'Предметы', '🗡️'),
  ('boosting', 'Прокачка', '⚡'),
  ('keys', 'Ключи', '🔑'),
  ('coaching', 'Коучинг', '🎯');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  price INTEGER NOT NULL,
  old_price INTEGER,
  game_id INTEGER REFERENCES games(id),
  category_id INTEGER REFERENCES categories(id),
  seller_id INTEGER REFERENCES users(id),
  is_instant BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  image_url VARCHAR(500) DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_game ON products(game_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
