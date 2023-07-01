import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <AuthContextProvider>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}
