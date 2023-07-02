import { Link } from "react-router-dom";
import editLapiz from "../assets/EditLapiz.svg";
import Loader from "./Loader";
import styles from "./UserList.module.scss";

/**
 * @typedef {{
 *   user: import("../controllers/users").UserData[];
 * }}
 */

export default function UserList({ user }) {
  if (!Array.isArray(user)) {
    return <Loader />;
  }

  return (
    <div className={styles.userList}>
      {user.map((data, key) => (
        <div key={key} className={styles.containerUser}>
          <div className={styles.containerInfo}>
            <div className={styles.name}>{data.name}</div>
            <div className={styles.email}>{data.email}</div>
          </div>
          <Link to={`/admin/usuarios/${data.id}`} className={styles.pencil}>
            <img src={editLapiz}></img>
          </Link>
        </div>
      ))}
    </div>
  );
}
