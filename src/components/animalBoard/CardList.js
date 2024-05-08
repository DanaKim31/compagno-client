import { Card } from "react-bootstrap";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FavoriteBoard from "./FavoriteBoard";
import { viewDetail } from "../../api/animalBoard";
const Div = styled.div`
  .title-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .fav-container {
      display: flex;
      flex-direction: row;
    }
  }

  .nice-card {
    cursor: pointer;
    border: 1px solid lightgrey;
    border-radius: 15px;
  }
`;
const CardList = ({ board, user }) => {
  const [count, setCount] = useState({
    animalBoardFavoriteCount: board.animalBoardFavoriteCount,
  });
  const animalBoardAPI = async () => {
    const response = await viewDetail(board.animalBoardCode);
    setCount(response.data);
  };

  const navigate = useNavigate();
  const moveDetail = (boardCode) => {
    navigate(`/compagno/animal-board/${boardCode}`);
  };

  return (
    <Div>
      <Card style={{ width: "18rem" }} className="border-0">
        {board.animalMainImage === "animalDefault.jpg" ? (
          <>
            <Card.Img
              rounded
              className="nice-card"
              variant="top"
              src={
                "http://192.168.10.28:8081/animalBoard/" +
                board?.animalMainImage
              }
              style={{ width: "100%", objectFit: "cover" }}
              onClick={() => moveDetail(board.animalBoardCode)}
            />
          </>
        ) : (
          <>
            <Card.Img
              rounded
              className="nice-card"
              variant="top"
              src={"http://192.168.10.28:8081" + board?.animalMainImage}
              style={{ width: "100%", objectFit: "cover" }}
              onClick={() => moveDetail(board.animalBoardCode)}
            />
          </>
        )}

        <Card.Body>
          <Card.Title className="title-container">
            {board.animalBoardTitle}
            <div className="fav-container">
              <FavoriteBoard
                userId={user.userId}
                boardCode={board.animalBoardCode}
                count={board.animalBoardFavoriteCount}
                animalBoardAPI={() => animalBoardAPI()}
              />
              <div>{count.animalBoardFavoriteCount}</div>
            </div>
          </Card.Title>
          <Card.Text style={{ width: "100%" }}></Card.Text>
        </Card.Body>
      </Card>
    </Div>
  );
};
export default CardList;
