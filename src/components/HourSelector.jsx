import styles from './HourSelector.module.scss'

function HourSelector(){
    return(
        <>
        <div className={styles.selectorBox}>
            <label>                
                <input type="radio" value="10:00am" name="hour" className={styles.radio}/>
                10:00am
            </label>
            <label>                
                <input type="radio" value="12:00am" name="hour" className={styles.radio}/>
                12:00am
            </label>
            <label>                
                <input type="radio" value="2:00pm" name="hour" className={styles.radio}/>
                2:00pm
            </label>
            <label>                
                <input type="radio" value="4:00pm" name="hour" className={styles.radio}/>
                4:00pm
            </label>
        </div>
        </>
    )
}

export default HourSelector