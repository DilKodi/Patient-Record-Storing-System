import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import swal from'sweetalert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then(res =>{
      if(res.data.status === 200)
      {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_fname');
        swal("Success", res.data.message, "success");
        navigate('/');
      }
    });
  }

  let AuthButtons = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButtons = (
      <ul className="navbar-nav" style={{ display: "flex", gap: "0.6rem" }}>
        {/* Login Button */}
        <Link
          to="/login"
          style={{
            backgroundColor: "white",
            color: "#007bff",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Login
        </Link>

        {/* SignUp Button */}
        <Link
          to="/signup"
          style={{
            backgroundColor: "white",
            color: "#007bff",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          SignUp
        </Link>
      </ul>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Logout
        </button>
      </li>
    );
  }


  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "white",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Health App</div>

      {/* Navigation Links */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1rem",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div>{AuthButtons}</div>
    </nav>
  );
}

export default Navbar;
