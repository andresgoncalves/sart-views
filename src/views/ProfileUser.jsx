import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";
import Button from "../components/Button";
import DetailedTourCard from "../components/DetailedTourCard";
import Divider from "../components/Divider";
import TourCard from "../components/TourCard";
import styles from "./ProfileUser.module.scss";

export default function ProfileUser() {
  const image ="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
  const image1 = "https://masdearte.com/media/g_SalaMendoza.jpg";

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
    ]

  return (
    <>
      <Helmet title="Perfil Usuario"></Helmet>
      <section>
        <div className={styles.box}>
          <div className={styles.userBox}>
            <div className={styles.userData}>
              <div className={styles.photo}>
                <img src={image}></img>
              </div>
              <Link to="/user/perfil" className={styles.edit}>
                Editar Perfil
              </Link>
              <Link to="/" className={styles.close}>
                Cerrar sesión
              </Link>
            </div>
            <div
              className={styles.userSide}
              style={{ backgroundImage: `url(${image1})` }}
            >
              <div className={styles.text}>Descubre nuevos tours</div>
              <Button variant="outlined" negative={true}>
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section>
      </section>
      <section>
        <Divider>
          <h2>Tus próximos eventos</h2>
        </Divider>
        <div className={styles.nextTours}>
            {detailedTour.length > 0 ? (
                detailedTour.map((data,index)=>(
                    <DetailedTourCard key={index} size="base" {...data}/>
                ))
            ) : (<p>No hay eventos próximos</p>)}
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
