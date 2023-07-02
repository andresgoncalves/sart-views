import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import PayPalLogo from "../assets/PayPalLogo.svg";
import Button from "./Button";
import styles from "./DonateModal.module.scss";
import TextField from "./TextField";

export default function DonateModal({ closeModal }) {
  const [moneySelected, setMoneySelected] = useState("0");

  const handleOnChange = (event) => {
    const { value } = event.target;
    setMoneySelected(value);
    console.log(moneySelected);
  };

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
            <Button onClick={() => closeModal()} variant="text" size="base">
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
                createOrder={(data, actions) => {
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
                      // Your code here after create the order
                      return orderId;
                    });
                }}
                onApprove={function (data, actions) {
                  return actions.order.capture().then(function (details) {
                    // Your code here after capture the order
                    alert(
                      `Transaction completed by ${details.payer.name.given_name}`
                    );
                  });
                }}
              ></PayPalButtons>
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
