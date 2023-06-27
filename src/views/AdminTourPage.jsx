import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AdminEditor from "../components/AdminEditor";
import Button from "../components/Button";
import TabbedPanel from "../components/TabbedPanel";
import InputField from "../components/TextField";
import { useFiles, useStorage } from "../hooks/storage";
import { useTour, useTours } from "../hooks/tours";
import styles from "./AdminTourPage.module.scss";
import SearchModal from "../components/SearchModal";

/** @type {import("../controllers/tours").TourData} */
const initialData = {
  name: "",
  department: "",
  location: "",
  duration: 0,
  description: "",
  rating: 0,
  artworks: [],
  images: [],
  pointsOfInterest: [],
  relatedTours: [],
};

export default function AdminTourPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const storage = useStorage();
  const tours = useTours();
  const tour = useTour(id);

  const [data, setData] = useState(initialData);
  const images = useFiles(data.images);

  /** @type {React.MutableRefObject<HTMLInputElement>} */
  const imageInputRef = useRef();

  useEffect(() => {
    if (tour.data) {
      setData(tour.data);
    }
  }, [tour]);

  const handleChange = (event) => {
    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (tour.data) {
      tour.update(data);
    } else {
      const id = await tours.create(data);
      navigate(`/admin/tours/${id}`);
    }
  }, [navigate, tour, tours, data]);

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      /** @type {string[]} */
      const images = await Promise.all(
        Array.from(event.target.files).map((file) =>
          storage.upload(file, "tours")
        )
      );
      setData((data) => ({
        ...data,
        images: [...data.images, ...images],
      }));
      if (id && tour.data) {
        tour.update({ images: [...tour.data.images, ...images] });
      }
    }
  };
  const handleImageDelete = async (event) => {
    const { path } = event.target.dataset;
    if (path) {
      setData((data) => ({
        ...data,
        images: data.images.filter((image) => image !== path),
      }));
      if (id && tour.data) {
        tour.update({
          images: tour.data.images.filter((image) => image !== path),
        });
      }
      await storage.delete(path);
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };
//Esto es para el modal
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <TabbedPanel
      name="tour"
      tabs={["Datos del Tour", "Galería de Imágenes", "Tours Relacionadas"]}
    >
      <AdminEditor
        title="Datos del Tour"
        content={
          <div className={styles.form}>
            <InputField
              name="name"
              labelText="Nombre del tour"
              value={data.name}
              onChange={handleChange}
            />
            <InputField
              name="department"
              labelText="Departamento"
              value={data.department}
              onChange={handleChange}
            />
            <InputField
              name="location"
              labelText="Ubicación"
              value={data.location}
              onChange={handleChange}
            />
            <InputField
              name="duration"
              labelText="Duración"
              value={data.duration}
              onChange={handleChange}
            />
            <InputField
              name="description"
              labelText="Descripción"
              value={data.description}
              onChange={handleChange}
              className={styles.description}
            />
          </div>
        }
        actions={
          <div className={styles.formButtons}>
            <Button href="/admin/tours" variant="text">
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Guardar cambios</Button>
          </div>
        }
      />
      <AdminEditor
        title="Galería de Imágenes"
        content={
          <div className={styles.images}>
            {images?.map((image, key) => (
              <img
                key={key}
                src={image}
                alt=""
                data-path={data.images[key]}
                onClick={handleImageDelete}
              />
            ))}
            <input
              type="file"
              accept="image/*"
              multiple={true}
              value=""
              onChange={handleImageChange}
              ref={imageInputRef}
            />
          </div>
        }
        actions={
          <div className={styles.imagesButtons}>
            <Button onClick={handleImageUpload} variant="text">
              Agregar imagen
            </Button>
          </div>
        }
      />

      {/* Esto es para inicializar el modal, lo comento porque no me quedó claro si aqui quieres el botón y como lo quieres, avísame */}
      {/* <Button onClick={openModal}>Agregar Obra </Button>
      {modalOpen && <SearchModal closeModal={closeModal} />} */}
    </TabbedPanel>
  );
}
