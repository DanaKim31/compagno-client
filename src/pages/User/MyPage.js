import styled from "styled-components";

const Div = styled.div`
  height: calc(100vh - 107px);
  display: flex;

  .mypage-menu {
    border-right: 1px solid black;
    background-color: lightgoldenrodyellow;
    width: 30%;
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

  .mypage-content {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MyPage = () => {
  return (
    <Div>
      <div className="mypage-menu">
        <a>내 정보</a>
        <a>내 활동내역</a>
        <a>쪽지</a>
        <a>로그아웃</a>
      </div>
      <div className="mypage-content">
        <p>여기는 마이페이지 메인구역</p>
      </div>
    </Div>
  );
};
export default MyPage;
