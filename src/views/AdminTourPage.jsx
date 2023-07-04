import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AdminEditor from "../components/AdminEditor";
import ArtworksGrid from "../components/ArtworksGrid";
import Button from "../components/Button";
import SearchModal from "../components/SearchModal";
import StarRating from "../components/StarRating";
import TabbedPanel from "../components/TabbedPanel";
import InputField from "../components/TextField";
import { useArtworks } from "../hooks/artworks";
import { useReservations } from "../hooks/reservations";
import { useFiles, useStorage } from "../hooks/storage";
import { useTour, useTours } from "../hooks/tours";
import styles from "./AdminTourPage.module.scss";

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
  feedback: [],
};

export default function AdminTourPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const storage = useStorage();
  const tours = useTours();
  const tour = useTour(id);
  const tourArtworks = useMemo(() => tour.data?.artworks || [], [tour.data]);
  const artworks = useArtworks(tourArtworks);
  const reservations = useReservations();

  const [data, setData] = useState(initialData);
  const images = useFiles(data.images);

  /** @type {import("../controllers/reservations").ReservationData} */
  const initialReservationData = {
    tour: id,
    date: "",
    hour: "",
    users: [],
    limit: 30,
  };

  const [reservationData, setReservationData] = useState(
    initialReservationData
  );

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

  const handleReservationChange = (event) => {
    setReservationData((data) => ({
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

  const handleArtworksAdd = useCallback(
    async (/** @type {string[]} */ selectedArtworks) => {
      if (selectedArtworks.length > 0) {
        setData((data) => ({
          ...data,
          artworks: Array.from(
            new Set([...data.artworks, ...selectedArtworks])
          ),
        }));
        if (id && tour.data) {
          tour.update({
            artworks: Array.from(
              new Set([...data.artworks, ...selectedArtworks])
            ),
          });
        }
      }
      setModalOpen(false);
    },
    [data.artworks, id, tour]
  );

  const handleArtworkRemove = async (/** @type {string} */ id) => {
    setData((data) => ({
      ...data,
      artworks: data.artworks.filter((artwork) => artwork !== id),
    }));
    if (id && tour.data) {
      tour.update({
        artworks: tour.data.artworks.filter((artwork) => artwork !== id),
      });
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleReservation = () => {
    reservations.create(reservationData);
    setReservationData(initialReservationData);
  };

  return (
    <TabbedPanel
      name="tour"
      tabs={[
        "Datos del Tour",
        "Galería de Imágenes",
        "Obras incluidas",
        "Horarios",
        "Feedback",
      ]}
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
      <AdminEditor
        title="Obras incluidas"
        content={
          <>
            <ArtworksGrid
              artworks={artworks.data}
              target={null}
              onClick={(id) => handleArtworkRemove(id)}
            />
            {modalOpen && (
              <SearchModal
                closeModal={closeModal}
                onSubmit={handleArtworksAdd}
                exclude={data.artworks}
              />
            )}
          </>
        }
        actions={
          <div className={styles.imagesButtons}>
            <Button onClick={openModal} variant="text">
              Agregar obra
            </Button>
          </div>
        }
      />
      <div>
        <AdminEditor
          title="Horarios"
          content={
            <>
              <InputField
                name="date"
                labelText="Fecha:"
                placeholder="2023-12-31"
                pattern={/\d\d\d\d-\d\d-\d\d/.source}
                value={reservationData.date}
                onChange={handleReservationChange}
              />
              <InputField
                name="hour"
                labelText="Hora:"
                placeholder="12:00 PM"
                value={reservationData.hour}
                onChange={handleReservationChange}
              />
            </>
          }
          actions={
            <div className={styles.imagesButtons}>
              <Button onClick={handleReservation} variant="text">
                Agregar horario
              </Button>
            </div>
          }
        />
      </div>
      <AdminEditor
        title="Feedback"
        content={
          <>
            <div className={styles.averageRating}>
              <div className={styles.feedbackLabel}>
                Calificación promedio:{" "}
              </div>
              <StarRating value={data.rating} />
            </div>
            <div className={styles.feedbackList}>
              {data.feedback.map((feedback, key) => (
                <div key={key} className={styles.feedback}>
                  <div>
                    <div className={styles.feedbackLabel}>
                      ¿Qué tan satisfecho/a estás con el tour?
                    </div>
                    <div className={styles.feedbackValue}>
                      {feedback.satisfaction}
                    </div>
                  </div>
                  <div>
                    <div className={styles.feedbackLabel}>
                      ¿Qué fue lo que más te gustó?
                    </div>
                    <div className={styles.feedbackValue}>
                      {feedback.likedMost}
                    </div>
                  </div>
                  <div>
                    <div className={styles.feedbackLabel}>
                      ¿Asistirías a otro de nuestros Tours?
                    </div>
                    <div className={styles.feedbackValue}>
                      {feedback.wouldAssist}
                    </div>
                  </div>
                  <div>
                    <div className={styles.feedbackLabel}>
                      Califica este Tour:
                    </div>
                    <StarRating value={feedback.rating} />
                  </div>
                </div>
              ))}
            </div>
          </>
        }
      />
    </TabbedPanel>
  );
}
