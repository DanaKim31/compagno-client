import "../../assets/style.css";
import { useState, useEffect } from "react";

// 헤더 색변환 / 햄버거 메뉴바 js

const Header = () => {
  // // Header >>>>  색변환 !!
  // $(function () {
  //   var $header = $("header"); //헤더를 변수에 넣기
  //   var $page = $(".page-start"); //색상이 변할 부분
  //   var $window = $(window);
  //   var pageOffsetTop = $page.offset().top; //색상 변할 부분의 top값 구하기

  //   $window.resize(function () {
  //     //반응형을 대비하여 리사이즈시 top값을 다시 계산
  //     pageOffsetTop = $page.offset().top;
  //   });

  //   $window.on("scroll", function () {
  //     //스크롤시
  //     var scrolled = $window.scrollTop() >= pageOffsetTop; //스크롤된 상태; true or false
  //     $header.toggleClass("down", scrolled); //클래스 토글
  //   });
  // });
  // ===========================================================================
  useEffect(() => {
    // #toggle 요소에 클릭 이벤트를 추가합니다.
    document.getElementById("toggle").addEventListener("click", function () {
      // #toggle .bar 요소에 animate 클래스를 토글합니다.
      document.querySelector("#toggle .bar").classList.toggle("animate");
      // #page 요소에 overlay 클래스를 토글합니다.
      document.getElementById("page").classList.toggle("overlay");
    });
  }, []);

  // useEffect(() => {
  //   document.addEventListener("DOMContentLoaded", function () {
  //     var header = document.querySelector("header"); // 헤더 요소를 변수에 저장합니다.
  //     var page = document.querySelector(".page-start"); // 색상이 변할 부분을 변수에 저장합니다.
  //     var window = window;
  //     var pageOffsetTop = page.getBoundingClientRect().top + window.scrollY; // 색상이 변할 부분의 top 값을 구합니다.

  //     window.addEventListener("resize", function () {
  //       // 반응형을 대비하여 리사이즈할 때 top 값을 다시 계산합니다.
  //       pageOffsetTop = page.getBoundingClientRect().top + window.scrollY;
  //     });

  //     window.addEventListener("scroll", function () {
  //       // 스크롤할 때
  //       var scrolled = window.scrollY >= pageOffsetTop; // 스크롤된 상태를 판단합니다.
  //       console.log(window.scrollY);
  //       header.classList.toggle("down", scrolled); // 클래스를 토글하여 적용합니다.
  //     });
  //   });
  // }, []);

  return (
    <>
      <header className="head">
        <a href="logo" className="logo">
          Compagno
        </a>
        <div className="menu">
          <div className="dropdown">
            <div className="dropbtn">동물 등록</div>
            <div className="dropdown-content">
              <a href="#">대행기관</a>
              <a href="asdasd">FAQ</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">구조 동물</div>
            <div className="dropdown-content">
              <a href="#">입양 공고</a>
              <a href="#">실종 공고</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn" id="p">
              게시판
            </div>
            <div className="dropdown-content">
              <a href="#">콘테스트</a>
              <a href="#">제품정보 공유</a>
              <a href="#">반려동물 동반</a>
              <a href="#">우리동네 게시판</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn" id="p">
              서비스
            </div>
            <div className="dropdown-content">
              <a href="#">펫 시터</a>
              <a href="#">원데이 클래스</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">공지사항</div>
            <div className="dropdown-content">
              <a href="#">공지사항</a>
              <a href="#">QnA</a>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">마이페이지</div>
            <div className="dropdown-content">
              <a href="#">계정정보 수정</a>
              <a href="#">활동 내역</a>
            </div>
          </div>
          <div className="login">
            <a href="/compagno/login">login</a>
          </div>
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
                    <a href="#">제품정보 공유</a>
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
