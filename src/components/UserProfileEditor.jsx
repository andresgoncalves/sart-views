import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadPhoto from "../assets/UploadPhoto.svg";
import { getFileUrl } from "../controllers/storage";
import { useStorage } from "../hooks/storage";
import Button from "./Button";
import DropDownList from "./DropDownList";
import Loader from "./Loader";
import TextField from "./TextField";
import styles from "./UserProfileEditor.module.scss";

const initialData = {
  name: "",
  email: "",
  phone: "",
  association: "",
  sex: "",
  picture: "",
  id: "",
};

/**
 * @typedef {{
 *   user: import("../controllers/users").UserData;
 *   update: (
 *     data: Partial<import("../controllers/users").UserData>
 *   ) => Promise<void>;
 * }} UserProfileEditorProps
 */

/** @param {UserProfileEditorProps} props */
export default function UserProfileEditor({ user, update }) {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const storage = useStorage();

  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const imageInputRef = useRef();

  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        association: user.association,
        sex: user.sex,
        picture: user.picture,
        id: user.id,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    await update(data);
    navigate("/user/dashboard");
  };

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      const image = await storage.upload(
        event.target.files[0],
        "usersPictures"
      );
      const url = await getFileUrl(image);
      setData((data) => ({
        ...data,
        picture: url,
      }));
      if (user) {
        update({ picture: url });
      }
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.UserInfoContainer}>
          <div className={styles.photo}>
            {user ? (
              <img className={styles.img} src={data.picture}></img>
            ) : (
              <div>
                <Loader></Loader>
              </div>
            )}
          </div>
          {user ? (
            <div className={styles.edit}>{user.name}</div>
          ) : (
            <div>
              <Loader></Loader>
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              value=""
              ref={imageInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div className={styles.photoUpload}>
              <Button variant="text" onClick={handleImageUpload}>
                Cambiar Foto
                <img src={UploadPhoto}></img>
              </Button>
            </div>
          </div>
        </div>
        <form className={styles.formContainer}>
          <div className={styles.input}>
            <TextField
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={styles.letra}
              labelText="Nombre y Apellido"
              placeholder="Ingrese su nombre completo"
            />
          </div>
          <div className={styles.input}>
            <TextField
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className={styles.letra}
              labelText="Telefono"
              placeholder="Ingrese su número de teléfono"
            />
          </div>
          <div className={styles.input}>
            <DropDownList
              name="association"
              labelText="Relacion con la universidad"
              value={data.association}
              options={["Estudiante", "Profesor", "Visitante", "Autoridad"]}
              onChange={handleChange}
              placeholder="Seleccione..."
            ></DropDownList>
          </div>
          <div className={styles.input}>
            <DropDownList
              name="sex"
              labelText="Sexo"
              value={data.sex}
              options={["Masculino", "Femenino", "Otro"]}
              onChange={handleChange}
              placeholder="Seleccione..."
            ></DropDownList>
          </div>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <Button href="/user/dashboard" variant="text" size="medium">
          Cancelar
        </Button>
        <Button size="medium" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
