import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { viewBoardList } from "../../api/animalBoard";

const Div = styled.div`
  padding-top: 112px;
`;

// 여기서 viewAll 의 역할을 해줌
const AnimalHome = () => {
  const [boards, setBoard] = useState([]); // 여러개 = 배열

  const getBoard = async () => {
    const result = await viewBoardList();
    console.log(result.data);
    setBoard(result.data);
  };
  useEffect(() => {
    getBoard();
  }, []);

  return (
    <Div>
      <Link to="/compagno/write-board"> 글쓰기! </Link>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {boards?.map((board) => (
            <tr key={board.animalBoardCode}>
              <td>글 번호</td>
              <td>
                <span>{board.animalCategory?.animalType}</span>
                <a href={`/compagno/animal-board/${board.animalBoardCode}`}>
                  {board.animalBoardTitle}
                </a>
              </td>
              <td>{board.user.userNickname}</td>
              <td>{board.animalBoardView}</td>
              <td>{board.animalBoardDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};

export default AnimalHome;
