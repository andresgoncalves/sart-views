import Check from "../assets/CheckIcon.svg";
import styles from "./Modals.module.scss"
import Button from "./Button";

export default function FeedBackModal({ closeModal }) {
    return (
        <div className={styles.modaloverlay}>
            <div className={styles.modalwrapper}>
                <div className={styles.modalcontent}>
                    <div className={styles.modalimage}>
                        <img src={Check} alt="Check"></img>
                    </div>
                    <h1 className={styles.modaltitle}><strong>Feedback Recibido</strong></h1>
                    <h5>¿Quieres hacer una contribución a través de PayPal?</h5>
                    <p>Las donaciones ayudan a financiar el mantenimiento de los Espacios Culturales de la Universidad Metropolitana</p>
                    <div className={styles.modalbuttons}>
                        <Button  onClick={() => closeModal()} variant="text" size="base">Continuar sin Contribuir</Button>
                        <Button onClick={() => closeModal()} variant="filled" size="base">Registrar Donación</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}