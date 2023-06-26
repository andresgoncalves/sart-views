import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRoutePublic({ children }) {
  const { user, isLogged } = useAuth();

  if (isLogged || user) {
    return <Navigate to="/" />;
  }

  return children;
}
