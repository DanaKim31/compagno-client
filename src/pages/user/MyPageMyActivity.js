import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyPageList from "./MyPageList";

const Div = styled.div`
  display: flex;
  height: 100vh;
  padding-top: 112px;

  .mypageMain {
    width: calc(100vw - 300px);
    display: flex;
    flex-direction: column;
    padding-top: 20px;

    .activityHeader {
      width: calc(100vw - 300px);
      height: fit-content;
      display: flex;
      justify-content: left;
      padding-left: 8px;
      border-bottom: 1px dashed black;

      a {
        width: 150px;
        margin: 0px 2px;
        padding: 10px 10px;
        height: fit-content;
        text-decoration-line: none;
        color: black;
        border-top: 1px dashed black;
        border-left: 1px dashed black;
        border-right: 1px dashed black;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        text-align: center;
      }
    }

    .contentZone {
      height: calc(100vh - 66px);
      display: flex;
      justify-content: center;
      align-items: center;

      .myPageList {
        thead th {
          background-color: rgb(85, 96, 143);
          width: 200px;
          height: 50px;
          text-align: left;
          line-height: 50px;
          color: white;
        }

        tbody {
          background: linear-gradient(45deg, #49a09d, #5f2c82);
          color: white;
          height: 50px;
          text-align: left;
          line-height: 50px;
        }
      }
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
        <div className="activityHeader">
          <a href="/compagno/mypage/myanimalfav">최애 동물</a>
          <a href="/compagno/mypage/myproductfav">관심 제품</a>
          <a href="">1day class</a>
          <a href="">adoption</a>
          <a href="">register</a>
          <a href="">QnA</a>
        </div>
        <div className="contentZone">
          <MyPageList />
        </div>
      </div>
    </Div>
  );
};
export default MyPageMyActivity;
