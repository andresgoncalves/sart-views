import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import AdminEditor from "../components/AdminEditor";
import Button from "../components/Button";
import TabbedPanel from "../components/TabbedPanel";
import InputField from "../components/TextField";
import { useArtwork, useArtworks } from "../hooks/artworks";
import { useFiles, useStorage } from "../hooks/storage";
import styles from "./AdminArtworkPage.module.scss";

export default function AdminArtworkPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams({ categoria: "" });
  const storage = useStorage();
  const artworks = useArtworks();
  const artwork = useArtwork(id);

  /** @type {import("../controllers/artworks").ArtworkData} */
  const initialData = {
    name: "",
    category: searchParams.get("categoria"),
    author: "",
    year: "",
    location: "",
    department: "",
    description: "",
    images: [],
    relatedArtworks: [],
  };
  const [data, setData] = useState(initialData);
  const images = useFiles(data.images);

  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const imageInputRef = useRef();

  useEffect(() => {
    if (artwork.data) {
      setData(artwork.data);
    }
  }, [artwork.data]);

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
      const image = await storage.upload(event.target.files[0], "artworks");
      setData((data) => ({
        ...data,
        images: [image],
      }));
      if (id && artwork.data) {
        artwork.update({ images: [image] });
      }
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  return (
    <TabbedPanel
      name="artwork"
      tabs={["Datos de la Obra", "Galería de Imágenes"]}
    >
      <AdminEditor
        title="Datos de la Obra"
        content={
          <div className={styles.form}>
            <InputField
              name="name"
              labelText="Nombre de la obra"
              value={data.name}
              onChange={handleChange}
            />
            <InputField
              name="category"
              labelText="Categoría"
              value={data.category}
              onChange={handleChange}
            />
            <InputField
              name="author"
              labelText="Autor"
              value={data.author}
              onChange={handleChange}
            />
            <InputField
              name="year"
              labelText="Año"
              value={data.year}
              onChange={handleChange}
            />
            <InputField
              name="location"
              labelText="Ubicación"
              value={data.location}
              onChange={handleChange}
            />
            <InputField
              name="department"
              labelText="Departamento asociado"
              value={data.department}
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
          <div className={styles.formButtons}>
            <Button href="/admin/obras" variant="text">
              Volver
            </Button>
            <Button onClick={handleSubmit}>Guardar cambios</Button>
          </div>
        }
      />
      <AdminEditor
        title="Galería de Imágenes"
        content={
          <div className={styles.images}>
            {images[0] && <img src={images[0]} alt="" />}
            <input
              type="file"
              accept="image/*"
              value=""
              onChange={handleImageChange}
              ref={imageInputRef}
            />
          </div>
        }
        actions={
          <div className={styles.imagesButtons}>
            <Button onClick={handleImageUpload} variant="text">
              Seleccionar imagen
            </Button>
          </div>
        }
      />
    </TabbedPanel>
  );
}
