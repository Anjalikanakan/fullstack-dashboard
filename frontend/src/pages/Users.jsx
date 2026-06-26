// frontend/src/pages/Users.jsx
// Full CRUD — Create, Read, Update, Delete users using Redux

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers, createUser, updateUser, deleteUser, clearMessages
} from "../redux/slices/usersSlice";

// ── Modal Form Component ──────────────────────────
function UserModal({ user, onClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(s => s.users);

  // Pre-fill form if editing, empty if creating
  const [form, setForm] = useState({
    name:  user?.name  || "",
    email: user?.email || "",
    role:  user?.role  || "user",
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      // Edit mode — dispatch update
      await dispatch(updateUser({ id: user.id, userData: form }));
    } else {
      // Create mode
      await dispatch(createUser(form));
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? "Edit User" : "Add New User"}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              className="form-control"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-control" name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : user ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Users Page ───────────────────────────────
function Users() {
  const dispatch = useDispatch();
  const { list: users, loading, error, success } = useSelector(s => s.users);

  const [showModal, setShowModal]   = useState(false);
  const [editUser,  setEditUser]    = useState(null);
  const [search,    setSearch]      = useState("");

  // Fetch users on page load
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  // Filter users by search
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Users Management</h1>
        <p>Create, edit, and delete users from MySQL database</p>
      </div>

      {/* Success / Error messages */}
      {success && <div className="alert alert-success">{success}</div>}
      {error   && <div className="alert alert-error">{error}</div>}

      {/* Search + Add button */}
      <div className="search-bar">
        <input
          className="form-control"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="card">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            Loading users...
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No users found</h3>
            <p>Try a different search or add a new user.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={user.id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.role}`}>{user.role}</span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td style={{ display: "flex", gap: "6px" }}>
                      <button className="btn btn-secondary" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="btn btn-danger"    onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <UserModal user={editUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Users;
