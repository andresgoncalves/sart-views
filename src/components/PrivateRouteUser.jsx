import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PrivateRouteUser({ children }) {
  const { user, isLogged } = useAuth();

  if (!isLogged && !user) {
    return <Navigate to="/login" />;
  }

  return children;
}
