import styled from "styled-components";
import { useState } from "react";

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
  return (
    <>
      <Div>
        <label>
          아이디
          <input type="text" />
        </label>
        <label>
          비밀번호
          <input type="text" />
        </label>
        <button>로그잉~</button>
      </Div>
    </>
  );
};
export default Login;
