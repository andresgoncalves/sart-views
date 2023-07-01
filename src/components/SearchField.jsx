import { useState } from "react";
import styles from "./SearchField.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *     action?: (searchQuery: string) => void;
 *     negative?: boolean;
 *   }} SearchFieldProps
 */

/** @param {SearchFieldProps} props */
export default function SearchField({ action, negative = false, ...props }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (action) {
      action(inputValue);
    }
  };

  return (
    <div
      className={[styles.container, negative ? styles.negative : ""].join(" ")}
    >
      <input
        type="search"
        className={styles.input}
        placeholder="Buscar"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        {...props}
      />
      <button className={styles.button} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

