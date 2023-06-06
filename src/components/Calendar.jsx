import styles from "./Calendar.css"
import Calendar from "react-calendar";
import {useState} from 'react';

function Calendario(){
    const [date, setDate] = useState(new Date());
    return(
        <div className="calendarContainer">            
            <Calendar 
            // @ts-ignore 
            onChange={setDate} 
            value={date}
            defaultView='month'
            maxDetail="month"
            minDetail="month"
            />
            <p className='text-center'>
        <span className='bold'></span>{' '}
        {date.toDateString()}
      </p>
        </div>
    )
}

export default Calendario;