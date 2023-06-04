import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const isLogged = false;
  const search = false;
  const isAdmin = false;
  return (
    <main>
      <Header isLogged={isLogged} search={search} isAdmin={isAdmin} />
      <section className="body">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
