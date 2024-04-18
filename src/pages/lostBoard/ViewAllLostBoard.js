import { viewAllLostBoard } from "../../api/lostBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Header = styled.header`
  .header {
    height: 107px;
    background-color: gray;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  /* height: 100vh; */
  width: 100vw;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .contents {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 200px 200px 200px;
    grid-column-gap: 50px;
    grid-row-gap: 20px;
    width: 800px;
    height: 800px;

    div {
      border: 1px solid gray;
      height: 170px;
    }
  }
`;

const ViewAllLostBoard = () => {
  const [losts, setLosts] = useState([]);

  const lostAPI = async () => {
    const response = await viewAllLostBoard();
    console.log("response:" + response.data);
    setLosts(response.data);
  };

  useEffect(() => {
    lostAPI();
  }, []);

  return (
    <>
      <Header>
        <h2 className="header">Header</h2>
      </Header>

      <Div>
        <h2>동물 신고 게시판</h2>
        <div className="contents">
          {losts.map((lost) => (
            <div key={lost.lostBoardCode} className="content">
              작성일 : {lost.lostRegiDate}
              이미지 : {lost.lostAnimalImage}
              닉네임 : {lost.userNickname}
              제목 : {lost.lostTitle}
              실종일 : {lost.lostDate}
              실종지역 : {lost.lostLocation}
              실종동물이름:{lost.lostAnimalName}
              실종 동물 특징 : {lost.lostAnimalFeature}
            </div>
          ))}
        </div>
      </Div>
    </>
  );
};
export default ViewAllLostBoard;
