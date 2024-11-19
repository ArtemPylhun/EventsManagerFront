import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");

  const user = userJson ? JSON.parse(userJson) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {allowedRoles?.includes(user?.role ?? "") ? (
        children
      ) : (
        <h1>Unauthorized</h1>
      )}
    </>
  );
};

export default ProtectedRoute;
