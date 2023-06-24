import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useUser } from "../hooks/users";
/* import { getUserProfile } from "../firebase/users-service"; */

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const user = useUser(userId);

  useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      setUserId(firebaseUser?.uid);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user.data, isLoading: !!user.data }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
