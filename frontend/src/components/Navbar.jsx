import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!token) return null;

  return (
    <nav className="navbar" ref={navRef}>
      <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
        Admin <span>Dashboard</span>
      </NavLink>

      {/* Desktop nav links */}
      <div className="navbar-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/products">Products</NavLink>
      </div>

      {/* Desktop user area */}
      <div className="navbar-user">
        <span className="navbar-username">{user?.name}</span>
        <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Hamburger button — mobile/tablet only */}
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" end onClick={closeMenu}>Dashboard</NavLink>
          <NavLink to="/users" onClick={closeMenu}>Users</NavLink>
          <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          <div className="mobile-menu-footer">
            <span className="mobile-menu-username">{user?.name}</span>
            <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
