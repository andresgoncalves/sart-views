import { Helmet } from "react-helmet-async";
import obrasBack from "../assets/obrasBack.jpg";
import ArtworksGrid from "../components/ArtworksGrid";
import Divider from "../components/Divider";
import { useArtworks, useCategories } from "../hooks/artworks";
import styles from "./ArtworksPage.module.scss";

export default function ArtworksPage() {
  const artworks = useArtworks();
  const categories = useCategories(artworks.data);

  return (
    <>
      <Helmet title="Obras"></Helmet>
      <header
        className={styles.banner}
        style={{ backgroundImage: `url(${obrasBack})` }}
      >
        <div className={styles.contentTitle}>
          <h1>Conoce las obras de arte de la Universidad Metropolitana</h1>
          <div className={styles.description}>
            A continuación se encuentran todas las obras de la Unimet
            registradas en el sistema. Al hacer click sobre alguna de ellas se
            visualizan sus características más importantes.
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
              <ArtworksGrid artworks={artworks} size="medium" />
            </section>
          )
        )}
      </div>
    </>
  );
}
