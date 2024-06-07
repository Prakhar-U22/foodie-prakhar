import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate(); // Initialize the navigation function

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the authentication token from localStorage
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {/* Brand/logo */}
          <Link className="navbar-brand fs-2 fst-italic" to="/">Foodie</Link>

          {/* Navbar toggler for small screens */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* Home link */}
              <li className="nav-item m-2">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
            </ul>

            {/* Conditional rendering based on authentication */}
            {(!localStorage.getItem("authToken")) ? ( // If user is not authenticated
              <div className="d-flex">
                {/* Login and Signup buttons */}
                <Link className="btn bg-white text-primary m-2" to="/login">Login</Link>
                <Link className="btn bg-white text-primary m-2" to="/createuser">Signup</Link>
              </div>
            ) : ( // If user is authenticated
              <div className="btn bg-white text-primary m-2" onClick={handleLogout}>Logout</div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
