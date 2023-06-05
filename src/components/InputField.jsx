import styles from "./InputField.module.scss";
/**
 * @typedef {{
 * labelText: string
 * }} InputFieldProps
 * 
 */

/**@param {InputFieldProps} props */
export default function InputComponent(props) {

  const {labelText} = props;

  return (
    <div className={styles.container}>
    <label className={styles.label}>{labelText}</label>
    <input type="text" className={styles.input} placeholder="Escribe algo"></input>
    </div>
  );
}