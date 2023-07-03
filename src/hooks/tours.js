import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTour,
  getTour,
  getTours,
  updateTour,
} from "../controllers/tours";

/** @param {string[]} ids */
export function useTours(ids = null) {
  /** @type {[import("../controllers/tours").TourData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const tours = await getTours(ids);
      setData(tours);
    }
    load();
  }, [ids]);

  const create = useCallback(
    async function (
      /** @type {import("../controllers/tours").TourData} */ newData
    ) {
      const id = await createTour(newData);
      setData([...data, { ...newData, id }]);
      return id;
    },
    [data]
  );

  return useMemo(() => ({ data, create }), [data, create]);
}

/** @param {string} id */
export function useTour(id) {
  /** @type {[import("../controllers/tours").TourData | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const tour = id ? await getTour(id) : null;
      setData(tour);
    }
    load();
  }, [id]);

  const update = useCallback(
    async function (
      /** @type {Partial<import("../controllers/tours").TourData>} */ newData
    ) {
      await updateTour(id, newData);
      setData({ ...data, ...newData });
    },
    [id, data]
  );

  const feedback = useCallback(
    async function (
      /** @type {import("../controllers/tours").FeedbackData} */ newData
    ) {
      await updateTour(id, { feedback: [...data.feedback, newData] });
      setData({ ...data, feedback: [...data.feedback, newData] });
    },
    [id, data]
  );

  return useMemo(() => ({ data, update, feedback }), [data, update, feedback]);
}
