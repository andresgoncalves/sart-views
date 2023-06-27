import { useArtwork } from "../hooks/artworks";
import Divider from "./Divider";
import styles from "./ProfileArtwork.module.scss";

export default function ProfileArtwork(){
    useArtwork("PDuKRc52hrCHTfwtqRkD");
    const image="https://www.unimet.edu.ve/wp-content/uploads/2020/10/IMG_6210-741x1030.jpg";
    return(
        <>
        <section>
            <div className={styles.content}>
                <div className={styles.column1}
                    style={{ backgroundImage: `url(${image})` }}>
                </div>
                <div className={styles.column2}>
                    <div className={styles.artworkName}>Eugenio</div>
                    <div className={styles.labelSubtitle}>Autor</div>
                    <div className={styles.text}>John Doe</div>
                    <div className={styles.labelSubtitle}>Categoría</div>
                    <div className={styles.text}>Escultura</div>
                    <div className={styles.labelSubtitle}>Descripción</div>
                    <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <div className={styles.labelSubtitle}>Ubicación</div>
                    <div className={styles.text}>Plaza del Rectorado</div>
                </div>
            </div>
        </section>
        <section>
            <Divider><div className={styles.textDivider}>Tours Relacionados</div></Divider>
        </section>
        </>
    );
}