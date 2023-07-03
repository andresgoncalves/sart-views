import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import { useAuth } from "../contexts/AuthContext";
import styles from "./PublicSideBar.module.scss";

export default function PublicSideBar() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <Link to="/">
        <div className={styles.imgContainer}>
          <img src={logoImage} className={styles.logoImg}></img>
        </div>
      </Link>
      <Link to="/" className={styles.option}>
        Inicio
      </Link>
      <Link to="/obras" className={styles.option}>
        Obras
      </Link>
      <Link to="/tours" className={styles.option}>
        Tours
      </Link>
      <Link to="/calendario" className={styles.option}>
        Calendario
      </Link>
      <Link to="/buscar" className={styles.optionSpe}>
        Buscar
      </Link>
    </div>
  );
}
