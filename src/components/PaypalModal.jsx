import Check from "../assets/CheckIcon.svg";
import styles from "./PaypalModal.module.scss"
import Button from "./Button";

export default function PaypalModal({ closeModal }) {
    return (
        <div className={styles.modaloverlay}>
            <div className={styles.modalwrapper}>
                <div className={styles.modalcontent}>
                    <div className={styles.modalimage}>
                        <img src={Check} alt="Check"></img>
                    </div>
                    <h1 className={styles.modaltitle}><strong>¡Gracias por tu contribución!</strong></h1>
                    <p>Las donaciones ayudan a financiar el mantenimiento de los Espacios Culturales de la Universidad Metropolitana</p>
                    <div className={styles.modalbuttons}>
                        <Button onClick={() => closeModal()} variant="filled" size="base">Registrar Donación</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}