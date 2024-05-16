import styled from "styled-components";
import MyPageSidebar from "../../components/user/MyPageSidebar";
import { userSave, userLogout } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { updateUser, quitUser } from "../../api/user";
import { Form, Button } from "react-bootstrap";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  display: flex;
  height: 100vh;
  padding-top: 112px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  .info-zone {
    width: calc(100vw - 300px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 1%;

    // 탭 선택바
    .mb-3 {
      width: 90%;
      display: flex;
      font-size: 1.2rem;

      .nav-link {
        color: white;
        background-color: #94b29b;
      }
      .active {
        color: black;
        background-color: transparent;
      }
    }
    // 정보 조회
    .info-content {
      margin-top: 100px;
      padding-top: 60px;
      width: 40vw;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 20px;
      border-width: 2px 2px 60px 2px;
      border-color: #94b29b;
      border-style: solid;
      /* border-bottom: #94b29b solid 60px; */
      border-radius: 50px;

      font-size: 1.2rem;

      .info-image {
        width: 300px;
        height: 300px;
        border-radius: 50%;
      }
    }

    // 정보 수정

    .info-edit {
      width: 1000px;

      .changeMyInfo {
        display: flex;

        .info-edit-img {
          width: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 100px;

          img {
            width: 300px;
            height: 300px;
            border-radius: 50%;
          }

          .picBtn {
            width: fit-content;
          }
        }

        .info-edit-text {
          width: 80%;

          input {
            font-weight: bold;
            border: 1px solid black;
          }
        }
      }

      /* .changeMyInfo {
        width: 1000px;
        height: 500px;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        .editBtn {
          font-weight: bold;
          border-radius: 5px;
          border: none;
          color: rgb(32, 61, 59);
          text-decoration: none;
          padding: 10px;
          font-size: 1rem;
          align-items: center;
        }

        .editBtn:hover {
          font-weight: bold;
          background-color: rgb(32, 61, 59);
          color: white;
        }

        .profileImage {
          cursor: pointer;

          img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
          }
        }
      } */
    }

    .info-quit {
      #quitInstructions {
        width: 100%;
        border: 1px solid skyblue;
        list-style-type: circle;
      }

      .forQuitInput {
        width: 340px;
      }
    }
  }
