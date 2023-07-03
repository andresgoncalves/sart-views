import Check from "../assets/CheckIcon.svg";
import Button from "./Button";
import styles from "./Modals.module.scss";

/**
 * @typedef {{
 *   closeModal: () => void;
 *   handleSubmit: () => void;
 * }} FeedBackModalProps
 */

/** @param {FeedBackModalProps} props */
export default function FeedBackModal({ closeModal, handleSubmit }) {
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <div className={styles.modalimage}>
            <img src={Check} alt="Check"></img>
          </div>
          <h1 className={styles.modaltitle}>
            <strong>Feedback Recibido</strong>
          </h1>
          <h5>¿Quieres hacer una contribución a través de PayPal?</h5>
          <p>
            Las donaciones ayudan a financiar el mantenimiento de los Espacios
            Culturales de la Universidad Metropolitana
          </p>
          <div className={styles.modalbuttons}>
            <Button onClick={() => closeModal()} variant="text" size="base">
              Continuar sin Contribuir
            </Button>
            <Button onClick={() => handleSubmit()} variant="filled" size="base">
              Registrar Donación
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
