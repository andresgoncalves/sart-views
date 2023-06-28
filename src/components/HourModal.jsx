import Calendario from './Calendar';
import HourSelector from './HourSelector';
import styles from './HourModal.module.scss';

function HourModal(){

    return(
        <>
        <dialog className={styles.modalBox}>
            <div className={styles.imageContainer}></div>
            <div className={styles.content}>
                <div className={styles.content2}>
                    <p>Selecciona una de las fechas Disponibles:</p>
                    <Calendario></Calendario>
                </div>
                <div className={styles.content2}>                    
                    <p>Selecciona una Hora:</p>
                    <HourSelector></HourSelector>
                </div>
                <div className={styles.content2}>
                    <p className={styles.subtitle}><strong>Detalles del Evento:</strong></p>
                    <p><strong>Lugar:</strong>ABABAB</p>
                    <p><strong>Duración:</strong>ABABAB</p>
                </div>
            </div>
            <div className={styles.buttonSection}>
                <button className={styles.closeButton}>Cancelar</button>
                <button className={styles.bookButton}>Reservar</button>
            </div>
        </dialog>
        </>
    )
}

export default HourModal;