import ArtworkCard from "./ArtworkCard";
import styles from "./ArtworksGrid.module.scss";

/**
 * @typedef {{
 *   artworks: import("../controllers/artworks").ArtworkData[];
 *   size?: import("./ArtworkCard").ArtworkCardProps["size"];
 *   target?: import("./ArtworkCard").ArtworkCardProps["target"];
 * }} ArtworksGridProps
 */

/** @param {ArtworksGridProps} props */
export default function ArtworksGrid({ artworks, size, target }) {
  return (
    <div className={styles.grid}>
      {artworks.map((data, key) => (
        <ArtworkCard key={key} data={data} size={size} target={target} />
      ))}
    </div>
  );
}
