import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewBoardList } from "../../api/animalBoard";
import { Dropdown } from "react-bootstrap";
import TableList from "../../components/animalBoard/TableList";
import CardList from "../../components/animalBoard/CardList";
import { useSelector, useDispatch } from "react-redux";
import { userSave } from "../../store/user";
import { viewDetail } from "../../api/animalBoard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Div = styled.div`
  padding-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .mb-4 {
    width: 300px;
  }
  .row-container {
    width: 80%;
  }
`;

// 여기서 viewAll 의 역할을 해줌
const AnimalHome = () => {
  // 유저 ===========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ==============================
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [boards, setBoard] = useState([]); // 여러개 = 배열
  const getBoard = async () => {
    setLoading(true);
    const response = await viewBoardList(page);
    console.log(response.data);
    const newData = response.data;

    setBoard((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (!loading) {
      getBoard();
    }
  }, [page, loading]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(userSave(JSON.parse(localStorage.getItem("user"))));
    }
  }, []);
  return (
    <Div>
      <Dropdown>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          보기
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">테이블로 보기</Dropdown.Item>
          <Dropdown.Item href="#/action-2">카드로 보기</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link to="/compagno/write-board"> 글쓰기! </Link>
      <TableList tableboards={boards} />
      <Row md={4} className="row-container">
        {boards?.map((board) => (
          <Col className="col-6 col-md-4 col-lg-3 mb-4">
            <CardList board={board} user={user} />
          </Col>
        ))}
      </Row>
      <button onClick={() => setLoading(false)} variant="dark">
        더 보기
      </button>
    </Div>
  );
};

export default AnimalHome;
