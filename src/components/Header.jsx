import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import searchImage from "../assets/Search.svg";
import barIcon from "../assets/openBarIcon.svg";
import adminImage from "../assets/photoAdminProfile.svg";
import userImage from "../assets/photoUserProfile.svg";
import Button from "./Button";
import styles from "./Header.module.scss";

/**
 * @typedef {{
 *   isLogged: boolean;
 *   search: boolean;
 *   isAdmin: boolean;
 * }} HeaderProps
 */

/** @param {HeaderProps} props */
export default function Header({ isLogged, search, isAdmin }) {
  const nameUser = "Jhon Doe";
  const nameAdmin = "Jack Mason";

  return (
    <div className={styles.header}>
      <Link to="/">
        <img src={logoImage} className={styles.logoImg}></img>
      </Link>
      {isAdmin ? (
        ""
      ) : (
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
            <img src={searchImage} className={styles.searchImg}></img>
          </Link>
        </div>
      )}
      {isLogged ? (
        isAdmin ? (
          <div className={styles.logged}>
            <Link to="/adminDashboard" className={styles.loggedUseer}>
              {nameAdmin}
            </Link>
            <Link to="/adminDashboard">
              <img src={adminImage} className={styles.userImage}></img>
            </Link>
            <Link to="">
              <img src={barIcon} className={styles.barIcon}></img>
            </Link>
          </div>
        ) : (
          <div className={styles.logged}>
            <Link to="/userDashboard" className={styles.loggedUser}>
              {nameUser}
            </Link>
            <Link to="/userDashboard">
              <img src={userImage} className={styles.userImage}></img>
            </Link>
          </div>
        )
      ) : (
        <div>
          <Button size="medium">Ingresa a tu cuenta</Button>
        </div>
      )}
    </div>
  );
}
