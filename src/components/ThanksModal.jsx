import Check from "../assets/CheckIcon.svg";
import styles from "./ThanksModal.module.scss";
import Button from "./Button";

export default function ThanksModal({ handleCloseModal }) {
  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <div className={styles.modalimage}>
            <img src={Check} alt="Check" />
          </div>
          <h1 className={styles.modaltitle}>
            <strong>¡Gracias por tu contribución!</strong>
          </h1>
          <p>
            Las donaciones ayudan a financiar el mantenimiento de los Espacios
            Culturales de la Universidad Metropolitana
          </p>
          <div className={styles.modalbuttons}>
            <Button onClick={handleCloseModal} href="/user/dashboard" variant="filled" size="base">
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


