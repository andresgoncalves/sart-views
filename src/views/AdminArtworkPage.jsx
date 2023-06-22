import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AdminEditor from "../components/AdminEditor";
import Button from "../components/Button";
import TabbedPanel from "../components/TabbedPanel";
import InputField from "../components/TextField";
import { useArtwork, useArtworks } from "../hooks/artworks";
import styles from "./AdminArtworkPage.module.scss";

/** @type {import("../controllers/artworks").ArtworkData} */
const initialData = {
  name: "",
  category: "",
  author: "",
  year: 2000,
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

  const [data, setData] = useState(artwork.data || initialData);

  const handleChange = useCallback(
    (event) => {
      const newData = { ...data };
      newData[event.target.name] = event.target.value;
      setData(newData);
    },
    [data]
  );

  const handleSubmit = useCallback(async () => {
    console.log(artwork);
    if (artwork.data) {
      artwork.update(data);
    } else {
      const id = await artworks.create(data);
      navigate(`/admin/obras/${id}`);
    }
  }, [navigate, artwork, artworks, data]);

  return (
    <TabbedPanel
      name="artwork"
      tabs={["Datos de la Obra", "Galería de Imágenes", "Obras Relacionadas"]}
    >
      <AdminEditor
        title="Datos de la Obra"
        form={
          <div className={styles.form}>
            <InputField
              name="name"
              labelText="Nombre de la obra"
              onChange={handleChange}
            />
            <InputField
              name="category"
              labelText="Clasificación"
              onChange={handleChange}
            />
            <InputField
              name="author"
              labelText="Autor"
              onChange={handleChange}
            />
            <InputField name="year" labelText="Año" onChange={handleChange} />
            <InputField
              name="location"
              labelText="Dirección"
              onChange={handleChange}
            />
            <InputField
              name="department"
              labelText="Departamento asociado"
              onChange={handleChange}
            />
            <InputField
              name="description"
              labelText="Descripción"
              onChange={handleChange}
              className={styles.description}
            />
          </div>
        }
        actions={
          <>
            <Button to="/admin/obras" variant="text">
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar cambios</Button>
          </>
        }
      />
    </TabbedPanel>
  );
}
