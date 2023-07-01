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
import { db } from "../firebase";

/**
 * @typedef {{
 *   id?: string;
 *   name: string;
 *   category: string;
 *   author: string;
 *   year: string;
 *   location: string;
 *   department: string;
 *   description: string;
 *   images: string[];
 *   relatedArtworks: string[];
 * }} ArtworkData
 */

/**
 * @param {import("firebase/firestore").DocumentSnapshot<
 *   import("firebase/firestore").DocumentData
 * >} snapshot
 * @returns {ArtworkData}
 */
function mapToArtworkData(snapshot) {
  return {
    id: snapshot.id,
    name: snapshot.get("name"),
    category: snapshot.get("category"),
    author: snapshot.get("author"),
    year: snapshot.get("year"),
    location: snapshot.get("location"),
    department: snapshot.get("department"),
    description: snapshot.get("description"),
    images: snapshot.get("images"),
    relatedArtworks: snapshot.get("relatedArtworks"),
  };
}

/** @param {string[]} ids */
export async function getArtworks(ids = null) {
  if (ids && ids.length == 0) {
    return [];
  }
  const artworksRef = collection(db, "artworks");
  const artworkSnapshots = await getDocs(
    ids ? query(artworksRef, where(documentId(), "in", ids)) : artworksRef
  );
  const artworks = artworkSnapshots.docs.map(mapToArtworkData);
  return artworks;
}

/** @param {string} id */
export async function getArtwork(id) {
  const artworksRef = collection(db, "artworks");
  const artworkSnapshot = await getDoc(doc(artworksRef, id));
  const artwork = mapToArtworkData(artworkSnapshot);
  return artwork;
}

/** @param {ArtworkData} data */
export async function createArtwork(data) {
  const artworksRef = collection(db, "artworks");
  const artworkRef = await addDoc(artworksRef, data);
  return artworkRef.id;
}

/**
 * @param {string} id
 * @param {Partial<ArtworkData>} data
 */
export async function updateArtwork(id, data) {
  const artworksRef = collection(db, "artworks");
  const artworkRef = doc(artworksRef, id);
  await updateDoc(artworkRef, data);
}
