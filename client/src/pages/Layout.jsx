import React from "react";
import { Outlet } from "react-router-dom";
import Navebar from "../components/Navebar";

const Layout = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <Navebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;