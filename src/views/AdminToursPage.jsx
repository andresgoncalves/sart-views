import Button from "../components/Button";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useTours } from "../hooks/tours";
import styles from "./AdminToursPage.module.scss";

export default function AdminToursPage() {
  const tours = useTours();

  return tours.data ? (
    tours.data.length > 0 ? (
      <div>
        <section className={styles.section}>
          <div className={styles.heading}>
            <h2>Tours</h2>
            <Button href="/admin/tours/crear">Agregar tour</Button>
          </div>
          <ToursGrid tours={tours.data} size="medium" target="admin" />
        </section>
      </div>
    ) : (
      <div>
        <div>No hay tours registradas</div>
        <Button href="/admin/tours/crear">Agregar tour</Button>
      </div>
    )
  ) : (
    <div className={styles.loaderContainer}>
      <Loader></Loader>
    </div>
  );
}
