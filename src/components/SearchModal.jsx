import { useMemo, useState } from "react";
import { useArtworks } from "../hooks/artworks";
import ArtworksGrid from "./ArtworksGrid";
import Button from "./Button";
import SearchField from "./SearchField";
import styles from "./SearchModal.module.scss";

/** @param {string} text */
const removeAccents = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * @typedef {{
 *   closeModal: () => void;
 *   onSubmit: (artworks: string[]) => void;
 *   exclude?: string[];
 * }} SearchModalProps
 */

/** @param {SearchModalProps} props */
export default function SearchModal({ closeModal, onSubmit, exclude = [] }) {
  const artworks = useArtworks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtworks, setSelectedArtworks] = useState([]);

  const results = useMemo(
    () =>
      artworks.data?.filter(
        (artwork) =>
          removeAccents(artwork.name.toLowerCase()).includes(
            removeAccents(searchQuery.toLowerCase())
          ) && !exclude.includes(artwork.id)
      ) || [],
    [artworks.data, exclude, searchQuery]
  );

  const handleSelect = (/** @type {string} */ id) => {
    setSelectedArtworks((artworks) =>
      artworks.includes(id)
        ? artworks.filter((artwork) => artwork !== id)
        : [...artworks, id]
    );
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <div className={styles.modalsearch}>
            <SearchField placeholder="Buscar" action={setSearchQuery} />
          </div>
          <div className={styles.modalresults}>
            <ArtworksGrid
              artworks={results}
              target={null}
              onClick={handleSelect}
            />
          </div>
          <div className={styles.modalbuttons}>
            <Button
              onClick={() => {
                setSelectedArtworks([]);
                closeModal();
              }}
              variant="text"
              size="base"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => onSubmit(selectedArtworks)}
              variant="filled"
              size="base"
            >
              Añadir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
