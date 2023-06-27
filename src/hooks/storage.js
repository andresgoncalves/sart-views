import { useEffect, useMemo, useState } from "react";
import { deleteFile, getFileUrl, uploadFile } from "../controllers/storage";

export function useStorage() {
  return useMemo(
    () => ({
      get: getFileUrl,
      upload: uploadFile,
      delete: deleteFile,
    }),
    []
  );
}

/** @param {string} path */
export function useFile(path) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    getFileUrl(path).then((file) => setUrl(file));
  }, [path]);
  return url;
}

/** @param {string[]} paths */
export function useFiles(paths) {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    if (paths) {
      Promise.all(paths.map((path) => getFileUrl(path))).then((files) =>
        setUrls(files)
      );
    } else {
      setUrls([]);
    }
  }, [paths]);
  return urls;
}
