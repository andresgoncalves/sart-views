import { Helmet } from "react-helmet-async";
import Button from "../components/Button";

export default function HomePage() {
  return (
    <>
      <Helmet title="Inicio" />
      <h1>Inicio</h1>
      <Button onClick={() => alert("¡Hola!")}>Click</Button>
    </>
  );
}
