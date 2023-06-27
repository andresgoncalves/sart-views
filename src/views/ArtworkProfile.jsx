import { useParams } from "react-router-dom";
import Divider from "../components/Divider";
import { useArtwork, useArtworks } from "../hooks/artworks";
import styles from "./ArtworkProfile.module.scss";
import Loader from "../components/Loader";
import { useFile } from "../hooks/storage";
import ArtworkCard from "../components/ArtworkCard";
import { useTours } from "../hooks/tours";
import TourCard from "../components/TourCard";


export default function ArtworkProfile(){

    const { id } = useParams();
    const artwork = useArtwork(id);
    const artworks=useArtworks();
    const tours= useTours();

    if((artwork.data)==null){
        return(
            <>
            <div className={styles.loading}><Loader /></div>
            </>   
        )
    }else{
        return(
            <>
            <section>
                <div className={styles.content}>
                    <div className={styles.column1}>
                    </div>
                    <div className={styles.column2}>
                        <div className={styles.artworkName}>{artwork.data.name}</div>
                        <div className={styles.labelSubtitle}>Autor</div>
                        <div className={styles.text}>{artwork.data.author}</div>
                        <div className={styles.labelSubtitle}>Categoría</div>
                        <div className={styles.text}>{artwork.data.category}</div>
                        <div className={styles.labelSubtitle}>Descripción</div>
                        <div className={styles.text}>{artwork.data.description}</div>
                        <div className={styles.labelSubtitle}>Ubicación</div>
                        <div className={styles.text}>{artwork.data.location}</div>
                    </div>
                </div>
            </section>
            <section>
                <Divider><div className={styles.textDivider}>Tours Relacionados</div></Divider>
                <div className={styles.tours}>
                    {tours.data
                    ? tours.data.map((data, key)=>(
                        <TourCard key={key} data={data} size="medium"/>
                    )): <Loader></Loader>}
                </div>
            </section>
            <section>
                <Divider><div className={styles.textDivider}>Obras Relacionadas</div></Divider>
                <div className={styles.artworks}>
                {artworks.data
                    ? artworks.data.map((data, key) => (
                        <ArtworkCard key={key} data={data} size="medium" />
                    ))
                    : "Cargando..."}
                </div>
            </section>
            </>
        );
    }
}