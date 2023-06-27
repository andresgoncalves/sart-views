import { Helmet } from "react-helmet-async";
import Divider from "../components/Divider";
import TourCard from "../components/TourCard";
import { useTours } from "../hooks/tours";
import styles from "./ToursPage.module.scss";
import unimet from "../assets/unimet.jpg";

export default function ToursPage() {
  const tours = useTours();

  return (
    <>
      <Helmet title="Obras"></Helmet>
      <header
        className={styles.banner}
        style={{ backgroundImage: `url(${unimet})`}}
      >
        <div className={styles.contentTitle}>
          <h1>
            Conoce los tours de las obras de arte de la Universidad
            Metropolitana
          </h1>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </div>
        </div>
      </header>
      <section>
        <Divider>
          <h2>Próximos Tours</h2>
        </Divider>
        <div className={styles.tours}>
          {tours.data
            ? tours.data.map((data, key) => (
                <TourCard key={key} data={data} size="medium" />
              ))
            : "Cargando..."}
        </div>
      </section>
      <section>
        <Divider>
          <h2>Tour Populares</h2>
        </Divider>
        <div className={styles.tours}>
          {tours.data
            ? tours.data.map((data, key) => (
                <TourCard key={key} data={data} size="medium" />
              ))
            : "Cargando..."}
        </div>
      </section>
      <section>
        <Divider>
          <h2>Tour Nuevos</h2>
        </Divider>
        <div className={styles.tours}>
          {tours.data
            ? tours.data.map((data, key) => (
                <TourCard key={key} data={data} size="medium" />
              ))
            : "Cargando..."}
        </div>
      </section>
    </>
  );
}
