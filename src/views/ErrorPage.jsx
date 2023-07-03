import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DonateModal from "../components/DonateModal";
import ReserveModal from "../components/ReserveModal";
import AddWayPointModal from "../components/AddWayPointModal";

export default function ErrorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>


    </>
  );
}
