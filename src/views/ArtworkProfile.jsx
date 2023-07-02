import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { user, isLogged } = useAuth();
  const { id } = useParams();
  const artwork = useArtwork(id);
  const artworks = useArtworks();
  const tours = useTours();
  const image = useFile(artwork.data?.images[0]);
  const isFavorite = useMemo(
    () => user?.favoritesArtworks.includes(id) ?? null,
    [id, user]
  );
  const navigate = useNavigate();

  async function toggleFavorite() {
    if (user) {
      const exist = user.favoritesArtworks.includes(id);
      if (exist) {
        alert("Ya la obra forma parte de sus favoritos");
      } else {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          favoritesArtworks: arrayUnion(id),
        });
        alert("Obra agregada a sus favoritos");
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
      } else {
        await updateDoc(userRef, {
          favoritesArtworks: arrayUnion(id),
        });
      }
    } else if (isLogged === false) {
      navigate("/login");
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
          {artwork.data ? (
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
                  {isFavorite !== null ? (
                    <Button variant="text" onClick={toggleFavorite}>
                      {isFavorite === true
                        ? "Eliminar de favoritos"
                        : "Añadir a favoritos"}
                    </Button>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
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
