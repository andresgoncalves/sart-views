import { Link } from "react-router-dom";
import styles from "./TourCard.module.scss";

/**
 * @typedef {{
 *   id: string;
 *   title: string;
 *   description: string;
 *   location: string;
 *   image: string;
 *   size?: "large" | "medium" | "base";
 * }} TourCardProps
 */

/** @param {TourCardProps} props */
export default function TourCard({
  id,
  title,
  description,
  location,
  image,
  size = "base",
}) {
  return (
    <Link to={`/tours/${id}`} className={[styles.card, styles[size]].join(" ")}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.location}>{location}</div>
      </div>
    </Link>
  );
}
