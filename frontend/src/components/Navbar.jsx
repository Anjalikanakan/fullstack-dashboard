// frontend/src/components/Navbar.jsx

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        Admin <span>Dashboard</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/"        end>Dashboard</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
