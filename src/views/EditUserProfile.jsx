import Loader from "../components/Loader";
import UserProfileEditor from "../components/UserProfileEditor";
import { useAuth } from "../contexts/AuthContext";
import styles from "./EditUserProfile.module.scss";

export default function EditUserProfile() {
  const { user, update } = useAuth();

  return user ? (
    <div className={styles.mainContainer}>
      <UserProfileEditor user={user} update={update} />
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  );
}
