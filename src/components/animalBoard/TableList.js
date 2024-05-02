const TableList = ({ tableboards }) => {
  return (
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
        <>
          {tableboards?.map((board) => (
            <tr key={board.animalBoardCode}>
              <td>글 번호</td>
              <td>
                <span>{board?.animalCategory?.animalType}</span>
                <a href={`/compagno/animal-board/${board.animalBoardCode}`}>
                  {board.animalBoardTitle}
                </a>
              </td>
              <td>{board.user.userNickname}</td>
              <td>{board.animalBoardView}</td>
              <td>{board.animalBoardDate}</td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};
export default TableList;
