import styled from "styled-components";
import { useState, useEffect } from "react";
import { asyncLogin, userLogout } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);

  #register {
    display: flex;
    flex-direction: column;

    input {
      margin-top: 20px;
      width: 500px;
      height: 50px;
    }

    button {
      margin-top: 20px;
      width: 500px;
      height: 50px;
      color: white;
      background-color: black;
      border: none;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
`;

const Login = () => {
  const [user, setUser] = useState({ userId: "", userPwd: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const info = useSelector((state) => {
    return state.user;
  });

  // 로그인 버튼 눌렀을때
  const submit = () => {
    dispatch(asyncLogin(user));
  };

  useEffect(() => {
    if (Object.keys(info).length !== 0) {
      localStorage.setItem("token", info.token);
      localStorage.setItem("user", JSON.stringify(info));
      const currentStatus = info.userStatus;
      if (currentStatus === "y") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(userLogout());
        alert("회원 정보가 존재하지 않습니다.");
      } else {
        navigate("/compagno");
      }
    }
  }, [info]);

  useEffect(() => {
    if (localStorage.length !== 0) {
      alert("이미 로그인 중입니다. 메인페이지로 이동합니다.");
      navigate("/compagno");
    }
  }, []);

  return (
    <>
      <Div>
        <div id="register">
          <input
            type="text"
            placeholder="아이디"
            value={user.userId}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, userId: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={user.userPwd}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, userPwd: e.target.value }))
            }
          />
          <button onClick={submit}>login</button>
        </div>
      </Div>
    </>
  );
};
export default Login;
