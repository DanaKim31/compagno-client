import styled from "styled-components";
import { useState, useEffect } from "react";
import { registerUser, checkDupId, checkDupNick } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 112px);

  #register {
    width: 600px;
  }

  .idChkZone {
    width: 100%;
    display: flex;
  }

  .nickChkBtn,
  .idChkBtn {
    width: 30%;
    background-color: gray;
    border: none;
    color: white;
    box-sizing: border-box;
  }

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
    width: 500px;
    padding: 15px 10px;
    margin-bottom: 5px;
  }
  .regExpMessage {
    height: 25px;
    color: coral;
  }
  .registerBtn {
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

const SignUp = () => {
  // 정규표현식
  const idRegexp = /^[a-zA-Z][a-zA-Z0-9]{7,14}$/; // 아이디
  const pwdRegexp = /^[a-zA-Z0-9!-~]{8,14}$/; // 비밀번호
  const nameRegexp = /^[a-zA-Z가-힣]{2,20}$/; // 이름
  const nickRegexp = /^[a-zA-Z0-9가-힣]{3,20}$/; // 닉네임
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일
  const phoneRegexp = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 전화번호

  // 정규표현식 미충족시 출력할 경고문구
  const idText = "영어 대소문자 및 숫자 포함 7~15자 (단, 첫 글자는 영문자로)"; // 아이디
  const pwdText = "영어 대소문자, 숫자 및 특수문자 포함 8~16자"; // 비밀번호
  const pwdChkText = "동일한 비밀번호 입력 요망"; // 비밀번호체크
  const nameText = "영어 대소문자 및 한글 2~20자"; // 이름
  const nickText = "영어 대소문자 및 한글 3~20자"; // 닉네임
  const emailText = "올바른 이메일 양식 입력 요망"; // 이메일
  const phoneText = "하이픈(-) 포함해서 입력 요망"; // 전화번호

  // 회원가입 후 메인화면 리다이렉트에 사용할 navigate
  const navigate = useNavigate();

  const [user, setUser] = useState({ userId: "" });

  // id 및 닉네임 중복검사를 위한 초기값 설정
  const [checkId, setCheckId] = useState(8);
  const [checkNick, setCheckNick] = useState(8);

  // 경고문구 초기화
  const [userIdSpan, setUserIdSpan] = useState("");
  const [userPwdSpan, setUserPwdSpan] = useState("");
  const [userPwdCheckSpan, setUserPwdCheckSpan] = useState("");
  const [userPersonNameSpan, setUserPersonNameSpan] = useState("");
  const [userNicknameSpan, setUserNicknameSpan] = useState("");
  const [userEmailSpan, setUserEmailSpan] = useState("");
  const [userPhoneSpan, setUserPhoneSpan] = useState("");
  const [checkIdSpan, setCheckIdSpan] = useState("");
  const [checkNickSpan, setCheckNickSpan] = useState("");

  /* --------------------------- 정규표현식 체크하는 함수 모음 --------------------------- */
  // 입력한 아이디 정규표현식으로 체크하는 함수
  const onChangeId = () => {
    if (idRegexp.test(user.userId) || user.userId === "") {
      setUserIdSpan("");
    } else {
      setUserIdSpan(idText);
    }
  };

  // 입력한 비밀번호 정규표현식으로 체크하는 함수
  const onChangePwd = () => {
    if (pwdRegexp.test(user.userPwd) || user.userPwd === "") {
      setUserPwdSpan("");
    } else {
      setUserPwdSpan(pwdText);
    }
  };

  // 동일한 비멀번호 입력 체크하는 함수
  const onChangeChkPwd = () => {
    if (user.userPwd === user.userPwdCheck || user.userPwdCheck === "") {
      setUserPwdCheckSpan("");
    } else {
      setUserPwdCheckSpan(pwdChkText);
    }
  };

  // 입력한 이름 정규표현식으로 체크하는 함수
  const onChangeName = () => {
    if (nameRegexp.test(user.userPersonName) || user.userPersonName === "") {
      setUserPersonNameSpan("");
    } else {
      setUserPersonNameSpan(nameText);
    }
  };

  // 입력한 닉네임 정규표현식으로 체크하는 함수
  const onChangeNick = () => {
    if (nickRegexp.test(user.userNickname) || user.userNickname === "") {
      setUserNicknameSpan("");
    } else {
      setUserNicknameSpan(nickText);
    }
  };

  // 입력한 이메일 정규표현식으로 체크하는 함수
  const onChangeEmail = () => {
    if (
      emailRegexp.test(user.userEmail) ||
      user.userEmail === "" ||
      user.userEmail === undefined
    ) {
      setUserEmailSpan("");
    } else {
      setUserEmailSpan(emailText);
    }
  };

  // 입력한 전화번호 정규표현식으로 체크하는 함수
  const onChangePhone = () => {
    if (
      phoneRegexp.test(user.userPhone) ||
      user.userPhone === "" ||
      user.userPhone === undefined
    ) {
      setUserPhoneSpan("");
    } else {
      setUserPhoneSpan(phoneText);
    }
  };

  /* --------------------------- 정규표현식 실행하는 useEffect 모음 --------------------------- */
  // 아이디 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeId();
  }, [user.userId]);

  // 비밀번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangePwd();
  }, [user.userPwd]);

  // 동일 비밀번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeChkPwd();
  }, [user.userPwdCheck]);

  // 이름 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeName();
  }, [user.userPersonName]);

  // 닉네임 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeNick();
  }, [user.userNickname]);

  // 이메일 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeEmail();
  }, [user.userEmail]);

  useEffect(() => {
    onChangePhone();
  }, [user.userPhone]);

  /* --------------------------- 아이디 입력값 중복확인  --------------------------- */
  const idCheck = async () => {
    try {
      const checkIdResult = await checkDupId(user.userId);
      setCheckId(checkIdResult.data);
    } catch (err) {
      alert("아이디를 입력해주세요");
    }
  };

  const onChangeIdChkSpan = () => {
    if (checkId === 8 || checkId === 0) {
      setCheckIdSpan("");
    } else {
      setCheckIdSpan("사용 불가능한 아이디입니다.");
    }
  };

  useEffect(() => {
    onChangeIdChkSpan();
  }, [idCheck]);

  /* --------------------------- 닉네임 입력값 중복확인  --------------------------- */
  const nickCheck = async () => {
    try {
      const checkNickResult = await checkDupNick(user.userNickname);
      setCheckNick(checkNickResult.data);
      console.log("닉네임 검사 결과 : " + checkNick);
    } catch (err) {
      alert("닉네임을 입력해주세요");
    }
  };

  const onChangeNickChkSpan = () => {
    if (checkNick === 8 || checkNick === 0) {
      setCheckNickSpan("");
    } else {
      setCheckNickSpan("사용 불가능한 닉네임입니다.");
    }
  };

  useEffect(() => {
    onChangeNickChkSpan();
  }, [nickCheck]);

  /* --------------------------- 회원가입 작동 함수 --------------------------- */
  // 조건을 만족하면 회원가입 버튼 작동
  const register = async () => {
    if (!idRegexp.test(user.userId) || user.userId === "") {
      alert("조건 불만족! 아이디 입력 확인");
    } else if (checkId == 8) {
      alert("아이디 중복확인을 해주세요");
    } else if (checkId != 0) {
      alert("사용 불가한 아이디입니다.");
    } else if (
      !pwdRegexp.test(user.userPwd) ||
      user.userPwd === "" ||
      user.userPwd === undefined
    ) {
      alert("조건 불만족! 비밀번호 입력 확인");
    } else if (
      user.userPwd !== user.userPwdCheck ||
      user.userPwdCheck === "" ||
      user.userPwdCheck === undefined
    ) {
      alert("조건 불만족! 동일 비밀번호 입력 확인");
    } else if (
      !nameRegexp.test(user.userPersonName) ||
      user.userPersonName === "" ||
      user.userPersonName === undefined
    ) {
      alert("조건 불만족! 이름 입력 확인");
    } else if (
      !nickRegexp.test(user.userNickname) ||
      user.userNickname === "" ||
      user.userNickname === undefined
    ) {
      alert("조건 불만족! 닉네임 입력 확인");
    } else if (checkNick == 8) {
      alert("닉네임 중복확인을 해주세요");
    } else if (checkNick != 0) {
      alert("사용 불가한 닉네임입니다.");
    } else if (
      !emailRegexp.test(user.userEmail) ||
      user.userEmail === "" ||
      user.userEmail === undefined
    ) {
      alert("조건 불만족! 이메일 입력 확인");
    } else if (
      !phoneRegexp.test(user.userPhone) ||
      user.userPhone === "" ||
      user.userPhone === undefined
    ) {
      alert("조건 불만족! 전화번호 입력 확인");
    } else {
      await registerUser(user);
      navigate("/compagno");
      alert("회원가입 완료! 로그인하세요");
    }
  };

  return (
    <Div>
      <div id="register">
        <div className="input-content">
          <label htmlFor="userId">아이디</label>
          <div>
            <input
              type="text"
              id="userId"
              value={user.userId}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userId: e.target.value }));
              }}
            />
            <div className="idChkZone">
              <button className="idChkBtn" onClick={idCheck}>
                중복확인
              </button>
              <span className="idChkSpan">{checkIdSpan}</span>
            </div>
            <span className="regExpMessage">{userIdSpan}</span>
          </div>
        </div>
        <div className="input-content">
          <label htmlFor="userPwd">비밀번호</label>
          <div>
            <input
              type="password"
              id="userPwd"
              value={user.userPwd || ""}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userPwd: e.target.value }));
              }}
            />
            <span className="regExpMessage">{userPwdSpan}</span>
          </div>
        </div>
        <div className="input-content">
          <label htmlFor="userPwd-check">비밀번호 확인</label>
          <div>
            <input
              type="password"
              id="userPwdCheck"
              name="userPwdCheck"
              value={user.userPwdCheck || ""}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, userPwdCheck: e.target.value }));
              }}
            />
            <span className="regExpMessage">{userPwdCheckSpan}</span>
          </div>
        </div>
        <div className="input-content">
          <label htmlFor="userPersonName">이름</label>
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
            <span className="regExpMessage">{userPersonNameSpan}</span>
          </div>
        </div>
        <div className="input-content">
          <label htmlFor="userNickname">닉네임</label>
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
            <div className="nickChkZone">
              <button className="nickChkBtn" onClick={nickCheck}>
                중복확인
              </button>
              <span className="nickChkSpan">{checkNickSpan}</span>
            </div>
            <span className="regExpMessage">{userNicknameSpan}</span>
          </div>
        </div>
        <div className="input-content">
          <label htmlFor="userEmail">이메일 주소</label>
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
            <span className="regExpMessage">{userEmailSpan}</span>
          </div>
        </div>
        <div className="input-content">
          <label htmlFor="userPhone">전화번호</label>
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
            <span className="regExpMessage">{userPhoneSpan}</span>
          </div>
        </div>
        <button onClick={register} className="registerBtn">
          회원가입
        </button>
      </div>
    </Div>
  );
};

export default SignUp;
