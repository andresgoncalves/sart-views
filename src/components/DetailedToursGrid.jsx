import DetailedTourCard from "./DetailedTourCard";
import styles from "./DetailedToursGrid.module.scss";
import Loader from "./Loader";

/**
 * @typedef {{
 *   tours: (import("../controllers/tours").TourData & {
 *     status?: import("./DetailedTourCard").DetailedTourCardProps["status"];
 *   })[];
 *   target?: import("./DetailedTourCard").DetailedTourCardProps["target"];
 *   size?: import("./DetailedTourCard").DetailedTourCardProps["size"];
 *   loader?: React.ReactNode;
 *   fallback?: React.ReactNode;
 * }}
 *   DetailedToursGridProps
 */

/** @param {DetailedToursGridProps} props */
export default function DetailedToursGrid({
  tours,
  size = "base",
  target = "details",
  loader = <Loader />,
  fallback,
}) {
  return (
    <div className={[styles.grid, styles[size]].join(" ")}>
      {tours ? (
        tours.length > 0 ? (
          tours.map(({ status, ...data }, key) => (
            <DetailedTourCard
              key={key}
              data={data}
              status={status}
              target={target}
              size={size}
            />
          ))
        ) : (
          <div className={styles.fallback}>{fallback}</div>
        )
      ) : (
        loader
      )}
    </div>
  );
}
