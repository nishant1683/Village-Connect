// AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#f5f5f5] items-center justify-center">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
