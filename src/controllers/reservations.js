import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { db } from "../firebase";

/**
 * @typedef {{
 *   id?: string;
 *   tour: string;
 *   date: string;
 *   hour: string;
 *   users: string[];
 *   limit: number;
 *   status?: "available" | "sold-out" | "closed";
 * }} ReservationData
 */

/**
 * @param {import("firebase/firestore").DocumentSnapshot<
 *   import("firebase/firestore").DocumentData
 * >} snapshot
 * @returns {ReservationData}
 */
function mapToReservationData(snapshot) {
  /** @type {ReservationData} */
  const data = {
    id: snapshot.id,
    tour: snapshot.get("tour"),
    date: snapshot.get("date"),
    hour: snapshot.get("hour"),
    users: snapshot.get("users"),
    limit: snapshot.get("limit"),
  };
  data.status =
    moment(data.date, "DD-MM-YYYY").diff(new Date()) > 0
      ? data.users.length < data.limit
        ? "available"
        : "sold-out"
      : "closed";
  return data;
}

/** @param {string[]} ids */
export async function getReservations(ids = null) {
  if (ids && ids.length == 0) {
    return [];
  }
  const reservationsRef = collection(db, "reservations");
  const reservationsSnapshots = await getDocs(
    ids
      ? query(reservationsRef, where(documentId(), "in", ids))
      : reservationsRef
  );
  const reservations = reservationsSnapshots.docs.map(mapToReservationData);
  return reservations;
}

/** @param {string} tourId */
export async function getTourReservations(tourId) {
  const reservationsRef = collection(db, "reservations");
  const reservationsSnapshots = await getDocs(
    query(reservationsRef, where("tour", "==", tourId))
  );
  const reservations = reservationsSnapshots.docs.map(mapToReservationData);
  return reservations;
}

/** @param {string} userId */
export async function getUserReservations(userId) {
  const reservationsRef = collection(db, "reservations");
  const reservationsSnapshots = await getDocs(
    query(reservationsRef, where("users", "array-contains", userId))
  );
  const reservations = reservationsSnapshots.docs.map(mapToReservationData);
  return reservations;
}

/** @param {string} id */
export async function getReservation(id) {
  const reservationRef = collection(db, "reservations");
  const reservationSnapshot = await getDoc(doc(reservationRef, id));
  const reservation = mapToReservationData(reservationSnapshot);
  return reservation;
}

/** @param {ReservationData} data */
export async function createReservation(data) {
  const reservationsRef = collection(db, "reservations");
  const reservationRef = await addDoc(reservationsRef, data);
  return reservationRef.id;
}

/**
 * @param {string} id
 * @param {Partial<ReservationData>} data
 */
export async function updateReservation(id, data) {
  const reservationsRef = collection(db, "reservations");
  const reservationRef = doc(reservationsRef, id);
  await updateDoc(reservationRef, data);
}
