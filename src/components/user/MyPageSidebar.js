import styled from "styled-components";

const Div = styled.div`
  @font-face {
    font-family: "TAEBAEKmilkyway";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  display: flex;
  flex-direction: column;
  width: 300px;
  font-family: "TAEBAEKmilkyway";
  font-weight: bold;

  .mypage-menu {
    border-right: 1px solid black;
    background-image: url("/img/sideBarImage.jpg");
    width: 100%;
    height: 100%;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 100px 0px;
    color: white;
  }

  .mypage-menu h1 {
    font-size: 3rem;
    font-weight: bold;
  }

  .mypage-menu a {
    cursor: pointer;
    text-decoration: 1px dashed underline;
    text-underline-offset: 5px;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

const MyPageSidebar = () => {
  // 마이페이지에서 공통적으로 사용할 사이드바 메뉴
  return (
    <Div>
      <div className="mypage-menu">
        <h1>마이 페이지</h1>
        <a href="/compagno/mypage/myinfo">내 정보</a>
        <a href="/compagno/mypage/myanimalfav">내 활동내역</a>
        <a href="/compagno/mypage/mynote">쪽지함</a>
        <a href="/compagno/">메인 페이지로</a>
      </div>
    </Div>
  );
};
export default MyPageSidebar;
