import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../assets/reset.css";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
