import { useEffect, useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import { useArtworks, useCategories } from "../hooks/artworks";
import { useStorage } from "../hooks/storage";
import styles from "./AdminArtworksPage.module.scss";

export default function AdminArtworksPage() {
  const storage = useStorage();
  const artworks = useArtworks();
  const categories = useCategories(artworks.data);

  const [images, setImages] = useState({});

  useEffect(() => {
    if (artworks.data) {
      for (const artwork of artworks.data) {
        if (artwork.images.length > 0) {
          storage
            .get(artwork.images[0])
            .then((image) =>
              setImages((images) => ({ ...images, [artwork.images[0]]: image }))
            );
        }
      }
    }
  }, [storage, artworks.data]);

  return categories ? (
    Object.keys(categories).length > 0 ? (
      <div>
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
              <div className={styles.heading}>
                <h2>{category}</h2>
                <Button href="/admin/obras/crear">Agregar obra</Button>
              </div>
              <div className={styles.artworks}>
                {artworks.map(
                  ({ id, name, images: artworkImages, ...artwork }, key) => (
                    <ArtworkCard
                      key={key}
                      size="medium"
                      href={`/admin/obras/${id}`}
                      title={name}
                      image={images[artworkImages[0]]}
                      {...artwork}
                    />
                  )
                )}
              </div>
            </section>
          )
        )}
      </div>
    ) : (
      <div>
        <div>No hay obras registradas</div>
        <Button href="/admin/obras/crear">Agregar obra</Button>{" "}
      </div>
    )
  ) : (
    "Cargando"
  );
}
