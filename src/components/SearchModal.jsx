// SearchModal.jsx
import styles from "./SearchModal.module.scss";
import SearchField from "./SearchField";
import Button from "./Button";
import Divider from "./Divider";
import { useMemo, useState } from "react";
import ArtworkCard from "./ArtworkCard";
import { useArtworks } from "../hooks/artworks";

export default function SearchModal({ closeModal }) {
  const artworks = useArtworks();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  useMemo(() => {
    if (searchQuery === "") {
      const randomArtworks = artworks?.data?.sort(() => Math.random() - 0.5).slice(0, 4);
      setFilteredArtworks(randomArtworks);
    } else {
      const filteredArtworks = artworks?.data?.filter(
        (artwork) =>
          artwork.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArtworks(filteredArtworks?.slice(0, 4));
    }
  }, [artworks?.data, searchQuery]);

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <div className={styles.modalsearch}>
            <SearchField placeholder="Buscar" action={setSearchQuery} />
          </div>
          <div className={styles.modalresults}>
            {filteredArtworks?.map((artwork, index) => (
              <ArtworkCard key={index} data={artwork} />
            ))}
          </div>
          <div className={styles.modalbuttons}>
            <Button onClick={() => closeModal()} variant="text" size="base">
              Cancelar
            </Button>
            <Button onClick={() => closeModal()} variant="filled" size="base">
              Añadir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


  