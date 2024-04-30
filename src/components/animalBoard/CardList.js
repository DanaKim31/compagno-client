import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteBoard from "./FavoriteBoard";
import { viewDetail } from "../../api/animalBoard";
const Div = styled.div`
  display: flex;
  justify-content: center;
  .row-container {
    width: 80%;
  }
  .mb-4 {
    width: 300px;
  }
  .nice-card {
    cursor: pointer;
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
      <Row md={4} className="row-container">
        {/* {boards?.map((board) => ( */}
        <Col
          key={board.animalBoardCode}
          className="col-6 col-md-4 col-lg-3 mb-4"
          //
        >
          <Card style={{ width: "18rem" }}>
            {board.animalMainImage === "animalDefault.jpg" ? (
              <>
                <Card.Img
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
                  className="nice-card"
                  variant="top"
                  src={"http://192.168.10.28:8081" + board?.animalMainImage}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </>
            )}

            <Card.Body>
              <Card.Title>
                {board.animalBoardTitle}
                <FavoriteBoard
                  userId={user.userId}
                  boardCode={board.animalBoardCode}
                  count={board.animalBoardFavoriteCount}
                  animalBoardAPI={() => animalBoardAPI()}
                />
                {count.animalBoardFavoriteCount}
              </Card.Title>
              <Card.Text style={{ width: "100%" }}></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* ))} */}
      </Row>
    </Div>
  );
};
export default CardList;
