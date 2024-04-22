import { createBrowserRouter } from "react-router-dom";
import ViewAllLostBoard from "./pages/lostBoard/ViewAllLostBoard";
import CreateLostBoard from "./pages/lostBoard/CreateLostBoard";
import Error from "./pages/Error";
import Layout from "./components/Layout";
import Login from "./pages/user/Login";

const router = createBrowserRouter([
  {
    path: "/viewAllLostBoard",
    element: <Layout />,
    errorElement: <Error />,
    children: [{ index: true, element: <ViewAllLostBoard /> }],
    // element: <ViewAllLostBoard />,
  },
  {
    path: "/createLostBoard",
    element: <Layout />,
    children: [{ index: true, element: <CreateLostBoard /> }],
  },
  {
    path: "/login",
    element: <Layout />,
    children: [{ index: true, element: <Login /> }],
  },
]);

export default router;
