import { Helmet } from "react-helmet-async";
import unimet from "../assets/unimet.jpg";
import Divider from "../components/Divider";
import ToursGrid from "../components/ToursGrid";
import { useTours } from "../hooks/tours";
import styles from "./ToursPage.module.scss";

export default function ToursPage() {
  const tours = useTours();

  return (
    <>
      <Helmet title="Obras"></Helmet>
      <header
        className={styles.banner}
        style={{ backgroundImage: `url(${unimet})` }}
      >
        <div className={styles.contentTitle}>
          <h1>
            Conoce los tours de las obras de arte de la Universidad
            Metropolitana
          </h1>
          <div className={styles.description}>
            En este apartado, se encuentran todos los tours ofertados hacia los
            clientes. Al hacer click en alguno de ellos se puede visualizar más
            información acerca de los mismo, así como realizar reservaciones
            respectivas
          </div>
        </div>
      </header>
      <section>
        <Divider>
          <h2>Próximos Tours</h2>
        </Divider>
        <ToursGrid
          tours={tours.data}
          size="medium"
          fallback="No hay eventos próximos"
        />
      </section>
      <section>
        <Divider>
          <h2>Tour Populares</h2>
        </Divider>
        <ToursGrid tours={tours.data} size="medium" />
      </section>
      <section>
        <Divider>
          <h2>Tour Nuevos</h2>
        </Divider>
        <ToursGrid
          tours={tours.data}
          size="medium"
          fallback="No hay tours nuevos"
        />
      </section>
    </>
  );
}
