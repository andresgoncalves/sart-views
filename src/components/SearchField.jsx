import { useState } from "react";
import styles from "./SearchField.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> &
 *   React.ButtonHTMLAttributes<HTMLInputElement> & {
 *     negative?: boolean;
 *     placeholder?: string;
 *     value?: string;
 *     onChange?: function;
 *   }} SearchFieldProps
 */

/** @param {SearchFieldProps} props */
export default function SearchField({
  placeholder,
  value,
  negative = false,
  ...props
}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={[styles.container, negative ? styles.negative : ""].join(" ")}
    >
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar"
        value={searchValue}
        onChange={(ev) => setSearchValue(ev.target.value)}
      />
      <button className={styles.button}>Buscar</button>
    </div>
  );
}
