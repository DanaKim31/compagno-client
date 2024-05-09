import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyPageList from "./MyPageList";
import MyPageTab from "../../components/user/MyPageTab";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .mypageMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .contentZone {
      height: calc(100vh - 66px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const MyPageMyActivity = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  // 유저정보 가지고 오기
  const info = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      alert("로그인 후 접근 가능합니다.");
      navigate("/compagno/login");
    } else if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  return (
    <Div>
      <MyPageSidebar />

      <div className="mypageMain">
        <MyPageTab />
        <div className="contentZone">
          <MyPageList />
        </div>
      </div>
    </Div>
  );
};
export default MyPageMyActivity;
