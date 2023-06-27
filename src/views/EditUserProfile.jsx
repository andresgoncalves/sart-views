import UserProfileEditor from "../components/UserProfileEditor";
import styles from "./EditUserProfile.module.scss";

export default function EditUserProfile() {
  return (
    <div className={styles.mainContainer}>
      <UserProfileEditor></UserProfileEditor>
    </div>
  );
}
