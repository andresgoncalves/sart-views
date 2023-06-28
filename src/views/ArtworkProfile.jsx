import { useParams } from "react-router-dom";
import ArtworksGrid from "../components/ArtworksGrid";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useArtwork, useArtworks } from "../hooks/artworks";
import { useFile } from "../hooks/storage";
import { useTours } from "../hooks/tours";
import styles from "./ArtworkProfile.module.scss";

export default function ArtworkProfile() {
  const { id } = useParams();
  const artwork = useArtwork(id);
  const artworks = useArtworks();
  const tours = useTours();
  const image = useFile(artwork.data?.images[0]);

  if (artwork.data == null) {
    return (
      <>
        <div className={styles.loading}>
          <Loader />
        </div>
      </>
    );
  } else {
    return (
      <>
        <section>
          <div className={styles.content}>
            <div className={styles.column1}>
              <img src={image} className={styles.image}></img>
            </div>
            <div className={styles.column2}>
              <div className={styles.artworkName}>{artwork.data.name}</div>
              <div className={styles.labelSubtitle}>Autor</div>
              <div className={styles.text}>{artwork.data.author}</div>
              <div className={styles.labelSubtitle}>Categoría</div>
              <div className={styles.text}>{artwork.data.category}</div>
              <div className={styles.labelSubtitle}>Descripción</div>
              <div className={styles.text}>{artwork.data.description}</div>
              <div className={styles.labelSubtitle}>Ubicación</div>
              <div className={styles.text}>{artwork.data.location}</div>
            </div>
          </div>
        </section>
        <section>
          <Divider>
            <div className={styles.textDivider}>Tours Relacionados</div>
          </Divider>
          <ToursGrid tours={tours.data} size="medium" />
        </section>
        <section>
          <Divider>
            <div className={styles.textDivider}>Obras Relacionadas</div>
          </Divider>
          <ArtworksGrid artworks={artworks.data} size="medium" />
        </section>
      </>
    );
  }
}
