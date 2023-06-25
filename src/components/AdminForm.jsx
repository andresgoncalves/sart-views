import styles from "./AdminForm.module.scss";

/**
 * @typedef {{
 *   title: string;
 *   form: React.ReactNode;
 *   actions: React.ReactNode;
 * }} AdminFormProps
 */

/** @param {AdminFormProps} props */
export default function AdminForm({ title, form, actions }) {
  return (
    <div className={styles.editor}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.form}>{form}</div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
