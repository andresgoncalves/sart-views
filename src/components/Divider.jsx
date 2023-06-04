import styles from "./Divider.module.scss";

/**
 * @typedef {{
 *   children?: React.ReactNode;
 * }} DividerProps
 */

/** @param {DividerProps} props */
export default function Divider({ children }) {
  return children ? (
    <div className={styles.divider}>
      <hr />
      {children}
      <hr />
    </div>
  ) : (
    <div className={styles.divider}>
      <hr />
    </div>
  );
}
