import React from "react";
import "../css/header.css";
import Logo from "../img/Logo2.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      navigate("/login");
    }
  };

  return (
    <div className="head-section">
      <header className="header">
        <img src={Logo} alt="Not found" className="logo-img" />

        <div className="login-register">
          {auth ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Link to="/myacc" className="my-btn">
                <span class="material-symbols-outlined">person</span>My Account
              </Link>
              <button onClick={handleLogout} className="logout-btn"><span class="material-symbols-outlined">
logout
</span>LogOut</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn"><span class="material-symbols-outlined">
            login
            </span> Login/Register</Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
