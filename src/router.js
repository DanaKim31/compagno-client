import { createBrowserRouter } from "react-router-dom";
import ViewAllLostBoard from "./pages/lostBoard/ViewAllLostBoard";
import Error from "./pages/Error";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/viewAllLostBoard",
    element: <Layout />,
    errorElement: <Error />,
    children: [{ index: true, element: <ViewAllLostBoard /> }],
    // element: <ViewAllLostBoard />,
  },
]);

export default router;
