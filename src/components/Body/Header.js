import "../../assets/style.css";
import { useState, useEffect } from "react";
import { userSave, userLogout } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "../../components/user/useDidMountEffect";

// 헤더 색변환 / 햄버거 메뉴바 js

const Header = () => {
  // 로그인 위해 필요 (유저관련)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 유저 정보 가져오기 (유저관련)
  const user = useSelector((state) => {
    return state.user;
  });
  // ===========================================================================
  useEffect(() => {
    // #toggle 요소에 클릭 이벤트를 추가합니다.  // 여기부분 햄버거 메뉴  관련
    document.getElementById("toggle").addEventListener("click", function () {
      // #toggle .bar 요소에 animate 클래스를 토글합니다.
      document.querySelector("#toggle .bar").classList.toggle("animate");
      // #page 요소에 overlay 클래스를 토글합니다.
      document.getElementById("page").classList.toggle("overlay");
    });

    // 유저 정보 가져오기 (유저관련)
    const token = localStorage.getItem("token");

    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);

  // 로그아웃 기능 작동 (유저관련)
  const logout = (e) => {
    e.preventDefault(); // 원래 기능을 막는다, 여기서는 a 태그의 리다이렉트 기능을 막음
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
    alert("로그아웃하여 메인페이지로 이동합니다.");
    navigate("/compagno");
  };

  return (
    <>
      <header className="head">
        <a href="/compagno" className="logo">
          Compagno
        </a>
        <div className="menu">
          <div className="dropdown">
            <div className="dropbtn">동물 등록</div>
            <div className="dropdown-content">
              <a href="/compagno/register-pet/insts">대행기관</a>
              <a href="/compagno/register-pet/faq">FAQ</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">구조 동물</div>
            <div className="dropdown-content">
              <a href="/compagno/adoptionBoard/viewAll">입양 공고</a>
              <a href="/compagno/lostBoard/viewAll">실종 공고</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn" id="p">
              게시판
            </div>
            <div className="dropdown-content">
              <a href="/compagno/animal-board">자유게시판</a>
              <a href="/compagno/product-board">제품정보 공유</a>
              <a href="/compagno/content">반려동물 동반</a>
              <a href="/compagno/neighborBoard">우리동네</a>
              <a href="/compagno/userQna">질문 게시판</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn" id="p">
              서비스
            </div>
            <div className="dropdown-content">
              <a href="/compagno/sitterBoard">펫 시터</a>
              <a href="/compagno/onedayClassBoard">원데이 클래스</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">공지사항</div>
            <div className="dropdown-content">
              <a href="/compagno/notice-board">공지사항</a>
              <a href="/compagno/question">QnA</a>
            </div>
          </div>
          {Object.keys(user).length !== 0 ? (
            <>
              {" "}
              <div className="dropdown">
                <span className="dropbtn">{user.userNickname}</span>
                <div className="dropdown-content">
                  {user.userRole == "ROLE_USER" ? (
                    <>
                      <a href="/compagno/mypage/myinfo">계정정보 수정</a>
                      <a href="/compagno/mypage/myadoption">활동 내역</a>
                    </>
                  ) : (
                    <>
                      <a href="/compagno/mypage/myinfo">계정정보 수정</a>
                      <a href="/compagno/mypage/myqna">미답변 QnA</a>
                    </>
                  )}
                </div>
              </div>
              <div>
                <a href="" onClick={logout} className="logout">
                  logout
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="user">
                <a href="/compagno/signup">sigup</a>
                <a href="/compagno/login">login</a>
              </div>
            </>
          )}
          <div id="page">
            <div id="toggle">
              <div className="bar"></div>
            </div>
            <section id="overlay">
              <nav>
                <p>Compagno</p>
                <ul>
                  <li>
                    <a href="#">입양공고</a>
                  </li>
                  <li>
                    <a href="#">실종신고</a>
                  </li>
                  <li>
                    <a href="#">콘테스트</a>
                  </li>
                  <li>
                    <a href="/compagno/product-board">제품정보 공유</a>
                  </li>
                  <li>
                    <a href="#">반려동물 동반</a>
                  </li>
                  <li>
                    <a href="#">우리동네 게시판</a>
                  </li>
                  <li>
                    <a href="#">원데이클래스</a>
                  </li>
                </ul>
              </nav>
            </section>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
