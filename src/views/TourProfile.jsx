import { useMemo } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import bannerImage from "../assets/home-banner.png";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import Divider from "../components/Divider";
import HourModal from "../components/HourModal";
import Loader from "../components/Loader";
import PrivateRoute from "../components/PrivateRoute";
import StarRating from "../components/StarRating";
import { useArtworks } from "../hooks/artworks";
import { useFile } from "../hooks/storage";
import { useTour } from "../hooks/tours";
import styles from "./TourProfile.module.scss";

export default function TourProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = useTour(id);
  const tourArtworks = useMemo(() => tour.data?.artworks || [], [tour.data]);
  const artworks = useArtworks(tourArtworks);
  const match = useMatch("/tours/:id/reservar");
  const image = useFile(tour.data?.images[0]);
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

  if (tour.data == null) {
    return (
      <>
        <div className={styles.loading}>
          <Loader></Loader>
        </div>
      </>
    );
  } else {
    return (
      <>
        <header
          className={styles.banner}
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className={styles.titleContainer}>
            <div className={styles.title}>{tour.data.name}</div>
          </div>
        </header>
        <section>
          <div className={styles.frame}>
            <div className={styles.rating}>
              Calificación: <StarRating value={tour.data.rating} />
            </div>
            <Button href={`/tours/${id}/reservar`}>Reservar</Button>
          </div>
          <div className={styles.text}>
            <div className={styles.tourimage}>
              <img src={image} alt="Imagen del Tour" className={styles.image} />
            </div>
            <div className={styles.columna}>
              <div className={styles.lugar}>
                <strong>Lugar: </strong>
                {tour.data.location}
              </div>
              <div className={styles.fechas}>
                <strong>Próximas fechas:</strong>
              </div>
            </div>
            <div className={styles.columna1}>
              <div className={styles.description}>
                <strong>Descripción: </strong> {tour.data.description}
              </div>
            </div>
          </div>
        </section>
        {/* <section>
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
        </section> */}
        <section>
          <Divider>
            <h2>OBRAS INTEGRADAS EN EL TOUR</h2>
          </Divider>
          <ArtworksGrid artworks={artworks.data} size="medium" />
        </section>
        {match && (
          <PrivateRoute role="user">
            <HourModal
              tour={tour.data}
              closeModal={() => navigate(`/tours/${id}`)}
            />
          </PrivateRoute>
        )}
      </>
    );
  }
}
