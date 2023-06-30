import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRouteUser({ children }) {
  const { user, isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.admin) {
        navigate("/admin/dashboard");
      }
    }
    if (isLogged === false) {
      navigate("/login");
    }
  }, [user, navigate, isLogged]);

  return isLogged === true && children;
}
