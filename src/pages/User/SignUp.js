import styled from "styled-components";
import { useState } from "react";
import { registerUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);

  #register {
    text-align: center;
    width: 800px;
    height: 800px;
    border: 1px solid black;
    background-color: skyblue;
  }
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
        <label>
          아이디
          <input
            type="text"
            value={user.userId}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, userId: e.target.value }));
            }}
          />
        </label>
        <label>
          비밀번호
          <input
            type="text"
            value={user.userPwd}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, userPwd: e.target.value }));
            }}
          />
        </label>
        <label>
          이름
          <input
            type="text"
            value={user.userPersonName}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, userPersonName: e.target.value }));
            }}
          />
        </label>
        <label>
          닉네임
          <input
            type="text"
            value={user.userNickname}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, userNickname: e.target.value }));
            }}
          />
        </label>
        <label>
          이메일
          <input
            type="text"
            value={user.userEmail}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, userEmail: e.target.value }));
            }}
          />
        </label>
        <label>
          전화번호
          <input
            type="text"
            value={user.userPhone}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, userPhone: e.target.value }));
            }}
          />
        </label>
        <button onClick={register}>회원가입</button>
      </div>
    </Div>
  );
};

export default SignUp;
