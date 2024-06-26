import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import QnaRegister from "./pages/qnaBoard/QnaRegister";
import QnaList from "./pages/qnaBoard/QnaList";
import QnaQDetail from "./components/QnaBoard/QnaQDetail";
import UserQnaList from "./pages/userQnaBoard/UserQnaList";
import UserQuestionRegister from "./pages/userQnaBoard/UserQuestionRegister";
import UserQuestionDetail from "./pages/userQnaBoard/UserQuestionDetail";
import Content from "./pages/ContentBoard/Content";
import ContentList from "./pages/ContentBoard/ContentList";
import ContentDetail from "./pages/ContentBoard/ContentDetail";
import SignUp from "./pages/user/SignUp";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import MyPageMyInfo from "./pages/user/MyPageMyInfo";
import MyPageMyActivity from "./pages/user/MyPageMyActivity";
import MyPageFavProduct from "./pages/user/MyPageFavProduct";
import LostBoardViewAll from "./pages/lostBoard/LostBoardViewAll";
import LostBoardCreate from "./pages/lostBoard/LostBoardCreate";
import LostBoardView from "./pages/lostBoard/LostBoardView";
import LostBoardUpdate from "./pages/lostBoard/LostBoardUpdate";
import Error from "./pages/Error";
import AnimalHome from "./pages/animalBoard/Home";
import AnimalDetail from "./pages/animalBoard/Detail";
import RegisterPetInsts from "./pages/registerPetBoard/RegisterPetInsts";
import RegisterPetFaq from "./pages/registerPetBoard/RegisterPetFaq";
import SitterBoard from "./pages/sitterBoard/SitterBoard";
import SitterCreate from "./pages/sitterBoard/SitterCreate";
import SitterDetail from "./pages/sitterBoard/SitterDetail";
import ViewAllProductBoard from "./pages/productBoard/ViewAllProductBoard";
import ProductBoardDetail from "./pages/productBoard/ProductBoardDetail";
import WriteAnimalBoard from "./pages/animalBoard/WriteAnimalBoard";
import EditAnimalBoard from "./pages/animalBoard/EditAnimalBoard";
import NeighborBoard from "./pages/neighborBoard/NeighborBoard";
import NeighborCreate from "./pages/neighborBoard/NeighborCreate";
import NeighborDetail from "./pages/neighborBoard/NeighborDetail";
import CreateProductBoard from "./pages/productBoard/CreateProductBoard";
import UpdateProductBoard from "./pages/productBoard/UpdateProductBoard";
import ClassList from "./pages/onedayClassBoard/ClassList";
import CreateClass from "./pages/onedayClassBoard/CreateClass";
import NeighborUpdate from "./pages/neighborBoard/NeighborUpdate";
import SitterUpdate from "./pages/sitterBoard/SitterUpdate";
import AdopBoardViewAll from "./pages/adoptionBoard/AdopBoardViewAll";
import AdopBoardCreate from "./pages/adoptionBoard/AdopBoardCreate";
import MyPageMyQnA from "./pages/user/MyPageMyQnA";
import AdopBoardView from "./pages/adoptionBoard/AdopBoardView";
import AdopBoardUpdate from "./pages/adoptionBoard/AdopBoardUpdate";
import ClassDetail from "./pages/onedayClassBoard/ClassDetail";
import MyPageAdoption from "./pages/user/MyPageAdoption";
import MyPageUserQna from "./pages/user/MyPageUserQna";
import MyPageNeighbor from "./pages/user/MyPageNeighbor";
import MyPageOneday from "./pages/user/MyPageOneday";
import MyPageLost from "./pages/user/MyPageLost";
import MyPageSitter from "./pages/user/MyPageSitter";
import ClassUpdate from "./pages/onedayClassBoard/ClassUpdate";
import ViewAllNoticeBoard from "./pages/noticeBoard/ViewAllNoticeBoard";
import NoticeBoardDetail from "./pages/noticeBoard/NoticeBoardDetail";
import CreateNoticeBoard from "./pages/noticeBoard/CreateNoticeBoard";
import UpdateNoticeBoard from "./pages/noticeBoard/UpdateNoticeBoard";
import NoteViewAll from "./pages/note/NoteViewAll";
import NoteViewReceiveBox from "./pages/note/NoteViewReceiveBox";
import NoteViewSendBox from "./pages/note/NoteViewSendBox";
import NoteViewStar from "./pages/note/NoteViewStar";

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
          { path: "myanimalfav", element: <MyPageMyActivity /> },
          { path: "myproductfav", element: <MyPageFavProduct /> },
          {
            path: "mynote",
            children: [
              { index: true, element: <NoteViewAll /> },
              { path: "viewReceiveBox", element: <NoteViewReceiveBox /> },
              { path: "viewSendBox", element: <NoteViewSendBox /> },
              { path: "viewStar", element: <NoteViewStar /> },
            ],
          },
          { path: "myqna", element: <MyPageMyQnA /> },
          { path: "myadoption", element: <MyPageAdoption /> },
          { path: "myuserqna", element: <MyPageUserQna /> },
          { path: "myneighbor", element: <MyPageNeighbor /> },
          { path: "myonedayclass", element: <MyPageOneday /> },
          { path: "mylost", element: <MyPageLost /> },
          { path: "mysitter", element: <MyPageSitter /> },
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
        element: <WriteAnimalBoard />,
      },
      {
        path: "edit-board/:animalBoardCode",
        element: <EditAnimalBoard />,
      },
      {
        path: "question",
        children: [
          { index: true, element: <QnaList /> },
          { path: "register", element: <QnaRegister /> },
          {
            path: "detail/:qnaQCode",
            element: <QnaQDetail />,
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
        path: "adoptionBoard",
        children: [
          {
            path: "viewAll",
            element: <AdopBoardViewAll />,
          },
          { path: "create", element: <AdopBoardCreate /> },
          { path: "view/:code", element: <AdopBoardView /> },
          { path: "update/:code", element: <AdopBoardUpdate /> },
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
          { path: "detail/:code", element: <SitterDetail /> },
          { path: "edit/:code", element: <SitterUpdate /> },
        ],
      },
      {
        path: "neighborBoard",
        children: [
          { index: true, element: <NeighborBoard /> },
          { path: "register", element: <NeighborCreate /> },
          { path: "detail/:code", element: <NeighborDetail /> },
          { path: "edit/:code", element: <NeighborUpdate /> },
        ],
      },
      {
        path: "product-board",
        children: [
          { index: true, element: <ViewAllProductBoard /> },
          { path: ":code", element: <ProductBoardDetail /> },
          { path: "create", element: <CreateProductBoard /> },
          { path: "edit/:code", element: <UpdateProductBoard /> },
        ],
      },
      {
        path: "notice-board",
        children: [
          { index: true, element: <ViewAllNoticeBoard /> },
          { path: ":code", element: <NoticeBoardDetail /> },
          { path: "create", element: <CreateNoticeBoard /> },
          { path: "edit/:code", element: <UpdateNoticeBoard /> },
        ],
      },
      {
        path: "content",
        children: [
          { index: true, element: <Content /> },
          {
            path: "list",
            element: <ContentList />,
          },
          {
            path: "detail/:num",
            element: <ContentDetail />,
          },
        ],
      },
      {
        path: "onedayClassBoard",
        children: [
          { index: true, element: <ClassList /> },
          { path: "create", element: <CreateClass /> },
          { path: "detail/:code", element: <ClassDetail /> },
          { path: "update/:code", element: <ClassUpdate /> },
        ],
      },
      {
        path: "userQna",
        children: [
          {
            index: true,
            element: <UserQnaList />,
          },
          { path: "register", element: <UserQuestionRegister /> },
          {
            path: "detail/:userQuestionBoardCode",
            element: <UserQuestionDetail />,
          },
        ],
      },
    ],
  },
]);

export default router;
