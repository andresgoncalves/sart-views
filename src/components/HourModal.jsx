import { useState } from "react";
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
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalBox}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${tour.images[0]})` }}
        ></div>
        {reservations ? (
          <>
            <div className={styles.content}>
              <div className={styles.content2}>
                <div>Selecciona una de las fechas disponibles:</div>
                <Calendario
                  dates={reservations.data.map(
                    (reservation) => reservation.date
                  )}
                  date={date}
                  setDate={setDate}
                />
              </div>
              <div className={styles.content2}>
                <p>Selecciona una hora:</p>
                <HourSelector hours={hours} setHour={setHour} />
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
    </div>
  );
}
