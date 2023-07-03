import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import searchImage from "../assets/Search.svg";
import { useAuth } from "../contexts/AuthContext";
import AdminDashboardHeader from "./AdminDashboardHeader";
import Button from "./Button";
import styles from "./Header.module.scss";
import Loader from "./Loader";
import UserHeaderResponsive from "./UserHeaderResponsive";

export default function Header() {
  const { user, isLogged, isAdmin } = useAuth();

  return (
    <>
      <MediaQuery maxWidth={870}>
        {isAdmin ? (
          <AdminDashboardHeader></AdminDashboardHeader>
        ) : (
          <UserHeaderResponsive></UserHeaderResponsive>
        )}
      </MediaQuery>
      <MediaQuery minWidth={870}>
        <div className={styles.header}>
          <Link to="/">
            <img src={logoImage} className={styles.logoImg}></img>
          </Link>
          <div className={styles.textContainer}>
            <Link to="/" className={styles.links}>
              Inicio
            </Link>
            <Link to="/tours" className={styles.links}>
              Tours
            </Link>
            <Link to="/obras" className={styles.links}>
              Obras
            </Link>
            <Link to="/calendario" className={styles.links}>
              Calendario
            </Link>
            <Link to="/buscar" className={styles.buscar}>
              Buscar
              <img src={searchImage} className={styles.searchImg} alt="" />
            </Link>
          </div>
          {isLogged ? (
            user ? (
              <div className={styles.logged}>
                {!isAdmin ? (
                  <Link to="/user/dashboard" className={styles.loggedUser}>
                    {user.name}
                  </Link>
                ) : (
                  <Link to="/admin/dashboard" className={styles.loggedUser}>
                    {user.name}
                  </Link>
                )}
                {!isAdmin ? (
                  <Link to="/user/dashboard">
                    <div className={styles.photo}>
                      <img className={styles.img} src={user.picture}></img>
                    </div>
                  </Link>
                ) : (
                  <Link to="/admin/dashboard">
                    <div className={styles.photo}>
                      <img className={styles.img} src={user.picture}></img>
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <div className={styles.loaderContainer}>
                <Loader></Loader>
              </div>
            )
          ) : (
            <div>
              <Button href="login" size="medium">
                Ingresa a tu cuenta
              </Button>
            </div>
          )}
        </div>
      </MediaQuery>
    </>
  );
}
