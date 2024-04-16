import styled from "styled-components";
import { useState, useEffect } from "react";
import { registerUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);

  .input-content {
    display: flex;
    margin-bottom: 5px;
  }
  .input-content label {
    width: 130px;
    font-weight: bold;
    margin-top: 15px;
  }

  .input-content div {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .input-content input {
    width: 400px;
    padding: 15px 10px;
    margin-bottom: 5px;
  }
  .input-content span {
    height: 25px;
    color: coral;
  }
  button {
    width: 100%;
    cursor: pointer;
    background: black;
    color: white;
    border: none;
    padding: 15px 5px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const idRegexp = /^[a-zA-Z][a-zA-Z0-9]{7,14}$/;
const idText = "영문자 및 숫자 포함 7~15자 (단, 첫 글자는 영문자로)";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const register = async () => {
    await registerUser(user);
    navigate("/");
  };

  const onChangeId = (e) => {
    if (idRegexp.test(user.userId)) {
      // IDSpan.innerHTML = "";
    } else {
      // IDSpan.innerHTML = idText;
    }
  };

  useEffect(() => {
    onChangeId();
  }, [user]);

  return (
    <Div>
      <div id="register">
        <div className="input-content">
          <label for="userId">아이디</label>
          <div>
            <input
              type="text"
              id="userId"
              value={user.userId || ""}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userId: e.target.value }));
              }}
            />
            <span id="userIdSpan"></span>
          </div>
        </div>
        <div className="input-content">
          <label for="userPwd">비밀번호</label>
          <div>
            <input
              type="password"
              id="userPwd"
              value={user.userPwd || ""}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userPwd: e.target.value }));
              }}
            />
            <span id="userPwd-span"></span>
          </div>
        </div>
        <div className="input-content">
          <label for="userPwd-check">비밀번호 확인</label>
          <div>
            <input type="password" id="userPwd-check" />
            <span id="userPwd-check-span"></span>
          </div>
        </div>
        <div className="input-content">
          <label for="userPersonName">이름</label>
          <div>
            <input
              type="text"
              id="userPersonName"
              value={user.userPersonName || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userPersonName: e.target.value,
                }));
              }}
            />
            <span id="userPersonName-span"></span>
          </div>
        </div>
        <div className="input-content">
          <label for="userNickname">닉네임</label>
          <div>
            <input
              type="text"
              id="userNickname"
              value={user.userNickname || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userNickname: e.target.value,
                }));
              }}
            />
            <span id="userNickname-span"></span>
          </div>
        </div>
        <div className="input-content">
          <label for="userEmail">이메일 주소</label>
          <div>
            <input
              type="text"
              id="userEmail"
              value={user.userEmail || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userEmail: e.target.value,
                }));
              }}
            />
            <span id="userEmail-span"></span>
          </div>
        </div>
        <div className="input-content">
          <label for="userPhone">전화번호</label>
          <div>
            <input
              type="text"
              id="userPhone"
              value={user.userPhone || ""}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userPhone: e.target.value,
                }));
              }}
            />
            <span id="userPhone-span"></span>
          </div>
        </div>
        <button onClick={register}>회원가입</button>
      </div>
    </Div>
  );
};

export default SignUp;
