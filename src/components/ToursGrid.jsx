import Loader from "./Loader";
import TourCard from "./TourCard";
import styles from "./ToursGrid.module.scss";

/**
 * @typedef {{
 *   tours: import("../controllers/tours").TourData[];
 *   size?: import("./TourCard").TourCardProps["size"];
 *   target?: import("./TourCard").TourCardProps["target"];
 *   loader?: React.ReactNode;
 *   fallback?: React.ReactNode;
 *   more?: React.ReactNode;
 * }} ToursGridProps
 */

/** @param {ToursGridProps} props */
export default function ToursGrid({
  tours,
  size = "base",
  target,
  loader = (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ),
  fallback,
  more,
}) {
  return (
    <div className={[styles.grid, styles[size]].join(" ")}>
      {tours ? (
        tours.length > 0 ? (
          <>
            {tours.map((data) => (
              <TourCard key={data.id} data={data} size={size} target={target} />
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
