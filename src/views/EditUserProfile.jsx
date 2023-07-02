import Loader from "../components/Loader";
import UserProfileEditor from "../components/UserProfileEditor";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../hooks/users";
import styles from "./EditUserProfile.module.scss";

export default function EditUserProfile() {
  const {
    user: { id },
  } = useAuth();

  const user = useUser(id);

  return user.data ? (
    <div className={styles.mainContainer}>
      <UserProfileEditor user={user.data} update={user.update} />
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  );
}
