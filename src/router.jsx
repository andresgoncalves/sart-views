import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import BlankPage from "./views/BlankPage";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import TourProfile from "./views/TourProfile";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<BlankPage />} />
      <Route path="/tours" element={<BlankPage />} />
      <Route path="/tours/:id" element={<TourProfile />} />
      <Route path="/obras" element={<BlankPage />} />
      <Route path="/obras:id" element={<BlankPage />} />
      <Route path="/calendario" element={<BlankPage />} />
      <Route path="/buscar" element={<BlankPage />} />
      <Route path="/user">
        <Route path="/user/dashboard" element={<BlankPage />} />
        <Route path="/user/perfil" element={<BlankPage />} />
      </Route>
      <Route path="/admin">
        <Route path="/admin/dashboard" element={<BlankPage />} />
        <Route path="/admin/obras" element={<BlankPage />} />
        <Route path="/admin/obras/:id" element={<BlankPage />} />
        <Route path="/admin/tours" element={<BlankPage />} />
        <Route path="/admin/tours/:id" element={<BlankPage />} />
        <Route path="/admin/usuarios" element={<BlankPage />} />
        <Route path="/admin/usuarios/:id" element={<BlankPage />} />
      </Route>
    </Route>
  )
);
