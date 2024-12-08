import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../users/services/user.service";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Container, TextField } from "@mui/material";

const Login = () => {
  const userInitial = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(userInitial);
  const location = useLocation();

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await UserService.loginUser(user);

    if (response) {
      let decoded = jwtDecode(response);
      localStorage.setItem("token", response);
      localStorage.setItem("user", JSON.stringify(decoded));

      const params = new URLSearchParams(location.search);
      const returnUrl = params.get("returnUrl") || "/";

      navigate(returnUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={user.email}
          onChange={handleUserChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={user.password}
          onChange={handleUserChange}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Container>
    </form>
  );
};

export default Login;
