import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import AdminArtworkPage from "./views/AdminArtworkPage";
import BlankPage from "./views/BlankPage";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import TourProfile from "./views/TourProfile";
import ArtworksPage from "./views/ArtworksPage";
import ToursPage from "./views/ToursPage";
import ProfileUser from "./views/ProfileUser";


export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<BlankPage />} />
      <Route path="/tours" element={<ToursPage/>} />
      <Route path="/tours/:id" element={<TourProfile />} />
      <Route path="/obras" element={<ArtworksPage />} />
      <Route path="/obras:id" element={<BlankPage />} />
      <Route path="/calendario" element={<BlankPage />} />
      <Route path="/buscar" element={<BlankPage />} />
      <Route path="/user">
        <Route path="/user/dashboard" element={<ProfileUser />} />
        <Route path="/user/perfil" element={<BlankPage />} />
      </Route>
      <Route path="/admin">
        <Route path="/admin/dashboard" element={<BlankPage />} />
        <Route path="/admin/obras" element={<BlankPage />} />
        <Route path="/admin/obras/:id" element={<AdminArtworkPage />} />
        <Route path="/admin/obras/crear" element={<AdminArtworkPage />} />
        <Route path="/admin/tours" element={<BlankPage />} />
        <Route path="/admin/tours/:id" element={<BlankPage />} />
        <Route path="/admin/usuarios" element={<BlankPage />} />
        <Route path="/admin/usuarios/:id" element={<BlankPage />} />
      </Route>
    </Route>
  )
);
