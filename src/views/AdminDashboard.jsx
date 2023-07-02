import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
import logo from "../assets/LogoSartViews.svg";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useArtworks } from "../hooks/artworks";
import { useReservations } from "../hooks/reservations";
import { useTours } from "../hooks/tours";
import { useUsers } from "../hooks/users";
import styles from "./AdminDashboard.module.scss";
import { useAuth } from "../contexts/AuthContext";
import ArtworksGrid from "../components/ArtworksGrid";
import { useUpcomingReservations } from "../hooks/reservations";
import DetailedToursGrid from "../components/DetailedToursGrid";


export default function AdminDashboard() {
  const tours = useTours();
  const users = useUsers(null);
  const { user } = useAuth();
  const artworksCount=useArtworks();
  const artworks = useArtworks(user?.favoritesArtworks || []);
  const reservations = useUpcomingReservations(9);
  const upcomingTours = useMemo(
    () => reservations.data?.map((reservation) => reservation.tour) || [],
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
                  reservations.data.filter((tour) => tour.status == "closed")
                    .length
                }
              </div>
            ) : (
              <Loader />
            )}
          </div>
          <div className={styles.contentTour}>
            <div className={styles.label}>Obras Registradas</div>
            {artworks.data ? (
              <div className={styles.info}>{artworks.data.length}</div>
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
            tours={tours.data}
            size="base"
          />
        </div>
        <div className={styles.nextTours}>
          <Button className={styles.create}>Crear Evento</Button>
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
              <ToursGrid tours={tours.data} fallback="No hay tours visitados" />
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.container}>
              <div className={styles.titleLabel}>Obras Destacadas</div>
              <Button>Agregar Obra</Button>
            </div>
            <div className={styles.tourContainer}>
              {artworks.data ? (
                <ArtworksGrid
                  artworks={artworks.data}
                  fallback="No hay obras destacadas"
                />
              ) : (
                <div><Loader></Loader></div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
