import "../assets/style.css";

const Header = () => {
  return (
    <>
      <header className="head">
        <a href="logo" className="logo">
          Compagno
        </a>
        <div className="menu">
          <div className="dropdown">
            <span className="dropbtn">동물 등록</span>
            <div className="dropdown-content">
              <a href="/register-pet/insts">대행기관</a>
              <a href="#">FAQ</a>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropbtn">구조 동물</span>
            <div className="dropdown-content">
              <a href="#">입양 공고</a>
              <a href="#">실종 공고</a>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropbtn" id="p">
              게시판
            </span>
            <div className="dropdown-content">
              <a href="#">콘테스트</a>
              <a href="#">제품정보 공유</a>
              <a href="#">반려동물 동반</a>
              <a href="#">우리동네 게시판</a>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropbtn" id="p">
              서비스
            </span>
            <div className="dropdown-content">
              <a href="#">펫 시터</a>
              <a href="#">원데이 클래스</a>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropbtn">공지사항</span>
            <div className="dropdown-content">
              <a href="#">공지사항</a>
              <a href="#">QnA</a>
            </div>
          </div>
          <div className="dropdown">
            <span className="dropbtn">마이페이지</span>
            <div className="dropdown-content">
              <a href="#">계정정보 수정</a>
              <a href="#">활동 내역</a>
            </div>
          </div>
          <a href="/compagno/login">login</a>
          <div id="page">
            <div id="toggle">
              <div className="bar"></div>
            </div>
            <section id="overlay">
              <nav>
                <p>Compagno</p>
                <ul>
                  <li>
                    <a href="#">Homepage</a>
                  </li>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Products</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Contacts</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Contacts</a>
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
