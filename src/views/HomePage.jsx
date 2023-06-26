import { Helmet } from "react-helmet-async";
import bannerImage from "../assets/home-banner.png";
import missionImage from "../assets/home-mission.png";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import Divider from "../components/Divider";
import TourCard from "../components/TourCard";
import { useArtworks } from "../hooks/artworks";
import { useTours } from "../hooks/tours";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const artworks = useArtworks();
  const tours = useTours();

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <Button href="login" size="large">
            Empieza ahora
          </Button>
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
              <img src={missionImage} alt="" />
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
              <img src={missionImage} alt="" />
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
          <h2>CONOCE NUESTRAS OBRAS</h2>
        </Divider>
        <div className={styles.artworks}>
          {artworks.data
            ? artworks.data.map((data, key) => (
                <ArtworkCard key={key} data={data} size="medium" />
              ))
            : "Cargando..."}
        </div>
      </section>
    </>
  );
}
