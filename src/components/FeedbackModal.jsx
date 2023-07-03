import { useState } from "react";
import bannerImage from "../assets/home-banner.png";
import Button from "./Button";
import styles from "./Modals.module.scss";
import RadioButton from "./RadioButton";
import StarRating from "./StarRating";
import InputField from "./TextField";

/**
 * @typedef {{
 *   closeModal: () => void;
 *   onSubmit: (data: import("../controllers/tours").FeedbackData) => void;
 * }} FeedbackModalProps
 */

/** @param {FeedbackModalProps} props */
export default function FeedBackModal({ closeModal, onSubmit }) {
  /** @type {import("../controllers/tours").FeedbackData} */
  const initialData = {
    satisfaction: "",
    likedMost: "",
    wouldAdd: "",
    wouldAssist: "",
    rating: 0,
  };

  const [data, setData] = useState(initialData);

  const handleChange = (
    /** @type {import("react").ChangeEvent<HTMLInputElement>} */ event
  ) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRatingChange = (/** @type {number} */ rating) => {
    setData((data) => ({
      ...data,
      rating,
    }));
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalwrapper}>
        <div className={styles.modalcontent2}>
          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            <h1 className={styles.modaltitle2}>
              <strong>Queremos saber tu opinión</strong>
            </h1>
          </div>
          <div className={[styles.modalcontent, styles.form].join(" ")}>
            <InputField
              type="text"
              name="satisfaction"
              labelText="¿Qué tan satisfecho/a estás con el tour?"
              placeholder="Introduzca su respuesta"
            />
            <div>
              <div>¿Asistirías a otro de nuestros Tours?</div>
              <div className={styles.radiogroup}>
                <RadioButton
                  name="wouldAssist"
                  label="Nunca"
                  value={data.wouldAssist}
                  onChange={handleChange}
                />
                <RadioButton
                  name="wouldAssist"
                  label="Tal Vez"
                  value={data.wouldAssist}
                  onChange={handleChange}
                />
                <RadioButton
                  name="wouldAssist"
                  label="Definitivamente"
                  value={data.wouldAssist}
                  onChange={handleChange}
                />
              </div>
            </div>
            <InputField
              type="text"
              name="likedMost"
              labelText="¿Qué fue lo que más te gustó?"
              placeholder="Introduzca su respuesta"
              value={data.likedMost}
              onChange={handleChange}
            />
            <div>
              <div>Califica este Tour:</div>
              <StarRating value={data.rating} onChange={handleRatingChange} />
            </div>
            <div className={styles.modalbuttons}>
              <Button onClick={() => closeModal()} variant="text">
                No Calificar
              </Button>
              <Button onClick={() => onSubmit(data)} variant="filled">
                Enviar Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
