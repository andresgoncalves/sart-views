import styles from "./Tag.module.scss";

export default function Tag({ name }){
    return(
        <div className={styles.container}>
            <div className={styles.label}>{name}</div>
        </div>
    );
}