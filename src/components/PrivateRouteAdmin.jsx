import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRouteAdmin({ children }) {
  const { user, isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (!user.admin) {
        navigate("/user/dashboard");
      }
    }
    if (isLogged === false) {
      navigate("/login");
    }
  }, [user, navigate, isLogged]);

  return isLogged === true && children;
}
