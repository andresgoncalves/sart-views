import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createReservation,
  getReservation,
  getReservations,
  updateReservation
} from "../controllers/reservations";

export function useReservations() {
    /** @type {[import("../controllers/reservations").ReservationData[] | null, any]} */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const reservations = await getReservations();
      setData(reservations);
    }
    load();
  }, []);

  const create = useCallback(
    async function (
      /** @type {import("../controllers/reservations").ReservationData} */ newData
    ) {
      const id = await createReservation(newData);
      setData([...data, { ...newData, id }]);
      return id;
    },
    [data]
  );

    return useMemo(() => ({ data, create }), [data, create]);
}

/** @param {string} id */
export function useReservation(id) {
    /** @type {[import("../controllers/reservations").ReservationData | null, any]} */
    const [data, setData] = useState(null);
  
    useEffect(() => {
      async function load() {
        const tour = id ? await getReservation(id) : null;
        setData(tour);
      }
      load();
    }, [id]);
  
    const update = useCallback(
      async function (
        /** @type {Partial<import("../controllers/tours").TourData>} */ newData
      ) {
        await updateReservation(id, newData);
        setData({ ...data, ...newData });
      },
      [id, data]
    );
  
    return useMemo(() => ({ data, update }), [data, update]);
  }
  