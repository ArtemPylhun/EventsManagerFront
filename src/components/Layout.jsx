import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
