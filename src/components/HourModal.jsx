import Calendario from './Calendar';
import HourSelector from './HourSelector';
import styles from './HourModal.module.scss';
import {useState} from 'react';
import moment from "moment";

export default function HourModal({tour, closeModal}){
    


    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState()

    var reservation = {
        hora: hour,
        fecha: moment(date).format("DD-MM-YYYY")
    }

    console.log("hOla")
    console.log(reservation)


    var hours = []
    for (let index = 0; index < tour.data.dates.length; index++) {
        if(moment(date).format("DD-MM-YYYY") == tour.data.dates[index].date){
            hours = tour.data.dates[index].hours.map((hour) =>{
                return hour;
            })
        }
    }

    return(
        <>
        <div className={styles.wrapper}>
        <div className={styles.modalBox}>
            <div className={styles.imageContainer} style={{ backgroundImage: `url(${tour.data.images[0]})` }}></div>
            <div className={styles.content}>
                <div className={styles.content2}>
                    <p>Selecciona una de las fechas Disponibles:</p>
                    <Calendario dates={tour.data.dates} date={date} setDate={setDate}/>
                </div>
                <div className={styles.content2}>                    
                    <p>Selecciona una Hora:</p>
                    <HourSelector hours= {hours} setHour={setHour}/>
                </div>
                <div className={styles.content2}>
                    <p className={styles.subtitle}><strong>Detalles del Evento:</strong></p>
                    <p><strong>Lugar:</strong>{tour.data.location}</p>
                    <p><strong>Duración:</strong>{tour.data.duration}</p>
                </div>
            </div>
            <div className={styles.buttonSection}>
                <button className={styles.closeButton} onClick={() => closeModal()}>Cancelar</button>
                <button className={styles.bookButton} onClick={() => closeModal()}>Reservar</button>
            </div>
        </div>
        </div>
        </>
    )
}
