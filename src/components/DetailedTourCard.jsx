import Button from "./Button";
import styles from "./DetailedTourCard.module.scss";
import StarRating from "./StarRating";

/**
 * @typedef {{
 *   id: string;
 *   title: string;
 *   description: string;
 *   rating: number;
 *   location: string;
 *   image: string;
 *   status?: "available" | "unavailable" | "reserved" | "visited";
 *   size?: "large" | "base" | "small";
 * }} DetailedTourCardProps
 */

/** @param {DetailedTourCardProps} props */
export default function DetailedTourCard({
  id,
  title,
  description,
  rating,
  location,
  image,
  status = "available",
  size = "base",
}) {
  return (
    <div className={[styles.card, styles[size]].join(" ")}>
      <img className={styles.image} src={image} alt="" />
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.title}>{title}</div>
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
