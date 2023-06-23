import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
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
