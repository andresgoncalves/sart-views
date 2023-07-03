import { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFiles } from "../hooks/storage";
import { useTour } from "../hooks/tours";
import Button from "./Button";
import styles from "./DetailedTourCard.module.scss";
import FeedBackModal from "./FeedbackModal";
import StarRating from "./StarRating";

/**
 * @typedef {{
 *   data: import("../controllers/tours").TourData;
 *   status?: "available" | "unavailable" | "reserved" | "visited";
 *   size?: "large" | "base" | "small";
 * }} DetailedTourCardProps
 */

/** @param {DetailedTourCardProps} props */
export default function DetailedTourCard({
  data: { id, name, description, location, images: imagePaths, rating },
  status = "available",
  size = "base",
}) {
  const { user } = useAuth();
  const tour = useTour(id);
  const images = useFiles(imagePaths);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedback = useCallback(
    (/** @type {import("../controllers/tours").FeedbackData} */ feedback) => {
      tour.feedback({ ...feedback, user: user?.id });
      setShowFeedback(false);
    },
    [tour, user]
  );

  return (
    <div className={[styles.card, styles[size]].join(" ")}>
      <img className={styles.image} src={images[0]} alt="" />
      <div className={styles.content}>
        <div className={styles.details}>
          <div className={styles.title}>{name}</div>
          <div>{description}</div>
          <StarRating value={rating} />
        </div>
        <div className={styles.location}>{location}</div>
        {status === "available" ? (
          <div className={styles.buttons}>
            <Button
              href={`/tours/${id}`}
              variant="text"
              size={size === "small" ? "small" : "base"}
            >
              Detalles
            </Button>
            <Button
              href={`/tours/${id}/reservar`}
              size={size === "small" ? "small" : "base"}
            >
              Reservar
            </Button>
          </div>
        ) : status === "unavailable" ? (
          <div className={styles.buttons}>
            <Button
              href={`/tours/${id}`}
              variant="text"
              size={size === "small" ? "small" : "base"}
            >
              Detalles
            </Button>
          </div>
        ) : status === "reserved" ? (
          <div className={styles.buttons}>
            <Button
              href={`/tours/${id}`}
              variant="text"
              size={size === "small" ? "small" : "base"}
            >
              Detalles
            </Button>
            <div className={styles.reserved}>Reservado</div>
          </div>
        ) : (
          <div className={styles.buttons}>
            <Button
              href={`/tours/${id}`}
              variant="text"
              size={size === "small" ? "small" : "base"}
            >
              Detalles
            </Button>
            <Button
              size={size === "small" ? "small" : "base"}
              onClick={() => setShowFeedback(true)}
            >
              Calificar
            </Button>
          </div>
        )}
      </div>
      {showFeedback && (
        <FeedBackModal
          closeModal={() => setShowFeedback(false)}
          onSubmit={handleFeedback}
        />
      )}
    </div>
  );
}
