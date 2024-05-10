import styled from "styled-components";

const Div = styled.div`
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
      color: black;
      border-top: 1px dashed black;
      border-left: 1px dashed black;
      border-right: 1px dashed black;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      text-align: center;
    }
  }
`;

const MyPageTab = () => {
  return (
    <Div>
      <div className="activityHeader">
        <a href="/compagno/mypage/myanimalfav">최애 동물</a>
        <a href="/compagno/mypage/myproductfav">관심 제품</a>
        <a href="">1day class</a>
        <a href="">adoption</a>
        <a href="">register</a>
        <a href="/compagno/mypage/myqna">QnA</a>
      </div>
    </Div>
  );
};

export default MyPageTab;
