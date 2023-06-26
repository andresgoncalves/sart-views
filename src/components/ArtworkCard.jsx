import { Link } from "react-router-dom";
import { useFiles } from "../hooks/storage";
import styles from "./ArtworkCard.module.scss";

/**
 * @typedef {{
 *   data: import("../controllers/artworks").ArtworkData;
 *   size?: "large" | "medium" | "base";
 *   target?: "details" | "admin";
 * }} ArtworkCardProps
 */

/** @param {ArtworkCardProps} props */
export default function ArtworkCard({
  data: { id, name, author, department, images: imagePaths },
  size = "base",
  target = "details",
}) {
  const images = useFiles(imagePaths);
  return (
    <Link
      to={target === "admin" ? `/admin/obras/${id}` : `/obras/${id}`}
      className={[styles.card, styles[size]].join(" ")}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${images[0]})` }}
      />
      <div className={styles.title}>{name}</div>
      <div className={styles.details}>
        <div className={styles.author}>{author}</div>
        <div className={styles.location}>{department}</div>
      </div>
    </Link>
  );
}
