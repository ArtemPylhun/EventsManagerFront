
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/user.service";

import { Button, Container, TextField } from "@mui/material";

const Register = () => {
  const userInitial = {
    email: "",
    password: "",
    userName: "",
  };


  const navigate = useNavigate();
  const [user, setUser] = useState(userInitial);

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
      setErrors({
        password:
          "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
      });
      return;
    }


    const response = await UserService.register(user);

    if (response) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField
          label="example@gmail.com"
          variant="outlined"
          type="email"
          name="email"
          value={user.email}
          onChange={handleUserChange}
        />
        <TextField
          label="exampleUserName"
          variant="outlined"
          type="text"
          name="userName"
          value={user.userName}
          onChange={handleUserChange}
        />
        <TextField
          label="your password"
          variant="outlined"
          type="password"
          name="password"
          value={user.password}
          onChange={handleUserChange}
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </Container>
    </form>
  );
};

export default Register;
