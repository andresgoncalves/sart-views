import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useUser } from "../hooks/users";
/* import { getUserProfile } from "../firebase/users-service"; */

/**
 * @type {React.Context<{
 *   user: import("../controllers/users").UserData;
 *   isLogged: boolean;
 * }>}
 */
export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const user = useUser(userId);

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.startsWith("firebase:authUser")) {
        setIsLogged(true);
        break;
      }
    }
    onAuthStateChanged(auth, (firebaseUser) => {
      setIsLogged(!!firebaseUser?.uid);
      setUserId(firebaseUser?.uid);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user.data, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
