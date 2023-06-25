import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AdminForm from "../components/AdminForm";
import AdminMedia from "../components/AdminMedia";
import Button from "../components/Button";
import TabbedPanel from "../components/TabbedPanel";
import InputField from "../components/TextField";
import { uploadFile } from "../controllers/storage";
import { useArtwork, useArtworks } from "../hooks/artworks";
import styles from "./AdminArtworkPage.module.scss";

/** @type {import("../controllers/artworks").ArtworkData} */
const initialData = {
  name: "",
  category: "",
  author: "",
  year: 0,
  location: "",
  department: "",
  description: "",
  picture: "",
  relatedArtworks: [],
};

export default function AdminArtworkPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const artworks = useArtworks();
  const artwork = useArtwork(id);

  const [data, setData] = useState(initialData);

  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const imageInputRef = useRef();

  useEffect(() => {
    if (artwork.data) {
      setData(artwork.data);
    }
  }, [artwork]);

  const handleChange = (event) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (artwork.data) {
      artwork.update(data);
    } else {
      const id = await artworks.create(data);
      navigate(`/admin/obras/${id}`);
    }
  }, [navigate, artwork, artworks, data]);

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      const url = await uploadFile(event.target.files[0], "artworks");
      console.log(url);
      setData((data) => ({
        ...data,
        picture: url,
      }));
      if (id) {
        handleSubmit();
      }
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <TabbedPanel
      name="artwork"
      tabs={["Datos de la Obra", "Galería de Imágenes", "Obras Relacionadas"]}
    >
      <AdminForm
        title="Datos de la Obra"
        form={
          <div className={styles.form}>
            <InputField
              name="name"
              labelText="Nombre de la obra"
              value={data?.name}
              onChange={handleChange}
            />
            <InputField
              name="category"
              labelText="Clasificación"
              value={data?.category}
              onChange={handleChange}
            />
            <InputField
              name="author"
              labelText="Autor"
              value={data?.author}
              onChange={handleChange}
            />
            <InputField
              name="year"
              labelText="Año"
              value={data?.year}
              onChange={handleChange}
            />
            <InputField
              name="location"
              labelText="Dirección"
              value={data?.location}
              onChange={handleChange}
            />
            <InputField
              name="department"
              labelText="Departamento asociado"
              value={data?.department}
              onChange={handleChange}
            />
            <InputField
              name="description"
              labelText="Descripción"
              onChange={handleChange}
              value={data?.description}
              className={styles.description}
            />
          </div>
        }
        actions={
          <>
            <Button href="/admin/obras" variant="text">
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar cambios</Button>
          </>
        }
      />
      <AdminMedia
        title="Galería de Imágenes"
        media={
          <div className={styles.media}>
            {data.picture && <img src={data.picture} alt="" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputRef}
            />
          </div>
        }
        actions={
          <>
            <Button onClick={handleImageUpload} variant="text">
              Seleccionar imagen
            </Button>
          </>
        }
      />
    </TabbedPanel>
  );
}
