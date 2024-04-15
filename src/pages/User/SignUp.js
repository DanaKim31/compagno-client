import styled from "styled-components";
import { useState } from "react";
import { registerUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const register = async () => {
    await registerUser(user);
    navigate("/");
  };

  return (
    <Div>
      <div id="register">
        <div class="input-content">
          <label for="userId">아이디</label>
          <div>
            <input
              type="text"
              id="userId"
              value={user.userId}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userId: e.target.value }));
              }}
            />
            <span id="userId-span"></span>
          </div>
        </div>
        <div class="input-content">
          <label for="userPwd">비밀번호</label>
          <div>
            <input
              type="password"
              id="userPwd"
              value={user.userPwd}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userPwd: e.target.value }));
              }}
            />
            <span id="userPwd-span"></span>
          </div>
        </div>
        <div class="input-content">
          <label for="userPwd-check">비밀번호 확인</label>
          <div>
            <input type="password" id="userPwd-check" />
            <span id="userPwd-check-span"></span>
          </div>
        </div>
        <div class="input-content">
          <label for="userPersonName">이름</label>
          <div>
            <input
              type="text"
              id="userPersonName"
              value={user.userPersonName}
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
        <div class="input-content">
          <label for="userNickname">닉네임</label>
          <div>
            <input
              type="text"
              id="userNickname"
              value={user.userNickname}
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
        <div class="input-content">
          <label for="userEmail">이메일 주소</label>
          <div>
            <input
              type="text"
              id="userEmail"
              value={user.userEmail}
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
        <div class="input-content">
          <label for="userPhone">전화번호</label>
          <div>
            <input
              type="text"
              id="userPhone"
              value={user.userPhone}
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
