import styles from "./Calendar.css"
import Calendar from "react-calendar";
import {useState} from 'react';
import moment from "moment";

function Calendario(){
    const mark=[
        '04-03-2023',
        '03-03-2023',
        '05-03-2023'
    ]

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
            tileClassName={({ date, view }) => {
                if(mark.find(x=>x===moment(date).format("DD-MM-YYYY"))){
                 return  'highlight'
                }
            }}
            />
            <p className='text-center'>
        <span className='bold'></span>{' '}
        {date.toDateString()}
      </p>
        </div>
    )
}

export default Calendario;