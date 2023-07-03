import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import HamburgerMenu from "./HamburgerMenu";
import Loader from "./Loader";
import styles from "./UserHeaderResponsive.module.scss";
import UserSideBar from "./UserSideBar";

export default function UserHeaderResponsive() {
  const { user, isLogged } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <div
          className={`${styles.sideBar} ${isOpen ? styles.sideBarOpen : ""}`}
        >
          <UserSideBar></UserSideBar>
        </div>
      </div>
      <div className={styles.container}>
        <Link to="/">
          <img src={logoImage} className={styles.logoImg}></img>
        </Link>
        {isLogged ? (
          user ? (
            <div className={styles.logged}>
              <Link to="/user/dashboard" className={styles.labelName}>
                {user.name}
              </Link>
              <Link to="/user/dashboard">
                <div className={styles.photo}>
                  <img className={styles.img} src={user.picture}></img>
                </div>
              </Link>
              <div onClick={handleClick}>
                <HamburgerMenu></HamburgerMenu>
              </div>
            </div>
          ) : (
            <div className={styles.loaderContainer}>
              <Loader></Loader>
            </div>
          )
        ) : (
          <Button href="login" size="medium">
            Ingresa a tu cuenta
          </Button>
        )}
      </div>
    </div>
  );
}
