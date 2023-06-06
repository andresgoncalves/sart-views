import { Helmet } from "react-helmet-async";
import Calendar from "../components/Calendar";

export default function BlankPage() {
  return (
    <>
      <Helmet title="En progreso" />
      <h1>Página en construcción 🚧</h1>
      <div>
        <Calendar></Calendar>
      </div>
    </>
  );
}
