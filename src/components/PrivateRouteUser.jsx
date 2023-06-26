import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRouteUser({ children }) {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged === false) {
      navigate("/login");
    }
  }, [navigate, isLogged]);

  return isLogged === true && children;
}
