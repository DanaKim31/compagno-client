import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  border-bottom: 1px dashed black;
  height: 107px;
  line-height: 107px;
  box-sizing: border-box;

  a {
    font-size: 1.7rem;
  }
`;

const Layout = () => {
  return (
    <>
      <Header>
        <a href="/">compagno</a>
      </Header>
      <Outlet />
    </>
  );
};

export default Layout;
