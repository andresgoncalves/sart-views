import { Link } from "react-router-dom";
import { useFiles } from "../hooks/storage";
import styles from "./ArtworkCard.module.scss";

/**
 * @typedef {{
 *   data: import("../controllers/artworks").ArtworkData;
 *   size?: "large" | "medium" | "base";
 *   target?: "details" | "admin" | null;
 *   onClick?: (id: string) => void;
 * }} ArtworkCardProps
 */

/** @param {ArtworkCardProps} props */
export default function ArtworkCard({
  data: { id, name, author, department, images: imagePaths },
  size = "base",
  target = "details",
  onClick,
}) {
  const images = useFiles(imagePaths);
  return target ? (
    <Link
      to={target === "admin" ? `/admin/obras/${id}` : `/obras/${id}`}
      onClick={() => onClick && onClick(id)}
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
  ) : (
    <div
      onClick={() => onClick && onClick(id)}
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
    </div>
  );
}
