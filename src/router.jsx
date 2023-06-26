import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import { PrivateRoutePublic } from "./components/PrivateRoutePublic";
import { PrivateRouteUser } from "./components/PrivateRouteUser";
import AdminArtworkPage from "./views/AdminArtworkPage";
import AdminArtworksPage from "./views/AdminArtworksPage";
import AdminTourPage from "./views/AdminTourPage";
import AdminToursPage from "./views/AdminToursPage";
import ArtworksPage from "./views/ArtworksPage";
import BlankPage from "./views/BlankPage";
import CalendarPage from "./views/CalendarPage";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import ProfileUser from "./views/ProfileUser";
import SearchPage from "./views/SearchPage";
import TourProfile from "./views/TourProfile";
import ToursPage from "./views/ToursPage";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <PrivateRoutePublic>
            <LoginPage />
          </PrivateRoutePublic>
        }
      />
      <Route path="/registro" element={<BlankPage />} />
      <Route path="/calendario" element={<CalendarPage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/obras">
        <Route path="/obras" element={<ArtworksPage />} />
        <Route path="/obras/:id" element={<BlankPage />} />
      </Route>
      <Route path="/tours">
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourProfile />} />
        <Route
          path="/tours/:id/reservar"
          element={
            <PrivateRouteUser>
              <TourProfile />
            </PrivateRouteUser>
          }
        />
      </Route>
      <Route path="/user">
        <Route
          path="/user/dashboard"
          element={
            <PrivateRouteUser>
              <ProfileUser />
            </PrivateRouteUser>
          }
        />
        <Route
          path="/user/perfil"
          element={
            <PrivateRouteUser>
              <BlankPage />
            </PrivateRouteUser>
          }
        />
      </Route>
      <Route path="/admin">
        <Route path="/admin/dashboard" element={<BlankPage />} />
        <Route path="/admin/obras" element={<AdminArtworksPage />} />
        <Route path="/admin/obras/:id" element={<AdminArtworkPage />} />
        <Route path="/admin/obras/crear" element={<AdminArtworkPage />} />
        <Route path="/admin/tours" element={<AdminToursPage />} />
        <Route path="/admin/tours/:id" element={<AdminTourPage />} />
        <Route path="/admin/tours/crear" element={<AdminTourPage />} />
        <Route path="/admin/usuarios" element={<BlankPage />} />
        <Route path="/admin/usuarios/:id" element={<BlankPage />} />
      </Route>
    </Route>
  )
);
