import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changePwd } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../store/user";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  font-family: "TAEBAEKmilkyway";
  font-weight: bold;
  width: calc(100vw - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .headText {
    width: 30%;
    font-weight: bold;
  }

  #headerText {
    font-weight: bold;
  }

  .inputPwd {
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;

    input {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      font-weight: bold;
    }

    span {
      width: 100%;
      height: 30px;
      font-size: 0.9rem;
      color: red;
    }

    button {
      border-radius: 5px;
      border: 2px solid;
      color: rgb(32, 61, 59);
      text-decoration: none;
      padding: 10px;
      font-size: 1rem;
      align-items: center;
      font-weight: bold;
    }
    button:hover {
      background-color: rgb(32, 61, 59);
      color: white;
      font-weight: bold;
    }
  }
`;

const MyPagePutPwd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 유저정보 가지고 오기
  const info = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  // ------------------------
  // 변경할 개인정보 받아줄 변수 언선
  const [user, setUser] = useState({
    userId: info.userId,
    userPwd: "",
    userPwdCheck: "",
  });

  // 개인정보 변경용 정규표현식
  const pwdRegexp = /^[a-zA-Z0-9!-~]{8,14}$/; // 비밀번호

  // 정보 변경 정규표현식 미충족시 출력할 경고문구
  const pwdText = "영어 대소문자, 숫자 및 특수문자 포함 8~16자"; // 비밀번호
  const pwdChkText = "동일한 비밀번호 입력 요망"; // 비밀번호체크

  // 정보 변경 경고문구 초기화
  const [userPwdSpan, setUserPwdSpan] = useState("");
  const [userPwdCheckSpan, setUserPwdCheckSpan] = useState("");

  // 입력한 비밀번호 정규표현식으로 체크하는 함수
  const onChangePwd = () => {
    if (
      pwdRegexp.test(user.userPwd) ||
      user.userPwd === "" ||
      user.userPwd === null ||
      user.userPwd === undefined
    ) {
      setUserPwdSpan("");
    } else {
      setUserPwdSpan(pwdText);
    }
  };

  // 동일한 비멀번호 입력 체크하는 함수
  const onChangeChkPwd = () => {
    if (
      user.userPwd === user.userPwdCheck ||
      user.userPwdCheck === "" ||
      user.userPwdCheck === null ||
      user.userPwdCheck === undefined
    ) {
      setUserPwdCheckSpan("");
    } else {
      setUserPwdCheckSpan(pwdChkText);
    }
  };

  // 비밀번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangePwd();
  }, [user.userPwd]);

  // 동일 비밀번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeChkPwd();
  }, [user.userPwdCheck]);

  // 버튼 눌렀을때 실행
  const change = async () => {
    if (
      !pwdRegexp.test(user.userPwd) ||
      user.userPwd === "" ||
      user.userPwd === undefined
    ) {
      alert("올바른 비밀번호를 입력했는지 확인해주세요");
    } else if (
      user.userPwd !== user.userPwdCheck ||
      user.userPwdCheck === "" ||
      user.userPwdCheck === undefined
    ) {
      alert("동일한 비밀번호를 입력했는지 확인해주세요");
    } else {
      await changePwd(user);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(userLogout());
      alert(
        "개인정보가 변경되었습니다. 보안을 위해 변경된 정보를 적용하려면 로그아웃 후 다시 로그인해주세요."
      );
      navigate("/compagno");
    }
  };

  return (
    <Div>
      <div className="headText">
        <h1 id="headerText">비밀번호 변경</h1>
        <p>변경할 비밀번호를 입력해주세요</p>
      </div>
      <div className="inputPwd">
        <input
          type="password"
          value={user.userPwd}
          placeholder="변경할 비밀번호 입력"
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              userPwd: e.target.value,
            }));
          }}
        />
        <span className="regExpMessage">{userPwdSpan}</span>
        <input
          type="password"
          value={user.userPwdCheck}
          placeholder="동일한 비밀번호 입력"
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              userPwdCheck: e.target.value,
            }));
          }}
        />
        <span className="regExpMessage">{userPwdCheckSpan}</span>
        <button onClick={change}>비밀번호 변경</button>
      </div>
    </Div>
  );
};

export default MyPagePutPwd;
