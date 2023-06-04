import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <Link to="/">
          <img src={logoImage} className={styles.logoImg}></img>
        </Link>
      </div>
      <div className={styles.textContainer}>
        <div> 0414-2222222</div>
        <div>ejemplo@unimet.edu.ve</div>
        <div>Universidad Metropolitana</div>
      </div>
    </div>
  );
}
