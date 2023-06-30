import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * @typedef {{
 *   role: "user" | "admin" | "public";
 *   children: React.ReactNode;
 * }} PrivateRouteProps
 */

/** @param {PrivateRouteProps} props */
export default function PrivateRoute({ role, children }) {
  const navigate = useNavigate();
  const { isLogged, isAdmin } = useAuth();
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (role == "public" && isLogged === true) {
      navigate("/");
    } else if (role == "user" && (isLogged === false || isAdmin === true)) {
      navigate("/login");
    } else if (role == "admin" && (isLogged === false || isAdmin === false)) {
      navigate("/login");
    } else if (isLogged !== null && isAdmin != null) {
      setRender(true);
    }
  }, [navigate, role, isAdmin, isLogged]);

  return render && children;
}
