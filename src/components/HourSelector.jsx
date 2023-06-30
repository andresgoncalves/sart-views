import styles from './HourSelector.module.scss'
import { useState } from 'react'

function HourSelector({setHour}){

    const onOptionChange = e =>{
        setHour(e.target.value)
    }

    return(
        <>
            <div className={styles.selectorBox}>
                <label className={styles.button}>                
                    <input type="radio" value="10:00am" name="hour" className={styles.radio} onChange={onOptionChange}/>
                    <span>10:00am</span>
                </label>
                <label className={styles.button}>                
                    <input type="radio" value="12:00am" name="hour" className={styles.radio} onChange={onOptionChange}/>
                    <span>12:00am</span>
                </label>
                <label className={styles.button}>                
                    <input type="radio" value="2:00pm" name="hour" className={styles.radio} onChange={onOptionChange}/>
                    <span>2:00pm</span>
                </label>
                <label className={styles.button}>                
                    <input type="radio" value="4:00pm" name="hour" className={styles.radio} onChange={onOptionChange}/>
                    <span>4:00pm</span>
                </label>            
            </div>
        </>
    )
}

export default HourSelector