import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import editLapiz from "../assets/EditLapiz.svg";
import exitIcon from "../assets/exitIcon.svg";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import DetailedTourCard from "../components/DetailedTourCard";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import TourCard from "../components/TourCard";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../controllers/auth";
import styles from "./ProfileUser.module.scss";

export default function ProfileUser() {
  const { user } = useAuth();

  const image1 = "https://masdearte.com/media/g_SalaMendoza.jpg";

  const handleLogout = async () => {
    await logout();
  };

  const tours = [
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
  ];

  const artworks = [
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
    {
      title: "La Mona Lisa",
      author: "Leonardo Da Vinci",
      location: "Biblioteca Pedro Grases",
      id: "#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
    },
  ];

  const detailedTour = [
    {
      id: "0",
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      rating: 4,
      location: "Biblioteca Pedro Grases",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
    {
      id: "0",
      title: "Tour Gandhi",
      description: "Tour que inicia en la estatua de Gandhi",
      rating: 4,
      location: "Biblioteca Pedro Grases",
      image:
        "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
    },
  ];

  return (
    <>
      <Helmet title="Perfil Usuario"></Helmet>
      <section>
        <div className={styles.box}>
          <div className={styles.userBox}>
            <div className={styles.userData}>
              <div className={styles.photo}>
                {user ? (
                  <img src={user.picture}></img>
                ) : (
                  <div>
                    <Loader></Loader>
                  </div>
                )}
              </div>
              <Link to="/user/perfil" className={styles.edit}>
                Editar Perfil
                <img src={editLapiz}></img>
              </Link>
              <Link to="/" onClick={handleLogout} className={styles.close}>
                Cerrar sesión
                <img src={exitIcon}></img>
              </Link>
            </div>
            <div
              className={styles.userSide}
              style={{ backgroundImage: `url(${image1})` }}
            >
              <div className={styles.text}>Descubre nuevos tours</div>
              <Button
                href="/buscar"
                variant="outlined"
                negative={true}
                size="medium"
                className={styles.button}
              >
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section></section>
      <section>
        <Divider>
          <h2>Tus próximos eventos</h2>
        </Divider>
        <div className={styles.nextTours}>
          {detailedTour.length > 0 ? (
            detailedTour.map((data, index) => (
              <DetailedTourCard key={index} size="base" {...data} />
            ))
          ) : (
            <p>No hay eventos próximos</p>
          )}
        </div>
      </section>
      <section>
        <div className={styles.infoUser}>
          <div className={styles.column1}>
            <div className={styles.titleColumn}>Tours Visitados</div>
            <div className={styles.tours}>
              {tours.length > 0 ? (
                tours.map((data, index) => (
                  <TourCard key={index} size="medium" {...data} />
                ))
              ) : (
                <p>No se ha visitado ningún tour</p>
              )}
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.titleColumn}>Obras Favoritas</div>
            <div className={styles.artworks}>
              {artworks.length > 0 ? (
                artworks.map((data, index) => (
                  <ArtworkCard key={index} size="medium" {...data} />
                ))
              ) : (
                <p>No hay obras destacadas</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
