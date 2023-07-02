import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useArtwork, useArtworks } from "../hooks/artworks";
import { useFile } from "../hooks/storage";
import { useTours } from "../hooks/tours";
import styles from "./ArtworkProfile.module.scss";

export default function ArtworkProfile() {
  const { user } = useAuth();
  const { id } = useParams();
  const artwork = useArtwork(id);
  const artworks = useArtworks();
  const tours = useTours();
  const image = useFile(artwork.data?.images[0]);

  async function addingFavorites() {
    if (user) {
      const exist = user.favoritesArtworks.includes(id);
      if (exist) {
        alert("Ya la pelicula forma parte de sus favoritos");
      } else {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          favoritesArtworks: arrayUnion(id),
        });
        alert("Pelicula agregada a sus favoritos");
        user.favoritesArtworks.push(id);
      }
      console.log(user);
    } else {
      alert("Debe registrarse para usar esta funcion");
    }
  }

  async function removeFavorites() {
    if (user) {
      const exist = user.favoritesArtworks.includes(id);
      if (exist) {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          favoritesArtworks: arrayRemove(id),
        });
        alert("Pelicula eliminada de sus favoritos");
      } else {
        alert("La pelicula no forma parte de sus favoritos");
      }
      console.log(user);
    } else {
      alert("Debe registrarse para usar esta funcion");
    }
  }

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
              <div className={styles.buttonContainer}>
                <Button
                  variant="outlined"
                  onClick={addingFavorites}
                  size="small"
                >
                  Añadir a favoritos
                </Button>
                <Button onClick={removeFavorites} size="small">
                  Eliminar de favoritos
                </Button>
              </div>
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
