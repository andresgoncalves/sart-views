import { Link } from "react-router-dom";
import editLapiz from "../assets/EditLapiz.svg";
import exitIcon from "../assets/exitIcon.svg";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../controllers/auth";
import styles from "./AdminSideBar.module.scss";
import Loader from "./Loader";

export default function AdminSideBar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

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
        <Link to="/admin/perfil" className={styles.edit}>
          Editar Perfil
          <img src={editLapiz}></img>
        </Link>
      </div>
      <Link to="admin/dashboard" className={styles.option}>
        Dashboard
      </Link>
      <Link to="admin/obras" className={styles.option}>
        Obras
      </Link>
      <Link to="admin/tours" className={styles.option}>
        Tours
      </Link>
      <Link to="admin/usuarios" className={styles.option}>
        Usuarios
      </Link>
      <Link
        to="/"
        onClick={handleLogout}
        className={[styles.optionSpe, styles.close].join(" ")}
      >
        Cerrar Sesión <img src={exitIcon}></img>
      </Link>
    </div>
  );
}
