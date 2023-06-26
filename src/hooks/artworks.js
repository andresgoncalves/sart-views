import { useCallback, useEffect, useState } from "react";
import {
  createArtwork,
  getArtwork,
  getArtworks,
  updateArtwork,
} from "../controllers/artworks";

export function useArtworks() {
  /** @type {[import("../controllers/artworks").ArtworkData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const artworks = await getArtworks();
      setData(artworks);
    }
    load();
  }, []);

  const create = useCallback(
    async function (
      /** @type {import("../controllers/artworks").ArtworkData} */ newData
    ) {
      const id = await createArtwork(newData);
      setData([...data, { ...newData, id }]);
      return id;
    },
    [data]
  );

  return { data, create };
}

/** @param {string} id */
export function useArtwork(id) {
  /** @type {[import("../controllers/artworks").ArtworkData | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const artwork = id ? await getArtwork(id) : null;
      setData(artwork);
    }
    load();
  }, [id]);

  const update = useCallback(
    async function (
      /** @type {Partial<import("../controllers/artworks").ArtworkData>} */ newData
    ) {
      await updateArtwork(id, newData);
      setData({ ...data, ...newData });
    },
    [id, data]
  );

  return { data, update };
}
