import { useMatch, useParams } from "react-router-dom";
import bannerImage from "../assets/home-banner.png";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import Divider from "../components/Divider";
import InterestPoint from "../components/InterestPoint";
import StarRating from "../components/StarRating";
import { useArtworks } from "../hooks/artworks";
import { useTour } from "../hooks/tours";
import styles from "./TourProfile.module.scss";
import Loader from "../components/Loader";

export default function TourProfile() {
  const { id } = useParams();
  const tour = useTour(id);
  const artworks = useArtworks();
  const match = useMatch("/tours/:id/reservar");

  const data = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
      number: 1,
      name: "hola",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
      number: 2,
      name: "hola",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
      number: 3,
      name: "hola",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
      number: 4,
      name: "hola",
    },
  ];

  if(tour.data==null){
    return(
      <>
        <div className={styles.loading}><Loader></Loader></div>
      </>
    );
  } else{
    return (
      <>
        <header
          className={styles.banner}
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className={styles.titleContainer}>
            <h1>{tour.data.name}</h1>
          </div>
        </header>
        <section>
          <div className={styles.frame}>
            <div className={styles.rating}>Calificación: <StarRating value={tour.data.rating} /></div>
            <Button href={`/tours/${id}/reservar`}>Reservar</Button>
          </div>
          <div className={styles.text}>
            <div className={styles.columna}>
              <div className={styles.lugar}>Lugar: {tour.data.location}</div>
              <div className={styles.fechas}>Próximas fechas:</div>
            </div>
            <div className={styles.columna1}>
              Descripción: {tour.data.description}
            </div>
          </div>
        </section>
        <section>
          <Divider>
            <h2>PUNTOS DE INTERÉS</h2>
          </Divider>
          <div className={styles.pointsContainer}>
            {data.map((item, index) => (
              <InterestPoint
                key={index}
                image={item.image}
                number={item.number}
                name={item.name}
              />
            ))}
          </div>
        </section>
        <section>
          <Divider>
            <h2>OBRAS INTEGRADAS EN EL TOUR</h2>
          </Divider>
  
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
