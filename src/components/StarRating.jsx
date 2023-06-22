import { useState } from "react";
import styles from "./StarRating.module.scss";

export default function StarRating(props){
    const [rating, setRating] = useState(props.initialRating || 0);
    
    const handleStarClick = (newRating) => {
        if (!props.readOnly) {
          setRating(newRating);
        }
    };

    return (
        <div className={styles.rating}>
            <p className={styles.label}>Calificación:</p>
            <div className={styles.starArray}>
                {[...Array(5)].map((star, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={index}
                            onClick={() => handleStarClick(starValue)}
                            style={{
                                color: starValue <= rating ? '#6247AA' : 'gray',
                                cursor: props.readOnly ? 'default' : 'pointer'
                            }}
                        >
                            &#9733;
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
