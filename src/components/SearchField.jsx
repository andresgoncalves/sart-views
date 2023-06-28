import styles from "./SearchField.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> &
 *   React.ButtonHTMLAttributes<HTMLInputElement> & {
 *     action?: React.MouseEventHandler<HTMLButtonElement>;
 *     negative?: boolean;
 *   }} SearchFieldProps
 */

/** @param {SearchFieldProps} props */
export default function SearchField({ action, negative = false, ...props }) {
  return (
    <div
      className={[styles.container, negative ? styles.negative : ""].join(" ")}
    >
      <input
        type="search"
        className={styles.input}
        placeholder="Buscar"
        {...props}
      />
      <button className={styles.button} onClick={action}>
        Buscar
      </button>
    </div>
  );
}
