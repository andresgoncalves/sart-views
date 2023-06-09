import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
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
 *   favoritesArtworks: Array;
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
    favoritesArtworks: snapshot.get("favoritesArtworks"),
  };
}

/** @param {string[]} ids */
export async function getUsers(ids = null) {
  if (ids && ids.length == 0) {
    return [];
  }
  const usersRef = collection(db, "users");
  const userSnapshots = await getDocs(
    ids && ids.length < 30
      ? query(usersRef, where(documentId(), "in", ids))
      : usersRef
  );
  const users = userSnapshots.docs.map(mapToUserData);
  if (ids && ids.length >= 30) {
    return users.filter((user) => ids.includes(user.id));
  }
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
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
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
