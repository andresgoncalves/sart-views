import { Link } from "react-router-dom";
import { useFiles } from "../hooks/storage";
import styles from "./TourCard.module.scss";

/**
 * @typedef {{
 *   data: import("../controllers/tours").TourData;
 *   size?: "large" | "medium" | "base";
 *   target?: "details" | "reserve" | "admin";
 * }} TourCardProps
 */

/** @param {TourCardProps} props */
export default function TourCard({
  data: { id, name, description, department, images: imagePaths },
  size = "base",
  target = "details",
}) {
  const images = useFiles(imagePaths);
  return (
    <Link
      to={
        target === "admin"
          ? `/admin/tours/${id}`
          : target === "reserve"
          ? `/tours/${id}/reserve`
          : `/tours/${id}`
      }
      className={[styles.card, styles[size]].join(" ")}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${images[0]})` }}
      />
      <div className={styles.details}>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.location}>{department}</div>
      </div>
    </Link>
  );
}
