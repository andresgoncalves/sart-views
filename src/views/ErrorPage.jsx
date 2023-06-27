import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { uploadFile } from "../controllers/storage";
import SearchModal from "../components/SearchModal";
import PaypalModal from "../components/PaypalModal";

export default function ErrorPage() {
  const [image, setImage] = useState("");

     const [modalOpen, setModalOpen] = useState(false);

   const openModal = () => setModalOpen(true);
   const closeModal = () => setModalOpen(false);

  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>
      <input
        type="file"
        accept="image/*"
        onChange={async (event) =>
          event.target.files.length > 0 &&
          setImage(await uploadFile(event.target.files[0], "test/test2"))
        }
      />
      <img src={image} />
    </>
  );
}
