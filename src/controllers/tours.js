import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * @typedef {{
 *   id?: string;
 *   name: string;
 *   department: string;
 *   location: string;
 *   duration: number;
 *   description: string;
 *   rating: number;
 *   artworks: string[];
 *   images: string[];
 *   pointsOfInterest: string[];
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
    id: snapshot.id,
    name: snapshot.get("name"),
    department: snapshot.get("department"),
    location: snapshot.get("location"),
    duration: snapshot.get("duration"),
    description: snapshot.get("description"),
    rating: snapshot.get("rating"),
    artworks: snapshot.get("artworks"),
    images: snapshot.get("images"),
    pointsOfInterest: snapshot.get("pointsOfInterest"),
    relatedTours: snapshot.get("relatedTours"),
  };
}

export async function getTours(ids = null) {
  if (ids && ids.length == 0) {
    return [];
  }
  const toursRef = collection(db, "tours");
  const tourSnapshots = await getDocs(
    ids ? query(toursRef, where(documentId(), "in", ids)) : toursRef
  );
  // await getDocs(toursRef);
  const tours = tourSnapshots.docs.map(mapToTourData);
  return tours;
}

/** @param {string} id */
export async function getTour(id) {
  const toursRef = collection(db, "tours");
  const tourSnapshot = await getDoc(doc(toursRef, id));
  const tour = mapToTourData(tourSnapshot);
  return tour;
}

/** @param {TourData} data */
export async function createTour(data) {
  const toursRef = collection(db, "tours");
  const tourRef = await addDoc(toursRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return tourRef.id;
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
