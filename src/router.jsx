import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import LayoutAdmin from "./components/LayoutAdmin";
import { PrivateRouteAdmin } from "./components/PrivateRouteAdmin";
import { PrivateRoutePublic } from "./components/PrivateRoutePublic";
import { PrivateRouteUser } from "./components/PrivateRouteUser";
import AdminArtworkPage from "./views/AdminArtworkPage";
import AdminArtworksPage from "./views/AdminArtworksPage";
import AdminDashboard from "./views/AdminDashboard";
import AdminProfile from "./views/AdminProfile";
import AdminTourPage from "./views/AdminTourPage";
import AdminToursPage from "./views/AdminToursPage";
import ArtworkProfile from "./views/ArtworkProfile";
import ArtworksPage from "./views/ArtworksPage";
import BlankPage from "./views/BlankPage";
import CalendarPage from "./views/CalendarPage";
import EditUserProfile from "./views/EditUserProfile";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import ProfileUser from "./views/ProfileUser";
import SearchPage from "./views/SearchPage";
import TourProfile from "./views/TourProfile";
import ToursPage from "./views/ToursPage";

export default createBrowserRouter(
  createRoutesFromElements(
    <>
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
          <Route path="/obras/:id" element={<ArtworkProfile />} />
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
                <EditUserProfile />
              </PrivateRouteUser>
            }
          />
        </Route>
      </Route>
      <Route element={<LayoutAdmin />} errorElement={<ErrorPage />}>
        <Route path="/admin">
          <Route
            path="/admin/obras"
            element={
              <PrivateRouteAdmin>
                <AdminArtworksPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRouteAdmin>
                <AdminDashboard />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/obras/:id"
            element={
              <PrivateRouteAdmin>
                <AdminArtworkPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/obras/crear"
            element={
              <PrivateRouteAdmin>
                <AdminArtworkPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/tours"
            element={
              <PrivateRouteAdmin>
                <AdminToursPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/tours/:id"
            element={
              <PrivateRouteAdmin>
                <AdminTourPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/tours/crear"
            element={
              <PrivateRouteAdmin>
                <AdminTourPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <PrivateRouteAdmin>
                <BlankPage />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/usuarios/:id"
            element={
              <PrivateRouteAdmin>
                <BlankPage />
              </PrivateRouteAdmin>
            }
          />
        </Route>
      </Route>
      <Route path="/admin">
        <Route
          path="/admin/perfil/"
          element={
            <PrivateRouteAdmin>
              <AdminProfile />
            </PrivateRouteAdmin>
          }
        />
      </Route>
    </>
  )
);
