import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <MediaQuery maxWidth={870}>
        <div className={styles.footer}>
          <div>
            <Link to="/">
              <img src={logoImage} className={styles.logoImg}></img>
            </Link>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={870}>
        {" "}
        <div className={styles.footer}>
          <div>
            <Link to="/">
              <img src={logoImage} className={styles.logoImg}></img>
            </Link>
          </div>
          <div className={styles.textContainer}>
            <div>0414-5324589</div>
            <div>SartViews@unimet.edu.ve</div>
            <div>Universidad Metropolitana</div>
          </div>
        </div>
      </MediaQuery>
    </>
  );
}
