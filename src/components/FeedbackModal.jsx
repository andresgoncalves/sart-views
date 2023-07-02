import Check from "../assets/CheckIcon.svg";
import styles from "./Modals.module.scss"
import Button from "./Button";
import StarRating from "./StarRating";
import InputField from "./TextField";
import RadioButton from "./RadioButton";
import bannerImage from "../assets/home-banner.png";
import { useState } from "react";

export default function FeedBackModal({ closeModal, uploadFeedback }) {
    const [value, setValue] = useState(0);
    const [feedback, setFeedback] = useState("");
    const clickStar = (value) => setValue(value)

      
    return (
        <div className={styles.modaloverlay}>            
            <div className={styles.modalwrapper}>                
                <div className={styles.modalcontent2}>
                    <div className={styles.imageContainer} style={{ backgroundImage: `url(${bannerImage})` }}>
                        <h1 className={styles.modaltitle2}><strong>Queremos saber tu opinión!</strong></h1>
                    </div>
                    <div className={styles.modalcontent}>
                        <InputField 
                            type="text"
                            name="feedback1"
                            labelText="¿Qué tan satisfecho/a estás con el tour?"
                            placeholder="Introduzca su respuesta"
                        />
                        <p>¿Asistirías a otro de nuestros Tours?</p>
                        <RadioButton group="feedback" label="Nunca" onChange={(feedback) => setFeedback(feedback)}/>
                        <RadioButton group="feedback" label="Tal Vez" onChange={(feedback) => setFeedback(feedback)}/>
                        <RadioButton group="feedback" label="Definitivamente" onChange={(feedback) => setFeedback(feedback)}/>
                        

                        <InputField 
                            type="text"
                            name="feedback1"
                            labelText="¿Qué fue lo que más te gustó?"
                            placeholder="Introduzca su respuesta"
                        />
                        <p>Califica este Tour:</p>
                        <StarRating value={value} onChange={clickStar}/>
                        <div className={styles.modalbuttons}>
                            <Button  onClick={() => closeModal()} variant="text" size="base">No Calificar</Button>
                            <Button onClick={() => uploadFeedback()} variant="filled" size="base">Enviar Feedback</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}