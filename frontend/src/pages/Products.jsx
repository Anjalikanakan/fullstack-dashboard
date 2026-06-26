// frontend/src/pages/Products.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts, createProduct, updateProduct, deleteProduct, clearMessages
} from "../redux/slices/productsSlice";

function ProductModal({ product, onClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(s => s.products);

  const [form, setForm] = useState({
    name:        product?.name        || "",
    description: product?.description || "",
    price:       product?.price       || "",
    category:    product?.category    || "",
    stock:       product?.stock       || 0,
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      await dispatch(updateProduct({ id: product.id, data: form }));
    } else {
      await dispatch(createProduct(form));
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{product ? "Edit Product" : "Add Product"}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input className="form-control" name="name" value={form.name}
              onChange={handleChange} required placeholder="Enter product name" />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={form.description}
              onChange={handleChange} rows={3} placeholder="Product description" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input className="form-control" name="price" type="number" step="0.01"
                value={form.price} onChange={handleChange} required placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Stock</label>
              <input className="form-control" name="stock" type="number"
                value={form.stock} onChange={handleChange} placeholder="0" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" name="category" value={form.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Books">Books</option>
              <option value="Courses">Courses</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Products() {
  const dispatch = useDispatch();
  const { list: products, loading, error, success } = useSelector(s => s.products);

  const [showModal, setShowModal] = useState(false);
  const [editItem,  setEditItem]  = useState(null);
  const [search,    setSearch]    = useState("");
  const [category,  setCategory]  = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(t);
    }
  }, [success, error, dispatch]);

  // Client-side filter
  const filtered = products.filter(p => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? p.category === category : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="container">
      <div className="page-header">
        <h1>Products Management</h1>
        <p>Manage your product catalogue with MySQL database</p>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error   && <div className="alert alert-error">{error}</div>}

      <div className="search-bar">
        <input className="form-control" placeholder="Search products..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Courses">Courses</option>
          <option value="Software">Software</option>
          <option value="Hardware">Hardware</option>
        </select>
        <button className="btn btn-primary" onClick={() => { setEditItem(null); setShowModal(true); }}>
          + Add Product
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="loading"><div className="spinner"></div>Loading products...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state"><h3>No products found</h3></div>
      ) : (
        <div className="cards-grid">
          {filtered.map(p => (
            <div className="card" key={p.id}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                <span className="badge" style={{ background:"#e8f4fd", color:"#0c5490" }}>{p.category}</span>
                <span className={`badge ${p.stock > 0 ? "badge-instock" : "badge-outofstock"}`}>
                  {p.stock > 0 ? `${p.stock} left` : "Out of stock"}
                </span>
              </div>
              <h3 style={{ fontSize:"15px", marginBottom:"6px" }}>{p.name}</h3>
              <p style={{ fontSize:"13px", color:"#888", marginBottom:"12px" }}>{p.description}</p>
              <div style={{ fontSize:"1.3rem", fontWeight:"700", color:"#4ecca3", marginBottom:"12px" }}>
                ₹{parseFloat(p.price).toFixed(2)}
              </div>
              <div style={{ display:"flex", gap:"8px" }}>
                <button className="btn btn-secondary" style={{ flex:1 }}
                  onClick={() => { setEditItem(p); setShowModal(true); }}>Edit</button>
                <button className="btn btn-danger"
                  onClick={() => window.confirm("Delete this product?") &&
                    dispatch(deleteProduct(p.id))}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editItem}
          onClose={() => { setShowModal(false); setEditItem(null); }}
        />
      )}
    </div>
  );
}

export default Products;
