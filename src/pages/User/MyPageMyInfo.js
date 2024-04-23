import styled from "styled-components";
import MyPageSidebar from "../../components/MyPageSidebar";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Div = styled.div`
  display: flex;

  .mypage-content {
  }

  .mb-3 {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: pink;
  }
`;

const MyPageMyInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 유저정보 가지고온다
  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (localStorage.length === 0) {
      alert("로그인 시 접근 가능합니다.");
      navigate("/compagno/login");
    } else {
      const token = localStorage.getItem("token");
      if (token !== null) {
        dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
      }
    }
  }, []);

  return (
    <Div>
      <MyPageSidebar />
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="Home">
          Tab content for Home
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
      </Tabs>
    </Div>
  );
};
export default MyPageMyInfo;
