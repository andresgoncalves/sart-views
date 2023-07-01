import styles from './HourSelector.module.scss'
import { useState } from 'react'

function HourSelector({hours, setHour}){

    const onOptionChange = e =>{
        setHour(e.target.value)
    }

    /*const ex =[
        "2:00am",
        "3:00pm"
    ]*/

    return(
        <>  
            {hours.length != 0 ? (
                <>
                <div className={styles.selectorBox}>
                    {hours.map((hour)=>{
                        return(          
                            <label className={styles.button}>                
                                <input type="radio" value={hour} name="hour" className={styles.radio} onChange={onOptionChange}/>
                                <span>{hour}</span>
                            </label>
                        )
                    })}        
                </div>
                </>
            ):(
                <>
                    <p> No Hay horas Disponibles para la fecha seleccionada, por favor, seleccione otra</p>
                </>
            )}
            
        </>
    )
}

export default HourSelector