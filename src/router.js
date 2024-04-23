import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/QnaQ/Register";
import List from "./pages/QnaQ/List";
import QnaDetail from "./pages/QnaQ/Detail";
import SignUp from "./pages/User/SignUp";
import Home from "./pages/Home";
import Login from "./pages/User/Login";
import MyPageMyInfo from "./pages/User/MyPageMyInfo";
import MyPageMyActivity from "./pages/User/MyPageMyActivity";
import ViewAllLostBoard from "./pages/lostBoard/ViewAllLostBoard";
import CreateLostBoard from "./pages/lostBoard/CreateLostBoard";
import Error from "./pages/Error";
import Add from "./pages/animalBoard/Add";
import AnimalHome from "./pages/animalBoard/Home";
import Edit from "./pages/animalBoard/Edit";
import AnimalDetail from "./pages/animalBoard/Detail";

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
      {
        path: "compagno/animal-board",
        element: <AnimalHome />,
      },
      {
        path: "compagno/write-board",
        element: <Add />,
      },
      {
        path: "compagno/edit-board/:animalBoardCode",
        element: <Edit />,
      },
      {
        path: "compagno/animal-board/:animalBoardCode",
        element: <AnimalDetail />,
      },
    ],
  },
  {
    path: "/compagno/question",
    element: <Layout />,
    children: [
      { index: true, element: <List /> },
      { path: "register", element: <Register /> },
      {
        path: "detail/:qnaQCode",
        element: <QnaDetail />,
      },
    ],
  },
  {
    path: "/compagno/lostBoard/viewAll",
    element: <Layout />,
    errorElement: <Error />,
    children: [{ index: true, element: <ViewAllLostBoard /> }],
    // element: <ViewAllLostBoard />,
  },
  {
    path: "/compagno/lostBoard/create",
    element: <Layout />,
    children: [{ index: true, element: <CreateLostBoard /> }],
  },
]);

export default router;
