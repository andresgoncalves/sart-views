import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRoutePublic({ children }) {
  const { user, isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.admin) {
        navigate("/");
      }
    }
    if (isLogged === true) {
      navigate("/");
    }
  }, [navigate, isLogged]);

  return isLogged === false && children;
}
