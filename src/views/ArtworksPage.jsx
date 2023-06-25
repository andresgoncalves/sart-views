import { Helmet } from "react-helmet-async";
import bannerImage from "../assets/home-banner.png";
import ArtworkCard from "../components/ArtworkCard";
import styles from "./ArtworksPage.module.scss";
import Divider from "../components/Divider";

export default function ArtworksPage() {
  const artworks = [
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
  ];
  return (
    <>
      <Helmet title="Obras"></Helmet>
      <header
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className={styles.contentTitle}>
          <h1>Conoce las obras de arte de la Universidad Metropolitana</h1>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </div>
        </div>
      </header>
      <section>
        <Divider>
          <h2>Pinturas</h2>
        </Divider>
        <div className={styles.artworks}>
          {artworks.map((data, index) => (
            <ArtworkCard key={index} size="medium" {...data} />
          ))}
        </div>
      </section>
      <section>
        <Divider><h2>Esculturas</h2></Divider>
        <div className={styles.artworks}>
          {artworks.map((data, index) => (
            <ArtworkCard key={index} size="medium" {...data} />
          ))}
        </div>
      </section>
      <section>
        <Divider><h2>Departamento de Cultura</h2></Divider>
        <div className={styles.artworks}>
          {artworks.map((data, index) => (
            <ArtworkCard key={index} size="medium" {...data} />
          ))}
        </div>
      </section>
      <section>
        <Divider><h2>Biblioteca Pedro Grases</h2></Divider>
        <div className={styles.artworks}>
          {artworks.map((data, index) => (
            <ArtworkCard key={index} size="medium" {...data} />
          ))}
        </div>
      </section>
    </>
  );
}
