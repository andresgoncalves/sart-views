import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import editLapiz from "../assets/EditLapiz.svg";
import exitIcon from "../assets/exitIcon.svg";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import DetailedToursGrid from "../components/DetailedToursGrid";
import Divider from "../components/Divider";
import Loader from "../components/Loader";
import ToursGrid from "../components/ToursGrid";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../controllers/auth";
import { useArtworks } from "../hooks/artworks";
import { useTours } from "../hooks/tours";
import styles from "./ProfileUser.module.scss";

export default function ProfileUser() {
  const { user } = useAuth();
  const tours = useTours();
  const artworks = useArtworks(user.favoritesArtworks);

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
        <DetailedToursGrid
          tours={tours.data}
          fallback="No hay eventos próximos"
        />
      </section>
      <section>
        <div className={styles.infoUser}>
          <div className={styles.column1}>
            <div className={styles.titleColumn}>Tours Visitados</div>
            <ToursGrid tours={tours.data} fallback="No hay tours visitados" />
          </div>
          <div className={styles.column2}>
            <div className={styles.titleColumn}>Obras Favoritas</div>
            {artworks.data ? (
              <ArtworksGrid
                artworks={artworks.data}
                fallback="No hay obras destacadas"
              />
            ) : (
              <div>hola</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
