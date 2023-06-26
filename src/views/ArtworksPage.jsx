import { Helmet } from "react-helmet-async";
import bannerImage from "../assets/home-banner.png";
import ArtworkCard from "../components/ArtworkCard";
import Divider from "../components/Divider";
import { useArtworks, useCategories } from "../hooks/artworks";
import styles from "./ArtworksPage.module.scss";

export default function ArtworksPage() {
  // const artworks = [
  //   {
  //     title: "La Mona Lisa",
  //     author: "Leonardo Da Vinci",
  //     location: "Biblioteca Pedro Grases",
  //     id: "#",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
  //   },
  //   {
  //     title: "La Mona Lisa",
  //     author: "Leonardo Da Vinci",
  //     location: "Biblioteca Pedro Grases",
  //     id: "#",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
  //   },
  //   {
  //     title: "La Mona Lisa",
  //     author: "Leonardo Da Vinci",
  //     location: "Biblioteca Pedro Grases",
  //     id: "#",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
  //   },
  //   {
  //     title: "La Mona Lisa",
  //     author: "Leonardo Da Vinci",
  //     location: "Biblioteca Pedro Grases",
  //     id: "#",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
  //   },
  //   {
  //     title: "La Mona Lisa",
  //     author: "Leonardo Da Vinci",
  //     location: "Biblioteca Pedro Grases",
  //     id: "#",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
  //   },
  // ];

  const artworks = useArtworks();
  const categories = useCategories(artworks.data);

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
      <div className={styles.content}>
        {Object.entries(categories).map(
          (
            /**
             * @type {[
             *   string,
             *   import("../controllers/artworks").ArtworkData[]
             * ]}
             */
            [category, artworks]
          ) => (
            <section key={category} className={styles.section}>
              <Divider>
                <h2>{category}</h2>
              </Divider>
              <div className={styles.artworks}>
                {artworks.map((data, key) => (
                  <ArtworkCard key={key} data={data} size="medium" />
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </>
  );
}
