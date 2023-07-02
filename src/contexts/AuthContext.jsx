import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";
import { useUser } from "../hooks/users";
/* import { getUserProfile } from "../firebase/users-service"; */

/**
 * @type {React.Context<{
 *   user: import("../controllers/users").UserData;
 *   update: (
 *     data: Partial<import("../controllers/users").UserData>
 *   ) => Promise<void>;
 *   isLogged: boolean;
 *   isAdmin: boolean;
 * }>}
 */
export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const user = useUser(userId);

  const isAdmin = useMemo(
    () => (isLogged !== false ? (user.data ? !!user.data.admin : null) : false),
    [user.data, isLogged]
  );

  useEffect(() => {
    let logged = false;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.startsWith("firebase:authUser")) {
        logged = true;
        break;
      }
    }
    setIsLogged(logged);
    onAuthStateChanged(auth, (firebaseUser) => {
      setIsLogged(!!firebaseUser?.uid);
      setUserId(firebaseUser?.uid);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: user.data, update: user.update, isLogged, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
