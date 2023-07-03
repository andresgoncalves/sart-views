import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FeedBackModal from "../components/FeedbackModal";
import { useAuth } from "../contexts/AuthContext";
import { useTour } from "../hooks/tours";

export default function ErrorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const { user } = useAuth();
  const tour = useTour("9kki0mbTUSYnSloR26xv");

  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>

      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <FeedBackModal
          closeModal={() => setIsModalOpen(false)}
          onSubmit={(feedback) => {
            tour.feedback({ ...feedback, user: user.id });
          }}
        />
      )}
    </>
  );
}
