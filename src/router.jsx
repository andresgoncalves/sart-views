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
import ArtworksPage from "./views/ArtworksPage";



export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<BlankPage />} />
        <Route path="/tours" element={<BlankPage />} />
        <Route path="/calendario" element={<BlankPage />} />
        <Route path="/userDashboard" element={<BlankPage />} />
        <Route path="/adminDashboard" element={<BlankPage />} />
        <Route path="/profiletour" element={<TourProfile/>}/>
        <Route path="/obras" element={<ArtworksPage />}/>
      </Route>
    </Route>
  )
);
