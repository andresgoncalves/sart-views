import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import { uploadFile } from "../controllers/storage";
import HourModal from "../components/HourModal";

export default function ErrorPage() {
  const [image, setImage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>
      <AdminDashboardHeader></AdminDashboardHeader>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && <HourModal closeModal={closeModal} />}
    </>
  );
}
