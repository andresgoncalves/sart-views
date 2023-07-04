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
 *   user?: string;
 *   satisfaction: string;
 *   likedMost: string;
 *   wouldAdd: string;
 *   wouldAssist: string;
 *   rating: number;
 * }} FeedbackData
 */

/**
 * @typedef {{
 *   id?: string;
 *   name: string;
 *   department: string;
 *   location: string;
 *   duration: number;
 *   description: string;
 *   artworks: string[];
 *   images: string[];
 *   pointsOfInterest: string[];
 *   relatedTours: string[];
 *   feedback: FeedbackData[];
 *   rating?: number;
 * }} TourData
 */

/**
 * @param {import("firebase/firestore").DocumentSnapshot<
 *   import("firebase/firestore").DocumentData
 * >} snapshot
 * @returns {TourData}
 */
function mapToTourData(snapshot) {
  /** @type {TourData} */
  const data = {
    id: snapshot.id,
    name: snapshot.get("name"),
    department: snapshot.get("department"),
    location: snapshot.get("location"),
    duration: snapshot.get("duration"),
    description: snapshot.get("description"),
    artworks: snapshot.get("artworks"),
    images: snapshot.get("images"),
    pointsOfInterest: snapshot.get("pointsOfInterest"),
    relatedTours: snapshot.get("relatedTours"),
    feedback: snapshot.get("feedback"),
  };
  data.rating =
    data.feedback.reduce((prev, curr) => prev + curr.rating, 0) /
    data.feedback.length;
  return data;
}

/** @param {string[]} ids */
export async function getTours(ids = null) {
  if (ids && ids.length == 0) {
    return [];
  }
  const toursRef = collection(db, "tours");
  const tourSnapshots = await getDocs(
    ids && ids.length < 30
      ? query(toursRef, where(documentId(), "in", ids))
      : toursRef
  );
  const tours = tourSnapshots.docs.map(mapToTourData);
  if (ids && ids.length >= 30) {
    return tours.filter((tour) => ids.includes(tour.id));
  }
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
