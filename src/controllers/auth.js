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
        admin: false,
        favoritesArtworks: [],
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
        admin: false,
        favoritesArtworks: [],
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
  } catch ({ name, message }) {
    if (message.includes("auth/email-already-in-use")) {
      alert("Vaya! Parece que el correo que ha ingresado ya posee una cuenta");
    } else {
      alert(`${name} ${message}`);
    }
  }
};

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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
