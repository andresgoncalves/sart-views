import { useCallback } from "react";
import ReactCalendar from "react-calendar";
import { formatDate, parseDate } from "../utils/date";
import styles from "./Calendar.module.scss";

/**
 * @typedef {{
 *   availableDates?: string[];
 *   date?: string;
 *   onChange?: (date: string) => void;
 * }} CalendarProps
 */

/** @param {CalendarProps} props */
export default function Calendar({ availableDates, date, onChange }) {
  const handleChange = useCallback(
    (/** @type {Date} */ date) => {
      const dateText = formatDate(date);
      if (onChange && (!availableDates || availableDates.includes(dateText))) {
        onChange(dateText);
      }
    },
    [availableDates, onChange]
  );

  return (
    <div className={styles.calendarContainer}>
      <ReactCalendar
        onChange={handleChange}
        value={parseDate(date)}
        defaultView="month"
        maxDetail="month"
        minDetail="month"
        tileDisabled={({ date }) => !availableDates?.includes(formatDate(date))}
        formatShortWeekday={(_, date) =>
          ["D", "L", "M", "X", "J", "V", "S"][date.getDay()]
        }
      />
    </div>
  );
}
