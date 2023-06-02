import styles from "./Button.module.scss";

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> & {
 *   variant?: "filled" | "outlined" | "text";
 *   size?: "large" | "medium" | "base" | "small";
 *   negative?: boolean;
 * }} ButtonProps
 */

/** @param {ButtonProps} props */
export default function Button({
  variant = "filled",
  size = "base",
  negative = false,
  ...props
}) {
  return (
    <button
      className={[
        styles.button,
        styles[variant],
        styles[size],
        negative ? styles.negative : "",
      ].join(" ")}
      {...props}
    />
  );
}
