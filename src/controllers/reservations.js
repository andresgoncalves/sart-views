import {
    addDoc,
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    query,    
    updateDoc,
    where
  } from "firebase/firestore";
import { db } from "../firebase";

/**
 * @typedef {{
*   id?: string;
*   tourID: string;
*   date: string;
*   hour: string;
*   userID: string;
* }} ReservationData
*/

/**
 * @param {import("firebase/firestore").DocumentSnapshot<
*   import("firebase/firestore").DocumentData
* >} snapshot
* @returns {ReservationData}
*/

function mapToReservationData(snapshot) {
    return {
      id: snapshot.id,
      tourID: snapshot.get("tourID"),
      date: snapshot.get("date"),
      hour: snapshot.get("hour"),
      userID: snapshot.get("duration"),
    };
}

export async function getReservations(ids = null) {
    const reservationsRef = collection(db, "reservations");
    const reservationsSnapshots = await getDocs(
      ids ? query(reservationsRef, where(documentId(), "in", ids)) : reservationsRef
    );
    // await getDocs(toursRef);
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
