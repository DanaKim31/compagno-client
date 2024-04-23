import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/", //  경로
    element: <Home />,
  },
]);

export default router;
