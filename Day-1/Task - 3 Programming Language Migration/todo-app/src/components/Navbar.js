import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
      <Link className="navbar-brand" to="/todos">
        TodoApp
      </Link>
      <div className="navbar-collapse" style={{ justifyContent: "end" }}>
        <ul className="navbar-nav mr-auto">
          {!localStorage.getItem("token") ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <div className="ml-auto d-flex align-items-center">
              <li className="nav-item">
                <span className="nav-link mb-0">
                  Welcome, {user ? user.userName : "User"}
                </span>
              </li>
              <li className="nav-item ml-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
