import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/LogoSartViews.svg";
import { useAuth } from "../contexts/AuthContext";
import styles from "./AdminDashboardHeader.module.scss";
import AdminSideBar from "./AdminSideBar";
import HamburgerMenu from "./HamburgerMenu";
import Loader from "./Loader";

export default function AdminDashboardHeader() {
  const { user } = useAuth();

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
          <AdminSideBar></AdminSideBar>
        </div>
      </div>
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
            <div onClick={handleClick}>
              <HamburgerMenu></HamburgerMenu>
            </div>
          </div>
        ) : (
          <div className={styles.loaderContainer}>
            <Loader></Loader>
          </div>
        )}
      </div>
    </div>
  );
}
