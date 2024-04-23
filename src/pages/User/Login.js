import styled from "styled-components";
import { useState, useEffect } from "react";
import { asyncLogin } from "../../store/user";
import { useDispatch } from "react-redux";
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

const Login = () => {
  const [user, setUser] = useState({ userId: "", userPwd: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 상태면 홈으로 되돌리기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/compagno");
      alert("로그인 상태입니다. 메인페이지로 이동합니다.");
    }
  }, []);

  // 로그인 버튼 눌렀을때
  const submit = () => {
    console.log(user);
    if (user.userId === "" || user.userId === undefined) {
      alert("아이디를 입력하세요!");
    } else if (user.userPwd === "" || user.userPwd === undefined) {
      alert("비밀번호를 입력하세요!");
    } else {
      dispatch(asyncLogin(user));
      // 로그인 후 홈으로 이동 (새로고침과 같다)
      navigate("/compagno");
    }
  };

  return (
    <>
      <Div>
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
        <button onClick={submit}>로긴로긴로긴</button>
      </Div>
    </>
  );
};
export default Login;
