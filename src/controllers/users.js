import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * @typedef {{
 *   id?: string;
 *   name: string;
 *   email: string;
 *   phone: string;
 *   association: string;
 *   sex: string;
 *   picture: string;
 *   admin: boolean;
 * }} UserData
 */

/**
 * @param {import("firebase/firestore").DocumentSnapshot<
 *   import("firebase/firestore").DocumentData
 * >} snapshot
 * @returns {UserData}
 */
function mapToUserData(snapshot) {
  return {
    id: snapshot.id,
    name: snapshot.get("name"),
    email: snapshot.get("email"),
    phone: snapshot.get("phone"),
    association: snapshot.get("association"),
    sex: snapshot.get("sex"),
    picture: snapshot.get("picture"),
    admin: snapshot.get("admin"),
  };
}

export async function getUsers() {
  const usersRef = collection(db, "users");
  const userSnapshots = await getDocs(usersRef);
  const users = userSnapshots.docs.map(mapToUserData);
  return users;
}

/** @param {string} id */
export async function getUser(id) {
  const usersRef = collection(db, "users");
  const userSnapshot = await getDoc(doc(usersRef, id));
  const user = mapToUserData(userSnapshot);
  return user;
}

/** @param {string} email */
export async function getUserByEmail(email) {
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const results = await getDocs(userQuery);

  if (results.size > 0) {
    const usuarios = results.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));

    const usersRef = collection(db, "users");
    const userSnapshot = await getDoc(doc(usersRef, usuarios[0].id));
    const user = mapToUserData(userSnapshot);

    return user;
  } else {
    return null;
  }
}

/**
 * @param {string} id
 * @param {(data: UserData) => void} handler
 */
export async function onUserSnapshot(id, handler) {
  const usersRef = collection(db, "users");
  return onSnapshot(doc(usersRef, id), (userSnapshot) => {
    handler(mapToUserData(userSnapshot));
  });
}

/**
 * @param {string} id
 * @param {UserData} data
 */
export async function createUser(id, data) {
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, id);
  const user = await getDoc(userRef);
  if (!user.exists()) {
    await setDoc(userRef, data);
  }
}

/**
 * @param {string} id
 * @param {Partial<UserData>} data
 */
export async function updateUser(id, data) {
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, id);
  await updateDoc(userRef, data);
}
