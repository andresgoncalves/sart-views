import styles from "./DropDownList.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLSelectElement> & {
 *   options?: array;
 *   labelText?: string;
 *   value?: string;
 * }} DropDownList
 */

/** @param {DropDownList} props */
export default function DropDownList({ labelText, options = [], ...props }) {
  return (
    <label className={styles.container}>
      <div className={styles.label}>{labelText}</div>
      <select className={styles.input} {...props}>
        <option value="" disabled>
          Seleccione...
        </option>
        {options.map((option, index) => (
          <option key={`${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
