import React from "react";
import { useNavigate, useState } from "react-router-dom";
import { UserService } from "../../services/user.service";

const Register = () => {
  const userInitial = {
    email: "",
    password: "",
    userName: "",
  };

  const navigate = useNavigate(userInitial);
  const [user, setUser] = useState();

  const handleUserChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await UserService.register(user);

    if (response) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={user.email}
          onChange={handleUserChange}
          name="email"
          required
        />
      </label>
      <label>
        User name:
        <input
          type="text"
          value={user.userName}
          onChange={handleUserChange}
          name="userName"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={user.password}
          onChange={handleUserChange}
          name="password"
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
