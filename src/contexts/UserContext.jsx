import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../controllers/users";
import { auth } from "../firebase";
/* import { getUserProfile } from "../firebase/users-service"; */

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  /* const [usuario, setUsuario] = useUser(); */

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(firebaseUser);
      setIsLoading(true);
      if (firebaseUser) {
        const profile = await getUser(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, [user]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UserContext);
}
