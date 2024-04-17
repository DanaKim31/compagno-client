import { createBrowserRouter } from "react-router-dom";
import ViewAllLostBoard from "./pages/lostBoard/ViewAllLostBoard";


const router = createBrowserRouter([
    {
        path:"/viewAllLostBoard",
        element:<ViewAllLostBoard/>,
    },

]);

export default router;