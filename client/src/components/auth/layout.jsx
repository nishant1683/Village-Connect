// AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./AuthLayout.css"; // Import the CSS file

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Left Side with Background Image and Transparency */}
      <div className="auth-layout__left">
        <div className="auth-layout__text-container">
          <h1 className="auth-layout__heading">Welcome to Village-Connect</h1>
        </div>
      </div>

      {/* Right Side with Content */}
      <div className="auth-layout__right">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
