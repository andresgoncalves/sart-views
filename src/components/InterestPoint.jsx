import styles from "./InterestPoint.module.scss";

export default function InterestPoint({image, number,name}){
    
    return (
        <div className={styles.circle}>
            <div
                className={styles.bigCircle}
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className={styles.name}>{name}</div>
            </div>
            <div className={styles.smallCircle}>
                <div className={styles.number}>{number}</div>
            </div>
        </div>
    );
}
