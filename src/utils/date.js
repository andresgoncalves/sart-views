import moment from "moment";

/** @param {Date} date */
export function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

/** @param {string} date */
export function parseDate(date) {
  return moment(date, "YYYY-MM-DD").toDate();
}
