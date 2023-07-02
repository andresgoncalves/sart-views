import TextField from "../components/TextField";
import styles from "./AdminRegisterUser.module.scss";
import DropDownList from "../components/DropDownList";
import { useState } from "react";
import Button from "../components/Button";
import {  } from "../controllers/users";
import UploadPhoto from "../assets/UploadPhoto.svg";
import { useUsers } from "../hooks/users";

export default function AdminRegisterUser(){
    const user=useUsers(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        association: "",
        sex: "",
        profileImage: null,
    });

    const handleChange = (event) => {
        setFormData((data) => ({
          ...data,
          [event.target.name]: event.target.value,
        }));
      };

    return(
        <div className={styles.frame}>
            <div className={styles.title}>Datos del Usuario</div>
            <div className={styles.containerUser}>
                <div className={styles.Image}>
                    <div className={styles.profileImage}>
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt="Profile" />
                        ) : (
                            <div className={styles.emptyCircle}></div>
                        )}
                    </div>
                    <div className={styles.photoUpload}>
                        <Button variant="text">
                            Cambiar Foto
                            <img src={UploadPhoto}></img>
                        </Button>
                    </div>
                </div>
                <form className={styles.formContainer}>
                    <div className={styles.input}>
                        <TextField
                        type="text"
                        name="name"
                        value= {formData.name}
                        onChange={handleChange}
                        className={styles.letra}
                        labelText="Nombre y Apellido"
                        placeholder="Jhon Doe..."
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.letra}
                        labelText="Telefono"
                        placeholder="0414-22222222"
                        />
                    </div>
                    <div className={styles.input}>
                        <DropDownList
                        name="association"
                        labelText="Relacion con la universidad"
                        value={formData.association}
                        options={["Estudiante", "Profesor", "Visitante", "Autoridad"]}
                        onChange={handleChange}
                        placeholder="Seleccione..."
                        ></DropDownList>
                    </div>
                    <div className={styles.input}>
                        <DropDownList
                        name="sex"
                        labelText="Sexo"
                        value={formData.sex}
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
                <Button size="medium">
                Guardar Cambios
                </Button>
            </div>
        </div>
    );
}