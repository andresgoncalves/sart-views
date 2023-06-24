import { Helmet } from "react-helmet-async";
import { useState } from "react";
import HourModal from "../components/HourModal";

export default function ErrorPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () =>{
    setModalOpen(true);
  }

  const closeModal = () =>{
    setModalOpen(false);
  };

  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>
      <button onClick={() => openModal()}>Abrir Modal</button>
      
      <button onClick={() => closeModal()}>Cerrar Modal</button>
      

      {modalOpen && (        
        <HourModal></HourModal>
      )}
    </>
  );
}
