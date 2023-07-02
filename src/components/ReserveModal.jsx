import Check from "../assets/CheckIcon.svg";
import styles from "./Modals.module.scss";
import Button from "./Button";
import DonateModal from "./DonateModal";
import PaypalModal from "./ThanksModal";
import { useState } from "react";

export default function ReserveModal({ closeModal }) {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);

  const handleDonateClick = () => {
    setShowDonateModal(true);
  };

  const handleDonateModalClose = () => {
    setShowDonateModal(false);
  };

  const handlePayPalModalClose = () => {
    setShowPayPalModal(false);
    closeModal();
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <div className={styles.modalimage}>
            <img src={Check} alt="Check" />
          </div>
          <h1 className={styles.modaltitle}>
            <strong>Reservación exitosa</strong>
          </h1>
          <h5>¿Quieres hacer una contribución a través de PayPal?</h5>
          <p>
            Las donaciones ayudan a financiar el mantenimiento de los Espacios
            Culturales de la Universidad Metropolitana
          </p>
          <div className={styles.modalbuttons}>
            <Button
              onClick={closeModal}
              variant="text"
              size="base"
            >
              Continuar sin Contribuir
            </Button>
            <Button
              onClick= {handleDonateClick}	
              variant="filled"
              size="base"
            >
              Registrar Donación
            </Button>
          </div>
        </div>
      </div>
      {showDonateModal && (
        <DonateModal closeModal={handleDonateModalClose} />
      )}
      {showPayPalModal && (
        <PaypalModal closeModal={handlePayPalModalClose} />
      )}
    </div>
  );
}



  //EJEMPLO DE USO DE MODAL
  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

/* EJEMPLO DE USO DE MODAL */
/* <button onClick={openModal}>Open Modal</button>
{modalOpen && <ReserveModal closeModal={closeModal} />} */