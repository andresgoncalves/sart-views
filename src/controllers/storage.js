import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { nanoid } from "nanoid";
import { storage } from "../firebase";

/**
 * @param {Blob | Uint8Array | ArrayBuffer} data
 * @param {string} path
 */
export async function uploadFile(data, path) {
  const pathRef = ref(storage, path);
  const fileRef = ref(pathRef, nanoid());
  await uploadBytes(fileRef, data);
  return fileRef.fullPath;
}

/** @param {string} path */
export async function deleteFile(path) {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
}

/** @param {string} path */
export async function getFileUrl(path) {
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
}
