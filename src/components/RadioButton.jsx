import styles from './RadioButton.module.scss';

export default function RadioButton({group, label, onChange}){


    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return(
        <>
            <label>
                <input
                    type="radio"
                    name={group}
                    value={label}
                    className={styles.radio}
                    onChange={handleChange}
                />                    
                <span>{label}</span>
            </label>
        </>
    )
}

