import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background-color: green;
  height: 107px;
`;
const Layout = () => {
  return (
    <>
      <Header>
        <h1>Header</h1>
      </Header>
      <Outlet />
    </>
  );
};
export default Layout;
