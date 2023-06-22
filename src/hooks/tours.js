import { useEffect, useMemo, useState } from "react";
import {
  createTour,
  getTour,
  getTours,
  updateTour,
} from "../controllers/tours";

export function useTours() {
  /** @type {[import("../controllers/tours").TourData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const tours = await getTours();
      setData(tours);
    }
    load();
  }, []);

  const create = useMemo(
    () =>
      async function (
        /** @type {import("../controllers/tours").TourData} */ newData
      ) {
        const id = await createTour(newData);
        setData([...data, { ...newData, id }]);
        return id;
      },
    [data]
  );

  return { data, create };
}

/** @param {string} id */
export function useTour(id) {
  /** @type {[import("../controllers/tours").TourData | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const tour = await getTour(id);
      setData(tour);
    }
    load();
  }, [id]);

  const update = useMemo(
    () =>
      async function (
        /** @type {Partial<import("../controllers/tours").TourData>} */ newData
      ) {
        await updateTour(id, newData);
        setData({ ...data, ...newData });
      },
    [id, data]
  );

  return { data, update };
}
