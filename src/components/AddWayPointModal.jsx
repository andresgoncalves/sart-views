import React, { useState } from "react";
import styles from "./AddWayPointModal.module.scss";
import Button from "./Button";
import TextField from "./TextField";

export default function AddWayPointModal({ closeModal }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <h1 className={styles.modaltitle}>
            <strong>Añadir Punto de Interés</strong>
          </h1>
          <div className={styles.modalForm}>
            <label className={styles.fileInputLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <span>Seleccionar imagen</span>
            </label>
            <TextField
              labelText="Nombre del Punto de Interés"
              placeholder="Nombre"
            />
          </div>
          <div className={styles.modalbuttons}>
            <Button onClick={closeModal} variant="text" size="base">
              Cancelar
            </Button>
            <Button onClick={closeModal} variant="filled" size="base">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


