import styled from "styled-components";

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
        <a href="/compagno/mypage/myadoption">입양 동물</a>
        <a href="/compagno/mypage/mylost">실종 공고</a>
        <a href="/compagno/mypage/myanimalfav">자유게시판</a>
        <a href="/compagno/mypage/myproductfav">제품 정보</a>
        <a href="/compagno/mypage/myneighbor">우리 동네</a>
        <a href="/compagno/mypage/myuserqna">유저간 질문</a>
        <a href="/compagno/mypage/mysitter">펫 시터</a>
        <a href="/compagno/mypage/myonedayclass">원데이</a>
        <a href="/compagno/mypage/myqna">QnA</a>
      </div>
    </Div>
  );
};

export default MyPageTab;
