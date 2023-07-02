import { useParams } from "react-router-dom";
import UserProfileEditor from "../components/UserProfileEditor";
import { useUser } from "../hooks/users";
import styles from "./AdminUpdateUser.module.scss";

export default function AdminUpdateUser() {
  const { id } = useParams();
  const user = useUser(id);

  return (
    <>
      <div className={styles.title}>Datos del Usuario</div>
      <div className={styles.containerInfo}>
        <UserProfileEditor user={user.data} update={user.update} />
      </div>
    </>
  );
}
