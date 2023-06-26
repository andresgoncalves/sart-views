import { useEffect, useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import { useArtworks } from "../hooks/artworks";

export default function AdminArtworksPage() {
  const artworks = useArtworks();

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (artworks.data) {
      /**
       * @type {Record<
       *   string,
       *   import("../controllers/artworks").ArtworkData[]
       * >}
       */
      const categories = {};
      for (const artwork of artworks.data) {
        if (categories[artwork.category]) {
          categories[artwork.category].push(artwork);
        } else {
          categories[artwork.category] = [artwork];
        }
      }
      setCategories(categories);
    }
  }, [artworks.data]);

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
            <div key={category}>
              <div>
                <h2>Pinturas</h2>
                <Button>Agregar obra</Button>
              </div>
              <div>
                {artworks.map(({ id, name, ...artwork }, key) => (
                  <ArtworkCard
                    key={key}
                    href={`/admin/obras/${id}`}
                    title={name}
                    {...artwork}
                  />
                ))}
              </div>
            </div>
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
