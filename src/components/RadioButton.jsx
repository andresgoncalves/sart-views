import styles from "./RadioButton.module.scss";

export default function RadioButton({ name, label, value, onChange }) {
  return (
    <label className={styles.container}>
      <input
        type="radio"
        name={name}
        value={label}
        className={styles.radio}
        onChange={onChange}
        checked={label == value}
      />
      <span>{label}</span>
    </label>
  );
}
