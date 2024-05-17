import styled from "styled-components";
import useDidMountEffect from "../../components/user/useDidMountEffect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

  .activityHeader {
    width: calc(100vw - 300px);
    height: fit-content;
    display: flex;
    justify-content: left;
    padding-left: 8px;

    a {
      width: 150px;
      margin: 0px 2px;
      padding: 10px 10px;
      height: fit-content;
      text-decoration-line: none;
      color: white;
      background-color: #94b29b;
      text-align: center;
      border-radius: 10px;
    }

    .selectedMenu {
      color: black;
      background-color: white;
      border: 2px dashed #94b29b;
      box-sizing: border-box;
    }
  }
`;

const MyPageTab = (onClickMenu) => {
  const [menu1, setMenu1] = useState("");
  const [menu2, setMenu2] = useState("");
  const [menu3, setMenu3] = useState("");
  const [menu4, setMenu4] = useState("");
  const [menu5, setMenu5] = useState("");
  const [menu6, setMenu6] = useState("");
  const [menu7, setMenu7] = useState("");
  const [menu8, setMenu8] = useState("");
  const [menu9, setMenu9] = useState("");

  const nowMenu = Object.values(onClickMenu).toString();

  const setTabCss = () => {
    if (nowMenu == "myadoption") {
      setMenu1("selectedMenu");
    } else if (nowMenu == "mylost") {
      setMenu2("selectedMenu");
    } else if (nowMenu == "myanimalfav") {
      setMenu3("selectedMenu");
    } else if (nowMenu == "myproductfav") {
      setMenu4("selectedMenu");
    } else if (nowMenu == "myneighbor") {
      setMenu5("selectedMenu");
    } else if (nowMenu == "myuserqna") {
      setMenu6("selectedMenu");
    } else if (nowMenu == "mysitter") {
      setMenu7("selectedMenu");
    } else if (nowMenu == "myonedayclass") {
      setMenu8("selectedMenu");
    } else if (nowMenu == "myqna") {
      setMenu9("selectedMenu");
    }
  };

  useEffect(() => {
    setTabCss();
  }, []);

  const [user, setUser] = useState({});
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

  return (
    <Div>
      <div className="activityHeader">
        {user.userRole == "ROLE_USER" ? (
          <>
            <a className={`${menu1}`} href="/compagno/mypage/myadoption">
              입양 동물
            </a>
            <a className={`${menu2}`} href="/compagno/mypage/mylost">
              실종 공고
            </a>
            <a className={`${menu3}`} href="/compagno/mypage/myanimalfav">
              자유게시판
            </a>
            <a className={`${menu4}`} href="/compagno/mypage/myproductfav">
              제품 정보
            </a>
            <a className={`${menu5}`} href="/compagno/mypage/myneighbor">
              우리 동네
            </a>
            <a className={`${menu6}`} href="/compagno/mypage/myuserqna">
              유저간 질문
            </a>
            <a className={`${menu7}`} href="/compagno/mypage/mysitter">
              펫 시터
            </a>
            <a className={`${menu8}`} href="/compagno/mypage/myonedayclass">
              원데이
            </a>
            <a className={`${menu9}`} href="/compagno/mypage/myqna">
              QnA
            </a>
          </>
        ) : (
          <>
            <a className={`${menu9}`} href="/compagno/mypage/myqna">
              QnA
            </a>
          </>
        )}
      </div>
    </Div>
  );
};

export default MyPageTab;
