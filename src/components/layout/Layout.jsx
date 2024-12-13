import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../router/ResponsiveAppBar";
const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
