import { getProductBoard, searchProductBoard } from "../../api/productBoard";
import { useState, useEffect } from "react";

const ProductBoard = () => {
  const [productBoards, setProductBoards] = useState([]);

  const ProductBoardAPI = async () => {
    const result = await searchProductBoard();
    console.log(result.data);
    setProductBoards(result.data);
  };

  useEffect(() => {
    ProductBoardAPI();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>글 제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {productBoards.content?.map((productBoard) => (
            <tr key={productBoard.productBoardCode}>
              <td>{productBoard.productBoardTitle}</td>
              <td>{productBoard.user.userNickname}</td>
              <td>{productBoard.productBoardViewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default ProductBoard;
