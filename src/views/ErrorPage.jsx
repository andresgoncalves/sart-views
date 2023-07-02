import { Helmet } from "react-helmet-async";
import FeedBackModal from "../components/FeedbackModal";
import { useState } from "react";


export default function ErrorPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && <FeedBackModal closeModal={closeModal} />}
    </>
  );
}
