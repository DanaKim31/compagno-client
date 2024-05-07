import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;

  .mypage-menu {
    border-right: 1px solid black;
    background-color: lightgoldenrodyellow;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 100px 0px;
  }

  .mypage-menu h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  .mypage-menu a {
    cursor: pointer;
    text-decoration: 1px dashed underline;
    text-underline-offset: 5px;
    color: black;
  }
`;

const MyPageSidebar = () => {
  // 마이페이지에서 공통적으로 사용할 사이드바 메뉴
  return (
    <Div>
      <div className="mypage-menu">
        <h1>마이 페이지</h1>
        <a href="/compagno/mypage/myinfo">내 정보</a>
        <a href="/compagno/mypage/myactivity">내 활동내역</a>
        <a href="/compagno/mypage/mynote">쪽지함</a>
      </div>
    </Div>
  );
};
export default MyPageSidebar;
