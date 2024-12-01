import React from "react";
import { useNavigate, useState } from "react";
import { UserService } from "../../services/user.service";

const Register = () => {
  const userInitial = {
    email: "",
    password: "",
    userName: "",
  };

  const navigate = useNavigate(userInitial);
  const [user, setUser] = useState(userInitial);
  const [errors, setErrors] = useState({});

  const handleUserChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    setErrors({});
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
      {errors.password && <p style={{ color: "darkred" }}>{errors.password}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
