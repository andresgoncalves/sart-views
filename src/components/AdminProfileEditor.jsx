import { deleteObject, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadPhoto from "../assets/UploadPhotoNegative.svg";
import { useAuth } from "../contexts/AuthContext";
import { getFileUrl } from "../controllers/storage";
import { updateUser } from "../controllers/users";
import { storage } from "../firebase";
import { useStorage } from "../hooks/storage";
import styles from "./AdminProfileEditor.module.scss";
import Button from "./Button";
import DropDownList from "./DropDownList";
import Loader from "./Loader";
import TextField from "./TextField";

const initialData = {
  admin: true,
  name: "",
  email: "",
  phone: "",
  association: "",
  sex: "",
  picture: "",
  id: "",
};

export default function AdminProfileEditor() {
  const { user } = useAuth();
  const [data, setData] = useState(initialData);
  const [Loaded, setLoaded] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [imageAnterior, setImageAnterior] = useState(null);
  const navigate = useNavigate();
  const storage1 = useStorage();

  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const imageInputRef = useRef();

  useEffect(() => {
    if (user) {
      setData({
        admin: true,
        name: user.name,
        email: user.email,
        phone: user.phone,
        association: user.association,
        sex: user.sex,
        picture: user.picture,
        id: user.id,
      });
      setImageAnterior(user.picture);
    }
  }, [user]);

  const handleChange = (event) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    if (imageAnterior.includes("UserPictures")) {
      const fileRef = ref(storage, imageAnterior);
      await deleteObject(fileRef);
    }
    updateUser(user.id, data);
    navigate("/admin/dashboard");
  };

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      setLoaded(false);
      const image = await storage1.upload(
        event.target.files[0],
        "usersPictures"
      );
      setImagePath(image);
      const url = await getFileUrl(image);
      setUrlPhoto(url);
      setData((data) => ({
        ...data,
        picture: url,
      }));
      setLoaded(true);
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
              Loaded == null ? (
                <img className={styles.img} src={user.picture}></img>
              ) : Loaded == true ? (
                <img className={styles.img} src={urlPhoto}></img>
              ) : (
                <div>
                  <Loader></Loader>
                </div>
              )
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
              <Button
                negative={true}
                variant="text"
                onClick={handleImageUpload}
              >
                Cambiar Foto
                <img src={UploadPhoto}></img>
              </Button>
            </div>
          </div>
        </div>
        <form className={styles.formContainer}>
          <div className={styles.input}>
            <TextField
              negative={true}
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={styles.letra}
              labelText="Nombre y Apellido"
              placeholder="Jhon Doe..."
            />
          </div>
          <div className={styles.input}>
            <TextField
              negative={true}
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className={styles.letra}
              labelText="Teléfono"
              placeholder="0414-22222222"
            />
          </div>
          <div className={styles.input}>
            <DropDownList
              negative={true}
              name="association"
              labelText="Departamento Asociado"
              value={data.association}
              options={["Biblioteca", "Cultura", "Sala Mendoza"]}
              onChange={handleChange}
              placeholder="Seleccione..."
            ></DropDownList>
          </div>
          <div className={styles.input}>
            <DropDownList
              negative={true}
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
        <Button
          href="/admin/dashboard"
          negative={true}
          variant="text"
          size="medium"
        >
          Cancelar
        </Button>
        <Button negative={true} size="medium" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
