import styles from "./TextField.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> & {
 *   negative?: boolean;
 *   labelText?: string;
 * }} TextFieldProps
 */

/** @param {TextFieldProps} props */
export default function TextField({
  labelText,
  negative = false,
  className,
  ...props
}) {
  return (
    <label
      className={[
        styles.container,
        negative ? styles.negative : "",
        className || "",
      ].join(" ")}
    >
      {labelText && <div className={styles.label}>{labelText}</div>}
      <input
        className={[styles.input, negative ? styles.negative : ""].join(" ")}
        {...props}
      />
    </label>
  );
}
