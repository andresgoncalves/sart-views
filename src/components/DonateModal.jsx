import styles from "./DonateModal.module.scss"
import PayPalLogo from "../assets/PayPalLogo.png"
import Button from "./Button"
import TextField from "./TextField"


export default function DonateModal({ closeModal }) {

    return (
        <div className={styles.modaloverlay}>
            <div className={styles.modalwrapper}>
                <div className={styles.modalcontent}>
                    <div className={styles.modalBanner}>
                        </div>
                        <div className={styles.modalimage}>
                            <img src={PayPalLogo} alt="PayPal Logo" />
                            </div>
                    <h4>Monto con el que desea colaborar</h4>
                    <TextField placeholder="Monto" type="number" />
                    <div className={styles.modalbuttons}>
                        <Button onClick={() => closeModal()} variant="text" size="base">Cancelar</Button>
                        <Button onClick={() => closeModal()} variant="filled" size="base">Continuar con el Pago</Button>
                    </div>
                    </div>
                    </div>
                    </div>
    )
}