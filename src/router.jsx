import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BlankPage from "./views/BlankPage";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<BlankPage />} />
      <Route path="/registro" element={<BlankPage />} />
      <Route path="/obras" element={<BlankPage />} />
      <Route path="/tours" element={<BlankPage />} />
      <Route path="/calendario" element={<BlankPage />} />
    </Route>
  )
);
