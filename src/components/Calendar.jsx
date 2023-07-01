import moment from "moment";
import { useCallback } from "react";
import ReactCalendar from "react-calendar";
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
      const dateText = moment(date).format("DD-MM-YYYY");
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
        value={moment(date, "DD-MM-YYYY").toDate()}
        defaultView="month"
        maxDetail="month"
        minDetail="month"
        tileDisabled={({ date }) =>
          !availableDates?.includes(moment(date).format("DD-MM-YYYY"))
        }
        formatShortWeekday={(_, date) =>
          ["D", "L", "M", "X", "J", "V", "S"][date.getDay()]
        }
      />
    </div>
  );
}
