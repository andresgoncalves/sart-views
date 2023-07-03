import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facebookIcon from "../assets/FacebookIcon.svg";
import googleIcon from "../assets/GoogleIcon.svg";
import { useAuth } from "../contexts/AuthContext";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  singInWithFacebook,
  singInWithGoogle,
} from "../controllers/auth";
import { getUserByEmail } from "../controllers/users";
import Button from "./Button";
import styles from "./Login.module.scss";
import InputField from "./TextField";

export default function Login() {
  const [rightPanel, setRightPanel] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);
  const { user } = useAuth();
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
    if (signUpData.name === '') {
      alert('Por favor llenar todos los campos');
    } else {
        if((signUpData.name.length)>20){
          alert("El nombre ingresado excede el número de caracteres válido")
        }else{
          const { email, password, ...extraData } = signUpData;
          await registerWithEmailAndPassword(email, password, extraData);
          navigate("/user/dashboard");
        } 
      }
  };

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    association: "",
    sex: "",
    picture: "",
    password: "",
    admin: false,
    favoritesArtworks: [],
  });

  const handleSignUpChange = (event) => {
    
    const { name, value } = event.target;
    setSignUpData((data) => (
      {
      ...data,
      [name]: value,
    }));
  };

  const handleSingInWithGoogle = async () => {
    await singInWithGoogle();
    navigate("/user/dashboard");
  };

  const handleSingInWithFacebook = async () => {
    await singInWithFacebook();
    navigate("/user/dashboard");
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSumbitLogin = async (event) => {
    event.preventDefault();
    const { email, password } = loginData;
    const usuario = await getUserByEmail(email);
    console.log(signUpData.name)
    
      if (!usuario.admin) {
        await loginWithEmailAndPassword(email, password);
        navigate("/admin/dashboard");
      } else {
        alert(
          "Ups! parece que la cuenta que ha ingresado es una cuenta de administrador"
        );
      }
  };

  const onSumbitLoginAdmin = async (event) => {
    event.preventDefault();
    const { email, password } = loginData;
    const usuario = await getUserByEmail(email);
    if (usuario.admin) {
      await loginWithEmailAndPassword(email, password);
      navigate("/admin/dashboard");
    } else {
      alert(
        "Ups! parece que la cuenta que ha ingresado no es una cuenta de administrador"
      );
    }
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
            <form onSubmit={onSumbit} className={styles.formInterno}>
              <div className={styles.inputTop}>
                <InputField
                  type="text"
                  name="name"
                  onChange={handleSignUpChange}
                  className={styles.letra}
                  labelText="Nombre y apellido"
                  placeholder="Nombre"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="email"
                  name="email"
                  onChange={handleSignUpChange}
                  className={styles.letra}
                  labelText="Correo electrónico"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="password"
                  name="password"
                  onChange={handleSignUpChange}
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
            <form onSubmit={onSumbitLogin} className={styles.formInterno}>
              <div className={styles.inputTop}>
                <InputField
                  type="email"
                  name="email"
                  onChange={handleLoginChange}
                  className={styles.letra}
                  labelText="Correo electrónico"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="password"
                  name="password"
                  onChange={handleLoginChange}
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
            <form
              onSubmit={onSumbitLoginAdmin}
              className={[styles.adminForm, styles.formInterno].join(" ")}
            >
              <div className={styles.inputTop}>
                <InputField
                  type="email"
                  name="email"
                  onChange={handleLoginChange}
                  className={styles.letra}
                  labelText="Correo electrónico"
                  placeholder="Email"
                />
              </div>
              <div className={styles.input}>
                <InputField
                  type="password"
                  name="password"
                  onChange={handleLoginChange}
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
