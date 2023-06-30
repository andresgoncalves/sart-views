import styles from "./DropDownList.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLSelectElement> & {
 *   options?: array;
 *   labelText?: string;
 *   value?: string;
 *   negative?: boolean;
 * }} DropDownList
 */

/** @param {DropDownList} props */
export default function DropDownList({
  negative = false,
  labelText,
  options = [],
  ...props
}) {
  return (
    <label
      className={[styles.container, negative ? styles.negative : ""].join(" ")}
    >
      <div
        className={[styles.label, negative ? styles.negative : ""].join(" ")}
      >
        {labelText}
      </div>
      <select
        className={[styles.input, negative ? styles.negative : ""].join(" ")}
        {...props}
      >
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
