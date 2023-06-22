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
 *   category: string;
 *   author: string;
 *   year: number;
 *   location: string;
 *   description: string;
 *   pictures: string[];
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
    name: snapshot.get("name"),
    category: snapshot.get("category"),
    author: snapshot.get("author"),
    year: snapshot.get("year"),
    location: snapshot.get("location"),
    description: snapshot.get("description"),
    pictures: snapshot.get("pictures"),
    relatedArtworks: snapshot.get("relatedArtworks"),
  };
}

export async function getAllArtworks() {
  const artworksRef = collection(db, "artworks");
  const artworkSnapshots = await getDocs(artworksRef);
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

/**
 * @param {string} id
 * @param {ArtworkData} data
 */
export async function createArtwork(id, data) {
  const artworksRef = collection(db, "artworks");
  const artworkRef = doc(artworksRef, id);
  const artworkSnapshot = await getDoc(artworkRef);
  if (!artworkSnapshot.exists()) {
    await setDoc(artworkRef, data);
  }
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
