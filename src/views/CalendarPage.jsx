import CalendarImage from "../assets/CalendarImage.jpeg";
import Calendario from "../components/Calendar";
import TourCard from "../components/TourCard";
import { useTours } from "../hooks/tours";
import styles from "./CalendarPage.module.scss";

export default function CalendarPage() {
  const tours = useTours();
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
      <section className={styles.content}>
        <div className={styles.column1}>
          <div className={styles.label}>Seleccionar fecha:</div>
          <Calendario></Calendario>
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
    </>
  );
}
