import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTourReservations } from "../hooks/reservations";
import { formatDate } from "../utils/date";
import Calendario from "./Calendar";
import styles from "./HourModal.module.scss";
import HourSelector from "./HourSelector";
import Loader from "./Loader";
import ReserveModal from "./ReserveModal";

/**
 * @typedef {{
 *   tour: import("../controllers/tours").TourData;
 *   closeModal: () => void;
 * }} HourModalProps
 */

/** @param {HourModalProps} props */
export default function HourModal({ tour, closeModal }) {
  const [validation, setValidation] = useState(true);
  const { user } = useAuth();
  const reservations = useTourReservations(tour.id);
  const [date, setDate] = useState(formatDate(new Date()));
  const [hour, setHour] = useState("");
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showHourModal, setShowHourModal] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const openReserveModal = () => {
    setShowReserveModal(true);
    setShowHourModal(false);
  };

  const closeReserveModal = useCallback(() => {
    setShowReserveModal(false);
  }, []);

  const availableDates = useMemo(
    () =>
      reservations.data
        ?.filter((reservation) => reservation.status === "available")
        .map((reservation) => reservation.date),
    [reservations.data]
  );

  const availableHours = useMemo(
    () =>
      reservations.data
        ?.filter((reservation) => reservation.status === "available")
        ?.filter((reservation) => reservation.date === date)
        .map((reservation) => reservation.hour),
    [date, reservations.data]
  );

  const handleReserve = useCallback(async () => {
    const reservation = reservations.data?.find(
      (reservation) => reservation.date === date && reservation.hour === hour
    );
    console.log(reservation)
    if(reservation === undefined){
      setValidation(false);
    }else{
      if (user && reservation) {
        setShowLoader(true);
        await reservations.reserve(reservation.id, user.id);
        setShowLoader(false);
        openReserveModal();
        return;
      }
      closeModal();
    }
    
  }, [closeModal, date, hour, reservations, user]);

  return (
    <div className={styles.wrapper}>
      {showLoader ? (
        <Loader />
      ) : tour && showHourModal ? (
        <div className={styles.modalBox}>
          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${tour.images[0]})` }}
          ></div>
          {reservations.data ? (
            <>
              <div className={styles.content}>
                <div className={styles.leftContent}>
                  <div className={styles.title}>
                    Selecciona una de las fechas disponibles:
                  </div>
                  <Calendario
                    availableDates={availableDates}
                    date={date}
                    onChange={(date) => setDate(date)}
                  />
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.title}>Selecciona una hora:</div>
                  <HourSelector
                    availableHours={availableHours}
                    hour={hour}
                    onChange={(hour) => setHour(hour)}
                  />
                  <div className={styles.eventDetails}>
                    <p className={styles.subtitle}>
                      <strong>Detalles del Evento:</strong>
                    </p>
                    <p>
                      <strong>Lugar:</strong> {tour.location}
                    </p>
                    <p>
                      <strong>Duración:</strong> {tour.duration}
                    </p>  
                    {validation ? (
                      null
                    ):(
                    <p className={styles.alert}><strong>Por favor, selecciona un horario válido</strong></p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.buttonSection}>                
                <button className={styles.closeButton} onClick={closeModal}>
                  Cancelar
                </button>
                <button className={styles.bookButton} onClick={handleReserve}>
                  Reservar
                </button>
              </div>
              
            </>
          ) : (
            <Loader />
          )}
        </div>
      ) : null}

      {showReserveModal && <ReserveModal closeModal={closeReserveModal} />}
    </div>
  );
}

