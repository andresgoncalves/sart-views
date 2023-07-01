import styles from "./HourSelector.module.scss";

/**
 * @typedef {{
 *   availableHours?: string[];
 *   hour?: string;
 *   onChange?: (hour: string) => void;
 * }} HourSelectorProps
 */

/** @param {HourSelectorProps} props */
export default function HourSelector({
  availableHours,
  hour: selectedHour,
  onChange,
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      {availableHours.length > 0 ? (
        <div className={styles.selectorBox}>
          {availableHours.map((hour, key) => (
            <label key={key} className={styles.button}>
              <input
                type="radio"
                name="hour"
                value={hour}
                checked={hour == selectedHour}
                className={styles.radio}
                onChange={handleChange}
              />
              <span>{hour}</span>
            </label>
          ))}
        </div>
      ) : (
        <div>
          No Hay horas Disponibles para la fecha seleccionada, por favor,
          seleccione otra
        </div>
      )}
    </>
  );
}
