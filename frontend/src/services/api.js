// frontend/src/services/api.js
// Centralized API configuration using Axios
// All API calls go through this file

import axios from "axios";

const API_URL = process.env.BASE_URL || "http://localhost:5000";
// Base axios instance — all requests use this
const api = axios.create({
  baseURL: `${API_URL}/api`, // your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ── USER APIs ─────────────────────────────────────

export const userAPI = {
  // GET all users
  getAll: () => api.get("/users"),

  // GET single user by id
  getById: (id) => api.get(`/users/${id}`),

  // POST create new user
  create: (userData) => api.post("/users", userData),

  // PUT update user
  update: (id, userData) => api.put(`/users/${id}`, userData),

  // DELETE user
  delete: (id) => api.delete(`/users/${id}`),
};

// ── PRODUCT APIs ──────────────────────────────────

export const productAPI = {
  // GET all products (with optional search/category filter)
  getAll: (params) => api.get("/products", { params }),

  // GET single product
  getById: (id) => api.get(`/products/${id}`),

  // POST create product
  create: (data) => api.post("/products", data),

  // PUT update product
  update: (id, data) => api.put(`/products/${id}`, data),

  // DELETE product
  delete: (id) => api.delete(`/products/${id}`),
};

export default api;
