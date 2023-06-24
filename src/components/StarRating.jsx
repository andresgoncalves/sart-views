import styles from "./StarRating.module.scss";

/** @typedef {number} StarRatingValue */

/**
 * @typedef {{
 *   value: StarRatingValue;
 *   onChange?: (value: StarRatingValue) => void;
 * }} StarRatingProps
 */

/** @param {StarRatingProps} props */
export default function StarRating({ value, onChange }) {
  const handleClick = (/** @type {number} */ value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={[styles.rating, !onChange ? styles.fixed : ""].join(" ")}>
      {new Array(5).fill(0).map((star, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => handleClick(starValue)}
            className={starValue <= value ? styles.on : styles.off}
            tabIndex={onChange ? 0 : undefined}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
