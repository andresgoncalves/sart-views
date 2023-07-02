import { useMemo, useState } from "react";
import CalendarImage from "../assets/CalendarImage.jpeg";
import Calendar from "../components/Calendar";
import Loader from "../components/Loader";
import TourCard from "../components/TourCard";
import { useReservations } from "../hooks/reservations";
import { useTours } from "../hooks/tours";
import { formatDate } from "../utils/date";
import styles from "./CalendarPage.module.scss";

export default function CalendarPage() {
  const [date, setDate] = useState(formatDate(new Date()));
  const reservations = useReservations();
  const tourIds = useMemo(
    () =>
      reservations.data
        ?.filter((reservation) => reservation.date == date)
        .map((reservation) => reservation.tour),
    [date, reservations.data]
  );
  const tours = useTours(tourIds);

  return (
    <>
      <header
        className={styles.banner}
        style={{ backgroundImage: `url(${CalendarImage})` }}
      >
        <div className={styles.textContainer}>
          <div className={styles.title}>
            Mantente al tanto de los próximos eventos
          </div>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </div>
        </div>
      </header>
      {reservations.data ? (
        <section className={styles.content}>
          <div className={styles.column1}>
            <div className={styles.label}>Seleccionar fecha:</div>
            <Calendar
              availableDates={reservations.data.map(
                (reservation) => reservation.date
              )}
              date={date}
              onChange={(date) => setDate(date)}
            />
          </div>
          <div className={styles.column2}>
            <div className={styles.label}>Tours recomendados</div>
            <div className={styles.tours}>
              {tours.data?.map((data, index) => (
                <TourCard key={index} size="medium" data={data} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