`;

const MyPageMyInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 변경할 개인정보 받아줄 변수 언선
  const [user, setUser] = useState({
    userEmail: "",
    userPhone: "",
    userPwd: "",
    userPwdCheck: "",
    userImg: "",
  });

  const insertDefaultInfo = () => {
    setUser((prev) => ({
      ...prev,
      userEmail: info.userEmail,
      userPhone: info.userPhone,
      userImg: info.userImg,
    }));
  };

  // 개인정보 변경용 정규표현식
  const pwdRegexp = /^[a-zA-Z0-9!-~]{8,14}$/; // 비밀번호
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일
  const phoneRegexp = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 전화번호

  // 정보 변경 정규표현식 미충족시 출력할 경고문구
  const pwdText = "영어 대소문자, 숫자 및 특수문자 포함 8~16자"; // 비밀번호
  const pwdChkText = "동일한 비밀번호 입력 요망"; // 비밀번호체크
  const emailText = "올바른 이메일 양식 입력 요망"; // 이메일
  const phoneText = "하이픈(-) 포함해서 입력 요망"; // 전화번호

  // 정보 변경 경고문구 초기화
  const [userPwdSpan, setUserPwdSpan] = useState("");
  const [userPwdCheckSpan, setUserPwdCheckSpan] = useState("");
  const [userEmailSpan, setUserEmailSpan] = useState("");
  const [userPhoneSpan, setUserPhoneSpan] = useState("");

  // 유저정보 가지고온다
  const info = useSelector((state) => {
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

  useEffect(() => {
    insertDefaultInfo();
  }, [info]);

  /* ----------------------------- 회원정보 변경 ----------------------------- */

  // 업로드한 이미지 미리보기
  const [pImageUrl, setPImageUrl] = useState("");
  const [pImageFile, setPImageFile] = useState(null);

  // 업로드한 이미지 미리보기 - 이미지 업로드
  const uploadProfileImage = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      let pImage = URL.createObjectURL(file);
      setPImageUrl(pImage);
      setPImageFile(file);
      setDefaultImgStatus(false);
    }
  };

  // 기본 프로필이미지 정보 담고있는 변수
  const defaultImg = "/img/defaultImage.png";

  // 기본 프로필 이미지로 변경할 때 사용할 변수
  const [defaultImgStatus, setDefaultImgStatus] = useState(false);
  const onChangedefaultImg = () => {
    if (defaultImgStatus == true) {
      setDefaultImgStatus(false);
      setPImageUrl("http://192.168.10.28:8081/" + info.userImg);
    } else if (defaultImgStatus == false) {
      setDefaultImgStatus(true);
      setPImageUrl(defaultImg);
      setPImageFile(null);
    }
  };
  {
    /* ---------------------------------------------------- */
  }

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

  // 비밀번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangePwd();
  }, [user.userPwd]);

  // 동일 비밀번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeChkPwd();
  }, [user.userPwdCheck]);

  // 이메일 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangeEmail();
  }, [user.userEmail]);

  // 전화번호 체크 정규표현식 실행하는 useEffect
  useEffect(() => {
    onChangePhone();
  }, [user.userPhone]);

  // 회원정보 수정 클릭시 작동 함수
  const editMyInfo = async () => {
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
    } else if (
      !emailRegexp.test(user.userEmail) ||
      user.userEmail === "" ||
      user.userEmail === undefined
    ) {
      alert("올바른 이메일 양식으로 입력해주세요");
    } else if (
      !phoneRegexp.test(user.userPhone) ||
      user.userPhone === "" ||
      user.userPhone === undefined
    ) {
      alert("올바른 전화번호 양식으로 입력해주세요");
    } else {
      const formData = new FormData();
      formData.append("userId", info.userId);
      formData.append("userPwd", user.userPwd);
      formData.append("userEmail", user.userEmail);
      formData.append("userPhone", user.userPhone);
      formData.append("userEnrollDate", info.userEnrollDate);
      formData.append("defaultImg", 0);

      if (pImageFile != null && defaultImgStatus == false) {
        console.log(pImageFile);
        console.log(pImageUrl);
        formData.append("file", pImageFile);
      }
      if (pImageFile == null && defaultImgStatus == true) {
        // 1을 보내면 기본이미지로 변경하기
        formData.delete("defaultImg");
        formData.append("defaultImg", 1);
      }

      console.log(defaultImgStatus);
      await updateUser(formData);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(userLogout());
      alert(
        "개인정보가 변경되었습니다. 보안을 위해 변경된 정보를 적용하려면 로그아웃 후 다시 로그인해주세요."
      );
      navigate("/compagno");
    }
  };

  /* ----------------------------- 회원탈퇴 ----------------------------- */
  const [quitButton, setQuitButton] = useState(true);
  const [quitCheckBox, setQuitCheckBox] = useState(false);

  // 탈퇴 확인용 입력한 정보
  const [approveInfo, setApproveInfo] = useState({
    userId: info.userId,
    userPwd: "",
    userPhone: "",
    userImg: info.userImg,
  });

  // 체크박스 클릭에 따른 탈퇴버튼 활성화 / 비활성화
  const clickCheckBox = () => {
    if (quitCheckBox === false) {
      setQuitCheckBox(true);
      setQuitButton(false);
    }
    if (quitCheckBox === true) {
      setQuitCheckBox(false);
      setQuitButton(true);
    }
  };

  // 회원탈퇴 버튼 클릭해서 탈퇴하기
  const clickQuitBtn = async () => {
    try {
      await quitUser(approveInfo);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(userLogout());
      alert("회원 탈퇴가 완료되었습니다. 메인페이지로 이동합니다.");
      navigate("/compagno");
    } catch (err) {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

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
          <Tab eventKey="home" title="정보 조회">
            <div className="info-content">
              <img
                className="info-image"
                src={"http://192.168.10.28:8081/" + info.userImg}
                // src={"C:/upload/" + user.userImg}
              />
              <div className="info-text">
                <p>이름 : {info.userPersonName}</p>
                <p>아이디 : {info.userId}</p>
                <p>전화번호 : {info.userPhone}</p>
                <p>닉네임 : {info.userNickname}</p>
                <p>이메일 : {info.userEmail}</p>
                <p>가입일 : {info.userEnrollDate}</p>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="정보 수정">
            <h1>회원 정보 수정</h1>
            <div className="info-edit">
              <div className="changeMyInfo">
                <Form.Group controlId="formFile" className="mb-3">
                  <div className="info-edit-img">
                    <label className="profileImage">
                      <img
                        src={
                          pImageUrl
                            ? pImageUrl
                            : "http://192.168.10.28:8081/" + info.userImg
                        }
                        htmlFor="pic"
                      />
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={uploadProfileImage}
                        name="pic"
                        hidden
                      />
                    </label>
                    <button onClick={onChangedefaultImg} className="picBtn">
                      프로필 이미지 삭제
                    </button>
                  </div>

                  <div className="info-edit-text">
                    <Form.Control
                      type="password"
                      value={user.userPwd}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          userPwd: e.target.value,
                          userId: info.userId,
                        }));
                      }}
                    />
                    <span className="regExpMessage">{userPwdSpan}</span>
                    <Form.Control
                      type="password"
                      value={user.userPwdCheck}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          userPwdCheck: e.target.value,
                        }));
                      }}
                    />
                    <span className="regExpMessage">{userPwdCheckSpan}</span>

                    <Form.Control
                      type="text"
                      value={user.userPhone}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          userPhone: e.target.value,
                        }));
                      }}
                    />
                    <span className="regExpMessage">{userPhoneSpan}</span>

                    <Form.Control
                      type="text"
                      value={user.userEmail}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          userEmail: e.target.value,
                        }));
                      }}
                    />
                    <span className="regExpMessage">{userEmailSpan}</span>
                  </div>
                </Form.Group>
              </div>
              <Button onClick={editMyInfo} className="editBtn">
                회원 정보 수정
              </Button>
            </div>
          </Tab>
          <Tab eventKey="quit" title="회원 탈퇴">
            <div className="info-quit">
              <ul id="quitInstructions">
                <h1>Compagno 탈퇴 전 확인하세요.</h1>
                <li>회원탈퇴시 사이트 접근이 제한됩니다.</li>
                <li>타 유저의 게시글에 작성한 댓글은 삭제되지 않습니다.</li>
                <li>6개월 후 모든 정보가 삭제되며, 복구가 불가능합니다.</li>
              </ul>
              <label>
                <input
                  type="checkbox"
                  name="quitAgree"
                  checked={quitCheckBox}
                  onChange={clickCheckBox}
                />
                유의사항을 확인했습니다.
              </label>
              <br />
              <input
                className="forQuitInput"
                type="password"
                disabled={quitButton}
                placeholder="현재 비밀번호를 입력해주세요"
                value={approveInfo.userPwd}
                onChange={(e) =>
                  setApproveInfo({
                    userId: info.userId,
                    userPwd: e.target.value,
                  })
                }
              />
              <button disabled={quitButton} onClick={clickQuitBtn}>
                회원 탈퇴
              </button>
            </div>
          </Tab>
        </Tabs>
      </div>
    </Div>
  );
};
export default MyPageMyInfo;
