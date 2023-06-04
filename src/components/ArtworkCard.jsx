import { Link } from "react-router-dom";
import styles from "./ArtworkCard.module.scss";

/**
 * @typedef {{
 *   href: string;
 *   title: string;
 *   author: string;
 *   location: string;
 *   image: string;
 *   size?: "large" | "medium" | "base";
 * }} ArtworkCardProps
 */

/** @param {ArtworkCardProps} props */
export default function ArtworkCard({
  href,
  title,
  author,
  location,
  image,
  size = "base",
}) {
  return (
    <Link to={href} className={[styles.card, styles[size]].join(" ")}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.details}>
        <div className={styles.author}>{author}</div>
        <div className={styles.location}>{location}</div>
      </div>
    </Link>
  );
}
