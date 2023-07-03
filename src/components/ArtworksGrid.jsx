import ArtworkCard from "./ArtworkCard";
import styles from "./ArtworksGrid.module.scss";
import Loader from "./Loader";

/**
 * @typedef {{
 *   artworks: import("../controllers/artworks").ArtworkData[];
 *   size?: import("./ArtworkCard").ArtworkCardProps["size"];
 *   target?: import("./ArtworkCard").ArtworkCardProps["target"];
 *   onClick?: import("./ArtworkCard").ArtworkCardProps["onClick"];
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
  onClick,
  loader = <Loader />,
  fallback,
  more,
}) {
  return (
    <div className={[styles.grid, styles[size]].join(" ")}>
      {artworks ? (
        artworks.length > 0 ? (
          <>
            {artworks.map((data) => (
              <ArtworkCard
                key={data.id}
                data={data}
                size={size}
                target={target}
                onClick={onClick}
              />
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
