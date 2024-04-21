import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/User/SignUp";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import MyPage from "./pages/User/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "compagno/signUp",
        element: <SignUp />,
      },
      {
        path: "compagno/login",
        element: <Login />,
      },
      {
        path: "compagno/mypage",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
