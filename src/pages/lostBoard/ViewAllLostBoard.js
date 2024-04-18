import { viewAllLostBoard } from "../../api/lostBoard";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100vw;
  h2 {
    font-size: 2rem;
    margin-bottom: 50px;
  }
  .contents {
    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; */
    /* grid-template-rows: 200px 200px 200px; */
    /* grid-column-gap: 100px; */
    /* grid-row-gap: 70px; */
    /* width: 70%; */
    /* height: 70%; */

    display: flex;
    flex-wrap: wrap;
    width: 80%;

    .content {
      border: 1px solid gray;
      height: 250px;
      margin: 20px;
      h4 {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px dashed green;
        height: 40px;
      }
      .text {
        height: 77%;
        border-top: 1px dashed green;
        display: flex;

        align-items: center;
      }
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
      <Div>
        <h2>동물 신고 게시판</h2>
        <div className="contents">
          {losts.map((lost) => (
            <div key={lost.lostBoardCode}>
              작성일 : {lost.lostRegiDate}
              <div className="content">
                <h4>{lost.lostAnimalName}</h4>
                이미지 : {lost.lostAnimalImage}
                <div className="text">
                  신고자 닉네임 : {lost.userNickname}
                  <br />
                  실종 동물 품종 : {lost.lostAnimalKind}
                  <br />
                  성별 : {lost.lostAnimalGender}
                  <br />
                  실종일 : {lost.lostDate}
                  <br />
                  실종지역 : {lost.lostLocation}
                  <br />
                  실종 동물 특징 : {lost.lostAnimalFeature}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Div>
    </>
  );
};
export default ViewAllLostBoard;
