import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { total } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const formatNumber = (num) => (num ? num.toLocaleString("de-DE") : "0");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink className="navbar-brand text-warning fw-bold" to="/">🍕 Pizzería Mamma Mía</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"}
                to="/"
              >
                🍕 Home
              </NavLink>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"}
                    to="/profile"
                  >
                    🔓 Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-white" onClick={handleLogout}>🔒 Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"}
                    to="/login"
                  >
                    🔐 Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"}
                    to="/register"
                  >
                    🔐 Register
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ? "btn btn-warning fw-bold active" : "btn btn-warning fw-bold"}
                to="/cart"
              >
                🛒 Total: ${formatNumber(total)}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;