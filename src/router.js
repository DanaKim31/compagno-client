import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import QnaRegister from "./pages/qnaBoard/QnaRegister";
import QnaList from "./pages/qnaBoard/QnaList";
import QnaDetail from "./pages/qnaBoard/QnaDetail";
import SignUp from "./pages/user/SignUp";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import MyPageMyInfo from "./pages/user/MyPageMyInfo";
import MyPageMyActivity from "./pages/user/MyPageMyActivity";
import ViewAllLostBoard from "./pages/lostBoard/ViewAllLostBoard";
import CreateLostBoard from "./pages/lostBoard/CreateLostBoard";
import ViewLostBoard from "./pages/lostBoard/ViewLostBoard";
import Error from "./pages/Error";
import Add from "./pages/animalBoard/Add";
import AnimalHome from "./pages/animalBoard/Home";
import Edit from "./pages/animalBoard/Edit";
import AnimalDetail from "./pages/animalBoard/Detail";
import RegisterPetInsts from "./pages/registerPetBoard/RegisterPetInsts";
import RegisterPetFaq from "./pages/registerPetBoard/RegisterPetFaq";
import SitterBoard from "./pages/sitterBoard/SitterBoard";
import SitterCreate from "./pages/sitterBoard/SitterCreate";
import SitterDetail from "./pages/sitterBoard/SitterDetail";
import ViewAllProductBoard from "./pages/productBoard/ViewAllProductBoard";
import ProductBoardDetail from "./pages/productBoard/ProductBoardDetail";
import NeighborBoard from "./pages/neighborBoard/NeighborBoard";
import NeighborCreate from "./pages/neighborBoard/NeighborCreate";
import NeighborDetail from "./pages/neighborBoard/NeighborDetail";

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
          { index: true, element: <QnaList /> },
          { path: "register", element: <QnaRegister /> },
          {
            path: "detail/:qnaQCode",
            element: <QnaDetail />,
          },
        ],
      },
      {
        path: "lostBoard",
        children: [
          {
            path: "viewAll",
            element: <ViewAllLostBoard />,
          },
          { path: "create", element: <CreateLostBoard /> },
          { path: "view/:lostBoardCode", element: <ViewLostBoard /> },
        ],
      },
      {
        path: "register-pet",
        children: [
          { path: "insts", element: <RegisterPetInsts /> },
          { path: "faq", element: <RegisterPetFaq /> },
        ],
      },
      {
        path: "sitterBoard",
        children: [
          { index: true, element: <SitterBoard /> },
          { path: "register", element: <SitterCreate /> },
          { path: "detail/:sitterBoardCode", element: <SitterDetail /> },
        ],
      },
      {
        path: "neighborBoard",
        children: [
          { index: true, element: <NeighborBoard /> },
          { path: "register", element: <NeighborCreate /> },
          { path: "detail/:neighborBoardCode", element: <NeighborDetail /> },
        ],
      },
      {
        path: "product-board",
        children: [
          { index: true, element: <ViewAllProductBoard /> },
          { path: ":code", element: <ProductBoardDetail /> },
        ],
      },
    ],
  },
]);

export default router;
