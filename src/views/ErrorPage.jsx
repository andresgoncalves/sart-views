import { Helmet } from "react-helmet-async";

export default function ErrorPage() {
  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>
    </>
  );
}
