import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { createUser } from "./users";
/* import { createUserProfile } from "./users-service"; */

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      await createUser(result.user.uid, {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        phone: "",
        association: "",
        sex: "",
        picture: result.user.photoURL,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const singInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const { isNewUser } = getAdditionalUserInfo(result);
    if (isNewUser) {
      await createUser(result.user.uid, {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        phone: "",
        association: "",
        sex: "",
        picture: result.user.photoURL,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const registerWithEmailAndPassword = async (
  email,
  password,
  extraData
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    await createUser(result.user.uid, {
      email: email,
      ...extraData,
    });
  } catch (error) {
    console.error(error);
  }
};

// este se usa en el register page y se crea la funcion on submit y mandarle la extra data en el register page

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
  } catch ({ name, message }) {
    if (message.includes("auth/user-not-found")) {
      alert("El usuario ingresado no existe en el sistema");
    } else if (message.includes("auth/wrong-password")) {
      alert("La contraseña ingresada es incorrecta");
    } else {
      alert(`${name} ${message}`);
    }
  }
};

// llamo a esa funcion en el estado de login

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
