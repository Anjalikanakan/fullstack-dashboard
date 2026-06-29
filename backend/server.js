// backend/server.js
// Main entry point for the Node.js + Express server

require("dotenv").config(); // load .env variables

const express      = require("express");
const cors         = require("cors");
const authRoutes   = require("./routes/authRoutes");
const userRoutes   = require("./routes/userRoutes");
const productRoutes= require("./routes/productRoutes");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────
app.use(cors());                // allow React (port 3000) to call this API
app.use(express.json());        // parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ── Request logger (simple) ───────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Routes ────────────────────────────────────────
app.use("/api/auth",     authRoutes);
app.use("/api/users",    userRoutes);
app.use("/api/products", productRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running!", version: "1.0.0" });
});

// ── 404 handler ───────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler ──────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start server ──────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/users`);
  console.log(`   GET  http://localhost:${PORT}/api/products`);
});
