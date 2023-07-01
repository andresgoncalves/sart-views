import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createReservation,
  getReservation,
  getReservations,
  getTourReservations,
  getUserReservations,
  updateReservation,
} from "../controllers/reservations";

/** @param {string[]} ids */
export function useReservations(ids = null) {
  /**
   * @type {[
   *   import("../controllers/reservations").ReservationData[] | null,
   *   any
   * ]}
   */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const reservations = await getReservations(ids);
      setData(reservations);
    }
    load();
  }, [ids]);

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

/** @param {string} tourId */
export function useTourReservations(tourId) {
  /**
   * @type {[
   *   import("../controllers/reservations").ReservationData[] | null,
   *   any
   * ]}
   */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const reservations = await getTourReservations(tourId);
      setData(reservations);
    }
    load();
  }, [tourId]);

  const reserve = useCallback(
    async function (
      /** @type {string} */ reservationId,
      /** @type {string} */ userId
    ) {
      const reservation = data.find(
        (reservation) => reservation.id === reservationId
      );
      if (reservation) {
        const newData = { users: [...reservation.users, userId] };
        await updateReservation(reservationId, newData);
        setData(
          data.map((reservation) =>
            reservation.id === reservationId
              ? { ...reservation, ...newData }
              : reservation
          )
        );
      }
    },
    [data]
  );

  return useMemo(() => ({ data, reserve }), [data, reserve]);
}

/** @param {string} userId */
export function useUserReservations(userId) {
  /**
   * @type {[
   *   import("../controllers/reservations").ReservationData[] | null,
   *   any
   * ]}
   */
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const reservations = await getUserReservations(userId);
      setData(reservations);
    }
    load();
  }, [userId]);

  return useMemo(() => ({ data }), [data]);
}

/** @param {string} id */
export function useReservation(id) {
  /**
   * @type {[
   *   import("../controllers/reservations").ReservationData | null,
   *   any
   * ]}
   */
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

  const reserve = useCallback(
    async function (/** @type {string} */ userId) {
      const newData = { users: [...data.users, userId] };
      await updateReservation(id, newData);
      setData({ ...data, ...newData });
    },
    [id, data]
  );

  return useMemo(() => ({ data, update, reserve }), [data, update, reserve]);
}
