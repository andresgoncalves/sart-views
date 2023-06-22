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
 *   name: string;
 *   department: string;
 *   location: string;
 *   duration: number;
 *   description: string;
 *   artworks: string[];
 *   pictures: string[];
 *   relatedTours: string[];
 * }} TourData
 */

/**
 * @param {import("firebase/firestore").DocumentSnapshot<
 *   import("firebase/firestore").DocumentData
 * >} snapshot
 * @returns {TourData}
 */
function mapToTourData(snapshot) {
  return {
    name: snapshot.get("name"),
    department: snapshot.get("department"),
    location: snapshot.get("location"),
    duration: snapshot.get("duration"),
    description: snapshot.get("description"),
    artworks: snapshot.get("artworks"),
    pictures: snapshot.get("pictures"),
    relatedTours: snapshot.get("relatedTours"),
  };
}

export async function getAllTours() {
  const toursRef = collection(db, "tours");
  const tourSnapshots = await getDocs(toursRef);
  const tours = tourSnapshots.docs.map((tour) => tour.data());
  return tours;
}

/** @param {string} id */
export async function getTour(id) {
  const toursRef = collection(db, "tours");
  const tourSnapshot = await getDoc(doc(toursRef, id));
  const tour = mapToTourData(tourSnapshot);
  return tour;
}

/**
 * @param {string} id
 * @param {TourData} data
 */
export async function createTour(id, data) {
  const toursRef = collection(db, "tours");
  const tourRef = doc(toursRef, id);
  const tourSnapshot = await getDoc(tourRef);
  if (tourSnapshot.exists()) {
    await setDoc(tourRef, data);
    return true;
  }
  return false;
}

/**
 * @param {string} id
 * @param {Partial<TourData>} data
 */
export async function updateTour(id, data) {
  const toursRef = collection(db, "tours");
  const tourRef = doc(toursRef, id);
  await updateDoc(tourRef, data);
}
