import styled from "styled-components";
import MyPageSidebar from "../../components/MyPageSidebar";
import { userSave, userLogout } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { changePwd } from "../../api/user";

const Div = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding-top: 112px;

  .info-zone {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 3%;

    .mb-3 {
      width: 90%;
    }

    .profileImage {
      width: 200px;
      height: 200px;
      border-radius: 50px;
    }

    .info-content h1 {
      font-size: 1.5rem;
    }

    #quitInstructions {
      width: 100%;
      border: 1px solid skyblue;
      list-style-type: circle;
    }
  }
`;

const MyPageMyInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 개인정보 변경용 정규표현식
  const pwdRegexp = /^[a-zA-Z0-9!-~]{8,14}$/; // 비밀번호

  // 정보 변경 정규표현식 미충족시 출력할 경고문구
  const pwdText = "영어 대소문자, 숫자 및 특수문자 포함 8~16자"; // 비밀번호
  const pwdChkText = "동일한 비밀번호 입력 요망"; // 비밀번호체크

  // 정보 변경 경고문구 초기화
  const [userPwdSpan, setUserPwdSpan] = useState("");
  const [userPwdCheckSpan, setUserPwdCheckSpan] = useState("");

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

  /* ----------------------------- 회원탈퇴 ----------------------------- */
  // const [quitCheck, setQuitCheck] = useState(true);
  // useEffect(() => {}, [quitCheck]);

  return (
    <Div>
      <MyPageSidebar />
      <div className="info-zone">
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="justify-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="내 정보">
            <div className="info-content">
              <img
                className="profileImage"
                src={"http://192.168.10.28:8081/" + user.userImg}
              />
              <p>이름 : {user.userId}</p>
              <p>전화번호 : {user.userPhone}</p>
              <p>닉네임 : {user.userNickname}</p>
              <p>이메일 : {user.userEmail}</p>
            </div>
          </Tab>
          <Tab eventKey="profile" title="정보 수정">
            <div className="info-content">
              <h1>회원 정보 수정</h1>
            </div>
          </Tab>
          <Tab eventKey="contact" title="회원 탈퇴">
            <div className="info-content">
              <ul id="quitInstructions">
                <h1>Compagno 탈퇴 전 확인하세요.</h1>
                <li>회원탈퇴시 로그인 접근이 제한됩니다.</li>
                <li>타 유저의 게시글에 작성한 댓글은 삭제되지 않습니다.</li>
                <li>6개월 후 모든 정보가 삭제되며, 복구가 불가능합니다.</li>
              </ul>
              <label>
                <input type="checkbox" name="quitAgree" />
                유의사항을 확인했습니다.
              </label>
              <br />
              <button disabled="true">회원 탈퇴</button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Div>
  );
};
export default MyPageMyInfo;
