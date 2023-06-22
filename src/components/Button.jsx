import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement> &
 *   Partial<import("react-router-dom").LinkProps> & {
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
  return props.to ? (
    <Link
      className={[
        styles.button,
        styles[variant],
        styles[size],
        negative ? styles.negative : "",
      ].join(" ")}
      to={props.to || ""}
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
