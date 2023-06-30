import styles from "./Calendar.css"
import Calendar from "react-calendar";
import {useState} from 'react';
import moment from "moment";


function Calendario({dates, date ,setDate}){
    
    const ex=[
        "04-07-2023",
        "05-07-2023"
    ]

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
                if(dates.find(x=>x===moment(date).format("DD-MM-YYYY"))){
                 return  'highlight'
                }
            }}
            />
            <p>
            <span className='bold'></span>{' '}
                {moment(date).format("DD-MM-YYYY")}
            </p>
        </div>
    )
}

export default Calendario;