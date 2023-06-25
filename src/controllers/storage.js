import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
  return await getDownloadURL(fileRef);
}
