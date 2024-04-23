import styled from "styled-components";

const Div = styled.div`
  margin-top: 112px;
  display: flex;
  flex-direction: column;
  width: 20%;

  .mypage-menu {
    border-right: 1px solid black;
    background-color: lightgoldenrodyellow;
    width: 100%;

    height: calc(100vh - 107px);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 100px 0px;
  }
  .mypage-menu a {
    cursor: pointer;
    text-decoration: 1px dashed underline;
    text-underline-offset: 5px;
  }
`;

const MyPageSidebar = () => {
  // 마이페이지에서 공통적으로 사용할 사이드바 메뉴
  return (
    <Div>
      <div className="mypage-head">
        <h1>마 이 페 이 지</h1>
      </div>
      <div className="mypage-menu">
        <a href="/compagno/mypage/myinfo">내 정보</a>
        <a href="/compagno/mypage/myactivity">내 활동내역</a>
        <a>쪽지</a>
        <a>로그아웃</a>
      </div>
    </Div>
  );
};
export default MyPageSidebar;
