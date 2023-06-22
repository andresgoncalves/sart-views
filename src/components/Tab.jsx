import styles from "./Tab.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   children: React.ReactNode;
 * }} TabProps
 */

/** @param {TabProps} props */
export default function Tab({ children, ...props }) {
  return (
    <label className={styles.tab}>
      <input {...props} type="radio" />
      <div className={styles.label}>{children}</div>
    </label>
  );
}
