import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import BlankPage from "./views/BlankPage";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<BlankPage />} />
        <Route path="/registro" element={<BlankPage />} />
        <Route path="/obras" element={<BlankPage />} />
        <Route path="/tours" element={<BlankPage />} />
        <Route path="/calendario" element={<BlankPage />} />
        <Route path="/userDashboard" element={<BlankPage />} />
        <Route path="/adminDashboard" element={<BlankPage />} />
      </Route>
    </Route>
  )
);
