import styles from "./AdminEditor.module.scss";

/**
 * @typedef {{
 *   title: string;
 *   form: React.ReactNode;
 *   actions: React.ReactNode;
 * }} AdminEditorProps
 */

/** @param {AdminEditorProps} props */
export default function AdminEditor({ title, form, actions }) {
  return (
    <div className={styles.editor}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.form}>{form}</div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
