import styled from "styled-components";

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
  return (
    <Div>
      <div id="register">
        <span>아이디</span> <input /> <br />
        <span>비밀번호</span> <input /> <br />
        <span>비밀번호 확인</span> <input /> <br />
        <span>닉네임</span> <input /> <br />
        <span>이름</span> <input /> <br />
        <span>전화번호</span> <input /> <br />
        <span>주소</span> <input />
      </div>
    </Div>
  );
};

export default SignUp;
