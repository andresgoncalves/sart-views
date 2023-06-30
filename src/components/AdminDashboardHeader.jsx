import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import barIcon from "../assets/openBarIcon.svg";
import { useAuth } from "../contexts/AuthContext";
import styles from "./AdminDashboardHeader.module.scss";
import Loader from "./Loader";

export default function AdminDashboardHeader() {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <Link to="/">
        <img src={logoImage} className={styles.logoImg}></img>
      </Link>
      {user ? (
        <div className={styles.logged}>
          <Link to="/admin/dashboard" className={styles.labelName}>
            {user.name}
          </Link>
          <Link to="/admin/dashboard">
            <div className={styles.photo}>
              <img className={styles.img} src={user.picture}></img>
            </div>
          </Link>
          <Link to="">
            <img src={barIcon} className={styles.barIcon} alt="" />
          </Link>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <Loader></Loader>
        </div>
      )}
    </div>
  );
}
