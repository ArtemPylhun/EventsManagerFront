import React from "react";
import { UserService } from "../../services/user.service";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const response = await UserService.login(email, password);

    if (response) {
      localStorage.setItem("token", response);

      const params = new URLSearchParams(location.search);
      const returnUrl = params.get("returnUrl") || "/";

      navigate(returnUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
