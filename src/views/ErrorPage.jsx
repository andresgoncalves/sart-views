import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DonateModal from "../components/DonateModal";

export default function ErrorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>

      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <DonateModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}
