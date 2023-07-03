import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";
import styles from "./UserSideBar.module.scss";

export default function UserSideBar() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.photo}>
          {user ? (
            <img className={styles.img} src={user.picture}></img>
          ) : (
            <div>
              <Loader></Loader>
            </div>
          )}
        </div>
        <div className={styles.adminName}>
          {user ? (
            user.name
          ) : (
            <div>
              <Loader></Loader>
            </div>
          )}
        </div>
      </div>
      <Link to="/user/dashboard" className={styles.option}>
        Dashboard
      </Link>
      <Link to="/obras" className={styles.option}>
        Obras
      </Link>
      <Link to="/tours" className={styles.option}>
        Tours
      </Link>
      <Link to="/" className={styles.optionSpe}>
        Inicio
      </Link>
    </div>
  );
}
