import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const adminPages = [
  { name: "Home", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Categories", path: "/categories" },
  { name: "Tags", path: "/tags" },
];

const userPages = [{ name: "Home", path: "/" }];

const Header = () => {
  const navigate = useNavigate();

  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const pages = user?.role === "Admin" ? adminPages : userPages;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(0);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  disableRipple
                >
                  Welcome, {user.name}
                </Button>
                <Button
                  onClick={handleLogout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
