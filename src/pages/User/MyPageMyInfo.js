import styled from "styled-components";
import MyPageSidebar from "../../components/MyPageSidebar";
import { userSave } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;

  .mypage-content {
    background-color: skyblue;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
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
      <div className="mypage-content">
        <p>마이페이지 - 내 개인정보 페이지</p>
        {Object.keys(user).length !== 0 ? (
          <>
            <h1>{user.userId}</h1>
          </>
        ) : (
          <></>
        )}
      </div>
    </Div>
  );
};
export default MyPageMyInfo;
