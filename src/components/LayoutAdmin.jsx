import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import styles from "./LayoutAdmin.module.scss";

export default function LayoutAdmin() {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <AdminHeader></AdminHeader>
      </div>
      <div className={styles.sidebar}>
        <AdminSideBar></AdminSideBar>
      </div>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
