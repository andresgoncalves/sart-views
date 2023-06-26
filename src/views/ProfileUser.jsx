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
import { useArtworks } from "../hooks/artworks";
import { useTours } from "../hooks/tours";
import styles from "./ProfileUser.module.scss";

export default function ProfileUser() {
  const { user } = useAuth();
  const tours = useTours();
  const artworks = useArtworks();

  const image1 = "https://masdearte.com/media/g_SalaMendoza.jpg";

  const handleLogout = async () => {
    await logout();
  };

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
          {tours.data ? (
            tours.data.length > 0 ? (
              tours.data.map((data, key) => (
                <DetailedTourCard key={key} data={data} />
              ))
            ) : (
              <p>No hay eventos próximos</p>
            )
          ) : (
            "Cargando..."
          )}
        </div>
      </section>
      <section>
        <div className={styles.infoUser}>
          <div className={styles.column1}>
            <div className={styles.titleColumn}>Tours Visitados</div>
            <div className={styles.tours}>
              {tours.data ? (
                tours.data.length > 0 ? (
                  tours.data.map((data, key) => (
                    <TourCard key={key} size="medium" data={data} />
                  ))
                ) : (
                  <p>No hay tours visitados</p>
                )
              ) : (
                "Cargando..."
              )}
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.titleColumn}>Obras Favoritas</div>
            <div className={styles.artworks}>
              {artworks.data ? (
                artworks.data.length > 0 ? (
                  artworks.data.map((data, key) => (
                    <ArtworkCard key={key} size="medium" data={data} />
                  ))
                ) : (
                  <p>No hay obras destacadas</p>
                )
              ) : (
                "Cargando..."
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
