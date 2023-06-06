import { useState } from "react";
import styles from "./InputField.module.scss";

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement> &{
 * labelText: string
 * placeholder?: string
 * value?: string
 * onChange?: function
 * }} InputFieldProps
 * 
 */

/**@param {InputFieldProps} props */
export default function InputComponent({labelText,placeholder,...props}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.container}>
    <label className={styles.label}>{labelText}
    <input type="text" className={styles.input} placeholder={(placeholder)} value= {inputValue} onChange={ev => setInputValue(ev.target.value)}/>
    </label>
    </div>
  );
}