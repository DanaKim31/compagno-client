import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/QnaQ/Register";
import List from "./pages/QnaQ/List";
import Detail from "./pages/QnaQ/Detail";
import SignUp from "./pages/User/SignUp";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import MyPageMyInfo from "./pages/User/MyPageMyInfo";
import MyPageMyActivity from "./pages/User/MyPageMyActivity";
import ViewAllLostBoard from "./pages/lostBoard/ViewAllLostBoard";
import CreateLostBoard from "./pages/lostBoard/CreateLostBoard";
import Error from "./pages/Error";
import Layout from "./components/Layout";

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
        path: "compagno/mypage/myinfo",
        element: <MyPageMyInfo />,
      },
      {
        path: "compagno/mypage/myactivity",
        element: <MyPageMyActivity />,
      },
    ],
  },
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
