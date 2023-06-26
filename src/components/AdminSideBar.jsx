import { Link } from "react-router-dom";
import editLapiz from "../assets/EditLapiz.svg";
import exitIcon from "../assets/exitIcon.svg";
import styles from "./AdminSideBar.module.scss";

export default function AdminSideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.photo}>
          <img></img>
        </div>
        <div className={styles.adminName}>Jack Mason</div>
        <Link to="/" className={styles.edit}>
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
      <Link to="/" className={[styles.optionSpe, styles.close].join(" ")}>
        Cerrar Sesión <img src={exitIcon}></img>
      </Link>
    </div>
  );
}
