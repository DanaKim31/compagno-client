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
import MyPagePutPwd from "./MyPagePutPwd";
import { MdEdit } from "react-icons/md";

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

    .editHeader {
      margin-bottom: 30px;
      font-weight: bold;
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
      border-width: 2px 2px 50px 2px;
      border-color: #94b29b;
      border-style: solid;
      border-radius: 50px;
      font-size: 1.2rem;

      .info-image {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    // 정보 수정

    .info-edit {
      width: 820px;

      .changeMyInfo {
        display: flex;

        .info-edit-img {
          width: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 100px;

          .profileImage {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            margin-bottom: 30px;

            #editPicIcon {
              left: 860px;
              position: fixed;
              font-size: 2.5rem;
              cursor: pointer;
            }

            img {
              width: 200px;
              height: 200px;
              border-radius: 50%;
              cursor: pointer;
              object-fit: cover;
            }
          }

          .picBtn {
            width: 200px;
            margin-bottom: 30px;
            border-radius: 5px;
            border: 2px solid;
            color: rgb(32, 61, 59);
            text-decoration: none;
            padding: 10px;
            font-size: 1rem;
            align-items: center;
            font-weight: bold;
          }

          .picBtn:hover {
            background-color: rgb(32, 61, 59);
            color: white;
            font-weight: bold;
          }
        }

        .info-edit-text {
          width: 50%;
          display: flex;
          flex-direction: column;

          input {
            font-weight: bold;
            border: 1px solid black;
          }

          span {
            margin-top: 5px;
            width: 100%;
            height: 30px;
            font-size: 0.9rem;
            color: red;
          }
        }
      }
      .editBtn {
        width: 82%;
        border-radius: 5px;
        border: 2px solid;
        color: rgb(32, 61, 59);
        background-color: rgb(240, 240, 240);
        text-decoration: none;
        padding: 10px;
        font-size: 1rem;
        align-items: center;
        font-weight: bold;
      }

      .editBtn:hover {
        background-color: rgb(32, 61, 59);
        color: white;
        font-weight: bold;
      }
    }

    .info-quit {
      width: 800px;

      #quitHeadText {
        font-weight: bold;
        margin-bottom: 20px;
      }

      .quitInstructionText {
        list-style: decimal;

        li {
          margin-bottom: 10px;
        }
      }

      #checkZone {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        input,
        button {
          font-weight: bold;
        }

        button {
          border-radius: 5px;
          width: 500px;
          background-color: rgb(32, 61, 59);
          color: white;
          text-decoration: none;
          padding: 10px;
          font-size: 1rem;
          align-items: center;
        }

        button:disabled {
          background-color: rgb(240, 240, 240);
          color: black;
        }

        .forQuitInput {
          width: 500px;
          margin-bottom: 20px;
        }
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
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일
  const phoneRegexp = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; // 전화번호

  // 정보 변경 정규표현식 미충족시 출력할 경고문구
  const emailText = "올바른 이메일 양식을 입력해주세요"; // 이메일
  const phoneText = "하이픈(-) 포함해서 올바르게 입력해주세요"; // 전화번호

  // 정보 변경 경고문구 초기화
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
            <h1 className="editHeader">회원 정보 수정</h1>
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
                      <MdEdit id="editPicIcon" />
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
                    <h3>전화번호 수정</h3>
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

                    <h3>이메일 수정</h3>
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
          <Tab eventKey="editPwd" title="암호 변경">
            <MyPagePutPwd />
          </Tab>
          {user.userRole == "ROLE_USER" ? (
            <Tab eventKey="quit" title="회원 탈퇴">
              <div className="info-quit">
                <h1 id="quitHeadText">Compagno 탈퇴 전 확인하세요.</h1>
                <div id="quitInstructions">
                  <h3>회원 탈퇴 및 정보 보존 정책</h3>
                  <ol className="quitInstructionText">
                    <li>
                      회원 탈퇴 시, 본 사이트의 모든 서비스 및 기능에 대한
                      접근이 제한됩니다. 회원 탈퇴 후에도 개인 정보 보호 및 보안
                      정책은 유지됩니다.
                    </li>
                    <li>
                      탈퇴 전에 작성된 타 유저의 게시물에 달린 댓글은 탈퇴
                      후에도 삭제되지 않습니다. 이는 타인의 컨텐츠에 대한 존중과
                      함께 본인의 의견을 보존하는 것을 목적으로 합니다.
                    </li>
                    <li>
                      회원 탈퇴 후 6개월 이내에 모든 개인 정보가 영구적으로
                      삭제됩니다. 이는 회원 탈퇴에 대한 최종적인 조치로, 삭제된
                      정보는 복구가 불가능합니다. 탈퇴 후에도 이전에 제공한
                      정보가 일부 서비스 또는 기능에서 잠재적으로 사용될 수
                      있음을 유의하시기 바랍니다.
                    </li>
                  </ol>
                </div>
                <div id="checkZone">
                  <label>
                    <input
                      type="checkbox"
                      name="quitAgree"
                      checked={quitCheckBox}
                      onChange={clickCheckBox}
                    />
                    유의사항을 확인했습니다.
                  </label>
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
              </div>
            </Tab>
          ) : (
            <></>
          )}
        </Tabs>
      </div>
    </Div>
  );
};
export default MyPageMyInfo;
