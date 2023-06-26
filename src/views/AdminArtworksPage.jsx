import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import { useArtworks, useCategories } from "../hooks/artworks";
import styles from "./AdminArtworksPage.module.scss";

export default function AdminArtworksPage() {
  const artworks = useArtworks();
  const categories = useCategories(artworks.data);

  return artworks.data ? (
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
                {artworks.map((data, key) => (
                  <ArtworkCard
                    key={key}
                    data={data}
                    size="medium"
                    target="admin"
                  />
                ))}
              </div>
            </section>
          )
        )}
      </div>
    ) : (
      <div>
        <div>No hay obras registradas</div>
        <Button href="/admin/obras/crear">Agregar obra</Button>
      </div>
    )
  ) : (
    "Cargando"
  );
}
