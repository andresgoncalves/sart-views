import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import logo from "../assets/LogoSartViews.svg";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import DetailedToursGrid from "../components/DetailedToursGrid";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useArtworks, useRecentArtworks } from "../hooks/artworks";
import { useReservations } from "../hooks/reservations";
import { useTours } from "../hooks/tours";
import { useUsers } from "../hooks/users";
import styles from "./AdminDashboard.module.scss";

export default function AdminDashboard() {
  const tours = useTours();
  const users = useUsers();
  const artworksCount = useArtworks();
  const artworks = useRecentArtworks(15);
  const reservations = useReservations();
  const upcomingTours = useMemo(
    () =>
      reservations.data
        ?.filter((reservation) => reservation.status !== "closed")
        .map((reservation) => reservation.tour) || [],
    [reservations.data]
  );
  const toursNext = useTours(upcomingTours);

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
                  reservations.data?.filter((tour) => tour.status === "closed")
                    .length
                }
              </div>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.contentTour}>
            <div className={styles.label}>Obras Registradas</div>
            {artworksCount.data ? (
              <div className={styles.info}>{artworksCount.data.length}</div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </section>
      <section>
        <Divider>
          <div className={styles.titleLabel}>Próximos Eventos</div>
        </Divider>
        <div className={styles.nextContainer}>
          <DetailedToursGrid
            tours={toursNext.data?.slice(0, 6)}
            size="base"
            target="admin"
          />
        </div>
      </section>
      <section>
        <Divider></Divider>
        <div className={styles.dataAdmin}>
          <div className={styles.column1}>
            <div className={styles.container}>
              <div className={styles.titleLabel}>Tours Populares</div>
              <Button>Agregar Tour</Button>
            </div>
            <div className={styles.tourContainer}>
              <ToursGrid
                target="admin"
                tours={tours.data?.slice(0, 8)}
                fallback="No hay tours registrados"
              />
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.container}>
              <div className={styles.titleLabel}>Obras Destacadas</div>
              <Button>Agregar Obra</Button>
            </div>
            <div className={styles.tourContainer}>
              <ArtworksGrid
                target="admin"
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
