import styles from "./Button.module.scss";

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> &
 *   React.AnchorHTMLAttributes<HTMLAnchorElement> & {
 *     variant?: "filled" | "outlined" | "text";
 *     size?: "large" | "medium" | "base" | "small";
 *     negative?: boolean;
 *   }} ButtonProps
 */

/** @param {ButtonProps} props */
export default function Button({
  variant = "filled",
  size = "base",
  negative = false,
  ...props
}) {
  return props.href ? (
    <a
      className={[
        styles.button,
        styles[variant],
        styles[size],
        negative ? styles.negative : "",
      ].join(" ")}
      {...props}
    />
  ) : (
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
