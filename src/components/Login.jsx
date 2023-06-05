import { useState } from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../assets/FacebookIcon.svg";
import googleIcon from "../assets/GoogleIcon.svg";
import instagramIcon from "../assets/InstagramIcon.svg";
import Button from "./Button";
import styles from "./Login.module.scss";

export default function Login(props) {
  const [rightPanel, setRightPanel] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);

  const onClickAdmin = () => {
    setAdminPanel(true);
  };

  const onClickAdminF = () => {
    setAdminPanel(false);
  };

  const onClickSignIn = () => {
    setRightPanel(false);
  };

  const onClickSignUp = () => {
    setRightPanel(true);
  };

  return (
    <div className={styles.body}>
      <div
        className={
          rightPanel
            ? `${styles.container} ${styles.rightPanelActive}`
            : styles.container
        }
      >
        <div
          className={[styles.signUpContainer, styles.formContainer].join(" ")}
        >
          <form action="#">
            <div className={styles.title}>Crea tu cuenta</div>
            <div className={styles.socialContainer}>
              <Link to="#">
                <img src={instagramIcon}></img>
              </Link>
              <Link to="#">
                <img src={facebookIcon}></img>
              </Link>
              <Link to="#">
                <img src={googleIcon}></img>
              </Link>
            </div>
            <div className={styles.subtitle}>
              o utiliza un email para registrarte...
            </div>
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <Button size="base" className={styles.buttonCA}>
              Crear Cuenta
            </Button>
          </form>
        </div>
        <div
          className={[styles.signInContainer, styles.formContainer].join(" ")}
        >
          <form action="#">
            <div className={styles.title}>Ingresa a tu cuenta</div>
            <div className={styles.socialContainer}>
              <Link to="#">
                <img src={instagramIcon}></img>
              </Link>
              <Link to="#">
                <img src={facebookIcon}></img>
              </Link>
              <Link to="#">
                <img src={googleIcon}></img>
              </Link>
            </div>
            <div className={styles.subtitle}>
              o inicia sesión con tu email...
            </div>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <a href="#" className={styles.subtitle}>
              ¿Olvidaste tu contraseña?
            </a>
            <Button size="base" className={styles.button}>
              Iniciar Sesión
            </Button>
            <Button variant="text" onClick={onClickAdmin}>
              ¿Tienes una cuenta de administrador?
            </Button>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div
              className={[styles.overlayPanel, styles.overlayLeft].join(" ")}
            >
              <div className={styles.title}>¿Ya Tienes Una Cuenta?</div>
              <div className={styles.subtitle2}>
                Inicia sesión para acceder a tu cuenta y conocer todos los tours
                artísticos que tenemos para ofrecerte!
              </div>
              <Button
                size="base"
                className={[styles.button, styles.ghost].join(" ")}
                onClick={onClickSignIn}
              >
                Iniciar Sesión
              </Button>
            </div>
            <div
              className={[styles.overlayPanel, styles.overlayRight].join(" ")}
            >
              <div className={styles.title}>¿No Tienes Una Cuenta?</div>
              <div className={styles.subtitle2}>
                Registrate para poder acceder a la plataforma y conocer todos
                los recorridos artísticos que tiene la Unimet exclusivamente
                para ti!
              </div>
              <Button
                size="base"
                className={[styles.button, styles.ghost].join(" ")}
                onClick={onClickSignUp}
              >
                Crear Cuenta
              </Button>
            </div>
          </div>
        </div>
        <div
          className={
            adminPanel ? styles.adminCardEnabled : styles.adminCardDisabled
          }
        >
          <form action="#">
            <div className={styles.title}>Ingresa a tu cuenta</div>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Contraseña" />
            <Button size="base" className={styles.button}>
              Iniciar Sesión
            </Button>
            <Button variant="text" onClick={onClickAdminF}>
              ¿No eres un administrador?
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}