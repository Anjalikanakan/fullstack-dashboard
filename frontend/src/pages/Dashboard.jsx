// frontend/src/pages/Dashboard.jsx
// Shows summary stats using Redux state

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers }    from "../redux/slices/usersSlice";
import { fetchProducts } from "../redux/slices/productsSlice";

function Dashboard() {
  const dispatch = useDispatch();

  // Get data from Redux store
  const { list: users,    loading: uLoading } = useSelector(s => s.users);
  const { list: products, loading: pLoading } = useSelector(s => s.products);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Computed stats
  const totalStock   = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const outOfStock   = products.filter(p => p.stock === 0).length;
  const adminCount   = users.filter(u => u.role === "admin").length;

  if (uLoading || pLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome! Here's your app overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{adminCount}</div>
          <div className="stat-label">Admins</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalStock}</div>
          <div className="stat-label">Total Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: outOfStock > 0 ? "#ff6b6b" : "#4ecca3" }}>
            {outOfStock}
          </div>
          <div className="stat-label">Out of Stock</div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card">
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Recent Users</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge badge-${user.role}`}>{user.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Products */}
      <div className="card">
        <h2 style={{ marginBottom: "1rem", fontSize: "1rem" }}>Recent Products</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <span className={`badge ${p.stock > 0 ? "badge-instock" : "badge-outofstock"}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
