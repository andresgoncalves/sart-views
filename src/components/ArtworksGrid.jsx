import ArtworkCard from "./ArtworkCard";
import styles from "./ArtworksGrid.module.scss";
import Loader from "./Loader";

/**
 * @typedef {{
 *   artworks: import("../controllers/artworks").ArtworkData[];
 *   size?: import("./ArtworkCard").ArtworkCardProps["size"];
 *   target?: import("./ArtworkCard").ArtworkCardProps["target"];
 *   loader?: React.ReactNode;
 *   fallback?: React.ReactNode;
 *   more?: React.ReactNode;
 * }} ArtworksGridProps
 */

/** @param {ArtworksGridProps} props */
export default function ArtworksGrid({
  artworks,
  size = "base",
  target,
  loader = <Loader />,
  fallback,
  more,
}) {
  return (
    <div className={[styles.grid, styles[size]].join(" ")}>
      {artworks ? (
        artworks.length > 0 ? (
          <>
            {artworks.map((data, key) => (
              <ArtworkCard key={key} data={data} size={size} target={target} />
            ))}
            {more}
          </>
        ) : (
          fallback
        )
      ) : (
        loader
      )}
    </div>
  );
}
