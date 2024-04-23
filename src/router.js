import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterInstitution from "./pages/register pet/RegisterInstitution";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterInstitution />,
    // children: [{ index: true, element: <RegisterInstitution />}],
  },
]);

export default router;
