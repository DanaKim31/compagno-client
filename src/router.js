import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
