import { createBrowserRouter } from "react-router-dom";
import Add from "./pages/animalBoard/Add";
import Home from "./pages/animalBoard/Home";
import Edit from "./pages/animalBoard/Edit";
import Detail from "./pages/animalBoard/Detail";
import Error from "./pages/animalBoard/Error";

// 여기가 router 역할
/*
npm i react-router-dom
*/
const router = createBrowserRouter([
  {
    path: "/compagno/animal-board",
    element: <Home />,
  },
  {
    path: "/compagno/write-board",
    element: <Add />,
  },
  {
    path: "/compagno/edit-board/:animalBoardCode",
    element: <Edit />,
  },
  {
    path: "/compagno/animal-board/:animalBoardCode",
    element: <Detail />,
  },
  {
    path: "/compagno/error",
    element: <Error />,
  },
]);

export default router;