import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { uploadFile } from "../controllers/storage";
import SearchModal from "../components/SearchModal";
import PaypalModal from "../components/PaypalModal";
import TextField from "../components/TextField";

export default function ErrorPage() {
  const [image, setImage] = useState("");


  return (
    <>
      <Helmet title="Error 404" />
      <h1>Página no encontrada 🚨</h1>
      <input
        type="file"
        accept="image/*"
        onChange={async (event) =>
          event.target.files.length > 0 &&
          setImage(await uploadFile(event.target.files[0], "test/test2"))
        }
      />
      <img src={image} />
    </>
  );
}
