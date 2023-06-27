import styles from "./SearchModal.module.scss";
import SearchField from "./SearchField";
import Button from "./Button";
import Divider from "./Divider";

export default function DeleteModal({ closeModal }) {
    return (
        <div className={styles.modaloverlay}>
            <div className={styles.modalwrapper}>
                <div className={styles.modalcontent}>
                    <h3>Selecciona las Obras que deseas añadir</h3>
                    <div className={styles.modalsearching}>
                    <SearchField placeholder="Buscar" />
                    </div>
                    <div className={styles.modalresults}>
                        <p>Resultados: </p> {/* Aquí se mostrarán los resultados, este p es por poner algo*/}
                    </div>
                    <div className={styles.modalbuttons}>
                        <Button onClick={() => closeModal()} variant="text" size="base">Cancelar</Button>
                        <Button onClick={() => closeModal()} variant="filled" size="base">Añadir</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}