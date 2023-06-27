import Question from "../assets/QuestionIcon.svg";
import styles from "./Confirmation.module.scss"
import Button from "./Button";

export default function ReserveModal({ closeModal }) {
    return (
        <div className={styles.modaloverlay}>
            <div className={styles.modalwrapper}>
                <div className={styles.modalcontent}>
                    <div className={styles.modalimage}>
                        <img src={Question} alt="Check"></img>
                    </div>
                    <h1 className={styles.modaltitle}><strong>Confirmación</strong></h1>
                    <h5>¿Estás seguro que deseas eliminar la obra del tour?</h5>
                    <div className={styles.modalbuttons}>
                        <Button className= {styles.botones} onClick={() => closeModal()} variant="text" size="medium">Cancelar</Button>
                        <Button className= {styles.botones} onClick={() => closeModal()} variant="filled" size="medium">Eliminar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}