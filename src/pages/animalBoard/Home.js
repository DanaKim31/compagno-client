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

const Div = styled.div`
  padding-top: 112px;
`;

// 여기서 viewAll 의 역할을 해줌
const AnimalHome = () => {
  // 유저 ===========================
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  // ==============================
  const [boards, setBoard] = useState([]); // 여러개 = 배열
  const getBoard = async () => {
    const result = await viewBoardList();
    console.log(result.data);
    setBoard(result.data);
  };
  const animalBoardAPI = async (code) => {
    const response = await viewDetail(code);
  };
  useEffect(() => {
    getBoard();
  }, []);
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
      {boards?.map((board) => (
        <CardList board={board} user={user} />
      ))}
    </Div>
  );
};

export default AnimalHome;
