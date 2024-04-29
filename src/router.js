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
import LostBoardViewAll from "./pages/lostBoard/LostBoardViewAll";
import LostBoardCreate from "./pages/lostBoard/LostBoardCreate";
import LostBoardView from "./pages/lostBoard/LostBoardView";
import LostBoardUpdate from "./pages/lostBoard/LostBoardUpdate";
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
            element: <LostBoardViewAll />,
          },
          { path: "create", element: <LostBoardCreate /> },
          { path: "view/:code", element: <LostBoardView /> },
          { path: "update/:code", element: <LostBoardUpdate /> },
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
          { path: "detail/:sitterCode", element: <SitterDetail /> },
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
