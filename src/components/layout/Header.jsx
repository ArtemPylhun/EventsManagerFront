import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// Define two page lists
const adminPages = [
  { name: "Home", path: "/" },
  { name: "Users", path: "/users" },
  { name: "Categories", path: "/categories" },
  { name: "Tags", path: "/tags" },
];

const userPages = [{ name: "Home", path: "/" }];

const Header = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  // Determine which pages to show based on user role
  const pages = user?.role === "Admin" ? adminPages : userPages;

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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
