import Button from "../components/Button";
import TourCard from "../components/TourCard";
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
          <div className={styles.tours}>
            {tours.data.map((data, key) => (
              <TourCard key={key} data={data} size="medium" target="admin" />
            ))}
          </div>
        </section>
      </div>
    ) : (
      <div>
        <div>No hay tours registradas</div>
        <Button href="/admin/tours/crear">Agregar tour</Button>
      </div>
    )
  ) : (
    "Cargando"
  );
}
