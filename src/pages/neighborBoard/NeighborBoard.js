import { useState, useEffect } from "react";
import { getNeighborBoards } from "../../api/neighborBoard";
import styled from "styled-components";

const Div = styled.div`
  width: 90%;
  margin: auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 100px;
  }
  table {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;

    th {
      padding: 10px;
      border-bottom: 2px solid black;
    }
    td {
      padding: 10px;
    }
    .list:hover {
      background: lightgray;
    }
    .list :nth-child(4) {
      text-align: left;
    }
  }
`;

const NeighborBoard = () => {
  const [neighborBoards, setNeighborBoards] = useState([]);

  const neighborBoardAPI = async () => {
    const result = await getNeighborBoards();
    setNeighborBoards(result.data);
  };

  useEffect(() => {
    neighborBoardAPI();
  }, []);

  return (
    <Div>
      <h1>우리동네 게시판</h1>

      <div></div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>구분</th>
            <th>지역</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {neighborBoards?.map((neighbor) => (
            <tr key={neighbor.neighborBoardCode} className="list">
              <td>{neighbor.neighborBoardCode}</td>
              <td>{neighbor.animalCategoryCode.animalType}</td>
              <td>{neighbor.locationCode.locationName}</td>
              <td>{neighbor.neighborBoardTitle}</td>
              <td>{neighbor.user.userId}</td>
              <td>{neighbor.neighborBoardRegiDate}</td>
              <td>{neighbor.neighborBoardViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Div>
  );
};

export default NeighborBoard;
