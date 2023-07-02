import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCallback, useState } from "react";
import PayPalLogo from "../assets/PayPalLogo.svg";
import Button from "./Button";
import styles from "./DonateModal.module.scss";
import TextField from "./TextField";
import ThanksModal from "./ThanksModal";

export default function DonateModal({ closeModal }) {
  const [moneySelected, setMoneySelected] = useState("0");
  const [showThanksModal, setShowThanksModal] = useState(false);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setMoneySelected(value);
    console.log(moneySelected);
  };

  const handleApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(function (details) {
        // Tu código aquí después de capturar la orden
        alert(`Transacción completada por ${details.payer.name.given_name}`);
        return details;
      })
      .then((details) => {
        setShowThanksModal(true);
      });
  };

  const handleCreateOrder = (data, actions) => {
    const selectedAmount = moneySelected;
    console.log(selectedAmount);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: selectedAmount,
            },
          },
        ],
      })
      .then((orderId) => {
        // Tu código aquí después de crear la orden
        setShowThanksModal(true);
        return orderId;
      });
  };

  const handleThanksModalClose = useCallback(() => {
    setShowThanksModal(false);
    closeModal(); // Cierra ReserveModal y DonateModal
  }, [closeModal]);

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent}>
          <div className={styles.modalBanner}></div>
          <div className={styles.modalimage}>
            <img src={PayPalLogo} alt="PayPal Logo" />
          </div>
          <h4>Monto con el que desea colaborar</h4>
          <TextField
            onChange={handleOnChange}
            placeholder="Monto"
            type="number"
          />
          <div className={styles.modalbuttons}>
            <Button onClick={closeModal} variant="text" size="base">
              Cancelar
            </Button>
            <PayPalScriptProvider
              options={{
                clientId:
                  "AdViVamNy8muZW8Phx3W-uXwF9Ov2ccRP2tvUSYs_ecmWcQTQrzYPiyNze6ZXtM86-9Au-ovwTUXPyCr",
              }}
            >
              <PayPalButtons
                fundingSource="paypal"
                forceReRender={[moneySelected]}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
              ></PayPalButtons>
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
      {showThanksModal && (
        <ThanksModal handleCloseModal={handleThanksModalClose} />
      )}
    </div>
  );
}








