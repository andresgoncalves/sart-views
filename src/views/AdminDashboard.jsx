import { Helmet } from "react-helmet-async";
import logo from "../assets/LogoSartViews.svg";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import DetailedToursGrid from "../components/DetailedToursGrid";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useArtworks } from "../hooks/artworks";
import { useUpcomingReservations } from "../hooks/reservations";
import { useTours } from "../hooks/tours";
import { useUsers } from "../hooks/users";
import styles from "./AdminDashboard.module.scss";

export default function AdminDashboard() {
  const tours = useTours();
  const artworks = useArtworks();
  const users = useUsers();
  const reservations = useUpcomingReservations(6);

  return (
    <>
      <AdminDashboardHeader></AdminDashboardHeader>
      <Helmet title="Perfil Admin"></Helmet>
      <section className={styles.data}>
        <div className={styles.logoContainer}>
          {<img src={logo} className={styles.logoSart} />}
        </div>
        <div className={styles.dataPage}>
          <div className={styles.contentBox}>
            <div className={styles.label}>Visitantes Totales</div>
            {users.data ? (
              <div className={styles.info}>{users.data.length}</div>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.contentTour}>
            <div className={styles.label}>Tours Realizados</div>
            {reservations.data ? (
              <div className={styles.info}>
                {
                  reservations.data.filter((tour) => tour.status == "closed")
                    .length
                }
              </div>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.contentBox}>
            <div className={styles.label}>Fondos Recaudados</div>
          </div>
        </div>
      </section>
      <section>
        <Divider>
          <div className={styles.titleLabel}>Próximos Eventos</div>
        </Divider>
        <div className={styles.tourContainer}>
          <DetailedToursGrid
            tours={tours.data?.slice(0, 6).map((tour) => ({
              ...tour,
              status: "unavailable",
            }))}
            fallback="No hay tours registrados"
          />
        </div>
      </section>
      <section>
        <div className={styles.dataAdmin}>
          <div className={styles.column}>
            <div className={styles.container}>
              <div className={styles.titleLabel}>Tours populares</div>
              <Button href="/admin/tours/crear">Agregar Tour</Button>
            </div>
            <div className={styles.tourContainer}>
              <ToursGrid
                tours={tours.data?.slice(0, 8)}
                fallback="No hay tours registrados"
              />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.container}>
              <div className={styles.titleLabel}>Obras destacadas</div>
              <Button href="/admin/obras/crear">Agregar Obra</Button>
            </div>
            <div className={styles.tourContainer}>
              <ArtworksGrid
                artworks={artworks.data?.slice(0, 12)}
                fallback="No hay obras registradas"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
