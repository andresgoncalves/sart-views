import { Helmet } from "react-helmet-async";
import bannerImage from "../assets/home-banner.png";
import missionImage from "../assets/home-mission.png";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import Divider from "../components/Divider";
import TourCard from "../components/TourCard";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const artworks = [
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
  ];

  const tours = [
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      href: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
  ];

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
          <Button href="#" size="large">
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
          {tours.map((data, index) => (
            <TourCard key={index} size="medium" {...data} />
          ))}
        </div>
      </section>
      <section>
        <Divider>
          <h2>CONOCE NUESTRAS OBRAS</h2>
        </Divider>
        <div className={styles.artworks}>
          {artworks.map((data, index) => (
            <ArtworkCard key={index} size="medium" {...data} />
          ))}
        </div>
      </section>
    </>
  );
}
