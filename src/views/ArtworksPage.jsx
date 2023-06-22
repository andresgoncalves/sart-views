import styles from "./ArtworksPage.module.scss";
import bannerImage from "../assets/home-banner.png";

export default function ArtworksPage(){

    return(
        <>
            <header
            className={styles.banner}
            style={{ backgroundImage: `url(${bannerImage})` }}>
                <div className={styles.contentTitle}>Conoce las obras de arte de la Universidad Metropolitana</div>
                <div className={styles.}
            </header>
        </>
    );
}