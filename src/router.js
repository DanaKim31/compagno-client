import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/QnaQ/Register";
import List from "./pages/QnaQ/List";
import Detail from "./pages/QnaQ/Detail";

const router = createBrowserRouter([
  {
    path: "/question",
    element: <Layout />,
    children: [
      { index: true, element: <List /> },
      { path: "/question/register", element: <Register /> },
      {
        path: "/question/detail/:qnaQCode",
        element: <Detail />,
      },
    ],
  },
]);

export default router;
