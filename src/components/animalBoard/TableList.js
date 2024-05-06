import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const TableParticle = styled.div`
  display: flex;

  cursor: pointer;

  margin: 20px 0px 20px 0px;
  padding: 20px 0px 20px 0px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  .basic-info-container {
    .title-cate {
      color: green;
      font-weight: bold;
    }
    .title {
      font-size: 1.5rem;
    }
  }

  .image-box {
    width: 220px;
    height: 180px;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 15px;
    .image-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .comment-count-container {
    margin-left: 10px;
    width: 70px;
    background-color: lightgray;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const TableList = ({ tableboards }) => {
  console.log(tableboards);
  const navigate = useNavigate();
  const goDetail = (boardCode) => {
    navigate(`/compagno/animal-board/${boardCode}`);
  };
  return (
    <>
      {tableboards?.map((board) => (
        <TableParticle
          key={board.animalBoardCode}
          onClick={() => goDetail(board.animalBoardCode)}
        >
          <div className="basic-info-container">
            <div className="title-container">
              <p className="title-cate">
                {"[" + board.animalCategory.animalType + "]"}
              </p>
              <p className="title">{board.animalBoardTitle}</p>
            </div>
            <div className="detail">
              {board.user.userNickname +
                " |  " +
                moment(board.animalBoardDate).format("MM.DD HH:mm") +
                " | 조회 " +
                board.animalBoardView}
            </div>
          </div>
          <div className="image-box">
            <img
              className="image-thumbnail"
              rounded
              src={
                board?.animalMainImage === "animalDefault.jpg" ||
                board.animalMainImage === null
                  ? "http://192.168.10.28:8081/animalBoard/" +
                    board?.animalMainImage
                  : `http://192.168.10.28:8081/${board?.animalMainImage}`
              }
            />
          </div>

          <div className="comment-count-container">
            <div></div>
          </div>
        </TableParticle>
      ))}
    </>
  );
};
export default TableList;
