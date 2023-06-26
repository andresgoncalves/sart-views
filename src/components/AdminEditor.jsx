import styles from "./AdminEditor.module.scss";

/**
 * @typedef {{
 *   title: string;
 *   content: React.ReactNode;
 *   actions: React.ReactNode;
 * }} AdminEditorProps
 */

/** @param {AdminEditorProps} props */
export default function AdminEditor({ title, content, actions }) {
  return (
    <div className={styles.editor}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{content}</div>
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}
