import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/QnaQ/Register";
import List from "./pages/QnaQ/List";
import Detail from "./pages/QnaQ/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <List /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/detail/:qnaQCode",
    element: <Layout />,
    children: [{ index: true, element: <Detail /> }],
  },
]);

export default router;
