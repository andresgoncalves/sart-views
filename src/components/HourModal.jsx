import moment from "moment";
import { useMemo, useState } from "react";
import { useTourReservations } from "../hooks/reservations";
import Calendario from "./Calendar";
import styles from "./HourModal.module.scss";
import HourSelector from "./HourSelector";
import Loader from "./Loader";

/**
 * @typedef {{
 *   tour: import("../controllers/tours").TourData;
 *   closeModal: () => void;
 * }} HourModalProps
 */

/** @param {HourModalProps} props */
export default function HourModal({ tour, closeModal }) {
  const reservations = useTourReservations(tour.id);
  const [date, setDate] = useState(moment(new Date()).format("DD-MM-YYYY"));
  const [hour, setHour] = useState("");

  const availableDates = useMemo(
    () =>
      reservations.data
        ?.filter((reservation) => reservation.status == "available")
        ?.map((reservation) => reservation.date),
    [reservations.data]
  );

  const availableHours = useMemo(
    () =>
      reservations.data
        ?.filter((reservation) => reservation.status == "available")
        ?.filter((reservation) => reservation.date == date)
        .map((reservation) => reservation.hour),
    [date, reservations.data]
  );

  return (
    <div className={styles.wrapper}>
      {tour ? (
        <div className={styles.modalBox}>
          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${tour.images[0]})` }}
          ></div>
          {reservations.data ? (
            <>
              <div className={styles.content}>
                <div className={styles.content2}>
                  <div>Selecciona una de las fechas disponibles:</div>
                  <Calendario
                    availableDates={availableDates}
                    date={date}
                    onChange={(date) => setDate(date)}
                  />
                </div>
                <div className={styles.content2}>
                  <p>Selecciona una hora:</p>
                  <HourSelector
                    availableHours={availableHours}
                    hour={hour}
                    onChange={(hour) => setHour(hour)}
                  />
                </div>
                <div className={styles.content2}>
                  <p className={styles.subtitle}>
                    <strong>Detalles del Evento:</strong>
                  </p>
                  <p>
                    <strong>Lugar:</strong>
                    {tour.location}
                  </p>
                  <p>
                    <strong>Duración:</strong>
                    {tour.duration}
                  </p>
                </div>
              </div>
              <div className={styles.buttonSection}>
                <button
                  className={styles.closeButton}
                  onClick={() => closeModal()}
                >
                  Cancelar
                </button>
                <button
                  className={styles.bookButton}
                  onClick={() => closeModal()}
                >
                  Reservar
                </button>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
