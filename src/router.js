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
    path: "/compagno",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "mypage",
        children: [
          { path: "myinfo", element: <MyPageMyInfo /> },
          { path: "myactivity", element: <MyPageMyActivity /> },
        ],
      },
      {
        path: "animal-board",
        children: [
          { index: true, element: <AnimalHome /> },
          {
            path: ":animalBoardCode",
            element: <AnimalDetail />,
          },
        ],
      },
      {
        path: "write-board",
        element: <Add />,
      },
      {
        path: "edit-board/:animalBoardCode",
        element: <Edit />,
      },
      {
        path: "question",
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
        path: "lostBoard",
        children: [
          { path: "viewAll", element: <ViewAllLostBoard /> },
          { path: "create", element: <CreateLostBoard /> },
        ],
      },
    ],
  },
]);

export default router;
