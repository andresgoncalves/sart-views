import Calendario from './Calendar';
import HourSelector from './HourSelector';
import styles from './HourModal.module.scss';
import {useState} from 'react';
import moment from "moment";

export default function HourModal({tour, closeModal}){
    
    console.log(tour)


    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState("10:00am")
    console.log(moment(date).format("DD-MM-YYYY").toString())
    console.log(hour)

    var reservation = {
        hora: hour,
        fecha: moment(date).format("DD-MM-YYYY")
    }

    console.log(reservation)
    return(
        <>
        <div className={styles.wrapper}>
        <div className={styles.modalBox}>
            <div className={styles.imageContainer} style={{ backgroundImage: `url(${tour.data.images[0]})` }}></div>
            <div className={styles.content}>
                <div className={styles.content2}>
                    <p>Selecciona una de las fechas Disponibles:</p>
                    <Calendario dates={tour.data.availableHours} date={date} setDate={setDate}/>
                </div>
                <div className={styles.content2}>                    
                    <p>Selecciona una Hora:</p>
                    <HourSelector setHour={setHour}/>
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
