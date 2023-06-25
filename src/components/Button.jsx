import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> &
 *   React.AnchorHTMLAttributes<HTMLAnchorElement> & {
 *     href?: string;
 *     variant?: "filled" | "outlined" | "text";
 *     size?: "large" | "medium" | "base" | "small";
 *     negative?: boolean;
 *   }} ButtonProps
 */

/** @param {ButtonProps} props */
export default function Button({
  href,
  variant = "filled",
  size = "base",
  negative = false,
  className = "",
  ...props
}) {
  return href ? (
    <Link
      to={href}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        negative ? styles.negative : "",
        className,
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
        className,
      ].join(" ")}
      {...props}
    />
  );
}
