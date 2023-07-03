import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import salaMendozaImage from "../assets/SalaMendoza.jpg";
import ArtesaniaImage from "../assets/SalaMendozaArtesania.jpg";
import bannerImage from "../assets/home-banner.png";
import missionImage from "../assets/home-mission.png";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import Divider from "../components/Divider";
import ToursGrid from "../components/ToursGrid";
import { useAuth } from "../contexts/AuthContext";
import { useRecentArtworks } from "../hooks/artworks";
import { useUpcomingReservations } from "../hooks/reservations";
import { useTours } from "../hooks/tours";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const { user, isLogged } = useAuth();
  const artworks = useRecentArtworks(14);
  const reservations = useUpcomingReservations(9);
  const upcomingTours = useMemo(
    () => reservations.data?.map((reservation) => reservation.tour) || [],
    [reservations.data]
  );
  const tours = useTours(upcomingTours);

  return (
    <>
      <Helmet title="Inicio" />
      <header
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className={styles.bannerContent}>
          <h1>Vive la experiencia SartView</h1>
          <p>
            Bienvenido a SartViews! en este website podrás conocer lo más
            relevante sobre las obras de arte integradas a la Unimet. Así mismo,
            podrás realizar reservas para paseos guiados en referencia a estas
            obras y muchas cosas más!
          </p>
          {isLogged ? (
            <Button href="/tours" size="large">
              Empieza ahora
            </Button>
          ) : (
            <Button href="/login" size="large">
              Empieza ahora
            </Button>
          )}
        </div>
      </header>
      <section>
        <Divider>
          <h2>SOBRE NOSOTROS</h2>
        </Divider>
        <div className={styles.aboutUs}>
          <div className={styles.group}>
            <div className={styles.image}>
              <img src={missionImage} alt="" />
            </div>
            <div className={styles.content}>
              <h3>Nuestra misión</h3>
              <p>
                Ofrecer un servicio de recorridos guíados por las distintas
                obras de arte expuestas en la Universidad Metropolitana.
              </p>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.image}>
              <img src={ArtesaniaImage} alt="" />
            </div>
            <div className={styles.content}>
              <h3>Nuestra visión</h3>
              <p>
                Fomentar el interés por las obras de arte expuestas en la
                Universidad Metropolitana.
              </p>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.image}>
              <img src={salaMendozaImage} alt="" />
            </div>
            <div className={styles.content}>
              <h3>Nuestro objetivo</h3>
              <p>
                Incentivar a todas los estudiantes y profesores de la
                Universidad Metropoltiana, a conocer las obras de arte expuestas
                en el campus, así como ofrecerles un sistema de recorridos
                guiados, para que puedan conocer su historia y característcias
                importantes
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Divider>
          <h2>DESCUBRE NUESTROS TOURS</h2>
        </Divider>
        <ToursGrid
          tours={tours.data}
          size="medium"
          more={
            <Button href="/admin/tours" variant="text" size="medium">
              Ver todos los tours
            </Button>
          }
        />
      </section>
      <section>
        <Divider>
          <h2>CONOCE NUESTRAS OBRAS</h2>
        </Divider>
        <ArtworksGrid
          artworks={artworks.data}
          size="medium"
          more={
            <Button href="/admin/obras" variant="text" size="medium">
              Ver todas las obras
            </Button>
          }
        />
      </section>
    </>
  );
}
