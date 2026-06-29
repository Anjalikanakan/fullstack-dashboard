-- ============================================
-- MySQL Setup Script
-- Run this in MySQL Workbench or terminal:
-- mysql -u root -p < setup.sql
-- ============================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS react_redux_db;
USE react_redux_db;

-- 2. Create users table
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  role          VARCHAR(50)  DEFAULT 'user',
  password_hash VARCHAR(255) NULL,
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create products table
CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  category    VARCHAR(100),
  stock       INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert sample users
INSERT IGNORE INTO users (name, email, role) VALUES
  ('Anjali Kanakan', 'anjali@example.com', 'admin'),
  ('Anoop S',        'anoop@example.com',   'user'),
  ('Priya Nair',     'priya@example.com',  'user'),
  ('Arjun Menon',    'arjun@example.com',  'user');

-- 5. Insert sample products
INSERT IGNORE INTO products (name, description, price, category, stock) VALUES
  ('React JS Book',        'Complete guide to React',         499.00, 'Books',       50),
  ('Node JS Course',       'Backend development with Node',   999.00, 'Courses',     30),
  ('MySQL Workbench Pro',  'Database design tool',            299.00, 'Software',    100),
  ('Redux Toolkit Guide',  'State management mastery',        599.00, 'Books',       40),
  ('TypeScript Handbook',  'TypeScript from scratch',         449.00, 'Books',       25),
  ('JavaScript Complete',  'Modern JS ES6+ guide',            399.00, 'Books',       60);

-- Verify data
SELECT * FROM users;
SELECT * FROM products;
