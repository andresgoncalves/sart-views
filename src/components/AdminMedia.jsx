import styles from "./AdminMedia.module.scss";

/**
 * @typedef {{
 *   title: string;
 *   media: React.ReactNode;
 *   actions: React.ReactNode;
 * }} AdminMediaProps
 */

/** @param {AdminMediaProps} props */
export default function AdminMedia({ title, media, actions }) {
  return (
    <div className={styles.editor}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.media}>{media}</div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
