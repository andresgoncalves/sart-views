import AdminHeader from "../components/AdminHeader";
import AdminProfileEditor from "../components/AdminProfileEditor";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";
import styles from "./AdminProfile.module.scss";

export default function AdminProfile() {
  const { user } = useAuth();
  return (
    <>
      <div className={styles.header}>
        <AdminHeader></AdminHeader>
      </div>
      {user ? (
        <div className={styles.mainContainer}>
          <AdminProfileEditor></AdminProfileEditor>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <Loader></Loader>
        </div>
      )}
    </>
  );
}
