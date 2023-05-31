import { createBrowserRouter } from "react-router-dom";
import BlankPage from "./views/BlankPage";
import ErrorPage from "./views/ErrorPage";
import HomePage from "./views/HomePage";

export default createBrowserRouter([
  { path: "/", Component: HomePage, ErrorBoundary: ErrorPage },
  { path: "/login", Component: BlankPage },
  { path: "/registro", Component: BlankPage },
  { path: "/obras", Component: BlankPage },
  { path: "/tours", Component: BlankPage },
  { path: "/calendario", Component: BlankPage },
]);
