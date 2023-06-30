import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import LayoutAdmin from "./components/LayoutAdmin";
import PrivateRoute from "./components/PrivateRoute";
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
    <Route errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<BlankPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/buscar" element={<SearchPage />} />
        <Route path="/obras" element={<ArtworksPage />} />
        <Route path="/obras/:id" element={<ArtworkProfile />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourProfile />} />
        <Route
          path="/tours/:id/reservar"
          element={
            <PrivateRoute role="user">
              <TourProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route path="/user/dashboard" element={<ProfileUser />} />
          <Route path="/user/perfil" element={<EditUserProfile />} />
        </Route>
        <Route
          path="/login"
          element={
            <PrivateRoute role="public">
              <LoginPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <LayoutAdmin />
          </PrivateRoute>
        }
      >
        <Route path="/admin/obras" element={<AdminArtworksPage />} />
        <Route path="/admin/obras/:id" element={<AdminArtworkPage />} />
        <Route path="/admin/obras/crear" element={<AdminArtworkPage />} />
        <Route path="/admin/tours" element={<AdminToursPage />} />
        <Route path="/admin/tours/:id" element={<AdminTourPage />} />
        <Route path="/admin/tours/crear" element={<AdminTourPage />} />
        <Route path="/admin/usuarios" element={<BlankPage />} />
        <Route path="/admin/usuarios/:id" element={<BlankPage />} />
      </Route>
      <Route
        path="/admin/perfil"
        element={
          <PrivateRoute role="admin">
            <AdminProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Route>
  )
);
