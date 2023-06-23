import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facebookIcon from "../assets/FacebookIcon.svg";
import googleIcon from "../assets/GoogleIcon.svg";
import instagramIcon from "../assets/InstagramIcon.svg";
import { useUsuario } from "../contexts/UserContext";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  singInWithFacebook,
  singInWithGoogle,
} from "../controllers/auth";
import Button from "./Button";
import styles from "./Login.module.scss";
import InputField from "./TextField";

export default function Login(props) {
  const [rightPanel, setRightPanel] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);
  const { user } = useUsuario();
  const navigate = useNavigate();

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

  const onSumbit = async (event) => {
    event.preventDefault();
    const { email, password, ...extraData } = formData;
    await registerWithEmailAndPassword(email, password, extraData);
    //navigate("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    association: "",
    sex: "",
    picture: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSingInWithGoogle = async () => {
    await singInWithGoogle();
    //navigate("/user/dashboard");
  };

  const handleSingInWithFacebook = async () => {
    await singInWithFacebook();
    //navigate("/user/dashboard");
  };

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleOnChangeLogin = (event) => {
    const { name, value } = event.target;
    setFormDataLogin({
      ...formData,
      [name]: value,
    });
  };

  const onSumbitLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formDataLogin;
    await loginWithEmailAndPassword(email, password);
    //navigate("/");
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
          <div className={styles.form}>
            <div className={styles.title}>Crea tu cuenta</div>
            <div className={styles.socialContainer}>
              <div className={styles.iconCursor}>
                <img src={instagramIcon}></img>
              </div>
              <div className={styles.iconCursor}>
                <img
                  src={facebookIcon}
                  onClick={handleSingInWithFacebook}
                ></img>
              </div>
              <div className={styles.iconCursor}>
                <img onClick={handleSingInWithGoogle} src={googleIcon}></img>
              </div>
            </div>
            <div className={styles.subtitle}>
              o utiliza un email para registrarte...
            </div>
            <form onSubmit={onSumbit}>
              <div className={styles.inputTop}>
                <InputField
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  className={styles.letra}
                  labelText="Nombre y apellido"
                  placeholder="Nombre"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  className={styles.letra}
                  labelText="Correo electrónico"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  className={styles.letra}
                  labelText="Contraseña"
                  placeholder="Contraseña"
                />
              </div>
              <Button size="base" className={styles.buttonCA}>
                Crear Cuenta
              </Button>
            </form>
          </div>
        </div>
        <div
          className={[styles.signInContainer, styles.formContainer].join(" ")}
        >
          <div className={styles.form}>
            <div className={styles.title}>Inicia Sesión</div>
            <div className={styles.socialContainer}>
              <div className={styles.iconCursor}>
                <img src={instagramIcon}></img>
              </div>
              <div className={styles.iconCursor}>
                <img
                  src={facebookIcon}
                  onClick={handleSingInWithFacebook}
                ></img>
              </div>
              <div className={styles.iconCursor}>
                <img onClick={handleSingInWithGoogle} src={googleIcon}></img>
              </div>
            </div>
            <div className={styles.subtitle}>
              o accede ingresando tu email...
            </div>
            <form onSubmit={onSumbitLogin}>
              <div className={styles.inputTop}>
                <InputField
                  type="email"
                  name="email"
                  onChange={handleOnChangeLogin}
                  className={styles.letra}
                  labelText="Correo electrónico"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="password"
                  name="password"
                  onChange={handleOnChangeLogin}
                  className={styles.letra}
                  labelText="Contraseña"
                  placeholder="Contraseña"
                />
              </div>
              <Button size="base" className={styles.buttonSpecial}>
                Iniciar Sesión
              </Button>
            </form>
            <Button variant="text" onClick={onClickAdmin}>
              ¿Tienes una cuenta de administrador?
            </Button>
          </div>
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
          <div className={styles.formulario}>
            <div className={styles.title}>
              Bienvenido de vuelta administrador!
            </div>
            <form className={styles.adminForm}>
              <div className={styles.inputTop}>
                <InputField
                  className={styles.letra}
                  labelText="Correo electrónico"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  className={styles.letra}
                  labelText="Contraseña"
                  placeholder="Contraseña"
                />
              </div>
              <Button size="base" className={styles.buttonCA}>
                Iniciar Sesión
              </Button>
            </form>
            <Button variant="text" onClick={onClickAdminF}>
              ¿No eres un administrador?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
