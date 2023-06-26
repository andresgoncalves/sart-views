import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import styles from "./AdminHeader.module.scss";

export default function AdminHeader() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img src={logoImage} className={styles.logoImg}></img>
      </Link>
    </div>
  );
}
