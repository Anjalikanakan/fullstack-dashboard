// backend/controllers/productController.js

const db = require("../config/db");

// GET /api/products — fetch all products (with optional search/filter)
const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = "SELECT * FROM products";
    const params = [];

    // Dynamic filtering
    if (search || category) {
      query += " WHERE";
      if (search) {
        query += " name LIKE ?";
        params.push(`%${search}%`);
      }
      if (search && category) query += " AND";
      if (category) {
        query += " category = ?";
        params.push(category);
      }
    }

    query += " ORDER BY created_at DESC";
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows, total: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, category, stock || 0]
    );
    const [newProduct] = await db.query("SELECT * FROM products WHERE id = ?", [result.insertId]);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    await db.query(
      "UPDATE products SET name=?, description=?, price=?, category=?, stock=? WHERE id=?",
      [name, description, price, category, stock, req.params.id]
    );
    const [updated] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    res.json({ success: true, data: updated[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
