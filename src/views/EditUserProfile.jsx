import Loader from "../components/Loader";
import UserProfileEditor from "../components/UserProfileEditor";
import { useAuth } from "../contexts/AuthContext";
import styles from "./EditUserProfile.module.scss";

export default function EditUserProfile() {
  const { user } = useAuth();
  return user ? (
    <div className={styles.mainContainer}>
      <UserProfileEditor userParam={user}></UserProfileEditor>
    </div>
  ) : (
    <div className={styles.loaderContainer}>
      <Loader></Loader>
    </div>
  );
}
