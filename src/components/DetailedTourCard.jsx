import { useFiles } from "../hooks/storage";
import Button from "./Button";
import styles from "./DetailedTourCard.module.scss";
import StarRating from "./StarRating";

/**
 * @typedef {{
 *   data: import("../controllers/tours").TourData;
 *   status?: "available" | "unavailable" | "reserved" | "visited";
 *   size?: "large" | "base" | "small";
 * }} DetailedTourCardProps
 */

/** @param {DetailedTourCardProps} props */
export default function DetailedTourCard({
  data: { id, name, description, location, images: imagePaths, rating },
  status = "available",
  size = "base",
}) {
  const images = useFiles(imagePaths);
  return (
    <div className={[styles.card, styles[size]].join(" ")}>
      <img className={styles.image} src={images[0]} alt="" />
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.title}>{name}</div>
          <div>{description}</div>
          <StarRating value={rating} />
        </div>
        <div className={styles.location}>{location}</div>
        <div className={styles.buttons}>
          <Button
            href={`/tours/${id}`}
            variant="text"
            size={size === "small" ? "small" : "base"}
          >
            Detalles
          </Button>
          <Button
            href={`/tours/${id}/reservar`}
            size={size === "small" ? "small" : "base"}
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
}
