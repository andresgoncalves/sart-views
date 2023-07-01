import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createArtwork,
  getArtwork,
  getArtworks,
  updateArtwork,
} from "../controllers/artworks";

/** @param {string[]} ids */
export function useArtworks(ids = null) {
  /** @type {[import("../controllers/artworks").ArtworkData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const artworks = await getArtworks();
      setData(artworks);
    }
    load();
  }, [ids]);

  const create = useCallback(async function (
    /** @type {import("../controllers/artworks").ArtworkData} */ newData
  ) {
    const id = await createArtwork(newData);
    setData((data) => [...data, { ...newData, id }]);
    return id;
  },
  []);

  return useMemo(() => ({ data, create }), [data, create]);
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
      setData((data) => ({ ...data, ...newData }));
    },
    [id]
  );

  return useMemo(() => ({ data, update }), [data, update]);
}

/** @param {import("../controllers/artworks").ArtworkData[]} artworks */
export function useCategories(artworks) {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    if (artworks) {
      /**
       * @type {Record<
       *   string,
       *   import("../controllers/artworks").ArtworkData[]
       * >}
       */
      const categories = {};
      for (const artwork of artworks) {
        if (artwork.images.length > 0) {
          if (categories[artwork.category]) {
            categories[artwork.category].push(artwork);
          } else {
            categories[artwork.category] = [artwork];
          }
        }
        setCategories(categories);
      }
    }
  }, [artworks]);

  return categories;
}
