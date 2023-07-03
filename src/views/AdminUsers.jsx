import unimet from "../assets/unimet.jpg";
import UserList from "../components/UserList";
import { useUsers } from "../hooks/users";
import styles from "./AdminUsers.module.scss";

export default function AdminUsers() {
  const users = useUsers();

  return (
    <>
      <section>
        <div className={styles.header}>
          <div
            className={styles.banner}
            style={{ backgroundImage: `url(${unimet})` }}
          >
            <div className={styles.title}>LISTA DE USUARIOS</div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.userBox}>
          <UserList user={users.data}></UserList>
        </div>
      </section>
    </>
  );
}
